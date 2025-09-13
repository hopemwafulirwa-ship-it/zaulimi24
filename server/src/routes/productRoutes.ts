import express from 'express';

const router = express.Router();

// Mock product data
const products = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes from local farm',
    price: 50.00,
    stock: 100,
    category: 'Vegetables',
    unit: 'kg',
    organic: true,
    imageUrl: 'https://example.com/tomatoes.jpg'
  },
  {
    id: '2',
    name: 'Fresh Carrots',
    description: 'Crunchy fresh carrots',
    price: 30.00,
    stock: 150,
    category: 'Vegetables',
    unit: 'kg',
    organic: false,
    imageUrl: 'https://example.com/carrots.jpg'
  },
  {
    id: '3',
    name: 'Avocados',
    description: 'Ripe avocados',
    price: 80.00,
    stock: 50,
    category: 'Fruits',
    unit: 'piece',
    organic: false,
    imageUrl: 'https://example.com/avocados.jpg'
  }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json(product);
});

export default router;