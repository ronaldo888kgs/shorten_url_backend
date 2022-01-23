<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Redirect, Response, File;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Session;


class UserController extends Controller
{
    private $apiToken;
    public function __construct()
    {
        //$this->apiToken = uniqid(base64_encode(Str::random(40)));
    }
    public function __invoke(Request $request)
    {
        $this->index($request);
    }
    //
    public function index(Request $request)
    {

    }

    public function doRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->first()]);
        }
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);
        return response()->json([
            "status" => "success"
        ]);

    }

    public function doLogout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status' => 'logout',
            'msg' => 'Token is deleted'
        ]); 
    }

    public function doLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()->first()]);      
        }

        if(Auth::attempt(['email' => $request['email'], 'password' => $request['password']]))
        {
            $user = Auth::user();
            //$user->createToken($user->email)->plainTextToken
            //$success['token'] = $user->tokens->where('name', $user->email);
            $success['token'] = auth()->user()->createToken('API Token')->plainTextToken;
            $success['name'] = $user->name;
            return response()->json([
                'status' => 'success',
                'data' => $success
            ]);
        }
        return response()->json([
            'error' => 'UnAuthorized Access'
        ]);
        

    }
}
