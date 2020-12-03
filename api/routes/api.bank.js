var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Bank = require("../schemas/bank.schema");
// const bankController = require('../controllers')

router.get("/", (req, res) => {
  Bank.find({}, function (err, banks) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(banks);
  });
});

router.post("/add", async (req, res) => {
  const bank = new Bank({
    Bank_Number: req.body.number,
    Total_Transfer_Amount: req.body.total,
  });
  try {
    const savedbank = await bank.save();
    res.send({ bank: bank._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/lepiej", (req, res) => {
  let banks;
  try {
    banks = Bank.find({}).exec();
  } catch (e) {
    console.log(e);
  }
  res.send(banks);
});

module.exports = router;
