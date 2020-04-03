const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/profile/");
  }
);

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
