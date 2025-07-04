/* Defines the product entity */
export interface Product {
  id?: number | undefined;
  productName?: string;
  productCode?: string;
  tags?: string[];
  releaseDate?: string;
  price?: number;
  description?: string;
  starRating?: number;
  imageUrl?: string;
}
