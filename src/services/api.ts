import { 
  Product, 
  ProductJourney, 
  Certificate, 
  JourneyStage 
} from '../types';
import { 
  mockProducts, 
  mockProductJourneys, 
  mockCertificates 
} from '../utils/mockData';

// Mock API service until Supabase is connected
class ApiService {
  // Products
  async getProducts(): Promise<Product[]> {
    await this.delay(500); // Simulate network delay
    return [...mockProducts];
  }

  async getProduct(id: string): Promise<Product | null> {
    await this.delay(500);
    return mockProducts.find(p => p.id === id) || null;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await this.delay(500);
    const newProduct: Product = {
      ...product,
      id: `${mockProducts.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    return newProduct;
  }

  // Product Journeys
  async getProductJourney(productId: string): Promise<ProductJourney | null> {
    await this.delay(500);
    return mockProductJourneys.find(j => j.productId === productId) || null;
  }

  async createJourneyStage(productId: string, stage: Omit<JourneyStage, 'id' | 'timestamp' | 'transactionHash'>): Promise<JourneyStage> {
    await this.delay(500);
    const txHash = `0x${Math.random().toString(16).slice(2)}`;
    
    const newStage: JourneyStage = {
      ...stage,
      id: `stage-${Date.now()}`,
      timestamp: new Date().toISOString(),
      transactionHash: txHash,
    };

    return newStage;
  }

  // Certificates
  async getProductCertificates(productId: string): Promise<Certificate[]> {
    await this.delay(500);
    return mockCertificates.filter(c => c.productId === productId);
  }

  async createCertificate(certificate: Omit<Certificate, 'id' | 'verificationHash'>): Promise<Certificate> {
    await this.delay(500);
    const verificationHash = `0x${Math.random().toString(16).slice(2)}`;
    
    const newCertificate: Certificate = {
      ...certificate,
      id: `cert-${Date.now()}`,
      verificationHash,
    };
    
    return newCertificate;
  }

  // Helper method to simulate API delay
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();