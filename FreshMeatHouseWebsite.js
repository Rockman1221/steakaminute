import React, { useState, useMemo } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FreshMeatHouseWebsite = () => {
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
      {/* ✅ Header Section */}
      <header className="bg-danger text-white p-4 text-center">
        <h1 className="fw-bold">Fresh Meat House</h1>
        <nav>
          <a href="#about" className="text-white mx-3">About</a>
          <a href="#contact" className="text-white mx-3">Contact</a>
        </nav>
      </header>

      {/* ✅ Hero Section */}
      <section className="text-center py-5 bg-light">
        <h2 className="display-4 fw-bold">Fresh Meat Delivered to Your Doorstep</h2>
        <p className="text-muted">We deliver fresh, high-quality meats to your home.</p>
      </section>

      {/* ✅ Shop Section */}
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
                    
                    {/* ✅ Quantity Selector */}
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

      {/* ✅ About Section */}
      <section id="about" className="py-5 bg-light text-center">
        <Container>
          <h2 className="fw-bold">About Us</h2>
          <p className="text-muted">We provide top-quality meats delivered straight to your doorstep. Our commitment is to freshness and convenience.</p>
        </Container>
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="py-5 bg-white text-center">
        <Container>
          <h2 className="fw-bold">Contact Us</h2>
          <p className="text-muted">Have questions? Contact us for more details about our products or delivery services.</p>
        </Container>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-danger text-white text-center py-3">
        <p className="mb-0">&copy; 2025 Fresh Meat House. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FreshMeatHouseWebsite;
