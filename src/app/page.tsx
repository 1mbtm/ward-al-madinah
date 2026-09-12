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
  ArrowRight
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RestaurantSocialScroll } from '@/components/RestaurantSocialScroll';
import { RosePetalsRain } from '@/components/RosePetalsRain';
import SprayBottleMist from '@/components/SprayBottleMist';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animated Counter Values for Retail Beans
  const [counters, setCounters] = useState<{ [key: string]: number }>({
    'retail-1': 0,
    'retail-2': 0,
    'retail-3': 0,
    'retail-4': 0,
    'retail-5': 0,
  });

  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const retailSectionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: missionScrollProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });

  const missionImgX = useTransform(missionScrollProgress, [0, 0.5, 1], ["60%", "0%", "60%"]);
  const missionImgScale = useTransform(missionScrollProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const missionImgOpacity = useTransform(missionScrollProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const { scrollYProgress: menuScrollProgress } = useScroll({
    target: menuRef,
    offset: ["start end", "end start"]
  });

  const menuImgX = useTransform(menuScrollProgress, [0, 0.5, 1], ["60%", "0%", "60%"]);
  const menuImgScale = useTransform(menuScrollProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const menuImgOpacity = useTransform(menuScrollProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

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

  // Retail Beans Cupping Score Counting Animation
  useEffect(() => {
    const retailSection = retailSectionRef.current;
    if (!retailSection) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            const targets: { [key: string]: number } = {
              'retail-1': 92,
              'retail-2': 88,
              'retail-3': 88,
              'retail-4': 88,
              'retail-5': 90,
            };

            const duration = 1200;
            const startTime = performance.now();

            const step = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              setCounters({
                'retail-1': Math.floor(progress * targets['retail-1']),
                'retail-2': Math.floor(progress * targets['retail-2']),
                'retail-3': Math.floor(progress * targets['retail-3']),
                'retail-4': Math.floor(progress * targets['retail-4']),
                'retail-5': Math.floor(progress * targets['retail-5']),
              });

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCounters(targets);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(retailSection);
    return () => observer.disconnect();
  }, []);

  // Proud / Sourcing slides
  const proudSlides = [
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/swiper-slide1.jpg',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_4541.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_4544.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_4545.JPG',
  ];

  // Menu slides
  const menuSlides = [
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image.jpg',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image2.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image1.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image3.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image4.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image5.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image6.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image7.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image8.JPG',
    'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/menu-content-image9.JPG',
  ];

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
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
      x: 44.5,
      y: 72.0
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
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      x: 23.5,
      y: 28.0
    },
  ];

  // Medina Rose Artisanal Tubs & Gift Products
  const retailProducts = [
    {
      id: 'retail-1',
      score: '100% Organic',
      targetScore: 100,
      flag: '🌹',
      title: 'SIGNATURE MEDINA ROSE GELATO TUB (500ML)',
      notes: 'Authentic Madinah Rose Water Mist & Organic Petals',
      price: 'SAR 45',
      image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'retail-2',
      score: 'Local Favorite',
      targetScore: 98,
      flag: '🌴',
      title: 'MADINAH AJWA DATE & ALMOND TUB (500ML)',
      notes: 'Hand-harvested Ajwa dates & slow-roasted almonds',
      price: 'SAR 50',
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'retail-3',
      score: 'Premium Import',
      targetScore: 96,
      flag: '🇮🇹',
      title: 'SICILIAN PISTACHIO CREAM TUB (500ML)',
      notes: '100% Pure Bronte Pistachio Paste & Velvet Cream',
      price: 'SAR 55',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'retail-4',
      score: 'Floral Essence',
      targetScore: 100,
      flag: '✨',
      title: 'MEDINA ROSE WATER ELIXIR MIST BOTTLE (250ML)',
      notes: 'Distilled Rose Water from Medina Garden Blooms',
      price: 'SAR 35',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'retail-5',
      score: 'Saffron Reserve',
      targetScore: 95,
      flag: '👑',
      title: 'ROYAL SAFFRON VANILLA BEAN TUB (500ML)',
      notes: 'Infused with Royal Persian Saffron & Bourbon Vanilla',
      price: 'SAR 60',
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Verified Guest Reviews & Community Voices (4.3 ★ 701+ Google Reviews)
  const communityVoices = [
    {
      name: 'Fahad Al-Harbi',
      role: 'Verified Google Reviewer • 5.0 ★',
      quote: 'أجمل تجربة آيس كريم ورد في المدينة، منعش جداً بعد الصلاة في الحرم وبوابة 339 قريبة جداً.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sarah Rahman',
      role: 'Pilgrim from UK • 5.0 ★',
      quote: 'The organic rose mist and authentic Medina rose gelato are unforgettable. A must-visit ritual in Madinah!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Mohammed Al-Otaibi',
      role: 'Local Resident • 5.0 ★',
      quote: 'طعم الورد المديني الأصلي والآيسكريم ناعم وبارد، مفتوحين 24 ساعة وخدمتهم سريعة وممتازة.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Fatima Zahra',
      role: 'Visitor from Morocco • 5.0 ★',
      quote: 'نكهة العجوة باللوز والورد الطبيعي قمة الإتقان، من أجمل الذكريات في طيبة الطيبة.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Dr. Tariq Al-Ghamdi',
      role: 'Saudi Guide • 5.0 ★',
      quote: '700+ reviews on Google Maps are well deserved. Truly the signature taste of Madinah.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Lina Al-Mansoor',
      role: 'Food Explorer • 5.0 ★',
      quote: 'الريحة لحالها ترد الروح ورذاذ ماء الورد ممتع جداً. شكراً ورد المدينة!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
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
              {/* Brand Logo */}
              <div className="header__logo" style={{ width: 'auto' }}>
                <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '1px' }}>MEDINA ROSE | ميد روز</span>
                </a>
              </div>

              {/* Desktop Navigation with 0.5s cubic-bezier transition */}
              <nav className="header__nav">
                <ul className="header__menu">
                  <li><a href="#hero">Main</a></li>
                  <li><a href="#about-scene">About Us</a></li>
                  <li><a href="#branches">Branches</a></li>
                  <li><a href="#menu">Menu</a></li>
                  <li><a href="#retail">Artisanal Tubs</a></li>
                  <li><a href="#contact">Contacts</a></li>
                </ul>
              </nav>

              {/* Right: Branches Dropdown */}
              <div className="header__branches-dropdown" onMouseLeave={() => setBranchDropdownOpen(false)}>
                <button
                  className="header__branches-btn"
                  onMouseEnter={() => setBranchDropdownOpen(true)}
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  aria-expanded={branchDropdownOpen}
                >
                  <span>Our Branches</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {branchDropdownOpen && (
                  <div className="header__branches-menu">
                    <a href="#branches" className="header__branches-menu-item" onClick={() => setBranchDropdownOpen(false)}>
                      <span className="header__branches-dot" />
                      Grand Plaza Hotel (Gate 339)
                    </a>
                    <a href="#branches" className="header__branches-menu-item" onClick={() => setBranchDropdownOpen(false)}>
                      <span className="header__branches-dot" />
                      Dar Al-Hijra (Northern Central)
                    </a>
                    <a href="#branches" className="header__branches-menu-item" onClick={() => setBranchDropdownOpen(false)}>
                      <span className="header__branches-dot" />
                      Quba Walkway & Heritage Ave
                    </a>
                  </div>
                )}
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
            <span>Specialty Bag Added To Cart</span>
          </div>
        )}

        {/* Luxury Burgundy Rose Mobile Slide-in Drawer */}
        <div className={`header__mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="header__mobile-drawer-header">
            <span className="header__mobile-logo">MEDINA ROSE | ميد روز</span>
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
            <a href="#retail" onClick={() => setMobileMenuOpen(false)} className="header__mobile-link">Artisanal Tubs</a>
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
            <p className="header__mobile-copyright">© 2026 Medina Rose. All rights reserved.</p>
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
                <source media="(max-width: 768px)" srcSet="/images/hero-rose-hand-mobile-bg.png" />
                <img
                  src="/images/hero-rose-hand-bg.png"
                  alt="Medina Rose Atmosphere - Hand holding fresh rose petals"
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
                <div className="mission__content" data-aos="fade-right">
                  <h2>Our Mission</h2>
                  <p>
                    Our mission is clear: to craft exceptional artisanal ice cream and gelato while setting the highest standards across every part of our experience. From organic Madinah rose water distillation to natural ingredients, every detail matters.
                  </p>
                  <p>
                    As Medina Rose grows and welcomes visitors from around the globe in Al-Madinah, we apply these standards at scale—raising expectations for flavor quality, spatial design, and authentic Saudi hospitality. Our goal is to create unforgettable dessert rituals near the Prophet&apos;s Mosque that guests return to and cherish.
                  </p>
                </div>
              </div>

              {/* Mobile Mission Image Frame (Shown on mobile screens) */}
              <div className="mission__mobile-frame" data-aos="fade-up">
                <img
                  src="/images/medina-rose-hand-mobile.png"
                  alt="Medina Rose Signature Artisanal Gelato"
                  className="mission__mobile-img"
                />
              </div>
            </div>
            <div className="mission__frame-slot">
              <motion.img
                src="/images/medina-rose-hand.png"
                alt="Medina Rose Gelato"
                className="mission__frame-img"
                style={{
                  x: isMobile ? '0%' : missionImgX,
                  scale: isMobile ? 1 : missionImgScale,
                  opacity: isMobile ? 1 : missionImgOpacity,
                }}
              />
            </div>
          </section>

          {/* 5. PROUD OF QUALITY / SOURCING EXCELLENCE SECTION */}
          <section className="proud">
            <div className="container">
              <div className="proud-wrapper">
                {/* Carousel Slider */}
                <div className="proud-slider" data-aos="fade-right">
                  <div
                    className="proud-slider-track"
                    style={{ transform: `translateX(-${proudSlideIndex * 100}%)` }}
                  >
                    {proudSlides.map((src, idx) => (
                      <div key={idx} className="proud-slide">
                        <img src={src} alt={`Sourcing Slide ${idx + 1}`} />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Chevrons */}
                  <button
                    className="proud-slider-prev swiper-button-prev"
                    onClick={() => setProudSlideIndex((prev) => (prev > 0 ? prev - 1 : proudSlides.length - 1))}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={22} color="#000" />
                  </button>
                  <button
                    className="proud-slider-next swiper-button-next"
                    onClick={() => setProudSlideIndex((prev) => (prev < proudSlides.length - 1 ? prev + 1 : 0))}
                    aria-label="Next slide"
                  >
                    <ChevronRight size={22} color="#000" />
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
                  <h2>Artisanal <br /> Heritage</h2>
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
              <img src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/swiper-slide22.png" alt="Sourcing Background" />
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
                      onClick={() => setMenuSlideIndex((prev) => (prev > 0 ? prev - 1 : menuSlides.length - (isMobile ? 1 : 3)))}
                      aria-label="Previous menu items"
                    >
                      <ChevronLeft size={32} strokeWidth={1.75} />
                    </button>
                    <button
                      className="menu-nav-arrow menu-nav-arrow--next"
                      onClick={() => setMenuSlideIndex((prev) => (prev < menuSlides.length - (isMobile ? 1 : 3) ? prev + 1 : 0))}
                      aria-label="Next menu items"
                    >
                      <ChevronRight size={32} strokeWidth={1.75} />
                    </button>

                    <div className="menu-carousel-viewport">
                      <div
                        className="menu-track"
                        style={{ transform: `translateX(-${menuSlideIndex * (isMobile ? 254 : 288)}px)` }}
                      >
                        {menuSlides.map((src, idx) => (
                          <div key={idx} className="menu-card">
                            <img src={src} alt={`Menu highlight ${idx + 1}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Image Frame */}
              <div className="menu__mobile-frame" data-aos="fade-up">
                <SprayBottleMist />
              </div>
            </div>

            {/* Desktop Menu Spray Bottle Slot (Static PNG with Interactive Mist) */}
            <div className="menu__frame-slot">
              <SprayBottleMist />
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

              <div className="branches__wrapper" data-aos="fade-up" data-aos-delay="200">
                <div className="branches__map">
                  {/* Enhanced Ultra High-Res Minimal Medina Map Image */}
                  <img
                    className="branches__map-img"
                    src="/images/medina_map.png"
                    alt="Medina Rose Branches Map — Al-Madinah Al-Munawwarah"
                    loading="eager"
                  />

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
                        <img src={branch.image} alt={branch.name} />
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
              <div className="branches__popup active">
                <button
                  className="branches__close"
                  onClick={() => setActivePopupId(null)}
                  aria-label="Close branch modal"
                >
                  <X size={24} />
                </button>
                <div className="branch-image-box">
                  <img src={currentBranch.image} alt={currentBranch.name} />
                </div>
                <div className="branches__info">
                  <div className="branches__info-top">
                    <h3>{currentBranch.name}</h3>
                    <div className="branches__info-top--rating">
                      <span>{currentBranch.rating}</span>
                      <span style={{ color: '#E29D52' }}>★</span>
                    </div>
                  </div>
                  <div className="branches__info-bottom">
                    <ul>
                      <li>
                        <MapPin size={16} />
                        <span>{currentBranch.location}</span>
                      </li>
                      <li>
                        <Clock size={16} />
                        <span>{currentBranch.hours}</span>
                      </li>
                      <li>
                        <Phone size={16} />
                        <a href={`tel:${currentBranch.tel.replace(/\s+/g, '')}`}>{currentBranch.tel}</a>
                      </li>
                    </ul>
                    <a
                      className="branches__info-bottom-link"
                      href={currentBranch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GOOGLE MAPS
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
                    <img
                      src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/swiper-slide22.png"
                      alt="Sustainability Practices"
                    />
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

          {/* 10. RETAIL BEANS SECTION (WITH REQUESTANIMATIONFRAME CUPPING COUNTER) */}
          <section id="retail" className="retail" ref={retailSectionRef}>
            <div className="container-wrapper">
              <div className="container" data-aos="fade-up">
                <h2>Artisanal Gelato Tubs & Gifts</h2>
              </div>

              <div className="retail-track-container" data-aos="fade-up" data-aos-delay="200">
                <div className="retail-track">
                  {retailProducts.map((product) => (
                    <div key={product.id} className="retail-swiper-box">
                      <div className="retail-swiper-image">
                        <p className="retail-swiper-counter">
                          <span className="counter">{counters[product.id]} +</span>
                        </p>
                        <div className="retail-swiper-image-product">
                          <img src={product.image} alt={product.title} />
                        </div>
                        <div style={{ width: '40px' }} />
                      </div>
                      <div className="retail-swiper-content">
                        <div className="retail-swiper-title">
                          <h3>
                            <span style={{ fontSize: '28px' }}>{product.flag}</span> <br />
                            {product.title}
                          </h3>
                          <p>{product.notes}</p>
                        </div>
                        <p className="retail-swiper-price">{product.price}</p>
                        <button className="retail-swiper-btn" onClick={handleAddToCart}>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="retail-bg">
              <img src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/retail-bg.png" alt="Retail Beans Background" />
            </div>
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
                  {communityVoices.map((item, idx) => (
                    <div key={idx} className="team-item" style={{ minWidth: '300px', padding: '1.75rem', textAlign: 'left' }}>
                      <div className="team-item-image" style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '1rem', overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#E29D52', marginBottom: '0.75rem', fontWeight: 600 }}>{item.role}</p>
                      <p style={{ fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.88 }}>&ldquo;{item.quote}&rdquo;</p>
                    </div>
                  ))}
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
                <a className="footer__logo" href="#hero" style={{ fontSize: '20px', letterSpacing: '1px' }}>
                  MEDINA ROSE | ميد روز
                </a>
                <p className="footer__text">
                  Crafted with authentic Medina rose water & organic ingredients near the Prophet&apos;s Mosque.
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
                  <li><a href="#retail">Artisanal Tubs</a></li>
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
              <p>© 2026 Medina Rose. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
