const Loan = require("../models/loanModel");
const { users } = require("./users");
const _ = require("lodash");
const { Request, validate } = require("../models/requestModel");
const router = require("express").Router();
const moment = require("moment");

let loans = [];
let userLoans = [];
let profileLoans = [];
let count = 0;

let startDate = moment.now();

const renMoney = new Loan(
  1,
  "Ren Money",
  "Salary earners discounted loans",
  "3%",
  50000,
  startDate,
  `${moment.duration(18, "M").asYears()} years`,
  startDate + moment.duration(3, "M").asMilliseconds()
);

const easyLoan = new Loan(
  2,
  "KiaKia",
  "Easy Small loan",
  "5%",
  5000,
  startDate,
  `${moment.duration(3, "M").asMonths()} months`,
  startDate + moment.duration(1.5, "years").asMilliseconds()
);

router.get("/", async (req, res) => {
  profileLoans.push(
    _.pick(renMoney, [
      "number",
      "name",
      "description",
      "rate",
      "amount",
      "tenure"
    ])
  );
  loans.push(renMoney);
  loans.push(easyLoan);
  profileLoans.push(
    _.pick(easyLoan, [
      "number",
      "name",
      "description",
      "rate",
      "amount",
      "tenure"
    ])
  );
  res.status(200).send(profileLoans);
});

router.post("/apply", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = users.find(person => person.username == req.body.username);
  if (!user)
    return res
      .status(400)
      .send("user not registered yet,please register first");

  if (!user.isLoggedIn)
    return res.status(401).send("Access denied. Please log in first.");

  let loan = loans.find(item => item.number == req.body.loanId);
  if (!loan)
    return res
      .status(400)
      .send("no loans available for user yet,please get available loans first");

  if (userLoans.length > 0) {
    if (userLoans[count].endTime > moment.now())
      return res
        .status(403)
        .send(
          "denied, You cannot apply for a loan at this time as you have ongoing loan(s)."
        );
  }

  userLoans.push(loan);
  count++;

  let request = new Request(userLoans, user);
  console.log(request);
  res.status(201).send(request);
});

module.exports = router;
