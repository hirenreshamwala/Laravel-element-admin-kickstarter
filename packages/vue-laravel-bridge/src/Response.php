<?php

namespace XT\LaravelBridge;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Response as ResponseFactory;

class Response implements Responsable
{
    protected $component;
    protected $props;
    protected $rootView;
    protected $version;
    protected $viewData = [];

    public function __construct($component, $props, $rootView = 'app', $version = null)
    {
        $properties = $props instanceof Arrayable ? $props->toArray() : $props;

        $this->component = $component;
//        $this->props = $this->laravelBridgeEncrypt(config('app.vue_encryption_key'),$properties);
        $this->props = $properties;
        $this->rootView = $rootView;
        $this->version = $version;
    }

    public function with($key, $value = null)
    {
        if (is_array($key)) {
            $this->props = array_merge($this->props, $key);
        } else {
            $this->props[$key] = $value;
        }

        return $this;
    }

    public function withViewData($key, $value = null)
    {
        if (is_array($key)) {
            $this->viewData = array_merge($this->viewData, $key);
        } else {
            $this->viewData[$key] = $value;
        }

        return $this;
    }

    public function toResponse($request)
    {
        $only = array_filter(explode(',', $request->header('X-LaravelBridge-Partial-Data')));

        $props = ($only && $request->header('X-LaravelBridge-Partial-Component') === $this->component)
            ? Arr::only($this->props, $only)
            : $this->props;

        array_walk_recursive($props, function (&$prop) use ($request) {
            if ($prop instanceof Closure) {
                $prop = App::call($prop);
            }

            if ($prop instanceof Responsable) {
                $prop = $prop->toResponse($request)->getData();
            }

            if ($prop instanceof Arrayable) {
                $prop = $prop->toArray();
            }
        });

        $page = [
            'component' => $this->component,
//            'props' => $props,
            'props' => $this->laravelBridgeEncrypt(config('app.vue_encryption_key'),$props),
            'url' => $request->getRequestUri(),
            'version' => $this->version,
        ];

        if ($request->header('X-LaravelBridge')) {
            return new JsonResponse($page, 200, [
                'Vary' => 'Accept',
                'X-LaravelBridge' => 'true',
            ]);
        }

        return ResponseFactory::view($this->rootView, $this->viewData + ['page' => $page]);
    }

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
