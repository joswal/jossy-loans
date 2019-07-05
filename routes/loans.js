const Loan = require('../models/loanModel');
const express = require('express');
const router = express.Router();

let loans = []

const renmoneyloan = new Loan(1, "Ren Money", "Salary earners discounted loans", 3, 50000, "1.5 years")
const easyLoan = new Loan(2, "KiaKia", "Easy Small loan", 5, 5000, "3 months")

router.get('/', async (req, res) => {
  loans.push(renmoneyloan);
  loans.push(easyLoan);
  res.status(200).send(loans);
});

router.post('/apply', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const loan = new Loan({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRequestRate: req.body.dailyRequestRate
  });
  await loan.save();

  res.send(loan);
});


module.exports = router;