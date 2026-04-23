export interface Product {
  id: string;
  name: string;
  viscosity: string;
  type: "engine" | "transmission" | "hydraulic" | "antifreeze" | "grease";
  volume: number;
  price: number;
  oldPrice?: number;
  image: string;
  specs: {
    api?: string;
    acea?: string;
    oem?: string[];
  };
  stock: number;
  brand: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: "accepted" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  bonusEarned: number;
  bonusUsed: number;
  deliveryAddress: string;
  deliveryDate?: string;
  comment?: string;
}

export interface User {
  companyName: string;
  inn: string;
  phone: string;
  email: string;
  address: string;
  loyaltyTier: "silver" | "gold" | "platinum";
  bonusBalance: number;
  bonusPending: number;
  totalSpent: number;
  tierThreshold: number;
}

export interface Notification {
  id: string;
  type: "order" | "bonus" | "promo" | "reminder";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Promo {
  id: string;
  title: string;
  discount: string;
  productId?: string;
  endDate: string;
  image: string;
}
