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
  letsStart: 'Boshladik!',
  slide1Title: "Dori skaneri va narx solishtirish",
  slide1Desc: "Dori qutisini suratga oling — AI yaqin dorixonalardagi narxlarni solishtiradi va topib beradi.",
  slide2Title: "AI ovozli dori qo'llanmasi",
  slide2Desc: "Dori qabul qilish va dozasi bo'yicha eng muhim ma'lumotlarni 20 soniyalik qisqa audio xabarda eshiting.",
  slide3Title: "Uyga yetkazish va Tezkor bron",
  slide3Desc: "Tibbiy vositalarni buyurtma qiling.",

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
  letsStart: 'Бошладик!',
  slide1Title: "Дориларни топиш ва нархини солиштириш",
  slide1Desc: "Яқин дорихоналардаги захирани кўринг.",
  slide2Title: "Сканер ва Овозли ёрдамчи",
  slide2Desc: "Рецептни суратга олинг ва қўлланмани тингланг.",
  slide3Title: "Уйга етказиш ва Тезкор бронь",
  slide3Desc: "Тиббий воситаларни буюртма қилинг.",

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
  letsStart: 'Начнем!',
  slide1Title: "Поиск лекарств и сравнение цен",
  slide1Desc: "Проверяйте наличие в ближайших аптеках.",
  slide2Title: "Сканер и голосовой помощник",
  slide2Desc: "Сфотографируйте рецепт и прослушайте инструкцию.",
  slide3Title: "Доставка на дом и быстрый бронь",
  slide3Desc: "Заказывайте медицинские товары.",

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
  termsOfUse: 'Условия использования',
  privacyPolicy: 'Политика конфиденциальности',
  termsTitle: 'Условия использования и соглашение',
  termsContent: "Используя платформу PharmaAI, вы соглашаетесь со всеми условиями и правилами. Поиск и бронирование лекарств носят исключительно информационно-справочный характер.",
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
  letsStart: "Let's start!",
  slide1Title: "Find Medicines & Compare Prices",
  slide1Desc: "Check stock in nearby pharmacies.",
  slide2Title: "Scanner & Voice Assistant",
  slide2Desc: "Take a picture of the prescription and listen to the guide.",
  slide3Title: "Home Delivery & Quick Booking",
  slide3Desc: "Order medical products.",

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
