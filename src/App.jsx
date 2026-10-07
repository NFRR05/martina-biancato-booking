import React, { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';

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

const HAIR_LENGTH_OPTIONS = [
  { id: 'corti', label: 'Corti', desc: 'Sopra le spalle' },
  { id: 'medi', label: 'Medi', desc: 'Alle clavicole' },
  { id: 'lunghi', label: 'Lunghi', desc: 'Oltre le scapole' }
];

export default function App() {
  const [step, setStep] = useState(0);

  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [hairLength, setHairLength] = useState('medi');
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    instagram: ''
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

  const validateStep4 = () => {
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
    if (step === 3 && (!selectedDate || !selectedSlot)) return;
    if (step === 4 && !validateStep4()) return;

    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishBooking = () => {
    setStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(0);
    setSelectedServiceIds([]);
    setHairLength('medi');
    setSpecialNotes('');
    setSelectedDate('');
    setSelectedSlot('');
    setContactData({ name: '', phone: '', instagram: '' });
    setErrors({});
  };

  const getWhatsAppLink = () => {
    const servicesText = selectedServices.map((s) => s.title).join(', ');
    const slotText = selectedSlot ? `alle ore ${selectedSlot}` : '';
    const text = encodeURIComponent(
      `Ciao Martina! Sono ${contactData.name}, ho inviato la richiesta dal tuo sito per il giorno ${selectedDate} ${slotText}. Trattamenti: ${servicesText}. Aspetto tua conferma!`
    );
    return `https://wa.me/393400000000?text=${text}`;
  };

  return (
    <div className="velvera-page">
      {/* VELVERA HEADER NATIVO */}
      <nav className="velvera-navbar">
        <div className="velvera-navbar-inner">
          <a href="#" onClick={(e) => { e.preventDefault(); setStep(0); }} className="velvera-brand">
            Martina Biancato
          </a>
          <div className="velvera-nav-actions">
            {step === 0 ? (
              <button
                type="button"
                className="velvera-nav-btn"
                onClick={() => setStep(1)}
              >
                Prenota ora
              </button>
            ) : (
              <button
                type="button"
                className="velvera-back-action"
                onClick={handleReset}
              >
                Annulla e torna alla home
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* BODY PRINCIPALE */}
      <main className="velvera-main">
        {/* STEP 0: HERO & FEATURES EDITORIALI */}
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

        {/* STEP 1 A 5: LAYOUT A 2 COLONNE AUTENTICO */}
        {step >= 1 && step <= 5 && (
          <div className="velvera-flow-layout">
            <div className="velvera-flow-main">
              {/* STEP 1: SERVIZI */}
              {step === 1 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 1 di 5 · Catalogo Trattamenti</div>
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

                  <div className="velvera-step-nav">
                    <button type="button" className="velvera-back-action" onClick={() => setStep(0)}>
                      <ArrowLeft size={16} /> Indietro
                    </button>
                    <button
                      type="button"
                      className="velvera-continue-action"
                      disabled={selectedServiceIds.length === 0}
                      onClick={handleNext}
                    >
                      Continua
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: LUNGHEZZA CAPELLI & NOTE */}
              {step === 2 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 2 di 5 · Specifiche</div>
                    <h2 className="velvera-step-heading">Dettagli del capello</h2>
                    <p className="velvera-step-sub">
                      Aiutaci a stimare tempo e dosaggio ideale per il tuo styling.
                    </p>
                  </div>

                  <div className="velvera-form-card">
                    <div>
                      <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--velvera-dark)', marginBottom: 10 }}>
                        Lunghezza attuale dei capelli *
                      </label>
                      <div className="velvera-hair-grid">
                        {HAIR_LENGTH_OPTIONS.map((opt) => (
                          <div
                            key={opt.id}
                            className={`velvera-hair-card ${hairLength === opt.id ? 'selected' : ''}`}
                            onClick={() => setHairLength(opt.id)}
                          >
                            <span className="velvera-hair-title">{opt.label}</span>
                            <span className="velvera-hair-desc">{opt.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <CleanInputField
                      id="special-notes"
                      type="textarea"
                      label="Note speciali o trattamenti recenti"
                      placeholder="Es. capelli trattati chimicamente, cute sensibile, solo spuntata..."
                      value={specialNotes}
                      onChange={setSpecialNotes}
                      optional
                      helperText="Indicazioni utili per Martina nella preparazione della postazione."
                    />
                  </div>

                  <div className="velvera-step-nav">
                    <button type="button" className="velvera-back-action" onClick={handleBack}>
                      <ArrowLeft size={16} /> Indietro
                    </button>
                    <button type="button" className="velvera-continue-action" onClick={handleNext}>
                      Continua
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CALENDARIO E ORARIO */}
              {step === 3 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 3 di 5 · Disponibilità</div>
                    <h2 className="velvera-step-heading">Scegli data e orario</h2>
                    <p className="velvera-step-sub">
                      Seleziona un giorno disponibile a partire da 7 giorni da oggi.
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

                  <div className="velvera-step-nav">
                    <button type="button" className="velvera-back-action" onClick={handleBack}>
                      <ArrowLeft size={16} /> Indietro
                    </button>
                    <button
                      type="button"
                      className="velvera-continue-action"
                      disabled={!selectedDate || !selectedSlot}
                      onClick={handleNext}
                    >
                      Continua
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: RECAPITI CLIENTE */}
              {step === 4 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 4 di 5 · Dati Personali</div>
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
                      id="client-instagram"
                      label="Profilo Instagram"
                      prefix="@"
                      placeholder="giuliarossi"
                      value={contactData.instagram}
                      onChange={(val) => setContactData({ ...contactData, instagram: val })}
                      optional
                      helperText="Facoltativo: utile se ci hai scoperto su Instagram."
                    />
                  </div>

                  <div className="velvera-step-nav">
                    <button type="button" className="velvera-back-action" onClick={handleBack}>
                      <ArrowLeft size={16} /> Indietro
                    </button>
                    <button type="button" className="velvera-continue-action" onClick={handleNext}>
                      Vedi riepilogo
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: RIEPILOGO COMPLETO */}
              {step === 5 && (
                <div>
                  <div className="velvera-step-header">
                    <div className="velvera-step-meta">Passo 5 di 5 · Conferma</div>
                    <h2 className="velvera-step-heading">Rivedi la richiesta</h2>
                    <p className="velvera-step-sub">
                      Controlla tutti i dettagli prima di inviare la richiesta a Martina.
                    </p>
                  </div>

                  <SummaryBentoCard
                    services={selectedServices}
                    hairLength={HAIR_LENGTH_OPTIONS.find((h) => h.id === hairLength)?.label}
                    specialNotes={specialNotes}
                    date={selectedDate}
                    slot={selectedSlot}
                    contact={contactData}
                  />

                  <div className="velvera-step-nav">
                    <button type="button" className="velvera-back-action" onClick={handleBack}>
                      <ArrowLeft size={16} /> Indietro
                    </button>
                    <button type="button" className="velvera-continue-action" onClick={handleFinishBooking}>
                      Invia prenotazione
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SIDEBAR RIEPILOGO STICKY (STILE BOOKING CHECKOUT VELVERA) */}
            <aside className="velvera-flow-sidebar">
              <div className="velvera-sidebar-card">
                <h4 className="velvera-sidebar-title">Riepilogo sessione</h4>

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
                    <div className="velvera-sidebar-row" style={{ paddingTop: 8, borderTop: '1px dashed var(--velvera-border)' }}>
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
                      <span>
                        {selectedServices.reduce((sum, s) => sum + parseInt(s.price.replace('€', '')), 0)}€
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* STEP 6: SCHERMATA FINALE DI SUCCESSO */}
        {step === 6 && (
          <div className="velvera-success-panel">
            <h2 className="velvera-success-title">Richiesta registrata!</h2>
            <p className="velvera-success-desc">
              Grazie <strong>{contactData.name}</strong>. Abbiamo memorizzato la tua richiesta di appuntamento per il giorno{' '}
              <strong>{selectedDate}</strong> alle ore <strong>{selectedSlot}</strong>.
            </p>

            <div className="velvera-success-recap">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--velvera-muted)' }}>Trattamenti:</span>
                <strong>{selectedServices.map((s) => s.title).join(', ')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--velvera-muted)' }}>Recapito:</span>
                <strong>{contactData.name} ({contactData.phone})</strong>
              </div>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="velvera-success-cta"
            >
              <MessageCircle size={18} />
              <span>Conferma con Martina su WhatsApp</span>
            </a>

            <button
              type="button"
              className="velvera-back-action"
              onClick={handleReset}
              style={{ marginTop: 8 }}
            >
              Effettua un'altra richiesta
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
