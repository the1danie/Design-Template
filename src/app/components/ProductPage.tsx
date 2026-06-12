import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { animate, motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { useCart } from "../context/CartContext";
import {
  ChevronRight, Heart, ShoppingCart, Truck, Shield, RotateCcw,
  Star, Flame, Sparkles, Share2, ChevronLeft, X, Copy, Check,
  LogIn, Eye, EyeOff, ImagePlus, ChevronDown, ChevronUp, BadgeCheck, Clock,
  Pencil, Trash2, Search,
} from "lucide-react";
import svgPaths from "../../imports/Главная1/svg-7zpnau8iqv";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import { CATEGORY_MAP, DEFAULT_CATEGORY } from "../catalogData";

// ── Static data ───────────────────────────────────────────────────────────────

const GALLERY = [imgImage8, imgCat2, imgCat3, imgCat1];

type ProductDetails = {
  subcategory: string;
  description: string;
  characteristics: { label: string; value: string }[];
  stock: string;
  productionTime: string;
  masterBio: string;
};

function ViewMagnifier({ children, className = "", maxScale = 1.6 }: {
  children: React.ReactNode;
  className?: string;
  maxScale?: number;
}) {
  const [zoomed, setZoomed] = useState(false);
  const scale = useMotionValue(1);
  const imageScale = useTransform(scale, [1, maxScale], [1, maxScale]);

  useEffect(() => {
    animate(scale, zoomed ? maxScale : 1, {
      type: "spring",
      stiffness: 360,
      damping: 32,
    });
  }, [maxScale, scale, zoomed]);

  return (
    <div className={`relative w-full h-full ${className}`} onMouseLeave={() => setZoomed(false)}>
      <motion.div
        className="relative w-full h-full rounded-[24px] overflow-hidden"
        style={{ scale: 1 }}
        role="img"
        aria-label={zoomed ? "Фото товара увеличено" : "Фото товара"}
      >
        <motion.div className="w-full h-full origin-center" style={{ scale: imageScale }}>
          {children}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute left-[14px] bottom-[14px] h-[28px] px-[10px] rounded-full bg-white/82 backdrop-blur-sm font-['Manrope',sans-serif] font-semibold text-[11px] text-[#374957] flex items-center">
        Нажмите лупу, чтобы рассмотреть
      </div>

      <button
        onClick={() => setZoomed((value) => !value)}
        aria-label={zoomed ? "Уменьшить фото" : "Увеличить фото"}
        className="absolute right-[14px] bottom-[14px] z-30 size-[42px] rounded-full bg-white/90 backdrop-blur-sm border border-[rgba(55,73,87,0.12)] shadow-[0_8px_18px_rgba(0,0,0,0.14)] flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
      >
        <Search size={18} className={zoomed ? "text-[#315350]" : "text-[#374957]"} />
      </button>
    </div>
  );
}

function getProductDetails(category: string, name: string): ProductDetails {
  const lower = name.toLowerCase();

  if (lower.includes("браслет")) {
    return {
      subcategory: "Браслеты",
      description: "Авторский браслет ручной работы с натуральными камнями и мотивом степного орнамента. Изделие собирается вручную, поэтому фактура и оттенок каждого браслета немного отличаются.",
      stock: "Осталось 3 шт.",
      productionTime: "Готов к отправке, 1-2 дня",
      masterBio: "Мастер украшений ручной работы. Специализируется на браслетах, колье и аксессуарах с казахскими мотивами и натуральными материалами.",
      characteristics: [
        { label: "Материал",      value: "Натуральный камень, латунь" },
        { label: "Размер",        value: "Регулируемый" },
        { label: "Ширина",        value: "1.2 см" },
        { label: "Вес",           value: "18 г" },
        { label: "Фурнитура",     value: "Гипоаллергенная" },
        { label: "Покрытие",      value: "Защитный лак" },
        { label: "Страна",        value: "Казахстан" },
        { label: "Ручная работа", value: "Да" },
      ],
    };
  }

  if (category === "kozha" || lower.includes("сумк") || lower.includes("кошел")) {
    return {
      subcategory: "Кожа и сумки",
      description: "Кожаное изделие ручной работы из плотной натуральной кожи. Мастер вручную кроит, прошивает и обрабатывает края, поэтому вещь рассчитана на долгую повседневную носку.",
      stock: "Сделано вручную под заказ",
      productionTime: "Изготовление: 3-5 дней",
      masterBio: "Мастер кожаных изделий. Делает сумки, кошельки и аксессуары с ручной прошивкой и аккуратной обработкой деталей.",
      characteristics: [
        { label: "Материал",      value: "Натуральная кожа" },
        { label: "Подклад",       value: "Текстиль" },
        { label: "Фурнитура",     value: "Металл" },
        { label: "Размер",        value: "Средний" },
        { label: "Вес",           value: "420 г" },
        { label: "Уход",          value: "Сухая чистка" },
        { label: "Страна",        value: "Казахстан" },
        { label: "Ручная работа", value: "Да" },
      ],
    };
  }

  if (category === "tekstil" || lower.includes("сырмак") || lower.includes("войл")) {
    return {
      subcategory: "Войлок и текстиль",
      description: "Текстильное изделие ручной работы с казахским орнаментом. Мастер использует натуральные материалы и традиционные техники, поэтому каждая работа имеет свой рисунок и фактуру.",
      stock: "Сделано вручную под заказ",
      productionTime: "Изготовление: 4-7 дней",
      masterBio: "Мастер текстиля и войлока. Создает сырмаки, декоративные панно и текстиль для дома по мотивам казахской культуры.",
      characteristics: [
        { label: "Материал",      value: "Войлок, шерсть" },
        { label: "Техника",       value: "Ручная валка" },
        { label: "Размер",        value: "60 x 90 см" },
        { label: "Вес",           value: "780 г" },
        { label: "Уход",          value: "Деликатная чистка" },
        { label: "Орнамент",      value: "Казахский мотив" },
        { label: "Страна",        value: "Казахстан" },
        { label: "Ручная работа", value: "Да" },
      ],
    };
  }

  if (category === "sveci" || lower.includes("свеч")) {
    return {
      subcategory: "Свечи и ароматы",
      description: "Ароматическая свеча ручной работы из натурального воска. Подходит для подарка и спокойного домашнего ритуала, аромат раскрывается мягко и не перегружает пространство.",
      stock: "Осталось 6 шт.",
      productionTime: "Готов к отправке, 1-2 дня",
      masterBio: "Мастер ароматов и свечей. Подбирает натуральные воски, фитили и композиции ароматов небольшими партиями.",
      characteristics: [
        { label: "Материал",      value: "Соевый воск" },
        { label: "Аромат",        value: "Натуральная композиция" },
        { label: "Фитиль",        value: "Хлопковый" },
        { label: "Объем",         value: "180 мл" },
        { label: "Горение",       value: "До 35 часов" },
        { label: "Упаковка",      value: "Подарочная" },
        { label: "Страна",        value: "Казахстан" },
        { label: "Ручная работа", value: "Да" },
      ],
    };
  }

  return {
    subcategory: lower.includes("кольц") ? "Кольца" : lower.includes("колье") || lower.includes("подвес") ? "Колье и подвески" : "Серьги",
    description: "Авторское украшение ручной работы с натуральными материалами и аккуратной фурнитурой. Каждое изделие создается вручную с применением декоративных мотивов, вдохновленных Казахстаном.",
    stock: "Осталось 4 шт.",
    productionTime: "Готов к отправке, 1-2 дня",
    masterBio: "Мастер ювелирного искусства с 10-летним опытом. Специализируется на украшениях с натуральными казахстанскими камнями. Каждое изделие создается вручную.",
    characteristics: [
      { label: "Материал",      value: "Серебро 925, натуральный камень" },
      { label: "Размер",        value: "Средний" },
      { label: "Ширина",        value: "1.8 см" },
      { label: "Вес",           value: "6.2 г" },
      { label: "Фурнитура",     value: "Гипоаллергенная" },
      { label: "Покрытие",      value: "Позолота 18К" },
      { label: "Страна",        value: "Казахстан" },
      { label: "Ручная работа", value: "Да" },
    ],
  };
}

const ALL_REVIEWS = [
  { id: 1,  name: "Алина К.",      avatar: "АК", color: "#C4A882", date: "12 мая 2026",    rating: 5, text: "Невероятно красивая работа! Точь-в-точь как на фото, детали аккуратные. Упаковка подарочная — сразу можно дарить. Буду заказывать еще!", images: [imgCat2, imgCat3] },
  { id: 2,  name: "Темирлан М.",   avatar: "ТМ", color: "#A8C5A0", date: "28 апреля 2026", rating: 5, text: "Качество хорошее, материалы выглядят натурально. Немного меньше, чем ожидал по фото, но смотрится элегантно.", images: [] },
  { id: 3,  name: "Дильнара Р.",   avatar: "ДР", color: "#B8A4D4", date: "3 июня 2026",    rating: 5, text: "Мастер — настоящий профессионал. Изделие сделано аккуратно, без единого изъяна. Доставка быстрая, коробочка красивая.", images: [imgCat1] },
  { id: 4,  name: "Сауле Б.",      avatar: "СБ", color: "#A0B8C5", date: "20 апреля 2026", rating: 5, text: "Покупала в подарок маме — она в абсолютном восторге! Работа смотрится дорого и изысканно. Рекомендую.", images: [] },
  { id: 5,  name: "Гүлнар Е.",     avatar: "ГЕ", color: "#C5B8A0", date: "15 апреля 2026", rating: 4, text: "Хорошее качество за свою цену. Видно, что вещь сделана вручную, с вниманием к деталям.", images: [imgCat4] },
  { id: 6,  name: "Мария С.",      avatar: "МС", color: "#D4A8A8", date: "8 апреля 2026",  rating: 5, text: "Третий заказ у этого мастера! Каждый раз все лучше и лучше. Изделия живые, теплые — чувствуется, что сделаны с душой.", images: [imgCat2] },
  { id: 7,  name: "Айгерим Н.",    avatar: "АН", color: "#A4C5A8", date: "1 апреля 2026",  rating: 3, text: "Работа красивая, но хотелось бы чуть больше информации о размере. В целом качество нормальное.", images: [] },
  { id: 8,  name: "Зарина Х.",     avatar: "ЗХ", color: "#C5A0B8", date: "25 марта 2026",  rating: 5, text: "Восхитительная работа! Получилось даже лучше, чем на фото. Мастер очень внимательный, ответил на все вопросы до заказа.", images: [] },
  { id: 9,  name: "Балнур Д.",     avatar: "БД", color: "#B8C5A0", date: "18 марта 2026",  rating: 4, text: "Приятно удивлена качеством упаковки. Заказ пришел в красивой коробочке с атласной лентой.", images: [imgCat3] },
  { id: 10, name: "Назгуль А.",    avatar: "НА", color: "#A8B4C5", date: "10 марта 2026",  rating: 5, text: "Заказывала специально к празднику. Все подошло идеально, гости спрашивали, где купила. Мастер — талант.", images: [imgCat1, imgCat2] },
  { id: 11, name: "Инна Ф.",       avatar: "ИФ", color: "#C5C0A0", date: "3 марта 2026",   rating: 4, text: "Товар соответствует описанию. Доставка пришла быстро. Единственное — хотелось бы больше фото в карточке.", images: [] },
  { id: 12, name: "Асель Т.",      avatar: "АТ", color: "#A0C5C0", date: "25 февраля 2026",rating: 5, text: "Лучшая покупка за последние полгода! Очень удобная вещь, красиво смотрится и отлично подходит для подарка.", images: [imgCat4] },
];

const OTHER_PRODUCTS = [
  { id: 2,  name: "Кольцо с агатом",        price: "22 500 ₸", img: imgCat2, badge: "Топ мастер" as const },
  { id: 3,  name: "Браслет «Степной ветер»", price: "9 800 ₸",  img: imgCat3, badge: null },
  { id: 7,  name: "Брошь «Шаншар»",          price: "7 300 ₸",  img: imgCat1, badge: "Хит" as const },
  { id: 10, name: "Подвеска «Боже»",         price: "9 100 ₸",  img: imgCat4, badge: null },
];

const SIMILAR_PRODUCTS = [
  { id: 5,  name: "Серьги «Алтын» из серебра",   price: "17 600 ₸", oldPrice: "21 000 ₸", img: imgCat5 },
  { id: 9,  name: "Серьги с лазуритом «Тумар»",  price: "12 600 ₸", oldPrice: "15 000 ₸", img: imgImage8 },
  { id: 13, name: "Серьги-кольца с орнаментом",  price: "11 200 ₸", oldPrice: "13 500 ₸", img: imgCat2 },
  { id: 16, name: "Набор серёжек «Алтын Дала»",  price: "38 000 ₸", oldPrice: "",           img: imgCat3 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRow({ rating, size = 14, interactive = false, onSet }: {
  rating: number; size?: number; interactive?: boolean; onSet?: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = interactive ? (hover || rating) > i : i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5);
        return (
          <Star key={i} size={size}
            fill={filled ? "#FFC633" : "none"}
            stroke={filled ? "#FFC633" : "#d8d0c8"}
            strokeWidth={1.5}
            className={interactive ? "cursor-pointer transition-transform hover:scale-110" : ""}
            onMouseEnter={() => interactive && setHover(i + 1)}
            onMouseLeave={() => interactive && setHover(0)}
            onClick={() => interactive && onSet?.(i + 1)}
          />
        );
      })}
    </div>
  );
}

function BadgePill({ type }: { type: "Новинка" | "Хит" | "Топ мастер" }) {
  const cfg = {
    "Новинка":    { bg: "rgba(49,83,80,0.82)",   text: "#fff",    Icon: Sparkles },
    "Хит":        { bg: "rgba(214,83,10,0.88)",  text: "#fff",    Icon: Flame },
    "Топ мастер": { bg: "rgba(255,198,51,0.95)", text: "#2d1f00", Icon: Star },
  }[type];
  return (
    <div className="flex items-center gap-[4px] px-[9px] py-[4px] rounded-[10px]" style={{ background: cfg.bg }}>
      <cfg.Icon size={10} color={cfg.text} strokeWidth={2.5} />
      <span className="font-['Manrope',sans-serif] font-semibold text-[11px]" style={{ color: cfg.text }}>{type}</span>
    </div>
  );
}

// ── Animated Cart Button ──────────────────────────────────────────────────────

function AnimatedCartButton({
  qty,
  className,
  iconSize = 17,
  stopPropagation = false,
}: {
  qty: number;
  className: string;
  iconSize?: number;
  stopPropagation?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleClick(e: React.MouseEvent) {
    if (stopPropagation) e.stopPropagation();
    if (added) return;
    setAdded(true);
    addToCart(qty);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${className} overflow-hidden`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-[8px]"
          >
            <Check size={iconSize} strokeWidth={2.5} />
            Добавлено
          </motion.span>
        ) : (
          <motion.span
            key="cart"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-[8px]"
          >
            <ShoppingCart size={iconSize} strokeWidth={2} />
            В корзину
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Auth Modal ────────────────────────────────────────────────────────────────

function AuthModal({ onClose, message }: { onClose: () => void; message: string }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[28px] w-full max-w-[420px] p-[36px] shadow-2xl">
        <button onClick={onClose} className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f5f3ed] transition-colors">
          <X size={16} className="text-[#92887d]" />
        </button>

        <div className="flex items-center gap-[10px] mb-[6px]">
          <div className="w-[36px] h-[36px] bg-[#f0f5f4] rounded-full flex items-center justify-center">
            <LogIn size={16} color="#315350" />
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black">
            {tab === "login" ? "Войти" : "Регистрация"}
          </p>
        </div>
        <p className="font-['Manrope',sans-serif] font-normal text-[13px] text-[#92887d] mb-[24px]">{message}</p>

        {/* Tabs */}
        <div className="flex bg-[#f5f3ed] rounded-full p-[4px] mb-[24px]">
          {(["login", "register"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-[8px] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-all"
              style={tab === t ? { background: "#315350", color: "#fff" } : { color: "#374957" }}>
              {t === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-[12px]">
          {tab === "register" && (
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Имя"
              className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]" />
          )}
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email" type="email"
            className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]" />
          <div className="relative">
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Пароль" type={showPass ? "text" : "password"}
              className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] pr-[44px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]" />
            <button onClick={() => setShowPass(!showPass)}
              className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#92887d] hover:text-[#374957]">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button onClick={onClose}
          className="mt-[20px] w-full h-[50px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#3c6460] transition-colors">
          {tab === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
        {tab === "login" && (
          <p className="text-center mt-[12px] font-['Manrope',sans-serif] text-[12px] text-[#92887d]">
            Нет аккаунта?{" "}
            <button onClick={() => setTab("register")} className="text-[#315350] font-medium hover:underline">
              Создать
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

// ── Share Modal ───────────────────────────────────────────────────────────────

function ShareModal({ onClose, title }: { onClose: () => void; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  function copyLink() {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const socials = [
    { name: "WhatsApp",  color: "#25D366", letter: "W" },
    { name: "Telegram",  color: "#2AABEE", letter: "T" },
    { name: "Instagram", color: "#E1306C", letter: "I" },
    { name: "VK",        color: "#0077FF", letter: "V" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[28px] w-full max-w-[400px] p-[32px] shadow-2xl">
        <button onClick={onClose} className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f5f3ed] transition-colors">
          <X size={16} className="text-[#92887d]" />
        </button>
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black mb-[6px]">Поделиться</p>
        <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mb-[24px] line-clamp-1">{title}</p>

        {/* Social buttons */}
        <div className="grid grid-cols-4 gap-[12px] mb-[24px]">
          {socials.map((s) => (
            <button key={s.name} className="flex flex-col items-center gap-[6px] group">
              <div className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center text-white font-bold text-[18px] group-hover:scale-105 transition-transform"
                style={{ background: s.color }}>
                {s.letter}
              </div>
              <span className="font-['Manrope',sans-serif] text-[11px] text-[#374957]">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <div className="flex items-center gap-[8px] bg-[#f5f3ed] rounded-[14px] px-[14px] py-[12px]">
          <span className="flex-1 font-['Manrope',sans-serif] text-[12px] text-[#92887d] truncate">{url}</span>
          <button onClick={copyLink}
            className="shrink-0 flex items-center gap-[6px] bg-[#315350] text-white px-[12px] py-[6px] rounded-[10px] font-['Manrope',sans-serif] font-medium text-[12px] hover:bg-[#3c6460] transition-colors">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Write / Edit Review Modal ─────────────────────────────────────────────────

function ReviewFormModal({
  onClose, onSubmit, initial,
}: {
  onClose: () => void;
  onSubmit: (r: typeof ALL_REVIEWS[0]) => void;
  initial?: typeof ALL_REVIEWS[0];
}) {
  const isEdit = !!initial;
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [text, setText] = useState(initial?.text ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [submitted, setSubmitted] = useState(false);

  const LABELS = ["", "Плохо", "Терпимо", "Нормально", "Хорошо", "Отлично"];
  const valid = rating > 0 && text.trim().length > 0 && name.trim().length > 0;

  function handleSubmit() {
    if (!valid) return;
    const initials = name.trim().split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
    onSubmit({
      id: initial?.id ?? Date.now(),
      name: name.trim(),
      avatar: initials,
      color: initial?.color ?? ["#C4A882", "#A8C5A0", "#B8A4D4", "#A0B8C5"][Math.floor(Math.random() * 4)],
      date: initial?.date ?? new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      rating,
      text: text.trim(),
      images: initial?.images ?? [],
    });
    if (!isEdit) { setSubmitted(true); setTimeout(onClose, 1800); }
    else onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[28px] w-full max-w-[480px] p-[36px] shadow-2xl">
        <button onClick={onClose} className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f5f3ed]">
          <X size={16} className="text-[#92887d]" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-[20px] gap-[12px]">
            <div className="w-[56px] h-[56px] bg-[#f0f5f4] rounded-full flex items-center justify-center">
              <Check size={24} color="#315350" />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black text-center">Спасибо!</p>
            <p className="font-['Manrope',sans-serif] text-[14px] text-[#92887d] text-center">Ваш отзыв отправлен на модерацию</p>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black mb-[6px]">
              {isEdit ? "Редактировать отзыв" : "Написать отзыв"}
            </p>
            <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mb-[24px]">
              {isEdit ? "Измените оценку или текст отзыва" : "Поделитесь впечатлениями о товаре"}
            </p>

            <div className="mb-[20px]">
              <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957] mb-[10px]">Ваша оценка</p>
              <StarRow rating={rating} size={32} interactive onSet={setRating} />
              {rating > 0 && (
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#315350] mt-[6px]">{LABELS[rating]}</p>
              )}
            </div>

            <div className="flex flex-col gap-[12px]">
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full h-[46px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]" />
              <textarea value={text} onChange={(e) => setText(e.target.value)}
                placeholder="Расскажите о товаре — качество, соответствие описанию, доставка..."
                rows={4}
                className="w-full bg-[#f5f3ed] rounded-[14px] px-[16px] py-[12px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350] resize-none" />
              <label className="flex items-center gap-[10px] cursor-pointer bg-[#f5f3ed] rounded-[14px] px-[16px] py-[12px] hover:bg-[#ece9e2] transition-colors">
                <ImagePlus size={18} className="text-[#92887d] shrink-0" />
                <span className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">Добавить фото (необязательно)</span>
                <input type="file" accept="image/*" multiple className="hidden" />
              </label>
            </div>

            <button onClick={handleSubmit} disabled={!valid}
              className="mt-[20px] w-full h-[50px] rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] transition-all"
              style={{
                background: valid ? "#315350" : "#e5e0d8",
                color: valid ? "#fff" : "#92887d",
                cursor: valid ? "pointer" : "not-allowed",
              }}>
              {isEdit ? "Сохранить изменения" : "Отправить отзыв"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────────────────────────

function DeleteConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[24px] w-full max-w-[360px] p-[32px] shadow-2xl text-center">
        <div className="w-[48px] h-[48px] bg-[#fff0f0] rounded-full flex items-center justify-center mx-auto mb-[14px]">
          <X size={20} color="#e53e3e" />
        </div>
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[20px] text-black mb-[8px]">Удалить отзыв?</p>
        <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mb-[24px]">Это действие нельзя отменить</p>
        <div className="flex gap-[10px]">
          <button onClick={onClose}
            className="flex-1 h-[44px] border border-[rgba(55,73,87,0.2)] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] hover:border-[#315350] transition-colors">
            Отмена
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 h-[44px] bg-[#e53e3e] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[13px] hover:bg-[#c53030] transition-colors">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────

function ReviewCard({ review, isOwn, onEdit, onDelete }: {
  review: typeof ALL_REVIEWS[0];
  isOwn: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isLong = review.text.length > 160;

  return (
    <>
      {confirmDelete && (
        <DeleteConfirmModal onClose={() => setConfirmDelete(false)} onConfirm={onDelete} />
      )}
      <div className={`bg-white rounded-[20px] p-[24px] border transition-all ${isOwn ? "border-[rgba(49,83,80,0.25)] ring-1 ring-[rgba(49,83,80,0.1)]" : "border-[rgba(55,73,87,0.08)]"}`}>
        <div className="flex items-start gap-[12px] mb-[12px]">
          <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 font-['Manrope',sans-serif] font-bold text-[14px] text-white"
            style={{ background: review.color }}>
            {review.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-[6px]">
                  <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black">{review.name}</p>
                  {isOwn && (
                    <span className="font-['Manrope',sans-serif] font-medium text-[10px] text-[#315350] bg-[rgba(49,83,80,0.1)] px-[7px] py-[2px] rounded-full">
                      Ваш отзыв
                    </span>
                  )}
                </div>
                <StarRow rating={review.rating} size={13} />
              </div>
              <div className="flex items-center gap-[4px] shrink-0">
                <span className="font-['Manrope',sans-serif] font-normal text-[12px] text-[#92887d]">{review.date}</span>
                {isOwn && (
                  <>
                    <button onClick={onEdit}
                      className="ml-[6px] w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#f0f5f4] transition-colors"
                      title="Редактировать">
                      <Pencil size={13} className="text-[#315350]" />
                    </button>
                    <button onClick={() => setConfirmDelete(true)}
                      className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#fff0f0] transition-colors"
                      title="Удалить">
                      <Trash2 size={13} className="text-[#e53e3e]" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-['Manrope',sans-serif] font-normal text-[14px] text-[#374957] leading-[1.65] mb-[2px]">
          {isLong && !expanded ? review.text.slice(0, 160) + "…" : review.text}
        </p>
        {isLong && (
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-[4px] font-['Manrope',sans-serif] font-medium text-[12px] text-[#315350] mt-[4px] hover:underline">
            {expanded ? <><ChevronUp size={13} /> Свернуть</> : <><ChevronDown size={13} /> Читать полностью</>}
          </button>
        )}
        {review.images.length > 0 && (
          <div className="flex gap-[8px] mt-[12px]">
            {review.images.map((img, i) => (
              <div key={i} className="w-[64px] h-[64px] rounded-[10px] overflow-hidden bg-[#f0eeed]">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function ProductPage() {
  const { category = "ukrasheniya", id = "1" } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const config = CATEGORY_MAP[category] ?? DEFAULT_CATEGORY;
  const product = config.products.find((p) => p.id === +id) ?? config.products[0];
  const details = getProductDetails(category, product.name);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  // Modals
  const [shareModal, setShareModal] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  const [editingReview, setEditingReview] = useState<typeof ALL_REVIEWS[0] | null>(null);

  // Reviews
  const [reviews, setReviews] = useState(ALL_REVIEWS);
  const [ownReviewIds, setOwnReviewIds] = useState<Set<number>>(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewSort, setReviewSort] = useState<"best" | "worst" | "newest">("newest");
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const sortedFilteredReviews = [...reviews]
    .filter((r) => reviewFilter === null || r.rating === reviewFilter)
    .sort((a, b) => {
      if (reviewSort === "best")   return b.rating - a.rating;
      if (reviewSort === "worst")  return a.rating - b.rating;
      return b.id - a.id; // newest
    });
  const visibleReviews = showAllReviews ? sortedFilteredReviews : sortedFilteredReviews.slice(0, 3);
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.rating === stars).length,
  }));
  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : product.rating.toFixed(1);

  function requireAuth(action: "cart" | "favorite") {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    navigate(`/login?redirect=${encodeURIComponent(redirect)}&action=${action}`);
  }
  function handleFavorite() { requireAuth("favorite"); }
  function handleAddReview(r: typeof ALL_REVIEWS[0]) {
    setReviews((prev) => [r, ...prev]);
    setOwnReviewIds((prev) => new Set(prev).add(r.id));
    setShowAllReviews(true);
  }
  function handleEditReview(r: typeof ALL_REVIEWS[0]) {
    setReviews((prev) => prev.map((x) => x.id === r.id ? r : x));
  }
  function handleDeleteReview(id: number) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setOwnReviewIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  }

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      {/* Modals */}
      {shareModal && <ShareModal title={product.name} onClose={() => setShareModal(false)} />}
      {writeReview && <ReviewFormModal onClose={() => setWriteReview(false)} onSubmit={handleAddReview} />}
      {editingReview && (
        <ReviewFormModal
          initial={editingReview}
          onClose={() => setEditingReview(null)}
          onSubmit={(r) => { handleEditReview(r); setEditingReview(null); }}
        />
      )}

      <div className="max-w-[1440px] mx-auto px-[80px] py-[32px]">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-[6px] mb-8">
          {[
            { label: "Главная", path: "/" },
            { label: config.title, path: `/catalog/${category}` },
            { label: details.subcategory, path: `/catalog/${category}` },
            { label: product.name, path: null },
          ].map((b, i, arr) => (
            <span key={i} className="flex items-center gap-[6px]">
              {b.path
                ? <button onClick={() => navigate(b.path!)} className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#92887d] hover:text-[#315350] transition-colors max-w-[200px] truncate">{b.label}</button>
                : <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] max-w-[260px] truncate">{b.label}</span>
              }
              {i < arr.length - 1 && <ChevronRight size={12} className="text-[#c5bdb5] shrink-0" />}
            </span>
          ))}
        </nav>

        {/* ── Product block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] mb-[64px]">

          {/* Gallery */}
          <div className="flex gap-[14px]">
            <div className="flex flex-col gap-[10px] shrink-0">
              {GALLERY.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="w-[72px] h-[72px] rounded-[14px] overflow-hidden border-2 transition-all"
                  style={{ borderColor: activeImg === i ? "#315350" : "transparent", boxShadow: activeImg === i ? "0 0 0 1px #315350" : "0 0 0 1px rgba(55,73,87,0.12)" }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-[#f0eeed] rounded-[24px] overflow-hidden relative aspect-square">
              <img src={GALLERY[activeImg]} alt={product.name} className="md:hidden absolute inset-0 w-full h-full object-cover" />
              <ViewMagnifier maxScale={1.6} className="hidden md:block absolute inset-0">
                <img src={GALLERY[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              </ViewMagnifier>
              {product.badge && <div className="absolute left-[14px] top-[14px]"><BadgePill type={product.badge} /></div>}
              <button onClick={() => setActiveImg((activeImg - 1 + GALLERY.length) % GALLERY.length)}
                className="absolute left-[12px] top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm size-[36px] rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                <ChevronLeft size={16} className="text-[#374957]" />
              </button>
              <button onClick={() => setActiveImg((activeImg + 1) % GALLERY.length)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm size-[36px] rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                <ChevronRight size={16} className="text-[#374957]" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[32px] text-black leading-[1.2] mb-[16px]">
              {product.name}
            </h1>

            <div className="flex items-center gap-[10px] mb-[20px]">
              <StarRow rating={product.rating} size={16} />
              <span className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black">{product.rating.toFixed(1)}</span>
              <button onClick={() => { setShowAllReviews(true); reviewsRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className="font-['Manrope',sans-serif] font-normal text-[13px] text-[#315350] hover:underline">
                ({totalReviews} отзывов)
              </button>
              <span className="w-px h-4 bg-[rgba(55,73,87,0.15)]" />
              <span className="inline-flex items-center gap-[5px] h-[24px] px-[9px] rounded-full bg-[#f0f5f4] font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350]">
                <BadgeCheck size={13} /> Проверенный мастер
              </span>
              <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#315350]">Мастер: {product.master}</span>
            </div>

            <div className="flex items-center gap-[12px] mb-[28px]">
              <span className="font-['Manrope',sans-serif] font-bold text-[36px] text-black leading-none">
                {product.price.toLocaleString("ru-RU")} ₸
              </span>
              {product.oldPrice && (
                <>
                  <span className="font-['Manrope',sans-serif] font-medium text-[20px] text-[rgba(0,0,0,0.35)] line-through leading-none">
                    {product.oldPrice.toLocaleString("ru-RU")} ₸
                  </span>
                  <div className="bg-[rgba(229,62,62,0.1)] px-[10px] py-[4px] rounded-full">
                    <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#e53e3e]">-{discount}%</span>
                  </div>
                </>
              )}
            </div>

            {/* Qty + actions */}
            <div className="flex items-center gap-[12px] mb-[16px]">
              <div className="flex items-center border border-[rgba(55,73,87,0.2)] rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-[44px] h-[50px] flex items-center justify-center text-[#374957] hover:bg-[#f5f3ed] transition-colors font-['Manrope',sans-serif] text-[20px]">−</button>
                <span className="w-[40px] text-center font-['Manrope',sans-serif] font-semibold text-[16px] text-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="w-[44px] h-[50px] flex items-center justify-center text-[#374957] hover:bg-[#f5f3ed] transition-colors font-['Manrope',sans-serif] text-[20px]">+</button>
              </div>
              <AnimatedCartButton
                qty={qty}
                className="flex-1 h-[50px] rounded-full flex items-center justify-center bg-[#315350] hover:bg-[#3c6460] transition-colors font-['Manrope',sans-serif] font-semibold text-[15px] text-white"
                iconSize={17}
              />
              <button onClick={handleFavorite}
                className="w-[50px] h-[50px] rounded-full border border-[rgba(55,73,87,0.2)] flex items-center justify-center hover:border-[#315350] transition-colors"
                style={{ background: "#fff" }}>
                <Heart size={18} fill="none" stroke="#374957" strokeWidth={1.5} />
              </button>
              <button onClick={() => setShareModal(true)}
                className="w-[50px] h-[50px] rounded-full border border-[rgba(55,73,87,0.2)] flex items-center justify-center hover:border-[#315350] transition-colors bg-white">
                <Share2 size={16} className="text-[#374957]" />
              </button>
            </div>

            <div className="flex flex-wrap gap-[8px] mb-[14px]">
              <div className="h-[34px] px-[13px] rounded-full bg-[#f0f5f4] flex items-center gap-[6px]">
                <Check size={13} className="text-[#315350]" />
                <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350]">{details.stock}</span>
              </div>
              <div className="h-[34px] px-[13px] rounded-full bg-[#f5f3ed] flex items-center gap-[6px]">
                <Clock size={13} className="text-[#92887d]" />
                <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957]">{details.productionTime}</span>
              </div>
            </div>

            <button onClick={() => navigate(`/login?redirect=${encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)}`)}
              className="w-fit mb-[22px] font-['Manrope',sans-serif] font-semibold text-[13px] text-[#315350] hover:underline">
              Задать вопрос мастеру
            </button>

            {/* Guarantees */}
            <div className="flex flex-col gap-[10px] mt-[4px] mb-[28px]">
              {[
                { Icon: Truck,     text: "Бесплатная доставка по Казахстану" },
                { Icon: Shield,    text: "Гарантия качества и возврата 14 дней" },
                { Icon: RotateCcw, text: "Обмен в течение 30 дней" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-[10px]">
                  <div className="w-[34px] h-[34px] rounded-full bg-[#f0f5f4] flex items-center justify-center shrink-0">
                    <Icon size={15} color="#315350" strokeWidth={2} />
                  </div>
                  <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957]">{text}</span>
                </div>
              ))}
            </div>

            <p className="font-['Manrope',sans-serif] font-normal text-[14px] text-[rgba(0,0,0,0.6)] leading-[1.7] border-t border-[rgba(55,73,87,0.1)] pt-[20px]">
              {details.description}
            </p>
          </div>
        </div>

        {/* ── Characteristics ── */}
        <section className="mb-[64px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black mb-[24px]">Характеристики</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-[rgba(55,73,87,0.08)] rounded-[20px] overflow-hidden">
            {details.characteristics.map((c) => (
              <div key={c.label} className="bg-[#fbfbf8] px-[24px] py-[18px]">
                <p className="font-['Manrope',sans-serif] font-normal text-[12px] text-[#92887d] mb-[4px] uppercase tracking-wide">{c.label}</p>
                <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">{c.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="mb-[64px]" ref={reviewsRef}>
          <div className="flex items-center justify-between mb-[28px]">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black">
              Отзывы <span className="text-[#92887d] text-[22px]">({totalReviews})</span>
            </h2>
            <button onClick={() => setWriteReview(true)}
              className="flex items-center gap-[8px] h-[42px] px-[20px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[13px] hover:bg-[#3c6460] transition-colors">
              Написать отзыв
            </button>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-[40px]">
            {/* Summary */}
            <div className="bg-white rounded-[20px] p-[28px] border border-[rgba(55,73,87,0.08)] flex flex-col items-center gap-[20px] h-fit">
              <div className="text-center">
                <p className="font-['Manrope',sans-serif] font-bold text-[64px] text-black leading-none">{avgRating}</p>
                <div className="flex justify-center mt-[8px]"><StarRow rating={+avgRating} size={20} /></div>
                <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mt-[6px]">{totalReviews} отзывов</p>
              </div>

              {/* Breakdown bars — clickable to filter */}
              <div className="w-full flex flex-col gap-[8px]">
                {ratingBreakdown.map(({ stars, count }) => {
                  const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
                  const active = reviewFilter === stars;
                  return (
                    <button key={stars}
                      onClick={() => { setReviewFilter(active ? null : stars); setShowAllReviews(true); }}
                      className="flex items-center gap-[8px] group rounded-[8px] px-[4px] py-[3px] -mx-[4px] transition-colors"
                      style={{ background: active ? "rgba(49,83,80,0.07)" : "transparent" }}>
                      <span className="font-['Manrope',sans-serif] text-[12px] w-[8px] shrink-0 transition-colors"
                        style={{ color: active ? "#315350" : "#92887d" }}>{stars}</span>
                      <Star size={11} fill={active ? "#315350" : "#FFC633"} stroke={active ? "#315350" : "#FFC633"} />
                      <div className="flex-1 h-[6px] bg-[#f0ede8] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: active ? "#315350" : "#FFC633" }} />
                      </div>
                      <span className="font-['Manrope',sans-serif] text-[12px] w-[24px] text-right shrink-0 transition-colors"
                        style={{ color: active ? "#315350" : "#92887d" }}>{count}</span>
                    </button>
                  );
                })}
              </div>

              {reviewFilter !== null && (
                <button onClick={() => setReviewFilter(null)}
                  className="w-full flex items-center justify-center gap-[6px] h-[36px] border border-[rgba(55,73,87,0.2)] rounded-full font-['Manrope',sans-serif] font-medium text-[12px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors">
                  <X size={12} /> Сбросить фильтр
                </button>
              )}
            </div>

            {/* Review list */}
            <div className="flex flex-col gap-[14px]">
              {/* Sort controls */}
              <div className="flex items-center gap-[8px] flex-wrap">
                <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#92887d]">Сортировать:</span>
                {([
                  { key: "newest", label: "Сначала новые" },
                  { key: "best",   label: "Сначала лучшие" },
                  { key: "worst",  label: "Сначала плохие" },
                ] as const).map((opt) => (
                  <button key={opt.key}
                    onClick={() => setReviewSort(opt.key)}
                    className="h-[32px] px-[14px] rounded-full font-['Manrope',sans-serif] font-medium text-[12px] transition-all border"
                    style={reviewSort === opt.key
                      ? { background: "#315350", color: "#fff", borderColor: "#315350" }
                      : { background: "#fff", color: "#374957", borderColor: "rgba(55,73,87,0.18)" }}>
                    {opt.label}
                  </button>
                ))}
                {reviewFilter !== null && (
                  <span className="font-['Manrope',sans-serif] text-[12px] text-[#315350] ml-auto">
                    Показаны: {sortedFilteredReviews.length} из {totalReviews}
                  </span>
                )}
              </div>

              {sortedFilteredReviews.length === 0 ? (
                <div className="bg-white rounded-[20px] p-[40px] border border-[rgba(55,73,87,0.08)] flex flex-col items-center gap-[10px]">
                  <Star size={32} className="text-[#d8d0c8]" />
                  <p className="font-['Manrope',sans-serif] font-medium text-[15px] text-[#374957]">Нет отзывов с такой оценкой</p>
                  <button onClick={() => setReviewFilter(null)}
                    className="font-['Manrope',sans-serif] text-[13px] text-[#315350] hover:underline">
                    Показать все отзывы
                  </button>
                </div>
              ) : (
              <>
              {visibleReviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  isOwn={ownReviewIds.has(r.id)}
                  onEdit={() => setEditingReview(r)}
                  onDelete={() => handleDeleteReview(r.id)}
                />
              ))}

              {sortedFilteredReviews.length > 3 && (
                <button onClick={() => setShowAllReviews(!showAllReviews)}
                  className="flex items-center justify-center gap-[8px] h-[46px] border border-[rgba(55,73,87,0.2)] rounded-full font-['Manrope',sans-serif] font-medium text-[14px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors bg-white">
                  {showAllReviews
                    ? <><ChevronUp size={16} /> Свернуть отзывы</>
                    : <><ChevronDown size={16} /> Показать все {sortedFilteredReviews.length} отзывов</>
                  }
                </button>
              )}
              </>
              )}
            </div>
          </div>
        </section>

        {/* ── About master ── */}
        <section className="mb-[64px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black mb-[20px]">О мастере</h2>
          <div className="bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] p-[32px] flex flex-col sm:flex-row gap-[28px] items-start">
            <img src={imgCat5} alt={product.master} className="w-[90px] h-[90px] rounded-full object-cover shrink-0 border-2 border-[rgba(49,83,80,0.15)]" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black leading-none mb-[6px]">{product.master}</p>
                  <div className="flex items-center gap-[8px] mb-[10px]">
                    <StarRow rating={4.9} size={14} />
                    <span className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black">4.9</span>
                    <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">· {product.reviews + 60} отзывов · На платформе с 2023</span>
                  </div>
                  <p className="font-['Manrope',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] leading-[1.6] max-w-[520px]">
                    {details.masterBio}
                  </p>
                </div>
                <button onClick={() => navigate(`/catalog/${category}`)}
                  className="shrink-0 h-[44px] px-[24px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[13px] hover:bg-[#3c6460] transition-colors">
                  Перейти в магазин
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other products by master ── */}
        <section className="mb-[64px]">
          <div className="flex items-center justify-between mb-[20px]">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black">Другие товары мастера</h2>
            <button onClick={() => navigate(`/catalog/${category}`)} className="flex items-center gap-[4px] font-['Manrope',sans-serif] font-medium text-[13px] text-[#315350] hover:underline">
              Смотреть все <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-[16px] overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {OTHER_PRODUCTS.map((p) => (
              <div key={p.id} onClick={() => navigate(`/product/${category}/${p.id}`)}
                className="shrink-0 w-[200px] flex flex-col group cursor-pointer">
                <div className="w-full h-[200px] bg-[#f0eeed] rounded-[16px] overflow-hidden relative mb-[10px]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                  {p.badge && <div className="absolute left-[10px] top-[10px]"><BadgePill type={p.badge} /></div>}
                </div>
                <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black leading-snug mb-[4px] line-clamp-2">{p.name}</p>
                <p className="font-['Manrope',sans-serif] font-bold text-[15px] text-[#315350]">{p.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Similar products ── */}
        <section className="mb-[32px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black mb-[20px]">Вам также может понравиться</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[18px]">
            {SIMILAR_PRODUCTS.map((p) => {
              const disc = p.oldPrice
                ? Math.round((1 - +p.price.replace(/\s/g,"").replace("₸","") / +p.oldPrice.replace(/\s/g,"").replace("₸","")) * 100) : null;
              return (
                <div key={p.id} className="flex flex-col group cursor-pointer" onClick={() => navigate(`/product/${category}/${p.id}`)}>
                  <div className="w-full aspect-square bg-[#f0eeed] rounded-[18px] overflow-hidden mb-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-shadow">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                  </div>
                  <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black leading-snug mb-[6px] line-clamp-2">{p.name}</p>
                  <div className="flex items-center gap-[7px] flex-wrap mb-[8px]">
                    <span className="font-['Manrope',sans-serif] font-bold text-[17px] text-black leading-none">{p.price}</span>
                    {p.oldPrice && (
                      <>
                        <span className="font-['Manrope',sans-serif] text-[13px] text-[rgba(0,0,0,0.35)] line-through leading-none">{p.oldPrice}</span>
                        <div className="bg-[rgba(229,62,62,0.1)] px-[6px] py-[2px] rounded-full">
                          <span className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#e53e3e]">-{disc}%</span>
                        </div>
                      </>
                    )}
                  </div>
                  <AnimatedCartButton
                    qty={1}
                    className="w-full h-[38px] bg-[#315350] rounded-full font-['Manrope',sans-serif] font-medium text-[12px] text-white hover:bg-[#3c6460] transition-colors"
                    iconSize={13}
                    stopPropagation
                  />
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
