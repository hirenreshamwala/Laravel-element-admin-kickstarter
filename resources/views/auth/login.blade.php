@extends('layouts.login')
<style>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
</style>
@section('content')

    @php
        $params = [
            'action' => route('auth-user'),
            'old_email' => old('email'),
            '_token' => csrf_token(),
            'remember' => old('remember'),
        ];
        if(Route::has('password.request')){
            $params['lostpwd'] = route('password.request');
        }
        if(Route::has('register')){
            $params['register'] = route('register');
        }
    @endphp

    <core-login :appdata="{{ json_encode([ 'name' => config('app.name', 'Laravel') ]) }}" :params="{{
    json_encode($params)
    }}" :errors="{{$errors}}"></core-login>

@endsection
