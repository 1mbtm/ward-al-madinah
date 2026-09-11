'use client';

import React, { useState } from 'react';
import { cafeConfig } from '@/config/cafe.config';
import Button from '@/components/ui/Button';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HeroSection() {
  const [selectedRegion, setSelectedRegion] = useState(
    cafeConfig.regions && cafeConfig.regions.length > 0
      ? cafeConfig.regions[0]
      : undefined
  );

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '7rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Ambient Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(11,11,13,0.3) 0%, rgba(11,11,13,0.92) 85%), url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Decorative Warm Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(11,11,13,0.6) 0%, transparent 40%, rgba(11,11,13,1) 100%)',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {/* Eyebrow */}
          <span
            className="text-eyebrow"
            style={{
              background: 'rgba(197, 168, 128, 0.1)',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(197, 168, 128, 0.25)',
              marginBottom: '1.5rem',
            }}
          >
            Specialty Coffee & Artisanal Roastery
          </span>

          {/* Main Statement Headline */}
          <h1
            className="text-hero"
            style={{
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
            }}
          >
            Where coffee is more <br />
            <span style={{ color: 'var(--accent-gold)' }}>than a drink.</span>{' '}
            <span className="italic-serif" style={{ fontWeight: 400 }}>
              It’s an experience.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            {cafeConfig.meta.description}
          </p>

          {/* Call-to-Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3.5rem',
            }}
          >
            <Button variant="primary" size="lg" href="/menu/">
              <span>Explore The Menu</span>
              <ArrowRight size={16} />
            </Button>
            {cafeConfig.features.showBranches && (
              <Button variant="secondary" size="lg" href="/locations/">
                <span>Find A Location</span>
                <MapPin size={16} />
              </Button>
            )}
          </div>

          {/* Regional Market Selector (Conditional) */}
          {cafeConfig.regions && cafeConfig.regions.length > 0 && (
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.75rem',
                borderRadius: '16px',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-widest)',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                Select Your District
              </span>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {cafeConfig.regions.map((region) => {
                  const isSelected = selectedRegion === region;
                  return (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      style={{
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.8rem',
                        letterSpacing: 'var(--tracking-wide)',
                        borderRadius: '9999px',
                        background: isSelected
                          ? 'var(--accent-gold)'
                          : 'rgba(255,255,255,0.05)',
                        color: isSelected
                          ? 'var(--text-inverse)'
                          : 'var(--text-secondary)',
                        fontWeight: isSelected ? 600 : 400,
                        transition: 'all var(--duration-fast) ease',
                      }}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
