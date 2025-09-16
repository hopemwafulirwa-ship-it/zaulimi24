'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-0000';
  const totalAmount = searchParams.get('total') || '0.00';
  
  const [orderDetails] = useState({
    id: orderId,
    date: new Date().toLocaleDateString(),
    total: parseFloat(totalAmount),
    status: 'confirmed',
    items: [
      { id: '1', name: 'Organic Tomatoes', quantity: 2, price: 50.00 },
      { id: '2', name: 'Fresh Carrots', quantity: 1, price: 30.00 }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Farm Road',
      city: 'Lilongwe',
      state: 'Central Region',
      zipCode: '10001',
      country: 'Malawi'
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="mt-2 text-gray-600">
              Thank you for your order. We&apos;ve received your order and are preparing it for shipment.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
                  <p className="text-gray-500 text-sm mt-1">Order #{orderDetails.id}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-500">Order Date: {orderDetails.date}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Items in this order</h3>
                  <div className="space-y-4">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-gray-900 font-medium">{item.name}</p>
                          <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-gray-900 font-medium">MK {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 font-medium">{orderDetails.shippingAddress.name}</p>
                    <p className="text-gray-600">{orderDetails.shippingAddress.street}</p>
                    <p className="text-gray-600">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</p>
                    <p className="text-gray-600">{orderDetails.shippingAddress.country}</p>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 font-medium">Payment Method</p>
                    <p className="text-gray-600">Credit Card (ending in 1234)</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-w-md ml-auto">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">MK {orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">MK 0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">MK 0.00</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">MK {orderDetails.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/profile/orders?orderId=${orderId}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View Order Details
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>Need help with your order? Contact us at support@zaulimi24.com or call +265 123 456 789</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}