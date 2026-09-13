'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  swayFrequency: number;
  swayAmplitude: number;
  swayOffset: number;
  opacity: number;
  colorType: number;
  depth: number; // 0: background, 1: midground, 2: foreground
}

export const RosePetalsRain: React.FC<{
  className?: string;
  petalCount?: number;
}> = ({ className = '', petalCount = 28 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Rich velvety Medina Rose Petal Palettes
    const petalGradients = [
      // Signature Medina Velvet Crimson
      { base: '#701524', mid: '#A3243C', tip: '#C73E58', rim: 'rgba(255, 180, 195, 0.45)' },
      // Deep Royal Burgundy
      { base: '#520E1A', mid: '#851B2E', tip: '#A82840', rim: 'rgba(245, 160, 175, 0.35)' },
      // Luminous Rose Wine
      { base: '#7E1C2E', mid: '#B23049', tip: '#D44A65', rim: 'rgba(255, 205, 215, 0.5)' },
      // Soft Dusty Petal
      { base: '#641320', mid: '#962438', tip: '#BD3B52', rim: 'rgba(255, 170, 185, 0.4)' },
    ];

    // Initialize Petals with varied depth, angles and organic physical properties
    const petals: Petal[] = [];
    // P2 perf: 50% on mobile (was 60%) — still rich at 390px; imperceptible difference
    const count = window.innerWidth < 768 ? Math.floor(petalCount * 0.5) : petalCount;

    const createPetal = (startY?: number): Petal => {
      const depth = Math.random() < 0.25 ? 0 : Math.random() < 0.85 ? 1 : 2;
      const baseSize = depth === 0 ? 11 + Math.random() * 5 : depth === 1 ? 16 + Math.random() * 8 : 24 + Math.random() * 8;
      return {
        x: Math.random() * (width || window.innerWidth),
        y: startY !== undefined ? startY : Math.random() * (height || window.innerHeight),
        size: baseSize,
        speedY: (depth === 0 ? 0.7 : depth === 1 ? 1.1 : 1.5) + Math.random() * 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.015 + Math.random() * 0.02,
        swayFrequency: 0.008 + Math.random() * 0.012,
        swayAmplitude: 0.8 + Math.random() * 1.2,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: depth === 0 ? 0.65 : depth === 1 ? 0.88 : 0.95,
        colorType: Math.floor(Math.random() * petalGradients.length),
        depth,
      };
    };

    for (let i = 0; i < count; i++) {
      petals.push(createPetal());
    }

    // Interactive mouse wind breeze listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // P2 perf: threshold raised 0.05 → 0.30. RAF loop pauses when hero is 70%+ off-screen.
    // Previously ran at 60fps continuously through Menu/Mission/Branches/Contact sections.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        // Immediately clear canvas when hidden to free GPU memory
        if (!entry.isIntersecting && ctx) {
          ctx.clearRect(0, 0, width, height);
        }
      },
      { threshold: 0.30 }
    );
    observer.observe(canvas);

    let tick = 0;

    // Draw single organic rose petal with Bézier curvature, realistic fold & gradient depth
    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);

      // 3D tumble flip compression
      const scaleY = Math.cos(petal.flip);
      const scaleX = 1 + 0.15 * Math.sin(petal.flip);
      ctx.scale(scaleX, scaleY);

      const s = petal.size;
      const gradConfig = petalGradients[petal.colorType];

      // Petal Radial/Linear gradient
      const grad = ctx.createRadialGradient(0, -s * 0.1, s * 0.1, 0, 0, s * 1.1);
      grad.addColorStop(0, gradConfig.tip);
      grad.addColorStop(0.45, gradConfig.mid);
      grad.addColorStop(1, gradConfig.base);

      ctx.beginPath();
      // Natural teardrop/cup rose petal contour
      ctx.moveTo(0, s * 0.85); // Base stem point
      // Left curve
      ctx.bezierCurveTo(-s * 0.75, s * 0.35, -s * 0.85, -s * 0.45, -s * 0.25, -s * 0.85);
      // Top gentle petal crown
      ctx.bezierCurveTo(-s * 0.05, -s * 0.98, s * 0.05, -s * 0.98, s * 0.25, -s * 0.85);
      // Right curve
      ctx.bezierCurveTo(s * 0.85, -s * 0.45, s * 0.75, s * 0.35, 0, s * 0.85);
      ctx.closePath();

      // Soft petal ambient shadow for 3D depth
      if (petal.depth >= 1) {
        ctx.shadowColor = 'rgba(40, 8, 14, 0.35)';
        ctx.shadowBlur = petal.depth === 2 ? 10 : 5;
        ctx.shadowOffsetY = 4;
      }

      ctx.fillStyle = grad;
      ctx.globalAlpha = petal.opacity;
      ctx.fill();

      // Delicate specular highlight rim for silky velvety finish
      ctx.shadowColor = 'transparent';
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = gradConfig.rim;
      ctx.stroke();

      // Subtle central petal vein line
      ctx.beginPath();
      ctx.moveTo(0, s * 0.8);
      ctx.quadraticCurveTo(s * 0.04, 0, 0, -s * 0.55);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      ctx.restore();
    };

    // Main 120fps Animation Loop
    const animate = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);
        tick++;

        const mouse = mouseRef.current;

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];

          // Natural air resistance and horizontal sway
          const sway = Math.sin(tick * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
          p.x += p.speedX + sway;
          p.y += p.speedY;

          // 3D rotation and tumble flip progression
          p.rotation += p.rotationSpeed;
          p.flip += p.flipSpeed;

          // Interactive breeze deflection from mouse movement
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;
            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 2.2;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force * 0.5;
              p.rotationSpeed += (dx / dist) * 0.005;
            }
          }

          // Wrap around bottom edge to top seamlessly
          if (p.y > height + 40) {
            petals[i] = createPetal(-30);
          }
          // Wrap horizontal edges
          if (p.x < -40) p.x = width + 30;
          if (p.x > width + 40) p.x = -30;

          drawPetal(p);
        }
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [petalCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`rose-petals-canvas absolute inset-0 pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      aria-hidden="true"
    />
  );
};
