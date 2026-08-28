import { useEffect, useState } from 'react';
import { useLang } from '../i18n/lang';
import { Seal, StarField } from './Geo';
import { MenuIcon, CloseIcon } from './icons';
import './Nav.css';

export default function Nav() {
  const { ui, profile, toggle, switchLabelAria } = useLangNav();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // brand = first + last word of the display name
  const brand = profile.about.name.first + ' ' + profile.about.name.last;

  const links = [
    { href: '#about', label: ui.nav.about },
    { href: '#work', label: ui.nav.work },
    { href: '#skills', label: ui.nav.skills },
    { href: '#learning', label: ui.nav.learning },
    { href: '#recognition', label: ui.nav.recognition },
    { href: '#contact', label: ui.nav.contact },
  ];

  return (
    <header className={`nav ${scrolled || open ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner wrap">
        <a href="#top" className="nav__brand" aria-label={brand} onClick={() => setOpen(false)}>
          <Seal size={12} className="nav__seal" />
          <span className="display">{brand}</span>
          <Seal size={12} className="nav__seal" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <button type="button" className="nav__lang" onClick={toggle} aria-label={switchLabelAria}>
            {ui.switchLabel}
          </button>
          <button
            type="button"
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__menu" role="dialog" aria-label="Menu">
          <StarField color="var(--paper)" opacity={0.08} tile={88} />
          <nav className="nav__menu-links" aria-label="Primary mobile">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="display"
                style={{ animationDelay: `${i * 45}ms` }}
                onClick={() => setOpen(false)}
              >
                <Seal size={12} />
                {l.label}
              </a>
            ))}
          </nav>
          <p className="nav__menu-foot">{profile.about.emails[0]}</p>
        </div>
      )}
    </header>
  );
}

// small helper to keep the component body tidy
function useLangNav() {
  const { ui, profile, toggle, lang } = useLang();
  const switchLabelAria = lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English';
  return { ui, profile, toggle, switchLabelAria };
}
