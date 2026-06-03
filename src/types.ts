/**
 * Shared Type Definitions for Cepen Production
 */

export type ServiceCategory = 'wedding' | 'prewedding' | 'event' | 'drone';

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  iconName: string; // Dynamic rendering from lucide-react
  longDescription: string;
  features: string[];
  startingPrice: string;
}

export interface Project {
  id: string;
  title: string;
  category: ServiceCategory;
  imageUrl: string;
  location: string;
  date: string;
  clientName: string;
  description: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string; // Using premium high-fidelity grayscale icons / SVG representations
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  date: string;
  location: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
  priceEst: string;
  badge?: string;
}

export interface PricingPackage {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}
