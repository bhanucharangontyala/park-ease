import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5 mb-5 shadow-sm">
        <Container>
          <h1 className="display-3 fw-bold">Welcome to ParkEase</h1>
          <p className="lead mb-4">Hassle-free car parking solutions at your fingertips.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button as={Link} to="/booking" variant="light" size="lg" className="px-4 gap-3 fw-bold text-primary">Book a Slot Now</Button>
            <Button as={Link} to="/slots" variant="outline-light" size="lg" className="px-4">View Available Slots</Button>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="mb-3 text-primary fs-1">🚗</div>
                <Card.Title className="fw-bold">Easy Booking</Card.Title>
                <Card.Text>Reserve your parking space in seconds from anywhere, anytime.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="mb-3 text-primary fs-1">💳</div>
                <Card.Title className="fw-bold">Secure Payment</Card.Title>
                <Card.Text>Integrated with Razorpay for safe and seamless digital transactions.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="mb-3 text-primary fs-1">🏢</div>
                <Card.Title className="fw-bold">Smart Management</Card.Title>
                <Card.Text>Real-time updates on slot availability across multiple floors.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <Container>
          <p className="mb-0">© 2026 ParkEase. All Rights Reserved.</p>
          <small className="text-muted">Developed for Smart Parking Solutions</small>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
