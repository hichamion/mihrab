import React from 'react';
import { UserRole } from '../types';
import { DuaArt, MihrabArt } from './HeroArt';
import { HERO_PHOTOS } from '../config';
import { 
  ArrowLeft, 
  BarChart3,
  Plus,
  ShieldCheck,
  LogIn
} from 'lucide-react';

interface HeroSectionProps {
  onOpenImamList: () => void;
  onOpenMosqueList: () => void;
  onOpenImamAddModal: () => void;
  onOpenMosqueAddModal: () => void;
  onOpenDashboard: () => void;
  onOpenAuthModal: () => void;
  onOpenAdminPanel: () => void;
  currentRole: UserRole;
  imamsCount: number;
  mosquesCount: number;
  pendingCount: number;
  /** Hide the statistics button until there is enough data. */
  showStats: boolean;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenImamList,
  onOpenMosqueList,
  onOpenImamAddModal,
  onOpenMosqueAddModal,
  onOpenDashboard,
  onOpenAuthModal,
  onOpenAdminPanel,
  currentRole,
  imamsCount,
  mosquesCount,
  pendingCount,
  showStats,
  onOpenContact,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      {/* Soft ambient background tint */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Clean Minimal Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-sm font-bold text-emerald-800 tracking-wide">
            منصة للربط بين الأئمة والقرّاء والمساجد في أوروبا
          </p>

          <h1 className="text-4xl sm:text-6xl text-slate-900 font-maghribi">
            منصة <span className="text-emerald-700">محراب</span> للأئمة والمساجد
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            إمام أو قارئ يبحث عن مسجد؟ أو مسجد يبحث عن إمام لرمضان أو لعقد دائم؟ ابدأ من هنا.
          </p>
        </div>

        {/* Two Simple, Uncluttered, Large-Typography Portal Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">

          {/* GREEN BOX: Available Imams List */}
          <div
            {...cardLink(onOpenImamList)}
            className="relative overflow-hidden isolate bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white rounded-3xl p-7 sm:p-9 shadow-xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 border border-emerald-600/40 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            <CardBackground photo={HERO_PHOTOS.imams} art={<DuaArt />} tint="from-emerald-900/60 via-emerald-800/10 to-emerald-950/85" />
            <div className="space-y-5 text-center sm:text-right">
              <div className="flex items-center justify-end">
                <span className="text-emerald-100 text-sm font-bold tabular-nums">
                  {imamsCount > 0 ? `${imamsCount} إمام متاح حالياً` : 'كن أول إمام يسجّل في محراب'}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-maghribi drop-shadow">
                  قائمة الأئمة المتوفرين
                </h2>
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  ملفات الأئمة والقرّاء المتاحين مع رواياتهم وتلاواتهم، أو سجّل ملفك كإمام.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-8 mt-6 border-t border-emerald-600/50">
              <button
                onClick={stop(onOpenImamList)}
                className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-4 px-6 rounded-2xl text-sm sm:text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>عرض قائمة الأئمة المتوفرين</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={stop(onOpenImamAddModal)}
                className="w-full bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm border border-emerald-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>التسجيل كإمام جديد</span>
              </button>
            </div>
          </div>

          {/* LIGHT BLUE GRADIENT BOX: Available Mosques & Associations List */}
          <div
            {...cardLink(onOpenMosqueList)}
            className="relative overflow-hidden isolate bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white rounded-3xl p-7 sm:p-9 shadow-xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 border border-sky-400/40 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            <CardBackground photo={HERO_PHOTOS.mosques} art={<MihrabArt />} tint="from-sky-700/60 via-sky-600/10 to-blue-900/85" />
            <div className="space-y-5 text-center sm:text-right">
              <div className="flex items-center justify-end">
                <span className="text-sky-100 text-sm font-bold tabular-nums">
                  {mosquesCount > 0 ? `${mosquesCount} مسجد يبحث عن إمام` : 'انشر أول إعلان على محراب'}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-maghribi drop-shadow">
                  قائمة المساجد والجمعيات
                </h2>
                <p className="text-sm text-sky-100/95 leading-relaxed">
                  المساجد والجمعيات التي تبحث عن إمام وشروطها، أو انشر إعلان مسجدك.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-8 mt-6 border-t border-sky-400/40">
              <button
                onClick={stop(onOpenMosqueList)}
                className="w-full bg-white hover:bg-sky-50 text-sky-950 font-black py-4 px-6 rounded-2xl text-sm sm:text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>عرض قائمة المساجد المتوفرة</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={stop(onOpenMosqueAddModal)}
                className="w-full bg-sky-950/50 hover:bg-sky-950/80 text-white font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm border border-sky-300/40 transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة إعلان مسجد جديد</span>
              </button>
            </div>
          </div>

        </div>

        {/* Clean Secondary Bar for Statistics Dashboard & Quick Login/Admin */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {showStats && (
          <button
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer whitespace-nowrap"
          >
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <span>إحصائيات المنصة</span>
          </button>
          )}

          {currentRole === 'visitor' && (
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>تسجيل الدخول</span>
            </button>
          )}

          {currentRole === 'admin' && (
            <button
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة الإدارة والطلبات الجديدة ({pendingCount})</span>
            </button>
          )}
        </div>

      </div>

      <HowItWorks onOpenContact={onOpenContact} />
    </section>
  );
};

/** Makes a whole card act like a link (click, Enter or Space), while inner buttons keep their own action. */
const cardLink = (onOpen: () => void) => ({
  role: 'link',
  tabIndex: 0,
  onClick: onOpen,
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onOpen();
    }
  },
});

const stop = (fn: () => void) => (e: React.MouseEvent) => {
  e.stopPropagation();
  fn();
};

/**
 * Card background: a real photo if one is configured (HERO_PHOTOS), otherwise the drawn illustration.
 * Either way it is blended into the card colour and covered by a tint so it never dominates the text.
 */
const CardBackground: React.FC<{ photo: string; art: React.ReactNode; tint: string }> = ({ photo, art, tint }) => (
  <div className="absolute inset-0 -z-10" aria-hidden>
    {photo ? (
      <img
        src={`${import.meta.env.BASE_URL}${photo}`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
      />
    ) : (
      <div className="absolute inset-0 opacity-45 mix-blend-soft-light">{art}</div>
    )}
    <div className={`absolute inset-0 bg-gradient-to-b ${tint}`} />
  </div>
);

const STEPS = [
  {
    title: 'سجّل دخولك واختر نوع حسابك',
    text: 'بحساب جوجل أو بالبريد الإلكتروني. اختر «إمام / قارئ» أو «مسجد / جمعية».',
  },
  {
    title: 'أنشئ ملفك أو إعلانك',
    text: 'الإمام: السيرة والرواية ورابط التلاوة وحالة التأشيرة. المسجد: المدينة ونوع الإمام المطلوب والشروط.',
  },
  {
    title: 'تراجعه الإدارة ثم يُنشر',
    text: 'لا يظهر أي ملف أو إعلان للعموم قبل موافقة الإدارة، حفاظاً على جدية المنصة.',
  },
  {
    title: 'تواصلوا مباشرة',
    text: 'يتقدم الإمام للإعلان، أو يطلب المسجد مقابلة. أرقام الأئمة لا تظهر إلا للمساجد الموثقة.',
  },
];

const FAQ = [
  {
    q: 'هل التسجيل مجاني؟',
    a: 'نعم، التسجيل ونشر الملفات والإعلانات مجاني.',
  },
  {
    q: 'من يرى رقم هاتفي كإمام؟',
    a: 'لا يظهر رقمك ولا بريدك للزوار. تراه فقط حسابات المساجد التي وثقتها الإدارة، والإدارة نفسها.',
  },
  {
    q: 'متى يصبح حساب المسجد موثقاً؟',
    a: 'عندما توافق الإدارة على أول إعلان له. عندها يمكنه رؤية بيانات تواصل الأئمة المعتمدين.',
  },
  {
    q: 'هل يمكنني حذف حسابي؟',
    a: 'نعم، في أي وقت من قائمة الحساب. تُحذف ملفاتك وإعلاناتك ورسائلك نهائياً.',
  },
];

const HowItWorks: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => (
  <div id="how-it-works" className="relative z-10 max-w-5xl mx-auto mt-16 space-y-12 scroll-mt-24">
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-amiri text-center">كيف تعمل المنصة؟</h2>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black flex items-center justify-center text-sm">
              {i + 1}
            </span>
            <h3 className="font-black text-slate-900">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>

    <div className="space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-amiri text-center">أسئلة شائعة</h2>
      <div className="space-y-2">
        {FAQ.map((item) => (
          <details key={item.q} className="group bg-white border border-slate-200 rounded-2xl px-5 py-4">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-3">
              <span>{item.q}</span>
              <span className="text-emerald-700 text-lg transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="text-center text-sm text-slate-600 pt-2">
        لم تجد جواب سؤالك؟{' '}
        <button onClick={onOpenContact} className="text-emerald-800 font-bold underline cursor-pointer">
          راسل الإدارة أو أرسل اقتراحاً
        </button>
      </p>
    </div>
  </div>
);
