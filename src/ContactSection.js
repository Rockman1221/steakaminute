// src/ContactSection.js

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://freshmeathouse.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        toast.success("Thank you for your message! We will get back to you soon.", {
          position: "top-center",
          autoClose: 2400,
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send your message. Please try again later.", {
          position: "top-center",
          autoClose: 3200,
        });
      }
    } catch (error) {
      console.error("Error sending contact data:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3500,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--dark-bg, #18110a)",
        color: "var(--logo-cream, #F4E2B0)",
        padding: "64px 0",
        borderTop: "4px solid var(--logo-red, #A52A2A)",
      }}
      className="text-center"
    >
      <Container>
        <h2 className="fw-bold mb-2" style={{ color: "var(--logo-cream, #F4E2B0)" }}>
          Contact Us
        </h2>
        <p style={{ color: "var(--logo-cream, #F4E2B0)", opacity: 0.8 }}>
          Have questions or suggestions? Fill out the form below and we'll get in touch.
        </p>
        <Form
          onSubmit={handleContactSubmit}
          style={{ maxWidth: 900, margin: "0 auto", textAlign: "left" }}
        >
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="contactName">
                <Form.Label style={{ color: "var(--logo-cream, #F4E2B0)" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    background: "#332010",
                    color: "var(--logo-cream, #F4E2B0)",
                    border: "1.5px solid var(--logo-red, #A52A2A)",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="contactEmail">
                <Form.Label style={{ color: "var(--logo-cream, #F4E2B0)" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    background: "#332010",
                    color: "var(--logo-cream, #F4E2B0)",
                    border: "1.5px solid var(--logo-red, #A52A2A)",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="contactMessage" className="mb-3">
            <Form.Label style={{ color: "var(--logo-cream, #F4E2B0)" }}>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Your message or suggestion"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{
                background: "#332010",
                color: "var(--logo-cream, #F4E2B0)",
                border: "1.5px solid var(--logo-red, #A52A2A)",
              }}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="danger"
              type="submit"
              disabled={isSubmitting}
              style={{
                background: "var(--logo-red, #A52A2A)",
                border: "none",
                fontWeight: 700,
                padding: "10px 36px",
                borderRadius: "8px",
                transition: "all 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
                pointerEvents: isSubmitting ? "none" : "auto"
              }}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </Form>
        {/* Toast notifications will appear here */}
        <ToastContainer />
      </Container>
    </section>
  );
};

export default ContactSection;
