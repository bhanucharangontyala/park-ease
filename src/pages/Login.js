import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { getDefaultRouteForUser } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser(email, password);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate(getDefaultRouteForUser(response.data), { replace: true });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container className="auth-page d-flex justify-content-center align-items-center py-5">
      <Card className="auth-card p-4 shadow-lg">
        <h3 className="text-center mb-2">Login to ParkEase</h3>
        <p className="text-center text-muted mb-4">Sign in to continue to your user or admin workspace.</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 py-2">
            Login
          </Button>
        </Form>
        <p className="text-center text-muted mt-4 mb-0">
          Need an account? <Link to="/register">Register here</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
