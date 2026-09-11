import React from 'react';
import { notFound } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import InteractiveMap from '@/components/modules/InteractiveMap';
import BranchCard from '@/components/modules/BranchCard';

export default function LocationsPage() {
  if (!cafeConfig.features.showBranches) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Locations Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Architectural Sanctuaries"
            title="Our Locations & Houses"
            subtitle="Explore our spaces across prime metropolitan districts. Each house offers distinct architectural design with our signature coffee standards."
          />
        </div>
      </section>

      {/* Interactive Map Section */}
      <InteractiveMap />

      {/* All Branch Grid */}
      <section className="section-padding-sm ambient-glow" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Directory"
            title="All House Locations"
            subtitle="Find exact addresses, operating hours, and direct navigation links."
            className="mb-12"
            style={{ marginBottom: '3rem' } as React.CSSProperties}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {cafeConfig.branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
