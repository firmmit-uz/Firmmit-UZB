/* ============================================================
   FIRMMIT UZBEKISTAN — shared layout, i18n (UZ/RU/EN), interactions
   Company details sourced from official LLC "FIRMMIT" letterhead.
   ============================================================ */
(function () {
  'use strict';

  var KR_URL = 'https://www.firmmit.kr/html/#firstPage';
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
    phoneHref: '+998900632315',
    bank: 'Aloqabank (АТ "ALOQABANK") IP PARK RCKU, Tashkent',
    mfo: '00401',
    account: '20208000907117476001'
  };

  var LOGO = '<svg class="mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<rect width="40" height="40" rx="11" fill="#3264ff"/>' +
    '<path d="M20 31c-6 0-9.5-3.6-9.5-8.4C10.5 18 14 15 20 12v19z" fill="#97d4e9"/>' +
    '<path d="M20 31c6 0 9.5-3.6 9.5-8.4C29.5 18 26 15 20 12v19z" fill="#fff"/>' +
    '<path d="M20 12c0-3 1.6-5.4 5-7-0.4 3.4-1.8 5.6-5 7z" fill="#97d4e9"/>' +
    '<rect x="19" y="9" width="2" height="24" rx="1" fill="#fff" opacity="0.9"/>' +
    '</svg>';

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
    news: 'News', contact: 'Contact'
  };
  var FILE = {
    home: 'index.html', about: 'about.html', products: 'products.html', services: 'services.html',
    trade: 'import-export.html', partners: 'partners.html', certs: 'certificates.html',
    news: 'news.html', contact: 'contact.html', catalog: 'catalog.html'
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
      ko: '<span class="thin">모든 프로젝트를 뒷받침하는</span> 인증.'
    },
    "Growing tomorrow's harvest with smart-farm technology.": {
      ru: '<span class="thin">Выращиваем урожай завтрашнего дня</span><br> с помощью <span class="blue">умных</span> агротехнологий.',
      uz: '<span class="thin">Ertangi hosilni yetishtiramiz</span><br> <span class="blue">aqlli</span> ferma texnologiyalari bilan.',
      ko: '<span class="thin">내일의 수확을 준비합니다</span><br> <span class="blue">스마트팜</span> 기술로.'
    },
    "Leading the future of agriculture in Uzbekistan.": {
      ru: '<span class="thin">Формируем будущее сельского хозяйства</span> Узбекистана.',
      uz: '<span class="thin">O\'zbekiston qishloq xo\'jaligi</span> kelajagini yaratamiz.',
      ko: '<span class="thin">우즈베키스탄 농업의 미래를</span> 선도합니다.'
    },
    "Reliable, distinctive, professional smart farming.": {
      ru: '<span class="thin">Надёжное, уникальное,</span> профессиональное умное фермерство.',
      uz: '<span class="thin">Ishonchli, o\'ziga xos,</span> professional aqlli dehqonchilik.',
      ko: '<span class="thin">신뢰할 수 있고 독보적인,</span> 전문 스마트팜.'
    },
    "One family of farms — from Korea to Uzbekistan.": {
      ru: '<span class="thin">Одна семья ферм —</span> от Кореи до Узбекистана.',
      uz: '<span class="thin">Yagona fermalar oilasi —</span> Koreyadan O\'zbekistongacha.',
      ko: '<span class="thin">하나의 농장 가족 —</span> 한국에서 우즈베키스탄까지.'
    },
    "Firmmit Uzbekistan operates as a regional branch of Firmmit Korea, our head office and smart-farm headquarters. That link gives local growers direct access to Korean R&D, equipment and expertise.": {
      ru: 'Firmmit Uzbekistan работает как региональный филиал <strong>Firmmit Korea</strong> — нашего головного офиса и штаб-квартиры умного фермерства. Эта связь даёт местным аграриям прямой доступ к корейским R&D, оборудованию и экспертизе.',
      uz: 'Firmmit Uzbekistan <strong>Firmmit Korea</strong>ning mintaqaviy filiali sifatida ishlaydi — bu bizning bosh ofisimiz va aqlli ferma shtab-kvartiramiz. Bu aloqa mahalliy fermerlarga Koreya R&D, jihozlari va tajribasidan bevosita foydalanish imkonini beradi.',
      ko: 'Firmmit Uzbekistan은 <strong>Firmmit Korea</strong>의 지역 지사로 운영됩니다 — 본사이자 스마트팜 본부입니다. 이 연결을 통해 현지 농가는 한국의 R&D, 장비, 전문성에 직접 접근할 수 있습니다.'
    },
    "A local partner backed by a global head office.": {
      ru: '<span class="thin">Местный партнёр при поддержке</span> глобального головного офиса.',
      uz: '<span class="thin">Global bosh ofis quvvatlagan</span> mahalliy hamkor.',
      ko: '<span class="thin">글로벌 본사가 지원하는</span> 현지 파트너.'
    },
    "Six core systems that work together.": {
      ru: '<span class="thin">Шесть базовых систем,</span> работающих как единое целое.',
      uz: '<span class="thin">Birga ishlaydigan</span> oltita asosiy tizim.',
      ko: '<span class="thin">함께 작동하는</span> 6가지 핵심 시스템.'
    },
    "Built for the region's high-value produce.": {
      ru: '<span class="thin">Создано для ценных культур</span> региона.',
      uz: '<span class="thin">Mintaqaning qimmatli ekinlari</span> uchun yaratilgan.',
      ko: '<span class="thin">이 지역의 고부가가치 작물을</span> 위해 설계.'
    },
    "A clear path from idea to income.": {
      ru: '<span class="thin">Ясный путь от идеи</span> к доходу.',
      uz: '<span class="thin">G\'oyadan daromadgacha</span> aniq yo\'l.',
      ko: '<span class="thin">아이디어에서 수익까지</span> 명확한 길.'
    },
    "A bridge that moves both ways.": {
      ru: '<span class="thin">Мост, работающий</span> в обе стороны.',
      uz: '<span class="thin">Ikki tomonga ishlaydigan</span> ko\'prik.',
      ko: '<span class="thin">양방향으로 이어주는</span> 다리.'
    },
    "Firmmit Korea — our head office.": {
      ru: '<span class="thin">Firmmit Korea —</span> наш головной офис.',
      uz: '<span class="thin">Firmmit Korea —</span> bizning bosh ofisimiz.',
      ko: '<span class="thin">Firmmit Korea —</span> 우리의 본사.'
    },
    "Not just systems — finished products, too.": {
      ru: '<span class="thin">Не только системы —</span> но и готовая продукция.',
      uz: '<span class="thin">Faqat tizimlar emas —</span> tayyor mahsulotlar ham.',
      ko: '<span class="thin">시스템만이 아니라 —</span> 완제품도 함께.'
    },
    "Everything, with specs — in one catalog.": {
      ru: '<span class="thin">Всё, со спецификациями —</span> в одном каталоге.',
      uz: '<span class="thin">Hammasi, spetsifikatsiyalari bilan —</span> bitta katalogda.',
      ko: '<span class="thin">사양까지 모두 —</span> 하나의 카탈로그에.'
    }
  };

  var TXT = {
    ru: {
      /* nav */
      "Home": "Главная", "About Us": "О компании", "Products": "Продукция",
      "Services": "Услуги", "Import & Export": "Импорт и экспорт", "Our Partners": "Партнёры",
      "Certificates": "Сертификаты", "News": "Новости", "Contact": "Контакты",
      "Head Office ↗": "Головной офис ↗", "Head Office — Firmmit Korea ↗": "Головной офис — Firmmit Korea ↗",
      /* footer */
      "Bringing Korean smart-farm technology to Uzbekistan — greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.":
        "Привносим корейские умные агротехнологии в Узбекистан — теплицы, сельское хозяйство с контролируемой средой и агроторговлю для устойчивого продовольственного снабжения региона.",
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
      "Why growers choose us": "Почему выбирают нас", "Two-way trade": "Двусторонняя торговля",
      "How trade works with us": "Как устроена торговля", "Our anchor partner": "Наш ключевой партнёр",
      "Ecosystem": "Экосистема", "Our network": "Наша сеть",
      "Standards & accreditation": "Стандарты и аккредитация", "Our commitment": "Наши обязательства",
      "Latest updates": "Последние новости", "Get in touch": "Связаться с нами", "Company details": "Реквизиты компании",
      /* home hero */
      "Firmmit Uzbekistan delivers Korean controlled-environment agriculture — modern greenhouses, precision climate systems and reliable agri-systems — to farms across Uzbekistan and Central Asia.":
        "Firmmit Uzbekistan поставляет корейское сельское хозяйство с контролируемой средой — современные теплицы, точные климатические системы и надёжные агросистемы — фермам Узбекистана и Центральной Азии.",
      "Explore our solutions": "Наши решения", "Talk to our team": "Связаться с командой",
      "Regions served": "Регионов охвачено", "Projects delivered": "Реализовано проектов",
      "Client retention": "Удержание клиентов", "Greenhouse projects": "Тепличных проектов",
      "Regions covered": "Охваченных регионов", "Avg. water saved": "Экономия воды в среднем",
      "Technical support": "Техподдержка",
      "Four connected capabilities that take a project from first design to a thriving, data-driven farm.": "Четыре взаимосвязанных направления, которые ведут проект от первого проекта до процветающей фермы, управляемой данными.",
      /* home intro */
      "As the Uzbekistan branch of Firmmit Korea, we localize proven smart-farm technology for the region's climate, crops and growers — combining Korean engineering with on-the-ground agronomy.":
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
      "Visit Head Office — Firmmit Korea": "Головной офис — Firmmit Korea",
      "Visit Firmmit Korea": "Перейти на Firmmit Korea",
      /* CTA */
      "Bring smart farming to your land.": "Внедрите умное фермерство на своей земле.",
      "Whether you're planning a single greenhouse or a regional facility, our team will design a solution around your crop, climate and budget.":
        "Планируете ли вы одну теплицу или региональный комплекс — наша команда разработает решение под вашу культуру, климат и бюджет.",
      "Start your project": "Начать проект", "Get in touch →": "Связаться с нами →",
      /* about */
      "Korean smart-farm expertise, rooted in Uzbek soil.": "Корейский опыт умного фермерства на узбекской земле.",
      "We are the Uzbekistan branch of Firmmit Korea — a smart-farm company preparing the food of tomorrow. Our mission is to make advanced, sustainable agriculture accessible to growers across the region.":
        "Мы — узбекистанский филиал Firmmit Korea, компании умного фермерства, готовящей продовольствие завтрашнего дня. Наша миссия — сделать передовое устойчивое сельское хозяйство доступным для аграриев региона.",
      "Firmmit Uzbekistan was established to adapt Firmmit Korea's proven controlled-environment agriculture for Central Asia. We combine Korean engineering, R&D and equipment with local agronomy, language and service — so growers get world-class technology with a partner next door.":
        "Firmmit Uzbekistan создан, чтобы адаптировать проверенное сельское хозяйство с контролируемой средой Firmmit Korea для Центральной Азии. Мы объединяем корейскую инженерию, R&D и оборудование с местной агрономией, языком и сервисом — чтобы аграрии получали технологии мирового уровня рядом с домом.",
      "From feasibility study to harvest, we stay involved: designing the facility, sourcing the right systems, installing them, training the team and supporting every season that follows.":
        "От технико-экономического обоснования до урожая мы рядом: проектируем объект, подбираем системы, монтируем их, обучаем команду и поддерживаем каждый последующий сезон.",
      "Because your life is behind our work.": "Потому что за нашей работой — ваша жизнь.",
      "Food security is personal. Everything we build is meant to help a family, a farm and a region grow with confidence.":
        "Продовольственная безопасность — это личное. Всё, что мы создаём, помогает семье, ферме и региону уверенно расти.",
      "MISSION": "МИССИЯ", "VISION": "ВИДЕНИЕ", "VALUES": "ЦЕННОСТИ",
      "Feed the future": "Накормить будущее",
      "Make dependable, high-yield farming possible in every climate through smart, resource-efficient technology.":
        "Сделать надёжное высокоурожайное фермерство возможным в любом климате с помощью умных ресурсосберегающих технологий.",
      "A greener region": "Более зелёный регион",
      "To be Central Asia's most trusted smart-farm partner, cutting water use while raising quality and output.":
        "Стать самым надёжным партнёром по умному фермерству в Центральной Азии, снижая расход воды и повышая качество и объём.",
      "Trust & results": "Доверие и результат",
      "Reliable, distinctive and professional — we measure success by our growers' harvests, not our promises.":
        "Надёжно, уникально и профессионально — мы измеряем успех урожаем аграриев, а не обещаниями.",
      "Four commitments to every grower.": "Четыре обязательства перед каждым аграрием.",
      "Localized engineering": "Локализованная инженерия",
      "Every system is specified for the site's climate, water and target crop — not copy-pasted from another market.":
        "Каждая система рассчитана под климат, воду и культуру объекта, а не скопирована с другого рынка.",
      "Transparent sourcing": "Прозрачные поставки",
      "Equipment is imported directly from Korea and vetted suppliers, with clear specifications and warranties.":
        "Оборудование поставляется напрямую из Кореи и от проверенных поставщиков с чёткими спецификациями и гарантиями.",
      "Hands-on training": "Практическое обучение",
      "We don't just install — we teach teams to operate and optimize their farm independently.":
        "Мы не просто монтируем — мы учим команды самостоятельно управлять фермой и оптимизировать её.",
      "Long-term support": "Долгосрочная поддержка",
      "Remote monitoring and local service keep facilities productive season after season.":
        "Удалённый мониторинг и местный сервис сохраняют продуктивность объектов из сезона в сезон.",
      "Firmmit Uzbekistan in numbers": "Firmmit Uzbekistan в цифрах",
      "Partner suppliers": "Партнёров-поставщиков", "Global head office": "Головной офис",
      "Let's grow something lasting.": "Вырастим что-то долговечное.",
      "Partner with a team that treats your harvest as its own.": "Работайте с командой, которая относится к вашему урожаю как к своему.",
      /* products */
      "Everything a modern farm needs, in one place.": "Всё, что нужно современной ферме, — в одном месте.",
      "From the greenhouse shell to the sensor on the vine, we supply integrated smart-farm systems engineered for Uzbekistan's climate and crops.":
        "От каркаса теплицы до датчика на растении — мы поставляем интегрированные умные системы для климата и культур Узбекистана.",
      "Buy a complete facility or a single subsystem — every product is designed to integrate cleanly with the rest.":
        "Купите полный комплекс или отдельную подсистему — каждый продукт легко интегрируется с остальными.",
      "Galvanized-frame venlo and multi-span structures with diffused glazing, thermal screens and natural ventilation, sized to your plot.":
        "Оцинкованные конструкции венло и многопролётные теплицы с рассеивающим остеклением, тепловыми экранами и естественной вентиляцией под ваш участок.",
      "Venlo": "Венло", "Multi-span": "Многопролётные", "Thermal screen": "Тепловой экран",
      "Hydroponic & NFT Systems": "Гидропоника и NFT-системы",
      "Soil-free growing lines — NFT channels, deep-water culture and substrate systems — that cut water use and boost yield per m².":
        "Беспочвенные линии — NFT-каналы, глубоководная культура и субстратные системы — снижают расход воды и повышают урожай с м².",
      "Climate Control": "Управление климатом",
      "Heating, cooling, CO₂ enrichment and fogging managed by a central controller to hold the perfect growing environment.":
        "Отопление, охлаждение, обогащение CO₂ и туманообразование под управлением центрального контроллера для идеальной среды.",
      "Heating": "Отопление", "Pad & fan": "Пад-энд-фан", "CO₂": "CO₂",
      "IoT Sensors & Automation": "IoT-датчики и автоматизация",
      "Wireless sensors for temperature, humidity, EC/pH, soil moisture and light, feeding a live dashboard and automated actions.":
        "Беспроводные датчики температуры, влажности, EC/pH, влажности почвы и света с панелью в реальном времени и автоматикой.",
      "Irrigation & Fertigation": "Орошение и фертигация",
      "Drip lines, dosing units and filtration that deliver water and nutrients precisely — saving up to 30% versus open-field methods.":
        "Капельные линии, дозаторы и фильтрация для точной подачи воды и питания — экономия до 30% по сравнению с открытым грунтом.",
      "Drip": "Капельное", "Dosing": "Дозирование", "Filtration": "Фильтрация",
      "Seedlings & Growing Media": "Рассада и субстраты",
      "Quality seedlings, coco-coir and rockwool substrates, and nutrient packs selected for high-value greenhouse crops.":
        "Качественная рассада, кокосовый и минераловатный субстраты и наборы питания для ценных тепличных культур.",
      "Seedlings": "Рассада", "Coco-coir": "Кокос", "Nutrients": "Питание",
      "See our services": "Наши услуги",
      "Our systems are tuned for the crops that perform best under controlled environments in Uzbekistan — protecting them from heat, dust and water stress.":
        "Наши системы настроены под культуры, лучше всего растущие в контролируемой среде Узбекистана, защищая их от жары, пыли и нехватки воды.",
      "Tomatoes": "Томаты", "Cucumbers": "Огурцы", "Peppers": "Перцы", "Leafy greens": "Зелень",
      "Strawberries": "Клубника", "Herbs": "Пряные травы", "Melons": "Дыни/бахчевые", "Flowers": "Цветы",
      "Need a tailored product package?": "Нужен индивидуальный комплект?",
      "Tell us your crop, plot size and goals — we'll assemble the right system and quote it.":
        "Сообщите культуру, площадь и цели — мы подберём систему и рассчитаем стоимость.",
      "Request a quote": "Запросить расчёт",
      "For sale": "В продаже", "Catalog": "Каталог", "Online Store": "Онлайн-магазин",
      "Beyond greenhouses and equipment, Firmmit Uzbekistan sells finished products: premium strawberry varieties, seedlings, fresh greenhouse produce and genuine spare parts — ready for market.":
        "Помимо теплиц и оборудования, Firmmit Uzbekistan продаёт готовую продукцию: премиальные сорта клубники, рассаду, свежие тепличные овощи и оригинальные запчасти — готовые к рынку.",
      "Seolhyang (설향) Strawberry": "Клубника Сольхян (설향)",
      "Korea's most popular strawberry cultivar — large, glossy, high-sugar berries with excellent flavour and shelf life. Available as seedlings and fresh fruit.":
        "Самый популярный корейский сорт клубники — крупные, глянцевые, сладкие ягоды с прекрасным вкусом и лёжкостью. Поставляется как рассада и свежие ягоды.",
      "1943 Strawberry": "Клубника 1943",
      "A firm, aromatic strawberry variety selected for high yield and transport durability — well suited to controlled-environment growing in the region.":
        "Плотный, ароматный сорт клубники, отобранный за высокую урожайность и транспортабельность — отлично подходит для выращивания в контролируемой среде региона.",
      "Fresh Greenhouse Produce": "Свежая тепличная продукция",
      "Tomatoes, cucumbers, peppers and leafy greens grown in Firmmit facilities — clean, consistent and available year-round.":
        "Томаты, огурцы, перцы и зелень, выращенные на объектах Firmmit — чистые, стабильного качества и доступные круглый год.",
      "Seedlings & Starter Plants": "Рассада и саженцы",
      "Healthy, disease-screened seedlings and starter plants so growers begin every season from a strong, reliable base.":
        "Здоровая, проверенная на болезни рассада и саженцы, чтобы аграрии начинали каждый сезон с надёжной основы.",
      "Genuine Spare Parts": "Оригинальные запчасти",
      "The same spare parts behind our maintenance service, available for direct purchase — sensors, controllers, fittings, pumps and consumables.":
        "Те же запчасти, что и в нашем сервисе обслуживания, доступные для прямой покупки — датчики, контроллеры, фитинги, насосы и расходные материалы.",
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
      "Our full product catalog is available online — searchable and shown in your language.": "Полный каталог продукции доступен онлайн — с поиском и на вашем языке.",
      "The catalog is being finalized — request a copy and we'll send it to you directly.":
        "Каталог дорабатывается — запросите копию, и мы отправим её вам напрямую.",
      /* services */
      "We stay with you from blueprint to harvest.": "Мы рядом от чертежа до урожая.",
      "A greenhouse is only as good as the team behind it. Our end-to-end services make sure your investment produces — season after season.":
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
      "Structural, climate and irrigation design tailored to your site — delivered as clear, buildable plans.":
        "Конструктивный, климатический и оросительный проект под ваш объект в виде понятных рабочих планов.",
      "Installation & Commissioning": "Монтаж и пусконаладка",
      "Professional on-site assembly, wiring, calibration and handover of a ready-to-grow facility.":
        "Профессиональная сборка, монтаж, калибровка и сдача готового к выращиванию объекта.",
      "Grower Training": "Обучение аграриев",
      "Practical training in climate management, crop care and dashboard use — in Uzbek, Russian and English.":
        "Практическое обучение управлению климатом, уходу за культурами и работе с панелью — на узбекском, русском и английском.",
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
        "Запишитесь на бесплатную консультацию — мы наметим кратчайший путь к продуктивной теплице.",
      "Talk to a specialist": "Поговорить со специалистом",
      /* import-export */
      "Connecting Korea and Uzbekistan across the supply chain.": "Соединяем Корею и Узбекистан по всей цепочке поставок.",
      "Beyond national borders — bringing proven Korean agri-technology into Uzbekistan and helping regional produce reach new markets.":
        "За пределами границ — привносим проверенные корейские агротехнологии в Узбекистан и помогаем региональной продукции выходить на новые рынки.",
      "Our head-office link with Firmmit Korea gives us a direct, trusted channel in both directions of the agricultural supply chain.":
        "Связь с головным офисом Firmmit Korea даёт нам прямой, надёжный канал в обоих направлениях агроцепочки.",
      "IMPORT · KOREA → UZBEKISTAN": "ИМПОРТ · КОРЕЯ → УЗБЕКИСТАН",
      "Smart-farm equipment & inputs": "Оборудование и материалы для умных ферм",
      "Greenhouse structures, climate and irrigation systems, IoT hardware, growing media and quality seedlings — sourced from Korea and vetted partners, delivered with documentation and warranty.":
        "Тепличные конструкции, климатические и оросительные системы, IoT-оборудование, субстраты и качественная рассада — из Кореи и от проверенных партнёров, с документами и гарантией.",
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
      "Delivery": "Доставка", "Goods delivered, inspected and — where needed — installed and commissioned.":
        "Товары доставляются, проверяются и при необходимости монтируются и вводятся в эксплуатацию.",
      "Countries linked": "Связанных стран", "Trusted suppliers": "Проверенных поставщиков",
      "Documented shipments": "Документированных отгрузок", "Product categories": "Категорий товаров",
      "Import equipment or export your harvest.": "Импортируйте оборудование или экспортируйте урожай.",
      "Tell us what you need to move — our trade team will handle sourcing, logistics and compliance.":
        "Сообщите, что нужно перевезти — наша торговая команда возьмёт на себя поиск, логистику и оформление.",
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
      "Firmmit Korea — R&D, engineering and equipment supply.": "Firmmit Korea — R&D, инженерия и поставка оборудования.",
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
      "Supplier, institution or grower — if you're building the future of regional agriculture, let's talk.":
        "Поставщик, институт или аграрий — если вы строите будущее сельского хозяйства региона, давайте поговорим.",
      "Partner with us": "Стать партнёром",
      /* certificates */
      "Quality you can verify, not just trust.": "Качество, которое можно проверить, а не просто доверять.",
      "Our systems, processes and trade operations are held to recognized standards — because reliable food production demands it.":
        "Наши системы, процессы и торговые операции соответствуют признанным стандартам — потому что надёжное производство продовольствия этого требует.",
      "Certifications behind every project.": "Сертификаты за каждым проектом.",
      "Certification documents are being compiled and will be published here. Verified certificates are available to clients and partners on request.":
        "Сертификаты формируются и будут опубликованы здесь. Подтверждённые сертификаты предоставляются клиентам и партнёрам по запросу.",
      "Certificate": "Сертификат", "Coming soon": "Скоро",
      "Standards that protect your harvest.": "Стандарты, защищающие ваш урожай.",
      "Certification isn't paperwork to us — it's how we guarantee that a system installed in Tashkent performs like one engineered in Seoul, and that produce leaving a Firmmit facility is safe and traceable.":
        "Сертификация для нас — не формальность, а гарантия того, что система, установленная в Ташкенте, работает как спроектированная в Сеуле, а продукция с объекта Firmmit безопасна и прослеживаема.",
      "Request certificate documents": "Запросить документы",
      "Need documentation for a tender?": "Нужны документы для тендера?",
      "We'll provide the certificates and specifications your procurement process requires.":
        "Мы предоставим сертификаты и спецификации, необходимые для вашей закупочной процедуры.",
      "Contact us": "Связаться с нами", "Contact us →": "Связаться с нами →",
      /* news */
      "What's growing at Firmmit Uzbekistan.": "Что растёт в Firmmit Uzbekistan.",
      "Project milestones, technology insights and stories from the field as we bring smart farming to the region.":
        "Вехи проектов, технологические обзоры и истории с полей — по мере того как мы приносим умное фермерство в регион.",
      "Featured": "Главное",
      "Firmmit Uzbekistan opens as the regional branch of Firmmit Korea": "Firmmit Uzbekistan открывается как региональный филиал Firmmit Korea",
      "Our new office brings Korean smart-farm technology, engineering and agri-trade directly to growers in Uzbekistan — with local specialists and full head-office support.":
        "Новый офис приносит корейские умные агротехнологии, инженерию и агроторговлю напрямую аграриям Узбекистана — с местными специалистами и полной поддержкой головного офиса.",
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
      "Tell us about your land, crop and goals. Our team will get back to you with clear next steps — no obligation.":
        "Расскажите о вашей земле, культуре и целях. Наша команда ответит с чёткими следующими шагами — без обязательств.",
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
      "The map shows our exact office location — Mahtumquli 130, Yashnobod district, Tashkent.": "На карте показано точное расположение нашего офиса — Махтумкули 130, Яшнабадский район, Ташкент.",
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
      "Head Office ↗": "Bosh ofis ↗", "Head Office — Firmmit Korea ↗": "Bosh ofis — Firmmit Korea ↗",
      /* footer */
      "Bringing Korean smart-farm technology to Uzbekistan — greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.":
        "Koreyaning aqlli ferma texnologiyalarini O'zbekistonga olib kelamiz — issiqxonalar, nazorat qilinadigan muhitda dehqonchilik va mintaqaviy oziq-ovqat ta'minoti uchun agro-savdo.",
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
      "Why growers choose us": "Nega bizni tanlashadi", "Two-way trade": "Ikki tomonlama savdo",
      "How trade works with us": "Savdo qanday ishlaydi", "Our anchor partner": "Asosiy hamkorimiz",
      "Ecosystem": "Ekotizim", "Our network": "Tarmog'imiz",
      "Standards & accreditation": "Standartlar va akkreditatsiya", "Our commitment": "Majburiyatlarimiz",
      "Latest updates": "So'nggi yangiliklar", "Get in touch": "Bog'lanish", "Company details": "Kompaniya rekvizitlari",
      /* home hero */
      "Firmmit Uzbekistan delivers Korean controlled-environment agriculture — modern greenhouses, precision climate systems and reliable agri-systems — to farms across Uzbekistan and Central Asia.":
        "Firmmit Uzbekistan Koreyaning nazorat qilinadigan muhit dehqonchiligini — zamonaviy issiqxonalar, aniq iqlim tizimlari va ishonchli agro tizimni — O'zbekiston va Markaziy Osiyo fermalariga yetkazadi.",
      "Explore our solutions": "Yechimlarimiz", "Talk to our team": "Jamoa bilan bog'lanish",
      "Regions served": "Qamrab olingan hududlar", "Projects delivered": "Bajarilgan loyihalar",
      "Client retention": "Mijozlarni saqlab qolish", "Greenhouse projects": "Issiqxona loyihalari",
      "Regions covered": "Qamrab olingan hududlar", "Avg. water saved": "O'rtacha suv tejash",
      "Technical support": "Texnik yordam",
      "Four connected capabilities that take a project from first design to a thriving, data-driven farm.": "Loyihani birinchi loyihadan gullab-yashnayotgan, ma'lumotlarga asoslangan fermagacha olib boradigan to'rtta o'zaro bog'liq yo'nalish.",
      /* home intro */
      "As the Uzbekistan branch of Firmmit Korea, we localize proven smart-farm technology for the region's climate, crops and growers — combining Korean engineering with on-the-ground agronomy.":
        "Firmmit Koreaning O'zbekiston filiali sifatida biz sinovdan o'tgan aqlli ferma texnologiyasini mintaqa iqlimi, ekinlari va fermerlariga moslashtiramiz — Koreya muhandisligini mahalliy agronomiya bilan birlashtiramiz.",
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
      "Visit Head Office — Firmmit Korea": "Bosh ofis — Firmmit Korea",
      "Visit Firmmit Korea": "Firmmit Koreaga o'tish",
      /* CTA */
      "Bring smart farming to your land.": "Aqlli dehqonchilikni yeringizga olib keling.",
      "Whether you're planning a single greenhouse or a regional facility, our team will design a solution around your crop, climate and budget.":
        "Bitta issiqxona yoki mintaqaviy obyekt rejalashtiryapsizmi — jamoamiz ekiningiz, iqlim va byudjetingizga mos yechim ishlab chiqadi.",
      "Start your project": "Loyihani boshlash", "Get in touch →": "Bog'lanish →",
      /* about */
      "Korean smart-farm expertise, rooted in Uzbek soil.": "Koreya aqlli ferma tajribasi — O'zbek tuprog'ida.",
      "We are the Uzbekistan branch of Firmmit Korea — a smart-farm company preparing the food of tomorrow. Our mission is to make advanced, sustainable agriculture accessible to growers across the region.":
        "Biz Firmmit Koreaning O'zbekiston filialimiz — ertangi oziq-ovqatni tayyorlayotgan aqlli ferma kompaniyasi. Vazifamiz — ilg'or, barqaror qishloq xo'jaligini mintaqa fermerlariga qulay qilish.",
      "Firmmit Uzbekistan was established to adapt Firmmit Korea's proven controlled-environment agriculture for Central Asia. We combine Korean engineering, R&D and equipment with local agronomy, language and service — so growers get world-class technology with a partner next door.":
        "Firmmit Uzbekistan Firmmit Koreaning sinovdan o'tgan nazoratli muhit dehqonchiligini Markaziy Osiyoga moslashtirish uchun tashkil etilgan. Biz Koreya muhandisligi, R&D va jihozlarini mahalliy agronomiya, til va xizmat bilan birlashtiramiz — fermerlar yonidagi hamkor bilan jahon darajasidagi texnologiyaga ega bo'ladi.",
      "From feasibility study to harvest, we stay involved: designing the facility, sourcing the right systems, installing them, training the team and supporting every season that follows.":
        "Texnik-iqtisodiy asosdan hosilgacha biz yoningizdamiz: obyektni loyihalash, tizimlarni tanlash, o'rnatish, jamoani o'qitish va keyingi har bir mavsumni qo'llab-quvvatlash.",
      "Because your life is behind our work.": "Bizning ishimiz ortida insonlar hayoti turadi.",
      "Food security is personal. Everything we build is meant to help a family, a farm and a region grow with confidence.":
        "Oziq-ovqat xavfsizligi — shunchaki qishloq xo'jaligi masalasi emas. Bu har bir oila, fermer xo'jaligi va butun mintaqaning barqaror kelajagi bilan bevosita bog'liq.\n\nShu sababli biz yaratadigan har bir texnologik yechim ishonchli hosil, oqilona resurs sarfi va uzoq muddatli barqarorlik tamoyillariga asoslanadi.\n\nBiz Koreyaning ilg'or aqlli ferma texnologiyalarini Markaziy Osiyoning iqlimi, suv resurslari, ekinlari va mahalliy agrotexnik sharoitlariga moslashtirib, fermerlar uchun amaliy va o'lchanadigan natija beradigan yechimlarni joriy etamiz.",
      "MISSION": "MISSIYA", "VISION": "MAQSAD", "VALUES": "QADRIYATLAR",
      "Feed the future": "Kelajakni barqaror oziqlantirish",
      "Make dependable, high-yield farming possible in every climate through smart, resource-efficient technology.":
        "Aqlli, aniq va resurs-tejamkor agrotexnologiyalarni joriy etish orqali iqlim sharoitidan qat'i nazar, yuqori hosildor, samarali va barqaror qishloq xo'jaligi ishlab chiqarishini shakllantirish.\n\nBizning maqsadimiz — zamonaviy texnologiyani shunchaki joriy etish emas, balki uni fermer uchun real iqtisodiy natijaga aylantirishdir.",
      "A greener region": "Markaziy Osiyoda aqlli qishloq xo'jaligining yangi standartini yaratish",
      "To be Central Asia's most trusted smart-farm partner, cutting water use while raising quality and output.":
        "Suv va energiya sarfini optimallashtirish, hosildorlik va mahsulot sifatini oshirish hamda ishlab chiqarish jarayonlarini avtomatlashtirish orqali Markaziy Osiyoning eng ishonchli aqlli ferma texnologiyalari hamkoriga aylanish.\n\nBiz Koreya muhandisligi va innovatsiyasini mahalliy agronomik tajriba bilan birlashtirib, O'zbekiston va butun Markaziy Osiyo uchun mos, o'lchanadigan va kengaytiriladigan agrotexnologik yechimlarni rivojlantiramiz.",
      "Trust & results": "Ishonch. Aniqlik. Natija.",
      "Reliable, distinctive and professional — we measure success by our growers' harvests, not our promises.":
        "Bizning faoliyatimiz uchta asosiy tamoyilga tayanadi:\n\nIshonch — fermerlar, hamkorlar va investorlar bilan ochiq, mas'uliyatli va uzoq muddatli hamkorlikni yo'lga qo'yamiz.\n\nAniqlik — qarorlarni taxminlarga emas, ma'lumotlar, sensorlar, agronomik tahlil va real ko'rsatkichlarga asoslaymiz.\n\nNatija — har bir texnologik yechimni fermer uchun real, o'lchanadigan iqtisodiy samaraga aylantiramiz.",
      "Four commitments to every grower.": "Har bir fermerga to'rtta majburiyat.",
      "Localized engineering": "Mahalliylashtirilgan muhandislik",
      "Every system is specified for the site's climate, water and target crop — not copy-pasted from another market.":
        "Har bir tizim obyekt iqlimi, suvi va ekiniga moslab hisoblanadi — boshqa bozordan nusxa ko'chirilmaydi.",
      "Transparent sourcing": "Shaffof ta'minot",
      "Equipment is imported directly from Korea and vetted suppliers, with clear specifications and warranties.":
        "Jihozlar to'g'ridan-to'g'ri Koreyadan va tekshirilgan ta'minotchilardan, aniq spetsifikatsiya va kafolat bilan keltiriladi.",
      "Hands-on training": "Amaliy o'qitish",
      "We don't just install — we teach teams to operate and optimize their farm independently.":
        "Biz shunchaki o'rnatmaymiz — jamoalarni fermani mustaqil boshqarish va optimallashtirishga o'rgatamiz.",
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
        "Issiqxona karkasidan o'simlikdagi sensorgacha — O'zbekiston iqlimi va ekinlariga mo'ljallangan yaxlit aqlli tizimlarni yetkazamiz.",
      "Buy a complete facility or a single subsystem — every product is designed to integrate cleanly with the rest.":
        "To'liq obyekt yoki bitta quyi tizimni oling — har bir mahsulot qolganlariga silliq integratsiyalashadi.",
      "Galvanized-frame venlo and multi-span structures with diffused glazing, thermal screens and natural ventilation, sized to your plot.":
        "Tarqatuvchi oyna, issiqlik ekranlari va tabiiy shamollatishga ega galvanizli venlo va ko'p oraliqli konstruksiyalar — maydoningizga moslab.",
      "Venlo": "Venlo", "Multi-span": "Ko'p oraliqli", "Thermal screen": "Issiqlik ekrani",
      "Hydroponic & NFT Systems": "Gidroponika va NFT tizimlari",
      "Soil-free growing lines — NFT channels, deep-water culture and substrate systems — that cut water use and boost yield per m².":
        "Tuproqsiz o'stirish liniyalari — NFT kanallar, chuqur suvli kultura va substrat tizimlari — suv sarfini kamaytiradi va m² hosilni oshiradi.",
      "Climate Control": "Iqlim nazorati",
      "Heating, cooling, CO₂ enrichment and fogging managed by a central controller to hold the perfect growing environment.":
        "Markaziy kontroller boshqaruvidagi isitish, sovutish, CO₂ boyitish va tumanlash — ideal o'sish muhitini ushlab turadi.",
      "Heating": "Isitish", "Pad & fan": "Pad va fan", "CO₂": "CO₂",
      "IoT Sensors & Automation": "IoT sensorlar va avtomatika",
      "Wireless sensors for temperature, humidity, EC/pH, soil moisture and light, feeding a live dashboard and automated actions.":
        "Harorat, namlik, EC/pH, tuproq namligi va yorug'lik uchun simsiz sensorlar — jonli panel va avtomatik amallarni ta'minlaydi.",
      "Irrigation & Fertigation": "Sug'orish va fertigatsiya",
      "Drip lines, dosing units and filtration that deliver water and nutrients precisely — saving up to 30% versus open-field methods.":
        "Tomchilatib sug'orish liniyalari, dozalash va filtrlash — suv va oziqni aniq yetkazadi, ochiq dala usuliga nisbatan 30% gacha tejaydi.",
      "Drip": "Tomchilatib", "Dosing": "Dozalash", "Filtration": "Filtrlash",
      "Seedlings & Growing Media": "Ko'chatlar va substratlar",
      "Quality seedlings, coco-coir and rockwool substrates, and nutrient packs selected for high-value greenhouse crops.":
        "Sifatli ko'chatlar, kokos va mineral paxta substratlari hamda qimmatli issiqxona ekinlari uchun oziq to'plamlari.",
      "Seedlings": "Ko'chatlar", "Coco-coir": "Kokos", "Nutrients": "Oziqlar",
      "See our services": "Xizmatlarni ko'rish",
      "Our systems are tuned for the crops that perform best under controlled environments in Uzbekistan — protecting them from heat, dust and water stress.":
        "Tizimlarimiz O'zbekistonda nazoratli muhitda eng yaxshi o'sadigan ekinlarga moslangan — ularni issiq, chang va suv taqchilligidan himoya qiladi.",
      "Tomatoes": "Pomidor", "Cucumbers": "Bodring", "Peppers": "Qalampir", "Leafy greens": "Ko'katlar",
      "Strawberries": "Qulupnay", "Herbs": "Ziravor o'tlar", "Melons": "Qovun/tarvuz", "Flowers": "Gullar",
      "Need a tailored product package?": "Moslashtirilgan to'plam kerakmi?",
      "Tell us your crop, plot size and goals — we'll assemble the right system and quote it.":
        "Ekin, maydon va maqsadingizni ayting — mos tizimni yig'ib, narxini hisoblab beramiz.",
      "Request a quote": "Narx so'rash",
      "For sale": "Sotuvda", "Catalog": "Katalog", "Online Store": "Online savdo",
      "Beyond greenhouses and equipment, Firmmit Uzbekistan sells finished products: premium strawberry varieties, seedlings, fresh greenhouse produce and genuine spare parts — ready for market.":
        "Issiqxona va jihozlardan tashqari, Firmmit Uzbekistan tayyor mahsulotlarni ham sotadi: premium qulupnay navlari, ko'chatlar, yangi issiqxona mahsulotlari va original ehtiyot qismlar — bozorga tayyor.",
      "Seolhyang (설향) Strawberry": "Seolhyang (설향) qulupnayi",
      "Korea's most popular strawberry cultivar — large, glossy, high-sugar berries with excellent flavour and shelf life. Available as seedlings and fresh fruit.":
        "Koreyaning eng mashhur qulupnay navi — yirik, yaltiroq, shirin mevalar, ajoyib ta'm va saqlanish muddati bilan. Ko'chat va yangi meva sifatida mavjud.",
      "1943 Strawberry": "1943 qulupnayi",
      "A firm, aromatic strawberry variety selected for high yield and transport durability — well suited to controlled-environment growing in the region.":
        "Yuqori hosildorlik va tashishga chidamliligi uchun tanlangan zich, xushbo'y qulupnay navi — mintaqada nazoratli muhitda yetishtirishga juda mos.",
      "Fresh Greenhouse Produce": "Yangi issiqxona mahsuloti",
      "Tomatoes, cucumbers, peppers and leafy greens grown in Firmmit facilities — clean, consistent and available year-round.":
        "Firmmit obyektlarida yetishtirilgan pomidor, bodring, qalampir va ko'katlar — toza, barqaror va yil davomida mavjud.",
      "Seedlings & Starter Plants": "Ko'chat va nihollar",
      "Healthy, disease-screened seedlings and starter plants so growers begin every season from a strong, reliable base.":
        "Sog'lom, kasalliklarga tekshirilgan ko'chat va nihollar — fermerlar har mavsumni mustahkam, ishonchli asosdan boshlashi uchun.",
      "Genuine Spare Parts": "Original ehtiyot qismlar",
      "The same spare parts behind our maintenance service, available for direct purchase — sensors, controllers, fittings, pumps and consumables.":
        "Texnik xizmatimiz ortidagi o'sha ehtiyot qismlar, endi to'g'ridan-to'g'ri xarid uchun — sensorlar, kontrollerlar, fitinglar, nasoslar va sarf materiallari.",
      "Ready-Stock Equipment": "Omborda tayyor jihozlar",
      "Frequently ordered climate, irrigation and IoT items kept in stock for fast delivery without a full project lead time.":
        "Ko'p buyurtma qilinadigan iqlim, sug'orish va IoT mahsulotlari omborda — to'liq loyiha muddatisiz tez yetkazish uchun.",
      "Strawberry": "Qulupnay", "Fresh produce": "Yangi mahsulot", "Parts": "Ehtiyot qismlar", "Equipment": "Jihozlar",
      "Premium variety": "Premium nav", "Greenhouse-grown": "Issiqxonada", "Starter plants": "Nihollar",
      "In stock": "Omborda", "Ready to ship": "Jo'natishga tayyor",
      "Browse our full range with specifications, varieties and options in the Firmmit Uzbekistan product catalog. Download the PDF or request a printed copy.":
        "Firmmit Uzbekistan katalogida to'liq assortiment, spetsifikatsiya, navlar va variantlar bilan tanishing. PDF'ni yuklab oling yoki bosma nusxa so'rang.",
      "Download catalog (PDF)": "Katalogni yuklab olish (PDF)", "Request printed catalog": "Bosma katalog so'rash",
      "Browse the catalog": "Katalogni ochish",
      "Our full product catalog is available online — searchable and shown in your language.": "To'liq mahsulot katalogi onlayn mavjud — qidiruvli va sizning tilingizda.",
      "The catalog is being finalized — request a copy and we'll send it to you directly.":
        "Katalog yakunlanmoqda — nusxa so'rang, biz uni sizga bevosita yuboramiz.",
      /* services */
      "We stay with you from blueprint to harvest.": "Chizmadan hosilgacha yoningizdamiz.",
      "A greenhouse is only as good as the team behind it. Our end-to-end services make sure your investment produces — season after season.":
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
      "Structural, climate and irrigation design tailored to your site — delivered as clear, buildable plans.":
        "Obyektingizga moslangan konstruktiv, iqlim va sug'orish loyihasi — aniq, amalga oshiriladigan rejalar ko'rinishida.",
      "Installation & Commissioning": "O'rnatish va ishga tushirish",
      "Professional on-site assembly, wiring, calibration and handover of a ready-to-grow facility.":
        "Professional yig'ish, ulash, kalibrlash va o'stirishga tayyor obyektni topshirish.",
      "Grower Training": "Fermerlarni o'qitish",
      "Practical training in climate management, crop care and dashboard use — in Uzbek, Russian and English.":
        "Iqlim boshqaruvi, ekin parvarishi va panel bilan ishlash bo'yicha amaliy o'qitish — o'zbek, rus va ingliz tillarida.",
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
        "Bepul maslahatga yoziling — samarali issiqxonaga eng tez yo'lni chizib beramiz.",
      "Talk to a specialist": "Mutaxassis bilan gaplashish",
      /* import-export */
      "Connecting Korea and Uzbekistan across the supply chain.": "Ta'minot zanjiri bo'ylab Koreya va O'zbekistonni bog'laymiz.",
      "Beyond national borders — bringing proven Korean agri-technology into Uzbekistan and helping regional produce reach new markets.":
        "Chegaralardan tashqarida — sinovdan o'tgan Koreya agro-texnologiyasini O'zbekistonga olib kelamiz va mintaqa mahsulotining yangi bozorlarga chiqishiga yordam beramiz.",
      "Our head-office link with Firmmit Korea gives us a direct, trusted channel in both directions of the agricultural supply chain.":
        "Firmmit Korea bosh ofisi bilan aloqamiz agro ta'minot zanjirining ikkala yo'nalishida to'g'ridan-to'g'ri, ishonchli kanal beradi.",
      "IMPORT · KOREA → UZBEKISTAN": "IMPORT · KOREYA → O'ZBEKISTON",
      "Smart-farm equipment & inputs": "Aqlli ferma jihozlari va materiallari",
      "Greenhouse structures, climate and irrigation systems, IoT hardware, growing media and quality seedlings — sourced from Korea and vetted partners, delivered with documentation and warranty.":
        "Issiqxona konstruksiyalari, iqlim va sug'orish tizimlari, IoT jihozlari, substratlar va sifatli ko'chatlar — Koreya va tekshirilgan hamkorlardan, hujjat va kafolat bilan yetkaziladi.",
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
      "Delivery": "Yetkazib berish", "Goods delivered, inspected and — where needed — installed and commissioned.":
        "Tovarlar yetkaziladi, tekshiriladi va zarur bo'lsa o'rnatilib, ishga tushiriladi.",
      "Countries linked": "Bog'langan davlatlar", "Trusted suppliers": "Ishonchli ta'minotchilar",
      "Documented shipments": "Hujjatlangan jo'natmalar", "Product categories": "Mahsulot toifalari",
      "Import equipment or export your harvest.": "Jihoz import qiling yoki hosilingizni eksport qiling.",
      "Tell us what you need to move — our trade team will handle sourcing, logistics and compliance.":
        "Nimani ko'chirish kerakligini ayting — savdo jamoamiz manba, logistika va rasmiylashtirishni o'z zimmasiga oladi.",
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
      "Firmmit Korea — R&D, engineering and equipment supply.": "Firmmit Korea — R&D, muhandislik va jihoz ta'minoti.",
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
      "Supplier, institution or grower — if you're building the future of regional agriculture, let's talk.":
        "Ta'minotchi, muassasa yoki fermer — mintaqa qishloq xo'jaligi kelajagini qurayotgan bo'lsangiz, gaplashaylik.",
      "Partner with us": "Hamkor bo'lish",
      /* certificates */
      "Quality you can verify, not just trust.": "Ishonish emas, tekshirish mumkin bo'lgan sifat.",
      "Our systems, processes and trade operations are held to recognized standards — because reliable food production demands it.":
        "Tizimlarimiz, jarayonlarimiz va savdo operatsiyalarimiz tan olingan standartlarga javob beradi — chunki ishonchli oziq-ovqat ishlab chiqarish buni talab qiladi.",
      "Certifications behind every project.": "Har bir loyiha ortidagi sertifikatlar.",
      "Certification documents are being compiled and will be published here. Verified certificates are available to clients and partners on request.":
        "Sertifikat hujjatlari tayyorlanmoqda va shu yerda e'lon qilinadi. Tasdiqlangan sertifikatlar mijoz va hamkorlarga so'rov asosida taqdim etiladi.",
      "Certificate": "Sertifikat", "Coming soon": "Tez orada",
      "Standards that protect your harvest.": "Hosilingizni himoya qiladigan standartlar.",
      "Certification isn't paperwork to us — it's how we guarantee that a system installed in Tashkent performs like one engineered in Seoul, and that produce leaving a Firmmit facility is safe and traceable.":
        "Sertifikatlash biz uchun qog'ozbozlik emas — bu Toshkentda o'rnatilgan tizim Seulda loyihalanganidek ishlashi va Firmmit obyektidan chiqqan mahsulot xavfsiz hamda kuzatiladigan bo'lishining kafolatidir.",
      "Request certificate documents": "Sertifikat hujjatlarini so'rash",
      "Need documentation for a tender?": "Tender uchun hujjat kerakmi?",
      "We'll provide the certificates and specifications your procurement process requires.":
        "Xarid jarayoningiz uchun zarur sertifikat va spetsifikatsiyalarni taqdim etamiz.",
      "Contact us": "Bog'lanish", "Contact us →": "Bog'lanish →",
      /* news */
      "What's growing at Firmmit Uzbekistan.": "Firmmit Uzbekistanda nima o'smoqda.",
      "Project milestones, technology insights and stories from the field as we bring smart farming to the region.":
        "Aqlli dehqonchilikni mintaqaga olib kelar ekanmiz — loyiha bosqichlari, texnologik tahlillar va dala hikoyalari.",
      "Featured": "Asosiy",
      "Firmmit Uzbekistan opens as the regional branch of Firmmit Korea": "Firmmit Uzbekistan Firmmit Koreaning mintaqaviy filiali sifatida ochildi",
      "Our new office brings Korean smart-farm technology, engineering and agri-trade directly to growers in Uzbekistan — with local specialists and full head-office support.":
        "Yangi ofisimiz Koreya aqlli ferma texnologiyasi, muhandisligi va agro-savdosini O'zbekiston fermerlariga bevosita olib keladi — mahalliy mutaxassislar va bosh ofisning to'liq qo'llab-quvvatlashi bilan.",
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
      "Tell us about your land, crop and goals. Our team will get back to you with clear next steps — no obligation.":
        "Yeringiz, ekiningiz va maqsadlaringiz haqida ayting. Jamoamiz aniq keyingi qadamlar bilan javob beradi — hech qanday majburiyatsiz.",
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
      "The map shows our exact office location — Mahtumquli 130, Yashnobod district, Tashkent.": "Xaritada ofisimizning aniq joylashuvi ko'rsatilgan — Mahtumquli 130, Yashnobod tumani, Toshkent.",
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
      "Head Office ↗": "본사 ↗", "Head Office — Firmmit Korea ↗": "본사 — Firmmit Korea ↗",
      /* footer */
      "Bringing Korean smart-farm technology to Uzbekistan — greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.":
        "한국의 스마트팜 기술을 우즈베키스탄으로 — 온실, 시설 농업, 그리고 안정적인 지역 식량 공급을 위한 농산물 교역.",
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
      "Why growers choose us": "선택받는 이유", "Two-way trade": "양방향 교역",
      "How trade works with us": "교역 방식", "Our anchor partner": "핵심 파트너",
      "Ecosystem": "생태계", "Our network": "네트워크",
      "Standards & accreditation": "표준 및 인증", "Our commitment": "우리의 약속",
      "Latest updates": "최신 소식", "Get in touch": "문의하기", "Company details": "회사 정보",
      "For sale": "판매 중", "Catalog": "카탈로그", "Online Store": "온라인 스토어",
      /* home hero */
      "Firmmit Uzbekistan delivers Korean controlled-environment agriculture — modern greenhouses, precision climate systems and reliable agri-systems — to farms across Uzbekistan and Central Asia.":
        "Firmmit Uzbekistan은 한국의 시설 농업 — 현대식 온실, 정밀 기후 시스템, 신뢰할 수 있는 농업 시스템 — 을 우즈베키스탄과 중앙아시아 전역의 농가에 제공합니다.",
      "Explore our solutions": "솔루션 보기", "Talk to our team": "팀에 문의",
      "Regions served": "서비스 지역", "Projects delivered": "완료 프로젝트",
      "Client retention": "고객 유지율", "Greenhouse projects": "온실 프로젝트",
      "Regions covered": "서비스 지역", "Avg. water saved": "평균 물 절감", "Technical support": "기술 지원",
      "Four connected capabilities that take a project from first design to a thriving, data-driven farm.": "프로젝트를 첫 설계부터 데이터 기반의 번창하는 농장까지 이끄는 네 가지 연결된 역량.",
      /* home intro */
      "As the Uzbekistan branch of Firmmit Korea, we localize proven smart-farm technology for the region's climate, crops and growers — combining Korean engineering with on-the-ground agronomy.":
        "Firmmit Korea의 우즈베키스탄 지사로서, 우리는 검증된 스마트팜 기술을 지역의 기후·작물·농가에 맞게 현지화합니다 — 한국의 엔지니어링과 현장 농학을 결합합니다.",
      "✓ Turnkey smart greenhouses engineered for arid climates": "✓ 건조 기후에 맞춘 턴키 스마트 온실",
      "✓ Precision irrigation, sensors and climate automation": "✓ 정밀 관수, 센서 및 기후 자동화",
      "✓ Direct Korea–Uzbekistan supply and technical support": "✓ 한국–우즈베키스탄 직접 공급 및 기술 지원",
      "About Firmmit Uzbekistan": "Firmmit Uzbekistan 소개",
      /* business cards */
      "Smart Greenhouses": "스마트 온실",
      "Structures and glazing engineered for high yield and low water use in Central Asian conditions.":
        "중앙아시아 환경에서 높은 수확량과 낮은 물 사용을 위한 구조물과 유리.",
      "Climate & IoT": "기후 및 IoT",
      "Sensors, controllers and dashboards that automate temperature, humidity and nutrient delivery.":
        "온도·습도·양분 공급을 자동화하는 센서, 컨트롤러, 대시보드.",
      "Agronomy Services": "농학 서비스",
      "Installation, grower training and season-long support from Korean and local specialists.":
        "한국 및 현지 전문가의 설치, 농가 교육, 시즌 내내 지원.",
      "Import & Export ": "수출입 ",
      "Sourcing equipment from Korea and connecting Uzbek produce to regional markets.":
        "한국에서 장비를 조달하고 우즈베키스탄 농산물을 지역 시장에 연결.",
      "Learn more →": "자세히 →", "Read more →": "더 읽기 →",
      /* home global */
      "Korean R&D": "한국 R&D", "Local agronomy": "현지 농학",
      "Shared supply chain": "공유 공급망", "Joint training": "공동 교육",
      "Visit Head Office — Firmmit Korea": "본사 방문 — Firmmit Korea",
      "Visit Firmmit Korea": "Firmmit Korea 방문",
      /* CTA */
      "Bring smart farming to your land.": "당신의 땅에 스마트팜을 도입하세요.",
      "Whether you're planning a single greenhouse or a regional facility, our team will design a solution around your crop, climate and budget.":
        "온실 한 동이든 지역 규모 시설이든, 우리 팀이 작물·기후·예산에 맞는 솔루션을 설계합니다.",
      "Start your project": "프로젝트 시작", "Get in touch →": "문의하기 →",
      /* about */
      "Korean smart-farm expertise, rooted in Uzbek soil.": "우즈베키스탄 토양에 뿌리내린 한국 스마트팜 전문성.",
      "We are the Uzbekistan branch of Firmmit Korea — a smart-farm company preparing the food of tomorrow. Our mission is to make advanced, sustainable agriculture accessible to growers across the region.":
        "우리는 내일의 식량을 준비하는 스마트팜 기업 Firmmit Korea의 우즈베키스탄 지사입니다. 우리의 사명은 첨단·지속가능 농업을 지역 농가가 이용할 수 있게 하는 것입니다.",
      "Firmmit Uzbekistan was established to adapt Firmmit Korea's proven controlled-environment agriculture for Central Asia. We combine Korean engineering, R&D and equipment with local agronomy, language and service — so growers get world-class technology with a partner next door.":
        "Firmmit Uzbekistan은 Firmmit Korea의 검증된 시설 농업을 중앙아시아에 맞게 적용하기 위해 설립되었습니다. 한국의 엔지니어링·R&D·장비를 현지 농학·언어·서비스와 결합해, 농가는 가까운 파트너와 함께 세계적 수준의 기술을 이용합니다.",
      "From feasibility study to harvest, we stay involved: designing the facility, sourcing the right systems, installing them, training the team and supporting every season that follows.":
        "타당성 조사부터 수확까지 함께합니다: 시설 설계, 적합한 시스템 조달, 설치, 팀 교육, 그리고 이후 모든 시즌 지원.",
      "Because your life is behind our work.": "우리의 일 뒤에 당신의 삶이 있기에.",
      "Food security is personal. Everything we build is meant to help a family, a farm and a region grow with confidence.":
        "식량 안보는 개인의 문제입니다. 우리가 만드는 모든 것은 한 가족, 한 농장, 한 지역이 자신 있게 성장하도록 돕기 위한 것입니다.",
      "MISSION": "미션", "VISION": "비전", "VALUES": "가치",
      "Feed the future": "미래를 먹이다",
      "Make dependable, high-yield farming possible in every climate through smart, resource-efficient technology.":
        "스마트하고 자원 효율적인 기술로 모든 기후에서 안정적이고 높은 수확의 농업을 실현합니다.",
      "A greener region": "더 푸른 지역",
      "To be Central Asia's most trusted smart-farm partner, cutting water use while raising quality and output.":
        "물 사용을 줄이면서 품질과 생산량을 높이는, 중앙아시아에서 가장 신뢰받는 스마트팜 파트너가 되는 것.",
      "Trust & results": "신뢰와 성과",
      "Reliable, distinctive and professional — we measure success by our growers' harvests, not our promises.":
        "신뢰할 수 있고 독보적이며 전문적으로 — 우리는 약속이 아니라 농가의 수확으로 성공을 측정합니다.",
      "Four commitments to every grower.": "모든 농가를 위한 네 가지 약속.",
      "Localized engineering": "현지화 엔지니어링",
      "Every system is specified for the site's climate, water and target crop — not copy-pasted from another market.":
        "모든 시스템은 다른 시장에서 복사한 것이 아니라 현장의 기후·물·대상 작물에 맞게 설계됩니다.",
      "Transparent sourcing": "투명한 조달",
      "Equipment is imported directly from Korea and vetted suppliers, with clear specifications and warranties.":
        "장비는 한국과 검증된 공급업체에서 명확한 사양과 보증과 함께 직접 수입됩니다.",
      "Hands-on training": "실무 교육",
      "We don't just install — we teach teams to operate and optimize their farm independently.":
        "설치에서 그치지 않고, 팀이 농장을 독립적으로 운영·최적화하도록 가르칩니다.",
      "Long-term support": "장기 지원",
      "Remote monitoring and local service keep facilities productive season after season.":
        "원격 모니터링과 현지 서비스로 시설을 시즌마다 생산적으로 유지합니다.",
      "Firmmit Uzbekistan in numbers": "숫자로 보는 Firmmit Uzbekistan",
      "Partner suppliers": "협력 공급업체", "Global head office": "글로벌 본사",
      "Let's grow something lasting.": "오래가는 것을 함께 키웁시다.",
      "Partner with a team that treats your harvest as its own.": "당신의 수확을 자기 것처럼 여기는 팀과 함께하세요.",
      /* products */
      "Everything a modern farm needs, in one place.": "현대 농장에 필요한 모든 것을 한곳에서.",
      "From the greenhouse shell to the sensor on the vine, we supply integrated smart-farm systems engineered for Uzbekistan's climate and crops.":
        "온실 골조부터 작물의 센서까지, 우즈베키스탄의 기후와 작물에 맞춘 통합 스마트팜 시스템을 공급합니다.",
      "Buy a complete facility or a single subsystem — every product is designed to integrate cleanly with the rest.":
        "전체 시설이든 단일 하위 시스템이든 — 모든 제품은 나머지와 깔끔하게 통합되도록 설계되었습니다.",
      "Galvanized-frame venlo and multi-span structures with diffused glazing, thermal screens and natural ventilation, sized to your plot.":
        "확산 유리, 보온 스크린, 자연 환기를 갖춘 아연도금 벤로 및 멀티스팬 구조 — 부지에 맞게 설계.",
      "Venlo": "벤로", "Multi-span": "멀티스팬", "Thermal screen": "보온 스크린",
      "Hydroponic & NFT Systems": "수경재배 및 NFT 시스템",
      "Soil-free growing lines — NFT channels, deep-water culture and substrate systems — that cut water use and boost yield per m².":
        "무토양 재배 라인 — NFT 채널, 담액식, 배지 시스템 — 으로 물 사용을 줄이고 ㎡당 수확량을 높입니다.",
      "Climate Control": "기후 제어",
      "Heating, cooling, CO₂ enrichment and fogging managed by a central controller to hold the perfect growing environment.":
        "중앙 컨트롤러로 난방·냉방·CO₂ 공급·안개 분무를 관리해 최적의 재배 환경을 유지합니다.",
      "Heating": "난방", "Pad & fan": "패드 앤 팬", "CO₂": "CO₂",
      "IoT Sensors & Automation": "IoT 센서 및 자동화",
      "Wireless sensors for temperature, humidity, EC/pH, soil moisture and light, feeding a live dashboard and automated actions.":
        "온도·습도·EC/pH·토양 수분·광량용 무선 센서가 실시간 대시보드와 자동 제어에 데이터를 공급합니다.",
      "Irrigation & Fertigation": "관수 및 양액",
      "Drip lines, dosing units and filtration that deliver water and nutrients precisely — saving up to 30% versus open-field methods.":
        "점적 라인, 정량 공급기, 여과로 물과 양분을 정밀하게 공급 — 노지 방식 대비 최대 30% 절감.",
      "Drip": "점적", "Dosing": "정량 공급", "Filtration": "여과",
      "Seedlings & Growing Media": "묘목 및 배지",
      "Quality seedlings, coco-coir and rockwool substrates, and nutrient packs selected for high-value greenhouse crops.":
        "고부가가치 온실 작물을 위한 우수한 묘목, 코코코이어·암면 배지, 양분 패키지.",
      "Seedlings": "묘목", "Coco-coir": "코코코이어", "Nutrients": "양분",
      "See our services": "서비스 보기",
      "Our systems are tuned for the crops that perform best under controlled environments in Uzbekistan — protecting them from heat, dust and water stress.":
        "우리 시스템은 우즈베키스탄의 시설 환경에서 가장 잘 자라는 작물에 맞춰져 있으며, 더위·먼지·물 스트레스로부터 보호합니다.",
      "Tomatoes": "토마토", "Cucumbers": "오이", "Peppers": "고추/파프리카", "Leafy greens": "엽채류",
      "Strawberries": "딸기", "Herbs": "허브", "Melons": "멜론", "Flowers": "화훼",
      "Need a tailored product package?": "맞춤 제품 패키지가 필요하세요?",
      "Tell us your crop, plot size and goals — we'll assemble the right system and quote it.":
        "작물·부지 규모·목표를 알려주시면 — 적합한 시스템을 구성하고 견적을 드립니다.",
      "Request a quote": "견적 요청",
      /* new products */
      "Beyond greenhouses and equipment, Firmmit Uzbekistan sells finished products: premium strawberry varieties, seedlings, fresh greenhouse produce and genuine spare parts — ready for market.":
        "온실과 장비를 넘어, Firmmit Uzbekistan은 완제품도 판매합니다: 프리미엄 딸기 품종, 묘목, 신선한 온실 농산물, 정품 부품 — 시장에 바로 공급.",
      "Seolhyang (설향) Strawberry": "설향 딸기",
      "Korea's most popular strawberry cultivar — large, glossy, high-sugar berries with excellent flavour and shelf life. Available as seedlings and fresh fruit.":
        "한국에서 가장 인기 있는 딸기 품종 — 크고 윤기 있으며 당도가 높고 풍미와 저장성이 뛰어납니다. 묘목과 생과로 제공.",
      "1943 Strawberry": "1943 딸기",
      "A firm, aromatic strawberry variety selected for high yield and transport durability — well suited to controlled-environment growing in the region.":
        "높은 수확량과 수송 내구성을 위해 선발된 단단하고 향이 좋은 딸기 품종 — 지역의 시설 재배에 적합합니다.",
      "Fresh Greenhouse Produce": "신선 온실 농산물",
      "Tomatoes, cucumbers, peppers and leafy greens grown in Firmmit facilities — clean, consistent and available year-round.":
        "Firmmit 시설에서 재배한 토마토·오이·고추·엽채류 — 깨끗하고 균일하며 연중 공급.",
      "Seedlings & Starter Plants": "묘목 및 모종",
      "Healthy, disease-screened seedlings and starter plants so growers begin every season from a strong, reliable base.":
        "병해 검사를 마친 건강한 묘목과 모종으로 농가가 매 시즌을 튼튼하고 신뢰할 수 있는 기반에서 시작하도록 합니다.",
      "Genuine Spare Parts": "정품 부품",
      "The same spare parts behind our maintenance service, available for direct purchase — sensors, controllers, fittings, pumps and consumables.":
        "유지보수 서비스에 사용되는 동일한 부품을 직접 구매 가능 — 센서, 컨트롤러, 피팅, 펌프, 소모품.",
      "Ready-Stock Equipment": "재고 보유 장비",
      "Frequently ordered climate, irrigation and IoT items kept in stock for fast delivery without a full project lead time.":
        "자주 주문되는 기후·관수·IoT 품목을 재고로 보유해 전체 프로젝트 기간 없이 신속 배송.",
      "Strawberry": "딸기", "Fresh produce": "신선 농산물", "Parts": "부품", "Equipment": "장비",
      "Premium variety": "프리미엄 품종", "Greenhouse-grown": "온실 재배", "Starter plants": "모종",
      "In stock": "재고 있음", "Ready to ship": "출하 준비 완료",
      "Browse our full range with specifications, varieties and options in the Firmmit Uzbekistan product catalog. Download the PDF or request a printed copy.":
        "Firmmit Uzbekistan 제품 카탈로그에서 전체 제품군, 사양, 품종, 옵션을 확인하세요. PDF를 다운로드하거나 인쇄본을 요청하세요.",
      "Download catalog (PDF)": "카탈로그 다운로드 (PDF)", "Request printed catalog": "인쇄 카탈로그 요청",
      "Browse the catalog": "카탈로그 보기",
      "Our full product catalog is available online — searchable and shown in your language.": "전체 제품 카탈로그를 온라인에서 — 검색 가능하며 선택한 언어로 제공됩니다.",
      "The catalog is being finalized — request a copy and we'll send it to you directly.":
        "카탈로그를 마무리 중입니다 — 요청하시면 직접 보내드립니다.",
      /* services */
      "We stay with you from blueprint to harvest.": "설계도부터 수확까지 함께합니다.",
      "A greenhouse is only as good as the team behind it. Our end-to-end services make sure your investment produces — season after season.":
        "온실은 그 뒤의 팀만큼만 훌륭합니다. 우리의 엔드투엔드 서비스는 투자가 시즌마다 결실을 맺도록 보장합니다.",
      "Every engagement follows the same disciplined process, so you always know what happens next.":
        "모든 프로젝트는 동일한 체계적 절차를 따르므로 다음 단계를 항상 알 수 있습니다.",
      "Consult & Design": "상담 및 설계",
      "Site survey, crop selection and a facility design matched to your climate and budget.":
        "부지 조사, 작물 선정, 기후와 예산에 맞춘 시설 설계.",
      "Supply & Build": "공급 및 시공",
      "Import, deliver and install the greenhouse, climate and irrigation systems.":
        "온실·기후·관수 시스템의 수입, 배송, 설치.",
      "Train & Launch": "교육 및 가동",
      "Hands-on operator training and a supported first growing cycle.":
        "실무 운영자 교육과 첫 재배 주기 지원.",
      "Support & Optimize": "지원 및 최적화",
      "Remote monitoring, maintenance and agronomy to keep yields climbing.":
        "수확량을 계속 높이기 위한 원격 모니터링, 유지보수, 농학.",
      "Full-service smart farming": "풀서비스 스마트팜",
      "Consulting & Feasibility": "컨설팅 및 타당성",
      "Business case, crop economics, water assessment and ROI modelling before a single beam is ordered.":
        "기둥 하나 주문하기 전에 사업성, 작물 경제성, 물 평가, ROI 모델링.",
      "Engineering & Design": "엔지니어링 및 설계",
      "Structural, climate and irrigation design tailored to your site — delivered as clear, buildable plans.":
        "부지에 맞춘 구조·기후·관수 설계 — 명확하고 시공 가능한 도면으로 제공.",
      "Installation & Commissioning": "설치 및 시운전",
      "Professional on-site assembly, wiring, calibration and handover of a ready-to-grow facility.":
        "전문 현장 조립, 배선, 보정, 재배 준비된 시설 인계.",
      "Grower Training": "농가 교육",
      "Practical training in climate management, crop care and dashboard use — in Uzbek, Russian and English.":
        "기후 관리, 작물 관리, 대시보드 사용에 대한 실무 교육 — 우즈베크어·러시아어·영어.",
      "Maintenance & Spare Parts": "유지보수 및 부품",
      "Scheduled servicing, rapid repairs and a stocked supply of genuine spare parts.":
        "정기 점검, 신속 수리, 정품 부품 재고 공급.",
      "Remote Monitoring": "원격 모니터링",
      "Cloud dashboards and alerts let our specialists and yours watch the farm from anywhere.":
        "클라우드 대시보드와 알림으로 우리와 귀사의 전문가가 어디서든 농장을 확인합니다.",
      "Korean technology, local hands.": "한국의 기술, 현지의 손길.",
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
      "Connecting Korea and Uzbekistan across the supply chain.": "공급망 전반에서 한국과 우즈베키스탄을 연결합니다.",
      "Beyond national borders — bringing proven Korean agri-technology into Uzbekistan and helping regional produce reach new markets.":
        "국경을 넘어 — 검증된 한국 농업 기술을 우즈베키스탄에 도입하고 지역 농산물이 새로운 시장에 도달하도록 돕습니다.",
      "Our head-office link with Firmmit Korea gives us a direct, trusted channel in both directions of the agricultural supply chain.":
        "Firmmit Korea 본사와의 연결은 농업 공급망 양방향에서 직접적이고 신뢰할 수 있는 채널을 제공합니다.",
      "IMPORT · KOREA → UZBEKISTAN": "수입 · 한국 → 우즈베키스탄",
      "Smart-farm equipment & inputs": "스마트팜 장비 및 자재",
      "Greenhouse structures, climate and irrigation systems, IoT hardware, growing media and quality seedlings — sourced from Korea and vetted partners, delivered with documentation and warranty.":
        "온실 구조물, 기후·관수 시스템, IoT 하드웨어, 배지, 우수한 묘목 — 한국과 검증된 파트너에서 조달, 서류와 보증과 함께 배송.",
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
        "확립된 한국–우즈베키스탄 경로를 통한 운송·보험·통관 처리.",
      "Compliance": "규정 준수", "Certificates, phytosanitary and import/export paperwork prepared correctly.":
        "인증서, 식물 검역, 수출입 서류를 정확하게 준비.",
      "Delivery": "배송", "Goods delivered, inspected and — where needed — installed and commissioned.":
        "제품 배송, 검수, 필요 시 설치 및 시운전.",
      "Countries linked": "연결 국가", "Trusted suppliers": "신뢰 공급업체",
      "Documented shipments": "문서화된 선적", "Product categories": "제품 카테고리",
      "Import equipment or export your harvest.": "장비를 수입하거나 수확물을 수출하세요.",
      "Tell us what you need to move — our trade team will handle sourcing, logistics and compliance.":
        "무엇을 옮겨야 하는지 알려주시면 — 무역팀이 소싱·물류·규정 준수를 처리합니다.",
      "Start a trade inquiry": "교역 문의 시작",
      /* partners */
      "Strong farms are built on strong partnerships.": "강한 농장은 강한 파트너십 위에 세워집니다.",
      "We bring together our Korean head office, technology suppliers, institutions and growers into one dependable network.":
        "한국 본사, 기술 공급업체, 기관, 농가를 하나의 신뢰할 수 있는 네트워크로 모읍니다.",
      "Every project we deliver draws on the research, engineering and supply strength of Firmmit Korea. This direct relationship is what lets us offer Korean-grade smart-farm technology locally, with full technical backing.":
        "우리가 수행하는 모든 프로젝트는 Firmmit Korea의 연구·엔지니어링·공급 역량에 기반합니다. 이 직접적인 관계 덕분에 한국 수준의 스마트팜 기술을 완전한 기술 지원과 함께 현지에서 제공할 수 있습니다.",
      "Who we work with": "협력 대상",
      "Four groups of partners make every Firmmit Uzbekistan project possible.":
        "네 그룹의 파트너가 모든 Firmmit Uzbekistan 프로젝트를 가능하게 합니다.",
      "Firmmit Korea — R&D, engineering and equipment supply.": "Firmmit Korea — R&D, 엔지니어링, 장비 공급.",
      "Technology Suppliers": "기술 공급업체",
      "Greenhouse, climate, irrigation and sensor manufacturers.": "온실·기후·관수·센서 제조업체.",
      "Institutions": "기관", "Agricultural universities, research centers and associations.": "농업 대학, 연구소, 협회.",
      "Growers & Cooperatives": "농가 및 협동조합",
      "Farms and cooperatives operating our facilities on the ground.": "현장에서 우리 시설을 운영하는 농장과 협동조합.",
      "A growing family of partners": "성장하는 파트너 가족",
      "Our partner network is expanding. Partner organisations will be listed here as agreements are confirmed.":
        "파트너 네트워크가 확장되고 있습니다. 협약이 확정되는 대로 파트너 조직이 여기에 표시됩니다.",
      "Partner logos will appear here soon.": "파트너 로고가 곧 여기에 표시됩니다.",
      "Become a Firmmit partner.": "Firmmit 파트너가 되세요.",
      "Supplier, institution or grower — if you're building the future of regional agriculture, let's talk.":
        "공급업체·기관·농가 — 지역 농업의 미래를 만들고 계신다면, 이야기합시다.",
      "Partner with us": "파트너 되기",
      /* certificates */
      "Quality you can verify, not just trust.": "믿는 것을 넘어 검증할 수 있는 품질.",
      "Our systems, processes and trade operations are held to recognized standards — because reliable food production demands it.":
        "우리의 시스템·프로세스·교역 운영은 공인 표준을 준수합니다 — 신뢰할 수 있는 식량 생산이 이를 요구하기 때문입니다.",
      "Certifications behind every project.": "모든 프로젝트 뒤의 인증.",
      "Certification documents are being compiled and will be published here. Verified certificates are available to clients and partners on request.":
        "인증 서류를 취합 중이며 여기에 게시될 예정입니다. 검증된 인증서는 고객과 파트너에게 요청 시 제공됩니다.",
      "Certificate": "인증서", "Coming soon": "준비 중",
      "Standards that protect your harvest.": "당신의 수확을 보호하는 표준.",
      "Certification isn't paperwork to us — it's how we guarantee that a system installed in Tashkent performs like one engineered in Seoul, and that produce leaving a Firmmit facility is safe and traceable.":
        "인증은 우리에게 서류 작업이 아니라 — 타슈켄트에 설치된 시스템이 서울에서 설계된 것처럼 작동하고, Firmmit 시설에서 나가는 농산물이 안전하고 추적 가능함을 보장하는 방법입니다.",
      "Request certificate documents": "인증 서류 요청",
      "Need documentation for a tender?": "입찰용 서류가 필요하세요?",
      "We'll provide the certificates and specifications your procurement process requires.":
        "조달 절차에 필요한 인증서와 사양을 제공합니다.",
      "Contact us": "문의하기", "Contact us →": "문의하기 →",
      /* news */
      "What's growing at Firmmit Uzbekistan.": "Firmmit Uzbekistan의 소식.",
      "Project milestones, technology insights and stories from the field as we bring smart farming to the region.":
        "지역에 스마트팜을 도입하며 전하는 프로젝트 이정표, 기술 인사이트, 현장 이야기.",
      "Featured": "주요 소식",
      "Firmmit Uzbekistan opens as the regional branch of Firmmit Korea": "Firmmit Uzbekistan, Firmmit Korea 지역 지사로 개소",
      "Our new office brings Korean smart-farm technology, engineering and agri-trade directly to growers in Uzbekistan — with local specialists and full head-office support.":
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
      "Let's build your smart farm together.": "당신의 스마트팜을 함께 만들어요.",
      "Tell us about your land, crop and goals. Our team will get back to you with clear next steps — no obligation.":
        "귀하의 토지·작물·목표를 알려주세요. 우리 팀이 명확한 다음 단계와 함께 연락드립니다 — 부담 없이.",
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
      "The map shows our exact office location — Mahtumquli 130, Yashnobod district, Tashkent.": "지도에 저희 사무실의 정확한 위치가 표시되어 있습니다 — Makhtumkuli 130, 야시노바드구, 타슈켄트.",
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
  var current = 'en';

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
      '<span class="co">FIRMMIT<span class="dot">.</span></span><span class="region">UZ</span></a>';
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
          '<a class="nav-catalog" href="' + catalogHref(current) + '" target="_blank" rel="noopener" aria-label="Product catalog (PDF)">' + iconCatalog() + '<span>Catalog</span></a>' +
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
        '<a class="drawer-catalog" href="' + catalogHref(current) + '" target="_blank" rel="noopener">' + iconCatalog() + '<span>Catalog (PDF)</span></a>' +
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

    // catalog link follows the selected language
    document.addEventListener('firmmit:lang', function (e) {
      var href = catalogHref(e.detail);
      document.querySelectorAll('.nav-catalog, .drawer-catalog').forEach(function (a) { a.setAttribute('href', href); });
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
          '<p>Bringing Korean smart-farm technology to Uzbekistan — greenhouses, controlled-environment agriculture and agri-trade for a resilient regional food supply.</p>' +
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
        '<div class="footer-legal no-i18n">' +
          '<strong>' + LEGALNAME.en + '</strong>' +
          ' &nbsp;|&nbsp; Bank: ' + CO.bank + ' · MFO ' + CO.mfo + ' · Acc. ' + CO.account +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© 2026 Firmmit Uzbekistan. A branch of Firmmit Korea. All rights reserved.</span>' +
        '<div class="socials no-i18n">' +
          '<a href="' + KR_URL + '" target="_blank" rel="noopener" aria-label="Website">' + iconGlobe() + '</a>' +
          '<a href="mailto:' + CO.email + '" aria-label="Email">' + iconMail() + '</a>' +
          '<a href="' + hrefFor('contact') + '" aria-label="Contact">' + iconPin() + '</a>' +
        '</div>' +
      '</div></div>';
    document.body.appendChild(footer);
  }

  function iconGlobe() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>'; }
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
      var msg = { en: 'Thank you — your inquiry has been prepared. Our team will contact you at the email provided. (Demo form: no data is sent.)',
        ru: 'Спасибо — ваш запрос подготовлен. Наша команда свяжется с вами по указанной почте. (Демо-форма: данные не отправляются.)',
        uz: 'Rahmat — so\'rovingiz tayyorlandi. Jamoamiz ko\'rsatilgan pochta orqali siz bilan bog\'lanadi. (Demo shakl: ma\'lumot yuborilmaydi.)',
        ko: '감사합니다 — 문의가 준비되었습니다. 입력하신 이메일로 저희 팀이 연락드리겠습니다. (데모 양식: 데이터가 전송되지 않습니다.)' };
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
          brand.innerHTML = '<img class="logo-img" src="' + light + '" alt="Firmmit Uzbekistan"><span class="region">UZ</span>';
        } else {
          brand.innerHTML =
            '<img class="logo-img logo-light" src="' + light + '" alt="Firmmit Uzbekistan">' +
            '<img class="logo-img logo-dark" src="' + dark + '" alt="Firmmit Uzbekistan">' +
            '<span class="region">UZ</span>';
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
    setFavicon();
    var active = SPA ? currentKey() : (document.body.getAttribute('data-page') || '');
    buildHeader(active);
    buildFooter();
    loadPhotos();
    loadLogo();
    playVideos();
    reveals();
    counters();
    contactForm();
    var saved = 'en';
    try { saved = localStorage.getItem(STORE) || 'en'; } catch (e) {}
    apply(saved);
    if (SPA) {
      showRoute(currentKey());
      window.addEventListener('hashchange', function () { showRoute(currentKey()); });
    }
  });
})();
