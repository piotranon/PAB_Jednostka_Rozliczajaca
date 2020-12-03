var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const PostSchema = require('../schemas/post_transfer.schema');
const Outgoing_Transfers = require('../schemas/get_transfer.schema');
const IncomingModel = mongoose.model('Incoming_Transfer', PostSchema);
const BankClass = require('../classes/bank.class');
const BankSchema = require('../schemas/bank.schema');

const IBANValidator = (Account_Number)=>{
    Account_Number = Account_Number.replaceAll(' ', '');
    let accountNumber = Account_Number.substring(2)+"PL00";
    let accountNumberArray = [];
    accountNumber.split('').forEach( item => {
        if (item.match(/[A-Z]/)) {
            accountNumberArray.push(item.charCodeAt(0)-55);
        }
        accountNumberArray.push(item);
    });
    number = accountNumberArray.join("");
    divided = 98-(parseInt(number)%97);
    if(divided<10)
    {
        divided = "0"+divided.toString();
    }else
    {
        divided = divided.toString();
    }

    if(divided == Account_Number.substring(0,2))
    {
        return true;
    }
    return false;
};


/* Post all incoming transfers */
router.post('/', (req, res) => {
    // incoming transfers 
    const Outgoing_Transfers = req.body.Outgoing_Transfers;
    const Outgoing_Incorrect_Transfers = req.body.Outgoing_Incorrect_Transfers;
    console.log(req.body);

    // let Bank = new BankSchema(req.body.Bank_Info.Bank_Number, req.body.Bank_Info.Total_Transfer_Amount);
    const bank = new BankSchema();
    // const bank2 = BankSchema.findOne({Bank_Number: req.body.Bank_Info.Bank_Number}).exec();
    // console.log(bank2);

    // BankSchema.checkIfExist(req.body[0].Bank_Info.Bank_Number);
    const DBbank = bank.checkIfExistOrCreate(req.body.Bank_Info.Bank_Number)
    // if()
    // {
    //     console.log("Nie ma takiego banku")
    // } else{
    //     console.log("mamy taki bank");
    // }

    
//     // 1234 1234

    
//     // if bank account not exist create
//     // if(Bank.Bank_Number !== ){

//         // bank number verification
//         // let sum = 3*Bank.Bank_Number[0]+9*Bank.Bank_Number[1]+7*Bank.Bank_Number[2]+1*Bank.Bank_Number[3]+3*Bank.Bank_Number[4]+9*Bank.Bank_Number[5]+7*Bank.Bank_Number[6]
//         // if(10-sum%10 == Bank.Bank_Number[7])
//             // return true;
//         // return false;

//     // }
    
//     // Bank.Total_Transfer_Amount validation
//     if(Bank.Total_Transfer_Amount !== Outgoing_Transfers.Transfers_Amount + Outgoing_Incorrect_Transfers.Transfers_Amount)
//     {
//         const resJson = {
//             error : {
//                 message: "Total_Transfer_Amount isn't equal to sum of Transfers_Amount",
//                 expected: Bank.Total_Transfer_Amount,
//                 got: Outgoing_Transfers.Transfers_Amount + Outgoing_Incorrect_Transfers.Transfers_Amount,
//             }
//         }
//         return res.status(422).json(resJson);
//     }
    
//     // Total_Outgoing_Transfers validation
//     Total_Outgoing_Transfers=0;
//     Outgoing_Transfers.Transfers.forEach(obj => {
//         Total_Outgoing_Transfers+=obj.Transfer_Amount;
//     });    
//     if(Outgoing_Transfers.Transfers_Amount!==Total_Outgoing_Transfers)
//     {
//         const resJson = {
//             error : {
//                 message: "Total_Outgoing_Transfers isn't equal to sum of Transfers_Amount of Outgoing_Transfers",
//                 expected: Outgoing_Transfers.Transfers_Amount,
//                 got: Total_Outgoing_Transfers,
//             }
//         }
//         return res.status(422).json(resJson);
//     }
    
//     // Total_Outgoing_Incorrect_Transfers validation
//     Total_Outgoing_Incorrect_Transfers = 0;
//     Outgoing_Incorrect_Transfers.Transfers.forEach(obj=>{
//         Total_Outgoing_Incorrect_Transfers+=obj.Transfer_Amount;
//     });
//     if(Outgoing_Incorrect_Transfers.Transfers_Amount !== Total_Outgoing_Incorrect_Transfers)
//     {
//         const resJson = {
//             error : {
//                 message: "Total_Outgoing_Incorrect_Transfers isn't equal to sum of Transfers_Amount of Outgoing_Incorrect_Transfers",
//                 expected: Outgoing_Transfers.Transfers_Amount,
//                 got: Total_Outgoing_Transfers,
//             }
//         }
//         return res.status(422).json(resJson);
//     }

//     // Outgoing Transfers validation one by one
//     Outgoing_Transfers.Transfers.forEach(obj=>{
//         // bank number validation with bank sender
//         if(!Bank.verifyAccountNumber(obj.Payer.Account_Number))
//         {
//             const resJson = {
//                 error : {
//                     message: "Outgoing_Transfers Payer Account does not match Bank Account.",
//                     expected: Bank.Account_Number,
//                     got: obj.Payer.Account_Number,
//                 }
//             }
//             return res.status(422).json(resJson);
//         }
//         // validating control sum of Payer bank number
//         if(!IBANValidator(obj.Payer.Account_Number))
//         {
//             const resJson = {
//                 error : {
//                     message: "Control sum of Payer Bank Account Number is invalid.",
//                     got: obj.Account_Number,
//                 }
//             }
//             return res.status(422).json(resJson);
//         }
//         // validating control sum of Recipient bank number
//         if(!IBANValidator(obj.Recipient.Account_Number))
//         {
//             const resJson = {
//                 error : {
//                     message: "Control sum of Payer Bank Account Number is invalid.",
//                     got: obj.Account_Number,
//                 }
//             }
//             return res.status(422).json(resJson);
//         }
//         // validating if Recipient bank exist in our data
//         // if(!)
//         console.log(obj);
//     });




//     const response = {
//         "Total_Transfer_Amount":0.00,
//         "Incoming_Transfers":{
//             "Transfers_Amount": 0.00,
//             "Transfers":[
//                 {
//                     "Payer":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Recipient":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Title":"tytuł przelewu",
//                     "Transfer_Amount": 0.00
//                 }
//             ]
//         },
//         "Incoming_Incorrect_Transfers":{
//             "Transfers_Amount": 0.00,
//             "Transfers":[
//                 {
//                     "Payer":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Recipient":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Title":"tytuł przelewu",
//                     "Transfer_Amount": 0.00
//                 }
//             ]
//         }
//     };
//     res.status(200).json(response);
// });


// /* GET latest outgoing transfer for bank */
// router.get('/:bank_num', (req, res) => {
//     const response = {
//         "Total_Transfer_Amount":0.00,
//         "Incoming_Transfers":{
//             "Transfers_Amount": 0.00,
//             "Transfers":[
//                 {
//                     "Payer":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Recipient":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Title":"tytuł przelewu",
//                     "Transfer_Amount": 0.00
//                 }
//             ]
//         },
//         "Incoming_Incorrect_Transfers":{
//             "Transfers_Amount": 0.00,
//             "Transfers":[
//                 {
//                     "Payer":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Recipient":{
//                         "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
//                         "Name": "imie nazwisko",
//                         "Address": "adres odbiorcy"
//                     },
//                     "Title":"tytuł przelewu",
//                     "Transfer_Amount": 0.00
//                 }
//             ]
//         }
//     };
//     res.status(200).json(response);
res.status(200).json(bank);
});

/* POST new bank */
router.post('/', (req, res) => {
    res.status(200).send('Done');
});

module.exports = router;
