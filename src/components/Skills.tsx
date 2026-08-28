import { useLang, tmpl } from '../i18n/lang';
import { locNum } from '../data/format';
import { Seal } from './Geo';
import { useReveal } from '../hooks/useReveal';
import './Skills.css';

export default function Skills() {
  const { ui, profile, skillGroups, restGroupLabel, lang } = useLang();
  const { ref, shown } = useReveal<HTMLDivElement>();

  const claimed = new Set(skillGroups.flatMap((g) => g.items));
  const rest = profile.skills.filter((s) => !claimed.has(s));

  const groups = [...skillGroups, { label: restGroupLabel, items: rest }].map((g) => ({
    ...g,
    items: g.items.filter((i) => profile.skills.includes(i)),
  }));

  return (
    <section id="skills" className="skills">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-index">{ui.skills.index}</span>
          <div className="sec-titles">
            <p className="kicker">{ui.skills.kicker}</p>
            <h2 className="display">{tmpl(ui.skills.title, { n: locNum(profile.skills.length, lang) })}</h2>
          </div>
        </div>

        <div ref={ref} className={`skills__list reveal ${shown ? 'is-in' : ''}`}>
          {groups.map((g, gi) => (
            <div className="skgroup" key={g.label} style={{ transitionDelay: `${gi * 70}ms` }}>
              <div className="skgroup__label">
                <Seal size={13} />
                <span>{g.label}</span>
                <span className="skgroup__count">{locNum(g.items.length, lang)}</span>
              </div>
              <div className="pill-row skgroup__items">
                {g.items.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
