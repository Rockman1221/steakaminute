import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactSection = () => {
  // Local state for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to your backend endpoint (make sure this endpoint exists)
      const response = await fetch('https://freshmeathouse.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending contact data:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-5 bg-white text-center">
      <Container>
        <h2 className="fw-bold">Contact Us</h2>
        <p className="text-muted">
          Have questions or suggestions? Fill out the form below and we'll get in touch.
        </p>
        <Form onSubmit={handleContactSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="contactName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="contactEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="contactMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Your message or suggestion"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default ContactSection;
