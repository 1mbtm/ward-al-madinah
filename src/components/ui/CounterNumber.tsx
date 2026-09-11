'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CounterNumberProps {
  target: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CounterNumber({
  target,
  duration = 1400,
  prefix = '',
  suffix = '',
  className = '',
}: CounterNumberProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(updateCounter);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className={`counter-number ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="glass-card"
        style={{
          maxWidth: '600px',
          width: '90%',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 102,
          padding: '2.5rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              fontSize: '1.5rem',
              color: 'var(--text-muted)',
              lineHeight: 1,
              padding: '0.25rem',
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
