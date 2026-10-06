import React from 'react';
import { Check, Clock } from 'lucide-react';
import './SelectionPillCard.css';

export default function SelectionPillCard({
  id,
  title,
  description,
  duration,
  price,
  selected = false,
  onToggle
}) {
  return (
    <button
      type="button"
      className={`clean-service-card ${selected ? 'selected' : ''}`}
      onClick={() => onToggle(id)}
      role="checkbox"
      aria-checked={selected}
    >
      <div className="clean-card-body">
        <div className="clean-card-title-row">
          <span className="clean-card-title">{title}</span>
          {price && <span className="clean-card-price">{price}</span>}
        </div>

        {description && <p className="clean-card-desc">{description}</p>}

        {duration && (
          <div className="clean-card-meta">
            <span className="clean-card-time">
              <Clock size={13} />
              {duration}
            </span>
          </div>
        )}
      </div>

      <div className="clean-card-indicator">
        {selected && <Check size={13} strokeWidth={2.8} />}
      </div>
    </button>
  );
}
