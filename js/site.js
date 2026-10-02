/* ============================================================
   FIRMMIT UZBEKISTAN — shared layout, i18n (UZ/RU/EN), interactions
   Company details sourced from official LLC "FIRMMIT" letterhead.
   ============================================================ */
(function () {
  'use strict';

  var KR_URL = 'https://www.firmmit.kr/html/#firstPage';
  var TG_URL = 'https://t.me/FIRMMIT';   // Telegram
  var IG_URL = 'https://www.instagram.com/firmmit_uz';   // Instagram (YouTube keyin qo'shiladi)
  // Per-language catalog PDF. Replace each value with that language's PDF when available.
  var CATALOG_PDF = {
    uz: 'assets/firmmit-catalog.pdf',
    ru: 'assets/firmmit-catalog.pdf',
    en: 'assets/firmmit-catalog.pdf',
    ko: 'assets/firmmit-catalog.pdf'
  };
  function catalogHref(lang) { return CATALOG_PDF[lang] || CATALOG_PDF.en; }
  var STORE = 'firmmit-lang';
  var LANGS = ['uz', 'ru', 'en', 'ko'];

  /* ---- company details (from letterhead) ---- */
  var CO = {
    email: 'global@firmmit.com',
    phone: '+998 90 063 23 15',
    phoneHref: '+998900632315'
  };

  // Primary menu (lean & professional). Partners / Certificates / News / Head Office
  // remain live pages, reachable from the footer.
  var NAV = [
    { key: 'home' },
    { key: 'about' },
    { key: 'products' },
    { key: 'services' },
    { key: 'trade' }
  ];
  var NAV_LABEL = {
    home: 'Home', about: 'About Us', products: 'Products', catalog: 'Online Store', services: 'Services',
    trade: 'Import & Export', partners: 'Our Partners', certs: 'Certificates',
    news: 'News', contact: 'Contact',
    'dir-seedlings': 'Seed & Seedling Supply',
    'dir-greenhouse': 'Greenhouse Construction & Reconstruction',
    'dir-equipment': 'Agricultural Machinery & Materials',
    'dir-consulting': 'Cultivation Consulting',
    'dir-berry': 'Strawberry Trade'
  };
  var FILE = {
    home: 'index.html', about: 'about.html', products: 'products.html', services: 'services.html',
    trade: 'import-export.html', partners: 'partners.html', certs: 'certificates.html',
    news: 'news.html', contact: 'contact.html', catalog: 'catalog.html',
    'dir-seedlings': 'seedlings.html',
    'dir-greenhouse': 'greenhouse-construction.html',
    'dir-equipment': 'machinery-materials.html',
    'dir-consulting': 'cultivation-consulting.html',
    'dir-berry': 'strawberry-trade.html'
  };
  var SPA = false; // set true at init when single-file .route sections are present
  function hrefFor(key) { return SPA ? '#' + key : FILE[key]; }
  function currentKey() { var h = (location.hash || '').replace('#', ''); return NAV_LABEL[h] ? h : 'home'; }

  /* ============================================================
     TRANSLATION DICTIONARIES
     RICH  = elements with inline markup, keyed by English textContent
     TXT   = plain text runs, keyed by English text
     Missing key -> English is kept (graceful fallback).
     ============================================================ */
  var RICH = {
    "Certifications behind every project.": {
      ru: '<span class="thin">Сертификаты за</span> каждым проектом.',
      uz: '<span class="thin">Har bir loyiha ortida</span> sertifikatlar.',
      ko: '<span class="thin">모든 프로젝트를 뒷받침하는</span> 인증'
    },
    "Growing tomorrow's harvest with smart-farm technology.": {
      ru: '<span class="thin">Выращиваем урожай завтрашнего дня</span><br> с помощью <span class="blue">умных</span> агротехнологий.',
      uz: '<span class="thin">Ertangi hosilni yetishtiramiz</span><br> <span class="blue">aqlli</span> ferma texnologiyalari bilan.',
      ko: '<span class="thin">내일의 수확을</span><br> <span class="blue">스마트팜</span> 기술로 준비합니다'
    },
    "Leading the future of agriculture in Uzbekistan.": {
      ru: '<span class="thin">Формируем будущее сельского хозяйства</span> Узбекистана.',
      uz: '<span class="thin">O\'zbekiston qishloq xo\'jaligi</span> kelajagini yaratamiz.',
      ko: '<span class="thin">우즈베키스탄 농업의 미래를</span> 선도합니다'
    },
    "Reliable, distinctive, professional smart farming.": {
      ru: '<span class="thin">Надёжное, уникальное,</span> профессиональное умное фермерство.',
      uz: '<span class="thin">Ishonchli, o\'ziga xos,</span> professional aqlli dehqonchilik.',
      ko: '<span class="thin">신뢰할 수 있고 독보적이며</span> 전문적인 스마트팜'
    },
    "One family of farms, from Korea to Uzbekistan.": {
      ru: '<span class="thin">Одна семья ферм,</span> от Кореи до Узбекистана.',
      uz: '<span class="thin">Yagona fermalar oilasi,</span> Koreyadan O\'zbekistongacha.',
      ko: '<span class="thin">하나의 농가 가족,</span> 한국에서 우즈베키스탄까지'
    },
    "Firmmit Uzbekistan operates as a regional branch of Firmmit Korea, our head office and smart-farm headquarters. That link gives local growers direct access to Korean R&D, equipment and expertise.": {
      ru: 'Firmmit Uzbekistan работает как региональный филиал <strong>Firmmit Korea</strong>, нашего головного офиса и штаб-квартиры умного фермерства. Эта связь даёт местным аграриям прямой доступ к корейским R&D, оборудованию и экспертизе.',
      uz: 'Firmmit Uzbekistan <strong>Firmmit Korea</strong>ning mintaqaviy filiali sifatida ishlaydi, bu bizning bosh ofisimiz va aqlli ferma shtab-kvartiramiz. Bu aloqa mahalliy fermerlarga Koreya R&D, jihozlari va tajribasidan bevosita foydalanish imkonini beradi.',
      ko: 'Firmmit Uzbekistan은 본사이자 스마트팜 본부인 <strong>Firmmit Korea</strong>의 지역 법인입니다. 이를 통해 현지 농가는 한국의 R&D와 장비, 전문성을 직접 활용할 수 있습니다.'
    },
    "A local partner backed by a global head office.": {
      ru: '<span class="thin">Местный партнёр при поддержке</span> глобального головного офиса.',
      uz: '<span class="thin">Global bosh ofis quvvatlagan</span> mahalliy hamkor.',
      ko: '<span class="thin">글로벌 본사가 뒷받침하는</span> 현지 파트너'
    },
    "Six core systems that work together.": {
      ru: '<span class="thin">Шесть базовых систем,</span> работающих как единое целое.',
      uz: '<span class="thin">Birga ishlaydigan</span> oltita asosiy tizim.',
      ko: '<span class="thin">유기적으로 연동되는</span> 6가지 핵심 시스템'
    },
    "Built for the region's high-value produce.": {
      ru: '<span class="thin">Создано для ценных культур</span> региона.',
      uz: '<span class="thin">Mintaqaning qimmatli ekinlari</span> uchun yaratilgan.',
      ko: '<span class="thin">이 지역의 고부가가치 작물을</span> 위한 설계'
    },
    "A clear path from idea to income.": {
      ru: '<span class="thin">Ясный путь от идеи</span> к доходу.',
      uz: '<span class="thin">G\'oyadan daromadgacha</span> aniq yo\'l.',
      ko: '<span class="thin">아이디어에서 수익까지</span> 이어지는 명확한 길'
    },
    "A bridge that moves both ways.": {
      ru: '<span class="thin">Мост, работающий</span> в обе стороны.',
      uz: '<span class="thin">Ikki tomonga ishlaydigan</span> ko\'prik.',
      ko: '<span class="thin">양방향으로 이어주는</span> 다리'
    },
    "Firmmit Korea, our head office.": {
      ru: '<span class="thin">Firmmit Korea,</span> наш головной офис.',
      uz: '<span class="thin">Firmmit Korea,</span> bizning bosh ofisimiz.',
      ko: '<span class="thin">Firmmit Korea,</span> 우리의 본사'
    },
    "Not just systems, finished products, too.": {
      ru: '<span class="thin">Не только системы,</span> но и готовая продукция.',
      uz: '<span class="thin">Faqat tizimlar emas,</span> tayyor mahsulotlar ham.',
      ko: '<span class="thin">시스템을 넘어,</span> 완제품까지'
    },
    "Everything, with specs, in one catalog.": {
      ru: '<span class="thin">Всё, со спецификациями,</span> в одном каталоге.',
      uz: '<span class="thin">Hammasi, spetsifikatsiyalari bilan,</span> bitta katalogda.',
      ko: '<span class="thin">제품과 사양 모두,</span> 하나의 카탈로그에'
    }
  };

  var TXT = {
    ru: {
      /* nav */
      "Home": "Главная", "About Us": "О компании", "Products": "Продукция",
      "Services": "Услуги", "Import & Export": "Импорт и экспорт", "Our Partners": "Партнёры",
      "Certificates": "Сертификаты", "News": "Новости", "Contact": "Контакты",
      "Head Office ↗": "Головной офис ↗", "Head Office, Firmmit Korea ↗": "Головной офис, Firmmit Korea ↗",
      /* footer */
      "Bringing Korean smart-farm technology to Uzbekistan, greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.":
        "Привносим корейские умные агротехнологии в Узбекистан, теплицы, сельское хозяйство с контролируемой средой и агроторговлю для устойчивого продовольственного снабжения региона.",
      "Company": "Компания", "What we do": "Наши направления",
      "Head Office": "Головной офис",
      "Smart-farm headquarters · Seoul, Republic of Korea": "Штаб-квартира умного фермерства · Сеул, Республика Корея",
      "© 2026 Firmmit Uzbekistan. A branch of Firmmit Korea. All rights reserved.":
        "© 2026 Firmmit Uzbekistan. Филиал Firmmit Korea. Все права защищены.",
      /* eyebrows / section labels */
      "Firmmit Uzbekistan · Smart Agriculture": "Firmmit Uzbekistan · Умное сельское хозяйство",
      "Introduction": "Введение", "Business": "Направления", "Global Network": "Глобальная сеть",
      "Who we are": "Кто мы", "Our Philosophy": "Наша философия", "How we work": "Как мы работаем",
      "At a glance": "Кратко", "Product range": "Ассортимент", "Best-suited crops": "Подходящие культуры",
      "How a project runs": "Ход проекта", "What we offer": "Что мы предлагаем",
      "Our work": "Наши работы", "Featured projects": "Наши проекты", "Mongol-type 2-span greenhouse": "Двухпролётная теплица монгольского типа", "Glass greenhouse 2.18 ha": "Стеклянная теплица 2,18 га", "Interactive 3D model, rotate and explore every part": "Интерактивная 3D-модель, вращайте и изучайте каждую деталь", "Explore in 3D": "Смотреть в 3D",
      "Why growers choose us": "Почему выбирают нас", "Two-way trade": "Двусторонняя торговля",
      "How trade works with us": "Как устроена торговля", "Our anchor partner": "Наш ключевой партнёр",
      "Ecosystem": "Экосистема", "Our network": "Наша сеть",
      "Standards & accreditation": "Стандарты и аккредитация", "Our commitment": "Наши обязательства",
      "Latest updates": "Последние новости", "Get in touch": "Связаться с нами", "Company details": "Реквизиты компании",
      /* home hero */
      "Firmmit Uzbekistan delivers Korean controlled-environment agriculture, modern greenhouses, precision climate systems and reliable agri-systems, to farms across Uzbekistan and Central Asia.":
        "Firmmit Uzbekistan поставляет корейское сельское хозяйство с контролируемой средой, современные теплицы, точные климатические системы и надёжные агросистемы, фермам Узбекистана и Центральной Азии.",
      "Explore our solutions": "Наши решения", "Talk to our team": "Связаться с командой",
      "Regions served": "Регионов охвачено", "Projects delivered": "Реализовано проектов",
      "Client retention": "Удержание клиентов", "Greenhouse projects": "Тепличных проектов",
      "Regions covered": "Охваченных регионов", "Avg. water saved": "Экономия воды в среднем",
      "Technical support": "Техподдержка",
      "Four connected capabilities that take a project from first design to a thriving, data-driven farm.": "Четыре взаимосвязанных направления, которые ведут проект от первого проекта до процветающей фермы, управляемой данными.",
      /* home intro */
      "As the Uzbekistan branch of Firmmit Korea, we localize proven smart-farm technology for the region's climate, crops and growers, combining Korean engineering with on-the-ground agronomy.":
        "Будучи узбекистанским филиалом Firmmit Korea, мы адаптируем проверенные умные агротехнологии под климат, культуры и аграриев региона, объединяя корейскую инженерию с местной агрономией.",
      "✓ Turnkey smart greenhouses engineered for arid climates": "✓ Умные теплицы «под ключ» для засушливого климата",
      "✓ Precision irrigation, sensors and climate automation": "✓ Точное орошение, датчики и автоматизация климата",
      "✓ Direct Korea–Uzbekistan supply and technical support": "✓ Прямые поставки и техподдержка Корея–Узбекистан",
      "About Firmmit Uzbekistan": "О Firmmit Uzbekistan",
      /* business cards */
      "Smart Greenhouses": "Умные теплицы",
      "Structures and glazing engineered for high yield and low water use in Central Asian conditions.":
        "Конструкции и остекление для высокого урожая и низкого расхода воды в условиях Центральной Азии.",
      "Climate & IoT": "Климат и IoT",
      "Sensors, controllers and dashboards that automate temperature, humidity and nutrient delivery.":
        "Датчики, контроллеры и панели, автоматизирующие температуру, влажность и подачу питания.",
      "Agronomy Services": "Агрономические услуги",
      "Installation, grower training and season-long support from Korean and local specialists.":
        "Монтаж, обучение аграриев и поддержка в течение сезона от корейских и местных специалистов.",
      "Import & Export ": "Импорт и экспорт ",
      "Sourcing equipment from Korea and connecting Uzbek produce to regional markets.":
        "Поставка оборудования из Кореи и вывод узбекской продукции на региональные рынки.",
      "Learn more →": "Подробнее →", "Read more →": "Читать далее →",
      /* home global */
      "Korean R&D": "Корейские R&D", "Local agronomy": "Местная агрономия",
      "Shared supply chain": "Общая цепочка поставок", "Joint training": "Совместное обучение",
      "Visit Head Office, Firmmit Korea": "Головной офис, Firmmit Korea",
      "Visit Firmmit Korea": "Перейти на Firmmit Korea",
      /* CTA */
      "Bring smart farming to your land.": "Внедрите умное фермерство на своей земле.",
      "Whether you're planning a single greenhouse or a regional facility, our team will design a solution around your crop, climate and budget.":
        "Планируете ли вы одну теплицу или региональный комплекс, наша команда разработает решение под вашу культуру, климат и бюджет.",
      "Start your project": "Начать проект", "Get in touch →": "Связаться с нами →",
      /* about */
      "Korean smart-farm expertise, rooted in Uzbek soil.": "Корейский опыт умного фермерства на узбекской земле.",
      "We are the Uzbekistan branch of Firmmit Korea, a smart-farm company preparing the food of tomorrow. Our mission is to make advanced, sustainable agriculture accessible to growers across the region.":
        "Мы: узбекистанский филиал Firmmit Korea, компании умного фермерства, готовящей продовольствие завтрашнего дня. Наша миссия, сделать передовое устойчивое сельское хозяйство доступным для аграриев региона.",
      "Firmmit Uzbekistan was established to adapt Firmmit Korea's proven controlled-environment agriculture for Central Asia. We combine Korean engineering, R&D and equipment with local agronomy, language and service, so growers get world-class technology with a partner next door.":
        "Firmmit Uzbekistan создан, чтобы адаптировать проверенное сельское хозяйство с контролируемой средой Firmmit Korea для Центральной Азии. Мы объединяем корейскую инженерию, R&D и оборудование с местной агрономией, языком и сервисом, чтобы аграрии получали технологии мирового уровня рядом с домом.",
      "From feasibility study to harvest, we stay involved: designing the facility, sourcing the right systems, installing them, training the team and supporting every season that follows.":
        "От технико-экономического обоснования до урожая мы рядом: проектируем объект, подбираем системы, монтируем их, обучаем команду и поддерживаем каждый последующий сезон.",
      "Because your life is behind our work.": "Потому что за нашей работой, ваша жизнь.",
      "Food security is not merely a matter of agriculture, it is directly tied to the sustainable future of every family, every farm and the entire region. That is why every technological solution we build rests on the principles of dependable harvests, rational use of resources and long-term sustainability. We adapt Korea's advanced smart-farm technologies to Central Asia's climate, water, crops and local growing conditions, delivering practical, measurable results for farmers.":
        "Продовольственная безопасность, это не просто вопрос сельского хозяйства. Она напрямую связана с устойчивым будущим каждой семьи, каждого фермерского хозяйства и всего региона.\n\nИменно поэтому каждое технологическое решение, которое мы создаём, опирается на принципы надёжного урожая, рационального использования ресурсов и долгосрочной устойчивости.\n\nМы адаптируем передовые корейские технологии умных ферм к климату, воде, культурам и местным условиям выращивания Центральной Азии, обеспечивая фермерам практический и измеримый результат.",
      "MISSION": "МИССИЯ", "VISION": "ВИДЕНИЕ", "VALUES": "ЦЕННОСТИ",
      "Sustainably feed the future": "Устойчиво накормить будущее",
      "To build high-yield, efficient and sustainable agricultural production in any climate by deploying smart, precise and resource-efficient agri-technologies. Our aim is not simply to introduce modern technology, but to turn it into real economic results for the farmer.":
        "Формировать высокоурожайное, эффективное и устойчивое сельскохозяйственное производство в любом климате за счёт внедрения умных, точных и ресурсосберегающих агротехнологий.\n\nНаша цель, не просто внедрить современные технологии, а превратить их в реальный экономический результат для фермера.",
      "Setting a new standard for smart agriculture in Central Asia": "Создать новый стандарт умного сельского хозяйства в Центральной Азии",
      "To become Central Asia's most trusted smart-farm technology partner by optimising water and energy use, raising yield and quality, and automating production processes. We combine Korean engineering and innovation with local agronomic experience to develop suitable, measurable and scalable agri-technology solutions for Uzbekistan and the wider region.":
        "Стать самым надёжным партнёром по технологиям умных ферм в Центральной Азии за счёт оптимизации расхода воды и энергии, повышения урожайности и качества, а также автоматизации производственных процессов.\n\nМы объединяем корейскую инженерию и инновации с местным агрономическим опытом, разрабатывая подходящие, измеримые и масштабируемые агротехнологические решения для Узбекистана и всего региона.",
      "Trust. Precision. Results.": "Доверие. Точность. Результат.",
      "Our work rests on three core principles: Trust: we build open, responsible and long-term partnerships with farmers, partners and investors. Precision: we base decisions on data, sensors, agronomic analysis and real indicators, not guesswork. Results: we turn every technological solution into real, measurable economic value for the farmer.":
        "Наша работа опирается на три ключевых принципа:\n\nДоверие: мы выстраиваем открытые, ответственные и долгосрочные партнёрства с фермерами, партнёрами и инвесторами.\n\nТочность: мы принимаем решения не на догадках, а на данных, датчиках, агрономическом анализе и реальных показателях.\n\nРезультат: мы превращаем каждое технологическое решение в реальную, измеримую экономическую ценность для фермера.",
      "Four commitments to every grower.": "Четыре обязательства перед каждым аграрием.",
      "Localized engineering": "Локализованная инженерия",
      "Every system is specified for the site's climate, water and target crop, not copy-pasted from another market.":
        "Каждая система рассчитана под климат, воду и культуру объекта, а не скопирована с другого рынка.",
      "Transparent sourcing": "Прозрачные поставки",
      "Equipment is imported directly from Korea and vetted suppliers, with clear specifications and warranties.":
        "Оборудование поставляется напрямую из Кореи и от проверенных поставщиков с чёткими спецификациями и гарантиями.",
      "Hands-on training": "Практическое обучение",
      "We don't just install, we teach teams to operate and optimize their farm independently.":
        "Мы не просто монтируем, мы учим команды самостоятельно управлять фермой и оптимизировать её.",
      "Long-term support": "Долгосрочная поддержка",
      "Remote monitoring and local service keep facilities productive season after season.":
        "Удалённый мониторинг и местный сервис сохраняют продуктивность объектов из сезона в сезон.",
      "Firmmit Uzbekistan in numbers": "Firmmit Uzbekistan в цифрах",
      "Partner suppliers": "Партнёров-поставщиков", "Global head office": "Головной офис",
      "Let's grow something lasting.": "Вырастим что-то долговечное.",
      "Partner with a team that treats your harvest as its own.": "Работайте с командой, которая относится к вашему урожаю как к своему.",
      /* products */
      "Everything a modern farm needs, in one place.": "Всё, что нужно современной ферме,, в одном месте.",
      "From the greenhouse shell to the sensor on the vine, we supply integrated smart-farm systems engineered for Uzbekistan's climate and crops.":
        "От каркаса теплицы до датчика на растении, мы поставляем интегрированные умные системы для климата и культур Узбекистана.",
      "Buy a complete facility or a single subsystem, every product is designed to integrate cleanly with the rest.":
        "Купите полный комплекс или отдельную подсистему, каждый продукт легко интегрируется с остальными.",
      "Galvanized-frame venlo and multi-span structures with diffused glazing, thermal screens and natural ventilation, sized to your plot.":
        "Оцинкованные конструкции венло и многопролётные теплицы с рассеивающим остеклением, тепловыми экранами и естественной вентиляцией под ваш участок.",
      "Venlo": "Венло", "Multi-span": "Многопролётные", "Thermal screen": "Тепловой экран",
      "Hydroponic & NFT Systems": "Гидропоника и NFT-системы",
      "Soil-free growing lines, NFT channels, deep-water culture and substrate systems, that cut water use and boost yield per m².":
        "Беспочвенные линии, NFT-каналы, глубоководная культура и субстратные системы, снижают расход воды и повышают урожай с м².",
      "Climate Control": "Управление климатом",
      "Heating, cooling, CO₂ enrichment and fogging managed by a central controller to hold the perfect growing environment.":
        "Отопление, охлаждение, обогащение CO₂ и туманообразование под управлением центрального контроллера для идеальной среды.",
      "Heating": "Отопление", "Pad & fan": "Пад-энд-фан", "CO₂": "CO₂",
      "IoT Sensors & Automation": "IoT-датчики и автоматизация",
      "Wireless sensors for temperature, humidity, EC/pH, soil moisture and light, feeding a live dashboard and automated actions.":
        "Беспроводные датчики температуры, влажности, EC/pH, влажности почвы и света с панелью в реальном времени и автоматикой.",
      "Irrigation & Fertigation": "Орошение и фертигация",
      "Drip lines, dosing units and filtration that deliver water and nutrients precisely, saving up to 30% versus open-field methods.":
        "Капельные линии, дозаторы и фильтрация для точной подачи воды и питания, экономия до 30% по сравнению с открытым грунтом.",
      "Drip": "Капельное", "Dosing": "Дозирование", "Filtration": "Фильтрация",
      "Seedlings & Growing Media": "Рассада и субстраты",
      "Quality seedlings, coco-coir and rockwool substrates, and nutrient packs selected for high-value greenhouse crops.":
        "Качественная рассада, кокосовый и минераловатный субстраты и наборы питания для ценных тепличных культур.",
      "Seedlings": "Рассада", "Coco-coir": "Кокос", "Nutrients": "Питание",
      "See our services": "Наши услуги",
      "Our systems are tuned for the crops that perform best under controlled environments in Uzbekistan, protecting them from heat, dust and water stress.":
        "Наши системы настроены под культуры, лучше всего растущие в контролируемой среде Узбекистана, защищая их от жары, пыли и нехватки воды.",
      "Tomatoes": "Томаты", "Cucumbers": "Огурцы", "Peppers": "Перцы", "Leafy greens": "Зелень",
      "Strawberries": "Клубника", "Herbs": "Пряные травы", "Melons": "Дыни/бахчевые", "Flowers": "Цветы",
      "Need a tailored product package?": "Нужен индивидуальный комплект?",
      "Tell us your crop, plot size and goals, we'll assemble the right system and quote it.":
        "Сообщите культуру, площадь и цели, мы подберём систему и рассчитаем стоимость.",
      "Request a quote": "Запросить расчёт",
      "For sale": "В продаже", "Catalog": "Каталог", "Online Store": "Онлайн-магазин",
      "Beyond greenhouses and equipment, Firmmit Uzbekistan sells finished products: premium strawberry varieties, seedlings, fresh greenhouse produce and genuine spare parts, ready for market.":
        "Помимо теплиц и оборудования, Firmmit Uzbekistan продаёт готовую продукцию: премиальные сорта клубники, рассаду, свежие тепличные овощи и оригинальные запчасти, готовые к рынку.",
      "Seolhyang (설향) Strawberry": "Клубника Сольхян (설향)",
      "Korea's most popular strawberry cultivar, large, glossy, high-sugar berries with excellent flavour and shelf life. Available as seedlings and fresh fruit.":
        "Самый популярный корейский сорт клубники, крупные, глянцевые, сладкие ягоды с прекрасным вкусом и лёжкостью. Поставляется как рассада и свежие ягоды.",
      "1943 Strawberry": "Клубника 1943",
      "A firm, aromatic strawberry variety selected for high yield and transport durability, well suited to controlled-environment growing in the region.":
        "Плотный, ароматный сорт клубники, отобранный за высокую урожайность и транспортабельность, отлично подходит для выращивания в контролируемой среде региона.",
      "Fresh Greenhouse Produce": "Свежая тепличная продукция",
      "Tomatoes, cucumbers, peppers and leafy greens grown in Firmmit facilities, clean, consistent and available year-round.":
        "Томаты, огурцы, перцы и зелень, выращенные на объектах Firmmit, чистые, стабильного качества и доступные круглый год.",
      "Seedlings & Starter Plants": "Рассада и саженцы",
      "Healthy, disease-screened seedlings and starter plants so growers begin every season from a strong, reliable base.":
        "Здоровая, проверенная на болезни рассада и саженцы, чтобы аграрии начинали каждый сезон с надёжной основы.",
      "Genuine Spare Parts": "Оригинальные запчасти",
      "The same spare parts behind our maintenance service, available for direct purchase, sensors, controllers, fittings, pumps and consumables.":
        "Те же запчасти, что и в нашем сервисе обслуживания, доступные для прямой покупки, датчики, контроллеры, фитинги, насосы и расходные материалы.",
      "Ready-Stock Equipment": "Оборудование со склада",
      "Frequently ordered climate, irrigation and IoT items kept in stock for fast delivery without a full project lead time.":
        "Часто заказываемые климатические, оросительные и IoT-товары на складе для быстрой поставки без полного срока проекта.",
      "Strawberry": "Клубника", "Fresh produce": "Свежая продукция", "Parts": "Запчасти", "Equipment": "Оборудование",
      "Premium variety": "Премиум-сорт", "Greenhouse-grown": "Тепличное", "Starter plants": "Саженцы",
      "In stock": "В наличии", "Ready to ship": "Готово к отгрузке",
      "Browse our full range with specifications, varieties and options in the Firmmit Uzbekistan product catalog. Download the PDF or request a printed copy.":
        "Ознакомьтесь со всем ассортиментом, спецификациями, сортами и опциями в каталоге Firmmit Uzbekistan. Скачайте PDF или запросите печатный экземпляр.",
      "Download catalog (PDF)": "Скачать каталог (PDF)", "Request printed catalog": "Запросить печатный каталог",
      "Browse the catalog": "Открыть каталог",
      "Our full product catalog is available online, searchable and shown in your language.": "Полный каталог продукции доступен онлайн, с поиском и на вашем языке.",
      "The catalog is being finalized, request a copy and we'll send it to you directly.":
        "Каталог дорабатывается, запросите копию, и мы отправим её вам напрямую.",
      /* services */
      "We stay with you from blueprint to harvest.": "Мы рядом от чертежа до урожая.",
      "A greenhouse is only as good as the team behind it. Our end-to-end services make sure your investment produces, season after season.":
        "Теплица хороша настолько, насколько хороша команда за ней. Наши комплексные услуги обеспечивают отдачу от инвестиций сезон за сезоном.",
      "Every engagement follows the same disciplined process, so you always know what happens next.":
        "Каждый проект идёт по одному чёткому процессу, поэтому вы всегда знаете следующий шаг.",
      "Consult & Design": "Консультация и проект",
      "Site survey, crop selection and a facility design matched to your climate and budget.":
        "Обследование участка, подбор культуры и проект объекта под ваш климат и бюджет.",
      "Supply & Build": "Поставка и монтаж",
      "Import, deliver and install the greenhouse, climate and irrigation systems.":
        "Импорт, доставка и монтаж теплицы, климатических и оросительных систем.",
      "Train & Launch": "Обучение и запуск",
      "Hands-on operator training and a supported first growing cycle.":
        "Практическое обучение операторов и сопровождение первого цикла выращивания.",
      "Support & Optimize": "Поддержка и оптимизация",
      "Remote monitoring, maintenance and agronomy to keep yields climbing.":
        "Удалённый мониторинг, обслуживание и агрономия для роста урожайности.",
      "Full-service smart farming": "Умное фермерство под ключ",
      "Consulting & Feasibility": "Консалтинг и ТЭО",
      "Business case, crop economics, water assessment and ROI modelling before a single beam is ordered.":
        "Бизнес-модель, экономика культуры, оценка воды и расчёт ROI до заказа первой балки.",
      "Engineering & Design": "Инженерия и проектирование",
      "Structural, climate and irrigation design tailored to your site, delivered as clear, buildable plans.":
        "Конструктивный, климатический и оросительный проект под ваш объект в виде понятных рабочих планов.",
      "Installation & Commissioning": "Монтаж и пусконаладка",
      "Professional on-site assembly, wiring, calibration and handover of a ready-to-grow facility.":
        "Профессиональная сборка, монтаж, калибровка и сдача готового к выращиванию объекта.",
      "Grower Training": "Обучение аграриев",
      "Practical training in climate management, crop care and dashboard use, in Uzbek, Russian and English.":
        "Практическое обучение управлению климатом, уходу за культурами и работе с панелью, на узбекском, русском и английском.",
      "Maintenance & Spare Parts": "Обслуживание и запчасти",
      "Scheduled servicing, rapid repairs and a stocked supply of genuine spare parts.":
        "Плановое обслуживание, быстрый ремонт и запас оригинальных запчастей.",
      "Remote Monitoring": "Удалённый мониторинг",
      "Cloud dashboards and alerts let our specialists and yours watch the farm from anywhere.":
        "Облачные панели и оповещения позволяют нашим и вашим специалистам следить за фермой из любой точки.",
      "Korean technology, local hands.": "Корейские технологии, местные руки.",
      "✓ Backed by Firmmit Korea's R&D and equipment supply": "✓ Поддержка R&D и поставок оборудования Firmmit Korea",
      "✓ Local engineers and agronomists who know the region": "✓ Местные инженеры и агрономы, знающие регион",
      "✓ One accountable partner for the whole project": "✓ Один ответственный партнёр на весь проект",
      "✓ Support in Uzbek, Russian, Korean and English": "✓ Поддержка на узбекском, русском, корейском и английском",
      "✓ Documented warranties and transparent pricing": "✓ Документальные гарантии и прозрачные цены",
      "Book a consultation": "Записаться на консультацию",
      "Ready to plan your farm?": "Готовы спланировать ферму?",
      "Book a free consultation and we'll map out the fastest path to a productive greenhouse.":
        "Запишитесь на бесплатную консультацию, мы наметим кратчайший путь к продуктивной теплице.",
      "Talk to a specialist": "Поговорить со специалистом",
      /* import-export */
      "Connecting Korea and Uzbekistan across the supply chain.": "Соединяем Корею и Узбекистан по всей цепочке поставок.",
      "Beyond national borders, bringing proven Korean agri-technology into Uzbekistan and helping regional produce reach new markets.":
        "За пределами границ, привносим проверенные корейские агротехнологии в Узбекистан и помогаем региональной продукции выходить на новые рынки.",
      "Our head-office link with Firmmit Korea gives us a direct, trusted channel in both directions of the agricultural supply chain.":
        "Связь с головным офисом Firmmit Korea даёт нам прямой, надёжный канал в обоих направлениях агроцепочки.",
      "IMPORT · KOREA → UZBEKISTAN": "ИМПОРТ · КОРЕЯ → УЗБЕКИСТАН",
      "Smart-farm equipment & inputs": "Оборудование и материалы для умных ферм",
      "Greenhouse structures, climate and irrigation systems, IoT hardware, growing media and quality seedlings, sourced from Korea and vetted partners, delivered with documentation and warranty.":
        "Тепличные конструкции, климатические и оросительные системы, IoT-оборудование, субстраты и качественная рассада, из Кореи и от проверенных партнёров, с документами и гарантией.",
      "✓ Greenhouse & climate systems": "✓ Тепличные и климатические системы",
      "✓ Sensors, controllers & automation": "✓ Датчики, контроллеры и автоматика",
      "✓ Substrates, nutrients & seedlings": "✓ Субстраты, питание и рассада",
      "EXPORT · UZBEKISTAN → REGION": "ЭКСПОРТ · УЗБЕКИСТАН → РЕГИОН",
      "Fresh & processed produce": "Свежая и переработанная продукция",
      "We help greenhouse growers meet the quality and packaging standards buyers expect, and connect their harvest to regional and international markets.":
        "Мы помогаем тепличным аграриям соответствовать стандартам качества и упаковки и выводим урожай на региональные и международные рынки.",
      "✓ Greenhouse vegetables & fruit": "✓ Тепличные овощи и фрукты",
      "✓ Grading, packing & cold-chain guidance": "✓ Сортировка, упаковка и холодовая цепь",
      "✓ Buyer matching & export documentation": "✓ Поиск покупателей и экспортные документы",
      "Simple, documented, dependable": "Просто, документально, надёжно",
      "Sourcing": "Поиск", "We identify the right equipment or buyer and confirm specifications and price.":
        "Находим нужное оборудование или покупателя и согласуем спецификации и цену.",
      "Logistics": "Логистика", "Freight, insurance and customs handled through established Korea–UZ routes.":
        "Фрахт, страхование и таможня через отлаженные маршруты Корея–Узбекистан.",
      "Compliance": "Соответствие", "Certificates, phytosanitary and import/export paperwork prepared correctly.":
        "Сертификаты, фитосанитарные и импортно-экспортные документы оформляются корректно.",
      "Delivery": "Доставка", "Goods delivered, inspected and, where needed, installed and commissioned.":
        "Товары доставляются, проверяются и при необходимости монтируются и вводятся в эксплуатацию.",
      "Countries linked": "Связанных стран", "Trusted suppliers": "Проверенных поставщиков",
      "Documented shipments": "Документированных отгрузок", "Product categories": "Категорий товаров",
      "Import equipment or export your harvest.": "Импортируйте оборудование или экспортируйте урожай.",
      "Tell us what you need to move, our trade team will handle sourcing, logistics and compliance.":
        "Сообщите, что нужно перевезти, наша торговая команда возьмёт на себя поиск, логистику и оформление.",
      "Start a trade inquiry": "Отправить торговый запрос",
      /* partners */
      "Strong farms are built on strong partnerships.": "Сильные фермы строятся на сильном партнёрстве.",
      "We bring together our Korean head office, technology suppliers, institutions and growers into one dependable network.":
        "Мы объединяем наш корейский головной офис, поставщиков технологий, институты и аграриев в единую надёжную сеть.",
      "Every project we deliver draws on the research, engineering and supply strength of Firmmit Korea. This direct relationship is what lets us offer Korean-grade smart-farm technology locally, with full technical backing.":
        "Каждый наш проект опирается на исследования, инженерию и поставки Firmmit Korea. Эта прямая связь позволяет нам предлагать умные агротехнологии корейского уровня локально, с полной технической поддержкой.",
      "Who we work with": "С кем мы работаем",
      "Four groups of partners make every Firmmit Uzbekistan project possible.":
        "Четыре группы партнёров делают возможным каждый проект Firmmit Uzbekistan.",
      "Firmmit Korea, R&D, engineering and equipment supply.": "Firmmit Korea, R&D, инженерия и поставка оборудования.",
      "Technology Suppliers": "Поставщики технологий",
      "Greenhouse, climate, irrigation and sensor manufacturers.": "Производители теплиц, климата, орошения и датчиков.",
      "Institutions": "Институты", "Agricultural universities, research centers and associations.":
        "Аграрные университеты, исследовательские центры и ассоциации.",
      "Growers & Cooperatives": "Аграрии и кооперативы",
      "Farms and cooperatives operating our facilities on the ground.": "Фермы и кооперативы, эксплуатирующие наши объекты.",
      "A growing family of partners": "Растущая семья партнёров",
      "Our partner network is expanding. Partner organisations will be listed here as agreements are confirmed.":
        "Наша партнёрская сеть расширяется. Партнёрские организации появятся здесь по мере заключения соглашений.",
      "Partner logos will appear here soon.": "Логотипы партнёров появятся здесь в ближайшее время.",
      "Become a Firmmit partner.": "Станьте партнёром Firmmit.",
      "Supplier, institution or grower, if you're building the future of regional agriculture, let's talk.":
        "Поставщик, институт или аграрий, если вы строите будущее сельского хозяйства региона, давайте поговорим.",
      "Partner with us": "Стать партнёром",
      /* certificates */
      "Quality you can verify, not just trust.": "Качество, которое можно проверить, а не просто доверять.",
      "Our systems, processes and trade operations are held to recognized standards, because reliable food production demands it.":
        "Наши системы, процессы и торговые операции соответствуют признанным стандартам, потому что надёжное производство продовольствия этого требует.",
      "Certifications behind every project.": "Сертификаты за каждым проектом.",
      "Certification documents are being compiled and will be published here. Verified certificates are available to clients and partners on request.":
        "Сертификаты формируются и будут опубликованы здесь. Подтверждённые сертификаты предоставляются клиентам и партнёрам по запросу.",
      "Certificate": "Сертификат", "Coming soon": "Скоро",
      "Standards that protect your harvest.": "Стандарты, защищающие ваш урожай.",
      "Certification isn't paperwork to us, it's how we guarantee that a system installed in Tashkent performs like one engineered in Seoul, and that produce leaving a Firmmit facility is safe and traceable.":
        "Сертификация для нас, не формальность, а гарантия того, что система, установленная в Ташкенте, работает как спроектированная в Сеуле, а продукция с объекта Firmmit безопасна и прослеживаема.",
      "Request certificate documents": "Запросить документы",
      "Need documentation for a tender?": "Нужны документы для тендера?",
      "We'll provide the certificates and specifications your procurement process requires.":
        "Мы предоставим сертификаты и спецификации, необходимые для вашей закупочной процедуры.",
      "Contact us": "Связаться с нами", "Contact us →": "Связаться с нами →",
      /* news */
      "What's growing at Firmmit Uzbekistan.": "Что растёт в Firmmit Uzbekistan.",
      "Project milestones, technology insights and stories from the field as we bring smart farming to the region.":
        "Вехи проектов, технологические обзоры и истории с полей, по мере того как мы приносим умное фермерство в регион.",
      "Featured": "Главное",
      "Firmmit Uzbekistan opens as the regional branch of Firmmit Korea": "Firmmit Uzbekistan открывается как региональный филиал Firmmit Korea",
      "Our new office brings Korean smart-farm technology, engineering and agri-trade directly to growers in Uzbekistan, with local specialists and full head-office support.":
        "Новый офис приносит корейские умные агротехнологии, инженерию и агроторговлю напрямую аграриям Узбекистана, с местными специалистами и полной поддержкой головного офиса.",
      "From the field": "С полей", "Projects": "Проекты", "Technology": "Технологии",
      "Trade": "Торговля", "Training": "Обучение", "Partnership": "Партнёрство",
      "First multi-span greenhouse commissioned near Tashkent": "Первая многопролётная теплица введена в строй под Ташкентом",
      "A pilot facility demonstrates climate-controlled tomato production with significantly reduced water use.":
        "Пилотный объект демонстрирует выращивание томатов в контролируемом климате при значительной экономии воды.",
      "How IoT sensors cut water use in arid-climate farming": "Как IoT-датчики снижают расход воды в засушливом климате",
      "A look at the sensor-and-automation stack that keeps greenhouses efficient through hot, dry summers.":
        "Обзор системы датчиков и автоматизации, поддерживающей эффективность теплиц жарким сухим летом.",
      "New Korea–Uzbekistan supply route for greenhouse equipment": "Новый маршрут Корея–Узбекистан для тепличного оборудования",
      "Streamlined logistics shorten delivery times for climate and irrigation systems imported from Korea.":
        "Оптимизированная логистика сокращает сроки поставки климатических и оросительных систем из Кореи.",
      "Grower training program launches in three regions": "Программа обучения аграриев стартовала в трёх регионах",
      "Hands-on workshops help local teams master climate management and dashboard-driven crop care.":
        "Практические семинары помогают местным командам освоить управление климатом и уход за культурами по данным.",
      "Collaboration with agricultural institutions on regional trials": "Сотрудничество с аграрными институтами по региональным испытаниям",
      "Joint research explores the best greenhouse crops and setups for Central Asian conditions.":
        "Совместные исследования изучают лучшие тепличные культуры и решения для условий Центральной Азии.",
      "Firmmit brings its smart-farm vision to Central Asia": "Firmmit приносит своё видение умного фермерства в Центральную Азию",
      "An introduction to our mission: preparing tomorrow's food with reliable, sustainable technology.":
        "Знакомство с нашей миссией: готовить продовольствие завтрашнего дня с помощью надёжных устойчивых технологий.",
      "Subscribe for updates": "Подписаться на новости",
      "Want to feature your project?": "Хотите рассказать о своём проекте?",
      "If you're growing with Firmmit, we'd love to share your story.": "Если вы растёте с Firmmit, мы будем рады рассказать вашу историю.",
      /* contact */
      "Let's build your smart farm together.": "Построим вашу умную ферму вместе.",
      "Tell us about your land, crop and goals. Our team will get back to you with clear next steps, no obligation.":
        "Расскажите о вашей земле, культуре и целях. Наша команда ответит с чёткими следующими шагами, без обязательств.",
      "Office": "Офис", "Email": "Эл. почта", "Phone": "Телефон", "Business hours": "Часы работы",
      "Mon–Fri, 09:00 – 18:00": "Пн–Пт, 09:00 – 18:00", "Closed on public holidays": "Выходные в праздничные дни",
      "Full name": "Полное имя", "Company / Farm": "Компания / ферма",
      "I'm interested in": "Меня интересует", "Select a topic": "Выберите тему",
      "Can I help you with anything?": "Чем мы можем вам помочь?",
      "Outdoor Smart Farm": "Уличная умная ферма", "Indoor Smart Farm": "Крытая умная ферма",
      "Plant Factory": "Фабрика растений", "Collaboration proposal": "Предложение о сотрудничестве",
      "Casual Meeting": "Неформальная встреча", "ETC": "Другое",
      "Catalog": "Каталог", "Catalog (PDF)": "Каталог (PDF)",
      "DWC": "DWC", "Substrate": "Субстрат", "EC / pH": "EC / pH", "Soil moisture": "Влажность почвы", "Dashboard": "Панель",
      "Explore products": "Смотреть продукцию",
      "Full name *": "Полное имя *", "Email *": "Эл. почта *", "Message *": "Сообщение *", "Can I help you with anything? *": "Чем мы можем вам помочь? *",
      "July 2026 · Company": "Июль 2026 · Компания", "July 2026": "Июль 2026", "June 2026": "Июнь 2026", "May 2026": "Май 2026", "April 2026": "Апрель 2026",
      "Article previews shown are illustrative of the topics we cover.": "Показанные анонсы статей иллюстрируют темы, которые мы освещаем.",
      "Error 404": "Ошибка 404", "Page not found": "Страница не найдена",
      "The page you're looking for doesn't exist or may have moved.": "Запрашиваемая страница не существует или была перемещена.",
      "Back to home": "На главную",
      "The map shows our exact office location, Mahtumquli 130, Yashnobod district, Tashkent.": "На карте показано точное расположение нашего офиса, Махтумкули 130, Яшнабадский район, Ташкент.",
      "Smart greenhouse project": "Проект умной теплицы", "Products & equipment": "Продукция и оборудование",
      "Services (design, install, training)": "Услуги (проект, монтаж, обучение)",
      "Import & export / trade": "Импорт и экспорт / торговля", "Partnership": "Партнёрство", "Other": "Другое",
      "Message": "Сообщение", "Send inquiry": "Отправить запрос",
      "Your name": "Ваше имя", "Organization": "Организация",
      "Tell us about your land, crop, plot size and goals...": "Расскажите о вашей земле, культуре, площади и целях...",
      "By sending, you agree to be contacted about your inquiry. This demo form does not transmit or store data.":
        "Отправляя, вы соглашаетесь на связь по вашему запросу. Эта демо-форма не передаёт и не хранит данные.",
      "Director": "Директор",
      "Company name": "Наименование", "Address": "Адрес", "Tax ID (INN)": "ИНН",
      "Bank": "Банк", "Bank code (MFO)": "МФО", "Account": "Расчётный счёт",
      "Map shows the Tashkent area for reference. Exact office location shared upon inquiry.":
        "Карта показывает район Ташкента для ориентира. Точный адрес офиса сообщается по запросу."
    },

    uz: {
      /* nav */
      "Home": "Bosh sahifa", "About Us": "Biz haqimizda", "Products": "Mahsulotlar",
      "Services": "Xizmatlar", "Import & Export": "Import va eksport", "Our Partners": "Hamkorlarimiz",
      "Certificates": "Sertifikatlar", "News": "Yangiliklar", "Contact": "Aloqa",
      "Head Office ↗": "Bosh ofis ↗", "Head Office, Firmmit Korea ↗": "Bosh ofis, Firmmit Korea ↗",
      /* footer */
      "Bringing Korean smart-farm technology to Uzbekistan, greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.":
        "Koreyaning aqlli ferma texnologiyalarini O'zbekistonga olib kelamiz, issiqxonalar, nazorat qilinadigan muhitda dehqonchilik va mintaqaviy oziq-ovqat ta'minoti uchun agro-savdo.",
      "Company": "Kompaniya", "What we do": "Faoliyatimiz",
      "Head Office": "Bosh ofis",
      "Smart-farm headquarters · Seoul, Republic of Korea": "Aqlli ferma shtab-kvartirasi · Seul, Koreya Respublikasi",
      "© 2026 Firmmit Uzbekistan. A branch of Firmmit Korea. All rights reserved.":
        "© 2026 Firmmit Uzbekistan. Firmmit Korea filiali. Barcha huquqlar himoyalangan.",
      /* eyebrows */
      "Firmmit Uzbekistan · Smart Agriculture": "Firmmit Uzbekistan · Aqlli qishloq xo'jaligi",
      "Introduction": "Kirish", "Business": "Yo'nalishlar", "Global Network": "Global tarmoq",
      "Who we are": "Biz kimmiz", "Our Philosophy": "Falsafamiz", "How we work": "Qanday ishlaymiz",
      "At a glance": "Qisqacha", "Product range": "Mahsulot turlari", "Best-suited crops": "Mos ekinlar",
      "How a project runs": "Loyiha jarayoni", "What we offer": "Nimani taklif qilamiz",
      "Our work": "Bizning ishlarimiz", "Featured projects": "Loyihalarimiz", "Mongol-type 2-span greenhouse": "Mo'g'ul tipidagi 2 pro'lyotli issiqxona", "Glass greenhouse 2.18 ha": "Shisha issiqxona 2,18 ga", "Interactive 3D model, rotate and explore every part": "Interaktiv 3D model, aylantirib, har bir qismini o'rganing", "Explore in 3D": "3D'da ko'rish",
      "Why growers choose us": "Nega bizni tanlashadi", "Two-way trade": "Ikki tomonlama savdo",
      "How trade works with us": "Savdo qanday ishlaydi", "Our anchor partner": "Asosiy hamkorimiz",
      "Ecosystem": "Ekotizim", "Our network": "Tarmog'imiz",
      "Standards & accreditation": "Standartlar va akkreditatsiya", "Our commitment": "Majburiyatlarimiz",
      "Latest updates": "So'nggi yangiliklar", "Get in touch": "Bog'lanish", "Company details": "Kompaniya rekvizitlari",
      /* home hero */
      "Firmmit Uzbekistan delivers Korean controlled-environment agriculture, modern greenhouses, precision climate systems and reliable agri-systems, to farms across Uzbekistan and Central Asia.":
        "Firmmit Uzbekistan Koreyaning nazorat qilinadigan muhit dehqonchiligini, zamonaviy issiqxonalar, aniq iqlim tizimlari va ishonchli agro tizimni, O'zbekiston va Markaziy Osiyo fermalariga yetkazadi.",
      "Explore our solutions": "Yechimlarimiz", "Talk to our team": "Jamoa bilan bog'lanish",
      "Regions served": "Qamrab olingan hududlar", "Projects delivered": "Bajarilgan loyihalar",
      "Client retention": "Mijozlarni saqlab qolish", "Greenhouse projects": "Issiqxona loyihalari",
      "Regions covered": "Qamrab olingan hududlar", "Avg. water saved": "O'rtacha suv tejash",
      "Technical support": "Texnik yordam",
      "Four connected capabilities that take a project from first design to a thriving, data-driven farm.": "Loyihani birinchi loyihadan gullab-yashnayotgan, ma'lumotlarga asoslangan fermagacha olib boradigan to'rtta o'zaro bog'liq yo'nalish.",
      /* home intro */
      "As the Uzbekistan branch of Firmmit Korea, we localize proven smart-farm technology for the region's climate, crops and growers, combining Korean engineering with on-the-ground agronomy.":
        "Firmmit Koreaning O'zbekiston filiali sifatida biz sinovdan o'tgan aqlli ferma texnologiyasini mintaqa iqlimi, ekinlari va fermerlariga moslashtiramiz, Koreya muhandisligini mahalliy agronomiya bilan birlashtiramiz.",
      "✓ Turnkey smart greenhouses engineered for arid climates": "✓ Qurg'oqchil iqlim uchun tayyor aqlli issiqxonalar",
      "✓ Precision irrigation, sensors and climate automation": "✓ Aniq sug'orish, sensorlar va iqlim avtomatikasi",
      "✓ Direct Korea–Uzbekistan supply and technical support": "✓ To'g'ridan-to'g'ri Koreya–O'zbekiston ta'minoti va texnik yordam",
      "About Firmmit Uzbekistan": "Firmmit Uzbekistan haqida",
      /* business cards */
      "Smart Greenhouses": "Aqlli issiqxonalar",
      "Structures and glazing engineered for high yield and low water use in Central Asian conditions.":
        "Markaziy Osiyo sharoitida yuqori hosil va kam suv sarfi uchun konstruksiyalar va oynalar.",
      "Climate & IoT": "Iqlim va IoT",
      "Sensors, controllers and dashboards that automate temperature, humidity and nutrient delivery.":
        "Harorat, namlik va oziq berishni avtomatlashtiruvchi sensorlar, kontrollerlar va panellar.",
      "Agronomy Services": "Agronomiya xizmatlari",
      "Installation, grower training and season-long support from Korean and local specialists.":
        "Koreya va mahalliy mutaxassislardan o'rnatish, fermerlarni o'qitish va mavsum davomida qo'llab-quvvatlash.",
      "Import & Export ": "Import va eksport ",
      "Sourcing equipment from Korea and connecting Uzbek produce to regional markets.":
        "Koreyadan jihoz yetkazib berish va O'zbekiston mahsulotini mintaqaviy bozorlarga chiqarish.",
      "Learn more →": "Batafsil →", "Read more →": "Batafsil o'qish →",
      /* home global */
      "Korean R&D": "Koreya R&D", "Local agronomy": "Mahalliy agronomiya",
      "Shared supply chain": "Umumiy ta'minot zanjiri", "Joint training": "Qo'shma o'qitish",
      "Visit Head Office, Firmmit Korea": "Bosh ofis, Firmmit Korea",
      "Visit Firmmit Korea": "Firmmit Koreaga o'tish",
      /* CTA */
      "Bring smart farming to your land.": "Aqlli dehqonchilikni yeringizga olib keling.",
      "Whether you're planning a single greenhouse or a regional facility, our team will design a solution around your crop, climate and budget.":
        "Bitta issiqxona yoki mintaqaviy obyekt rejalashtiryapsizmi, jamoamiz ekiningiz, iqlim va byudjetingizga mos yechim ishlab chiqadi.",
      "Start your project": "Loyihani boshlash", "Get in touch →": "Bog'lanish →",
      /* about */
      "Korean smart-farm expertise, rooted in Uzbek soil.": "Koreya aqlli ferma tajribasi, O'zbek tuprog'ida.",
      "We are the Uzbekistan branch of Firmmit Korea, a smart-farm company preparing the food of tomorrow. Our mission is to make advanced, sustainable agriculture accessible to growers across the region.":
        "Biz Firmmit Koreaning O'zbekiston filialimiz, ertangi oziq-ovqatni tayyorlayotgan aqlli ferma kompaniyasi. Vazifamiz, ilg'or, barqaror qishloq xo'jaligini mintaqa fermerlariga qulay qilish.",
      "Firmmit Uzbekistan was established to adapt Firmmit Korea's proven controlled-environment agriculture for Central Asia. We combine Korean engineering, R&D and equipment with local agronomy, language and service, so growers get world-class technology with a partner next door.":
        "Firmmit Uzbekistan Firmmit Koreaning sinovdan o'tgan nazoratli muhit dehqonchiligini Markaziy Osiyoga moslashtirish uchun tashkil etilgan. Biz Koreya muhandisligi, R&D va jihozlarini mahalliy agronomiya, til va xizmat bilan birlashtiramiz, fermerlar yonidagi hamkor bilan jahon darajasidagi texnologiyaga ega bo'ladi.",
      "From feasibility study to harvest, we stay involved: designing the facility, sourcing the right systems, installing them, training the team and supporting every season that follows.":
        "Texnik-iqtisodiy asosdan hosilgacha biz yoningizdamiz: obyektni loyihalash, tizimlarni tanlash, o'rnatish, jamoani o'qitish va keyingi har bir mavsumni qo'llab-quvvatlash.",
      "Because your life is behind our work.": "Bizning ishimiz ortida insonlar hayoti turadi.",
      "Food security is not merely a matter of agriculture, it is directly tied to the sustainable future of every family, every farm and the entire region. That is why every technological solution we build rests on the principles of dependable harvests, rational use of resources and long-term sustainability. We adapt Korea's advanced smart-farm technologies to Central Asia's climate, water, crops and local growing conditions, delivering practical, measurable results for farmers.":
        "Oziq-ovqat xavfsizligi, shunchaki qishloq xo'jaligi masalasi emas. Bu har bir oila, fermer xo'jaligi va butun mintaqaning barqaror kelajagi bilan bevosita bog'liq.\n\nShu sababli biz yaratadigan har bir texnologik yechim ishonchli hosil, oqilona resurs sarfi va uzoq muddatli barqarorlik tamoyillariga asoslanadi.\n\nBiz Koreyaning ilg'or aqlli ferma texnologiyalarini Markaziy Osiyoning iqlimi, suv resurslari, ekinlari va mahalliy agrotexnik sharoitlariga moslashtirib, fermerlar uchun amaliy va o'lchanadigan natija beradigan yechimlarni joriy etamiz.",
      "MISSION": "MISSIYA", "VISION": "MAQSAD", "VALUES": "QADRIYATLAR",
      "Sustainably feed the future": "Kelajakni barqaror oziqlantirish",
      "To build high-yield, efficient and sustainable agricultural production in any climate by deploying smart, precise and resource-efficient agri-technologies. Our aim is not simply to introduce modern technology, but to turn it into real economic results for the farmer.":
        "Aqlli, aniq va resurs-tejamkor agrotexnologiyalarni joriy etish orqali iqlim sharoitidan qat'i nazar, yuqori hosildor, samarali va barqaror qishloq xo'jaligi ishlab chiqarishini shakllantirish.\n\nBizning maqsadimiz, zamonaviy texnologiyani shunchaki joriy etish emas, balki uni fermer uchun real iqtisodiy natijaga aylantirishdir.",
      "Setting a new standard for smart agriculture in Central Asia": "Markaziy Osiyoda aqlli qishloq xo'jaligining yangi standartini yaratish",
      "To become Central Asia's most trusted smart-farm technology partner by optimising water and energy use, raising yield and quality, and automating production processes. We combine Korean engineering and innovation with local agronomic experience to develop suitable, measurable and scalable agri-technology solutions for Uzbekistan and the wider region.":
        "Suv va energiya sarfini optimallashtirish, hosildorlik va mahsulot sifatini oshirish hamda ishlab chiqarish jarayonlarini avtomatlashtirish orqali Markaziy Osiyoning eng ishonchli aqlli ferma texnologiyalari hamkoriga aylanish.\n\nBiz Koreya muhandisligi va innovatsiyasini mahalliy agronomik tajriba bilan birlashtirib, O'zbekiston va butun Markaziy Osiyo uchun mos, o'lchanadigan va kengaytiriladigan agrotexnologik yechimlarni rivojlantiramiz.",
      "Trust. Precision. Results.": "Ishonch. Aniqlik. Natija.",
      "Our work rests on three core principles: Trust: we build open, responsible and long-term partnerships with farmers, partners and investors. Precision: we base decisions on data, sensors, agronomic analysis and real indicators, not guesswork. Results: we turn every technological solution into real, measurable economic value for the farmer.":
        "Bizning faoliyatimiz uchta asosiy tamoyilga tayanadi:\n\nIshonch: fermerlar, hamkorlar va investorlar bilan ochiq, mas'uliyatli va uzoq muddatli hamkorlikni yo'lga qo'yamiz.\n\nAniqlik: qarorlarni taxminlarga emas, ma'lumotlar, sensorlar, agronomik tahlil va real ko'rsatkichlarga asoslaymiz.\n\nNatija: har bir texnologik yechimni fermer uchun real, o'lchanadigan iqtisodiy samaraga aylantiramiz.",
      "Four commitments to every grower.": "Har bir fermerga to'rtta majburiyat.",
      "Localized engineering": "Mahalliylashtirilgan muhandislik",
      "Every system is specified for the site's climate, water and target crop, not copy-pasted from another market.":
        "Har bir tizim obyekt iqlimi, suvi va ekiniga moslab hisoblanadi, boshqa bozordan nusxa ko'chirilmaydi.",
      "Transparent sourcing": "Shaffof ta'minot",
      "Equipment is imported directly from Korea and vetted suppliers, with clear specifications and warranties.":
        "Jihozlar to'g'ridan-to'g'ri Koreyadan va tekshirilgan ta'minotchilardan, aniq spetsifikatsiya va kafolat bilan keltiriladi.",
      "Hands-on training": "Amaliy o'qitish",
      "We don't just install, we teach teams to operate and optimize their farm independently.":
        "Biz shunchaki o'rnatmaymiz, jamoalarni fermani mustaqil boshqarish va optimallashtirishga o'rgatamiz.",
      "Long-term support": "Uzoq muddatli qo'llab-quvvatlash",
      "Remote monitoring and local service keep facilities productive season after season.":
        "Masofaviy monitoring va mahalliy xizmat obyektlarni mavsumdan mavsumga samarali saqlaydi.",
      "Firmmit Uzbekistan in numbers": "Firmmit Uzbekistan raqamlarda",
      "Partner suppliers": "Hamkor ta'minotchilar", "Global head office": "Global bosh ofis",
      "Let's grow something lasting.": "Uzoq davom etadigan narsa yetishtiraylik.",
      "Partner with a team that treats your harvest as its own.": "Hosilingizga o'ziniki kabi qaraydigan jamoa bilan ishlang.",
      /* products */
      "Everything a modern farm needs, in one place.": "Zamonaviy ferma uchun kerak bo'lgan hamma narsa bir joyda.",
      "From the greenhouse shell to the sensor on the vine, we supply integrated smart-farm systems engineered for Uzbekistan's climate and crops.":
        "Issiqxona karkasidan o'simlikdagi sensorgacha, O'zbekiston iqlimi va ekinlariga mo'ljallangan yaxlit aqlli tizimlarni yetkazamiz.",
      "Buy a complete facility or a single subsystem, every product is designed to integrate cleanly with the rest.":
        "To'liq obyekt yoki bitta quyi tizimni oling, har bir mahsulot qolganlariga silliq integratsiyalashadi.",
      "Galvanized-frame venlo and multi-span structures with diffused glazing, thermal screens and natural ventilation, sized to your plot.":
        "Tarqatuvchi oyna, issiqlik ekranlari va tabiiy shamollatishga ega galvanizli venlo va ko'p oraliqli konstruksiyalar, maydoningizga moslab.",
      "Venlo": "Venlo", "Multi-span": "Ko'p oraliqli", "Thermal screen": "Issiqlik ekrani",
      "Hydroponic & NFT Systems": "Gidroponika va NFT tizimlari",
      "Soil-free growing lines, NFT channels, deep-water culture and substrate systems, that cut water use and boost yield per m².":
        "Tuproqsiz o'stirish liniyalari, NFT kanallar, chuqur suvli kultura va substrat tizimlari, suv sarfini kamaytiradi va m² hosilni oshiradi.",
      "Climate Control": "Iqlim nazorati",
      "Heating, cooling, CO₂ enrichment and fogging managed by a central controller to hold the perfect growing environment.":
        "Markaziy kontroller boshqaruvidagi isitish, sovutish, CO₂ boyitish va tumanlash, ideal o'sish muhitini ushlab turadi.",
      "Heating": "Isitish", "Pad & fan": "Pad va fan", "CO₂": "CO₂",
      "IoT Sensors & Automation": "IoT sensorlar va avtomatika",
      "Wireless sensors for temperature, humidity, EC/pH, soil moisture and light, feeding a live dashboard and automated actions.":
        "Harorat, namlik, EC/pH, tuproq namligi va yorug'lik uchun simsiz sensorlar, jonli panel va avtomatik amallarni ta'minlaydi.",
      "Irrigation & Fertigation": "Sug'orish va fertigatsiya",
      "Drip lines, dosing units and filtration that deliver water and nutrients precisely, saving up to 30% versus open-field methods.":
        "Tomchilatib sug'orish liniyalari, dozalash va filtrlash, suv va oziqni aniq yetkazadi, ochiq dala usuliga nisbatan 30% gacha tejaydi.",
      "Drip": "Tomchilatib", "Dosing": "Dozalash", "Filtration": "Filtrlash",
      "Seedlings & Growing Media": "Ko'chatlar va substratlar",
      "Quality seedlings, coco-coir and rockwool substrates, and nutrient packs selected for high-value greenhouse crops.":
        "Sifatli ko'chatlar, kokos va mineral paxta substratlari hamda qimmatli issiqxona ekinlari uchun oziq to'plamlari.",
      "Seedlings": "Ko'chatlar", "Coco-coir": "Kokos", "Nutrients": "Oziqlar",
      "See our services": "Xizmatlarni ko'rish",
      "Our systems are tuned for the crops that perform best under controlled environments in Uzbekistan, protecting them from heat, dust and water stress.":
        "Tizimlarimiz O'zbekistonda nazoratli muhitda eng yaxshi o'sadigan ekinlarga moslangan, ularni issiq, chang va suv taqchilligidan himoya qiladi.",
      "Tomatoes": "Pomidor", "Cucumbers": "Bodring", "Peppers": "Qalampir", "Leafy greens": "Ko'katlar",
      "Strawberries": "Qulupnay", "Herbs": "Ziravor o'tlar", "Melons": "Qovun/tarvuz", "Flowers": "Gullar",
      "Need a tailored product package?": "Moslashtirilgan to'plam kerakmi?",
      "Tell us your crop, plot size and goals, we'll assemble the right system and quote it.":
        "Ekin, maydon va maqsadingizni ayting, mos tizimni yig'ib, narxini hisoblab beramiz.",
      "Request a quote": "Narx so'rash",
      "For sale": "Sotuvda", "Catalog": "Katalog", "Online Store": "Online savdo",
      "Beyond greenhouses and equipment, Firmmit Uzbekistan sells finished products: premium strawberry varieties, seedlings, fresh greenhouse produce and genuine spare parts, ready for market.":
        "Issiqxona va jihozlardan tashqari, Firmmit Uzbekistan tayyor mahsulotlarni ham sotadi: premium qulupnay navlari, ko'chatlar, yangi issiqxona mahsulotlari va original ehtiyot qismlar, bozorga tayyor.",
      "Seolhyang (설향) Strawberry": "Seolhyang (설향) qulupnayi",
      "Korea's most popular strawberry cultivar, large, glossy, high-sugar berries with excellent flavour and shelf life. Available as seedlings and fresh fruit.":
        "Koreyaning eng mashhur qulupnay navi, yirik, yaltiroq, shirin mevalar, ajoyib ta'm va saqlanish muddati bilan. Ko'chat va yangi meva sifatida mavjud.",
      "1943 Strawberry": "1943 qulupnayi",
      "A firm, aromatic strawberry variety selected for high yield and transport durability, well suited to controlled-environment growing in the region.":
        "Yuqori hosildorlik va tashishga chidamliligi uchun tanlangan zich, xushbo'y qulupnay navi, mintaqada nazoratli muhitda yetishtirishga juda mos.",
      "Fresh Greenhouse Produce": "Yangi issiqxona mahsuloti",
      "Tomatoes, cucumbers, peppers and leafy greens grown in Firmmit facilities, clean, consistent and available year-round.":
        "Firmmit obyektlarida yetishtirilgan pomidor, bodring, qalampir va ko'katlar, toza, barqaror va yil davomida mavjud.",
      "Seedlings & Starter Plants": "Ko'chat va nihollar",
      "Healthy, disease-screened seedlings and starter plants so growers begin every season from a strong, reliable base.":
        "Sog'lom, kasalliklarga tekshirilgan ko'chat va nihollar, fermerlar har mavsumni mustahkam, ishonchli asosdan boshlashi uchun.",
      "Genuine Spare Parts": "Original ehtiyot qismlar",
      "The same spare parts behind our maintenance service, available for direct purchase, sensors, controllers, fittings, pumps and consumables.":
        "Texnik xizmatimiz ortidagi o'sha ehtiyot qismlar, endi to'g'ridan-to'g'ri xarid uchun, sensorlar, kontrollerlar, fitinglar, nasoslar va sarf materiallari.",
      "Ready-Stock Equipment": "Omborda tayyor jihozlar",
      "Frequently ordered climate, irrigation and IoT items kept in stock for fast delivery without a full project lead time.":
        "Ko'p buyurtma qilinadigan iqlim, sug'orish va IoT mahsulotlari omborda, to'liq loyiha muddatisiz tez yetkazish uchun.",
      "Strawberry": "Qulupnay", "Fresh produce": "Yangi mahsulot", "Parts": "Ehtiyot qismlar", "Equipment": "Jihozlar",
      "Premium variety": "Premium nav", "Greenhouse-grown": "Issiqxonada", "Starter plants": "Nihollar",
      "In stock": "Omborda", "Ready to ship": "Jo'natishga tayyor",
      "Browse our full range with specifications, varieties and options in the Firmmit Uzbekistan product catalog. Download the PDF or request a printed copy.":
        "Firmmit Uzbekistan katalogida to'liq assortiment, spetsifikatsiya, navlar va variantlar bilan tanishing. PDF'ni yuklab oling yoki bosma nusxa so'rang.",
      "Download catalog (PDF)": "Katalogni yuklab olish (PDF)", "Request printed catalog": "Bosma katalog so'rash",
      "Browse the catalog": "Katalogni ochish",
      "Our full product catalog is available online, searchable and shown in your language.": "To'liq mahsulot katalogi onlayn mavjud, qidiruvli va sizning tilingizda.",
      "The catalog is being finalized, request a copy and we'll send it to you directly.":
        "Katalog yakunlanmoqda, nusxa so'rang, biz uni sizga bevosita yuboramiz.",
      /* services */
      "We stay with you from blueprint to harvest.": "Chizmadan hosilgacha yoningizdamiz.",
      "A greenhouse is only as good as the team behind it. Our end-to-end services make sure your investment produces, season after season.":
        "Issiqxona uning ortidagi jamoa qanchalik yaxshi bo'lsa, shunchalik yaxshi. Yaxlit xizmatlarimiz investitsiyangiz mavsumdan mavsumga hosil berishini ta'minlaydi.",
      "Every engagement follows the same disciplined process, so you always know what happens next.":
        "Har bir loyiha bir xil aniq jarayon bo'yicha boradi, shuning uchun keyingi qadamni doim bilasiz.",
      "Consult & Design": "Maslahat va loyiha",
      "Site survey, crop selection and a facility design matched to your climate and budget.":
        "Obyektni ko'zdan kechirish, ekin tanlash va iqlim hamda byudjetingizga mos obyekt loyihasi.",
      "Supply & Build": "Ta'minot va qurish",
      "Import, deliver and install the greenhouse, climate and irrigation systems.":
        "Issiqxona, iqlim va sug'orish tizimlarini import qilish, yetkazish va o'rnatish.",
      "Train & Launch": "O'qitish va ishga tushirish",
      "Hands-on operator training and a supported first growing cycle.":
        "Operatorlarni amaliy o'qitish va birinchi o'stirish siklini qo'llab-quvvatlash.",
      "Support & Optimize": "Qo'llab-quvvatlash va optimallashtirish",
      "Remote monitoring, maintenance and agronomy to keep yields climbing.":
        "Hosildorlikni oshirish uchun masofaviy monitoring, texnik xizmat va agronomiya.",
      "Full-service smart farming": "To'liq xizmatli aqlli dehqonchilik",
      "Consulting & Feasibility": "Konsalting va TIA",
      "Business case, crop economics, water assessment and ROI modelling before a single beam is ordered.":
        "Birinchi ustun buyurtma qilinmasidan oldin biznes-model, ekin iqtisodi, suv baholash va ROI hisobi.",
      "Engineering & Design": "Muhandislik va loyihalash",
      "Structural, climate and irrigation design tailored to your site, delivered as clear, buildable plans.":
        "Obyektingizga moslangan konstruktiv, iqlim va sug'orish loyihasi, aniq, amalga oshiriladigan rejalar ko'rinishida.",
      "Installation & Commissioning": "O'rnatish va ishga tushirish",
      "Professional on-site assembly, wiring, calibration and handover of a ready-to-grow facility.":
        "Professional yig'ish, ulash, kalibrlash va o'stirishga tayyor obyektni topshirish.",
      "Grower Training": "Fermerlarni o'qitish",
      "Practical training in climate management, crop care and dashboard use, in Uzbek, Russian and English.":
        "Iqlim boshqaruvi, ekin parvarishi va panel bilan ishlash bo'yicha amaliy o'qitish, o'zbek, rus va ingliz tillarida.",
      "Maintenance & Spare Parts": "Texnik xizmat va ehtiyot qismlar",
      "Scheduled servicing, rapid repairs and a stocked supply of genuine spare parts.":
        "Rejali texnik xizmat, tez ta'mirlash va original ehtiyot qismlar zaxirasi.",
      "Remote Monitoring": "Masofaviy monitoring",
      "Cloud dashboards and alerts let our specialists and yours watch the farm from anywhere.":
        "Bulutli panellar va ogohlantirishlar bizning va sizning mutaxassislaringizga fermani istalgan joydan kuzatish imkonini beradi.",
      "Korean technology, local hands.": "Koreya texnologiyasi, mahalliy qo'llar.",
      "✓ Backed by Firmmit Korea's R&D and equipment supply": "✓ Firmmit Korea R&D va jihoz ta'minoti bilan quvvatlangan",
      "✓ Local engineers and agronomists who know the region": "✓ Mintaqani biladigan mahalliy muhandis va agronomlar",
      "✓ One accountable partner for the whole project": "✓ Butun loyiha uchun bitta mas'ul hamkor",
      "✓ Support in Uzbek, Russian, Korean and English": "✓ O'zbek, rus, koreys va ingliz tillarida qo'llab-quvvatlash",
      "✓ Documented warranties and transparent pricing": "✓ Hujjatlashtirilgan kafolatlar va shaffof narxlar",
      "Book a consultation": "Maslahatga yozilish",
      "Ready to plan your farm?": "Fermangizni rejalashtirishga tayyormisiz?",
      "Book a free consultation and we'll map out the fastest path to a productive greenhouse.":
        "Bepul maslahatga yoziling, samarali issiqxonaga eng tez yo'lni chizib beramiz.",
      "Talk to a specialist": "Mutaxassis bilan gaplashish",
      /* import-export */
      "Connecting Korea and Uzbekistan across the supply chain.": "Ta'minot zanjiri bo'ylab Koreya va O'zbekistonni bog'laymiz.",
      "Beyond national borders, bringing proven Korean agri-technology into Uzbekistan and helping regional produce reach new markets.":
        "Chegaralardan tashqarida, sinovdan o'tgan Koreya agro-texnologiyasini O'zbekistonga olib kelamiz va mintaqa mahsulotining yangi bozorlarga chiqishiga yordam beramiz.",
      "Our head-office link with Firmmit Korea gives us a direct, trusted channel in both directions of the agricultural supply chain.":
        "Firmmit Korea bosh ofisi bilan aloqamiz agro ta'minot zanjirining ikkala yo'nalishida to'g'ridan-to'g'ri, ishonchli kanal beradi.",
      "IMPORT · KOREA → UZBEKISTAN": "IMPORT · KOREYA → O'ZBEKISTON",
      "Smart-farm equipment & inputs": "Aqlli ferma jihozlari va materiallari",
      "Greenhouse structures, climate and irrigation systems, IoT hardware, growing media and quality seedlings, sourced from Korea and vetted partners, delivered with documentation and warranty.":
        "Issiqxona konstruksiyalari, iqlim va sug'orish tizimlari, IoT jihozlari, substratlar va sifatli ko'chatlar, Koreya va tekshirilgan hamkorlardan, hujjat va kafolat bilan yetkaziladi.",
      "✓ Greenhouse & climate systems": "✓ Issiqxona va iqlim tizimlari",
      "✓ Sensors, controllers & automation": "✓ Sensorlar, kontrollerlar va avtomatika",
      "✓ Substrates, nutrients & seedlings": "✓ Substratlar, oziqlar va ko'chatlar",
      "EXPORT · UZBEKISTAN → REGION": "EKSPORT · O'ZBEKISTON → MINTAQA",
      "Fresh & processed produce": "Yangi va qayta ishlangan mahsulot",
      "We help greenhouse growers meet the quality and packaging standards buyers expect, and connect their harvest to regional and international markets.":
        "Issiqxona fermerlariga xaridorlar kutgan sifat va qadoqlash standartlariga erishishga yordam beramiz va hosilni mintaqaviy hamda xalqaro bozorlarga bog'laymiz.",
      "✓ Greenhouse vegetables & fruit": "✓ Issiqxona sabzavot va mevalari",
      "✓ Grading, packing & cold-chain guidance": "✓ Saralash, qadoqlash va sovuq zanjir bo'yicha yo'l-yo'riq",
      "✓ Buyer matching & export documentation": "✓ Xaridor topish va eksport hujjatlari",
      "Simple, documented, dependable": "Oddiy, hujjatlashtirilgan, ishonchli",
      "Sourcing": "Manba topish", "We identify the right equipment or buyer and confirm specifications and price.":
        "Kerakli jihoz yoki xaridorni aniqlaymiz va spetsifikatsiya hamda narxni tasdiqlaymiz.",
      "Logistics": "Logistika", "Freight, insurance and customs handled through established Korea–UZ routes.":
        "Yuk tashish, sug'urta va bojxona ishlab chiqilgan Koreya–O'zbekiston yo'nalishlari orqali.",
      "Compliance": "Muvofiqlik", "Certificates, phytosanitary and import/export paperwork prepared correctly.":
        "Sertifikatlar, fitosanitariya va import/eksport hujjatlari to'g'ri rasmiylashtiriladi.",
      "Delivery": "Yetkazib berish", "Goods delivered, inspected and, where needed, installed and commissioned.":
        "Tovarlar yetkaziladi, tekshiriladi va zarur bo'lsa o'rnatilib, ishga tushiriladi.",
      "Countries linked": "Bog'langan davlatlar", "Trusted suppliers": "Ishonchli ta'minotchilar",
      "Documented shipments": "Hujjatlangan jo'natmalar", "Product categories": "Mahsulot toifalari",
      "Import equipment or export your harvest.": "Jihoz import qiling yoki hosilingizni eksport qiling.",
      "Tell us what you need to move, our trade team will handle sourcing, logistics and compliance.":
        "Nimani ko'chirish kerakligini ayting, savdo jamoamiz manba, logistika va rasmiylashtirishni o'z zimmasiga oladi.",
      "Start a trade inquiry": "Savdo so'rovi yuborish",
      /* partners */
      "Strong farms are built on strong partnerships.": "Kuchli fermalar kuchli hamkorlik ustiga quriladi.",
      "We bring together our Korean head office, technology suppliers, institutions and growers into one dependable network.":
        "Koreya bosh ofisimiz, texnologiya ta'minotchilari, muassasalar va fermerlarni yagona ishonchli tarmoqqa birlashtiramiz.",
      "Every project we deliver draws on the research, engineering and supply strength of Firmmit Korea. This direct relationship is what lets us offer Korean-grade smart-farm technology locally, with full technical backing.":
        "Har bir loyihamiz Firmmit Koreaning tadqiqot, muhandislik va ta'minot quvvatiga tayanadi. Aynan shu to'g'ridan-to'g'ri aloqa bizga Koreya darajasidagi aqlli ferma texnologiyasini mahalliy, to'liq texnik qo'llab-quvvatlash bilan taklif qilish imkonini beradi.",
      "Who we work with": "Kimlar bilan ishlaymiz",
      "Four groups of partners make every Firmmit Uzbekistan project possible.":
        "To'rt guruh hamkor Firmmit Uzbekistanning har bir loyihasini mumkin qiladi.",
      "Firmmit Korea, R&D, engineering and equipment supply.": "Firmmit Korea, R&D, muhandislik va jihoz ta'minoti.",
      "Technology Suppliers": "Texnologiya ta'minotchilari",
      "Greenhouse, climate, irrigation and sensor manufacturers.": "Issiqxona, iqlim, sug'orish va sensor ishlab chiqaruvchilari.",
      "Institutions": "Muassasalar", "Agricultural universities, research centers and associations.":
        "Qishloq xo'jaligi universitetlari, tadqiqot markazlari va uyushmalar.",
      "Growers & Cooperatives": "Fermerlar va kooperativlar",
      "Farms and cooperatives operating our facilities on the ground.": "Obyektlarimizni joyida boshqaradigan fermalar va kooperativlar.",
      "A growing family of partners": "O'sib borayotgan hamkorlar oilasi",
      "Our partner network is expanding. Partner organisations will be listed here as agreements are confirmed.":
        "Hamkorlar tarmog'imiz kengaymoqda. Kelishuvlar tasdiqlangani sari hamkor tashkilotlar shu yerda ko'rsatiladi.",
      "Partner logos will appear here soon.": "Hamkor logotiplari tez orada shu yerda paydo bo'ladi.",
      "Become a Firmmit partner.": "Firmmit hamkoriga aylaning.",
      "Supplier, institution or grower, if you're building the future of regional agriculture, let's talk.":
        "Ta'minotchi, muassasa yoki fermer, mintaqa qishloq xo'jaligi kelajagini qurayotgan bo'lsangiz, gaplashaylik.",
      "Partner with us": "Hamkor bo'lish",
      /* certificates */
      "Quality you can verify, not just trust.": "Ishonish emas, tekshirish mumkin bo'lgan sifat.",
      "Our systems, processes and trade operations are held to recognized standards, because reliable food production demands it.":
        "Tizimlarimiz, jarayonlarimiz va savdo operatsiyalarimiz tan olingan standartlarga javob beradi, chunki ishonchli oziq-ovqat ishlab chiqarish buni talab qiladi.",
      "Certifications behind every project.": "Har bir loyiha ortidagi sertifikatlar.",
      "Certification documents are being compiled and will be published here. Verified certificates are available to clients and partners on request.":
        "Sertifikat hujjatlari tayyorlanmoqda va shu yerda e'lon qilinadi. Tasdiqlangan sertifikatlar mijoz va hamkorlarga so'rov asosida taqdim etiladi.",
      "Certificate": "Sertifikat", "Coming soon": "Tez orada",
      "Standards that protect your harvest.": "Hosilingizni himoya qiladigan standartlar.",
      "Certification isn't paperwork to us, it's how we guarantee that a system installed in Tashkent performs like one engineered in Seoul, and that produce leaving a Firmmit facility is safe and traceable.":
        "Sertifikatlash biz uchun qog'ozbozlik emas, bu Toshkentda o'rnatilgan tizim Seulda loyihalanganidek ishlashi va Firmmit obyektidan chiqqan mahsulot xavfsiz hamda kuzatiladigan bo'lishining kafolatidir.",
      "Request certificate documents": "Sertifikat hujjatlarini so'rash",
      "Need documentation for a tender?": "Tender uchun hujjat kerakmi?",
      "We'll provide the certificates and specifications your procurement process requires.":
        "Xarid jarayoningiz uchun zarur sertifikat va spetsifikatsiyalarni taqdim etamiz.",
      "Contact us": "Bog'lanish", "Contact us →": "Bog'lanish →",
      /* news */
      "What's growing at Firmmit Uzbekistan.": "Firmmit Uzbekistanda nima o'smoqda.",
      "Project milestones, technology insights and stories from the field as we bring smart farming to the region.":
        "Aqlli dehqonchilikni mintaqaga olib kelar ekanmiz, loyiha bosqichlari, texnologik tahlillar va dala hikoyalari.",
      "Featured": "Asosiy",
      "Firmmit Uzbekistan opens as the regional branch of Firmmit Korea": "Firmmit Uzbekistan Firmmit Koreaning mintaqaviy filiali sifatida ochildi",
      "Our new office brings Korean smart-farm technology, engineering and agri-trade directly to growers in Uzbekistan, with local specialists and full head-office support.":
        "Yangi ofisimiz Koreya aqlli ferma texnologiyasi, muhandisligi va agro-savdosini O'zbekiston fermerlariga bevosita olib keladi, mahalliy mutaxassislar va bosh ofisning to'liq qo'llab-quvvatlashi bilan.",
      "From the field": "Daladan", "Projects": "Loyihalar", "Technology": "Texnologiya",
      "Trade": "Savdo", "Training": "O'qitish", "Partnership": "Hamkorlik",
      "First multi-span greenhouse commissioned near Tashkent": "Toshkent yaqinida birinchi ko'p oraliqli issiqxona ishga tushirildi",
      "A pilot facility demonstrates climate-controlled tomato production with significantly reduced water use.":
        "Sinov obyekti iqlim nazoratli pomidor yetishtirishni sezilarli suv tejash bilan namoyish etadi.",
      "How IoT sensors cut water use in arid-climate farming": "IoT sensorlar qurg'oqchil iqlim dehqonchiligida suvni qanday tejaydi",
      "A look at the sensor-and-automation stack that keeps greenhouses efficient through hot, dry summers.":
        "Issiq, quruq yozlarda issiqxonalarni samarali saqlaydigan sensor va avtomatika tizimiga nazar.",
      "New Korea–Uzbekistan supply route for greenhouse equipment": "Issiqxona jihozlari uchun yangi Koreya–O'zbekiston ta'minot yo'nalishi",
      "Streamlined logistics shorten delivery times for climate and irrigation systems imported from Korea.":
        "Optimallashtirilgan logistika Koreyadan keltiriladigan iqlim va sug'orish tizimlari yetkazish muddatini qisqartiradi.",
      "Grower training program launches in three regions": "Fermerlarni o'qitish dasturi uch hududda boshlandi",
      "Hands-on workshops help local teams master climate management and dashboard-driven crop care.":
        "Amaliy seminarlar mahalliy jamoalarga iqlim boshqaruvi va ma'lumotga asoslangan ekin parvarishini o'rganishga yordam beradi.",
      "Collaboration with agricultural institutions on regional trials": "Mintaqaviy sinovlar bo'yicha qishloq xo'jaligi muassasalari bilan hamkorlik",
      "Joint research explores the best greenhouse crops and setups for Central Asian conditions.":
        "Qo'shma tadqiqot Markaziy Osiyo sharoiti uchun eng yaxshi issiqxona ekinlari va yechimlarini o'rganadi.",
      "Firmmit brings its smart-farm vision to Central Asia": "Firmmit o'zining aqlli ferma qarashlarini Markaziy Osiyoga olib keladi",
      "An introduction to our mission: preparing tomorrow's food with reliable, sustainable technology.":
        "Vazifamiz bilan tanishuv: ishonchli, barqaror texnologiya bilan ertangi oziq-ovqatni tayyorlash.",
      "Subscribe for updates": "Yangiliklarga obuna",
      "Want to feature your project?": "Loyihangizni yoritmoqchimisiz?",
      "If you're growing with Firmmit, we'd love to share your story.": "Firmmit bilan o'sayotgan bo'lsangiz, hikoyangizni yoritishdan mamnun bo'lamiz.",
      /* contact */
      "Let's build your smart farm together.": "Aqlli fermangizni birga quraylik.",
      "Tell us about your land, crop and goals. Our team will get back to you with clear next steps, no obligation.":
        "Yeringiz, ekiningiz va maqsadlaringiz haqida ayting. Jamoamiz aniq keyingi qadamlar bilan javob beradi, hech qanday majburiyatsiz.",
      "Office": "Ofis", "Email": "Elektron pochta", "Phone": "Telefon", "Business hours": "Ish vaqti",
      "Mon–Fri, 09:00 – 18:00": "Dush–Jum, 09:00 – 18:00", "Closed on public holidays": "Bayram kunlari dam olish",
      "Full name": "To'liq ism", "Company / Farm": "Kompaniya / ferma",
      "I'm interested in": "Meni qiziqtiradi", "Select a topic": "Mavzuni tanlang",
      "Can I help you with anything?": "Sizga qanday yordam bera olamiz?",
      "Outdoor Smart Farm": "Ochiq maydon aqlli fermasi", "Indoor Smart Farm": "Yopiq aqlli ferma",
      "Plant Factory": "O'simlik fabrikasi", "Collaboration proposal": "Hamkorlik taklifi",
      "Casual Meeting": "Norasmiy uchrashuv", "ETC": "Boshqa",
      "Catalog": "Katalog", "Catalog (PDF)": "Katalog (PDF)",
      "DWC": "DWC", "Substrate": "Substrat", "EC / pH": "EC / pH", "Soil moisture": "Tuproq namligi", "Dashboard": "Boshqaruv paneli",
      "Explore products": "Mahsulotlarni ko'rish",
      "Full name *": "To'liq ism *", "Email *": "Elektron pochta *", "Message *": "Xabar *", "Can I help you with anything? *": "Sizga qanday yordam bera olamiz? *",
      "July 2026 · Company": "2026 iyul · Kompaniya", "July 2026": "2026 iyul", "June 2026": "2026 iyun", "May 2026": "2026 may", "April 2026": "2026 aprel",
      "Article previews shown are illustrative of the topics we cover.": "Ko'rsatilgan maqola namunalari biz yoritadigan mavzularni aks ettiradi.",
      "Error 404": "Xatolik 404", "Page not found": "Sahifa topilmadi",
      "The page you're looking for doesn't exist or may have moved.": "Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.",
      "Back to home": "Bosh sahifaga",
      "The map shows our exact office location, Mahtumquli 130, Yashnobod district, Tashkent.": "Xaritada ofisimizning aniq joylashuvi ko'rsatilgan, Mahtumquli 130, Yashnobod tumani, Toshkent.",
      "Smart greenhouse project": "Aqlli issiqxona loyihasi", "Products & equipment": "Mahsulot va jihozlar",
      "Services (design, install, training)": "Xizmatlar (loyiha, o'rnatish, o'qitish)",
      "Import & export / trade": "Import va eksport / savdo", "Partnership": "Hamkorlik", "Other": "Boshqa",
      "Message": "Xabar", "Send inquiry": "So'rov yuborish",
      "Your name": "Ismingiz", "Organization": "Tashkilot",
      "Tell us about your land, crop, plot size and goals...": "Yeringiz, ekiningiz, maydon va maqsadlaringiz haqida ayting...",
      "By sending, you agree to be contacted about your inquiry. This demo form does not transmit or store data.":
        "Yuborish orqali so'rovingiz bo'yicha bog'lanishga rozilik bildirasiz. Bu demo shakl ma'lumotni uzatmaydi va saqlamaydi.",
      "Director": "Direktor",
      "Company name": "Kompaniya nomi", "Address": "Manzil", "Tax ID (INN)": "INN (STIR)",
      "Bank": "Bank", "Bank code (MFO)": "MFO", "Account": "Hisob raqami",
      "Map shows the Tashkent area for reference. Exact office location shared upon inquiry.":
        "Xarita mo'ljal uchun Toshkent hududini ko'rsatadi. Ofisning aniq manzili so'rov asosida beriladi."
    },

    ko: {
      /* nav */
      "Home": "홈", "About Us": "회사소개", "Products": "제품", "Services": "서비스",
      "Import & Export": "수출입", "Our Partners": "파트너", "Certificates": "인증",
      "News": "뉴스", "Contact": "문의",
      "Head Office ↗": "본사 ↗", "Head Office, Firmmit Korea ↗": "본사: Firmmit Korea ↗",
      /* footer */
      "Bringing Korean smart-farm technology to Uzbekistan, greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.":
        "한국의 스마트팜 기술을 우즈베키스탄으로 전하는 온실 및 시설 농업, 그리고 안정적인 지역 식량 공급을 위한 농산물 교역",
      "Company": "회사", "What we do": "사업 분야", "Head Office": "본사",
      "Smart-farm headquarters · Seoul, Republic of Korea": "스마트팜 본사 · 대한민국 서울",
      "© 2026 Firmmit Uzbekistan. A branch of Firmmit Korea. All rights reserved.":
        "© 2026 Firmmit Uzbekistan. Firmmit Korea 지사. All rights reserved.",
      /* eyebrows */
      "Firmmit Uzbekistan · Smart Agriculture": "Firmmit Uzbekistan · 스마트 농업",
      "Introduction": "소개", "Business": "사업", "Global Network": "글로벌 네트워크",
      "Who we are": "회사 소개", "Our Philosophy": "우리의 철학", "How we work": "업무 방식",
      "At a glance": "한눈에 보기", "Product range": "제품 라인업", "Best-suited crops": "적합한 작물",
      "How a project runs": "프로젝트 진행", "What we offer": "제공 서비스",
      "Our work": "프로젝트", "Featured projects": "주요 프로젝트", "Mongol-type 2-span greenhouse": "몽골형 2연동 온실", "Glass greenhouse 2.18 ha": "유리 온실 2.18ha", "Interactive 3D model, rotate and explore every part": "인터랙티브 3D 모델, 회전하며 부품을 살펴보세요", "Explore in 3D": "3D로 보기",
      "Why growers choose us": "선택받는 이유", "Two-way trade": "양방향 교역",
      "How trade works with us": "교역 방식", "Our anchor partner": "핵심 파트너",
      "Ecosystem": "생태계", "Our network": "네트워크",
      "Standards & accreditation": "표준 및 인증", "Our commitment": "우리의 약속",
      "Latest updates": "최신 소식", "Get in touch": "문의하기", "Company details": "회사 정보",
      "For sale": "판매 중", "Catalog": "카탈로그", "Online Store": "온라인 스토어",
      /* home hero */
      "Firmmit Uzbekistan delivers Korean controlled-environment agriculture, modern greenhouses, precision climate systems and reliable agri-systems, to farms across Uzbekistan and Central Asia.":
        "Firmmit 우즈베키스탄은 우즈베키스탄 및 중앙아시아 전역의 농가에 현대식 온실, 정밀 기후 제어 시스템, 그리고 신뢰할 수 있는 농업 인프라를 아우르는 한국의 첨단 '환경 제어 농업 솔루션'을 제공합니다.",
      "Explore our solutions": "솔루션 보기", "Talk to our team": "팀에 문의",
      "Regions served": "서비스 지역", "Projects delivered": "완료 프로젝트",
      "Client retention": "고객 유지율", "Greenhouse projects": "온실 프로젝트",
      "Regions covered": "서비스 지역", "Avg. water saved": "평균 물 절감", "Technical support": "기술 지원",
      "Four connected capabilities that take a project from first design to a thriving, data-driven farm.": "첫 설계부터 데이터 기반의 생산적인 농장까지, 프로젝트 전 과정을 이끄는 네 가지 핵심 역량",
      /* home intro */
      "As the Uzbekistan branch of Firmmit Korea, we localize proven smart-farm technology for the region's climate, crops and growers, combining Korean engineering with on-the-ground agronomy.":
        "Firmmit Korea의 우즈베키스탄 지사로서 한국의 우수한 엔지니어링과 현장 농업 노하우를 결합하여, 검증된 스마트팜 기술을 지역 기후와 작물, 농가 환경에 맞게 최적화합니다.",
      "✓ Turnkey smart greenhouses engineered for arid climates": "✓ 건조 기후에 맞춘 턴키 스마트 온실",
      "✓ Precision irrigation, sensors and climate automation": "✓ 정밀 관수, 센서 및 기후 자동화",
      "✓ Direct Korea–Uzbekistan supply and technical support": "✓ 한국–우즈베키스탄 직접 공급 및 기술 지원",
      "About Firmmit Uzbekistan": "Firmmit Uzbekistan 소개",
      /* business cards */
      "Smart Greenhouses": "스마트 온실",
      "Structures and glazing engineered for high yield and low water use in Central Asian conditions.":
        "중앙아시아 환경에서 높은 수확량과 적은 물 사용을 실현하는 구조물과 유리",
      "Climate & IoT": "기후 및 IoT",
      "Sensors, controllers and dashboards that automate temperature, humidity and nutrient delivery.":
        "온도·습도·양분 공급을 자동화하는 센서와 컨트롤러, 대시보드",
      "Agronomy Services": "농학 서비스",
      "Installation, grower training and season-long support from Korean and local specialists.":
        "한국과 현지 전문가가 함께하는 설치, 농가 교육, 시즌 전반의 지원",
      "Import & Export ": "수출입 ",
      "Sourcing equipment from Korea and connecting Uzbek produce to regional markets.":
        "한국에서 장비를 조달하고 우즈베키스탄 농산물을 지역 시장으로 연결",
      "Learn more →": "자세히 →", "Read more →": "더 읽기 →",
      /* home global */
      "Korean R&D": "한국 R&D", "Local agronomy": "현지 농학",
      "Shared supply chain": "공유 공급망", "Joint training": "공동 교육",
      "Visit Head Office, Firmmit Korea": "본사 방문, Firmmit Korea",
      "Visit Firmmit Korea": "Firmmit Korea 방문",
      /* CTA */
      "Bring smart farming to your land.": "당신의 땅에 스마트팜을 도입하세요",
      "Whether you're planning a single greenhouse or a regional facility, our team will design a solution around your crop, climate and budget.":
        "온실 한 동이든 지역 규모 시설이든, 우리 팀이 작물·기후·예산에 맞는 솔루션을 설계합니다.",
      "Start your project": "프로젝트 시작", "Get in touch →": "문의하기 →",
      /* about */
      "Korean smart-farm expertise, rooted in Uzbek soil.": "우즈베키스탄 현지에 깊이 뿌리내린 한국의 스마트팜 전문성",
      "We are the Uzbekistan branch of Firmmit Korea, a smart-farm company preparing the food of tomorrow. Our mission is to make advanced, sustainable agriculture accessible to growers across the region.":
        "FIRMMIT Korea의 우즈베키스탄 지사로서 미래의 식량을 준비하는 스마트팜 기업입니다. 지역 전역의 농가에 선진화된 지속 가능한 농업 환경을 제공하는 데 앞장서고 있습니다.",
      "Firmmit Uzbekistan was established to adapt Firmmit Korea's proven controlled-environment agriculture for Central Asia. We combine Korean engineering, R&D and equipment with local agronomy, language and service, so growers get world-class technology with a partner next door.":
        "FIRMMIT 우즈베키스탄은 FIRMMIT Korea의 검증된 환경 제어 농업 기술을 중앙아시아에 맞게 도입하기 위해 설립되었습니다. 한국의 엔지니어링, R&D 및 최신 설비를 현지 재배 노하우, 언어, 맞춤형 서비스와 결합하여, 농가들이 가까운 파트너를 통해 세계 최고 수준의 기술을 누릴 수 있도록 합니다.",
      "From feasibility study to harvest, we stay involved: designing the facility, sourcing the right systems, installing them, training the team and supporting every season that follows.":
        "사업 타당성 검토부터 수확에 이르기까지 전 과정에 함께합니다. 시설 설계, 알맞은 시스템 조달 및 설치, 팀 교육, 그리고 매 시즌 이어지는 사후 관리까지 모든 단계를 철저하게 지원합니다.",
      "Because your life is behind our work.": "우리의 일 뒤에는 당신의 삶이 있습니다",
      "Food security is not merely a matter of agriculture, it is directly tied to the sustainable future of every family, every farm and the entire region. That is why every technological solution we build rests on the principles of dependable harvests, rational use of resources and long-term sustainability. We adapt Korea's advanced smart-farm technologies to Central Asia's climate, water, crops and local growing conditions, delivering practical, measurable results for farmers.":
        "식량 안보는 단순한 농업의 문제가 아닙니다. 그것은 모든 가정과 농장, 그리고 지역 전체의 지속 가능한 미래와 직접 연결되어 있습니다.\n\n그래서 우리가 만드는 모든 기술 솔루션은 신뢰할 수 있는 수확, 합리적인 자원 사용, 장기적인 지속 가능성의 원칙에 기반합니다.\n\n우리는 한국의 첨단 스마트팜 기술을 중앙아시아의 기후, 물, 작물, 현지 재배 환경에 맞게 적용하여 농가에 실질적이고 측정 가능한 결과를 제공합니다.",
      "MISSION": "미션", "VISION": "비전", "VALUES": "가치",
      "Sustainably feed the future": "지속 가능한 방식으로 미래의 식량을 공급합니다",
      "To build high-yield, efficient and sustainable agricultural production in any climate by deploying smart, precise and resource-efficient agri-technologies. Our aim is not simply to introduce modern technology, but to turn it into real economic results for the farmer.":
        "스마트하고 정밀하며 자원 효율적인 농업 기술을 도입하여, 어떤 기후에서든 고수확, 고효율의 지속 가능한 농업 생산을 구축합니다.\n우리의 목표는 단순히 현대 기술을 도입하는 것에 그치지 않고, 이를 농가를 위한 실질적인 경제적 성과로 전환하는 것입니다.",
      "Setting a new standard for smart agriculture in Central Asia": "중앙아시아 스마트 농업의 새로운 기준을 세웁니다",
      "To become Central Asia's most trusted smart-farm technology partner by optimising water and energy use, raising yield and quality, and automating production processes. We combine Korean engineering and innovation with local agronomic experience to develop suitable, measurable and scalable agri-technology solutions for Uzbekistan and the wider region.":
        "물과 에너지 사용을 최적화하고, 수확량과 품질을 높이며, 생산 공정을 자동화하여 중앙아시아에서 가장 신뢰받는 스마트팜 기술 파트너로 도약합니다. \n한국의 엔지니어링 및 혁신 기술을 현지 재배 노하우와 결합하여, 우즈베키스탄과 더 넓은 인근 지역에 적합하고 측정 가능하며 확장 가능한 농업 기술 솔루션을 개발합니다.",
      "Trust. Precision. Results.": "신뢰 · 정밀 · 결과",
      "Our work rests on three core principles: Trust: we build open, responsible and long-term partnerships with farmers, partners and investors. Precision: we base decisions on data, sensors, agronomic analysis and real indicators, not guesswork. Results: we turn every technological solution into real, measurable economic value for the farmer.":
        "우리의 활동은 세 가지 핵심 원칙에 기반합니다:\n\n신뢰: 농가, 파트너, 투자자와 열린 자세로 책임감 있고 장기적인 협력을 구축합니다.\n\n정밀: 추측이 아니라 데이터, 센서, 농학적 분석, 실제 지표에 근거하여 결정합니다.\n\n결과: 모든 기술 솔루션을 농가를 위한 실질적이고 측정 가능한 경제적 가치로 전환합니다.",
      "Four commitments to every grower.": "모든 농가를 위한 네 가지 약속",
      "Localized engineering": "현지화 엔지니어링",
      "Every system is specified for the site's climate, water and target crop, not copy-pasted from another market.":
        "모든 시스템은 다른 시장에서 복사한 것이 아니라 현장의 기후·물·대상 작물에 맞게 설계됩니다.",
      "Transparent sourcing": "투명한 조달",
      "Equipment is imported directly from Korea and vetted suppliers, with clear specifications and warranties.":
        "장비는 한국과 검증된 공급업체에서 명확한 사양과 보증과 함께 직접 수입됩니다.",
      "Hands-on training": "실무 교육",
      "We don't just install, we teach teams to operate and optimize their farm independently.":
        "설치에서 그치지 않고, 팀이 농장을 독립적으로 운영·최적화하도록 가르칩니다.",
      "Long-term support": "장기 지원",
      "Remote monitoring and local service keep facilities productive season after season.":
        "원격 모니터링과 현지 서비스로 시설을 시즌마다 생산적으로 유지합니다.",
      "Firmmit Uzbekistan in numbers": "숫자로 보는 Firmmit Uzbekistan",
      "Partner suppliers": "협력 공급업체", "Global head office": "글로벌 본사",
      "Let's grow something lasting.": "오래도록 이어질 가치를 함께 키웁니다",
      "Partner with a team that treats your harvest as its own.": "농가의 수확을 내 일처럼 책임지는 든든한 파트너와 함께하세요.",
      /* products */
      "Everything a modern farm needs, in one place.": "현대 농장에 필요한 모든 것을 한곳에서",
      "From the greenhouse shell to the sensor on the vine, we supply integrated smart-farm systems engineered for Uzbekistan's climate and crops.":
        "온실 골조부터 작물의 센서까지, 우즈베키스탄의 기후와 작물에 맞춘 통합 스마트팜 시스템을 공급합니다.",
      "Buy a complete facility or a single subsystem, every product is designed to integrate cleanly with the rest.":
        "전체 시설이든 단일 하위 시스템이든, 모든 제품은 나머지 시스템과 깔끔하게 통합되도록 설계되었습니다.",
      "Galvanized-frame venlo and multi-span structures with diffused glazing, thermal screens and natural ventilation, sized to your plot.":
        "확산 유리, 보온 스크린, 자연 환기를 갖춘 아연도금 벤로·멀티스팬 구조, 부지에 맞게 설계",
      "Venlo": "벤로", "Multi-span": "멀티스팬", "Thermal screen": "보온 스크린",
      "Hydroponic & NFT Systems": "수경재배 및 NFT 시스템",
      "Soil-free growing lines, NFT channels, deep-water culture and substrate systems, that cut water use and boost yield per m².":
        "무토양 재배 라인, NFT 채널, 담액식, 배지 시스템, 으로 물 사용을 줄이고 ㎡당 수확량을 높입니다.",
      "Climate Control": "기후 제어",
      "Heating, cooling, CO₂ enrichment and fogging managed by a central controller to hold the perfect growing environment.":
        "중앙 컨트롤러로 난방·냉방·CO₂ 공급·안개 분무를 관리해 최적의 재배 환경을 유지합니다.",
      "Heating": "난방", "Pad & fan": "패드 앤 팬", "CO₂": "CO₂",
      "IoT Sensors & Automation": "IoT 센서 및 자동화",
      "Wireless sensors for temperature, humidity, EC/pH, soil moisture and light, feeding a live dashboard and automated actions.":
        "온도·습도·EC/pH·토양 수분·광량용 무선 센서가 실시간 대시보드와 자동 제어에 데이터를 공급합니다.",
      "Irrigation & Fertigation": "관수 및 양액",
      "Drip lines, dosing units and filtration that deliver water and nutrients precisely, saving up to 30% versus open-field methods.":
        "점적 라인, 정량 공급기, 여과 장치로 물과 양분을 정밀하게 공급, 노지 방식 대비 최대 30% 절감",
      "Drip": "점적", "Dosing": "정량 공급", "Filtration": "여과",
      "Seedlings & Growing Media": "묘목 및 배지",
      "Quality seedlings, coco-coir and rockwool substrates, and nutrient packs selected for high-value greenhouse crops.":
        "고부가가치 온실 작물을 위한 우수한 묘목과 코코코이어·암면 배지, 양분 패키지",
      "Seedlings": "묘목", "Coco-coir": "코코코이어", "Nutrients": "양분",
      "See our services": "서비스 보기",
      "Our systems are tuned for the crops that perform best under controlled environments in Uzbekistan, protecting them from heat, dust and water stress.":
        "우리 시스템은 우즈베키스탄의 시설 환경에서 가장 잘 자라는 작물에 맞춰져 있으며, 더위·먼지·물 스트레스로부터 보호합니다.",
      "Tomatoes": "토마토", "Cucumbers": "오이", "Peppers": "고추/파프리카", "Leafy greens": "엽채류",
      "Strawberries": "딸기", "Herbs": "허브", "Melons": "멜론", "Flowers": "화훼",
      "Need a tailored product package?": "맞춤 제품 패키지가 필요하세요?",
      "Tell us your crop, plot size and goals, we'll assemble the right system and quote it.":
        "작물·부지 규모·목표를 알려주시면, 적합한 시스템을 구성하고 견적을 드립니다.",
      "Request a quote": "견적 요청",
      /* new products */
      "Beyond greenhouses and equipment, Firmmit Uzbekistan sells finished products: premium strawberry varieties, seedlings, fresh greenhouse produce and genuine spare parts, ready for market.":
        "온실과 장비를 넘어, Firmmit Uzbekistan은 완제품도 공급합니다: 프리미엄 딸기 품종, 묘목, 신선한 온실 농산물, 정품 부품까지, 시장에 바로 공급합니다.",
      "Seolhyang (설향) Strawberry": "설향 딸기",
      "Korea's most popular strawberry cultivar, large, glossy, high-sugar berries with excellent flavour and shelf life. Available as seedlings and fresh fruit.":
        "한국에서 가장 인기 있는 딸기 품종, 크고 윤기 있으며 당도가 높고 풍미와 저장성이 뛰어납니다. 묘목과 생과로 공급합니다.",
      "1943 Strawberry": "1943 딸기",
      "A firm, aromatic strawberry variety selected for high yield and transport durability, well suited to controlled-environment growing in the region.":
        "높은 수확량과 수송 내구성을 위해 선발된 단단하고 향이 좋은 딸기 품종, 지역의 시설 재배에 적합합니다.",
      "Fresh Greenhouse Produce": "신선 온실 농산물",
      "Tomatoes, cucumbers, peppers and leafy greens grown in Firmmit facilities, clean, consistent and available year-round.":
        "Firmmit 시설에서 재배한 토마토·오이·고추·엽채류, 깨끗하고 균일하며 연중 공급합니다.",
      "Seedlings & Starter Plants": "묘목 및 모종",
      "Healthy, disease-screened seedlings and starter plants so growers begin every season from a strong, reliable base.":
        "병해 검사를 마친 건강한 묘목과 모종으로 농가가 매 시즌을 튼튼하고 신뢰할 수 있는 기반에서 시작하도록 합니다.",
      "Genuine Spare Parts": "정품 부품",
      "The same spare parts behind our maintenance service, available for direct purchase, sensors, controllers, fittings, pumps and consumables.":
        "유지보수 서비스에 사용하는 것과 동일한 부품을 직접 구매, 센서, 컨트롤러, 피팅, 펌프, 소모품",
      "Ready-Stock Equipment": "재고 보유 장비",
      "Frequently ordered climate, irrigation and IoT items kept in stock for fast delivery without a full project lead time.":
        "자주 찾는 기후·관수·IoT 품목을 재고로 보유해 전체 프로젝트 기간을 기다릴 필요 없이 신속하게 배송",
      "Strawberry": "딸기", "Fresh produce": "신선 농산물", "Parts": "부품", "Equipment": "장비",
      "Premium variety": "프리미엄 품종", "Greenhouse-grown": "온실 재배", "Starter plants": "모종",
      "In stock": "재고 있음", "Ready to ship": "출하 준비 완료",
      "Browse our full range with specifications, varieties and options in the Firmmit Uzbekistan product catalog. Download the PDF or request a printed copy.":
        "Firmmit Uzbekistan 제품 카탈로그에서 전체 제품군, 사양, 품종, 옵션을 확인하세요. PDF를 다운로드하거나 인쇄본을 요청하세요.",
      "Download catalog (PDF)": "카탈로그 다운로드 (PDF)", "Request printed catalog": "인쇄 카탈로그 요청",
      "Browse the catalog": "카탈로그 보기",
      "Our full product catalog is available online, searchable and shown in your language.": "전체 제품 카탈로그를 온라인에서, 검색 가능하며 선택한 언어로 제공됩니다.",
      "The catalog is being finalized, request a copy and we'll send it to you directly.":
        "카탈로그를 마무리 중입니다, 요청하시면 직접 보내드립니다.",
      /* services */
      "We stay with you from blueprint to harvest.": "설계도부터 수확까지 함께합니다",
      "A greenhouse is only as good as the team behind it. Our end-to-end services make sure your investment produces, season after season.":
        "온실은 그 뒤의 팀만큼만 훌륭합니다. 우리의 엔드투엔드 서비스는 투자가 시즌마다 결실을 맺도록 보장합니다.",
      "Every engagement follows the same disciplined process, so you always know what happens next.":
        "모든 프로젝트는 동일한 체계적 절차를 따르므로 다음 단계를 항상 알 수 있습니다.",
      "Consult & Design": "상담 및 설계",
      "Site survey, crop selection and a facility design matched to your climate and budget.":
        "부지 조사, 작물 선정, 기후와 예산에 맞춘 시설 설계",
      "Supply & Build": "공급 및 시공",
      "Import, deliver and install the greenhouse, climate and irrigation systems.":
        "온실·기후·관수 시스템의 수입, 배송, 설치",
      "Train & Launch": "교육 및 가동",
      "Hands-on operator training and a supported first growing cycle.":
        "실무 운영자 교육과 첫 재배 주기 지원",
      "Support & Optimize": "지원 및 최적화",
      "Remote monitoring, maintenance and agronomy to keep yields climbing.":
        "수확량을 꾸준히 높이기 위한 원격 모니터링, 유지보수, 농학 지원",
      "Full-service smart farming": "풀서비스 스마트팜",
      "Consulting & Feasibility": "컨설팅 및 타당성",
      "Business case, crop economics, water assessment and ROI modelling before a single beam is ordered.":
        "기둥 하나 주문하기 전에 진행하는 사업성, 작물 경제성, 물 평가, ROI 모델링",
      "Engineering & Design": "엔지니어링 및 설계",
      "Structural, climate and irrigation design tailored to your site, delivered as clear, buildable plans.":
        "부지에 맞춘 구조·기후·관수 설계, 명확하고 시공 가능한 도면으로 제공",
      "Installation & Commissioning": "설치 및 시운전",
      "Professional on-site assembly, wiring, calibration and handover of a ready-to-grow facility.":
        "전문 현장 조립, 배선, 보정, 그리고 재배 준비를 마친 시설 인계",
      "Grower Training": "농가 교육",
      "Practical training in climate management, crop care and dashboard use, in Uzbek, Russian and English.":
        "기후 관리, 작물 관리, 대시보드 사용에 대한 실무 교육, 우즈베크어·러시아어·영어로 진행",
      "Maintenance & Spare Parts": "유지보수 및 부품",
      "Scheduled servicing, rapid repairs and a stocked supply of genuine spare parts.":
        "정기 점검, 신속한 수리, 정품 부품 재고 공급",
      "Remote Monitoring": "원격 모니터링",
      "Cloud dashboards and alerts let our specialists and yours watch the farm from anywhere.":
        "클라우드 대시보드와 알림으로 우리와 귀사의 전문가가 어디서든 농장을 확인합니다.",
      "Korean technology, local hands.": "한국의 기술, 현지의 손길",
      "✓ Backed by Firmmit Korea's R&D and equipment supply": "✓ Firmmit Korea의 R&D 및 장비 공급 지원",
      "✓ Local engineers and agronomists who know the region": "✓ 지역을 아는 현지 엔지니어와 농학자",
      "✓ One accountable partner for the whole project": "✓ 전체 프로젝트를 책임지는 단일 파트너",
      "✓ Support in Uzbek, Russian, Korean and English": "✓ 우즈베크어·러시아어·한국어·영어 지원",
      "✓ Documented warranties and transparent pricing": "✓ 문서화된 보증과 투명한 가격",
      "Book a consultation": "상담 예약",
      "Ready to plan your farm?": "농장을 계획할 준비가 되셨나요?",
      "Book a free consultation and we'll map out the fastest path to a productive greenhouse.":
        "무료 상담을 예약하시면 생산적인 온실로 가는 가장 빠른 길을 안내합니다.",
      "Talk to a specialist": "전문가와 상담",
      /* import-export */
      "Connecting Korea and Uzbekistan across the supply chain.": "공급망 전반에서 한국과 우즈베키스탄을 잇습니다",
      "Beyond national borders, bringing proven Korean agri-technology into Uzbekistan and helping regional produce reach new markets.":
        "국경을 넘어, 검증된 한국 농업 기술을 우즈베키스탄에 도입하고 지역 농산물이 새로운 시장에 도달하도록 돕습니다.",
      "Our head-office link with Firmmit Korea gives us a direct, trusted channel in both directions of the agricultural supply chain.":
        "Firmmit Korea 본사와의 연결은 농업 공급망 양방향에서 직접적이고 신뢰할 수 있는 채널을 제공합니다.",
      "IMPORT · KOREA → UZBEKISTAN": "수입 · 한국 → 우즈베키스탄",
      "Smart-farm equipment & inputs": "스마트팜 장비 및 자재",
      "Greenhouse structures, climate and irrigation systems, IoT hardware, growing media and quality seedlings, sourced from Korea and vetted partners, delivered with documentation and warranty.":
        "온실 구조물, 기후·관수 시스템, IoT 하드웨어, 배지, 우수한 묘목, 한국과 검증된 파트너에서 조달하고 서류와 보증과 함께 배송",
      "✓ Greenhouse & climate systems": "✓ 온실 및 기후 시스템",
      "✓ Sensors, controllers & automation": "✓ 센서, 컨트롤러 및 자동화",
      "✓ Substrates, nutrients & seedlings": "✓ 배지, 양분 및 묘목",
      "EXPORT · UZBEKISTAN → REGION": "수출 · 우즈베키스탄 → 지역",
      "Fresh & processed produce": "신선 및 가공 농산물",
      "We help greenhouse growers meet the quality and packaging standards buyers expect, and connect their harvest to regional and international markets.":
        "온실 농가가 구매자가 기대하는 품질·포장 기준을 충족하도록 돕고, 수확물을 지역 및 국제 시장에 연결합니다.",
      "✓ Greenhouse vegetables & fruit": "✓ 온실 채소 및 과일",
      "✓ Grading, packing & cold-chain guidance": "✓ 선별·포장 및 콜드체인 안내",
      "✓ Buyer matching & export documentation": "✓ 구매자 매칭 및 수출 서류",
      "Simple, documented, dependable": "간단하고, 문서화되며, 신뢰할 수 있게",
      "Sourcing": "소싱", "We identify the right equipment or buyer and confirm specifications and price.":
        "적합한 장비나 구매자를 찾고 사양과 가격을 확정합니다.",
      "Logistics": "물류", "Freight, insurance and customs handled through established Korea–UZ routes.":
        "구축된 한국–우즈베키스탄 경로를 통한 운송·보험·통관 처리",
      "Compliance": "규정 준수", "Certificates, phytosanitary and import/export paperwork prepared correctly.":
        "인증서, 식물 검역, 수출입 서류를 정확하게 준비",
      "Delivery": "배송", "Goods delivered, inspected and, where needed, installed and commissioned.":
        "제품 배송과 검수, 필요 시 설치 및 시운전까지",
      "Countries linked": "연결 국가", "Trusted suppliers": "신뢰 공급업체",
      "Documented shipments": "문서화된 선적", "Product categories": "제품 카테고리",
      "Import equipment or export your harvest.": "장비를 수입하거나 수확물을 수출하세요",
      "Tell us what you need to move, our trade team will handle sourcing, logistics and compliance.":
        "무엇을 옮겨야 하는지 알려주시면, 무역팀이 소싱·물류·규정 준수를 처리합니다.",
      "Start a trade inquiry": "교역 문의 시작",
      /* partners */
      "Strong farms are built on strong partnerships.": "강한 농장은 강한 파트너십에서 시작됩니다",
      "We bring together our Korean head office, technology suppliers, institutions and growers into one dependable network.":
        "한국 본사, 기술 공급업체, 기관, 농가를 하나의 신뢰할 수 있는 네트워크로 모읍니다.",
      "Every project we deliver draws on the research, engineering and supply strength of Firmmit Korea. This direct relationship is what lets us offer Korean-grade smart-farm technology locally, with full technical backing.":
        "우리가 수행하는 모든 프로젝트는 Firmmit Korea의 연구·엔지니어링·공급 역량에 기반합니다. 이 직접적인 관계 덕분에 한국 수준의 스마트팜 기술을 완전한 기술 지원과 함께 현지에서 제공할 수 있습니다.",
      "Who we work with": "협력 대상",
      "Four groups of partners make every Firmmit Uzbekistan project possible.":
        "네 그룹의 파트너가 모든 Firmmit Uzbekistan 프로젝트를 가능하게 합니다.",
      "Firmmit Korea, R&D, engineering and equipment supply.": "Firmmit Korea, R&D, 엔지니어링, 장비 공급",
      "Technology Suppliers": "기술 공급업체",
      "Greenhouse, climate, irrigation and sensor manufacturers.": "온실·기후·관수·센서 제조업체",
      "Institutions": "기관", "Agricultural universities, research centers and associations.": "농업 대학, 연구소, 협회",
      "Growers & Cooperatives": "농가 및 협동조합",
      "Farms and cooperatives operating our facilities on the ground.": "현장에서 우리 시설을 운영하는 농장과 협동조합",
      "A growing family of partners": "성장하는 파트너 가족",
      "Our partner network is expanding. Partner organisations will be listed here as agreements are confirmed.":
        "파트너 네트워크가 확장되고 있습니다. 협약이 확정되는 대로 파트너 조직이 여기에 표시됩니다.",
      "Partner logos will appear here soon.": "파트너 로고가 곧 여기에 표시됩니다.",
      "Become a Firmmit partner.": "Firmmit 파트너가 되세요",
      "Supplier, institution or grower, if you're building the future of regional agriculture, let's talk.":
        "공급업체·기관·농가: 지역 농업의 미래를 만들고 계신다면, 이야기합시다.",
      "Partner with us": "파트너 되기",
      /* certificates */
      "Quality you can verify, not just trust.": "믿음을 넘어 검증할 수 있는 품질",
      "Our systems, processes and trade operations are held to recognized standards, because reliable food production demands it.":
        "우리의 시스템·프로세스·교역 운영은 공인 표준을 준수합니다, 신뢰할 수 있는 식량 생산이 이를 요구하기 때문입니다.",
      "Certifications behind every project.": "모든 프로젝트를 뒷받침하는 인증",
      "Certification documents are being compiled and will be published here. Verified certificates are available to clients and partners on request.":
        "인증 서류를 취합 중이며 여기에 게시될 예정입니다. 검증된 인증서는 고객과 파트너에게 요청 시 제공됩니다.",
      "Certificate": "인증서", "Coming soon": "준비 중",
      "Standards that protect your harvest.": "당신의 수확을 지키는 표준",
      "Certification isn't paperwork to us, it's how we guarantee that a system installed in Tashkent performs like one engineered in Seoul, and that produce leaving a Firmmit facility is safe and traceable.":
        "인증은 우리에게 서류 작업이 아니라, 타슈켄트에 설치된 시스템이 서울에서 설계된 것처럼 작동하고, Firmmit 시설에서 나가는 농산물이 안전하고 추적 가능함을 보장하는 방법입니다.",
      "Request certificate documents": "인증 서류 요청",
      "Need documentation for a tender?": "입찰용 서류가 필요하세요?",
      "We'll provide the certificates and specifications your procurement process requires.":
        "조달 절차에 필요한 인증서와 사양을 제공합니다.",
      "Contact us": "문의하기", "Contact us →": "문의하기 →",
      /* news */
      "What's growing at Firmmit Uzbekistan.": "Firmmit Uzbekistan의 새로운 소식",
      "Project milestones, technology insights and stories from the field as we bring smart farming to the region.":
        "지역에 스마트팜을 도입하며 전하는 프로젝트 이정표, 기술 인사이트, 현장 이야기",
      "Featured": "주요 소식",
      "Firmmit Uzbekistan opens as the regional branch of Firmmit Korea": "Firmmit Uzbekistan, Firmmit Korea 지역 지사로 개소",
      "Our new office brings Korean smart-farm technology, engineering and agri-trade directly to growers in Uzbekistan, with local specialists and full head-office support.":
        "새 사무소는 한국의 스마트팜 기술·엔지니어링·농산물 교역을 현지 전문가와 본사의 전폭적 지원과 함께 우즈베키스탄 농가에 직접 제공합니다.",
      "From the field": "현장에서", "Projects": "프로젝트", "Technology": "기술",
      "Trade": "교역", "Training": "교육", "Partnership": "파트너십",
      "First multi-span greenhouse commissioned near Tashkent": "타슈켄트 인근 첫 멀티스팬 온실 가동",
      "A pilot facility demonstrates climate-controlled tomato production with significantly reduced water use.":
        "시범 시설이 물 사용을 크게 줄인 기후 제어 토마토 생산을 시연합니다.",
      "How IoT sensors cut water use in arid-climate farming": "IoT 센서가 건조 기후 농업에서 물 사용을 줄이는 방법",
      "A look at the sensor-and-automation stack that keeps greenhouses efficient through hot, dry summers.":
        "덥고 건조한 여름에도 온실을 효율적으로 유지하는 센서·자동화 시스템을 살펴봅니다.",
      "New Korea–Uzbekistan supply route for greenhouse equipment": "온실 장비를 위한 새 한국–우즈베키스탄 공급 경로",
      "Streamlined logistics shorten delivery times for climate and irrigation systems imported from Korea.":
        "간소화된 물류로 한국에서 수입하는 기후·관수 시스템의 배송 기간을 단축합니다.",
      "Grower training program launches in three regions": "세 개 지역에서 농가 교육 프로그램 시작",
      "Hands-on workshops help local teams master climate management and dashboard-driven crop care.":
        "실습 워크숍이 현지 팀의 기후 관리와 데이터 기반 작물 관리 숙달을 돕습니다.",
      "Collaboration with agricultural institutions on regional trials": "지역 시험을 위한 농업 기관과의 협력",
      "Joint research explores the best greenhouse crops and setups for Central Asian conditions.":
        "공동 연구가 중앙아시아 환경에 가장 적합한 온실 작물과 구성을 탐구합니다.",
      "Firmmit brings its smart-farm vision to Central Asia": "Firmmit, 스마트팜 비전을 중앙아시아로",
      "An introduction to our mission: preparing tomorrow's food with reliable, sustainable technology.":
        "우리의 사명 소개: 신뢰할 수 있고 지속가능한 기술로 내일의 식량을 준비합니다.",
      "Subscribe for updates": "소식 구독",
      "Want to feature your project?": "당신의 프로젝트를 소개하고 싶으신가요?",
      "If you're growing with Firmmit, we'd love to share your story.": "Firmmit과 함께 성장하고 계신다면, 당신의 이야기를 전하고 싶습니다.",
      /* contact */
      "Let's build your smart farm together.": "당신의 스마트팜을 함께 만들어 갑니다",
      "Tell us about your land, crop and goals. Our team will get back to you with clear next steps, no obligation.":
        "귀하의 토지·작물·목표를 알려주세요. 우리 팀이 명확한 다음 단계와 함께 연락드립니다, 부담 없이.",
      "Office": "사무소", "Email": "이메일", "Phone": "전화", "Business hours": "영업 시간",
      "Mon–Fri, 09:00 – 18:00": "월–금, 09:00 – 18:00", "Closed on public holidays": "공휴일 휴무",
      "Full name": "성함", "Company / Farm": "회사 / 농장",
      "I'm interested in": "관심 분야", "Select a topic": "주제 선택",
      "Can I help you with anything?": "무엇을 도와드릴까요?",
      "Outdoor Smart Farm": "노지 스마트팜", "Indoor Smart Farm": "실내 스마트팜",
      "Plant Factory": "식물공장", "Collaboration proposal": "협업 제안",
      "Casual Meeting": "가벼운 미팅", "ETC": "기타",
      "Catalog": "카탈로그", "Catalog (PDF)": "카탈로그 (PDF)",
      "DWC": "DWC", "Substrate": "배지", "EC / pH": "EC / pH", "Soil moisture": "토양 수분", "Dashboard": "대시보드",
      "Explore products": "제품 보기",
      "Full name *": "성명 *", "Email *": "이메일 *", "Message *": "메시지 *", "Can I help you with anything? *": "무엇을 도와드릴까요? *",
      "July 2026 · Company": "2026년 7월 · 회사", "July 2026": "2026년 7월", "June 2026": "2026년 6월", "May 2026": "2026년 5월", "April 2026": "2026년 4월",
      "Article previews shown are illustrative of the topics we cover.": "표시된 기사 미리보기는 저희가 다루는 주제를 예시로 보여줍니다.",
      "Error 404": "오류 404", "Page not found": "페이지를 찾을 수 없습니다",
      "The page you're looking for doesn't exist or may have moved.": "찾으시는 페이지가 존재하지 않거나 이동되었을 수 있습니다.",
      "Back to home": "홈으로",
      "The map shows our exact office location, Mahtumquli 130, Yashnobod district, Tashkent.": "지도에 저희 사무실의 정확한 위치가 표시되어 있습니다, Makhtumkuli 130, 야시노바드구, 타슈켄트.",
      "Smart greenhouse project": "스마트 온실 프로젝트", "Products & equipment": "제품 및 장비",
      "Services (design, install, training)": "서비스 (설계·설치·교육)",
      "Import & export / trade": "수출입 / 교역", "Partnership": "파트너십", "Other": "기타",
      "Message": "메시지", "Send inquiry": "문의 보내기",
      "Your name": "성함", "Organization": "소속",
      "Tell us about your land, crop, plot size and goals...": "토지·작물·부지 규모·목표를 알려주세요...",
      "By sending, you agree to be contacted about your inquiry. This demo form does not transmit or store data.":
        "보내시면 문의 관련 연락에 동의하는 것입니다. 이 데모 양식은 데이터를 전송하거나 저장하지 않습니다.",
      "Director": "대표이사",
      "Company name": "회사명", "Address": "주소", "Tax ID (INN)": "납세자번호(INN)",
      "Bank": "은행", "Bank code (MFO)": "은행 코드(MFO)", "Account": "계좌",
      "Map shows the Tashkent area for reference. Exact office location shared upon inquiry.":
        "지도는 참고용으로 타슈켄트 지역을 표시합니다. 정확한 사무소 위치는 문의 시 안내합니다."
    }
  };

  /* ============================================================
     BUSINESS LINE PAGES — dictionary addendum (UZ / RU / KO)
     seedlings · greenhouse-construction · machinery-materials
     cultivation-consulting · strawberry-trade
     Merged into RICH and TXT above; the base dictionaries stay untouched.
     ============================================================ */
  var RICH_DIR = {
    "From mother plant to planting day.": {
      ru: "<span class=\"thin\">От маточного растения</span> до дня посадки.",
      uz: "<span class=\"thin\">Ona ko'chatdan</span> ekish kuniga qadar.",
      ko: "<span class=\"thin\">모주에서</span> 정식일까지."
    },
    "Engineering built around the crop and the climate.": {
      ru: "<span class=\"thin\">Инженерия под</span> культуру и климат.",
      uz: "<span class=\"thin\">Ekin va iqlimga moslab</span> loyihalash.",
      ko: "<span class=\"thin\">작물과 기후에 맞춘</span> 엔지니어링."
    },
    "Specified properly, delivered on time.": {
      ru: "<span class=\"thin\">Правильно подобрано,</span> вовремя поставлено.",
      uz: "<span class=\"thin\">To'g'ri tanlangan,</span> o'z vaqtida yetkazilgan.",
      ko: "<span class=\"thin\">정확한 사양,</span> 약속된 납기."
    },
    "Korean growing know-how, local water and climate.": {
      ru: "<span class=\"thin\">Корейский опыт выращивания,</span> местная вода и климат.",
      uz: "<span class=\"thin\">Koreys yetishtirish tajribasi,</span> mahalliy suv va iqlim.",
      ko: "<span class=\"thin\">한국의 재배 기술,</span> 현지의 물과 기후."
    },
    "Grown, graded and delivered cold.": {
      ru: "<span class=\"thin\">Выращено, откалибровано</span> и доставлено в холоде.",
      uz: "<span class=\"thin\">Yetishtirildi, saralandi</span> va sovuqda yetkazildi.",
      ko: "<span class=\"thin\">재배하고 선별해</span> 저온으로 납품합니다."
    },
  };

  var TXT_DIR = {
    ru: {
      "Five business lines that cover the full cycle, from the first seedling to the harvest reaching its market.": "Пять направлений, охватывающих полный цикл, от первой рассады до урожая, дошедшего до рынка.",
      "Seed & Seedling Supply": "Поставка семян и рассады",
      "Certified, disease-screened strawberry seedlings propagated at our own nursery and delivered ready to plant.": "Сертифицированная, проверенная на болезни рассада клубники из собственного питомника, поставляется готовой к посадке.",
      "Greenhouse Construction & Reconstruction": "Строительство и реконструкция теплиц",
      "Turnkey new builds and the reconstruction of existing greenhouses into modern, climate-controlled facilities.": "Строительство «под ключ» и реконструкция существующих теплиц в современные объекты с управляемым климатом.",
      "Agricultural Machinery & Materials": "Продажа сельхозтехники и материалов",
      "Supply of greenhouse equipment, irrigation components, substrates and growing materials from verified manufacturers.": "Поставка тепличного оборудования, компонентов орошения, субстратов и материалов для выращивания от проверенных производителей.",
      "Cultivation Consulting": "Консалтинг по выращиванию",
      "Agronomy programmes, grower training and season-long technical supervision from Korean and local specialists.": "Агрономические программы, обучение и техническое сопровождение в течение сезона от корейских и местных специалистов.",
      "Strawberry Trade": "Торговля клубникой",
      "Fresh strawberry supply for the domestic market and export sales to buyers across the region.": "Поставка свежей клубники на внутренний рынок и экспортные продажи покупателям в регионе.",
      "Business line 01": "Направление 01",
      "Strawberry seedlings you can plant with confidence.": "Рассада клубники, которую можно сажать уверенно.",
      "Every harvest starts with the plant. Firmmit propagates certified, disease-screened strawberry seedlings at its own nursery in the Tashkent region and delivers them ready for the field or the greenhouse.": "Любой урожай начинается с растения. Firmmit выращивает сертифицированную, проверенную на болезни рассаду клубники в собственном питомнике в Ташкентской области и поставляет её готовой к посадке в поле или в теплицу.",
      "Overview": "Обзор",
      "A weak seedling cannot be corrected later in the season. That is why we control the whole propagation chain ourselves, from registered mother stock through rooting, screening and cold-chain delivery, instead of buying in plants of unknown origin. Growers receive uniform plants with strong crowns, a documented variety and a phytosanitary certificate for every batch, so the season starts from a known baseline rather than a guess.": "Слабую рассаду невозможно исправить в середине сезона. Поэтому мы не закупаем растения неизвестного происхождения, а контролируем всю цепочку размножения сами, от зарегистрированных маточных растений до укоренения, проверки и поставки по холодной цепи.\n\nФермер получает выровненные растения с сильным рожком, документированный сорт и фитосанитарный сертификат на каждую партию, то есть сезон начинается с известной базы, а не с догадки.",
      "Seolhyang": "Сольхян (설향)",
      "Korean premium cultivar, the backbone of our propagation programme": "Корейский премиальный сорт, основа нашей программы размножения",
      "AKIS": "AKIS",
      "Our own nursery at the Firmmit AKIS Smart Farm, Yuqori Chirchiq": "Собственный питомник при Firmmit AKIS Smart Farm, Юкори Чирчик",
      "Certified": "Сертифицировано",
      "Screened plants with phytosanitary documentation per batch": "Проверенные растения с фитосанитарными документами на каждую партию",
      "Inside the seedling programme": "Что входит в программу рассады",
      "Registered mother stock": "Зарегистрированный маточник",
      "We propagate from registered mother plants of Korean cultivars, so every order starts from a known and stable genetic base.": "Мы размножаем от зарегистрированных маточных растений корейских сортов, поэтому каждый заказ начинается с известной и стабильной генетической базы.",
      "Disease screening": "Проверка на болезни",
      "Plants are inspected and screened for the main strawberry pathogens and viruses before they leave the nursery.": "Перед отправкой из питомника растения осматриваются и проверяются на основные патогены и вирусы клубники.",
      "Controlled propagation": "Контролируемое размножение",
      "Runners are rooted under a documented climate and feeding programme, producing uniform plants with balanced roots.": "Усы укореняются по документированной программе климата и питания, получаются выровненные растения со сбалансированной корневой системой.",
      "Cold-chain delivery": "Доставка по холодной цепи",
      "Seedlings are packed and transported under temperature control so they arrive anywhere in Uzbekistan in planting condition.": "Рассада упаковывается и перевозится под контролем температуры, поэтому попадает в любую точку Узбекистана в состоянии, пригодном для посадки.",
      "Planting-window planning": "Планирование сроков посадки",
      "Propagation is scheduled around your target harvest date, so the plants are ready in the week you actually need them.": "Размножение планируется под вашу целевую дату урожая, поэтому растения готовы именно на нужной неделе.",
      "Establishment follow-up": "Сопровождение приживаемости",
      "An agronomist checks establishment in the first weeks after planting and tunes irrigation and feeding with your team.": "Агроном проверяет приживаемость в первые недели после посадки и вместе с вашей командой настраивает полив и питание.",
      "How it runs": "Как это работает",
      "Four steps to planted rows": "Четыре шага до высаженных рядов",
      "Order & variety": "Заказ и сорт",
      "We agree cultivar, volume and planting date, then confirm them in a supply contract.": "Согласуем сорт, объём и дату посадки и закрепляем их в договоре поставки.",
      "Propagation": "Размножение",
      "Runners are rooted and grown on at our nursery under a documented programme.": "Усы укореняются и доращиваются в нашем питомнике по документированной программе.",
      "Screening": "Проверка",
      "Each batch is inspected, screened and issued with its phytosanitary documentation.": "Каждая партия осматривается, проверяется и оформляется фитосанитарными документами.",
      "Plants arrive on the agreed date and our agronomist supports the planting.": "Растения приходят в согласованную дату, наш агроном сопровождает посадку.",
      "Why it matters": "Почему это важно",
      "A season is decided in its first month.": "Сезон решается в первый месяц.",
      "✓ Known variety and origin, documented for every batch": "✓ Известный сорт и происхождение, документированные по каждой партии",
      "✓ Uniform plants mean a uniform, plannable harvest window": "✓ Выровненная рассада, предсказуемое и планируемое окно урожая",
      "✓ Screened material reduces disease pressure from day one": "✓ Проверенный материал снижает инфекционный фон с первого дня",
      "✓ Local propagation removes long import transit from the chain": "✓ Местное размножение убирает из цепочки долгий импортный транзит",
      "✓ Agronomic support continues after the plants are in the ground": "✓ Агрономическое сопровождение продолжается и после посадки",
      "Request seedling pricing": "Запросить цены на рассаду",
      "Planning your next planting?": "Планируете следующую посадку?",
      "Tell us your area, cultivar and target harvest date and we will confirm volumes and a delivery window.": "Сообщите площадь, сорт и целевую дату урожая, подтвердим объёмы и срок поставки.",
      "Talk to our nursery team": "Связаться с питомником",
      "Business line 02": "Направление 02",
      "New greenhouses, and new life for existing ones.": "Новые теплицы, и новая жизнь для существующих.",
      "We build climate-controlled greenhouses from the ground up and reconstruct older facilities into modern, productive ones, with one contract, one schedule and one accountable partner.": "Мы строим теплицы с управляемым климатом с нуля и реконструируем старые объекты в современные и продуктивные, один договор, один график, один ответственный партнёр.",
      "Regions with reconstruction projects: Bukhara, Sirdaryo, Samarkand": "Регионы проектов реконструкции: Бухара, Сырдарья, Самарканд",
      "A greenhouse is not a building with plants inside it. Structure, covering, climate control, irrigation and the growing system have to be designed as one, against a specific crop and a specific location, Central Asian summers, cold winters and limited water. Firmmit designs, supplies and installs that whole package. Where a facility already exists, reconstruction is usually faster and far cheaper than a new build: the shell stays, and the systems that actually determine yield are replaced.": "Теплица: это не здание с растениями внутри. Конструкция, покрытие, климат-контроль, орошение и система выращивания должны проектироваться как единое целое, под конкретную культуру и конкретную площадку: среднеазиатское лето, холодная зима, ограниченная вода.\n\nFirmmit проектирует, поставляет и монтирует весь этот комплекс. Если объект уже существует, реконструкция обычно быстрее и значительно дешевле нового строительства: каркас остаётся, а заменяются те системы, которые реально определяют урожай.",
      "0.5 ha": "0,5 га",
      "Firmmit AKIS reference greenhouse in Yuqori Chirchiq": "Образцовая теплица Firmmit AKIS в Юкори Чирчике",
      "Turnkey": "Под ключ",
      "From survey and design through to commissioning and training": "От обследования и проектирования до пусконаладки и обучения",
      "The scope we take on": "Объём работ, который мы берём на себя",
      "Site survey & feasibility": "Обследование участка и оценка",
      "Soil, water quality, power, access and local climate data are assessed before a single line is drawn.": "Почва, качество воды, энергоснабжение, подъезд и местные климатические данные оцениваются до первой линии на чертеже.",
      "Structural design": "Проектирование конструкции",
      "Span, height, ventilation and glazing are chosen for the crop, the wind and snow loads and the budget.": "Пролёт, высота, вентиляция и покрытие подбираются под культуру, ветровую и снеговую нагрузку и бюджет.",
      "Turnkey construction": "Строительство под ключ",
      "Foundations, frame, covering and internal systems installed by our own construction team and local partners.": "Фундамент, каркас, покрытие и внутренние системы монтируются нашей строительной бригадой и местными партнёрами.",
      "Reconstruction & retrofit": "Реконструкция и модернизация",
      "Existing greenhouses are re-covered, re-sealed and re-equipped with modern climate, irrigation and growing systems.": "Существующие теплицы перекрываются, герметизируются и переоснащаются современными системами климата, орошения и выращивания.",
      "Climate & irrigation systems": "Системы климата и орошения",
      "Heating, ventilation, screening, fertigation and sensor networks supplied and integrated as one system.": "Отопление, вентиляция, экранирование, фертигация и сети датчиков поставляются и интегрируются как единая система.",
      "Commissioning & handover": "Пусконаладка и передача",
      "Systems are tested under load, settings documented and your operators trained before the facility is handed over.": "До передачи объекта системы испытываются под нагрузкой, настройки документируются, операторы обучаются.",
      "From empty plot to first crop": "От пустого участка до первого урожая",
      "Survey & concept": "Обследование и концепция",
      "Site visit, water and soil analysis, crop choice and an outline concept with indicative cost.": "Выезд на участок, анализ воды и почвы, выбор культуры и предварительная концепция с ориентировочной стоимостью.",
      "Design & budget": "Проект и бюджет",
      "Detailed drawings, equipment specification and a fixed budget agreed in the contract.": "Детальные чертежи, спецификация оборудования и фиксированный бюджет, закреплённые в договоре.",
      "Build & install": "Строительство и монтаж",
      "Construction, equipment delivery and installation to an agreed schedule.": "Строительство, поставка оборудования и монтаж по согласованному графику.",
      "Commission & train": "Пуск и обучение",
      "Testing, calibration, operator training and a supported first growing cycle.": "Испытания, калибровка, обучение операторов и сопровождение первого цикла выращивания.",
      "Reconstruction": "Реконструкция",
      "Often the better investment.": "Часто это выгоднее.",
      "✓ The existing shell is reused, lower cost than a new build": "✓ Существующий каркас используется повторно, дешевле нового строительства",
      "✓ Shorter timeline, so production restarts sooner": "✓ Короче сроки, производство возобновляется быстрее",
      "✓ Climate, irrigation and growing systems brought up to modern standard": "✓ Системы климата, орошения и выращивания доводятся до современного уровня",
      "✓ Energy and water consumption reduced by design": "✓ Потребление энергии и воды снижается уже на уровне проекта",
      "✓ Staged scope is possible, the facility is upgraded section by section": "✓ Возможна поэтапная работа, объект модернизируется секция за секцией",
      "Request a site assessment": "Запросить обследование объекта",
      "Building new, or upgrading what you have?": "Строите новое или модернизируете имеющееся?",
      "Send us the location and area and we will come back with an outline concept and an indicative budget.": "Пришлите расположение и площадь, вернёмся с предварительной концепцией и ориентировочным бюджетом.",
      "Start a project": "Начать проект",
      "Business line 03": "Направление 03",
      "The equipment and materials a greenhouse runs on.": "Оборудование и материалы, на которых работает теплица.",
      "Structures, irrigation, climate control, substrates and consumables, supplied from verified manufacturers, specified for your facility and backed by spare parts and service on the ground.": "Конструкции, орошение, климат-контроль, субстраты и расходные материалы, от проверенных производителей, подобранные под ваш объект и обеспеченные запчастями и сервисом на месте.",
      "Most greenhouse problems in the region are supply problems: the wrong emitter for the water, a substrate that behaves differently than expected, a controller nobody can service locally. We supply equipment we install and support ourselves, which keeps the specification honest. Firmmit combines its own manufactured smart-farm equipment with components from established Korean and international suppliers, and holds the parts that fail most often in stock.": "Большинство тепличных проблем в регионе, это проблемы поставки: капельница, не подходящая под воду, субстрат, ведущий себя иначе, чем ожидалось, контроллер, который здесь некому обслуживать. Мы поставляем то оборудование, которое сами монтируем и сами поддерживаем,, это делает спецификацию честной.\n\nFirmmit сочетает собственное оборудование для умных ферм с компонентами проверенных корейских и международных поставщиков и держит на складе те детали, которые выходят из строя чаще всего.",
      "Registered Firmmit patents behind our own equipment": "Зарегистрированных патентов Firmmit в основе собственного оборудования",
      "KR": "KR",
      "Direct supply chain from the Korean head office and its partners": "Прямая цепочка поставок от головного офиса в Корее и его партнёров",
      "24/7": "24/7",
      "Technical support and spare parts held locally": "Техническая поддержка и склад запчастей на месте",
      "What we supply": "Что мы поставляем",
      "Six supply categories": "Шесть категорий поставки",
      "Structures & covering": "Конструкции и покрытие",
      "Frames, profiles, polycarbonate and film, sealing and ventilation hardware for new builds and re-covering.": "Каркасы, профили, поликарбонат и плёнка, уплотнения и вентиляционная фурнитура для нового строительства и перекрытия.",
      "Irrigation & fertigation": "Орошение и фертигация",
      "Pumps, filters, dosing units, drip lines and emitters selected against your water analysis.": "Насосы, фильтры, узлы дозирования, капельные линии и эмиттеры, подобранные по анализу вашей воды.",
      "Climate control & IoT": "Климат-контроль и IoT",
      "Controllers, sensors, screens, heating and ventilation equipment, with dashboards for remote monitoring.": "Контроллеры, датчики, экраны, отопительное и вентиляционное оборудование с панелями удалённого мониторинга.",
      "Substrates & growing media": "Субстраты и среды выращивания",
      "Coco substrate, slabs, pots and trays matched to the crop, the system and the irrigation strategy.": "Кокосовый субстрат, маты, горшки и кассеты, подобранные под культуру, систему и стратегию полива.",
      "Crop support & consumables": "Опоры и расходные материалы",
      "Trellising, clips, nets, protective materials and the season consumables a facility goes through.": "Шпалеры, клипсы, сетки, защитные материалы и расходники, которые объект расходует за сезон.",
      "Spare parts & service": "Запчасти и сервис",
      "Genuine spare parts held in stock, with technicians who can be on site rather than only on the phone.": "Оригинальные запчасти на складе и техники, которые приезжают на объект, а не только отвечают по телефону.",
      "From enquiry to installed": "От запроса до монтажа",
      "Specification": "Спецификация",
      "We review your facility, crop and water analysis and specify what actually fits.": "Изучаем объект, культуру и анализ воды и подбираем то, что действительно подходит.",
      "Quotation": "Коммерческое предложение",
      "An itemised quotation with lead times, warranty terms and delivery conditions.": "Постатейное предложение со сроками поставки, гарантией и условиями доставки.",
      "Supply & logistics": "Поставка и логистика",
      "Import, customs and delivery handled through established Korea–Uzbekistan routes.": "Импорт, таможня и доставка по отлаженным маршрутам Корея–Узбекистан.",
      "Install & support": "Монтаж и поддержка",
      "Installation, commissioning and ongoing access to spare parts and technicians.": "Монтаж, пусконаладка и постоянный доступ к запчастям и техникам.",
      "Online store": "Интернет-магазин",
      "Browse what is in stock.": "Посмотрите, что есть в наличии.",
      "Our catalogue lists agricultural materials and greenhouse components with specifications and current availability. For bulk orders or items not listed, our team will quote directly.": "В каталоге представлены сельхозматериалы и компоненты теплиц со спецификациями и текущим наличием. По оптовым заказам и позициям вне каталога наша команда даёт предложение напрямую.",
      "Open the catalogue": "Открыть каталог",
      "Need a quotation?": "Нужно предложение?",
      "Send us your list or your facility details and we will come back with specifications, prices and lead times.": "Пришлите список или данные объекта, вернёмся со спецификацией, ценами и сроками.",
      "Request a quotation": "Запросить предложение",
      "Business line 04": "Направление 04",
      "Agronomy that turns a facility into a harvest.": "Агрономия, которая превращает объект в урожай.",
      "Equipment does not grow fruit, decisions do. Our agronomists build the nutrition, climate and crop programme for your facility, train your team and stay with them through the season.": "Ягоду выращивает не оборудование, а решения. Наши агрономы разрабатывают программу питания, климата и работы с культурой для вашего объекта, обучают команду и остаются с ней весь сезон.",
      "A programme that works in Korea cannot be copied into Uzbekistan unchanged. Water chemistry, light, summer heat and winter heating costs are different, and the nutrient recipe has to be rebuilt around them. We start from your water analysis and your facility's real capabilities, then write a programme your team can actually run, and we train them to run it, in their own language.": "Программу, которая работает в Корее, нельзя перенести в Узбекистан без изменений. Химия воды, освещённость, летняя жара и стоимость зимнего отопления другие, рецептуру питания приходится выстраивать заново под них.\n\nМы начинаем с анализа вашей воды и реальных возможностей объекта, затем пишем программу, которую ваша команда действительно способна выполнять,, и обучаем её выполнять на родном языке.",
      "Hands-on training at the Firmmit AKIS Smart Farm, Yuqori Chirchiq": "Практическое обучение на Firmmit AKIS Smart Farm, Юкори Чирчик",
      "Working languages: Uzbek, Russian, Korean and English": "Рабочие языки: узбекский, русский, корейский и английский",
      "Season": "Сезон",
      "Supervision that continues through the whole growing cycle": "Сопровождение на протяжении всего цикла выращивания",
      "The consulting programme": "Программа консалтинга",
      "Crop & variety selection": "Подбор культуры и сорта",
      "Which crop and cultivar suit your facility, your market window and your team's experience.": "Какая культура и сорт подходят вашему объекту, вашему рыночному окну и опыту вашей команды.",
      "Water & nutrition programme": "Программа воды и питания",
      "A fertigation recipe built on your own water analysis, with EC and pH targets by growth stage.": "Рецептура фертигации на основе анализа вашей воды с целевыми EC и pH по фазам роста.",
      "Climate strategy": "Стратегия климата",
      "Temperature, humidity and ventilation settings by season, balanced against heating and cooling cost.": "Настройки температуры, влажности и вентиляции по сезонам, сбалансированные со стоимостью отопления и охлаждения.",
      "Grower training": "Обучение агрономов",
      "Practical training for operators and agronomists, delivered on site and at our AKIS facility.": "Практическое обучение операторов и агрономов, на объекте и на нашей базе AKIS.",
      "Season supervision": "Сезонное сопровождение",
      "Regular visits and remote review of your data, with corrections made while they still matter.": "Регулярные выезды и удалённый анализ ваших данных с корректировками, пока они ещё дают эффект.",
      "Yield & quality review": "Разбор урожая и качества",
      "An end-of-season analysis of yield, fruit quality and cost per kilogram, feeding into the next cycle.": "Анализ урожайности, качества ягоды и себестоимости килограмма по итогам сезона, как основа для следующего цикла.",
      "A season, planned": "Спланированный сезон",
      "Diagnosis": "Диагностика",
      "Facility audit, water and substrate analysis and a review of last season's results.": "Аудит объекта, анализ воды и субстрата и разбор результатов прошлого сезона.",
      "Programme design": "Разработка программы",
      "A written nutrition, climate and crop-work plan for the coming cycle.": "Письменный план питания, климата и работ с культурой на предстоящий цикл.",
      "Your team is trained on the programme and on reading the facility's own data.": "Вашу команду обучают программе и чтению собственных данных объекта.",
      "Supervision": "Сопровождение",
      "Scheduled visits and remote support through the season, with a closing review.": "Плановые выезды и удалённая поддержка в течение сезона с итоговым разбором.",
      "Who it is for": "Для кого это",
      "New growers and established farms alike.": "И для начинающих, и для действующих хозяйств.",
      "✓ First-time growers starting a new greenhouse": "✓ Для тех, кто запускает первую теплицу",
      "✓ Farms whose yield or fruit quality has stopped improving": "✓ Для хозяйств, где урожайность или качество ягоды перестали расти",
      "✓ Facilities switching crop or cultivar": "✓ Для объектов, меняющих культуру или сорт",
      "✓ Teams that need training in Uzbek or Russian, not just manuals": "✓ Для команд, которым нужно обучение на узбекском или русском, а не инструкция",
      "✓ Investors who need an independent assessment before committing": "✓ Для инвесторов, которым нужна независимая оценка до решения",
      "Want a second opinion on your season?": "Нужен второй взгляд на ваш сезон?",
      "Send us your water analysis and current results and we will tell you where the gains are.": "Пришлите анализ воды и текущие результаты, скажем, где есть резерв роста.",
      "Talk to an agronomist": "Связаться с агрономом",
      "Business line 05": "Направление 05",
      "Fresh strawberries, from our greenhouses to the market.": "Свежая клубника, из наших теплиц на рынок.",
      "Greenhouse-grown fruit, graded and packed under a controlled cold chain, supplied to the domestic market and prepared for export to buyers across the region.": "Ягода из теплиц, откалиброванная и упакованная в условиях контролируемой холодной цепи, поставляется на внутренний рынок и готовится к экспорту покупателям в регионе.",
      "Strawberry is a fruit that punishes every gap in the chain. Firmmit controls that chain from its own greenhouses, harvest timing, grading, packing and temperature, so the fruit that reaches a shelf still looks and tastes the way it did at picking. Domestic supply runs through the season from our facilities in the Tashkent region. The first export shipments are scheduled for September 2026.": "Клубника наказывает за любой разрыв в цепочке. Firmmit контролирует эту цепочку начиная с собственных теплиц, сроки сбора, калибровку, упаковку и температуру,, поэтому ягода на полке выглядит и на вкус такая же, как в момент сбора.\n\nПоставки на внутренний рынок идут в течение сезона с наших объектов в Ташкентской области. Первые экспортные отгрузки запланированы на сентябрь 2026 года.",
      "Our principal cultivar, aromatic, sweet and firm enough to travel": "Наш основной сорт, ароматный, сладкий и достаточно плотный для перевозки",
      "2026.09": "09.2026",
      "First export shipments scheduled": "Запланированы первые экспортные отгрузки",
      "Cold chain": "Холодная цепь",
      "Temperature controlled from harvest through to delivery": "Контроль температуры от сбора до доставки",
      "From row to buyer": "От грядки до покупателя",
      "Greenhouse-grown supply": "Поставка из теплиц",
      "Fruit from our own climate-controlled facilities, harvested to a plan rather than to whatever ripens.": "Ягода с собственных объектов с управляемым климатом, собирается по плану, а не по тому, что успело созреть.",
      "Grading & packing": "Калибровка и упаковка",
      "Sorted by size and quality and packed in punnets or trays to the buyer's specification.": "Сортируется по размеру и качеству и упаковывается в контейнеры или лотки по спецификации покупателя.",
      "Pre-cooling after harvest and temperature-controlled storage and transport all the way to delivery.": "Предварительное охлаждение после сбора, затем хранение и перевозка с контролем температуры вплоть до доставки.",
      "Domestic distribution": "Дистрибуция на внутреннем рынке",
      "Regular supply to retail, HoReCa and wholesale buyers, with volumes agreed before the season.": "Регулярные поставки в розницу, HoReCa и оптовым покупателям с объёмами, согласованными до сезона.",
      "Export sales": "Экспортные продажи",
      "Export documentation, phytosanitary certification and freight arranged for regional buyers.": "Экспортные документы, фитосанитарная сертификация и перевозка организуются для покупателей в регионе.",
      "Contract growing": "Выращивание по контракту",
      "Agreed volumes and quality standards fixed ahead of the season, for buyers who need certainty.": "Объёмы и стандарты качества фиксируются до начала сезона, для покупателей, которым нужна определённость.",
      "Four stages, one temperature": "Четыре этапа, одна температура",
      "Volume planning": "Планирование объёмов",
      "Volumes, grades and delivery windows agreed with the buyer before the season starts.": "Объёмы, сортность и сроки поставки согласуются с покупателем до начала сезона.",
      "Harvest & grading": "Сбор и калибровка",
      "Picked at the right stage and graded the same day, not the next morning.": "Собирается в нужной стадии зрелости и калибруется в тот же день, а не на следующее утро.",
      "Packing & cooling": "Упаковка и охлаждение",
      "Packed to specification and pre-cooled, then held at a controlled temperature.": "Упаковывается по спецификации, предварительно охлаждается и хранится при контролируемой температуре.",
      "Delivery or export": "Доставка или экспорт",
      "Delivered domestically, or shipped with full documentation for export.": "Доставляется на внутренний рынок или отгружается на экспорт с полным пакетом документов.",
      "For buyers": "Для покупателей",
      "What you can rely on.": "На что можно рассчитывать.",
      "✓ A single grower behind the fruit, not a mixed-origin consignment": "✓ За ягодой стоит один производитель, а не партия смешанного происхождения",
      "✓ Consistent cultivar, grade and packing across deliveries": "✓ Одинаковые сорт, сортность и упаковка во всех поставках",
      "✓ Cold chain maintained from harvest to hand-over": "✓ Холодная цепь соблюдается от сбора до передачи",
      "✓ Documentation prepared for domestic trade and for export": "✓ Документы готовятся и для внутренней торговли, и для экспорта",
      "✓ Volumes and prices agreed ahead of the season": "✓ Объёмы и цены согласуются до сезона",
      "Discuss supply": "Обсудить поставку",
      "Looking for a reliable strawberry supplier?": "Ищете надёжного поставщика клубники?",
      "Tell us your volumes, packaging and delivery schedule and we will prepare an offer.": "Сообщите объёмы, упаковку и график поставки, подготовим предложение.",
      "Contact our trade team": "Связаться с торговым отделом"
    },
    uz: {
      "Five business lines that cover the full cycle, from the first seedling to the harvest reaching its market.": "Butun siklni qamrab oluvchi beshta biznes yo'nalishi, birinchi ko'chatdan tortib hosilning bozorga yetib borishigacha.",
      "Seed & Seedling Supply": "Urug' va ko'chat yetkazib berish",
      "Certified, disease-screened strawberry seedlings propagated at our own nursery and delivered ready to plant.": "O'z ko'chatxonamizda yetishtirilgan, kasalliklarga tekshirilgan sertifikatli qulupnay ko'chatlari, ekishga tayyor holda yetkaziladi.",
      "Greenhouse Construction & Reconstruction": "Issiqxona qurilishi va rekonstruksiyasi",
      "Turnkey new builds and the reconstruction of existing greenhouses into modern, climate-controlled facilities.": "Kalit topshirish sharti bilan yangi qurilish va mavjud issiqxonalarni zamonaviy, iqlimi boshqariladigan obyektga aylantirish.",
      "Agricultural Machinery & Materials": "Qishloq xo'jaligi texnikasi va materiallari savdosi",
      "Supply of greenhouse equipment, irrigation components, substrates and growing materials from verified manufacturers.": "Ishonchli ishlab chiqaruvchilardan issiqxona uskunalari, sug'orish qismlari, substratlar va yetishtirish materiallarini yetkazib berish.",
      "Cultivation Consulting": "Yetishtirish bo'yicha konsalting",
      "Agronomy programmes, grower training and season-long technical supervision from Korean and local specialists.": "Koreys va mahalliy mutaxassislardan agronomik dasturlar, fermerlarni o'qitish va mavsum davomida texnik nazorat.",
      "Strawberry Trade": "Qulupnay savdosi",
      "Fresh strawberry supply for the domestic market and export sales to buyers across the region.": "Ichki bozorga yangi uzilgan qulupnay yetkazib berish va mintaqa xaridorlariga eksport savdosi.",
      "Business line 01": "Yo'nalish 01",
      "Strawberry seedlings you can plant with confidence.": "Ishonch bilan ekiladigan qulupnay ko'chati.",
      "Every harvest starts with the plant. Firmmit propagates certified, disease-screened strawberry seedlings at its own nursery in the Tashkent region and delivers them ready for the field or the greenhouse.": "Har qanday hosil o'simlikdan boshlanadi. Firmmit Toshkent viloyatidagi o'z ko'chatxonasida sertifikatli, kasalliklarga tekshirilgan qulupnay ko'chatlarini yetishtiradi va ularni dala yoki issiqxonaga ekishga tayyor holda yetkazadi.",
      "Overview": "Umumiy ma'lumot",
      "A weak seedling cannot be corrected later in the season. That is why we control the whole propagation chain ourselves, from registered mother stock through rooting, screening and cold-chain delivery, instead of buying in plants of unknown origin. Growers receive uniform plants with strong crowns, a documented variety and a phytosanitary certificate for every batch, so the season starts from a known baseline rather than a guess.": "Zaif ko'chatni mavsum o'rtasida tuzatib bo'lmaydi. Shu sababli biz kelib chiqishi noma'lum ko'chat sotib olish o'rniga, ko'paytirish zanjirini boshdan oxirigacha o'zimiz nazorat qilamiz, ro'yxatdan o'tgan ona ko'chatdan ildiz oldirish, tekshiruv va sovuq zanjirda yetkazib berishgacha.\n\nFermer kuchli tojli, bir xil o'lchamdagi ko'chat, hujjatlashtirilgan nav va har bir partiya uchun fitosanitar sertifikat oladi, ya'ni mavsum taxmin bilan emas, aniq asosdan boshlanadi.",
      "Seolhyang": "Seolhyang (설향)",
      "Korean premium cultivar, the backbone of our propagation programme": "Koreyaning premium navi, ko'paytirish dasturimizning asosi",
      "AKIS": "AKIS",
      "Our own nursery at the Firmmit AKIS Smart Farm, Yuqori Chirchiq": "Yuqori Chirchiqdagi Firmmit AKIS Smart Farm qoshidagi o'z ko'chatxonamiz",
      "Certified": "Sertifikatli",
      "Screened plants with phytosanitary documentation per batch": "Tekshiruvdan o'tgan ko'chat, har bir partiyaga fitosanitar hujjat",
      "Inside the seedling programme": "Ko'chat dasturi tarkibi",
      "Registered mother stock": "Ro'yxatdan o'tgan ona ko'chat",
      "We propagate from registered mother plants of Korean cultivars, so every order starts from a known and stable genetic base.": "Biz koreys navlarining ro'yxatdan o'tgan ona o'simliklaridan ko'paytiramiz, har bir buyurtma aniq va barqaror genetik asosdan boshlanadi.",
      "Disease screening": "Kasalliklarga tekshiruv",
      "Plants are inspected and screened for the main strawberry pathogens and viruses before they leave the nursery.": "Ko'chatxonadan chiqishdan oldin har bir o'simlik qulupnayning asosiy kasallik qo'zg'atuvchilari va viruslariga tekshiriladi.",
      "Controlled propagation": "Nazorat ostida ko'paytirish",
      "Runners are rooted under a documented climate and feeding programme, producing uniform plants with balanced roots.": "Mo'ylovlar hujjatlashtirilgan iqlim va oziqlantirish dasturi asosida ildiz oldiradi, natijada ildiz tizimi muvozanatli, bir xil ko'chat.",
      "Cold-chain delivery": "Sovuq zanjirda yetkazish",
      "Seedlings are packed and transported under temperature control so they arrive anywhere in Uzbekistan in planting condition.": "Ko'chatlar harorat nazorati ostida qadoqlanadi va tashiladi, O'zbekistonning istalgan nuqtasiga ekishga yaroqli holatda yetib boradi.",
      "Planting-window planning": "Ekish muddatini rejalashtirish",
      "Propagation is scheduled around your target harvest date, so the plants are ready in the week you actually need them.": "Ko'paytirish sizning maqsadli hosil sanangizga moslab rejalashtiriladi, ko'chat aynan kerakli haftada tayyor bo'ladi.",
      "Establishment follow-up": "Tutib ketishini kuzatish",
      "An agronomist checks establishment in the first weeks after planting and tunes irrigation and feeding with your team.": "Agronom ekishdan keyingi dastlabki haftalarda tutib ketishini tekshiradi va jamoangiz bilan birga sug'orish va oziqlantirishni sozlaydi.",
      "How it runs": "Qanday ishlaydi",
      "Four steps to planted rows": "Ekilgan qatorgacha to'rt qadam",
      "Order & variety": "Buyurtma va nav",
      "We agree cultivar, volume and planting date, then confirm them in a supply contract.": "Nav, hajm va ekish sanasi kelishiladi va yetkazib berish shartnomasida mustahkamlanadi.",
      "Propagation": "Ko'paytirish",
      "Runners are rooted and grown on at our nursery under a documented programme.": "Mo'ylovlar ko'chatxonamizda hujjatlashtirilgan dastur asosida ildiz oldiradi va o'stiriladi.",
      "Screening": "Tekshiruv",
      "Each batch is inspected, screened and issued with its phytosanitary documentation.": "Har bir partiya ko'zdan kechiriladi, tekshiriladi va fitosanitar hujjat bilan rasmiylashtiriladi.",
      "Plants arrive on the agreed date and our agronomist supports the planting.": "Ko'chat kelishilgan sanada yetkaziladi, agronomimiz ekish jarayonini qo'llab-quvvatlaydi.",
      "Why it matters": "Nega bu muhim",
      "A season is decided in its first month.": "Mavsum taqdiri birinchi oyda hal bo'ladi.",
      "✓ Known variety and origin, documented for every batch": "✓ Har bir partiya uchun hujjatlashtirilgan aniq nav va kelib chiqish",
      "✓ Uniform plants mean a uniform, plannable harvest window": "✓ Bir xil ko'chat, bir xil va rejalashtirsa bo'ladigan hosil davri",
      "✓ Screened material reduces disease pressure from day one": "✓ Tekshirilgan material birinchi kundanoq kasallik bosimini kamaytiradi",
      "✓ Local propagation removes long import transit from the chain": "✓ Mahalliy ko'paytirish zanjirdan uzoq import tranzitini olib tashlaydi",
      "✓ Agronomic support continues after the plants are in the ground": "✓ Agronomik qo'llab-quvvatlash ekishdan keyin ham davom etadi",
      "Request seedling pricing": "Ko'chat narxini so'rash",
      "Planning your next planting?": "Keyingi ekishni rejalashtiryapsizmi?",
      "Tell us your area, cultivar and target harvest date and we will confirm volumes and a delivery window.": "Maydon, nav va maqsadli hosil sanasini yuboring, hajm va yetkazib berish muddatini tasdiqlaymiz.",
      "Talk to our nursery team": "Ko'chatxona jamoasi bilan bog'lanish",
      "Business line 02": "Yo'nalish 02",
      "New greenhouses, and new life for existing ones.": "Yangi issiqxonalar, va mavjudlariga yangi hayot.",
      "We build climate-controlled greenhouses from the ground up and reconstruct older facilities into modern, productive ones, with one contract, one schedule and one accountable partner.": "Biz iqlimi boshqariladigan issiqxonalarni noldan quramiz va eski obyektlarni zamonaviy, unumli issiqxonaga aylantiramiz, bitta shartnoma, bitta jadval va bitta mas'ul sherik bilan.",
      "Regions with reconstruction projects: Bukhara, Sirdaryo, Samarkand": "Rekonstruksiya loyihalari hududi: Buxoro, Sirdaryo, Samarqand",
      "A greenhouse is not a building with plants inside it. Structure, covering, climate control, irrigation and the growing system have to be designed as one, against a specific crop and a specific location, Central Asian summers, cold winters and limited water. Firmmit designs, supplies and installs that whole package. Where a facility already exists, reconstruction is usually faster and far cheaper than a new build: the shell stays, and the systems that actually determine yield are replaced.": "Issiqxona: bu ichida o'simlik bor bino emas. Konstruksiya, qoplama, iqlim nazorati, sug'orish va yetishtirish tizimi yagona butunlik sifatida, aniq ekin va aniq joyga moslab loyihalanishi kerak: Markaziy Osiyo yozi, sovuq qish va cheklangan suv.\n\nFirmmit shu majmuaning barchasini loyihalaydi, yetkazadi va o'rnatadi. Obyekt allaqachon mavjud bo'lsa, rekonstruksiya odatda yangi qurilishdan tezroq va ancha arzonroq bo'ladi: karkas saqlanadi, hosilni haqiqatan belgilaydigan tizimlar esa almashtiriladi.",
      "0.5 ha": "0,5 ga",
      "Firmmit AKIS reference greenhouse in Yuqori Chirchiq": "Yuqori Chirchiqdagi Firmmit AKIS namunaviy issiqxonasi",
      "Turnkey": "Kalit topshirish",
      "From survey and design through to commissioning and training": "Tadqiqot va loyihadan ishga tushirish va o'qitishgacha",
      "The scope we take on": "Biz zimmamizga oladigan ishlar",
      "Site survey & feasibility": "Maydon tadqiqoti va maqsadga muvofiqlik",
      "Soil, water quality, power, access and local climate data are assessed before a single line is drawn.": "Birinchi chiziq chizilishidan oldin tuproq, suv sifati, energiya, yo'l va mahalliy iqlim ma'lumotlari baholanadi.",
      "Structural design": "Konstruksiya loyihasi",
      "Span, height, ventilation and glazing are chosen for the crop, the wind and snow loads and the budget.": "Oraliq, balandlik, shamollatish va qoplama ekin turiga, shamol va qor yukiga hamda byudjetga qarab tanlanadi.",
      "Turnkey construction": "Kalit topshirish qurilishi",
      "Foundations, frame, covering and internal systems installed by our own construction team and local partners.": "Poydevor, karkas, qoplama va ichki tizimlar o'z qurilish jamoamiz va mahalliy sheriklar tomonidan o'rnatiladi.",
      "Reconstruction & retrofit": "Rekonstruksiya va modernizatsiya",
      "Existing greenhouses are re-covered, re-sealed and re-equipped with modern climate, irrigation and growing systems.": "Mavjud issiqxonalar qayta qoplanadi, germetiklanadi va zamonaviy iqlim, sug'orish hamda yetishtirish tizimlari bilan jihozlanadi.",
      "Climate & irrigation systems": "Iqlim va sug'orish tizimlari",
      "Heating, ventilation, screening, fertigation and sensor networks supplied and integrated as one system.": "Isitish, shamollatish, ekranlash, fertigatsiya va sensor tarmoqlari yagona tizim sifatida yetkaziladi va integratsiya qilinadi.",
      "Commissioning & handover": "Ishga tushirish va topshirish",
      "Systems are tested under load, settings documented and your operators trained before the facility is handed over.": "Obyekt topshirilgunga qadar tizimlar yuk ostida sinaladi, sozlamalar hujjatlashtiriladi va operatorlaringiz o'qitiladi.",
      "From empty plot to first crop": "Bo'sh maydondan birinchi hosilgacha",
      "Survey & concept": "Tadqiqot va konsepsiya",
      "Site visit, water and soil analysis, crop choice and an outline concept with indicative cost.": "Maydonga tashrif, suv va tuproq tahlili, ekin tanlash hamda taxminiy qiymatli dastlabki konsepsiya.",
      "Design & budget": "Loyiha va byudjet",
      "Detailed drawings, equipment specification and a fixed budget agreed in the contract.": "Batafsil chizmalar, uskunalar spetsifikatsiyasi va shartnomada belgilangan qat'iy byudjet.",
      "Build & install": "Qurilish va montaj",
      "Construction, equipment delivery and installation to an agreed schedule.": "Qurilish, uskunalarni yetkazib berish va kelishilgan jadval bo'yicha montaj.",
      "Commission & train": "Ishga tushirish va o'qitish",
      "Testing, calibration, operator training and a supported first growing cycle.": "Sinov, kalibrlash, operatorlarni o'qitish va birinchi yetishtirish siklini qo'llab-quvvatlash.",
      "Reconstruction": "Rekonstruksiya",
      "Often the better investment.": "Ko'pincha foydaliroq investitsiya.",
      "✓ The existing shell is reused, lower cost than a new build": "✓ Mavjud karkas qayta ishlatiladi, yangi qurilishdan arzonroq",
      "✓ Shorter timeline, so production restarts sooner": "✓ Muddat qisqa, ishlab chiqarish tezroq qayta boshlanadi",
      "✓ Climate, irrigation and growing systems brought up to modern standard": "✓ Iqlim, sug'orish va yetishtirish tizimlari zamonaviy darajaga keltiriladi",
      "✓ Energy and water consumption reduced by design": "✓ Energiya va suv sarfi loyiha darajasida kamaytiriladi",
      "✓ Staged scope is possible, the facility is upgraded section by section": "✓ Bosqichma-bosqich bajarish mumkin, obyekt bo'lim-bo'lim yangilanadi",
      "Request a site assessment": "Obyekt baholashini so'rash",
      "Building new, or upgrading what you have?": "Yangi quryapsizmi yoki mavjudini yangilayapsizmi?",
      "Send us the location and area and we will come back with an outline concept and an indicative budget.": "Joylashuv va maydonni yuboring, dastlabki konsepsiya va taxminiy byudjet bilan javob beramiz.",
      "Start a project": "Loyihani boshlash",
      "Business line 03": "Yo'nalish 03",
      "The equipment and materials a greenhouse runs on.": "Issiqxona ishlashi uchun zarur uskuna va materiallar.",
      "Structures, irrigation, climate control, substrates and consumables, supplied from verified manufacturers, specified for your facility and backed by spare parts and service on the ground.": "Konstruksiyalar, sug'orish, iqlim nazorati, substratlar va sarf materiallari, ishonchli ishlab chiqaruvchilardan, sizning obyektingizga moslab tanlanadi va joyida ehtiyot qism hamda servis bilan ta'minlanadi.",
      "Most greenhouse problems in the region are supply problems: the wrong emitter for the water, a substrate that behaves differently than expected, a controller nobody can service locally. We supply equipment we install and support ourselves, which keeps the specification honest. Firmmit combines its own manufactured smart-farm equipment with components from established Korean and international suppliers, and holds the parts that fail most often in stock.": "Mintaqadagi issiqxona muammolarining aksariyati, ta'minot muammosi: suvga mos kelmaydigan tomchilatgich, kutilganidan boshqacha ishlaydigan substrat, mahalliy sharoitda hech kim ta'mirlay olmaydigan kontroller. Biz o'zimiz o'rnatadigan va o'zimiz qo'llab-quvvatlaydigan uskunani sotamiz, shu sababli spetsifikatsiya halol bo'ladi.\n\nFirmmit o'zi ishlab chiqargan aqlli ferma uskunalarini ishonchli koreys va xalqaro yetkazib beruvchilarning komponentlari bilan birlashtiradi hamda eng ko'p ishdan chiqadigan qismlarni omborda saqlaydi.",
      "Registered Firmmit patents behind our own equipment": "O'z uskunalarimiz asosidagi Firmmit patentlari",
      "KR": "KR",
      "Direct supply chain from the Korean head office and its partners": "Koreyadagi bosh ofis va uning sheriklaridan to'g'ridan-to'g'ri ta'minot zanjiri",
      "24/7": "24/7",
      "Technical support and spare parts held locally": "Texnik qo'llab-quvvatlash va joyida saqlanadigan ehtiyot qismlar",
      "What we supply": "Biz nimani yetkazamiz",
      "Six supply categories": "Oltita ta'minot yo'nalishi",
      "Structures & covering": "Konstruksiya va qoplama",
      "Frames, profiles, polycarbonate and film, sealing and ventilation hardware for new builds and re-covering.": "Karkas, profil, polikarbonat va plyonka, germetiklash hamda shamollatish qismlari, yangi qurilish va qayta qoplash uchun.",
      "Irrigation & fertigation": "Sug'orish va fertigatsiya",
      "Pumps, filters, dosing units, drip lines and emitters selected against your water analysis.": "Nasoslar, filtrlar, dozalash qurilmalari, tomchilatuvchi liniyalar va emitterlar, suv tahlilingizga moslab tanlanadi.",
      "Climate control & IoT": "Iqlim nazorati va IoT",
      "Controllers, sensors, screens, heating and ventilation equipment, with dashboards for remote monitoring.": "Kontrollerlar, sensorlar, ekranlar, isitish va shamollatish uskunalari hamda masofadan kuzatish paneli.",
      "Substrates & growing media": "Substrat va o'stirish muhiti",
      "Coco substrate, slabs, pots and trays matched to the crop, the system and the irrigation strategy.": "Kokos substrati, matlar, idish va kassetalar, ekin turi, tizim va sug'orish strategiyasiga moslab.",
      "Crop support & consumables": "Ekin tayanchi va sarf materiallari",
      "Trellising, clips, nets, protective materials and the season consumables a facility goes through.": "Shpaler, qisqichlar, to'rlar, himoya materiallari va mavsum davomida sarflanadigan materiallar.",
      "Spare parts & service": "Ehtiyot qismlar va servis",
      "Genuine spare parts held in stock, with technicians who can be on site rather than only on the phone.": "Omborda saqlanadigan original ehtiyot qismlar va telefon orqali emas, joyiga yetib boradigan texniklar.",
      "From enquiry to installed": "So'rovdan o'rnatishgacha",
      "Specification": "Spetsifikatsiya",
      "We review your facility, crop and water analysis and specify what actually fits.": "Obyektingiz, ekin turi va suv tahlilini ko'rib chiqib, aynan mos keladigan yechimni belgilaymiz.",
      "Quotation": "Taklif (invoys)",
      "An itemised quotation with lead times, warranty terms and delivery conditions.": "Yetkazib berish muddati, kafolat va yetkazish shartlari ko'rsatilgan bandma-band taklif.",
      "Supply & logistics": "Ta'minot va logistika",
      "Import, customs and delivery handled through established Korea–Uzbekistan routes.": "Import, bojxona va yetkazib berish Koreya–O'zbekiston yo'nalishlari orqali amalga oshiriladi.",
      "Install & support": "Montaj va qo'llab-quvvatlash",
      "Installation, commissioning and ongoing access to spare parts and technicians.": "O'rnatish, ishga tushirish hamda ehtiyot qism va texniklarga doimiy kirish imkoni.",
      "Online store": "Onlayn do'kon",
      "Browse what is in stock.": "Omborda nima borligini ko'ring.",
      "Our catalogue lists agricultural materials and greenhouse components with specifications and current availability. For bulk orders or items not listed, our team will quote directly.": "Katalogimizda qishloq xo'jaligi materiallari va issiqxona komponentlari spetsifikatsiyasi hamda joriy mavjudligi bilan keltirilgan. Katta hajmdagi buyurtma yoki ro'yxatda yo'q mahsulot uchun jamoamiz to'g'ridan-to'g'ri taklif beradi.",
      "Open the catalogue": "Katalogni ochish",
      "Need a quotation?": "Taklif kerakmi?",
      "Send us your list or your facility details and we will come back with specifications, prices and lead times.": "Ro'yxatingizni yoki obyekt ma'lumotlarini yuboring, spetsifikatsiya, narx va muddat bilan javob beramiz.",
      "Request a quotation": "Taklif so'rash",
      "Business line 04": "Yo'nalish 04",
      "Agronomy that turns a facility into a harvest.": "Obyektni hosilga aylantiradigan agronomiya.",
      "Equipment does not grow fruit, decisions do. Our agronomists build the nutrition, climate and crop programme for your facility, train your team and stay with them through the season.": "Meva uskuna emas, qarorlar tufayli yetishadi. Agronomlarimiz obyektingiz uchun oziqlantirish, iqlim va ekin dasturini tuzadi, jamoangizni o'qitadi va mavsum davomida yonida bo'ladi.",
      "A programme that works in Korea cannot be copied into Uzbekistan unchanged. Water chemistry, light, summer heat and winter heating costs are different, and the nutrient recipe has to be rebuilt around them. We start from your water analysis and your facility's real capabilities, then write a programme your team can actually run, and we train them to run it, in their own language.": "Koreyada ishlaydigan dasturni O'zbekistonga o'zgartirmasdan ko'chirib bo'lmaydi. Suv kimyosi, yorug'lik, yozgi issiq va qishki isitish xarajati boshqacha, oziqlantirish retsepti shularga qarab qaytadan tuzilishi kerak.\n\nBiz suv tahlilingiz va obyektingizning haqiqiy imkoniyatlaridan boshlaymiz, so'ng jamoangiz amalda bajara oladigan dastur yozamiz, va uni o'z tillarida bajarishga o'rgatamiz.",
      "Hands-on training at the Firmmit AKIS Smart Farm, Yuqori Chirchiq": "Yuqori Chirchiqdagi Firmmit AKIS Smart Farmda amaliy o'quv",
      "Working languages: Uzbek, Russian, Korean and English": "Ish tillari: o'zbek, rus, koreys va ingliz",
      "Season": "Mavsum",
      "Supervision that continues through the whole growing cycle": "Butun yetishtirish sikli davomida davom etadigan nazorat",
      "The consulting programme": "Konsalting dasturi",
      "Crop & variety selection": "Ekin va nav tanlash",
      "Which crop and cultivar suit your facility, your market window and your team's experience.": "Obyektingizga, bozor davringizga va jamoangiz tajribasiga qaysi ekin va nav mos kelishi aniqlanadi.",
      "Water & nutrition programme": "Suv va oziqlantirish dasturi",
      "A fertigation recipe built on your own water analysis, with EC and pH targets by growth stage.": "O'z suv tahlilingiz asosidagi fertigatsiya retsepti, o'sish bosqichlari bo'yicha EC va pH ko'rsatkichlari bilan.",
      "Climate strategy": "Iqlim strategiyasi",
      "Temperature, humidity and ventilation settings by season, balanced against heating and cooling cost.": "Mavsumlar bo'yicha harorat, namlik va shamollatish sozlamalari, isitish va sovutish xarajati bilan muvozanatlangan.",
      "Grower training": "Fermerlarni o'qitish",
      "Practical training for operators and agronomists, delivered on site and at our AKIS facility.": "Operator va agronomlar uchun amaliy o'quv, obyektda hamda AKIS bazamizda.",
      "Season supervision": "Mavsumiy nazorat",
      "Regular visits and remote review of your data, with corrections made while they still matter.": "Muntazam tashriflar va ma'lumotlaringizni masofadan tahlil qilish, tuzatishlar hali foyda beradigan paytda kiritiladi.",
      "Yield & quality review": "Hosil va sifat tahlili",
      "An end-of-season analysis of yield, fruit quality and cost per kilogram, feeding into the next cycle.": "Mavsum yakunida hosil, meva sifati va bir kilogramm tannarxi tahlil qilinadi va keyingi siklga asos bo'ladi.",
      "A season, planned": "Rejalashtirilgan mavsum",
      "Diagnosis": "Diagnostika",
      "Facility audit, water and substrate analysis and a review of last season's results.": "Obyekt auditi, suv va substrat tahlili hamda o'tgan mavsum natijalarini ko'rib chiqish.",
      "Programme design": "Dastur tuzish",
      "A written nutrition, climate and crop-work plan for the coming cycle.": "Kelgusi sikl uchun yozma oziqlantirish, iqlim va ekin ishlari rejasi.",
      "Your team is trained on the programme and on reading the facility's own data.": "Jamoangiz dastur bo'yicha va obyektning o'z ma'lumotlarini o'qish bo'yicha o'qitiladi.",
      "Supervision": "Nazorat",
      "Scheduled visits and remote support through the season, with a closing review.": "Mavsum davomida rejali tashriflar va masofaviy qo'llab-quvvatlash, yakuniy tahlil bilan.",
      "Who it is for": "Kimlar uchun",
      "New growers and established farms alike.": "Yangi boshlovchilar uchun ham, tajribali fermerlar uchun ham.",
      "✓ First-time growers starting a new greenhouse": "✓ Yangi issiqxona ochayotgan birinchi marta yetishtiruvchilar",
      "✓ Farms whose yield or fruit quality has stopped improving": "✓ Hosildorligi yoki meva sifati o'smay qolgan xo'jaliklar",
      "✓ Facilities switching crop or cultivar": "✓ Ekin yoki navni o'zgartirayotgan obyektlar",
      "✓ Teams that need training in Uzbek or Russian, not just manuals": "✓ Qo'llanma emas, o'zbek yoki rus tilida o'quv kerak bo'lgan jamoalar",
      "✓ Investors who need an independent assessment before committing": "✓ Qaror qabul qilishdan oldin mustaqil baho kerak bo'lgan investorlar",
      "Want a second opinion on your season?": "Mavsumingizga ikkinchi fikr kerakmi?",
      "Send us your water analysis and current results and we will tell you where the gains are.": "Suv tahlilingiz va joriy natijalaringizni yuboring, o'sish imkoniyati qayerdaligini aytamiz.",
      "Talk to an agronomist": "Agronom bilan bog'lanish",
      "Business line 05": "Yo'nalish 05",
      "Fresh strawberries, from our greenhouses to the market.": "Yangi qulupnay, issiqxonamizdan bozorgacha.",
      "Greenhouse-grown fruit, graded and packed under a controlled cold chain, supplied to the domestic market and prepared for export to buyers across the region.": "Issiqxonada yetishtirilgan, nazorat ostidagi sovuq zanjirda saralangan va qadoqlangan meva, ichki bozorga yetkaziladi va mintaqa xaridorlariga eksportga tayyorlanadi.",
      "Strawberry is a fruit that punishes every gap in the chain. Firmmit controls that chain from its own greenhouses, harvest timing, grading, packing and temperature, so the fruit that reaches a shelf still looks and tastes the way it did at picking. Domestic supply runs through the season from our facilities in the Tashkent region. The first export shipments are scheduled for September 2026.": "Qulupnay zanjirdagi har bir uzilishni darhol ko'rsatadigan meva. Firmmit bu zanjirni o'z issiqxonalaridan boshlab nazorat qiladi, uzish vaqti, saralash, qadoqlash va harorat, shu sababli javonga yetib borgan meva uzilgan paytdagidek ko'rinadi va ta'm beradi.\n\nIchki bozorga yetkazib berish mavsum davomida Toshkent viloyatidagi obyektlarimizdan olib boriladi. Birinchi eksport jo'natmalari 2026-yil sentabr oyiga rejalashtirilgan.",
      "Our principal cultivar, aromatic, sweet and firm enough to travel": "Asosiy navimiz, xushbo'y, shirin va tashishga chidamli",
      "2026.09": "2026.09",
      "First export shipments scheduled": "Birinchi eksport jo'natmalari rejalashtirilgan",
      "Cold chain": "Sovuq zanjir",
      "Temperature controlled from harvest through to delivery": "Uzishdan yetkazishgacha harorat nazorati",
      "From row to buyer": "Qatordan xaridorgacha",
      "Greenhouse-grown supply": "Issiqxona hosili",
      "Fruit from our own climate-controlled facilities, harvested to a plan rather than to whatever ripens.": "Iqlimi boshqariladigan o'z obyektlarimiz mevasi, tasodifan pishganiga emas, rejaga muvofiq uziladi.",
      "Grading & packing": "Saralash va qadoqlash",
      "Sorted by size and quality and packed in punnets or trays to the buyer's specification.": "O'lcham va sifat bo'yicha saralanadi hamda xaridor talabiga ko'ra konteyner yoki lotoklarga qadoqlanadi.",
      "Pre-cooling after harvest and temperature-controlled storage and transport all the way to delivery.": "Uzishdan so'ng oldindan sovutish, keyin yetkazishgacha harorat nazoratidagi saqlash va tashish.",
      "Domestic distribution": "Ichki bozor taqsimoti",
      "Regular supply to retail, HoReCa and wholesale buyers, with volumes agreed before the season.": "Chakana savdo, HoReCa va ulgurji xaridorlarga muntazam yetkazib berish, hajm mavsumdan oldin kelishiladi.",
      "Export sales": "Eksport savdosi",
      "Export documentation, phytosanitary certification and freight arranged for regional buyers.": "Mintaqa xaridorlari uchun eksport hujjatlari, fitosanitar sertifikatlash va tashish tashkil etiladi.",
      "Contract growing": "Shartnoma asosida yetishtirish",
      "Agreed volumes and quality standards fixed ahead of the season, for buyers who need certainty.": "Aniqlik kerak bo'lgan xaridorlar uchun hajm va sifat standartlari mavsumdan oldin shartnomada belgilanadi.",
      "Four stages, one temperature": "To'rt bosqich, yagona harorat",
      "Volume planning": "Hajmni rejalashtirish",
      "Volumes, grades and delivery windows agreed with the buyer before the season starts.": "Hajm, tovar navi va yetkazish muddatlari mavsum boshlanishidan oldin xaridor bilan kelishiladi.",
      "Harvest & grading": "Uzish va saralash",
      "Picked at the right stage and graded the same day, not the next morning.": "Kerakli pishish bosqichida uziladi va ertasiga emas, o'sha kuniyoq saralanadi.",
      "Packing & cooling": "Qadoqlash va sovutish",
      "Packed to specification and pre-cooled, then held at a controlled temperature.": "Talabga muvofiq qadoqlanadi, oldindan sovutiladi va nazorat ostidagi haroratda saqlanadi.",
      "Delivery or export": "Yetkazish yoki eksport",
      "Delivered domestically, or shipped with full documentation for export.": "Ichki bozorga yetkaziladi yoki to'liq hujjat bilan eksportga jo'natiladi.",
      "For buyers": "Xaridorlar uchun",
      "What you can rely on.": "Nimaga tayanish mumkin.",
      "✓ A single grower behind the fruit, not a mixed-origin consignment": "✓ Meva ortida bitta yetishtiruvchi, aralash kelib chiqishli partiya emas",
      "✓ Consistent cultivar, grade and packing across deliveries": "✓ Barcha yetkazishlarda bir xil nav, tovar navi va qadoqlash",
      "✓ Cold chain maintained from harvest to hand-over": "✓ Uzishdan topshirishgacha uzluksiz sovuq zanjir",
      "✓ Documentation prepared for domestic trade and for export": "✓ Ichki savdo va eksport uchun hujjatlar tayyorlanadi",
      "✓ Volumes and prices agreed ahead of the season": "✓ Hajm va narxlar mavsumdan oldin kelishiladi",
      "Discuss supply": "Yetkazib berishni muhokama qilish",
      "Looking for a reliable strawberry supplier?": "Ishonchli qulupnay yetkazib beruvchi qidiryapsizmi?",
      "Tell us your volumes, packaging and delivery schedule and we will prepare an offer.": "Hajm, qadoqlash va yetkazish jadvalini yuboring, taklif tayyorlaymiz.",
      "Contact our trade team": "Savdo jamoasi bilan bog'lanish"
    },
    ko: {
      "Five business lines that cover the full cycle, from the first seedling to the harvest reaching its market.": "첫 묘목부터 시장에 도착하는 수확물까지, 전 주기를 아우르는 5개 사업 부문.",
      "Seed & Seedling Supply": "종자·묘 공급",
      "Certified, disease-screened strawberry seedlings propagated at our own nursery and delivered ready to plant.": "자체 육묘장에서 길러낸 병해 검정 완료 인증 딸기묘를 정식 가능한 상태로 공급합니다.",
      "Greenhouse Construction & Reconstruction": "온실 신축 및 리모델링",
      "Turnkey new builds and the reconstruction of existing greenhouses into modern, climate-controlled facilities.": "턴키 방식 신축과 기존 온실의 현대식 환경제어 시설로의 리모델링.",
      "Agricultural Machinery & Materials": "농기계·농자재 판매",
      "Supply of greenhouse equipment, irrigation components, substrates and growing materials from verified manufacturers.": "검증된 제조사의 온실 설비, 관수 부품, 배지 및 재배 자재를 공급합니다.",
      "Cultivation Consulting": "재배 컨설팅",
      "Agronomy programmes, grower training and season-long technical supervision from Korean and local specialists.": "한국 및 현지 전문가의 재배 프로그램, 농가 교육, 작기 전반 기술 지도.",
      "Strawberry Trade": "딸기 유통",
      "Fresh strawberry supply for the domestic market and export sales to buyers across the region.": "내수 시장 신선 딸기 공급 및 역내 바이어 대상 수출 판매.",
      "Business line 01": "사업 부문 01",
      "Strawberry seedlings you can plant with confidence.": "믿고 심을 수 있는 딸기묘.",
      "Every harvest starts with the plant. Firmmit propagates certified, disease-screened strawberry seedlings at its own nursery in the Tashkent region and delivers them ready for the field or the greenhouse.": "모든 수확은 묘에서 시작됩니다. Firmmit은 타슈켄트주 자체 육묘장에서 병해 검정을 마친 인증 딸기묘를 생산해, 노지나 온실에 바로 정식할 수 있는 상태로 공급합니다.",
      "Overview": "개요",
      "A weak seedling cannot be corrected later in the season. That is why we control the whole propagation chain ourselves, from registered mother stock through rooting, screening and cold-chain delivery, instead of buying in plants of unknown origin. Growers receive uniform plants with strong crowns, a documented variety and a phytosanitary certificate for every batch, so the season starts from a known baseline rather than a guess.": "부실한 묘는 작기 중간에 되돌릴 수 없습니다. 그래서 출처가 불분명한 묘를 사들이는 대신, 등록 모주에서 발근·검정·콜드체인 배송까지 육묘 전 과정을 직접 관리합니다.\n\n농가는 관부가 튼튼하고 균일한 묘, 문서화된 품종, 로트별 식물검역증을 함께 받습니다. 추측이 아니라 확인된 기준에서 작기를 시작하는 것입니다.",
      "Seolhyang": "설향",
      "Korean premium cultivar, the backbone of our propagation programme": "한국 프리미엄 품종, 육묘 프로그램의 중심",
      "AKIS": "AKIS",
      "Our own nursery at the Firmmit AKIS Smart Farm, Yuqori Chirchiq": "유코리 치르치크 Firmmit AKIS 스마트팜 내 자체 육묘장",
      "Certified": "인증",
      "Screened plants with phytosanitary documentation per batch": "검정을 마친 묘, 로트별 식물검역 서류 구비",
      "Inside the seedling programme": "육묘 프로그램 구성",
      "Registered mother stock": "등록 모주",
      "We propagate from registered mother plants of Korean cultivars, so every order starts from a known and stable genetic base.": "한국 품종의 등록 모주에서 증식하므로, 모든 주문이 확인된 안정적 유전 기반에서 출발합니다.",
      "Disease screening": "병해 검정",
      "Plants are inspected and screened for the main strawberry pathogens and viruses before they leave the nursery.": "육묘장 출하 전 딸기 주요 병원균과 바이러스에 대한 검사와 검정을 거칩니다.",
      "Controlled propagation": "환경제어 육묘",
      "Runners are rooted under a documented climate and feeding programme, producing uniform plants with balanced roots.": "런너는 문서화된 환경·양액 프로그램에 따라 발근되어, 뿌리 균형이 좋은 균일한 묘가 됩니다.",
      "Cold-chain delivery": "콜드체인 배송",
      "Seedlings are packed and transported under temperature control so they arrive anywhere in Uzbekistan in planting condition.": "온도 관리 하에 포장·운송되어 우즈베키스탄 어디든 정식 가능한 상태로 도착합니다.",
      "Planting-window planning": "정식 시기 설계",
      "Propagation is scheduled around your target harvest date, so the plants are ready in the week you actually need them.": "목표 수확일에 맞춰 육묘 일정을 잡아, 실제로 필요한 주에 묘가 준비됩니다.",
      "Establishment follow-up": "활착 관리",
      "An agronomist checks establishment in the first weeks after planting and tunes irrigation and feeding with your team.": "정식 후 초기 몇 주간 작물관리 담당자가 활착 상태를 점검하고, 귀사 인력과 함께 관수·양액을 조정합니다.",
      "How it runs": "진행 방식",
      "Four steps to planted rows": "정식까지 4단계",
      "Order & variety": "주문·품종 결정",
      "We agree cultivar, volume and planting date, then confirm them in a supply contract.": "품종, 수량, 정식일을 협의해 공급계약에 확정합니다.",
      "Propagation": "육묘",
      "Runners are rooted and grown on at our nursery under a documented programme.": "런너를 자체 육묘장에서 문서화된 프로그램에 따라 발근·육성합니다.",
      "Screening": "검정",
      "Each batch is inspected, screened and issued with its phytosanitary documentation.": "로트마다 검사·검정을 거쳐 식물검역 서류를 발급합니다.",
      "Plants arrive on the agreed date and our agronomist supports the planting.": "약정일에 묘가 도착하고, 담당자가 정식 작업을 지원합니다.",
      "Why it matters": "왜 중요한가",
      "A season is decided in its first month.": "작기의 성패는 첫 달에 갈립니다.",
      "✓ Known variety and origin, documented for every batch": "✓ 로트별로 문서화된 품종과 출처",
      "✓ Uniform plants mean a uniform, plannable harvest window": "✓ 균일한 묘 = 예측 가능한 수확 시기",
      "✓ Screened material reduces disease pressure from day one": "✓ 검정된 묘로 초기부터 병해 압력 감소",
      "✓ Local propagation removes long import transit from the chain": "✓ 현지 육묘로 장거리 수입 운송 단계 제거",
      "✓ Agronomic support continues after the plants are in the ground": "✓ 정식 이후에도 재배 지원 지속",
      "Request seedling pricing": "묘 단가 문의",
      "Planning your next planting?": "다음 정식을 계획 중이십니까?",
      "Tell us your area, cultivar and target harvest date and we will confirm volumes and a delivery window.": "면적·품종·목표 수확일을 알려주시면 수량과 납기를 확정해 드립니다.",
      "Talk to our nursery team": "육묘 담당자와 상담",
      "Business line 02": "사업 부문 02",
      "New greenhouses, and new life for existing ones.": "새 온실, 그리고 기존 온실의 재탄생.",
      "We build climate-controlled greenhouses from the ground up and reconstruct older facilities into modern, productive ones, with one contract, one schedule and one accountable partner.": "환경제어 온실을 처음부터 시공하고, 노후 시설을 현대식 고생산 온실로 리모델링합니다. 하나의 계약, 하나의 공정표, 하나의 책임 파트너로 진행합니다.",
      "Regions with reconstruction projects: Bukhara, Sirdaryo, Samarkand": "리모델링 진행 지역: 부하라, 시르다리아, 사마르칸트",
      "A greenhouse is not a building with plants inside it. Structure, covering, climate control, irrigation and the growing system have to be designed as one, against a specific crop and a specific location, Central Asian summers, cold winters and limited water. Firmmit designs, supplies and installs that whole package. Where a facility already exists, reconstruction is usually faster and far cheaper than a new build: the shell stays, and the systems that actually determine yield are replaced.": "온실은 안에 식물이 있는 건물이 아닙니다. 구조, 피복, 환경제어, 관수, 재배 시스템은 특정 작물과 특정 부지, 중앙아시아의 여름, 추운 겨울, 제한된 용수, 를 전제로 하나의 시스템으로 설계되어야 합니다.\n\nFirmmit은 이 전체 패키지를 설계하고 공급하고 시공합니다. 이미 시설이 있는 경우, 리모델링이 신축보다 빠르고 훨씬 저렴한 경우가 많습니다. 골조는 유지하고, 실제로 수량을 좌우하는 설비를 교체하기 때문입니다.",
      "0.5 ha": "0.5 ha",
      "Firmmit AKIS reference greenhouse in Yuqori Chirchiq": "유코리 치르치크 Firmmit AKIS 표준 온실",
      "Turnkey": "턴키",
      "From survey and design through to commissioning and training": "현장 조사·설계부터 시운전·교육까지",
      "The scope we take on": "수행 범위",
      "Site survey & feasibility": "현장 조사·사업성 검토",
      "Soil, water quality, power, access and local climate data are assessed before a single line is drawn.": "도면을 그리기 전에 토양, 수질, 전력, 진입로, 현지 기후 데이터를 먼저 평가합니다.",
      "Structural design": "구조 설계",
      "Span, height, ventilation and glazing are chosen for the crop, the wind and snow loads and the budget.": "경간, 높이, 환기, 피복은 작물과 풍·적설 하중, 예산에 맞춰 결정합니다.",
      "Turnkey construction": "턴키 시공",
      "Foundations, frame, covering and internal systems installed by our own construction team and local partners.": "기초, 골조, 피복, 내부 설비를 자체 시공팀과 현지 협력사가 설치합니다.",
      "Reconstruction & retrofit": "리모델링·설비 교체",
      "Existing greenhouses are re-covered, re-sealed and re-equipped with modern climate, irrigation and growing systems.": "기존 온실을 재피복·기밀 보강하고 현대식 환경제어·관수·재배 설비로 교체합니다.",
      "Climate & irrigation systems": "환경제어·관수 설비",
      "Heating, ventilation, screening, fertigation and sensor networks supplied and integrated as one system.": "난방, 환기, 커튼, 양액, 센서 네트워크를 하나의 시스템으로 공급·통합합니다.",
      "Commissioning & handover": "시운전·인계",
      "Systems are tested under load, settings documented and your operators trained before the facility is handed over.": "인계 전 부하 시험, 설정값 문서화, 운영 인력 교육을 완료합니다.",
      "From empty plot to first crop": "나대지에서 첫 수확까지",
      "Survey & concept": "조사·기본계획",
      "Site visit, water and soil analysis, crop choice and an outline concept with indicative cost.": "현장 방문, 수질·토양 분석, 작목 선정, 개략 공사비를 포함한 기본계획.",
      "Design & budget": "설계·예산",
      "Detailed drawings, equipment specification and a fixed budget agreed in the contract.": "상세 도면, 설비 사양, 계약상 확정 예산.",
      "Build & install": "시공·설치",
      "Construction, equipment delivery and installation to an agreed schedule.": "합의된 공정표에 따른 시공, 설비 납품, 설치.",
      "Commission & train": "시운전·교육",
      "Testing, calibration, operator training and a supported first growing cycle.": "시험, 보정, 운영자 교육, 첫 작기 지원.",
      "Reconstruction": "리모델링",
      "Often the better investment.": "대개 더 유리한 투자입니다.",
      "✓ The existing shell is reused, lower cost than a new build": "✓ 기존 골조 재사용, 신축 대비 비용 절감",
      "✓ Shorter timeline, so production restarts sooner": "✓ 공기 단축, 생산 재개가 빠름",
      "✓ Climate, irrigation and growing systems brought up to modern standard": "✓ 환경제어·관수·재배 설비를 현대 수준으로 개선",
      "✓ Energy and water consumption reduced by design": "✓ 설계 단계에서 에너지·용수 사용량 절감",
      "✓ Staged scope is possible, the facility is upgraded section by section": "✓ 단계별 시공 가능, 구획별로 순차 개선",
      "Request a site assessment": "현장 진단 요청",
      "Building new, or upgrading what you have?": "신축이십니까, 기존 시설 개선이십니까?",
      "Send us the location and area and we will come back with an outline concept and an indicative budget.": "위치와 면적을 보내주시면 기본계획과 개략 예산으로 회신드립니다.",
      "Start a project": "프로젝트 시작",
      "Business line 03": "사업 부문 03",
      "The equipment and materials a greenhouse runs on.": "온실을 돌아가게 하는 설비와 자재.",
      "Structures, irrigation, climate control, substrates and consumables, supplied from verified manufacturers, specified for your facility and backed by spare parts and service on the ground.": "구조재, 관수, 환경제어, 배지, 소모품, 검증된 제조사 제품을 시설에 맞게 사양화하고, 현지 부품·서비스로 뒷받침합니다.",
      "Most greenhouse problems in the region are supply problems: the wrong emitter for the water, a substrate that behaves differently than expected, a controller nobody can service locally. We supply equipment we install and support ourselves, which keeps the specification honest. Firmmit combines its own manufactured smart-farm equipment with components from established Korean and international suppliers, and holds the parts that fail most often in stock.": "이 지역 온실 문제의 상당수는 자재 문제입니다. 수질에 맞지 않는 점적, 예상과 다르게 거동하는 배지, 현지에서 아무도 손볼 수 없는 제어기 같은 것들입니다. 우리는 직접 설치하고 직접 사후관리하는 설비만 공급합니다. 그래서 사양이 정직해집니다.\n\nFirmmit은 자체 제조 스마트팜 설비에 검증된 한국·해외 공급사 부품을 결합하고, 고장이 잦은 부품은 현지에 재고로 보유합니다.",
      "Registered Firmmit patents behind our own equipment": "자체 설비를 뒷받침하는 Firmmit 등록 특허",
      "KR": "KR",
      "Direct supply chain from the Korean head office and its partners": "한국 본사와 협력사로부터의 직공급 체계",
      "24/7": "24/7",
      "Technical support and spare parts held locally": "현지 기술 지원 및 예비 부품 보유",
      "What we supply": "공급 품목",
      "Six supply categories": "6개 공급 분야",
      "Structures & covering": "구조재·피복재",
      "Frames, profiles, polycarbonate and film, sealing and ventilation hardware for new builds and re-covering.": "신축 및 재피복용 골조, 프로파일, 폴리카보네이트·필름, 기밀·환기 부속.",
      "Irrigation & fertigation": "관수·양액",
      "Pumps, filters, dosing units, drip lines and emitters selected against your water analysis.": "수질 분석 결과에 맞춰 선정한 펌프, 여과기, 정량주입기, 점적 라인 및 점적핀.",
      "Climate control & IoT": "환경제어·IoT",
      "Controllers, sensors, screens, heating and ventilation equipment, with dashboards for remote monitoring.": "제어기, 센서, 커튼, 난방·환기 설비 및 원격 모니터링 대시보드.",
      "Substrates & growing media": "배지·재배 매체",
      "Coco substrate, slabs, pots and trays matched to the crop, the system and the irrigation strategy.": "작물, 재배 방식, 관수 전략에 맞춘 코코 배지, 슬래브, 포트, 트레이.",
      "Crop support & consumables": "작물 지지·소모품",
      "Trellising, clips, nets, protective materials and the season consumables a facility goes through.": "유인 자재, 클립, 네트, 보호 자재 및 한 작기에 소요되는 소모품.",
      "Spare parts & service": "예비 부품·서비스",
      "Genuine spare parts held in stock, with technicians who can be on site rather than only on the phone.": "정품 부품 재고와, 전화 응대에 그치지 않고 현장에 나가는 기술 인력.",
      "From enquiry to installed": "문의부터 설치까지",
      "Specification": "사양 검토",
      "We review your facility, crop and water analysis and specify what actually fits.": "시설, 작물, 수질 분석을 검토해 실제로 맞는 사양을 제시합니다.",
      "Quotation": "견적",
      "An itemised quotation with lead times, warranty terms and delivery conditions.": "납기, 보증 조건, 인도 조건을 명시한 항목별 견적.",
      "Supply & logistics": "공급·물류",
      "Import, customs and delivery handled through established Korea–Uzbekistan routes.": "수입, 통관, 배송을 한국–우즈베키스탄 정착 루트로 처리합니다.",
      "Install & support": "설치·지원",
      "Installation, commissioning and ongoing access to spare parts and technicians.": "설치와 시운전, 이후 부품·기술 인력에 대한 상시 지원.",
      "Online store": "온라인 스토어",
      "Browse what is in stock.": "재고 품목을 확인하세요.",
      "Our catalogue lists agricultural materials and greenhouse components with specifications and current availability. For bulk orders or items not listed, our team will quote directly.": "카탈로그에는 농자재와 온실 부품의 사양 및 현재 재고가 표시됩니다. 대량 주문이나 미등록 품목은 담당자가 직접 견적을 드립니다.",
      "Open the catalogue": "카탈로그 열기",
      "Need a quotation?": "견적이 필요하십니까?",
      "Send us your list or your facility details and we will come back with specifications, prices and lead times.": "품목 리스트나 시설 정보를 보내주시면 사양·가격·납기로 회신드립니다.",
      "Request a quotation": "견적 요청",
      "Business line 04": "사업 부문 04",
      "Agronomy that turns a facility into a harvest.": "시설을 수확으로 바꾸는 재배 기술.",
      "Equipment does not grow fruit, decisions do. Our agronomists build the nutrition, climate and crop programme for your facility, train your team and stay with them through the season.": "과실을 키우는 것은 설비가 아니라 판단입니다. 저희 작물관리 담당자가 해당 시설에 맞는 양액·환경·작업 프로그램을 설계하고, 인력을 교육하며, 작기 내내 함께합니다.",
      "A programme that works in Korea cannot be copied into Uzbekistan unchanged. Water chemistry, light, summer heat and winter heating costs are different, and the nutrient recipe has to be rebuilt around them. We start from your water analysis and your facility's real capabilities, then write a programme your team can actually run, and we train them to run it, in their own language.": "한국에서 통하는 프로그램을 우즈베키스탄에 그대로 옮길 수는 없습니다. 수질, 광량, 여름 고온, 겨울 난방비가 다르고, 양액 처방은 그 조건 위에서 다시 짜야 합니다.\n\n저희는 수질 분석과 시설의 실제 성능에서 출발해, 현장 인력이 실제로 실행할 수 있는 프로그램을 작성하고, 그들의 언어로 실행 교육을 진행합니다.",
      "Hands-on training at the Firmmit AKIS Smart Farm, Yuqori Chirchiq": "유코리 치르치크 Firmmit AKIS 스마트팜 현장 실습",
      "Working languages: Uzbek, Russian, Korean and English": "사용 언어: 우즈베크어·러시아어·한국어·영어",
      "Season": "작기",
      "Supervision that continues through the whole growing cycle": "재배 주기 전체에 걸친 지도",
      "The consulting programme": "컨설팅 프로그램",
      "Crop & variety selection": "작목·품종 선정",
      "Which crop and cultivar suit your facility, your market window and your team's experience.": "시설 조건, 출하 시기, 인력 숙련도에 맞는 작목과 품종을 선정합니다.",
      "Water & nutrition programme": "수질·양액 프로그램",
      "A fertigation recipe built on your own water analysis, with EC and pH targets by growth stage.": "자체 수질 분석을 바탕으로 한 양액 처방과 생육 단계별 EC·pH 목표값.",
      "Climate strategy": "환경관리 전략",
      "Temperature, humidity and ventilation settings by season, balanced against heating and cooling cost.": "난방·냉방 비용과 균형을 맞춘 계절별 온도·습도·환기 설정.",
      "Grower training": "재배자 교육",
      "Practical training for operators and agronomists, delivered on site and at our AKIS facility.": "현장과 AKIS 시설에서 진행하는 운영자·작물관리 인력 실무 교육.",
      "Season supervision": "작기 지도",
      "Regular visits and remote review of your data, with corrections made while they still matter.": "정기 방문과 원격 데이터 검토를 통해, 아직 효과가 있을 때 조치합니다.",
      "Yield & quality review": "수량·품질 분석",
      "An end-of-season analysis of yield, fruit quality and cost per kilogram, feeding into the next cycle.": "작기 종료 후 수량, 과실 품질, kg당 원가를 분석해 다음 작기에 반영합니다.",
      "A season, planned": "계획된 한 작기",
      "Diagnosis": "진단",
      "Facility audit, water and substrate analysis and a review of last season's results.": "시설 점검, 수질·배지 분석, 지난 작기 성적 검토.",
      "Programme design": "프로그램 설계",
      "A written nutrition, climate and crop-work plan for the coming cycle.": "다음 작기를 위한 양액·환경·작업 계획서 작성.",
      "Your team is trained on the programme and on reading the facility's own data.": "프로그램 실행과 시설 데이터 해석에 대해 인력을 교육합니다.",
      "Supervision": "지도",
      "Scheduled visits and remote support through the season, with a closing review.": "작기 중 정기 방문과 원격 지원, 종료 시 총평.",
      "Who it is for": "대상",
      "New growers and established farms alike.": "신규 농가와 기존 농가 모두.",
      "✓ First-time growers starting a new greenhouse": "✓ 온실을 처음 시작하는 신규 농가",
      "✓ Farms whose yield or fruit quality has stopped improving": "✓ 수량이나 품질이 더 이상 오르지 않는 농가",
      "✓ Facilities switching crop or cultivar": "✓ 작목이나 품종을 전환하는 시설",
      "✓ Teams that need training in Uzbek or Russian, not just manuals": "✓ 매뉴얼이 아니라 우즈베크어·러시아어 교육이 필요한 인력",
      "✓ Investors who need an independent assessment before committing": "✓ 투자 결정 전 독립적 평가가 필요한 투자자",
      "Want a second opinion on your season?": "이번 작기에 대한 제3자 의견이 필요하십니까?",
      "Send us your water analysis and current results and we will tell you where the gains are.": "수질 분석과 현재 성적을 보내주시면 개선 여지가 어디에 있는지 알려드립니다.",
      "Talk to an agronomist": "작물관리 담당자와 상담",
      "Business line 05": "사업 부문 05",
      "Fresh strawberries, from our greenhouses to the market.": "우리 온실에서 시장까지, 신선한 딸기.",
      "Greenhouse-grown fruit, graded and packed under a controlled cold chain, supplied to the domestic market and prepared for export to buyers across the region.": "온실에서 수확해 콜드체인 관리 하에 선별·포장한 과실을 내수 시장에 공급하고, 역내 바이어 수출을 준비합니다.",
      "Strawberry is a fruit that punishes every gap in the chain. Firmmit controls that chain from its own greenhouses, harvest timing, grading, packing and temperature, so the fruit that reaches a shelf still looks and tastes the way it did at picking. Domestic supply runs through the season from our facilities in the Tashkent region. The first export shipments are scheduled for September 2026.": "딸기는 유통 과정의 빈틈이 그대로 드러나는 작물입니다. Firmmit은 자체 온실에서부터 수확 시점, 선별, 포장, 온도까지 그 사슬을 직접 관리합니다. 그래서 매대에 오른 과실이 수확 당시의 모양과 맛을 유지합니다.\n\n내수 공급은 타슈켄트주 시설에서 작기 내내 이루어집니다. 첫 수출 선적은 2026년 9월 예정입니다.",
      "Our principal cultivar, aromatic, sweet and firm enough to travel": "주력 품종, 향이 좋고 당도가 높으며 수송성이 우수",
      "2026.09": "2026.09",
      "First export shipments scheduled": "첫 수출 선적 예정",
      "Cold chain": "콜드체인",
      "Temperature controlled from harvest through to delivery": "수확부터 납품까지 온도 관리",
      "From row to buyer": "재배 베드에서 바이어까지",
      "Greenhouse-grown supply": "온실 재배 물량",
      "Fruit from our own climate-controlled facilities, harvested to a plan rather than to whatever ripens.": "환경제어 자체 시설에서 생산한 과실을, 익는 대로가 아니라 계획에 따라 수확합니다.",
      "Grading & packing": "선별·포장",
      "Sorted by size and quality and packed in punnets or trays to the buyer's specification.": "크기와 품질로 선별해 바이어 사양에 맞춰 용기 또는 트레이에 포장합니다.",
      "Pre-cooling after harvest and temperature-controlled storage and transport all the way to delivery.": "수확 후 예냉, 이후 납품까지 온도 관리 하의 보관과 운송.",
      "Domestic distribution": "내수 유통",
      "Regular supply to retail, HoReCa and wholesale buyers, with volumes agreed before the season.": "작기 전 물량을 확정해 소매, 외식업, 도매 바이어에 정기 공급합니다.",
      "Export sales": "수출 판매",
      "Export documentation, phytosanitary certification and freight arranged for regional buyers.": "역내 바이어를 위한 수출 서류, 식물검역, 운송을 준비합니다.",
      "Contract growing": "계약 재배",
      "Agreed volumes and quality standards fixed ahead of the season, for buyers who need certainty.": "확실성이 필요한 바이어를 위해 작기 전에 물량과 품질 기준을 확정합니다.",
      "Four stages, one temperature": "네 단계, 하나의 온도",
      "Volume planning": "물량 계획",
      "Volumes, grades and delivery windows agreed with the buyer before the season starts.": "작기 시작 전 바이어와 물량, 등급, 납품 시기를 합의합니다.",
      "Harvest & grading": "수확·선별",
      "Picked at the right stage and graded the same day, not the next morning.": "적정 숙도에 수확해 다음 날이 아닌 당일 선별합니다.",
      "Packing & cooling": "포장·예냉",
      "Packed to specification and pre-cooled, then held at a controlled temperature.": "사양에 맞게 포장 후 예냉하고 관리 온도에서 보관합니다.",
      "Delivery or export": "납품 또는 수출",
      "Delivered domestically, or shipped with full documentation for export.": "내수 납품하거나, 수출 서류를 갖춰 선적합니다.",
      "For buyers": "바이어 안내",
      "What you can rely on.": "믿고 맡기실 수 있는 부분.",
      "✓ A single grower behind the fruit, not a mixed-origin consignment": "✓ 출처가 섞인 물량이 아닌 단일 생산자 물량",
      "✓ Consistent cultivar, grade and packing across deliveries": "✓ 납품마다 동일한 품종·등급·포장",
      "✓ Cold chain maintained from harvest to hand-over": "✓ 수확부터 인도까지 콜드체인 유지",
      "✓ Documentation prepared for domestic trade and for export": "✓ 내수 거래용·수출용 서류 모두 준비",
      "✓ Volumes and prices agreed ahead of the season": "✓ 작기 전 물량과 단가 합의",
      "Discuss supply": "공급 상담",
      "Looking for a reliable strawberry supplier?": "믿을 수 있는 딸기 공급처를 찾고 계십니까?",
      "Tell us your volumes, packaging and delivery schedule and we will prepare an offer.": "물량, 포장, 납품 일정을 알려주시면 제안서를 준비하겠습니다.",
      "Contact our trade team": "유통 담당자와 상담"
    },
  };


  /* ---- Completed projects (services.html) ---- */
  var TXT_PJ = {
    ru: {
      "Completed projects": "Реализованные проекты",
      "Greenhouses we have designed, supplied and built, with the specification and the actual construction cost of each facility.": "Теплицы, которые мы спроектировали, укомплектовали и построили, со спецификацией и фактической стоимостью строительства каждого объекта.",
      "All": "Все",
      "Venlo": "Venlo",
      "Arch type": "Арочные",
      "Glass": "Стеклянные",
      "Reconstruction": "Реконструкция",
      "Specifications": "Характеристики",
      "Facility area": "Площадь объекта",
      "Structure": "Конструкция",
      "Main materials": "Основные материалы",
      "Covering": "Покрытие",
      "Screens": "Экраны",
      "Control & machine room": "Операторская и машинный зал",
      "Construction cost": "Стоимость строительства",
      "All amounts exclude VAT and are converted at 1,400 KRW = 1 USD. Final cost depends on site conditions, logistics and the equipment package.": "Все суммы указаны без НДС и пересчитаны по курсу 1 400 KRW = 1 USD. Итоговая стоимость зависит от условий площадки, логистики и комплектации оборудованием.",
      "Ongjin glass greenhouse": "Стеклянная теплица Онджин",
      "11-span / side height 6 m": "11 пролётов / высота борта 6 м",
      "Roof 4 mm tempered glass + side 16 mm twin-wall PC": "Кровля 4 мм закалённое стекло + борт 16 мм сотовый поликарбонат",
      "Shading + thermal screen": "Затеняющий + термоэкран",
      "Sandwich panel 100T, fire-retardant": "Сэндвич-панель 100T, огнестойкая",
      "Yangpyeong smart greenhouse": "Умная теплица Янпхён",
      "9-span Venlo / side height 6 m": "9 пролётов Venlo / высота борта 6 м",
      "PO film": "PO-плёнка",
      "Diffusion + shading + thermal screen": "Рассеивающий + затеняющий + термоэкран",
      "Cheonan smart greenhouse": "Умная теплица Чхонан",
      "3-span Venlo / side height 6 m": "3 пролёта Venlo / высота борта 6 м",
      "Roof PO film + side 16 mm PC": "Кровля PO-плёнка + борт 16 мм поликарбонат",
      "Large-scale smart greenhouse": "Крупная умная теплица",
      "Yeongdong smart greenhouse": "Умная теплица Ёндон",
      "7-span Venlo / side height 6 m": "7 пролётов Venlo / высота борта 6 м",
      "Sejong glass greenhouse": "Стеклянная теплица Сечжон",
      "single-span / side height 10 m": "Однопролётная / высота борта 10 м",
      "Roof 4 mm tempered glass + side 16 mm PC": "Кровля 4 мм закалённое стекло + борт 16 мм поликарбонат",
      "Hwasun smart greenhouse": "Умная теплица Хвасун",
      "3-span arch / side height 3.5 m": "3 пролёта арочные / высота борта 3,5 м",
      "Dongcheonan smart greenhouse": "Умная теплица Тончхонан",
      "6-span arch / side height 3.5 m": "6 пролётов арочные / высота борта 3,5 м",
      "Shading + aluminium + thermal screen": "Затеняющий + алюминиевый + термоэкран",
      "Reconstruction cost: the existing frame is retained, structural reinforcement, new covering and screens, and sandwich-panel works.": "Стоимость реконструкции: существующий каркас сохраняется, усиление конструкции, новое покрытие и экраны, работы по сэндвич-панелям.",
      "Jincheon smart greenhouse": "Умная теплица Чинчхон",
      "3-span arch / side height 6 m": "3 пролёта арочные / высота борта 6 м",
      "Firmmit Land": "Firmmit Land",
      "single-span Venlo / side height 5 m": "Однопролётная Venlo / высота борта 5 м",
      "Sky-glass 16t": "Sky-glass 16t"
    },
    uz: {
      "Completed projects": "Yakunlangan loyihalar",
      "Greenhouses we have designed, supplied and built, with the specification and the actual construction cost of each facility.": "Biz loyihalagan, jihozlagan va qurgan issiqxonalar, har bir obyektning spetsifikatsiyasi va haqiqiy qurilish qiymati bilan.",
      "All": "Hammasi",
      "Venlo": "Venlo",
      "Arch type": "Arch tipi",
      "Glass": "Shisha",
      "Reconstruction": "Rekonstruksiya",
      "Specifications": "Spetsifikatsiya",
      "Facility area": "Obyekt maydoni",
      "Structure": "Konstruksiya",
      "Main materials": "Asosiy materiallar",
      "Covering": "Qoplama",
      "Screens": "Ekranlar",
      "Control & machine room": "Boshqaruv va mashina xonasi",
      "Construction cost": "Qurilish qiymati",
      "All amounts exclude VAT and are converted at 1,400 KRW = 1 USD. Final cost depends on site conditions, logistics and the equipment package.": "Barcha summalar QQSsiz va 1 400 KRW = 1 USD kursi bo'yicha hisoblangan. Yakuniy qiymat maydon sharoiti, logistika va uskunalar to'plamiga bog'liq.",
      "Ongjin glass greenhouse": "Ongjin shisha issiqxonasi",
      "11-span / side height 6 m": "11 oraliq / yon balandlik 6 m",
      "Roof 4 mm tempered glass + side 16 mm twin-wall PC": "Tom 4 mm chiniqtirilgan shisha + yon 16 mm ikki qavatli PC",
      "Shading + thermal screen": "Soyalash + issiqlik ekrani",
      "Sandwich panel 100T, fire-retardant": "Sendvich-panel 100T, yonishga chidamli",
      "Yangpyeong smart greenhouse": "Yangpyeong aqlli issiqxonasi",
      "9-span Venlo / side height 6 m": "9 oraliq Venlo / yon balandlik 6 m",
      "PO film": "PO plyonka",
      "Diffusion + shading + thermal screen": "Diffuziya + soyalash + issiqlik ekrani",
      "Cheonan smart greenhouse": "Cheonan aqlli issiqxonasi",
      "3-span Venlo / side height 6 m": "3 oraliq Venlo / yon balandlik 6 m",
      "Roof PO film + side 16 mm PC": "Tom PO plyonka + yon 16 mm PC",
      "Large-scale smart greenhouse": "Yirik aqlli issiqxona",
      "Yeongdong smart greenhouse": "Yeongdong aqlli issiqxonasi",
      "7-span Venlo / side height 6 m": "7 oraliq Venlo / yon balandlik 6 m",
      "Sejong glass greenhouse": "Sejong shisha issiqxonasi",
      "single-span / side height 10 m": "Bir oraliq / yon balandlik 10 m",
      "Roof 4 mm tempered glass + side 16 mm PC": "Tom 4 mm chiniqtirilgan shisha + yon 16 mm PC",
      "Hwasun smart greenhouse": "Hwasun aqlli issiqxonasi",
      "3-span arch / side height 3.5 m": "3 oraliq arch / yon balandlik 3,5 m",
      "Dongcheonan smart greenhouse": "Dongcheonan aqlli issiqxonasi",
      "6-span arch / side height 3.5 m": "6 oraliq arch / yon balandlik 3,5 m",
      "Shading + aluminium + thermal screen": "Soyalash + alyuminiy + issiqlik ekrani",
      "Reconstruction cost: the existing frame is retained, structural reinforcement, new covering and screens, and sandwich-panel works.": "Rekonstruksiya qiymati: mavjud karkas saqlanadi, konstruksiyani mustahkamlash, yangi qoplama va ekranlar hamda sendvich-panel ishlari.",
      "Jincheon smart greenhouse": "Jincheon aqlli issiqxonasi",
      "3-span arch / side height 6 m": "3 oraliq arch / yon balandlik 6 m",
      "Firmmit Land": "Firmmit Land",
      "single-span Venlo / side height 5 m": "Bir oraliq Venlo / yon balandlik 5 m",
      "Sky-glass 16t": "Sky-glass 16t"
    },
    ko: {
      "Completed projects": "시공 실적",
      "Greenhouses we have designed, supplied and built, with the specification and the actual construction cost of each facility.": "직접 설계·공급·시공한 온실입니다. 각 시설의 사양과 실제 시공비를 함께 공개합니다.",
      "All": "전체",
      "Venlo": "벤로형",
      "Arch type": "아치형",
      "Glass": "유리온실",
      "Reconstruction": "리모델링",
      "Specifications": "사양 보기",
      "Facility area": "시설면적",
      "Structure": "온실형태",
      "Main materials": "주요자재사양",
      "Covering": "피복",
      "Screens": "스크린",
      "Control & machine room": "관리실·기계실",
      "Construction cost": "시공비",
      "All amounts exclude VAT and are converted at 1,400 KRW = 1 USD. Final cost depends on site conditions, logistics and the equipment package.": "모든 금액은 VAT 별도이며 1,400원 = 1달러 기준으로 환산했습니다. 최종 금액은 현장 여건, 물류, 설비 구성에 따라 달라집니다.",
      "Ongjin glass greenhouse": "옹진 유리온실",
      "11-span / side height 6 m": "11연동 / 측고 6m",
      "Roof 4 mm tempered glass + side 16 mm twin-wall PC": "지붕 4mm 강화유리 + 측면 16mm 복층PC",
      "Shading + thermal screen": "차광 + 보온스크린",
      "Sandwich panel 100T, fire-retardant": "샌드위치판넬 100T, 난연",
      "Yangpyeong smart greenhouse": "양평 스마트온실",
      "9-span Venlo / side height 6 m": "9연동 벤로형 / 측고 6m",
      "PO film": "PO필름",
      "Diffusion + shading + thermal screen": "산란 + 차광 + 보온스크린",
      "Cheonan smart greenhouse": "천안 스마트온실",
      "3-span Venlo / side height 6 m": "3연동 벤로형 / 측고 6m",
      "Roof PO film + side 16 mm PC": "지붕 PO필름 + 측면 16mm PC",
      "Large-scale smart greenhouse": "대형 스마트온실",
      "Yeongdong smart greenhouse": "영동 스마트온실",
      "7-span Venlo / side height 6 m": "7연동 벤로형 / 측고 6m",
      "Sejong glass greenhouse": "세종 유리온실",
      "single-span / side height 10 m": "단동 / 측고 10m",
      "Roof 4 mm tempered glass + side 16 mm PC": "지붕 4mm 강화유리 + 측면 16mm PC",
      "Hwasun smart greenhouse": "화순 스마트온실",
      "3-span arch / side height 3.5 m": "3연동 아치형 / 측고 3.5m",
      "Dongcheonan smart greenhouse": "동천안 스마트온실",
      "6-span arch / side height 3.5 m": "6연동 아치형 / 측고 3.5m",
      "Shading + aluminium + thermal screen": "차광 + 알루미늄 + 보온스크린",
      "Reconstruction cost: the existing frame is retained, structural reinforcement, new covering and screens, and sandwich-panel works.": "리모델링 기준 금액입니다. 기존 골조를 유지한 채 구조 보강, 피복·스크린 교체, 샌드위치판넬 시공을 포함합니다.",
      "Jincheon smart greenhouse": "진천 스마트온실",
      "3-span arch / side height 6 m": "3연동 아치형 / 측고 6m",
      "Firmmit Land": "퍼밋랜드",
      "single-span Venlo / side height 5 m": "단동 벤로형 / 측고 5m",
      "Sky-glass 16t": "스카이글라스 16t"
    },
  };
  (function mergePj() {
    for (var lg in TXT_PJ) { if (!TXT[lg]) TXT[lg] = {}; for (var k in TXT_PJ[lg]) { TXT[lg][k] = TXT_PJ[lg][k]; } }
  })();

  (function mergeDir() {
    for (var rk in RICH_DIR) { if (!RICH[rk]) RICH[rk] = RICH_DIR[rk]; }
    for (var lg in TXT_DIR) {
      if (!TXT[lg]) TXT[lg] = {};
      for (var tk in TXT_DIR[lg]) { TXT[lg][tk] = TXT_DIR[lg][tk]; }
    }
  })();


  var ADDRESS = {
    en: '130 Makhtumkuli Street, "Do\'stobod" MSG, Yashnabad district, Tashkent, Republic of Uzbekistan',
    ru: 'Республика Узбекистан, г. Ташкент, Яшнабадский район, МСГ «Дўстобод», ул. Махтумкули, 130',
    uz: 'O\'zbekiston Respublikasi, Toshkent sh., Yashnobod tumani, «Do\'stobod» MSG, Mahtumquli ko\'chasi, 130-uy',
    ko: '우즈베키스탄 공화국, 타슈켄트시, 야시나바드구, 「도스토보드」 MSG, 마흐툼쿨리 거리 130'
  };
  var LEGALNAME = {
    en: 'Firmmit Uzbekistan',
    ru: 'Firmmit Uzbekistan',
    uz: 'Firmmit Uzbekistan',
    ko: 'Firmmit Uzbekistan'
  };

  /* ============================================================
     i18n ENGINE
     ============================================================ */
  var origText = new WeakMap();   // text node -> original value
  var origHTML = new WeakMap();   // rich element -> original innerHTML
  var richKey = new WeakMap();    // rich element -> english key
  var origPH = new WeakMap();     // input/textarea -> original placeholder
  var richEls = [];
  var cached = false;
  var current = 'uz';

  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };

  var SKIP = '.no-i18n, .brand, .lang-switch, .drawer-lang, [data-count], script, style, .map-embed';

  function inSkip(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    while (el && el !== document.body) {
      if (el.matches && el.matches(SKIP)) return true;
      el = el.parentNode;
    }
    return false;
  }
  function inRich(node) {
    var el = node.parentNode;
    while (el && el !== document.body) {
      if (richKey.has(el)) return true;
      el = el.parentNode;
    }
    return false;
  }

  function findRich() {
    richEls = [];
    var cands = document.querySelectorAll('h1, h2, h3, p');
    cands.forEach(function (el) {
      if (inSkip(el)) return;
      if (!el.querySelector('span, strong, em, b, br, a')) return;
      var k = norm(el.textContent);
      if (RICH[k]) { richEls.push(el); if (!richKey.has(el)) { richKey.set(el, k); origHTML.set(el, el.innerHTML); } }
    });
  }

  function cacheOriginals() {
    findRich();
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue.trim()) continue;
      if (inSkip(n) || inRich(n)) continue;
      if (!origText.has(n)) origText.set(n, n.nodeValue);
    }
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (el) {
      if (!origPH.has(el)) origPH.set(el, el.getAttribute('placeholder'));
    });
    cached = true;
  }

  // dictionary lookup tolerant of a trailing " *" (required-field marker)
  function lookup(lang, core) {
    var dict = TXT[lang] || {};
    if (dict[core] != null) return dict[core];
    var m = core.match(/^(.*?)(\s*\*)$/);
    if (m && dict[m[1].trim()] != null) return dict[m[1].trim()] + m[2];
    return null;
  }

  function translateNode(n, lang) {
    var orig = origText.get(n);
    if (orig == null) return;
    if (lang === 'en') { n.nodeValue = orig; return; }
    var v = lookup(lang, norm(orig));
    if (v == null) { n.nodeValue = orig; return; }
    var lead = orig.match(/^\s*/)[0];
    var trail = orig.match(/\s*$/)[0];
    n.nodeValue = lead + v + trail;
  }

  // Titles never end in a period — in ANY language. After each translation we
  // strip a single trailing period from headings (never an ellipsis, never body text).
  var HEADING_SEL = '.hero-title, .page-hero h1, .hero h1, .section-title, .cta-band h2, .phi-intro-head h2, .phi-label h3';
  function stripHeadingPeriods() {
    document.querySelectorAll(HEADING_SEL).forEach(function (el) {
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var last = null, n;
      while ((n = w.nextNode())) { if (n.nodeValue && n.nodeValue.trim()) last = n; }
      if (!last) return;
      if (/([^.\s])\.(\s*)$/.test(last.nodeValue)) {
        last.nodeValue = last.nodeValue.replace(/\.(\s*)$/, '$1');
      }
    });
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) < 0) lang = 'en';
    if (!cached) cacheOriginals();
    current = lang;

    // rich elements (captured once during cacheOriginals; element refs stay valid)
    richEls.forEach(function (el) {
      var k = richKey.get(el);
      if (lang === 'en') { el.innerHTML = origHTML.get(el); }
      else { var v = RICH[k] && RICH[k][lang]; el.innerHTML = (v != null ? v : origHTML.get(el)); }
    });

    // text nodes
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (!origText.has(n)) continue;
      if (inRich(n)) continue;
      translateNode(n, lang);
    }

    // placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (el) {
      var o = origPH.get(el); if (o == null) return;
      if (lang === 'en') { el.setAttribute('placeholder', o); return; }
      var v = lookup(lang, norm(o));
      el.setAttribute('placeholder', v != null ? v : o);
    });

    // dynamic dictionary values (address / legal name)
    document.querySelectorAll('[data-field="address"]').forEach(function (el) { el.textContent = ADDRESS[lang] || ADDRESS.en; });
    document.querySelectorAll('[data-field="legalname"]').forEach(function (el) { el.textContent = LEGALNAME[lang] || LEGALNAME.en; });

    stripHeadingPeriods();

    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem(STORE, lang); } catch (e) {}

    // switcher active state
    document.querySelectorAll('.lang-switch button, .drawer-lang button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // let self-contained widgets (e.g. the catalog) re-render in the new language
    try { document.dispatchEvent(new CustomEvent('firmmit:lang', { detail: lang })); } catch (e) {}
  }

  window.FirmmitI18N = { apply: apply, get: function () { return current; } };

  /* ============================================================
     LAYOUT
     ============================================================ */
  function brandMarkup() {
    return '<a class="brand no-i18n" href="' + hrefFor('home') + '" aria-label="Firmmit Uzbekistan home">' +
      '<span class="co">FIRMMIT<span class="dot">.</span></span></a>';
  }

  function buildHeader(active) {
    var links = NAV.map(function (n) {
      return '<a href="' + hrefFor(n.key) + '" data-key="' + n.key + '"' + (n.key === active ? ' class="active"' : '') + '>' + NAV_LABEL[n.key] + '</a>';
    }).join('');
    var contactActive = active === 'contact' ? ' class="active"' : '';

    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<div class="wrap">' + brandMarkup() +
        '<nav class="nav">' + links + '</nav>' +
        '<div class="header-cta">' +
          '<a class="nav-catalog" href="' + hrefFor('catalog') + '" data-key="catalog" aria-label="Online store, product catalog">' + iconCatalog() + '<span>Catalog</span></a>' +
          '<div class="lang-switch no-i18n" role="group" aria-label="Language">' +
            '<button data-lang="uz">UZ</button><button data-lang="ru">RU</button><button data-lang="en">EN</button><button data-lang="ko">한</button>' +
          '</div>' +
          '<a class="nav-contact" href="' + hrefFor('contact') + '" data-key="contact">Contact</a>' +
          '<button class="burger" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';

    var dLinks = NAV.map(function (n) {
      return '<a href="' + hrefFor(n.key) + '" data-key="' + n.key + '"' + (n.key === active ? ' class="active"' : '') + '>' + NAV_LABEL[n.key] + '</a>';
    }).join('');
    var drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.innerHTML =
      '<div class="drawer-panel">' +
        '<button class="drawer-close no-i18n" aria-label="Close menu">&times;</button>' +
        '<div class="drawer-lang no-i18n">' +
          '<button data-lang="uz">UZ</button><button data-lang="ru">RU</button><button data-lang="en">EN</button><button data-lang="ko">한</button>' +
        '</div>' + dLinks +
        '<a href="' + hrefFor('contact') + '" data-key="contact"' + contactActive + '>Contact</a>' +
        '<a class="drawer-catalog" href="' + hrefFor('catalog') + '" data-key="catalog">' + iconCatalog() + '<span>Catalog</span></a>' +
      '</div>';

    document.body.prepend(drawer);
    document.body.prepend(header);

    function onScroll() { if (window.scrollY > 40) header.classList.add('solid'); else header.classList.remove('solid'); }
    if (document.body.hasAttribute('data-solid-header')) header.classList.add('solid');
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    header.querySelector('.burger').addEventListener('click', function () { drawer.classList.add('open'); });
    drawer.querySelector('.drawer-close').addEventListener('click', function () { drawer.classList.remove('open'); });
    drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.classList.remove('open'); });
    drawer.querySelectorAll('.drawer-panel a').forEach(function (a) { a.addEventListener('click', function () { drawer.classList.remove('open'); }); });

    document.querySelectorAll('.lang-switch button, .drawer-lang button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); if (drawer.classList.contains('open')) drawer.classList.remove('open'); });
    });
  }

  function col(title, items) {
    return '<div class="footer-col"><h4>' + title + '</h4>' +
      items.map(function (i) { return '<a href="' + hrefFor(i[1]) + '" data-key="' + i[1] + '">' + i[0] + '</a>'; }).join('') + '</div>';
  }

  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="wrap"><div class="footer-top">' +
        '<div class="footer-brand">' + brandMarkup() +
          '<p>Bringing Korean smart-farm technology to Uzbekistan, greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.</p>' +
          '<div class="footer-contact">' +
            '<div>' + iconPin() + '<span data-field="address">' + ADDRESS.en + '</span></div>' +
            '<div>' + iconMail() + '<a class="no-i18n" href="mailto:' + CO.email + '">' + CO.email + '</a></div>' +
            '<div>' + iconPhone() + '<a class="no-i18n" href="tel:' + CO.phoneHref + '">' + CO.phone + '</a></div>' +
          '</div>' +
        '</div>' +
        col('Company', [['About Us', 'about'], ['Our Partners', 'partners'], ['Certificates', 'certs'], ['News', 'news']]) +
        col('What we do', [['Products', 'products'], ['Services', 'services'], ['Import & Export', 'trade'], ['Contact', 'contact']]) +
        '<div class="footer-head-office">' +
          '<span class="tag no-i18n">HEAD OFFICE</span>' +
          '<strong class="no-i18n">Firmmit Korea</strong>' +
          '<span style="font-size:0.86rem;">Smart-farm headquarters · Seoul, Republic of Korea</span><br>' +
          '<a class="no-i18n" href="' + KR_URL + '" target="_blank" rel="noopener">www.firmmit.kr ↗</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© 2026 Firmmit Uzbekistan. A branch of Firmmit Korea. All rights reserved.</span>' +
        '<div class="socials no-i18n">' +
          '<a href="' + KR_URL + '" target="_blank" rel="noopener" aria-label="Website">' + iconGlobe() + '</a>' +
          '<a href="' + TG_URL + '" target="_blank" rel="noopener" aria-label="Telegram">' + iconTelegram() + '</a>' +
          '<a href="' + IG_URL + '" target="_blank" rel="noopener" aria-label="Instagram">' + iconInstagram() + '</a>' +
          '<a href="mailto:' + CO.email + '" aria-label="Email">' + iconMail() + '</a>' +
          '<a href="' + hrefFor('contact') + '" aria-label="Contact">' + iconPin() + '</a>' +
        '</div>' +
      '</div></div>';
    document.body.appendChild(footer);
  }

  function iconGlobe() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>'; }
  function iconTelegram() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>'; }
  function iconInstagram() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none"/></svg>'; }
  function iconMail() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'; }
  function iconPin() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>'; }
  function iconPhone() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z"/></svg>'; }
  function iconCatalog() { return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H14l6 6v10.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>'; }

  /* ---- interactions ---- */
  // ensure muted showcase videos autoplay (some browsers need a JS nudge)
  function playVideos() {
    document.querySelectorAll('.video-media video').forEach(function (v) {
      v.muted = true; v.setAttribute('muted', '');
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  function reveals() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14 });
    els.forEach(function (e) { io.observe(e); });
  }

  // Bo'lim ko'rinishga kirganda "shake" (ozgina yuqoriga siljib joyiga tushadi). Barcha sahifada.
  function sectionShakes() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var secs = document.querySelectorAll('section:not(.hero):not(.reveal-back):not(.page-hero)');
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        var t = e.target;
        if (e.isIntersecting) {
          t.classList.remove('shk');
          void t.offsetWidth;      // reflow — animatsiya har safar qaytadan o'ynaydi
          t.classList.add('shk');
        } else {
          t.classList.remove('shk');   // chiqib ketganda tozalanadi -> qayta kirganda yana o'ynaydi
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  function counters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '', dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString() + suffix;
        }
        requestAnimationFrame(step); io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-status');
      var msg = { en: 'Thank you, your inquiry has been prepared. Our team will contact you at the email provided. (Demo form: no data is sent.)',
        ru: 'Спасибо: ваш запрос подготовлен. Наша команда свяжется с вами по указанной почте. (Демо-форма: данные не отправляются.)',
        uz: 'Rahmat: so\'rovingiz tayyorlandi. Jamoamiz ko\'rsatilgan pochta orqali siz bilan bog\'lanadi. (Demo shakl: ma\'lumot yuborilmaydi.)',
        ko: '감사합니다: 문의가 준비되었습니다. 입력하신 이메일로 저희 팀이 연락드리겠습니다. (데모 양식: 데이터가 전송되지 않습니다.)' };
      if (note) { note.textContent = msg[current] || msg.en; note.style.color = '#1e46d0'; }
      form.reset();
    });
  }

  // Photos: each [data-photo] shows its image once it loads; missing file = gradient stays.
  function loadPhotos() {
    document.querySelectorAll('[data-photo]').forEach(function (el) {
      var src = el.getAttribute('data-photo');
      if (!src) return;
      var img = new Image();
      img.onload = function () {
        // set inline so the url() resolves relative to the PAGE, not the stylesheet
        el.style.backgroundImage = "url('" + src + "')";
        el.classList.add('has-photo');
      };
      img.src = src;
    });
  }

  // Logo: light + dark transparent PNGs. Dark logo shows on white grounds
  // (scrolled header), light logo on dark grounds (hero header + footer).
  // Activates only when the files exist; otherwise the built-in SVG mark stays.
  function loadLogo() {
    var srcs = { dark: 'assets/logo.png', light: 'assets/logo-light.png' };
    var found = {}, pending = 2;
    function done() { if (--pending === 0) apply(); }
    function apply() {
      if (!found.dark && !found.light) return;           // nothing supplied yet
      var dark = found.dark || found.light;              // fall back to whichever exists
      var light = found.light || found.dark;
      document.querySelectorAll('.brand').forEach(function (brand) {
        var inFooter = !!brand.closest('.site-footer');
        brand.classList.add('has-logo');
        if (inFooter) {
          brand.innerHTML = '<img class="logo-img" src="' + light + '" alt="Firmmit Uzbekistan">';
        } else {
          brand.innerHTML =
            '<img class="logo-img logo-light" src="' + light + '" alt="Firmmit Uzbekistan">' +
            '<img class="logo-img logo-dark" src="' + dark + '" alt="Firmmit Uzbekistan">';
        }
      });
    }
    Object.keys(srcs).forEach(function (k) {
      var im = new Image();
      im.onload = function () { found[k] = srcs[k]; done(); };
      im.onerror = done;
      im.src = srcs[k];
    });
  }

  function setFavicon() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
      '<rect width="40" height="40" rx="11" fill="#3264ff"/>' +
      '<rect x="12" y="10" width="6" height="20" rx="1" fill="#fff"/>' +
      '<rect x="12" y="10" width="15" height="6" rx="1" fill="#fff"/>' +
      '<rect x="12" y="18" width="11" height="5" rx="1" fill="#fff"/>' +
      '<circle cx="30" cy="28" r="2.6" fill="#97d4e9"/></svg>';
    var link = document.querySelector('link[rel="icon"]') || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    document.head.appendChild(link);
  }

  function showRoute(key) {
    var routes = document.querySelectorAll('section.route');
    routes.forEach(function (r) { r.style.display = (r.getAttribute('data-route') === key) ? 'block' : 'none'; });
    document.querySelectorAll('.site-header .nav a[data-key], .drawer-panel a[data-key]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-key') === key);
    });
    var cur = document.querySelector('section.route[data-route="' + key + '"]');
    if (cur) cur.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('in'); });
    window.scrollTo(0, 0);
    var drawer = document.querySelector('.drawer.open'); if (drawer) drawer.classList.remove('open');
  }

  document.addEventListener('DOMContentLoaded', function () {
    SPA = document.querySelectorAll('section.route').length > 0;
    /* setFavicon() olib tashlandi — rasmiy /assets/favicon.png (HTML link) ishlatiladi */
    var active = SPA ? currentKey() : (document.body.getAttribute('data-page') || '');
    buildHeader(active);
    buildFooter();
    loadPhotos();
    loadLogo();
    playVideos();
    reveals();
    sectionShakes();
    counters();
    contactForm();
    var saved = 'uz';
    try { saved = localStorage.getItem(STORE) || 'uz'; } catch (e) {}
    apply(saved);
    if (SPA) {
      showRoute(currentKey());
      window.addEventListener('hashchange', function () { showRoute(currentKey()); });
    }
  });
})();
