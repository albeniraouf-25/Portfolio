import { useLang } from '../i18n/lang';
import { StarField } from './Geo';
import { PinIcon, GlobeIcon, LangIcon } from './icons';
import { useReveal } from '../hooks/useReveal';
import './About.css';

export default function About() {
  const { ui, profile } = useLang();
  const { about } = profile;
  const { ref, shown } = useReveal<HTMLDivElement>();
  const paragraphs = about.whoAmI.split('\n').filter(Boolean);

  return (
    <section id="about" className="about">
      <StarField className="about__field" color="var(--paper)" opacity={0.06} tile={96} />
      <div ref={ref} className={`wrap about__inner reveal ${shown ? 'is-in' : ''}`}>
        <aside className="about__side">
          <span className="about__word">{ui.about.word}</span>
          <p className="kicker about__kicker">{ui.about.kicker}</p>

          <ul className="about__facts">
            <li>
              <PinIcon size={17} />
              <div>
                <span>{ui.about.based}</span>
                <strong>{about.address}</strong>
              </div>
            </li>
            <li>
              <GlobeIcon size={17} />
              <div>
                <span>{ui.about.working}</span>
                <strong>{ui.about.workingValue}</strong>
              </div>
            </li>
            <li>
              <LangIcon size={17} />
              <div>
                <span>{ui.about.languages}</span>
                <strong>{about.languages.map(l=><div key={l}>{l}</div>)}</strong>
              </div>
            </li>
          </ul>
        </aside>

        <div className="about__body">
          <h2 className="display about__lead">{paragraphs[0]}</h2>
          {paragraphs.slice(1).map((p, i) => (
            <p key={i} className="about__p">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
