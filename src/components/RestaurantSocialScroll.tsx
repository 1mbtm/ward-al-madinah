'use client';

import type { FC, ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
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

// 3x repetition to cover continuous infinite scroll across all screen widths
const singleRowCards = Array(3).fill(RESTAURANT_CHANNELS).flat();

export const RestaurantSocialScroll: FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

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

    // Smooth single-row scroll translation (120fps hardware accelerated)
    const rowX = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion
            ? ['0px', '0px']
            : isMobile
                ? ['-950px', '250px']
                : ['-800px', '100px']
    );

    return (
        <div
            ref={sectionRef}
            className="social-scroll-section w-full py-8 md:py-12 overflow-hidden relative"
            style={{ contain: 'paint layout' }}
        >
            {/* Single Scroll Row */}
            <div className="social-scroll-row overflow-hidden w-full py-3" style={{ contain: 'content' }}>
                <motion.div
                    style={{
                        x: rowX,
                        transform: 'translate3d(0,0,0)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="social-scroll-track flex gap-4 sm:gap-6 w-max py-2 will-change-transform transform-gpu"
                >
                    {singleRowCards.map((item, index) => (
                        <a
                            key={`social-${item.id}-${index}`}
                            href={item.url}
                            target={item.url.startsWith('http') ? '_blank' : undefined}
                            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="social-scroll-card w-[250px] h-[140px] sm:w-[280px] sm:h-[155px] rounded-2xl flex-shrink-0 relative overflow-hidden bg-gradient-to-b from-[#1c1c1c]/90 via-[#141414]/90 to-[#0a0a0a]/90 border border-white/15 shadow-lg md:hover:border-white/40 md:hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between p-5 cursor-pointer backdrop-blur-sm"
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
                            <div className="social-scroll-card-top flex items-center justify-between relative z-10">
                                <div className="social-scroll-icon p-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="social-scroll-category font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">
                                    {item.category}
                                </span>
                            </div>

                            {/* Bottom: Title, Handle & Arrow Link */}
                            <div className="social-scroll-card-bottom relative z-10 flex items-end justify-between pt-3 border-t border-white/10">
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
            </div>
        </div>
    );
};

