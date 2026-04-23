# Anime Poster Store

A full-stack e-commerce platform for high-quality anime posters.

## Project Structure

- `/backend`: Node.js/Express API with MongoDB.
- `/frontend`: React/Vite application.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (configured in `backend/.env`)

### Installation

1. Clone the repository.
2. Install all dependencies for both frontend and backend:
   ```bash
   npm run install-all
   ```

### Configuration

Ensure you have the following environment variables set:

**Backend (`/backend/.env`)**:
- `PORT=5000`
- `MONGO_URI=your_mongodb_uri`
- `JWT_SECRET=your_jwt_secret`
- `CLIENT_URL=http://localhost:3000`

**Frontend (`/frontend/.env`)**:
- `VITE_API_URL=http://localhost:5000/api`

### Running the Application

To run both the backend and frontend concurrently:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Seeding Data

To populate the database with initial products and users:
```bash
npm run seed
```
