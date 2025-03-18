require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// POST route to handle order emails
app.post("/send-order", async (req, res) => {
  const { name, email, phone, address, orderDetails } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Corrected Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${email}, ${process.env.EMAIL_USER}`,
      subject: "New Order Confirmation - Fresh Meat House",
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you, <strong>${name}</strong>, for your order!</p>
        <h3>Order Details:</h3>
        ${orderDetails.map(item => `
          <p>${item.quantity} x ${item.name} - $${item.price.toFixed(2)} per lb</p>
        `).join('')}
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Delivery Address:</strong> ${address}</p>
        <p>We'll contact you shortly with the total price after weighing your order.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Order confirmation email sent successfully!");
    res.status(200).json({ message: "Order email sent successfully." });

  } catch (error) {  // ✅ Added missing `catch` block
    console.error("🚨 Error sending email:", error);
    res.status(500).json({ message: "Failed to send order email." });
  }
}); // ✅ Added missing closing bracket here

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
