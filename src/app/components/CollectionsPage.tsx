import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronDown, ChevronRight, Flame, Star, Sparkles, BadgeCheck, Clock, LayoutGrid, List } from "lucide-react";
import svgPaths from "../../imports/Главная1/svg-7zpnau8iqv";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgCat6 from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";

// ── Types ─────────────────────────────────────────────────────────────────────

type Badge = "Новинка" | "Хит" | "Топ мастер" | null;

interface CollectionProduct {
  id: number;
  name: string;
  master: string;
  price: number;
  oldPrice?: number;
  badge: Badge;
  img: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  coverImg: string;
  coverColor: string;
  count: number;
  products: CollectionProduct[];
}

// ── Collections data ──────────────────────────────────────────────────────────

const COLLECTIONS: Collection[] = [
  {
    id: "home",
    title: "Для дома",
    description: "Декор, украшения, текстиль и уют: лучшие находки для создания тёплой и самобытной казахстанской атмосферы.",
    coverImg: "https://images.unsplash.com/photo-1776928161455-420d318efbb8?w=600&h=400&fit=crop&auto=format",
    coverColor: "radial-gradient(ellipse at 80% 80%, #E8F0EE, #fff)",
    count: 36,
    products: [
      { id: 1,  name: "Казахская ваза «Сузане»",          master: "Айгерим К.", price: 17900, oldPrice: 22000, badge: "Хит",        img: imgCat2 },
      { id: 2,  name: "Панно настенное «Горный пейзаж»",  master: "Рустем Д.",  price: 21900,                  badge: "Топ мастер", img: imgCat5 },
      { id: 3,  name: "Войлочный ковёр «Степь»",          master: "Нуржан А.",  price: 31900, oldPrice: 38000, badge: null,         img: imgCat1 },
      { id: 4,  name: "Декоративная подушка «Сузане»",    master: "Мадина А.",  price: 3900,  oldPrice: 5200,  badge: "Хит",        img: imgCat3 },
      { id: 5,  name: "Декоративный горшок «Тарелка»",    master: "Айгерим К.", price: 9100,                   badge: "Новинка",    img: imgCat4 },
      { id: 6,  name: "Набор коллекционных тарелок",      master: "Зарина Н.",  price: 9100,  oldPrice: 11500, badge: null,         img: imgCat6 },
      { id: 7,  name: "Кофейник из керамики",             master: "Айгерим К.", price: 7600,                   badge: "Новинка",    img: imgImage8 },
      { id: 8,  name: "Деревянный поднос с резьбой",      master: "Болат Е.",   price: 4600,  oldPrice: 6000,  badge: null,         img: imgCat2 },
    ],
  },
  {
    id: "gifts",
    title: "Подарки",
    description: "Уникальные подарки ручной работы для близких — от небольших сувениров до эксклюзивных авторских наборов.",
    coverImg: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=600&h=400&fit=crop&auto=format",
    coverColor: "radial-gradient(ellipse at 80% 80%, #F6EEE0, #fff)",
    count: 54,
    products: [
      { id: 1,  name: "Подарочный набор украшений",       master: "Зарина Н.",  price: 24900, oldPrice: 29900, badge: "Хит",        img: imgCat2 },
      { id: 2,  name: "Свеча «Ваниль и сандал»",         master: "Балнур Д.",  price: 3400,                   badge: "Топ мастер", img: imgCat4 },
      { id: 3,  name: "Набор ароматических масел",        master: "Балнур Д.",  price: 9200,  oldPrice: 12000, badge: null,         img: imgCat5 },
      { id: 4,  name: "Шкатулка деревянная с узором",    master: "Болат Е.",   price: 11500, oldPrice: 14000, badge: "Хит",        img: imgCat1 },
      { id: 5,  name: "Войлочный сувенир «Юрта»",        master: "Гүлжан Е.", price: 4500,                   badge: "Новинка",    img: imgCat3 },
      { id: 6,  name: "Кожаный кошелёк с тиснением",     master: "Нурлан Б.",  price: 6800,  oldPrice: 8500,  badge: null,         img: imgCat6 },
      { id: 7,  name: "Открытки «Казахстан» набор 10 шт",master: "Алина С.",   price: 1800,                   badge: "Новинка",    img: imgImage8 },
      { id: 8,  name: "Набор свечей «Степные травы»",    master: "Балнур Д.",  price: 7800,  oldPrice: 9500,  badge: null,         img: imgCat2 },
    ],
  },
  {
    id: "new",
    title: "Новинки",
    description: "Только что появившиеся товары от казахстанских мастеров — первыми открывайте новые авторские работы.",
    coverImg: "https://images.unsplash.com/photo-1719836667976-c13531c60b97?w=600&h=400&fit=crop&auto=format",
    coverColor: "radial-gradient(ellipse at 80% 80%, #E8EEF0, #fff)",
    count: 28,
    products: [
      { id: 1,  name: "Серьги «Алтын» из серебра",        master: "Айгерим К.", price: 17600, oldPrice: 21000, badge: "Новинка",    img: imgCat2 },
      { id: 2,  name: "Войлочная сумка «Дала»",           master: "Бибигул М.", price: 12400,                  badge: "Новинка",    img: imgCat3 },
      { id: 3,  name: "Декоративный горшок «Тарелка»",    master: "Айгерим К.", price: 9100,                   badge: "Новинка",    img: imgCat4 },
      { id: 4,  name: "Войлочная шляпа «Казахская»",      master: "Бибигул М.", price: 7200,                   badge: "Новинка",    img: imgCat1 },
      { id: 5,  name: "Кожаные серьги ручной работы",     master: "Нурлан Б.",  price: 3200,                   badge: "Новинка",    img: imgCat5 },
      { id: 6,  name: "Серьги-кольца с орнаментом",       master: "Алия М.",    price: 11200, oldPrice: 13500, badge: "Новинка",    img: imgCat6 },
      { id: 7,  name: "Свеча «Кофе и корица»",            master: "Асель Ж.",   price: 2400,  oldPrice: 3100,  badge: "Новинка",    img: imgImage8 },
      { id: 8,  name: "Деревянная игрушка «Юрта»",        master: "Болат Е.",   price: 7600,                   badge: "Новинка",    img: imgCat2 },
    ],
  },
  {
    id: "top",
    title: "Топ мастера",
    description: "Работы самых рейтинговых мастеров платформы с многолетним опытом и сотнями довольных покупателей.",
    coverImg: "https://images.unsplash.com/photo-1761206887095-e57f9ae4a06f?w=600&h=400&fit=crop&auto=format",
    coverColor: "radial-gradient(ellipse at 80% 80%, #FFF8E8, #fff)",
    count: 41,
    products: [
      { id: 1,  name: "Набор украшений «Казахская роза»",  master: "Алия М.",   price: 44900,                  badge: "Топ мастер", img: imgCat2 },
      { id: 2,  name: "Колье «Степь» ручной работы",      master: "Мадина А.",  price: 27000,                  badge: "Топ мастер", img: imgCat5 },
      { id: 3,  name: "Сырмак настенный из войлока",      master: "Нуржан А.",  price: 28500,                  badge: "Топ мастер", img: imgCat1 },
      { id: 4,  name: "Коврик «Текемет» из войлока",      master: "Нуржан А.",  price: 45000,                  badge: "Топ мастер", img: imgCat3 },
      { id: 5,  name: "Деревянный сундук «Ару»",          master: "Болат Е.",   price: 48000,                  badge: "Топ мастер", img: imgCat4 },
      { id: 6,  name: "Картина «Степная лошадь» масло",   master: "Алина С.",   price: 120000,                 badge: "Топ мастер", img: imgCat6 },
      { id: 7,  name: "Ароматический диффузор «Арча»",    master: "Балнур Д.",  price: 5900,                   badge: "Топ мастер", img: imgImage8 },
      { id: 8,  name: "Набор ароматических масел ×6",     master: "Балнур Д.",  price: 9200,                   badge: "Топ мастер", img: imgCat2 },
    ],
  },
  {
    id: "kazakh",
    title: "Казахское",
    description: "Предметы с национальным характером — орнаменты, войлок, кожа и серебро, уходящие корнями в степную культуру.",
    coverImg: "https://images.unsplash.com/photo-1608755727748-dfa2e44f255b?w=600&h=400&fit=crop&auto=format",
    coverColor: "radial-gradient(ellipse at 80% 80%, #EDE8F6, #fff)",
    count: 67,
    products: [
      { id: 1,  name: "Серьги-тумар с лазуритом",         master: "Айгерим К.", price: 14800, oldPrice: 16800, badge: "Хит",        img: imgImage8 },
      { id: 2,  name: "Сырмак настенный из войлока",      master: "Нуржан А.",  price: 28500,                  badge: "Топ мастер", img: imgCat1 },
      { id: 3,  name: "Домбра декоративная деревянная",   master: "Болат Е.",   price: 6200,  oldPrice: 7800,  badge: "Хит",        img: imgCat3 },
      { id: 4,  name: "Праздничный чапан взрослый",        master: "Зульфия Р.", price: 55000,                  badge: "Топ мастер", img: imgCat4 },
      { id: 5,  name: "Шаль с казахским орнаментом",      master: "Айша К.",    price: 8900,  oldPrice: 11200, badge: null,         img: imgCat2 },
      { id: 6,  name: "Кожаный ремень с тиснением",       master: "Сейткали Д.",price: 9800,                   badge: null,         img: imgCat5 },
      { id: 7,  name: "Гончарная кружка «Алматы»",        master: "Айгерим К.", price: 3800,  oldPrice: 5000,  badge: "Хит",        img: imgCat6 },
      { id: 8,  name: "Кожаная сумка «Батыр»",            master: "Сейткали Д.",price: 27500, oldPrice: 33000, badge: null,         img: imgCat1 },
    ],
  },
  {
    id: "seasonal",
    title: "Сезонные",
    description: "Актуальная подборка к сезону: подарки к праздникам, летние и зимние акценты от лучших мастеров.",
    coverImg: "https://images.unsplash.com/photo-1612179543058-ab74d388e0ce?w=600&h=400&fit=crop&auto=format",
    coverColor: "radial-gradient(ellipse at 80% 80%, #F0EEE8, #fff)",
    count: 23,
    products: [
      { id: 1,  name: "Новогодний венок из войлока",       master: "Гүлжан Е.", price: 5800,  oldPrice: 7200,  badge: "Хит",        img: imgCat3 },
      { id: 2,  name: "Свеча «Зима» еловая",              master: "Балнур Д.",  price: 2900,                   badge: "Новинка",    img: imgCat4 },
      { id: 3,  name: "Подарочный набор «Уют» (3 шт.)",   master: "Асель Ж.",   price: 8400,                   badge: "Топ мастер", img: imgCat5 },
      { id: 4,  name: "Декоративный снеговик из войлока", master: "Сауле М.",   price: 3200,  oldPrice: 4500,  badge: null,         img: imgCat1 },
      { id: 5,  name: "Рождественская открытка (набор)",  master: "Алина С.",   price: 1200,                   badge: "Новинка",    img: imgCat6 },
      { id: 6,  name: "Шарф вязаный ручной работы",       master: "Мадина А.",  price: 6700,  oldPrice: 8500,  badge: null,         img: imgCat2 },
      { id: 7,  name: "Ароматическая свеча «Корица»",     master: "Балнур Д.",  price: 2400,  oldPrice: 3100,  badge: "Хит",        img: imgImage8 },
      { id: 8,  name: "Набор ёлочных игрушек из войлока", master: "Гүлжан Е.", price: 4900,                   badge: "Новинка",    img: imgCat3 },
    ],
  },
];

const QUICK_TABS = [
  { label: "Популярные", collectionId: "home" },
  { label: "Подарки", collectionId: "gifts" },
  { label: "Новинки", collectionId: "new" },
  { label: "Топ-мастера", collectionId: "top" },
];

const SORT_OPTIONS = ["Популярные", "Новинки", "Сначала дешевые", "Сначала дорогие"];

// ── Helpers ───────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<NonNullable<Badge>, { bg: string; text: string; Icon: React.ElementType }> = {
  "Новинка":    { bg: "rgba(49,83,80,0.82)",   text: "#fff",    Icon: Sparkles },
  "Хит":        { bg: "rgba(214,83,10,0.88)",  text: "#fff",    Icon: Flame },
  "Топ мастер": { bg: "rgba(255,198,51,0.95)", text: "#2d1f00", Icon: Star },
};

function BadgePill({ type }: { type: NonNullable<Badge> }) {
  const { bg, text, Icon } = BADGE_STYLES[type];
  return (
    <div className="absolute left-[11px] top-[11px] backdrop-blur-[5px] px-[9px] py-[4px] rounded-[10px] flex items-center gap-[4px]" style={{ background: bg }}>
      <Icon size={10} color={text} strokeWidth={2.5} />
      <span className="font-['Manrope',sans-serif] font-semibold text-[11px] leading-normal" style={{ color: text }}>{type}</span>
    </div>
  );
}

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-[5px]">
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5);
          return (
            <Star key={i} size={13} fill={filled ? "#FFC633" : "none"} stroke={filled ? "#FFC633" : "#d8d0c8"} strokeWidth={1.5} />
          );
        })}
      </div>
      <span className="font-['Manrope',sans-serif] font-bold text-[13px] text-black">{rating.toFixed(1)}</span>
      <span className="font-['Manrope',sans-serif] font-normal text-[12px] text-[#92887d]">({reviews} отз.)</span>
    </div>
  );
}

function Availability({ inStock }: { inStock: boolean }) {
  return (
    <div className="flex items-center gap-[4px]">
      {inStock ? (
        <>
          <div className="w-[7px] h-[7px] rounded-full bg-[#22a355] shrink-0" />
          <span className="font-['Manrope',sans-serif] font-medium text-[11px] text-[#22a355]">В наличии</span>
        </>
      ) : (
        <>
          <Clock size={10} className="text-[#92887d] shrink-0" />
          <span className="font-['Manrope',sans-serif] font-medium text-[11px] text-[#92887d]">Под заказ</span>
        </>
      )}
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ p, catSlug, onFav, faved }: {
  p: CollectionProduct; catSlug: string; onFav: () => void; faved: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const disc = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
  const rating = 4.8 + (p.id % 3) * 0.1;
  const reviews = 23 + p.id * 17;
  const inStock = p.id % 5 !== 0;
  const requireAuth = (action: "cart" | "favorite") => {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    navigate(`/login?redirect=${encodeURIComponent(redirect)}&action=${action}`);
  };

  return (
    <div className="flex flex-col w-full group cursor-pointer" onClick={() => navigate(`/product/${catSlug}/${p.id}`)}>
      <div className="bg-[#f0eeed] overflow-hidden relative rounded-[18px] w-full aspect-square shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200">
        <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
        {p.badge && <BadgePill type={p.badge} />}
        <button onClick={(e) => { e.stopPropagation(); requireAuth("favorite"); }}
          className="absolute right-[10px] top-[10px] bg-white size-[34px] flex items-center justify-center rounded-full shadow-sm hover:scale-110 transition-transform">
          <Star size={0} />
          <svg className="size-[15px] absolute" fill="none" viewBox="0 0 20 18">
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
              fill={faved ? "#ef4444" : "none"}
              stroke={faved ? "#ef4444" : "#374957"}
              strokeWidth={faved ? "0" : "1.2"} />
          </svg>
        </button>
      </div>

      <div className="pt-[10px] flex flex-col gap-[5px] px-[2px]">
        <button
          onClick={(e) => { e.stopPropagation(); navigate("/masters"); }}
          className="flex items-center gap-[4px] w-fit group/master"
        >
          <BadgeCheck size={12} className="text-[#315350] shrink-0" />
          <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350] group-hover/master:underline leading-none">
            {p.master}
          </span>
        </button>
        <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black leading-[1.35] line-clamp-2">{p.name}</p>
        <Stars rating={rating} reviews={reviews} />
        <Availability inStock={inStock} />
        <div className="flex items-center gap-[6px] flex-wrap">
          <span className="font-['Manrope',sans-serif] font-bold text-[18px] text-black leading-none">
            {p.price.toLocaleString("ru-RU")} ₸
          </span>
          {p.oldPrice && (
            <>
              <span className="font-['Manrope',sans-serif] text-[12px] text-[rgba(0,0,0,0.32)] line-through leading-none">
                {p.oldPrice.toLocaleString("ru-RU")} ₸
              </span>
              <div className="bg-[rgba(229,62,62,0.1)] px-[7px] py-[2px] rounded-full">
                <span className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#e53e3e]">-{disc}%</span>
              </div>
            </>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); requireAuth("cart"); }}
          className="mt-[4px] w-full h-[42px] bg-[#315350] rounded-full flex items-center justify-center hover:bg-[#3c6460] active:scale-[0.98] transition-all">
          <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-white">В корзину</span>
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function CollectionsPage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState("home");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [sortOpen, setSortOpen] = useState(false);

  const active = COLLECTIONS.find((c) => c.id === activeId) ?? COLLECTIONS[0];
  const products = [...active.products].sort((a, b) => {
    if (sort === "Новинки") return b.id - a.id;
    if (sort === "Сначала дешевые") return a.price - b.price;
    if (sort === "Сначала дорогие") return b.price - a.price;
    return (b.oldPrice ? 1 : 0) - (a.oldPrice ? 1 : 0);
  });

  function toggleFav(key: string) {
    setFavorites((prev) => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });
  }

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[36px]">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-[6px] mb-8">
          <button onClick={() => navigate("/")} className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#92887d] hover:text-[#315350] transition-colors">
            Главная
          </button>
          <ChevronRight size={12} className="text-[#c5bdb5]" />
          <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957]">Подборки</span>
        </nav>

        <div className="flex gap-[48px]">

          {/* Sidebar */}
          <aside className="w-[220px] shrink-0">
            <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black mb-[20px]">
              Подборки
            </p>

            {/* Collection list */}
            <div className="flex flex-col gap-[4px] mb-[32px]">
              {COLLECTIONS.map((col) => (
                <button key={col.id} onClick={() => setActiveId(col.id)}
                  className="flex items-center justify-between px-[14px] py-[10px] rounded-[14px] text-left transition-all group"
                  style={activeId === col.id
                    ? { background: "#315350", color: "#fff" }
                    : { background: "transparent", color: "#374957" }}>
                  <span className="font-['Manrope',sans-serif] font-medium text-[14px]">{col.title}</span>
                  <span className="font-['Manrope',sans-serif] text-[12px] opacity-60">{col.count}</span>
                </button>
              ))}
            </div>

            {/* Active collection cover */}
            <div className="rounded-[20px] overflow-hidden mb-[8px] aspect-[4/3]" style={{ background: active.coverColor }}>
              <img src={active.coverImg} alt={active.title} className="w-full h-full object-cover" />
            </div>
            <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] leading-[1.5] px-[2px]">
              {active.description}
            </p>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* Header */}
            <div className="mb-[6px]">
              <div className="flex items-start justify-between gap-[20px] mb-[6px]">
                <div>
                  <div className="flex items-baseline gap-[12px] mb-[6px]">
                    <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[32px] text-black leading-none">
                      {active.title}
                    </h1>
                    <span className="font-['Manrope',sans-serif] font-normal text-[15px] text-[rgba(0,0,0,0.4)]">
                      {active.count} товаров
                    </span>
                  </div>
                  <p className="font-['Manrope',sans-serif] font-normal text-[14px] text-[rgba(0,0,0,0.55)] leading-[1.6] max-w-[620px] mb-[20px]">
                    {active.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden lg:flex items-center rounded-full border border-[rgba(55,73,87,0.15)] bg-white p-[3px]">
                    {[
                      { mode: "grid" as const, Icon: LayoutGrid, label: "Плитка" },
                      { mode: "list" as const, Icon: List, label: "Список" },
                    ].map(({ mode, Icon, label }) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className="size-[30px] rounded-full flex items-center justify-center transition-colors"
                        style={{ background: viewMode === mode ? "#315350" : "transparent", color: viewMode === mode ? "#fff" : "#374957" }}
                        aria-label={label}
                      >
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <button onClick={() => setSortOpen((open) => !open)}
                      className="flex items-center gap-[8px] font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] border border-[rgba(55,73,87,0.15)] bg-white rounded-full px-[16px] py-[8px] hover:border-[#315350] transition-colors">
                      {sort}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-[rgba(55,73,87,0.1)] rounded-[14px] shadow-xl z-20 w-52 py-1 overflow-hidden">
                        {SORT_OPTIONS.map((option) => (
                          <button key={option} onClick={() => { setSort(option); setSortOpen(false); }}
                            className="w-full text-left px-4 py-[10px] font-['Manrope',sans-serif] font-medium text-[13px] hover:bg-[#f5f3ed] transition-colors"
                            style={{ color: sort === option ? "#315350" : "#374957" }}>
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-collection tabs */}
              <div className="flex items-center gap-[8px] mb-[24px] flex-wrap">
                {QUICK_TABS.map((tab) => {
                  const activeTab = activeId === tab.collectionId;
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setActiveId(tab.collectionId)}
                      className="h-[32px] px-[14px] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] border transition-colors"
                      style={activeTab
                        ? { background: "#315350", borderColor: "#315350", color: "#fff" }
                        : { background: "#fff", borderColor: "rgba(55,73,87,0.18)", color: "#374957" }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product grid */}
            <div className={viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-[18px] gap-y-[32px]"
              : "grid grid-cols-1 sm:grid-cols-2 gap-x-[18px] gap-y-[32px]"}>
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  catSlug="ukrasheniya"
                  faved={favorites.has(`${activeId}-${p.id}`)}
                  onFav={() => toggleFav(`${activeId}-${p.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-[6px] mt-[48px]">
              {[1, 2, 3, 4, 5].map((p) => (
                <button key={p}
                  className="w-9 h-9 rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-all"
                  style={p === 1
                    ? { background: "#315350", color: "#fff" }
                    : { color: "#374957", border: "1px solid rgba(55,73,87,0.18)", background: "#fff" }}>
                  {p}
                </button>
              ))}
              <span className="text-[#92887d] px-1 font-['Manrope',sans-serif] text-[13px]">...</span>
              <button className="w-9 h-9 rounded-full font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] border border-[rgba(55,73,87,0.18)] bg-white">
                8
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
