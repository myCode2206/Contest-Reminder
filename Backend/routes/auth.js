const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const sendMail = require("../helper/sendMail");

router.get("/auth", (req, res) => {
  res.status(200).json({ msg: "Hello from auth routes" });
});
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email });
  const newUser = await User.register(user, password);
  res.status(200).json({ msg: "registered successfully" });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
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
    failureRedirect: "/login",
    failureFlash: false,
  }),
  (req, res) => {
    console.log("logged In Successfully");
    res.send({ msg: "logged in successfully" });
  }
);

module.exports = router;
