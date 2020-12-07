class Account {
    constructor(Account_Number) {
        this.Account_Number = computeControllSum(Account_Number+"0000000000000000");
        this.Incoming_Transfers = [];
        this.Outgoing_Transfers = [];
    }

    newIncomingTransfer(incomingTransfer) {
        this.Incoming_Transfers.push(incomingTransfer);
    }

    newOutgoingTransfer(outgoingTransfer) {
        this.Outgoing_Transfers.push(outgoingTransfer)
    }

    getIncomingTransfers(){
        return this.Incoming_Transfers;
    }

    getOutgoingTransfers(){
        return this.Outgoing_Transfers;
    }
}
const computeControllSum = (accountNumber)=>{
  accountNumber=accountNumber.substr(2)+"252100";
  let value = 98-mod97(accountNumber);
  if(value<10)
    value="0"+value.toString();
  else
    value=value.toString();
  return value.toString()+accountNumber;
}
const mod97 = (accountNumber)=>{
  let modulo=0;
  for(i=0;i<accountNumber.length;i++)
    {
      modulo= parseInt(modulo+accountNumber.substr(i,1))%97;
    }
  return modulo;
}