const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema([
  {
    Bank_Number: {
      type: String,
      required: true,
      max:8
    }
  }
]);

module.exports = mongoose.model("Bank", bankSchema);
