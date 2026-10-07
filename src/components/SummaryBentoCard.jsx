import React from 'react';
import './SummaryBentoCard.css';

export default function SummaryBentoCard({
  services = [],
  specialNotes = '',
  date = '',
  slot = '',
  contact = { name: '', phone: '', instagram: '' }
}) {
  const formattedSlot = slot ? `ore ${slot}` : '';

  return (
    <div className="clean-summary-card">
      <div className="clean-summary-header">
        <span className="clean-summary-title">Riepilogo</span>
      </div>

      <div className="clean-summary-list">
        <div className="clean-summary-row">
          <span className="clean-summary-key">Trattamenti</span>
          <div className="clean-summary-services">
            {services.map((s) => (
              <span key={s.id} className="clean-summary-service-item">
                {s.title} {s.price && `(${s.price})`}
              </span>
            ))}
          </div>
        </div>

        <div className="clean-summary-row">
          <span className="clean-summary-key">Data e orario</span>
          <span className="clean-summary-val">
            {date} · {formattedSlot}
          </span>
        </div>

        <div className="clean-summary-row">
          <span className="clean-summary-key">Contatto</span>
          <span className="clean-summary-val">
            {contact.name} ({contact.phone})
          </span>
        </div>

        {contact.instagram && (
          <div className="clean-summary-row">
            <span className="clean-summary-key">Instagram</span>
            <span className="clean-summary-val">@{contact.instagram.replace(/^@/, '')}</span>
          </div>
        )}

        {specialNotes && (
          <div className="clean-summary-row">
            <span className="clean-summary-key">Note</span>
            <span className="clean-summary-val">{specialNotes}</span>
          </div>
        )}
      </div>
    </div>
  );
}
