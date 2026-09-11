'use client';

import type { FC, ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';
import {
    Instagram,
    Facebook,
    MapPin,
    PhoneCall,
    ArrowUpRight,
    MessageCircle,
    Ghost
} from 'lucide-react';

export interface SocialCardItem {
    id: string;
    name: string;
    handle: string;
    category: string;
    url: string;
    icon: ReactNode;
    bg: string;
    border: string;
    shadow: string;
    textColor: string;
    categoryColor: string;
    handleColor: string;
    badgeBg: string;
    badgeBorder: string;
    arrowColor: string;
}

// 🍽️ 6 RESTAURANT SOCIAL & CONTACT CHANNELS WITH OFFICIAL APP BRAND COLORS
export const RESTAURANT_CHANNELS: SocialCardItem[] = [
    {
        id: 'instagram',
        name: 'Instagram',
        handle: '@medinarose.icecream',
        category: 'Visuals & Menu',
        url: 'https://instagram.com/medinarose.icecream',
        icon: <Instagram className="w-6 h-6 text-white" />,
        bg: 'linear-gradient(135deg, #405DE6 0%, #833AB4 28%, #C13584 52%, #FD1D1D 74%, #F56040 88%, #FCAF45 100%)',
        border: 'rgba(255, 255, 255, 0.35)',
        shadow: '0 12px 32px rgba(193, 53, 132, 0.45)',
        textColor: '#FFFFFF',
        categoryColor: 'rgba(255, 255, 255, 0.85)',
        handleColor: 'rgba(255, 255, 255, 0.92)',
        badgeBg: 'rgba(255, 255, 255, 0.22)',
        badgeBorder: 'rgba(255, 255, 255, 0.35)',
        arrowColor: '#FFFFFF',
    },
    {
        id: 'facebook',
        name: 'Facebook',
        handle: 'Medina Rose Gelateria',
        category: 'Community & Updates',
        url: 'https://facebook.com',
        icon: <Facebook className="w-6 h-6 text-white" fill="white" />,
        bg: 'linear-gradient(145deg, #1877F2 0%, #1162cc 55%, #0a4696 100%)',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: '0 12px 32px rgba(24, 119, 242, 0.45)',
        textColor: '#FFFFFF',
        categoryColor: 'rgba(255, 255, 255, 0.85)',
        handleColor: 'rgba(255, 255, 255, 0.92)',
        badgeBg: 'rgba(255, 255, 255, 0.2)',
        badgeBorder: 'rgba(255, 255, 255, 0.3)',
        arrowColor: '#FFFFFF',
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        handle: 'medinarose',
        category: 'Daily Stories',
        url: 'https://snapchat.com',
        icon: <Ghost className="w-6 h-6 text-black" fill="white" stroke="#000000" strokeWidth={2.2} />,
        bg: 'linear-gradient(145deg, #FFFC00 0%, #FFE600 55%, #F0C400 100%)',
        border: 'rgba(0, 0, 0, 0.18)',
        shadow: '0 12px 32px rgba(230, 196, 0, 0.45)',
        textColor: '#000000',
        categoryColor: 'rgba(0, 0, 0, 0.72)',
        handleColor: 'rgba(0, 0, 0, 0.88)',
        badgeBg: 'rgba(0, 0, 0, 0.08)',
        badgeBorder: 'rgba(0, 0, 0, 0.16)',
        arrowColor: '#000000',
    },
    {
        id: 'googlemap',
        name: 'Google Maps',
        handle: 'Find Location',
        category: 'Madinah, KSA',
        url: 'https://maps.google.com',
        icon: <MapPin className="w-6 h-6 text-white" fill="#EA4335" stroke="#FFFFFF" strokeWidth={1.5} />,
        bg: 'linear-gradient(145deg, #1A73E8 0%, #1557b0 50%, #0d3b7a 100%)',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: '0 12px 32px rgba(26, 115, 232, 0.45)',
        textColor: '#FFFFFF',
        categoryColor: 'rgba(255, 255, 255, 0.85)',
        handleColor: 'rgba(255, 255, 255, 0.92)',
        badgeBg: 'rgba(255, 255, 255, 0.2)',
        badgeBorder: 'rgba(255, 255, 255, 0.3)',
        arrowColor: '#FFFFFF',
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        handle: 'Orders & Booking',
        category: 'Instant Chat',
        url: 'https://wa.me/966500000000',
        icon: <MessageCircle className="w-6 h-6 text-white" fill="white" />,
        bg: 'linear-gradient(145deg, #25D366 0%, #128C7E 55%, #075E54 100%)',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: '0 12px 32px rgba(37, 211, 102, 0.45)',
        textColor: '#FFFFFF',
        categoryColor: 'rgba(255, 255, 255, 0.85)',
        handleColor: 'rgba(255, 255, 255, 0.92)',
        badgeBg: 'rgba(255, 255, 255, 0.2)',
        badgeBorder: 'rgba(255, 255, 255, 0.3)',
        arrowColor: '#FFFFFF',
    },
    {
        id: 'call',
        name: 'Direct Call',
        handle: '+966 50 000 0000',
        category: 'Phone Inquiries',
        url: 'tel:+966500000000',
        icon: <PhoneCall className="w-6 h-6 text-white" fill="white" />,
        bg: 'linear-gradient(145deg, #4CD964 0%, #2bb043 55%, #1877F2 100%)',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: '0 12px 32px rgba(76, 217, 100, 0.45)',
        textColor: '#FFFFFF',
        categoryColor: 'rgba(255, 255, 255, 0.85)',
        handleColor: 'rgba(255, 255, 255, 0.92)',
        badgeBg: 'rgba(255, 255, 255, 0.2)',
        badgeBorder: 'rgba(255, 255, 255, 0.3)',
        arrowColor: '#FFFFFF',
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
            className="social-scroll-section w-full py-8 md:py-12 overflow-hidden relative"
            style={{ contain: 'paint layout' }}
            onWheel={handleWheel}
        >
            {/* Single Scroll Row Container */}
            <div className="social-scroll-row overflow-hidden w-full py-3" style={{ contain: 'content' }}>
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
                        className="social-scroll-track flex gap-4 sm:gap-6 w-max py-2 cursor-grab active:cursor-grabbing select-none"
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
                                className="social-scroll-card w-[250px] h-[140px] sm:w-[280px] sm:h-[155px] rounded-2xl flex-shrink-0 relative overflow-hidden transition-all duration-200 group flex flex-col justify-between p-5 cursor-grab active:cursor-grabbing select-none backdrop-blur-md"
                                style={{
                                    background: item.bg,
                                    border: `1px solid ${item.border}`,
                                    boxShadow: item.shadow,
                                }}
                            >
                                {/* Subtle glass reflection sheen */}
                                <div
                                    className="social-scroll-sheen absolute inset-0 pointer-events-none opacity-25"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 45%, rgba(255,255,255,0.05) 65%, transparent 100%)',
                                    }}
                                />

                                {/* Top: Icon + Category */}
                                <div className="social-scroll-card-top flex items-center justify-between relative z-10 pointer-events-none">
                                    <div
                                        className="social-scroll-icon p-2 rounded-xl group-hover:scale-110 transition-transform"
                                        style={{
                                            backgroundColor: item.badgeBg,
                                            border: `1px solid ${item.badgeBorder}`,
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <span
                                        className="social-scroll-category font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold"
                                        style={{ color: item.categoryColor }}
                                    >
                                        {item.category}
                                    </span>
                                </div>

                                {/* Bottom: Title, Handle & Arrow Link */}
                                <div
                                    className="social-scroll-card-bottom relative z-10 flex items-end justify-between pt-3 border-t pointer-events-none"
                                    style={{ borderColor: item.badgeBorder }}
                                >
                                    <div>
                                        <h3
                                            className="social-scroll-title font-bold text-sm sm:text-base transition-colors"
                                            style={{ color: item.textColor }}
                                        >
                                            {item.name}
                                        </h3>
                                        <p
                                            className="social-scroll-handle font-mono text-[11px] sm:text-xs truncate max-w-[160px] sm:max-w-[190px]"
                                            style={{ color: item.handleColor }}
                                        >
                                            {item.handle}
                                        </p>
                                    </div>
                                    <div
                                        className="social-scroll-arrow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform pb-0.5"
                                        style={{ color: item.arrowColor }}
                                    >
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

