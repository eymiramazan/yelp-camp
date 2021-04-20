const User = require("../models/user");
const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
}

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome!");
      res.redirect("/campgrounds");
    });
  }
  catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
}

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
}

module.exports.renderAccountSettings = (req, res) => {
  res.render("profile/account", { user: req.user })
}

module.exports.changeMyPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      req.flash("error", "Cannot find user! Issue");
      return res.redirect("/profile/account");
    }
    await user.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        if (err.name === 'IncorrectPasswordError') {
          req.flash("error",'Incorrect password'); // Return error
          return res.redirect("/profile/account"); 
        } else {
          req.flash("error","Smthing went wrong",err.message);
          return res.redirect("/profile/account");
        }
      } else {
        req.flash("success","Password changed succesfully");
        return res.redirect("/profile/account");
      }
    })

  } catch (err) {
    req.flash("error".err.message);
    res.redirect("/profile/account")
  }
}

module.exports.deleteAccount = async (req,res) => {
  try{
    const user = await User.findById(req.user._id);
    if(!user){
      req.flash("error", "Cannot find user! Issue");
      return res.redirect("/profile/account");
    }
    await User.findByIdAndDelete(user);
    await Campground.deleteMany({author: req.user._id})
    await Review.deleteMany({author: req.user._id})
    
    req.flash("success","Successfully deleted your account!")
    req.logout();
    return res.redirect("/campgrounds");
  }catch(err){
    req.flash("error".err);
    res.redirect("/profile/account")
  }
}

module.exports.changeUsername = async(req,res) => {
  try {
    const { newUsername } = req.body;
    const checkIfUsernameExists = await User.find({username:newUsername});
    if (checkIfUsernameExists){
      req.flash("error", "Username already exists");
      return res.redirect("/profile/account");
    }

    const user = await User.findById(req.user._id);
    console.log("aaa"+user.username);
    if(!user){
      req.flash("error", "Cannot find user! Issue");
      return res.redirect("/profile/account");
    }
    await User.updateOne({username: req.user.username}, {$set: {username: newUsername}});

    req.flash("success","Successfully changed your username!");
    return res.redirect("/profile/account");
  }catch(err) {
    req.flash("error", err.message);
    res.redirect("/profile/account");
  }
}

module.exports.login = (req, res) => {
  req.flash("success", "Welcome Back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
}