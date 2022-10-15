export type Product = {
  id: number;
  name: string;
  image: string;
  color: string;
  price: number;
  currency: string;
  releaseDate: string;
  categoryId: number;
  rating: number;
};

export type Filter = null | ((product: Product) => boolean);
