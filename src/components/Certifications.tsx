import { useLang } from '../i18n/lang';
import { monthYear } from '../data/format';
import { AwardIcon } from './icons';
import { Seal, StarField } from './Geo';
import { useReveal } from '../hooks/useReveal';
import './Certifications.css';

export default function Certifications() {
  const { ui, profile, lang } = useLang();
  const { certifications } = profile;
  const { ref, shown } = useReveal<HTMLDivElement>();

  if (!certifications.length) return null;

  return (
    <section id="recognition" className="certs">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-index">{ui.certs.index}</span>
          <div className="sec-titles">
            <p className="kicker">{ui.certs.kicker}</p>
            <h2 className="display">{ui.certs.title}</h2>
          </div>
        </div>

        <div ref={ref} className={`certs__list reveal ${shown ? 'is-in' : ''}`}>
          {certifications.map((c) => (
            <article key={c.title} className="cert">
              <StarField className="cert__field" color="var(--ink)" opacity={0.04} tile={64} />

              {c.img && (
                <a
                  className="cert__media"
                  href={c.link || c.img}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={c.title}
                >
                  <img src={c.img} alt={c.title} loading="lazy" />
                </a>
              )}

              <div className="cert__body">
                <div className="cert__badge">
                  <AwardIcon size={20} />
                  <span>{c.origin}</span>
                </div>
                <p className="cert__date">{monthYear(c.date, lang)}</p>
                <h3 className="display cert__title">{c.title}</h3>
                <p className="cert__desc">{c.description}</p>
                <p className="cert__mark">
                  <Seal size={12} /> {c.origin}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
