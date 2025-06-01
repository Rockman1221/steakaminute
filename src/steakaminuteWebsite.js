import ContactSection from './ContactSection'; // Adjust path if needed
import "./App.css"; 
import React, { useState, useMemo } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const SteakaminuteWebsite = () => {
  const navigate = useNavigate();

  // Product List
  const products = useMemo(() => [
    { id: 1, name: "Ribeye Steak", price: 13.99, img: "/images/ribeye-steak.jpg" },
    { id: 2, name: "T-Bone Steak", price: 13.99, img: "/images/tbone-steak.jpg" },
    { id: 3, name: "Sirloin Steak", price: 13.99, img: "/images/sirloin-steak.jpg" },
    { id: 4, name: "Veal Steak", price: 9.99, img: "/images/veal-steak.jpg" },
    { id: 5, name: "Veal Tomahawk Steak", price: 10.99, img: "/images/veal-tomahawk.jpg" },
  ], []);

  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  const handleQuantityChange = (id, value) => {
    if (value === "") {
      setQuantities((prev) => ({ ...prev, [id]: "" }));
    } else {
      const num = parseInt(value, 10);
      setQuantities((prev) => ({ ...prev, [id]: isNaN(num) ? "" : num }));
    }
  };

  const handleAddToCart = () => {
    const updatedCart = [];
    products.forEach(product => {
      const quantity = quantities[product.id];
      if (quantity > 0) {
        updatedCart.push({ ...product, quantity });
      }
    });

    if (updatedCart.length === 0) {
      alert("Please select at least one product to add to cart.");
      return;
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/checkout");
  };

  return (
    <div className="App">
      {/* === HEADER with logo & nav === */}
      <header className="App-header">
        <img src={logo} alt="Steak A Minute Logo" className="App-logo" />
        <nav className="header-nav">
          <a href="#about" className="header-link">About</a>
          <a href="#contact" className="header-link">Contact</a>
        </nav>
      </header>

      {/* === Hero Section === */}
      <section className="main-content">
        <h2 className="display-4 fw-bold">Fresh Meat Delivered to Your Doorstep</h2>
        <p style={{ color: "#F4E2B0" }}>
          We deliver fresh, high-quality meats to your home.
        </p>
      </section>

      {/* === Shop Section === */}
      <section id="shop" className="py-5" style={{ background: "transparent" }}>
        <Container>
          <h2 className="text-center fw-bold mb-4" style={{ color: "#F4E2B0" }}>Our Meat Selection</h2>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={product.img} className="product-image" />
                  <Card.Body className="text-center">
                    <h4 className="fw-bold">{product.name}</h4>
                    <p style={{ color: "#A52A2A", fontWeight: "bold" }}>${product.price}/lb</p>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={quantities[product.id]}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center">
            <Button variant="success" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </Container>
      </section>

      <ContactSection />
      <section id="contact" className="contact-section py-5 text-center">
  <Container>
    <h2 className="fw-bold">Contact Us</h2>
    <p>Have questions or suggestions? Fill out the form below and we'll get in touch.</p>
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your name" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Your email" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Your message or suggestion" />
      </Form.Group>
      <Button variant="success" type="submit">Send</Button>
    </Form>
  </Container>
</section>
      {/* === About Section === */}
      <section id="about" className="about-section py-5 text-center">
  <Container>
    <h2 className="fw-bold">About Us</h2>
    <p>
      We provide top-quality meats delivered straight to your doorstep.<br/>
      Our commitment is to freshness and convenience.
    </p>
  </Container>
</section>


      {/* === Footer === */}
      <footer>
        <p className="mb-0">&copy; 2025 Steak A Minute. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SteakaminuteWebsite;
