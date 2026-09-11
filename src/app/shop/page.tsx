'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ProductCard from '@/components/modules/ProductCard';

export default function ShopPage() {
  if (!cafeConfig.features.showRetail) {
    notFound();
  }

  const products = cafeConfig.retailProducts;
  const [selectedRoast, setSelectedRoast] = useState<string>('All');
  const [selectedProcess, setSelectedProcess] = useState<string>('All');

  const filteredProducts = products.filter((p) => {
    const roastMatch = selectedRoast === 'All' || p.roastLevel === selectedRoast;
    const processMatch = selectedProcess === 'All' || p.process === selectedProcess;
    return roastMatch && processMatch;
  });

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Shop Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Specialty Retail Collection"
            title="Whole Bean Coffee Reserve"
            subtitle="Explore high-scoring micro-lots sourced directly from partner estates and roasted fresh to order."
          />
        </div>
      </section>

      {/* Filter Controls Bar */}
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '16px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
          }}
        >
          {/* Roast Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              Roast:
            </span>
            {['All', 'Light', 'Medium-Light', 'Medium', 'Omni'].map((roast) => {
              const isActive = selectedRoast === roast;
              return (
                <button
                  key={roast}
                  onClick={() => setSelectedRoast(roast)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    background: isActive ? 'var(--accent-gold)' : 'transparent',
                    color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {roast}
                </button>
              );
            })}
          </div>

          <span style={{ color: 'var(--border-glass)' }}>|</span>

          {/* Process Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              Process:
            </span>
            {['All', 'Washed', 'Natural', 'Anaerobic', 'Honey'].map((process) => {
              const isActive = selectedProcess === process;
              return (
                <button
                  key={process}
                  onClick={() => setSelectedProcess(process)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    background: isActive ? 'var(--accent-gold)' : 'transparent',
                    color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {process}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="container">
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Coffee Matching Filter</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try selecting "All" to view our complete single-origin catalog.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
