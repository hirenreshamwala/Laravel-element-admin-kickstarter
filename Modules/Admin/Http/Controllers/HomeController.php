<?php

namespace Modules\Admin\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use XT\LaravelBridge\LaravelBridge;

class HomeController extends Controller
{
    public function __construct()
    {
    	// $this->middleware('auth');
    }

    public function index()
    {
        LaravelBridge::setRootView('admin::layouts.app');
//        return view('admin::index');
        return LaravelBridge::render('admin::index', [
            'data' => 'data1'
        ]);
    }
}
