import React, { useState } from 'react';
import { Coffee, Palette, Compass, Music, Heart, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const [checkedHobby, setCheckedHobby] = useState<number[]>([0, 1, 2, 3]);

  const toggleHobby = (idx: number) => {
    if (checkedHobby.includes(idx)) {
      setCheckedHobby(checkedHobby.filter((i) => i !== idx));
    } else {
      setCheckedHobby([...checkedHobby, idx]);
    }
  };

  const hobbies = [
    {
      icon: <Coffee size={18} className="text-[#EE9007]" />,
      textEn: 'Drinking way too much specialty pour-over coffee',
      textAr: 'شرب كميات وافرة من القهوة المختصة المقطرة',
    },
    {
      icon: <Palette size={18} className="text-[#EE9007]" />,
      textEn: 'Collecting quirky Japanese & vintage stationery',
      textAr: 'جمع القرطاسية اليابانية العجيبة والعتيقة',
    },
    {
      icon: <Compass size={18} className="text-[#111409]" />,
      textEn: 'Watching retro nature docs for bizarre color palettes',
      textAr: 'مشاهدة وثائقيات الطبيعة القديمة لاستلهام لوحات ألوان غريبة',
    },
    {
      icon: <Music size={18} className="text-[#EE9007]" />,
      textEn: 'Swing dancing and collecting vinyl on Friday nights',
      textAr: 'الاستماع لأسطوانات الفينيل ورقص السوينغ مساء الجمعة',
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#EDE1D1] py-16 sm:py-24 border-b-2 border-[#111409] text-[#111409] relative overflow-hidden"
    >
      {/* Playful background doodles */}
      <div className="absolute top-8 left-8 text-3xl opacity-20 pointer-events-none">✏️</div>
      <div className="absolute bottom-10 right-12 text-4xl opacity-20 pointer-events-none">🍌</div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span
            data-en="WHO WE ARE"
            data-ar="من نحن"
            className="inline-block px-4 py-1 rounded-full bg-[#EE9007] text-[#111409] font-bold text-xs uppercase tracking-widest border-2 border-[#111409] shadow-brutal-sm mb-3"
          >
            {language === 'AR' ? 'من نحن' : 'WHO WE ARE'}
          </span>
          <h2
            data-en="Behind the Brush"
            data-ar="خلف ريشة الرسم"
            className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111409]"
          >
            {language === 'AR' ? 'خلف ريشة الرسم' : 'Behind the Brush'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Sticky Note Left */}
          <div
            id="about-sticky-note"
            className="bg-[#EDE1D1] text-[#111409] p-8 sm:p-10 rounded-2xl border-3 border-[#111409] shadow-brutal-lg -rotate-1 hover:rotate-0 transition-transform duration-200 relative group"
          >
            {/* Top Tape Sticker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#EE9007]/60 border border-[#111409]/20 backdrop-blur-sm -rotate-2 shadow-xs" />

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐒</span>
              <h3
                data-en="Hi, we're Brush Monkey"
                data-ar="أهلاً، نحن بروش مونكي"
                className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#111409]"
              >
                {language === 'AR' ? 'أهلاً، نحن بروش مونكي' : "Hi, we're Brush Monkey"}
              </h3>
            </div>

            <p
              data-en="We believe design shouldn’t take itself too seriously. We craft bold identities, punchy packaging, and character-driven design systems that cut through corporate noise and make people smile."
              data-ar="نؤمن بأن التصميم يجب ألا يكون جافاً أو مملاً. نصنع هويات جريئة، وتغليفاً مؤثراً، وأنظمة تصميم قائمة على الشخصيات تقهر ضجيج الشركات وترسم الابتسامة على الوجوه."
              className="text-[#111409] text-base sm:text-lg font-medium leading-relaxed mb-6"
            >
              {language === 'AR'
                ? 'نؤمن بأن التصميم يجب ألا يكون جافاً أو مملاً. نصنع هويات جريئة، وتغليفاً مؤثراً، وأنظمة تصميم قائمة على الشخصيات تقهر ضجيج الشركات وترسم الابتسامة على الوجوه.'
                : 'We believe design shouldn’t take itself too seriously. We craft bold identities, punchy packaging, and character-driven design systems that cut through corporate noise and make people smile.'}
            </p>

            <div className="bg-[#EE9007]/15 p-4 rounded-xl border-2 border-[#111409] font-medium text-sm text-[#111409]">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <Heart size={16} className="text-[#EE9007] fill-[#EE9007]" />
                <span data-en="Our Studio Mantra:" data-ar="شعار الاستوديو:">
                  {language === 'AR' ? 'شعار الاستوديو:' : 'Our Studio Mantra:'}
                </span>
              </p>
              <p
                data-en="“If it doesn’t make someone do a double take, grab a pencil and start over.”"
                data-ar="«إذا لم يدفعك التصميم للتوقف والتحديق مرتين، أمسك قلم الرصاص وابدأ من جديد.»"
                className="italic"
              >
                {language === 'AR'
                  ? '«إذا لم يدفعك التصميم للتوقف والتحديق مرتين، أمسك قلم الرصاص وابدأ من جديد.»'
                  : '“If it doesn’t make someone do a double take, grab a pencil and start over.”'}
              </p>
            </div>
          </div>

          {/* Notepad Right */}
          <div
            id="about-notepad"
            className="bg-[#EDE1D1] text-[#111409] p-8 sm:p-10 rounded-2xl border-3 border-[#111409] shadow-brutal-lg rotate-1 hover:rotate-0 transition-transform duration-200 relative"
          >
            {/* Spiral binding rings at top */}
            <div className="flex justify-around absolute -top-3 left-6 right-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-6 bg-[#111409] rounded-full border border-[#111409] shadow-sm"
                />
              ))}
            </div>

            <div className="mt-2 mb-4 pb-3 border-b-2 border-dashed border-[#111409]/25 flex items-center justify-between">
              <h3
                data-en="When we're not designing:"
                data-ar="حين لا نكون منهمكين في التصميم:"
                className="font-display text-xl sm:text-2xl font-bold text-[#111409]"
              >
                {language === 'AR' ? 'حين لا نكون منهمكين في التصميم:' : "When we're not designing:"}
              </h3>
              <span
                data-en="OFF DUTY"
                data-ar="خارج العمل"
                className="text-xs bg-[#EE9007] text-[#111409] font-bold px-2 py-0.5 rounded border border-[#111409]"
              >
                {language === 'AR' ? 'خارج العمل' : 'OFF DUTY'}
              </span>
            </div>

            <p
              data-en="(Interactive checklist — click items to check off studio rituals)"
              data-ar="(قائمة تفاعلية — انقر لتحديد عادات وطقوس الاستوديو)"
              className="text-xs text-[#111409]/70 mb-3"
            >
              {language === 'AR'
                ? '(قائمة تفاعلية — انقر لتحديد عادات وطقوس الاستوديو)'
                : '(Interactive checklist — click items to check off studio rituals)'}
            </p>

            <ul className="space-y-3.5">
              {hobbies.map((hobby, index) => {
                const isChecked = checkedHobby.includes(index);
                return (
                  <li
                    key={index}
                    onClick={() => toggleHobby(index)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border border-[#111409]/20 hover:border-[#111409] cursor-pointer transition-colors ${
                      isChecked ? 'bg-[#EE9007]/20 border-[#111409]' : 'bg-[#EDE1D1]/60'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <CheckCircle2 size={20} className="text-[#111409] fill-[#EE9007]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-[#111409]" />
                      )}
                    </div>
                    <span
                      data-en={hobby.textEn}
                      data-ar={hobby.textAr}
                      className={`text-sm sm:text-base font-semibold leading-snug ${
                        isChecked ? 'text-[#111409]' : 'text-[#111409]/50 line-through'
                      }`}
                    >
                      {language === 'AR' ? hobby.textAr : hobby.textEn}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
