import React from 'react';
import { Link } from 'react-router-dom';
import { Package, QrCode, ExternalLink } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">Created {formatDate(product.createdAt)}</p>
            </div>
          </div>
          {product.qrCodeUrl && (
            <Link 
              to={`/qrcode/${product.id}`}
              className="flex items-center text-accent-500 hover:text-accent-600"
            >
              <QrCode size={20} className="mr-1" />
              <span className="text-sm">View QR</span>
            </Link>
          )}
        </div>
        
        <p className="mt-4 text-gray-600">{product.description}</p>
        
        {product.batchId && (
          <div className="mt-4 flex items-center">
            <span className="text-xs font-medium bg-secondary-100 text-secondary-800 px-2.5 py-0.5 rounded-full">
              Batch: {product.batchId}
            </span>
          </div>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center rounded-md text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            View Details
            <ExternalLink size={16} className="ml-1" />
          </Link>
          
          <Link
            to={`/journey/${product.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Track Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;