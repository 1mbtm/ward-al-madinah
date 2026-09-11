import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cafeConfig } from '@/config/cafe.config';
import Button from '@/components/ui/Button';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

export async function generateStaticParams() {
  return cafeConfig.journal.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!cafeConfig.features.showJournal) {
    notFound();
  }

  const post = cafeConfig.journal.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            href="/journal/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wider)',
              color: 'var(--accent-gold)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Journal Archive</span>
          </Link>
        </div>

        {/* Category & Meta */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}
        >
          {post.category && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--accent-gold)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              <Tag size={13} />
              {post.category}
            </span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} />
            {post.publishedDate}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={13} />
            {post.readTimeMinutes} min read
          </span>
        </div>

        {/* Article Headline */}
        <h1
          style={{
            fontSize: 'var(--text-h1)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--accent-crema)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            fontStyle: 'italic',
            borderLeft: '2px solid var(--accent-gold)',
            paddingLeft: '1.25rem',
          }}
        >
          {post.excerpt}
        </p>

        {/* Featured Image */}
        {post.image && (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              border: '1px solid var(--border-glass)',
              marginBottom: '3rem',
              boxShadow: 'var(--shadow-md)',
            }}
          />
        )}

        {/* Article Body Content */}
        <div
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-line',
            marginBottom: '4rem',
          }}
        >
          {post.content}
        </div>

        {/* Bottom Share / Return Footer */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button variant="outline" size="sm" href="/journal/">
            <ArrowLeft size={14} />
            <span>More Stories</span>
          </Button>

          {cafeConfig.features.showRetail && (
            <Button variant="primary" size="sm" href="/shop/">
              <span>Explore Featured Beans</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
