import React from 'react';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export default function EventsSection() {
  const events = cafeConfig.events;

  return (
    <section className="section-padding ambient-glow" id="events">
      <div className="container">
        <SectionHeading
          eyebrow="Culture & Gatherings"
          title="Events & Coffee Experiences"
          subtitle="From weekend ambient vinyl sets to intimate origin masterclasses, discover our vibrant community gatherings."
          className="mb-12"
          style={{ marginBottom: '3.5rem' } as React.CSSProperties}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Event Image Banner */}
              {event.images && event.images.length > 0 && (
                <div
                  style={{
                    position: 'relative',
                    width: 'calc(100% + 3.5rem)',
                    marginLeft: '-1.75rem',
                    marginTop: '-1.75rem',
                    marginBottom: '1.5rem',
                    aspectRatio: '16 / 9',
                    backgroundImage: `url(${event.images[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--accent-gold)',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>Special Experience</span>
                  </div>
                </div>
              )}

              {/* Event Title & Subtitle */}
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>{event.title}</h3>
                {event.subtitle && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                    {event.subtitle}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {event.description}
              </p>

              {/* Schedule & Location Details */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Calendar size={15} color="var(--accent-gold)" />
                  <span>{event.dateOrSchedule}</span>
                </div>
                {event.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <MapPin size={15} color="var(--accent-gold)" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" href="/contact/" style={{ width: '100%' }}>
                <span>Inquire for Private Group</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
