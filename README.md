## Topics
1. [Introduction](#introduction)
2. [Features](#features)
3. [Documentation](#documentation)
4. [Requirements](#requirements)
5. [Installation & Configuration](#installation-and-configuration)
6. [License](#license)

### Introduction

Laravel-element-admin-kickstarter is a kickstarter project with pre-installed admin panel built on the hottest opensource technologies
such as [Laravel](https://laravel.com) (a [PHP](https://secure.php.net/) framework) [Vue.js](https://vuejs.org)
a progressive Javascript framework and [Element UI](https://element.eleme.io).

**Laravel-element-admin-kickstarter can help you to cut down your time in building admin panel from the scratch**

### Features
    1. Laravel 8 with jetstream (Livewire and tailwindcss)
    2. Multiple authentication admin and customer
    3. Module base admin (Completely separate from default website) 
    4. Redy made admin panel including 
        - Admin management
        - Admin Role management
        - Customer management
    

### Documentation

#### Coming Soon

### Requirements

* **OS**: Ubuntu 16.04 LTS or higher / Windows 7 or Higher (WampServer / XAMPP).
* **SERVER**: Apache 2 or NGINX.
* **RAM**: 2 GB or higher.
* **PHP**: 7.4.0 or higher.
* **Processor**: Clock Cycle 1 Ghz or higher.
* **For MySQL users**: 5.7.23 or higher.
* **Node**: v10.21.0 LTS or higher.
* **Composer**: 1.8.0 or higher.

### Installation and Configuration

**you can install Laravel-element-admin-kickstarter from your console.**

##### Execute these commands below, in order

~~~
1. git clone git@github.com:hirenreshamwala/Laravel-element-admin-kickstarter.git
~~~

~~~
2. composer install
~~~

~~~
3. npm install
~~~

~~~
4. cp .env.example .env
~~~

~~~
5. php artisan key:generate
~~~

**To execute Laravel-element-admin-kickstarter**:

##### On server:

Warning: Before going into production mode we recommend you uninstall developer dependencies.
In order to do that, run the command below:

> composer install --no-dev

~~~
Open the specified entry point in your hosts file in your browser or make an entry in hosts file if not done.
~~~

##### On local:

~~~
php artisan serve
~~~


**How to log in as admin:**

> *http(s)://example.com/admin/*

~~~
email:admin@example.com
password:admin123
~~~


## License

The Laravel-element-admin-kickstarter is open-sourced software licensed under the [MIT license](https://github.com/hirenreshamwala/Laravel-element-admin-kickstarter/blob/master/LICENSE).
