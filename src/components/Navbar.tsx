import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/AllProducts?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      closeMobileMenu();
    } else {
      navigate('/AllProducts');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <h1 className="text-2xl font-display font-semibold">Ruh Al Oud</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-accent transition-colors">
              Contact
            </Link>
            <Link to="/AllProducts" className="text-sm font-medium hover:text-accent transition-colors">
              Products
            </Link>
          </div>

          {/* Search bar (desktop only) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 ml-4 w-1/3">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search perfumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md pl-9"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </form>

          {/* Cart + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs flex items-center justify-center font-medium text-primary">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-accent transition-colors" onClick={closeMobileMenu}>
              Contact
            </Link>
            <Link to="/AllProducts" className="text-sm font-medium hover:text-accent transition-colors" onClick={closeMobileMenu}>
              Products
            </Link>

            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search perfumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md pl-9"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
