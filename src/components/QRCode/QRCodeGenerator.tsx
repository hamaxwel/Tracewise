import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Copy, Share2 } from 'lucide-react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  productName?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  value, 
  size = 200,
  productName 
}) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qrcode-${productName || 'product'}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName || 'Product QR Code',
          text: 'Scan this QR code to verify product authenticity',
          url: value
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API not supported on this browser');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <QRCodeCanvas 
            id="qr-code"
            value={value}
            size={size}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: '/vite.svg',
              excavate: true,
              height: 24,
              width: 24,
            }}
          />
        </div>
        
        {productName && (
          <h3 className="text-lg font-medium text-gray-900 mb-2">{productName}</h3>
        )}
        
        <p className="text-sm text-gray-500 mb-4 break-all text-center">
          {value}
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Download size={16} className="mr-1" />
            Download
          </button>
          
          <button
            onClick={handleCopyURL}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm ${
              copied 
                ? 'text-success-700 bg-success-50 border-success-300' 
                : 'text-gray-700 bg-white hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500`}
          >
            <Copy size={16} className="mr-1" />
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
          
          {typeof navigator.share === 'function' && (
            <button
              onClick={handleShare}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              <Share2 size={16} className="mr-1" />
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;