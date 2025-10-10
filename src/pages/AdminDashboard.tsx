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
      <header className="bg-card border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl md:text-2xl font-bold">Ruh Al Oud [Admin]</h1>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="mr-0 md:mr-2 h-4 w-4" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Products</h2>
          <div className="flex gap-3 w-full sm:w-auto">
            {products.length === 0 && (
              <Button 
                variant="outline" 
                onClick={handleSeedData} 
                disabled={loading}
                className="flex-1 sm:flex-none"
                size="sm"
              >
                <Database className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Add Demo Products</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            )}
            <Button onClick={() => setShowForm(true)} className="flex-1 sm:flex-none" size="sm">
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
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-card rounded-lg overflow-hidden shadow-soft">
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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-card rounded-lg shadow-soft overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <img 
                      src={product.imageURL} 
                      alt={product.name} 
                      className="w-24 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <div className="text-sm space-y-1">
                        {product.sizes.map((size, idx) => (
                          <div key={idx} className="text-muted-foreground">
                            {size.label}: ₹{size.price}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border p-3 flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
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