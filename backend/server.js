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
  const { name, email, phone, address, orderDetails } = req.body;

  // ✅ Debugging: Log received order
  console.log("📩 Received order request:", req.body);

  if (!name || !email || !phone || !address || !orderDetails || orderDetails.length === 0) {
    return res.status(400).json({ message: "⚠️ Missing required order details." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // ✅ Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${email}, ${process.env.EMAIL_USER}`, // Customer & Owner
      subject: "✅ Fresh Meat House - Order Confirmation",
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for your order! Here are your details:</p>
        <h3>🛒 Order Summary:</h3>
        <ul>
          ${orderDetails.map(item => `<li>${item.quantity} x ${item.name} - $${item.price.toFixed(2)} per lb</li>`).join("")}
        </ul>
        <p><strong>📍 Address:</strong> ${address}</p>
        <p><strong>📞 Contact:</strong> ${phone}</p>
        <p>We will weigh your order and confirm the final total before delivery.</p>
        <p>For any questions, please contact us.</p>
        <br>
        <p>🔴 <strong>Fresh Meat House Team</strong></p>
      `,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);
    console.log("✅ Order confirmation email sent successfully!");

    res.status(200).json({ message: "Order email sent successfully." });

  } catch (error) {
    console.error("🚨 Error sending email:", error);
    res.status(500).json({ message: "⚠️ Failed to send order confirmation email." });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
