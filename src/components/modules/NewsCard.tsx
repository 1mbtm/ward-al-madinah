import React from 'react';
import Link from 'next/link';
import { JournalPostData } from '@/types';
import { Clock, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  post: JournalPostData;
  className?: string;
}

export default function NewsCard({ post, className = '' }: NewsCardProps) {
  return (
    <article
      className={`glass-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.25rem',
      }}
    >
      {/* Article Image Banner */}
      {post.image && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            backgroundImage: `url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px',
            marginBottom: '1.25rem',
          }}
        >
          {post.category && (
            <div
              style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
              }}
            >
              {post.category}
            </div>
          )}
        </div>
      )}

      {/* Meta info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginBottom: '0.6rem',
        }}
      >
        <span>{post.publishedDate}</span>
        <span>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={12} />
          <span>{post.readTimeMinutes} min read</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '1.2rem', lineHeight: 1.35, marginBottom: '0.75rem' }}>
        <Link
          href={`/journal/${post.slug}/`}
          style={{ color: 'var(--text-primary)', transition: 'color var(--duration-fast) ease' }}
        >
          {post.title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
        }}
      >
        {post.excerpt}
      </p>

      {/* Read More Link */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
        <Link
          href={`/journal/${post.slug}/`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--accent-gold)',
          }}
        >
          <span>Read Story</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
