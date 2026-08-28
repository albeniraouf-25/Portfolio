import type { Lang } from './content';

const MONTHS: Record<Lang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  // Levantine (Syrian) month names — apt for a Suwaydan CV.
  ar: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
};

/** Localise a number's digits (Eastern-Arabic in Arabic mode). */
export function locNum(n: number, lang: Lang): string {
  const s = String(n);
  if (lang !== 'ar') return s;
  const east = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return s.replace(/\d/g, (d) => east[Number(d)]);
}

export function isPresent(end?: Date): boolean {
  return !end;
}

export function monthYear(d: Date, lang: Lang): string {
  return `${MONTHS[lang][d.getMonth()]} ${locNum(d.getFullYear(), lang)}`;
}

function monthsBetween(start: Date, end: Date): number {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
}

/** Arabic count noun with light pluralisation (1, 2, 3–10, 11+). */
function arCount(n: number, forms: [string, string, string, string]): string {
  const [one, two, few, many] = forms;
  if (n === 1) return one;
  if (n === 2) return two;
  if (n >= 3 && n <= 10) return `${locNum(n, 'ar')} ${few}`;
  return `${locNum(n, 'ar')} ${many}`;
}

export function duration(start: Date, end: Date | undefined, lang: Lang): string {
  const total = Math.max(1, monthsBetween(start, end ?? new Date()));
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];

  if (lang === 'ar') {
    if (years) parts.push(arCount(years, ['سنة', 'سنتان', 'سنوات', 'سنة']));
    if (months) parts.push(arCount(months, ['شهر', 'شهران', 'أشهر', 'شهراً']));
    return parts.join(' و') || 'شهر';
  }

  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

export function dateRange(start: Date, end: Date | undefined, lang: Lang, presentLabel: string): string {
  const dash = lang === 'ar' ? ' — ' : ' — ';
  return `${monthYear(start, lang)}${dash}${end ? monthYear(end, lang) : presentLabel}`;
}
