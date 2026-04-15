import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Tabs, Tab, Row, Col, Card } from 'react-bootstrap';
import { getAllSlots, getAllUsers, addSlot, deleteSlot, updateSlot } from '../services/api';

const AdminDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSlot, setNewSlot] = useState({ slotNumber: '', slotType: 'CAR', floor: '', pricePerHour: '', available: true });
  const [editingSlotId, setEditingSlotId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const slotRes = await getAllSlots();
      const userRes = await getAllUsers();
      setSlots(slotRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  const handleSaveSlot = async () => {
    try {
      if (editingSlotId) {
        await updateSlot(editingSlotId, newSlot);
      } else {
        await addSlot(newSlot);
      }
      setShowModal(false);
      fetchData();
      resetForm();
    } catch (err) {
      alert('Error saving slot. Please try again.');
    }
  };

  const handleDeleteSlot = async (id) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      try {
        await deleteSlot(id);
        fetchData();
      } catch (err) {
        alert('Error deleting slot.');
      }
    }
  };

  const handleEditSlot = (slot) => {
    setEditingSlotId(slot.id);
    setNewSlot({ ...slot });
    setShowModal(true);
  };

  const resetForm = () => {
    setNewSlot({ slotNumber: '', slotType: 'CAR', floor: '', pricePerHour: '', available: true });
    setEditingSlotId(null);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Tabs defaultActiveKey="slots" className="mb-4">
        <Tab eventKey="slots" title="Parking Slots">
          <Button variant="success" className="mb-3" onClick={() => { resetForm(); setShowModal(true); }}>Add New Slot</Button>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Slot </th>
                <th>Price per hr</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map(slot => (
                <tr key={slot.id}>
                  <td>{slot.id}</td>
                  <td>{slot.slotNumber}</td>
                  <td>₹{slot.pricePerHour}</td>
                  <td>{slot.available ? 'Available' : 'Occupied'}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditSlot(slot)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteSlot(slot.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        
        <Tab eventKey="users" title="Users Management">
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* Add/Edit Slot Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSlotId ? 'Edit Slot' : 'Add New Slot'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Slot Number</Form.Label>
              <Form.Control type="text" value={newSlot.slotNumber} onChange={(e) => setNewSlot({...newSlot, slotNumber: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price Per Hour</Form.Label>
              <Form.Control type="number" value={newSlot.pricePerHour} onChange={(e) => setNewSlot({...newSlot, pricePerHour: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveSlot}>Add</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
