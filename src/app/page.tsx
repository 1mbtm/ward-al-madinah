'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  CheckCircle,
  ArrowRight,
  Plus
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RestaurantSocialScroll } from '@/components/RestaurantSocialScroll';
import { RosePetalsRain } from '@/components/RosePetalsRain';
import SprayBottleMist from '@/components/SprayBottleMist';
import MenuCard from '@/components/MenuCard';
import { menuSlides } from '@/data/menuData';
import GoodsCard from '@/components/GoodsCard';
import { heritageSlides } from '@/data/goodsData';

export default function ExactTemplatePage() {
  // Navigation & Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLocationTab, setActiveLocationTab] = useState('UAE');
  const [cartCount, setCartCount] = useState(0);
  const [cartToast, setCartToast] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  // Active Branch Popup Modal State
  const [activePopupId, setActivePopupId] = useState<number | null>(null);

  // Slider indices
  const [proudSlideIndex, setProudSlideIndex] = useState(0);
  const [menuSlideIndex, setMenuSlideIndex] = useState(0);
  const [heritageSlideIndex, setHeritageSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Touch state for Heritage Goods mobile swipe



  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel Tracking Refs
  const menuTrackRef = useRef<HTMLDivElement>(null);
  const heritageTrackRef = useRef<HTMLDivElement>(null);

  // Sync React state when user natively swipes on mobile
  const onMenuScroll = () => {
    if (!isMobile || !menuTrackRef.current) return;
    const scrollLeft = menuTrackRef.current.scrollLeft;
    // Card is 250px + 14px gap = 264px
    const index = Math.round(scrollLeft / 264);
    if (index !== menuSlideIndex) {
      setMenuSlideIndex(index);
    }
  };

  const onHeritageScroll = () => {
    if (!isMobile || !heritageTrackRef.current) return;
    const scrollLeft = heritageTrackRef.current.scrollLeft;
    const index = Math.round(scrollLeft / 264);
    if (index !== heritageSlideIndex) {
      setHeritageSlideIndex(index);
    }
  };


  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const retailSectionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: missionScrollProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });

  // Desktop Hand animation: ultra-smooth slide [0, 0.5, 1] -> ["180px", "0px", "0px"]
  const missionImgXDesktop = useTransform(
    missionScrollProgress,
    [0, 0.5, 1],
    ["180px", "0px", "0px"]
  );

  // Mobile Hand animation completes at 50% scroll progress (section fully visible)
  const missionImgXMobile = useTransform(
    missionScrollProgress,
    [0, 0.25, 0.5, 1],
    ["180px", "40px", "0px", "0px"]
  );

  const { scrollYProgress: menuScrollProgress } = useScroll({
    target: menuRef,
    offset: ["start end", "end start"]
  });

  const menuImgXDesktop = useTransform(menuScrollProgress, [0, 0.5, 1], ["180px", "0px", "0px"]);
  const menuImgXMobile = useTransform(menuScrollProgress, [0, 0.5, 1], ["180px", "0px", "0px"]);



  const { scrollYProgress: retailScrollProgress } = useScroll({
    target: retailSectionRef,
    offset: ["start end", "end start"]
  });

  const retailImgX = useTransform(retailScrollProgress, [0, 0.5, 1], ["180px", "0px", "0px"]);

  // Parallax Scroll Listener (Clamped to safe image buffer to prevent image running out)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
      if (parallaxRef.current) {
        const parent = parallaxRef.current.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          const imgHeight = parallaxRef.current.offsetHeight;
          const parentHeight = rect.height;
          // Calculate max safe travel distance based on image buffer
          const maxTravel = Math.max(0, (imgHeight - parentHeight) / 2);

          // Calculate displacement with smooth speed
          const speed = 0.2;
          const yPos = (rect.top - window.innerHeight * 0.5) * speed;

          // Strictly clamp within safe margin to guarantee zero gaps
          const safeLimit = Math.max(0, maxTravel - 16);
          const clampedY = Math.max(-safeLimit, Math.min(safeLimit, yPos));

          parallaxRef.current.style.transform = `translate3d(0, ${clampedY}px, 0)`;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // AOS Intersection Observer Engine (Scroll Animations)
  useEffect(() => {
    const aosElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.15 }
    );

    aosElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // (P1 perf: counter RAF useEffect removed — counters state was never rendered in JSX)

  // Ward Al Madinah Artisanal Sourcing & Craft slides (1.png to 5.png)
  const proudSlides = [
    {
      src: '/images/1.png',
      caption: 'Organic Madinah Rose Harvest',
      alt: 'Fresh pink Madinah rose petals in handwoven baskets'
    },
    {
      src: '/images/2.png',
      caption: 'Traditional Alembic Distillation',
      alt: 'Pure copper alembic stills distilling Medina rose water'
    },
    {
      src: '/images/3.png',
      caption: 'Sacred Madinah Ajwa Dates',
      alt: 'Hand-selected authentic Madinah Ajwa dates'
    },
    {
      src: '/images/4.png',
      caption: 'Velvety Artisan Rose Gelato',
      alt: 'Freshly churned smooth artisanal rose ice cream'
    },
    {
      src: '/images/5.png',
      caption: 'Signature Rose Water Mist Elixir',
      alt: 'Signature Medina rose water mist bottle with dewy roses'
    },
  ];

  // Menu slides — 21 real Medina Rose photos, optimized (AVIF/WebP/JPEG)
  // Data lives in src/data/menuData.ts; images in public/images/menu/

  // 3 Medina Rose Branches (Verified Real Locations)
  const branchList = [
    {
      id: 1,
      name: 'Grand Plaza Hotel (Gate 339)',
      shortName: 'Gate 339 Grand Plaza',
      rating: '4.9',
      location: 'Grand Plaza Hotel, adjacent to Prophet’s Mosque Gate 339, Madinah',
      hours: 'Open 24 Hours Daily',
      tel: '+966 54 330 0570',
      mapUrl: 'https://share.google/Z45RI9GaWryDIT55J',
      image: '/images/grand-plaza.png',
      x: 50.8,
      y: 45.5
    },
    {
      id: 2,
      name: 'Dar Al-Hijra (Northern Central)',
      shortName: 'Dar Al-Hijra Branch',
      rating: '4.8',
      location: 'Opposite Dar Al-Hijra Hotel, Northern Central District, Madinah',
      hours: 'Open 24 Hours Daily',
      tel: '+966 54 330 0570',
      mapUrl: 'https://share.google/Z45RI9GaWryDIT55J',
      image: '/images/dar-al-hizra.png',
      x: 23.5,
      y: 28.0
    },
    {
      id: 3,
      name: 'Quba Walkway & Heritage Avenue',
      shortName: 'Quba Walkway',
      rating: '4.8',
      location: 'Quba Avenue Pedestrian Promenade, Madinah',
      hours: 'Open 24 Hours Daily',
      tel: '+966 54 330 0570',
      mapUrl: 'https://share.google/Z45RI9GaWryDIT55J',
      image: '/images/quba.png',
      x: 44.5,
      y: 72.0
    },
  ];

  // Real reviews should be fetched from Google Business Profile API.
  // Currently, API authorization is missing, so we display an empty state or CTA.
  const communityVoices: any[] = [];

  const [toastMessage, setToastMessage] = useState('Added to cart');

  const handleAddToCart = (itemName?: string) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(itemName ? `${itemName} added to cart` : 'Added to cart');
    setCartToast(true);
    setTimeout(() => setCartToast(false), 2000);
  };

  return (
    <div className="page-holder">
      <div className="wrapper">

        {/* 1. EXACT HEADER */}
        <header className="header">
          <div className="container">
            <div className="header__content">
              {/* Brand Logo — Logo 1: white flower, transparent bg */}
              <div className="header__logo" style={{ width: 'auto' }}>
                <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFF' }}>
                  <picture>
                    <source srcSet="/images/brand/logo-white-mark.avif" type="image/avif" />
                    <source srcSet="/images/brand/logo-white-mark.webp" type="image/webp" />
                    <img src="/images/brand/logo-white-mark.png" alt="Ward Al Madinah Logo" style={{ height: '34px', width: 'auto' }} />
                  </picture>
                  <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '1px' }}>MADINAH ROSE | ورد المدينة</span>
                </a>
              </div>



              {/* Mobile Burger Toggle */}
              <button
                className="header__burger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </header>

        {/* Cart Toast Notification */}
        {cartToast && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '32px',
              zIndex: 1000,
              background: '#000',
              color: '#FFF',
              padding: '12px 24px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            <CheckCircle size={18} color="#C0A062" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Luxury Burgundy Rose Mobile Slide-in Drawer */}
        <div className={`header__mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="header__mobile-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Mobile drawer — Logo 1: white flower, transparent bg */}
              <picture>
                <source srcSet="/images/brand/logo-white-mark.avif" type="image/avif" />
                <source srcSet="/images/brand/logo-white-mark.webp" type="image/webp" />
                <img src="/images/brand/logo-white-mark.png" alt="Ward Al Madinah Logo" style={{ height: '28px', width: 'auto' }} />
              </picture>
              <span className="header__mobile-logo">MADINAH ROSE | ورد المدينة</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="header__mobile-close"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="header__mobile-nav">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">Main</a>
            <a href="#about-scene" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">About Us</a>
            <a href="#branches" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">Branches</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">Menu</a>
            <a href="#retail" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">Heritage Goods</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">Contacts</a>
          </div>

          <div className="header__mobile-branches">
            <p className="header__mobile-subtitle">Our Medina Locations</p>
            <div className="header__mobile-branch-list">
              <a href="#branches" onClick={() => setMobileMenuOpen(false)} className="header__mobile-branch-item">
                <span className="header__branches-dot" />
                <span>Grand Plaza Hotel (Gate 339)</span>
              </a>
              <a href="#branches" onClick={() => setMobileMenuOpen(false)} className="header__mobile-branch-item">
                <span className="header__branches-dot" />
                <span>Dar Al-Hijra (Northern Central)</span>
              </a>
              <a href="#branches" onClick={() => setMobileMenuOpen(false)} className="header__mobile-branch-item">
                <span className="header__branches-dot" />
                <span>Quba Walkway</span>
              </a>
            </div>
          </div>

          <div className="header__mobile-footer">
            <div className="header__mobile-socials">
              <a href="https://www.instagram.com/medinarose.sa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/966543300570" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href="tel:+966543300570" aria-label="Call Us">
                <Phone size={18} />
              </a>
            </div>
            <p className="header__mobile-copyright">© 2026 Madinah Rose. All rights reserved.</p>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="header__mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
        )}

        <main>
          {/* 2. HERO SECTION WITH FADE-UP ANIMATION & ROSE PETALS RAIN */}
          <section id="hero" className="hero">
            <RosePetalsRain petalCount={32} />
            <div className="container">
              <div className="hero__content" data-aos="fade-up">
                <h1>
                  Where ice cream is more <br /> than a treat <mark>It's a Medina ritual.</mark>
                </h1>
              </div>
            </div>
            <div className="hero__bg--image">
              <picture>
                <source media="(max-width: 768px)" srcSet="/images/hero-rose-hand-mobile-bg.avif" type="image/avif" />
                <source media="(max-width: 768px)" srcSet="/images/hero-rose-hand-mobile-bg.webp" type="image/webp" />
                <source media="(max-width: 768px)" srcSet="/images/hero-rose-hand-mobile-bg.png" type="image/png" />
                <source srcSet="/images/hero-rose-hand-bg.avif" type="image/avif" />
                <source srcSet="/images/hero-rose-hand-bg.webp" type="image/webp" />
                <img src="/images/hero-rose-hand-bg.png"
                  alt="Medina Rose Atmosphere - Hand holding fresh rose petals"
                  fetchPriority="high"
                />
              </picture>
              <div className="hero__bg-overlay" />
            </div>
          </section>

          {/* 3. ABOUT SECTION WITH PARALLAX */}
          <section id="about-scene" className="about">
            <div className="about-bg">
              <img
                ref={parallaxRef}
                className="about__parallax-bg"
                src="/images/about-rose-petals-bg.jpg"
                alt="About Medina Rose Petals Background"
              />
            </div>
            <div className="container">
              <div className="container__wrapper" data-aos="fade-up">
                <h2>About Us</h2>
                <div className="about__description">
                  <p>
                    Born in the blessed sanctuary of Al-Madinah Al-Munawwarah, Ward Al Madinah (ورد المدينة) is dedicated to elevating authentic local heritage into world-class artisanal desserts.
                  </p>
                  <p>
                    Centuries of Madinah tradition celebrate the fragrant harvest of local rose gardens and sacred date groves. We take pride in preserving this essence through pure artisanal rose water ice cream, crafted fresh daily right by the courtyard of the Prophet&apos;s Mosque (Al-Masjid an-Nabawi).
                  </p>
                  <p>
                    Today, Ward Al Madinah welcomes pilgrims, visitors, and locals from across the globe 24 hours a day. With our flagship location at Grand Plaza Hotel (Gate 339) and central branches across the holy city, we serve an unforgettable sensory journey rooted in genuine Madani hospitality.
                  </p>
                  <p>
                    <strong>أهلاً بكم في آيس كريم ورد المدينة</strong>
                    نكهة مدينية أصيلة .. وتجربة انتعاش لا تُنسى.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. OUR MISSION SECTION */}
          <section className="mission" ref={missionRef}>
            <div className="container">
              <div className="mission__card">
                <div className="mission__content">
                  {/* Float image — mobile only, no frame */}
                  <picture>
  <source srcSet="/images/medina-rose-hand-mobile.avif" type="image/avif" />
  <source srcSet="/images/medina-rose-hand-mobile.webp" type="image/webp" />
  <motion.img src="/images/medina-rose-hand-mobile.png"
                    alt="Medina Rose"
                    className="mission__float-img"
                    aria-hidden="true"
                    style={{ x: missionImgXMobile }}
                  />
</picture>
                  <h2 data-aos="fade-right">Our Mission</h2>
                  <p data-aos="fade-right" data-aos-delay="100">
                    Our mission is clear: to craft exceptional artisanal ice cream and gelato while setting the highest standards across every part of our experience. From organic Madinah rose water distillation to natural ingredients, every detail matters.
                  </p>
                  <p data-aos="fade-right" data-aos-delay="200">
                    As Medina Rose grows and welcomes visitors from around the globe in Al-Madinah, we apply these standards at scale—raising expectations for flavor quality, spatial design, and authentic Saudi hospitality. Our goal is to create unforgettable dessert rituals near the Prophet&apos;s Mosque that guests return to and cherish.
                  </p>
                </div>
              </div>
            </div>
            <div className="mission__frame-slot">
              <picture>
  <source srcSet="/images/medina-rose-hand.avif" type="image/avif" />
  <source srcSet="/images/medina-rose-hand.webp" type="image/webp" />
  <motion.img src="/images/medina-rose-hand.png"
                alt="Medina Rose Gelato"
                className="mission__frame-img"
                style={{
                  x: missionImgXDesktop,
                  transformOrigin: 'right bottom',
                }}
              />
</picture>
            </div>
          </section>

          {/* 5. PROUD OF QUALITY / SOURCING EXCELLENCE SECTION */}
          <section className="proud">
            <div className="container">
              {/* Mobile Header: Displayed cleanly above the photo frame on mobile */}
              <div className="proud-mobile-header" data-aos="fade-up">
                <h2>Artisanal Heritage</h2>
              </div>

              <div className="proud-wrapper">
                {/* Carousel Slider */}
                <div className="proud-slider" data-aos="fade-right">
                  <div
                    className="proud-slider-track"
                    style={{ transform: `translateX(-${proudSlideIndex * 100}%)` }}
                  >
                    {proudSlides.map((slide, idx) => (
                      <div key={idx} className="proud-slide" style={{ position: 'relative' }}>
                        <img src={slide.src} alt={slide.alt} />
                        <div className="proud-slide-badge">
                          <span>{slide.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Chevrons */}
                  <button
                    className="proud-slider-prev swiper-button-prev"
                    onClick={() => setProudSlideIndex((prev) => (prev > 0 ? prev - 1 : proudSlides.length - 1))}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={15} strokeWidth={2} color="#23161C" />
                  </button>
                  <button
                    className="proud-slider-next swiper-button-next"
                    onClick={() => setProudSlideIndex((prev) => (prev < proudSlides.length - 1 ? prev + 1 : 0))}
                    aria-label="Next slide"
                  >
                    <ChevronRight size={15} strokeWidth={2} color="#23161C" />
                  </button>

                  {/* Pagination Bullets */}
                  <div className="proud-slider-pagination swiper-pagination">
                    {proudSlides.map((_, idx) => (
                      <span
                        key={idx}
                        className={`swiper-pagination-bullet ${idx === proudSlideIndex ? 'swiper-pagination-bullet-active' : ''}`}
                        onClick={() => setProudSlideIndex(idx)}
                      />
                    ))}
                  </div>
                </div>

                {/* Artisanal Heritage Narrative */}
                <div className="proud-content" data-aos="fade-left">
                  <h2 className="proud-desktop-title">Artisanal <br /> Heritage</h2>
                  <div className="proud-content-description">
                    <p>
                      Ward Al Madinah sources hand-picked organic roses directly from the historic valley farms of Al-Madinah Al-Munawwarah. Each batch undergoes traditional slow distillation to capture the pure floral fragrance and natural essential oils.
                    </p>
                    <p>
                      Paired with hand-selected Medina Ajwa dates, rich royal saffron, and farm-fresh cream, our recipes celebrate the legendary agricultural bounty of the Prophet&apos;s City with zero artificial flavorings or shortcuts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="proud-bg">
              <picture>
  <source srcSet="/images/about-rose-petals-bg.avif" type="image/avif" />
  <source srcSet="/images/about-rose-petals-bg.webp" type="image/webp" />
  <img src="/images/about-rose-petals-bg.jpg" alt="Artisanal Sourcing Background" style={{ opacity: 0.2 }} />
</picture>
            </div>
          </section>

          {/* 6. MENU SECTION */}
          <section id="menu" className="menu" ref={menuRef}>
            <div className="container">
              <div className="menu__card">
                <div className="menu-content" data-aos="fade-right">
                  <h2>Menu</h2>
                  <p>
                    An authentic blend of traditional Madani ice cream recipes, organic rose water mists, and artisanal gelato specialties.
                  </p>
                  <a
                    className="menu-content-link"
                    href="https://linktr.ee/madin2h_rose0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    show me
                  </a>

                  {/* Left-Side Contained Menu Highlights Carousel */}
                  <div className="menu-carousel" data-aos="fade-up" data-aos-delay="150">
                    <button
                      className="menu-nav-arrow menu-nav-arrow--prev"
                      onClick={() => {
                        const nextIdx = menuSlideIndex > 0 ? menuSlideIndex - 1 : menuSlides.length - (isMobile ? 1 : 3);
                        setMenuSlideIndex(nextIdx);
                        if (isMobile && menuTrackRef.current) {
                          menuTrackRef.current.scrollTo({ left: nextIdx * 264, behavior: 'smooth' });
                        }
                      }}
                      aria-label="Previous menu items"
                    >
                      <ChevronLeft size={32} strokeWidth={1.75} />
                    </button>
                    <button
                      className="menu-nav-arrow menu-nav-arrow--next"
                      onClick={() => {
                        const nextIdx = menuSlideIndex < menuSlides.length - (isMobile ? 1 : 3) ? menuSlideIndex + 1 : 0;
                        setMenuSlideIndex(nextIdx);
                        if (isMobile && menuTrackRef.current) {
                          menuTrackRef.current.scrollTo({ left: nextIdx * 264, behavior: 'smooth' });
                        }
                      }}
                      aria-label="Next menu items"
                    >
                      <ChevronRight size={32} strokeWidth={1.75} />
                    </button>

                    <div className="menu-carousel-viewport">
                      <div
                        className="menu-track"
                        ref={menuTrackRef}
                        onScroll={onMenuScroll}
                        style={!isMobile ? {
                          transform: `translateX(-${menuSlideIndex * 288}px)`,
                          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                        } : undefined}
                      >
                        {menuSlides.map((slide, idx) => (
                          <MenuCard
                            key={slide.slug}
                            slide={slide}
                            index={idx}
                            currentIndex={menuSlideIndex}
                            total={menuSlides.length}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Image Frame (Right-to-Left Scroll Slide) */}
              <motion.div className="menu__mobile-frame" style={{ x: menuImgXMobile }}>
                <picture>
                  <source srcSet="/images/menu-hand.avif" type="image/avif" />
                  <source srcSet="/images/menu-hand.webp" type="image/webp" />
                  <img
                    src="/images/menu-hand.png"
                    alt="Medina Rose Ice Cream Hand"
                    className="menu__mobile-img"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                </picture>
              </motion.div>
            </div>

            {/* Desktop Menu Hand with Ice Cream Slot */}
            <div className="menu__frame-slot">
              <picture>
  <source srcSet="/images/menu-hand.avif" type="image/avif" />
  <source srcSet="/images/menu-hand.webp" type="image/webp" />
  <motion.img src="/images/menu-hand.png"
                alt="Medina Rose Ice Cream Hand"
                className="menu__frame-img"
                style={{
                  x: menuImgXDesktop,
                  transformOrigin: 'right bottom',
                }}
              />
</picture>
            </div>
          </section>

          {/* 7. BRANCHES SECTION WITH INTERACTIVE MAP & 12 POPUPS */}
          <section id="branches" className="branches">
            <div className="branches-wrapper">
              <div className="container" data-aos="fade-up">
                <h2>Branches</h2>
                <div className="branches__scroll-hint">
                  <MapPin size={16} />
                  <span>Swipe map or select any branch card below</span>
                </div>
              </div>

              {/* Medina Map & Interactive Markers */}
              <div className="branches__wrapper" data-aos="fade-up" data-aos-delay="200">
                <div className="branches__map">
                  {/* Enhanced Ultra High-Res Minimal Medina Map Image */}
                  <picture>
                    <source srcSet="/images/medina_map.avif" type="image/avif" />
                    <source srcSet="/images/medina_map.webp" type="image/webp" />
                    <img
                      className="branches__map-img"
                      src="/images/medina_map.png"
                      alt="Medina Rose Branches Map — Al-Madinah Al-Munawwarah"
                      loading="lazy"
                    />
                  </picture>

                  {/* 3 Interactive Branch Markers */}
                  {branchList.map((branch) => (
                    <button
                      key={branch.id}
                      className={`branches__pin ${activePopupId === branch.id ? 'active' : ''}`}
                      style={{ left: `${branch.x}%`, top: `${branch.y}%` }}
                      onClick={() => setActivePopupId(branch.id)}
                      aria-label={`Open details for ${branch.name}`}
                      title={branch.name}
                    >
                      <span className="branches__pin-beacon">
                        <span className="branches__pin-pulse" />
                        <span className="branches__pin-dot" />
                      </span>
                      <span className="branches__pin-label">{branch.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Branch Cards Carousel */}
              <div className="branches__mobile-container">
                <div className="branches__mobile-cards">
                  {branchList.map((branch) => (
                    <div
                      key={branch.id}
                      className="branches__mobile-card"
                      onClick={() => setActivePopupId(branch.id)}
                    >
                      <div className="branches__mobile-card-img">
                        <picture>
  <source srcSet={branch.image.replace('.png', '.avif').replace('.jpg', '.avif')} type="image/avif" />
  <source srcSet={branch.image.replace('.png', '.webp').replace('.jpg', '.webp')} type="image/webp" />
  <img src={branch.image} alt={branch.name} loading="lazy" />
</picture>
                      </div>
                      <div className="branches__mobile-card-body">
                        <div className="branches__mobile-card-top">
                          <h4>{branch.name}</h4>
                          <span className="branches__mobile-rating">★ {branch.rating}</span>
                        </div>
                        <p className="branches__mobile-loc">
                          <MapPin size={14} />
                          <span>{branch.location}</span>
                        </p>
                        <p className="branches__mobile-hours">
                          <Clock size={14} />
                          <span>{branch.hours}</span>
                        </p>
                        <div className="branches__mobile-actions">
                          <button className="branches__mobile-btn-details">
                            View Details
                          </button>
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="branches__mobile-btn-map"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={13} />
                            Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Branch Popup Overlay Backdrop */}
          <div
            className={`popup-overlay ${activePopupId !== null ? 'active' : ''}`}
            onClick={() => setActivePopupId(null)}
          />

          {/* Active Branch Modal Card */}
          {activePopupId !== null && (() => {
            const currentBranch = branchList.find((b) => b.id === activePopupId);
            if (!currentBranch) return null;
            return (
              <div className="branches__popup active" style={{ maxWidth: '410px' }}>
                <button
                  className="branches__close"
                  onClick={() => setActivePopupId(null)}
                  aria-label="Close branch modal"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
                <div
                  className="branch-image-box"
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    height: 'auto',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '16px',
                    backgroundColor: '#FAF7F2' // Subtle premium placeholder background
                  }}
                >
                  <picture>
                    <source srcSet={currentBranch.image.replace('.png', '.avif').replace('.jpg', '.avif')} type="image/avif" />
                    <source srcSet={currentBranch.image.replace('.png', '.webp').replace('.jpg', '.webp')} type="image/webp" />
                    <img
                      src={currentBranch.image}
                      alt={currentBranch.name}
                      fetchPriority="high"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </picture>
                </div>
                <div className="branches__info">
                  <div className="branches__info-top">
                    <h3>{currentBranch.name}</h3>
                    <div className="branches__info-top--rating">
                      <span style={{ color: '#E29D52', fontSize: '13px' }}>★</span>
                      <span>{currentBranch.rating}</span>
                    </div>
                  </div>
                  <div className="branches__info-bottom">
                    <ul>
                      <li>
                        <MapPin size={15} color="#8F4151" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{currentBranch.location}</span>
                      </li>
                      <li>
                        <Clock size={15} color="#8F4151" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{currentBranch.hours}</span>
                      </li>
                      <li>
                        <Phone size={15} color="#8F4151" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <a href={`tel:${currentBranch.tel.replace(/\s+/g, '')}`}>{currentBranch.tel}</a>
                      </li>
                    </ul>
                    <a
                      className="branches__info-bottom-link"
                      href={currentBranch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} strokeWidth={2} />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 8. SUSTAINABILITY SECTION */}
          <section id="sustainability" className="sustainability">
            <div className="container">
              <div className="proud-wrapper">
                <div className="proud-slider" data-aos="fade-right">
                  <div className="proud-slide">
                    <picture>
  <source srcSet="/images/sacred-heritage.avif" type="image/avif" />
  <source srcSet="/images/sacred-heritage.webp" type="image/webp" />
  <img src="/images/sacred-heritage.png"
                      alt="Sacred Heritage & Sustainability"
                    />
</picture>
                  </div>
                </div>
                <div className="proud-content" style={{ width: '600px' }} data-aos="fade-left">
                  <h2>Sacred Heritage <br /> & Sustainability</h2>
                  <div className="proud-content-description">
                    <p>
                      At Ward Al Madinah, preserving the serene beauty and clean sanctuary of the Holy City is our sacred responsibility. We are committed to eco-friendly practices across every level of our daily craft.
                    </p>
                    <p>
                      We believe pure indulgence should honor the earth that nourishes it. That’s why we support generational Madinah rose farming families and eliminate single-use plastics across our 24/7 locations.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pillars Box */}
              <div className="proud-wrapper-box" data-aos="fade-up">
                <h3>From bloom harvesting to service, we prioritize eco-conscious practices:</h3>
                <div className="proud-wrapper-box-description">
                  <p>We’ve eliminated single-use plastic cups and spoons, choosing compostable and recyclable materials at all branches near the Holy Mosque.</p>
                  <p>We work directly with certified organic Medina rose growers and local date orchards, safeguarding traditional agricultural heritage.</p>
                  <p>We maintain an optimized 24/7 zero-waste fresh preparation cycle, honoring the sanctity and pristine environment of Madinah.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. CONTACT SECTION */}
          <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
              <h2>Contacts</h2>
              <address>
                <p>
                  Ward Al Madinah (آيس كريم ورد المدينة) <br />
                  Grand Plaza Hotel, Adjacent to Gate 339, <br />
                  Al-Masjid an-Nabawi, Madinah 42311, Saudi Arabia
                </p>
                <a href="mailto:info@medinarose.sa">info@medinarose.sa</a>
                <a href="tel:+966543300570">+966 54 330 0570</a>
              </address>
            </div>

            {/* Scroll-Driven Social & Contact Marquee Strip */}
            <RestaurantSocialScroll />

            <div className="contact-bg">
              <img
                src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/contact-bg.png"
                alt="Contact Background"
              />
            </div>
          </section>

          {/* 10. HERITAGE GOODS & ELIXIRS SECTION (EXACT STRUCTURAL COPY OF MENU SECTION) */}
          <section id="retail" className="menu" ref={retailSectionRef}>
            <div className="container">
              <div className="menu__card">
                <div className="menu-content">
                  <h2>Heritage Goods</h2>
                  <p>
                    Handcrafted botanical rose water mists, fresh Madinah shouraik bakery, authentic dried rose buds, and sacred Sidr honey.
                  </p>

                  {/* Left-Side Contained Heritage Goods Highlights Carousel */}
                  <div className="menu-carousel">
                    <button
                      className="menu-nav-arrow menu-nav-arrow--prev"
                      onClick={() => {
                        const nextIdx = heritageSlideIndex > 0 ? heritageSlideIndex - 1 : heritageSlides.length - (isMobile ? 1 : 3);
                        setHeritageSlideIndex(nextIdx);
                        if (isMobile && heritageTrackRef.current) {
                          heritageTrackRef.current.scrollTo({ left: nextIdx * 264, behavior: 'smooth' });
                        }
                      }}
                      aria-label="Previous heritage goods items"
                    >
                      <ChevronLeft size={32} strokeWidth={1.75} />
                    </button>
                    <button
                      className="menu-nav-arrow menu-nav-arrow--next"
                      onClick={() => {
                        const nextIdx = heritageSlideIndex < heritageSlides.length - (isMobile ? 1 : 3) ? heritageSlideIndex + 1 : 0;
                        setHeritageSlideIndex(nextIdx);
                        if (isMobile && heritageTrackRef.current) {
                          heritageTrackRef.current.scrollTo({ left: nextIdx * 264, behavior: 'smooth' });
                        }
                      }}
                      aria-label="Next heritage goods items"
                    >
                      <ChevronRight size={32} strokeWidth={1.75} />
                    </button>

                    <div className="menu-carousel-viewport">
                      <div
                        className="menu-track"
                        ref={heritageTrackRef}
                        onScroll={onHeritageScroll}
                        style={!isMobile ? { 
                          transform: `translateX(-${heritageSlideIndex * 288}px)`,
                          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                        } : undefined}
                      >
                        {heritageSlides.map((item, idx) => (
                          <GoodsCard
                            key={item.slug}
                            item={item}
                            index={idx}
                            currentIndex={heritageSlideIndex}
                            total={heritageSlides.length}
                            onAddToCart={handleAddToCart}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Heritage Goods Image Frame */}
              <motion.div className="menu__mobile-frame" data-aos="fade-up" style={{ x: retailImgX }}>
                <SprayBottleMist />
              </motion.div>
            </div>

            {/* Desktop Heritage Goods Spray Bottle Slot (Static PNG with Interactive Mist) */}
            <motion.div className="menu__frame-slot" style={{ x: retailImgX }}>
              <SprayBottleMist />
            </motion.div>
          </section>


          {/* 13. COMMUNITY VOICES & GUEST REVIEWS */}
          <section className="team">
            <div className="container">
              <div className="team-content" data-aos="fade-right">
                <h2>Guest Voices</h2>
                <p>
                  Over 700+ five-star Google reviews and thousands of heartfelt moments shared by pilgrims and locals at the Prophet&apos;s Mosque.
                </p>
              </div>
              <div className="team-track-container" data-aos="fade-left">
                <div className="team-track">
                  {communityVoices.length > 0 ? (
                    communityVoices.map((item, idx) => (
                      <div key={idx} className="team-item">
                        <div className="team-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <h3>{item.name}</h3>
                        <p className="review-meta">{item.role}</p>
                        <p className="review-text">&ldquo;{item.quote}&rdquo;</p>
                      </div>
                    ))
                  ) : (
                    <div className="team-item" style={{ width: '100%', maxWidth: '600px', minHeight: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: '#FDFDFD', margin: '0 auto', boxShadow: 'none' }}>
                      <h3 style={{ fontSize: '18px', color: '#2D2323', marginBottom: '8px' }}>Google API Configuration Required</h3>
                      <p className="review-text" style={{ fontSize: '15px', marginBottom: '24px', opacity: 0.8 }}>
                        This section requires an authorized Google Business Profile connection to display real customer reviews. 
                        No placeholder or fake reviews are displayed to maintain authenticity.
                      </p>
                      <a 
                        href="https://www.google.com/maps/search/Ward+Al+Madinah" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#8B2C46', color: '#FFF', borderRadius: '6px', textDecoration: 'none', fontSize: '15px', fontWeight: 600, transition: 'background-color 0.2s' }}
                      >
                        Read all reviews on Google
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="team-bg">
              <img src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/franchise-bg.png" alt="Community Background" />
            </div>
          </section>
        </main>

        {/* 14. FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer__content">
              <div className="footer__col">
                {/* Footer brand — Logo 1: white flower, transparent bg */}
                <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textDecoration: 'none' }}>
                  <picture>
                    <source srcSet="/images/brand/logo-white-mark.avif" type="image/avif" />
                    <source srcSet="/images/brand/logo-white-mark.webp" type="image/webp" />
                    <img
                      src="/images/brand/logo-white-mark.png"
                      alt="Ward Al Madinah"
                      style={{ height: '48px', width: 'auto', flexShrink: 0 }}
                    />
                  </picture>
                  <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px', color: '#FAF0F3' }}>MADINAH ROSE | ورد المدينة</span>
                </a>
                <p className="footer__text">
                  Crafted with authentic Medina rose water &amp; organic ingredients near the Prophet&apos;s Mosque.
                </p>
                <div className="footer__socials">
                  <a href="https://www.instagram.com/medinarose.sa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="https://wa.me/966543300570" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>

              <div className="footer__col">
                <h3 className="footer__title">Navigation</h3>
                <ul className="footer__nav">
                  <li><a href="#hero">Main</a></li>
                  <li><a href="#about-scene">About Us</a></li>
                  <li><a href="#branches">Branches</a></li>
                  <li><a href="#menu">Menu</a></li>
                  <li><a href="#retail">Heritage Goods</a></li>
                </ul>
              </div>

              <div className="footer__col">
                <h3 className="footer__title">Contact Us</h3>
                <ul className="footer__contact">
                  <li>
                    <Phone size={16} />
                    <a href="tel:+966543300570">+966 54 330 0570</a>
                  </li>
                  <li>
                    <MapPin size={16} />
                    <span>Grand Plaza Hotel (Gate 339), Madinah, Saudi Arabia</span>
                  </li>
                  <li>
                    <Clock size={16} />
                    <span>Open 24 Hours Daily</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__bottom">
              <p>© 2026 Madinah Rose. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
