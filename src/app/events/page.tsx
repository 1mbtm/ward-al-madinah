import React from 'react';
import { notFound } from 'next/navigation';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import EventsSection from '@/components/modules/EventsSection';
import InquiryForm from '@/components/modules/InquiryForm';

export default function EventsPage() {
  if (!cafeConfig.features.showEvents) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Specialty Gatherings"
            title="Events, Masterclasses & Experiences"
            subtitle="Engage with certified Q-Graders, enjoy weekend acoustic and vinyl sessions, or host your private coffee reception."
          />
        </div>
      </section>

      {/* Main Events Showcase */}
      <EventsSection />

      {/* Private Group Inquiries */}
      <section className="section-padding ambient-glow" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <SectionHeading
            eyebrow="Custom Hosting"
            title="Inquire for Private Events"
            subtitle="Our spaces and master baristas are available for private cupping workshops, corporate breakfasts, and VIP gatherings."
            className="mb-8"
            style={{ marginBottom: '2.5rem' } as React.CSSProperties}
          />
          <InquiryForm defaultType="Private Event" />
        </div>
      </section>
    </div>
  );
}
