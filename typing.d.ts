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

export interface CartProduct extends Product {
  quantity: number;
}

export interface HomePageProps {
  products: Product[];
}
