import React from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getStoredUser } from '../utils/auth';

const UserDashboard = () => {
  const user = getStoredUser();

  return (
    <div className="app-page-shell">
      <Container className="py-5">
        <section className="dashboard-hero mb-4">
          <div>
            <Badge bg="light" text="dark" className="text-uppercase fw-semibold px-3 py-2 mb-3">
              User Workspace
            </Badge>
            <h1 className="display-6 fw-bold mb-3">
              Welcome back{user?.userName || user?.name ? `, ${user.userName || user.name}` : ''}.
            </h1>
            <p className="lead text-muted mb-0">
              Manage parking availability, start bookings, and continue payments from one place.
            </p>
          </div>
        </section>

        <Row className="g-4">
          <Col md={6}>
            <Card className="dashboard-card h-100">
              <Card.Body className="p-4">
                <span className="dashboard-card-label">Availability</span>
                <Card.Title className="fs-3 mt-2">Browse open parking slots</Card.Title>
                <Card.Text className="text-muted">
                  View current availability, floor details, and pricing before you start a booking.
                </Card.Text>
                <Button as={Link} to="/slots" variant="primary">
                  View Parking Slots
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="dashboard-card h-100">
              <Card.Body className="p-4">
                <span className="dashboard-card-label">Payments</span>
                <Card.Title className="fs-3 mt-2">Create and confirm a booking</Card.Title>
                <Card.Text className="text-muted">
                  Proceed with the existing Razorpay-based booking flow without changing backend behavior.
                </Card.Text>
                <Button as={Link} to="/booking" variant="outline-primary">
                  Go To Booking
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
