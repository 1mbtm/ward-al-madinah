'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

interface Particle {
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
  colorType: 'vapor' | 'droplet_white' | 'droplet_rose' | 'core';
}

export default function SprayBottleMist({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
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

    // Clean reset: cancel previous RAF if in-flight so sprays don't clunkily stack
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const particles: Particle[] = [];
    const scale = origin.scale;

    // Nozzle orientation: ~169 degrees (angled outwards to the left, slightly tilted up by 11 deg)
    const baseAngle = (169 * Math.PI) / 180;

    // 1. Soft Expanding Rose Vapor Plumes (aerosol body - realistic billow)
    const vaporCount = prefersReducedMotion ? 4 : 20;
    for (let i = 0; i < vaporCount; i++) {
      const angleSpread = (Math.random() - 0.5) * 0.36; // ~20 degree spray cone
      const angle = baseAngle + angleSpread;
      const speed = (prefersReducedMotion ? 1.6 : 4.8 + Math.random() * 5.8) * scale;
      const maxLife = 52 + Math.random() * 24; // ~0.9 - 1.25s

      particles.push({
        x: origin.nozzleX,
        y: origin.nozzleY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (4 + Math.random() * 5) * scale,
        maxSize: (36 + Math.random() * 48) * scale,
        alpha: 0.38 + Math.random() * 0.16,
        initialAlpha: 0.38 + Math.random() * 0.16,
        life: 0,
        maxLife,
        drag: 0.925,
        colorType: 'vapor',
      });
    }

    // 2. Atomized Fine Droplets (120 ultrafine glistening micro-droplets)
    const dropletCount = prefersReducedMotion ? 12 : 120;
    for (let i = 0; i < dropletCount; i++) {
      const angleSpread = (Math.random() - 0.5) * 0.32;
      const angle = baseAngle + angleSpread;
      const speed = (6.5 + Math.random() * 12.0) * scale;
      const maxLife = 40 + Math.random() * 30;
      const isRoseTint = Math.random() > 0.4;

      particles.push({
        x: origin.nozzleX + (Math.random() - 0.5) * 3 * scale,
        y: origin.nozzleY + (Math.random() - 0.5) * 3 * scale,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (0.6 + Math.random() * 1.2) * scale,
        maxSize: (1.2 + Math.random() * 1.8) * scale,
        alpha: 0.75 + Math.random() * 0.25,
        initialAlpha: 0.75 + Math.random() * 0.25,
        life: 0,
        maxLife,
        drag: 0.912,
        colorType: isRoseTint ? 'droplet_rose' : 'droplet_white',
      });
    }

    // 3. Orifice Exit Aerosol Puff (Micro flash at nozzle tip for first 100ms)
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: origin.nozzleX,
        y: origin.nozzleY,
        vx: (Math.random() - 0.5) * 1.8 * scale,
        vy: (Math.random() - 0.5) * 1.8 * scale,
        size: (3 + Math.random() * 4) * scale,
        maxSize: (14 + Math.random() * 10) * scale,
        alpha: 0.5,
        initialAlpha: 0.5,
        life: 0,
        maxLife: 18 + Math.random() * 8,
        drag: 0.85,
        colorType: 'core',
      });
    }

    particlesRef.current = particles;

    // Render loop
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

          // Kinematics with gentle aerodynamic drag and micro-drift
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= p.drag;
          p.vy *= p.drag;
          p.vy += 0.015 * scale; // Subtle realistic gravity

          const progress = p.life / p.maxLife;
          const fadeProgress = Math.max(0, 1 - progress);
          const currentAlpha = p.initialAlpha * Math.pow(fadeProgress, 1.4);
          const currentSize = p.size + (p.maxSize - p.size) * Math.sin((progress * Math.PI) / 2);

          if (currentAlpha > 0.005) {
            ctx.save();

            if (p.colorType === 'vapor') {
              // Soft billowing rose vapor plume
              const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
              grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.9})`);
              grad.addColorStop(0.35, `rgba(242, 182, 198, ${currentAlpha * 0.6})`);
              grad.addColorStop(0.7, `rgba(228, 148, 170, ${currentAlpha * 0.22})`);
              grad.addColorStop(1, 'rgba(244, 236, 229, 0)');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.colorType === 'droplet_white') {
              // Glistening fine droplet
              ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
              ctx.shadowColor = 'rgba(195, 95, 125, 0.35)';
              ctx.shadowBlur = 2 * scale;
              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.colorType === 'droplet_rose') {
              // Atomized rose essence droplet
              ctx.fillStyle = `rgba(215, 110, 138, ${currentAlpha * 0.85})`;
              ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
              ctx.shadowBlur = 1.8 * scale;
              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Orifice micro flash
              const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
              grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 1.1})`);
              grad.addColorStop(0.4, `rgba(245, 195, 210, ${currentAlpha * 0.7})`);
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
