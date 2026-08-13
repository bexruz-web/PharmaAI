// src/i18n/translations.ts
export type Lang = 'UZ' | 'OZ' | 'RU' | 'EN'

export interface Translations {
  // Language select
  chooseLanguage: string
  languageSubtitle: string
  appSubtitle: string

  // Onboarding
  skip: string
  next: string
  getStarted: string
  letsStart: string
  slide1Title: string
  slide1Desc: string
  slide2Title: string
  slide2Desc: string
  slide3Title: string
  slide3Desc: string

  // Auth
  welcome: string
  loginTitle: string
  loginSubtitle: string
  phoneLabel: string
  phonePlaceholder: string
  loginBtn: string
  otpTitle: string
  otpSubtitle: string
  otpVerify: string
  otpResend: string
  otpError: string
  phoneError: string
  help: string
  back: string
  changePhone: string
  termsOfUse: string
  privacyPolicy: string
  termsTitle: string
  termsContent: string
  privacyTitle: string
  privacyContent: string

  // Header
  selectLocation: string
  location: string

  // Bottom nav
  home: string
  map: string
  scan: string
  cart: string
  profile: string

  // Home
  goodMorning: string
  goodAfternoon: string
  goodEvening: string
  searchPlaceholder: string
  quickActions: string
  findMedicine: string
  findPharmacy: string
  aiScan: string
  consultation: string
  nearbyPharmacies: string
  seeAll: string
  specialOffers: string
  open24h: string
  km: string
  categories: string
  popularMedicines: string
  rxRequired: string
  otc: string
  addedToCart: string
  noNotifications: string
  markAllAsRead: string
  savedAddresses: string
  noResults: string

  // Home — banners
  bannerAiTag: string
  bannerAiTitle: string
  bannerAiSubtitle: string
  bannerAiCta: string
  bannerGrandTag: string
  bannerGrandTitle: string
  bannerGrandSubtitle: string
  bannerGrandCta: string
  bannerRegionalTag: string
  bannerRegionalTitle: string
  bannerRegionalSubtitle: string
  bannerRegionalCta: string
  // Home — misc inline text
  filterClear: string
  retryLoad: string
  medicineCount: string
  nothingFound: string
  nothingFoundHint: string
  lastSearches: string
  medicines: string
  pharmacies: string

  // Map
  mapTitle: string
  mapSubtitle: string

  // Scan
  scanTitle: string
  scanSubtitle: string

  // Cart
  cartTitle: string
  cartEmpty: string

  // Profile
  profileTitle: string
  logout: string
  darkMode: string
  language: string
  notifications: string
  orders: string
}

const uz: Translations = {
  chooseLanguage: 'Tilni tanlang',
  languageSubtitle: 'Ilovadan foydalanish uchun qulay tilingizni tanlang',
  appSubtitle: 'Aqlli Dorixona Platformasi',

  skip: "O'tkazib yuborish",
  next: 'Keyingisi',
  getStarted: 'Boshlash',
  letsStart: 'Boshlash',
  slide1Title: "Dori skaneri va narx solishtirish",
  slide1Desc: "Dori qutisini suratga oling — AI yaqin dorixonalardagi narxlarni solishtiradi va topib beradi.",
  slide2Title: "AI ovozli dori qo'llanmasi",
  slide2Desc: "Dori qabul qilish va dozasi bo'yicha eng muhim ma'lumotlarni 20 soniyalik qisqa audio xabarda eshiting.",
  slide3Title: "24/7 AI-konsultant bilan chat",
  slide3Desc: "Savollaringizga real vaqt rejimida AI-konsultantdan javob oling va dori eslatmalarini sozlang.",

  welcome: 'Xush kelibsiz!',
  loginTitle: 'Tizimga kirish',
  loginSubtitle: 'Telefon raqamingizni kiriting va SMS kod orqali kiring',
  phoneLabel: 'Telefon raqam',
  phonePlaceholder: '__ ___ __ __',
  loginBtn: 'SMS kod olish',
  otpTitle: 'Kodni tasdiqlang',
  otpSubtitle: "Telefon raqamingizga yuborilgan 4 xonali kodni kiriting",
  otpVerify: 'Tasdiqlash',
  otpResend: 'Qayta yuborish',
  otpError: "Noto'g'ri kod yoki kodning amal qilish muddati tugagan",
  phoneError: "Telefon raqamingizni to'liq kiriting.",
  help: 'Yordam',
  back: 'Orqaga',
  changePhone: "O'zgartirish",
  termsOfUse: 'Foydalanish shartlari',
  privacyPolicy: 'Maxfiylik siyosati',
  termsTitle: 'Foydalanish shartlari va kelishuv',
  termsContent: "PharmaAI platformasidan foydalanish orqali siz barcha shart va qoidalarga rozilik bildirasiz. Dori vositalarini buyurtma qilish va bron qilish faqat axborot-qidiruv xarakteriga ega bo'lib, retseptli dorilarni olishda shifokor retsepti taqdim etilishi shart.",
  privacyTitle: 'Maxfiylik va ma\'lumotlar xavfsizligi',
  privacyContent: "Biz sizning shaxsiy ma'lumotlaringiz (ismingiz va telefon raqamingiz) xavfsizligini ta'minlash uchun zamonaviy shifrlash texnologiyalaridan foydalanamiz. Platforma ma'lumotlari uchinchi shaxslarga berilmaydi va faqat xizmat ko'rsatish sifatini yaxshilash maqsadida qo'llaniladi.",

  selectLocation: 'Joylashuvni tanlang',
  location: 'Toshkent, Yunusobod',

  home: 'Asosiy',
  map: 'Xarita',
  scan: 'Skanerlash',
  cart: 'Savat',
  profile: 'Profil',

  goodMorning: 'Xayrli tong',
  goodAfternoon: 'Xayrli kun',
  goodEvening: 'Xayrli kech',
  searchPlaceholder: 'Dori yoki dorixona qidiring...',
  quickActions: 'Tezkor amallar',
  findMedicine: 'Dori topish',
  findPharmacy: 'Dorixona topish',
  aiScan: 'AI Skan',
  consultation: 'Maslahat',
  nearbyPharmacies: 'Yaqin dorixonalar',
  seeAll: "Barchasini ko'rish",
  specialOffers: 'Maxsus takliflar',
  open24h: '24 soat ochiq',
  km: 'km',
  categories: 'Kategoriyalar',
  popularMedicines: 'Ommabop dorilar',
  rxRequired: 'Retseptli (Rx)',
  otc: 'Retseptsiz (OTC)',
  addedToCart: 'Savatga qo\'shildi!',
  noNotifications: 'Hozircha hech qanday bildirishnoma yo\'q',
  markAllAsRead: 'Barchasini o\'qilgan deb belgilash',
  savedAddresses: 'Saqlangan manzillar',
  noResults: 'Hech narsa topilmadi',

  bannerAiTag: 'PHARMA AI SCAN',
  bannerAiTitle: 'Dori qutisini skanerlang',
  bannerAiSubtitle: "Qutini rasmga oling — AI dori haqida barcha ma'lumotni topib beradi.",
  bannerAiCta: 'Sinab ko\'rish →',
  bannerGrandTag: 'GRAND PHARM',
  bannerGrandTitle: 'Kafolatlangan dori sifati',
  bannerGrandSubtitle: 'Sertifikatlangan dorilar va eng keng assortiment.',
  bannerGrandCta: 'Dorixonaga o\'tish →',
  bannerRegionalTag: 'QASHQADARYO REGIONAL',
  bannerRegionalTitle: 'Qashqadaryoning eng yirik tarmog\'i',
  bannerRegionalSubtitle: 'Barcha zarur dorilar va tibbiy buyumlar bir joyda.',
  bannerRegionalCta: 'Dorixonaga o\'tish →',
  filterClear: 'Filtr tozalash',
  retryLoad: 'Qayta urinish',
  medicineCount: 'ta dori',
  nothingFound: 'Kechirasiz, so\'ralgan dori yoki ma\'lumot bazada topilmadi.',
  nothingFoundHint: 'Iltimos, dori nomini to\'g\'ri yozganingizni tekshiring yoki boshqa kategoriyani tanlang.',
  lastSearches: 'Oxirgi qidiruvlar',
  medicines: 'Dorilar',
  pharmacies: 'Dorixonalar',

  mapTitle: 'Dorixonalar xaritasi',
  mapSubtitle: 'Yaqin atrofingizdagi barcha dorixonalar',

  scanTitle: 'Retsept Skaneri',
  scanSubtitle: "Dori yoki retsept rasmini skanerlang — AI to'liq ma'lumot beradi",

  cartTitle: 'Mening savatcham',
  cartEmpty: 'Savatcha bo\'sh',

  profileTitle: 'Mening profilim',
  logout: 'Chiqish',
  darkMode: 'Tungi rejim',
  language: 'Til',
  notifications: 'Bildirishnomalar',
  orders: 'Buyurtmalarim',
}

const oz: Translations = {
  chooseLanguage: 'Тилни танланг',
  languageSubtitle: 'Иловадан фойдаланиш учун қулай тилингизни танланг',
  appSubtitle: 'Ақлли Дорихона Платформаси',

  skip: 'Ўтказиб юбориш',
  next: 'Давом этиш',
  getStarted: 'Бошлаш',
  letsStart: 'Бошлаш',
  slide1Title: "Дори сканери ва нарх солиштириш",
  slide1Desc: "Дори қутисини суратга олинг — AI яқин дорихоналардаги нархларни солиштиради ва топиб беради.",
  slide2Title: "AI овозли дори қўлланмаси",
  slide2Desc: "Дори қабул қилиш ва дозаси бўйича энг муҳим маълумотларни 20 сониялик қисқа аудио хабарда эшитинг.",
  slide3Title: "24/7 AI-консультант билан чат",
  slide3Desc: "Саволларингизга реал вақт режимида AI-консультантдан жавоб олинг ва дори эслатмаларини созланг.",

  welcome: 'Хуш келибсиз!',
  loginTitle: 'Тизимга кириш',
  loginSubtitle: 'Телефон рақамингизни киритинг ва SMS код орқали киринг',
  phoneLabel: 'Телефон рақам',
  phonePlaceholder: '__ ___ __ __',
  loginBtn: 'SMS код олиш',
  otpTitle: 'Кодни тасдиқланг',
  otpSubtitle: "Телефон рақамингизга юборилган 4 хонали кодни киритинг",
  otpVerify: 'Тасдиқлаш',
  otpResend: 'Қайта юбориш',
  otpError: "Нотўғри код ёки коднинг амал қилиш муддати тугаган",
  phoneError: "Телефон рақамингизни тўлиқ киритинг.",
  help: 'Ёрдам',
  back: 'Орқага',
  changePhone: 'Ўзгартириш',
  termsOfUse: 'Фойдаланиш шартлари',
  privacyPolicy: 'Махфийлик сиёсати',
  termsTitle: 'Фойдаланиш шартлари ва келишув',
  termsContent: "PharmaAI платформасидан фойдаланиш орқали сиз барча шарт ва қоидаларга розилик билдирасиз.",
  privacyTitle: 'Махфийлик ва маълумотлар хавфсизлиги',
  privacyContent: "Биз сизнинг шахсий маълумотларингиз хавфсизлигини таъминлаш учун замонавий шифрлаш технологияларидан фойдаланамиз.",

  selectLocation: 'Жойлашувни танланг',
  location: 'Тошкент, Юнусобод',

  home: 'Асосий',
  map: 'Харита',
  scan: 'Сканерлаш',
  cart: 'Сават',
  profile: 'Профиль',

  goodMorning: 'Хайрли тонг',
  goodAfternoon: 'Хайрли кун',
  goodEvening: 'Хайрли кеч',
  searchPlaceholder: 'Дори ёки дорихона қидиринг...',
  quickActions: 'Тезкор амаллар',
  findMedicine: 'Дори топиш',
  findPharmacy: 'Дорихона топиш',
  aiScan: 'AI Скан',
  consultation: 'Маслаҳат',
  nearbyPharmacies: 'Яқин дорихоналар',
  seeAll: "Барчасини кўриш",
  specialOffers: 'Махсус таклифлар',
  open24h: '24 соат очиқ',
  km: 'км',
  categories: 'Категориялар',
  popularMedicines: 'Оммабоп дорилар',
  rxRequired: 'Рецептли (Rx)',
  otc: 'Рецептсиз (OTC)',
  addedToCart: 'Саватга қўшилди!',
  noNotifications: 'Ҳозирча ҳеч қандай билдиришнома йўқ',
  markAllAsRead: 'Барчасини ўқилган деб белгилаш',
  savedAddresses: 'Сақланган манзиллар',
  noResults: 'Ҳеч нарса топилмади',

  bannerAiTag: 'PHARMA AI SCAN',
  bannerAiTitle: 'Дори қутисини сканерланг',
  bannerAiSubtitle: 'Қутини расмга олинг — AI дори ҳақида барча маълумотни топиб беради.',
  bannerAiCta: 'Синаб кўриш →',
  bannerGrandTag: 'GRAND PHARM',
  bannerGrandTitle: 'Кафолатланган дори сифати',
  bannerGrandSubtitle: 'Сертификатланган дорилар ва энг кенг ассортимент.',
  bannerGrandCta: 'Дорихонага ўтиш →',
  bannerRegionalTag: 'ҚАШҚАДАРЁ РЕГИОНАЛ',
  bannerRegionalTitle: 'Қашқадарёнинг энг йирик тармоғи',
  bannerRegionalSubtitle: 'Барча зарур дорилар ва тиббий буюмлар бир жойда.',
  bannerRegionalCta: 'Дорихонага ўтиш →',
  filterClear: 'Фильтрни тозалаш',
  retryLoad: 'Қайта уриниш',
  medicineCount: 'та дори',
  nothingFound: 'Кечирасиз, сўралган дори ёки маълумот базада топилмади.',
  nothingFoundHint: 'Илтимос, дори номини тўғри ёзганингизни текширинг ёки бошқа категорияни танланг.',
  lastSearches: 'Охирги қидирувлар',
  medicines: 'Дорилар',
  pharmacies: 'Дорихоналар',

  mapTitle: 'Дорихоналар харитаси',
  mapSubtitle: 'Яқин атрофингиздаги барча дорихоналар',

  scanTitle: 'Рецепт Сканери',
  scanSubtitle: "Дори ёки рецепт расмини сканерланг — AI тўлиқ маълумот беради",

  cartTitle: 'Менинг саватчам',
  cartEmpty: 'Саватча бўш',

  profileTitle: 'Менинг профилим',
  logout: 'Чиқиш',
  darkMode: 'Тунги режим',
  language: 'Тил',
  notifications: 'Билдиришномалар',
  orders: 'Буюртмаларим',
}

const ru: Translations = {
  chooseLanguage: 'Выберите язык',
  languageSubtitle: 'Выберите удобный для вас язык для начала работы',
  appSubtitle: 'Умная аптечная платформа',

  skip: 'Пропустить',
  next: 'Продолжить',
  getStarted: 'Начать',
  letsStart: 'Начать',
  slide1Title: "Сканер лекарств и сравнение цен",
  slide1Desc: "Сфотографируйте упаковку — AI сравнит цены и найдет в ближайших аптеках.",
  slide2Title: "AI голосовая инструкция",
  slide2Desc: "Слушайте важную информацию о приеме и дозировке лекарств в коротком 20-секундном аудиосообщении.",
  slide3Title: "Чат с 24/7 AI-консультантом",
  slide3Desc: "Получайте ответы от AI-консультанта в режиме реального времени и настраивайте напоминания о приеме лекарств.",

  welcome: 'Добро пожаловать!',
  loginTitle: 'Войти в систему',
  loginSubtitle: 'Введите ваш номер телефона для входа по SMS коду',
  phoneLabel: 'Номер телефона',
  phonePlaceholder: '__ ___ __ __',
  loginBtn: 'Получить SMS код',
  otpTitle: 'Подтвердите код',
  otpSubtitle: 'Введите 4-значный код, отправленный на ваш номер',
  otpVerify: 'Подтвердить',
  otpResend: 'Отправить повторно',
  otpError: 'Неверный код или срок его действия истек',
  phoneError: 'Введите номер телефона полностью.',
  help: 'Помощь',
  back: 'Назад',
  changePhone: 'Изменить',
  termsOfUse: 'Условия использования',
  privacyPolicy: 'Политика конфиденциальности',
  termsTitle: 'Условия использования и соглашение',
  termsContent: "Используя платформу PharmaAI, вы соглашаетесь со всеми условиями и правилами.",
  privacyTitle: 'Конфиденциальность и безопасность',
  privacyContent: "Мы используем современные технологии шифрования для обеспечения безопасности ваших личных данных.",

  selectLocation: 'Выбрать локацию',
  location: 'Ташкент, Юнусабад',

  home: 'Главная',
  map: 'Карта',
  scan: 'Скан',
  cart: 'Корзина',
  profile: 'Профиль',

  goodMorning: 'Доброе утро',
  goodAfternoon: 'Добрый день',
  goodEvening: 'Добрый вечер',
  searchPlaceholder: 'Поиск лекарств или аптек...',
  quickActions: 'Быстрые действия',
  findMedicine: 'Найти лекарство',
  findPharmacy: 'Найти аптеку',
  aiScan: 'AI Скан',
  consultation: 'Консультация',
  nearbyPharmacies: 'Ближайшие аптеки',
  seeAll: 'Смотреть все',
  specialOffers: 'Специальные предложения',
  open24h: 'Открыто 24ч',
  km: 'км',
  categories: 'Категории',
  popularMedicines: 'Популярные лекарства',
  rxRequired: 'По рецепту (Rx)',
  otc: 'Без рецепта (OTC)',
  addedToCart: 'Добавлено в корзину!',
  noNotifications: 'Пока нет уведомлений',
  markAllAsRead: 'Отметить все как прочитанные',
  savedAddresses: 'Сохраненные адреса',
  noResults: 'Ничего не найдено',

  bannerAiTag: 'PHARMA AI SCAN',
  bannerAiTitle: 'Сканируйте упаковку лекарства',
  bannerAiSubtitle: 'Сфотографируйте — AI найдёт всю информацию о лекарстве.',
  bannerAiCta: 'Попробовать →',
  bannerGrandTag: 'GRAND PHARM',
  bannerGrandTitle: 'Гарантированное качество',
  bannerGrandSubtitle: 'Сертифицированные лекарства и широкий ассортимент.',
  bannerGrandCta: 'Перейти в аптеку →',
  bannerRegionalTag: 'QASHQADARYO REGIONAL',
  bannerRegionalTitle: 'Крупнейшая сеть Кашкадарьи',
  bannerRegionalSubtitle: 'Все необходимые лекарства и медтовары в одном месте.',
  bannerRegionalCta: 'Перейти в аптеку →',
  filterClear: 'Сбросить фильтр',
  retryLoad: 'Повторить',
  medicineCount: 'лекарств',
  nothingFound: 'Извините, запрошенное лекарство не найдено в базе.',
  nothingFoundHint: 'Проверьте правильность написания или выберите другую категорию.',
  lastSearches: 'Последние запросы',
  medicines: 'Лекарства',
  pharmacies: 'Аптеки',

  mapTitle: 'Карта аптек',
  mapSubtitle: 'Все аптеки поблизости',

  scanTitle: 'Сканер рецептов',
  scanSubtitle: 'Сканируйте лекарство или рецепт — AI даст полную информацию',

  cartTitle: 'Моя корзина',
  cartEmpty: 'Корзина пуста',

  profileTitle: 'Мой профиль',
  logout: 'Выйти',
  darkMode: 'Тёмный режим',
  language: 'Язык',
  notifications: 'Уведомления',
  orders: 'Мои заказы',
}

const en: Translations = {
  chooseLanguage: 'Choose Language',
  languageSubtitle: 'Select your preferred language to get started',
  appSubtitle: 'Smart Pharmacy Platform',

  skip: 'Skip',
  next: 'Continue',
  getStarted: 'Get Started',
  letsStart: 'Get Started',
  slide1Title: "Medicine Scanner & Price Comparison",
  slide1Desc: "Take a photo of the medicine box — AI will compare prices and find it in nearby pharmacies.",
  slide2Title: "AI Voice Medicine Guide",
  slide2Desc: "Listen to key information on medicine dosage and usage in a short 20-second audio guide.",
  slide3Title: "24/7 AI Consultant Chat",
  slide3Desc: "Get real-time answers from your AI consultant and set up medicine intake reminders.",

  welcome: 'Welcome!',
  loginTitle: 'Sign In',
  loginSubtitle: 'Enter your phone number to sign in via SMS code',
  phoneLabel: 'Phone Number',
  phonePlaceholder: '__ ___ __ __',
  loginBtn: 'Get SMS Code',
  otpTitle: 'Verify Code',
  otpSubtitle: 'Enter the 4-digit code sent to your phone',
  otpVerify: 'Verify',
  otpResend: 'Resend',
  otpError: 'Incorrect code or code has expired',
  phoneError: 'Please enter phone number in full.',
  help: 'Help',
  back: 'Back',
  changePhone: 'Change',
  termsOfUse: 'Terms of Use',
  privacyPolicy: 'Privacy Policy',
  termsTitle: 'Terms of Use & Agreement',
  termsContent: "By using the PharmaAI platform, you agree to all terms and conditions.",
  privacyTitle: 'Privacy & Data Security',
  privacyContent: "We use modern encryption technologies to ensure the safety of your personal data.",

  selectLocation: 'Select Location',
  location: 'Tashkent, Yunusobod',

  home: 'Home',
  map: 'Map',
  scan: 'Scan',
  cart: 'Cart',
  profile: 'Profile',

  goodMorning: 'Good Morning',
  goodAfternoon: 'Good Afternoon',
  goodEvening: 'Good Evening',
  searchPlaceholder: 'Search medicines or pharmacies...',
  quickActions: 'Quick Actions',
  findMedicine: 'Find Medicine',
  findPharmacy: 'Find Pharmacy',
  aiScan: 'AI Scan',
  consultation: 'Consultation',
  nearbyPharmacies: 'Nearby Pharmacies',
  seeAll: 'See All',
  specialOffers: 'Special Offers',
  open24h: 'Open 24h',
  km: 'km',
  categories: 'Categories',
  popularMedicines: 'Popular Medicines',
  rxRequired: 'Rx Required',
  otc: 'OTC (Over Counter)',
  addedToCart: 'Added to cart!',
  noNotifications: 'No notifications yet',
  markAllAsRead: 'Mark all as read',
  savedAddresses: 'Saved addresses',
  noResults: 'No results found',

  bannerAiTag: 'PHARMA AI SCAN',
  bannerAiTitle: 'Scan your medicine box',
  bannerAiSubtitle: 'Take a photo — AI finds all information about the medicine instantly.',
  bannerAiCta: 'Try it →',
  bannerGrandTag: 'GRAND PHARM',
  bannerGrandTitle: 'Guaranteed medicine quality',
  bannerGrandSubtitle: 'Certified medicines and the widest selection.',
  bannerGrandCta: 'Go to pharmacy →',
  bannerRegionalTag: 'QASHQADARYO REGIONAL',
  bannerRegionalTitle: "Qashqadaryo's largest network",
  bannerRegionalSubtitle: 'All essential medicines and medical supplies in one place.',
  bannerRegionalCta: 'Go to pharmacy →',
  filterClear: 'Clear filter',
  retryLoad: 'Retry',
  medicineCount: 'medicines',
  nothingFound: 'Sorry, the requested medicine was not found in the database.',
  nothingFoundHint: 'Please check the spelling or try a different category.',
  lastSearches: 'Recent searches',
  medicines: 'Medicines',
  pharmacies: 'Pharmacies',

  mapTitle: 'Pharmacy Map',
  mapSubtitle: 'All pharmacies near you',

  scanTitle: 'Prescription Scanner',
  scanSubtitle: 'Scan medicine or prescription — AI gives full information',

  cartTitle: 'My Cart',
  cartEmpty: 'Cart is empty',

  profileTitle: 'My Profile',
  logout: 'Logout',
  darkMode: 'Dark Mode',
  language: 'Language',
  notifications: 'Notifications',
  orders: 'My Orders',
}

export const translations: Record<Lang, Translations> = { UZ: uz, OZ: oz, RU: ru, EN: en }
