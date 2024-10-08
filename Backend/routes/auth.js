const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const sendMail = require("../helper/sendMail");

router.get("/auth/hello", (req, res) => {
  res.status(200).json({ msg: "Hello from auth routes" });
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const newUser = await User.register(user, password);
    res.status(200).json({ msg: newUser });
  } catch (e) {
    res.status(401).json({ msg: e });
  }
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
  res.status(401).json({ msg: "User Not Found" });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "https://contest-reminder.vercel.app/",
    failureRedirect: "https://contest-reminder.vercel.app/",
    failureFlash: false,
  }),
  (req, res) => {
    res.send({ msg: req.user });
  }
);

module.exports = router;
