import { category } from "./category.model";

export interface Product {
  id: number;
  images: string[];
  price: number;
  title: string;
  creationAt: string;
  description: string;
  category: category;
}
