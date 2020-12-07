const mongoose = require("mongoose");
const bankModel = require("../schemas/bank.schema");
const accountModel = require("../classes/account.class");

class Bank {
  db = mongoose.connection;

  constructor(Bank_Number, /*Total_Transfer_Amount*/) {
    this.Bank_Number = Bank_Number;
    this.Account = new accountModel(this.Bank_Number);
  }

  getBankNumber() {
    return this.Bank_Number;
  }

  getAccount() {
    return this.Account;
  }

  validateBankNumberFormat(incomingBankNumber) {
    if (this.Bank_Number == incomingBankNumber.subString(2, 8)) return true;
    return false;
  }

  validateBankControllSum(bankNumber) {
    let sum =
      parseInt(bankNumber[0]) * 3 +
      parseInt(bankNumber[1]) * 9 +
      parseInt(bankNumber[2]) * 7 +
      parseInt(bankNumber[3]) * 1 +
      parseInt(bankNumber[4]) * 3 +
      parseInt(bankNumber[5]) * 9 +
      parseInt(bankNumber[6]) * 7;
    sum = sum % 10;

    if (sum != 0) sum = 10 - sum;
    sum = sum.toString();

    return bankNumber[7].localeCompare(sum) == 0;
  }

  checkIfExistInDB() {
    const existingBank = bankModel
      .find({ Bank_Number: this.Bank_Number })
      .exec();
    console.log(existingBank);
    if (existingBank === null) {
      console.log("Creating new Bank from this object");
      if (!validateBankControllSum(this.Bank_Number)) {
        return { error_message: "Invalid number" };
      }
      this.saveBank();
    } else {
      return { success: "Bank exists" };
    }
  }

  checkIfExist(){
    const existingBank = bankModel
      .find({ Bank_Number: this.Bank_Number })
      .exec();
      return existingBank;
  }

  saveBank() {
    const newBank = new bankModel({
      Bank_Number: this.Bank_Number,
      Account: new accountModel(this.Bank_Number)
    });
    newBank.save();
  }
}

module.exports = mongoose.model('Bank',Bank);
