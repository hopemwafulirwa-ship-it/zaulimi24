'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when product changes or modal opens
  useEffect(() => {
    setQuantity(1);
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            {product.imageUrl ? (
              <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-green-600">MK {product.price.toFixed(2)}</span>
                <span className="text-gray-500 ml-2">per {product.unit}</span>
              </div>
              {product.organic && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Organic
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="text-gray-900">{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                <p className="text-gray-900">{product.stock} {product.unit} available</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center mt-2">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className={`px-4 py-2 rounded-l ${quantity <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="bg-gray-100 px-6 py-2">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className={`px-4 py-2 rounded-r ${quantity >= product.stock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                {quantity >= product.stock && (
                  <span className="ml-2 text-sm text-red-500">Maximum available quantity reached</span>
                )}
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}