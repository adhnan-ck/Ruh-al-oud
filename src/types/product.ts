export interface ProductSize {
  label: string;
  price: number;
  fullPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'attar' | 'perfume';
  subcategory: 'Best Seller' | 'Men' | 'Women';
  description: string;
  imageURL: string;
  sizes: ProductSize[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}
