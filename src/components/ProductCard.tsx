import { useState } from 'react';
import { Product, ProductSize } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi, I'd like to order:\n${product.name} – ${selectedSize.label} – ₹${selectedSize.price}`;
    const whatsappUrl = `https://wa.me/918848320553?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-300 animate-fade-in">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-display text-sm font-semibold mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
        </div>

        {/* Size Selector */}
        <div className="space-y-2">
          <Select
            value={selectedSize.label}
            onValueChange={(value) => {
              const size = product.sizes.find((s) => s.label === value);
              if (size) setSelectedSize(size);
            }}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size.label} value={size.label} className="text-xs">
                  {size.label} - ₹{size.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Display with Animation */}
          <div className="flex items-center gap-2">
            <div className="text-lg font-display font-semibold text-accent">
              ₹{selectedSize.price}
            </div>
            {selectedSize.fullPrice && (
              <div className="relative text-sm text-muted-foreground">
                ₹{selectedSize.fullPrice}
                {/* Animated Line */}
                <span className="absolute left-0 top-1/2 w-0 h-[1.5px] bg-red-500 animate-strike"></span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleAddToCart} className="flex-1 h-8 text-xs">
            Add to Cart
          </Button>
          <Button
            onClick={handleWhatsAppOrder}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <MessageCircle className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes strike {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .animate-strike {
          animation: strike 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
