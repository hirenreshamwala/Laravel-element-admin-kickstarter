<?php

namespace XT\LaravelBridge;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void setRootView($name)
 * @method static void share($key, $value = null)
 * @method static array getShared($key = null)
 * @method static void version($version)
 * @method static int|string getVersion()
 * @method static \XT\LaravelBridge\Response render($component, $props = [])
 *
 * @see \XT\LaravelBridge\ResponseFactory
 */
class LaravelBridge extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ResponseFactory::class;
    }
}
