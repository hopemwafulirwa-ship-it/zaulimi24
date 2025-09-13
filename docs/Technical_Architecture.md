# Technical Architecture

## Overview

This document describes the technical architecture of the Zaulimi24 e-commerce platform based on the System Design Document.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│                    (Next.js Frontend)                       │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│                   (Node.js + Express)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Auth        │  │ Product     │  │ Order       │         │
│  │ Service     │  │ Service     │  │ Service     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │ Payment     │  │ Review      │                          │
│  │ Service     │  │ Service     │                          │
│  └─────────────┘  └─────────────┘                          │
├─────────────────────────────────────────────────────────────┤
│                      Data Layer                             │
│                   (Cloud Firestore)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Users       │  │ Products    │  │ Orders      │         │
│  │ Collection  │  │ Collection  │  │ Collection  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐                                           │
│  │ Reviews     │                                           │
│  │ Collection  │                                           │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **Logging**: Winston

### Database
- **Primary**: Cloud Firestore
- **Caching**: Redis (for session storage)

### Infrastructure
- **Hosting**: Firebase Hosting (Frontend), Google Cloud Run (Backend)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## API Design

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

### User Endpoints
```
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Product Endpoints
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Cart Endpoints
```
GET  /api/cart
POST /api/cart/items
PUT  /api/cart/items/:id
DELETE /api/cart/items/:id
```

### Order Endpoints
```
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id/status
```

### Review Endpoints
```
GET    /api/products/:id/reviews
POST   /api/products/:id/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

## Security Considerations

1. **Authentication & Authorization**
   - JWT tokens for stateless authentication
   - Role-based access control (Buyer, Seller, Admin)
   - Token expiration and refresh mechanisms

2. **Data Protection**
   - Passwords hashed with bcrypt
   - HTTPS encryption for all communications
   - Input validation and sanitization
   - Protection against common web vulnerabilities (XSS, CSRF, SQL Injection)

3. **Payment Security**
   - Integration with PCI-compliant payment processors
   - No storage of sensitive payment information
   - Secure handling of payment callbacks

## Scalability Strategy

1. **Horizontal Scaling**
   - Stateless backend services for easy scaling
   - Load balancing across multiple instances
   - Database sharding for large datasets

2. **Caching**
   - Redis for session storage
   - CDN for static assets
   - In-memory caching for frequently accessed data

3. **Database Optimization**
   - Proper indexing of frequently queried fields
   - Pagination for large result sets
   - Read replicas for high-traffic queries

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Device   │───▶│   CDN (Static   │───▶│  Load Balancer  │
│  (Browser/Mobile)│    │    Assets)      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────┬───────┘
                                                         │
┌─────────────────┐    ┌─────────────────┐    ┌─────────▼───────┐
│   Payment       │◀───┤  Third-Party    │◀───┤   API Gateway   │
│   Gateway       │    │  Services       │    │ (Rate Limiting) │
└─────────────────┘    └─────────────────┘    └─────────┬───────┘
                                                         │
┌─────────────────┐    ┌─────────────────┐    ┌─────────▼───────┐
│                 │    │                 │    │                 │
│   Frontend      │    │   Backend       │    │   Database      │
│  (Firebase      │    │  (Google Cloud  │    │  (Cloud         │
│   Hosting)      │    │   Run)          │    │   Firestore)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```