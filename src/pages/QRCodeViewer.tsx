import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Share2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import QRCodeGenerator from '../components/QRCode/QRCodeGenerator';
import { apiService } from '../services/api';
import { Product } from '../types';

const QRCodeViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await apiService.getProduct(id);
        if (!productData) {
          setError('Product not found');
          return;
        }
        setProduct(productData);
        
        // Generate QR code URL
        // In a real app, this might be a permalink to a public verification page
        const baseUrl = window.location.origin;
        const qrUrl = `${baseUrl}/verify/${id}`;
        setQrValue(qrUrl);
        
      } catch (err) {
        setError('Failed to load product data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-error-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-error-700">{error || 'Product not found'}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">QR Code for {product.name}</h1>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Scan this QR code to view the product's journey and verify its authenticity.
                </p>
                
                <div className="flex justify-center">
                  <QRCodeGenerator 
                    value={qrValue} 
                    productName={product.name}
                    size={250}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-accent-800 mb-2">How to use this QR code</h3>
            <ul className="text-sm text-accent-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Print this QR code and attach it to your product or packaging</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Customers can scan it with any QR code scanner or camera app</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>They'll see the complete journey of the product and any certifications</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>All information is verified by blockchain, ensuring authenticity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRCodeViewer;