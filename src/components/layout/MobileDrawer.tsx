'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/utils/formatters';
import { cafeConfig } from '@/config/cafe.config';
import { X, Phone, Mail, MapPin } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileDrawer({
  isOpen,
  onClose,
  navItems,
}: MobileDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`drawer-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
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
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            {cafeConfig.meta.logoText || cafeConfig.meta.brandName}
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
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

        {/* Navigation Link List */}
        <nav
          style={{
            padding: '2rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.25rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  transition: 'color var(--duration-fast) ease',
                  animation: `fadeSlideDown 0.4s ease forwards ${index * 0.05}s`,
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-gold)',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer Contact */}
        <div
          style={{
            padding: '1.75rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {cafeConfig.contact.primaryPhone && (
            <a
              href={`tel:${cafeConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Phone size={14} color="var(--accent-gold)" />
              <span>{cafeConfig.contact.primaryPhone}</span>
            </a>
          )}
          {cafeConfig.contact.email && (
            <a
              href={`mailto:${cafeConfig.contact.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Mail size={14} color="var(--accent-gold)" />
              <span>{cafeConfig.contact.email}</span>
            </a>
          )}
          {cafeConfig.contact.headOfficeAddress && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginTop: '0.25rem',
              }}
            >
              <MapPin size={14} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{cafeConfig.contact.headOfficeAddress}</span>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
