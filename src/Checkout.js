import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [packaging, setPackaging] = useState("vacuum-sealed"); // ✅ new state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      setIsSubmitting(false);
      return;
    }

    const orderDetails = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      name,
      email,
      phone,
      address,
      orderDetails,
      packaging, // ✅ include in order data
    };

    try {
      const response = await fetch("https://freshmeathouse.onrender.com/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("✅ Your order has been placed successfully! A confirmation email has been sent.");
        localStorage.removeItem("cart");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPackaging("vacuum-sealed");
        setTimeout(() => {
          navigate("/", { replace: true });
          setIsSubmitting(false);
        }, 300);
      } else {
        const errorResult = await response.json();
        alert(`❌ ${errorResult.message || "Failed to send order confirmation email. Please try again."}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("🚨 Error submitting order:", error);
      alert("⚠️ Something went wrong while placing your order. Please check your information and try again.");
      setIsSubmitting(false);
    }
  };
    
    return (
      <div className="checkout-bg">
        <div className="checkout-card">
          <div className="checkout-heading">Checkout</div>
          <div style={{
            background: "#ecd6a7",
            borderRadius: "14px",
            padding: "18px",
            textAlign: "center",
            marginBottom: 30,
            fontSize: "1.12rem",
            color: "#44210e",
            fontWeight: "600",
            boxShadow: "0 1px 12px #a25a2a11"
          }}>
            • Order by <b>Tuesday</b> for Wed/Thu delivery.<br />
            • Order by <b>Thursday</b> for Fri–Sun delivery.
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="checkout-label">Name</Form.Label>
                  <Form.Control
                    className="checkout-input"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="checkout-label">Email</Form.Label>
                  <Form.Control
                    className="checkout-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="checkout-label">Phone</Form.Label>
                  <Form.Control
                    className="checkout-input"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="checkout-label">Address</Form.Label>
                  <Form.Control
                    className="checkout-input"
                    type="text"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="checkout-label">
                    <strong>Payment Method</strong>
                  </Form.Label>
                  <Form.Select className="checkout-select" required>
                    <option value="">Select Payment Option</option>
                    <option value="interac">Interac e-Transfer (Auto-deposit enabled)</option>
                    <option value="cod">Pay on Delivery</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    For Interac e-Transfer, payments will auto-deposit to steakaminute@gmail.com.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <div className="checkout-section-title">Order Summary:</div>
            <ul className="list-group mb-3">
              {(JSON.parse(localStorage.getItem("cart")) || []).map((item, index) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={index}
                  style={{
                    background: "#fffbe6",
                    borderColor: "#e2c396",
                    color: "#7c4a19",
                    fontWeight: 500,
                    fontSize: "1.05rem"
                  }}>
                  <span>{item.quantity} × {item.name}</span>
                  <span>${item.price.toFixed(2)} per lb</span>
                </li>
              ))}
            </ul>
            {/* --- Stylish Packaging Card --- */}
            <div className="packaging-card">
              <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "#A52A2A", marginBottom: 10 }}>
                🥩 How would you like your meat packaged?
              </div>
              <div className="d-flex flex-column align-items-center mt-2">
                <Form.Check
                  className="packaging-radio"
                  type="radio"
                  id="vacuum-sealed"
                  name="packaging"
                  label="Vacuum-sealed (Free!) 🆓✨"
                  value="vacuum-sealed"
                  checked={packaging === "vacuum-sealed"}
                  onChange={(e) => setPackaging(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <Form.Check
                  className="packaging-radio"
                  type="radio"
                  id="simple-bag"
                  name="packaging"
                  label="Simple Bag (Best if cooking within 24 hrs)"
                  value="simple-bag"
                  checked={packaging === "simple-bag"}
                  onChange={(e) => setPackaging(e.target.value)}
                />
              </div>
            </div>
            {/* --- Place Order Button --- */}
            <div className="text-center">
              <Button
                className="place-order-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
    

};

export default Checkout;
