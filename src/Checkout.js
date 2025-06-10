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
    
      <div style={{ background: "#FFF8E1", minHeight: "100vh", padding: "0" }}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 6px 32px rgba(0,0,0,0.11)",
                padding: "36px 30px",
                marginBottom: "30px",
                border: "2px solid #F4E2B0"
              }}>
                <h2 className="text-center mb-4" style={{ color: "#A52A2A", fontWeight: 900, letterSpacing: "1px" }}>Checkout</h2>
    
                <Alert variant="info" className="text-center mb-4"
                  style={{
                    background: "#F4E2B0",
                    color: "#332010",
                    border: "none",
                    fontWeight: 500,
                    borderRadius: "10px"
                  }}>
                  • Order by <b>Tuesday</b> for Wed/Thu delivery.<br />
                  • Order by <b>Thursday</b> for Fri–Sun delivery.
                </Alert>
    
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold" style={{ color: "#A52A2A" }}>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          style={{ background: "#FFF8E1", borderRadius: "8px" }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold" style={{ color: "#A52A2A" }}>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ background: "#FFF8E1", borderRadius: "8px" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
    
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold" style={{ color: "#A52A2A" }}>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          style={{ background: "#FFF8E1", borderRadius: "8px" }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold" style={{ color: "#A52A2A" }}>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your delivery address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          style={{ background: "#FFF8E1", borderRadius: "8px" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
    
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label className="fw-bold" style={{ color: "#A52A2A" }}>Payment Method</Form.Label>
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
    
                  {/* Order Summary */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-2" style={{ color: "#A52A2A", letterSpacing: "0.5px" }}>Order Summary:</h4>
                    <ul className="list-group mb-3" style={{ borderRadius: "10px", overflow: "hidden" }}>
                      {(JSON.parse(localStorage.getItem("cart")) || []).map((item, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center"
                          key={index}
                          style={{ background: "#fff9e5", fontWeight: 500, fontSize: "1.06rem" }}>
                          <span>{item.quantity} × {item.name}</span>
                          <span style={{ color: "#A52A2A" }}>${item.price.toFixed(2)} per lb</span>
                        </li>
                      ))}
                    </ul>
                  </div>
    
                  {/* Packaging Section */}
                  <div className="d-flex justify-content-center my-4">
                    <div
                      style={{
                        backgroundColor: "#fff8e1",
                        borderRadius: "14px",
                        padding: "25px 32px",
                        maxWidth: "470px",
                        width: "100%",
                        boxShadow: "0 2px 12px rgba(165,42,42,0.11)",
                        border: "1.5px solid #F4E2B0"
                      }}
                    >
                      <Form.Group className="text-center">
                        <Form.Label className="fw-bold fs-5" style={{ color: "#A52A2A" }}>
                          🥩 How would you like your meat packaged?
                        </Form.Label>
                        <div className="d-flex flex-column align-items-start mt-3 gap-2">
                          <Form.Check
                            type="radio"
                            id="vacuum-sealed"
                            name="packaging"
                            label={<span><span role="img" aria-label="vacuum">🆓✨</span> <b>Vacuum-sealed</b> <span style={{ color: "#007b3c", fontWeight: 500 }}>(Free!)</span></span>}
                            value="vacuum-sealed"
                            checked={packaging === "vacuum-sealed"}
                            onChange={(e) => setPackaging(e.target.value)}
                            style={{ fontWeight: 500, fontSize: "1.1em" }}
                          />
                          <Form.Check
                            type="radio"
                            id="simple-bag"
                            name="packaging"
                            label={<span><span role="img" aria-label="bag">🛍️</span> <b>Simple Bag</b> <span style={{ color: "#a85b27", fontWeight: 500 }}>(Best if cooking within 24 hrs)</span></span>}
                            value="simple-bag"
                            checked={packaging === "simple-bag"}
                            onChange={(e) => setPackaging(e.target.value)}
                            style={{ fontWeight: 500, fontSize: "1.1em" }}
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
      </div>
    );
    
  

};

export default Checkout;
