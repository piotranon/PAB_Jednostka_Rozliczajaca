const mongoose = require('mongoose');

const { Schema } = mongoose;

const Transfers_We_Are_Getting = new Schema({
    Bank_Info:  {
        Bank_Number: String,
        Total_Transfer_Amount: Number,
        Last_Time_Request_Send: Date
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

module.exports = Transfers_We_Are_Getting;
