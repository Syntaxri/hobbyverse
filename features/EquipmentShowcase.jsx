'use client';

import { memo } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { ProductImage } from '@/components/ui/ProductImage';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { getFeaturedProducts } from '@/lib/getProduct';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';

export const EquipmentShowcase = memo(() => {
  const products = getFeaturedProducts();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const handleQuickRent = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 'weekly', 1);
    addToast(`${product.name} added to cart`, 'success');
  };

  return (
    <Section>
      <Container>
        <SectionHeader subtitle="Featured Equipment" title="Premium Rentals" align="left" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.06}>
              <NavLink href={`/product/${product.id}`}>
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
                    <div className="absolute top-3 right-3">
                      <Badge variant="default">{product.category}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-hv-foreground mb-1 leading-tight">{product.name}</h3>
                    <p className="text-xs text-hv-muted mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <Rating value={product.rating} />
                      <span className="text-xs text-hv-muted">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-hv-border/50">
                      <div>
                        <span className="text-lg font-bold text-hv-foreground">${product.weekly}</span>
                        <span className="text-xs text-hv-muted ml-1">/week</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleQuickRent(e, product)}
                        disabled={!product.available}
                      >
                        Rent Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </NavLink>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-center mt-10">
          <NavLink href="/hobbies">
            <Button variant="secondary" size="lg">
              View All Equipment &rarr;
            </Button>
          </NavLink>
        </ScrollReveal>
      </Container>
    </Section>
  );
});
