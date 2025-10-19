import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let message = "Hi, I'd like to order the following:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} – ${item.selectedSize.label} – ₹${item.selectedSize.price} × ${item.quantity}\n`;
    });
    message += `\nTotal items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}`;
    message += `\nTotal amount: ₹${getCartTotal()}`;

    const whatsappUrl = `https://wa.me/918848320553?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize.label}`} className="bg-card p-6 rounded-lg shadow-soft">
                    <div className="flex gap-4">
                      <img 
                        src={item.product.imageURL} 
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-display text-xl mb-1">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.selectedSize.label}</p>
                        <p className="font-semibold text-accent">₹{item.selectedSize.price}</p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id, item.selectedSize.label)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize.label, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize.label, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-lg shadow-soft sticky top-24">
                  <h2 className="font-display text-2xl mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between font-display text-xl pt-4 border-t">
                      <span>Total</span>
                      <span className="text-accent">₹{getCartTotal()}</span>
                    </div>
                  </div>

                  <Button onClick={handleWhatsAppOrder} className="w-full" size="lg">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Order on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
