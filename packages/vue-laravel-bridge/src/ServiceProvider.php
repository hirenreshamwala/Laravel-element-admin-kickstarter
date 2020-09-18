<?php

namespace XT\LaravelBridge;

use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    public function register()
    {
        $this->app->singleton(ResponseFactory::class);
    }

    public function boot()
    {
        $this->registerBladeDirective();
        $this->registerRequestMacro();
        $this->registerRouterMacro();
        $this->registerMiddleware();
        $this->shareValidationErrors();
    }

    protected function registerBladeDirective()
    {
        Blade::directive('laravelbridge', function ($data) {
            return '<div id="app" data-page="{{ json_encode($page) }}">'.$data.'</div>';
        });
    }

    protected function registerRequestMacro()
    {
        Request::macro('laravelbridge', function () {
            return boolval($this->header('X-LaravelBridge'));
        });
    }

    protected function registerRouterMacro()
    {
        Router::macro('laravelbridge', function ($uri, $component, $props = []) {
            return $this->match(['GET', 'HEAD'], $uri, '\XT\LaravelBridge\Controller')
                ->defaults('component', $component)
                ->defaults('props', $props);
        });
    }

    protected function registerMiddleware()
    {
        $this->app[Kernel::class]->pushMiddleware(Middleware::class);
    }

    protected function shareValidationErrors()
    {
        if (LaravelBridge::getShared('errors')) {
            return;
        }

        LaravelBridge::share('errors', function () {
            if (! Session::has('errors')) {
                return (object) [];
            }

            return (object) Collection::make(Session::get('errors')->getBags())->map(function ($bag) {
                return (object) Collection::make($bag->messages())->map(function ($errors) {
                    return $errors[0];
                })->toArray();
            })->pipe(function ($bags) {
                return $bags->has('default') ? $bags->get('default') : $bags->toArray();
            });
        });
    }
}
