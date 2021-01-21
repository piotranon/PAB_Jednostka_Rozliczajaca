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
        'debited_bank_id',
        'credited_bank_id',

        'debited_account_number',
        'debited_name_and_address',

        'credited_account_number',
        'credited_name_and_address',

        'title',
        'amount',

        'status_id',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function debitedBank()
    {
        return $this->hasOne(Bank::class, "id", "debited_bank_id");
    }

    public function creditedBank()
    {
        return $this->hasOne(Bank::class, "id", "credited_bank_id");
    }
}
