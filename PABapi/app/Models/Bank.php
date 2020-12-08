<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $dates = [];

    protected $fillable = [
        'name',
        'bank_number'
    ];

    public function account()
    {
        return $this->hasOne(Account::class);
    }
    public function accountAll()
    {
        return $this->hasOne(Account::class)->with('operations');
    }
}
