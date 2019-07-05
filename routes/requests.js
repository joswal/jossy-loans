const express = require('express');
const {
  Request,
  validate
} = require('../models/requestModel');
const Loan = require('../models/loanModel');
const {
  User
} = require('../models/userModel');
const router = express.Router();


router.get('/', async (req, res) => {
  const requests = await Request.find().sort('-dateOut');
  res.send(requests);
});

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const User = await User.findById(req.body.UserId);
  if (!User) return res.status(400).send('Invalid User.');

  const Loan = await Loan.findById(req.body.LoanId);
  if (!Loan) return res.status(400).send('Invalid Loan.');

  if (Loan.numberInStock === 0) return res.status(400).send('Loan not in stock.');

  let Request = new Request({
    User: {
      _id: User._id,
      name: User.name,
      phone: User.phone
    },
    Loan: {
      _id: Loan._id,
      title: Loan.title,
      dailyRequestRate: Loan.dailyRequestRate
    }
  });

  try {
    new Fawn.Task()
      .save('requests', Request)
      .update('loans', {
        _id: Loan._id
      }, {
        $inc: {
          numberInStock: -1
        }
      })
      .run();

    res.send(Request);
  } catch (ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', async (req, res) => {
  const Request = await Request.findById(req.params.id);

  if (!Request) return res.status(404).send('The Request with the given ID was not found.');

  res.send(Request);
});

module.exports = router;