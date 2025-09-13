#!/bin/bash

# Zaulimi24 Project Initialization Script

echo "Initializing Zaulimi24 project..."

# Create client directory and initialize Next.js app
echo "Setting up frontend (Next.js)..."
mkdir -p client
cd client
npx create-next-app@latest . --typescript --eslint --tailwind --src-dir --app --import-alias "@/*" --use-npm
cd ..

# Create server directory and initialize Node.js app
echo "Setting up backend (Node.js + Express)..."
mkdir -p server
cd server
npm init -y
# Install core dependencies
npm install express cors helmet morgan dotenv express-rate-limit express-validator bcryptjs jsonwebtoken mongoose
# Install development dependencies
npm install --save-dev nodemon ts-node typescript @types/node @types/express jest supertest
cd ..

# Create database initialization script
echo "Creating database initialization script..."
cat > scripts/init-db.sql << 'EOF'
-- Create tables for Zaulimi24 database

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'buyer',
    name VARCHAR(255) NOT NULL,
    address JSONB,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    category VARCHAR(100),
    unit VARCHAR(50),
    organic BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id),
    seller_id INTEGER REFERENCES users(id),
    items JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address JSONB,
    payment_intent_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    user_id INTEGER REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- Insert sample data
INSERT INTO users (email, password_hash, role, name, address) VALUES
('admin@zaulimi24.com', '$2b$10$example_hash', 'admin', 'Admin User', '{"street": "123 Main St", "city": "Nairobi", "state": "Nairobi", "zipCode": "00100", "country": "Kenya"}'),
('seller@zaulimi24.com', '$2b$10$example_hash', 'seller', 'John Farmer', '{"street": "456 Farm Rd", "city": "Nakuru", "state": "Rift Valley", "zipCode": "20100", "country": "Kenya"}'),
('buyer@zaulimi24.com', '$2b$10$example_hash', 'buyer', 'Jane Customer', '{"street": "789 Market St", "city": "Mombasa", "state": "Coast", "zipCode": "80100", "country": "Kenya"}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO products (seller_id, name, description, price, stock, image_url, category, unit, organic) VALUES
(2, 'Organic Tomatoes', 'Fresh organic tomatoes from local farm', 50.00, 100, 'https://example.com/tomatoes.jpg', 'Vegetables', 'kg', true),
(2, 'Fresh Carrots', 'Crunchy fresh carrots', 30.00, 150, 'https://example.com/carrots.jpg', 'Vegetables', 'kg', false),
(2, 'Avocados', 'Ripe avocados', 80.00, 50, 'https://example.com/avocados.jpg', 'Fruits', 'piece', false)
ON CONFLICT DO NOTHING;
EOF

# Create a basic README for the scripts directory
cat > scripts/README.md << 'EOF'
# Scripts

This directory contains utility scripts for the Zaulimi24 project.

## Available Scripts

- `init-project.sh` - Initializes the entire project structure
- `init-db.sql` - Database initialization script

## Usage

To initialize the project, run:

```bash
chmod +x scripts/init-project.sh
./scripts/init-project.sh
```
EOF

echo "Project initialization complete!"
echo ""
echo "Next steps:"
echo "1. Review the generated project structure"
echo "2. Update the .env file with your configuration"
echo "3. Run 'docker-compose up' to start the development environment"
echo "4. Visit http://localhost:3000 for the frontend"
echo "5. Visit http://localhost:5000 for the backend API"
echo "6. Visit http://localhost:8080 for database administration"