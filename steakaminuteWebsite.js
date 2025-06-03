import React, { useState, useMemo } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ContactSection from "./ContactSection"; // Make sure this path matches your file structure

const steakaminuteWebsite = () => {
  const navigate = useNavigate();

  // ✅ Product List
  const products = useMemo(() => [
    { id: 1, name: "Ribeye Steak", price: 11.99, img: "/images/ribeye-steak.jpg" },
    { id: 2, name: "T-Bone Steak", price: 11.99, img: "/images/tbone-steak.jpg" },
    { id: 3, name: "Sirloin Steak", price: 11.99, img: "/images/sirloin-steak.jpg" }
  ], []);

  // ✅ Cart State
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1 });

  // ✅ Handle Quantity Change
  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({ ...prev, [id]: parseInt(value) || 1 }));
  };

  // ✅ Handle Add to Cart
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

    console.log("🛒 Cart Updated:", updatedCart);
    navigate("/checkout");
  };

  return (
    <div>
      {/* === Header Section (updated) === */}
      <header
        style={{
          background: "var(--logo-brown, #231709)",
          color: "var(--logo-cream, #F4E2B0)",
          borderBottom: "6px solid var(--logo-red, #A52A2A)",
          padding: "2.5rem 1rem 1.5rem 1rem",
          textAlign: "center",
          letterSpacing: "0.08em",
          boxShadow: "0 4px 12px rgba(59,38,21,0.07)"
        }}
      >
        <h1
          className="fw-bold"
          style={{
            fontFamily: "'Oswald', 'Montserrat', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "2.8rem",
            color: "var(--logo-red, #A52A2A)",
            textShadow: "0 2px 10px #23170955"
          }}
        >
          Steak A Minute
        </h1>
        <nav style={{ marginTop: "1.1rem" }}>
          <a
            href="#about"
            style={{
              color: "var(--logo-cream, #F4E2B0)",
              margin: "0 20px",
              fontWeight: 600,
              fontSize: "1.05rem",
              letterSpacing: "0.03em",
              textDecoration: "none",
              transition: "color 0.2s"
            }}
            onMouseOver={e => e.target.style.color = "var(--logo-red, #A52A2A)"}
            onMouseOut={e => e.target.style.color = "var(--logo-cream, #F4E2B0)"}
          >
            About
          </a>
          <a
            href="#contact"
            style={{
              color: "var(--logo-cream, #F4E2B0)",
              margin: "0 20px",
              fontWeight: 600,
              fontSize: "1.05rem",
              letterSpacing: "0.03em",
              textDecoration: "none",
              transition: "color 0.2s"
            }}
            onMouseOver={e => e.target.style.color = "var(--logo-red, #A52A2A)"}
            onMouseOut={e => e.target.style.color = "var(--logo-cream, #F4E2B0)"}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* === Hero Section === */}
      <section className="text-center py-5 bg-light">
        <h2 className="display-4 fw-bold">Fresh Meat Delivered to Your Doorstep</h2>
        <p className="text-muted">We deliver fresh, high-quality meats to your home.</p>
      </section>

      {/* === Shop Section === */}
      <section id="shop" className="py-5 bg-white">
        <Container>
          <h2 className="text-center fw-bold mb-4">Our Meat Selection</h2>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={product.img} className="product-image" />
                  <Card.Body className="text-center">
                    <h4 className="fw-bold">{product.name}</h4>
                    <p className="text-danger fw-bold">${product.price}/lb</p>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
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
              Add to Cart & Checkout
            </Button>
          </div>
        </Container>
      </section>

      




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
           every cut you receive is hand-selected, expertly prepared, and <b>never frozen</b>. Our commitment is to deliver <b>premium, best steaks</b> to your door, always fresh and bursting with flavor.<br /><br />
          <strong>We don’t just deliver meat—we deliver an experience:</strong><br />
          <ul style={{ color: "#ffe49b", paddingLeft: "1.2em" }}>
            <li><b>Unmatched Freshness:</b> Your order is cut, packed, and dispatched within hours, not days.</li>
            <li><b>Local Quality:</b> By choosing Steakaminute get meat sourced right from local Ontario.</li>
            <li><b>Pure Health:</b> We believe that great steak is the foundation of a healthier, more energetic life. No shortcuts, no compromises—just honest food you can trust.</li>
          </ul>
          With Steakaminute, you’re not settling for ordinary—you’re choosing the highest standard of quality, convenience, and care.<br />
          <b>Taste the difference. Feel the difference. Experience the local advantage with Steakaminute.</b>
        </p>
      </Col>
    </Row>
  </Container>
</section>


      {/* === Footer Section (updated) === */}
      <footer
        style={{
          background: "var(--logo-brown, #231709)",
          color: "var(--logo-cream, #F4E2B0)",
          textAlign: "center",
          padding: "1.2rem 0 0.7rem 0",
          fontSize: "1.1rem",
          borderTop: "5px solid var(--logo-red, #A52A2A)",
          letterSpacing: "0.06em"
        }}
      >
        <p className="mb-0" style={{ opacity: 0.9 }}>
          &copy; 2025 Steak A Minute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default steakaminuteWebsite;
