// Utility functions for authentication

interface User {
  id: number;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  createdAt: string;
}

export const logout = () => {
  // Clear token and user data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const token = localStorage.getItem('token');
  return !!token;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};