'use client';

import React, { useState } from 'react';
import { RetailProductData } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/components/providers/CartProvider';
import { cafeConfig } from '@/config/cafe.config';
import { Badge } from '@/components/ui/Badge';
import { CounterNumber } from '@/components/ui/CounterNumber';
import Button from '@/components/ui/Button';
import { ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: RetailProductData;
  className?: string;
}

export default function ProductCard({
  product,
  className = '',
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const showOrdering = cafeConfig.features.showOnlineOrdering;

  const handleAddToCart = () => {
    if (!showOrdering) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      bagWeight: product.bagWeight,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className={`glass-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Product Image & Cupping Score Pill */}
      <div
        style={{
          position: 'relative',
          width: 'calc(100% + 3.5rem)',
          marginLeft: '-1.75rem',
          marginTop: '-1.75rem',
          marginBottom: '1.5rem',
          aspectRatio: '1 / 1',
          backgroundImage: `url(${product.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        {/* Origin Flag & Country Tag */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'var(--bg-glass-heavy)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          {product.countryFlagEmoji && <span>{product.countryFlagEmoji}</span>}
          <span>{product.originCountry}</span>
        </div>

        {/* SCA Cupping Score Badge with Counter */}
        {product.cuppingScore && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(226, 157, 82, 0.9) 0%, rgba(197, 168, 128, 0.9) 100%)',
              color: '#000',
              padding: '0.3rem 0.7rem',
              borderRadius: '8px',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>
              SCA Score
            </span>
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>
              <CounterNumber target={product.cuppingScore} />
            </span>
          </div>
        )}
      </div>

      {/* Main Info */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{product.name}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Badge variant="gold">{product.roastLevel} Roast</Badge>
          {product.process && <Badge>{product.process}</Badge>}
          {product.bagWeight && <Badge>{product.bagWeight}</Badge>}
        </div>
      </div>

      {/* Tasting Notes Flavor Profile */}
      {product.tastingNotes && product.tastingNotes.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wider)',
              color: 'var(--text-muted)',
              marginBottom: '0.4rem',
            }}
          >
            Flavor Profile
          </span>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              lineHeight: 1.4,
            }}
          >
            {product.tastingNotes.join(' • ')}
          </p>
        </div>
      )}

      {/* Pricing & Add to Cart Action */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
          }}
        >
          {formatPrice(product.price, product.currency)}
        </span>

        {showOrdering ? (
          <Button
            variant={isAdded ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {isAdded ? (
              <>
                <Check size={14} color="var(--accent-gold)" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>{product.inStock ? 'Add to Bag' : 'Sold Out'}</span>
              </>
            )}
          </Button>
        ) : (
          <Badge variant="gold">Specialty Lot</Badge>
        )}
      </div>
    </div>
  );
}
