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
}

// 🍽️ 6 RESTAURANT SOCIAL & CONTACT CHANNELS (IN 1 ROW)
export const RESTAURANT_CHANNELS: SocialCardItem[] = [
    {
        id: 'instagram',
        name: 'Instagram',
        handle: '@medinarose.icecream',
        category: 'Visuals & Menu',
        url: 'https://instagram.com/medinarose.icecream',
        icon: <Instagram className="w-6 h-6 text-[#E1306C]" />,
    },
    {
        id: 'facebook',
        name: 'Facebook',
        handle: 'Medina Rose Gelateria',
        category: 'Community & Updates',
        url: 'https://facebook.com',
        icon: <Facebook className="w-6 h-6 text-[#1877F2]" />,
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        handle: 'medinarose',
        category: 'Daily Stories',
        url: 'https://snapchat.com',
        icon: <Ghost className="w-6 h-6 text-[#FFFC00]" />,
    },
    {
        id: 'googlemap',
        name: 'Google Maps',
        handle: 'Find Location',
        category: 'Madinah, KSA',
        url: 'https://maps.google.com',
        icon: <MapPin className="w-6 h-6 text-[#34A853]" />,
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        handle: 'Orders & Booking',
        category: 'Instant Chat',
        url: 'https://wa.me/966500000000',
        icon: <MessageCircle className="w-6 h-6 text-[#25D366]" />,
    },
    {
        id: 'call',
        name: 'Direct Call',
        handle: '+966 50 000 0000',
        category: 'Phone Inquiries',
        url: 'tel:+966500000000',
        icon: <PhoneCall className="w-6 h-6 text-[#F59E0B]" />,
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
                                className="social-scroll-card w-[250px] h-[140px] sm:w-[280px] sm:h-[155px] rounded-2xl flex-shrink-0 relative overflow-hidden bg-gradient-to-b from-[#1c1c1c]/90 via-[#141414]/90 to-[#0a0a0a]/90 border border-white/15 shadow-lg md:hover:border-white/40 md:hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between p-5 cursor-grab active:cursor-grabbing select-none backdrop-blur-sm"
                            >
                                {/* Subtle glass reflection sheen */}
                                <div
                                    className="social-scroll-sheen absolute inset-0 pointer-events-none opacity-40"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(255,255,255,0.03) 65%, transparent 100%)',
                                    }}
                                />

                                {/* Top: Icon + Category */}
                                <div className="social-scroll-card-top flex items-center justify-between relative z-10 pointer-events-none">
                                    <div className="social-scroll-icon p-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="social-scroll-category font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Bottom: Title, Handle & Arrow Link */}
                                <div className="social-scroll-card-bottom relative z-10 flex items-end justify-between pt-3 border-t border-white/10 pointer-events-none">
                                    <div>
                                        <h3 className="social-scroll-title font-bold text-sm sm:text-base text-white group-hover:text-white transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="social-scroll-handle font-mono text-[11px] sm:text-xs text-white/60 truncate max-w-[160px] sm:max-w-[190px]">
                                            {item.handle}
                                        </p>
                                    </div>
                                    <div className="social-scroll-arrow text-white/60 group-hover:text-white transition-colors pb-0.5">
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

