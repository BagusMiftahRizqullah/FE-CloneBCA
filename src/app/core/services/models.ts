export interface NewsItem {
  id: number;
  title: string;
  date: string; // ISO string
  category: string;
  imageUrl: string | null;
  url: string;
  featured: boolean;
}

export interface PromoItem {
  id: number;
  title: string;
  imageUrl: string;
  periodFrom: string; // ISO
  periodTo: string; // ISO
  url: string;
  featured: boolean;
  createdAt: string; // ISO
}

export interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string;
  href: string;
  order: number;
  createdAt: string; // ISO
}

export interface RateItem {
  id: number;
  code: string; // e.g., USD, EUR
  buy: number;
  sell: number;
  flagSrc: string;
  updatedAt: string; // ISO
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}