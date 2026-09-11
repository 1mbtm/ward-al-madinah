import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowLeft, Coffee } from 'lucide-react';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <Coffee
          size={56}
          color="var(--accent-gold)"
          style={{ margin: '0 auto 1.5rem', opacity: 0.8 }}
        />
        <span className="text-eyebrow">404 — Page Unavailable</span>
        <h1
          style={{
            fontSize: 'var(--text-h2)',
            marginBottom: '1rem',
          }}
        >
          This Roast Has Moved
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          The page you are looking for is either disabled in your current configuration or has been relocated to another origin.
        </p>
        <Button variant="primary" href="/">
          <ArrowLeft size={16} />
          <span>Return To Main Lounge</span>
        </Button>
      </div>
    </section>
  );
}
