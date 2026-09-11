import React from 'react';
import { notFound } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { ShieldCheck, Flame, Sparkles, Scale, Compass, ArrowRight } from 'lucide-react';

export default function RoasteryPage() {
  if (!cafeConfig.features.showRoastery) {
    notFound();
  }

  const { roasteryCraft } = cafeConfig;

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Roastery Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="The Science & Artisanship"
            title={roasteryCraft.title}
            subtitle={roasteryCraft.subtitle}
          />
        </div>
      </section>

      {/* Sourcing Narrative Grid */}
      <section className="section-padding ambient-glow">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="text-eyebrow">Direct Terroir Sourcing</span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '1.25rem' }}>
                High-Altitude Micro-Lots
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {roasteryCraft.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ fontSize: '1rem', lineHeight: 1.75 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: '20px',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid var(--border-glass)',
                  boxShadow: 'var(--shadow-md)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Roasting Standards Matrix */}
      <section className="section-padding ambient-glow" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Precision Protocols"
            title="The 3 Pillars of Roast Development"
            subtitle="Custom roast curves developed specifically for each varietal, density, and moisture level."
            className="mb-12"
            style={{ marginBottom: '3.5rem' } as React.CSSProperties}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {roasteryCraft.features.map((feature, idx) => (
              <div key={idx} className="glass-card">
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(197, 168, 128, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {idx === 0 ? <ShieldCheck size={22} /> : idx === 1 ? <Flame size={22} /> : <Sparkles size={22} />}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {cafeConfig.features.showRetail && (
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Button variant="primary" size="lg" href="/shop/">
                <span>Explore Roasted Retail Beans</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
