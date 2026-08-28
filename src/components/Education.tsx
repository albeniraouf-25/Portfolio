import { useLang } from '../i18n/lang';
import { locNum } from '../data/format';
import { Icon } from './icons';
import { Seal } from './Geo';
import { useReveal } from '../hooks/useReveal';
import './Education.css';

export default function Education() {
  const { ui, profile, lang } = useLang();
  const { educations } = profile;
  const { ref, shown } = useReveal<HTMLDivElement>();
  const year = (d?: Date) => (d ? locNum(d.getFullYear(), lang) : ui.work.present);

  return (
    <section id="learning" className="learn">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-index">{ui.learning.index}</span>
          <div className="sec-titles">
            <p className="kicker">{ui.learning.kicker}</p>
            <h2 className="display">{ui.learning.title}</h2>
          </div>
        </div>

        <div ref={ref} className={`learn__grid reveal ${shown ? 'is-in' : ''}`}>
          {educations.map((e) => (
            <article key={e.college} className="lcard">
              <div className="lcard__icon">
                <Icon name={e.icon ?? 'university'} size={22} />
              </div>
              <p className="lcard__span">
                {year(e.startDate)} — {year(e.endDate)}
              </p>
              <h3 className="display">{e.college}</h3>
              <p className="lcard__degree">{e.description}</p>
              <ul className="lcard__list">
                {e.achievements.map((a) => (
                  <li key={a}>
                    <Seal size={11} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
