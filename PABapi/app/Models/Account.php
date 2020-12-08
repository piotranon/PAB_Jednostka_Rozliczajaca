<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Operation;

class Account extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'account_number'
    ];

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }
}
