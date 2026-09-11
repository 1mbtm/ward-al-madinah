import React from 'react';
import { BranchData } from '@/types';
import { getBranchCurrentStatus } from '@/utils/hours';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

interface BranchCardProps {
  branch: BranchData;
  className?: string;
  isActive?: boolean;
}

export default function BranchCard({
  branch,
  className = '',
  isActive = false,
}: BranchCardProps) {
  const status = getBranchCurrentStatus(branch);

  return (
    <div
      className={`glass-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderColor: isActive ? 'var(--accent-gold)' : undefined,
        boxShadow: isActive ? 'var(--shadow-glow)' : undefined,
      }}
    >
      {/* Branch Image Showcase */}
      {branch.images && branch.images.length > 0 && (
        <div
          style={{
            position: 'relative',
            width: 'calc(100% + 3.5rem)',
            marginLeft: '-1.75rem',
            marginTop: '-1.75rem',
            marginBottom: '1.5rem',
            aspectRatio: '16 / 9',
            backgroundImage: `url(${branch.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        >
          {/* Status Badge */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <Badge variant={status.badgeClass === 'badge-gold' ? 'gold' : 'default'}>
              {status.statusLabel}
            </Badge>
          </div>
          {branch.region && (
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
              <span
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {branch.region}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Header Info */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{branch.name}</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
          }}
        >
          <MapPin size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
          <span>{branch.address}</span>
        </div>
      </div>

      {/* Details List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}
      >
        {branch.hoursSummary && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={15} color="var(--accent-gold)" />
            <span>{branch.hoursSummary}</span>
          </div>
        )}

        {branch.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={15} color="var(--accent-gold)" />
            <a href={`tel:${branch.phone.replace(/\s+/g, '')}`}>{branch.phone}</a>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
        {branch.googleMapsUrl && (
          <Button
            variant="primary"
            size="sm"
            href={branch.googleMapsUrl}
            external
            style={{ flex: 1 }}
          >
            <span>Get Directions</span>
            <ExternalLink size={13} />
          </Button>
        )}
      </div>
    </div>
  );
}
