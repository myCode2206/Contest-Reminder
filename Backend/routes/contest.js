const express = require("express");
const router = express.Router();
const axios = require("axios");
const scheduler = require("../helper/scheduler");
const { isLoggedIn } = require("../helper/protectRoute");

router.get("/hiserver", (req, res) => {
  res.json("Hello From Server");
});

router.get("/codeforces/contest/all", isLoggedIn, async (req, res) => {
  const url = process.env.CODEFORCES_CONTEST_API;
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.status === "OK") {
      const contests = data.result;
      const upcomingContests = contests.filter(
        (contest) => contest.phase === "BEFORE"
      );
      res.status(200).json(upcomingContests);
    } else {
      console.error("Error:", data.comment);
      res.status(500).json({ error: data.comment });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the contests" });
  }
});

router.post("/schedule/contest", isLoggedIn, (req, res) => {
  const { day, month, year, hour, minute, second, title } = req.body;
  const msg = `Hi ${req.user.displayName}, Just a quick reminder about the ${title} contest. Don’t forget to participate and give it your best! Good luck!`;
  const subject = `Reminder: ${title} Contest Coming Up!`;

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); //year,month,day
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  let reminderTime =
    second +
    " " +
    minute +
    " " +
    hour +
    " " +
    day +
    " " +
    month +
    " " +
    daysOfWeek;
  scheduler(reminderTime, req.user.email, subject, msg);
  console.log("Reminders scheduled successfully!");
  res.json({ msg: "Reminders scheduled successfully!" });
});

module.exports = router;
