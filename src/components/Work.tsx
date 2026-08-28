import { useState } from 'react';
import { useLang, tmpl, type Experience, type Position } from '../i18n/lang';
import { dateRange, duration, isPresent, locNum } from '../data/format';
import { Seal, StarField } from './Geo';
import { ArrowIcon, ChevronIcon } from './icons';
import { useReveal } from '../hooks/useReveal';
import './Work.css';

function Tile({ exp, i }: { exp: Experience; i: number }) {
  const { lang, ui } = useLang();
  const { ref, shown } = useReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  const live = exp.positions.some((p) => isPresent(p.endDate));

  const [current, ...older] = exp.positions;
  const hasOlder = older.length > 0;

  // total tenure at this company: earliest start → latest end (or now if still there)
  const totalStart = new Date(Math.min(...exp.positions.map((p) => p.startDate.getTime())));
  const totalEnd = live
    ? undefined
    : new Date(Math.max(...exp.positions.map((p) => p.endDate!.getTime())));
  const totalDuration = duration(totalStart, totalEnd, lang);

  // summary of the collapsed roles: earliest start → most recent end
  const summaryStart = older[older.length - 1]?.startDate;
  const summaryEnd = older[0]?.endDate;
  const olderLabel =
    older.length === 1
      ? ui.work.earlierOne
      : tmpl(ui.work.earlierMany, { n: locNum(older.length, lang) });

  const renderRole = (p: Position, k: number) => (
    <div className="role" key={k}>
      <div className="role__top">
        <h4>{p.title}</h4>
        <span className="role__dates">{dateRange(p.startDate, p.endDate, lang, ui.work.present)}</span>
      </div>
      <p className="role__meta">
        {p.type} · {duration(p.startDate, p.endDate, lang)}
      </p>
      <div className="role__funcs">
        {p.coreFunctionalities.map((f) => (
          <span key={f} className="tag">
            {f}
          </span>
        ))}
      </div>
      <div className="pill-row role__tech">
        {p.technologiesAndLanguages.map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <article
      ref={ref}
      className={`tile reveal ${shown ? 'is-in' : ''} ${live ? 'tile--live' : ''}`}
      style={{ transitionDelay: `${(i % 2) * 90}ms` }}
    >
      <StarField className="tile__field" color="var(--ink)" opacity={0.04} tile={70} />

      <header className="tile__head">
        <div className="tile__logo">
          {exp.company.image ? (
            <img src={exp.company.image} alt={exp.company.name} loading="lazy" />
          ) : (
            <span>{exp.company.name.slice(0, 2)}</span>
          )}
        </div>
        <div className="tile__id">
          <h3 className="display">
            {exp.company.name}
            {exp.company.link && (
              <a
                href={exp.company.link}
                target="_blank"
                rel="noreferrer"
                aria-label={exp.company.name}
                className="tile__link"
              >
                <ArrowIcon size={15} />
              </a>
            )}
          </h3>
          <p className="tile__loc">{exp.company.location}</p>
        </div>
        {/* {live && (
          <span className="tile__badge">
            <Seal size={11} /> {ui.work.present}
          </span>
        )} */}
        <span className="tile__total">
          <Seal size={11} /> {totalDuration}
        </span>
      </header>

      <p className="tile__desc">{exp.company.description}</p>

      <div className="tile__roles">
        {renderRole(current, 0)}

        {hasOlder && (
          <>
            <button
              type="button"
              className={`role-toggle ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              <span className="role-toggle__label">
                <Seal size={10} /> {olderLabel}
              </span>
              <span className="role-toggle__sum">
                {dateRange(summaryStart!, summaryEnd, lang, ui.work.present)} · {duration(summaryStart!, summaryEnd, lang)}
              </span>
              <ChevronIcon size={16} className="role-toggle__chev" />
            </button>

            {open && <div className="roles-older">{older.map((p, k) => renderRole(p, k + 1))}</div>}
          </>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const { ui, profile } = useLang();
  return (
    <section id="work" className="work">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-index">{ui.work.index}</span>
          <div className="sec-titles">
            <p className="kicker">{ui.work.kicker}</p>
            <h2 className="display">{ui.work.title}</h2>
            <p className="lede">{ui.work.lede}</p>
          </div>
        </div>

        <div className="work__grid">
          {profile.experiences.map((exp, i) => (
            <Tile key={exp.company.name + i} exp={exp} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
