const _ = require("lodash");
const {
  User,
  validate
} = require("../models/userModel");
const express = require("express");
const router = express.Router();

let users = [];

router.post("/register", async (req, res) => {
  let {
    error
  } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let found = users.find((person) => person.email == req.body.email || person.username == req.body.username || person.phoneNumber == req.body.phoneNumber)
  if (found)
    return res
      .status(400)
      .send("user already registered, please register another user")

  if (req.body.password != req.body.verifyPassword)
    return res
      .status(400)
      .send("passwords do not match, please check password and verify password")

  let user = new User(req.body.name, req.body.username, req.body.email, req.body.password, req.body.verifyPassword, req.body.phoneNumber, false);
  users.push(user)
  res.status(201).send("user registered")
})


router.post("/login", async (req, res) => {

  if (!(req.body.email || req.body.username) && req.body.password) return res.status(400).send("incomplete login details, please try again")
  let registeredUser = users.find((person) => person.username == req.body.username || person.email == req.body.email)

  if (!registeredUser)
    return res
      .status(400)
      .send("user not yet registered, please register first")

  if (registeredUser.password != req.body.password)
    return res.status(400).send("wrong login details, please try again")

  registeredUser.authenticateUser();

  res
    .header(200)
    .send(_.pick(registeredUser, ["name", "username", "email", "phoneNumber"]));
})


exports.Users = router;
exports.users = users;