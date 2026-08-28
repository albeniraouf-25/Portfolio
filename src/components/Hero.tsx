import { useLang } from '../i18n/lang';
import { locNum } from '../data/format';
import { StarField, Seal } from './Geo';
import { GithubIcon, FacebookIcon, InstagramIcon } from './icons';
import './Hero.css';

const accountIcon: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export default function Hero() {
  const { ui, profile, lang } = useLang();
  const { about } = profile;
  const years = new Date().getFullYear() - 2020;


  return (
    <section id="top" className="hero">
      <StarField className="hero__field" color="var(--ink)" opacity={0.05} tile={120} />

      <div className="wrap hero__inner">
        <div className="hero__intro">
          <p className="display kicker">
            {ui.hero.kicker}
          </p>

          <h1 className="display hero__name">
            <span className="hero__name-2">{about.name.first}</span>{' '}
            {about.name.father}{' '}
            {about.name.last}
          </h1>

          <div className="hero__actions">
            <a className="btn btn--solid" href="#work">
              {ui.hero.seeWork}
            </a>
            <a className="btn btn--outline" href={`mailto:${about.emails[0]}`}>
              {about.emails[0]}
            </a>
          </div>

          <div className="hero__meta">
            <div className="hero__social">
              {about.accounts.map((a) => {
                const I = accountIcon[a.icon] ?? GithubIcon;
                return (
                  <a
                    key={a.website}
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={a.website}
                    className="hero__social-link"
                  >
                    <I size={18} />
                  </a>
                );
              })}
            </div>
            <p className="hero__origin">{ui.hero.madeIn}</p>
          </div>
        </div>

        <div className="hero__portrait-wrap">
          <div className="hero__panel">
            <StarField color="var(--paper)" opacity={0.1} tile={72} strokeWidth={1.1} />
            <div className="hero__star">
              <img src={about.profileImage} alt={about.name.first+" "+about.name.father+" "+about.name.last} loading="eager" />
            </div>
          </div>

          <dl className="hero__stats">
          <span className="hero__stat-sep" aria-hidden>
              <Seal size={12} />
            </span>
            <div>
              <dt>{locNum(years, lang)}+</dt>
              <dd>{ui.hero.stats.years}</dd>
            </div>
            <span className="hero__stat-sep" aria-hidden>
              <Seal size={12} />
            </span>
          </dl>
        </div>
      </div>
    </section>
  );
}
