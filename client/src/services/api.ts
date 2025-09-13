// API service for Zaulimi24

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

// Type definitions
interface UserData {
  email: string;
  password: string;
  name: string;
  role: 'buyer' | 'seller';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  unit: string;
  organic: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderData {
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
}

// Helper function for making API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`Making request to: ${url}`);
    console.log('Request config:', config);
    
    const response = await fetch(url, config);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      console.log('Non-JSON response:', text);
      return text;
    }
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Request URL:', url);
    console.error('Request config:', config);
    throw error;
  }
};

// Health check
export const healthCheck = () => apiRequest('/health');

// Auth services
export const registerUser = (userData: UserData) => apiRequest('/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData),
});

export const loginUser = (credentials: LoginCredentials) => apiRequest('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

// Product services
export const getProducts = () => {
  console.log('Calling getProducts API');
  return apiRequest('/products');
};

export const getProductById = (id: string) => apiRequest(`/products/${id}`);

export const createProduct = (productData: ProductData) => apiRequest('/products', {
  method: 'POST',
  body: JSON.stringify(productData),
});

// Cart services
export const getCart = () => apiRequest('/cart');

export const addToCart = (item: CartItem) => apiRequest('/cart/items', {
  method: 'POST',
  body: JSON.stringify(item),
});

// Order services
export const createOrder = (orderData: OrderData) => apiRequest('/orders', {
  method: 'POST',
  body: JSON.stringify(orderData),
});

export const getOrders = () => apiRequest('/orders');

export const getOrderById = (id: string) => apiRequest(`/orders/${id}`);