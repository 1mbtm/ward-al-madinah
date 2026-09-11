'use client';

import React, { useState } from 'react';
import { GalleryItemData } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface GalleryGridProps {
  items: GalleryItemData[];
  showHeading?: boolean;
  filterCategories?: boolean;
}

export default function GalleryGrid({
  items,
  showHeading = true,
  filterCategories = true,
}: GalleryGridProps) {
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredItems =
    selectedCat === 'All' ? items : items.filter((i) => i.category === selectedCat);

  return (
    <section className="section-padding ambient-glow" id="gallery">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow="Visual Journal"
            title="The Aesthetic & Craft"
            subtitle="Glimpses into our architectural atmospheres, precision extractions, and community rituals."
            className="mb-12"
            style={{ marginBottom: '3rem' } as React.CSSProperties}
          />
        )}

        {/* Category Filters */}
        {filterCategories && categories.length > 2 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginBottom: '3rem',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 600 : 400,
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-wider)',
                    background: isSelected
                      ? 'var(--accent-gold)'
                      : 'var(--bg-card)',
                    color: isSelected
                      ? 'var(--text-inverse)'
                      : 'var(--text-secondary)',
                    border: `1px solid ${
                      isSelected ? 'var(--accent-gold)' : 'var(--border-glass)'
                    }`,
                    transition: 'all var(--duration-fast) ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Masonry / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '0.75rem',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                group: 'true',
              } as React.CSSProperties}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio:
                    item.aspectRatio === 'portrait'
                      ? '3 / 4'
                      : item.aspectRatio === 'landscape'
                      ? '16 / 9'
                      : '1 / 1',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hover Caption Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(11,11,13,0.9) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-widest)',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
