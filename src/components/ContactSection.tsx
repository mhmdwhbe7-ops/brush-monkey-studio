import React, { useState } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { ContactFormValues } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  isModalOpen: boolean;
  prefilledProject?: string;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isModalOpen,
  prefilledProject,
  onOpenModal,
  onCloseModal,
}) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    email: '',
    projectType: prefilledProject || 'Brand Identity',
    budgetRange: '$3k - $5k',
    message: prefilledProject ? `Hi! I loved the ${prefilledProject} project and want to discuss something similar for my brand.` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update project type if prefill changed
  React.useEffect(() => {
    if (prefilledProject) {
      setFormData((prev) => ({
        ...prev,
        projectType: prefilledProject,
        message: `Hi! I saw the ${prefilledProject} case study and would love to collaborate on a similar project.`,
      }));
    }
  }, [prefilledProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Brand Identity',
      budgetRange: '$3k - $5k',
      message: '',
    });
    onCloseModal();
  };

  return (
    <>
      {/* Banner Section */}
      <section
        id="contact"
        className="bg-[#EE9007] text-[#111409] py-16 sm:py-24 px-5 sm:px-8 border-b-2 border-[#111409] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <span
              data-en="LET'S COLLABORATE"
              data-ar="دعنا نتعاون"
              className="inline-block px-3.5 py-1 rounded-full bg-[#EDE1D1] text-[#111409] font-bold text-xs uppercase tracking-widest border-2 border-[#111409] shadow-brutal-sm mb-4"
            >
              {language === 'AR' ? 'دعنا نتعاون' : "LET'S COLLABORATE"}
            </span>
            <h2
              data-en="GOT AN IDEA? LET'S MAKE IT VISUAL."
              data-ar="لديك فكرة؟ لنحولها إلى واقع بصري مبهر."
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight text-[#111409]"
            >
              {language === 'AR' ? (
                <span>
                  لديك فكرة؟<br />
                  <span className="text-[#EDE1D1]">لنحولها إلى واقع بصري مبهر.</span>
                </span>
              ) : (
                <span>
                  GOT AN IDEA?<br />
                  <span className="text-[#EDE1D1]">LET'S MAKE IT VISUAL.</span>
                </span>
              )}
            </h2>
            <p
              data-en="Got a new product, a wild startup pitch, or a brand that needs fresh character? Send a message and let’s swing into action."
              data-ar="هل لديك منتج جديد، أو فكرة شركة ناشئة جريئة، أو علامة بحاجة إلى روح جديدة؟ أرسل لنا رسالة ولنبدأ العمل معاً."
              className="mt-4 text-[#111409]/90 text-base sm:text-lg font-medium max-w-lg"
            >
              {language === 'AR'
                ? 'هل لديك منتج جديد، أو فكرة شركة ناشئة جريئة، أو علامة بحاجة إلى روح جديدة؟ أرسل لنا رسالة ولنبدأ العمل معاً.'
                : 'Got a new product, a wild startup pitch, or a brand that needs fresh character? Send a message and let’s swing into action.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenModal}
              id="banner-btn-talk"
              data-en="LET'S TALK →"
              data-ar="تحدث معنا →"
              className="bg-[#111409] text-[#EDE1D1] px-8 py-4 sm:py-5 rounded-2xl font-display text-xl sm:text-2xl font-bold border-3 border-[#111409] shadow-brutal hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-3 cursor-pointer whitespace-nowrap"
            >
              <span>{language === 'AR' ? 'تحدث معنا' : "LET'S TALK"}</span>
              <span className="text-2xl">→</span>
            </button>

            <a
              href="mailto:hello@brushmonkey.studio"
              className="bg-[#EDE1D1] text-[#111409] px-6 py-4 rounded-2xl font-bold text-sm border-2 border-[#111409] shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
            >
              <Mail size={18} />
              <span>hello@brushmonkey.studio</span>
            </a>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111409]/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={onCloseModal}
        >
          <div
            className="bg-[#EDE1D1] border-4 border-[#111409] rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-brutal-xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onCloseModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EDE1D1] hover:bg-[#EE9007] border-2 border-[#111409] text-[#111409] flex items-center justify-center shadow-brutal-sm transition-all cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🍌</span>
                  <h3
                    data-en="Start a Project"
                    data-ar="ابدأ مشروعاً جديداً"
                    className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#111409]"
                  >
                    {language === 'AR' ? 'ابدأ مشروعاً جديداً' : 'Start a Project'}
                  </h3>
                </div>
                <p
                  data-en="Fill out this brief note or reach out directly at hello@brushmonkey.studio."
                  data-ar="املأ هذه الاستمارة السريعة أو تواصل معنا مباشرة عبر hello@brushmonkey.studio."
                  className="text-xs sm:text-sm text-[#111409]/80 font-medium mb-6"
                >
                  {language === 'AR'
                    ? 'املأ هذه الاستمارة السريعة أو تواصل معنا مباشرة عبر '
                    : 'Fill out this brief note or reach out directly at '}
                  <span className="font-bold text-[#EE9007]">hello@brushmonkey.studio</span>.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      data-en="Your Name *"
                      data-ar="الاسم الكريم *"
                      className="block text-xs font-bold uppercase tracking-wider text-[#111409] mb-1.5"
                    >
                      {language === 'AR' ? 'الاسم الكريم *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'AR' ? 'مثال: أحمد محمد' : 'e.g. Alex Miller'}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-[#111409] bg-[#EDE1D1] text-[#111409] text-sm focus:outline-none focus:ring-2 focus:ring-[#EE9007] shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <label
                      data-en="Email Address *"
                      data-ar="البريد الإلكتروني *"
                      className="block text-xs font-bold uppercase tracking-wider text-[#111409] mb-1.5"
                    >
                      {language === 'AR' ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-[#111409] bg-[#EDE1D1] text-[#111409] text-sm focus:outline-none focus:ring-2 focus:ring-[#EE9007] shadow-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        data-en="Project Focus"
                        data-ar="مجال المشروع"
                        className="block text-xs font-bold uppercase tracking-wider text-[#111409] mb-1.5"
                      >
                        {language === 'AR' ? 'مجال المشروع' : 'Project Focus'}
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111409] text-sm focus:outline-none bg-[#EDE1D1] text-[#111409] font-medium shadow-xs"
                      >
                        <option value="Social Media Templates">
                          {language === 'AR' ? 'قوالب سوشال ميديا' : 'Social Media Templates'}
                        </option>
                        <option value="Startup Starter Kit">
                          {language === 'AR' ? 'حزم هوية أولية للشركات الناشئة' : 'Startup Starter Kit'}
                        </option>
                        <option value="Small Business Print Design">
                          {language === 'AR' ? 'تصميم مطبوعات للأعمال الصغيرة' : 'Small Business Print Design'}
                        </option>
                        <option value="Other Shenanigans">
                          {language === 'AR' ? 'مشروع إبداعي مخصص' : 'Custom Project / Other'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        data-en="Estimated Budget"
                        data-ar="الميزانية التقديرية"
                        className="block text-xs font-bold uppercase tracking-wider text-[#111409] mb-1.5"
                      >
                        {language === 'AR' ? 'الميزانية التقديرية' : 'Estimated Budget'}
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111409] text-sm focus:outline-none bg-[#EDE1D1] text-[#111409] font-medium shadow-xs"
                      >
                        <option value="<$3k">&lt; $3,000</option>
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      data-en="Tell us about your brand / vision *"
                      data-ar="أخبرنا عن علامتك ورؤيتك *"
                      className="block text-xs font-bold uppercase tracking-wider text-[#111409] mb-1.5"
                    >
                      {language === 'AR' ? 'أخبرنا عن علامتك ورؤيتك *' : 'Tell us about your brand / vision *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'AR'
                          ? 'ما الذي ترغب في بنائه؟ ما هو الجدول الزمني والأسلوب المطلوب؟'
                          : 'What are you building? What is the timeline and vibe?'
                      }
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-[#111409] bg-[#EDE1D1] text-[#111409] text-sm focus:outline-none focus:ring-2 focus:ring-[#EE9007] shadow-xs font-medium resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-en="SEND INQUIRY TO BRUSH MONKEY"
                      data-ar="إرسال الرسالة إلى بروش مونكي"
                      className="w-full bg-[#EE9007] hover:bg-[#111409] text-[#111409] hover:text-[#EDE1D1] py-3.5 px-6 rounded-xl font-bold border-2 border-[#111409] shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span data-en="DISPATCHING BANANA PIGEON..." data-ar="جارٍ إرسال الرسالة...">
                          {language === 'AR' ? 'جارٍ إرسال الرسالة...' : 'DISPATCHING BANANA PIGEON...'}
                        </span>
                      ) : (
                        <>
                          <span>
                            {language === 'AR'
                              ? 'إرسال الرسالة إلى بروش مونكي'
                              : 'SEND INQUIRY TO BRUSH MONKEY'}
                          </span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#EE9007] rounded-full border-3 border-[#111409] flex items-center justify-center text-3xl mx-auto mb-4 shadow-brutal">
                  🐒
                </div>
                <h3
                  data-en={`High Five, ${formData.name || 'Friend'}!`}
                  data-ar={`تحية حارة، ${formData.name || 'صديقنا'}!`}
                  className="font-display text-3xl font-bold uppercase text-[#111409] mb-2"
                >
                  {language === 'AR'
                    ? `تحية حارة، ${formData.name || 'صديقنا'}!`
                    : `High Five, ${formData.name || 'Friend'}!`}
                </h3>
                <p
                  data-en="We've received your note. Brush Monkey is reviewing your brief with a fresh cup of coffee. We'll be in touch within 24 hours!"
                  data-ar="وصلتنا رسالتك بنجاح! فريق بروش مونكي يراجع تفاصيل مشروعك مع فنجان قهوة طازج وسنتواصل معك خلال 24 ساعة."
                  className="text-sm font-medium text-[#111409]/80 max-w-md mx-auto mb-6"
                >
                  {language === 'AR'
                    ? 'وصلتنا رسالتك بنجاح! فريق بروش مونكي يراجع تفاصيل مشروعك مع فنجان قهوة طازج وسنتواصل معك خلال 24 ساعة.'
                    : "We've received your note. Brush Monkey is reviewing your brief with a fresh cup of coffee. We'll be in touch within 24 hours!"}
                </p>
                <button
                  onClick={resetForm}
                  data-en="AWESOME, BACK TO SITE"
                  data-ar="رائع، العودة للموقع"
                  className="bg-[#111409] text-[#EDE1D1] px-6 py-2.5 rounded-xl font-bold text-sm border-2 border-[#111409] shadow-brutal-sm hover:bg-[#EE9007] hover:text-[#111409] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                >
                  {language === 'AR' ? 'رائع، العودة للموقع' : 'AWESOME, BACK TO SITE'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
