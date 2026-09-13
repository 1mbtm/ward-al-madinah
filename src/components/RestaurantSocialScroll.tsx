'use client';

import type { FC, ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface SocialCardItem {
    id: string;
    name: string;
    handle: string;
    category: string;
    url: string;
    icon: ReactNode;
}

// 🎯 CIRCULAR REAL APP LOGOS USING USER-PROVIDED ICONS
const CircularAppIcon = ({
    src,
    alt,
    bg = '#FFFFFF',
    shadow,
}: {
    src: string;
    alt: string;
    bg?: string;
    shadow?: string;
}) => (
    <div
        style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: bg,
            boxShadow: shadow || '0 4px 14px rgba(0, 0, 0, 0.35)',
            border: '1.5px solid rgba(255, 255, 255, 0.35)',
            flexShrink: 0,
            position: 'relative',
        }}
    >
        <picture style={{ display: 'flex', width: '60%', height: '60%', alignItems: 'center', justifyContent: 'center' }}>
  <source srcSet={src.replace('.png', '.avif').replace('.jpg', '.avif')} type="image/avif" />
  <source srcSet={src.replace('.png', '.webp').replace('.jpg', '.webp')} type="image/webp" />
  <img src={src} alt={alt} style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
            }} />
</picture>
    </div>
);

// 🍽️ 6 RESTAURANT SOCIAL & CONTACT CHANNELS (BURGUNDY ROSE LUXURY CARDS WITH CIRCULAR LOGOS)
export const RESTAURANT_CHANNELS: SocialCardItem[] = [
    {
        id: 'instagram',
        name: 'Instagram',
        handle: '@medinarose.sa',
        category: 'Official Feed & News',
        url: 'https://www.instagram.com/medinarose.sa',
        icon: (
            <CircularAppIcon
                src="/images/icons/instagram.jpg"
                alt="Instagram"
                shadow="0 4px 14px rgba(225, 48, 108, 0.45)"
            />
        ),
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        handle: '@madin2h_rose0',
        category: 'Viral Moments & Reels',
        url: 'https://www.tiktok.com/@madin2h_rose0',
        icon: (
            <CircularAppIcon
                src="/images/icons/tiktok.jpg"
                alt="TikTok"
                bg="#000000"
                shadow="0 4px 14px rgba(254, 44, 85, 0.4), 0 2px 8px rgba(37, 244, 238, 0.35)"
            />
        ),
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        handle: 'medinarose',
        category: 'Daily Stories & Behind the Scenes',
        url: 'https://linktr.ee/madin2h_rose0',
        icon: (
            <CircularAppIcon
                src="/images/icons/snapchat.png"
                alt="Snapchat"
                bg="#FFFC00"
                shadow="0 4px 14px rgba(255, 252, 0, 0.35)"
            />
        ),
    },
    {
        id: 'googlemap',
        name: 'Google Maps',
        handle: '4.3 ★ (701+ Reviews)',
        category: 'Gate 339, Madinah',
        url: 'https://share.google/Z45RI9GaWryDIT55J',
        icon: (
            <CircularAppIcon
                src="/images/icons/map.avif"
                alt="Google Maps"
                bg="#FFFFFF"
                shadow="0 4px 14px rgba(0, 0, 0, 0.25)"
            />
        ),
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        handle: '+966 54 330 0570',
        category: 'Instant Chat & Orders',
        url: 'https://wa.me/966543300570',
        icon: (
            <CircularAppIcon
                src="/images/icons/whatsapp.avif"
                alt="WhatsApp"
                bg="#25D366"
                shadow="0 4px 14px rgba(37, 211, 102, 0.45)"
            />
        ),
    },
    {
        id: 'call',
        name: 'Direct Call',
        handle: '+966 54 330 0570',
        category: 'Madinah Hotline 24/7',
        url: 'tel:+966543300570',
        icon: (
            <CircularAppIcon
                src="/images/icons/call.avif"
                alt="Direct Call"
                bg="#4CD964"
                shadow="0 4px 14px rgba(76, 217, 100, 0.45)"
            />
        ),
    },
];

// 4x repetition to cover continuous infinite scroll across all screen widths and full drag range
const singleRowCards = Array(4).fill(RESTAURANT_CHANNELS).flat();

export const RestaurantSocialScroll: FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const shouldReduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    // Dedicated MotionValue for manual user drag/swipe offset
    const dragX = useMotionValue(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Smooth single-row scroll translation driven by vertical page scroll (120fps hardware accelerated)
    const rowX = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion
            ? ['0px', '0px']
            : isMobile
                ? ['-950px', '250px']
                : ['-800px', '100px']
    );

    // Optional horizontal trackpad / mouse-wheel listener for smooth horizontal scroll
    const handleWheel = (e: React.WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            const current = dragX.get();
            const minBound = isMobile ? -2800 : -3600;
            const maxBound = isMobile ? 800 : 1200;
            const next = Math.max(minBound, Math.min(maxBound, current - e.deltaX * 1.2));
            dragX.set(next);
        }
    };

    return (
        <div
            ref={sectionRef}
            className="social-scroll-section"
            onWheel={handleWheel}
        >
            {/* Single Scroll Row Container */}
            <div className="social-scroll-row">
                {/* 1. Outer Motion Layer: Driven by Vertical Page Scroll */}
                <motion.div
                    style={{
                        x: rowX,
                        transform: 'translate3d(0,0,0)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="w-max will-change-transform transform-gpu"
                >
                    {/* 2. Inner Motion Layer: Interactive Touch Swipe & Mouse Drag with Momentum */}
                    <motion.div
                        drag="x"
                        style={{
                            x: dragX,
                            touchAction: 'pan-y',
                        }}
                        dragConstraints={{
                            left: isMobile ? -2800 : -3600,
                            right: isMobile ? 800 : 1200,
                        }}
                        dragElastic={0.12}
                        dragTransition={{
                            power: 0.35,
                            timeConstant: 250,
                            bounceStiffness: 400,
                            bounceDamping: 25,
                        }}
                        whileDrag={{ cursor: 'grabbing' }}
                        onDragStart={() => {
                            isDraggingRef.current = true;
                        }}
                        onDragEnd={() => {
                            // Brief delay so synthetic click event from pointerup doesn't trigger card link
                            setTimeout(() => {
                                isDraggingRef.current = false;
                            }, 80);
                        }}
                        className="social-scroll-track"
                    >
                        {singleRowCards.map((item, index) => (
                            <a
                                key={`social-${item.id}-${index}`}
                                href={item.url}
                                target={item.url.startsWith('http') ? '_blank' : undefined}
                                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                onClick={(e) => {
                                    if (isDraggingRef.current) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                }}
                                className="social-scroll-card group"
                            >
                                {/* Subtle glass reflection sheen */}
                                <div className="social-scroll-sheen" />

                                {/* Top: Icon + Category */}
                                <div className="social-scroll-card-top">
                                    <div className="social-scroll-icon">
                                        {item.icon}
                                    </div>
                                    <span className="social-scroll-category">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Bottom: Title, Handle & Arrow Link */}
                                <div className="social-scroll-card-bottom">
                                    <div>
                                        <h3 className="social-scroll-title">
                                            {item.name}
                                        </h3>
                                        <p className="social-scroll-handle">
                                            {item.handle}
                                        </p>
                                    </div>
                                    <div className="social-scroll-arrow">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

