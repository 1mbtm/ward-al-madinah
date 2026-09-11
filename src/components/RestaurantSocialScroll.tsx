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

// 🎯 OFFICIAL HIGH-FIDELITY BRAND VECTOR LOGOS
const InstagramOfficialLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.3" fill="#FFFFFF" />
    </svg>
);

const FacebookOfficialLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const SnapchatOfficialLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2.5c-3.1 0-5.3 2.3-5.3 5.4 0 .9.2 2.2.5 2.8-.4.1-.9.2-1.3.3-.5.1-.9.5-.9.9 0 .4.2.7.6.8.8.3 1.7.4 2.2.8.2.2.3.5.2.8-.2.8-1.1 1.5-2 1.8-.4.1-.6.5-.6.9 0 .4.2.7.6.9.9.3 2.4.5 3.1.9.4.2.5.6.5 1-.2 1-1 1.8-1.9 2-.3.1-.6.4-.6.7 0 .4.3.8.7.8.5 0 1.2-.1 2-.4.9-.3 1.9-.8 2.9-.8 1.1 0 2.1.5 2.9.8.8.3 1.5.4 2 .4.4 0 .7-.4.7-.8 0-.3-.3-.6-.6-.7-.9-.2-1.7-1-1.9-2 0-.4.1-.8.5-1 .7-.4 2.2-.6 3.1-.9.4-.2.6-.5.6-.9 0-.4-.2-.8-.6-.9-.9-.3-1.8-1-2-1.8-.1-.3 0-.6.2-.8.5-.4 1.4-.5 2.2-.8.4-.1.6-.4.6-.8 0-.4-.4-.8-.9-.9-.4-.1-.9-.2-1.3-.3.3-.6.5-1.9.5-2.8 0-3.1-2.2-5.4-5.3-5.4z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="1.3"
            strokeLinejoin="round"
        />
    </svg>
);

const GoogleMapsOfficialLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.75 2.8 6.9L12 9V2z" fill="#4285F4" />
        <path d="M12 22s2.5-2.77 4.5-6.1L12 9v13z" fill="#34A853" />
        <path d="M16.5 15.9c1.61-2.15 2.5-4.52 2.5-6.9 0-3.87-3.13-7-7-7v7l4.5 8.9z" fill="#FBBC04" />
        <circle cx="12" cy="9" r="3.2" fill="#FFFFFF" />
    </svg>
);

const WhatsAppOfficialLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.101-.476-.15-.677.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.151-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.151-.677-1.63-.927-2.232-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.276.495 1.713.634.721.229 1.377.197 1.895.12.578-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.076-.125-.276-.2-.577-.351zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.76.46 3.48 1.34 5l-1.42 5.18 5.31-1.39c1.47.8 3.12 1.22 4.79 1.22 5.53 0 10.02-4.49 10.02-10.01C22.06 6.49 17.57 2 12.04 2zm0 18.34c-1.5 0-2.97-.4-4.26-1.16l-.31-.18-3.16.83.84-3.08-.2-.32c-.84-1.34-1.29-2.89-1.29-4.43 0-4.6 3.74-8.34 8.38-8.34 4.63 0 8.37 3.74 8.37 8.34 0 4.6-3.74 8.34-8.37 8.34z" />
    </svg>
);

const DirectCallOfficialLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.58l1.97-1.57c.28-.27.36-.66.25-1.01A11.36 11.36 0 018.57 4c0-.55-.45-1-1-1H4.14c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1.01z" />
    </svg>
);

// 🍽️ 6 RESTAURANT SOCIAL & CONTACT CHANNELS WITH OFFICIAL APP BRAND COLORS & LOGOS
export const RESTAURANT_CHANNELS: SocialCardItem[] = [
    {
        id: 'instagram',
        name: 'Instagram',
        handle: '@medinarose.icecream',
        category: 'Visuals & Menu',
        url: 'https://instagram.com/medinarose.icecream',
        icon: <InstagramOfficialLogo />,
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
        icon: <FacebookOfficialLogo />,
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
        icon: <SnapchatOfficialLogo />,
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
        icon: <GoogleMapsOfficialLogo />,
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
        icon: <WhatsAppOfficialLogo />,
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
        icon: <DirectCallOfficialLogo />,
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

