import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, ProductSize } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const CLOUD_NAME = "dyrboid0u";       // Your Cloudinary cloud name
const UPLOAD_PRESET = "ruhaloud";     // Your unsigned upload preset

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Best Seller' | 'Men' | 'Women'>('Best Seller');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [sizes, setSizes] = useState<ProductSize[]>([{ label: '60ml', price: 999 }]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setDescription(product.description);
      setImageURL(product.imageURL);
      setSizes(product.sizes);
    }
  }, [product]);

  const handleAddSize = () => {
    setSizes([...sizes, { label: '', price: 0 }]);
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index: number, field: 'label' | 'price', value: string | number) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'products');

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setImageURL(res.data.secure_url);
      toast({
        title: "Image Uploaded",
        description: "Your image was uploaded successfully!",
      });
    } catch (err) {
      console.error("Upload failed:", err);
      toast({
        title: "Upload Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !imageURL || sizes.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name,
        category,
        description,
        imageURL,
        sizes,
        createdAt: product?.createdAt || new Date().toISOString(),
      };

      if (product) {
        await updateDoc(doc(db, 'products', product.id), productData);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-luxury max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Amber Essence"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: any) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Best Seller">Best Seller</SelectItem>
                <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A warm amber scent with floral notes..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
            {imageURL && (
              <img
                src={imageURL}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Sizes & Prices</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddSize}>
                <Plus className="h-3 w-3 mr-1" />
                Add Size
              </Button>
            </div>

            <div className="space-y-3">
              {sizes.map((size, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Size (e.g., 60ml)"
                    value={size.label}
                    onChange={(e) => handleSizeChange(index, 'label', e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={size.price}
                    onChange={(e) => handleSizeChange(index, 'price', Number(e.target.value))}
                    required
                  />
                  {sizes.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveSize(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={loading || uploading}>
              {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
