'use client';

import React, { useState, useEffect, useRef } from 'react';
import { goodsSrcSet, goodsFallbackSrc, type GoodsItem } from '@/data/goodsData';
import { Plus } from 'lucide-react';

interface GoodsCardProps {
  item: GoodsItem;
  /** Index in the overall carousel — determines eager/lazy loading */
  index: number;
  /** Current carousel index — used to decide preload window */
  currentIndex: number;
  /** Total number of slides — used for wrap-around preload */
  total: number;
  /** Callback for adding to cart */
  onAddToCart: (title: string) => void;
}

/**
 * GoodsCard — single carousel card with:
 * - dominant-colour CSS placeholder (warm parchment, matches brand palette)
 * - smooth opacity transition from placeholder → real image
 * - eager load for first 3 visible cards, lazy for the rest
 * - srcSet/sizes for responsive delivery (480/800/1200px)
 * - aspect-ratio locked to 1:1 — no layout shift
 * - preloads the next 2 cards in the carousel window
 */
export default function GoodsCard({ item, index, currentIndex, total, onAddToCart }: GoodsCardProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine loading priority:
  // Cards 0, 1, 2 in the initial view should load eagerly
  // After carousel navigation: current ± 2 window loads eagerly
  const isInEagerWindow = index < 3 || Math.abs(index - currentIndex) <= 2;
  const loadingAttr: 'eager' | 'lazy' = isInEagerWindow ? 'eager' : 'lazy';

  // If the image is already cached (e.g. revisit), mark loaded immediately
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  // Preload next 2 images beyond current viewport window
  useEffect(() => {
    const preloadIndices = [
      (currentIndex + 3) % total,
      (currentIndex + 4) % total,
    ];
    if (!preloadIndices.includes(index)) return;

    // Use <link rel="preload"> for AVIF (most efficient modern format)
    const slug = item.slug;
    const linkId = `goods-preload-${slug}`;
    if (document.getElementById(linkId)) return; // already injected

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'preload';
    link.as = 'image';
    link.href = `/images/goods-optimized/${slug}-800.avif`;
    link.type = 'image/avif';
    document.head.appendChild(link);

    return () => {
      // Keep preloaded links in head
    };
  }, [currentIndex, index, item.slug, total]);

  return (
    <div className="heritage-card-unit">
      <div
        className="menu-card"
        style={{
          // Lock aspect ratio BEFORE image loads — prevents layout shift
          aspectRatio: '1 / 1',
          // Warm parchment placeholder matching brand palette
          background: loaded ? 'transparent' : '#F5EDE3',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <picture>
          <source
            srcSet={goodsSrcSet(item.slug, 'avif')}
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 270px"
            type="image/avif"
          />
          <source
            srcSet={goodsSrcSet(item.slug, 'webp')}
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 270px"
            type="image/webp"
          />
          <img
            ref={imgRef}
            src={goodsFallbackSrc(item.slug)}
            srcSet={goodsSrcSet(item.slug, 'jpg')}
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 270px"
            alt={item.alt}
            width={800}
            height={800}
            loading={loadingAttr}
            decoding="async"
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              // Smooth fade-in from placeholder → real image
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          />
        </picture>
      </div>
      <button
        type="button"
        className="heritage-cart-btn"
        onClick={() => onAddToCart(item.title)}
        aria-label={`Add ${item.title} to cart`}
      >
        <Plus size={13} strokeWidth={2.4} />
        <span>Add to cart</span>
      </button>
    </div>
  );
}
