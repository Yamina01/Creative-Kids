import { useEffect, useState } from "react";
import "./App.css";

/* =====================================================================
   CREATIVE KIDS NURSERY - website mockup (v2: richer crayon theme)
   ---------------------------------------------------------------------
   - Single-file React app. Only dependency: React.
   - Kept deliberately simple in structure: no downloadable forms/
     documents section, just a short admissions process + contact form.
   - The star rating is drawn one star at a time (each star is its own
     18x18 box with a clipped fill layer), so a rating like 4.4 shows a
     clean partial star instead of two overlapping rows of stars.
   - REAL facts used: name, address, phone, Google rating (4.4 / 14
     reviews), opening pattern (opens 6:30 am, closes 6 pm).
   - Google doesn't show review text here, so no quotes are invented.
     Testimonial cards are clearly marked SAMPLE — swap them for real
     parent quotes once you have them.
   - SAMPLE CONTENT, confirm with the client before launch: age groups,
     daily schedule, exact opening days, safety points, admission
     steps, gallery photos, testimonials.
   - To use real photos: add a `src` to any item in TILES below.
   - To make the enquiry form work: send `form` to Formspree / EmailJS /
     your backend inside onSubmit (see Contact component).
   ===================================================================== */

const CONTACT = {
  phoneDisplay: "+974 3317 5106",
  phoneTel: "+97433175106",
  whatsapp: "97433175106",
  address: "Al Qatada St, Aziziyah, Doha, Qatar",
  // Plus code from the Google Maps listing: 7C4V+4W Doha, Qatar
  mapEmbed: "https://www.google.com/maps?q=7C4V%2B4W%20Doha%2C%20Qatar&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=7C4V%2B4W%20Doha%2C%20Qatar",
};

const C = {
  brand: "Creative Kids Nursery",
  brandSub: "Nursery school, Aziziyah",
  brandInitial: "C",
  enquire: "Enquire now",
  nav: { home: "Home", about: "About", programs: "Programs", gallery: "Gallery", admissions: "Admissions", contact: "Contact" },
  hero: {
    tagline: "Where imagination gets messy and happy",
    titleLead: "A colorful place for your child to ",
    titleHi: "create, play and grow",
    text: "Creative Kids Nursery is a bright, friendly nursery school in Aziziyah, Doha, built around art, play and plenty of hands-on fun.",
    primary: "Enquire now",
    secondary: "Book a visit",
    rating: "4.4 on Google",
    ratingSub: "14 parent reviews",
  },
  trust: [
    { icon: "palette", title: "Creative at heart", text: "Art, colors and imaginative play run through everything we do." },
    { icon: "shield", title: "Safe environment", text: "A secure, closely supervised space for every child." },
    { icon: "heart", title: "Caring teachers", text: "Small groups so every child gets real attention." },
    { icon: "sparkle", title: "Clean and tidy", text: "Rooms and play areas cleaned and checked every day." },
  ],
  about: {
    title: "How we care for and teach your child",
    text1:
      "We believe young children learn best with their hands, their imagination and a bit of mess. Every day at Creative Kids is planned so children feel safe first, then free to paint, build, pretend and ask questions.",
    text2:
      "We keep groups friendly-sized and routines predictable, and we share what your child got up to each day so home and nursery work as one team.",
    safetyTitle: "Safety you can count on",
    safety: [
      "Supervised drop-off and pick-up at all times",
      "Classrooms cleaned and sanitised every day",
      "Child-safe furniture, flooring and play equipment",
      "Health and emergency details on file for every child",
      "Regular updates for parents",
    ],
    areasTitle: "What children learn",
    areas: [
      { icon: "palette", title: "Art and creativity", text: "Painting, crafts and imaginative play give every child a way to express themselves." },
      { icon: "sun", title: "Play and movement", text: "Indoor and outdoor play builds balance, coordination and confidence." },
      { icon: "book", title: "Language and stories", text: "Songs, stories and conversation build early speaking and listening." },
      { icon: "compass", title: "Discovery", text: "Simple science and sensory play feed natural curiosity." },
    ],
  },
  programs: {
    title: "Programs for every age",
    text: "Choose an age group to see what the days look like.",
    focusTitle: "Focus areas",
    groups: [
      {
        name: "Little Artists",
        age: "1 to 2 years",
        text: "Gentle routines and sensory play help our youngest children settle in and start to explore color and texture.",
        focus: ["Sensory play", "First words and songs", "Comfort and routine"],
      },
      {
        name: "Curious Creators",
        age: "2 to 3 years",
        text: "Toddlers get hands-on with paint, shapes and stories while building independence in small steps.",
        focus: ["Early language", "Shapes and colors", "Self-help skills"],
      },
      {
        name: "Young Explorers",
        age: "3 to 4 years",
        text: "Craft projects, pretend play and circle time grow confidence, friendships and communication.",
        focus: ["Pretend play", "Pre-writing skills", "Making friends"],
      },
      {
        name: "School Ready",
        age: "4 to 5 years",
        text: "Letters, numbers and teamwork prepare children for their first day at primary school.",
        focus: ["Letters and numbers", "Listening and focus", "Teamwork"],
      },
    ],
    dayTitle: "A day at Creative Kids",
    dayNote: "Sample schedule. Final times are confirmed at enrolment.",
    day: [
      { time: "6:30 am", label: "Welcome and free play" },
      { time: "8:30 am", label: "Breakfast and hand washing" },
      { time: "9:30 am", label: "Circle time and art" },
      { time: "11:00 am", label: "Outdoor play" },
      { time: "12:00 pm", label: "Lunch and rest" },
      { time: "2:00 pm", label: "Craft time and pick-up" },
    ],
  },
  gallery: {
    title: "Life at Creative Kids",
    text: "A look at our classrooms and play areas.",
    filters: { all: "All", rooms: "Classrooms", outdoor: "Outdoors", activities: "Activities" },
    tiles: ["Bright classroom", "Art corner", "Sensory table", "Garden play area", "Climbing and slides", "Craft time", "Music circle", "Snack table"],
  },
  reviews: {
    title: "What parents say",
    text: "Creative Kids Nursery holds a 4.4 rating on Google.",
    ratingLabel: "4.4 out of 5",
    count: "14 Google reviews",
    note: "Once you share real parent quotes, we'll feature them here in place of the samples below.",
    sampleLabel: "Sample quote — replace with a real parent review",
    samples: [
      "Add a short quote from a happy parent here — even a line or two makes a big difference.",
      "A second parent quote can go here, ideally naming what they loved most.",
    ],
    link: "See Creative Kids Nursery on Google",
  },
  admissions: {
    title: "Joining Creative Kids Nursery",
    text: "Three simple steps from first hello to first day.",
    steps: [
      { title: "Send an enquiry", text: "Fill in the short form or message us on WhatsApp." },
      { title: "Visit the nursery", text: "Meet the teachers, see the classrooms and ask anything." },
      { title: "Enrol your child", text: "We'll guide you through registration and welcome days." },
    ],
  },
  contact: {
    title: "Visit us or send an enquiry",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    hours: "Daily, 6:30 am to 6:00 pm (confirm exact days with the nursery)",
    phoneLabel: "Phone",
    call: "Call now",
    whatsapp: "WhatsApp",
    directions: "Get directions",
    mapTitle: "Map showing Creative Kids Nursery in Aziziyah, Doha",
    form: {
      title: "Enquiry form",
      name: "Parent's name",
      phone: "Phone or WhatsApp",
      age: "Child's age",
      visit: "Preferred visit day",
      message: "Anything you'd like to ask?",
      submit: "Send enquiry",
      errName: "Please enter your name.",
      errPhone: "Please enter a valid phone number.",
      ages: ["1 to 2 years", "2 to 3 years", "3 to 4 years", "4 to 5 years"],
      days: ["Any day", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      thanks: (n) => `Thank you, ${n}`,
      thanksText: "We've received your enquiry and will reply as soon as we can.",
      waSend: "Send these details on WhatsApp",
      again: "Send another enquiry",
      waTemplate: (n, a, d, m) => `Hello Creative Kids Nursery, I'm ${n}. My child is ${a}. Preferred visit: ${d}.${m ? " " + m : ""}`,
    },
  },
  footer: { rights: "© 2026 Creative Kids Nursery. All rights reserved." },
  bar: { call: "Call", whatsapp: "WhatsApp", enquire: "Enquire" },
  skip: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  navLabel: "Main navigation",
};

const TILES = [
  { cat: "rooms", variant: "coral", size: "wide", src: "" },
  { cat: "rooms", variant: "sun", size: "", src: "" },
  { cat: "rooms", variant: "teal", size: "tall", src: "" },
  { cat: "outdoor", variant: "violet", size: "", src: "" },
  { cat: "outdoor", variant: "sun", size: "wide", src: "" },
  { cat: "activities", variant: "coral", size: "", src: "" },
  { cat: "activities", variant: "teal", size: "tall", src: "" },
  { cat: "activities", variant: "violet", size: "", src: "" },
];

const PROGRAM_COLORS = ["#FFC4B3", "#FFE48A", "#A8E6D9", "#C9B8F0"];

const ICONS = {
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  palette: (
    <>
      <path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2s-1-1.5-1-2.5S13.5 16 15 16h2a3 3 0 0 0 3-3c0-6-4-11-8-11z" />
      <circle cx="7.5" cy="10.5" r="1.2" />
      <circle cx="11" cy="7.5" r="1.2" />
      <circle cx="15.5" cy="9" r="1.2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  sparkle: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15v4M17 17h4" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  check: <path d="M20 6L9 17l-5-5" />,
  whatsapp: (
    <>
      <path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.35L3 21z" />
      <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.3-1.7-1-.9.7a3.5 3.5 0 0 1-1.6-1.6l.7-.9-1-1.7L9 9.5z" />
    </>
  ),
  send: (
    <>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </>
  ),
};

function Icon({ name, size = 22, className = "" }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* Hand-drawn wavy underline, used as a scribble accent under key text */
function Scribble({ className = "" }) {
  return (
    <svg className={`scribble ${className}`} viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M4 16 C 40 4, 70 22, 110 10 C 150 -2, 180 20, 216 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* A single loose squiggle mark, used as confetti scattered around the hero */
function Squiggle({ className = "" }) {
  return (
    <svg className={`squiggle ${className}`} viewBox="0 0 40 20" aria-hidden="true">
      <path d="M2 10 C10 2, 18 18, 26 10 S38 2, 38 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* Each star is its own box: a pale base star behind, a colored star on
   top clipped to the fraction of that star that should be filled. This
   avoids the smudged look you get from overlapping two full rows of
   stars and clipping the whole row at once. */
function Stars({ value = 4.4, label }) {
  const positions = [0, 1, 2, 3, 4];
  return (
    <span className="stars" role="img" aria-label={label}>
      {positions.map((i) => {
        const frac = Math.max(0, Math.min(1, value - i)) * 100;
        return (
          <span className="star" key={i} style={{ "--fill": `${frac}%` }}>
            <Icon name="star" size={18} className="star__base icon--fill" />
            <Icon name="star" size={18} className="star__fill icon--fill" />
          </span>
        );
      })}
    </span>
  );
}

/* ---------- Header ---------- */

function Header({ active, menuOpen, setMenuOpen, scrolled }) {
  const items = ["home", "about", "programs", "gallery", "admissions", "contact"];
  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="wrap header__bar">
        <a className="logo" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="logo__mark" aria-hidden="true">{C.brandInitial}</span>
          <span className="logo__text">
            <strong>{C.brand}</strong>
            <small>{C.brandSub}</small>
          </span>
        </a>

        <nav id="main-nav" className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label={C.navLabel}>
          {items.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} onClick={() => setMenuOpen(false)}>
              {C.nav[id]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="btn btn--coral btn--sm header__cta" href="#contact">
            {C.enquire}
          </a>
          <button type="button" className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? C.menuClose : C.menuOpen}>
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const crayons = ["coral", "sun", "teal", "violet", "sky"];
  return (
    <section id="home" className="band band--paper hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__tag">
            <Icon name="sparkle" size={16} />
            {C.hero.tagline}
          </p>
          <h1>
            {C.hero.titleLead}
            <span className="hl">
              {C.hero.titleHi}
              <Scribble className="scribble--hl" />
            </span>
          </h1>
          <p className="lead">{C.hero.text}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">{C.hero.primary}</a>
            <a className="btn btn--ghost" href="#contact">{C.hero.secondary}</a>
          </div>
        </div>

        <div className="stage-wrap">
          <div className="stage" aria-hidden="true">
            <span className="confetti confetti--dot confetti--1" />
            <span className="confetti confetti--dot confetti--2" />
            <span className="confetti confetti--dot confetti--3" />
            <span className="confetti confetti--dot confetti--4" />
            <Squiggle className="confetti confetti--sq confetti--5" />
            <Squiggle className="confetti confetti--sq confetti--6" />
            <div className="crayons">
              {crayons.map((c, i) => (
                <span key={c} className={`crayon crayon--${c}`} style={{ "--i": i }} />
              ))}
            </div>
          </div>
          <div className="sticker">
            <Stars value={4.4} label={C.hero.rating} />
            <div>
              <strong>{C.hero.rating}</strong>
              <span>{C.hero.ratingSub}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust strip ---------- */

function Trust() {
  return (
    <section className="trust" aria-label={C.brand}>
      <ul className="wrap trust__list">
        {C.trust.map((t, i) => (
          <li key={t.title} className={`trust__item trust__item--${i}`}>
            <span className="trust__icon"><Icon name={t.icon} size={24} /></span>
            <div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- About & Curriculum ---------- */

function About() {
  const a = C.about;
  return (
    <section id="about" className="section">
      <div className="wrap about__grid">
        <div className="about__copy">
          <h2>{a.title}</h2>
          <p className="lead">{a.text1}</p>
          <p>{a.text2}</p>
        </div>
        <aside className="safety">
          <h3>{a.safetyTitle}</h3>
          <ul>
            {a.safety.map((s) => (
              <li key={s}>
                <span className="safety__tick"><Icon name="check" size={16} /></span>
                {s}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="wrap">
        <h3 className="subhead">{a.areasTitle}</h3>
        <ul className="areas">
          {a.areas.map((x, i) => (
            <li key={x.title} className={`area area--${i}`}>
              <Icon name={x.icon} size={26} />
              <h4>{x.title}</h4>
              <p>{x.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Programs ---------- */

function Programs() {
  const p = C.programs;
  const [tab, setTab] = useState(0);
  const g = p.groups[tab];
  const n = p.groups.length;

  function onKeyDown(e) {
    let d = 0;
    if (e.key === "ArrowRight") d = 1;
    if (e.key === "ArrowLeft") d = -1;
    if (!d) return;
    e.preventDefault();
    const next = (tab + d + n) % n;
    setTab(next);
    const el = document.getElementById(`tab-${next}`);
    if (el) el.focus();
  }

  return (
    <section id="programs" className="band band--sun section">
      <div className="wrap">
        <header className="section__head">
          <h2>{p.title}</h2>
          <p>{p.text}</p>
        </header>

        <div className="tabs" role="tablist" aria-label={p.title} onKeyDown={onKeyDown}>
          {p.groups.map((x, i) => (
            <button key={x.name} id={`tab-${i}`} type="button" role="tab" className="tab" aria-selected={tab === i} aria-controls="program-panel" tabIndex={tab === i ? 0 : -1} style={{ "--tab": PROGRAM_COLORS[i], "--i": i }} onClick={() => setTab(i)}>
              <strong>{x.name}</strong>
              <span>{x.age}</span>
            </button>
          ))}
        </div>

        <div id="program-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="program" style={{ "--tab": PROGRAM_COLORS[tab] }}>
          <div>
            <p className="program__age">{g.age}</p>
            <h3>{g.name}</h3>
            <p>{g.text}</p>
          </div>
          <div>
            <h4>{p.focusTitle}</h4>
            <ul className="focus">
              {g.focus.map((f) => (
                <li key={f}>
                  <Icon name="check" size={16} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dayblock">
          <h3>{p.dayTitle}</h3>
          <ol className="day">
            {p.day.map((d) => (
              <li key={d.time}>
                <time>{d.time}</time>
                <span>{d.label}</span>
              </li>
            ))}
          </ol>
          <p className="note">{p.dayNote}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

function Gallery() {
  const g = C.gallery;
  const [filter, setFilter] = useState("all");
  const visible = TILES.map((t, i) => ({ ...t, label: g.tiles[i] })).filter((t) => filter === "all" || t.cat === filter);

  return (
    <section id="gallery" className="section">
      <div className="wrap">
        <header className="section__head section__head--row">
          <div>
            <h2>{g.title}</h2>
            <p>{g.text}</p>
          </div>
          <div className="chips" role="group" aria-label={g.title}>
            {Object.keys(g.filters).map((k) => (
              <button key={k} type="button" className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>
                {g.filters[k]}
              </button>
            ))}
          </div>
        </header>

        <div className="mosaic">
          {visible.map((t) => (
            <figure key={t.label} className={`tile tile--${t.variant} ${t.size ? `tile--${t.size}` : ""} ${t.src ? "tile--photo" : ""}`}>
              {t.src && <img src={t.src} alt={t.label} loading="lazy" />}
              <figcaption>{t.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */

function Reviews() {
  const r = C.reviews;
  return (
    <section id="reviews" className="band band--violet section">
      <div className="wrap reviews__grid">
        <div className="reviews__intro">
          <h2>{r.title}</h2>
          <p>{r.text}</p>

          <div className="score">
            <span className="score__num">4.4</span>
            <div>
              <Stars value={4.4} label={r.ratingLabel} />
              <span className="score__count">{r.count}</span>
            </div>
          </div>

          <p className="reviews__note">{r.note}</p>

          <a className="textlink" href={CONTACT.mapLink} target="_blank" rel="noreferrer">
            {r.link}
          </a>
        </div>

        <div className="bubbles">
          {r.samples.map((text, i) => (
            <figure className={`bubble bubble--${i}`} key={i}>
              <span className="bubble__flag">{r.sampleLabel}</span>
              <blockquote>{text}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">?</span>
                <span>
                  <strong>Parent name</strong>
                  <small>Google review</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Admissions (simple) ---------- */

function Admissions() {
  const a = C.admissions;
  return (
    <section id="admissions" className="band band--teal section">
      <div className="wrap">
        <header className="section__head">
          <h2>{a.title}</h2>
          <p>{a.text}</p>
        </header>

        <ol className="steps steps--wide">
          {a.steps.map((s, i) => (
            <li key={s.title}>
              <span className="steps__num">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const k = C.contact;
  const f = k.form;
  const [form, setForm] = useState({ name: "", phone: "", age: 0, visit: 0, message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function onSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = true;
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) next.phone = true;
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // TODO: send `form` to your backend / Formspree / EmailJS here.
      setSent(true);
    }
  }

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(f.waTemplate(form.name, f.ages[form.age], f.days[form.visit], form.message.trim()))}`;

  return (
    <section id="contact" className="band band--paper section">
      <div className="wrap">
        <header className="section__head">
          <h2>{k.title}</h2>
        </header>

        <div className="contact__grid">
          <div className="contact__info">
            <ul className="facts">
              <li>
                <span className="facts__icon"><Icon name="pin" size={22} /></span>
                <div>
                  <h3>{k.addressLabel}</h3>
                  <p>{CONTACT.address}</p>
                </div>
              </li>
              <li>
                <span className="facts__icon"><Icon name="clock" size={22} /></span>
                <div>
                  <h3>{k.hoursLabel}</h3>
                  <p>{k.hours}</p>
                </div>
              </li>
              <li>
                <span className="facts__icon"><Icon name="phone" size={22} /></span>
                <div>
                  <h3>{k.phoneLabel}</h3>
                  <p dir="ltr" className="phone">{CONTACT.phoneDisplay}</p>
                </div>
              </li>
            </ul>

            <div className="contact__actions">
              <a className="btn btn--primary" href={`tel:${CONTACT.phoneTel}`}>
                <Icon name="phone" size={18} />
                {k.call}
              </a>
              <a className="btn btn--wa" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" size={18} />
                {k.whatsapp}
              </a>
              <a className="btn btn--ghost" href={CONTACT.mapLink} target="_blank" rel="noreferrer">
                <Icon name="pin" size={18} />
                {k.directions}
              </a>
            </div>
          </div>

          <div className="formcard">
            {sent ? (
              <div className="sent" role="status">
                <span className="sent__icon"><Icon name="check" size={30} /></span>
                <h3>{f.thanks(form.name.trim())}</h3>
                <p>{f.thanksText}</p>
                <a className="btn btn--wa" href={waHref} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {f.waSend}
                </a>
                <button type="button" className="textlink textlink--dark" onClick={() => setSent(false)}>
                  {f.again}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h3>{f.title}</h3>

                <div className="field">
                  <label htmlFor="f-name">{f.name}</label>
                  <input id="f-name" type="text" autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={errors.name ? "true" : undefined} aria-describedby={errors.name ? "f-name-err" : undefined} />
                  {errors.name && <p className="err" id="f-name-err">{f.errName}</p>}
                </div>

                <div className="field">
                  <label htmlFor="f-phone">{f.phone}</label>
                  <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={set("phone")} placeholder="+974" aria-invalid={errors.phone ? "true" : undefined} aria-describedby={errors.phone ? "f-phone-err" : undefined} />
                  {errors.phone && <p className="err" id="f-phone-err">{f.errPhone}</p>}
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="f-age">{f.age}</label>
                    <select id="f-age" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}>
                      {f.ages.map((a, i) => (
                        <option key={a} value={i}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="f-visit">{f.visit}</label>
                    <select id="f-visit" value={form.visit} onChange={(e) => setForm({ ...form, visit: Number(e.target.value) })}>
                      {f.days.map((d, i) => (
                        <option key={d} value={i}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="f-msg">{f.message}</label>
                  <textarea id="f-msg" rows="3" value={form.message} onChange={set("message")} />
                </div>

                <button type="submit" className="btn btn--primary btn--block">
                  <Icon name="send" size={18} />
                  {f.submit}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="map">
          <iframe title={k.mapTitle} src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer, mobile bar ---------- */

function Footer() {
  const items = ["home", "about", "programs", "gallery", "admissions", "contact"];
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="footer__brand">{C.brand}</p>
          <p className="footer__sub">{CONTACT.address}</p>
        </div>
        <nav aria-label={C.navLabel} className="footer__nav">
          {items.map((id) => (
            <a key={id} href={`#${id}`}>{C.nav[id]}</a>
          ))}
        </nav>
        <a className="footer__phone" href={`tel:${CONTACT.phoneTel}`} dir="ltr">{CONTACT.phoneDisplay}</a>
      </div>
      <p className="wrap footer__rights">{C.footer.rights}</p>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="mbar">
      <a href={`tel:${CONTACT.phoneTel}`}>
        <Icon name="phone" size={20} />
        {C.bar.call}
      </a>
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
        <Icon name="whatsapp" size={20} />
        {C.bar.whatsapp}
      </a>
      <a className="mbar__main" href="#contact">
        <Icon name="send" size={20} />
        {C.bar.enquire}
      </a>
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.title = "Creative Kids Nursery | Aziziyah, Doha";
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "programs", "gallery", "reviews", "admissions", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a className="skip" href="#content">{C.skip}</a>
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} />
      <main id="content">
        <Hero />
        <Trust />
        <About />
        <Programs />
        <Gallery />
        <Reviews />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}