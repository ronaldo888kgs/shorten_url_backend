<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Changed_urls extends Model
{
    use HasFactory;

    protected $fillable = [
        'origin_url',
        'short_url',
        'click_count',
        'owner'
    ];

}
