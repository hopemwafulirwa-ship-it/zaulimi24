'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { getOrders } from '../../../services/api'; // Not used in mock implementation
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function OrderHistoryPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    // Redirect if user is not authenticated
    if (!loading && (!isAuthenticated || !user)) {
      router.push('/login');
    }
  }, [user, isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          // In a real implementation, we would fetch orders from the API
          // const orderData = await getOrders();
          // setOrders(orderData);
          
          // Mock data for demonstration
          const mockOrders: Order[] = [
            {
              id: 'ORD-001',
              userId: user?.id.toString() || '',
              items: [
                { productId: '1', name: 'Organic Tomatoes', price: 50.00, quantity: 2 },
                { productId: '2', name: 'Fresh Carrots', price: 30.00, quantity: 1 }
              ],
              totalAmount: 130.00,
              status: 'delivered',
              createdAt: '2023-05-15T10:30:00Z',
              shippingAddress: {
                street: '123 Farm Road',
                city: 'Lilongwe',
                state: 'Central Region',
                zipCode: '10001',
                country: 'Malawi'
              }
            },
            {
              id: 'ORD-002',
              userId: user?.id.toString() || '',
              items: [
                { productId: '3', name: 'Avocados', price: 80.00, quantity: 3 }
              ],
              totalAmount: 240.00,
              status: 'processing',
              createdAt: '2023-05-20T14:15:00Z'
            }
          ];
          
          setOrders(mockOrders);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading || !user) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <Link href="/profile" className="text-green-600 hover:text-green-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">View your past orders and their status</p>
        </div>

        {loadingOrders ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {orders.map((order) => (
              <div key={order.id} className="border-b border-gray-200 last:border-b-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                        <span className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-lg font-bold text-gray-900">MK {order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900">Items:</h4>
                    <ul className="mt-2 space-y-2">
                      {order.items.map((item) => (
                        <li key={item.productId} className="flex justify-between">
                          <span className="text-gray-600">{item.quantity} x {item.name}</span>
                          <span className="text-gray-900">MK {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {order.shippingAddress && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900">Shipping Address:</h4>
                      <p className="text-gray-600 mt-1">
                        {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                        {order.shippingAddress.state}, {order.shippingAddress.zipCode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex space-x-3">
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="text-green-600 hover:text-green-800 font-medium">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}