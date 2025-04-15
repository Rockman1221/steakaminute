import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
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
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorResult = await response.json();
        alert(`❌ ${errorResult.message || "Failed to send order confirmation email. Please try again."}`);
      }
    } catch (error) {
      console.error("🚨 Error submitting order:", error);
      alert("⚠️ Something went wrong while placing your order. Please check your information and try again.");
    }
    
  }; 

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Checkout</h2>

      <Alert variant="info" className="text-center">

  <br />
  • Order by Tuesday for Wed/Thu delivery.
  <br />
  • Order by Thursday for Fri–Sun delivery.
  <br />
    FRESH MEAT ARRIVES EVERY WED & FRI.


  📍 <strong>Note:</strong> Delivery is currently available <strong>only in Waterloo.</strong>
</Alert>

        
      

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
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
              <Form.Label>Email</Form.Label>
              <Form.Control
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
      <Form.Label>Phone</Form.Label>
      <Form.Control
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
  <Form.Label>Address</Form.Label>
  <Form.Control
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
      <Form.Label><strong>Payment Method</strong></Form.Label>
      <Form.Select required>
        <option value="">Select Payment Option</option>
        <option value="interac">Interac e-Transfer (Auto-deposit enabled)</option>
        <option value="cod">Cash on Delivery (COD)</option>
      </Form.Select>
      <Form.Text className="text-muted">
        For Interac e-Transfer, payments will auto-deposit to araankhan437@gmail.com.
      </Form.Text>
    </Form.Group>
  </Col>
</Row>


        <h4 className="mt-4">Order Summary:</h4>
        <ul className="list-group mb-3">
          {(JSON.parse(localStorage.getItem("cart")) || []).map((item, index) => (
            <li className="list-group-item d-flex justify-content-between" key={index}>
              <span>{item.quantity} × {item.name}</span>
              <span>${item.price.toFixed(2)} per lb</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Button variant="success" type="submit">
            {/* ✅ Packaging Preference (Free vacuum-sealed option for customers) */}
<Row className="my-4">
  <Col md={12}>
    <Form.Group>
      <Form.Label className="fw-bold">
        🥩 How would you like your meat packaged?
      </Form.Label>
      <Form.Check
        type="radio"
        id="vacuum-sealed"
        name="packaging"
        label="Vacuum-sealed ( Free!) 🆓✨"
        defaultChecked
      />
      <Form.Check
        type="radio"
        id="simple-bag"
        name="packaging"
        label="Simple Bag (Best if cooking within 24 hrs)"
      />
    </Form.Group>
  </Col>
</Row>

            Place Order
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Checkout;
