import React from 'react';
import { cafeConfig } from '@/config/cafe.config';
import Button from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function StorySection() {
  const { story } = cafeConfig;

  return (
    <section className="section-padding ambient-glow" style={{ position: 'relative' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Visual Showcase (Asymmetric Image Matrix) */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '88%',
                aspectRatio: '4 / 5',
                borderRadius: '20px',
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '0',
                width: '55%',
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '3px solid var(--bg-primary)',
                boxShadow: 'var(--shadow-lg)',
              }}
            />
            {/* Floating Artisanal Stamp */}
            <div
              style={{
                position: 'absolute',
                top: '2rem',
                left: '-1.5rem',
                background: 'var(--bg-glass-heavy)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-accent)',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Sparkles size={16} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-wide)' }}>
                Single-Origin Specialty
              </span>
            </div>
          </div>

          {/* Narrative Content */}
          <div>
            <SectionHeading
              eyebrow="Our Story & Ethos"
              title={story.title}
              align="left"
              subtitle={story.tagline}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                margin: '2rem 0',
              }}
            >
              {story.paragraphs.map((p, idx) => (
                <p key={idx} style={{ fontSize: '1rem', lineHeight: 1.75 }}>
                  {p}
                </p>
              ))}
            </div>

            {story.highlightQuote && (
              <blockquote
                style={{
                  borderLeft: '2px solid var(--accent-gold)',
                  paddingLeft: '1.25rem',
                  margin: '2rem 0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                }}
              >
                "{story.highlightQuote}"
              </blockquote>
            )}

            {/* Stats Row */}
            {story.stats && story.stats.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${story.stats.length}, 1fr)`,
                  gap: '1.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-subtle)',
                  marginBottom: '2rem',
                }}
              >
                {story.stats.map((stat, idx) => (
                  <div key={idx}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'var(--accent-gold)',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        letterSpacing: 'var(--tracking-wide)',
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Button variant="outline" href="/about/">
              <span>Read Full Philosophy</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
