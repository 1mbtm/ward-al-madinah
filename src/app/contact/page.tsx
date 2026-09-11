import React from 'react';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import InquiryForm from '@/components/modules/InquiryForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Connect With Us"
            title="Hospitality & Concierge"
            subtitle="Have a question about our beans, catering options, or private masterclasses? We are here to assist."
          />
        </div>
      </section>

      {/* Main Grid: Contact Cards + Inquiry Form */}
      <section className="section-padding ambient-glow">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Direct Details */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                Headquarters & Direct Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cafeConfig.contact.primaryPhone && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Phone size={18} color="var(--accent-gold)" />
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', color: 'var(--text-muted)' }}>
                        Telephone
                      </span>
                    </div>
                    <a
                      href={`tel:${cafeConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
                      style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      {cafeConfig.contact.primaryPhone}
                    </a>
                  </div>
                )}

                {cafeConfig.contact.email && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Mail size={18} color="var(--accent-gold)" />
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', color: 'var(--text-muted)' }}>
                        Electronic Mail
                      </span>
                    </div>
                    <a
                      href={`mailto:${cafeConfig.contact.email}`}
                      style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      {cafeConfig.contact.email}
                    </a>
                  </div>
                )}

                {cafeConfig.contact.headOfficeAddress && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <MapPin size={18} color="var(--accent-gold)" />
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', color: 'var(--text-muted)' }}>
                        Head Office Address
                      </span>
                    </div>
                    <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                      {cafeConfig.contact.headOfficeAddress}
                    </p>
                  </div>
                )}

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <Clock size={18} color="var(--accent-gold)" />
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', color: 'var(--text-muted)' }}>
                      Hospitality Service
                    </span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Our customer support team is available during standard operating hours Monday through Sunday.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
