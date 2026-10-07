# Design System & Brand Identity Specification: Velvera (Framer Template)
Fonte originale: [velvera.framer.website](https://velvera.framer.website/)

Questo documento contiene l'estrazione completa, fedele e pixel-perfect dei token di design, tipografia, palette colori, spaziature, border-radius e componenti UI estratti dall'analisi diretta del template Framer di **Velvera**.

---

## 1. Palette Colori & Token di Sistema

Velvera utilizza una palette editoriale calda, elegante e ad alto contrasto, basata su toni neutri caldi (Warm Cream / Off-White), nero carbone profondo (`#1f1f1f` / `#000000`), grigi neutri per la gerarchia visiva del testo e un arancione bruciato/ambra (`#ff6a00`) come colore primario di accento/CTA.

### Token CSS e Valori Esatti

| Nome Token / Ruolo | Token ID Framer | Codice Esatto (HEX / RGB) | Uso Principale |
| :--- | :--- | :--- | :--- |
| **Primary Accent / CTA** | `--token-f0e6c297-75e8-4c03-96fb-8dfbb9c067b5` | `#ff6a00` (`rgb(255, 106, 0)`) | Pulsanti primari ("Book an appointment", "Submit"), tag attivi, indicatori accordion, highlight |
| **Accent Orange Light / Amber**| `--token-271bf69e-979d-41ea-9e87-8af6446b1dff` | `#f59309` (`rgb(245, 147, 9)`) | Star rating, hover secondari |
| **Dark Primary / Headings** | `--token-208bc15f-294b-4d03-8a18-2304d64a8705` | `#1f1f1f` (`rgb(31, 31, 31)`) | Titoli principali (H1, H2, H3, H4, H5), pulsante "Contact us" / scuro, bordi scuri |
| **Pure Black** | `--token-592c4a01-0009-428a-96f4-96ceb9a55b01` | `#000000` (`rgb(0, 0, 0)`) | Separatori, indicatori di stato, testi di dettaglio speciali |
| **Body Text / Neutral Dark** | `--token-21f8d76e-41bb-456d-9fb7-baca991fb257` | `#454545` (`rgb(69, 69, 69)`) | Testi secondari, nav link al focus, body ad alto contrasto |
| **Muted Text / Secondary** | `--token-2e44550e-ac4b-4663-b8e1-05c43e595029` | `#757575` (`rgb(117, 117, 117)`) | Descrizioni di supporto, sottotitoli, placeholder form, icone secondarie, link disattivati |
| **Pure White** | `--token-0904e2ee-0dc8-4a84-a8d3-009ffe45cd34` | `#ffffff` (`rgb(255, 255, 255)`) | Sfondo principale pagina (Desktop default), testo su pulsanti scuri o arancioni |
| **Warm Sand / Off-White (Card BG)** | `--token-ae3561b4-6a2e-4cb3-911d-ed4c431d162a` | `#fff9f5` (`rgb(255, 249, 245)`) | Sfondo badge, pillola categoria, box FAQ/Accordion, card evidenziate |
| **Soft Cream (Section BG Alt)**| `--token-c67e192c-5474-4dea-9c99-a8991623e569` | `#fffcfa` (`rgb(255, 252, 250)`) | Sfondo sezioni alternate e blocchi tematici |
| **Neutral Grey Tint (Card Light BG)** | `--token-ff518548-1043-40bd-9795-3e644f11853a` | `#fafafa` (`rgb(250, 250, 250)`) | Sfondo card recensioni, team card container |
| **Subtle Border Border Line** | — | `#00000014` (`rgba(0, 0, 0, 0.08)`) | Bordo sottile di input form, divisori orizzontali |
| **Border Active / Dark Focus** | — | `#757575` / `#1f1f1f` | Focus ring di input e hover cards |

---

## 2. Tipografia & Font Scale

Il sistema tipografico combina:
1. **Headings Font**: **`"Erode", serif`** (font serif raffinato, contemporaneo, con ottica pulita e curve eleganti).
2. **Body & Interface Font**: **`"Inter", "Inter Variable", sans-serif`** (grottesco pulito e ad altissima leggibilità per testi, label, badge e form).

### Presets Tipografici Esatti (Framer Presets)

#### 1. Hero Title / Heading 1 (Preset `1aw8dqg`)
* **Font Family**: `"Erode", serif`
* **Desktop**: `font-size: 64px`, `line-height: 1.15em` (`~73.6px`), `letter-spacing: -0.045em`, `font-weight: 500`
* **Tablet (810px - 1199px)**: `font-size: 52px`, `line-height: 1.15em`, `letter-spacing: -0.045em`, `font-weight: 500`
* **Mobile (< 810px)**: `font-size: 42px`, `line-height: 1.15em`, `letter-spacing: -0.045em`, `font-weight: 500`
* **Colore**: `#1f1f1f` (`--token-208bc15f...`)
* **Allineamento**: `center`

#### 2. Section Title / Heading 2 (Preset `1dx229m`)
* **Font Family**: `"Erode", serif`
* **Desktop**: `font-size: 56px`, `line-height: 1.2em` (`~67.2px`), `letter-spacing: -0.04em`, `font-weight: 500`
* **Tablet**: `font-size: 50px`, `line-height: 1.2em`, `letter-spacing: -0.04em`, `font-weight: 500`
* **Mobile**: `font-size: 40px`, `line-height: 1.2em`, `letter-spacing: -0.04em`, `font-weight: 500`
* **Colore**: `#1f1f1f`
* **Allineamento**: `center` (o `left` in sezioni editoriali asimmetriche)

#### 3. Subheading / Large Intro / Heading 3 (Preset `18hltzn`)
* **Font Family**: `"Erode", serif`
* **Desktop**: `font-size: 44px`, `line-height: 1.35em`, `letter-spacing: -0.04em`, `font-weight: 400`
* **Tablet**: `font-size: 42px`, `line-height: 1.35em`, `letter-spacing: -0.04em`, `font-weight: 400`
* **Mobile**: `font-size: 40px`, `line-height: 1.35em`, `letter-spacing: -0.04em`, `font-weight: 400`
* **Colore**: `#1f1f1f`

#### 4. Card Title / Service Title / Heading 4 & 5 (Preset `11ca0w5` & `lb4y02`)
* **Preset `11ca0w5` (H4 - FAQ & Process Steps)**:
  * **Font Family**: `"Erode", serif`
  * **Desktop**: `font-size: 32px` (o `38px`), `line-height: 1.45em`, `letter-spacing: -0.04em`, `font-weight: 500`
  * **Mobile**: `font-size: 30px`, `line-height: 1.45em`, `letter-spacing: -0.04em`, `font-weight: 500`
  * **Colore**: `#1f1f1f`
* **Preset `lb4y02` (H5 - Service Item)**:
  * **Font Family**: `"Erode", serif`
  * **Desktop**: `font-size: 30px`, `line-height: 1.25em`, `letter-spacing: -0.03em`, `font-weight: 500`
  * **Tablet**: `font-size: 28px`, `line-height: 1.25em`, `letter-spacing: -0.03em`, `font-weight: 500`
  * **Mobile**: `font-size: 26px`, `line-height: 1.25em`, `letter-spacing: -0.03em`, `font-weight: 500`
  * **Colore**: `#1f1f1f`

#### 5. Name / Small Title / Heading 6 (Preset `1lst6ep`)
* **Font Family**: `"Erode", serif`
* **Desktop**: `font-size: 28px`, `line-height: 1.2em`, `letter-spacing: -0.04em`, `font-weight: 500`
* **Mobile**: `font-size: 26px`, `line-height: 1.2em`, `letter-spacing: -0.04em`, `font-weight: 500`
* **Colore**: `#000000`

#### 6. Body Large / Hero Subtitle (Preset `466tpb`)
* **Font Family**: `"Inter", sans-serif`
* **Desktop**: `font-size: 22px`, `line-height: 1.65em`, `letter-spacing: -0.045em`, `font-weight: 500`
* **Tablet / Mobile**: `font-size: 20px`, `line-height: 1.65em`, `letter-spacing: -0.045em`, `font-weight: 500`
* **Colore**: `#757575` (`--token-2e44550e...`)

#### 7. Body Medium / Description Text (Preset `y8ah86` & `zddoii`)
* **Preset `y8ah86`**:
  * **Font Family**: `"Inter", sans-serif`
  * **Taglia**: `font-size: 20px`, `line-height: 1.5em`, `letter-spacing: -0.045em`, `font-weight: 500`
  * **Colore**: `#757575`
* **Preset `zddoii` (Standard Body)**:
  * **Font Family**: `"Inter", sans-serif`
  * **Taglia**: `font-size: 16px`, `line-height: 1.5em`, `letter-spacing: -0.05em`, `font-weight: 400` o `500`
  * **Colore**: `#757575` / `#454545`

#### 8. UI Label, Nav Link, Buttons (Preset `lsjgkl`)
* **Font Family**: `"Inter Variable", "Inter", sans-serif`
* **Taglia**: `font-size: 16px`, `line-height: 1.5em`, `letter-spacing: -0.05em`, `font-weight: 500`
* **Colore**: `#454545` (Nav link default), `#ffffff` (su Dark/Primary Button)

#### 9. Caption, Badges, Micro-Labels (Preset `1lmapdg`)
* **Font Family**: `"Inter", sans-serif`
* **Taglia**: `font-size: 14px`, `line-height: 1.5em`, `letter-spacing: -0.03em`, `font-weight: 500`
* **Colore**: `#757575` (o `#ff6a00` per tag attivi)

---

## 3. Border Radius & Geometrie

Il design system adotta una scala geometrica curata che distingue elementi interattivi (pulsanti a raggio controllato `12px - 14px`), card ampie (`24px`), container intermedi (`16px - 20px`), e capsule/pillole completamente rotonde (`999px / 1000px`).

| Token / Applicazione | Valore Esatto | Esempi nel Design |
| :--- | :--- | :--- |
| **Pill / Fully Rounded** | `border-radius: 999px` (o `1000px`) | Badge di sezione ("Services", "Reviews"), toggle pills, container avatar |
| **Hero & Large Cards** | `border-radius: 32px` - `38px` | Grandi blocchi hero, container immagini principali |
| **Content Cards / Review Cards** | `border-radius: 24px` | Card recensioni (`.framer-ykBP4`), card carosello servizi (`.framer-u0rezj`) |
| **Mid Containers / Image Frames** | `border-radius: 20px` | Frame immagini secondarie, riquadri a 2 colonne |
| **Accordion / FAQ Items** | `border-radius: 16px` | Blocchi singoli FAQ con accordion aperto/chiuso (`.framer-PJXta`) |
| **Form Inputs & Textarea** | `border-radius: 12px` | Input, select e campi data del form di prenotazione |
| **Action Buttons (Small/Regular)** | `border-radius: 12px` | Pulsanti "Book an appointment", "Contact us", "Instagram" |
| **Submit Button (Large/CTA)** | `border-radius: 14px` | Pulsante full-width "Submit your form" |

---

## 4. Spaziature, Padding, Gap & Layout Grids

### Container & Max-Widths
* **Desktop Max Container**: `max-width: 1200px` (con padding laterale `padding: 0 25px`)
* **Tablet Max Container**: `width: 810px` (con padding laterale `padding: 0 20px`)
* **Mobile Max Container**: `width: 390px` (100% viewport con padding laterale `16px` o `20px`)
* **Text Reading Max Width**: `max-width: 620px` (usato per i blocchi di testo introduttivo/titoli centrati)

### Sezioni Vertical Padding
* **Sezione Standard**: `padding: 52px 0` (desktop) con `gap: 48px`
* **Hero Section**: `padding: 132px 0 58px`
* **Sezione Alt Calda (`#fffcfa`)**: `padding: 72px 0` con `gap: 8px`
* **Sezione Contatti / Form**: `padding: 25px 15px` interno card con `gap: 10px`

### Card Internal Padding & Gaps
* **Review Card**:
  * Dimensioni fisse desktop: `width: 369px`
  * Padding: `padding: 24px 20px`
  * Gap tra elementi interni: `gap: 32px` (tra testo recensione e footer autore)
* **FAQ Accordion Item**:
  * Dimensioni desktop: `width: 1120px` (o `100%`)
  * Padding: `padding: 16px 18px 16px 20px`
  * Gap interno domanda/risposta: `gap: 16px`
* **Buttons (Pills / CTAs)**:
  * Default: `padding: 8px 18px`
  * Hover state con animazione padding: `padding: 8px 12px 8px 18px` (o espansione freccia `gap: 3px`)
  * Submit Form CTA: `padding: 16px 24px`, `height: ~54px`
* **Form Inputs**:
  * Campi testo: `padding: 20px 16px` (oppure `16px` uniforme)
  * Gap griglia campi form: `gap: 14px` (verticale) e `gap: 16px` (orizzontale)
* **Carosello Cards**:
  * Gap tra card: `gap: 30px`

---

## 5. Bordi, Ombre (Box Shadows) & Effetti

### Bordi
* **Bordi standard elementi form e divisori**:
  * Spessore: `1px`
  * Stile: `solid`
  * Colore: `#00000014` (`rgba(0, 0, 0, 0.08)`)
* **Focus State**:
  * Spessore: `1px solid #757575`
* **Bordi Card**:
  * La maggior parte delle card (Review, FAQ, Form) **non usa bordi spessi o contrastati**, ma si basa sul cambio di background (`#fafafa` o `#fff9f5`) rispetto al bianco puro `#ffffff`.
  * Quando presente, il bordo sottile usa `1px solid rgba(0, 0, 0, 0.06)`.

### Ombre (Box Shadows)
* Il design è prevalentemente **flat editoriale contemporaneo**.
* Quando viene applicata un'ombra (ad es. per navbar sticky o floating card):
  * `box-shadow: 0 1px 36px rgba(0, 0, 0, 0.15)` (`#00000026`)
* Card e pulsanti non usano drop shadow pesanti: la separazione è affidata al contrasto tra superfici (`#ffffff` vs `#fff9f5` vs `#fafafa`).

---

## 6. Componenti Chiave & Pattern Interattivi

### 1. Navigation Bar (Sticky Header)
* **Background**: `rgba(255, 255, 255, 0.95)` con backdrop-blur o `#ffffff` puro.
* **Logo**: Testo in font `"Erode", serif`, `font-size: 28px`, `font-weight: 500`, `letter-spacing: -0.05em`.
* **Nav Links**: `"Inter"`, `16px`, `500`, colore `#454545`. Hover color: `#1f1f1f`.
* **CTA Bottone Nav**: Stile scuro (`background: #1f1f1f`, `color: #ffffff`, `border-radius: 12px`, `padding: 8px 18px`).

### 2. Badge / Section Pill
* **Background**: `#fff9f5` (`--token-ae3561b4...`)
* **Border Radius**: `999px`
* **Padding**: `6px 14px`
* **Typography**: `"Inter"`, `14px`, `font-weight: 500`, `color: #ff6a00` (o `#757575`)

### 3. Primary CTA Button ("Book an appointment")
* **Background**: `#ff6a00`
* **Color**: `#ffffff`
* **Border Radius**: `12px`
* **Padding**: `8px 18px`
* **Typography**: `"Inter"`, `16px`, `font-weight: 500`
* **Hover**: Micro-shift o leggero scurimento `rgba(255, 106, 0, 0.92)`.

### 4. Secondary / Dark Button ("Contact us", "Instagram")
* **Background**: `#1f1f1f`
* **Color**: `#ffffff`
* **Border Radius**: `12px`
* **Padding**: `8px 18px`

### 5. Review Card
* **Background**: `#fafafa`
* **Border Radius**: `24px`
* **Padding**: `24px 20px`
* **Citazione / Testo**: `"Inter"`, `20px`, `font-weight: 500`, `color: #757575`, `line-height: 1.5em`
* **Autore / Ruolo**: Titolo in `"Erode"` o `"Inter"`, `16px`, `#1f1f1f`

### 6. Accordion / FAQ Item
* **Background**: `#fff9f5`
* **Border Radius**: `16px`
* **Padding**: `16px 20px`
* **Domanda (Titolo)**: `"Erode"`, `30px - 32px`, `font-weight: 500`, `#1f1f1f`
* **Icona Accordion**: Cerchio con fondo `#ff6a00` o `#1f1f1f`, con icona toggle "+" / "-"

### 7. Form di Prenotazione
* **Background Wrapper**: Card bianca o crema con raggio `24px`.
* **Inputs**:
  * Background: Trasparente / `#ffffff`
  * Bordo: `1px solid #00000014`
  * Border-radius: `12px`
  * Padding: `20px 16px`
  * Font: `"Inter"`, `16px`, `color: #1f1f1f`, placeholder `#757575`
* **Submit Button**:
  * `width: 100%`, `background: #ff6a00`, `color: #ffffff`, `border-radius: 14px`, `height: 52px`

---

## 7. Variabili CSS pronte per l'implementazione (`velvera-tokens.css`)

```css
:root {
  /* --- PALETTE COLORI VELVERA --- */
  --velvera-accent: #ff6a00;               /* Accent CTA Orange */
  --velvera-accent-hover: #e55f00;
  --velvera-accent-light: #fff9f5;         /* Warm Sand Pill/Card BG */
  --velvera-accent-amber: #f59309;         /* Ratings & Accents */

  --velvera-dark-primary: #1f1f1f;         /* Titoli principali e bottoni scuri */
  --velvera-pure-black: #000000;
  
  --velvera-text-body: #454545;            /* Body testuale ad alto contrasto */
  --velvera-text-muted: #757575;           /* Descrizioni, sottotitoli e placeholder */
  
  --velvera-bg-primary: #ffffff;          /* Sfondo desktop principale */
  --velvera-bg-soft: #fffcfa;             /* Sfondo alternato sezioni */
  --velvera-bg-card-light: #fafafa;       /* Sfondo card recensioni */
  --velvera-bg-card-warm: #fff9f5;        /* Sfondo card FAQ/pillole */

  --velvera-border-subtle: #00000014;     /* rgba(0, 0, 0, 0.08) */
  --velvera-border-focus: #757575;

  /* --- TIPOGRAFIA --- */
  --font-serif: "Erode", "Playfair Display", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* H1 Hero */
  --h1-size-desktop: 64px;
  --h1-size-tablet: 52px;
  --h1-size-mobile: 42px;
  --h1-line-height: 1.15em;
  --h1-letter-spacing: -0.045em;

  /* H2 Section */
  --h2-size-desktop: 56px;
  --h2-size-tablet: 50px;
  --h2-size-mobile: 40px;
  --h2-line-height: 1.2em;
  --h2-letter-spacing: -0.04em;

  /* H3 Subheading */
  --h3-size-desktop: 44px;
  --h3-size-mobile: 40px;
  --h3-line-height: 1.35em;
  --h3-letter-spacing: -0.04em;

  /* H4 / H5 Cards */
  --h4-size: 32px;
  --h4-line-height: 1.45em;
  --h5-size: 30px;
  --h5-line-height: 1.25em;

  /* Body & Subtitles */
  --body-large-size: 22px;
  --body-large-lh: 1.65em;
  --body-medium-size: 20px;
  --body-medium-lh: 1.5em;
  --body-regular-size: 16px;
  --body-regular-lh: 1.5em;
  --caption-size: 14px;
  --caption-lh: 1.5em;

  /* --- BORDER RADIUS --- */
  --radius-pill: 999px;
  --radius-hero: 32px;
  --radius-card-large: 24px;
  --radius-container: 20px;
  --radius-card-mid: 16px;
  --radius-button: 12px;
  --radius-button-large: 14px;
  --radius-input: 12px;

  /* --- CONTAINER & SPACING --- */
  --container-max-width: 1200px;
  --container-padding-desktop: 0 25px;
  --container-padding-mobile: 0 16px;

  --section-padding-v: 52px;
  --section-padding-hero: 132px 0 58px;

  /* --- OMBRE --- */
  --shadow-elevation: 0 1px 36px rgba(0, 0, 0, 0.15);
}
```
