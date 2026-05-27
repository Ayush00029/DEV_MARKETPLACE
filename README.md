# Developer Marketplace

A full-stack Developer Marketplace application built with the MERN stack (MongoDB, Express, React, Node.js). It features a robust backend with secure authentication, role-based access control, a visual shopping cart system, checkout sequencing, and an administration control panel.

## Architecture and Workflow

The following diagram illustrates the role-based workflow and feature paths for standard developers versus platform administrators:

```mermaid
flowchart TD
    Start[User Visit / Register] --> Login[Sign In / Auth Portal]
    Login --> RoleDecision{Check User Role}
    
    RoleDecision -->|Standard User| UserFlow[Marketplace Dashboard]
    UserFlow -->|Browse Templates| ListProjects[Product Listings]
    ListProjects -->|Add to Cart| Cart[Cart Drawer]
    Cart -->|Proceed to Checkout| Checkout[Secure Checkout Page]
    Checkout -->|Pay & Capture| Success[Order Confirmed]
    Success -->|Clone Templates| MyProjects[My Projects Console]
    MyProjects -->|Track Completion| TrackProgress[Track Progress & Status]
    
    RoleDecision -->|Administrator| AdminFlow[Admin Dashboard]
    AdminFlow -->|View Stats| Metrics[Platform Metrics & Analytics]
    AdminFlow -->|Manage Accounts| DevMgmt[Developers Management]
    DevMgmt -->|Toggle Admin/User Role| ToggleRole[Modify User Roles]
    DevMgmt -->|Cascade Account Deletion| DeleteAccount[Delete Users & Associated Listings]
    AdminFlow -->|Moderate Marketplace| ProjMod[Project Moderation]
    ProjMod -->|Cascade Delete Listing| DeleteListing[Remove Projects]
    
    classDef user fill:#3b82f6,stroke:#1d4ed8,color:#fff;
    classDef admin fill:#ef4444,stroke:#b91c1c,color:#fff;
    classDef neutral fill:#475569,stroke:#1e293b,color:#fff;
    
    class Start,Login,RoleDecision neutral;
    class UserFlow,ListProjects,Cart,Checkout,Success,MyProjects,TrackProgress user;
    class AdminFlow,Metrics,DevMgmt,ToggleRole,DeleteAccount,ProjMod,DeleteListing admin;
```

---

## Key Features

### User Capabilities
- **Marketplace Dashboard**: Search, filter by category, and browse listed codebase templates.
- **Sell Form**: List projects for sale specifying price, description, live links, and tech stacks.
- **Shopping Cart**: Dynamic sidebar drawer to add multiple templates, view running subtotals, and remove items.
- **Secure Checkout Sequence**: Complete shipping, billing, and mock 256-bit encrypted credit card validation.
- **My Projects Tracker**: Access cloned templates, customize completion progress rates, and manage development status (In Progress, Completed, Saved).

### Admin Capabilities
- **Admin Control Panel**: View real-time platform metrics including total active users, listed inventory size, active categories, and total portfolio valuation.
- **Developer Management**: View registered developer directory, promote/demote users between administrator and standard roles, and delete user accounts.
- **Moderation Controls**: Moderate projects by deleting listings directly from the platform.
- **Access Restrictions**: Administrators are strictly blocked from listing projects, adding items to the cart, viewing the checkout sequence, or accessing personal project consoles.

---

## Tech Stack

### Frontend
- React 19
- Vite
- Lucide React (Icons)
- Custom CSS

### Backend
- Node.js & Express (v5)
- MongoDB & Mongoose
- JSON Web Token (JWT) for authentication
- bcryptjs for password hashing

---

## Project Directory Structure

- `/frontend` - Contains the React client application, components, styling, and routes.
- `/backend` - Contains the Node/Express server, database models, controllers, and admin routes.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance running on port 27017 or a remote Atlas connection string)

### Installation and Setup

1. **Setup Backend Environment**:
   Create a `.env` file inside the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/dev_marketplace
   JWT_SECRET=your_jwt_secret_key_here
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

### Database Seeding
To populate the database with initial developer accounts and template listings, run the database seed script:
```bash
cd ../backend
npm run seed
```

This generates two pre-configured accounts:
- **Admin Account**: `admin@example.com` / password: `admin123`
- **Standard User**: `jane@example.com` / password: `developer123`

### Running the Application Locally

1. **Start the Express API Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend Vite Server**:
   ```bash
   cd ../frontend
   npm run dev
   ```

   The client application will run on `http://localhost:5173/`.
