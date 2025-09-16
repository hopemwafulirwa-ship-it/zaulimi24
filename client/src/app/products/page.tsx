'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProducts } from '@/services/api';
import { useCart } from '../context/cartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetailModal from '../components/ProductDetailModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  unit: string;
  organic: boolean;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  console.log('ProductsPage component rendered');
  
  // We're not currently using the user object, so we don't need to destructure it
  // const { user } = useAuth();

  useEffect(() => {
    console.log('ProductsPage useEffect triggered');
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const data = await getProducts();
        console.log('Products fetched successfully:', data);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products: ' + (err as Error).message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('ProductsPage rendering with state:', { products, loading, error });

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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Add to cart handler
  const handleAddToCart = async (product: Product, quantity: number = 1) => {
    try {
      await addToCart(product, quantity);
      // You could add a toast notification here
    } catch (err) {
      console.error('Error adding to cart:', err);
      // You could show an error message to the user
    }
  };

  // View product details handler
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Fresh Produce</h1>
          <div className="flex space-x-4">
            <select className="border border-green-600 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>All Categories</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Herbs</option>
            </select>
            <select className="border border-green-600 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name} 
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.category}</p>
                    </div>
                    {product.organic && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Organic
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">MK {product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">{product.stock} {product.unit} available</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      <Footer />
    </div>
  );
}