export interface Product {
  id: number;
  brand: string;
  price: number;
  stock: number | string;
  color: string;
  size: (string | number)[];
  name: {
    dk: string;
    en: string;
  };
  images: string[];
  categories: string[];
  variant?: ProductVariant[];
}

export interface ProductVariant {
  stock: number | string;
  color: string;
  size: (string | number)[];
  images?: string[];
}

export interface Category {
  id: string;
  parent_category_id: string;
  level: number;
  name: {
    en: string;
    dk: string;
  };
  categories?: Category[];
}

export interface PromotionalSpot {
  link: string;
  position: number;
  type: string;
  image: {
    aspectRatio: string;
    imageUrl: string;
    focalPoint: {
      x: number;
      y: number;
    };
    maxWidth: string;
    alt: string;
  };
  imageAltText: string;
  _alias: string;
}