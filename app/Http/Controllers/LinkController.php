<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Changed_urls;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
//use Base62;

class LinkController extends Controller
{

    //
    public function doGetLinks(Request $request)
    {
        $urlModel = new Changed_urls();
        return response()->json(['links' => $urlModel->orderByRaw('created_at desc')->where('owner', '=', Auth::user()->id)->get()]);
    }


    public function doGetOrigin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'short_url' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->first()]);
        }
        $base62 = new Base62();


        $id = $base62->decode($request['short_url']);
        
        $id = $id - 100000;

        $urlModel = new Changed_urls();
        $url = $urlModel->where('id', '=', $id)->first();
        if(!$url)
        {
            return response()->json(['error' => $validator->errors()->first()]);
        }

        $origin_url = $url->origin_url;
        
        $url->update([
            'click_count' =>  $url->click_count + 1
        ]);

        return response()->json([
            'status' => 'success',
            'url' => $origin_url
        ]);


    }
    public function deleteURL(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->first()]);
        }
        $urlModel = new Changed_urls();
        $url = $urlModel->where('id', '=', $request['id'])->first();
        if(!$url)
        {
            return response()->json(['error' => "not found data"]);
        }
        $url->delete();
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function updateOriginURL(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'origin_url' => 'required|url',
            'id' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->first()]);
        }
        $urlModel = new Changed_urls();
        $url = $urlModel->where('id', '=', $request['id'])->first();
        if(!$url)
        {
            return response()->json(['error' => "not found data"]);
        }
        $url->update([
            'origin_url' => $request['origin_url']
        ]);
        return response()->json([
            'status' => 'success'
        ]);

    }

    public function doShortenLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'origin_url' => 'required|url',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->first()]);
        }
        $urlModel = new Changed_urls();
        $url = $urlModel->where('owner', '=', Auth::user()->id)->where('origin_url', '=', $request['origin_url'])->first();
        if($url)
        {
            return response()->json(['error' => "Duplicated URL."]);
        }
        $url = $urlModel->create([
            'origin_url' => $request['origin_url'],
            'short_url' => '',
            'click_count' => 0,
            'owner' => Auth::user()->id
        ]);

        $base62 = new Base62();
        $shortUrl = url('/').'/'.$base62->encode($url->id + 100000);
        //$base62->encode($id + 100000)
        $url->update([
            'short_url' => $shortUrl
        ]);

        return response()->json([
            'status' => 'success',
            'short_url' => $shortUrl,
        ]);
        //doShortenLink
    }
}
