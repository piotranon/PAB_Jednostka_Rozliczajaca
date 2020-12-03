class Bank{
  constructor(Bank_Number, Total_Transfer_Amount) {
    this.Bank_Number = Bank_Number;
    this.Total_Transfer_Amount = Total_Transfer_Amount;
  }
  verifyBankNumber(incomingBankNumber){
    if(this.Bank_Number == incomingBankNumber.subString(3,12)) return true;
    return false;
  };
}


module.exports = Bank;