import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';

import amberEssence from '@/assets/perfume-amber-essence.jpg';
import oceanNoir from '@/assets/perfume-ocean-noir.jpg';
import roseGarden from '@/assets/perfume-rose-garden.jpg';
import darkWoods from '@/assets/perfume-dark-woods.jpg';
import crystalAura from '@/assets/perfume-crystal-aura.jpg';
import lavenderDreams from '@/assets/perfume-lavender-dreams.jpg';
import azureSport from '@/assets/perfume-azure-sport.jpg';
import goldenHour from '@/assets/perfume-golden-hour.jpg';
import tropicalBloom from '@/assets/perfume-tropical-bloom.jpg';

export const demoProducts: Omit<Product, 'id'>[] = [
  // Best Sellers
  {
    name: "Crystal Aura",
    category: "Best Seller",
    description: "A luminous blend of jasmine, white musk, and amber. Our signature scent that captivates with its timeless elegance and ethereal presence.",
    imageURL: crystalAura,
    sizes: [
      { label: "50ml", price: 1299 },
      { label: "100ml", price: 1999 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Golden Hour",
    category: "Best Seller",
    description: "Warm notes of vanilla, sandalwood, and citrus create a perfect harmony. Like capturing the magic of sunset in a bottle.",
    imageURL: goldenHour,
    sizes: [
      { label: "60ml", price: 1399 },
      { label: "100ml", price: 2199 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Amber Essence",
    category: "Best Seller",
    description: "Rich amber with hints of honey and patchouli. A warm, sensual fragrance that leaves an unforgettable impression.",
    imageURL: amberEssence,
    sizes: [
      { label: "60ml", price: 1499 },
      { label: "100ml", price: 2299 }
    ],
    createdAt: new Date().toISOString()
  },
  
  // Women's Fragrances
  {
    name: "Rose Garden",
    category: "Women",
    description: "Delicate rose petals with touches of peony and lily. A romantic, feminine scent that blooms throughout the day.",
    imageURL: roseGarden,
    sizes: [
      { label: "50ml", price: 1199 },
      { label: "100ml", price: 1899 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Lavender Dreams",
    category: "Women",
    description: "Fresh lavender blended with soft vanilla and powdery iris. Elegant, calming, and utterly sophisticated.",
    imageURL: lavenderDreams,
    sizes: [
      { label: "60ml", price: 1299 },
      { label: "100ml", price: 1999 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Tropical Bloom",
    category: "Women",
    description: "Exotic frangipani and coconut with hints of citrus. A vibrant, sun-kissed fragrance that radiates joy and warmth.",
    imageURL: tropicalBloom,
    sizes: [
      { label: "50ml", price: 1099 },
      { label: "100ml", price: 1799 }
    ],
    createdAt: new Date().toISOString()
  },
  
  // Men's Fragrances
  {
    name: "Ocean Noir",
    category: "Men",
    description: "Deep marine notes with bergamot and cedarwood. A sophisticated, masculine scent that commands attention.",
    imageURL: oceanNoir,
    sizes: [
      { label: "60ml", price: 1399 },
      { label: "100ml", price: 2199 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Dark Woods",
    category: "Men",
    description: "Intense oud with leather and tobacco accents. Bold, mysterious, and undeniably masculine.",
    imageURL: darkWoods,
    sizes: [
      { label: "60ml", price: 1599 },
      { label: "100ml", price: 2499 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Azure Sport",
    category: "Men",
    description: "Fresh aquatic notes with mint and vetiver. An energizing, athletic fragrance perfect for the active lifestyle.",
    imageURL: azureSport,
    sizes: [
      { label: "50ml", price: 999 },
      { label: "100ml", price: 1699 }
    ],
    createdAt: new Date().toISOString()
  }
];

export const seedDemoProducts = async () => {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[]
  };

  for (const product of demoProducts) {
    try {
      await addDoc(collection(db, 'products'), product);
      results.success++;
    } catch (error: any) {
      results.failed++;
      results.errors.push(`${product.name}: ${error.message}`);
    }
  }

  return results;
};
