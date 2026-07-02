'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Card } from '@/components/ui/Card';
import { ProductImage } from '@/components/ui/ProductImage';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { AddressForm } from '@/components/delivery/AddressForm';
import { getProduct, getProductsByCategory } from '@/lib/getProduct';
import { useCartStore } from '@/store/useCartStore';
import { useRentalStore } from '@/store/useRentalStore';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useToastStore } from '@/store/useToastStore';

const durations = [
  { id: 'daily', label: 'Daily', suffix: '/day' },
  { id: 'weekly', label: 'Weekly', suffix: '/week' },
  { id: 'monthly', label: 'Monthly', suffix: '/month' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProduct(params.id);
  const [selectedDuration, setSelectedDuration] = useState('weekly');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isTogglingFav, setIsTogglingFav] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleFavorite = useRentalStore((s) => s.toggleFavorite);
  const createRental = useRentalStore((s) => s.createRental);
  const favorites = useRentalStore((s) => s.favorites);
  const addToast = useToastStore((s) => s.addToast);

  const isFav = product ? favorites.includes(product.id) : false;

  const handleAddToCart = useCallback(() => {
    if (!product || addedToCart) return;
    addItem(product, selectedDuration, quantity);
    setAddedToCart(true);
    addToast(`${product.name} added to cart`, 'success');
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, selectedDuration, quantity, addItem, addToast, addedToCart]);

  const handleToggleFavorite = useCallback(() => {
    if (!product || isTogglingFav) return;
    setIsTogglingFav(true);
    toggleFavorite(product.id);
    const nowFav = !isFav;
    addToast(nowFav ? 'Added to favorites' : 'Removed from favorites', nowFav ? 'success' : 'info');
    setTimeout(() => setIsTogglingFav(false), 500);
  }, [product, toggleFavorite, isFav, addToast, isTogglingFav]);

  const handleRentNow = useCallback(() => {
    if (!product?.available || isCreating) return;
    const rentals = useRentalStore.getState().rentals;
    const activeCount = rentals.filter((r) => r.status !== 'RETURNED').length;
    const sub = useSubscriptionStore.getState();
    const { allowed, reason } = sub.canRent(activeCount);
    if (!allowed) {
      addToast(reason, 'error');
      return;
    }
    setShowAddressForm(true);
  }, [product, isCreating, addToast]);

  const handleAddressSubmit = useCallback((address) => {
    if (!product) return;
    setIsCreating(true);
    setTimeout(() => {
      const result = createRental(product, selectedDuration, quantity, address);
      if (result.error) {
        addToast(result.error, 'error');
        setIsCreating(false);
        return;
      }
      addToast('Rental confirmed!', 'success');
      setShowAddressForm(false);
      setIsCreating(false);
      router.push('/delivery');
    }, 300);
  }, [product, selectedDuration, quantity, createRental, addToast, router]);

  if (!product) {
    return (
      <Section className="pt-32">
        <Container className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">?</span>
          </div>
          <h1 className="text-3xl font-bold text-hv-foreground mb-4">Equipment Not Found</h1>
          <p className="text-hv-muted mb-8">This item may have been removed or is no longer available.</p>
          <NavLink href="/hobbies">
            <Button variant="secondary">Browse Equipment</Button>
          </NavLink>
        </Container>
      </Section>
    );
  }

  const price = product[selectedDuration] || product.weekly;
  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 3);
  const specs = product.specifications || {};

  return (
    <Section className="pt-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-20">
          <ScrollReveal direction="left">
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <ProductImage product={product} className="w-full h-full" aspect="1/1" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6">
                <Badge variant={product.available ? 'green' : 'default'} dot>
                  {product.available ? 'Available Now' : 'Currently Rented'}
                </Badge>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="flex flex-col">
            <div className="mb-2">
              <Badge variant="cyan">{product.category}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-hv-foreground tracking-tight mb-3">
              {product.name}
            </h1>

            {Object.keys(specs).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                  value && (
                    <span key={key} className="text-[11px] px-2.5 py-1 rounded-full bg-hv-bg border border-hv-border/50 text-hv-muted font-medium">
                      {key === 'skillLevel' ? value :
                       key === 'pages' ? `${value} pages` :
                       key === 'condition' ? value :
                       key === 'author' ? value :
                       key === 'brand' || key === 'model' ? `${key === 'brand' ? '' : ''}${value}` :
                       key === 'type' ? value :
                       value}
                    </span>
                  )
                ))}
              </div>
            )}

            <p className="text-hv-muted mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <Rating value={product.rating} size="md" />
              <span className="text-sm text-hv-muted">{product.reviews} reviews</span>
            </div>

            {Object.keys(specs).length > 0 && (
              <div className="bg-hv-bg rounded-2xl border border-hv-border p-5 mb-8">
                <h3 className="text-xs font-semibold text-hv-muted uppercase tracking-wider mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {Object.entries(specs).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex flex-col">
                        <span className="text-[10px] text-hv-muted uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-sm font-medium text-hv-foreground">{String(value)}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-hv-border p-6 mb-8 shadow-card">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-hv-foreground">{price} DH</span>
                <span className="text-hv-muted">{durations.find((d) => d.id === selectedDuration)?.suffix}</span>
              </div>

              <div className="flex gap-2 mb-6">
                {durations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDuration(d.id)}
                    className={`flex-1 px-3 sm:px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                      selectedDuration === d.id
                        ? 'bg-gradient-to-r from-hv-cyan to-hv-sky text-white shadow-md'
                        : 'bg-hv-bg text-hv-muted hover:bg-hv-border/50'
                    }`}
                  >
                    <span className="block leading-tight">{d.label}</span>
                    <span className="text-xs opacity-70">{product[d.id]} DH</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-hv-muted">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 rounded-full bg-hv-bg border border-hv-border flex items-center justify-center hover:border-hv-cyan hover:bg-hv-cyan/5 transition-colors text-base text-hv-foreground active:scale-90"
                    aria-label="Decrease quantity"
                  >-</button>
                  <span className="text-lg font-semibold text-hv-foreground w-10 text-center select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 rounded-full bg-hv-bg border border-hv-border flex items-center justify-center hover:border-hv-cyan hover:bg-hv-cyan/5 transition-colors text-base text-hv-foreground active:scale-90"
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-hv-border mb-6">
                <span className="text-sm text-hv-muted">Total</span>
                <span className="text-2xl font-bold text-hv-foreground">{(price * quantity).toLocaleString()} DH</span>
              </div>

              <Button
                variant="primary"
                className="w-full mb-3"
                size="lg"
                onClick={handleRentNow}
                disabled={!product.available || isCreating}
                loading={isCreating}
                loadingText="Creating Rental..."
              >
                Rent Now
              </Button>
              <Button
                variant="secondary"
                className="w-full mb-3"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.available || addedToCart}
                loading={addedToCart}
                loadingText="Added to Cart"
              >
                Add to Cart
              </Button>
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={handleToggleFavorite}
                disabled={isTogglingFav}
                loading={isTogglingFav}
                loadingText={isFav ? 'Removing...' : 'Adding...'}
              >
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-hv-foreground mb-8">Related Equipment</h2>
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((item) => (
                  <NavLink key={item.id} href={`/product/${item.id}`}>
                    <Card className="p-0 overflow-hidden group cursor-pointer" hoverEffect padding={false}>
                      <div className="relative overflow-hidden">
                        <ProductImage product={item} className="w-full" aspect="4/3" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-hv-foreground mb-1">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-hv-foreground">{item.weekly} DH/wk</span>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    </Card>
                  </NavLink>
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}

        <AnimatePresence>
          {showAddressForm && (
            <AddressForm
              product={product}
              duration={selectedDuration}
              price={price}
              quantity={quantity}
              onSubmit={handleAddressSubmit}
              onCancel={() => !isCreating && setShowAddressForm(false)}
            />
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
