# Flash Sale System

A robust, high-performance API built with Node.js, Express, MongoDB, Mongoose, and TypeScript to simulate flash sale events. This project handles real-time inventory updates, ensures data consistency during flash sales, and provides secure endpoints for purchases and user management.

## Features

- **User Management:**  
  Registration, login (JWT-based authentication), profile updates, and deletion.
- **Product Management:**  
  Create, update, retrieve, and delete products.
- **Flash Sale Simulation:**
  - Create flash sale events with 200 allocated units.
  - Time-restricted flash sale events (predefined start and end times).
  - Real-time stock tracking with atomic updates.
  - Prevent duplicate or overlapping flash sales for the same product.
- **Purchase Handling:**
  - Secure purchase endpoint that only works during an active flash sale event.
  - Atomic stock decrement to avoid over/under purchasing.
  - Security checks such as limiting the maximum purchase quantity per transaction.
  - Leaderboard of purchases.
- **Admin Seeding:**  
  A seeder script to automatically create a default admin user.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/flash-sale-system.git
   cd flash-sale-system
   ```

2. **Install Dependencies:**

   If you use npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Setup Environment Variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/flashsale
   JWT_SECRET=your_jwt_secret
   ```

   Adjust the values as needed (for example, if you are using a cloud MongoDB instance).

## Running the Project

1. **Build and Start the Server:**

for development mode with hot-reloading:

```bash
npm run dev
```

2. **Access the API:**

   The API will be available at `http://localhost:3000`. You can use Postman or any API testing tool to interact with the endpoints.

## Seeding the Database

### Seed Default Admin User

A seeder script is provided to create a default admin user.

1. **Run the Admin Seeder:**

   ```
   npm run seed:admin
   ```

   This creates a default admin user with:

   - **Email:** `admin@gmail.com`
   - **Password:** `1234$Admin` (hashed automatically)

### Seed Products

A product seeder is provided to insert sample products into the database.

1. **Run the Product Seeder:**

   ```
   npm run seed:admin
   ```

   This script creates 15 sample products with varied pricing and real product names.

## API Endpoints

### Users

- **POST /users** - Create a new user.
- **POST /users/login** - Authenticate a user and return a JWT.
- **GET /users/:id** - Get user details.
- **PATCH /users/:id** - Update user details.
- **DELETE /users/:id** - Delete a user.

### Products

- **POST /products** - Create a new product.
- **GET /products** - Get all products.
- **GET /products/:id** - Get a product by ID.
- **PATCH /products/:id** - Update a product.
- **DELETE /products/:id** - Delete a product.

### Flash Sale Events

- **POST /flash-sale** - Create a new flash sale event.  
  _Note: A flash sale event cannot be created if an active or overlapping sale for the same product already exists._
- **GET /flash-sale** - Get active flash sale events (time-restricted).
- **GET /flash-sale/:id** - Get flash sale event details.
- **PATCH /flash-sale/:id** - Update a flash sale event.
- **DELETE /flash-sale/:id** - Delete a flash sale event.

### Purchases

- **POST /purchases** - Create a purchase (only during an active flash sale event).
- **GET /purchases** - Get a paginated list of purchases.
- **GET /purchases/:id** - Get a purchase by ID.
- **PATCH /purchases/:id** - Update a purchase.
- **DELETE /purchases/:id** - Delete a purchase.
- **GET /purchases/leaderboard** - Get a leaderboard of purchases sorted by purchase time.

## Flash Sale Simulation

- **Flash Sale Event Rules:**

  - Each flash sale event is created with 200 allocated units.
  - The sale event is time-restricted (saleStart and saleEnd).
  - A product cannot have overlapping or duplicate active flash sale events.
  - Users can purchase only during an active flash sale (with a one-hour adjusted time).
  - Security checks prevent a user from purchasing more than the allowed units per transaction (e.g., maximum 5 units).

- **Purchase Process:**
  - The system verifies that the flash sale event is active (adjusted by one hour).
  - The stock is atomically decremented to prevent race conditions.
  - Meaningful errors are returned when stock is insufficient, the sale is not active, or if duplicate purchases by the same user occur.

## Conclusion

This project provides a robust API to manage flash sale events and purchase transactions under high traffic conditions. Feel free to extend the functionality, add more validations, and integrate additional security measures as needed.
