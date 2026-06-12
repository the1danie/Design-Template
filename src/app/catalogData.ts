export type Badge = "Новинка" | "Хит" | "Топ мастер" | null;

export interface Product {
  id: number;
  name: string;
  master: string;
  price: number;
  oldPrice?: number;
  badge: Badge;
  rating: number;
  reviews: number;
}

export interface CategoryConfig {
  slug: string;
  title: string;
  total: number;
  subCats: { id: string; label: string }[];
  subTags: { label: string }[];
  /** Two alternating product card images for variety */
  productImages: [string, string];
  products: Product[];
}

const ALL_CATEGORIES: CategoryConfig[] = [
  // ── Украшения ────────────────────────────────────────────────────────────
  {
    slug: "ukrasheniya",
    title: "Украшения",
    total: 312,
    subCats: [
      { id: "necklaces",  label: "Колье, подвески" },
      { id: "rings",      label: "Кольца" },
      { id: "earrings",   label: "Серьги" },
      { id: "bracelets",  label: "Браслеты" },
      { id: "sets",       label: "Наборы украшений" },
      { id: "pins",       label: "Броши и булавки" },
    ],
    subTags: [
      { label: "Подарок" }, { label: "Для дома" }, { label: "Казахское" }, { label: "Сладкие подарки" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1646031348418-1840acec6d9d?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1646031348680-0756f9eb8b9e?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Серьги-тумар с лазуритом",        master: "Айгерим К.", price: 14800, oldPrice: 16800, badge: "Новинка",    rating: 4.8, reviews: 42 },
      { id: 2,  name: "Кольцо с агатом ручной работы",   master: "Зарина Н.",  price: 22500,                  badge: "Топ мастер", rating: 5.0, reviews: 118 },
      { id: 3,  name: "Браслет «Степной ветер»",         master: "Мадина А.",  price: 9800,  oldPrice: 13000,  badge: "Хит",        rating: 4.6, reviews: 87 },
      { id: 4,  name: "Колье с натуральной бирюзой",     master: "Балнур Д.",  price: 31200,                  badge: null,         rating: 4.9, reviews: 23 },
      { id: 5,  name: "Серьги «Алтын» из серебра",       master: "Данияр С.",  price: 17600, oldPrice: 21000,  badge: "Новинка",    rating: 4.7, reviews: 55 },
      { id: 6,  name: "Набор украшений «Казахская роза»", master: "Алия М.",   price: 44900,                  badge: "Топ мастер", rating: 5.0, reviews: 204 },
      { id: 7,  name: "Брошь с вышивкой «Шаншар»",      master: "Гульнара Р.",price: 7300,  oldPrice: 8900,   badge: "Хит",        rating: 4.5, reviews: 61 },
      { id: 8,  name: "Кольцо «Солнце» с янтарём",      master: "Асем Б.",    price: 18400,                  badge: null,         rating: 4.8, reviews: 33 },
      { id: 9,  name: "Серьги с лазуритом «Тумар»",     master: "Айгерим К.", price: 12600, oldPrice: 15000,  badge: "Новинка",    rating: 4.6, reviews: 19 },
      { id: 10, name: "Подвеска «Боже» в серебре",       master: "Зарина Н.",  price: 9100,                   badge: null,         rating: 4.9, reviews: 77 },
      { id: 11, name: "Браслет из натурального агата",   master: "Балнур Д.",  price: 6800,  oldPrice: 9200,   badge: "Хит",        rating: 4.4, reviews: 92 },
      { id: 12, name: "Колье «Степь» ручной работы",    master: "Мадина А.",  price: 27000,                  badge: "Топ мастер", rating: 5.0, reviews: 156 },
      { id: 13, name: "Серьги-кольца с орнаментом",     master: "Алия М.",    price: 11200, oldPrice: 13500,  badge: "Новинка",    rating: 4.7, reviews: 28 },
      { id: 14, name: "Браслет «Жайлау» серебро+камень",master: "Данияр С.",  price: 15800,                  badge: null,         rating: 4.8, reviews: 44 },
      { id: 15, name: "Кольцо с лазуритом «Нур»",       master: "Гульнара Р.",price: 19500, oldPrice: 23000,  badge: "Хит",        rating: 4.6, reviews: 71 },
      { id: 16, name: "Набор серёжек «Алтын Дала»",     master: "Асем Б.",    price: 38000,                  badge: "Топ мастер", rating: 4.9, reviews: 183 },
    ],
  },

  // ── Текстиль и одежда ────────────────────────────────────────────────────
  {
    slug: "tekstil",
    title: "Текстиль и одежда",
    total: 187,
    subCats: [
      { id: "shawls",   label: "Платки и шали" },
      { id: "clothes",  label: "Одежда" },
      { id: "bags",     label: "Сумки" },
      { id: "felt",     label: "Войлочные изделия" },
      { id: "embroid",  label: "Вышивка" },
      { id: "rugs",     label: "Ковры и сырмаки" },
    ],
    subTags: [
      { label: "Национальный" }, { label: "Войлок" }, { label: "Вышивка" }, { label: "Подарок" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1601056639638-c53c50e13ead?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1612179543058-ab74d388e0ce?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Сырмак настенный из войлока",       master: "Нуржан А.", price: 28500,                  badge: "Топ мастер", rating: 5.0, reviews: 94 },
      { id: 2,  name: "Шаль с казахским орнаментом",       master: "Айша К.",   price: 8900,  oldPrice: 11200,  badge: "Хит",        rating: 4.7, reviews: 63 },
      { id: 3,  name: "Войлочная сумка «Дала»",            master: "Бибигул М.",price: 12400,                  badge: "Новинка",    rating: 4.6, reviews: 31 },
      { id: 4,  name: "Вышитый чапан детский",             master: "Зульфия Р.",price: 19800, oldPrice: 24000,  badge: null,         rating: 4.8, reviews: 47 },
      { id: 5,  name: "Коврик «Текемет» из войлока",       master: "Нуржан А.", price: 45000,                  badge: "Топ мастер", rating: 5.0, reviews: 112 },
      { id: 6,  name: "Платок шёлковый с орнаментом",      master: "Айша К.",   price: 5600,  oldPrice: 7000,   badge: "Хит",        rating: 4.5, reviews: 88 },
      { id: 7,  name: "Войлочная шляпа «Казахская»",       master: "Бибигул М.",price: 7200,                   badge: "Новинка",    rating: 4.7, reviews: 22 },
      { id: 8,  name: "Скатерть с вышивкой «Шаршы»",      master: "Зульфия Р.",price: 16500, oldPrice: 20000,  badge: null,         rating: 4.9, reviews: 55 },
      { id: 9,  name: "Сумка-торба из кожи и войлока",     master: "Нуржан А.", price: 22000,                  badge: "Хит",        rating: 4.8, reviews: 79 },
      { id: 10, name: "Детское одеяло «Корпе» ручной работы",master: "Айша К.", price: 34000, oldPrice: 40000,  badge: "Топ мастер", rating: 5.0, reviews: 136 },
      { id: 11, name: "Наволочка с казахской вышивкой",    master: "Бибигул М.",price: 4800,  oldPrice: 6200,   badge: null,         rating: 4.4, reviews: 41 },
      { id: 12, name: "Войлочный ковёр «Арнау»",           master: "Зульфия Р.",price: 62000,                  badge: "Топ мастер", rating: 4.9, reviews: 28 },
      { id: 13, name: "Шёлковое кимоно с орнаментом",      master: "Нуржан А.", price: 38000, oldPrice: 45000,  badge: "Новинка",    rating: 4.7, reviews: 19 },
      { id: 14, name: "Войлочная игрушка «Юрта»",          master: "Айша К.",   price: 3200,                   badge: "Хит",        rating: 4.6, reviews: 103 },
      { id: 15, name: "Фартук с вышивкой «Ою»",            master: "Бибигул М.",price: 6100,  oldPrice: 8000,   badge: "Новинка",    rating: 4.5, reviews: 37 },
      { id: 16, name: "Праздничный чапан взрослый",         master: "Зульфия Р.",price: 55000,                  badge: "Топ мастер", rating: 5.0, reviews: 201 },
    ],
  },

  // ── Казахское handmade ───────────────────────────────────────────────────
  {
    slug: "handmade",
    title: "Казахское handmade",
    total: 243,
    subCats: [
      { id: "deco",     label: "Декор и сувениры" },
      { id: "kitchen",  label: "Кухонная утварь" },
      { id: "toys",     label: "Игрушки" },
      { id: "art",      label: "Живопись" },
      { id: "leather",  label: "Кожаные изделия" },
      { id: "wood",     label: "Дерево и резьба" },
    ],
    subTags: [
      { label: "Сувенир" }, { label: "Подарок" }, { label: "Интерьер" }, { label: "Для детей" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1621157479674-9fd8fa4fbf81?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1761445777185-036152040a14?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Деревянная шкатулка с орнаментом",  master: "Болат Е.",   price: 11500,                  badge: "Хит",        rating: 4.8, reviews: 76 },
      { id: 2,  name: "Кожаный кошелёк ручной работы",     master: "Сейткали Д.",price: 8900,  oldPrice: 11000,  badge: "Новинка",    rating: 4.6, reviews: 44 },
      { id: 3,  name: "Керамический чайник «Шыны»",        master: "Айгерим К.", price: 16800,                  badge: "Топ мастер", rating: 5.0, reviews: 132 },
      { id: 4,  name: "Панно из войлока «Казахстан»",      master: "Нуржан А.",  price: 32000, oldPrice: 38000,  badge: null,         rating: 4.9, reviews: 57 },
      { id: 5,  name: "Деревянный сундук «Ару»",           master: "Болат Е.",   price: 48000,                  badge: "Топ мастер", rating: 5.0, reviews: 89 },
      { id: 6,  name: "Кожаная сумка «Батыр»",             master: "Сейткали Д.",price: 27500, oldPrice: 33000,  badge: "Хит",        rating: 4.7, reviews: 61 },
      { id: 7,  name: "Сувенир «Домбра» деревянная",       master: "Болат Е.",   price: 6200,  oldPrice: 7800,   badge: "Хит",        rating: 4.5, reviews: 118 },
      { id: 8,  name: "Картина «Степь» масло на холсте",   master: "Айгерим К.", price: 85000,                  badge: "Топ мастер", rating: 5.0, reviews: 43 },
      { id: 9,  name: "Резная деревянная рамка для фото",  master: "Нуржан А.",  price: 4500,  oldPrice: 5900,   badge: "Новинка",    rating: 4.6, reviews: 29 },
      { id: 10, name: "Кожаный ремень с тиснением",        master: "Сейткали Д.",price: 9800,                   badge: null,         rating: 4.8, reviews: 52 },
      { id: 11, name: "Гончарная кружка «Алматы»",         master: "Айгерим К.", price: 3800,  oldPrice: 5000,   badge: "Хит",        rating: 4.4, reviews: 95 },
      { id: 12, name: "Деревянная игрушка «Юрта»",         master: "Болат Е.",   price: 7600,                   badge: "Новинка",    rating: 4.7, reviews: 38 },
      { id: 13, name: "Кожаный чехол для телефона",        master: "Сейткали Д.",price: 5200,  oldPrice: 6800,   badge: null,         rating: 4.5, reviews: 67 },
      { id: 14, name: "Акварель «Алатау в цвету»",         master: "Айгерим К.", price: 24000,                  badge: "Топ мастер", rating: 5.0, reviews: 31 },
      { id: 15, name: "Деревянный поднос с резьбой",       master: "Нуржан А.",  price: 13500, oldPrice: 17000,  badge: "Хит",        rating: 4.6, reviews: 84 },
      { id: 16, name: "Керамический горшок для растений",  master: "Айгерим К.", price: 5900,                   badge: "Новинка",    rating: 4.7, reviews: 26 },
    ],
  },

  // ── Свечи и ароматы ──────────────────────────────────────────────────────
  {
    slug: "sveci",
    title: "Свечи и ароматы",
    total: 156,
    subCats: [
      { id: "soy",      label: "Соевые свечи" },
      { id: "beeswax",  label: "Восковые свечи" },
      { id: "aroma",    label: "Ароматические" },
      { id: "decor",    label: "Декоративные" },
      { id: "oils",     label: "Эфирные масла" },
      { id: "sets",     label: "Подарочные наборы" },
    ],
    subTags: [
      { label: "Подарок" }, { label: "Ароматерапия" }, { label: "Набор" }, { label: "Интерьер" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1603218678692-3967d7523bb0?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1602607203588-d6d0eda790e3?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Соевая свеча «Лаванда»",            master: "Балнур Д.",  price: 2900,  oldPrice: 3800,   badge: "Хит",        rating: 4.9, reviews: 211 },
      { id: 2,  name: "Свеча «Ваниль и сандал»",           master: "Дина К.",    price: 3400,                   badge: "Топ мастер", rating: 5.0, reviews: 178 },
      { id: 3,  name: "Набор свечей «Степные травы»",      master: "Балнур Д.",  price: 7800,  oldPrice: 9500,   badge: "Новинка",    rating: 4.7, reviews: 64 },
      { id: 4,  name: "Восковая свеча «Горный мёд»",       master: "Асель Ж.",   price: 2200,                   badge: null,         rating: 4.6, reviews: 89 },
      { id: 5,  name: "Декоративная свеча «Юрта»",         master: "Дина К.",    price: 4500,  oldPrice: 5800,   badge: "Хит",        rating: 4.8, reviews: 147 },
      { id: 6,  name: "Ароматический диффузор «Арча»",     master: "Балнур Д.",  price: 5900,                   badge: "Топ мастер", rating: 5.0, reviews: 93 },
      { id: 7,  name: "Свеча-кристалл «Аметист»",          master: "Асель Ж.",   price: 3100,  oldPrice: 4000,   badge: "Новинка",    rating: 4.7, reviews: 38 },
      { id: 8,  name: "Подарочный набор 5 свечей",          master: "Дина К.",    price: 12500,                  badge: "Хит",        rating: 4.9, reviews: 122 },
      { id: 9,  name: "Соевая свеча «Роза и пачули»",      master: "Балнур Д.",  price: 2700,  oldPrice: 3400,   badge: null,         rating: 4.5, reviews: 76 },
      { id: 10, name: "Свеча в деревянном подсвечнике",    master: "Асель Ж.",   price: 6800,                   badge: "Новинка",    rating: 4.8, reviews: 51 },
      { id: 11, name: "Эфирное масло «Степная мята»",      master: "Дина К.",    price: 1900,  oldPrice: 2600,   badge: "Хит",        rating: 4.6, reviews: 188 },
      { id: 12, name: "Набор ароматических масел ×6",      master: "Балнур Д.",  price: 9200,                   badge: "Топ мастер", rating: 5.0, reviews: 267 },
      { id: 13, name: "Свеча «Кофе и корица»",             master: "Асель Ж.",   price: 2400,  oldPrice: 3100,   badge: null,         rating: 4.7, reviews: 43 },
      { id: 14, name: "Восковая таблетка «Арча»",          master: "Дина К.",    price: 1200,                   badge: "Новинка",    rating: 4.5, reviews: 109 },
      { id: 15, name: "Соевая свеча с засушенными цветами",master: "Балнур Д.",  price: 3600,  oldPrice: 4600,   badge: "Хит",        rating: 4.8, reviews: 95 },
      { id: 16, name: "Подарочный набор «Уют» (3 шт.)",   master: "Асель Ж.",   price: 8400,                   badge: "Топ мастер", rating: 4.9, reviews: 142 },
    ],
  },

  // ── Игрушки ──────────────────────────────────────────────────────────────
  {
    slug: "igrushki",
    title: "Игрушки",
    total: 118,
    subCats: [
      { id: "soft",     label: "Мягкие игрушки" },
      { id: "wooden",   label: "Деревянные" },
      { id: "felt",     label: "Войлочные" },
      { id: "educ",     label: "Развивающие" },
      { id: "dolls",    label: "Куклы" },
      { id: "national", label: "Национальные" },
    ],
    subTags: [
      { label: "Новорождённым" }, { label: "До 3 лет" }, { label: "Школьникам" }, { label: "Подарок" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1711893351945-cbb76248cf5d?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1771578957512-383bfe854256?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Войлочная лошадка «Тулпар»",        master: "Гүлжан Е.", price: 4500,  oldPrice: 5800,   badge: "Хит",        rating: 4.9, reviews: 143 },
      { id: 2,  name: "Кукла в национальном костюме",      master: "Сауле М.",  price: 7800,                   badge: "Топ мастер", rating: 5.0, reviews: 89 },
      { id: 3,  name: "Деревянный алфавит казахский",      master: "Болат Е.",  price: 5200,  oldPrice: 6500,   badge: "Новинка",    rating: 4.7, reviews: 51 },
      { id: 4,  name: "Мягкая игрушка «Верблюжонок»",     master: "Гүлжан Е.", price: 3600,                   badge: null,         rating: 4.6, reviews: 78 },
      { id: 5,  name: "Войлочный пазл «Юрта» 20 деталей", master: "Сауле М.",  price: 8900,  oldPrice: 11000,  badge: "Хит",        rating: 4.8, reviews: 112 },
      { id: 6,  name: "Развивающая доска «Бизиборд»",     master: "Болат Е.",  price: 12000,                  badge: "Топ мастер", rating: 5.0, reviews: 204 },
      { id: 7,  name: "Мягкая кукла «Алтынай»",           master: "Гүлжан Е.", price: 5900,  oldPrice: 7400,   badge: "Новинка",    rating: 4.7, reviews: 37 },
      { id: 8,  name: "Деревянная сортировка «Формы»",    master: "Сауле М.",  price: 4100,                   badge: null,         rating: 4.5, reviews: 66 },
      { id: 9,  name: "Войлочный зоопарк (набор 6 шт.)",  master: "Болат Е.",  price: 9600,  oldPrice: 12000,  badge: "Хит",        rating: 4.8, reviews: 91 },
      { id: 10, name: "Кукла «Батыр» в доспехах",         master: "Гүлжан Е.", price: 11200,                  badge: "Топ мастер", rating: 5.0, reviews: 157 },
      { id: 11, name: "Деревянная пирамидка с орнаментом",master: "Сауле М.",  price: 3200,  oldPrice: 4100,   badge: "Новинка",    rating: 4.6, reviews: 44 },
      { id: 12, name: "Мягкий мяч «Радуга» вязаный",      master: "Болат Е.",  price: 2800,                   badge: null,         rating: 4.4, reviews: 82 },
      { id: 13, name: "Войлочная домбра декоративная",    master: "Гүлжан Е.", price: 6700,  oldPrice: 8500,   badge: "Хит",        rating: 4.7, reviews: 63 },
      { id: 14, name: "Кукла в казахском платье «Нур»",   master: "Сауле М.",  price: 8400,                   badge: "Топ мастер", rating: 4.9, reviews: 118 },
      { id: 15, name: "Деревянный конструктор «Аул»",     master: "Болат Е.",  price: 14500, oldPrice: 18000,  badge: "Новинка",    rating: 4.8, reviews: 29 },
      { id: 16, name: "Сортер «Казахские буквы»",          master: "Гүлжан Е.", price: 5500,  oldPrice: 7000,   badge: "Хит",        rating: 4.6, reviews: 97 },
    ],
  },

  // ── Живопись и арт ───────────────────────────────────────────────────────
  {
    slug: "art",
    title: "Живопись и арт",
    total: 94,
    subCats: [
      { id: "oil",      label: "Масло на холсте" },
      { id: "waterc",   label: "Акварель" },
      { id: "graph",    label: "Графика" },
      { id: "digital",  label: "Цифровое искусство" },
      { id: "sculpt",   label: "Скульптура" },
      { id: "photo",    label: "Фотография" },
    ],
    subTags: [
      { label: "Пейзаж" }, { label: "Портрет" }, { label: "Абстракция" }, { label: "Для интерьера" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1598495494482-172d89ff078c?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1597274303632-880ef8660375?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Картина «Закат над Алатау»",        master: "Айгерим К.", price: 85000,                  badge: "Топ мастер", rating: 5.0, reviews: 43 },
      { id: 2,  name: "Акварель «Тюльпаны степи»",         master: "Рустем Д.",  price: 18500, oldPrice: 22000,  badge: "Хит",        rating: 4.8, reviews: 77 },
      { id: 3,  name: "Графика «Казахский орнамент»",      master: "Алина С.",   price: 12000,                  badge: "Новинка",    rating: 4.7, reviews: 31 },
      { id: 4,  name: "Портрет маслом на заказ",           master: "Айгерим К.", price: 65000, oldPrice: 80000,  badge: null,         rating: 4.9, reviews: 28 },
      { id: 5,  name: "Акварельная открытка «Юрта»",       master: "Рустем Д.",  price: 1800,  oldPrice: 2400,   badge: "Хит",        rating: 4.6, reviews: 192 },
      { id: 6,  name: "Картина «Степная лошадь» масло",    master: "Алина С.",   price: 120000,                 badge: "Топ мастер", rating: 5.0, reviews: 19 },
      { id: 7,  name: "Абстракция «Дала» акрил",           master: "Айгерим К.", price: 34000, oldPrice: 42000,  badge: "Новинка",    rating: 4.8, reviews: 36 },
      { id: 8,  name: "Набор открыток «Казахстан» 10 шт.", master: "Рустем Д.",  price: 5600,                   badge: "Хит",        rating: 4.7, reviews: 154 },
      { id: 9,  name: "Акварель «Горы Заилийского Алатау»",master: "Алина С.",   price: 24000, oldPrice: 30000,  badge: null,         rating: 4.9, reviews: 22 },
      { id: 10, name: "Декоративная тарелка с росписью",   master: "Айгерим К.", price: 9800,                   badge: "Топ мастер", rating: 5.0, reviews: 88 },
      { id: 11, name: "Мини-картина «Яблоки» масло 20×20",master: "Рустем Д.",  price: 14500, oldPrice: 18000,  badge: "Новинка",    rating: 4.6, reviews: 41 },
      { id: 12, name: "Постер «Алматы» графика",           master: "Алина С.",   price: 3200,  oldPrice: 4500,   badge: "Хит",        rating: 4.5, reviews: 103 },
      { id: 13, name: "Акварель «Шёлковый путь»",          master: "Айгерим К.", price: 28000,                  badge: "Топ мастер", rating: 4.9, reviews: 67 },
      { id: 14, name: "Картина «Бабушка за самоваром»",    master: "Рустем Д.",  price: 72000, oldPrice: 90000,  badge: null,         rating: 5.0, reviews: 15 },
      { id: 15, name: "Рисунок пером «Орнамент» А3",       master: "Алина С.",   price: 7400,                   badge: "Новинка",    rating: 4.7, reviews: 29 },
      { id: 16, name: "Акварельный набор открыток A6 ×20", master: "Рустем Д.",  price: 8900,  oldPrice: 11000,  badge: "Хит",        rating: 4.8, reviews: 118 },
    ],
  },

  // ── Кожа и сумки ────────────────────────────────────────────────────────
  {
    slug: "kozha",
    title: "Кожа и сумки",
    total: 134,
    subCats: [
      { id: "bags",     label: "Сумки" },
      { id: "wallets",  label: "Кошельки" },
      { id: "belts",    label: "Ремни" },
      { id: "cases",    label: "Чехлы и обложки" },
      { id: "shoes",    label: "Обувь" },
      { id: "deco",     label: "Декор из кожи" },
    ],
    subTags: [
      { label: "Ручная работа" }, { label: "Натуральная кожа" }, { label: "Подарок" }, { label: "Унисекс" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1637759292654-a12cb2be085e?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Кожаная сумка «Батыр» ручная работа", master: "Сейткали Д.", price: 27500, oldPrice: 33000,  badge: "Хит",        rating: 4.8, reviews: 94 },
      { id: 2,  name: "Кошелёк с тиснением «Орнамент»",      master: "Нурлан Б.",   price: 6800,                   badge: "Топ мастер", rating: 5.0, reviews: 162 },
      { id: 3,  name: "Кожаный ремень с казахским узором",   master: "Сейткали Д.", price: 9800,  oldPrice: 12500,  badge: "Новинка",    rating: 4.7, reviews: 43 },
      { id: 4,  name: "Обложка для паспорта из кожи",        master: "Аружан Т.",   price: 3900,                   badge: null,         rating: 4.6, reviews: 77 },
      { id: 5,  name: "Сумка-шоппер натуральная кожа",       master: "Меруерт К.",  price: 34000, oldPrice: 42000,  badge: "Хит",        rating: 4.9, reviews: 128 },
      { id: 6,  name: "Кожаный чехол для ноутбука",          master: "Нурлан Б.",   price: 14500,                  badge: "Топ мастер", rating: 5.0, reviews: 87 },
      { id: 7,  name: "Портмоне «Степь» с тиснением",        master: "Ермек С.",    price: 8200,  oldPrice: 10500,  badge: "Новинка",    rating: 4.7, reviews: 55 },
      { id: 8,  name: "Кожаный браслет с орнаментом",        master: "Лаура Ж.",    price: 4600,                   badge: null,         rating: 4.5, reviews: 91 },
      { id: 9,  name: "Дорожная сумка «Жолаушы»",            master: "Сейткали Д.", price: 52000, oldPrice: 65000,  badge: "Топ мастер", rating: 5.0, reviews: 34 },
      { id: 10, name: "Кожаный органайзер для документов",   master: "Нурлан Б.",   price: 7100,  oldPrice: 9000,   badge: "Хит",        rating: 4.8, reviews: 119 },
      { id: 11, name: "Ключница кожаная с тиснением",        master: "Аружан Т.",   price: 2900,                   badge: "Новинка",    rating: 4.6, reviews: 68 },
      { id: 12, name: "Кожаная обложка для книги",           master: "Ермек С.",    price: 5400,  oldPrice: 7000,   badge: null,         rating: 4.7, reviews: 52 },
      { id: 13, name: "Мужская барсетка из натуральной кожи",master: "Меруерт К.",  price: 16800, oldPrice: 21000,  badge: "Хит",        rating: 4.8, reviews: 76 },
      { id: 14, name: "Кожаные серьги ручной работы",        master: "Лаура Ж.",    price: 3200,                   badge: "Новинка",    rating: 4.5, reviews: 44 },
      { id: 15, name: "Сумка-клатч на цепочке",              master: "Сейткали Д.", price: 22000, oldPrice: 28000,  badge: "Топ мастер", rating: 4.9, reviews: 103 },
      { id: 16, name: "Кожаный ежедневник с тиснением",      master: "Нурлан Б.",   price: 11500,                  badge: "Хит",        rating: 4.7, reviews: 88 },
    ],
  },

  // ── Цифровые товары ──────────────────────────────────────────────────────
  {
    slug: "digital",
    title: "Цифровые товары",
    total: 78,
    subCats: [
      { id: "prints",   label: "Принты и постеры" },
      { id: "patterns", label: "Узоры и орнаменты" },
      { id: "fonts",    label: "Шрифты" },
      { id: "cards",    label: "Открытки" },
      { id: "patterns2",label: "Схемы вышивок" },
      { id: "crafts",   label: "Выкройки" },
    ],
    subTags: [
      { label: "Мгновенно" }, { label: "Орнамент" }, { label: "Открытка" }, { label: "Схема" },
    ],
    productImages: [
      "https://images.unsplash.com/photo-1695634183934-eeb0e7688f6d?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1680443674341-8d75146757b2?w=600&h=600&fit=crop&auto=format",
    ],
    products: [
      { id: 1,  name: "Постер «Казахские орнаменты» PDF",   master: "Алина С.",   price: 1500,                   badge: "Хит",        rating: 4.8, reviews: 312 },
      { id: 2,  name: "Набор орнаментов SVG 50 шт.",        master: "Рустем Д.",  price: 3200,  oldPrice: 4500,   badge: "Топ мастер", rating: 5.0, reviews: 247 },
      { id: 3,  name: "Схема вышивки «Роза» в PNG",         master: "Мадина А.",  price: 800,   oldPrice: 1200,   badge: "Новинка",    rating: 4.6, reviews: 88 },
      { id: 4,  name: "Шрифт «Казахский» TTF+OTF",         master: "Алина С.",   price: 5900,                   badge: "Топ мастер", rating: 5.0, reviews: 134 },
      { id: 5,  name: "Открытки «С Новым годом» 6 шт.",    master: "Рустем Д.",  price: 1200,  oldPrice: 1800,   badge: "Хит",        rating: 4.7, reviews: 421 },
      { id: 6,  name: "Паттерн «Степной орнамент» AI",     master: "Мадина А.",  price: 2400,                   badge: "Новинка",    rating: 4.5, reviews: 67 },
      { id: 7,  name: "Выкройка сумки-торбы PDF",          master: "Алина С.",   price: 1800,  oldPrice: 2500,   badge: "Хит",        rating: 4.8, reviews: 189 },
      { id: 8,  name: "Набор праздничных открыток ×12",    master: "Рустем Д.",  price: 2100,                   badge: "Топ мастер", rating: 5.0, reviews: 298 },
      { id: 9,  name: "Схема вышивки «Юрта» крестиком",   master: "Мадина А.",  price: 900,   oldPrice: 1400,   badge: "Новинка",    rating: 4.6, reviews: 73 },
      { id: 10, name: "Орнаментальный бордюр SVG 20 шт.",  master: "Алина С.",   price: 1600,                   badge: "Хит",        rating: 4.7, reviews: 156 },
      { id: 11, name: "Постер «Алматы» для печати А2",     master: "Рустем Д.",  price: 2800,  oldPrice: 3600,   badge: null,         rating: 4.9, reviews: 41 },
      { id: 12, name: "Шрифт рукописный «Қазақша»",        master: "Мадина А.",  price: 4200,                   badge: "Топ мастер", rating: 5.0, reviews: 112 },
      { id: 13, name: "Паттерн казахский для ткани",       master: "Алина С.",   price: 1100,  oldPrice: 1700,   badge: "Новинка",    rating: 4.5, reviews: 95 },
      { id: 14, name: "Открытка «8 Марта» анимированная", master: "Рустем Д.",  price: 700,                    badge: "Хит",        rating: 4.6, reviews: 287 },
      { id: 15, name: "Выкройка чапана взрослого PDF",     master: "Мадина А.",  price: 3400,  oldPrice: 4800,   badge: null,         rating: 4.8, reviews: 54 },
      { id: 16, name: "Пак орнаментов PNG+SVG 100 шт.",    master: "Алина С.",   price: 5200,                   badge: "Топ мастер", rating: 5.0, reviews: 203 },
    ],
  },
];

export const CATEGORY_MAP: Record<string, CategoryConfig> = Object.fromEntries(
  ALL_CATEGORIES.map((c) => [c.slug, c])
);

// Default (all) — first category as fallback
export const DEFAULT_CATEGORY = ALL_CATEGORIES[0];

export { ALL_CATEGORIES };
