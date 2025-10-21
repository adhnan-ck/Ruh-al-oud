import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const AllPerfumes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get('search') ?? '').trim().toLowerCase();

  useEffect(() => {
    fetchPerfumes();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, subcategoryFilter]);

  const fetchPerfumes = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', 'perfume'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching perfumes:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) => {
        const name = (product.name ?? '').toLowerCase();
        const desc = (product.description ?? '').toLowerCase();
        return name.includes(searchQuery) || desc.includes(searchQuery);
      });
    }

    if (subcategoryFilter !== 'all') {
      filtered = filtered.filter(
        (product) =>
          product.subcategory?.toLowerCase() === subcategoryFilter.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-32 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Perfumes</h1>

        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing results for <span className="font-medium">"{searchQuery}"</span>
          </p>
        )}

        {/* 🔹 Subcategory Filter */}
        <div className="flex justify-center mt-4">
          <Select value={subcategoryFilter} onValueChange={(value) => setSubcategoryFilter(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="best seller">Best Seller</SelectItem>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading perfumes...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              {searchQuery ? 'No perfumes match your search.' : 'No perfumes available.'}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllPerfumes;
