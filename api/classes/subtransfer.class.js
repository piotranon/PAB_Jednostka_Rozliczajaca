class SubTransfer {
  constructor( Payer, Recipient, Title, Transfer_Amount) {
    this.Payer = Payer;
    this.Recipient = Recipient;
    this.Title = Title;
    this.Transfer_Amount = Transfer_Amount;
  }
}

module.exports = SubTransfer;