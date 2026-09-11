import React from 'react';
import { notFound } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import GalleryGrid from '@/components/modules/GalleryGrid';

export default function GalleryPage() {
  if (!cafeConfig.features.showGallery) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Visual Portfolio"
            title="The Cafe Architecture & Atmosphere"
            subtitle="Curated moments capturing our brewing craft, spatial aesthetics, and community life."
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <GalleryGrid items={cafeConfig.galleryItems} showHeading={false} />
    </div>
  );
}
