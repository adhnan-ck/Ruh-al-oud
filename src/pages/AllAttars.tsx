import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const AllAttars = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get('search') ?? '').trim().toLowerCase();

  useEffect(() => {
    fetchAttars();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      const name = (product.name ?? '').toLowerCase();
      const desc = (product.description ?? '').toLowerCase();
      return name.includes(searchQuery) || desc.includes(searchQuery);
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const fetchAttars = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', 'attar'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching attars:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-32 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
          Attar
        </h1>
        {/* <p className="text-muted-foreground text-lg mb-4">
          Explore our exclusive range of attars — pure, traditional, and timeless.
        </p> */}

        {searchQuery && (
          <p className="text-sm text-muted-foreground">
            Showing results for <span className="font-medium">"{searchQuery}"</span>
          </p>
        )}
      </section>

      <section className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading attars...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              {searchQuery ? 'No attars match your search.' : 'No attars available.'}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllAttars;
