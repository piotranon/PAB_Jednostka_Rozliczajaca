<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'bank_number',
        'bank_account_number'
    ];

    // public function account()
    // {
    //     return $this->hasOne(Account::class);
    // }
    // public function accountAll()
    // {
    //     return $this->hasOne(Account::class)->with('operationsAll');
    // }

    public function generateAccountNumberFromBankNumber()
    {
        $this->bank_account_number = $this->bank_number . "";
        return $this;
    }

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }
}
