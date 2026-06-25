import { products } from '@/data/products';
import { categories } from '@/data/categories';

export function getProduct(id) {
  if (!id) return null;
  return products.find((p) => p.id === id) || null;
}

export function getProductsByCategory(category) {
  if (!category) return [];
  const cat = category.toLowerCase();
  return products.filter((p) => p.category.toLowerCase() === cat);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function searchProducts(query) {
  if (!query) return products;
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getAllProducts() {
  return products;
}

export function getCategoryFallbackGradient(category) {
  if (!category) return 'from-gray-100 to-gray-200';
  const map = {
    books: 'from-amber-100 to-yellow-100',
    music: 'from-cyan-100 to-blue-100',
    photography: 'from-purple-100 to-pink-100',
    art: 'from-pink-100 to-rose-100',
    technology: 'from-slate-100 to-gray-100',
    astronomy: 'from-indigo-100 to-purple-100',
    surfing: 'from-blue-100 to-cyan-100',
    skateboarding: 'from-orange-100 to-red-100',
  };
  return map[category.toLowerCase()] || 'from-gray-100 to-gray-200';
}

export function getProductImage(productOrId) {
  if (!productOrId) return { src: '', gradient: 'from-gray-100 to-gray-200' };
  const product = typeof productOrId === 'string' ? getProduct(productOrId) : productOrId;
  if (!product) return { src: '', gradient: 'from-gray-100 to-gray-200' };
  return {
    src: product.image || '',
    gradient: product.gradient || getCategoryFallbackGradient(product.category),
    alt: product.name || '',
  };
}
