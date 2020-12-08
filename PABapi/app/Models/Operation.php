<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \DateTimeInterface;

class Operation extends Model
{
    use HasFactory;

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'type',
        'payer_account_number',
        'recipient_account_number',
        'amount',
        'status_id',
        'account_id',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
