import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >
        {children}
      </motion.main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About TraceChain</h3>
              <p className="text-gray-600">
                Empowering businesses with blockchain-based supply chain traceability solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/products" className="text-gray-600 hover:text-primary-500">Products</a></li>
                <li><a href="/journey-builder" className="text-gray-600 hover:text-primary-500">Journey Builder</a></li>
                <li><a href="/certificates" className="text-gray-600 hover:text-primary-500">Certificates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-gray-600 hover:text-primary-500">Documentation</a></li>
                <li><a href="/api" className="text-gray-600 hover:text-primary-500">API Reference</a></li>
                <li><a href="/support" className="text-gray-600 hover:text-primary-500">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Email: contact@tracechain.com</li>
                <li className="text-gray-600">Phone: 07124567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} TraceChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;