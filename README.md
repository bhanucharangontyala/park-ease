# ParkEase Frontend - React & Bootstrap

This is the React frontend for the **ParkEase Car Parking Management System**. It is designed to interface with the Spring Boot backend provided.

## 🚀 Getting Started

Follow these steps to set up and run the project:

### 1. Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Spring Boot Backend** (should be running on `http://localhost:8080`)

### 2. Setup
Open your terminal in the `parkease-frontend` folder and run:

```bash
# Install dependencies
npm install

# Start the application
npm start
```

The application will open automatically at `http://localhost:3000`.

## 🛠 Features Included

- **User Management**: Register, Login, and View User/Admin lists.
- **Parking Management**: View available slots, Add/Edit/Delete slots (Admin).
- **Booking Flow**: Select slots, set times, and simulate Razorpay payment integration.
- **Responsive UI**: Built with Bootstrap 5 for a professional, mobile-friendly look.

## 🔗 Backend Configuration
The frontend is configured to talk to the backend at `http://localhost:8080`. If your backend is running on a different port, update the `API_BASE_URL` in:
`src/services/api.js`

## 💳 Payment Simulation
The booking page includes a simulation of the Razorpay flow:
1. Calls `/api/booking/create` to get an Order ID.
2. Simulates the user completing the payment.
3. Calls `/api/payment/verify` to confirm the transaction in the backend.

---
**Note**: Ensure your backend has **CORS** enabled to allow requests from `http://localhost:3000`. Add this to your Spring Boot configuration or Controller:
`@CrossOrigin(origins = "http://localhost:3000")`
