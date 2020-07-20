<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>

@php
    $params = [
        'key' => config('app.vue_encryption_key')
    ];
@endphp



<div id="app">
    <core-admin :appdata="{{ json_encode([ 'name' => config('app.name', 'Laravel') ]) }}" :params="{{
    json_encode($params)
    }}" :errors="{{$errors}}"></core-admin>
</div>

<script>
    window.QLogrRwvWpSNc6zePaiqVX1IBgeh0B6Y = @json(cryptoJsAesEncrypt(config('app.vue_encryption_key'),auth()->user()->getAllPermissions()));
    window.wpvPenuHpeAxKttNLGOuLx4CeCayw4tL = @json(cryptoJsAesEncrypt(config('app.vue_encryption_key'),auth()->user()));
    window.Kgc2HIucTXXV0CSS8X70dmUkSKH68lAt = @json(cryptoJsAesEncrypt(config('app.vue_encryption_key'),auth()->user()->roles));
</script>
</body>
</html>
