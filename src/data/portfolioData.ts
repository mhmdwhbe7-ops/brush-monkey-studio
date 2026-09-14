import { Project, Service, Testimonial, ProcessStep } from '../types';
import pulseCarouselSystemImg from '../assets/images/pulse_carousel_system_1789306023755.jpg';
import pulseStoryTemplatesImg from '../assets/images/pulse_story_templates_1789306039160.jpg';
import pulseFigmaSystemImg from '../assets/images/pulse_figma_system_1789306054745.jpg';
import pulseReelsSuiteImg from '../assets/images/pulse_reels_suite_1789306070247.jpg';
import orbitBrandIdentityImg from '../assets/images/regenerated_image_1789302430458.png';
import orbitHeroIntroImg from '../assets/images/orbit_hero_intro_1789304673021.jpg';
import orbitLogoSystemImg from '../assets/images/orbit_logo_system_1789304700964.jpg';
import orbitBrandSystemImg from '../assets/images/orbit_brand_system_1789304686351.jpg';
import orbitBrandAppsImg from '../assets/images/orbit_brand_apps_1789303034095.jpg';
import cornerMenusSystemImg from '../assets/images/corner_menus_system_1789320512718.jpg';
import cornerPostersSuiteImg from '../assets/images/corner_posters_suite_1789320524250.jpg';
import cornerPackagingLabelsImg from '../assets/images/corner_packaging_labels_1789320536283.jpg';
import cornerCollateralCardsImg from '../assets/images/corner_collateral_cards_1789320547130.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'pulse-social-suite',
    title: 'PULSE DRINK CO.',
    titleAr: 'مشروبات بولس',
    category: 'social-media',
    categoryLabel: 'Social Media Templates',
    categoryLabelAr: 'قوالب سوشال ميديا',
    colorTheme: 'tangerine',
    shortDesc: 'A 45+ piece modular social media content template kit for Instagram, TikTok & LinkedIn.',
    shortDescAr: 'حزمة قوالب سوشال ميديا معيارية متكاملة تتجاوز 45 تصميماً لمنصات إنستغرام، تيك توك ولينكدإن.',
    fullDesc:
      'Engineered as a speculative concept case study, Pulse demonstrates our modular visual system for social presence: an editable framework of carousel infographics, product drop announcements, reel title covers, and story templates created in Figma for rapid one-click publishing.',
    fullDescAr:
      'صُمم هذا المشروع كدراسة حالة ونموذج تجريبي افتراضي يُبرز نظامنا البصري للمحتوى الرقمي: هندسة قوالب معيارية لمنشورات الكاروسيل، بطاقات إعلانات المنتجات، وأغلفة الريلز في فيغما لتسهيل النشر السريع.',
    deliverables: ['Instagram Feed & Carousel System', 'Animated Story & Reel Cover Kits', 'Figma & Canva Master Component Files', 'Content Typography & Tone Cheat Sheet'],
    deliverablesAr: ['نظام منشورات وإنفوجرافيك كاروسيل', 'حزمة أغلفة متحركة للستوري والريلز', 'ملفات أصلية مفتوحة في فيغما وكانفا', 'دليل أسلوب الخطوط والنبرة البصرية'],
    year: '2025',
    client: 'Pulse Functional Botanicals (Concept Brand)',
    clientAr: 'بولس للمشروبات الحيوية (علامة تجريبية افتراضية)',
    highlightMetric: 'Simulated Benchmark: +320% Social Reach Framework',
    highlightMetricAr: 'معيار تجريبي: هيكل نمو وصول +320%',
    palette: [
      { name: 'Coral', hex: '#E86A5B', isDarkText: false },
      { name: 'Sage', hex: '#9CAF88', isDarkText: true },
      { name: 'Plum', hex: '#342538', isDarkText: false },
      { name: 'Oat', hex: '#F3EBDD', isDarkText: true },
      { name: 'Citrus', hex: '#D8C95A', isDarkText: true },
    ],
    images: [
      {
        url: pulseCarouselSystemImg,
        caption: '01 — Instagram Feed & Carousel System: Botanical ingredient education, functional benefits, and product info slides (3:2)',
        captionAr: '01 — نظام تغذية وإنفوجرافيك الكاروسيل لإنستغرام: تثقيف المكونات النباتية والفوائد الوظيفية للمنتج (3:2)',
        alt: '01 Instagram Feed and Carousel System Pulse Drink Co',
      },
      {
        url: pulseStoryTemplatesImg,
        caption: '02 — Story & Announcement Templates: Curated 9:16 layout system for product drops and botanical highlights (3:2)',
        captionAr: '02 — قوالب الستوري والإعلانات: نظام قوالب 9:16 للنشر اليومي وإطلاق المنتجات والومضات الحيوية (3:2)',
        alt: '02 Story and Announcement Templates Pulse Drink Co',
      },
      {
        url: pulseFigmaSystemImg,
        caption: '03 — Figma Social Template Design System: Color tokens, typographic hierarchy, modular cards and reusable components (3:2)',
        captionAr: '03 — نظام تصميم قوالب فيغما للسوشال ميديا: رموز الألوان، التسلسل الطباعي والمكونات المعيارية (3:2)',
        alt: '03 Figma Social Template Design System Pulse Drink Co',
      },
      {
        url: pulseReelsSuiteImg,
        caption: '04 — Reels & Motion Cover Suite: Branded 9:16 video covers, botanical silhouettes and dynamic typography (3:2)',
        captionAr: '04 — حزمة أغلفة الريلز والحركة: أغلفة مقاطع فيديو 9:16، ظلال نباتية وعناوين ديناميكية (3:2)',
        alt: '04 Reels and Motion Cover Suite Pulse Drink Co',
      },
    ],
    quote: {
      text: 'Our team produces professional social posts in under 5 minutes now. The brand recognition skyrocketed.',
      textAr: 'أصبح فريقنا ينشر تصاميم احترافية في أقل من 5 دقائق. زاد التعرف على علامتنا بشكل غير مسبوق.',
      author: 'Maya Lin, Marketing Director',
      authorAr: 'مايا لين، مديرة التسويق',
    },
  },
  {
    id: 'orbit-starter-kit',
    title: 'ORBIT AI LABS',
    titleAr: 'مختبرات أوربت',
    category: 'startup-kit',
    categoryLabel: 'Startup Starter Kit',
    categoryLabelAr: 'حزم هوية أولية للشركات الناشئة',
    colorTheme: 'forest',
    shortDesc: 'A rapid 7-day brand identity package for a seed-stage tech startup ready to launch.',
    shortDescAr: 'حزمة هوية أولية متكاملة نُفذت في 7 أيام لشركة تقنية ناشئة جاهزة للإطلاق الاستثماري.',
    fullDesc:
      'Created as a rapid concept study for a seed-stage tech startup, Orbit demonstrates our 7-day starter kit methodology: responsive wordmark, punchy color palette, mini guidelines, and digital launch graphics designed to pitch venture investors and ship beta products.',
    fullDescAr:
      'تم تطوير هذا المشروع كدراسة حالة ونموذج افتراضي لشركة تقنية ناشئة، ليبرز منهجيتنا في تنفيذ حزمة هوية أولية خلال أسبوع: شعار رمزي متجاوب، لوحة ألوان قوية، ودليل إرشادات مصغر وأصول إطلاق استثماري متماسكة.',
    deliverables: ['Responsive Primary & Icon Mark Suite', 'Chroma Color Guide & Google Fonts System', 'One-Page Mini Brand Guidelines PDF', 'Investor Deck Template & Social Launch Assets'],
    deliverablesAr: ['شعار رئيسي وأيقونات متجاوبة لجميع الشاشات', 'دليل ألوان ونظام خطوط متناسق', 'دليل أسلوب وهوية مصغر وسهل التطبيق', 'قوالب العرض الاستثماري وأصول الإطلاق الرقمي'],
    year: '2025',
    client: 'Orbit Technologies (Concept Startup)',
    clientAr: 'تقنيات أوربت (شركة تقنية افتراضية)',
    highlightMetric: 'Concept Benchmark: Seed-Ready Pitch Identity',
    highlightMetricAr: 'معيار تجريبي: هوية متكاملة لجولات الاستثمار',
    palette: [
      { name: 'Midnight', hex: '#111322' },
      { name: 'Electric Indigo', hex: '#5146E5' },
      { name: 'Soft Lilac', hex: '#C9C5FF', isDarkText: true },
      { name: 'Cloud', hex: '#F4F3EE', isDarkText: true },
      { name: 'Acid Lime', hex: '#C7F36B', isDarkText: true },
    ],
    images: [
      {
        url: orbitHeroIntroImg,
        caption: '01 — HERO / BRAND INTRO: Orbit AI Labs "Intelligence in Motion" orbital brand presentation (3:2)',
        captionAr: '01 — الهوية الرئيسية والافتتاحية: نظام مدارات الذكاء الاصطناعي "Intelligence in Motion" (3:2)',
        alt: 'Orbit AI Labs 01 Hero Brand Intro Presentation',
      },
      {
        url: orbitLogoSystemImg,
        caption: '02 — LOGO SYSTEM: Primary wordmark, compact lockup, orbital symbol & scaling matrix (3:2)',
        captionAr: '02 — نظام الشعار: الشعار النصي، القفل المدمج، رمز المدار ومصفوفة المقاسات والألوان (3:2)',
        alt: 'Orbit AI Labs 02 Logo System Presentation',
      },
      {
        url: orbitBrandSystemImg,
        caption: '03 — BRAND SYSTEM / VISUAL LANGUAGE: 5-color palette system, typographic specimen & orbital data flow (3:2)',
        captionAr: '03 — نظام الهوية واللغة البصرية: منظومة الألوان الخمسة، عينات التيبوغرافي ومسارات البيانات المدارية (3:2)',
        alt: 'Orbit AI Labs 03 Brand System Visual Language Presentation',
      },
      {
        url: orbitBrandAppsImg,
        caption: '04 — ABSTRACT DIGITAL APPLICATIONS: AI intelligence score dashboard, insight vectors & mobile UI (3:2)',
        captionAr: '04 — التطبيقات الرقمية التجريدية: لوحة تحكم مؤشر الذكاء، متجهات الاستبصار وتطبيقات الجوال (3:2)',
        alt: 'Orbit AI Labs 04 Abstract Digital Applications Presentation',
      },
    ],
    quote: {
      text: 'The Startup Starter Kit gave us the confidence and polished look of a Series B company on a day-one budget.',
      textAr: 'منحتنا حزمة الهوية الأولية مظهر وثقة شركة رائدة بميزانية مدروسة ومناسبة لانطلاقتنا الأولى.',
      author: 'Tariq Al-Mansoor, Co-Founder & CEO',
      authorAr: 'طارق المنصور، الشريك المؤسس والرئيس التنفيذي',
    },
  },
  {
    id: 'corner-roastery-print',
    title: 'THE CORNER ROASTERY',
    titleAr: 'محمصة ذا كورنر',
    category: 'print-design',
    categoryLabel: 'Small Business Print Design',
    categoryLabelAr: 'تصميم مطبوعات للأعمال الصغيرة',
    colorTheme: 'cream',
    shortDesc: 'Tactile coffee menus, event posters, loyalty cards, and packaging stickers for a neighborhood cafe.',
    shortDescAr: 'قوائم طعام للمقهى، ملصقات فعاليات، بطاقات ولاء، ولاصقات تغليف ملموسة لمشروع محلي محبوب.',
    fullDesc:
      'Developed as a tactile print design showcase for an artisan roastery, demonstrating how neighborhood businesses can leverage tangible print: heavy kraft paper menus, loyalty punchcards, packaging stickers, and seasonal event posters.',
    fullDescAr:
      'تم إعداد هذا المشروع كدراسة حالة ونموذج افتراضي لتصاميم المطبوعات الملموسة لمحمصة ومقهى، مستعرضاً كيفية استثمار المطبوعات: قوائم المشروبات على ورق الكرافت، بطاقات الولاء بالأختام، وملصقات الفعاليات الثقافية.',
    deliverables: ['Laminated Counter Menus & Table Cards', 'Die-Cut Coffee Bag Labels & Stickers', 'Seasonal Cultural Event Posters', 'Loyalty Stamp Cards & Print-Ready Artwork'],
    deliverablesAr: ['قوائم طعام للكاونتر وبطاقات الطاولات', 'ملصقات مخصصة لأكياس حبوب القهوة', 'بوسترات الفعاليات الثقافية والموسيقية', 'بطاقات ولاء بالأختام وملفات مفصولة للطباعة'],
    year: '2025',
    client: 'The Corner Artisan Roasters (Concept Cafe)',
    clientAr: 'محمصة ذا كورنر الحرفية (مقهى تجريبي افتراضي)',
    highlightMetric: 'Concept Benchmark: Complete Pre-Press & Collateral Suite',
    highlightMetricAr: 'معيار تجريبي: حزمة مطبوعات ومواصفات تجارية متكاملة',
    palette: [
      { name: 'Dark Roast', hex: '#241812', isDarkText: false },
      { name: 'Terracotta', hex: '#C86D3B', isDarkText: false },
      { name: 'Warm Cream', hex: '#EDE1D1', isDarkText: true },
      { name: 'Kraft Amber', hex: '#D4A373', isDarkText: true },
      { name: 'Matcha Sage', hex: '#606C38', isDarkText: false },
    ],
    images: [
      {
        url: cornerMenusSystemImg,
        caption: '01 — Tactile Menu & Table Suite: Kraft paper drink menus, table cards & pricing grid (3:2)',
        captionAr: '01 — قوائم المقهى وبطاقات الطاولات: ورق كرافت ملموس وشبكة تسعير أنيقة (3:2)',
        alt: '01 Tactile Menu and Table Suite The Corner Roastery',
      },
      {
        url: cornerPostersSuiteImg,
        caption: '02 — Cultural Event & Gig Posters: Silkscreen posters, acoustic evenings & retro typography (3:2)',
        captionAr: '02 — ملصقات الفعاليات والأمسيات الحية: طباعة سلك سكرين وبوسترات جدارية بخطوط كلاسيكية (3:2)',
        alt: '02 Cultural Event and Gig Posters The Corner Roastery',
      },
      {
        url: cornerPackagingLabelsImg,
        caption: '03 — Specialty Packaging & Bag Labels: Die-cut kraft labels with foil stamped accents (3:2)',
        captionAr: '03 — أكياس وملصقات القهوة المختصة: ملصقات مقصوصة بدقة مع تفاصيل فويل معدنية (3:2)',
        alt: '03 Specialty Packaging and Bag Labels The Corner Roastery',
      },
      {
        url: cornerCollateralCardsImg,
        caption: '04 — Collateral & Loyalty Suite: Stamped loyalty punchcards & takeaway sleeves (3:2)',
        captionAr: '04 — ملحقات الهوية وبطاقات الولاء: كروت أختام الولاء وأغلفة أكواب المشروبات (3:2)',
        alt: '04 Collateral and Loyalty Suite The Corner Roastery',
      },
    ],
    quote: {
      text: 'Our local customers literally ask to buy our posters off the wall. Print gives us an unbeatable neighborhood identity.',
      textAr: 'الزبائن يطلبون شراء بوستراتنا المعلقة على الجدران! المطبوعات منحتنا حضوراً محلياً استثنائياً.',
      author: 'Khalid & Layla, Founders',
      authorAr: 'خالد وليلى، المؤسسان',
    },
  },
];

export const SERVICES: Service[] = [
  {
    id: 'social-media-templates',
    title: 'Social Media Templates',
    titleAr: 'قوالب سوشال ميديا',
    icon: '📱',
    colorTheme: 'tangerine',
    description: 'High-engagement, scroll-stopping social templates that keep your startup visible every single day.',
    descriptionAr: 'قوالب منشورات وقصص جذابة وعالية التفاعل تُبقي الاستوديو والعلامة حاضرين دائمًا في أذهان الجمهور.',
    deliverables: ['Instagram & LinkedIn Grid Templates', 'Story & Reel Cover Layouts', 'Editable Figma / Canva Files', 'Typography & Asset Guidelines'],
    deliverablesAr: ['قوالب شبكة إنستغرام ولينكدإن', 'تصاميم أغلفة الستوري والريلز', 'ملفات مفتوحة قابلة للتعديل', 'إرشادات الخطوط والأصول البصرية'],
  },
  {
    id: 'startup-starter-kit',
    title: 'Startup Starter Kit',
    titleAr: 'حزم هوية أولية للشركات الناشئة',
    icon: '⚡',
    colorTheme: 'forest',
    description: 'A rapid, punchy foundational identity designed for early-stage startups ready to launch fast.',
    descriptionAr: 'هوية بصرية أولية أساسية وسريعة التسليم تناسب انطلاقة الشركات الناشئة بدون تعقيد أو تكاليف باهظة.',
    deliverables: ['Primary & Responsive Logo Mark', 'Core Color Palette & Typography', 'Mini Brand Guidelines Sheet', 'Social & Web Launch Kit'],
    deliverablesAr: ['شعار رئيسي متجاوب وأيقوني', 'لوحة ألوان متناسقة وقواعد الخطوط', 'دليل أسلوب مبسط ومباشر', 'حزمة أصول الإطلاق الرقمي'],
  },
  {
    id: 'small-business-print',
    title: 'Small Business Print Design',
    titleAr: 'تصميم مطبوعات للأعمال الصغيرة',
    icon: '📰',
    colorTheme: 'cream',
    description: 'Tactile editorial layouts, event posters, and menus that capture attention in local physical spaces.',
    descriptionAr: 'تصاميم تحريرية، ملصقات فعاليات، وقوائم طعام وبطاقات تفتح لك سوقاً محلياً واسعاً بمنافسة أقل.',
    deliverables: ['Event Posters & Art Prints', 'Menus, Flyers & Postcards', 'Packaging Sleeves & Stickers', 'High-Res Print-Ready Production'],
    deliverablesAr: ['ملصقات فعاليات وبوسترات جدارية', 'قوائم طعام وبروشورات ترويجية', 'أغلفة منتجات وملصقات لاصقة', 'ملفات جاهزة للمطابع بدقة فائقة'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Brush Monkey totally nailed our brand vibe! Working together was effortless, hilarious, and the results speak for themselves.',
    quoteAr: 'أصاب استوديو بروش مونكي روح علامتنا بدقة متناهية! كان التعاون سلساً وممتعاً والنتائج المذهلة تتحدث عن نفسها.',
    client: 'Sarah Jenkins',
    clientAr: 'سارة جينكينز',
    role: 'Founder & CEO',
    roleAr: 'المؤسسة والرئيسة التنفيذية',
    company: 'PopSoda Co.',
    companyAr: 'بوب سودا',
    tag: '⚡ BRAND IDENTITY',
    tagAr: '⚡ هوية بصرية',
  },
  {
    id: '2',
    quote: 'Incredible creativity and infectious energy. They turned our boring corporate brief into an absolute visual masterpiece that our customers adore.',
    quoteAr: 'إبداع لا يصدق وطاقة حيوية معدية. لقد حولوا ملخصنا التجاري الجاف إلى تحفة بصرية يعشقها جميع عملائنا.',
    client: 'Marcus Vance',
    clientAr: 'ماركوس فانس',
    role: 'Creative Director',
    roleAr: 'المدير الإبداعي',
    company: 'Vanguard Studios',
    companyAr: 'استوديوهات فانغارد',
    tag: '🎨 PACKAGING & LOGO',
    tagAr: '🎨 تغليف وشعار',
  },
  {
    id: '3',
    quote: 'They brought our mascot idea to life in ways we couldn’t even envision. Turnaround was lightning fast and the attention to detail is unmatched.',
    quoteAr: 'بعثوا الحياة في فكرة شخصيتنا التعبيرية بطرق لم نتخيلها. كان الإنجاز سريعاً كالبرق والدقة لا مثيل لها.',
    client: 'Elena Vance',
    clientAr: 'إلينا فانس',
    role: 'Product Lead',
    roleAr: 'مديرة تطوير المنتجات',
    company: 'Campfire Outdoor',
    companyAr: 'كامب فاير أوتدور',
    tag: '✏️ MASCOT & MERCH',
    tagAr: '✏️ تميمة ومنتجات',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Discover',
    titleAr: 'الاكتشاف',
    tagline: 'PEEL THE BANANA',
    taglineAr: 'تقشير الموزة',
    description: 'We chat, peel back layers, and uncover your brand’s true core, target audience, and weird super-powers.',
    descriptionAr: 'نتحاور ونتعمق في التفاصيل لنكشف الجوهر الحقيقي لعلامتك وجمهورك المستهدف ونقاط قوتك الفريدة.',
    deliverable: 'Creative Brief & Moodboard',
    deliverableAr: 'الموجز الإبداعي ولوحة الإلهام',
    emoji: '🔍',
  },
  {
    step: 2,
    title: 'Ideate',
    titleAr: 'توليد الأفكار',
    tagline: 'WILD SKETCHES',
    taglineAr: 'اسكتشات جريئة',
    description: 'Wild sketches, bold concepts, raw scribbles, and directions packed with undeniable personality.',
    descriptionAr: 'اسكتشات حرة ومفاهيم جريئة ورسومات أولية تعج بالشخصية والأصالة.',
    deliverable: '3 Distinct Visual Directions',
    deliverableAr: '3 اتجاهات بصرية مميزة',
    emoji: '💡',
  },
  {
    step: 3,
    title: 'Craft',
    titleAr: 'الصياغة والإتقان',
    tagline: 'PIXEL POLISH',
    taglineAr: 'صقل التفاصيل',
    description: 'Obsessively tuning bezier curves, color harmonies, bespoke type pairings, and vector perfection.',
    descriptionAr: 'ضبط دقيق لمنحنيات الفكتور وتناغم الألوان واختيار الخطوط لإخراج بصري لا تشوبه شائبة.',
    deliverable: 'Refined System & Mockups',
    deliverableAr: 'نظام متكامل ونماذج واقعية',
    emoji: '✨',
  },
  {
    step: 4,
    title: 'Deliver',
    titleAr: 'التسليم والانطلاق',
    tagline: 'READY TO SWING',
    taglineAr: 'جاهز للتحليق',
    description: 'Handing over your shiny new asset toolkit, brand guidelines, and vector files ready to conquer the world.',
    descriptionAr: 'تسليمك حزمة الأصول الإبداعية الكاملة ودليل الاستخدام وملفات الفكتور الجاهزة للانطلاق إلى العالم.',
    deliverable: 'Production-Ready Master Assets',
    deliverableAr: 'ملفات الإنتاج الأصلية والنهائية',
    emoji: '🚀',
  },
];

export const MASCOT_QUIPS: { en: string; ar: string }[] = [
  { en: "Hi, I'm Brush Monkey!", ar: "أهلاً، أنا بروش مونكي!" },
  { en: "Drop by and let's paint!", ar: "تفضل ولنرسم معاً!" },
  { en: "Got bananas? We got designs!", ar: "عندك أفكار؟ عندنا تصاميم!" },
  { en: "Click me for inspiration!", ar: "انقر هنا للإلهام!" },
  { en: "100% Vector Jungle Power!", ar: "قوة فكتور ١٠٠٪ بدون حدود!" },
  { en: "No boring brands allowed!", ar: "ممنوع العلامات التجارية المملة!" },
  { en: "Watch my eyes follow you!", ar: "انظر كيف تلاحقك عيناي!" },
];

export const STUDIO_FACTS = [
  { label: 'Boring Brands Made', labelAr: 'علامات تجارية مملة', value: '0', icon: '🚫' },
  { label: 'Bananas Consumed', labelAr: 'موز تم تناوله', value: '1,420+', icon: '🍌' },
  { label: 'Vector Points Plotted', labelAr: 'نقاط فكتور رُسمت', value: '850K', icon: '✏️' },
  { label: 'Happy Swingers', labelAr: 'عملاء سعداء بالنتائج', value: '100%', icon: '🐒' },
];
