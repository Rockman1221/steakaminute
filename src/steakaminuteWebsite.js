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
      {/* === About Section === */}
      <section id="about" className="about-section py-5" style={{ background: "#3a220f" }}>
  <Container>
    <Row className="align-items-center">
      <Col md={6} className="mb-4 mb-md-0 d-flex justify-content-center">
        <video
          src="/steakaminute.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            maxWidth: "390px",
            borderRadius: "16px",
            boxShadow: "0 6px 32px rgba(0,0,0,0.15)",
            border: "4px solid #a85b27"
          }}
        />
      </Col>
      <Col md={6}>
        <h2 className="fw-bold mb-3" style={{ color: "#ffe49b" }}>Our Mission</h2>
        <p style={{ fontSize: "1.15rem", color: "#ffe49b" }}>
          At <strong>Steakaminute</strong>, we’re on a mission to revolutionize the way you enjoy steak at home.<br /><br />
          Every cut you receive is hand-selected, expertly prepared, and <b>never frozen</b>. Our commitment is to deliver <b>premium, best steaks</b> to your door, always fresh and bursting with flavor.<br /><br />
          <strong>We don’t just deliver meat—we deliver an experience:</strong>
        </p>
        <ul style={{ color: "#ffe49b", paddingLeft: "1.2em", fontSize: "1.08rem" }}>
          <li><b>Unmatched Freshness:</b> Your order is cut, packed, and dispatched within hours, not days.</li>
          <li><b>Local Quality:</b> By choosing Steakaminute, you get meat sourced right from local Ontario.</li>
          <li><b>Pure Health:</b> We believe that great steak is the foundation of a healthier, more energetic life. No shortcuts, no compromises—just honest food you can trust.</li>
        </ul>
        <p style={{ fontSize: "1.15rem", color: "#ffe49b" }}>
          With Steakaminute, you’re not settling for ordinary—you’re choosing the highest standard of quality, convenience, and care.<br />
          <b>Taste the difference. Feel the difference. Experience the local advantage with Steakaminute.</b>
        </p>
      </Col>
    </Row>
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