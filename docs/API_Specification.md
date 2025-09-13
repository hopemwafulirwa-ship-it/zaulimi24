# API Specification

This document specifies the RESTful API endpoints for the Zaulimi24 e-commerce platform.

## Overview

The API follows REST conventions and uses JSON for request/response bodies. All endpoints require HTTPS and use JWT tokens for authentication.

## Authentication

Most endpoints require authentication via JWT tokens. Tokens should be included in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication Endpoints

### Register a New User

**POST** `/api/auth/register`

Registers a new user (buyer or seller).

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "buyer|seller",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
}
```

**Response**:
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "buyer|seller",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "createdAt": "timestamp"
  },
  "token": "string"
}
```

### Login

**POST** `/api/auth/login`

Authenticates a user and returns a JWT token.

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "buyer|seller|admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    }
  },
  "token": "string"
}
```

### Get Current User

**GET** `/api/auth/me`

Returns the currently authenticated user.

**Response**:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "buyer|seller|admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
}
```

### Forgot Password

**POST** `/api/auth/forgot-password`

Sends a password reset email to the user.

**Request Body**:
```json
{
  "email": "string"
}
```

**Response**:
```json
{
  "message": "Password reset email sent"
}
```

### Reset Password

**POST** `/api/auth/reset-password`

Resets the user's password using a token.

**Request Body**:
```json
{
  "token": "string",
  "newPassword": "string"
}
```

**Response**:
```json
{
  "message": "Password reset successful"
}
```

## User Endpoints

### Get User Profile

**GET** `/api/users/{id}`

Retrieves a user's profile information.

**Response**:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "buyer|seller|admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "createdAt": "timestamp"
}
```

### Update User Profile

**PUT** `/api/users/{id}`

Updates a user's profile information.

**Request Body**:
```json
{
  "name": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
}
```

**Response**:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "buyer|seller|admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "updatedAt": "timestamp"
}
```

## Product Endpoints

### List Products

**GET** `/api/products`

Retrieves a list of products with optional filtering and pagination.

**Query Parameters**:
- `category` (string, optional): Filter by category
- `sellerId` (string, optional): Filter by seller
- `search` (string, optional): Search by name or description
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `sortBy` (string, optional): Sort field (price, createdAt, name)
- `sortOrder` (string, optional): Sort order (asc, desc)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20, max: 100)

**Response**:
```json
{
  "products": [
    {
      "id": "string",
      "sellerId": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "imageUrl": "string",
      "category": "string",
      "unit": "string",
      "organic": "boolean",
      "createdAt": "timestamp"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

### Get Product

**GET** `/api/products/{id}`

Retrieves a single product by ID.

**Response**:
```json
{
  "id": "string",
  "sellerId": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "category": "string",
  "unit": "string",
  "organic": "boolean",
  "seller": {
    "id": "string",
    "name": "string"
  },
  "reviews": [
    {
      "id": "string",
      "userId": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "timestamp"
    }
  ],
  "averageRating": "number",
  "reviewCount": "number",
  "createdAt": "timestamp"
}
```

### Create Product

**POST** `/api/products`

Creates a new product (seller only).

**Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "category": "string",
  "unit": "string",
  "organic": "boolean"
}
```

**Response**:
```json
{
  "id": "string",
  "sellerId": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "category": "string",
  "unit": "string",
  "organic": "boolean",
  "createdAt": "timestamp"
}
```

### Update Product

**PUT** `/api/products/{id}`

Updates an existing product (seller only, must be owner).

**Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "category": "string",
  "unit": "string",
  "organic": "boolean"
}
```

**Response**:
```json
{
  "id": "string",
  "sellerId": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "category": "string",
  "unit": "string",
  "organic": "boolean",
  "updatedAt": "timestamp"
}
```

### Delete Product

**DELETE** `/api/products/{id}`

Deletes a product (seller only, must be owner).

**Response**:
```json
{
  "message": "Product deleted successfully"
}
```

## Cart Endpoints

### Get Cart

**GET** `/api/cart`

Retrieves the current user's cart contents.

**Response**:
```json
{
  "items": [
    {
      "id": "string",
      "productId": "string",
      "productName": "string",
      "productImage": "string",
      "price": "number",
      "quantity": "number",
      "subtotal": "number"
    }
  ],
  "total": "number"
}
```

### Add to Cart

**POST** `/api/cart`

Adds an item to the cart.

**Request Body**:
```json
{
  "productId": "string",
  "quantity": "number"
}
```

**Response**:
```json
{
  "message": "Item added to cart"
}
```

### Update Cart Item

**PUT** `/api/cart/{itemId}`

Updates the quantity of an item in the cart.

**Request Body**:
```json
{
  "quantity": "number"
}
```

**Response**:
```json
{
  "message": "Cart updated successfully"
}
```

### Remove from Cart

**DELETE** `/api/cart/{itemId}`

Removes an item from the cart.

**Response**:
```json
{
  "message": "Item removed from cart"
}
```

### Clear Cart

**DELETE** `/api/cart`

Clears all items from the cart.

**Response**:
```json
{
  "message": "Cart cleared successfully"
}
```

## Order Endpoints

### Create Order

**POST** `/api/orders`

Creates a new order from the cart.

**Request Body**:
```json
{
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentMethod": "stripe"
}
```

**Response**:
```json
{
  "id": "string",
  "buyerId": "string",
  "sellerId": "string",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "totalAmount": "number",
  "status": "pending",
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentIntentId": "string",
  "createdAt": "timestamp"
}
```

### List Orders

**GET** `/api/orders`

Retrieves a list of orders for the current user.

**Query Parameters**:
- `status` (string, optional): Filter by status
- `role` (string, optional): Filter by role (buyer|seller)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)

**Response**:
```json
{
  "orders": [
    {
      "id": "string",
      "buyerId": "string",
      "sellerId": "string",
      "items": [
        {
          "productId": "string",
          "productName": "string",
          "quantity": "number",
          "price": "number"
        }
      ],
      "totalAmount": "number",
      "status": "string",
      "createdAt": "timestamp"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

### Get Order

**GET** `/api/orders/{id}`

Retrieves a single order by ID.

**Response**:
```json
{
  "id": "string",
  "buyerId": "string",
  "sellerId": "string",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "totalAmount": "number",
  "status": "string",
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentIntentId": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Update Order Status

**PUT** `/api/orders/{id}/status`

Updates the status of an order (seller only).

**Request Body**:
```json
{
  "status": "confirmed|shipped|delivered|cancelled"
}
```

**Response**:
```json
{
  "id": "string",
  "status": "string",
  "updatedAt": "timestamp"
}
```

## Review Endpoints

### List Product Reviews

**GET** `/api/products/{id}/reviews`

Retrieves reviews for a product.

**Query Parameters**:
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)

**Response**:
```json
{
  "reviews": [
    {
      "id": "string",
      "userId": "string",
      "userName": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "timestamp"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

### Create Review

**POST** `/api/products/{id}/reviews`

Creates a new review for a product (buyers only, must have purchased the product).

**Request Body**:
```json
{
  "rating": "number",
  "comment": "string"
}
```

**Response**:
```json
{
  "id": "string",
  "userId": "string",
  "productId": "string",
  "rating": "number",
  "comment": "string",
  "createdAt": "timestamp"
}
```

### Update Review

**PUT** `/api/reviews/{id}`

Updates an existing review (owner only).

**Request Body**:
```json
{
  "rating": "number",
  "comment": "string"
}
```

**Response**:
```json
{
  "id": "string",
  "rating": "number",
  "comment": "string",
  "updatedAt": "timestamp"
}
```

### Delete Review

**DELETE** `/api/reviews/{id}`

Deletes a review (owner only).

**Response**:
```json
{
  "message": "Review deleted successfully"
}
```