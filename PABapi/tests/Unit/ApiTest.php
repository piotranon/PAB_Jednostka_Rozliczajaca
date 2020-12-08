<?php

namespace Tests\Unit;

use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * Test if invalid Bank_Number returns Control Sum error
     *
     * @return void
     */
    /** @test */
    public function invalidBankControlSumTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '12341234',
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = array('errors' => array(
            'message' => 'Invalid Bank_Number Control Sum.'
        ));

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid Total_Transfer_Amount returns Total Transfer Amount error
     *
     * @return void
     */
    /** @test */
    public function invalidBankTotalSumTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 1.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Total_Transfer_Amount is not equal to Transfers_Amount sum of OutgoingTransfers and Outgoing_Incorrect_Transfers."]];

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid OutgoingTransfers.Transfers_Amount returns Total Transfers_Amount error
     *
     * @return void
     */
    /** @test */
    public function invalidBankOutgoingSumTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 1.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Total_Transfer_Amount is not equal to Transfers_Amount sum of OutgoingTransfers."]];

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid OutgoingInvalidTransfers.Transfers_Amount returns Total Transfers_Amount error
     *
     * @return void
     */
    /** @test */
    public function invalidBankOutgoingInvalidSumTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 1.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Total_Transfer_Amount is not equal to Transfers_Amount sum of OutgoingIncorrectTransfers."]];

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid OutgoingTransfers.Payer.AccountNumber returns Account_Number error
     *
     * @return void
     */
    /** @test */
    public function invalidBankPayerBankNumberTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 1.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Payer Account_Number Bank is not equal to Bank_Number"]];

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid OutgoingTransfers.Payer.AccountNumber returns Account_Number invalid error
     *
     * @return void
     */
    /** @test */
    public function invalidBankPayerAccountNumberTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 1.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Payer Account_Number is invalid"]];

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid OutgoingTransfers.Recipient.AccountNumber returns Account_Number error
     *
     * @return void
     */
    /** @test */
    public function invalidBankRecipientBankNumberTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 1.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Recipient Bank does not exists in system"]];

        $this->assertEquals(422, $expected);
    }

    /**
     * Test if invalid OutgoingTransfers.Recipient.AccountNumber returns Account_Number invalid error
     *
     * @return void
     */
    /** @test */
    public function invalidBankRecipientAccountNumberTest()
    {
        $request = [
            "Bank_Info" => [
                "Bank_Number" => '10301944', // Podać poprawny numer
                "Total_Transfer_Amount" => 0.00
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 0.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ],
            "Outgoing_Transfers" => [
                "Transfers_Amount" => 1.00,
                "Transfers" => [
                    "Payer" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Recipient" => [
                        "Account_Number" => "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name" => "imie nazwisko",
                        "Address" => "adres"
                    ],
                    "Title" => "Tytuł",
                    "Transfer_Amount" => 0.00
                ]
            ]
        ];

        $response = $this->post('/session', $request);

        $expected = ["error" => ["message" => "Recipient Account_Number is invalid"]];

        $this->assertEquals(422, $expected);
    }
}
