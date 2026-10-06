import React from 'react';
import { Info } from 'lucide-react';
import './SummaryBentoCard.css';

export default function SummaryBentoCard({
  services = [],
  hairLength = '',
  specialNotes = '',
  date = '',
  slot = '',
  contact = { name: '', phone: '', instagram: '' }
}) {
  const formattedSlot =
    slot === 'morning'
      ? '09:30'
      : slot === 'afternoon'
      ? '14:30'
      : slot ? `ore ${slot}` : '';

  return (
    <div className="clean-summary-wrapper">
      <div className="clean-summary-card">
        <div className="clean-summary-header">
          <span className="clean-summary-title">Riepilogo richiesta</span>
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

          {hairLength && (
            <div className="clean-summary-row">
              <span className="clean-summary-key">Lunghezza capelli</span>
              <span className="clean-summary-val">{hairLength}</span>
            </div>
          )}

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

      <div className="clean-summary-note">
        <Info size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--accent-blue)' }} />
        <div>
          Disponibilità limitata a 2 posti al giorno con almeno 1 settimana di anticipo. Riceverai la conferma definitiva direttamente su WhatsApp entro 24 ore.
        </div>
      </div>
    </div>
  );
}
