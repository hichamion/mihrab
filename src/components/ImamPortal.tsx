import React, { useState, useEffect, useMemo } from 'react';
import { ImamProfile, MosqueJob, Application, UserRole, AvailabilityState } from '../types';
import { formatDate, getSafeImamAvatar } from '../utils/helpers';
import { InboxCenter, InboxProps } from './InboxCenter';
import { ContactBlock } from './ContactBlock';
import { Edit3, Eye, Trash2, Send, MapPin, Check, Flag, Plus, Clock, XCircle } from 'lucide-react';

type Tab = 'manage' | 'mosque_ads' | 'applications' | 'inbox';

interface ImamPortalProps {
  currentRole: UserRole;
  myImam: ImamProfile | null;
  mosques: MosqueJob[];
  applications: Application[];
  onOpenAuthModal: () => void;
  onCreateOrEditMyProfile: () => void;
  onViewImamFull: (imam: ImamProfile) => void;
  onDeleteImam: (imam: ImamProfile) => void;
  onOpenMosqueAdd: () => void;
  onUpdateImamStatus: (id: string, state: AvailabilityState) => void;
  onSaveQuickRamadan: (id: string, ramadanNote: string, afterDate: string) => void;
  onApplyToMosque: (mosque: MosqueJob) => void;
  onReportMosque: (mosque: MosqueJob) => void;
  inbox: InboxProps;
  initialTab?: Tab;
  /** Changes on every tab request from the parent (see App). */
  tabRequest?: number;
}

const APPLICATION_STATUS_LABEL: Record<Application['status'], string> = {
  pending: 'قيد المراجعة',
  accepted: 'تم القبول',
  interview_scheduled: 'تم طلب التواصل المباشر',
  declined: 'لم يتم القبول',
};

export const ImamPortal: React.FC<ImamPortalProps> = ({
  currentRole,
  myImam,
  mosques,
  applications,
  onOpenAuthModal,
  onCreateOrEditMyProfile,
  onViewImamFull,
  onDeleteImam,
  onOpenMosqueAdd,
  onUpdateImamStatus,
  onSaveQuickRamadan,
  onApplyToMosque,
  onReportMosque,
  inbox,
  initialTab = 'mosque_ads',
  tabRequest = 0,
}) => {
  const isImam = currentRole === 'imam';
  const isLoggedIn = currentRole !== 'visitor';

  const [activeTab, setActiveTab] = useState<Tab>(isImam ? initialTab : 'mosque_ads');
  const [countryFilter, setCountryFilter] = useState('all');

  useEffect(() => {
    setActiveTab(isImam ? initialTab : 'mosque_ads');
  }, [initialTab, tabRequest, isImam]);

  const [quickRamadanNote, setQuickRamadanNote] = useState(myImam?.ramadanNote || '');
  const [quickAfterDate, setQuickAfterDate] = useState(myImam?.availableAfterDate || '');

  useEffect(() => {
    setQuickRamadanNote(myImam?.ramadanNote || '');
    setQuickAfterDate(myImam?.availableAfterDate || '');
  }, [myImam?.id, myImam?.ramadanNote, myImam?.availableAfterDate]);

  const activeMosques = mosques.filter((m) => m.activeState !== 'closed');
  // Countries come from the data instead of a hard-coded list.
  const countries = useMemo(
    () => Array.from(new Set(activeMosques.map((m) => m.country.trim()).filter(Boolean))).sort(),
    [activeMosques]
  );
  const filteredMosques = activeMosques.filter((m) => countryFilter === 'all' || m.country.trim() === countryFilter);

  const myApplications = applications; // already limited to this imam by the query
  const unreadForMe = inbox.messages.filter((m) => !m.isRead && m.receiverUid === inbox.currentUid).length;

  const tabClass = (tab: Tab) =>
    `text-xs font-bold px-3.5 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
      activeTab === tab ? 'bg-white text-sky-950 font-black shadow-xs' : 'bg-sky-950/50 hover:bg-sky-950/80 text-white'
    }`;

  return (
    <section className="flex-1 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 text-white p-6 sm:p-7 rounded-3xl shadow-md flex flex-wrap justify-between items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black font-amiri">
            قائمة المساجد والجمعيات المتوفرة ({activeMosques.length})
          </h2>
          <p className="text-xs sm:text-sm text-sky-100">
            تصفح المساجد التي تبحث عن إمام وتقدم إليها، أو أدر ملفك الشخصي كإمام
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(currentRole === 'mosque' || currentRole === 'admin' || currentRole === 'visitor') && (
            <button
              onClick={onOpenMosqueAdd}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة إعلان مسجد</span>
            </button>
          )}

          <button onClick={() => setActiveTab('mosque_ads')} className={tabClass('mosque_ads')}>
            المساجد المتوفرة ({activeMosques.length})
          </button>

          {isImam && (
            <>
              <button onClick={() => setActiveTab('manage')} className={tabClass('manage')}>
                ملفي الشخصي كإمام
              </button>
              <button onClick={() => setActiveTab('applications')} className={tabClass('applications')}>
                طلباتي ({myApplications.length})
              </button>
              <button onClick={() => setActiveTab('inbox')} className={`${tabClass('inbox')} flex items-center gap-1.5`}>
                <span>علبة الرسائل</span>
                {unreadForMe > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1.5 rounded-full font-black">{unreadForMe}</span>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* TAB: MY IMAM PROFILE */}
      {activeTab === 'manage' && isImam && !myImam && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
          <h3 className="text-lg font-black text-slate-900">لم تنشئ ملفك كإمام بعد</h3>
          <p className="text-xs text-slate-500">أنشئ ملفك ليظهر للمساجد بعد مراجعته من الإدارة، وتتمكن من التقديم على الإعلانات.</p>
          <button
            onClick={onCreateOrEditMyProfile}
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-black px-6 py-2.5 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء ملفي الآن</span>
          </button>
        </div>
      )}

      {activeTab === 'manage' && isImam && myImam && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">ملفي الشخصي كإمام ({myImam.name})</h3>
              <p className="text-xs text-slate-500">تحكم في بياناتك وسيرتك الذاتية وحالة تفرغك أمام المساجد</p>
            </div>
            {myImam.approvalStatus === 'pending' && (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                قيد المراجعة من الإدارة — غير ظاهر للمساجد بعد
              </span>
            )}
            {myImam.approvalStatus === 'rejected' && (
              <span className="bg-red-100 text-red-900 border border-red-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                لم تتم الموافقة على الملف — راسل الإدارة للاستفسار
              </span>
            )}
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-wrap justify-between items-start gap-6">
            <div className="flex items-start gap-4">
              <img
                src={getSafeImamAvatar(myImam.photo)}
                alt={myImam.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400"
              />
              <div className="space-y-1.5">
                <h4 className="font-black text-xl text-white font-amiri">{myImam.name}</h4>
                <p className="text-xs text-slate-300">
                  {myImam.country} · العمر: {myImam.age} سنة · الرواية: {myImam.riwaya}
                </p>
                <p className="text-xs text-emerald-300">{myImam.degree}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={onCreateOrEditMyProfile}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل بيانات ملفي</span>
              </button>
              <button
                onClick={() => onViewImamFull(myImam)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة الملف</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {(
              [
                ['available_now', '1. متاح حالياً', 'جاهز للتراويح أو لعقد دائم', 'border-emerald-600 bg-emerald-50 text-emerald-950'],
                ['busy_ramadan', '2. ملتزم في رمضان ومتاح بعده', 'متاح للتعاقد الرسمي بعد العيد', 'border-amber-500 bg-amber-50 text-amber-950'],
                ['paused', '3. إيقاف الإعلان مؤقتاً', 'إخفاء الملف مع حفظ بياناتك', 'border-sky-600 bg-sky-50 text-sky-950'],
              ] as [AvailabilityState, string, string, string][]
            ).map(([state, title, hint, activeCls]) => (
              <button
                key={state}
                onClick={() => onUpdateImamStatus(myImam.id, state)}
                aria-pressed={myImam.availabilityState === state}
                className={`p-4 rounded-2xl border text-right transition cursor-pointer ${
                  myImam.availabilityState === state ? `${activeCls} font-black` : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-sm font-black mb-1">{title}</div>
                <p className="text-xs text-slate-500">{hint}</p>
              </button>
            ))}

            <button
              onClick={() => onDeleteImam(myImam)}
              className="p-4 rounded-2xl border border-red-200 hover:bg-red-50 text-right transition cursor-pointer text-red-700"
            >
              <div className="text-sm font-black mb-1 flex items-center gap-1">
                <Trash2 className="w-4 h-4" />
                <span>4. حذف الملف نهائياً</span>
              </div>
              <p className="text-xs text-slate-500">مسح الملف من المنصة</p>
            </button>
          </div>

          {myImam.availabilityState === 'busy_ramadan' && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
              <input
                type="text"
                maxLength={300}
                value={quickRamadanNote}
                onChange={(e) => setQuickRamadanNote(e.target.value)}
                placeholder="أين أنت ملتزم في رمضان؟"
                aria-label="مكان الالتزام في رمضان"
                className="sm:col-span-5 border border-amber-300 rounded-xl px-3 py-2 bg-white"
              />
              <input
                type="text"
                maxLength={100}
                value={quickAfterDate}
                onChange={(e) => setQuickAfterDate(e.target.value)}
                placeholder="تاريخ التفرغ بعد رمضان"
                aria-label="تاريخ التفرغ بعد رمضان"
                className="sm:col-span-4 border border-amber-300 rounded-xl px-3 py-2 bg-white"
              />
              <button
                onClick={() => onSaveQuickRamadan(myImam.id, quickRamadanNote, quickAfterDate)}
                className="sm:col-span-3 bg-amber-500 text-slate-950 font-black py-2 px-4 rounded-xl cursor-pointer"
              >
                حفظ التفاصيل
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB: AVAILABLE MOSQUES */}
      {activeTab === 'mosque_ads' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-3 text-xs">
            <span className="font-bold text-slate-700">المساجد المتاحة حالياً للتقديم ({filteredMosques.length})</span>
            <label className="flex items-center gap-2">
              <span className="font-bold text-slate-600">الدولة:</span>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="border border-slate-300 rounded-xl px-3 py-1.5 bg-white font-bold text-slate-800"
              >
                <option value="all">جميع الدول ({activeMosques.length})</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredMosques.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-xs text-slate-500">
              لا توجد إعلانات مساجد نشطة حالياً. عُد لاحقاً.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMosques.map((m) => {
              const alreadyApplied = myApplications.some((app) => app.mosqueId === m.id);

              return (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-sky-400 transition p-5 sm:p-6 flex flex-col justify-between text-xs space-y-4 shadow-2xs"
                >
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold text-sky-700">{m.lookingType}</span>
                      <h4 className="text-lg font-black text-slate-900 mt-0.5 font-amiri">{m.mosqueName}</h4>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>
                          {m.country} · {m.city}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-sky-800 font-bold">الرواية: {m.riwayaRequired}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-xs whitespace-pre-line">{m.details}</p>

                    {m.requirements?.length > 0 && (
                      <ul className="text-xs text-slate-600 list-disc pr-4 space-y-0.5">
                        {m.requirements.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    )}

                    {m.salaryAndBenefits && (
                      <p className="text-xs text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/70">
                        <strong>السكن والمزايا:</strong> {m.salaryAndBenefits}
                        {' · '}
                        {m.housingProvided ? 'يتوفر سكن' : 'بدل سكن'}
                      </p>
                    )}

                    <ContactBlock
                      kind="mosque"
                      id={m.id}
                      canView={isLoggedIn}
                      lockedText="سجّل دخولك لإظهار هاتف المسجد والواتساب"
                      onLockedClick={onOpenAuthModal}
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onReportMosque(m)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>إبلاغ</span>
                    </button>

                    {(isImam || currentRole === 'visitor') && (
                      <button
                        onClick={() => (isImam ? onApplyToMosque(m) : onOpenAuthModal())}
                        disabled={isImam && alreadyApplied}
                        className={`font-bold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs ${
                          isImam && alreadyApplied
                            ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        }`}
                      >
                        {isImam && alreadyApplied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>تم التقديم</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>{isImam ? 'التقديم لهذا المسجد' : 'سجّل دخولك للتقديم'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: MY APPLICATIONS */}
      {activeTab === 'applications' && isImam && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-black text-slate-900">طلبات الترشح المرسلة ({myApplications.length})</h3>
          {myApplications.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">لم ترسل أي طلبات ترشح بعد.</p>
          ) : (
            <div className="space-y-3">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{app.mosqueName}</h4>
                    <p className="text-slate-500 text-xs">{formatDate(app.appliedAt)}</p>
                  </div>
                  <span className="text-emerald-800 font-bold text-xs">{APPLICATION_STATUS_LABEL[app.status]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: INBOX */}
      {activeTab === 'inbox' && isImam && <InboxCenter currentRole="imam" {...inbox} />}
    </section>
  );
};
