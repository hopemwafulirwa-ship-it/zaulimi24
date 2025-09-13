# Database Schema

This document outlines the database schema for the Zaulimi24 e-commerce platform using Cloud Firestore.

## Overview

The database uses a NoSQL document-based approach with collections for each entity type. Relationships are managed through document references and subcollections where appropriate.

## Collections

### Users Collection

**Path**: `/users/{userId}`

**Fields**:
- `id` (string) - Unique identifier
- `email` (string) - User's email address (unique)
- `passwordHash` (string) - Hashed password
- `role` (string) - User role: "buyer", "seller", or "admin"
- `name` (string) - User's full name
- `address` (object) - User's address information
  - `street` (string)
  - `city` (string)
  - `state` (string)
  - `zipCode` (string)
  - `country` (string)
- `phoneNumber` (string, optional) - User's phone number
- `createdAt` (timestamp) - Account creation date
- `updatedAt` (timestamp) - Last update timestamp

### Products Collection

**Path**: `/products/{productId}`

**Fields**:
- `id` (string) - Unique identifier
- `sellerId` (string) - Reference to the seller's user ID
- `name` (string) - Product name
- `description` (string) - Product description
- `price` (number) - Price in smallest currency unit (e.g., cents)
- `stock` (number) - Available quantity
- `imageUrl` (string) - URL to product image
- `category` (string) - Product category
- `unit` (string) - Unit of measurement (e.g., "kg", "bunch", "piece")
- `organic` (boolean) - Whether the product is organic
- `createdAt` (timestamp) - Creation timestamp
- `updatedAt` (timestamp) - Last update timestamp

### Orders Collection

**Path**: `/orders/{orderId}`

**Fields**:
- `id` (string) - Unique identifier
- `buyerId` (string) - Reference to the buyer's user ID
- `sellerId` (string) - Reference to the seller's user ID
- `items` (array) - List of ordered items
  - `productId` (string) - Reference to product ID
  - `productName` (string) - Name of the product at time of order
  - `quantity` (number) - Quantity ordered
  - `price` (number) - Price per unit at time of order
- `totalAmount` (number) - Total order amount
- `status` (string) - Order status: "pending", "confirmed", "shipped", "delivered", "cancelled"
- `shippingAddress` (object) - Delivery address
  - `street` (string)
  - `city` (string)
  - `state` (string)
  - `zipCode` (string)
  - `country` (string)
- `paymentIntentId` (string) - Stripe payment intent ID
- `createdAt` (timestamp) - Order creation timestamp
- `updatedAt` (timestamp) - Last update timestamp

### Reviews Collection

**Path**: `/reviews/{reviewId}`

**Fields**:
- `id` (string) - Unique identifier
- `productId` (string) - Reference to the product ID
- `userId` (string) - Reference to the reviewer's user ID
- `rating` (number) - Rating value (1-5)
- `comment` (string) - Review comment
- `createdAt` (timestamp) - Review creation timestamp
- `updatedAt` (timestamp) - Last update timestamp

## Subcollections

### User Orders

**Path**: `/users/{userId}/orders/{orderId}`

A denormalized copy of orders for efficient querying by user.

### Product Reviews

**Path**: `/products/{productId}/reviews/{reviewId}`

A denormalized copy of reviews for efficient querying by product.

### User Cart

**Path**: `/users/{userId}/cart/{itemId}`

**Fields**:
- `productId` (string) - Reference to the product ID
- `quantity` (number) - Quantity in cart
- `addedAt` (timestamp) - When item was added to cart

## Indexes

Firestore automatically creates indexes for simple queries, but compound indexes may be needed for complex queries:

1. **Products Collection**:
   - Category + CreatedAt (for category browsing)
   - SellerId + CreatedAt (for seller product listings)

2. **Orders Collection**:
   - BuyerId + CreatedAt (for user order history)
   - SellerId + CreatedAt (for seller order management)
   - Status + CreatedAt (for order filtering)

## Security Rules

Basic security rules for Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read products
    match /products/{productId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'seller';
      allow update, delete: if request.auth != null && resource.data.sellerId == request.auth.uid;
    }
    
    // Users can read and write their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && (resource.data.buyerId == request.auth.uid || resource.data.sellerId == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null && resource.data.sellerId == request.auth.uid;
    }
    
    // Users can read and write their own cart
    match /users/{userId}/cart/{itemId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read and write their own reviews
    match /reviews/{reviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```