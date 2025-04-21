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
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
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

            <p><strong>Here’s what you ordered:</strong></p>
            <ul>
              ${orderDetails.map(item => `<li>${item.quantity} × ${item.name} — $${item.price.toFixed(2)} per lb</li>`).join("")}
            </ul>

            <p><strong>Packaging preference:</strong> ${packaging === "simple-bag" ? "Simple Bag" : "Vacuum-sealed"}</p>

            <p><strong>Delivery address:</strong> ${address}</p>
            <p><strong>Phone number:</strong> ${phone}</p>

            <p>If you have any questions or updates, feel free to reply to this email directly.</p>

            <p>Thanks again,</p>
            <p>– The Steak A Minute Team</p>

            <hr>
            <p style="font-size: 0.9em; color: #555;">
              Tip: Add this email (steakaminute@gmail.com) to your contacts so future updates land in your inbox.
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
