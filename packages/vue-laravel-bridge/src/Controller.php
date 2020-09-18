<?php

namespace XT\LaravelBridge;

use Illuminate\Http\Request;

class Controller
{
    public function __invoke(Request $request)
    {
        return LaravelBridge::render(
            $request->route()->defaults['component'],
            $request->route()->defaults['props']
        );
    }
}
