import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { createBooking, verifyPayment, getAvailableSlots } from '../services/api';
import { loadScript } from '../services/scriptLoader';

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    slotId: '',
    startTime: '',
    endTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await getAvailableSlots();
        setSlots(response.data);
      } catch (err) {
        setError('Error fetching slots. Please check your connection.');
      }
    };
    fetchSlots();

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setFormData(prev => ({ ...prev, userId: user.id }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Step 0: Ensure Razorpay script is loaded
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      setError('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create Booking & Razorpay Order from Backend
      console.log("Sending booking request with data:", formData);
      const response = await createBooking(formData);
      console.log("Backend Response:", response.data);
      
      // IMPORTANT: Field mapping check.
      // Your backend DTO might use different names (e.g., razorpayOrderId vs orderId)
      const { razorpayOrderId, amount, paymentId, currency } = response.data;

      if (!razorpayOrderId) {
        throw new Error("Backend did not return a razorpayOrderId. Check backend logs.");
      }

      // Step 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_SauO5cr62cK57R", 
        amount: amount, 
        currency: currency || "INR",
        name: "ParkEase",
        description: "Parking Slot Booking",
        order_id: razorpayOrderId, 
        handler: async function (response) {
          console.log("Payment Successful, Response:", response);
          const razorpayPaymentId = response.razorpay_payment_id;
          
          try {
            // Step 3: Verify Payment in Backend
            const verificationResponse = await verifyPayment(paymentId, razorpayPaymentId);
            if (verificationResponse.data) {
              setSuccess('Booking and Payment Successful! Your slot is confirmed.');
            } else {
              setError('Payment verification failed on server.');
            }
          } catch (err) {
            console.error("Verification Error:", err);
            setError('Error during payment verification.');
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem('user'))?.userName || "User",
          email: JSON.parse(localStorage.getItem('user'))?.email || "user@example.com",
          contact: JSON.parse(localStorage.getItem('user'))?.phoneNo || ""
        },
        theme: {
          color: "#0d6efd"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log("Checkout modal closed by user");
          }
        }
      };

      if (typeof window.Razorpay === 'undefined') {
        setError('Razorpay is not available. Please try again.');
        return;
      }

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error("Payment Failed Event:", response.error);
        setError(`Payment Failed: ${response.error.description} (Code: ${response.error.code})`);
      });

      rzp.open();

    } catch (err) {
      console.error("Booking Logic Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Unknown error";
      setError(`Booking failed: ${errorMessage}. Check browser console (F12) for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-4">Book a Parking Slot</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            {!localStorage.getItem('user') && (
              <Alert variant="warning">Please <a href="/login">login</a> first to book a slot.</Alert>
            )}

            <Form onSubmit={handleBooking}>
              <Form.Group className="mb-3">
                <Form.Label>Select Slot</Form.Label>
                <Form.Select name="slotId" onChange={handleChange} required>
                  <option value="">Choose a slot...</option>
                  {slots.map(slot => (
                    <option key={slot.id} value={slot.id}>
                      Slot {slot.slotNumber} - ₹{slot.pricePerHour}/hr ({slot.slotType})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="datetime-local" name="startTime" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="datetime-local" name="endTime" onChange={handleChange} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading || !localStorage.getItem('user')}>
                {loading ? <Spinner size="sm" /> : 'Pay & Confirm Booking'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
