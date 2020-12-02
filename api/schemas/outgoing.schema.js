import mongoose from 'mongoose';
const { Schema } = mongoose;

const Outgoing_Transfers = new Schema({
    Bank_Info:  {
        Bank_Number: String,
        Total_Transfer_Amount: Number,
    },
    Outgoing_Transfers: {
        Transfers_Amount: Number,
        Transfers: [
            {
                Payer: {
                    Account_Number: String,
                    Name: String,
                    Address: String,
                },
                Recipient: {
                    Account_Number: String,
                    Name: String,
                    Address: String,
                },
                Title: String,
                Transfer_Amount: Number
            }
        ]
    },
    Outgoing_Incorrect_Transfers: {
        Transfers_Amount: Number,
        Transfers: [
            {
                Payer: {
                    Account_Number: String,
                    Name: String,
                    Address: String,
                },
                Recipient: {
                    Account_Number: String,
                    Name: String,
                    Address: String,
                },
                Title: String,
                Transfer_Amount: Number
            }
        ]
    }
});

module.exports = Outgoing_Transfers;
