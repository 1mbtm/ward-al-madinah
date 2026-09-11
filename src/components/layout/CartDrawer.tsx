'use client';

import React from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { cafeConfig } from '@/config/cafe.config';
import { formatPrice } from '@/utils/formatters';
import Button from '@/components/ui/Button';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!cafeConfig.features.showOnlineOrdering || !isCartOpen) return null;

  return (
    <>
      <div
        className="drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`drawer-panel ${isCartOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your Order Bag"
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={18} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.15rem', margin: 0, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>
              Your Bag
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                margin: 'auto 0',
                padding: '2rem 1rem',
              }}
            >
              <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your Bag is Empty</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Explore our selection of specialty single origins and house blends.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {item.image && (
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      background: 'var(--bg-tertiary)',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      {formatPrice(item.price, item.currency)}
                    </span>
                  </div>
                  {item.bagWeight && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.bagWeight}
                    </span>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '6px',
                        padding: '0.2rem 0.5rem',
                        border: '1px solid var(--border-glass)',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.75rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-primary)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.05rem',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Subtotal</span>
              <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              variant="primary"
              className="w-full"
              style={{ width: '100%', marginBottom: '0.75rem' }}
              onClick={() => alert('Demo Mode: Online ordering checkout is ready for payment gateway integration.')}
            >
              Proceed to Checkout
            </Button>

            <button
              onClick={clearCart}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
              }}
            >
              Clear Bag
            </button>
          </div>
        )}
      </div>
    </>
  );
}
