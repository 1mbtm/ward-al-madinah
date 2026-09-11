import React from 'react';
import Link from 'next/link';
import { cafeConfig } from '@/config/cafe.config';
import { getActiveNavigationItems } from '@/utils/formatters';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const navItems = getActiveNavigationItems(cafeConfig.features);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand & Tagline */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-widest)',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '1.25rem',
              }}
            >
              {cafeConfig.meta.logoText || cafeConfig.meta.brandName}
            </Link>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '320px',
                marginBottom: '1.5rem',
              }}
            >
              {cafeConfig.meta.tagline}
            </p>

            {/* Social Links */}
            {cafeConfig.contact.socials && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                {Object.entries(cafeConfig.contact.socials).map(([key, url]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${key}`}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        transition: 'all var(--duration-fast) ease',
                      }}
                    >
                      {key.slice(0, 2)}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              Explore
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      transition: 'color var(--duration-fast) ease',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              Contact & Hours
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cafeConfig.contact.primaryPhone && (
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Phone size={16} color="var(--accent-gold)" />
                  <a href={`tel:${cafeConfig.contact.primaryPhone.replace(/\s+/g, '')}`}>
                    {cafeConfig.contact.primaryPhone}
                  </a>
                </li>
              )}
              {cafeConfig.contact.email && (
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Mail size={16} color="var(--accent-gold)" />
                  <a href={`mailto:${cafeConfig.contact.email}`}>
                    {cafeConfig.contact.email}
                  </a>
                </li>
              )}
              {cafeConfig.contact.headOfficeAddress && (
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{cafeConfig.contact.headOfficeAddress}</span>
                </li>
              )}
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Clock size={16} color="var(--accent-gold)" />
                <span>Daily Specialty Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>
            © {currentYear} {cafeConfig.meta.brandName}. All rights reserved.
          </p>
          <p style={{ letterSpacing: 'var(--tracking-wide)' }}>
            Specialty Coffee & Culinary Experience
          </p>
        </div>
      </div>
    </footer>
  );
}
