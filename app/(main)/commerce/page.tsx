'use client';
import { useState } from 'react';
import Image from 'next/image';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ExternalLink, ShoppingCart, Lock, Shield, CheckCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <LuxuryCard variant="elevated" texture className="overflow-hidden">
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isFeatured && (
          <div className="absolute top-3 left-3">
            <LuxuryBadge variant="featured" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-[var(--gold-primary)]">
            {formatCurrency(product.price)}
          </span>
          {product.stock !== undefined && (
            <span className={cn(
              'text-xs px-2 py-1 rounded',
              product.stock < 10 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
            )}>
              {product.stock} left
            </span>
          )}
        </div>
        <LuxuryButton
          variant="gold"
          className="w-full"
          onClick={() => onAddToCart?.(product.id)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </LuxuryButton>
      </div>
    </LuxuryCard>
  );
}

const tabs = [
  { id: 'products', label: 'Products' },
  { id: 'checkout', label: 'Checkout Demo' },
] as const;

type TabId = typeof tabs[number]['id'];

export default function CommercePage() {
  const [activeTab, setActiveTab] = useState<TabId>('products');
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Commerce</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent min-h-[44px]',
              activeTab === tab.id
                ? 'text-[var(--gold-primary)] border-[var(--gold-primary)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'products' ? (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* External Links */}
          <div className="flex flex-wrap gap-3 justify-center pt-6">
            <LuxuryButton variant="outline" asChild>
              <a href="https://whatnot.com" target="_blank" rel="noopener noreferrer">
                View on Whatnot
                <ExternalLink className="w-4 h-4" />
              </a>
            </LuxuryButton>
            <LuxuryButton variant="outline" asChild>
              <a href="https://shackpck.com" target="_blank" rel="noopener noreferrer">
                Visit shackpck.com
                <ExternalLink className="w-4 h-4" />
              </a>
            </LuxuryButton>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Trust Signals */}
          <LuxuryCard variant="gold" texture className="p-6">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Lock className="w-5 h-5 text-[var(--gold-primary)]" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Shield className="w-5 h-5 text-[var(--gold-primary)]" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="w-5 h-5 text-[var(--gold-primary)]" />
                <span>Verified Dealer</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Powered by Stripe
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Secure payment processing for your peace of mind
              </p>
            </div>
          </LuxuryCard>

          {/* Payment Methods */}
          <LuxuryCard variant="elevated" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <LuxuryButton variant="outline" className="w-full justify-start">
                <span className="text-lg">🍎</span>
                Apple Pay
              </LuxuryButton>
              <LuxuryButton variant="outline" className="w-full justify-start">
                💳 Credit Card
              </LuxuryButton>
            </div>
          </LuxuryCard>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <LuxuryCard variant="bordered" className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Cart Summary</h3>
              <p className="text-muted-foreground mb-4">{cart.length} item(s) in cart</p>
              <LuxuryButton variant="gold" className="w-full" shimmer>
                Proceed to Checkout
              </LuxuryButton>
            </LuxuryCard>
          )}
        </div>
      )}
    </div>
  );
}

