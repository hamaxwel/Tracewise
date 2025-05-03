import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, QrCode, FileCheck, ChevronRight, Clock, MapPin } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import JourneyTimeline from '../components/Journey/JourneyTimeline';
import JourneyChart from '../components/Journey/JourneyChart';
import CertificateCard from '../components/Certificate/CertificateCard';
import { apiService } from '../services/api';
import { Product, ProductJourney, Certificate } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [journey, setJourney] = useState<ProductJourney | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Fetch product details
        const productData = await apiService.getProduct(id);
        if (!productData) {
          setError('Product not found');
          return;
        }
        setProduct(productData);
        
        // Fetch product journey
        const journeyData = await apiService.getProductJourney(id);
        setJourney(journeyData);
        
        // Fetch certificates
        const certificatesData = await apiService.getProductCertificates(id);
        setCertificates(certificatesData);
        
      } catch (err) {
        setError('Failed to load product data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link to="/products" className="ml-2 text-gray-500 hover:text-gray-700">Products</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-gray-900">{product.name}</span>
                </li>
              </ol>
            </nav>
            <h1 className="text-2xl font-semibold text-gray-900 mt-2">{product.name}</h1>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link
              to={`/qrcode/${product.id}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <QrCode className="h-4 w-4 mr-1.5" />
              View QR Code
            </Link>
            <Link
              to={`/journey/${product.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Update Journey
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
          </div>
          <div className="px-6 py-5">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Batch ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.batchId || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.description}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  {formatDate(product.createdAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {journey && journey.stages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Product Journey</h2>
                </div>
                <div className="px-6 py-5">
                  <JourneyTimeline stages={journey.stages} currentStage={journey.currentStage} />
                </div>
              </div>
            </div>
            
            <div>
              <JourneyChart stages={journey.stages} currentStage={journey.currentStage} />
            </div>
          </div>
        )}
        
        {certificates.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Product Certificates</h2>
              <Link
                to={`/certificates/new?productId=${product.id}`}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FileCheck className="h-4 w-4 mr-1.5" />
                Add Certificate
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;