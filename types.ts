
export enum UserRole {
  TEST_LAB = 'TEST_LAB', // Primary Admin/Auditor
  CUSTOMER = 'CUSTOMER', // Buyer of AI services
  SELLER = 'SELLER'      // Provider of AI models
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: 'Testing' | 'Ready' | 'Failed' | 'Paused';
  lastTested: string;
  lastSynced?: string; // New field for Git sync tracking
  credits: number;
  totalCredits: number;
  gitConnected: boolean;
  repoUrl?: string;
  isMarketplaceApproved?: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: UserRole | 'ADMIN' | 'VIEWER';
  status: 'Active' | 'Pending' | 'Deactivated';
  lastActive: string;
  avatar?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  credits: number;
  icon: string;
  color: string;
  sellerId?: string;
  isPromoted?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARN' | 'SUCCESS' | 'CRITICAL';
  actor: string;
  action: string;
  resource: string;
}
