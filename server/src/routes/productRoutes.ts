import express from 'express';

const router = express.Router();

// Mock product data with better placeholder images
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
    imageUrl: '/placeholder-tomatoes.jpg'
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
    imageUrl: '/placeholder-carrots.jpg'
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
    imageUrl: '/placeholder-avocados.jpg'
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

// PUT /api/products/:id - Update a specific product
router.put('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const updatedProduct = {
    ...products[productIndex],
    ...req.body,
    id: req.params.id
  };
  
  products[productIndex] = updatedProduct;
  return res.json(updatedProduct);
});

// DELETE /api/products/:id - Delete a specific product
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  return res.status(204).send();
});

export default router;