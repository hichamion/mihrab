import amiri700 from '@fontsource/amiri/files/amiri-arabic-700-normal.woff2?url';
import cairo400 from '@fontsource/cairo/files/cairo-arabic-400-normal.woff2?url';
import cairo700 from '@fontsource/cairo/files/cairo-arabic-700-normal.woff2?url';
import { ImamContact, ImamProfile } from '../types';
import { formatDate, getSafeImamAvatar } from '../utils/helpers';

const AVAILABILITY: Record<ImamProfile['availabilityState'], string> = {
  available_now: 'متاح فوراً',
  busy_ramadan: 'ملتزم في رمضان، متاح بعده',
  paused: 'غير متاح حالياً',
};

/** Escapes user-written text before it goes into the CV's HTML. */
const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const abs = (url: string) => new URL(url, window.location.href).href;

const row = (label: string, value: string) =>
  value.trim() ? `<tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>` : '';

/**
 * Builds a printable one-page CV from an imam profile. Contact details are included only when passed
 * (i.e. when the viewer is allowed to see them).
 */
export function buildCvHtml(imam: ImamProfile, contact: ImamContact | null): string {
  const photo = getSafeImamAvatar(imam.photo);
  const details = [
    row('العمر', imam.age ? `${imam.age} سنة` : ''),
    row('البلد', imam.country),
    row('الرواية', imam.riwaya),
    row('المؤهل العلمي', imam.degree),
    row('اللغات', imam.languages),
    row('اللغة الألمانية', imam.germanLevel && imam.germanLevel !== 'none' ? `مستوى ${imam.germanLevel}` : ''),
    row('التأشيرة / الإقامة', imam.hasVisa === 'yes' ? imam.visaDetails || 'نعم' : 'لا'),
    row('الشواهد والإجازات', imam.hasCerts === 'yes' ? 'نعم' : 'لا'),
    row('حالة التفرغ', AVAILABILITY[imam.availabilityState] ?? ''),
    row('الالتزام في رمضان', imam.ramadanNote),
    row('متاح للتعاقد ابتداءً من', imam.availableAfterDate),
    row('رابط التلاوة', imam.youtubeUrl),
  ].join('');
  const contactRows = contact
    ? [row('الهاتف', contact.phone), row('واتساب', contact.whatsapp), row('البريد الإلكتروني', contact.email)].join('')
    : '';

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>السيرة الذاتية — ${esc(imam.name)}</title>
<style>
  @font-face { font-family: Amiri; src: url(${abs(amiri700)}); font-weight: 700; }
  @font-face { font-family: Cairo; src: url(${abs(cairo400)}); font-weight: 400; }
  @font-face { font-family: Cairo; src: url(${abs(cairo700)}); font-weight: 700; }
  @page { size: A4; margin: 16mm; }
  * { box-sizing: border-box; }
  body { font-family: Cairo, system-ui, sans-serif; color: #0f172a; margin: 0; font-size: 13px; line-height: 1.7; }
  header { display: flex; align-items: center; gap: 18px; border-bottom: 3px solid #064e3b; padding-bottom: 14px; }
  header img { width: 96px; height: 96px; border-radius: 14px; object-fit: cover; border: 2px solid #f59e0b; }
  h1 { font-family: Amiri, serif; font-size: 30px; margin: 0; color: #064e3b; }
  .sub { color: #475569; margin: 2px 0 0; }
  h2 { font-family: Amiri, serif; font-size: 19px; color: #064e3b; margin: 20px 0 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: right; width: 34%; color: #334155; font-weight: 700; padding: 5px 0; vertical-align: top; }
  td { padding: 5px 0; word-break: break-word; }
  .bio { white-space: pre-wrap; }
  footer { margin-top: 28px; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 8px; }
  .hint { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 10px 14px; border-radius: 10px; margin-bottom: 16px; }
  @media print { .hint { display: none; } }
</style>
</head>
<body>
  <p class="hint">لحفظ السيرة الذاتية كملف PDF: اختر «حفظ بصيغة PDF» (Save as PDF) في نافذة الطباعة.</p>
  <header>
    <img src="${photo}" alt="">
    <div>
      <h1>${esc(imam.name)}</h1>
      <p class="sub">إمام وقارئ — ${esc(imam.riwaya)}</p>
    </div>
  </header>

  <h2>البيانات الشخصية والمؤهلات</h2>
  <table>${details}</table>

  ${imam.cvText.trim() ? `<h2>السيرة الذاتية</h2><p class="bio">${esc(imam.cvText)}</p>` : ''}

  ${contactRows ? `<h2>بيانات التواصل</h2><table>${contactRows}</table>` : ''}

  <footer>صادرة من منصة محراب — ${esc(formatDate(new Date().toISOString()))}</footer>
  <script>
    document.fonts.ready.then(function () { setTimeout(function () { window.print(); }, 300); });
  </script>
</body>
</html>`;
}

/** Opens the CV in a new tab and shows the print dialog ("Save as PDF"). Returns false if the tab was blocked. */
export function openImamCv(imam: ImamProfile, contact: ImamContact | null): boolean {
  const win = window.open('', '_blank');
  if (!win) return false;
  win.document.open();
  win.document.write(buildCvHtml(imam, contact));
  win.document.close();
  return true;
}
