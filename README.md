# DEV MARKETPLACE

A full-stack Developer Marketplace application built with the MERN stack (MongoDB, Express, React, Node.js). It features a robust backend with secure authentication and a responsive frontend using React and Vite.

## Tech Stack

**Frontend:**
- React (v19)
- Vite
- Custom CSS

**Backend:**
- Node.js & Express (v5)
- MongoDB & Mongoose
- JSON Web Token (JWT) for authentication
- bcryptjs for password hashing

## Project Structure

- `/frontend` - Contains the Vite/React application
- `/backend` - Contains the Express server, MongoDB models, and API routes

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local instance or MongoDB Atlas connection string)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayush00029/DEV_MARKETPLACE.git
   cd DEV_MARKETPLACE
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the `backend` directory and add your environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).*

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```

## License

This project is licensed under the ISC License.
