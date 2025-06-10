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
    <Container className="py-5" style={{ background: "#2d1a09", minHeight: "100vh" }}>
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <div style={{
          background: "#fff8e1",
          borderRadius: "16px",
          boxShadow: "0 8px 36px rgba(0,0,0,0.18)",
          padding: "38px 30px",
          marginBottom: "30px",
        }}>
          <h2 className="text-center mb-4" style={{ color: "#A52A2A", fontWeight: 900, letterSpacing: "1px" }}>Checkout</h2>
  
          <Alert variant="info" className="text-center mb-4" style={{ background: "#F4E2B0", color: "#332010", border: "none", fontWeight: 500 }}>
            • Order by <b>Tuesday</b> for Wed/Thu delivery.<br />
            • Order by <b>Thursday</b> for Fri–Sun delivery.
          </Alert>
  
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold text-danger">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ background: "#fff", borderRadius: "8px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold text-danger">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ background: "#fff", borderRadius: "8px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold text-danger">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ background: "#fff", borderRadius: "8px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold text-danger">Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{ background: "#fff", borderRadius: "8px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
  
            <div className="mb-4">
              <Form.Group>
                <Form.Label className="fw-bold text-danger">Payment Method</Form.Label>
                <Form.Select required style={{ borderRadius: "8px" }}>
                  <option value="">Select Payment Option</option>
                  <option value="interac">Interac e-Transfer (Auto-deposit enabled)</option>
                  <option value="cod">Pay on Delivery</option>
                </Form.Select>
                <Form.Text className="text-muted" style={{ marginLeft: 2, fontSize: "0.97em" }}>
                  For Interac e-Transfer, payments will auto-deposit to steakaminute@gmail.com.
                </Form.Text>
              </Form.Group>
            </div>
  
            <div className="mb-4">
              <h4 className="fw-bold mb-2" style={{ color: "#a85b27" }}>Order Summary:</h4>
              <ul className="list-group mb-3" style={{ borderRadius: "10px", overflow: "hidden" }}>
                {(JSON.parse(localStorage.getItem("cart")) || []).map((item, index) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                    style={{ background: "#fcf3dc", fontWeight: 500, fontSize: "1.06rem" }}>
                    <span>{item.quantity} × {item.name}</span>
                    <span style={{ color: "#A52A2A" }}>${item.price.toFixed(2)} per lb</span>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* --- Packaging Section --- */}
            <div className="d-flex justify-content-center my-4">
              <div
                style={{
                  backgroundColor: "#fff5e6",
                  borderRadius: "12px",
                  padding: "22px 28px",
                  maxWidth: "440px",
                  width: "100%",
                  boxShadow: "0 0 10px rgba(0,0,0,0.06)"
                }}
              >
                <Form.Group className="text-center">
                  <Form.Label className="fw-bold fs-5 text-danger">
                    🥩 How would you like your meat packaged?
                  </Form.Label>
                  <div className="d-flex flex-column align-items-start mt-3">
                    <Form.Check
                      type="radio"
                      id="vacuum-sealed"
                      name="packaging"
                      label="Vacuum-sealed (Free!) 🆓✨"
                      value="vacuum-sealed"
                      checked={packaging === "vacuum-sealed"}
                      onChange={(e) => setPackaging(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      id="simple-bag"
                      name="packaging"
                      label="Simple Bag (Best if cooking within 24 hrs)"
                      value="simple-bag"
                      checked={packaging === "simple-bag"}
                      onChange={(e) => setPackaging(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
  
            <div className="text-center mt-4">
              <Button
                variant="success"
                type="submit"
                disabled={isSubmitting}
                style={{
                  fontWeight: "bold",
                  minWidth: "210px",
                  fontSize: "1.18rem",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px #0001"
                }}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
  
  );
};

export default Checkout;
