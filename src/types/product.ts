export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Best Seller' | 'Men' | 'Women';
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
