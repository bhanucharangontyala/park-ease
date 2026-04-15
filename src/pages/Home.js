import React from 'react';
import { Badge, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page min-vh-100">
      <section className="hero-section py-5 mb-5">
        <Container className="text-center text-lg-start">
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <Badge bg="light" text="dark" className="hero-badge px-3 py-2 mb-3">
                Smart Parking Platform
              </Badge>
              <h1 className="display-3 fw-bold">Welcome to ParkEase</h1>
              <p className="lead mb-4 text-white-50">
                Public visitors only see Home, Register, and Login. After login, each role is sent to the correct workspace.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center justify-content-lg-start">
                <Button as={Link} to="/register" variant="light" size="lg" className="px-4 gap-3 fw-bold text-primary">
                  Create Account
                </Button>
                <Button as={Link} to="/login" variant="outline-light" size="lg" className="px-4">
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

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
