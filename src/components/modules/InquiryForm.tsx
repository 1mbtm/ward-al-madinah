'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Send, CheckCircle2 } from 'lucide-react';

interface InquiryFormProps {
  defaultType?: 'General' | 'Catering' | 'Private Event';
  className?: string;
}

export default function InquiryForm({
  defaultType = 'General',
  className = '',
}: InquiryFormProps) {
  const [inquiryType, setInquiryType] = useState(defaultType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate accessible client submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div
        className="glass-card"
        style={{
          textAlign: 'center',
          padding: '3rem 2rem',
        }}
      >
        <CheckCircle2
          size={52}
          color="var(--accent-gold)"
          style={{ margin: '0 auto 1.25rem' }}
        />
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
          Inquiry Received
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
          Thank you for reaching out. Our hospitality concierge will review your message and connect with you shortly.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
          }}
        >
          Send Another Note
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`glass-card ${className}`}
      style={{ padding: '2.5rem' }}
    >
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
        Send Us An Inquiry
      </h3>

      {/* Inquiry Category Selector */}
      <div className="form-group">
        <label className="form-label" htmlFor="inquiry-type">
          Topic of Inquiry
        </label>
        <select
          id="inquiry-type"
          className="form-select"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value as any)}
        >
          <option value="General">General Inquiry & Feedback</option>
          <option value="Catering">Artisanal Coffee Catering</option>
          <option value="Private Event">Private Group & Masterclass</option>
        </select>
      </div>

      {/* Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="client-name">
          Your Name *
        </label>
        <input
          id="client-name"
          type="text"
          required
          className="form-input"
          placeholder="e.g. Eleanor Vance"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Grid: Email & Phone */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        <div className="form-group">
          <label className="form-label" htmlFor="client-email">
            Email Address *
          </label>
          <input
            id="client-email"
            type="email"
            required
            className="form-input"
            placeholder="e.g. eleanor@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="client-phone">
            Phone Number (Optional)
          </label>
          <input
            id="client-phone"
            type="tel"
            className="form-input"
            placeholder="e.g. +1 (555) 019-2834"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      {/* Message */}
      <div className="form-group">
        <label className="form-label" htmlFor="client-message">
          Message *
        </label>
        <textarea
          id="client-message"
          required
          rows={4}
          className="form-textarea"
          placeholder="How can our specialty team assist you?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={isLoading}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        <span>{isLoading ? 'Transmitting...' : 'Send Message'}</span>
        <Send size={15} />
      </Button>
    </form>
  );
}
