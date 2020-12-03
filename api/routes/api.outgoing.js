var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const OutgoingSchema = require('../schemas/get_transfer.schema');

const OutgoingModel = mongoose.model('Outgoing_Transfer', OutgoingSchema);

/* GET all outgoing transfers */
router.get('/', (req, res) => {
    const response = {
        "Bank_Info": {
            "Bank_Number": "BBBB BBBB",
            "Total_Transfer_Amount": 0.00
        },
        "Outgoing_Transfers": {
            "Transfers_Amount": 0.00,
            "Transfers": [
                {
                    "Payer": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title": "tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        },
        "Outgoing_Incorrect_Transfers": {
            "Transfers_Amount": 0.00,
            "Transfers": [
                {
                    "Payer": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title": "tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        }
    };
    const responseModel = OutgoingModel.find();
    res.status(200).json(response);
});

/* GET latest outgoing transfer for bank */
router.get('/:bank_num', (req, res) => {
    const response = {
        "Bank_Info": {
            "Bank_Number": "BBBB BBBB",
            "Total_Transfer_Amount": 0.00
        },
        "Outgoing_Transfers": {
            "Transfers_Amount": 0.00,
            "Transfers": [
                {
                    "Payer": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title": "tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        },
        "Outgoing_Incorrect_Transfers": {
            "Transfers_Amount": 0.00,
            "Transfers": [
                {
                    "Payer": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Recipient": {
                        "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                        "Name": "imie nazwisko",
                        "Address": "adres odbiorcy"
                    },
                    "Title": "tytuł przelewu",
                    "Transfer_Amount": 0.00
                }
            ]
        }
    };
    const responseModel = OutgoingModel.find({
        Bank_Info:{
            Bank_Number: req.params.bank_num,
        }
    });
    res.status(200).json(response);
});

/* POST new bank */
// should respond with incoming transfers
router.post('/:bank_num', (req, res) => {
    const newOutgoingData = new OutgoingModel({
        Bank_Info: {
            Bank_Number: req.body.Bank_Info.Bank_Number,
            Total_Transfer_Amount: req.body.Bank_Info.Total_Transfer_Amount,
        },
        Outgoing_Transfers: {
            Transfers_Amount: req.body.Outgoing_Transfers.Transfers_Amount,
            Transfers: []
        },
        Outgoing_Incorrect_Transfers: {
            Transfers_Amount: req.body.Outgoing_Incorrect_Transfers.Transfers_Amount,
            Transfers: []
        }
    });

    req.body.Outgoing_Transfers.Transfers.forEach( transfer => {
        newOutgoingData.Outgoing_Transfers.Transfers.push(transfer);
    });

    req.body.Outgoing_Incorrect_Transfers.Transfers.forEach( transfer => {
        newOutgoingData.Outgoing_Incorrect_Transfers.Transfers.push(transfer);
    });

    newOutgoingData.save( function (err) {
        if (err) console.error(err);
    })
    res.status(200).send(newOutgoingData);
});

module.exports = router;
