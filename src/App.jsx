import React, { useState } from 'react';
import { ArrowLeft, Receipt, X } from 'lucide-react';

import SelectionPillCard from './components/SelectionPillCard';
import CalendarPickerCard from './components/CalendarPickerCard';
import CleanInputField from './components/CleanInputField';
import SummaryBentoCard from './components/SummaryBentoCard';
import './App.css';

const SERVICES_CATALOG = [
  {
    id: 'taglio-piega',
    title: 'Taglio & Piega Styling',
    description: 'Consulenza morfologica, lavaggio curativo con massaggio e asciugatura strutturata.',
    duration: '1h 15m',
    price: '35€'
  },
  {
    id: 'colore-radici',
    title: 'Colore Radici & Riflessante',
    description: 'Applicazione colore delicato senza ammoniaca con tonalizzante luminoso per le lunghezze.',
    duration: '1h 45m',
    price: '45€'
  },
  {
    id: 'balayage-schiariture',
    title: 'Balayage & Schiariture',
    description: 'Schiariture personalizzate a mano libera con gloss ristrutturante e piega.',
    duration: '3h 30m',
    price: '85€'
  },
  {
    id: 'piega-botox',
    title: 'Piega & Trattamento Botox',
    description: 'Trattamento nutriente profondo con acido ialuronico e piega a lunga tenuta.',
    duration: '1h 00m',
    price: '28€'
  }
];

export default function App() {
  // Step 0: Hero, Step 1: Servizi, Step 2: Data/Orario, Step 3: Recapiti + Note, Step 4: Riepilogo, Step 5: Successo
  const [step, setStep] = useState(0);

  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Floating summary modal / drawer state
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const [contactData, setContactData] = useState({
    name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const toggleService = (id) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServices = SERVICES_CATALOG.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const totalEstimatedPrice = selectedServices.reduce(
    (sum, s) => sum + parseInt(s.price.replace('€', '')),
    0
  );

  const validateStep3 = () => {
    const errs = {};
    if (!contactData.name.trim()) {
      errs.name = 'Inserisci il tuo nome e cognome';
    }
    const cleanPhone = contactData.phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = 'Inserisci un numero di cellulare valido';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && selectedServiceIds.length === 0) return;
    if (step === 2 && (!selectedDate || !selectedSlot)) return;
    if (step === 3 && !validateStep3()) return;

    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 1) {
      setStep(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishBooking = () => {
    setStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(0);
    setSelectedServiceIds([]);
    setSpecialNotes('');
    setSelectedDate('');
    setSelectedSlot('');
    setContactData({ name: '', phone: '' });
    setErrors({});
    setIsSummaryOpen(false);
  };

  const getWhatsAppLink = () => {
    const servicesText = selectedServices.map((s) => s.title).join(', ');
    const slotText = selectedSlot ? `alle ore ${selectedSlot}` : '';
    const text = encodeURIComponent(
      `Ciao Martina! Sono ${contactData.name}, ho inviato la richiesta per il giorno ${selectedDate} ${slotText}. Trattamenti: ${servicesText}.${specialNotes ? ` Note: ${specialNotes}.` : ''} Aspetto conferma!`
    );
    return `https://wa.me/393400000000?text=${text}`;
  };

  const isNextDisabled = () => {
    if (step === 1) return selectedServiceIds.length === 0;
    if (step === 2) return !selectedDate || !selectedSlot;
    return false;
  };

  return (
    <div className="velvera-page">
      {/* HEADER NATIVO VELVERA */}
      <nav className="velvera-navbar">
        <div className="velvera-navbar-inner">
          {step === 0 ? (
            <>
              <span className="velvera-brand">Martina Biancato</span>
              <div className="velvera-nav-actions">
                <button
                  type="button"
                  className="velvera-nav-btn"
                  onClick={() => setStep(1)}
                >
                  Prenota
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="velvera-nav-back"
                onClick={handleBack}
                aria-label="Indietro"
              >
                <ArrowLeft size={16} />
                <span>Indietro</span>
              </button>

              <button
                type="button"
                className="velvera-nav-cancel"
                onClick={handleReset}
              >
                Annulla
              </button>
            </>
          )}
        </div>
      </nav>

      {/* BODY PRINCIPALE */}
      <main className="velvera-main">
        {/* STEP 0: HERO & SEZIONI INIZIALI */}
        {step === 0 && (
          <div>
            <section className="velvera-hero">
              <h1 className="velvera-hero-title">
                L'arte dell'hair styling, dedicata a te.
              </h1>
              <p className="velvera-hero-desc">
                Prenota la tua sessione personalizzata per taglio, colore e schiariture.
                Trattamenti individuali con la massima cura e senza attese in salone.
              </p>
              <button
                type="button"
                className="velvera-hero-cta"
                onClick={() => setStep(1)}
              >
                Inizia prenotazione
              </button>
            </section>

            <section className="velvera-features-grid">
              <div className="velvera-feature-card">
                <h3 className="velvera-feature-title">Orari flessibili e serali</h3>
                <p className="velvera-feature-text">
                  Sessioni feriali dalle 19:00 alle 21:00 per chi lavora; disponibilità continuata nel weekend (sabato e domenica).
                </p>
              </div>

              <div className="velvera-feature-card">
                <h3 className="velvera-feature-title">Pianificazione anticipata</h3>
                <p className="velvera-feature-text">
                  Disponibilità a partire da 7 giorni per garantire prodotti dedicati e tempo necessario per ogni passaggio.
                </p>
              </div>

              <div className="velvera-feature-card">
                <h3 className="velvera-feature-title">Conferma diretta WhatsApp</h3>
                <p className="velvera-feature-text">
                  Riceverai la verifica immediata e la conferma del tuo orario direttamente sul tuo numero di telefono.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* STEP 1 A 4: WORKSPACE + FLOATING/DESKTOP RIEPILOGO */}
        {step >= 1 && step <= 4 && (
          <div className="velvera-flow-layout">
            <div className="velvera-flow-main">
              {/* PASSO 1 DI 4: TRATTAMENTI */}
              {step === 1 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 1 di 4</div>
                    <h2 className="velvera-step-heading">Seleziona i servizi</h2>
                    <p className="velvera-step-sub">
                      Scegli uno o più trattamenti per il tuo appuntamento.
                    </p>
                  </div>

                  <div className="velvera-services-grid">
                    {SERVICES_CATALOG.map((service) => (
                      <SelectionPillCard
                        key={service.id}
                        id={service.id}
                        title={service.title}
                        description={service.description}
                        duration={service.duration}
                        price={service.price}
                        selected={selectedServiceIds.includes(service.id)}
                        onToggle={toggleService}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* PASSO 2 DI 4: DATA E ORARIO */}
              {step === 2 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 2 di 4</div>
                    <h2 className="velvera-step-heading">Scegli data e orario</h2>
                    <p className="velvera-step-sub">
                      Seleziona un giorno disponibile a partire da 7 giorni da oggi e scegli l'orario desiderato.
                    </p>
                  </div>

                  <CalendarPickerCard
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    onDateChange={(d) => {
                      setSelectedDate(d);
                      setSelectedSlot('');
                    }}
                    onSlotChange={setSelectedSlot}
                    minDaysNotice={7}
                  />
                </div>
              )}

              {/* PASSO 3 DI 4: RECAPITI E NOTE SPECIALI */}
              {step === 3 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 3 di 4</div>
                    <h2 className="velvera-step-heading">I tuoi recapiti</h2>
                    <p className="velvera-step-sub">
                      I dati necessari per verificare e confermare la tua prenotazione.
                    </p>
                  </div>

                  <div className="velvera-form-card">
                    <CleanInputField
                      id="client-name"
                      label="Nome e cognome *"
                      placeholder="Es. Giulia Rossi"
                      value={contactData.name}
                      onChange={(val) => setContactData({ ...contactData, name: val })}
                      error={errors.name}
                    />

                    <CleanInputField
                      id="client-phone"
                      type="tel"
                      label="Cellulare WhatsApp *"
                      prefix="+39"
                      placeholder="340 1234567"
                      value={contactData.phone}
                      onChange={(val) => setContactData({ ...contactData, phone: val })}
                      error={errors.phone}
                      helperText="Riceverai la conferma di disponibilità su questo numero."
                    />

                    <CleanInputField
                      id="special-notes"
                      type="textarea"
                      label="Note speciali o richieste"
                      placeholder="Es. capelli trattati, cute sensibile, colore fatto da poco..."
                      value={specialNotes}
                      onChange={setSpecialNotes}
                      optional
                    />
                  </div>
                </div>
              )}

              {/* PASSO 4 DI 4: RIEPILOGO */}
              {step === 4 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 4 di 4</div>
                    <h2 className="velvera-step-heading">Rivedi la richiesta</h2>
                    <p className="velvera-step-sub">
                      Controlla tutti i dettagli prima di inviare la richiesta a Martina.
                    </p>
                  </div>

                  <SummaryBentoCard
                    services={selectedServices}
                    specialNotes={specialNotes}
                    date={selectedDate}
                    slot={selectedSlot}
                    contact={contactData}
                  />
                </div>
              )}
            </div>

            {/* SIDEBAR RIEPILOGO FISSA SU DESKTOP */}
            <aside className="velvera-flow-sidebar">
              <div className="velvera-sidebar-card">
                <h4 className="velvera-sidebar-title">Riepilogo</h4>

                <div className="velvera-sidebar-items">
                  {selectedServices.length === 0 ? (
                    <p className="velvera-sidebar-empty">
                      Nessun servizio selezionato al momento.
                    </p>
                  ) : (
                    selectedServices.map((s) => (
                      <div key={s.id} className="velvera-sidebar-row">
                        <span>{s.title}</span>
                        <strong>{s.price}</strong>
                      </div>
                    ))
                  )}

                  {selectedDate && (
                    <div className="velvera-sidebar-row" style={{ paddingTop: 10, borderTop: '1px dashed var(--velvera-border)' }}>
                      <span>Data</span>
                      <strong>{selectedDate}</strong>
                    </div>
                  )}

                  {selectedSlot && (
                    <div className="velvera-sidebar-row">
                      <span>Orario</span>
                      <strong>ore {selectedSlot}</strong>
                    </div>
                  )}

                  {selectedServices.length > 0 && (
                    <div className="velvera-sidebar-row total">
                      <span>Totale stimato</span>
                      <span>{totalEstimatedPrice}€</span>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* STEP 5: SCHERMATA FINALE RESPONSIVE */}
        {step === 5 && (
          <div className="velvera-success-panel">
            <h2 className="velvera-success-title">Richiesta registrata!</h2>
            <p className="velvera-success-desc">
              Grazie <strong>{contactData.name}</strong>. I dettagli della tua richiesta sono pronti per essere confermati.
            </p>

            <div className="velvera-success-recap">
              <div className="velvera-success-row">
                <span className="velvera-success-key">Trattamenti</span>
                <span className="velvera-success-val">{selectedServices.map((s) => s.title).join(', ')}</span>
              </div>
              <div className="velvera-success-row">
                <span className="velvera-success-key">Data e orario</span>
                <span className="velvera-success-val">{selectedDate} · ore {selectedSlot}</span>
              </div>
              <div className="velvera-success-row">
                <span className="velvera-success-key">Contatto</span>
                <span className="velvera-success-val">{contactData.name} ({contactData.phone})</span>
              </div>
              {specialNotes && (
                <div className="velvera-success-row">
                  <span className="velvera-success-key">Note</span>
                  <span className="velvera-success-val">{specialNotes}</span>
                </div>
              )}
              <div className="velvera-success-row total">
                <span className="velvera-success-key">Totale stimato</span>
                <span className="velvera-success-val">{totalEstimatedPrice}€</span>
              </div>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="velvera-success-cta"
            >
              Conferma
            </a>

            <button
              type="button"
              className="velvera-reset-action"
              onClick={handleReset}
            >
              Effettua un'altra richiesta
            </button>
          </div>
        )}
      </main>

      {/* FLOATING BUTTON PER RIEPILOGO RAPIDO (Sempre accessibile con scroll) */}
      {step >= 1 && step <= 4 && (
        <button
          type="button"
          className="velvera-floating-recap-btn"
          onClick={() => setIsSummaryOpen(true)}
          aria-label="Vedi riepilogo"
        >
          <Receipt size={17} />
          <span>Riepilogo{selectedServices.length > 0 ? ` (${totalEstimatedPrice}€)` : ''}</span>
        </button>
      )}

      {/* MODAL / BOTTOM SHEET FLOATING RIEPILOGO */}
      {isSummaryOpen && (
        <div className="velvera-modal-overlay" onClick={() => setIsSummaryOpen(false)}>
          <div className="velvera-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="velvera-modal-header">
              <h3 className="velvera-modal-title">Riepilogo prenotazione</h3>
              <button
                type="button"
                className="velvera-modal-close"
                onClick={() => setIsSummaryOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="velvera-sidebar-items" style={{ padding: '20px 24px' }}>
              {selectedServices.length === 0 ? (
                <p className="velvera-sidebar-empty">
                  Nessun servizio selezionato al momento.
                </p>
              ) : (
                selectedServices.map((s) => (
                  <div key={s.id} className="velvera-sidebar-row">
                    <span>{s.title}</span>
                    <strong>{s.price}</strong>
                  </div>
                ))
              )}

              {selectedDate && (
                <div className="velvera-sidebar-row" style={{ paddingTop: 10, borderTop: '1px dashed var(--velvera-border)' }}>
                  <span>Data</span>
                  <strong>{selectedDate}</strong>
                </div>
              )}

              {selectedSlot && (
                <div className="velvera-sidebar-row">
                  <span>Orario</span>
                  <strong>ore {selectedSlot}</strong>
                </div>
              )}

              {selectedServices.length > 0 && (
                <div className="velvera-sidebar-row total">
                  <span>Totale stimato</span>
                  <span>{totalEstimatedPrice}€</span>
                </div>
              )}
            </div>

            <div className="velvera-modal-footer">
              <button
                type="button"
                className="velvera-modal-done"
                onClick={() => setIsSummaryOpen(false)}
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PULSANTE CONTINUA / CONFERMA FISSO IN BASSO */}
      {step >= 1 && step <= 4 && (
        <div className="velvera-bottom-bar">
          <div className="velvera-bottom-bar-inner">
            <button
              type="button"
              className="velvera-bottom-btn"
              disabled={isNextDisabled()}
              onClick={step === 4 ? handleFinishBooking : handleNext}
            >
              {step === 4 ? 'Conferma' : 'Continua'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
