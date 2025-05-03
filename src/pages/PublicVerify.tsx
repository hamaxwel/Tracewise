import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';
import JourneyTimeline from '../components/Journey/JourneyTimeline';
import { apiService } from '../services/api';
import { Product, ProductJourney, Certificate } from '../types';

const PublicVerify: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [journey, setJourney] = useState<ProductJourney | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
    
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !product || !journey) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="bg-error-100 rounded-full p-3">
              <svg className="h-8 w-8 text-error-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-center text-gray-900 mb-2">Verification Failed</h1>
          <p className="text-gray-600 text-center">{error || 'Product information could not be verified'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-500 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">TraceChain Verification</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="bg-primary-50 p-6 border-b border-primary-100">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Package className="h-6 w-6 text-primary-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500">
                  {product.batchId ? `Batch ID: ${product.batchId}` : 'Single Item'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Product Information</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Created On</p>
                  <p className="font-medium">{formatDate(product.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Verification Status</p>
                  <div className="inline-flex items-center bg-success-100 text-success-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Journey Timeline</h3>
              <div className="max-h-96 overflow-y-auto pr-2">
                <JourneyTimeline stages={journey.stages} currentStage={journey.currentStage} />
              </div>
            </div>
          </div>
        </div>
        
        {certificates.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileCheck className="h-5 w-5 text-primary-500 mr-2" />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-500">Issued by {cert.issuedBy}</p>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">
                        Valid: {formatDate(cert.issuedAt)} - {formatDate(cert.expiresAt)}
                      </span>
                      <a 
                        href={cert.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-600 hover:text-accent-700 inline-flex items-center"
                      >
                        View Certificate
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center text-gray-500 text-sm">
          <p>All data verified on blockchain. <a href="#" className="text-primary-600 hover:text-primary-700">Learn more about our verification process</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PublicVerify;