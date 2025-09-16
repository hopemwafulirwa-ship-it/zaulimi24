'use client';

import { useEffect } from 'react';
// import { useState } from 'react'; // Not used in this component
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SellerPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not authenticated or not a seller
    if (!loading && (!isAuthenticated || !user || user.role !== 'seller')) {
      router.push('/login');
    } else if (!loading && user && user.role === 'seller') {
      // Redirect authenticated sellers to their dashboard
      router.push('/seller/dashboard');
    }
  }, [user, isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center py-12">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Seller Portal</h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Welcome to your seller portal. Manage your products, view sales, and track your performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/seller/dashboard" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium inline-block"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/products" 
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium inline-block"
            >
              View Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}