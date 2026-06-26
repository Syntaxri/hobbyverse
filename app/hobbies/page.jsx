'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { NavLink } from '@/components/ui/NavLink';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { Tabs } from '@/components/ui/Tabs';
import { SearchBar } from '@/components/ui/SearchBar';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { getAllProducts, searchProducts, getProductsByCategory } from '@/lib/getProduct';
import { categories } from '@/data/categories';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';

function HobbiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);
  const [rentingId, setRentingId] = useState(null);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const allProducts = useMemo(() => getAllProducts(), []);

  const tabOptions = [
    { id: 'all', label: 'All Equipment' },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered = useMemo(() => {
    if (searchQuery) return searchProducts(searchQuery);
    if (activeCategory === 'all') return allProducts;
    return getProductsByCategory(activeCategory);
  }, [activeCategory, searchQuery, allProducts]);

  const handleTabChange = useCallback((id) => {
    setActiveCategory(id);
    if (id === 'all') {
      router.replace('/hobbies');
    } else {
      router.replace(`/hobbies?category=${id}`);
    }
  }, [router]);

  const handleQuickRent = useCallback((e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setRentingId(product.id);
    addItem(product, 'weekly', 1);
    addToast(`${product.name} added to cart`, 'success');
    setTimeout(() => setRentingId(null), 600);
  }, [addItem, addToast]);

  return (
    <Section className="pt-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            subtitle="Discover"
            title="Explore Equipment"
            action={<SearchBar onSearch={setSearchQuery} />}
          />
        </ScrollReveal>

        <ScrollReveal className="mb-10 overflow-x-auto pb-2">
          <Tabs
            tabs={tabOptions}
            defaultTab={activeCategory}
            onChange={handleTabChange}
          />
        </ScrollReveal>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">?</span>
            </div>
            <p className="text-hv-muted">No equipment found matching your criteria.</p>
          </div>
        ) : (
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {filtered.map((product) => (
                <NavLink key={product.id} href={`/product/${product.id}`}>
                  <Card className="p-0 overflow-hidden group cursor-pointer" hoverEffect padding={false}>
                    <div className="relative overflow-hidden">
                      <ProductImage
                        product={product}
                        className="w-full"
                        aspect="4/3"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <Badge variant={product.badge === 'Best Seller' ? 'amber' : 'cyan'}>
                            {product.badge}
                          </Badge>
                        </div>
                      )}
                      {!product.available && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                          <Badge variant="default">Currently Rented</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-hv-foreground leading-tight">{product.name}</h3>
                        <Badge variant="default" className="flex-shrink-0">{product.category}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <Rating value={product.rating} size="sm" />
                        <span className="text-xs text-hv-muted">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-hv-border/50">
                        <div>
                          <span className="text-base font-bold text-hv-foreground">${product.weekly}</span>
                          <span className="text-xs text-hv-muted ml-1">/wk</span>
                        </div>
                        <div className="flex gap-1.5 items-center">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-hv-cyan/10 text-hv-sky font-medium">
                            ${product.daily}/d
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleQuickRent(e, product)}
                            disabled={!product.available}
                            loading={rentingId === product.id}
                            loadingText="Adding..."
                          >
                            Rent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </NavLink>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal className="text-center mt-8 text-xs text-hv-muted">
          Showing {filtered.length} of {allProducts.length} items
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export default function HobbiesPage() {
  return (
    <Suspense fallback={
      <Section className="pt-32">
        <Container className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl animate-pulse">?</span>
          </div>
        </Container>
      </Section>
    }>
      <HobbiesContent />
    </Suspense>
  );
}
