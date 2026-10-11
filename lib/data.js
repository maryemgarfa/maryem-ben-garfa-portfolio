// ---------- LIENS & FICHIERS ----------
export const EMAIL = 'Maryembengarfa@gmail.com'
export const LINKEDIN = 'https://linkedin.com/in/maryem-garfa-38800615a'
export const GITHUB = '' // ← colle ici l'URL de ton profil GitHub (ex. 'https://github.com/ton-pseudo'). Vide = icône masquée.
// CV téléchargeables : le bouton télécharge celui de la langue du site (fichiers dans /public/projects/cv). Mets '' pour masquer une langue.
export const CVS = { fr: '/projects/cv/Maryem-Ben-Garfa-FR.pdf', en: '/projects/cv/Maryem-Ben-Garfa-EN.pdf', ar: '/projects/cv/Maryem-Ben-Garfa-AR.pdf' }
// WhatsApp : numéro au format international, sans « + » ni espaces
export const WHATSAPP = '21626868786'
export const WHATSAPP_LABEL = '+216 26 86 87 86'

// Préfixe des fichiers de /public (images, CV) : nécessaire quand le site est servi sous /nom-du-depot sur GitHub Pages.
// Il est défini automatiquement au build (voir .github/workflows/deploy.yml).
export const asset = path => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path

// ---------- TEXTES (fr / en / ar) ----------
export const T = {
  fr: { nav: ['Accueil', 'À propos', 'Projets', 'Compétences', 'Expérience', 'Contact'],
    hi: 'Salut, je suis', role: 'Ingénieure logiciel | Développeuse Full-Stack & E-commerce',
    intro: "Plus de 4 ans d'expérience en développement web : interfaces React et Next.js, API, WordPress et e-commerce. Curieuse et adaptable, j'aime relever de nouveaux défis techniques.",
    cta: ['Voir mes projets', 'Me contacter'], cv: 'Télécharger mon CV',
    aboutLabel: 'À PROPOS', aboutTitle: 'Un peu plus sur moi',
    about: ["Je suis Maryem, développeuse web passionnée par la création de sites e-commerce et de solutions digitales. J'aime travailler avec des technologies modernes comme React, Next.js, WordPress et WooCommerce.",
      "J'ai toujours envie d'apprendre, de m'améliorer et de travailler sur des projets stimulants."],
    motto: ['Petits pas,', 'grands rêves'],
    featTitle: 'Projets en vedette', featSub: "Sites e-commerce et applications web que j'ai réalisés.", viewAll: 'Voir tous les projets', viewLess: 'Voir les projets en vedette',
    skillsTitle: 'Compétences & technologies', skillsSub: 'Outils et technologies que j’utilise.',
    expTitle: 'Expérience', expSub: 'Mon parcours professionnel.', keep: 'Toujours en construction !',
    contactTitle: 'Travaillons ensemble', contact: 'Un projet, une collaboration ? Écrivez-moi, je réponds avec plaisir.', mail: 'Envoyer un e-mail',
    thanks: 'Merci de votre visite', view: 'Voir le projet', visit: 'Visiter le site', theme: 'Changer de thème', foot: 'Mornag, Tunisie',
    wa: 'WhatsApp', waAria: 'Écrire sur WhatsApp', cvPick: 'CV par langue', brand: 'Ingénieure logiciel | Développeuse Full-Stack & E-commerce', all: 'Tous', now: "aujourd'hui", menu: 'Menu', top: 'Haut de page', skip: 'Aller au contenu' },
  en: { nav: ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'],
    hi: "Hi, I'm", role: 'Software Engineer | Full-Stack & E-commerce Developer',
    intro: 'Over 4 years of experience in web development: React and Next.js interfaces, APIs, WordPress and e-commerce. Curious and adaptable, I enjoy new technical challenges.',
    cta: ['View my projects', 'Contact me'], cv: 'Download CV',
    aboutLabel: 'ABOUT ME', aboutTitle: 'A little bit about me',
    about: ["I'm Maryem, a web developer with a passion for creating e-commerce websites and digital solutions. I enjoy working with modern technologies like React, Next.js, WordPress and WooCommerce.",
      "I'm always eager to learn, improve and work on exciting projects."],
    motto: ['Small steps,', 'big dreams'],
    featTitle: 'Featured Projects', featSub: 'Real e-commerce websites and web applications I built.', viewAll: 'View all projects', viewLess: 'Show featured projects',
    skillsTitle: 'Skills & Technologies', skillsSub: 'Tools and technologies I work with.',
    expTitle: 'Experience', expSub: 'My professional journey.', keep: 'Keep building!',
    contactTitle: "Let's work together", contact: "A project, a collaboration? Feel free to reach out, I'm always open to new opportunities.", mail: 'Send an email',
    thanks: 'Thanks for visiting', view: 'View project', visit: 'Visit site', theme: 'Toggle theme', foot: 'Mornag, Tunisia',
    wa: 'WhatsApp', waAria: 'Chat on WhatsApp', cvPick: 'CV by language', brand: 'Software Engineer | Full-Stack & E-commerce Developer', all: 'All', now: 'present', menu: 'Menu', top: 'Back to top', skip: 'Skip to content' },
  ar: { nav: ['الرئيسية', 'نبذة', 'المشاريع', 'المهارات', 'الخبرة', 'اتصل بي'],
    hi: 'مرحبًا، أنا', role: 'مهندسة برمجيات | مطورة Full-Stack وتجارة إلكترونية',
    intro: 'أكثر من 4 سنوات من الخبرة في تطوير الويب: واجهات React وNext.js، وواجهات برمجة التطبيقات، وWordPress والتجارة الإلكترونية. فضولية وقادرة على التكيف، وأحب مواجهة التحديات التقنية الجديدة.',
    cta: ['شاهد مشاريعي', 'تواصل معي'], cv: 'تحميل السيرة الذاتية',
    aboutLabel: 'نبذة عني', aboutTitle: 'القليل عني',
    about: ['أنا مريم، مطورة ويب شغوفة بإنشاء مواقع التجارة الإلكترونية والحلول الرقمية. أحب العمل بتقنيات حديثة مثل React وNext.js وWordPress وWooCommerce.',
      'أتطلع دائمًا إلى التعلّم والتطور والعمل على مشاريع ملهمة.'],
    motto: ['خطوات صغيرة،', 'أحلام كبيرة'],
    featTitle: 'مشاريع مميزة', featSub: 'مواقع تجارة إلكترونية وتطبيقات ويب قمت بإنجازها.', viewAll: 'عرض كل المشاريع', viewLess: 'عرض المشاريع المميزة فقط',
    skillsTitle: 'المهارات والتقنيات', skillsSub: 'الأدوات والتقنيات التي أعمل بها.',
    expTitle: 'الخبرة', expSub: 'مسيرتي المهنية.', keep: 'نواصل البناء!',
    contactTitle: 'لنعمل معًا', contact: 'لديك مشروع أو تعاون؟ راسلني، يسعدني الرد.', mail: 'أرسل بريدًا إلكترونيًا',
    thanks: 'شكرًا لزيارتكم', view: 'عرض المشروع', visit: 'زيارة الموقع', theme: 'تغيير المظهر', foot: 'المرناق، تونس',
    wa: 'واتساب', waAria: 'راسلني على واتساب', cvPick: 'السيرة الذاتية حسب اللغة', brand: 'مهندسة برمجيات | مطورة Full-Stack وتجارة إلكترونية', all: 'الكل', now: 'اليوم', menu: 'القائمة', top: 'أعلى الصفحة', skip: 'انتقل إلى المحتوى' },
}

// ---------- À PROPOS : infos à côté du texte ----------
// icon : 'pin' | 'cap' | 'code'   ·   link (optionnel) : rend le mot `word` cliquable dans la 2e ligne
export const INFO = [
  { icon: 'pin', a: { fr: 'Mornag, Ben Arous, Tunisie', en: 'Mornag, Ben Arous, Tunisia', ar: 'المرناق، بن عروس، تونس' } },
  { icon: 'cap', a: { fr: "Développement des systèmes d'information", en: 'Information Systems Development', ar: 'تطوير نظم المعلومات' },
    b: { fr: 'Licence appliquée · ISET Zaghouan (2020)', en: "Applied Bachelor's Degree · ISET Zaghouan (2020)", ar: 'إجازة تطبيقية · ISET زغوان (2020)' } },
  { icon: 'cap', a: { fr: 'Informatique', en: 'Computer Science', ar: 'علوم الحاسوب' },
    b: { fr: "Diplôme d'ingénieur · École Supérieure Privée d'Ingénierie et de Technologies – ESPRIT (2026)", en: 'Engineering Degree · École Supérieure Privée d\'Ingénierie et de Technologies – ESPRIT (2026)', ar: 'شهادة مهندس · المدرسة العليا الخاصة للهندسة والتكنولوجيات – ESPRIT (2026)' },
    link: { word: 'ESPRIT', href: 'https://www.esprit.tn/', title: "ESPRIT – École d'ingénieurs en Tunisie" } },
]

// ---------- PROJETS ----------
// tech : 'wordpress' | 'prestashop' | 'react' | 'shopify'  (sert au filtre ; change-le si besoin)
// featured : true → affiché dans "Projets en vedette" (les autres apparaissent avec "Voir tous les projets")
// image : fichier dans public/projects/   |   link : site en ligne   |   label : texte sous le nom (optionnel)
// image et link sont optionnels : sans image, la carte affiche le logo Pixel Art.
const d = (fr, en, ar) => ({ fr, en, ar })
export const PROJECTS = [
  { name: 'Lucea', tech: 'wordpress', featured: true, image: '/projects/lucea.png', link: 'https://www.lucea.tn/', tags: ['WordPress', 'WooCommerce', 'Elementor'],
    desc: { fr: 'Site e-commerce de produits de beauté et de soins de la peau, au design épuré et moderne.', en: 'E-commerce site for beauty and skincare products with a clean and modern design.', ar: 'موقع تجارة إلكترونية لمنتجات التجميل والعناية بالبشرة بتصميم أنيق وعصري.' } },
  { name: 'Amessia', tech: 'wordpress', featured: true, image: '/projects/amessia.png', link: 'https://amessia.com/', tags: ['WordPress', 'WooCommerce', 'Elementor'],
    desc: { fr: 'Boutique en ligne de cosmétiques naturels et de produits de beauté.', en: 'Online store for natural cosmetics and beauty products.', ar: 'متجر إلكتروني لمستحضرات التجميل الطبيعية ومنتجات الجمال.' } },
  { name: 'myDocteurTN', tech: 'react', featured: true, label: 'PFE · BMERCE', image: '/projects/mydocteurtn.png', tags: ['Next.js', 'NestJS', 'React Native', 'FastAPI', 'PostgreSQL'],
    desc: { fr: "Plateforme web et mobile de rendez-vous médicaux avec assistant IA (projet de fin d'études).", en: 'Web and mobile medical appointment platform with an AI assistant (final-year project).', ar: 'منصة ويب وموبايل للمواعيد الطبية مع مساعد ذكي (مشروع نهاية الدراسة).' } },
  { name: 'Allani', tech: 'prestashop', featured: true, image: '/projects/allani.png', link: 'https://allani.com.tn/', tags: ['PrestaShop', 'E-commerce'],
    desc: d("Boutique en ligne d'électroménager (Electrofroid Allani) : catalogue par catégories, panier et espace client.", 'Online home appliance store (Electrofroid Allani): category catalogue, shopping cart and customer account.', 'متجر إلكتروني للأجهزة الكهرومنزلية (Electrofroid Allani): كتالوج حسب الفئات وسلة مشتريات وحساب للعملاء.') },
  { name: 'Artus Tunisie', tech: 'webapp', image: '/projects/artus-tunisie.png', link: 'https://www.artustunisie.com/', tags: ['Web App', 'Recrutement'],
    desc: d("Plateforme d'une agence de recrutement et de travail temporaire : offres d'emploi, espaces candidat et entreprise.", 'Platform for a recruitment and temporary staffing agency: job offers, candidate and company areas.', 'منصة لوكالة توظيف وعمل مؤقت: عروض عمل ومساحة خاصة للمترشحين وأخرى للشركات.') },
  { name: 'Tylliance', tech: 'wordpress', image: '/projects/tylliance.png', link: 'https://www.tylliance.net/', tags: ['WordPress'],
    desc: d('Site vitrine d\'une entreprise de nettoyage professionnel à Lyon, avec demande de devis.', 'Showcase website for a professional cleaning company in Lyon, with quote request.', 'موقع تعريفي لشركة تنظيف احترافية في ليون مع إمكانية طلب عرض سعر.') },
  { name: 'IGTS', tech: 'wordpress', image: '/projects/igts.png', link: 'https://www.inter-gts.com/', tags: ['WordPress'],
    desc: d('Site d\'un organisme de formation et de services, avec e-learning et catalogues.', 'Website for a training and services company, with e-learning and catalogues.', 'موقع لمؤسسة تكوين وخدمات يضم التعلم الإلكتروني والكتالوجات.') },
  { name: 'PMS Multiservices', tech: 'wordpress', image: '/projects/pms-multiservices.png', link: 'https://www.pms-multiservices.com/', tags: ['WordPress'],
    desc: d('Site de services de rénovation et de nettoyage avec formulaire de demande de devis.', 'Website for renovation and cleaning services with a quote request form.', 'موقع لخدمات الترميم والتنظيف مع نموذج لطلب عرض سعر.') },
  { name: 'EPST', tech: 'wordpress', image: '/projects/epst.png', link: 'https://www.epst.tn/', tags: ['WordPress'],
    desc: d('Site d\'une entreprise d\'installation et de maintenance de groupes électrogènes en Tunisie.', 'Website for a generator set installation and maintenance company in Tunisia.', 'موقع لشركة تركيب وصيانة المولدات الكهربائية في تونس.') },
  { name: 'Teaks', tech: 'wordpress', image: '/projects/teaks.png', link: 'https://www.teaks.tn/', tags: ['WordPress'],
    desc: d('Site d\'aménagement paysager et de jardins, avec galerie photos et demande de devis.', 'Landscaping and garden website with a photo gallery and quote request.', 'موقع لتهيئة المساحات الخضراء والحدائق مع معرض صور وطلب عرض سعر.') },
  { name: 'La Patrie', tech: 'wordpress', image: '/projects/la-patrie.png', link: 'https://www.brasserielapatrie.com/', tags: ['WordPress'],
    desc: d('Site d\'une brasserie historique à Lyon, avec réservation en ligne.', 'Website for a historic brasserie in Lyon, with online booking.', 'موقع لمطعم عريق في ليون مع الحجز عبر الإنترنت.') },
  { name: 'Ordre de Saint-Gabriel', tech: 'wordpress', image: '/projects/ordre-saint-gabriel.png', link: 'https://www.ordre-de-saint-gabriel.eu/', tags: ['WordPress'],
    desc: d('Site multilingue d\'une association internationale humanitaire, avec adhésion et dons.', 'Multilingual website for an international humanitarian association, with membership and donations.', 'موقع متعدد اللغات لجمعية إنسانية دولية مع الانضمام والتبرعات.') },
  { name: 'Paolino', tech: 'wordpress', image: '/projects/paolino.png', link: 'https://www.paolino-restaurant-italien-lyon.com/', tags: ['WordPress'],
    desc: d('Site d\'un restaurant italien à Lyon : carte, plats à emporter et événements.', 'Website for an Italian restaurant in Lyon: menu, takeaway and events.', 'موقع لمطعم إيطالي في ليون: القائمة والطلبات الخارجية والفعاليات.') },
  { name: 'Khalifa Housni', tech: 'wordpress', image: '/projects/khalifa-housni.png', link: 'https://khalifa-housni.com/', tags: ['WordPress'],
    desc: d('Site vitrine d\'une entreprise de cuvelage et de travaux spéciaux (PACA et Corse).', 'Showcase website for a waterproofing and special works company (PACA and Corsica).', 'موقع تعريفي لشركة متخصصة في العزل المائي والأشغال الخاصة.') },
  { name: 'S2L Topographie', tech: 'wordpress', image: '/projects/s2l-topographie.png', link: 'https://www.s2ltopographie.com/', tags: ['WordPress'],
    desc: { fr: 'Site vitrine WordPress responsive.', en: 'Responsive WordPress showcase website.', ar: 'موقع تعريفي بـ WordPress متجاوب مع الشاشات.' } },
  { name: 'Mozbox', tech: 'wordpress', image: '/projects/moz-life.png', link: 'https://moz.life/', tags: ['WordPress'],
    desc: d('Portail d\'actualités du Mozambique avec billetterie en ligne et panier.', 'Mozambique news portal with online ticketing and a shopping cart.', 'بوابة أخبار موزمبيق مع حجز التذاكر عبر الإنترنت وسلة مشتريات.') },
  { name: 'Mayla', tech: 'wordpress', image: '/projects/mayla.png', link: 'https://mayla.fr/', tags: ['WordPress'],
    desc: d('Site bilingue FR/EN d\'un traiteur événementiel et de macarons personnalisés.', 'Bilingual FR/EN website for an event caterer and custom logo macarons.', 'موقع ثنائي اللغة (فرنسي/إنجليزي) لمتعهد حفلات وحلوى الماكرون المخصصة.') },
  { name: 'Beitalhikma', tech: 'wordpress', image: '/projects/beitalhikma.png', link: 'https://www.beitalhikma.tn/fr/', tags: ['WordPress'],
    desc: d('Site bilingue FR/AR de l\'Académie tunisienne des sciences, des lettres et des arts.', 'Bilingual FR/AR website of the Tunisian Academy of Sciences, Letters and Arts.', 'موقع ثنائي اللغة (فرنسي/عربي) للأكاديمية التونسية للعلوم والآداب والفنون.') },
  { name: 'Guide Zephyr', tech: 'react', image: '/projects/guidezephir.png', link: 'https://guidezephir.fr/', tags: ['React.js'],
    desc: d('Guide web à accès sécurisé réservé aux professionnels de santé.', 'Web guide with secure login reserved for healthcare professionals.', 'دليل ويب بتسجيل دخول آمن مخصص للمهنيين الصحيين.') },
  // Sans image : le logo Pixel Art s'affiche à la place
  { name: 'ClicLighting', tech: 'shopify', tags: ['Shopify'],
    desc: d('Boutique en ligne Shopify.', 'Shopify online store.', 'متجر إلكتروني على Shopify.') },
  { name: 'Izidem', tech: 'wordpress', tags: ['WordPress'],
    desc: d('Site web WordPress responsive.', 'Responsive WordPress website.', 'موقع ويب بـ WordPress متجاوب مع الشاشات.') },
  { name: 'Packfast', tech: 'react', tags: ['React.js'],
    desc: d('Application web développée avec React.js.', 'Web application built with React.js.', 'تطبيق ويب مطوّر بـ React.js.') },
  { name: 'Diagoriente', tech: 'react', tags: ['React.js'],
    desc: d('Application web développée avec React.js.', 'Web application built with React.js.', 'تطبيق ويب مطوّر بـ React.js.') },
  { name: 'Packshop', tech: 'react', tags: ['React.js'],
    desc: d('Application e-commerce développée avec React.js.', 'E-commerce application built with React.js.', 'تطبيق تجارة إلكترونية مطوّر بـ React.js.') },
]

// ---------- PARCOURS ----------
export const EXP = [
  { date: '02/2026 – 08/2026', org: 'BMERCE',
    title: { fr: "Stage de fin d'études · Développeuse full-stack", en: 'Final-year internship · Full-stack developer', ar: 'تدريب نهاية الدراسة · مطورة Full-Stack' },
    text: { fr: "Plateforme de rendez-vous médicaux avec assistance intelligente : IA locale (Python, FastAPI, Llama 3, Ollama) et module d'évaluation d'agents.", en: 'Medical appointment platform with intelligent assistance: local AI (Python, FastAPI, Llama 3, Ollama) and an AI-agent evaluation module.', ar: 'منصة مواعيد طبية بمساعدة ذكية: ذكاء اصطناعي محلي (Python وFastAPI وLlama 3 وOllama) ووحدة لتقييم وكلاء الذكاء الاصطناعي.' } },
  { date: '05/2022 – 06/2026', org: 'Tanitoss',
    title: { fr: 'Développeuse web & e-commerce', en: 'Web & e-commerce developer', ar: 'مطورة ويب وتجارة إلكترونية' },
    text: { fr: 'Sites vitrines et e-commerce, thèmes WordPress sur mesure, performance, SEO, responsive, déploiement et maintenance.', en: 'Websites and e-commerce sites, custom WordPress themes, performance, SEO, responsive design, deployment and maintenance.', ar: 'مواقع ومتاجر إلكترونية، قوالب WordPress مخصصة، تحسين الأداء وSEO والتصميم المتجاوب، والنشر والصيانة.' } },
  { date: '2022 – 2026', org: "École Supérieure Privée d'Ingénieur", link: 'https://www.esprit.tn/',
    title: { fr: "Diplôme d'ingénieur en génie logiciel", en: 'Engineering degree in software engineering', ar: 'شهادة مهندس في هندسة البرمجيات' }, text: null },
  { date: '12/2020 – 12/2021', org: 'Wereact',
    title: { fr: 'Développeuse front-end React.js', en: 'Front-end developer (React.js)', ar: 'مطورة واجهات React.js' },
    text: { fr: "Composants UI réutilisables, formulaires, consommation d'API GraphQL.", en: 'Reusable UI components, forms, GraphQL API consumption.', ar: 'مكونات واجهة قابلة لإعادة الاستخدام، نماذج، واستهلاك واجهات GraphQL.' } },
  { date: '2020', org: 'ISET Zaghouan',
    title: { fr: "Licence appliquée en développement des systèmes d'information", en: "Applied Bachelor's Degree in Information Systems Development", ar: 'إجازة تطبيقية في تطوير نظم المعلومات' }, text: null },
  { date: '02/2020 – 09/2020', org: 'Wereact',
    title: { fr: "Stage de fin d'études · Développeuse", en: 'Final-Year Project · Intern developer', ar: 'مشروع نهاية الدراسة · متدربة مطورة' },
    text: { fr: "Application web de gestion de projets inspirée de Trello et Jira. Technologies : React.js, Node.js, Express.js, Redux, MongoDB, Mongoose, API REST, Sass.", en: 'Project management web application inspired by Trello and Jira. Technologies: React.js, Node.js, Express.js, Redux, MongoDB, Mongoose, REST API, Sass.', ar: 'تطبيق ويب لإدارة المشاريع مستوحى من Trello وJira. التقنيات: React.js وNode.js وExpress.js وRedux وMongoDB وMongoose وREST API وSass.' } },
  { date: '01/2020 – 02/2020', org: 'Wereact',
    title: { fr: 'Stage de perfectionnement', en: 'Advanced Internship', ar: 'تدريب متقدم' },
    text: { fr: 'Mini-projet : site de librairie en ligne (React.js, Firebase).', en: 'Mini-project: online bookstore website (React.js, Firebase).', ar: 'مشروع مصغر: موقع مكتبة إلكترونية (React.js وFirebase).' } },
  { date: '01/2018 – 02/2018', org: 'Managys',
    title: { fr: "Stage d'initiation", en: 'Introductory Internship', ar: 'تدريب تمهيدي' },
    text: { fr: 'Mini-projet : site e-commerce de matériel informatique (HTML, CSS, Bootstrap, jQuery).', en: 'Mini-project: e-commerce website for computer hardware (HTML, CSS, Bootstrap, jQuery).', ar: 'مشروع مصغر: موقع تجارة إلكترونية للمعدات المعلوماتية (HTML وCSS وBootstrap وjQuery).' } },
]

// ---------- COMPÉTENCES ----------
// Tuiles principales (a = abréviation affichée, c = couleur du pixel)
export const TECH_TILES = [
  { n: 'React', a: 'Re', c: '#61dafb' }, { n: 'Next.js', a: 'N', c: '#f4f4ff' }, { n: 'TypeScript', a: 'TS', c: '#3b82f6' },
  { n: 'Node.js', a: 'No', c: '#6cc24a' }, { n: 'Express', a: 'ex', c: '#c4c8e0' }, { n: 'NestJS', a: 'Ne', c: '#ef3b5d' },
  { n: 'WordPress', a: 'Wp', c: '#4aa8f0' }, { n: 'WooCommerce', a: 'Wo', c: '#a86cc1' }, { n: 'Shopify', a: 'Sh', c: '#95bf47' },
  { n: 'PrestaShop', a: 'Ps', c: '#e5307f' }, { n: 'MongoDB', a: 'Mo', c: '#47a248' }, { n: 'PostgreSQL', a: 'Pg', c: '#4f86c6' },
  { n: 'Tailwind CSS', a: 'Tw', c: '#38bdf8' }, { n: 'Three.js', a: '3js', c: '#f4f4ff' },
]

export const SKILLS = [
  { l: { fr: 'Front-end', en: 'Front-end', ar: 'الواجهات' }, v: ['React.js', 'Next.js', 'TypeScript', 'React Native', 'Gatsby', 'Three.js', 'Tailwind CSS', 'Sass'] },
  { l: { fr: 'Back-end', en: 'Back-end', ar: 'الخلفية' }, v: ['Node.js', 'NestJS', 'Express.js', 'Python', 'FastAPI', 'REST', 'GraphQL'] },
  { l: { fr: 'Bases de données', en: 'Databases', ar: 'قواعد البيانات' }, v: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Mongoose'] },
  { l: { fr: 'CMS & e-commerce', en: 'CMS & e-commerce', ar: 'إدارة المحتوى والتجارة' }, v: ['WordPress', 'WooCommerce', 'Shopify', 'PrestaShop', 'ACF', 'Elementor'] },
  { l: { fr: 'Design & outils', en: 'Design & tools', ar: 'التصميم والأدوات' }, v: ['Figma', 'Photoshop', 'Git', 'GitHub', 'Docker'] },
]