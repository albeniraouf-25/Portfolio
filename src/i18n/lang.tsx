import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { content, type Content, type Lang, type Loc, type UiStrings, type Account } from '../data/content';

/* Resolved shapes — what components actually consume (plain strings + Dates). */
export interface About {
  name: { first: string, father: string, last: string };
  job: string;
  profileImage: string;
  birthDate: Date;
  address: string;
  addressOnMap: string;
  languages: string[];
  accounts: Account[];
  whoAmI: string;
  emails: string[];
  phones: string[];
}
export interface Company {
  name: string;
  location: string;
  link: string;
  description: string;
  image?: string;
  showName: boolean;
}
export interface Position {
  title: string;
  type: string;
  startDate: Date;
  endDate?: Date;
  coreFunctionalities: string[];
  technologiesAndLanguages: string[];
}
export interface Experience {
  company: Company;
  positions: Position[];
}
export interface Education {
  college: string;
  icon?: string;
  startDate: Date;
  endDate?: Date;
  title: string;
  description: string;
  achievements: string[];
}
export interface Certificate {
  date: Date;
  title: string;
  description: string;
  origin: string;
  img: string;
  link?: string;
}
export interface SkillGroup {
  label: string;
  items: string[];
}
export interface Profile {
  about: About;
  experiences: Experience[];
  skills: string[];
  educations: Education[];
  certifications: Certificate[];
}
export interface Resolved {
  ui: UiStrings;
  profile: Profile;
  skillGroups: SkillGroup[];
  restGroupLabel: string;
}

const pick = <T,>(loc: Loc<T>, lang: Lang): T => loc[lang];
const date = (iso: string) => new Date(iso);

/** Collapse the bilingual content object down to a single language. */
export function getContent(lang: Lang): Resolved {
  const c: Content = content;
  const p = c.profile;
  return {
    ui: c.ui[lang],
    restGroupLabel: pick(c.restGroupLabel, lang),
    skillGroups: c.skillGroups.map((g) => ({ label: pick(g.label, lang), items: g.items })),
    profile: {
      skills: p.skills,
      about: {
        name: pick(p.about.name, lang),
        job: pick(p.about.job, lang),
        profileImage: p.about.profileImage,
        birthDate: date(p.about.birthDate),
        address: pick(p.about.address, lang),
        addressOnMap: p.about.addressOnMap,
        languages: pick(p.about.languages, lang),
        accounts: p.about.accounts,
        whoAmI: pick(p.about.whoAmI, lang),
        emails: p.about.emails,
        phones: p.about.phones,
      },
      experiences: p.experiences.map((e) => ({
        company: {
          name: pick(e.company.name, lang),
          location: pick(e.company.location, lang),
          link: e.company.link,
          description: pick(e.company.description, lang),
          image: e.company.image,
          showName: e.company.showName,
        },
        positions: e.positions.map((pos) => ({
          title: pick(pos.title, lang),
          type: pick(pos.type, lang),
          startDate: date(pos.startDate),
          endDate: pos.endDate ? date(pos.endDate) : undefined,
          coreFunctionalities: pick(pos.coreFunctionalities, lang),
          technologiesAndLanguages: pos.technologiesAndLanguages,
        })),
      })),
      educations: p.educations.map((ed) => ({
        college: pick(ed.college, lang),
        icon: ed.icon,
        startDate: date(ed.startDate),
        endDate: ed.endDate ? date(ed.endDate) : undefined,
        title: pick(ed.title, lang),
        description: pick(ed.description, lang),
        achievements: pick(ed.achievements, lang),
      })),
      certifications: p.certifications.map((cert) => ({
        date: date(cert.date),
        title: pick(cert.title, lang),
        description: pick(cert.description, lang),
        origin: pick(cert.origin, lang),
        img: cert.img,
        link: cert.link,
      })),
    },
  };
}

/* ── React context ─────────────────────────────────────────────────────── */

type Ctx = Resolved & {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangCtx = createContext<Ctx | null>(null);

/** Language is derived from the URL path: `/ar` → Arabic, everything else → English. */
export function langFromPath(): Lang {
  const p = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  return p === '/ar' ? 'ar' : content.settings.defaultLanguage;
}

/** The path for a language, preserving the current in-page hash (#section). */
function pathForLang(l: Lang): string {
  return (l === 'ar' ? '/ar' : '/') + window.location.hash;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(langFromPath);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
  }, [lang, dir]);

  // keep state in sync with back/forward navigation
  useEffect(() => {
    const onPop = () => setLangState(langFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // changing the language navigates: it pushes /ar or / so the URL is shareable
  const setLang = (l: Lang) => {
    if (l !== langFromPath()) {
      window.history.pushState({}, '', pathForLang(l));
    }
    setLangState(l);
  };

  const resolved = useMemo(() => getContent(lang), [lang]);

  const value: Ctx = {
    ...resolved,
    lang,
    dir,
    setLang,
    toggle: () => setLang(lang === 'en' ? 'ar' : 'en'),
  };

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang(): Ctx {
  const v = useContext(LangCtx);
  if (!v) throw new Error('useLang must be used within <LangProvider>');
  return v;
}

/** Fill {placeholders} in a UI string. */
export function tmpl(str: string, vars: Record<string, string | number>): string {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
