import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, ProductSize } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedProduct = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(fetchedProduct);
        setSelectedSize(fetchedProduct.sizes?.[0] || null);
      } else {
        console.error('No such product!');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedSize);
      }
    }
  };

  const handleWhatsAppOrder = () => {
    if (product && selectedSize) {
      const totalPrice = selectedSize.price * quantity;
      const message = `Hi, I'd like to order:\n${product.name} – ${selectedSize.label} – ₹${selectedSize.price} x ${quantity} = ₹${totalPrice}`;
      const whatsappUrl = `https://wa.me/918848320553?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.imageURL}
              alt={product.name}
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Select Size</h2>
              <Select
                value={selectedSize?.label}
                onValueChange={(value) => {
                  const size = product.sizes.find((s) => s.label === value);
                  if (size) setSelectedSize(size);
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size.label} value={size.label}>
                      {size.label} - ₹{size.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Quantity</h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Price and Action Buttons */}
            {selectedSize && (
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-accent">
                    ₹{selectedSize.price * quantity}
                  </span>
                  {selectedSize.fullPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{selectedSize.fullPrice * quantity}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 rounded-xl hover:bg-[#22c55e] transition"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleWhatsAppOrder}
                    variant="outline"
                    className="px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Order via WhatsApp</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;