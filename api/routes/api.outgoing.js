var express = require('express');
var router = express.Router();

/* GET all outgoing transfers */
router.get('/outgoing', (req, res) => {
    const response = {
        "Bank_Info":{
            "Bank_Number":"BBBB BBBB",
            "Total_Transfer_Amount":0.00
        },
        "Outgoing_Transfers":{
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
        "Outgoing_Incorrect_Transfers":{
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
router.get('/outgoing/:bank_num', (req, res) => {
    const response = {
        "Bank_Info":{
            "Bank_Number":"BBBB BBBB",
            "Total_Transfer_Amount":0.00
        },
        "Outgoing_Transfers":{
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
        "Outgoing_Incorrect_Transfers":{
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
// should respond with incoming transfers
router.post('/outgoing/:bank_num', (req, res) => {
    res.status(200).send('Done');
});

module.exports = router;
