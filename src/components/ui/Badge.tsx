import React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'gold' | 'score';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  variant = 'default',
  children,
  className = '',
  style,
}: BadgeProps) {
  const variantClass =
    variant === 'gold'
      ? 'badge-gold'
      : variant === 'score'
      ? 'badge-score'
      : '';

  return (
    <span className={`badge ${variantClass} ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}

export default Badge;
