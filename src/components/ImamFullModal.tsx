import React from 'react';
import { ImamProfile, UserRole } from '../types';
import { getYoutubeEmbedUrl, getRiwayaBadgeStyle, getSafeImamAvatar, safeHttpUrl } from '../utils/helpers';
import { ContactBlock } from './ContactBlock';
import {
  X,
  ExternalLink,
  Phone,
  ShieldCheck,
  FileCheck,
  Award,
  Edit3,
  Download,
  Share2,
  Video,
  Flag,
  Lock,
} from 'lucide-react';

interface ImamFullModalProps {
  imam: ImamProfile | null;
  onClose: () => void;
  currentRole: UserRole;
  /** Owner, admin or verified mosque. Enforced again by Firestore rules. */
  canViewContact: boolean;
  canEdit: boolean;
  isUnverifiedMosque: boolean;
  onEdit: (imam: ImamProfile) => void;
  onRequestInterview: (imam: ImamProfile) => void;
  onReport: (imam: ImamProfile) => void;
  onOpenAuthModal: () => void;
  onCopied: () => void;
}

export const ImamFullModal: React.FC<ImamFullModalProps> = ({
  imam,
  onClose,
  currentRole,
  canViewContact,
  canEdit,
  isUnverifiedMosque,
  onEdit,
  onRequestInterview,
  onReport,
  onOpenAuthModal,
  onCopied,
}) => {
  if (!imam) return null;

  const embedUrl = getYoutubeEmbedUrl(imam.youtubeUrl);
  const youtubeHref = safeHttpUrl(imam.youtubeUrl);
  const riwayaStyle = getRiwayaBadgeStyle(imam.riwaya);
  const isBusyRamadan = imam.availabilityState === 'busy_ramadan';
  const isApproved = imam.approvalStatus === 'approved';
  const isOwnerOrAdmin = canEdit;

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/imams/${imam.id}`;
    try {
      await navigator.clipboard.writeText(url);
      onCopied();
    } catch {
      window.prompt('انسخ الرابط:', url);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`ملف ${imam.name}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-4 sm:my-6 max-h-[94vh] flex flex-col text-xs">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 text-white p-4 sm:p-6 flex justify-between items-start gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <img
                src={getSafeImamAvatar(imam.photo)}
                alt={imam.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              {imam.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  ✓ موثق
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  {isApproved ? 'ملف إمام معتمد' : imam.approvalStatus === 'pending' ? 'قيد المراجعة' : 'غير معتمد'}
                </span>
                <span className={`${riwayaStyle.bg} ${riwayaStyle.text} border text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                  {imam.riwaya}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white font-amiri">
                {imam.name}
              </h3>
              <p className="text-xs text-emerald-200/90 flex flex-wrap items-center gap-2">
                <span>👤 العمر: {imam.age} سنة</span>
                <span>•</span>
                <span>📍 {imam.country}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isApproved && (
            <button
              onClick={handleCopyLink}
              title="نسخ رابط الملف"
              aria-label="نسخ رابط الملف"
              className="text-emerald-300 hover:text-white p-2 rounded-xl hover:bg-emerald-800/60 transition cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>
            )}
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-emerald-800/60 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* Ramadan & Availability Status Banner */}
          {imam.availabilityState === 'paused' ? (
            <div className="bg-slate-100 border border-slate-300 rounded-2xl p-3.5 text-slate-700 font-bold text-xs">
              ⏸️ الإعلان موقوف مؤقتاً من صاحب الملف
            </div>
          ) : isBusyRamadan ? (
            <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-4 text-amber-950 flex flex-wrap justify-between items-center gap-3">
              <div className="space-y-1">
                <div className="font-extrabold text-sm flex items-center gap-2">
                  <span>🌙 حالة رمضان: ملتزم في رمضان ومتاح رسمياً بعده</span>
                </div>
                {imam.ramadanNote && (
                  <p className="text-xs text-amber-900">
                    📌 الالتزام الرمضاني: {imam.ramadanNote}
                  </p>
                )}
                <p className="text-xs text-emerald-800 font-bold">
                  📅 تاريخ التفرغ للتعاقد الرسمي: {imam.availableAfterDate || 'بعد عيد الفطر مباشرة'}
                </p>
              </div>
              <span className="bg-amber-200/80 text-amber-950 font-bold px-3 py-1 rounded-xl text-[11px] shrink-0">
                متاح لعقد رسمي دائم
              </span>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 text-emerald-950 font-bold flex flex-wrap justify-between items-center gap-2 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
                <span>🟢 متاح حالياً (جاهز لصلاة التراويح أو للتعاقد الدائم الفوري)</span>
              </span>
              <span className="bg-emerald-200 text-emerald-900 px-3 py-1 rounded-lg text-[11px]">
                تفرغ تام
              </span>
            </div>
          )}

          {/* YouTube Recitation Player */}
          {youtubeHref && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-700" />
                <span>نموذج التلاوة المرئي من اليوتيوب:</span>
              </h4>
              <a
                href={youtubeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 text-[11px] underline"
              >
                <span>فتح مباشرة في يوتيوب</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {embedUrl ? (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border-2 border-slate-800">
                <iframe
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={embedUrl}
                  title={`تلاوة ${imam.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="bg-slate-100 p-6 rounded-2xl text-center space-y-2 border border-slate-200">
                <p className="text-slate-600 font-medium">رابط التلاوة المرفق:</p>
                <a
                  href={youtubeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold underline inline-flex items-center gap-1.5 break-all"
                  dir="ltr"
                >
                  <span>{youtubeHref}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
          )}

          {/* Bio & CV */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>السيرة الذاتية والمسيرة العلمية والدعوية:</span>
            </h4>
            <p className="text-slate-700 leading-relaxed text-xs whitespace-pre-line">
              {imam.cvText || '—'}
            </p>
          </div>

          {/* Legal Visa & Degrees Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Visa Card */}
            <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl space-y-2">
              <h5 className="font-extrabold text-blue-950 text-xs flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-700" />
                <span>حالة التأشيرة (شنغن) والإقامة:</span>
              </h5>
              <p className="text-blue-900 font-semibold leading-relaxed">
                {imam.visaDetails}
              </p>
              
              {imam.visaFilePath ? (
                <div className="pt-1">
                  <span className="text-[11px] bg-white text-blue-800 px-3 py-1.5 rounded-xl border border-blue-200 inline-flex items-center gap-1.5 font-bold shadow-sm">
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {isOwnerOrAdmin ? `الوثيقة المرفوعة: ${imam.visaFileName}` : 'تم رفع وثيقة التأشيرة للإدارة'}
                    </span>
                  </span>
                </div>
              ) : imam.hasVisa === 'no' ? (
                <span className="text-[11px] text-slate-500">
                  يحتاج استقدام وتأشيرة عمل من طرف المسجد
                </span>
              ) : null}
            </div>

            {/* Degrees & Languages Card */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <h5 className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>الشواهد العلمية وإجازات السند:</span>
              </h5>
              <p className="text-emerald-900 font-semibold leading-relaxed">
                {imam.degree}
              </p>
              <p className="text-slate-600 text-[11px]">
                🗣️ <strong>اللغات:</strong> {imam.languages}
              </p>
              {imam.germanLevel && imam.germanLevel !== 'none' && (
                <p className="text-emerald-800 font-bold text-[11px]">
                  🇩🇪 شهادة اللغة الألمانية: مستوى {imam.germanLevel}
                </p>
              )}

              {imam.certsFilePath && (
                <div className="pt-1">
                  <span className="text-[11px] bg-white text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 inline-flex items-center gap-1.5 font-bold shadow-sm">
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {isOwnerOrAdmin ? `الشواهد المرفوعة: ${imam.certsFileName}` : 'تم رفع الشواهد للإدارة'}
                    </span>
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Contact details: loaded from the protected imamContacts collection */}
          {canViewContact ? (
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl space-y-3">
              <p className="font-black text-amber-400 text-sm">وسائل التواصل المباشر مع الشيخ:</p>
              <ContactBlock
                kind="imam"
                id={imam.id}
                canView
                lockedText="تعذر تحميل بيانات التواصل"
                emailSubject={`تواصل من إدارة مسجد عبر منصة محراب - ${imam.name}`}
              />
            </div>
          ) : (
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4 border-2 border-amber-500/40">
              <div className="space-y-1">
                <p className="font-black text-amber-400 text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>بيانات الاتصال محمية للمساجد الموثقة فقط</span>
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isUnverifiedMosque
                    ? 'ستظهر لك أرقام التواصل بعد أن توافق الإدارة على إعلان مسجدك.'
                    : 'حفاظاً على خصوصية الأئمة، لا تظهر أرقام الهاتف والبريد إلا لحسابات المساجد التي وثقتها الإدارة.'}
                </p>
              </div>
              {currentRole === 'visitor' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuthModal();
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow transition cursor-pointer shrink-0"
                >
                  🔐 تسجيل الدخول
                </button>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            {canEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(imam);
                }}
                className="text-amber-800 hover:text-amber-900 font-extrabold flex items-center gap-1 cursor-pointer text-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل الملف</span>
              </button>
            )}

            {currentRole !== 'admin' && !canEdit && (
              <button
                onClick={() => {
                  onClose();
                  onReport(imam);
                }}
                className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer text-xs border border-red-200 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition"
              >
                <Flag className="w-3.5 h-3.5 text-red-500" />
                <span>إبلاغ الإدارة</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              إغلاق
            </button>
            {currentRole === 'mosque' && isApproved && (
              <button
                onClick={() => onRequestInterview(imam)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-black px-5 py-2.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>إرسال طلب تواصل للشيخ</span>
              </button>
            )}
            {currentRole === 'visitor' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-black px-5 py-2.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>تسجيل الدخول للتواصل</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
