require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ✅ Order Processing API
app.post("/send-order", async (req, res) => {
  const { name, email, phone, address, orderDetails, packaging } = req.body;

  console.log("📩 Received order request:", req.body);

  if (!name || !email || !phone || !address || !orderDetails || orderDetails.length === 0) {
    return res.status(400).json({ message: "⚠️ Missing required order details." });
  }

  // ✅ Respond immediately so UI doesn't wait
  res.status(200).json({ message: "Order received. Confirmation email will be sent shortly." });

  // ✅ Send email in the background after a short delay
  setTimeout(() => {
    (async () => {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT, 10),
          secure: parseInt(process.env.SMTP_PORT, 10) === 465,        // SSL on port 465
          requireTLS: parseInt(process.env.SMTP_PORT, 10) === 587,     // STARTTLS on port 587
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: `${email}, ${process.env.EMAIL_USER}`,
          subject: "Your Steak A Minute order has been received",
          text: `Hi ${name},

Thanks for your order with Steak A Minute!

We’ve received your order and will weigh the items shortly. Once weighed, we’ll confirm your final price before delivery.

Order Summary:
${orderDetails.map(item => `${item.quantity} x ${item.name} - $${item.price.toFixed(2)} per lb`).join("\n")}

Packaging: ${packaging}
Address: ${address}
Phone: ${phone}

Reply to this email if you have any questions.

– The Steak A Minute Team`,
          html: `
            <p>Hello ${name},</p>

            <p>Thank you for your order with <strong>Steak A Minute</strong>!</p>
            <p>We’ve received your order and will weigh the items shortly. Once weighed, we’ll confirm your final price before delivery.</p>

            <h3>Here’s what you ordered:</h3>
            <ul>
              ${orderDetails.map(item => `<li>${item.quantity} × ${item.name} — $${item.price.toFixed(2)} per lb</li>`).join("")}
            </ul>

            <p><strong>Packaging preference:</strong> ${packaging === "simple-bag" ? "Simple Bag" : "Vacuum-sealed"}</p>

            <p><strong>Delivery address:</strong> ${address}</p>
            <p><strong>Phone number:</strong> ${phone}</p>

            <p>If you have any questions or updates, feel free to reply directly to this email.</p>

            <p>Thanks again,</p>
            <p>– The Steak A Minute Team</p>

            <hr>
            <p style="font-size:0.9em;color:#555;">
              Tip: Add this email (${process.env.EMAIL_USER}) to your contacts so future updates land in your inbox.
            </p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Order confirmation email sent successfully!");
      } catch (error) {
        console.error("🚨 Error sending email:", error);
      }
    })();
  }, 100);
});

// ✅ Contact Message Endpoint (IMPROVED for instant response)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 Received contact message:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "⚠️ Missing required contact details." });
  }

  // 1. Respond to the frontend right away!
  res.status(200).json({ message: "Thank you for contacting us! Your message has been sent." });

  // 2. Send the email in the background
  setTimeout(() => {
    (async () => {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT, 10),
          secure: parseInt(process.env.SMTP_PORT, 10) === 465,
          requireTLS: parseInt(process.env.SMTP_PORT, 10) === 587,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "New Contact Message from Steak A Minute",
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Contact email sent successfully!");
      } catch (error) {
        console.error("🚨 Error sending contact email:", error);
      }
    })();
  }, 100);
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
