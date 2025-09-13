import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 w-8 h-8 rounded-full"></div>
              <h2 className="text-2xl font-bold">Zaulimi24</h2>
            </div>
            <p className="text-gray-400">
              Connecting local farmers with consumers for fresh, quality produce.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/sellers" className="hover:text-white">Sellers</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/sell" className="hover:text-white">Sell on Zaulimi24</Link></li>
              <li><Link href="/seller-dashboard" className="hover:text-white">Seller Dashboard</Link></li>
              <li><Link href="/seller-guide" className="hover:text-white">Seller Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@zaulimi24.com</li>
              <li>Phone: +265 123 456 789</li>
              <li>Address: Lilongwe, Malawi</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zaulimi24. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}