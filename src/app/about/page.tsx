import React from 'react';
import { cafeConfig } from '@/config/cafe.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import StorySection from '@/components/modules/StorySection';
import { Leaf, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Banner */}
      <section className="section-padding-sm ambient-glow" style={{ textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Craft & Heritage"
            title="The Pursuit of Coffee Perfection"
            subtitle="Bridging the gap between high-altitude producers and discerning coffee lovers."
          />
        </div>
      </section>

      {/* Main Story Block */}
      <StorySection />

      {/* Core Values / Philosophy Matrix */}
      <section className="section-padding ambient-glow" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Foundational Values"
            title="What Guides Every Extraction"
            subtitle="From bean selection to guest service, our standards remain uncompromising."
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
            <div className="glass-card">
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
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Origin Purity</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                We celebrate terroir. We avoid over-roasting so that the authentic floral, fruity, and sweet genetic characteristics of each varietal shine unimpeded.
              </p>
            </div>

            <div className="glass-card">
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
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Producer Equity</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Specialty coffee requires extraordinary labor at origin. We pay premium prices directly to farmers, fostering generational quality and thriving communities.
              </p>
            </div>

            <div className="glass-card">
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
                <Leaf size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Sustainable Horizons</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Zero single-use plastics across our spaces, low-emission roasting machinery, and compostable packaging at every guest touchpoint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (if showTeam: true) */}
      {cafeConfig.features.showTeam && (
        <section className="section-padding ambient-glow">
          <div className="container">
            <SectionHeading
              eyebrow="The Custodians"
              title="Leadership & Head Roasters"
              subtitle="The certified Q-graders, artisans, and culinary directors behind every refined cup."
              className="mb-12"
              style={{ marginBottom: '3.5rem' } as React.CSSProperties}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
              }}
            >
              {cafeConfig.team.map((member) => (
                <div key={member.id} className="glass-card" style={{ textAlign: 'center' }}>
                  {member.image && (
                    <div
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        margin: '0 auto 1.25rem',
                        border: '2px solid var(--accent-gold)',
                      }}
                    />
                  )}
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{member.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', display: 'block', marginBottom: '0.75rem' }}>
                    {member.role}
                  </span>
                  {member.bio && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
