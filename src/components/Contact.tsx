import { useLang } from '../i18n/lang';
import { locNum } from '../data/format';
import { StarField, StarBand } from './Geo';
import {
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from './icons';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

const accountIcon: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export default function Contact() {
  const { ui, profile, lang } = useLang();
  const { about } = profile;
  const { ref, shown } = useReveal<HTMLDivElement>();
  const year = locNum(new Date().getFullYear(), lang);
  const headlineLines = ui.contact.headline.split('\n');

  return (
    <section id="contact" className="contact">
      <StarBand tone="ink" />
      <div className="contact__panel">
        <StarField className="contact__field" color="var(--paper)" opacity={0.07} tile={90} />
        <div ref={ref} className={`wrap contact__inner reveal ${shown ? 'is-in' : ''}`}>
          <p className="contact__word">{ui.contact.word}</p>
          <h2 className="display contact__headline">
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="contact__sub">{ui.contact.sub}</p>

          <div className="contact__grid">
            <div className="contact__col">
              <span className="contact__col-label">{ui.contact.email}</span>
              {about.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="contact__row">
                  <MailIcon size={17} />
                  {e}
                </a>
              ))}
            </div>
            <div className="contact__col">
              <span className="contact__col-label">{ui.contact.phone}</span>
              {about.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="contact__row">
                  <PhoneIcon size={17} />
                  <span dir="ltr">{p}</span>
                </a>
              ))}
            </div>
            <div className="contact__col">
              <span className="contact__col-label">{ui.contact.location}</span>
              <a href={about.addressOnMap} target="_blank" rel="noreferrer" className="contact__row">
                <PinIcon size={17} />
                {about.address}
              </a>
            </div>
          </div>

          <div className="contact__socials">
            {about.accounts.map((a) => {
              const I = accountIcon[a.icon] ?? GithubIcon;
              return (
                <a
                  key={a.website}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__social"
                >
                  <I size={17} />
                  <span>{a.website}</span>
                </a>
              );
            })}
          </div>

          <footer className="contact__foot">
            <span>© {year} {about.name.first} {about.name.last}</span>
            <span className="contact__foot-city">{ui.contact.footerCity}</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
