var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Bank = require("../schemas/bank.schema");
const bankC = require('../classes/bank.class');
// const bankController = require('../controllers')

router.get("/", (req, res) => {
  Bank.find({}, function (err, banks) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(banks);
  });
});
// BBBBBBBB
router.get("/:bankNum", (req, res) => {
  Bank.find({ Bank_Number: req.params.bankNum}, function (err, banks) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(banks);
  });
});

router.post("/add", async (req, res) => {
  const bank = new Bank({
    Bank_Number: req.body.Bank_Number
  });
  await bank.save();
  res.status(200).json(bank);
  // try {
  //   const savedbank = await bank.save();
  //   res.send({ bank: bank._id });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

router.get("/lepiej", (req, res) => {
  let bankToSave;
  try {
    bankToSave = new bankC(req.body.Bank_Number);
    bankToSave.saveBank();
  } catch (e) {
    console.log(e);
    return res.status(200).json(e);
  }
  return res.status(200).json(bankToSave);
});

module.exports = router;
