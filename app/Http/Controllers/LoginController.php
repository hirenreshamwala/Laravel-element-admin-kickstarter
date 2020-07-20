<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Role;

class LoginController extends Controller
{
    use RedirectsUsers, ThrottlesLogins;
    var $_Username = 'email';

    /**
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return view('auth.login');
    }

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        if ($request->guest && $request->guest == 'guest'){
            $request->email = 'guest@colorviz.nl';
            $request->password = 'colorviz';
        } else {
            $this->validateLogin($request);
        }



        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

//        if($captcha_response = $this->validateReCaptchaV2($request) != true){
//            return $this->sendFailedLoginResponse($request,$captcha_response);
//        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);



        return $this->sendFailedLoginResponse($request);
    }

    protected function validateReCaptchaV2(Request $request){
        $recaptcha = new \ReCaptcha\ReCaptcha('6LcmcqgZAAAAANaUsqj8tKeKA0jUJo6yA3DKYfb');
        $resp = $recaptcha->setExpectedHostname($_SERVER['SERVER_NAME'])
            ->verify($request->get('g-recaptcha-response'), $request->getClientIp());
        if ($resp->isSuccess()){
            return true;
        }
        $errors = $resp->getErrorCodes();
        return reset($errors);
    }
    protected function validateReCaptchaV3(Request $request){
        $url = "https://www.google.com/recaptcha/api/siteverify";
        $data = [
            'secret' => "6Ld20gAVAAAAABxn7-JwmHU96VW80kEFwhLt2XfG",
            'response' => $request->get('g-recaptcha-response'),
            'remoteip' => $request->getClientIp()
        ];

        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );

        $context  = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        $res = json_decode($response, true);

        if($res['success'] == true) {
            return true;
        } else {
//            error-codes
            return reset($res['error-codes']);
        }
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        if(!$this->email_validation($request->email)) {
            $this->_Username = 'username';
        } else{
            $this->_Username = 'email';
        }

        return $this->guard()->attempt(
            [$this->_Username => $request->email, 'password' => $request->password],
            $request->filled('remember')
        );
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'password');
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        return $this->authenticated($request, $this->guard()->user());

        //return $this->authenticated($request, $this->guard()->user()) ?: redirect()->intended($this->redirectPath());
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        if($user->userstatus != '1'){
            return $this->sendFailedLoginResponse($request,'status');
        }

//        if(config('app.VERIFY_EMAIL') && $user->verified != '1'){
//            return $this->sendFailedLoginResponse($request,'verify');
//        }


        if($user->hasAnyRole( Role::whereNotIn('name',['Customer','Guest'])->get()->pluck('name')->toArray() )){

            $user->update([
                'last_login_at' => Carbon::now()->toDateTimeString(),
                'last_login_ip' => $request->getClientIp()
            ]);
            //Redirect to admin
            return redirect()->intended('/admin');
        } else if($user->hasAnyRole(['Customer','Guest'])){
            $user->update([
                'last_login_at' => Carbon::now()->toDateTimeString(),
                'last_login_ip' => $request->getClientIp()
            ]);
            return redirect('/');
        }
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendFailedLoginResponse(Request $request, $code = '')
    {
        Auth::logout();
        switch ($code){
            case 'status': {
                throw ValidationException::withMessages([
                    'email' => ['Your account has been disabled. Please contact administrator.'],
                ]);
            } break;
            case 'pending-subscription': {
                throw ValidationException::withMessages([
                    'email' => ['Your subscription is pending.'],
                ]);
            } break;
            case 'verify': {
                throw ValidationException::withMessages([
                    'email' => ['Please verify your email before login.'],
                ]);
            } break;
            case 'timeout-or-duplicate': {
                throw ValidationException::withMessages([
                    'email' => ['The response is no longer valid.'],
                ]);
            } break;
            case 'bad-request': {
                throw ValidationException::withMessages([
                    'email' => ['The request is invalid or malformed.'],
                ]);
            } break;
            default: {
                throw ValidationException::withMessages([
                    'email' => [trans('auth.failed')],
                ]);
            }
        }

    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return $this->_Username;
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        return $this->loggedOut($request) ?: redirect('/');
    }

    /**
     * The user has logged out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    protected function loggedOut(Request $request)
    {
        //
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    function email_validation($str) {
        return (!preg_match(
            "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^", $str))
            ? FALSE : TRUE;
    }
//
//    /**
//     * Handle an authentication attempt.
//     *
//     * @param  \Illuminate\Http\Request $request
//     *
//     * @return Response
//     */
//
//    public function authenticate(Request $request)
//    {
//        $this->validateLogin($request);
//
//        $credentials = $request->only('email', 'password');
//
//        if (Auth::attempt([$this->_Username => $request->email, 'password' => $request->password, 'status' => 1], $request->filled('remember'))) {
//            $user = \Auth::user();
//            pr($user);die;
//        } else {
//            throw ValidationException::withMessages([
//                'email' => [trans('auth.failed')],
//            ]);
//        }
//
//    }

}
