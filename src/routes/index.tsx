import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import leaPortrait from "@/assets/lea-portrait.jpg";
import heroBotanical from "@/assets/hero-botanical.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Léa Verneuil — Coach de vie & bien-être" },
      { name: "description", content: "Coach de vie certifiée à Lyon. Retrouve l'équilibre qui te ressemble grâce à un accompagnement bienveillant et personnalisé." },
      { property: "og:title", content: "Léa Verneuil — Coach de vie & bien-être" },
      { property: "og:description", content: "Retrouve l'équilibre qui te ressemble." },
    ],
  }),
  component: Index,
});

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".animate-on-scroll");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, start: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

const Icon = {
  Leaf: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M4 20c8 0 16-6 16-16-8 0-16 6-16 16Z" />
      <path d="M4 20c3-6 8-11 14-13" />
    </svg>
  ),
  Chat: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z" />
    </svg>
  ),
  Spark: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
  Calendar: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="5" width="18" height="16" rx="4" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  Spiral: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 12a3 3 0 1 1 3 3 5 5 0 0 1-5-5 7 7 0 0 1 7-7 9 9 0 0 1 9 9" />
    </svg>
  ),
  Group: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M2 20c1-3 4-5 6-5s5 2 6 5M14 20c1-3 4-5 6-5" />
    </svg>
  ),
  Chevron: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  Insta: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4 4h4v4H4zM4 10h4v10H4zM10 10h4v2c.7-1.3 2.2-2.3 4-2.3 3 0 4 2 4 5V20h-4v-4.5c0-1.4-.5-2.5-2-2.5s-2 1.1-2 2.5V20h-4z"/></svg>
  ),
  Whatsapp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.2 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.17 0 4.21.85 5.75 2.38a8.1 8.1 0 0 1 2.38 5.74c0 4.48-3.65 8.12-8.13 8.12-1.52 0-3-.41-4.29-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.08 8.08 0 0 1-1.24-4.32c0-4.48 3.64-8.12 8.13-8.12Zm-3.7 4.36c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.73.13.18 1.85 2.82 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.25.22-.61.22-1.14.15-1.25-.07-.11-.24-.18-.5-.31-.26-.13-1.55-.76-1.79-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.03-.15.18-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.3-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.31.4-.46.13-.16.17-.27.26-.45.09-.18.04-.34-.02-.47-.07-.13-.58-1.42-.8-1.94-.21-.51-.42-.44-.58-.45-.15-.01-.32-.01-.5-.01Z"/></svg>
  ),
};

function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div aria-hidden style={{ background: from, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[80px]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={to} />
      </svg>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["À propos", "#about"],
    ["Pour qui ?", "#pour-qui"],
    ["Approche", "#approche"],
    ["Accompagnements", "#services"],
    ["Témoignages", "#testimonials"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ] as const;
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || open ? "var(--primary-dark)" : "var(--primary)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-[color:var(--text-light)]">
          <span className="w-9 h-9 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center text-[color:var(--accent)]">
            <Icon.Leaf className="w-5 h-5" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight whitespace-nowrap">Léa Verneuil</span>
        </a>
        <nav className="hidden xl:flex items-center gap-5">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="label whitespace-nowrap text-[color:var(--text-light)]/85 hover:text-[color:var(--accent)] transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden xl:flex items-center">
          <a href="#contact" className="btn-primary whitespace-nowrap !py-2.5 !px-5 !text-[11px]">Prendre rendez-vous</a>
        </div>
        <button
          aria-label="Menu"
          aria-expanded={open}
          className="xl:hidden text-[color:var(--text-light)] w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="xl:hidden px-5 pb-6 flex flex-col gap-4 bg-[color:var(--primary-dark)]">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="label text-[color:var(--text-light)]/90 py-2 border-b border-white/10">{l}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full !text-[11px] !py-3 !px-4">Prendre rendez-vous</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n1 = useCounter(5, start);
  const n2 = useCounter(100, start);
  const n3 = useCounter(200, start);

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24" style={{ background: "var(--primary)" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <p className="label hero-anim text-[color:var(--accent)]" style={{ ["--d" as string]: "0ms" } as React.CSSProperties}>Coach de vie & bien-être</p>
          <h1
            className="hero-anim mt-5 font-display font-bold text-[color:var(--text-light)] text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-tight"
            style={{ ["--d" as string]: "150ms" } as React.CSSProperties}
          >
            Retrouve l'<span className="text-[color:var(--accent)]">équilibre</span><br className="hidden sm:block" /> qui te ressemble
          </h1>
          <p
            className="hero-anim mt-6 max-w-xl mx-auto lg:mx-0 text-[17px] leading-[1.8] text-white/80"
            style={{ ["--d" as string]: "300ms" } as React.CSSProperties}
          >
            J'accompagne les femmes qui s'oublient entre les attentes des autres et leurs propres désirs — pour les aider à retrouver leur voix, leur élan et cette joie de vivre qui ne demande qu'à revenir.
          </p>
          <div
            className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            style={{ ["--d" as string]: "450ms" } as React.CSSProperties}
          >
            <a href="#services" className="btn-primary !text-xs !py-2 !px-4 md:!text-sm md:!py-3 md:!px-6">Découvrir mes accompagnements →</a>
            <a href="#about" className="btn-secondary !text-xs !py-2 !px-4 md:!text-sm md:!py-3 md:!px-6">En savoir plus sur moi →</a>
          </div>
        </div>
        <div className="hero-anim relative" style={{ ["--d" as string]: "300ms" } as React.CSSProperties}>
          <div className="relative aspect-square max-w-md mx-auto rounded-[40px] overflow-hidden">
            <div className="absolute inset-0 rounded-[40px] border border-white/15 pointer-events-none z-10" />
            <img src={heroBotanical} alt="Composition botanique douce d'eucalyptus et de pampas" className="w-full h-full object-cover" width={1200} height={1200} />
            <div className="absolute bottom-4 left-4 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-[color:var(--accent)] text-[color:var(--primary-dark)] font-display font-bold shadow-xl z-20 text-[13px] md:text-base whitespace-nowrap">
              ✦ Douceur · Écoute · Élan
            </div>
          </div>
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-5 md:px-10 mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-10">
        {[
          { v: n1, suffix: "", label: "Ans d'expérience" },
          { v: n2, suffix: "%", label: "Approche bienveillante" },
          { v: n3, suffix: "+", label: "Clientes accompagnées" },
        ].map((s, i) => (
          <div key={i} className="text-center lg:text-left">
            <div className="font-display font-bold text-[color:var(--accent)] text-4xl md:text-6xl">
              {s.v}{s.suffix}
            </div>
            <p className="mt-2 label text-white/60 text-[10px] md:text-[11px]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Wave from="var(--primary)" to="var(--bg)" />
      </div>
    </section>
  );
}

function About() {
  const values = [
    { icon: <Icon.Leaf className="w-6 h-6" />, title: "Écoute", text: "Un espace sûr où tu peux tout dire, sans jugement." },
    { icon: <Icon.Chat className="w-6 h-6" />, title: "Bienveillance", text: "On avance à ton rythme, pas au mien." },
    { icon: <Icon.Spark className="w-6 h-6" />, title: "Authenticité", text: "Pas de recettes toutes faites — seulement ce qui te ressemble." },
  ];
  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-5 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div className="animate-on-scroll relative max-w-sm mx-auto lg:max-w-none">
          <div className="aspect-square rounded-full overflow-hidden border-[3px] border-[color:var(--accent)] max-w-[420px] mx-auto">
            <img src={leaPortrait} alt="Portrait de Léa Verneuil, coach de vie" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
          </div>
          <div className="absolute bottom-4 left-2 px-5 py-2 rounded-full bg-[color:var(--primary)] text-white text-[13px] font-semibold shadow-lg">
            Coach certifiée ✦
          </div>
        </div>
        <div>
          <p className="animate-on-scroll label text-[color:var(--primary)]">À propos</p>
          <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--primary)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
            Une présence <span className="text-[color:var(--accent)]">bienveillante</span> à tes côtés
          </h2>
          <div className="animate-on-scroll mt-6 space-y-4 text-[color:var(--text)]/85 leading-[1.85]" style={{ ["--i" as string]: 2 } as React.CSSProperties}>
            <p>
              Je suis Léa Verneuil, coach certifiée en développement personnel et bien-être holistique. Après des années à courir dans tous les sens en oubliant de m'écouter, j'ai décidé de tout ralentir — et cette décision a tout changé.
            </p>
            <p>
              Aujourd'hui, j'accompagne des femmes comme toi à se reconnecter à elles-mêmes, clarifier ce qu'elles veulent vraiment, et avancer avec douceur et détermination.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="animate-on-scroll flex items-start gap-4 px-5 py-4 rounded-2xl"
                style={{ background: "rgba(45,106,79,0.08)", ["--i" as string]: 3 + i } as React.CSSProperties}
              >
                <span className="shrink-0 w-11 h-11 rounded-full bg-white text-[color:var(--primary)] flex items-center justify-center">{v.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-[color:var(--primary-dark)] text-lg">{v.title}</h3>
                  <p className="text-sm text-[color:var(--muted)] leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWhom() {
  const items = [
    "Tu te sens un peu à côté de ta vie, comme si tu jouais un rôle qui n'est plus tout à fait le tien.",
    "Tu fais passer tout le monde avant toi — et, doucement, tu as fini par t'oublier.",
    "Tu traverses une transition (rupture, maternité, reconversion) et tu cherches ton cap.",
    "Tu as « tout pour être heureuse », mais une petite voix te souffle qu'il manque l'essentiel.",
    "Tu veux retrouver confiance et poser enfin tes limites, sans culpabiliser.",
    "Tu sens que c'est le moment de revenir à toi — tu ne sais juste pas par où commencer.",
  ];
  return (
    <section id="pour-qui" className="py-20 md:py-28" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-5 md:px-10 text-center">
        <p className="animate-on-scroll label text-[color:var(--primary)]">Pour qui ?</p>
        <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--primary)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
          Tu te reconnais peut-être <span className="text-[color:var(--accent)]">ici</span>
        </h2>
        <p className="animate-on-scroll mt-6 text-[color:var(--muted)] text-[17px] leading-[1.8] max-w-2xl mx-auto" style={{ ["--i" as string]: 2 } as React.CSSProperties}>
          Si l'une de ces phrases résonne en toi, alors tu es exactement au bon endroit.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 gap-4 text-left">
          {items.map((t, i) => (
            <div
              key={i}
              className="animate-on-scroll flex items-start gap-4 px-5 py-5 rounded-2xl bg-white"
              style={{ boxShadow: "0 4px 24px rgba(45,106,79,0.06)", ["--i" as string]: i } as React.CSSProperties}
            >
              <span className="shrink-0 w-9 h-9 rounded-full bg-[color:var(--accent)]/15 text-[color:var(--accent-dark)] flex items-center justify-center">
                <Icon.Leaf className="w-5 h-5" />
              </span>
              <p className="text-[15px] text-[color:var(--text)]/85 leading-[1.7]">{t}</p>
            </div>
          ))}
        </div>
        <p className="animate-on-scroll mt-12 font-display italic text-[color:var(--primary-dark)] text-xl md:text-[26px] leading-[1.5]" style={{ ["--i" as string]: 3 } as React.CSSProperties}>
          « Tu n'as rien à réparer. Tu as juste besoin d'un espace pour te retrouver. »
        </p>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { n: "01", title: "Écoute", text: "On pose tout, sans filtre ni jugement. Je t'accueille là où tu en es, vraiment." },
    { n: "02", title: "Clarté", text: "On démêle ensemble ce qui t'appartient de ce que tu portes pour les autres." },
    { n: "03", title: "Action", text: "On définit des pas concrets, à ta mesure — ces petits gestes qui changent tout." },
    { n: "04", title: "Ancrage", text: "On installe tes nouveaux repères pour qu'ils tiennent, bien après nos séances." },
  ];
  return (
    <section id="approche" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="animate-on-scroll label text-[color:var(--primary)]">Mon approche</p>
          <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--primary)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
            Un chemin <span className="text-[color:var(--accent)]">doux</span>, étape par étape
          </h2>
          <p className="animate-on-scroll mt-6 text-[color:var(--muted)] text-[17px] leading-[1.8]" style={{ ["--i" as string]: 2 } as React.CSSProperties}>
            Pas de recette toute faite. Juste un cadre clair et rassurant, qui épouse ton rythme à toi.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="card animate-on-scroll relative" style={{ ["--i" as string]: i + 1 } as React.CSSProperties}>
              <div className="font-display font-bold text-[color:var(--accent)]/30 text-5xl leading-none">{s.n}</div>
              <h3 className="mt-3 font-display font-bold text-[color:var(--primary)] text-xl">{s.title}</h3>
              <p className="mt-2 text-[14px] text-[color:var(--muted)] leading-[1.7]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const cards = [
    {
      icon: <Icon.Calendar className="w-7 h-7" />,
      title: "Séance individuelle",
      desc: "Une heure pour toi, rien que pour toi. On explore ensemble ce qui te pèse, ce qui te freine, ou ce que tu veux clarifier. Chaque séance est unique, comme toi.",
      price: "75 €",
      badge: "En ligne ou présentiel",
      cta: "Réserver une séance →",
      ctaClass: "btn-outline",
      featured: false,
    },
    {
      icon: <Icon.Spiral className="w-7 h-7" />,
      title: "Suivi mensuel",
      desc: "Un accompagnement en profondeur sur 4 semaines. Idéal si tu traverses une période de transition ou si tu veux ancrer de nouveaux patterns. On avance ensemble, semaine après semaine.",
      price: "250 € / mois",
      badge: "4 séances incluses",
      cta: "Commencer l'aventure →",
      ctaClass: "btn-primary",
      featured: true,
    },
    {
      icon: <Icon.Group className="w-7 h-7" />,
      title: "Atelier en groupe",
      desc: "Des ateliers thématiques en petit comité (6 max) pour explorer, partager et grandir ensemble. Confiance en soi, limites saines, reconnexion à ses désirs…",
      price: "45 € / atelier",
      badge: "Prochaine date : juillet 2025",
      cta: "Voir les ateliers →",
      ctaClass: "btn-outline",
      featured: false,
    },
  ];
  return (
    <>
      <Wave from="var(--bg)" to="var(--primary)" flip />
      <section id="services" className="py-20 md:py-28" style={{ background: "var(--primary)" }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="animate-on-scroll label text-[color:var(--accent)]">Mes accompagnements</p>
            <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--text-light)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
              Comment je peux <span className="text-[color:var(--accent)]">t'accompagner</span>
            </h2>
            <p className="animate-on-scroll mt-6 text-white/80 text-[17px] leading-[1.8]" style={{ ["--i" as string]: 2 } as React.CSSProperties}>
              Trois façons de cheminer ensemble. Quel que soit ton point de départ, il y a une formule à ta mesure.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <div
                key={c.title}
                className="card animate-on-scroll relative flex flex-col"
                style={{
                  borderTop: c.featured ? "3px solid var(--accent)" : undefined,
                  ["--i" as string]: i + 1,
                } as React.CSSProperties}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[color:var(--accent)] text-[color:var(--primary-dark)] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                    ✦ Le plus choisi
                  </span>
                )}
                <div className="w-14 h-14 rounded-full bg-[color:var(--accent)]/15 text-[color:var(--accent-dark)] flex items-center justify-center">
                  {c.icon}
                </div>
                <h3 className="mt-5 font-display font-bold text-[color:var(--primary)] text-2xl">{c.title}</h3>
                <p className="mt-3 text-[color:var(--muted)] text-[15px] leading-[1.75] flex-1">{c.desc}</p>
                <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
                  <div className="font-display font-bold text-[color:var(--accent-dark)] text-[28px]">{c.price}</div>
                  <span className="px-3 py-1.5 rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary-dark)] text-[12px] font-semibold">
                    {c.badge}
                  </span>
                </div>
                <a href="#contact" className={`${c.ctaClass} mt-6 w-full !text-xs !py-2 !px-4 md:!text-sm md:!py-3 md:!px-6`}>{c.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Wave from="var(--primary)" to="var(--bg-alt)" />
    </>
  );
}

function Testimonials() {
  const items = [
    { quote: "Léa m'a aidée à sortir d'une période où je ne me reconnaissais plus. En 4 séances, j'avais retrouvé une clarté que je croyais perdue pour toujours.", name: "Camille R.", info: "Designer freelance, 34 ans", initials: "CR", bg: "var(--primary)", fg: "white" },
    { quote: "Ce qui m'a frappée, c'est à quel point Léa sait écouter sans juger. Elle pose les bonnes questions, celles qui font vraiment réfléchir. Je recommande à 100 %.", name: "Inès M.", info: "Responsable RH, 41 ans", initials: "IM", bg: "var(--accent)", fg: "var(--primary-dark)" },
    { quote: "L'atelier en groupe m'a permis de rencontrer des femmes incroyables et de me sentir moins seule dans mes questionnements. Une vraie bulle de douceur !", name: "Sarah T.", info: "Enseignante, 29 ans", initials: "ST", bg: "var(--primary-mid)", fg: "white" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-5 md:px-10 text-center">
        <p className="animate-on-scroll label text-[color:var(--primary)]">Elles témoignent</p>
        <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--primary)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
          Ce qu'elles en disent
        </h2>

        <div className="mt-14 relative min-h-[320px] md:min-h-[260px]">
          {items.map((t, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: i === idx ? 1 : 0,
                transform: `translateX(${(idx - i) * 30}px)`,
                pointerEvents: i === idx ? "auto" : "none",
              }}
            >
              <p className="font-display italic text-[color:var(--primary-dark)] text-xl md:text-[26px] leading-[1.5]">
                « {t.quote} »
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                  style={{ background: t.bg, color: t.fg }}
                >
                  {t.initials}
                </span>
                <div className="text-left">
                  <div className="font-semibold text-[color:var(--text)]">{t.name}</div>
                  <div className="text-[13px] text-[color:var(--muted)]">{t.info}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {items.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Témoignage ${idx + 1}`}
              onClick={() => setI(idx)}
              className="h-2.5 rounded-full transition-all"
              style={{
                width: i === idx ? 28 : 10,
                background: i === idx ? "var(--primary)" : "rgba(45,106,79,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qa = [
    ["Combien de temps dure une séance ?", "Chaque séance individuelle dure 60 minutes. Les ateliers en groupe durent entre 1h30 et 2h selon le thème abordé."],
    ["Comment se déroule la première séance ?", "La première séance est une séance de découverte. On fait connaissance, j'écoute où tu en es, et on définit ensemble ce sur quoi tu souhaites travailler. Aucune pression, aucun engagement."],
    ["Les séances se font en ligne ou en présentiel ?", "Les deux ! Les séances individuelles sont disponibles en visio (Zoom ou Google Meet) ou en présentiel à Lyon. Les ateliers en groupe ont lieu en présentiel uniquement."],
    ["Est-ce que le coaching est fait pour moi ?", "Si tu te sens un peu perdue ou si tu cherches à changer quelque chose dans ta vie sans savoir par où commencer — oui, le coaching est probablement fait pour toi. En cas de doute, réserve une séance découverte gratuite de 20 min."],
    ["Y a-t-il un engagement minimum ?", "Non. Tu peux commencer par une seule séance. Le suivi mensuel est renouvelable mois par mois, sans engagement longue durée."],
  ] as const;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <div className="text-center">
          <p className="animate-on-scroll label text-[color:var(--primary)]">FAQ</p>
          <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--primary)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
            Tes questions, mes <span className="text-[color:var(--accent)]">réponses</span>
          </h2>
        </div>
        <div className="mt-12">
          {qa.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b animate-on-scroll" style={{ borderColor: "rgba(45,106,79,0.15)", ["--i" as string]: i } as React.CSSProperties}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between gap-6 text-left"
                >
                  <span className="font-display font-bold text-[color:var(--primary-dark)] text-lg md:text-xl">{q}</span>
                  <Icon.Chevron className={`w-5 h-5 shrink-0 text-[color:var(--primary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-[350ms] ease-out"
                  style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-6 text-[color:var(--muted)] leading-[1.8]">{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DiscoveryBand() {
  return (
    <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <div
          className="animate-on-scroll relative overflow-hidden rounded-[32px] px-7 py-12 md:px-14 md:py-16 text-center"
          style={{ background: "var(--primary)" }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[color:var(--accent)]/15 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative">
            <p className="label text-[color:var(--accent)]">Premier pas</p>
            <h2 className="mt-4 font-display font-bold text-[color:var(--text-light)] text-3xl md:text-[42px] leading-tight">
              Et si on commençait par <span className="text-[color:var(--accent)]">faire connaissance</span> ?
            </h2>
            <p className="mt-5 text-white/85 text-[16px] md:text-[17px] leading-[1.8] max-w-xl mx-auto">
              Je t'offre un premier appel de 20 minutes, sans engagement. On échange, tu vois si le courant passe — et tu repars déjà avec un premier éclairage.
            </p>
            <a href="#contact" className="btn-primary mt-8 !text-xs !py-2.5 !px-5 md:!text-sm md:!py-3 md:!px-7">
              Réserver mon appel offert →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Wave from="var(--bg)" to="var(--primary)" flip />
      <section id="contact" className="py-20 md:py-28" style={{ background: "var(--primary)" }}>
        <div className="mx-auto max-w-2xl px-5 md:px-10 text-center">
          <p className="animate-on-scroll label text-[color:var(--accent)]">Prête à commencer ?</p>
          <h2 className="animate-on-scroll mt-4 font-display font-bold text-[color:var(--text-light)] text-4xl md:text-5xl" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
            Faisons <span className="text-[color:var(--accent)]">connaissance</span>
          </h2>
          <p className="animate-on-scroll mt-6 italic text-white/80 text-[17px] leading-[1.8]" style={{ ["--i" as string]: 2 } as React.CSSProperties}>
            Tu n'as pas besoin d'avoir toutes les réponses pour faire le premier pas. Écris-moi quelques mots — c'est déjà un acte de courage, et je te réponds personnellement sous 48 h.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="animate-on-scroll mt-10 space-y-4 text-left"
            style={{ ["--i" as string]: 3 } as React.CSSProperties}
          >
            <input required type="text" name="prenom" placeholder="Prénom *" className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-[color:var(--accent)] focus:bg-white/15 transition" />
            <input required type="email" name="email" placeholder="Email *" className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-[color:var(--accent)] focus:bg-white/15 transition" />
            <textarea required name="message" placeholder="Message *" className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-[color:var(--accent)] focus:bg-white/15 transition resize-none" style={{ minHeight: 140 }} />
            <button type="submit" className="btn-primary w-full !text-xs !py-2 !px-4 md:!text-sm md:!py-3 md:!px-6">
              {sent ? "Message envoyé ✦" : "Envoyer mon message ✦"}
            </button>
          </form>

          <div className="animate-on-scroll mt-12 flex justify-center gap-4" style={{ ["--i" as string]: 4 } as React.CSSProperties}>
            {[
              { icon: <Icon.Insta />, label: "Instagram" },
              { icon: <Icon.Linkedin />, label: "LinkedIn" },
              { icon: <Icon.Whatsapp />, label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[color:var(--primary-dark)] transition"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--primary-dark)" }} className="py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-10 flex flex-col md:flex-row gap-6 items-center justify-between text-center md:text-left">
        <div className="flex items-center gap-3 text-[color:var(--text-light)]">
          <span className="w-9 h-9 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center text-[color:var(--accent)]">
            <Icon.Leaf className="w-5 h-5" />
          </span>
          <div>
            <div className="font-display font-bold">Léa Verneuil</div>
            <div className="text-[12px] text-white/50">Coach de vie & bien-être · Lyon, France</div>
          </div>
        </div>
        <div className="text-[13px] text-white/60 space-y-2 text-center md:text-right">
          <div>Fait avec ♡ · Lyon, France</div>
          <div className="flex gap-4 justify-center md:justify-end">
            <a href="#" className="hover:text-[color:var(--accent)]">Mentions légales</a>
            <a href="#" className="hover:text-[color:var(--accent)]">Confidentialité</a>
          </div>
          <div className="text-white/40">© 2026 Léa Verneuil — Tous droits réservés</div>
        </div>
      </div>
    </footer>
  );
}

function Loader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1500);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (gone) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        background: "var(--primary-dark)",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden={fading}
    >
      <div className="loader-pop flex flex-col items-center gap-5">
        <span className="relative w-24 h-24 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center text-[color:var(--accent)]">
          <span className="loader-ring absolute inset-0 rounded-full border border-[color:var(--accent)]/40" />
          <Icon.Leaf className="w-12 h-12" />
        </span>
        <span className="loader-text font-display font-bold text-3xl tracking-tight text-[color:var(--text-light)]">
          Léa Verneuil
        </span>
        <span className="loader-sub label text-[color:var(--accent)] text-[11px]">
          Coach de vie & bien-être
        </span>
      </div>
    </div>
  );
}

function Index() {
  useScrollReveal();
  return (
    <main className="overflow-x-hidden">
      <Loader />
      <Nav />
      <Hero />
      <About />
      <ForWhom />
      <Approach />
      <Services />
      <Testimonials />
      <FAQ />
      <DiscoveryBand />
      <Contact />
      <Footer />
    </main>
  );
}
