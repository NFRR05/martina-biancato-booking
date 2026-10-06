import React from 'react';
import './StickyBottomActionBar.css';

export default function StickyBottomActionBar({
  ctaText = 'Continua',
  onCtaClick,
  disabled = false
}) {
  return (
    <div className="clean-action-bar">
      <button
        type="button"
        className="clean-action-btn"
        onClick={onCtaClick}
        disabled={disabled}
      >
        <span>{ctaText}</span>
      </button>
    </div>
  );
}
