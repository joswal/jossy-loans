const Joi = require("joi")

class User {
  constructor(name, username, email, password, verifyPassword, phoneNumber) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.verifyPassword = verifyPassword;
    this.phoneNumber = phoneNumber;
  }
}


function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    username: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    verifyPassword: Joi.string()
      .min(5)
      .max(255)
      .required(),
    phoneNumber: Joi.string()
      .length(11)
      .required()
  }

  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser