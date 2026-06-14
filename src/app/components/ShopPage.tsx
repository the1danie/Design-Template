import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  BadgeCheck,
  Check,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  PackageCheck,
  Search,
  Share2,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { ALL_CATEGORIES, type Badge } from "../catalogData";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgCat6 from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import { PageBreadcrumb } from "./PageBreadcrumb";
import { SegmentedControl } from "./PageControls";

type ShopBadge = "verified" | "top" | "choice" | "kazakh" | "new";

type ShopProfile = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  city: string;
  rating: number;
  reviews: number;
  products: number;
  sales: number;
  since: string;
  responseTime: string;
  responseRate: number;
  cover: string;
  avatar: string;
  bio: string;
  badges: ShopBadge[];
};

const SHOPS: ShopProfile[] = [
  {
    id: "silver-breeze",
    name: "Silver Breeze",
    category: "Украшения",
    categorySlug: "ukrasheniya",
    city: "Алматы",
    rating: 5.0,
    reviews: 412,
    products: 64,
    sales: 532,
    since: "2019",
    responseTime: "в течение 2 часов",
    responseRate: 98,
    cover: "https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?w=1600&h=420&fit=crop&auto=format",
    avatar: imgImage8,
    bio: "Серебряные украшения с лазуритом, агатом и традиционными казахскими мотивами. Каждое изделие создается вручную небольшими партиями.",
    badges: ["verified", "top", "choice", "kazakh"],
  },
  {
    id: "candle-studio",
    name: "Candle Studio",
    category: "Свечи и ароматика",
    categorySlug: "sveci",
    city: "Алматы",
    rating: 4.9,
    reviews: 341,
    products: 27,
    sales: 418,
    since: "2020",
    responseTime: "в течение 3 часов",
    responseRate: 96,
    cover: "https://images.unsplash.com/photo-1624479163091-3c000402218d?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat4,
    bio: "Соевые и восковые свечи с натуральными ароматами степных трав, цветов и древесных нот.",
    badges: ["verified", "top", "choice"],
  },
  {
    id: "clay-home",
    name: "Clay & Home",
    category: "Гончарство",
    categorySlug: "handmade",
    city: "Алматы",
    rating: 4.9,
    reviews: 214,
    products: 38,
    sales: 286,
    since: "2022",
    responseTime: "в течение дня",
    responseRate: 94,
    cover: "https://images.unsplash.com/photo-1676125105332-608345abe20e?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat2,
    bio: "Авторская керамика и предметы для дома, вдохновленные казахской культурой, землей и природными оттенками.",
    badges: ["verified", "top", "kazakh"],
  },
  {
    id: "aizatman",
    name: "Aizatman Felt Studio",
    category: "Войлок и текстиль",
    categorySlug: "tekstil",
    city: "Астана",
    rating: 4.8,
    reviews: 178,
    products: 52,
    sales: 241,
    since: "2021",
    responseTime: "в течение 4 часов",
    responseRate: 95,
    cover: "https://images.unsplash.com/photo-1623578059518-bbdb071eab81?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat1,
    bio: "Войлочные изделия ручной работы: сырмаки, корпе, сумки и интерьерные акценты с орнаментом.",
    badges: ["verified", "choice", "kazakh"],
  },
  {
    id: "nurcraft",
    name: "NurCraft",
    category: "Казахское handmade",
    categorySlug: "handmade",
    city: "Алматы",
    rating: 4.9,
    reviews: 289,
    products: 56,
    sales: 364,
    since: "2020",
    responseTime: "в течение 2 часов",
    responseRate: 97,
    cover: "https://images.unsplash.com/photo-1762628727567-250080e7e9a3?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat3,
    bio: "Традиционные казахские сувениры, войлочные изделия и национальные подарки на заказ.",
    badges: ["verified", "choice", "kazakh"],
  },
  {
    id: "leather-agentin",
    name: "Leather by Agentin",
    category: "Кожаные изделия",
    categorySlug: "kozha",
    city: "Алматы",
    rating: 4.8,
    reviews: 157,
    products: 43,
    sales: 219,
    since: "2021",
    responseTime: "в течение дня",
    responseRate: 92,
    cover: "https://images.unsplash.com/photo-1609619742069-f5e18afeef17?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat6,
    bio: "Сумки, ремни и кошельки из натуральной кожи с тиснением и аккуратной ручной сборкой.",
    badges: ["verified", "top"],
  },
  {
    id: "craftylan",
    name: "CraftyLan",
    category: "Декор и живопись",
    categorySlug: "art",
    city: "Шымкент",
    rating: 4.7,
    reviews: 96,
    products: 31,
    sales: 124,
    since: "2023",
    responseTime: "в течение 5 часов",
    responseRate: 91,
    cover: "https://images.unsplash.com/photo-1598495494482-172d89ff078c?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat5,
    bio: "Акварели, постеры и авторский декор с казахстанскими пейзажами в современном стиле.",
    badges: ["verified", "new", "kazakh"],
  },
  {
    id: "felt-tales",
    name: "Felt & Tales",
    category: "Игрушки",
    categorySlug: "igrushki",
    city: "Астана",
    rating: 4.8,
    reviews: 203,
    products: 48,
    sales: 267,
    since: "2024",
    responseTime: "в течение 3 часов",
    responseRate: 95,
    cover: "https://images.unsplash.com/photo-1676125105159-517d135a6cc3?w=1600&h=420&fit=crop&auto=format",
    avatar: imgCat5,
    bio: "Войлочные игрушки и развивающие наборы для детей, вдохновленные казахскими сказками.",
    badges: ["verified", "new"],
  },
];

const BADGE_LABELS: Record<ShopBadge, string> = {
  verified: "Проверен Crafty",
  top: "Топ-мастер",
  choice: "Выбор покупателей",
  kazakh: "Казахстанский бренд",
  new: "Новый мастер",
};

const TABS = ["Все товары", "Новинки", "Хиты", "Под заказ"];
const REVIEWS_TAB = "Отзывы";

type ShopReview = { id: string; author: string; rating: number; text: string; product: string; date: string };
const MOCK_REVIEWS: ShopReview[] = [
  { id: "1", author: "Айгерим К.",   rating: 5, text: "Потрясающее качество! Каждая деталь продумана. Уже заказала ещё одну чашку — подруга тоже захотела.", product: "Керамическая кружка с орнаментом", date: "5 дней назад" },
  { id: "2", author: "Дмитрий Л.",   rating: 5, text: "Мастер очень внимательно отнёсся к пожеланиям. Упаковка была идеальной — ничего не повредилось.", product: "Чайник ручной работы", date: "2 недели назад" },
  { id: "3", author: "Нурила С.",    rating: 4, text: "Красивая работа, цвет немного отличается от фото, но в целом очень довольна. Буду заказывать снова.", product: "Ваза декоративная", date: "3 недели назад" },
  { id: "4", author: "Арман Б.",     rating: 5, text: "Подарил жене на день рождения — она была в восторге. Качество на уровне европейских брендов.", product: "Набор керамических тарелок", date: "1 месяц назад" },
  { id: "5", author: "Светлана М.",  rating: 5, text: "Очень быстрая обработка заказа. Отвечает оперативно, всё сделала точно по пожеланиям. Рекомендую!", product: "Блюдо керамическое", date: "1 месяц назад" },
  { id: "6", author: "Бауыржан Н.", rating: 4, text: "Хорошее соотношение цены и качества. Единственный момент — доставка заняла чуть дольше обещанного.", product: "Горшок для цветов", date: "2 месяца назад" },
];

const formatPrice = (price: number) => `${price.toLocaleString("ru-RU")} ₸`;

function productBadgeMatches(badge: Badge, tab: string) {
  if (tab === "Новинки") return badge === "Новинка";
  if (tab === "Хиты") return badge === "Хит" || badge === "Топ мастер";
  return true;
}

function AskShopModal({ masterName, masterAvatar, onClose }: {
  masterName: string;
  masterAvatar: string;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const MIN = 5;
  const MAX = 500;
  const canSend = text.trim().length >= MIN;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]"
      style={{ background: "rgba(0,0,0,0.48)" }}
      onClick={sent ? onClose : undefined}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-[460px] shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[24px] pt-[22px] pb-[16px] border-b border-[rgba(55,73,87,0.08)]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[32px] h-[32px] bg-[#eef3ef] rounded-full flex items-center justify-center">
              <MessageCircle size={15} className="text-[#315350]" />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[18px] text-black">
              Задать вопрос мастеру
            </p>
          </div>
          <button type="button" onClick={onClose}
            className="w-[32px] h-[32px] rounded-full hover:bg-[#f5f3ed] flex items-center justify-center transition-colors">
            <X size={16} className="text-[#374957]" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center text-center px-[24px] py-[40px]">
            <div className="w-[64px] h-[64px] bg-[#eef3ef] rounded-full flex items-center justify-center mb-[16px]">
              <Check size={28} className="text-[#315350]" />
            </div>
            <p className="font-['Manrope',sans-serif] font-bold text-[17px] text-black mb-[8px]">Сообщение отправлено!</p>
            <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7] mb-[6px]">
              Мастер <span className="font-semibold text-[#374957]">{masterName}</span> получит уведомление и ответит в ближайшее время.
            </p>
            <p className="font-['Manrope',sans-serif] text-[12px] text-[#b0a89e] mb-[28px]">Ответ придёт на ваш email</p>
            <button type="button" onClick={onClose}
              className="h-[44px] px-[28px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[14px] hover:bg-[#3c6460] transition-colors">
              Хорошо
            </button>
          </div>
        ) : (
          <div className="px-[24px] py-[20px]">
            <div className="flex items-center gap-[12px] mb-[18px] p-[12px] bg-[#fafaf8] rounded-[14px]">
              <img src={masterAvatar} alt={masterName}
                className="w-[42px] h-[42px] rounded-full object-cover border border-[rgba(55,73,87,0.1)] shrink-0" />
              <div className="min-w-0">
                <p className="font-['Manrope',sans-serif] font-bold text-[13px] text-black truncate">{masterName}</p>
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">Проверенный мастер Crafty</p>
              </div>
            </div>

            <div className="mb-[16px]">
              <label className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] block mb-[6px]">
                Ваше сообщение
              </label>
              <textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX))}
                placeholder="Например: Можно ли сделать на заказ? Какие сроки изготовления?"
                rows={4}
                className="w-full rounded-[14px] border border-[rgba(55,73,87,0.16)] px-[14px] py-[12px] font-['Manrope',sans-serif] text-[14px] text-[#374957] placeholder:text-[#b0a89e] outline-none focus:border-[#315350] resize-none transition-colors"
              />
              <div className="flex items-center justify-between mt-[4px]">
                {text.trim().length > 0 && text.trim().length < MIN
                  ? <p className="font-['Manrope',sans-serif] text-[11px] text-[#dc2626]">Минимум {MIN} символов</p>
                  : <span />
                }
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#b0a89e] ml-auto">{text.length}/{MAX}</p>
              </div>
            </div>

            <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mb-[16px] leading-[1.6]">
              Ответ придёт на вашу почту. Обычно мастер отвечает в течение 24 часов.
            </p>

            <div className="flex gap-[10px]">
              <button type="button" onClick={onClose}
                className="flex-1 h-[46px] rounded-full border border-[rgba(55,73,87,0.18)] font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957] hover:border-[#374957] transition-colors">
                Отмена
              </button>
              <button
                type="button"
                onClick={() => setSent(true)}
                disabled={!canSend}
                className="flex-1 h-[46px] rounded-full font-['Manrope',sans-serif] font-semibold text-[14px] text-white transition-all flex items-center justify-center gap-[8px]"
                style={{
                  background: canSend ? "#315350" : "#d0c8bf",
                  cursor: canSend ? "pointer" : "not-allowed",
                }}
              >
                <MessageCircle size={15} />
                Отправить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ShopPage() {
  const { masterId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [query, setQuery] = useState("");
  const [askModal, setAskModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: shop.name, url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  const shop = SHOPS.find((item) => item.id === masterId) ?? SHOPS[0];
  const category = ALL_CATEGORIES.find((item) => item.slug === shop.categorySlug) ?? ALL_CATEGORIES[0];

  const products = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return category.products
      .map((product, index) => ({
        ...product,
        image: category.productImages[index % category.productImages.length],
        categorySlug: category.slug,
      }))
      .filter((product) => productBadgeMatches(product.badge, activeTab))
      .filter((product) => {
        if (!normalizedQuery) return true;
        return [product.name, product.master, shop.category].join(" ").toLowerCase().includes(normalizedQuery);
      });
  }, [activeTab, category, query, shop.category]);

  return (<>
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[36px]">
        <PageBreadcrumb
          items={[
            { label: "Главная", path: "/" },
            { label: "Проверенные мастера", path: "/masters" },
            { label: shop.name },
          ]}
        />

        <section className="bg-white rounded-[28px] border border-[rgba(55,73,87,0.08)] overflow-hidden mb-[24px]">
          <div className="relative h-[220px] overflow-hidden bg-[#eee9df]">
            <img src={shop.cover} alt={shop.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute right-[24px] top-[22px] flex items-center gap-[8px] bg-white/90 backdrop-blur px-[12px] py-[7px] rounded-full">
              <MapPin size={14} className="text-[#315350]" />
              <span className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957]">{shop.city}</span>
            </div>
          </div>

          <div className="px-[28px] py-[28px]">
            <div className="flex items-center justify-between gap-[24px] mb-[24px]">
              <div className="flex items-center gap-[18px] min-w-0">
                <div className="size-[88px] rounded-full border border-[rgba(55,73,87,0.08)] overflow-hidden bg-[#f0eeed] shadow-sm shrink-0">
                  <img src={shop.avatar} alt={shop.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-[8px] mb-[5px]">
                    <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[34px] leading-tight text-black">
                      {shop.name}
                    </h1>
                    <BadgeCheck size={22} className="text-[#315350]" />
                  </div>
                  <p className="font-['Manrope',sans-serif] text-[15px] text-[#92887d]">{shop.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-[10px] shrink-0">
                <button
                  type="button"
                  onClick={() => setAskModal(true)}
                  className="h-[42px] px-[18px] rounded-full bg-[#315350] text-white font-['Manrope',sans-serif] font-semibold text-[14px] flex items-center gap-[8px] hover:bg-[#253f3d] transition-colors"
                >
                  <MessageCircle size={16} />
                  Задать вопрос мастеру
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="size-[42px] rounded-full border border-[rgba(55,73,87,0.16)] bg-white text-[#374957] flex items-center justify-center hover:border-[#315350] hover:text-[#315350] transition-colors"
                    aria-label="Поделиться магазином"
                  >
                    {copied ? <Check size={17} className="text-[#315350]" /> : <Share2 size={17} />}
                  </button>
                  {copied && (
                    <div className="absolute right-0 top-[50px] whitespace-nowrap bg-[#374957] text-white font-['Manrope',sans-serif] text-[12px] px-[10px] py-[6px] rounded-[10px] pointer-events-none">
                      Ссылка скопирована
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_360px] gap-[28px]">
              <div>
                <div className="flex flex-wrap gap-[6px] mb-[16px]">
                  {shop.badges.map((badge) => (
                    <span key={badge} className="h-[28px] px-[10px] rounded-full bg-[#f1f6f4] border border-[rgba(49,83,80,0.12)] font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350] flex items-center gap-[5px]">
                      <BadgeCheck size={12} />
                      {BADGE_LABELS[badge]}
                    </span>
                  ))}
                </div>

                <p className="font-['Manrope',sans-serif] text-[15px] leading-[1.7] text-[rgba(0,0,0,0.58)] max-w-[760px] mb-[14px]">
                  {shop.bio}
                </p>

                <div className="flex items-center gap-[6px] mb-[20px]">
                  <span className="size-[8px] rounded-full bg-[#22c55e] shrink-0" />
                  <span className="font-['Manrope',sans-serif] text-[13px] text-[#374957]">Активен сегодня</span>
                </div>

                <div className="grid grid-cols-5 gap-[10px]">
                  {(
                    [
                      { label: "товаров",  value: shop.products,          action: null },
                      { label: "продаж",   value: shop.sales,             action: null },
                      { label: "отзывов",  value: shop.reviews,           action: () => setActiveTab(REVIEWS_TAB) },
                      { label: "рейтинг",  value: shop.rating.toFixed(1), action: null },
                      { label: "на Crafty",value: `с ${shop.since}`,      action: null },
                    ] as { label: string; value: string | number; action: (() => void) | null }[]
                  ).map((stat) => (
                    stat.action ? (
                      <button
                        key={stat.label}
                        type="button"
                        onClick={stat.action}
                        className="rounded-[16px] bg-[#fbfbf8] border border-[rgba(55,73,87,0.08)] px-[14px] py-[13px] text-left hover:border-[#315350] hover:bg-[#f1f6f4] transition-colors group"
                      >
                        <p className="font-['Manrope',sans-serif] font-bold text-[18px] text-[#315350] leading-none group-hover:underline">{stat.value}</p>
                        <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[6px]">{stat.label}</p>
                      </button>
                    ) : (
                      <div key={stat.label} className="rounded-[16px] bg-[#fbfbf8] border border-[rgba(55,73,87,0.08)] px-[14px] py-[13px]">
                        <p className="font-['Manrope',sans-serif] font-bold text-[18px] text-[#315350] leading-none">{stat.value}</p>
                        <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[6px]">{stat.label}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>

              <aside className="rounded-[20px] bg-[#f7faf9] border border-[rgba(49,83,80,0.09)] p-[18px] h-fit">
                <div className="flex items-start gap-[10px] mb-[16px]">
                  <MessageCircle size={18} className="text-[#315350] shrink-0 mt-[2px]" />
                  <div>
                    <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">
                      Отвечает {shop.responseTime}
                    </p>
                    <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[2px]">
                      {shop.responseRate}% ответов на сообщения
                    </p>
                  </div>
                </div>
                <div className="space-y-[10px]">
                  <div className="flex items-center gap-[9px] font-['Manrope',sans-serif] text-[13px] text-[#374957]">
                    <PackageCheck size={15} className="text-[#315350]" />
                    Проверка качества перед отправкой
                  </div>
                  <div className="flex items-center gap-[9px] font-['Manrope',sans-serif] text-[13px] text-[#374957]">
                    <Clock size={15} className="text-[#315350]" />
                    Изготовление под заказ от 2 дней
                  </div>
                  <div className="flex items-center gap-[9px] font-['Manrope',sans-serif] text-[13px] text-[#374957]">
                    <ShoppingBag size={15} className="text-[#315350]" />
                    Доставка по Казахстану
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mb-[18px] flex items-center justify-between gap-[16px] flex-wrap">
          <SegmentedControl>
            {[...TABS, REVIEWS_TAB].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="h-[30px] px-[12px] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-colors whitespace-nowrap"
                style={activeTab === tab ? { background: "#315350", color: "#fff" } : { color: "#374957" }}
              >
                {tab === REVIEWS_TAB ? `Отзывы (${shop.reviews})` : tab}
              </button>
            ))}
          </SegmentedControl>

          {activeTab !== REVIEWS_TAB && (
            <div className="relative w-[360px] max-w-full">
              <Search size={15} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#92887d]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Найти товар в магазине..."
                className="w-full h-[40px] rounded-full border border-[rgba(55,73,87,0.16)] bg-white pl-[40px] pr-[16px] font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] placeholder:text-[#92887d] outline-none focus:border-[#315350] transition-colors"
              />
            </div>
          )}
        </section>

        {activeTab === REVIEWS_TAB ? (
          /* ── Reviews ── */
          <div>
            <div className="flex items-center gap-[14px] mb-[24px] bg-white rounded-[20px] border border-[rgba(55,73,87,0.08)] px-[24px] py-[18px]">
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[48px] text-[#315350] leading-none">{shop.rating.toFixed(1)}</p>
              <div>
                <div className="flex gap-[3px] mb-[4px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.round(shop.rating) ? "#FFC633" : "none"} stroke={i < Math.round(shop.rating) ? "#FFC633" : "#d8d0c8"} strokeWidth={1.5} />
                  ))}
                </div>
                <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">{shop.reviews} отзывов</p>
              </div>
            </div>

            <div className="flex flex-col gap-[12px]">
              {MOCK_REVIEWS.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-[20px] border border-[rgba(55,73,87,0.08)] px-[22px] py-[18px]"
                >
                  <div className="flex items-start justify-between gap-[12px] mb-[10px]">
                    <div className="flex items-center gap-[10px]">
                      <div className="size-[36px] rounded-full bg-[#eef3ef] flex items-center justify-center shrink-0">
                        <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#315350]">{r.author[0]}</span>
                      </div>
                      <div>
                        <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black">{r.author}</p>
                        <p className="font-['Manrope',sans-serif] text-[11px] text-[#b0a89e]">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-[2px] shrink-0 mt-[2px]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < r.rating ? "#FFC633" : "none"} stroke={i < r.rating ? "#FFC633" : "#d8d0c8"} strokeWidth={1.5} />
                      ))}
                    </div>
                  </div>
                  <p className="font-['Manrope',sans-serif] text-[14px] text-[rgba(0,0,0,0.7)] leading-[1.6] mb-[10px]">{r.text}</p>
                  <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">Товар: {r.product}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Products ── */
          <>
            <div className="flex items-center justify-between mb-[18px]" id="shop-products">
              <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">
                Показано <span className="font-semibold text-[#374957]">{products.length}</span>
                {products.length !== shop.products && (
                  <span> из <span className="font-semibold text-[#374957]">{shop.products}</span></span>
                )} товаров
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
              {products.map((product) => {
                const isFav = favorites.has(String(product.id));
                return (
                  <motion.article
                    key={`${product.categorySlug}-${product.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.22 }}
                    className="group relative bg-white rounded-[20px] border border-[rgba(55,73,87,0.08)] overflow-hidden hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] transition-shadow"
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${product.categorySlug}/${product.id}`)}
                      className="block w-full text-left"
                    >
                      <div className="relative aspect-square overflow-hidden bg-[#f0eeed]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                        {product.badge && (
                          <span className="absolute left-[12px] top-[12px] rounded-full bg-white/92 px-[9px] py-[5px] font-['Manrope',sans-serif] font-bold text-[11px] text-[#315350]">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-[14px]">
                        <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black leading-[1.35] line-clamp-2 min-h-[38px]">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-[5px] mt-[8px]">
                          <Star size={13} fill="#FFC633" stroke="#FFC633" />
                          <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957]">{product.rating.toFixed(1)}</span>
                          <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">· {product.reviews} отз.</span>
                        </div>
                        <div className="flex items-end justify-between gap-[10px] mt-[12px]">
                          <div>
                            <p className="font-['Manrope',sans-serif] font-bold text-[17px] text-[#315350]">{formatPrice(product.price)}</p>
                            {product.oldPrice && (
                              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] line-through">{formatPrice(product.oldPrice)}</p>
                            )}
                          </div>
                          <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350] whitespace-nowrap">
                            Открыть →
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Heart outside nav button — no event bubbling */}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(String(product.id)); }}
                      className="absolute right-[12px] top-[12px] size-[32px] rounded-full bg-white/92 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                      aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
                    >
                      <Heart size={15} fill={isFav ? "#e63946" : "none"} stroke={isFav ? "#e63946" : "#374957"} strokeWidth={1.5} />
                    </button>
                  </motion.article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>

    {askModal && (
      <AskShopModal masterName={shop.name} masterAvatar={shop.avatar} onClose={() => setAskModal(false)} />
    )}
  </>);
}
