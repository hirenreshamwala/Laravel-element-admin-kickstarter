<?php

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Decrypt data from a CryptoJS json encoding string
 *
 * @param mixed $passphrase
 * @param mixed $jsonString
 * @return mixed
 */
function cryptoJsAesDecrypt($passphrase, $jsonString){
    $jsondata = json_decode($jsonString, true);
    $salt = hex2bin($jsondata["s"]);
    $ct = base64_decode($jsondata["ct"]);
    $iv  = hex2bin($jsondata["iv"]);
    $concatedPassphrase = $passphrase.$salt;
    $md5 = array();
    $md5[0] = md5($concatedPassphrase, true);
    $result = $md5[0];
    for ($i = 1; $i < 3; $i++) {
        $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
        $result .= $md5[$i];
    }
    $key = substr($result, 0, 32);
    $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
    return json_decode($data, true);
}

/**
 * Encrypt value to a cryptojs compatiable json encoding string
 *
 * @param mixed $passphrase
 * @param mixed $value
 * @return string
 */
function cryptoJsAesEncrypt($passphrase, $value){
    $salt = openssl_random_pseudo_bytes(8);
    $salted = '';
    $dx = '';
    while (strlen($salted) < 48) {
        $dx = md5($dx.$passphrase.$salt, true);
        $salted .= $dx;
    }
    $key = substr($salted, 0, 32);
    $iv  = substr($salted, 32,16);
    $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
    $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
    return json_encode($data);
}

function successResponse($_ResponseData){
    $_Response = array(
        'status' => true,
        'data' => $_ResponseData
    );
    return response($_Response, 200)
        ->header('Content-Type', 'application/json');
}

function errorResponse($message,$errorCode = 404){
    $_Response = array(
        'status' => false,
        'error' => $message
    );
    return response($_Response, $errorCode)
        ->header('Content-Type', 'application/json');
}

function pr($data){
    echo '<pre>'; print_r($data); echo '</pre>';
}

function getImageResize(){
    $filePath = implode('/',func_get_args());
    $path = storage_path('app/public/'.$filePath);

    if (file_exists($path)){
        $img = Image::make($path);

        $pos = stripos(strtolower($img->mime()),'svg');
        if (!$pos){
            $w = $img->width();
            $h = $img->height();

            $width = Input::get("w",$w);
            $height = Input::get("h",$h);

            $ratio = min($width/$w, $height/$h);

            $newWidth = $w*$ratio;
            $newHeight = $h*$ratio;

            $img->resize($newWidth,$newHeight);

            return $img->response();
        } else {
            return response(file_get_contents($path))
                ->header('Content-Type', 'image/svg+xml');
        }
    }
}
function createJobZip($jobId){
    $path = storage_path('app/public/projects/'.$jobId.'/');

    if (file_exists($path) && is_dir($path)){
        $files = Storage::files('public/projects/'.$jobId);

        $dirName = Str::random(16);
        $zip_file = storage_path('app').DIRECTORY_SEPARATOR.'public/downloads/jobs/'.$dirName.'.zip';

        // Initializing PHP class
        $zip = new \ZipArchive();
        $zip->open($zip_file, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);
        foreach ($files as $file){
            $tmp = explode('/',$file);
            $f = array_pop($tmp);
            $zip->addFile(storage_path('app'.DIRECTORY_SEPARATOR.$file), $dirName.DIRECTORY_SEPARATOR.$jobId.DIRECTORY_SEPARATOR.$f);
            $zip->close();
        }
        return $zip_file;
    }
}
