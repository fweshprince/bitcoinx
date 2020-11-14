const asyncHandler = require("../middleware/async");
// const { cloudinary, upload } = require("../utils/cloudinary");
const Deposit = require("../models/Deposit");
const Investment = require("../models/Investment");
const Kycupload = require("../models/Kyc");
const Withdrawal = require("../models/Withdrawal");
const User = require("../models/User");
const Contact = require("../models/Contact");
const passport = require("passport");
// @desc Render about page
// @access public
exports.about = (req, res, next) => {
  res.render("about-us");
};
// @desc Render user active plans page
// @access private
exports.activePlans = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const allDeposits = await Deposit.find({ user: userId });
  const allInvestments = await Investment.find({ user: userId });
  const allWithdrawals = await Withdrawal.find({ user: userId });
  res.render("activeplans", {
    deposits: allDeposits,
    investments: allInvestments,
    withdrawals: allWithdrawals,
  });
});
// @desc Render payment confirmation page
// @access private
exports.confirmation = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const allKycuploads = await Kycupload.find({ user: userId });
  res.render("confirmation", {
    kycuploads: allKycuploads,
  });
});
// @desc Render user dashboard page
// @access private
exports.dashboard = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const userId = req.user._id.toString();
  const allInvestments = await Investment.find({ user: userId });
  res.render("dashboard", {
    investments: allInvestments,
  });
});
// @desc Render invest page
// @access private
exports.invest = asyncHandler((req, res, next) => {
  res.render("invest");
});
// @desc Render make withdrawal page
// @access private
exports.withdraw = asyncHandler((req, res, next) => {
  res.render("withdraw");
});
// @desc Render make deposit page
// @access private
exports.deposit = asyncHandler((req, res, next) => {
  res.render("deposit");
});
// @desc Render contact us page
// @access public
exports.contact = (req, res, next) => {
  res.render("contact");
};
// @desc Render faq page
// @access public
exports.faq = (req, res, next) => {
  res.render("faq");
};
// @desc Render paid page
// @access public
exports.paid = (req, res, next) => {
  res.render("paid");
};
// @desc Render home page
// @access public
exports.index = (req, res, next) => {
  res.render("index");
};
// @desc Render signin page
// @access public
exports.signin = (req, res, next) => {
  res.render("login", { message: "" });
};
// @desc Render rules page
// @access public
exports.rules = (req, res, next) => {
  res.render("terms-and-conditions");
};
// @desc Render rules page
// @access public
exports.affiliate = (req, res, next) => {
  res.render("affiliate");
};
// @desc Render signup page
// @access public
exports.signup = (req, res, next) => {
  if (req.query.referrer) {
    res.render("sign-up", { referrer: req.query.referrer });
  } else {
    res.render("sign-up", { referrer: "" });
  }
};
// @desc User make an investment
// @access public
exports.userinvest = asyncHandler(async (req, res, next) => {
  const obj = { ...req.body, user: req.user._id.toString() };
  const user = await User.findById(req.user._id.toString());
  user.balance = user.balance - req.body.amountInvested;
  await user.save();
  await Investment.create(obj);
  return res.redirect("/activePlans");
});
// @desc User make an audio rollover
// @access public
exports.rollover = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id.toString());
  user.rollover = true;
  await user.save();
  return res.redirect("/dashboard");
});
// @desc User make an withdrawal
// @access public
exports.userwithdraw = asyncHandler(async (req, res, next) => {
  const obj = { ...req.body, user: req.user._id.toString() };
  const user = await User.findById(req.user._id.toString());
  user.profit = user.profit - req.body.amountRequested;
  await user.save();
  await Withdrawal.create(obj);
  return res.redirect("/activePlans");
});
// @desc Submit contact us form
// @access public
exports.submitContact = asyncHandler(async (req, res, next) => {
  await Contact.create(req.body);
  res.redirect("/");
});

// @desc Registers a user
// @access public
exports.postsignup = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    username,
    bitcoinAddress,
    phoneNumber,
    referrer,
  } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    username,
    bitcoinAddress,
    phoneNumber,
    referrer,
  });
  req.login(user, function (err) {
    if (err) {
      return res.render("sign-up", { message: "" });
    }
    return res.redirect("/dashboard");
  });
});
// @desc Logs a user in
// @access public
exports.postsignin = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: false,
  })(req, res, next);
});
// @desc Logs a user out
// @access public
exports.postlogout = asyncHandler(async (req, res, next) => {
  req.logout();
  res.redirect("login");
});
