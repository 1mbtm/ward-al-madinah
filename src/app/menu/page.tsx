'use client';

import React, { useState } from 'react';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import MenuItemCard from '@/components/modules/MenuItemCard';
import Button from '@/components/ui/Button';
import { Download, Sparkles } from 'lucide-react';

export default function MenuPage() {
  const categories = cafeConfig.menuCategories;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || '');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const currentCatData = categories.find((c) => c.slug === activeCategory) || categories[0];

  const filteredItems = currentCatData?.items.filter((item) => {
    if (selectedTag === 'All') return true;
    return item.dietaryTags?.includes(selectedTag as any);
  });

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Menu Header Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Artisanal Culinary & Beverage"
            title="The House Menu"
            subtitle="Precision-brewed single origins, signature espresso beverages, all-day brunch, and fresh viennoiserie."
          />

          {/* Download PDF Action */}
          <div style={{ marginTop: '2rem' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Demo Mode: Connect your custom PDF menu URL in cafe.config.ts')}
            >
              <Download size={14} />
              <span>Download Printable PDF Menu</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Category Tabs Bar */}
      <div
        style={{
          position: 'sticky',
          top: '70px',
          zIndex: 40,
          background: 'var(--bg-glass-heavy)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.85rem 0',
          marginBottom: '3rem',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '0.25rem',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    padding: '0.55rem 1.35rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 400,
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-wider)',
                    whiteSpace: 'nowrap',
                    background: isActive ? 'var(--accent-gold)' : 'var(--bg-card)',
                    color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent-gold)' : 'var(--border-glass)'}`,
                    transition: 'all var(--duration-fast) ease',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dietary Tags Sub-Filter */}
      <div className="container" style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          {['All', 'Signature', 'Single-Origin', 'Vegan', 'Gluten-Free', 'Organic'].map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: isTagActive ? 'rgba(197, 168, 128, 0.2)' : 'transparent',
                  color: isTagActive ? 'var(--accent-gold)' : 'var(--text-muted)',
                  border: `1px solid ${isTagActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all var(--duration-fast) ease',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="container">
        {currentCatData?.description && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
            }}
          >
            {currentCatData.description}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredItems?.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
