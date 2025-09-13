import express, { NextFunction, Request, Response } from 'express';

// Define interfaces for better type safety and clarity
interface CartItem {
    productId: string;
    quantity: number;
}

interface Cart {
    userId: string;
    items: CartItem[];
}

// In a real-world application, this would be a database client or ORM
// For this example, we'll simulate database operations with an in-memory Map
// This demonstrates the logic without relying on an actual database connection.
const mockDatabase = new Map<string, Cart>();

/**
 * Middleware to authenticate the user and get their cart.
 *
 * In a real application, this function would:
 * 1. Read the JWT from the Authorization header (e.g., 'Bearer <token>').
 * 2. Verify the token's signature and expiration.
 * 3. Decode the token to get the user ID.
 * 4. Fetch the user's cart from the database.
 *
 * For this example, we'll simulate this process.
 */
const authenticateAndGetCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // --- SECURITY IMPROVEMENT ---
        // Replace this hardcoded value with a dynamic user ID from a JWT or session token.
        // const userId = req.user.id; // Example with a decoded JWT payload
        const userId = 'placeholder_user_id'; // Placeholder for demonstration

        if (!userId) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // --- SCALABILITY IMPROVEMENT ---
        // Fetch cart from a database (e.g., MongoDB, PostgreSQL) instead of an in-memory Map.
        let cart = mockDatabase.get(userId);

        // If the cart doesn't exist, create a new one.
        if (!cart) {
            cart = { userId, items: [] };
            mockDatabase.set(userId, cart);
        }

        // Attach the cart to the request object so subsequent handlers can access it.
        // We use a custom property, so we need to augment the Request interface.
        // For a full TypeScript setup, you'd extend the Express Request type.
        (req as any).cart = cart;
        (req as any).userId = userId;

        return next();
    } catch (error) {
        console.error('Authentication or cart retrieval error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const router = express.Router();

// GET /api/cart - Get user's cart
// We use the middleware to handle authentication and cart retrieval
router.get('/', authenticateAndGetCart, (req: Request, res: Response) => {
    const cart: Cart = (req as any).cart;
    return res.json(cart);
});

// POST /api/cart/items - Add item to cart
router.post('/items', authenticateAndGetCart, (req: Request, res: Response) => {
    try {
        const cart: Cart = (req as any).cart;
        const { productId, quantity } = req.body;

        // --- VALIDATION IMPROVEMENT ---
        // More robust validation to ensure correct data types and values.
        if (!productId || typeof productId !== 'string' || !quantity || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid productId or quantity. Quantity must be a positive number.' });
        }

        // Check if item already exists in cart
        const existingItem = cart.items.find(item => item.productId === productId);

        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity += quantity;
        } else {
            // Add new item to cart
            cart.items.push({ productId, quantity });
        }

        return res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /api/cart/items/:productId - Update item quantity in cart
router.put('/items/:productId', authenticateAndGetCart, (req: Request, res: Response) => {
    try {
        const cart: Cart = (req as any).cart;
        const { productId } = req.params;
        const { quantity } = req.body;

        // --- VALIDATION IMPROVEMENT ---
        // Ensure quantity is a valid number
        if (typeof quantity !== 'number') {
            return res.status(400).json({ message: 'quantity is required and must be a number' });
        }

        // Find item in cart
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex < 0) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }

        return res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /api/cart/items/:productId - Remove item from cart
router.delete('/items/:productId', authenticateAndGetCart, (req: Request, res: Response) => {
    try {
        const cart: Cart = (req as any).cart;
        const { productId } = req.params;

        // Find item in cart
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex < 0) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Remove item
        cart.items.splice(itemIndex, 1);

        return res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /api/cart - Clear cart
router.delete('/', authenticateAndGetCart, (req: Request, res: Response) => {
    try {
        const cart: Cart = (req as any).cart;

        // Clear all items
        cart.items = [];

        return res.status(200).json({ message: 'Cart cleared', cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
