# Shop at Home API

This is the backend application for an e-commerce platform, developed using **NestJS**, **TypeORM**, and **PostgreSQL**. It includes user authentication, product registration, cart functionality, and payment processing.

## Features
- User authentication (signup, login, JWT authentication)
- Product registration and management
- Add products to cart
- Checkout and payment processing

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Cleysond10/shop-at-home-api.git
cd shop-at-home-api
```

### 2. Create the `.env` file
Copy the `.env-example` file and rename it to `.env`. Then, update the environment variables as needed.
```bash
cp .env-example .env
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the project in development mode
```bash
npm run start:dev
```

## Database Setup
Make sure PostgreSQL is running and update the `.env` file with the correct database connection details:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

## API Documentation
Once the application is running, you can access the API documentation via Swagger:
```
http://localhost:3000/api
```

## License
This project is licensed under the [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
