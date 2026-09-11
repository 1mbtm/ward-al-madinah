import React from 'react';
import { notFound } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import NewsCard from '@/components/modules/NewsCard';

export default function JournalPage() {
  if (!cafeConfig.features.showJournal) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Specialty Journal & Culture"
            title="Stories, Terroirs & Brew Guides"
            subtitle="Deep dives into single-origin terroir, roasting chemistry, and barista methodologies."
          />
        </div>
      </section>

      {/* Articles Archive Grid */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {cafeConfig.journal.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
