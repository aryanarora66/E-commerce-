export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  sold: number;
  inStock: boolean;
  isNew: boolean;
  images: string[];
  features?: string[];
  longDescription?: string;
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  variantType?: string;
  quantity?: number;
  variant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'customer';
  createdAt: string;
  lastLogin: string;
  image?: string;
  phone?: string;
  orderCount?: number;
  reviewCount?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'canceled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}