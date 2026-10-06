import React, { useState } from 'react';

import SegmentedProgressBar from './components/SegmentedProgressBar';
import SelectionPillCard from './components/SelectionPillCard';
import CalendarPickerCard from './components/CalendarPickerCard';
import CleanInputField from './components/CleanInputField';
import StickyBottomActionBar from './components/StickyBottomActionBar';
import SummaryBentoCard from './components/SummaryBentoCard';
import './App.css';

// Clean, realistic services list
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
    title: 'Piega & Trattamento Rimpolpante',
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
  // Navigation State: 0 to 6
  const [step, setStep] = useState(0);

  // Form Data State
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
      `Ciao Martina! Sono ${contactData.name}, ho inviato la richiesta dal tuo sito per il giorno ${selectedDate} ${slotText}. Servizi: ${servicesText}. Aspetto tua conferma!`
    );
    return `https://wa.me/393400000000?text=${text}`;
  };

  return (
    <div className="app-wrapper">
      <div className="bg-ribbon-decor" aria-hidden="true">
        <img src="/ribbon-transparent.png" alt="" className="bg-ribbon-img" />
      </div>

      {/* STEP 0: CLEAN & SOFT HERO */}
      {step === 0 && (
        <div>
          <section className="clean-hero">
            <h1 className="clean-hero-title">
              L'hair styling su misura.
            </h1>

            <p className="clean-hero-desc">
              Pianifica il tuo appuntamento per taglio, colore o schiariture con Martina.
              Sessioni riservate e curate nel dettaglio, senza fretta né attese.
            </p>
          </section>

          {/* Simple Clean Policies */}
          <section className="clean-policies-grid">
            <div className="clean-policy-item">
              <div className="clean-policy-title">Orari serali e weekend</div>
              <div className="clean-policy-desc">
                Disponibile dal lunedì al venerdì dalle 19:00 alle 21:00, e tutto il giorno il sabato e la domenica.
              </div>
            </div>

            <div className="clean-policy-item">
              <div className="clean-policy-title">Prenota con almeno 1 settimana di anticipo</div>
              <div className="clean-policy-desc">
                Il calendario ti mostra le date disponibili a partire da 7 giorni da oggi, per organizzare al meglio il tuo trattamento.
              </div>
            </div>

            <div className="clean-policy-item">
              <div className="clean-policy-title">Ricevi conferma su WhatsApp</div>
              <div className="clean-policy-desc">
                Dopo aver inviato la richiesta, riceverai la conferma definitiva del tuo orario direttamente via messaggio entro 24 ore.
              </div>
            </div>
          </section>

          <StickyBottomActionBar
            ctaText="Inizia prenotazione"
            onCtaClick={() => setStep(1)}
          />
        </div>
      )}

      {/* STEP 1: SERVIZI */}
      {step === 1 && (
        <div>
          <SegmentedProgressBar
            currentStep={1}
            totalSteps={5}
            title="Seleziona i trattamenti"
            subtitle="Scegli uno o più servizi per il tuo appuntamento."
            onBack={() => setStep(0)}
          />

          <div className="step-viewport">
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

          <StickyBottomActionBar
            ctaText="Continua"
            disabled={selectedServices.length === 0}
            onCtaClick={handleNext}
          />
        </div>
      )}

      {/* STEP 2: LUNGHEZZA & NOTE */}
      {step === 2 && (
        <div>
          <SegmentedProgressBar
            currentStep={2}
            totalSteps={5}
            title="Dettagli del capello"
            subtitle="Indica la lunghezza per stimare tempi e prodotti necessari per il tuo trattamento."
            onBack={handleBack}
          />

          <div className="step-viewport">
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-main)' }}>
                Lunghezza attuale dei capelli *
              </span>
              <div className="clean-hair-grid">
                {HAIR_LENGTH_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`clean-hair-chip ${hairLength === opt.id ? 'selected' : ''}`}
                    onClick={() => setHairLength(opt.id)}
                  >
                    <span className="clean-hair-label">{opt.label}</span>
                    <span className="clean-hair-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <CleanInputField
              id="special-notes"
              type="textarea"
              label="Note speciali o trattamenti recenti"
              placeholder="Es. ho fatto una decolorazione recente, ho la cute sensibile, vorrei solo una spuntata..."
              value={specialNotes}
              onChange={setSpecialNotes}
              optional
              helperText="Facoltativo: indicazioni utili per preparare la postazione."
            />
          </div>

          <StickyBottomActionBar
            ctaText="Continua"
            onCtaClick={handleNext}
          />
        </div>
      )}

      {/* STEP 3: DATA & SLOT */}
      {step === 3 && (
        <div>
          <SegmentedProgressBar
            currentStep={3}
            totalSteps={5}
            title="Scegli data e orario"
            subtitle="Feriali dalle 19:00 alle 21:00; sabato e domenica orario esteso."
            onBack={handleBack}
          />

          <div className="step-viewport">
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

          <StickyBottomActionBar
            ctaText="Continua"
            disabled={!selectedDate || !selectedSlot}
            onCtaClick={handleNext}
          />
        </div>
      )}

      {/* STEP 4: CONTATTI */}
      {step === 4 && (
        <div>
          <SegmentedProgressBar
            currentStep={4}
            totalSteps={5}
            title="I tuoi recapiti"
            subtitle="I dati necessari per verificare e confermare la tua prenotazione."
            onBack={handleBack}
          />

          <div className="step-viewport">
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
              helperText="Utile se sei arrivata dal profilo di Martina."
            />
          </div>

          <StickyBottomActionBar
            ctaText="Vedi riepilogo"
            onCtaClick={handleNext}
          />
        </div>
      )}

      {/* STEP 5: REVIEW */}
      {step === 5 && (
        <div>
          <SegmentedProgressBar
            currentStep={5}
            totalSteps={5}
            title="Rivedi la richiesta"
            subtitle="Controlla tutti i dati prima di inviare la richiesta a Martina."
            onBack={handleBack}
          />

          <div className="step-viewport">
            <SummaryBentoCard
              services={selectedServices}
              hairLength={HAIR_LENGTH_OPTIONS.find((h) => h.id === hairLength)?.label}
              specialNotes={specialNotes}
              date={selectedDate}
              slot={selectedSlot}
              contact={contactData}
            />
          </div>

          <StickyBottomActionBar
            ctaText="Invia prenotazione"
            onCtaClick={handleFinishBooking}
          />
        </div>
      )}

      {/* STEP 6: CLEAN SUCCESS */}
      {step === 6 && (
        <div className="clean-success-view">
          <h2 className="clean-success-headline">Richiesta inviata!</h2>
          <p className="clean-success-desc">
            Grazie <strong>{contactData.name}</strong>. I dettagli della tua richiesta per il{' '}
            <strong>{selectedDate}</strong> alle ore <strong>{selectedSlot}</strong> sono pronti.
          </p>

          <div className="clean-success-recap-box">
            <div className="clean-recap-row">
              <span className="clean-recap-key">Trattamenti</span>
              <span className="clean-recap-val">{selectedServices.map((s) => s.title).join(', ')}</span>
            </div>
            <div className="clean-recap-row">
              <span className="clean-recap-key">Data e orario</span>
              <span className="clean-recap-val">{selectedDate} alle ore {selectedSlot}</span>
            </div>
            <div className="clean-recap-row">
              <span className="clean-recap-key">Contatto</span>
              <span className="clean-recap-val">{contactData.name} ({contactData.phone})</span>
            </div>
          </div>

          <div className="clean-whatsapp-action-box">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="clean-whatsapp-btn"
            >
              <span>Avvisa Martina su WhatsApp</span>
            </a>
            <button type="button" onClick={handleReset} className="clean-reset-btn">
              Effettua un'altra richiesta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
