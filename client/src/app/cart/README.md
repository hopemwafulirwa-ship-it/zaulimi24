# Shopping Cart Functionality

This document describes the shopping cart implementation for the Zaulimi24 e-commerce platform.

## Features

1. **Add to Cart**: Users can add products to their cart from the products page
2. **View Cart**: Users can view all items in their cart on the cart page
3. **Update Quantity**: Users can increase or decrease the quantity of items in their cart
4. **Remove Items**: Users can remove items from their cart
5. **Cart Summary**: The cart displays a summary of items, subtotal, and total price
6. **Persistent Cart**: Cart items are stored in the browser's local storage
7. **Cart Icon**: A cart icon in the header shows the number of items in the cart

## Implementation Details

### Frontend

The shopping cart functionality is implemented using React Context API for state management:

1. **CartContext**: Manages the global cart state
2. **useCart Hook**: Provides access to cart functions and state
3. **Cart Page**: Displays cart items and allows management
4. **Products Page**: Allows adding items to the cart
5. **Header Component**: Displays cart item count

### Backend

The backend includes REST API endpoints for cart operations:

1. `GET /api/cart` - Get user's cart
2. `POST /api/cart/items` - Add item to cart
3. `PUT /api/cart/items/:productId` - Update item quantity
4. `DELETE /api/cart/items/:productId` - Remove item from cart
5. `DELETE /api/cart` - Clear cart

## Usage

1. Browse products on the [Products Page](/products)
2. Click "Add to Cart" on any product
3. View your cart by clicking the cart icon in the header or visiting the [Cart Page](/cart)
4. Update quantities or remove items as needed
5. Proceed to checkout when ready

## Future Enhancements

1. Integration with user authentication for persistent cart storage
2. Real-time inventory updates
3. Coupon/discount code support
4. Saved carts for later purchase
5. Wishlist functionality