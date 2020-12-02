var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const IncomingSchema = require('../schemas/incoming.schema');

const IncomingModel = mongoose.model('Incoming_Transfer', IncomingSchema);

/* GET all outgoing transfers */
router.get('/', (req, res) => {
    const response = {
        "Total_Transfer_Amount":0.00,
        "Incoming_Transfers":{
            "Transfers_Amount": 0.00,
            "Transfers":[
                {
                    "Payer":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title":"tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        },
        "Incoming_Incorrect_Transfers":{
            "Transfers_Amount": 0.00,
            "Transfers":[
                {
                    "Payer":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title":"tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        }
    };
    res.status(200).json(response);
});

/* GET latest outgoing transfer for bank */
router.get('/:bank_num', (req, res) => {
    const response = {
        "Total_Transfer_Amount":0.00,
        "Incoming_Transfers":{
            "Transfers_Amount": 0.00,
            "Transfers":[
                {
                    "Payer":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title":"tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        },
        "Incoming_Incorrect_Transfers":{
            "Transfers_Amount": 0.00,
            "Transfers":[
                {
                    "Payer":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient":{
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title":"tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        }
    };
    res.status(200).json(response);
});

/* POST new bank */
router.post('/', (req, res) => {
    res.status(200).send('Done');
});

module.exports = router;
