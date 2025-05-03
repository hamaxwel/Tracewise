export interface Product {
  id: string;
  name: string;
  description: string;
  batchId?: string;
  createdAt: string;
  qrCodeUrl?: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  location?: string;
  completedBy?: string;
  transactionHash?: string;
  metadata?: Record<string, any>;
}

export interface ProductJourney {
  id: string;
  productId: string;
  stages: JourneyStage[];
  currentStage: number;
}

export interface Certificate {
  id: string;
  name: string;
  issuedBy: string;
  issuedAt: string;
  expiresAt: string;
  documentUrl: string;
  productId: string;
  verificationHash?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supplier' | 'inspector' | 'retailer';
}

export interface BlockchainTransaction {
  hash: string;
  timestamp: string;
  confirmed: boolean;
  blockNumber?: number;
  from: string;
  to: string;
  data?: string;
}