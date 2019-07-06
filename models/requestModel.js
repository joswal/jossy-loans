const Joi = require('joi');
const moment = require('moment');

class Request {
  constructor(loans, user) {
    this.loans = loans;
    this.user = user;
  }

  static lookup(UserId, LoanId) {
    return this.findOne({
      'User._id': UserId,
      'Loan._id': LoanId,
    });
  }

  return () {
    this.dateReturned = new Date();
    const RequestDays = moment().diff(this.dateOut, 'days');
    this.RequestFee = RequestDays * this.Loan.dailyRequestRate;
  }
}


function validateRequest(Request) {
  const schema = {
    loanId: Joi.string().required().length(1),
    username: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(Request, schema);
}

exports.Request = Request;
exports.validate = validateRequest;