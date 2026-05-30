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
  Pinterest: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><circle cx="12" cy="12" r="9"/><path d="M11 8c2 0 4 1 4 3.5S13.5 15 12 15c-.8 0-1.5-.4-1.8-1L9 19"/></svg>
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
          <span className="font-display font-bold text-lg tracking-tight">Léa Verneuil</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="label text-[color:var(--text-light)]/85 hover:text-[color:var(--accent)] transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex btn-primary !py-3 !px-6 !text-[12px]">Prendre rendez-vous</a>
        <button
          aria-label="Menu"
          className="lg:hidden md:hidden text-[color:var(--text-light)] w-10 h-10 flex items-center justify-center"
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
        <div className="md:hidden px-5 pb-6 flex flex-col gap-4 bg-[color:var(--primary-dark)]">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="label text-[color:var(--text-light)]/90 py-2 border-b border-white/10">{l}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 !text-[10px] !py-1.5 !px-3">Prendre rendez-vous</a>
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
            J'accompagne les femmes qui se sentent perdues entre les attentes des autres et leurs propres désirs — pour qu'elles retrouvent leur voix, leur élan et leur joie de vivre.
          </p>
          <div
            className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            style={{ ["--d" as string]: "450ms" } as React.CSSProperties}
          >
            <a href="#services" className="btn-primary !text-xs !py-2 !px-4 md:!text-sm md:!py-3 md:!px-6">Découvrir mes accompagnements →</a>
            <a href="#about" className="btn-secondary !text-xs !py-2 !px-4 md:!text-sm md:!py-3 md:!px-6">En savoir plus sur moi</a>
          </div>
        </div>
        <div className="hero-anim relative" style={{ ["--d" as string]: "300ms" } as React.CSSProperties}>
          <div className="relative aspect-square max-w-md mx-auto rounded-[40px] overflow-hidden">
            <div className="absolute inset-0 rounded-[40px] border border-white/15 pointer-events-none z-10" />
            <img src={heroBotanical} alt="Composition botanique douce d'eucalyptus et de pampas" className="w-full h-full object-cover" width={1200} height={1200} />
            <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-full bg-[color:var(--accent)] text-[color:var(--primary-dark)] font-display font-bold shadow-xl z-20">
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
            Tu n'as pas besoin d'avoir toutes les réponses pour faire le premier pas. Envoie-moi un message — c'est déjà un acte de courage.
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
              { icon: <Icon.Pinterest />, label: "Pinterest" },
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
        <div className="text-[13px] text-white/60 space-y-1">
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

function Index() {
  useScrollReveal();
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
