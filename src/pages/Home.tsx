import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter using subcategory (not main category)
  const bestSellers = products.filter(p => p.subcategory === 'Best Seller');
  const menProducts = products.filter(p => p.subcategory === 'Men');
  const womenProducts = products.filter(p => p.subcategory === 'Women');

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="
          relative 
          pt-32 pb-20 text-primary-foreground 
          bg-[url('/ruhaloud_hero.jpg')] bg-cover bg-center 
          md:bg-none md:gradient-hero
        "
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 md:bg-transparent"></div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              The Soul of Luxury in Every Drop
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Discover luxury fragrances with Ruh Al Oud. Unique blends of oud, musk & modern scents crafted to perfection. Wholesale & retail available.
            </p>
            <Link to="/AllProducts">
              <Button size="lg" variant="secondary" className="group">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
     <section className="py-20 bg-muted/20">
  <div className="container mx-auto px-4 text-center">
    <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">Shop by Category</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      
      <Link to="/AllAttars">
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-96">
          <img
            src="/attar_category.png"
            alt="Attar"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <h3 className="text-white text-3xl font-semibold group-hover:translate-y-1 transition-transform p-6">
              Attar
            </h3>
          </div>
        </div>
      </Link>

      <Link to="/AllPerfumes">
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-96">
          <img
            src="/perfume_category.png"
            alt="Perfume"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <h3 className="text-white text-3xl font-semibold group-hover:translate-y-1 transition-transform p-6">
              Perfume
            </h3>
          </div>
        </div>
      </Link>

    </div>
  </div>
</section>
      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Best Sellers</h2>
              <p className="text-muted-foreground">Our most loved fragrances</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Men's Fragrances */}
      {menProducts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">For Him</h2>
              <p className="text-muted-foreground">Masculine scents that make a statement</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {menProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Women's Fragrances */}
      {womenProducts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">For Her</h2>
              <p className="text-muted-foreground">Elegant fragrances for the modern woman</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {womenProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {loading && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Loading fragrances...</p>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No products available yet. Check back soon!</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
