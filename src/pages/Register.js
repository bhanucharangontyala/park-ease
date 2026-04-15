import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNo: '',
    role: 'USER'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login', { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="auth-page d-flex justify-content-center align-items-center py-5">
      <Card className="auth-card auth-card-wide p-4 shadow-lg">
        <h3 className="text-center mb-2">Create an Account</h3>
        <p className="text-center text-muted mb-4">Register first, then continue to login and your role-based dashboard.</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="userName" placeholder="Enter full name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button variant="success" type="submit" className="w-100 py-2">
            Register
          </Button>
        </Form>
        <p className="text-center text-muted mt-4 mb-0">
          Already registered? <Link to="/login">Go to login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Register;
