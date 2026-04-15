import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { getAvailableSlots } from '../services/api';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await getAvailableSlots();
      setSlots(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching parking slots. Make sure the backend is running.');
      setLoading(false);
    }
  };

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Available Parking Slots</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {slots.length === 0 && !error && <Col><p className="text-center">No slots currently available.</p></Col>}
        {slots.map((slot) => (
          <Col key={slot.id} md={4} className="mb-4">
            <Card className="shadow-sm border-primary">
              <Card.Body>
                <Card.Title>Slot: {slot.slotNumber}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ₹{slot.pricePerHour}/hr
                </Card.Text>
                <Badge bg={slot.available ? "success" : "danger"}>
                  {slot.available ? "Available" : "Occupied"}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ParkingSlots;
