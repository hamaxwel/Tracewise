import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JourneyBuilder from './pages/JourneyBuilder';
import ProductDetail from './pages/ProductDetail';
import QRCodeViewer from './pages/QRCodeViewer';
import PublicVerify from './pages/PublicVerify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journey-builder" element={<JourneyBuilder />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/qrcode/:id" element={<QRCodeViewer />} />
        <Route path="/verify/:id" element={<PublicVerify />} />
      </Routes>
    </Router>
  );
}

export default App;