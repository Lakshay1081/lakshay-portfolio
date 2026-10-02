
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import './styles.css';

import vidhinaad from './assets/vidhinaad.png';
import crimenet from './assets/crimenet-ai.png';
import trakTwin from './assets/trak-twin.png';
import aboutCharacter from './assets/about-character.png';

const resumePdf = '/resume/Lakshay-Pareek-UIUX-Resume.pdf';

const projects = {
  vidhinaad: {
    slug: 'vidhinaad',
    number: '01',
    title: 'VIDHINAAD',
    kicker: 'LEGAL PRACTICE',
    subtitle: 'Legal practice website',
    role: 'UI/UX Design · Frontend Development',
    summary:
      'A structured digital presence for a legal practice, designed to make expertise easier to understand and the path to an enquiry easier to find.',
    image: vidhinaad,
    live: 'https://vidhinaad.com/',
    problem:
      'VIDHINAAD needed a professional digital presence that communicated the firm’s identity, legal expertise and services clearly, while giving prospective clients a simple path to enquire.',
    users:
      'Individuals seeking legal assistance, prospective clients evaluating expertise, and visitors looking for information about the firm, its team and practice areas.',
    responsibility:
      'I handled both the user-facing design and frontend implementation: information architecture, navigation, hierarchy, visual system, service presentation, contact experience and responsive implementation.',
    workflow: [
      'Discover the firm',
      'Understand expertise',
      'Explore services',
      'Build confidence',
      'Make an enquiry'
    ],
    decisions: [
      ['Restrained visual identity', 'Deep navy, muted gold and warm ivory create a professional tone without unnecessary decoration.'],
      ['Clear information hierarchy', 'Services and firm information are split into scannable sections so visitors can understand the offering without processing everything at once.'],
      ['Straightforward enquiry journey', 'The contact experience makes the next step obvious rather than forcing visitors to figure out how to approach the firm.'],
      ['Responsive implementation', 'The layouts, navigation and contact experience adapt to smaller screens.']
    ],
    tone: 'navy'
  },
  crimenet: {
    slug: 'crimenet',
    number: '02',
    title: 'CRIMENET AI',
    kicker: 'INTELLIGENCE PLATFORM',
    subtitle: 'Criminal network intelligence platform',
    role: 'UI/UX Design',
    summary:
      'An investigator-facing workspace that turns fragmented case data into connected, reviewable context across relationships, locations, timelines and evidence.',
    image: crimenet,
    live: 'https://crimenet-ai-snowy.vercel.app/',
    problem:
      'Crime-related intelligence can be fragmented across case records, communications, financial transactions, vehicles, locations and other sources. The UX challenge was to help investigators make sense of this interconnected information without creating an overwhelming data dashboard.',
    users:
      'Authorized crime investigators and investigative analysts who need to understand connections, evidence, timelines and potential leads while retaining human review.',
    responsibility:
      'I was responsible for the investigator-facing UX: information architecture, command center, network exploration, geo-temporal views, lead validation, investigation replay, reports and integrity-related experiences.',
    workflow: [
      'Case / entity',
      'Network + map + timeline',
      'Pattern detection',
      'Investigative lead',
      'Evidence validation',
      'Human decision'
    ],
    decisions: [
      ['Unify investigation context', 'Cases, entities, network, GIS, timeline, leads and reports are arranged as one connected workspace.'],
      ['Graph + map + timeline', 'Each view answers a different question: who is connected, where did it happen and when did it happen.'],
      ['Explain leads, don’t just score them', 'Lead cards surface supporting evidence, contradictions, missing evidence and confidence context.'],
      ['Keep humans in the loop', 'The interface frames AI output as investigative support for human review rather than as a final conclusion.']
    ],
    tone: 'blue'
  },
  trakTwin: {
    slug: 'trak-twin',
    number: '03',
    title: 'TRAK TWIN',
    kicker: 'TRAVEL PRODUCT',
    subtitle: 'Travel companion platform',
    role: 'UI/UX Design',
    summary:
      'A product experience that helps solo travellers move from destination discovery to compatibility, trust, shared planning and safer travel.',
    image: trakTwin,
    live: 'https://trak-twin.vercel.app/',
    problem:
      'Solo travel offers freedom but can create uncertainty around finding the right companion, building trust, coordinating plans and staying safe. Trak Twin brings these needs into one continuous journey.',
    users:
      'Solo travellers who want to travel independently while remaining open to finding a compatible companion. Their needs span discovery, compatibility, trust, planning, safety and reflection.',
    responsibility:
      'I handled the product experience and interface across onboarding, matching, profiles, messaging, shared trips, safety and post-trip feedback.',
    workflow: [
      'Discover',
      'Personalise',
      'Match',
      'Connect',
      'Plan together',
      'Travel safely',
      'Reflect'
    ],
    decisions: [
      ['Explain compatibility', 'A percentage alone is vague, so the match experience exposes reasons such as shared destination, travel style and language fit.'],
      ['Progressive onboarding', 'Profile creation is divided into three stages instead of one long form.'],
      ['Safety as a persistent layer', 'SOS, emergency contacts and location sharing belong inside the travel experience, not only on a support page.'],
      ['Trust before commitment', 'The journey intentionally moves from match to profile to conversation to shared planning before travel.']
    ],
    tone: 'cyan'
  }
};

const projectList = Object.values(projects);

function useReveal() {
  React.useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

function PointerCard({ children, className = '' }) {
  const ref = React.useRef(null);

  const handleMove = event => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    el.style.setProperty('--rx', `${(0.5 - y) * 4}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 5}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  return (
    <div
      ref={ref}
      className={`pointer-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const toggleRef = React.useRef(null);
  useScrollProgress();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setMenuOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    if (menuOpen) {
      const firstLink = menuRef.current?.querySelector('.mobile-menu-link');
      window.requestAnimationFrame(() => firstLink?.focus());
    } else {
      toggleRef.current?.focus({ preventScroll: true });
    }

    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  React.useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const navItems = [
    ['/work', 'Work'],
    ['/about', 'About'],
    ['resume', 'Resume'],
    ['/contact', 'Contact']
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Lakshay Pareek home">
          <span className="brand-mark">LP</span>
          <span>Lakshay Pareek</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([path, label]) =>
            path === 'resume' ? (
              <a key={path} href={resumePdf} target="_blank" rel="noopener noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {label}
              </NavLink>
            )
          )}
        </nav>

        <Link to="/contact" className="header-cta">
          <span>Let’s connect</span><b>↗</b>
        </Link>

        <button
          ref={toggleRef}
          className={`mobile-menu-toggle ${menuOpen ? 'open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-head">
          <span>MENU</span>
          <button type="button" onClick={closeMenu} aria-label="Close menu" tabIndex={menuOpen ? 0 : -1}>×</button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map(([path, label], index) =>
            path === 'resume' ? (
              <a
                key={path}
                className="mobile-menu-link"
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                <b>↗</b>
              </a>
            ) : (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                <b>↗</b>
              </NavLink>
            )
          )}
        </nav>
        <div className="mobile-menu-foot">
          <span>UI/UX DESIGNER · JAIPUR</span>
          <span>LET’S MAKE IT CLEAR.</span>
        </div>
      </div>

      <button
        className={`mobile-menu-backdrop ${menuOpen ? 'open' : ''}`}
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <main>{children}</main>

      <footer className={`site-footer${location.pathname === '/contact' ? ' contact-site-footer' : ''}`}>
        <div className="footer-main">
          <div className="eyebrow"><span className="dot" /> LET’S WORK TOGETHER</div>
          <h2>
            {location.pathname === '/contact' ? (
              <>Have something <em>worth designing?</em></>
            ) : (
              <>
                Make the next
                <em>interface</em>
                clearer.
              </>
            )}
          </h2>
          <Link className="footer-email" to="/contact">Start a conversation <span>↗</span></Link>
        </div>
        <div className="footer-side">
          <div className="footer-location">JAIPUR · INDIA</div>
          <a href="mailto:lakshaypareek1805@gmail.com">lakshaypareek1805@gmail.com</a>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/lakshaypareek/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/Lakshay1081" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
          <span className="footer-copy">© {new Date().getFullYear()} Lakshay Pareek</span>
        </div>
      </footer>
    </>
  );
}

function Home() {
  useReveal();

  return (
    <div className="home-page">
      <section className="hero container">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow hero-eyebrow">
            <span className="dot" /> UI/UX DESIGNER
            <span className="eyebrow-line" />
            <span>JAIPUR · INDIA</span>
          </div>

          <h1 className="hero-title">
            <span>I turn complex</span>
            <span>ideas into <em>clear</em></span>
            <span>digital experiences<span className="period">.</span></span>
          </h1>

          <p className="hero-sub">
            Designing interfaces where structure, interaction and visual clarity work together.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary magnetic" to="/work">
              <span>Explore selected work</span>
              <b>↗</b>
            </Link>
            <a className="text-link" href={resumePdf} target="_blank" rel="noopener noreferrer">View resume <span>↗</span></a>
            <Link className="text-link text-link-secondary" to="/about">A little about me <span>↓</span></Link>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">CURRENT FOCUS</span>
              <strong>Information architecture · Interaction · UI</strong>
            </div>
            <div>
              <span className="meta-label">ALSO</span>
              <strong>Frontend-aware design</strong>
            </div>
          </div>
        </div>

        <div className="hero-art" data-reveal>
          <div className="hero-art-top">
            <span>SELECTED WORK</span>
            <span>03 PROJECTS</span>
          </div>

          <div className="hero-stack">
            <PointerCard className="hero-frame hero-frame-back">
              <Link to="/work/vidhinaad" className="frame-inner">
                <div className="frame-label"><span>01</span><b>VIDHINAAD</b></div>
                <img src={vidhinaad} alt="VIDHINAAD project screen" loading="eager" decoding="async" />
              </Link>
            </PointerCard>

            <PointerCard className="hero-frame hero-frame-mid">
              <Link to="/work/crimenet" className="frame-inner">
                <div className="frame-label"><span>02</span><b>CRIMENET AI</b></div>
                <img src={crimenet} alt="CRIMENET AI project screen" loading="eager" decoding="async" />
              </Link>
            </PointerCard>

            <PointerCard className="hero-frame hero-frame-front">
              <Link to="/work/trak-twin" className="frame-inner">
                <div className="frame-label"><span>03</span><b>TRAK TWIN</b></div>
                <img src={trakTwin} alt="TRAK TWIN project screen" loading="eager" decoding="async" />
              </Link>
            </PointerCard>
          </div>

          <div className="hero-caption">
            <span>DESIGN · BUILD · REFINE</span>
            <span>HOVER THE SCREENS</span>
          </div>
        </div>
      </section>

      <section className="signal-strip container" data-reveal>
        <div className="signal-intro">
          <span>HOW I APPROACH A SCREEN</span>
          <b>Not more elements. Better relationships.</b>
        </div>
        <div className="signal-items">
          <div className="signal-item">
            <span>01</span>
            <strong>Structure</strong>
            <p>Make information easy to find.</p>
          </div>
          <div className="signal-item">
            <span>02</span>
            <strong>Interaction</strong>
            <p>Make the next action obvious.</p>
          </div>
          <div className="signal-item">
            <span>03</span>
            <strong>Visual clarity</strong>
            <p>Let hierarchy do the talking.</p>
          </div>
        </div>
      </section>

      <section className="work-featured container">
        <div className="section-head" data-reveal>
          <div>
            <div className="eyebrow"><span className="dot" /> SELECTED WORK</div>
            <h2>A few problems I’ve worked through.</h2>
          </div>
          <Link to="/work" className="section-action">View all work <span>↗</span></Link>
        </div>

        <div className="featured-projects">
          {projectList.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="workflow-showcase">
        <div className="container">
          <div className="workflow-header" data-reveal>
            <div>
              <div className="eyebrow"><span className="dot" /> DESIGN LENS</div>
              <h2>I like interfaces that make the <em>next step</em> obvious.</h2>
            </div>
            <p>Across different products, my role often starts with making the problem easier to understand and ends with making the interface easier to use.</p>
          </div>

          <div className="lens-grid" data-reveal>
            <LensCard
              number="01"
              title="Understand"
              body="Untangle the information before styling the interface."
              visual={<div className="lens-visual lens-understand"><span>Problem</span><i>→</i><span>Structure</span><i>→</i><span>Interface</span></div>}
            />
            <LensCard
              number="02"
              title="Connect"
              body="Relate content, states and actions so screens feel like one product."
              visual={<div className="lens-visual lens-connect"><i /><i /><i /><i /><i /></div>}
            />
            <LensCard
              number="03"
              title="Refine"
              body="Remove friction, clarify hierarchy and tighten the final interactions."
              visual={<div className="lens-visual lens-refine"><span>Too much</span><b>→</b><span>Just enough</span></div>}
            />
          </div>
        </div>
      </section>

      <section className="about-preview container" data-reveal>
        <div className="about-preview-copy">
          <div className="eyebrow"><span className="dot" /> A LITTLE ABOUT ME</div>
          <h2>Designer first.<br /><em>Frontend-aware.</em></h2>
          <p>
            I enjoy working across information architecture, interaction design and visual systems.
            My frontend background helps me think about responsive behaviour, components and how a design actually survives implementation.
          </p>
          <Link className="button button-outline" to="/about">Meet me <span>↗</span></Link>
        </div>

        <div className="about-graphic" aria-hidden="true">
          <div className="graphic-note note-one">structure</div>
          <div className="graphic-note note-two">interaction</div>
          <div className="graphic-note note-three">visual</div>
          <div className="graphic-ring ring-one" />
          <div className="graphic-ring ring-two" />
          <div className="graphic-center">
            <span>UI</span>
            <span>UX</span>
          </div>
        </div>
      </section>

      <section className="home-contact container" data-reveal>
        <div className="home-contact-top">
          <div className="eyebrow"><span className="dot" /> NEXT PROJECT?</div>
          <span>LET’S MAKE IT CLEAR.</span>
        </div>
        <Link className="home-contact-link" to="/contact">
          <span>Let’s talk</span>
          <b>↗</b>
        </Link>
      </section>
    </div>
  );
}

function FeaturedProject({ project, reverse }) {
  return (
    <article className={`featured-project ${reverse ? 'reverse' : ''}`} data-reveal>
      <Link to={`/work/${project.slug}`} className={`feature-visual tone-${project.tone}`}>
        <div className="feature-corner">
          <span>{project.number}</span>
          <span>{project.kicker}</span>
        </div>
        <div className="feature-image">
          <img src={project.image} alt={`${project.title} interface`} loading="lazy" decoding="async" />
        </div>
        <div className="feature-hover">
          <span>Open case study</span>
          <b>↗</b>
        </div>
      </Link>

      <div className="feature-copy">
        <div className="feature-index">{project.number} / 03</div>
        <div className="feature-text">
          <span className="feature-kicker">{project.role}</span>
          <h3>{project.title}</h3>
          <h4>{project.subtitle}</h4>
          <p>{project.summary}</p>
          <Link className="feature-link" to={`/work/${project.slug}`}>
            See how I approached it <span>↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function LensCard({ number, title, body, visual }) {
  return (
    <PointerCard className="lens-card">
      <div className="lens-head">
        <span>{number}</span>
        <h3>{title}</h3>
      </div>
      <p>{body}</p>
      <div className="lens-art">{visual}</div>
    </PointerCard>
  );
}

function Work() {
  useReveal();

  return (
    <div className="page container page-top work-page">
      <div className="page-heading split-heading" data-reveal>
        <div>
          <div className="eyebrow"><span className="dot" /> WORK</div>
          <h1>Selected work, with the thinking behind it.</h1>
        </div>
        <p>Three projects across professional services, complex intelligence and travel products.</p>
      </div>

      <div className="work-archive">
        {projectList.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} reverse={index % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function ProjectPage({ project }) {
  useReveal();

  return (
    <div className={`case-study page-top case-${project.tone}`}>
      <section className="case-hero container" data-reveal>
        <div className="case-topline">
          <span className="eyebrow"><span className="dot" /> PROJECT {project.number}</span>
          <Link className="case-back" to="/work">← All work</Link>
        </div>

        <div className="case-title-wrap">
          <div>
            <span className="case-kicker">{project.kicker}</span>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          <div className="case-facts">
            <div><span>ROLE</span><strong>{project.role}</strong></div>
            <div><span>FOCUS</span><strong>Information architecture · Interaction · UI</strong></div>
            <div><span>LINK</span><a href={project.live} target="_blank" rel="noreferrer">Open live product ↗</a></div>
          </div>
        </div>
      </section>

      <section className="case-image-wrap container" data-reveal>
        <div className="case-image-ambient" />
        <div className="case-image">
          <img src={project.image} alt={`${project.title} full project preview`} loading="eager" decoding="async" />
          <div className="case-image-caption">
            <span>{project.number} / FINAL INTERFACE</span>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      <CaseSection title="The problem" index="01"><p>{project.problem}</p></CaseSection>
      <CaseSection title="Who is it for?" index="02"><p>{project.users}</p></CaseSection>
      <CaseSection title="My responsibility" index="03"><p>{project.responsibility}</p></CaseSection>

      <section className="case-section case-workflow" data-reveal>
        <div className="container">
          <div className="case-section-top">
            <span>04</span>
            <div className="case-section-label">THE WORKFLOW</div>
          </div>
          <div className="case-flow-line" />
          <div className="case-workflow-grid">
            {project.workflow.map((step, i) => (
              <div className="case-flow-step" key={step}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-decisions" data-reveal>
        <div className="container">
          <div className="case-section-top">
            <span>05</span>
            <div className="case-section-label">KEY DESIGN DECISIONS</div>
          </div>
          <div className="decision-list">
            {project.decisions.map(([title, body], i) => (
              <DecisionRow key={title} index={i + 1} title={title} body={body} />
            ))}
          </div>
        </div>
      </section>

      <section className="case-end container" data-reveal>
        <div>
          <div className="eyebrow"><span className="dot" /> TAKE A CLOSER LOOK</div>
          <h2>See the product in context.</h2>
        </div>
        <a className="button button-primary" href={project.live} target="_blank" rel="noreferrer">Open project <span>↗</span></a>
      </section>
    </div>
  );
}

function DecisionRow({ index, title, body }) {
  const [open, setOpen] = React.useState(false);
  return (
    <button className={`decision-row ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)}>
      <span className="decision-index">{String(index).padStart(2, '0')}</span>
      <span className="decision-title">{title}</span>
      <span className="decision-toggle">{open ? '−' : '+'}</span>
      <span className="decision-body">{body}</span>
    </button>
  );
}

function CaseSection({ title, index, children }) {
  return (
    <section className="case-section case-text-section" data-reveal>
      <div className="container case-text-grid">
        <div className="case-section-top">
          <span>{index}</span>
          <div className="case-section-label">{title.toUpperCase()}</div>
        </div>
        <div className="case-section-body">{children}</div>
      </div>
    </section>
  );
}

function About() {
  useReveal();

  return (
    <div className="page container page-top about-page">
      <section className="about-intro" data-reveal>
        <div className="about-intro-copy">
          <div className="eyebrow"><span className="dot" /> ABOUT</div>
          <h1>I’m Lakshay.<br /><span>A UI/UX designer.</span></h1>
          <p className="about-intro-line">I turn <em>complex information</em> into clear, usable interfaces.</p>
          <p className="about-intro-body">I like figuring out what should be on a screen before deciding how that screen should look. My work sits across information architecture, interaction design and visual systems, with a frontend background that keeps the final experience practical to build and responsive to use.</p>
        </div>

        <div className="about-character-stage" data-reveal>
          <img className="about-character" src={aboutCharacter} alt="Illustration of Lakshay working on a laptop" />
        </div>
      </section>

      <div className="about-story" data-reveal>
        <div className="story-lead">Good interfaces make the next step feel natural.</div>
        <div className="story-body">
          <p>I care about making information understandable before making it decorative. That usually starts with structure: what belongs together, what deserves attention, and what the user needs next.</p>
          <p>My frontend background adds an implementation-aware perspective. I think about components, responsive behaviour and the practical details that make a design survive beyond the static screen.</p>
        </div>
      </div>

      <div className="about-toolkit" data-reveal>
        <div className="toolkit-heading">
          <div className="eyebrow"><span className="dot" /> TOOLKIT</div>
          <p>The things I use to take an idea from structure to screen.</p>
        </div>
        <div className="toolkit-grid">
          <div className="toolkit-card"><span>UX</span><strong>User flows</strong><strong>Information architecture</strong><strong>Wireframing</strong><strong>Interaction design</strong></div>
          <div className="toolkit-card"><span>UI</span><strong>Visual hierarchy</strong><strong>Typography</strong><strong>Responsive design</strong><strong>Component-based design</strong></div>
          <div className="toolkit-card"><span>TOOLS</span><strong>Figma</strong><strong>Framer</strong><strong>React</strong><strong>Tailwind</strong><strong>WordPress</strong></div>
        </div>
      </div>

      <div className="about-details" data-reveal>
        <div><span>BASED IN</span><strong>Jaipur, India</strong></div>
        <div><span>EDUCATION</span><strong>B.Tech · Computer Science & Engineering</strong></div>
        <div><span>WHAT I ENJOY</span><strong>Products with complex information, meaningful interactions and room for visual craft.</strong></div>
        <div><span>WORKING STYLE</span><strong>Curious, structured, implementation-aware.</strong></div>
      </div>

      <section className="about-resume-cta" data-reveal>
        <div>
          <div className="eyebrow"><span className="dot" /> RESUME</div>
          <h2>Want the condensed version?</h2>
          <p>My experience, selected work, skills and education are available in my resume.</p>
        </div>
        <div className="about-resume-actions">
          <a className="button button-primary" href={resumePdf} target="_blank" rel="noopener noreferrer">View resume <span>↗</span></a>
          <a className="text-link" href={resumePdf} download="Lakshay-Pareek-UIUX-Resume.pdf">Download PDF <span>↓</span></a>
        </div>
      </section>
    </div>
  );
}
function Contact() {
  useReveal();

  return (
    <div className="page container page-top contact-page">
      <section className="contact-hero">
        <div className="contact-copy" data-reveal>
          <div className="eyebrow"><span className="dot" /> CONTACT</div>
          <h1>Have a product that needs more <em>clarity?</em></h1>
          <p className="contact-intro">
            I’m open to UI/UX roles, product design work, and thoughtful collaboration where design can make complex things clearer.
          </p>
        </div>

        <div className="contact-visual" data-reveal>
          <div className="contact-visual-note">
            <span>GOOD DESIGN</span>
            <strong>BETTER<br />CONVERSATIONS.</strong>
          </div>
          <img
            className="contact-character"
            src={aboutCharacter}
            alt="Illustration of Lakshay working on a laptop"
          />
          <div className="contact-visual-tag">LET’S TALK ↗</div>
        </div>
      </section>

      <section className="contact-details-block" data-reveal>
        <div className="contact-grid">
          <a
            className="contact-card pointer-card"
            href="mailto:lakshaypareek1805@gmail.com"
            aria-label="Email Lakshay Pareek"
          >
            <span>01 · EMAIL</span>
            <strong>lakshaypareek1805@gmail.com</strong>
            <b>↗</b>
          </a>

          <a
            className="contact-card pointer-card"
            href="https://www.linkedin.com/in/lakshaypareek/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Lakshay Pareek on LinkedIn"
          >
            <span>02 · LINKEDIN</span>
            <strong>linkedin.com/in/lakshaypareek/</strong>
            <b>↗</b>
          </a>

          <a
            className="contact-card pointer-card"
            href="https://github.com/Lakshay1081"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Lakshay Pareek on GitHub"
          >
            <span>03 · GITHUB</span>
            <strong>github.com/Lakshay1081</strong>
            <b>↗</b>
          </a>
        </div>

        <div className="contact-note">
          <div>
            <span>BASED IN</span>
            <strong>Jaipur, India</strong>
          </div>
          <div>
            <span>OPEN TO</span>
            <strong>UI/UX opportunities</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/vidhinaad" element={<ProjectPage project={projects.vidhinaad} />} />
          <Route path="/work/crimenet" element={<ProjectPage project={projects.crimenet} />} />
          <Route path="/work/trak-twin" element={<ProjectPage project={projects.trakTwin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
