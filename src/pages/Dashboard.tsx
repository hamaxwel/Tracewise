import React from 'react';
import { Link } from 'react-router-dom';
import { Package, QrCode, FileCheck, Box, Plus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ProductList from '../components/Product/ProductList';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const statCards = [
    {
      title: 'Products',
      value: '12',
      icon: <Package className="h-8 w-8 text-primary-500" />,
      change: '+2 this week',
      path: '/products',
      image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'QR Scans',
      value: '243',
      icon: <QrCode className="h-8 w-8 text-primary-500" />,
      change: '+18% from last month',
      path: '/qrcode',
      image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Active Certificates',
      value: '8',
      icon: <FileCheck className="h-8 w-8 text-primary-500" />,
      change: '2 expiring soon',
      path: '/certificates',
      image: 'https://images.pexels.com/photos/4482937/pexels-photo-4482937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Supply Chain Stages',
      value: '36',
      icon: <Box className="h-8 w-8 text-primary-500" />,
      change: '4 journeys in progress',
      path: '/journey-builder',
      image: 'https://images.pexels.com/photos/4482899/pexels-photo-4482899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="relative mb-8">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/4482934/pexels-photo-4482934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Supply Chain Background"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-primary-700/90 rounded-lg" />
          </div>
          <div className="relative px-8 py-12">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to TraceChain</h1>
            <p className="text-primary-50 text-lg max-w-2xl">
              Track, verify, and manage your supply chain with blockchain technology. 
              Ensure transparency and build trust with your customers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={card.title}
            >
              <Link 
                to={card.path}
                className="group block bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
              >
                <div className="relative h-32">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="flex items-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        {card.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                        <p className="text-primary-50">{card.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm text-gray-600">{card.change}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Recent Products</h2>
              <p className="text-gray-600">Track and manage your latest products</p>
            </div>
            <Link
              to="/products/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Product
            </Link>
          </div>
          
          <ProductList />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/journey-builder"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
              >
                <Box className="h-8 w-8 text-primary-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">Create Journey</span>
              </Link>
              <Link
                to="/qrcode"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
              >
                <QrCode className="h-8 w-8 text-primary-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">Generate QR</span>
              </Link>
              <Link
                to="/certificates/new"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
              >
                <FileCheck className="h-8 w-8 text-primary-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Certificate</span>
              </Link>
              <Link
                to="/analytics"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
              >
                <Package className="h-8 w-8 text-primary-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Analytics</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Blockchain Network</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">IPFS Storage</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;