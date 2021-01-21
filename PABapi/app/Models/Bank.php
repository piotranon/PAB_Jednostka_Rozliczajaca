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

    public function debitedOperations()
    {
        return $this->hasMany(Operation::class, 'debited_bank_id', 'id');
    }

    public function creditedOperations()
    {
        return $this->hasMany(Operation::class, 'credited_bank_id', 'id');
    }
}
