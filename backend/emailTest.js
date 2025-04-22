require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",                  // ✅ use Zoho SMTP
  port: 587,                              // ✅ TLS port
  secure: false,                          // ✅ secure false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Send test to yourself
  subject: "✅ Test Email from Steak A Minute",
  text: "This is a test email to check Zoho SMTP settings.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Error sending test email:", error);
  } else {
    console.log("✅ Test email sent:", info.response);
  }
});
