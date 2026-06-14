import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Flame, Star, Sparkles, BadgeCheck, ShieldCheck,
  Truck, RotateCcw, Heart, ChevronRight, Clock,
  Search, CreditCard, PackageCheck, MessageCircle,
} from "lucide-react";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgCat6 from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgSub1 from "../../imports/Главная1/1b40a139f3b92da83ffa01b78146295961abad51.png";

// ── Helpers ───────────────────────────────────────────────────────────────────

const BADGE_CFG: Record<string, { bg: string; text: string; Icon: React.ElementType }> = {
  "Новинка":    { bg: "rgba(49,83,80,0.82)",   text: "#fff",    Icon: Sparkles },
  "Хит":        { bg: "rgba(214,83,10,0.88)",  text: "#fff",    Icon: Flame },
  "Топ мастер": { bg: "rgba(255,198,51,0.95)", text: "#2d1f00", Icon: Star },
};

function Badge({ type }: { type: string }) {
  const cfg = BADGE_CFG[type] ?? BADGE_CFG["Новинка"];
  return (
    <div className="absolute left-[12px] top-[12px] backdrop-blur-[5px] px-[9px] py-[4px] rounded-[10px] flex items-center gap-[4px]"
      style={{ background: cfg.bg }}>
      <cfg.Icon size={10} color={cfg.text} strokeWidth={2.5} />
      <span className="font-['Manrope',sans-serif] font-semibold text-[11px]" style={{ color: cfg.text }}>{type}</span>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13}
          fill={i < Math.round(rating) ? "#FFC633" : "none"}
          stroke={i < Math.round(rating) ? "#FFC633" : "#d8d0c8"}
          strokeWidth={1.5} />
      ))}
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

function SectionHeader({ title, linkText, onLink }: { title: string; linkText: string; onLink: () => void }) {
  return (
    <div className="flex items-center justify-between mb-[32px]">
      <h2 style={{ fontFamily: "'Playfair Display', serif" }}
        className="font-bold text-[36px] text-black leading-none">{title}</h2>
      <button onClick={onLink}
        className="flex items-center gap-[4px] font-['Manrope',sans-serif] font-medium text-[15px] text-[#374957] hover:text-[#315350] transition-colors">
        {linkText}
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

function productCountText(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return `${count} товаров`;
  if (last === 1) return `${count} товар`;
  if (last >= 2 && last <= 4) return `${count} товара`;
  return `${count} товаров`;
}

// ── Product card ──────────────────────────────────────────────────────────────

const POPULAR_PRODUCTS = [
  {
    badge: "Хит",
    name: "Серьги-тумар с лазуритом",
    master: "Айгерим К.",
    city: "Алматы",
    price: 14800, oldPrice: 16800, rating: 4.9, reviews: 42,
    img: "https://images.unsplash.com/photo-1646031348418-1840acec6d9d?w=600&h=600&fit=crop&auto=format",
  },
  {
    badge: "Топ мастер",
    name: "Сырмак настенный из войлока",
    master: "Нуржан А.",
    city: "Шымкент",
    price: 28500, oldPrice: 0, rating: 5.0, reviews: 94,
    img: "https://images.unsplash.com/photo-1601056639638-c53c50e13ead?w=600&h=600&fit=crop&auto=format",
  },
  {
    badge: "Новинка",
    name: "Соевая свеча «Лаванда»",
    master: "Балнур Д.",
    city: "Астана",
    price: 2900, oldPrice: 3800, rating: 4.8, reviews: 211,
    img: "https://images.unsplash.com/photo-1603218678692-3967d7523bb0?w=600&h=600&fit=crop&auto=format",
  },
  {
    badge: "",
    name: "Кожаная сумка «Батыр»",
    master: "Сейткали Д.",
    city: "Алматы",
    price: 27500, oldPrice: 33000, rating: 4.7, reviews: 76,
    img: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&h=600&fit=crop&auto=format",
  },
];

const NEW_PRODUCTS = [
  {
    badge: "Новинка",
    name: "Кофейник из керамики",
    master: "Айгерим К.",
    city: "Алматы",
    price: 7600, oldPrice: 0, rating: 4.9, reviews: 18,
    img: imgCat4,
  },
  {
    badge: "Новинка",
    name: "Деревянная игрушка «Арғымақ»",
    master: "Болат Е.",
    city: "Караганда",
    price: 8900, oldPrice: 11200, rating: 4.8, reviews: 27,
    img: imgCat3,
  },
  {
    badge: "Новинка",
    name: "Набор коллекционных тарелок",
    master: "Зарина Н.",
    city: "Астана",
    price: 9100, oldPrice: 11500, rating: 4.8, reviews: 31,
    img: imgCat6,
  },
  {
    badge: "Новинка",
    name: "Подвеска с натуральным камнем",
    master: "Мадина А.",
    city: "Тараз",
    price: 13200, oldPrice: 0, rating: 5.0, reviews: 14,
    img: imgCat5,
  },
];

function ProductCard({ product, onNavigate }: { product: typeof POPULAR_PRODUCTS[0]; onNavigate: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  const inStock = product.rating >= 4.8;
  const requireAuth = (action: "cart" | "favorite") => {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    navigate(`/login?redirect=${encodeURIComponent(redirect)}&action=${action}`);
  };

  return (
    <div className="flex flex-col cursor-pointer group crafty-lift" onClick={onNavigate}>
      <div className="bg-[#f0eeed] w-full aspect-square overflow-hidden relative rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-shadow duration-200">
        <img src={product.img} alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.045] transition-transform duration-300" />
        {product.badge && <Badge type={product.badge} />}
        <button onClick={(e) => { e.stopPropagation(); requireAuth("favorite"); }}
          className="absolute right-[12px] top-[12px] bg-white size-[34px] flex items-center justify-center rounded-full shadow-sm hover:scale-110 transition-transform crafty-pop-hover">
          <Heart size={14} fill="none" stroke="#374957" strokeWidth={1.5} />
        </button>
      </div>
      <div className="pt-[10px] flex flex-col gap-[5px]">
        <button onClick={(e) => { e.stopPropagation(); }}
          className="flex items-center gap-[4px] w-fit h-[16px] group/master">
          <BadgeCheck size={12} className="text-[#315350] shrink-0" />
          <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350] group-hover/master:underline leading-none">
            {product.master} · {product.city}
          </span>
        </button>
        <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black leading-snug line-clamp-2 min-h-[38px]">{product.name}</p>
        <div className="flex items-center gap-[5px] h-[18px]">
          <StarRow rating={product.rating} />
          <span className="font-['Manrope',sans-serif] font-bold text-[12px] text-black">{product.rating.toFixed(1)}</span>
          <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">({product.reviews} отз.)</span>
        </div>
        <div className="h-[16px] flex items-center">
          <Availability inStock={inStock} />
        </div>
        <div className="flex items-center gap-[7px] flex-wrap min-h-[30px]">
          <span className="font-['Manrope',sans-serif] font-bold text-[18px] text-black leading-none">
            {product.price.toLocaleString("ru-RU")} ₸
          </span>
          {product.oldPrice > 0 && (
            <>
              <span className="font-['Manrope',sans-serif] text-[13px] text-[rgba(0,0,0,0.32)] line-through leading-none">
                {product.oldPrice.toLocaleString("ru-RU")} ₸
              </span>
              <div className="bg-[rgba(229,62,62,0.1)] px-[6px] py-[2px] rounded-full">
                <span className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#e53e3e]">-{discount}%</span>
              </div>
            </>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); requireAuth("cart"); }}
          className="mt-[4px] w-full h-[42px] bg-[#315350] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] text-white hover:bg-[#3c6460] active:scale-[0.98] transition-all">
          В корзину
        </button>
      </div>
    </div>
  );
}

// ── Masters strip ─────────────────────────────────────────────────────────────

const TOP_MASTERS = [
  { name: "Clay & Home",         city: "Алматы",   cat: "Гончарство", rating: 4.9, img: imgCat2, sales: 214, products: 38 },
  { name: "Silver Breeze",        city: "Астана",   cat: "Украшения",  rating: 5.0, img: imgImage8, sales: 412, products: 56 },
  { name: "Candle Studio",        city: "Шымкент",  cat: "Свечи",      rating: 4.9, img: imgCat4, sales: 341, products: 44 },
  { name: "Aizatman Felt Studio", city: "Тараз",    cat: "Войлок",     rating: 4.8, img: imgCat1, sales: 178, products: 29 },
  { name: "NurCraft",             city: "Караганда",cat: "Handmade",   rating: 4.9, img: imgCat3, sales: 289, products: 41 },
];

function MasterCard({ master, onNavigate }: { master: typeof TOP_MASTERS[0]; onNavigate: () => void }) {
  return (
    <div onClick={onNavigate}
      className="bg-white border border-[rgba(55,73,87,0.08)] rounded-[20px] p-[18px] cursor-pointer group shrink-0 w-[220px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)] crafty-lift">
      <div className="flex items-center gap-[12px] mb-[14px]">
        <div className="relative w-[64px] h-[64px] shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md group-hover:shadow-lg transition-shadow">
            <img src={master.img} alt={master.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-[2px] -right-[2px] w-[22px] h-[22px] bg-[#315350] rounded-full flex items-center justify-center border-2 border-white">
            <BadgeCheck size={12} className="text-white" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black leading-tight truncate">{master.name}</p>
          <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[2px]">{master.city}</p>
        </div>
      </div>
      <div className="flex items-center gap-[4px] mb-[12px]">
        <Star size={13} fill="#FFC633" stroke="#FFC633" />
        <span className="font-['Manrope',sans-serif] font-bold text-[13px] text-black">{master.rating}</span>
        <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">· {master.cat}</span>
      </div>
      <div className="grid grid-cols-2 gap-[8px]">
        <div className="bg-[#f5f3ed] rounded-[12px] px-[10px] py-[9px]">
          <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#315350] leading-none">{master.sales}</p>
          <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[4px]">продаж</p>
        </div>
        <div className="bg-[#f5f3ed] rounded-[12px] px-[10px] py-[9px]">
          <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#315350] leading-none">{master.products}</p>
          <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[4px]">товаров</p>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(); }}
        className="mt-[12px] w-full h-[36px] rounded-full bg-[#315350] font-['Manrope',sans-serif] font-medium text-[12px] text-white hover:bg-[#3c6460] group-hover:shadow-[0_8px_18px_rgba(49,83,80,0.22)] transition-all"
      >
        Перейти в магазин
      </button>
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({ label, image, gradient, count }: {
  label: string | [string, string]; image: string; gradient: string; count: number;
}) {
  return (
    <div className="relative rounded-[24px] h-[240px] flex flex-col justify-between overflow-hidden crafty-lift"
      style={{ background: gradient }}>
      <div className="px-[24px] pt-[24px] relative z-10">
        <p className="font-['Manrope',sans-serif] font-semibold text-[22px] text-[#374957] leading-[1.15]">
          {Array.isArray(label) ? <>{label[0]}<br />{label[1]}</> : label}
        </p>
        <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mt-[6px]">{productCountText(count)}</p>
      </div>
      <div className="absolute bottom-0 right-0 w-[65%] h-[75%] flex items-end justify-end pr-[12px] pb-[12px]">
        <img src={image} alt="" className="max-w-full max-h-full object-contain crafty-image-shift"
          style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))" }} />
      </div>
    </div>
  );
}

// ── Sub-tag row ───────────────────────────────────────────────────────────────

function SubTagRow({ tags }: {
  tags: { label: string; img: string; slug: string }[];
}) {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex items-start gap-[16px] mb-[28px] overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {tags.map((tag) => {
        const isActive = active === tag.label;
        return (
          <button
            key={tag.label}
            onClick={() => {
              setActive(isActive ? null : tag.label);
              navigate(`/catalog/${tag.slug}`);
            }}
            className="flex flex-col items-center gap-[8px] shrink-0 group"
          >
            <div
              className="w-[120px] h-[96px] rounded-[18px] overflow-hidden bg-[#f5f3ed] transition-all duration-200"
              style={{
                boxShadow: isActive
                  ? "0 0 0 2.5px #315350"
                  : "0 0 0 1.5px rgba(55,73,87,0.10)",
              }}
            >
              <img
                src={tag.img}
                alt={tag.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span
              className="font-['Manrope',sans-serif] font-medium text-[13px] whitespace-nowrap transition-colors"
              style={{ color: isActive ? "#315350" : "#374957" }}
            >
              {tag.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES_DATA = [
  { label: "Украшения",              slug: "ukrasheniya", image: imgCat2, gradient: "radial-gradient(ellipse at 80% 80%, #E8F0EE, #ffffff)", count: 245 },
  { label: "Игрушки",                slug: "igrushki",    image: imgCat3, gradient: "radial-gradient(ellipse at 80% 80%, #EEE8E0, #ffffff)", count: 93 },
  { label: ["Свечи", "и ароматы"] as [string,string], slug: "sveci", image: imgCat4, gradient: "radial-gradient(ellipse at 80% 80%, #E8EEF0, #ffffff)", count: 76 },
  { label: "Текстиль",               slug: "tekstil",     image: imgCat1, gradient: "radial-gradient(ellipse at 80% 80%, #F6EEE0, #ffffff)", count: 128 },
  { label: "Керамика",               slug: "handmade",    image: imgCat5, gradient: "radial-gradient(ellipse at 80% 80%, #FBFDFB, #E8F0EE)", count: 84 },
  { label: "Живопись",               slug: "art",         image: imgSub1, gradient: "radial-gradient(ellipse at 80% 80%, #EDE8F6, #ffffff)", count: 61 },
  { label: ["Кожа", "и сумки"] as [string,string], slug: "kozha", image: imgCat6, gradient: "radial-gradient(ellipse at 80% 80%, #F0EEE8, #ffffff)", count: 72 },
  { label: ["Цифровые", "товары"] as [string,string], slug: "digital", image: imgImage8, gradient: "radial-gradient(ellipse at 80% 80%, #E8EEF0, #ffffff)", count: 38 },
];

const REVIEWS = [
  { name: "Алина К.",   avatar: "АК", color: "#C4A882", rating: 5, text: "Серьги просто невероятные! Лазурит насыщенный, серебро качественное. Пришли быстро, упаковка подарочная.", product: "Серьги-тумар с лазуритом" },
  { name: "Темирлан М.",avatar: "ТМ", color: "#A8C5A0", rating: 5, text: "Заказывал сырмак в подарок — мама в восторге. Качество отменное, орнамент детальный. Рекомендую!", product: "Сырмак настенный" },
  { name: "Дильнара Р.", avatar:"ДР", color: "#B8A4D4", rating: 5, text: "Свеча горит ровно, запах нежный и долгий. Мастер ответил на все вопросы, доставка быстрая.", product: "Свеча «Лаванда»" },
  { name: "Руслан А.", avatar:"РА", color: "#8FA6B2", rating: 5, text: "Покупал кожаный кошелёк. Видно, что работа ручная: аккуратная строчка, приятная кожа, мастер уточнил детали заказа.", product: "Кожаный кошелёк" },
  { name: "Меруерт С.", avatar:"МС", color: "#C08F7D", rating: 5, text: "Очень понравилась упаковка. Брала подарок коллеге, даже дополнительно ничего оформлять не пришлось.", product: "Подарочный набор" },
  { name: "Айбек Н.", avatar:"АН", color: "#9A927B", rating: 5, text: "Доставка пришла вовремя, товар как на фото. Хорошо, что можно видеть мастера и отзывы до покупки.", product: "Деревянный поднос" },
  { name: "Жанна Т.", avatar:"ЖТ", color: "#A38FB2", rating: 5, text: "Заказывала керамику для дома. Цвет и форма живьём даже лучше, чем на фотографии.", product: "Кофейник из керамики" },
  { name: "Сауле Б.", avatar:"СБ", color: "#7EA08F", rating: 5, text: "Нашла необычные украшения с казахским орнаментом. Радует, что это не массовый товар.", product: "Колье «Степь»" },
  { name: "Нурлан Е.", avatar:"НЕ", color: "#B7A37A", rating: 5, text: "Мастер быстро ответил и отправил заказ на следующий день. Для handmade это очень хороший сервис.", product: "Свеча «Степные травы»" },
];

function TestimonialCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="bg-white rounded-[20px] p-[22px] border border-[rgba(55,73,87,0.08)] shadow-[0_8px_24px_rgba(49,83,80,0.06)]">
      <div className="flex items-center gap-[5px] mb-[12px]">
        <div className="flex gap-[2px]">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={11} fill="#FFC633" stroke="#FFC633" />
          ))}
        </div>
        <span className="font-['Manrope',sans-serif] font-bold text-[12px] text-black">{review.rating.toFixed(1)}</span>
      </div>
      <p className="font-['Manrope',sans-serif] text-[13px] text-[rgba(0,0,0,0.62)] leading-[1.65] mb-[16px]">
        {review.text}
      </p>
      <div className="flex items-center gap-[10px]">
        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center font-['Manrope',sans-serif] font-bold text-[13px] text-white shrink-0"
          style={{ background: review.color }}>
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black leading-tight">{review.name}</p>
          <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] truncate">Товар: {review.product}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsColumn({ reviews, duration, direction = "up", className = "" }: {
  reviews: typeof REVIEWS;
  duration: number;
  direction?: "up" | "down";
  className?: string;
}) {
  return (
    <div className={`crafty-testimonials-column h-[430px] overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)" }}>
      <div
        className="crafty-testimonials-track flex flex-col gap-[16px] pb-[16px]"
        data-direction={direction}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <TestimonialCard key={`${review.name}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

function getRevealValues() {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;
  const baseRadius = width < 768 ? 78 : width < 1440 ? 96 : 118;
  const multiplier = baseRadius / 100;

  return {
    maxRadius: Math.round(baseRadius),
    softEdge: Math.round(54 * multiplier),
    lerpSpeed: 0.18,
    radiusLerpSpeed: 0.13,
  };
}

function CraftyImageReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [lerpedPos, setLerpedPos] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [radius, setRadius] = useState(0);
  const [targetRadius, setTargetRadius] = useState(0);
  const [values, setValues] = useState(getRevealValues);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => setValues(getRevealValues());
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!hovered || !mousePos || isTouchDevice) {
      setLerpedPos(null);
      return;
    }

    let frame: number;
    const animate = () => {
      setLerpedPos((prev) => {
        if (!prev) return mousePos;
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.5) return mousePos;
        return {
          x: prev.x + dx * values.lerpSpeed,
          y: prev.y + dy * values.lerpSpeed,
        };
      });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered, isTouchDevice, mousePos, values.lerpSpeed]);

  useEffect(() => {
    setTargetRadius(hovered ? values.maxRadius : 0);
  }, [hovered, values.maxRadius]);

  useEffect(() => {
    let frame: number;
    const animateRadius = () => {
      setRadius((prev) => {
        if (Math.abs(prev - targetRadius) < 1) return targetRadius;
        return prev + (targetRadius - prev) * values.radiusLerpSpeed;
      });
      frame = requestAnimationFrame(animateRadius);
    };

    frame = requestAnimationFrame(animateRadius);
    return () => cancelAnimationFrame(frame);
  }, [targetRadius, values.radiusLerpSpeed]);

  function updatePosition(clientX: number, clientY: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nextPos = { x: clientX - rect.left, y: clientY - rect.top };
    setMousePos(nextPos);
    if (isTouchDevice) setLerpedPos(nextPos);
  }

  const maskStart = Math.max(radius - values.softEdge - 18, 0);
  const maskSoft = Math.max(radius - values.softEdge, 0);
  const maskStyle = lerpedPos && radius > 0
    ? {
        WebkitMaskImage: `radial-gradient(circle ${radius}px at ${lerpedPos.x}px ${lerpedPos.y}px, transparent 0 ${maskStart}px, rgba(0,0,0,0.12) ${maskSoft}px, rgba(0,0,0,0.42) ${Math.max(radius - values.softEdge / 2, 0)}px, rgba(0,0,0,0.78) ${radius}px, black 100%)`,
        maskImage: `radial-gradient(circle ${radius}px at ${lerpedPos.x}px ${lerpedPos.y}px, transparent 0 ${maskStart}px, rgba(0,0,0,0.12) ${maskSoft}px, rgba(0,0,0,0.42) ${Math.max(radius - values.softEdge / 2, 0)}px, rgba(0,0,0,0.78) ${radius}px, black 100%)`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      className="relative h-[360px] rounded-[28px] overflow-hidden border border-[rgba(55,73,87,0.1)] shadow-[0_16px_44px_rgba(49,83,80,0.12)] bg-[#f0eeed] group"
      onMouseMove={(event) => !isTouchDevice && updatePosition(event.clientX, event.clientY)}
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMousePos(null);
        setLerpedPos(null);
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        setHovered(true);
        updatePosition(touch.clientX, touch.clientY);
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (touch) updatePosition(touch.clientX, touch.clientY);
      }}
      onTouchEnd={() => {
        setHovered(false);
        setMousePos(null);
        setLerpedPos(null);
      }}
    >
      <img src={imgCat5} alt="Проверка товара мастером Crafty" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#172825]/82 backdrop-blur-[6px] transition-opacity duration-300 pointer-events-none" style={maskStyle} />
      {lerpedPos && radius > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle ${radius + 34}px at ${lerpedPos.x}px ${lerpedPos.y}px, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.08) 56%, transparent 100%)`,
            mixBlendMode: "screen",
          }}
        />
      )}
      <div className="absolute left-[18px] top-[18px] h-[34px] px-[13px] rounded-full bg-white/88 backdrop-blur-sm flex items-center gap-[7px]">
        <BadgeCheck size={14} className="text-[#315350]" />
        <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350]">Проверка Crafty</span>
      </div>
      <div className="absolute left-[22px] right-[22px] bottom-[20px]">
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[24px] text-white leading-tight mb-[6px]">
          Видим изделие до публикации
        </p>
        <p className="font-['Manrope',sans-serif] text-[13px] text-white/72 leading-[1.55] max-w-[360px]">
          Проверяем описание, фото, контакты мастера и качество карточки перед попаданием в каталог.
        </p>
      </div>
    </div>
  );
}

const COLLECTIONS_DATA = [
  { label: "Для дома",   image: imgCat5,   gradient: "radial-gradient(circle at 50% 50%, #FBFDFB, #BEDED1)", slug: "home" },
  { label: "Подарки",    image: imgCat6,   gradient: "radial-gradient(circle at 50% 50%, #ffffff, #EEDFB8)", slug: "gifts" },
  { label: "Казахстанское", image: imgSub1, gradient: "radial-gradient(circle at 50% 50%, #ffffff, #E7E0F6)", slug: "kazakh" },
  { label: "Свадьба",    image: imgImage8, gradient: "radial-gradient(circle at 50% 50%, #ffffff, #E8F0EE)", slug: "gifts" },
  { label: "Детям",      image: imgCat3,   gradient: "radial-gradient(circle at 50% 50%, #ffffff, #EEE8E0)", slug: "gifts" },
  { label: "Новинки",    image: imgCat4,   gradient: "radial-gradient(circle at 50% 50%, #ffffff, #E8EEF0)", slug: "new" },
];

const POPULAR_SEARCHES = [
  { label: "Украшения", slug: "ukrasheniya" },
  { label: "Свечи", slug: "sveci" },
  { label: "Керамика", slug: "handmade" },
  { label: "Подарки", slug: "gifts" },
  { label: "Для дома", slug: "home" },
  { label: "Национальный стиль", slug: "kazakh" },
];

const TRUST_FEATURES = [
  { Icon: BadgeCheck, title: "Все мастера проходят модерацию", desc: "Проверяем профиль, контакты и качество карточек до публикации." },
  { Icon: Sparkles, title: "Ручная работа", desc: "В каталоге изделия малых мастерских, а не массовый поток." },
  { Icon: ShieldCheck, title: "Безопасная оплата", desc: "Заказ фиксируется на платформе, покупатель получает подтверждение." },
  { Icon: Truck, title: "Доставка по Казахстану", desc: "Мастера отправляют заказы в Алматы, Астану, Шымкент и другие города." },
];

const FAQ_ITEMS = [
  { q: "Как оформить заказ?", a: "Выберите товар, добавьте его в корзину, укажите контакты и способ доставки. После оплаты мастер получит заказ и начнёт подготовку." },
  { q: "Как работает доставка?", a: "Доставку оформляет мастер через доступные службы по Казахстану. Срок зависит от города, формата изделия и способа отправки." },
  { q: "Можно ли вернуть товар?", a: "Да, если товар не подошёл или пришёл с дефектом. Для изделий под заказ условия возврата согласуются до оплаты." },
  { q: "Когда получу заказ?", a: "Готовые товары обычно отправляются в течение 1-3 рабочих дней. Изделия под заказ требуют дополнительного времени на изготовление." },
  { q: "Как стать мастером?", a: "Нажмите «Стать мастером», заполните заявку и пройдите базовую модерацию. После проверки можно добавлять товары в каталог." },
];

const MASTER_WORK_IMAGES = [
  imgCat2,
  imgCat1,
  imgCat4,
  imgCat6,
  imgCat3,
  imgCat5,
  imgImage8,
  imgSub1,
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbfbf8]">

      {/* ── Hero ── */}
      <section className="max-w-[1440px] mx-auto px-[83px] pt-[100px] pb-[72px]">
        <div className="grid grid-cols-2 gap-8 items-start">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-[7px] h-[34px] px-[13px] rounded-full border border-[rgba(49,83,80,0.18)] bg-white text-[#315350] font-['Manrope',sans-serif] font-semibold text-[13px] mb-[18px] crafty-fade-up">
              <Sparkles size={14} />
              Маркетплейс handmade в Казахстане
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[64px] text-black leading-[68px] mb-[20px] crafty-fade-up crafty-delay-1">
              Товары ручной<br />
              работы от местных<br />
              мастеров
            </h1>
            <p className="font-['Manrope',sans-serif] font-normal text-[16px] text-[rgba(0,0,0,0.6)] leading-[24px] mb-[36px] max-w-[500px] crafty-fade-up crafty-delay-2">
              Украшения, текстиль, керамика и многое другое — созданные руками мастеров Казахстана с доставкой на дом.
            </p>
            <div className="flex items-center gap-[14px] mb-[44px] crafty-fade-up crafty-delay-3">
              <button onClick={() => navigate("/catalog")}
                className="bg-[#315350] h-[50px] px-[48px] rounded-full font-['Manrope',sans-serif] font-medium text-[15px] text-white hover:bg-[#3c6460] crafty-soft-lift">
                Перейти в каталог
              </button>
              <button onClick={() => navigate("/masters")}
                className="bg-white h-[50px] px-[48px] rounded-full font-['Manrope',sans-serif] font-medium text-[15px] text-black border border-[rgba(0,0,0,0.1)] hover:bg-[#f5f5f2] crafty-soft-lift">
                Стать продавцом
              </button>
            </div>

            {/* Stats — believable numbers */}
            <div className="flex items-center gap-[28px] mb-[20px] crafty-fade-up crafty-delay-4">
              {[
                { value: "500+",  label: "товаров в каталоге" },
                { value: "50+",   label: "проверенных мастеров" },
                { value: "12",    label: "городов Казахстана" },
                { value: "4.9",   label: "средний рейтинг" },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center gap-[28px]">
                  <div>
                    <p className="font-['Manrope',sans-serif] font-bold text-[36px] text-black leading-none">{s.value}</p>
                    <p className="font-['Manrope',sans-serif] font-normal text-[14px] text-[rgba(0,0,0,0.55)] mt-[3px]">{s.label}</p>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-[44px] bg-black opacity-10" />}
                </div>
              ))}
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-[6px] crafty-fade-up crafty-delay-4">
              <BadgeCheck size={15} className="text-[#315350] shrink-0" />
              <span className="font-['Manrope',sans-serif] font-normal text-[13px] text-[#374957]">
                Проверенные мастера из Алматы, Астаны, Шымкента и других городов Казахстана
              </span>
            </div>

            <div className="flex items-center gap-[8px] mt-[18px] flex-wrap crafty-fade-up crafty-delay-4">
              <span className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">Популярные запросы:</span>
              {POPULAR_SEARCHES.map((query) => (
                <button
                  key={query.label}
                  onClick={() => navigate(`/catalog/${query.slug}`)}
                  className="h-[28px] px-[12px] rounded-full bg-white border border-[rgba(55,73,87,0.12)] font-['Manrope',sans-serif] font-medium text-[12px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors"
                >
                  {query.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — handmade image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-[18px] h-[440px]">
            <div className="rounded-[28px] overflow-hidden bg-[#f0eeed] shadow-[0_12px_36px_rgba(0,0,0,0.08)] crafty-fade-up crafty-delay-2 crafty-float">
              <img src={imgCat2} alt="Украшение ручной работы" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[28px] overflow-hidden bg-[#f0eeed] row-span-2 shadow-[0_12px_36px_rgba(0,0,0,0.08)] crafty-fade-up crafty-delay-3 crafty-float-slow">
              <img src={imgCat1} alt="Мастерская Crafty" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[28px] overflow-hidden bg-[#f0eeed] shadow-[0_12px_36px_rgba(0,0,0,0.08)] crafty-fade-up crafty-delay-4 crafty-float-slow">
              <img src={imgCat6} alt="Подарочная упаковка handmade" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust features ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[34px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
          {TRUST_FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-[18px] border border-[rgba(55,73,87,0.08)] px-[18px] py-[18px] flex gap-[12px] items-start crafty-soft-lift hover:shadow-[0_8px_22px_rgba(49,83,80,0.08)]">
              <div className="w-[38px] h-[38px] rounded-[13px] bg-[#f0f5f4] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#315350]" />
              </div>
              <div>
                <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#374957] leading-snug mb-[4px]">{title}</p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] leading-[1.5]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[48px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Как работает Crafty" linkText="В каталог" onLink={() => navigate("/catalog")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {[
            { Icon: Search, title: "Выберите товар", desc: "Найдите работу мастера по категории, рейтингу или подборке." },
            { Icon: CreditCard, title: "Оплатите безопасно", desc: "Оплата проходит через платформу, заказ фиксируется в системе." },
            { Icon: PackageCheck, title: "Мастер отправит заказ", desc: "Мастер готовит изделие и передаёт его в доставку по Казахстану." },
            { Icon: MessageCircle, title: "Получите и оставьте отзыв", desc: "После получения оцените товар и помогите другим покупателям." },
          ].map(({ Icon, title, desc }, index) => (
            <div key={title} className="bg-white rounded-[20px] p-[22px] border border-[rgba(55,73,87,0.08)] hover:border-[rgba(49,83,80,0.18)] hover:shadow-[0_8px_24px_rgba(49,83,80,0.08)] crafty-lift" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="flex items-center justify-between mb-[18px]">
                <div className="w-[44px] h-[44px] bg-[#f0f5f4] rounded-[14px] flex items-center justify-center">
                  <Icon size={20} className="text-[#315350]" />
                </div>
                <span className="font-['Manrope',sans-serif] font-bold text-[24px] text-[#315350]/20">0{index + 1}</span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[18px] text-black mb-[8px]">{title}</p>
              <p className="font-['Manrope',sans-serif] text-[13px] text-[rgba(0,0,0,0.55)] leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular products (right after hero) ── */}
      <section id="masters" className="scroll-mt-[96px] max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Популярные товары" linkText="Смотреть все" onLink={() => navigate("/catalog")} />

        {/* Sub-category image chips */}
        <SubTagRow
          tags={[
            { label: "Украшения",  img: imgCat2,   slug: "ukrasheniya" },
            { label: "Свечи",      img: imgCat4,   slug: "sveci" },
            { label: "Текстиль",   img: imgCat1,   slug: "tekstil" },
            { label: "Игрушки",    img: imgCat3,   slug: "igrushki" },
            { label: "Живопись",   img: imgCat5,   slug: "art" },
            { label: "Кожа",       img: imgCat6,   slug: "kozha" },
          ]}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {POPULAR_PRODUCTS.map((p, i) => (
            <ProductCard key={i} product={p} onNavigate={() => navigate(`/product/ukrasheniya/${i + 1}`)} />
          ))}
        </div>
      </section>

      {/* ── New products ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Новинки" linkText="Смотреть все" onLink={() => navigate("/catalog")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {NEW_PRODUCTS.map((p, i) => (
            <ProductCard key={i} product={p} onNavigate={() => navigate(`/product/ukrasheniya/${i + 5}`)} />
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Категории" linkText="Все категории" onLink={() => navigate("/catalog")} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {CATEGORIES_DATA.map((cat, i) => (
            <button key={i} onClick={() => navigate(`/catalog/${cat.slug}`)} className="text-left group">
              <CategoryCard {...cat} />
            </button>
          ))}
        </div>
      </section>

      {/* ── Top masters ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Лучшие мастера" linkText="Все мастера" onLink={() => navigate("/masters")} />
        <div className="flex gap-[32px] overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {TOP_MASTERS.map((m, i) => (
            <MasterCard key={i} master={m} onNavigate={() => navigate("/masters")} />
          ))}
        </div>
      </section>

      {/* ── Master works slider ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section overflow-hidden">
        <div className="mb-[28px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[36px] text-black leading-none mb-[10px]">
            Работы наших мастеров
          </h2>
          <p className="font-['Manrope',sans-serif] text-[15px] text-[rgba(0,0,0,0.55)] max-w-[620px] leading-[1.6]">
            Украшения, керамика, текстиль и подарки ручной работы из разных городов Казахстана.
          </p>
        </div>
        <div className="crafty-scroll-container -mx-[80px] px-[80px] overflow-hidden">
          <div className="crafty-infinite-scroll flex gap-[20px] w-max">
            {[...MASTER_WORK_IMAGES, ...MASTER_WORK_IMAGES].map((image, index) => (
              <div
                key={index}
                className="shrink-0 w-[176px] h-[176px] md:w-[224px] md:h-[224px] rounded-[22px] overflow-hidden border border-[rgba(55,73,87,0.08)] bg-[#f0eeed] shadow-[0_8px_24px_rgba(49,83,80,0.08)] transition-transform duration-300 hover:scale-[1.04]"
              >
                <img
                  src={image}
                  alt={`Работа мастера ${(index % MASTER_WORK_IMAGES.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verified masters ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <div className="grid lg:grid-cols-[0.95fr_1.15fr] gap-[40px] items-start">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[36px] text-black leading-none mb-[14px]">
              Как мы проверяем мастеров
            </h2>
            <p className="font-['Manrope',sans-serif] text-[15px] text-[rgba(0,0,0,0.55)] leading-[1.65] mb-[22px]">
              Crafty показывает не анонимные объявления, а работы мастеров, которые прошли базовую проверку и собирают публичную репутацию.
            </p>
            <div className="grid gap-[12px]">
              {[
                "Удостоверение личности",
                "Контакты и реквизиты",
                "Качество карточек товаров",
                "Отзывы покупателей и история продаж",
              ].map((item) => (
                <div key={item} className="bg-white rounded-[18px] border border-[rgba(55,73,87,0.08)] px-[18px] py-[14px] flex items-center gap-[12px] crafty-soft-lift hover:shadow-[0_8px_22px_rgba(49,83,80,0.08)]">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#f0f5f4] flex items-center justify-center shrink-0">
                    <BadgeCheck size={16} className="text-[#315350]" />
                  </div>
                  <span className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="crafty-fade-up crafty-delay-2">
            <CraftyImageReveal />
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Подборки" linkText="Все подборки" onLink={() => navigate("/collections")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {COLLECTIONS_DATA.map((col, i) => (
            <button key={i} onClick={() => navigate("/collections")}
              className="relative rounded-[24px] overflow-hidden h-[300px] text-left group crafty-lift"
              style={{ background: col.gradient }}>
              <img src={col.image} alt={col.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <p style={{ fontFamily: "'Playfair Display', serif" }}
                className="absolute bottom-[20px] left-[22px] font-bold text-[22px] text-white">
                {col.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ── Why Crafty ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <div className="text-center mb-[40px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[36px] text-black mb-[10px]">
            Почему Crafty.kz
          </h2>
          <p className="font-['Manrope',sans-serif] text-[15px] text-[rgba(0,0,0,0.55)] max-w-[500px] mx-auto leading-[1.6]">
            Мы создали платформу, где покупатели и мастера встречаются с максимальным доверием.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {[
            { Icon: BadgeCheck, title: "Проверенные мастера", desc: "Каждый мастер проходит верификацию личности и качества товаров." },
            { Icon: ShieldCheck, title: "Безопасная оплата",   desc: "Деньги поступают мастеру только после подтверждения получения." },
            { Icon: Truck,       title: "Доставка по КЗ",      desc: "Доставляем по всему Казахстану. Отслеживание в реальном времени." },
            { Icon: RotateCcw,   title: "Возврат 14 дней",     desc: "Не понравилось? Вернём деньги без лишних вопросов." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-[20px] p-[24px] border border-[rgba(55,73,87,0.08)] crafty-lift hover:shadow-[0_8px_24px_rgba(49,83,80,0.08)]">
              <div className="w-[44px] h-[44px] bg-[#f0f5f4] rounded-[14px] flex items-center justify-center mb-[16px]">
                <Icon size={20} className="text-[#315350]" />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[17px] text-black mb-[8px]">{title}</p>
              <p className="font-['Manrope',sans-serif] text-[13px] text-[rgba(0,0,0,0.55)] leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <SectionHeader title="Отзывы покупателей" linkText="Все отзывы" onLink={() => navigate("/catalog")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          <TestimonialsColumn reviews={REVIEWS.slice(0, 5)} duration={22} />
          <TestimonialsColumn reviews={REVIEWS.slice(3, 8)} duration={28} direction="down" className="hidden md:block" />
          <TestimonialsColumn reviews={[...REVIEWS.slice(6), ...REVIEWS.slice(0, 2)]} duration={34} className="hidden md:block" />
        </div>
      </section>

      {/* ── Become a master CTA ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <div className="rounded-[32px] px-[64px] py-[56px] flex flex-col lg:flex-row items-center justify-between gap-[32px] crafty-cta-gradient"
          style={{ backgroundImage: "linear-gradient(120deg, #315350, #3c6460, #294743)" }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[36px] text-white mb-[12px]">
              Вы мастер? Начните продавать сегодня
            </h2>
            <p className="font-['Manrope',sans-serif] text-[15px] text-white/70 max-w-[480px] leading-[1.6]">
              Присоединяйтесь к 50+ проверенным мастерам Казахстана. Бесплатная регистрация,
              простой магазин и поддержка на каждом шагу.
            </p>
            <div className="flex items-center gap-[20px] mt-[16px]">
              {["Бесплатная регистрация", "Поддержка 24/7", "Быстрый старт"].map((f) => (
                <div key={f} className="flex items-center gap-[6px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-white/60" />
                  <span className="font-['Manrope',sans-serif] text-[13px] text-white/70">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-[12px] shrink-0">
            <button onClick={() => navigate("/apply")}
              className="h-[50px] px-[36px] bg-white text-[#315350] rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#f5f3ed] crafty-soft-lift hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
              Стать мастером
            </button>
            <button onClick={() => navigate("/masters")}
              className="h-[50px] px-[36px] border border-white/30 text-white rounded-full font-['Manrope',sans-serif] font-medium text-[15px] hover:border-white/60 crafty-soft-lift">
              Узнать больше
            </button>
          </div>
        </div>
      </section>

      {/* ── Marketplace numbers ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[40px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <div className="bg-white rounded-[28px] border border-[rgba(55,73,87,0.08)] px-[40px] py-[34px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[32px] text-black leading-none mb-[28px]">
            Crafty в цифрах
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {[
              { value: "50+", label: "мастеров" },
              { value: "500+", label: "товаров" },
              { value: "1000+", label: "заказов" },
              { value: "12", label: "городов Казахстана" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-['Manrope',sans-serif] font-bold text-[36px] text-[#315350] leading-none">{item.value}</p>
                <p className="font-['Manrope',sans-serif] text-[14px] text-[#92887d] mt-[8px]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Made in Kazakhstan + FAQ ── */}
      <section className="max-w-[1440px] mx-auto px-[80px] py-[56px] border-t border-[rgba(55,73,87,0.07)] crafty-section">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-[28px] items-start">
          <div className="rounded-[28px] overflow-hidden min-h-[430px] relative bg-[#315350]">
            <img src={imgSub1} alt="Изделие ручной работы из Казахстана" className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172825]/90 via-[#172825]/30 to-transparent" />
            <div className="absolute left-[28px] right-[28px] bottom-[28px]">
              <div className="inline-flex items-center gap-[7px] h-[32px] px-[12px] rounded-full bg-white/90 mb-[14px]">
                <BadgeCheck size={14} className="text-[#315350]" />
                <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350]">Сделано в Казахстане</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[34px] text-white leading-tight mb-[10px]">
                Поддерживаем местных мастеров
              </h2>
              <p className="font-['Manrope',sans-serif] text-[14px] text-white/74 leading-[1.65] max-w-[430px]">
                Каждая покупка помогает развивать ремесло Казахстана и сохранять авторские техники в современной форме.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[28px] border border-[rgba(55,73,87,0.08)] px-[30px] py-[30px]">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[32px] text-black leading-none mb-[8px]">
              FAQ
            </h2>
            <p className="font-['Manrope',sans-serif] text-[14px] text-[#92887d] leading-[1.6] mb-[20px]">
              Ответы на вопросы, которые чаще всего возникают перед первым заказом.
            </p>
            <div className="divide-y divide-[rgba(55,73,87,0.08)]">
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="group py-[16px]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px]">
                    <span className="font-['Manrope',sans-serif] font-bold text-[15px] text-[#374957] leading-snug">{item.q}</span>
                    <ChevronRight size={18} className="text-[#92887d] shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="font-['Manrope',sans-serif] text-[13px] text-[rgba(0,0,0,0.58)] leading-[1.65] mt-[10px] pr-[28px]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-4" style={{ background: "#1e2e2c" }}>
        <div className="max-w-[1440px] mx-auto px-[80px] py-[48px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[22px] font-bold text-white mb-3">Crafty.kz</p>
              <p className="font-['Manrope',sans-serif] text-[13px] text-white/60 leading-relaxed">
                Маркетплейс товаров ручной работы от казахстанских мастеров.
              </p>
            </div>
            {[
              { title: "Покупателям", links: ["Как купить", "Доставка и оплата", "Возврат товара", "Поддержка"] },
              { title: "Мастерам",    links: ["Стать мастером", "Как продавать", "Тарифы", "Продвижение"] },
              { title: "Компания",    links: ["О нас", "Команда", "Блог", "Пресса"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-white mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="font-['Manrope',sans-serif] text-[13px] text-white/55 hover:text-white/90 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-5 flex items-center justify-between">
            <p className="font-['Manrope',sans-serif] text-[12px] text-white/40">© 2026 Crafty.kz. Все права защищены.</p>
            <div className="flex gap-[16px]">
              {["Пользовательское соглашение", "Политика конфиденциальности"].map((l) => (
                <a key={l} href="#" className="font-['Manrope',sans-serif] text-[12px] text-white/40 hover:text-white/70 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
