const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema([
  {
    Bank_Number: String,
    Total_Transfer_Amount: Number,
    Bank_Transfers: [],
  },
]);

bankSchema.methods.checkIfExistOrCreate =function(incomingBankNumber) {
  console.log("elo" + this);
  const bankExist =mongoose.model("Bank").find({ Bank_Number: incomingBankNumber })
  .exec()
  .then( data => {
    console.log("hmmm ",data);
    console.log("xddd   ", bankExist);
    if (bankExist) throw new Error;
  })
  .catch( err => {
    console.error(err);
  })
  .then(data => {
    const bankNew =  new bankSchema({
      Bank_Number: incomingBankNumber,
      Total_Transfer_Amount: 0,
      Bank_Transfers: [],
    });
    const bank =  bankNew.create();
  })
  .catch(err => {
    console.log(err);
  });
};


module.exports = mongoose.model("Bank", bankSchema);