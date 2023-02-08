type ProductRating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
  rating?: ProductRating;
};

export type StripeOrder = {
  id: string;
  amount: number;
  amount_shipping: number;
  images: string[];
  timestamp: any;
  products: any[];
};

export interface CartProduct extends Product {
  quantity: number;
}

export interface HomePageProps {
  products: Product[];
}
