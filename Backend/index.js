const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
const dotenv = require("dotenv").config();
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const contestRoutes = require("./routes/contest");
const sendMail = require("./helper/sendMail");

const app = express();

// Middleware setupconnect-mongo
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Database connection
mongoose
  .connect("mongodb://localhost:27017/contestque")
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB Connection Failed");
  });

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "mysecret",
  resave: false,
  saveUninitialized: false,
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Set the expiration date
    maxAge: 1000 * 60 * 60 * 24 * 7, // Set the maximum age in milliseconds
  },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: email,
          });
          await user.save();
          sendMail(
            user.email,
            "Welcome To Our ContestCue Website",
            `Hi, ${user.displayName} Thank You For Registering.Hope you liked our webiste.`
          );
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// app.use((req, res, next) => {
//   console.log("req.user in app js", req.user);
//   next();
// });

// Routes
app.use(authRoutes);
app.use(contestRoutes);

// Server setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT: ${PORT}`);
});
