<?php
namespace App\Http\Controllers;

class Base62
{
    private $baseKeys = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    public function encode($decimal)
    {
        $id = $decimal;
        $encodedStr = '';
        while($id > 0)
        {
            $encodedStr = (substr($this->baseKeys, $id % 62, 1)).$encodedStr;
            $id = (int)($id / 62)  ;
        }
        return $encodedStr;
    }


    public function decode($encodeStr)
    {
        $id = 0;
        for($i = 0 ; $i < strlen($encodeStr) ; $i++ )
        //for($i = strlen($encodeStr)  - 1 ; $i >= 0 ; $i-- )
        {

            $ch = substr($encodeStr, $i, 1);
            if (ord('a') <= ord($ch) && ord($ch) <= ord('z')) {
                $id = $id * 62 + (ord($ch) - ord('a'));
            } else if (ord('A') <= ord($ch) && ord($ch) <= ord('Z')) {
                $id = $id * 62 + (ord($ch) - ord('A') + 36);
            } else if (ord('0') <= ord($ch) && ord($ch) <= ord('9')) {
                $id = $id * 62 + (ord($ch) - ord('0') + 26);
            }
        }
        return $id;
    }
}