# Gym-Ecom Backend API

The core REST API powering the Gym E-commerce platform. Built with Express and MongoDB to provide highly robust data management for products, categories, and orders.

## 🚀 Technologies

- **Server**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Authentication**: [JWT](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **Utility**: [Express Async Handler](https://www.npmjs.com/package/express-async-handler), [Express Validator](https://express-validator.github.io/docs/)

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

## 📦 Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd gym-ecom-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   DB_URI = 'your_mongodb_connection_string'
   PORT = 4000
   NODE_ENV = 'development'
   JWT_SECRET = 'your_super_secret_key'
   ```

## 🚀 Running the Project

- **Development Mode**:
  ```bash
  npm run start
  ```
  *(Uses nodemon for automatic restarts)*

## 🛣️ API Endpoints

### Categories
- `GET /api/categories` - Fetch all categories
- `GET /api/categories/:id` - Fetch single category
- `POST /api/categories` - Create new category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Products
- `GET /api/products` - Fetch all products (with pagination/filters)
- `GET /api/products/:id` - Fetch single product
- `GET /api/products/category/:name` - Fetch products by category
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:productId` - Update product (Admin)
- `DELETE /api/products/:productId` - Delete product (Admin)

### Authentication
- `POST /api/users/login` - User/Admin login
- `POST /api/users/register` - Create new account

## ✨ Key Features

- **Robust Error Handling**: Centralized middleware for persistent error tracking.
- **Bulk Product Updates**: Automatically link products to categories.
- **Dual Category Lookup**: Search products by both ObjectID and Name for maximum compatibility.
- **Image Optimization**: Structured image path management for cross-project accessibility.
