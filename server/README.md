# Zaulimi24 Backend

This is the backend API for Zaulimi24, built with Node.js and Express.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000).

## Project Structure

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── config/          # Configuration files
│   ├── utils/           # Utility functions
│   └── app.js           # Express app setup
├── tests/               # Test files
├── README.md            # This file
└── package.json         # Dependencies and scripts
```

## API Endpoints

All API endpoints are prefixed with `/api`. For example: `http://localhost:5000/api/products`

See the full API specification in the [API Specification](../docs/API_Specification.md) document.

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/zaulimi24
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

## Learn More

To learn more about Node.js and Express, take a look at the following resources:

- [Express Documentation](https://expressjs.com/) - learn about Express features and API.
- [Node.js Documentation](https://nodejs.org/en/docs/) - learn about Node.js features.