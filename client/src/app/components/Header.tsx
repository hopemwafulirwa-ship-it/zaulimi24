'use client';

import Link from 'next/link';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 w-8 h-8 rounded-full"></div>
          <h1 className="text-2xl font-bold text-green-800">Zaulimi24</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-green-900 font-medium">Home</Link>
          <Link href="/products" className="text-gray-600 hover:text-green-900 font-medium">Products</Link>
          <Link href="/cart" className="text-gray-600 hover:text-green-900 font-medium">Cart</Link>
          <Link href="/sellers" className="text-gray-600 hover:text-green-900 font-medium">Sellers</Link>
          <Link href="/about" className="text-gray-600 hover:text-green-900 font-medium">About</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-gray-600 hover:text-green-900 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 hidden md:inline">Hello, {user.name}</span>
              <Link 
                href="/profile" 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Profile
              </Link>
              <button 
                onClick={logout}
                className="text-gray-600 hover:text-green-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}