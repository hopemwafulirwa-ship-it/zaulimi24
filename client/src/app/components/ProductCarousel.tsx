'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../services/api';

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

const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // For demo purposes, we'll use the first 3 products as "day's best"
        // In a real application, this would be determined by the backend
        setProducts(data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="bg-green-200 rounded-full w-80 h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-green-200 rounded-full w-80 h-80 flex items-center justify-center">
        <span className="text-green-800">No products available</span>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative">
      <div className="bg-green-200 rounded-full w-80 h-80 flex items-center justify-center overflow-hidden">
        {currentProduct?.imageUrl && currentProduct.imageUrl !== 'https://example.com/tomatoes.jpg' && currentProduct.imageUrl !== 'https://example.com/carrots.jpg' && currentProduct.imageUrl !== 'https://example.com/avocados.jpg' ? (
          <Image 
            src={currentProduct.imageUrl} 
            alt={currentProduct.name} 
            width={300} 
            height={300} 
            className="rounded-full object-cover"
          />
        ) : (
          // Placeholder for products without images
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-48 h-48 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-green-800 font-medium">{currentProduct?.name}</span>
          </div>
        )}
      </div>
      
      {/* Product Info Overlay */}
      <div className="absolute bottom-4 left-0 right-0 bg-white bg-opacity-90 p-4 rounded-lg mx-4 shadow-lg">
        <h3 className="font-bold text-green-800 truncate">{currentProduct?.name}</h3>
        <p className="text-green-600 font-semibold">MK {currentProduct?.price.toFixed(2)}</p>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Previous product"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Next product"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute top-4 right-4 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-green-600' : 'bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* CTA Button */}
      <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
        <Link 
          href={`/products/${currentProduct?.id}`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm whitespace-nowrap"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCarousel;