import React from 'react';
import { MenuItemData } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';

interface MenuItemCardProps {
  item: MenuItemData;
  className?: string;
}

export default function MenuItemCard({
  item,
  className = '',
}: MenuItemCardProps) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* Header Row: Name & Price */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '1rem',
            marginBottom: '0.6rem',
          }}
        >
          <h4
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {item.name}
          </h4>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              whiteSpace: 'nowrap',
            }}
          >
            {formatPrice(item.price, item.currency)}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '1rem',
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Dietary & Signature Badges */}
      {item.dietaryTags && item.dietaryTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
          {item.dietaryTags.map((tag) => (
            <Badge
              key={tag}
              variant={tag === 'Signature' ? 'gold' : 'default'}
              style={{ fontSize: '0.65rem' } as React.CSSProperties}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
