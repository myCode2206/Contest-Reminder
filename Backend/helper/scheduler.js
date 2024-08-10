const cron = require("node-cron");
const sendMail = require("./sendMail");

// Schedule tasks to send emails
const scheduler = (time, to, subject, text) => {
  cron.schedule(time, () => {
    console.log(`Sending email at ${new Date()}`);
    sendMail(to, subject, text);
  });
};

module.exports = scheduler;
