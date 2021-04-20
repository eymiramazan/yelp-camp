const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require("../middleware.js");

router.route("/account")
  .get(isLoggedIn,users.renderAccountSettings)
  .post(isLoggedIn,catchAsync(users.changeMyPassword));

router.route("/account/delete")
  .delete(isLoggedIn,catchAsync(users.deleteAccount));

router.route("/account/changeUsername")
  .post(isLoggedIn, catchAsync(users.changeUsername));

module.exports = router;