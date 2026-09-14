import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Helper to convert an array of HTML page strings to a PDF
async function renderHtmlPagesToPdf(pagesHtml: string[], filename: string): Promise<void> {
  const container = document.createElement('div');
  container.id = 'pdf-arabic-render-container';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px';
  container.style.zIndex = '-9999';
  container.style.direction = 'rtl';
  container.style.fontFamily = "'Cairo', 'Tajawal', 'Segoe UI', Tahoma, sans-serif";
  container.style.color = '#111409';
  container.style.backgroundColor = '#EDE1D1';

  document.body.appendChild(container);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  try {
    for (let i = 0; i < pagesHtml.length; i++) {
      const pageEl = document.createElement('div');
      pageEl.style.width = '794px';
      pageEl.style.minHeight = '1123px';
      pageEl.style.height = '1123px';
      pageEl.style.boxSizing = 'border-box';
      pageEl.style.padding = '48px';
      pageEl.style.position = 'relative';
      pageEl.style.backgroundColor = '#EDE1D1';
      pageEl.style.display = 'flex';
      pageEl.style.flexDirection = 'column';
      pageEl.style.justifyContent = 'space-between';
      pageEl.innerHTML = pagesHtml[i];

      container.appendChild(pageEl);

      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#EDE1D1',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.96);

      if (i > 0) {
        doc.addPage();
      }

      // A4 is 210mm x 297mm
      doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);

      container.removeChild(pageEl);
    }

    doc.save(filename);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

// ----------------------------------------------------------------------
// 1. ARABIC BRAND LAUNCH STARTER GUIDE (4 PAGES)
// ----------------------------------------------------------------------
export async function generateArabicBrandGuidePdf(): Promise<void> {
  const pages: string[] = [
    // Page 1: Cover
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #EE9007;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 30px;">
      <span style="font-weight: bold; font-size: 13px; letter-spacing: 1px;">استوديو براش مونكي // حزمة الهوية البصرية 2026</span>
      <span style="font-size: 12px; color: #555;">النسخة العربية المعتمدة • الصفحة 1 من 4</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around;">
      <div>
        <div style="display: inline-block; background: #EE9007; color: #111409; font-weight: bold; padding: 6px 14px; border-radius: 6px; border: 2px solid #111409; font-size: 13px; margin-bottom: 18px;">
          حقيبة الاستوديو المجانية #01
        </div>
        <h1 style="font-size: 44px; font-weight: 900; line-height: 1.2; margin: 0 0 16px 0; color: #111409;">
          دليل وقائمة إطلاق
          <br />
          <span style="color: #EE9007; -webkit-text-stroke: 1px #111409;">الهوية البصرية</span>
        </h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6; max-width: 600px; margin: 0;">
          الدليل العملي الشامل للشركات الناشئة والمصممين ورواد الأعمال لتطبيق وإدارة أصول الهوية البصرية بدقة واحترافية.
        </p>
      </div>

      <div style="background: #ffffff; border: 2px solid #111409; padding: 24px; border-radius: 12px; box-shadow: 4px 4px 0px #111409;">
        <h3 style="font-size: 16px; font-weight: 800; color: #EE9007; margin-top: 0; margin-bottom: 14px;">
          أهم المحاور والأهداف في هذا الدليل:
        </h3>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2;">
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>تحديد هوامش الأمان والمساحات العازلة للشعار (قاعدة 1.5X) والحد الأدنى للقياسات.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>تثبيت شفرات الألوان الرقمية والطباعية (HEX / RGB / CMYK) بمعايير تباين عالمية.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>بناء التسلسل الهرمي للخطوط العربية والإنجليزية بنسب تباعد متوازنة.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>قائمة الفحص النهائية من 16 بنداً للتحقق قبل الإعلان الرسمي عن إطلاق المشروع.</span>
          </li>
        </ul>
      </div>

      <div style="background: #111409; color: #EDE1D1; padding: 18px 24px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 11px; color: #EE9007; display: block; font-weight: bold;">إعداد وتطوير</span>
          <span style="font-size: 15px; font-weight: bold;">قسم أنظمة التصميم — استوديو براش مونكي</span>
        </div>
        <span style="font-size: 13px; font-weight: bold; color: #EDE1D1; border: 1px solid rgba(237,225,209,0.3); padding: 4px 10px; border-radius: 6px;">
          إصدار 2026
        </span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>جميع الحقوق محفوظة © استوديو براش مونكي</span>
      <span>مورد مجاني مفتوح المصدر</span>
    </div>
    `,

    // Page 2: Clearspace & Formats
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #EE9007;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // القسم الأول: هندسة الشعار</span>
      <span style="font-size: 12px; color: #555;">الصفحة 2 من 4</span>
    </div>

    <div>
      <span style="color: #EE9007; font-weight: bold; font-size: 13px;">القسم 01 // المعايير الهندسية</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        هوامش أمان الشعار والقياسات المعتمدة
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        للحفاظ على هيبة وقوة الشعار وسهولة قراءته في مختلف التطبيقات الرقمية والطباعية، يجب الالتزام الصارم بالمساحة الآمنة والحدود الدنيا.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div style="background: #ffffff; border: 2px solid #111409; padding: 18px; border-radius: 10px;">
          <h4 style="font-size: 14px; font-weight: bold; color: #111409; margin-top: 0; margin-bottom: 8px;">
            قاعدة مسافة الأمان (1.5X Clearspace)
          </h4>
          <p style="font-size: 12px; color: #555; line-height: 1.6; margin-bottom: 12px;">
            يمنع منعاً باتاً وضع أي نص أو عنصر تصميمي أو حافة شاشة ضمن نطاق يعادل 1.5 ضعف ارتفاع الحرف الأساسي للشعار.
          </p>
          <div style="background: #EDE1D1; border: 2px dashed #EE9007; padding: 20px; text-align: center; border-radius: 6px;">
            <span style="font-size: 18px; font-weight: 900; color: #111409;">[ مساحة الشعار الأساسي ]</span>
            <div style="font-size: 11px; color: #EE9007; font-weight: bold; margin-top: 6px;">هامش عازل 1.5X من الجهات الأربع</div>
          </div>
        </div>

        <div style="background: #ffffff; border: 2px solid #111409; padding: 18px; border-radius: 10px;">
          <h4 style="font-size: 14px; font-weight: bold; color: #111409; margin-top: 0; margin-bottom: 8px;">
            الحدود الدنيا لقياسات الشعار
          </h4>
          <div style="font-size: 12px; line-height: 2.2; color: #222;">
            <div>• أيقونة الموقع (Favicon): <strong>32 × 32 بكسل</strong></div>
            <div>• ترويسة الموقع (Web Header): <strong>بارتفاع 36 بكسل</strong></div>
            <div>• أيقونة التطبيقات (App Icon): <strong>1024 × 1024 بكسل</strong></div>
            <div>• بطاقات الأعمال (Business Cards): <strong>عرض لا يقل عن 24 مم</strong></div>
            <div>• التطريز والملابس (Embroidery): <strong>عرض لا يقل عن 35 مم</strong></div>
          </div>
        </div>
      </div>

      <div style="border: 2px solid #111409; border-radius: 10px; overflow: hidden; background: #fff;">
        <div style="background: #111409; color: #EDE1D1; padding: 10px 16px; font-size: 13px; font-weight: bold;">
          مصفوفة صيغ تصدير ملفات الشعار الموصى بها
        </div>
        <div style="font-size: 12px; line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #ddd;">
            <span style="font-weight: bold; color: #111409;">ملفات المتجهات الفائقة (.SVG)</span>
            <span style="color: #555;">مثالية لتطبيقات الويب، الشاشات عالية الكثافة، ولا تفقد جودتها إطلاقاً عند التكبير.</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #ddd; background: rgba(237,225,209,0.4);">
            <span style="font-weight: bold; color: #111409;">ملفات المطابع المعتمدة (.PDF / .EPS)</span>
            <span style="color: #555;">متجهات جاهزة لخطوط إنتاج المطابع، اللوحات الخارجية، وماكينات الليزر بنظام CMYK.</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px 16px;">
            <span style="font-weight: bold; color: #111409;">الصور الشفافة بدقة 3X (.PNG)</span>
            <span style="color: #555;">مخصصة للعروض التقديمية (Keynote/Slides) وتطبيقات السوشيال ميديا.</span>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // دليل إطلاق الهوية البصرية</span>
      <span>الصفحة 2</span>
    </div>
    `,

    // Page 3: Colors & Typography
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #EE9007;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // القسم الثاني: الألوان والخطوط</span>
      <span style="font-size: 12px; color: #555;">الصفحة 3 من 4</span>
    </div>

    <div>
      <span style="color: #EE9007; font-weight: bold; font-size: 13px;">القسم 02 // منظومة الألوان والطباعة</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        لوحة الألوان المعتمدة والتسلسل الهرمي للخطوط
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        تمت معايرة جميع الألوان لتحقيق أعلى درجات الوضوح والتباين البصري وفق معايير إمكانية الوصول العالمية (WCAG AA 4.5:1).
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <div style="width: 50px; height: 50px; border-radius: 6px; background: #EE9007; border: 1px solid #111409; flex-shrink: 0;"></div>
          <div style="font-size: 12px;">
            <span style="font-weight: bold; font-size: 14px; display: block; color: #111409;">برتقالي تانجرين (Tangerine)</span>
            <span style="color: #666; font-family: monospace;">HEX: #EE9007 • لون التفاعل والتمييز</span>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <div style="width: 50px; height: 50px; border-radius: 6px; background: #111409; border: 1px solid #111409; flex-shrink: 0;"></div>
          <div style="font-size: 12px;">
            <span style="font-weight: bold; font-size: 14px; display: block; color: #111409;">الأسود الغابي (Deep Forest)</span>
            <span style="color: #666; font-family: monospace;">HEX: #111409 • لون النصوص والحدود</span>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <div style="width: 50px; height: 50px; border-radius: 6px; background: #EDE1D1; border: 1px solid #111409; flex-shrink: 0;"></div>
          <div style="font-size: 12px;">
            <span style="font-weight: bold; font-size: 14px; display: block; color: #111409;">الكريمي الدافئ (Warm Cream)</span>
            <span style="color: #666; font-family: monospace;">HEX: #EDE1D1 • مساحة الخلفية المريحة</span>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <div style="width: 50px; height: 50px; border-radius: 6px; background: #C7F36B; border: 1px solid #111409; flex-shrink: 0;"></div>
          <div style="font-size: 12px;">
            <span style="font-weight: bold; font-size: 14px; display: block; color: #111409;">الليموني الفسفوري (Acid Lime)</span>
            <span style="color: #666; font-family: monospace;">HEX: #C7F36B • شارات التنبيه والوسوم</span>
          </div>
        </div>
      </div>

      <div style="background: #fff; border: 2px solid #111409; padding: 18px; border-radius: 10px;">
        <h4 style="font-size: 14px; font-weight: bold; color: #111409; margin-top: 0; margin-bottom: 12px;">
          التسلسل الهرمي للخطوط العربية واللاتينية
        </h4>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 8px;">
            <div>
              <span style="font-size: 20px; font-weight: 900; color: #111409;">العناوين البارزة الكبرى (Display Titles)</span>
              <div style="font-size: 11px; color: #777;">خط Cairo Bold / Syne Bold بحجم 40-48 بكسل</div>
            </div>
            <span style="background: #EE9007; color: #111409; font-weight: bold; padding: 2px 8px; border-radius: 4px; font-size: 11px;">عريض جداً</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 8px;">
            <div>
              <span style="font-size: 16px; font-weight: bold; color: #111409;">عناوين الأقسام والمواضيع (Section Headers)</span>
              <div style="font-size: 11px; color: #777;">خط Cairo SemiBold بحجم 24-28 بكسل</div>
            </div>
            <span style="background: #111409; color: #EDE1D1; font-weight: bold; padding: 2px 8px; border-radius: 4px; font-size: 11px;">شبه عريض</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 13px; color: #333;">نصوص الفقرات والمقالات (Body Copy)</span>
              <div style="font-size: 11px; color: #777;">خط Cairo Regular بحجم 15-16 بكسل مع تباعد أسطر 1.6</div>
            </div>
            <span style="border: 1px solid #999; color: #555; padding: 2px 8px; border-radius: 4px; font-size: 11px;">عادي للقراءة</span>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // دليل إطلاق الهوية البصرية</span>
      <span>الصفحة 3</span>
    </div>
    `,

    // Page 4: Launch Checklist
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #EE9007;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // القسم الثالث: الفحص النهائي</span>
      <span style="font-size: 12px; color: #555;">الصفحة 4 من 4</span>
    </div>

    <div>
      <span style="color: #EE9007; font-weight: bold; font-size: 13px;">القسم 03 // التدقيق قبل النشر</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        قائمة تدقيق إطلاق الهوية البصرية (16 بنداً)
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        راجع هذه البنود وتحقق من اكتمالها قبل فتح القنوات العامة وإطلاق الموقع الإلكتروني:
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">رفع أيقونات المتصفح والشاشات الذكية بكافة المقاسات (32, 180, 512 بكسل).</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">ربط بطاقة المشاركة لمواقع التواصل (Open Graph Image Card 1200x630px).</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">اختبار الشعار المتجهي (.SVG) وتأكيد وضوحه على الخلفيات الفاتحة والداكنة.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">التأكد من توسط الشعار داخل الإطار الدائري لحسابات إنستغرام وتويتر ولينكد إن.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">التأكد من ترخيص خطوط الويب للشركات ودعمها الكامل لعلامات التشكيل العربية.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">تجهيز ملف الحزمة الإعلامية (Press Kit) بالشعارات المفرغة ونبذة المؤسسين.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #EE9007; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #EE9007;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">توحيد نماذج عروض الأسعار، الفواتير، ومستندات العمل بنفس طابع الهوية.</span>
        </div>
      </div>

      <div style="margin-top: 20px; background: #EE9007; color: #111409; border: 2px solid #111409; border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 14px; font-weight: 900; display: block;">هل تريد من الاستوديو بناء هوية مخصصة لمشروعك؟</span>
          <span style="font-size: 12px;">نقدم خدمات تطوير الهويات البصرية الكاملة ونظم التصميم للمتاجر والشركات.</span>
        </div>
        <span style="background: #111409; color: #EDE1D1; font-weight: bold; padding: 6px 14px; border-radius: 6px; font-size: 12px;">
          تواصل معنا
        </span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // نهاية الدليل</span>
      <span>الصفحة 4 من 4</span>
    </div>
    `
  ];

  await renderHtmlPagesToPdf(pages, 'دليل-إطلاق-الهوية-البصرية-BrushMonkey-AR.pdf');
}

// ----------------------------------------------------------------------
// 2. ARABIC SOCIAL CAROUSEL KIT (3 PAGES)
// ----------------------------------------------------------------------
export async function generateArabicCarouselKitPdf(): Promise<void> {
  const pages: string[] = [
    // Page 1: Cover
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #111409;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 30px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // مواصفات قوالب فيغما وكانفا</span>
      <span style="font-size: 12px; color: #555;">النسخة العربية • الصفحة 1 من 3</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around;">
      <div>
        <div style="display: inline-block; background: #111409; color: #EDE1D1; font-weight: bold; padding: 6px 14px; border-radius: 6px; font-size: 13px; margin-bottom: 18px;">
          مواصفات فيغما وكانفا #02
        </div>
        <h1 style="font-size: 44px; font-weight: 900; line-height: 1.2; margin: 0 0 16px 0; color: #111409;">
          حقيبة قوالب
          <br />
          <span style="color: #EE9007;">الكاروسيل الجاهزة للنشر</span>
        </h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6; max-width: 600px; margin: 0;">
          قوالب فيغما وكانفا مبنية بنظام التخطيط التلقائي (Auto-Layout) لزيادة التفاعل والحفظ والمشاركة على إنستغرام ولينكد إن.
        </p>
      </div>

      <div style="background: #ffffff; border: 2px solid #111409; padding: 24px; border-radius: 12px; box-shadow: 4px 4px 0px #111409;">
        <h3 style="font-size: 16px; font-weight: 800; color: #EE9007; margin-top: 0; margin-bottom: 14px;">
          مواصفات الحقيبة ومحتوياتها الفنية:
        </h3>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2;">
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>24 لوحة عمل بمقاس 1080 × 1350 بكسل (النسبة العمودية المثالية 4:5 الأكثر تفاعلاً).</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>12 قالباً للريلز والقصص اليومية بمقاس 1080 × 1920 بكسل (نسبة 9:16).</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>مكونات متغيرة تدعم تغيير النصوص والصور والألوان بنقرة واحدة عبر المتغيرات المحلية.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #EE9007; font-weight: bold; font-size: 18px;">✦</span>
            <span>نمطان للتصميم: النمط التحريري الكريمي الفاتح ونمط الأوبسيديان الداكن الفاخر.</span>
          </li>
        </ul>
      </div>

      <div style="background: #EE9007; color: #111409; border: 2px solid #111409; padding: 18px 24px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 11px; font-weight: bold; display: block;">ترخيص مفتوح</span>
          <span style="font-size: 15px; font-weight: 900;">مجاني للاستخدام التجاري للمشاريع والعملاء</span>
        </div>
        <span style="font-size: 13px; font-weight: bold; border: 1px solid #111409; padding: 4px 10px; border-radius: 6px;">
          الإصدار 3.0
        </span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // حزمة قوالب الكاروسيل</span>
      <span>الصفحة 1 من 3</span>
    </div>
    `,

    // Page 2: 7-Slide Framework
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #EE9007;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // استراتيجية السرد القصصي</span>
      <span style="font-size: 12px; color: #555;">الصفحة 2 من 3</span>
    </div>

    <div>
      <span style="color: #EE9007; font-weight: bold; font-size: 13px;">الهيكل البصري // استراتيجية التفاعل</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        معادلة الشرائح السبع (7-Slide Framework)
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 18px;">
        تم تصميم هذا التسلسل هندسياً لرفع معدل إكمال القراءة وزيادة عمليات الحفظ وإعادة الإرسال:
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <span style="background: #EE9007; color: #111409; font-weight: 900; font-size: 14px; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">01</span>
          <div>
            <h4 style="font-size: 13px; font-weight: bold; margin: 0; color: #111409;">شريحة خطاف التمرير (The Scroll-Stopper Hook)</h4>
            <p style="font-size: 11px; color: #666; margin: 2px 0 0 0;">عنوان صادم أو يطرح فجوة فضول، لا يتجاوز 7 كلمات بخط ضخم ومتباين.</p>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <span style="background: #EE9007; color: #111409; font-weight: 900; font-size: 14px; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">02</span>
          <div>
            <h4 style="font-size: 13px; font-weight: bold; margin: 0; color: #111409;">شريحة المشكلة والاحتكاك اليومي (Friction & Pain-Point)</h4>
            <p style="font-size: 11px; color: #666; margin: 2px 0 0 0;">تسمية المعاناة التي يواجهها جمهورك بوضوح لخلق ألفة فورية.</p>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <span style="background: #EE9007; color: #111409; font-weight: 900; font-size: 14px; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">03-05</span>
          <div>
            <h4 style="font-size: 13px; font-weight: bold; margin: 0; color: #111409;">شرائح القيمة المركزة (Value Nuggets)</h4>
            <p style="font-size: 11px; color: #666; margin: 2px 0 0 0;">فكرة واحدة محددة وقابلة للتطبيق في كل شريحة مع إبراز الكلمات المحورية.</p>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <span style="background: #EE9007; color: #111409; font-weight: 900; font-size: 14px; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">06</span>
          <div>
            <h4 style="font-size: 13px; font-weight: bold; margin: 0; color: #111409;">شريحة الملخص الشامل (Summary Cheat-Sheet)</h4>
            <p style="font-size: 11px; color: #666; margin: 2px 0 0 0;">تلخيص الدرس بالكامل في نقاط سريعة، وهي الشريحة المسؤولة عن 80% من حفظ المنشور.</p>
          </div>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 14px;">
          <span style="background: #111409; color: #EDE1D1; font-weight: 900; font-size: 14px; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">07</span>
          <div>
            <h4 style="font-size: 13px; font-weight: bold; margin: 0; color: #111409;">شريحة الدعوة لاتخاذ إجراء (Single CTA)</h4>
            <p style="font-size: 11px; color: #666; margin: 2px 0 0 0;">طلب إجراء واحد فقط ومحدد: "احفظ المنشور للرجوع إليه" أو "تابع الحساب".</p>
          </div>
        </div>
      </div>

      <div style="background: #EDE1D1; border: 2px solid #111409; padding: 14px; border-radius: 8px; font-size: 12px;">
        <strong style="color: #EE9007; display: block; margin-bottom: 4px;">نصيحة خبير لمنصتي إنستغرام ولينكد إن:</strong>
        النسبة الرأسية 4:5 (1080 × 1350) تشغل مساحة بصرية أكبر بنسبة 35% على شاشات الهواتف مقارنة بالمنشور المربع 1:1، مما يضاعف مدة بقاء المستخدم على المنشور.
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // حزمة قوالب الكاروسيل</span>
      <span>الصفحة 2 من 3</span>
    </div>
    `,

    // Page 3: Auto-Layout & Specs
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #EE9007;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // معايير مكونات فيغما</span>
      <span style="font-size: 12px; color: #555;">الصفحة 3 من 3</span>
    </div>

    <div>
      <span style="color: #EE9007; font-weight: bold; font-size: 13px;">هندسة فيغما // الرموز والمتغيرات</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        معايير التباعد وأبعاد المكونات
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        تم بناء القوالب باستخدام Auto-Layout 5.0 ومصفوفة تباعدات دقيقة تسمح بتبديل النصوص دون انكسار التصميم:
      </p>

      <div style="border: 2px solid #111409; border-radius: 10px; overflow: hidden; background: #fff; margin-bottom: 24px;">
        <div style="background: #111409; color: #EDE1D1; padding: 10px 16px; font-size: 13px; font-weight: bold;">
          جدول قيم التباعد واستدارة الحواف
        </div>
        <div style="font-size: 12px; line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #ddd;">
            <span style="font-weight: bold;">الهوامش الخارجية للوحة العمل</span>
            <span style="font-weight: bold; color: #EE9007;">48 بكسل أفقياً • 64 بكسل رأسياً</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #ddd; background: rgba(237,225,209,0.4);">
            <span style="font-weight: bold;">استدارة زوايا البطاقات (Squircle Radius)</span>
            <span style="font-weight: bold; color: #111409;">16 بكسل حواف ناعمة</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #ddd;">
            <span style="font-weight: bold;">سماكة الحدود البروزالية (Stroke Weight)</span>
            <span style="font-weight: bold; color: #111409;">1.5 إلى 2 بكسل أسود صلب</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; background: rgba(237,225,209,0.4);">
            <span style="font-weight: bold;">مؤشر تسلسل الشرائح (Pill Indicator)</span>
            <span style="font-weight: bold; color: #EE9007;">كبسولة عائمة بأرقام 11 بكسل</span>
          </div>
        </div>
      </div>

      <div style="background: #fff; border: 2px solid #111409; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h4 style="font-size: 14px; font-weight: bold; color: #111409; margin-top: 0; margin-bottom: 10px;">
          خطوات استيراد القوالب وتخصيصها:
        </h4>
        <ol style="font-size: 12px; color: #444; line-height: 2; padding-right: 20px; margin: 0;">
          <li>قم بتنزيل ملف المواصفات وفتح فيغما أو كانفا.</li>
          <li>استورد لوحات العمل المتجهية وأضف خطوط علامتك التجارية العربية واللاتينية.</li>
          <li>اربط درجات ألوان علامتك التجارية من خلال لوحة المتغيرات المحلية (Local Variables).</li>
        </ol>
      </div>

      <div style="background: #111409; color: #EDE1D1; padding: 16px; border-radius: 8px; text-align: center; font-size: 12px; font-weight: bold;">
        تمت مواءمة القوالب مع خوارزميات النشر الحديثة في 2026
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // حزمة قوالب الكاروسيل</span>
      <span>الصفحة 3 من 3</span>
    </div>
    `
  ];

  await renderHtmlPagesToPdf(pages, 'حقيبة-قوالب-الكاروسيل-BrushMonkey-AR.pdf');
}

// ----------------------------------------------------------------------
// 3. ARABIC PRINT SPEC SHEET (4 PAGES)
// ----------------------------------------------------------------------
export async function generateArabicPrintSpecPdf(): Promise<void> {
  const pages: string[] = [
    // Page 1: Cover
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #C86D3B;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 30px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // مواصفات الإنتاج الطباعي</span>
      <span style="font-size: 12px; color: #555;">النسخة العربية • الصفحة 1 من 4</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around;">
      <div>
        <div style="display: inline-block; background: #C86D3B; color: #fff; font-weight: bold; padding: 6px 14px; border-radius: 6px; border: 2px solid #111409; font-size: 13px; margin-bottom: 18px;">
          ورقة غش الإنتاج الطباعي #03
        </div>
        <h1 style="font-size: 44px; font-weight: 900; line-height: 1.2; margin: 0 0 16px 0; color: #111409;">
          المواصفات الطباعية
          <br />
          <span style="color: #C86D3B;">للمتاجر والمقاهي الناشئة</span>
        </h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6; max-width: 600px; margin: 0;">
          دليل عملي لا غنى عنه عند التعامل مع المطابع التجارية: هوامش التسييل، أوزان الورق، معادلة الأسود الغني، وتشطيبات الفويل والسبوت يوفي.
        </p>
      </div>

      <div style="background: #ffffff; border: 2px solid #111409; padding: 24px; border-radius: 12px; box-shadow: 4px 4px 0px #111409;">
        <h3 style="font-size: 16px; font-weight: 800; color: #C86D3B; margin-top: 0; margin-bottom: 14px;">
          المحاور الحاسمة في هذا الدليل:
        </h3>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2;">
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #C86D3B; font-weight: bold; font-size: 18px;">✦</span>
            <span>حدود التسييل والقص والأمان (Bleed / Trim / Safety) لتفادي الخطوط البيضاء.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #C86D3B; font-weight: bold; font-size: 18px;">✦</span>
            <span>معادلة الأسود الغني (Rich Black) مقابل الأسود الخالص 100% K للنصوص الدقيقة.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #C86D3B; font-weight: bold; font-size: 18px;">✦</span>
            <span>دليل أوزان وسماكات الورق (GSM) لقوائم الطعام، كروت الولاء، وأكياس البن.</span>
          </li>
          <li style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #C86D3B; font-weight: bold; font-size: 18px;">✦</span>
            <span>إعداد ملفات التشطيبات الخاصة: الورنيش اللامع (Spot UV) والختم الحراري (Foil).</span>
          </li>
        </ul>
      </div>

      <div style="background: #241812; color: #EDE1D1; padding: 18px 24px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 11px; color: #C86D3B; font-weight: bold; display: block;">نصيحة ذهبية لرواد الأعمال</span>
          <span style="font-size: 15px; font-weight: bold;">اطلب دائماً بروفة ورقية ملونة (Wet Proof) قبل اعتماد الكميات</span>
        </div>
        <span style="font-size: 13px; font-weight: bold; border: 1px solid rgba(237,225,209,0.3); padding: 4px 10px; border-radius: 6px;">
          معايير المطابع
        </span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // مواصفات الطباعة التجارية</span>
      <span>الصفحة 1 من 4</span>
    </div>
    `,

    // Page 2: Bleed & Rich Black
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #C86D3B;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // القسم الأول: هندسة ما قبل الطباعة</span>
      <span style="font-size: 12px; color: #555;">الصفحة 2 من 4</span>
    </div>

    <div>
      <span style="color: #C86D3B; font-weight: bold; font-size: 13px;">القسم 01 // هندسة ما قبل الطباعة</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        هوامش التسييل ومعادلة الأسود الغني
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        أهم أسباب إعادة الطباعة والتكاليف الزائدة هي أخطاء هوامش القص وعدم ضبط معادلات حبر الأسود:
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px;">
        <div style="background: #fff; border: 2px solid #111409; padding: 14px; border-radius: 8px;">
          <span style="font-size: 12px; font-weight: bold; color: #C86D3B; display: block; margin-bottom: 4px;">التسييل (+3 مم)</span>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 6px 0; color: #111409;">Bleed Margin</h4>
          <p style="font-size: 11px; color: #666; line-height: 1.5; margin: 0;">تمديد خلفيات الصور والألوان 3 مم خارج خط القص لمنع الحواف البيضاء عند انزلاق شفرة القص.</p>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 14px; border-radius: 8px;">
          <span style="font-size: 12px; font-weight: bold; color: #111409; display: block; margin-bottom: 4px;">خط القص (0 مم)</span>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 6px 0; color: #111409;">Trim Line</h4>
          <p style="font-size: 11px; color: #666; line-height: 1.5; margin: 0;">المقاس النهائي للبطاقة أو قائمة الطعام حيث تسقط شفرة المقصلة الصناعية في المطبعة.</p>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 14px; border-radius: 8px;">
          <span style="font-size: 12px; font-weight: bold; color: #606C38; display: block; margin-bottom: 4px;">منطقة الأمان (-4 مم)</span>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 6px 0; color: #111409;">Safety Margin</h4>
          <p style="font-size: 11px; color: #666; line-height: 1.5; margin: 0;">إبقاء جميع النصوص والشعارات الحيوية على بعد 4 مم على الأقل للداخل بعيداً عن حافة القص.</p>
        </div>
      </div>

      <div style="background: #fff; border: 2px solid #111409; padding: 18px; border-radius: 10px; margin-bottom: 16px;">
        <h4 style="font-size: 14px; font-weight: bold; color: #111409; margin-top: 0; margin-bottom: 10px;">
          معادلة الأسود الغني (CMYK Rich Black Formula)
        </h4>
        <div style="background: #241812; color: #EDE1D1; padding: 12px 18px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-family: monospace; font-size: 13px; font-weight: bold;">C: 60% | M: 40% | Y: 40% | K: 100%</span>
          <span style="color: #C86D3B; font-weight: bold; font-size: 12px;">تغطية حبر إجمالية: 240%</span>
        </div>
        <div style="font-size: 12px; color: #444; line-height: 1.8;">
          <div>• <strong>استخدم الأسود الغني:</strong> للخلفيات الكبيرة، البوسترات، والكتل الصلبة للحصول على لون أسود داكن وفخم.</div>
          <div>• <strong>استخدم الأسود الخالص (100% K):</strong> للنصوص والفقرات الصغيرة (أقل من 14pt) لتفادي ظهور هالات لونية ضبابية.</div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // مواصفات الطباعة التجارية</span>
      <span>الصفحة 2 من 4</span>
    </div>
    `,

    // Page 3: Paper GSM Guide
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #C86D3B;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // القسم الثاني: خامات وأوزان الورق</span>
      <span style="font-size: 12px; color: #555;">الصفحة 3 من 4</span>
    </div>

    <div>
      <span style="color: #C86D3B; font-weight: bold; font-size: 13px;">القسم 02 // الخامات والتشطيبات</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        دليل أوزان وسماكات الورق (GSM Selector)
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        اختيار وزن الورق ونوعه يحدد الانطباع الملمسي الفاخر الذي يشعر به عميل متجرك أو مقهاك:
      </p>

      <div style="border: 2px solid #111409; border-radius: 10px; overflow: hidden; background: #fff; margin-bottom: 24px;">
        <div style="background: #241812; color: #EDE1D1; padding: 10px 16px; font-size: 13px; font-weight: bold;">
          أوزان الورق الموصى بها لكل مطبوعة
        </div>
        <div style="font-size: 12px; line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #ddd;">
            <span style="font-weight: bold;">80 - 100 GSM</span>
            <span style="color: #555;">فواتير الحسابات، ورق الخطابات والمراسلات الرسمية.</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #ddd; background: rgba(237,225,209,0.4);">
            <span style="font-weight: bold;">130 - 170 GSM</span>
            <span style="color: #555;">قوائم الطعام المطوية (Takeaway Menus)، البروشورات والملصقات الإعلانية.</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #ddd;">
            <span style="font-weight: bold;">300 - 350 GSM</span>
            <span style="color: #555;">بطاقات الولاء بالأختام، كروت الطاولات، وبطاقات الأعمال الفاخرة.</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; background: rgba(237,225,209,0.4);">
            <span style="font-weight: bold; color: #C86D3B;">ورق الكرافت الطبيعي (Natural Kraft)</span>
            <span style="font-weight: bold; color: #241812;">أكياس حبوب القهوة المختصة وأغلفة الأكواب العازلة للحرارة.</span>
          </div>
        </div>
      </div>

      <div style="background: #fff; border: 2px solid #111409; padding: 18px; border-radius: 10px;">
        <h4 style="font-size: 14px; font-weight: bold; color: #111409; margin-top: 0; margin-bottom: 10px;">
          إعداد طبقات التشطيبات الخاصة في برنامج التصميم:
        </h4>
        <div style="font-size: 12px; color: #444; line-height: 1.8;">
          <div>• <strong>الورنيش اللامع الموضعي (Spot UV):</strong> إنشاء طبقة منفصلة بلون أسود صلب 100% K فوق العناصر المراد تلميعها.</div>
          <div>• <strong>الختم الحراري بالقصدير (Foil Stamping):</strong> استخدام خطوط بسماكة لا تقل عن 0.5pt لمنع تقشر رقائق الذهب أو النحاس.</div>
          <div>• <strong>خطوط قوالب القص (Die-Cut Lines):</strong> رسم مسار متجهات بلون ماجينتا 100% وتسميته "DieLine" مع تفعيل Overprint Stroke.</div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // مواصفات الطباعة التجارية</span>
      <span>الصفحة 3 من 4</span>
    </div>
    `,

    // Page 4: Pre-Press Checklist
    `
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #C86D3B;"></div>
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #111409; padding-bottom: 12px; margin-bottom: 24px;">
      <span style="font-weight: bold; font-size: 13px;">استوديو براش مونكي // القسم الثالث: فحص تسليم المطبعة</span>
      <span style="font-size: 12px; color: #555;">الصفحة 4 من 4</span>
    </div>

    <div>
      <span style="color: #C86D3B; font-weight: bold; font-size: 13px;">القسم 03 // التدقيق قبل الطباعة</span>
      <h2 style="font-size: 28px; font-weight: 900; margin: 4px 0 10px 0; color: #111409;">
        قائمة فحص تسليم الملفات للمطبعة
      </h2>
      <p style="font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 20px;">
        تحقق من كل خطوة قبل إرسال الملفات النهائية للمطبعة لتجنب أي مشاكل فنية:
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #C86D3B; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #C86D3B;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">تحويل نظام الألوان كاملاً إلى CMYK (ISO Coated v2) والتأكد من عدم وجود صور RGB.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #C86D3B; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #C86D3B;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">دقة ووضوح الصور: جميع الصور النقطية بدقة لا تقل عن 300 DPI بالحجم الحقيقي 100%.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #C86D3B; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #C86D3B;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">تحويل النصوص إلى خطوط متجهات (Create Outlines) عبر Ctrl+Shift+O لتفادي فقدان الخطوط.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #C86D3B; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #C86D3B;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">إضافة مسافة تسييل 3 مم على جميع أطراف الملف مع علامات القص والتقاطع (Crop Marks).</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #C86D3B; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #C86D3B;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">تصدير الملف بصيغة PDF/X-1a:2001 أو PDF/X-4 القياسية المعتمدة لدى المطابع التجارية.</span>
        </div>

        <div style="background: #fff; border: 2px solid #111409; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #C86D3B; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: #C86D3B;">✓</div>
          <span style="font-size: 13px; font-weight: bold; color: #111409;">مراجعة والتوقيع على بروفة ورقية ملونة (Physical Proof) واحدة على الأقل قبل بدء سحب الكميات.</span>
        </div>
      </div>

      <div style="background: #241812; color: #EDE1D1; padding: 16px 20px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 14px; font-weight: bold; color: #C86D3B; display: block;">هل تريد إدارة إنتاج مطبوعاتك من خلالنا؟</span>
          <span style="font-size: 12px;">يتعاون استوديو براش مونكي مع أفضل المطابع لمتابعة البروفات واستلام المطبوعات عند بابك.</span>
        </div>
        <span style="background: #C86D3B; color: #fff; font-weight: bold; padding: 6px 14px; border-radius: 6px; font-size: 12px;">
          طلب استشارة طباعية
        </span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; border-top: 2px solid #111409; padding-top: 12px; margin-top: 20px; font-size: 11px; color: #666;">
      <span>استوديو براش مونكي // نهاية الدليل</span>
      <span>الصفحة 4 من 4</span>
    </div>
    `
  ];

  await renderHtmlPagesToPdf(pages, 'المواصفات-الطباعية-للمتاجر-BrushMonkey-AR.pdf');
}
