import { Product, ProductJourney, Certificate, JourneyStage } from '../types';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Coffee Beans',
    description: 'Single-origin coffee beans from Ethiopia',
    batchId: 'BATCH-001',
    createdAt: '2023-01-10T08:30:00Z',
    qrCodeUrl: 'https://example.com/qr/1',
  },
  {
    id: '2',
    name: 'Fair Trade Chocolate',
    description: '72% dark chocolate from Peru',
    batchId: 'BATCH-002',
    createdAt: '2023-02-15T10:45:00Z',
    qrCodeUrl: 'https://example.com/qr/2',
  },
  {
    id: '3',
    name: 'Organic Avocados',
    description: 'Hass avocados from Mexico',
    batchId: 'BATCH-003',
    createdAt: '2023-03-22T09:15:00Z',
    qrCodeUrl: 'https://example.com/qr/3',
  },
];

// Mock Journey Stages
export const mockJourneyStages: Record<string, JourneyStage[]> = {
  '1': [
    {
      id: 's1',
      name: 'Harvested',
      description: 'Coffee beans harvested in Ethiopia highlands',
      timestamp: '2023-01-12T06:30:00Z',
      location: 'Addis Ababa, Ethiopia',
      completedBy: 'Farm Cooperative #42',
      transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    {
      id: 's2',
      name: 'Processed',
      description: 'Beans washed and sundried',
      timestamp: '2023-01-14T08:45:00Z',
      location: 'Addis Ababa, Ethiopia',
      completedBy: 'Local Processing Center',
      transactionHash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
    },
    {
      id: 's3',
      name: 'Shipped',
      description: 'Beans packed and shipped to roaster',
      timestamp: '2023-01-20T12:30:00Z',
      location: 'Addis Ababa to Amsterdam',
      completedBy: 'Global Shipping Inc.',
      transactionHash: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef',
    },
    {
      id: 's4',
      name: 'Roasted',
      description: 'Beans roasted in small batches',
      timestamp: '2023-02-01T09:15:00Z',
      location: 'Amsterdam, Netherlands',
      completedBy: 'Euro Roasters Co.',
      transactionHash: '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef',
    },
  ],
  '2': [
    {
      id: 's1',
      name: 'Harvested',
      description: 'Cacao harvested in Peru',
      timestamp: '2023-02-01T10:30:00Z',
      location: 'Lima, Peru',
      completedBy: 'Cooperative Agraria',
      transactionHash: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef',
    },
    {
      id: 's2',
      name: 'Processed',
      description: 'Cacao beans fermented and dried',
      timestamp: '2023-02-05T11:45:00Z',
      location: 'Lima, Peru',
      completedBy: 'Regional Processing Facility',
      transactionHash: '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef',
    },
    {
      id: 's3',
      name: 'Shipped',
      description: 'Cacao beans shipped to manufacturer',
      timestamp: '2023-02-12T14:30:00Z',
      location: 'Lima to Brussels',
      completedBy: 'Oceanic Freight Ltd.',
      transactionHash: '0x7890123456abcdef7890123456abcdef7890123456abcdef7890123456abcdef',
    },
  ],
  '3': [
    {
      id: 's1',
      name: 'Harvested',
      description: 'Avocados harvested in Mexican farms',
      timestamp: '2023-03-20T07:30:00Z',
      location: 'Michoacán, Mexico',
      completedBy: 'Agricola Avocados S.A.',
      transactionHash: '0x8901234567abcdef8901234567abcdef8901234567abcdef8901234567abcdef',
    },
    {
      id: 's2',
      name: 'Inspected',
      description: 'Quality inspection completed',
      timestamp: '2023-03-21T09:15:00Z',
      location: 'Michoacán, Mexico',
      completedBy: 'Quality Control Team',
      transactionHash: '0x9012345678abcdef9012345678abcdef9012345678abcdef9012345678abcdef',
    },
  ],
};

// Mock Product Journeys
export const mockProductJourneys: ProductJourney[] = [
  {
    id: 'j1',
    productId: '1',
    stages: mockJourneyStages['1'],
    currentStage: 3,
  },
  {
    id: 'j2',
    productId: '2',
    stages: mockJourneyStages['2'],
    currentStage: 2,
  },
  {
    id: 'j3',
    productId: '3',
    stages: mockJourneyStages['3'],
    currentStage: 1,
  },
];

// Mock Certificates
export const mockCertificates: Certificate[] = [
  {
    id: 'c1',
    name: 'Organic Certification',
    issuedBy: 'Global Organic Alliance',
    issuedAt: '2023-01-01T00:00:00Z',
    expiresAt: '2024-01-01T00:00:00Z',
    documentUrl: 'https://example.com/certificates/c1.pdf',
    productId: '1',
    verificationHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  {
    id: 'c2',
    name: 'Fair Trade Certification',
    issuedBy: 'Fair Trade International',
    issuedAt: '2023-01-15T00:00:00Z',
    expiresAt: '2024-01-15T00:00:00Z',
    documentUrl: 'https://example.com/certificates/c2.pdf',
    productId: '1',
    verificationHash: '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a',
  },
  {
    id: 'c3',
    name: 'Fair Trade Certification',
    issuedBy: 'Fair Trade International',
    issuedAt: '2023-02-01T00:00:00Z',
    expiresAt: '2024-02-01T00:00:00Z',
    documentUrl: 'https://example.com/certificates/c3.pdf',
    productId: '2',
    verificationHash: '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
  },
  {
    id: 'c4',
    name: 'Organic Certification',
    issuedBy: 'USDA Organic',
    issuedAt: '2023-03-01T00:00:00Z',
    expiresAt: '2024-03-01T00:00:00Z',
    documentUrl: 'https://example.com/certificates/c4.pdf',
    productId: '3',
    verificationHash: '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
  },
];

// Default journey stages template
export const defaultJourneyStages = [
  {
    name: 'Harvested',
    description: 'Product harvested from source',
  },
  {
    name: 'Processed',
    description: 'Raw materials processed into product',
  },
  {
    name: 'Quality Control',
    description: 'Product inspected for quality',
  },
  {
    name: 'Packaged',
    description: 'Product packaged for shipping',
  },
  {
    name: 'Shipped',
    description: 'Product in transit to destination',
  },
  {
    name: 'Received',
    description: 'Product received at destination',
  },
  {
    name: 'Retail Ready',
    description: 'Product available for purchase',
  },
];