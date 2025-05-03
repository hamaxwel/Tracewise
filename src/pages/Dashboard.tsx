import React from 'react';
import { Link } from 'react-router-dom';
import { Package, QrCode, FileCheck, Box, Plus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ProductList from '../components/Product/ProductList';

const Dashboard: React.FC = () => {
  const statCards = [
    {
      title: 'Products',
      value: '12',
      icon: <Package className="h-8 w-8 text-primary-500" />,
      change: '+2 this week',
      path: '/products',
    },
    {
      title: 'QR Scans',
      value: '243',
      icon: <QrCode className="h-8 w-8 text-primary-500" />,
      change: '+18% from last month',
      path: '/qrcode',
    },
    {
      title: 'Active Certificates',
      value: '8',
      icon: <FileCheck className="h-8 w-8 text-primary-500" />,
      change: '2 expiring soon',
      path: '/certificates',
    },
    {
      title: 'Supply Chain Stages',
      value: '36',
      icon: <Box className="h-8 w-8 text-primary-500" />,
      change: '4 journeys in progress',
      path: '/journey-builder',
    },
  ];

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => (
            <Link 
              key={card.title}
              to={card.path}
              className="bg-white rounded-lg shadow overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{card.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                      <dd>
                        <div className="text-xl font-semibold text-gray-900">{card.value}</div>
                      </dd>
                      <dd className="flex items-center text-sm text-gray-500">
                        <span className="truncate">{card.change}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Products</h2>
          <Link
            to="/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Product
          </Link>
        </div>
        
        <ProductList />
      </div>
    </Layout>
  );
};

export default Dashboard;