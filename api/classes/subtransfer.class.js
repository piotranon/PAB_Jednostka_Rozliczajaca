class SubTransfer {
  constructor(Payer, Recipient, Title, Transfer_Amount, Status) {
    this.Payer = Payer;
    this.Recipient = Recipient;
    this.Title = Title;
    this.Transfer_Amount = Transfer_Amount;
    this.Status = Status;
  }

  addSubTransferToBank(){

  }
}

module.exports = SubTransfer;