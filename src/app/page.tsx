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

export default function ExactTemplatePage() {
  // Navigation & Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLocationTab, setActiveLocationTab] = useState('UAE');
  const [cartCount, setCartCount] = useState(0);
  const [cartToast, setCartToast] = useState(false);

  // Active Branch Popup Modal State
  const [activePopupId, setActivePopupId] = useState<number | null>(null);

  // Slider indices
  const [proudSlideIndex, setProudSlideIndex] = useState(0);
  const [menuSlideIndex, setMenuSlideIndex] = useState(0);

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

  const { scrollYProgress: missionScrollProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });

  const missionImgX = useTransform(missionScrollProgress, [0, 0.5, 1], ["60%", "0%", "60%"]);
  const missionImgScale = useTransform(missionScrollProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const missionImgOpacity = useTransform(missionScrollProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // Parallax Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.parentElement?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.4;
          const yPos = (rect.top - window.innerHeight * 0.5) * speed;
          parallaxRef.current.style.transform = `translateY(${yPos}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  // 12 Exact Branches Data
  const branchList = [
    {
      id: 1,
      name: 'ROASTERS Palm Jumeirah Mall',
      rating: '4.9',
      location: 'Vista Tower 1 — Emaar Beachfront — The Palm Jumeirah',
      hours: 'Monday—Sunday: 7am–11pm',
      tel: '+971 58 558 5523',
      mapUrl: 'https://maps.google.com',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      x: 18,
      y: 65
    },
    {
      id: 2,
      name: 'Roasters Emaar Beachfront',
      rating: '4.8',
      location: 'Vista Tower 1 — Emaar Beachfront — The Palm Jumeirah',
      hours: 'Monday—Sunday: 7am–11pm',
      tel: '+971 58 558 5523',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_2734.PNG',
      x: 24,
      y: 60
    },
    {
      id: 3,
      name: 'ROASTERS JBR',
      rating: '4.9',
      location: 'Amwaj 5 — Jumeirah Beach Residence 2',
      hours: 'Monday to Sunday: 7am–12am',
      tel: '+971 58 572 5444',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/coffe2.JPG',
      x: 30,
      y: 70
    },
    {
      id: 4,
      name: 'ROASTERS Science Park (Coming Soon)',
      rating: '4.6',
      location: 'Dubai Science Park Central Complex',
      hours: 'Opening Q3 2026',
      tel: '+971 58 558 5523',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_3005.JPG',
      x: 38,
      y: 55
    },
    {
      id: 5,
      name: 'ROASTERS Dubai Hills',
      rating: '4.7',
      location: 'Nakheel Mall, 2nd Floor — Dubai Hills',
      hours: 'Monday to Sunday: 8am–11pm',
      tel: '+971 58 595 8110',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_2767.JPEG',
      x: 45,
      y: 45
    },
    {
      id: 6,
      name: 'Roasters Al Wasl',
      rating: '4.8',
      location: 'Villa 484a, Al Wasl Road, Jumeirah 2',
      hours: 'Monday to Sunday: 7am–12am',
      tel: '+971 58 511 4777',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_2772.PNG',
      x: 52,
      y: 35
    },
    {
      id: 7,
      name: 'Roasters Downtown Boulevard',
      rating: '4.8',
      location: 'Yansoon 1 — Sheikh Mohammed bin Rashid Boulevard',
      hours: 'Sunday–Thursday: 7am–12am | Friday–Saturday: 7am–1am',
      tel: '+971 58 544 0400',
      mapUrl: 'https://maps.google.com',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      x: 60,
      y: 40
    },
    {
      id: 8,
      name: 'Roasters Dubai Mall',
      rating: '4.9',
      location: 'Dubai Mall 1st Floor, next to the Aquarium',
      hours: 'Sunday–Thursday: 10am–12am | Friday–Saturday: 10am–1am',
      tel: '+971 58 598 6577',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_2765.JPEG',
      x: 68,
      y: 32
    },
    {
      id: 9,
      name: 'ROASTERS Sobha Hartland',
      rating: '4.7',
      location: 'Sobha Hartland, The Terrace Residence Shop no 01',
      hours: 'Monday–Sunday: 7am–12am',
      tel: '+971 58 559 2459',
      mapUrl: 'https://maps.google.com',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      x: 75,
      y: 50
    },
    {
      id: 10,
      name: 'Roasters Creek Harbour',
      rating: '4.9',
      location: 'North Promenade, The Grand — Dubai Creek Harbour',
      hours: 'Monday–Sunday: 7am–12am',
      tel: '+971 58 561 6135',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/coffe5.webp',
      x: 82,
      y: 28
    },
    {
      id: 11,
      name: 'Roasters Nad Al Sheba Mall',
      rating: '4.9',
      location: 'Shop no 01 — Nad Al Sheba 1 — Dubai',
      hours: 'Monday–Sunday: 7am–12am',
      tel: '+971 58 559 2459',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_2757.PNG',
      x: 88,
      y: 62
    },
    {
      id: 12,
      name: 'Port Rashid (Coming Soon)',
      rating: '4.9',
      location: 'Marina Promenade — Port Rashid',
      hours: 'Opening Late 2026',
      tel: '+971 58 511 4777',
      mapUrl: 'https://maps.google.com',
      image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_3003.JPG',
      x: 92,
      y: 20
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

  // News Items
  const newsList = [
    {
      id: 'news-1',
      title: 'Collagen Shots at Roasters: A New Wellness Ritual',
      text: 'Roasters continues to expand its menu beyond coffee, introducing collagen wellness rituals.',
      image: 'https://roasterscoffee.ae/wp-content/uploads/2026/03/img_3861-683x1024.png',
      link: '#news'
    },
    {
      id: 'news-2',
      title: 'The Most Trending -86°C Coffee Has Arrived at Roasters Nad Al Sheba Mall',
      text: 'A new sub-zero coffee extraction ritual is taking over Dubai — bold, crisp, and refreshing.',
      image: 'https://roasterscoffee.ae/wp-content/uploads/2026/03/img_4193-683x1024.png',
      link: '#news'
    },
    {
      id: 'news-3',
      title: 'Interview with Elza Shirokova',
      text: 'Co-founder & Managing Director sharing the vision and philosophy behind Roasters Specialty Coffee.',
      image: 'https://roasterscoffee.ae/wp-content/uploads/2026/01/article-image-1024x280.webp',
      link: '#news'
    },
    {
      id: 'news-4',
      title: 'Roasters Expands with Flagship Hub at Dubai Science Park',
      text: 'Dubai’s specialty coffee scene welcomes our new architectural state-of-the-art hub.',
      image: 'https://roasterscoffee.ae/wp-content/uploads/2026/01/img_2319-1024x756.jpg',
      link: '#news'
    },
    {
      id: 'news-5',
      title: 'Aroma Display at Roasters',
      text: 'Discover the World of Coffee Through Scent! An interactive sensory experience for coffee lovers.',
      image: 'https://roasterscoffee.ae/wp-content/uploads/2026/01/img_6801-683x1024.jpg',
      link: '#news'
    },
    {
      id: 'news-6',
      title: 'Roasters Drip Coffee Box',
      text: 'Discover the perfect balance between convenience and craftsmanship with our single-serve drip boxes.',
      image: 'https://roasterscoffee.ae/wp-content/uploads/2026/01/img_2317-1024x683.jpg',
      link: '#news'
    }
  ];

  // Team Members
  const teamMembers = [
    { name: 'Konstantin Harbuz', role: 'Co-founder & CEO', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_2497.png' },
    { name: 'Ivan Kroshnyi', role: 'Co-founder', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Ivan.png' },
    { name: 'Elza Shirokova', role: 'Co-founder', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Elza-Shirokova.png' },
    { name: 'Darrell Guest', role: 'Operations Director', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/IMG_3830.png' },
    { name: 'Veronica Rotar', role: 'Food and Beverage Manager', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Veronica-Rotar.png' },
    { name: 'Israr Ahmed', role: 'Finance Director', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Israr-Ahmed.png' },
    { name: 'Nickolas Anisimov', role: 'Business Development Manager', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Nickolas-Anisimov.png' },
    { name: 'Elena Savina', role: 'Marketing Director', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Elena-Savina.png' },
    { name: 'Anatoly Gorbunov', role: 'Beverage Manager', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Anatoly-Gorbunov.png' },
    { name: 'Kai Ayanto', role: 'Head Roaster', image: 'https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/Kai-Ayanto.png' }
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
                <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
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

              {/* Contact and Cart Actions */}
              <div className="header__content-contact">
                <a className="header__content-contact--link" href="tel:+966500000000">
                  +966 50 000 0000
                </a>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header__whatsapp-btn"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} fill="currentColor" />
                </a>
                <a className="header__content-contact--tel" href="https://www.instagram.com/medinarose.sa" target="_blank" rel="noopener noreferrer">
                  @medinarose.sa
                </a>

                {/* Cart Icon with Counter */}
                <div className="header__cart" onClick={() => alert(`Shopping Bag has ${cartCount} items.`)}>
                  <ShoppingBag size={22} color="#E86A92" />
                  <span className="header__cart-count">{cartCount}</span>
                </div>
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

        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              padding: '32px',
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: '#FFF' }}
            >
              <X size={32} />
            </button>
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>Main</a>
            <a href="#about-scene" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>About Us</a>
            <a href="#branches" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>Branches</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>Contacts</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>Menu</a>
            <a href="#retail" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>Retail Beans</a>
            <a href="#sustainability" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '24px', fontWeight: 700 }}>Sustainability</a>
          </div>
        )}

        <main>
          {/* 2. HERO SECTION WITH FADE-UP ANIMATION */}
          <section id="hero" className="hero">
            <div className="container">
              <div className="hero__content" data-aos="fade-up">
                <h1>
                  Where ice cream is more <br /> than a treat <mark>It’s a Medina ritual.</mark>
                </h1>
              </div>
              <div className="hero__list" data-aos="fade-up" data-aos-delay="200">
                <p>Visit Our Madinah Branches</p>
                <ul className="hero__list-ul">
                  <li className="hero__list-item">
                    <button
                      className={`hero__list-link ${activeLocationTab === 'Prophet Mosque Gate 333' ? 'hero__list--link--active' : ''}`}
                      onClick={() => setActiveLocationTab('Prophet Mosque Gate 333')}
                    >
                      Prophet's Mosque (Gate 333)
                    </button>
                  </li>
                  <li className="hero__list-item">
                    <button
                      className={`hero__list-link ${activeLocationTab === 'Quba Walkway' ? 'hero__list--link--active' : ''}`}
                      onClick={() => setActiveLocationTab('Quba Walkway')}
                    >
                      Quba Walkway
                    </button>
                  </li>
                  <li className="hero__list-item">
                    <button
                      className={`hero__list-link ${activeLocationTab === 'Sultana' ? 'hero__list--link--active' : ''}`}
                      onClick={() => setActiveLocationTab('Sultana')}
                    >
                      Sultana Drive-Thru (Coming Soon)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hero__bg--image">
              <img
                src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/hero-bg.png"
                alt="Roasters Coffee Atmosphere"
              />
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
                    Founded in 2021 in Dubai, Roasters Specialty Coffee House was born from a passion for exceptional coffee and a vision to bring the world’s finest brews to the UAE.
                  </p>
                  <p>
                    From the start, Roasters set out to raise the standard of specialty coffee in the region. We believe great coffee is more than taste—it is connection, craftsmanship, and culture. That’s why we work closely with dedicated farmers, world-class roasters, and skilled baristas to ensure excellence in every cup.
                  </p>
                  <p>
                    Today, Roasters is one of the leading and fastest-growing specialty coffee companies in the UAE, recognized for its quality, scale, and innovation. With multiple flagship locations, we have built a strong presence and a loyal community of coffee lovers—from newcomers to true connoisseurs.
                  </p>
                  <p>
                    <strong>Welcome to ROASTERS.</strong>
                    Where coffee is more than a drink—it’s an experience.
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
                    As Medina Rose grows and welcomes visitors from around the globe in Al-Madinah, we apply these standards at scale—raising expectations for flavor quality, spatial design, and authentic Saudi hospitality. Our goal is to create unforgettable dessert rituals near the Prophet's Mosque that guests return to and cherish.
                  </p>
                </div>
              </div>
            </div>
            <div className="mission__frame-slot">
              <motion.img
                src="/images/medina-rose-hand.png"
                alt="Medina Rose Gelato"
                className="mission__frame-img"
                style={{
                  x: missionImgX,
                  scale: missionImgScale,
                  opacity: missionImgOpacity,
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

                {/* Sourcing Narrative */}
                <div className="proud-content" data-aos="fade-left">
                  <h2>Sourcing <br /> Excellence</h2>
                  <div className="proud-content-description">
                    <p>
                      Roasters sources coffee directly at origin, participating in major international auctions to secure rare and exceptional lots. All green coffee is imported through direct trade, ensuring full control over quality, traceability, and consistency.
                    </p>
                    <p>
                      With beans sourced from 24 producing countries, Roasters offers one of the largest and most diverse specialty coffee selections in the Middle East, showcasing the depth, character, and excellence of the world’s leading coffee regions.
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
          <section id="menu" className="menu">
            <div className="container-wrapper">
              <div className="container">
                <div className="menu-content" data-aos="fade-up">
                  <h2>Menu</h2>
                  <p>
                    A dynamic mix of classic favorites and trend-driven innovations inspired by global specialty coffee culture.
                  </p>
                  <a
                    className="menu-content-link"
                    href="https://roasterscoffee.ae/wp-content/uploads/2026/07/all-other-branhes-menu-roasters.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    show me
                  </a>
                </div>
              </div>

              {/* Menu Image Carousel */}
              <div className="menu-carousel" data-aos="fade-up" data-aos-delay="200">
                <button
                  className="menu-slider-btn menu-slider-btn--prev"
                  onClick={() => setMenuSlideIndex((prev) => (prev > 0 ? prev - 1 : menuSlides.length - 3))}
                  aria-label="Previous menu items"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="menu-slider-btn menu-slider-btn--next"
                  onClick={() => setMenuSlideIndex((prev) => (prev < menuSlides.length - 3 ? prev + 1 : 0))}
                  aria-label="Next menu items"
                >
                  <ChevronRight size={22} />
                </button>

                <div
                  className="menu-track"
                  style={{ transform: `translateX(-${menuSlideIndex * 360}px)` }}
                >
                  {menuSlides.map((src, idx) => (
                    <div key={idx} className="menu-card">
                      <img src={src} alt={`Menu highlight ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="menu-bg">
              <img src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/contact-bg.png" alt="Menu background" />
            </div>
          </section>

          {/* 7. BRANCHES SECTION WITH INTERACTIVE MAP & 12 POPUPS */}
          <section id="branches" className="branches">
            <div className="branches-wrapper">
              <div className="container" data-aos="fade-up">
                <h2>Branches</h2>
              </div>

              <div className="branches__wrapper" data-aos="fade-up" data-aos-delay="200">
                <div className="branches__map">
                  {/* High-res World / Dubai Coordinate Canvas Background */}
                  <img
                    className="branches__map-img"
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
                    alt="Branches Map Canvas"
                    style={{ minHeight: '600px', filter: 'grayscale(1) contrast(1.2) brightness(0.95)' }}
                  />

                  {/* 12 Coordinate Pins with Pulsing Keyframe Animation */}
                  {branchList.map((branch) => (
                    <button
                      key={branch.id}
                      className={`branches__pin map-pin ${activePopupId === branch.id ? 'active' : ''}`}
                      style={{ left: `${branch.x}%`, top: `${branch.y}%` }}
                      onClick={() => setActivePopupId(branch.id)}
                      aria-label={`Open details for ${branch.name}`}
                      title={branch.name}
                    />
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
                  <h2>Sustainability</h2>
                  <div className="proud-content-description">
                    <p>
                      At Roasters, sustainability is more than a value — it’s a responsibility. We are committed to reducing our environmental impact through conscious choices at every level of our operation.
                    </p>
                    <p>
                      We believe great coffee shouldn’t come at the planet’s expense. That’s why we’re building a future where quality, sustainability, and community go hand in hand — one cup at a time.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pillars Box */}
              <div className="proud-wrapper-box" data-aos="fade-up">
                <h3>From sourcing to service, we prioritize eco-friendly practices:</h3>
                <div className="proud-wrapper-box-description">
                  <p>We’ve eliminated single-use plastic across all our branches, choosing compostable and recyclable materials instead.</p>
                  <p>We work with coffee producers who follow sustainable and ethical farming methods.</p>
                  <p>We continuously optimize our supply chain to reduce waste, lower emissions, and support long-term environmental health.</p>
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
                  Roasters Specialty Coffee House <br />
                  Head Office, Villa 484a, Al Wasl Road, <br />
                  Jumeirah 2, Dubai, UAE
                </p>
                <a href="mailto:beans@roasterscoffee.ae">beans@roasterscoffee.ae</a>
                <a href="https://roasterscoffee.ae" target="_blank" rel="noopener noreferrer">www.roasterscoffee.ae</a>
                <ul className="contact-list">
                  <li className="contact-list-item">
                    <a href="https://www.instagram.com/roasterscoffee_dxb/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram size={20} />
                    </a>
                  </li>
                  <li className="contact-list-item">
                    <a href="https://www.linkedin.com/company/roasters-specialty-coffee-house/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                  </li>
                  <li className="contact-list-item">
                    <a href="https://m.facebook.com/100083362985889/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook size={20} />
                    </a>
                  </li>
                </ul>
              </address>
            </div>
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

          {/* 11. NEWS SECTION */}
          <section className="news">
            <div className="container">
              <div data-aos="fade-up">
                <h2>News</h2>
              </div>
              <div className="news-list" data-aos="fade-up" data-aos-delay="200">
                {newsList.map((item) => (
                  <article key={item.id} className="news-item">
                    <a className="news-item-link" href={item.link}>
                      <div className="news-item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <h3 className="news-item-title">{item.title}</h3>
                      <p className="news-item-text">{item.text}</p>
                      <span className="news-item-links">
                        read more <ArrowRight size={14} />
                      </span>
                    </a>
                  </article>
                ))}
              </div>
              <div data-aos="fade-up" data-aos-delay="300" style={{ marginTop: '24px' }}>
                <a className="news-view" href="#news">View More</a>
              </div>
            </div>
            <div className="news-bg">
              <img src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/news-bg.png" alt="News Background" />
            </div>
          </section>

          {/* 13. TEAM SECTION */}
          <section className="team">
            <div className="container">
              <div className="team-content" data-aos="fade-right">
                <h2>Team</h2>
                <p>
                  A passionate, diverse, high-performance team driven by creativity, ownership, and a shared mission to excel.
                </p>
              </div>
              <div className="team-track-container" data-aos="fade-left">
                <div className="team-track">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="team-item">
                      <div className="team-item-image">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="team-bg">
              <img src="https://roasterscoffee.ae/wp-content/themes/generatepress/assets/images/franchise-bg.png" alt="Team Background" />
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
                  Crafted with authentic Medina rose water & organic ingredients near the Prophet's Mosque.
                </p>
                <div className="footer__socials">
                  <a href="https://www.instagram.com/medinarose.sa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
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
                    <a href="tel:+966500000000">+966 50 000 0000</a>
                  </li>
                  <li>
                    <MapPin size={16} />
                    <span>Madinah, Saudi Arabia (Al-Masjid an-Nabawi)</span>
                  </li>
                  <li>
                    <Clock size={16} />
                    <span>Daily: 7:00 AM – 1:00 AM</span>
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
