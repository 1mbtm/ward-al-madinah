'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { getActiveNavigationItems } from '@/utils/formatters';
import { useCart } from '@/components/providers/CartProvider';
import MobileDrawer from './MobileDrawer';
import CartDrawer from './CartDrawer';
import { ShoppingBag, Phone, Menu } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getActiveNavigationItems(cafeConfig.features);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const showOrdering = cafeConfig.features.showOnlineOrdering;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header-glass ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            {/* Brand Logo */}
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-widest)',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  background: 'var(--accent-gold)',
                  borderRadius: '50%',
                }}
              />
              {cafeConfig.meta.logoText || cafeConfig.meta.brandName}
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '2rem',
              }}
              className="desktop-nav"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      transition: 'color var(--duration-fast) ease',
                      position: 'relative',
                      padding: '0.25rem 0',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--accent-gold)',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {/* Quick Phone / WhatsApp (Desktop) */}
              {cafeConfig.contact.primaryPhone && (
                <a
                  href={`tel:${cafeConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
                  className="header-phone-link"
                  style={{
                    display: 'none',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  <Phone size={14} color="var(--accent-gold)" />
                  <span>{cafeConfig.contact.primaryPhone}</span>
                </a>
              )}

              {/* Shopping Cart Trigger (Conditional) */}
              {showOrdering && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label={`View shopping cart with ${totalItemsCount} items`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-primary)',
                    position: 'relative',
                    transition: 'all var(--duration-fast) ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-glass)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ShoppingBag size={18} />
                  {totalItemsCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        background: 'var(--accent-amber)',
                        color: '#000',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      {totalItemsCount}
                    </span>
                  )}
                </button>
              )}

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation"
                className="mobile-hamburger-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                }}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Style Overrides for Header */}
      <style jsx global>{`
        @media (min-width: 1025px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
          .header-phone-link {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />

      {/* Cart Drawer */}
      {showOrdering && <CartDrawer />}
    </>
  );
}
