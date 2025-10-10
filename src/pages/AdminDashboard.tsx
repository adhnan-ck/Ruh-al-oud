import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { LogOut, Plus, Pencil, Trash2, Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProductForm from '@/components/admin/ProductForm';
import { seedDemoProducts } from '@/utils/seedData';

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

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
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleSeedData = async () => {
    if (!confirm('This will add 9 demo products to your database. Continue?')) return;

    setLoading(true);
    try {
      const results = await seedDemoProducts();
      
      if (results.success > 0) {
        toast({
          title: "Success!",
          description: `Added ${results.success} demo products successfully`,
        });
        fetchProducts();
      }
      
      if (results.failed > 0) {
        toast({
          title: "Warning",
          description: `${results.failed} products failed to add. Check console for details.`,
          variant: "destructive",
        });
        console.error('Failed products:', results.errors);
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error",
        description: "Failed to seed demo data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Ruh Al Oud [Admin]</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-3xl font-semibold">Products</h2>
          <div className="flex gap-3">
            {products.length === 0 && (
              <Button variant="outline" onClick={handleSeedData} disabled={loading}>
                <Database className="mr-2 h-4 w-4" />
                Add Demo Products
              </Button>
            )}
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg">
            <p className="text-muted-foreground mb-4">No products yet</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-lg overflow-hidden shadow-soft">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Sizes</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <img src={product.imageURL} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 text-sm">
                      {product.sizes.map(s => `${s.label}: ₹${s.price}`).join(', ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
