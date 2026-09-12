'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

interface MistParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  initialAlpha: number;
  life: number;
  maxLife: number;
  drag: number;
  gravity: number;
  turbulenceFreq: number;
  turbulenceAmp: number;
  turbulencePhase: number;
  type: 'droplet_fine' | 'droplet_luminous' | 'aerosol_veil' | 'orifice_flash';
  hue: 'white' | 'pearl' | 'whisper_rose';
}

export default function SprayBottleMist({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<MistParticle[]>([]);
  const [hintVisible, setHintVisible] = useState<boolean>(true);

  // Sync canvas buffer with its rendered CSS dimensions (handling DPR cleanly)
  const updateCanvasDimensions = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }, []);

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateCanvasDimensions]);

  // Compute exact nozzle tip coordinate relative to the canvas
  const getNozzleOrigin = useCallback(() => {
    if (!imgRef.current || !canvasRef.current) return null;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const imgRect = img.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    // In the cropped 508 x 594 asset (transparent margins trimmed):
    // Gold nozzle orifice leftmost tip: X = 60px (11.81%), Y = 34px (5.72%)
    const nozzleClientX = imgRect.left + imgRect.width * 0.1181;
    const nozzleClientY = imgRect.top + imgRect.height * 0.0572;

    const nozzleX = nozzleClientX - canvasRect.left;
    const nozzleY = nozzleClientY - canvasRect.top;
    const scale = imgRect.width / 500; // Reference display scale factor

    return { nozzleX, nozzleY, scale, canvasRect };
  }, []);

  // Trigger fine fragrance mist
  const triggerSpray = useCallback(() => {
    const origin = getNozzleOrigin();
    if (!origin || !canvasRef.current) return;

    setHintVisible(false);

    // Clean reset: cancel previous RAF if in-flight so sprays retrigger cleanly
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const particles: MistParticle[] = [];
    const scale = origin.scale;

    // Nozzle orientation: ~170 degrees (angled outward to the left, ~10 deg upward tilt)
    const baseAngle = (170 * Math.PI) / 180;

    // 1. Fine Atomized Micro-Droplets (The body of the fragrance spray)
    // Dense spray cone with fine particle sizing (0.8 - 2.2px), carrying 1.5 - 2x farther (~260px - 440px)
    const dropletCount = prefersReducedMotion ? 40 : 260;
    for (let i = 0; i < dropletCount; i++) {
      // Natural cone spread: tight near nozzle, expanding softly
      const angleSpread = (Math.random() - 0.5) * (0.22 + Math.random() * 0.16);
      const angle = baseAngle + angleSpread;

      // High initial velocity to carry 1.5 - 2x farther (~280px - 460px)
      const speed = (prefersReducedMotion ? 5.0 : 13.0 + Math.random() * 18.0) * scale;
      const maxLife = Math.round((prefersReducedMotion ? 55 : 90 + Math.random() * 35)); // ~1.5 - 2.1s

      const rand = Math.random();
      const hue: 'white' | 'pearl' | 'whisper_rose' =
        rand > 0.55 ? 'whisper_rose' : rand > 0.25 ? 'pearl' : 'white';

      particles.push({
        x: origin.nozzleX + (Math.random() - 0.5) * 3 * scale,
        y: origin.nozzleY + (Math.random() - 0.5) * 3 * scale,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (0.75 + Math.random() * 0.95) * scale,
        maxSize: (1.2 + Math.random() * 1.5) * scale,
        alpha: 0.65 + Math.random() * 0.32,
        initialAlpha: 0.65 + Math.random() * 0.32,
        life: 0,
        maxLife,
        drag: 0.965, // Gentle initial drag allows strong forward reach
        gravity: (0.016 + Math.random() * 0.024) * scale,
        turbulenceFreq: 0.04 + Math.random() * 0.05,
        turbulenceAmp: (0.35 + Math.random() * 0.55) * scale,
        turbulencePhase: Math.random() * Math.PI * 2,
        type: 'droplet_fine',
        hue,
      });
    }

    // 2. High-Speed Luminous Leading Droplets (Fine spray vanguard reaching furthest distance)
    const leadCount = prefersReducedMotion ? 12 : 55;
    for (let i = 0; i < leadCount; i++) {
      const angleSpread = (Math.random() - 0.5) * 0.16;
      const angle = baseAngle + angleSpread;
      const speed = (20.0 + Math.random() * 15.0) * scale;
      const maxLife = Math.round(75 + Math.random() * 35);

      particles.push({
        x: origin.nozzleX,
        y: origin.nozzleY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (0.8 + Math.random() * 0.7) * scale,
        maxSize: (1.1 + Math.random() * 0.8) * scale,
        alpha: 0.75 + Math.random() * 0.25,
        initialAlpha: 0.75 + Math.random() * 0.25,
        life: 0,
        maxLife,
        drag: 0.960,
        gravity: (0.012 + Math.random() * 0.018) * scale,
        turbulenceFreq: 0.035 + Math.random() * 0.05,
        turbulenceAmp: (0.25 + Math.random() * 0.4) * scale,
        turbulencePhase: Math.random() * Math.PI * 2,
        type: 'droplet_luminous',
        hue: Math.random() > 0.4 ? 'whisper_rose' : 'white',
      });
    }

    // 3. Ultra-Sheer Aerosol Vapor Veil (Translucent ambient plume, visible against cream bg)
    const veilCount = prefersReducedMotion ? 8 : 34;
    for (let i = 0; i < veilCount; i++) {
      const angleSpread = (Math.random() - 0.5) * 0.32;
      const angle = baseAngle + angleSpread;
      const speed = (9.0 + Math.random() * 12.0) * scale;
      const maxLife = Math.round(95 + Math.random() * 30); // Lingers gently up to ~2.1s

      particles.push({
        x: origin.nozzleX,
        y: origin.nozzleY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (3.0 + Math.random() * 3.5) * scale,
        maxSize: (18.0 + Math.random() * 20.0) * scale,
        alpha: 0.22 + Math.random() * 0.14,
        initialAlpha: 0.22 + Math.random() * 0.14,
        life: 0,
        maxLife,
        drag: 0.954,
        gravity: (0.008 + Math.random() * 0.014) * scale,
        turbulenceFreq: 0.03 + Math.random() * 0.04,
        turbulenceAmp: (0.5 + Math.random() * 0.7) * scale,
        turbulencePhase: Math.random() * Math.PI * 2,
        type: 'aerosol_veil',
        hue: 'whisper_rose',
      });
    }

    // 4. Orifice Venting Flash (Micro flash at nozzle tip for first 120ms)
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: origin.nozzleX,
        y: origin.nozzleY,
        vx: (Math.random() - 0.5) * 1.8 * scale,
        vy: (Math.random() - 0.5) * 1.8 * scale,
        size: (2.0 + Math.random() * 2.5) * scale,
        maxSize: (8.0 + Math.random() * 6.0) * scale,
        alpha: 0.45,
        initialAlpha: 0.45,
        life: 0,
        maxLife: 16 + Math.random() * 8,
        drag: 0.88,
        gravity: 0,
        turbulenceFreq: 0,
        turbulenceAmp: 0,
        turbulencePhase: 0,
        type: 'orifice_flash',
        hue: 'white',
      });
    }

    particlesRef.current = particles;

    // Canvas Render loop
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      let activeCount = 0;
      const pList = particlesRef.current;

      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];
        p.life++;

        if (p.life < p.maxLife) {
          activeCount++;

          // 1. Aerodynamic Forward Kinematics with Progressive Air Drag
          p.x += p.vx;
          p.y += p.vy;

          // Drag starts gentle for distance, then decelerates smoothly
          const currentDrag = p.life < 22 ? p.drag : p.drag * 0.984;
          p.vx *= currentDrag;
          p.vy *= currentDrag;

          // 2. Subtle Natural Air Turbulence (Prevents mechanical straight-line motion)
          if (p.turbulenceAmp > 0) {
            const speed = Math.hypot(p.vx, p.vy) || 1;
            const perpX = -p.vy / speed;
            const perpY = p.vx / speed;
            const turb = Math.sin(p.life * p.turbulenceFreq + p.turbulencePhase) * p.turbulenceAmp;
            p.x += perpX * turb;
            p.y += perpY * turb;
          }

          // 3. Downward Gravity Drift (Increases as particle decelerates and settles)
          const progress = p.life / p.maxLife;
          const settleFactor = Math.min(1, Math.max(0, (p.life - 16) / (p.maxLife - 16)));
          p.vy += p.gravity * settleFactor;

          // 4. Smooth, Natural Opacity Fade (Fast rise at orifice, elegant cubic ease-out)
          const fadeIn = Math.min(1, p.life / 3.0);
          const fadeOut = Math.pow(1 - progress, 1.55);
          const currentAlpha = p.initialAlpha * fadeIn * fadeOut;

          // 5. Progressive Diffusion (Gently expanding size as mist spreads)
          const currentSize = p.size + (p.maxSize - p.size) * Math.sin((progress * Math.PI) / 2);

          if (currentAlpha > 0.005) {
            ctx.save();

            if (p.type === 'aerosol_veil') {
              // Soft translucent mist veil (natural contrast against warm cream background)
              const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
              grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`);
              grad.addColorStop(0.35, `rgba(235, 168, 190, ${currentAlpha * 0.65})`);
              grad.addColorStop(0.7, `rgba(215, 125, 150, ${currentAlpha * 0.3})`);
              grad.addColorStop(1, 'rgba(244, 236, 229, 0)');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === 'droplet_fine' || p.type === 'droplet_luminous') {
              // Fine atomized fragrance droplet with realistic contrast against cream
              if (p.hue === 'whisper_rose') {
                ctx.fillStyle = `rgba(195, 65, 98, ${currentAlpha * 0.78})`;
              } else if (p.hue === 'pearl') {
                ctx.fillStyle = `rgba(218, 120, 145, ${currentAlpha * 0.82})`;
              } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
                ctx.shadowColor = 'rgba(180, 50, 85, 0.4)';
                ctx.shadowBlur = 1.5 * scale;
              }

              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Orifice venting flash
              const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
              grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 1.0})`);
              grad.addColorStop(0.4, `rgba(240, 180, 200, ${currentAlpha * 0.55})`);
              grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }
      }

      ctx.restore();

      if (activeCount > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, [getNozzleOrigin]);

  return (
    <div
      ref={containerRef}
      className={`menu-spray-container ${className}`}
      onClick={triggerSpray}
      role="button"
      tabIndex={0}
      aria-label="Click to spray Medina Rose fragrance mist"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerSpray();
        }
      }}
    >
      {/* 1. Completely Static Transparent PNG of Spray Bottle + Glove */}
      <img
        ref={imgRef}
        src="/images/rose-fragrance-spray.png"
        alt="Medina Rose Fragrance Spray Bottle with Black-Gloved Hand"
        className="menu-spray-img"
        onLoad={updateCanvasDimensions}
        draggable={false}
      />

      {/* 2. Wide Overlay Canvas (Extends leftward across menu space without clipping) */}
      <canvas ref={canvasRef} className="menu-spray-canvas" />

      {/* 3. Subtle Luxury Hint Badge */}
      {hintVisible && (
        <div className="menu-spray-hint" aria-hidden="true">
          <span className="menu-spray-hint-pulse" />
          <span className="menu-spray-hint-text">Tap to spray</span>
        </div>
      )}
    </div>
  );
}
