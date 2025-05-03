import axios from 'axios';
import { 
  Product, 
  ProductJourney, 
  Certificate, 
  JourneyStage,
  User,
  BlockchainTransaction
} from '../types';
import { 
  mockProducts, 
  mockProductJourneys, 
  mockCertificates,
  mockJourneyStages 
} from '../utils/mockData';

// This is a mock API service. In a real application, this would connect to your FastAPI backend.
const MOCK_API_DELAY = 500; // simulate network delay

class ApiService {
  // Products
  async getProducts(): Promise<Product[]> {
    await this.delay(MOCK_API_DELAY);
    return [...mockProducts];
  }

  async getProduct(id: string): Promise<Product | null> {
    await this.delay(MOCK_API_DELAY);
    return mockProducts.find(p => p.id === id) || null;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await this.delay(MOCK_API_DELAY);
    const newProduct: Product = {
      ...product,
      id: `${mockProducts.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    return newProduct;
  }

  // Product Journeys
  async getProductJourney(productId: string): Promise<ProductJourney | null> {
    await this.delay(MOCK_API_DELAY);
    return mockProductJourneys.find(j => j.productId === productId) || null;
  }

  async createJourneyStage(productId: string, stage: Omit<JourneyStage, 'id' | 'timestamp' | 'transactionHash'>): Promise<JourneyStage> {
    await this.delay(MOCK_API_DELAY);
    
    // Generate mock transaction hash
    const txHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;
    
    const newStage: JourneyStage = {
      ...stage,
      id: `s${Date.now()}`,
      timestamp: new Date().toISOString(),
      transactionHash: txHash,
    };

    return newStage;
  }

  // Certificates
  async getProductCertificates(productId: string): Promise<Certificate[]> {
    await this.delay(MOCK_API_DELAY);
    return mockCertificates.filter(c => c.productId === productId);
  }

  async createCertificate(certificate: Omit<Certificate, 'id' | 'verificationHash'>): Promise<Certificate> {
    await this.delay(MOCK_API_DELAY);
    
    // Generate mock verification hash
    const verificationHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;
    
    const newCertificate: Certificate = {
      ...certificate,
      id: `c${mockCertificates.length + 1}`,
      verificationHash,
    };
    
    return newCertificate;
  }

  // QR Codes
  async generateQRCode(productId: string): Promise<string> {
    await this.delay(MOCK_API_DELAY);
    // In a real app, this would create and return a URL to the QR code
    return `https://example.com/qr/${productId}`;
  }

  // Blockchain transactions
  async getTransactionStatus(txHash: string): Promise<BlockchainTransaction> {
    await this.delay(MOCK_API_DELAY);
    return {
      hash: txHash,
      timestamp: new Date().toISOString(),
      confirmed: true,
      blockNumber: Math.floor(Math.random() * 1000000),
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
    };
  }

  // Helper method to simulate API delay
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();