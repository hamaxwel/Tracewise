import React from 'react';
import { FileCheck, Calendar, ExternalLink } from 'lucide-react';
import { Certificate } from '../../types';
import { blockchainService } from '../../services/blockchain';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const [verifying, setVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState<boolean | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleVerify = async () => {
    if (!certificate.verificationHash) return;
    
    setVerifying(true);
    try {
      const result = await blockchainService.verifyCredential(certificate.verificationHash);
      setVerified(result);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerified(false);
    } finally {
      setVerifying(false);
    }
  };
  
  // Check if certificate is expired
  const isExpired = new Date(certificate.expiresAt) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <div className="bg-accent-100 p-3 rounded-full">
            <FileCheck className="h-6 w-6 text-accent-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              {certificate.name}
              {isExpired && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                  Expired
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500">Issued by {certificate.issuedBy}</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Issued Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1 text-gray-400" />
              {formatDate(certificate.issuedAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Expiry Date</p>
            <p className={`text-sm font-medium flex items-center ${
              isExpired ? 'text-error-600' : 'text-gray-900'
            }`}>
              <Calendar size={14} className="mr-1 text-gray-400" />
              {formatDate(certificate.expiresAt)}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          {verified === true && (
            <div className="rounded-md bg-success-50 p-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-sm text-success-700">Certificate verified on blockchain</p>
                </div>
              </div>
            </div>
          )}
          
          {verified === false && (
            <div className="rounded-md bg-error-50 p-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-error-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-sm text-error-700">Certificate verification failed</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <a
            href={certificate.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-500"
          >
            View Certificate
            <ExternalLink size={14} className="ml-1" />
          </a>
          
          <button
            onClick={handleVerify}
            disabled={verifying || !certificate.verificationHash}
            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md ${
              verifying
                ? 'bg-gray-100 text-gray-500'
                : 'text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
            }`}
          >
            {verifying ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify on Blockchain'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;