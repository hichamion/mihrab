import React from 'react';
import { ShieldCheck, Globe, Building2, Mic } from 'lucide-react';

interface FooterProps {
  /** List of imams (for mosques). */
  onOpenImamsList: () => void;
  /** List of mosque ads (for imams). */
  onOpenMosquesList: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenImamsList, onOpenMosquesList, onOpenPrivacy }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-emerald-900/60 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-black">
                🕌
              </div>
              <div>
                <span className="text-white text-lg font-black font-amiri tracking-wide">
                  مِحراب <span className="text-amber-400 font-sans text-sm font-bold">Mihrab</span>
                </span>
                <p className="text-[10px] text-emerald-400 font-semibold">منظومة الربط الشرعي والمهني</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              المنصة المتخصصة الأولى الموثقة للربط بين الأئمة والقرّاء المجازين والجمعيات والمراكز الإسلامية في أوروبا والعالم، وفق المعايير الشرعية والقانونية.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>مراجعة كل ملف وإعلان من الإدارة قبل نشره</span>
            </div>
          </div>

          {/* Quick Links: Imams */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>للأئمة والقرّاء</span>
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={onOpenMosquesList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  تسجيل وتوثيق ملف إمام جديد
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMosquesList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  تحديث حالة التفرغ (رمضان / دائم)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMosquesList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  تصفح إعلانات المساجد في ألمانيا وفرنسا
                </button>
              </li>
              <li>
                <span className="text-slate-500">معايير شهادة اللغة الألمانية A2</span>
              </li>
            </ul>
          </div>

          {/* Quick Links: Mosques */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>للجمعيات والمساجد</span>
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={onOpenImamsList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  نشر إعلان طلب إمام جديد
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenImamsList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  البحث عن قرّاء التراويح لشهر رمضان
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenImamsList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  مراجعة الأئمة ذوي الإقامات الأوروبية
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenImamsList}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  إجراءات استقدام الأئمة الرسمية
                </button>
              </li>
            </ul>
          </div>

          {/* Charter & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>ميثاق الشرف والدعم</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              تلتزم منصة محراب بالمحافظة على خصوصية الأئمة وإدارات المساجد، وعدم مشاركة الوثائق إلا مع اللجان المعنية بالتوظيف الشرعي.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenPrivacy}
                className="text-[11px] text-slate-300 hover:text-amber-300 underline cursor-pointer"
              >
                سياسة الخصوصية وحماية البيانات
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة مِحراب (Mihrab) — لخدمة بيوت الله والأئمة في أوروبا والعالم.
          </p>
          <button onClick={onOpenPrivacy} className="hover:text-slate-300 underline cursor-pointer">
            سياسة الخصوصية
          </button>
        </div>

      </div>
    </footer>
  );
};
