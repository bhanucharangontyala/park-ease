import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Navbar';
import ProtectedRoute, { PublicOnlyRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ParkingSlots from './pages/ParkingSlots';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/slots" element={<ParkingSlots />} />
              <Route path="/booking" element={<Booking />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
