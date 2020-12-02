import mongoose from 'mongoose';

const {Schema} = mongoose;

const Incoming_Transfers = new Schema({
    Total_Transfer_Amount: Number,
    Incoming_Transfers: {
        Transfers_Amount: Number,
        Transfers: [
            {
                Payer: {
                    Account_Number: String,
                    Name: String,
                    Address: String
                },
                Recipient: {
                    Account_Number: String,
                    Name: String,
                    Address: String
                },
                Title: String,
                Transfer_Amount: Number
            }
        ]
    },
    Incoming_Incorrect_Transfer: {
        Transfers_Amount: Number,
        Transfers: [
            {
                Payer: {
                    Account_Number: String,
                    Name: String,
                    Address: String
                },
                Recipient: {
                    Account_Number: String,
                    Name: String,
                    Address: String
                },
                Title: String,
                Transfer_Amount: Number
            }
        ]
    }
});

module.exports = Incoming_Transfers;
