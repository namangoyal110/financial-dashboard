const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');
const router = express.Router();

// Generate and Send Reports
router.post('/send', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const report = generateReport(user);
    await sendReportEmail(user.email, report);
    res.status(200).send('Report sent successfully');
  } catch (error) {
    res.status(500).send('Error sending report');
  }
});

function generateReport(user) {
  // Dummy implementation of report generation
  return `Weekly/Monthly Report for ${user.username}:\nIncome: ${user.income}\nGoals: ${user.goals}\nExpenses: ...`;
}

async function sendReportEmail(email, report) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your Weekly/Monthly Financial Report',
    text: report,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;