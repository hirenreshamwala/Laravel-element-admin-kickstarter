<?php

if (!function_exists('laravelBridge')) {
    /**
     * LaravelBridge helper.
     *
     * @param null|string $component
     * @param array       $props
     *
     * @return \XT\laravelBridge\ResponseFactory|\XT\LaravelBridge\Response
     */
    function laravelBridge($component = null, $props = [])
    {
        $instance = \XT\LaravelBridge\LaravelBridge::getFacadeRoot();

        if ($component) {
            return $instance->render($component, $props);
        }

        return $instance;
    }
}

if (!function_exists('laravelBridgeEncrypt')) {
    function laravelBridgeEncrypt($passphrase, $value){
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
        return array("a" => base64_encode($encrypted_data), "b" => bin2hex($iv), "c" => bin2hex($salt));
    }
}
