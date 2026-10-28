import React from 'react';
import { UserRole } from '../types';
import { DEFAULT_IMAM_SILHOUETTE_AVATAR } from '../utils/helpers';
import { 
  Building2, 
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
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      {/* Soft ambient background tint */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Clean Minimal Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold text-emerald-800 tracking-wide">
            المنصة الموثقة للربط الشرعي والمهني بين الأئمة والمساجد
          </p>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight font-amiri">
            منصة <span className="text-emerald-700">مِحراب</span> للأئمة والمساجد
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            اختر وجهتك مباشرة من القسمين أدناه لتصفح الأئمة المتوفرين أو المساجد التي تبحث عن إمام
          </p>
        </div>

        {/* Two Simple, Uncluttered, Large-Typography Portal Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">

          {/* GREEN BOX: Available Imams List */}
          <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white rounded-3xl p-7 sm:p-9 shadow-xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 border border-emerald-600/40">
            <div className="space-y-5 text-center sm:text-right">
              <div className="flex items-center justify-between">
                <img
                  src={DEFAULT_IMAM_SILHOUETTE_AVATAR}
                  alt="صورة إمام بقبعة"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300/80 shadow-md"
                />
                <span className="text-emerald-100 text-sm font-bold tabular-nums">
                  {imamsCount} إمام متاح حالياً
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <h2 className="text-2xl sm:text-4xl font-black text-white font-amiri leading-snug">
                  قائمة الأئمة المتوفرين
                </h2>
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  اضغط هنا لمشاهدة ملفات الأئمة والقرّاء المتاحين والاستماع لتلاواتهم، أو تسجيل ملفك كإمام جديد.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-8 mt-6 border-t border-emerald-600/50">
              <button
                onClick={onOpenImamList}
                className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-4 px-6 rounded-2xl text-sm sm:text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>عرض قائمة الأئمة المتوفرين</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenImamAddModal}
                className="w-full bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm border border-emerald-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>التسجيل كإمام جديد</span>
              </button>
            </div>
          </div>

          {/* LIGHT BLUE GRADIENT BOX: Available Mosques & Associations List */}
          <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white rounded-3xl p-7 sm:p-9 shadow-xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 border border-sky-400/40">
            <div className="space-y-5 text-center sm:text-right">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-sky-200/70 flex items-center justify-center shadow-md">
                  <Building2 className="w-9 h-9 sm:w-10 sm:h-10 text-white" />
                </div>
                <span className="text-sky-100 text-sm font-bold tabular-nums">
                  {mosquesCount} مسجد يبحث عن إمام
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <h2 className="text-2xl sm:text-4xl font-black text-white font-amiri leading-snug">
                  قائمة المساجد والجمعيات المتوفرة
                </h2>
                <p className="text-sm text-sky-100/95 leading-relaxed">
                  اضغط هنا لتصفح المساجد والجمعيات التي تبحث عن إمام وشروطها، أو لإضافة إعلان مسجدك.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-8 mt-6 border-t border-sky-400/40">
              <button
                onClick={onOpenMosqueList}
                className="w-full bg-white hover:bg-sky-50 text-sky-950 font-black py-4 px-6 rounded-2xl text-sm sm:text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>عرض قائمة المساجد المتوفرة</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenMosqueAddModal}
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
          <button
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer whitespace-nowrap"
          >
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <span>لوحة الإحصائيات والمؤشرات البيانية</span>
          </button>

          {currentRole === 'visitor' && (
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>تسجيل الدخول (جوجل / فيسبوك)</span>
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
    </section>
  );
};
