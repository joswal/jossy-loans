const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const requestschema = new mongoose.Schema({
  User: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },
  Loan: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRequestRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  RequestFee: {
    type: Number,
    min: 0
  }
});

requestschema.statics.lookup = function (UserId, LoanId) {
  return this.findOne({
    'User._id': UserId,
    'Loan._id': LoanId,
  });
}

requestschema.methods.return = function () {
  this.dateReturned = new Date();

  const RequestDays = moment().diff(this.dateOut, 'days');
  this.RequestFee = RequestDays * this.Loan.dailyRequestRate;
}

const Request = mongoose.model('Request', requestschema);

function validateRequest(Request) {
  const schema = {
    UserId: Joi.objectId().required(),
    LoanId: Joi.objectId().required()
  };

  return Joi.validate(Request, schema);
}

exports.Request = Request;
exports.validate = validateRequest;