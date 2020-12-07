const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema([
  {
    Bank_Number: String,
    Total_Transfer_Amount: Number,
    Bank_Transfers: [],
  },
]);

bankSchema.statics.checkIfExistOrCreate = function (incomingBankNumber) {
  return new Promise((resolve, reject) => {
    this.find({ Bank_Number: incomingBankNumber }, (error, docs) => {
      if (error) {
        console.error(error);

        const bankNew = new bankSchema({
          Bank_Number: incomingBankNumber,
          Total_Transfer_Amount: 0,
          Bank_Transfers: []
        });

        const bank = bankNew.save();

        resolve(bank);
      }
      resolve(docs);
    });
  });
};

module.exports = mongoose.model("Bank", bankSchema);
