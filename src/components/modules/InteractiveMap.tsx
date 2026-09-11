'use client';

import React, { useState } from 'react';
import { cafeConfig } from '@/config/cafe.config';
import BranchCard from './BranchCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { MapPin, Navigation } from 'lucide-react';

export default function InteractiveMap() {
  const branches = cafeConfig.branches;
  const [activeBranchId, setActiveBranchId] = useState<string>(
    branches[0]?.id || ''
  );

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  return (
    <section className="section-padding ambient-glow" id="branches">
      <div className="container">
        <SectionHeading
          eyebrow="Our Locations"
          title="Find Your Nearest Specialty House"
          subtitle="Immerse yourself in our architectural cafe spaces crafted for elevated coffee rituals and warm hospitality."
          className="mb-12"
          style={{ marginBottom: '3.5rem' } as React.CSSProperties}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Interactive Vector Coordinate Map Canvas */}
          <div className="map-canvas-container">
            {/* Ambient Vector Grid Background */}
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.25,
                pointerEvents: 'none',
              }}
            >
              <defs>
                <pattern
                  id="map-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(197, 168, 128, 0.3)"
                    strokeWidth="0.5"
                  />
                  <circle cx="0" cy="0" r="1.5" fill="rgba(197, 168, 128, 0.5)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              {/* Abstract City Contours / Coastline Waves */}
              <path
                d="M 0 320 Q 250 280 500 360 T 1000 300 T 1500 420"
                fill="none"
                stroke="rgba(197, 168, 128, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="6,6"
              />
              <path
                d="M 0 420 Q 300 380 600 460 T 1200 400"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />
            </svg>

            {/* Coordinate Pins */}
            {branches.map((branch) => {
              const x = branch.coordinates?.xPercent ?? 50;
              const y = branch.coordinates?.yPercent ?? 50;
              const isActive = branch.id === activeBranchId;

              return (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranchId(branch.id)}
                  className={`map-pin ${isActive ? 'active' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  aria-label={`Select ${branch.name}`}
                />
              );
            })}

            {/* Map Watermark & Interactive Legend */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--bg-glass-heavy)',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--border-glass)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              <Navigation size={13} color="var(--accent-gold)" />
              <span>Interactive District Radar</span>
            </div>
          </div>

          {/* Active Branch Preview Drawer / Card */}
          <div>
            {activeBranch && (
              <BranchCard
                branch={activeBranch}
                isActive={true}
              />
            )}

            {/* Branch Quick Selector List */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
                marginTop: '1.25rem',
              }}
            >
              {branches.map((b) => {
                const isSelected = b.id === activeBranchId;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBranchId(b.id)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      background: isSelected
                        ? 'rgba(197, 168, 128, 0.15)'
                        : 'var(--bg-card)',
                      border: `1px solid ${
                        isSelected ? 'var(--accent-gold)' : 'var(--border-glass)'
                      }`,
                      borderRadius: '10px',
                      color: isSelected
                        ? 'var(--accent-gold)'
                        : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      transition: 'all var(--duration-fast) ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={12} color={isSelected ? 'var(--accent-gold)' : 'var(--text-muted)'} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
