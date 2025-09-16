'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TestPages() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Pages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-green-600 hover:text-green-800">
                  User Profile
                </Link>
              </li>
              <li>
                <Link href="/profile/orders" className="text-green-600 hover:text-green-800">
                  Order History
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Seller Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/seller" className="text-green-600 hover:text-green-800">
                  Seller Portal
                </Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="text-green-600 hover:text-green-800">
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Checkout Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/cart" className="text-green-600 hover:text-green-800">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-green-600 hover:text-green-800">
                  Checkout Process
                </Link>
              </li>
              <li>
                <Link href="/order-confirmation" className="text-green-600 hover:text-green-800">
                  Order Confirmation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}