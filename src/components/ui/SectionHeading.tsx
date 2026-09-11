import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  style = {},
}: SectionHeadingProps) {
  const alignStyle: React.CSSProperties = {
    textAlign: align,
    marginLeft: align === 'center' ? 'auto' : undefined,
    marginRight: align === 'center' ? 'auto' : undefined,
    maxWidth: align === 'center' ? '780px' : undefined,
    ...style,
  };

  return (
    <div className={`section-heading ${className}`} style={alignStyle}>
      {eyebrow && <span className="text-eyebrow">{eyebrow}</span>}
      <h2 style={{ marginBottom: subtitle ? '1rem' : '0' }}>{title}</h2>
      {subtitle && (
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
