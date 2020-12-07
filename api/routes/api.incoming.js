var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const PostSchema = require('../schemas/post_transfer.schema');
const Outgoing_Transfers = require('../schemas/get_transfer.schema');
const Bank = require('../classes/bank.class');
const SubTransfer = require('../classes/subtransfer.class');
const bankModel = require('../schemas/bank.schema');

const IBANValidator = (accountNumber)=>{
  let controllSum = accountNumber.substr(2,2);
  accountNumber=accountNumber.substr(4)+"252100";
  let value = 98-mod97(accountNumber);
  if(value<10)
    value="0"+value.toString();
  else
    value=value.toString();
  return controllSum.localeCompare(value)==0;
}
const mod97 = (accountNumber)=>{
  let modulo=0;
  for(i=0;i<accountNumber.length;i++)
    {
      modulo= parseInt(modulo+accountNumber.substr(i,1))%97;
    }
  return modulo;
}


/* Post all incoming transfers */
router.post('/', (req, res) => {
    // incoming transfers 
    const Outgoing_Transfers = req.body.Outgoing_Transfers;
    const Outgoing_Incorrect_Transfers = req.body.Outgoing_Incorrect_Transfers;

    // ==============   1  ===================
    const bank = new Bank(req.body.Bank_Info.Bank_Number);
    
    bank=bank.checkIfExist();
    if(bank===null)
    {
        const resJson = {
                error : {
                    message: "Invalid control sum of Bank.BANK_NUMBER",
                    details: bank.toJSON
                }
            }
        return res.status(422).json(resJson);
    }

    // new transfers + returned transfers sum validation
    // ==============   2  ===================

    if(Outgoing_Transfers.Transfers_Amount+Outgoing_Incorrect_Transfers.Transfers_Amount!=Bank.Total_Transfer_Amount)
    {
        const resJson = {
                error : {
                    message: "Sum of Outgoing_Transfers and Outgoing_Incorrect_Transfers are invalid with Bank.Total_Transfer_Amount",
                }
            }
        return res.status(422).json(resJson);
    }

    // new transfers total validation
    // ==============   3  ===================
    
        let totalAmount=0;
        Outgoing_Transfers.Transfers.forEach(transfer => {
            totalAmount+=transfer.Transfer_Amount;
        });

        if(totalAmount!=Outgoing_Transfers.Transfers_Amount)
        {
            const resJson = {
                error : {
                    message: "Sum of Outgoing_Transfers.Transfers.Transfer_Amount are invalid with Outgoing_Transfers.Transfers_Amount",
                }
            }
            return res.status(422).json(resJson);
        }
    

    // returned transfers total validation
    // ==============   4  ===================
    
        let totalAmount=0;
        Outgoing_Incorrect_Transfers.Transfers.forEach(transfer => {
            totalAmount+=transfer.Transfer_Amount;
        });

        if(totalAmount!=Outgoing_Incorrect_Transfers.Transfers_Amount)
        {
            const resJson = {
                error : {
                    message: "Sum of Outgoing_Incorrect_Transfers.Transfers.Transfer_Amount are invalid with Outgoing_Incorrect_Transfers.Transfers_Amount",
                }
            }
        return res.status(422).json(resJson);
        }
    
    // ==============   5  ===================

        // validation of transfers
        Outgoing_Transfers.Transfers.forEach(transfer => {
            
            if(bank.getBankNumber()!=transfer.Payer.Account_Number.substr(2,8))
            {
                const resJson = {
                error : {
                    message: "Transfer Payer.Account_Number is invalid with a bank number from which was send.",
                    details: transfer.Payer.Account_Number
                    }
                }
                return res.status(422).json(resJson);
            }
            if(!IBANValidator(transfer.Payer.Account_Number))
            {
                const resJson = {
                error : {
                    message: "IBAN of Payer.Account_Number is invalid.",
                    details: transfer.Payer.Account_Number
                    }
                }
                return res.status(422).json(resJson);
            }
            // sprawdzenie czy bank odbiorcy istnieje u nas transfer.
            const bankRecipient = new Bank(transfer.Recipient.Account_Number);
            
            if(bankRecipient.checkIfExist() === null)
            {
                const resJson = {
                error : {
                    message: "Recipient Bank does not exist in our system.",
                    details: transfer.Recipient.Account_Number
                    }
                }
                return res.status(422).json(resJson);
            }
            
            if(!IBANValidator(transfer.Recipient.Account_Number))
            {
               const resJson = {
                error : {
                    message: "IBAN of Recipient.Account_Number is invalid.",
                    details: transfer.Recipient.Account_Number
                    }
                }
                return res.status(422).json(resJson); 
            }
        });

        Outgoing_Incorrect_Transfers.Transfers.forEach(transfer => {
            if (bank.getBankNumber()!=transfer.Recipient.Account_Number.substr(2, 8)) {
                const resJson = {
                    error : {
                        message: "Transfer Recipient.Account_Number is invalid with a bank number from which was send.",
                        details: transfer.Recipient.Account_Number
                        }
                    }
                    return res.status(422).json(resJson);
            }
            if(!IBANValidator(transfer.Recipient.Account_Number))
            {
                const resJson = {
                error : {
                    message: "IBAN of Recipient.Account_Number is invalid.",
                    details: transfer.Recipient.Account_Number
                    }
                }
                return res.status(422).json(resJson);
            }
        });

    // ==============   6  ===================

    Outgoing_Transfers.Transfers.foreach(transfer=>{
        bank.getAccount().newOutgoingTransfer(
            new SubTransfer(transfer.Payer, transfer.Recipient, transfer.Title, transfer.Transfer_Amount, 1)
        );

        bank.saveBank();
        
        RecipientBank = new Bank(transfer.Recipient.Account_Number.substr(2,8)).checkIfExist();
        
        RecipientBank.getAccount().newIncomingTransfer(
            new SubTransfer(transfer.Payer, transfer.Recipient, transfer.Title, transfer.Transfer_Amount, 1)
        );
    });
    // ==============   7  ===================

    Outgoing_Incorrect_Transfers.foreach(transfer =>{
        const bankTransfersOutgoing = bankModel.findOne({Bank_Number: transfer.Recipient.Account_Number.substr(2, 8)});
        let subTrans = new SubTransfer(transfer.Payer, transfer.Recipient, transfer.Title, transfer.Transfer_Amount, 1);
        transferUpdate = bankTransfersOutgoing.getAccount().getOutgoing_Transfers().find(transferInCorr => transferInCorr === subTrans);
        transferUpdate.Status = 3;
        bankTransfersOutgoing.saveBank();
        //zmienic objekt w przelewach uznania banku
    }) 

    // let Bank = new BankSchema(req.body.Bank_Info.Bank_Number, req.body.Bank_Info.Total_Transfer_Amount);
    // const bank = new BankSchema();
    // const bank2 = BankSchema.findOne({Bank_Number: req.body.Bank_Info.Bank_Number}).exec();
    // console.log(bank2);

    // BankSchema.checkIfExist(req.body[0].Bank_Info.Bank_Number);
    

    
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
