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
  setTimeout(async () => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${email}, ${process.env.EMAIL_USER}`,
        subject: "✅ Steak A Minute - Order Confirmation",
        html: `
          <h2>Order Confirmation</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for your order! Here are your details:</p>

          <h3>🛒 Order Summary:</h3>
          <ul>
            ${orderDetails.map(item => `<li>${item.quantity} x ${item.name} - $${item.price.toFixed(2)} per lb</li>`).join("")}
          </ul>

          <p><strong>📦 Packaging Preference:</strong> ${packaging === "simple-bag" ? "Simple Bag" : "Vacuum-sealed"}</p>

          <p><strong>📍 Address:</strong> ${address}</p>
          <p><strong>📞 Contact:</strong> ${phone}</p>

          <p>We will weigh your order and confirm the final total before delivery.</p>
          <p>For any questions, please contact us.</p>

          <br>
          <p>🔴 <strong>Steak A Minute Team</strong></p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ Order confirmation email sent successfully!");
    } catch (error) {
      console.error("🚨 Error sending email:", error);
    }
  }, 100);
});

// ✅ Contact Message Endpoint (unchanged)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 Received contact message:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "⚠️ Missing required contact details." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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
    res.status(200).json({ message: "Thank you for contacting us! Your message has been sent." });
  } catch (error) {
    console.error("🚨 Error sending contact email:", error);
    res.status(500).json({ message: "⚠️ Failed to send contact email." });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
