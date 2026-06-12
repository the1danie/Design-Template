import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BadgeCheck, Star, Sparkles, Trophy, Flag,
  ShoppingBag, Users, ChevronDown,
  MapPin,
} from "lucide-react";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgCat6 from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";

// ── Badge system ──────────────────────────────────────────────────────────────

type MBadge = "verified" | "top" | "choice" | "new" | "kazakh";

const BADGE_CFG: Record<MBadge, {
  label: string; desc: string;
  Icon: React.ElementType; bg: string; text: string; border: string;
}> = {
  verified: { label: "Проверен Crafty",     desc: "Прошёл верификацию личности",          Icon: BadgeCheck, bg: "#EBF5EB", text: "#1E6B1E", border: "rgba(30,107,30,0.2)" },
  top:      { label: "Топ-мастер",          desc: "Высокий рейтинг и много заказов",       Icon: Star,       bg: "#FFF8E8", text: "#92600A", border: "rgba(255,198,51,0.4)" },
  choice:   { label: "Выбор покупателей",   desc: "Много заказов за последние 30 дней",    Icon: Trophy,     bg: "#FFF3EC", text: "#B84A00", border: "rgba(214,83,10,0.25)" },
  new:      { label: "Новый мастер",        desc: "Зарегистрирован недавно, < 10 продаж",  Icon: Sparkles,   bg: "#EEF6F5", text: "#315350", border: "rgba(49,83,80,0.2)" },
  kazakh:   { label: "Казахстанский бренд", desc: "Локальное производство в Казахстане",   Icon: Flag,       bg: "#EEF2FE", text: "#2040A0", border: "rgba(32,64,160,0.2)" },
};

function BadgePill({ type, tooltip = false }: { type: MBadge; tooltip?: boolean }) {
  const { label, desc, Icon, bg, text, border } = BADGE_CFG[type];
  const [tip, setTip] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex items-center gap-[4px] px-[7px] py-[3px] rounded-full border cursor-default"
        style={{ background: bg, borderColor: border }}
        onMouseEnter={() => tooltip && setTip(true)}
        onMouseLeave={() => tooltip && setTip(false)}
      >
        <Icon size={10} style={{ color: text }} strokeWidth={2} />
        <span className="font-['Manrope',sans-serif] font-semibold text-[10px]" style={{ color: text }}>{label}</span>
      </div>
      {tooltip && tip && (
        <div className="absolute bottom-full left-0 mb-[6px] w-[180px] bg-[#1c1c1a] text-white rounded-[10px] px-[10px] py-[8px] z-30 shadow-xl pointer-events-none">
          <p className="font-['Manrope',sans-serif] font-semibold text-[11px] mb-[2px]">{label}</p>
          <p className="font-['Manrope',sans-serif] text-[10px] opacity-70 leading-[1.4]">{desc}</p>
        </div>
      )}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

interface Master {
  id: string; name: string; cat: string; city: string;
  rating: number; reviews: number; products: number; followers: number; since: string;
  cover: string; avatar: string;
  bio: string; previews: string[];
  badges: MBadge[];
}

const MASTERS: Master[] = [
  {
    id: "silver-breeze",
    name: "Silver Breeze",          cat: "Украшения",          city: "Алматы",
    rating: 5.0, reviews: 412, products: 64, followers: 3800, since: "2019",
    cover: "https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?w=700&h=200&fit=crop&auto=format",
    avatar: imgImage8,
    bio: "Серебряные украшения с лазуритом, агатом и традиционными казахскими мотивами. Каждое изделие создаётся вручную.",
    previews: [imgImage8, imgCat2, imgCat3],
    badges: ["verified", "top", "choice", "kazakh"],
  },
  {
    id: "candle-studio",
    name: "Candle Studio",          cat: "Свечи и ароматика",  city: "Алматы",
    rating: 4.9, reviews: 341, products: 27, followers: 2100, since: "2020",
    cover: "https://images.unsplash.com/photo-1624479163091-3c000402218d?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat4,
    bio: "Соевые и восковые свечи с натуральными ароматами степных трав и цветов Казахстана.",
    previews: [imgCat4, imgCat5, imgCat6],
    badges: ["verified", "top", "choice"],
  },
  {
    id: "clay-home",
    name: "Clay & Home",            cat: "Гончарство",         city: "Алматы",
    rating: 4.9, reviews: 214, products: 38, followers: 1240, since: "2022",
    cover: "https://images.unsplash.com/photo-1676125105332-608345abe20e?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat2,
    bio: "Авторская керамика и гончарные изделия, вдохновлённые казахской культурой и природой.",
    previews: [imgCat2, imgCat5, imgImage8],
    badges: ["verified", "top", "kazakh"],
  },
  {
    id: "aizatman",
    name: "Aizatman Felt Studio",   cat: "Войлок и текстиль",  city: "Астана",
    rating: 4.8, reviews: 178, products: 52, followers: 980, since: "2021",
    cover: "https://images.unsplash.com/photo-1623578059518-bbdb071eab81?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat1,
    bio: "Войлочные изделия ручной работы: сырмаки, корпе, сумки с казахским орнаментом.",
    previews: [imgCat1, imgCat3, imgCat6],
    badges: ["verified", "choice", "kazakh"],
  },
  {
    id: "nurcraft",
    name: "NurCraft",               cat: "Казахское handmade", city: "Алматы",
    rating: 4.9, reviews: 289, products: 56, followers: 2340, since: "2020",
    cover: "https://images.unsplash.com/photo-1762628727567-250080e7e9a3?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat3,
    bio: "Традиционные казахские сувениры, войлочные изделия и национальная одежда на заказ.",
    previews: [imgCat3, imgCat1, imgImage8],
    badges: ["verified", "choice", "kazakh"],
  },
  {
    id: "leather-agentin",
    name: "Leather by Agentin",     cat: "Кожаные изделия",    city: "Алматы",
    rating: 4.8, reviews: 157, products: 43, followers: 1560, since: "2021",
    cover: "https://images.unsplash.com/photo-1609619742069-f5e18afeef17?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat6,
    bio: "Натуральная кожа: сумки, ремни, кошельки с казахским тиснением и орнаментами.",
    previews: [imgCat6, imgCat2, imgCat4],
    badges: ["verified", "top"],
  },
  {
    id: "craftylan",
    name: "CraftyLan",              cat: "Декор и живопись",   city: "Шымкент",
    rating: 4.7, reviews: 96,  products: 31, followers: 670, since: "2023",
    cover: "https://images.unsplash.com/photo-1598495494482-172d89ff078c?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat5,
    bio: "Акварели, постеры и авторский декор — казахстанские пейзажи в современном стиле.",
    previews: [imgCat5, imgCat6, imgCat1],
    badges: ["verified", "new", "kazakh"],
  },
  {
    id: "felt-tales",
    name: "Felt & Tales",           cat: "Игрушки",            city: "Астана",
    rating: 4.8, reviews: 203, products: 48, followers: 1890, since: "2024",
    cover: "https://images.unsplash.com/photo-1676125105159-517d135a6cc3?w=700&h=200&fit=crop&auto=format",
    avatar: imgCat5,
    bio: "Войлочные игрушки и развивающие наборы для детей, вдохновлённые казахскими сказками.",
    previews: [imgCat5, imgCat3, imgCat6],
    badges: ["verified", "new"],
  },
];

const CITIES = ["Все города", "Алматы", "Астана", "Шымкент", "Караганда", "Тараз"];
const SPECIALIZATIONS = ["Все специализации", ...Array.from(new Set(MASTERS.map((m) => m.cat)))];
const SORT_TABS = [
  { key: "all",     label: "Все мастера" },
  { key: "top",     label: "Топ-мастера" },
  { key: "choice",  label: "Выбор покупателей" },
  { key: "new",     label: "Новые" },
  { key: "popular", label: "По популярности" },
];

// ── Master card ───────────────────────────────────────────────────────────────

function MasterCard({ master, onShopClick }: {
  master: Master;
  onShopClick: () => void;
}) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-[rgba(55,73,87,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col">

      {/* Cover */}
      <div className="relative h-[128px] overflow-hidden bg-[#f0eeed] shrink-0">
        <img src={master.cover} alt={master.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

        {/* City */}
        <div className="absolute top-[10px] right-[10px] flex items-center gap-[4px] bg-white/85 backdrop-blur-sm px-[9px] py-[4px] rounded-full">
          <MapPin size={11} className="text-[#315350]" />
          <span className="font-['Manrope',sans-serif] font-medium text-[11px] text-[#374957]">{master.city}</span>
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-[22px] left-[18px] w-[50px] h-[50px] rounded-full border-[3px] border-white overflow-hidden shadow-md bg-[#f0eeed]">
          <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Body */}
      <div className="pt-[32px] px-[18px] pb-[18px] flex flex-col flex-1">

        {/* Name */}
        <div className="flex items-start justify-between gap-2 mb-[6px]">
          <div>
            <div className="flex items-center gap-[5px]">
              <p style={{ fontFamily: "'Playfair Display', serif" }}
                className="font-bold text-[16px] text-black leading-tight">{master.name}</p>
              <BadgeCheck size={14} className="text-[#315350] shrink-0" />
            </div>
            <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[1px]">{master.cat}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-[5px] mb-[8px]">
          <div className="flex gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13}
                fill={i < Math.floor(master.rating) || (i === Math.floor(master.rating) && master.rating % 1 >= 0.5) ? "#FFC633" : "none"}
                stroke={i < Math.floor(master.rating) || (i === Math.floor(master.rating) && master.rating % 1 >= 0.5) ? "#FFC633" : "#d8d0c8"}
                strokeWidth={1.5} />
            ))}
          </div>
          <span className="font-['Manrope',sans-serif] font-bold text-[13px] text-black">{master.rating.toFixed(1)}</span>
          <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">· {master.reviews} отз.</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-[5px] mb-[10px]">
          {master.badges.map((b) => <BadgePill key={b} type={b} tooltip />)}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-[16px] mb-[10px] pb-[10px] border-b border-[rgba(55,73,87,0.07)]">
          <div className="flex items-center gap-[4px]">
            <ShoppingBag size={12} className="text-[#92887d]" />
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-black">{master.products}</span>
            <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">товаров</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <Users size={12} className="text-[#92887d]" />
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-black">{master.followers.toLocaleString("ru-RU")}</span>
            <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">подписч.</span>
          </div>
          <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] ml-auto">с {master.since}</span>
        </div>

        {/* Bio */}
        <p className="font-['Manrope',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[1.5] mb-[10px] line-clamp-2 flex-1">
          {master.bio}
        </p>

        {/* Previews + link */}
        <div className="flex items-center gap-[5px] justify-between mt-auto">
          <div className="flex gap-[5px]">
            {master.previews.map((img, i) => (
              <div key={i} className="w-[42px] h-[42px] rounded-[9px] overflow-hidden bg-[#f0eeed]">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <button onClick={onShopClick}
            className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350] hover:underline whitespace-nowrap">
            В магазин →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Badge legend ──────────────────────────────────────────────────────────────

function BadgeLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-[24px]">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-[6px] font-['Manrope',sans-serif] font-semibold text-[13px] text-[#315350] hover:underline"
      >
        Что означают значки?
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-[10px] bg-white rounded-[20px] border border-[rgba(55,73,87,0.08)] px-[18px] py-[14px]">
          <div className="flex flex-wrap gap-[8px]">
            {(Object.keys(BADGE_CFG) as MBadge[]).map((k) => (
              <BadgePill key={k} type={k} tooltip />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function MastersPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("all");
  const [city, setCity] = useState("Все города");
  const [specialization, setSpecialization] = useState("Все специализации");
  const [cityOpen, setCityOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = MASTERS
    .filter((m) => city === "Все города" || m.city === city)
    .filter((m) => specialization === "Все специализации" || m.cat === specialization)
    .filter((m) => {
      if (sort === "top")    return m.badges.includes("top");
      if (sort === "choice") return m.badges.includes("choice");
      if (sort === "new")    return m.badges.includes("new");
      return true;
    })
    .sort((a, b) => sort === "popular" ? b.followers - a.followers : 0);

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[36px]">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-[6px] mb-[28px]">
          <button onClick={() => navigate("/")}
            className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#92887d] hover:text-[#315350] transition-colors">
            Главная
          </button>
          <span className="text-[#c5bdb5]">/</span>
          <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957]">Проверенные мастера</span>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-[40px] items-center mb-[36px]">
          <div>
            <div className="flex items-center gap-[10px] mb-[10px]">
              <h1 style={{ fontFamily: "'Playfair Display', serif" }}
                className="font-bold text-[38px] text-black leading-none">
                Проверенные мастера
              </h1>
              <BadgeCheck size={26} className="text-[#315350]" />
            </div>
            <p className="font-['Manrope',sans-serif] text-[14px] text-[rgba(0,0,0,0.55)] leading-[1.65] max-w-[540px] mb-[24px]">
              Каждый мастер проходит верификацию личности и качества товаров администрацией Crafty.kz.
              Мы гарантируем подлинность изделий и добросовестность каждого продавца.
            </p>
            <div className="flex items-center gap-[18px]">
              {[
                { Icon: BadgeCheck,  value: "50+",     label: "Проверенных мастеров" },
                { Icon: ShoppingBag, value: "500+",    label: "Товаров в каталоге" },
                { Icon: Star,        value: "4.9",     label: "Средний рейтинг" },
                { Icon: Users,       value: "10 000+", label: "Покупателей" },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="flex items-start gap-[7px]">
                  <div className="w-[28px] h-[28px] bg-[#f0f5f4] rounded-full flex items-center justify-center shrink-0 mt-[1px]">
                    <Icon size={14} className="text-[#315350]" />
                  </div>
                  <div>
                    <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-black leading-none">{value}</p>
                    <p className="font-['Manrope',sans-serif] text-[10px] text-[#92887d] mt-[2px]">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative h-[170px] rounded-[24px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1676125105332-608345abe20e?w=600&h=260&fit=crop&auto=format"
              alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-[12px] right-[12px] bg-white/90 backdrop-blur-sm rounded-[12px] px-[12px] py-[8px] flex items-center gap-[6px]">
              <BadgeCheck size={14} className="text-[#315350]" />
              <span className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#374957]">Все верифицированы</span>
            </div>
          </div>
        </div>

        {/* Badge legend */}
        <BadgeLegend />

        {/* Filters */}
        <div className="flex items-center justify-between mb-[16px] gap-4 flex-wrap">
          <div className="flex items-center gap-[4px] bg-white border border-[rgba(55,73,87,0.1)] rounded-full p-[4px]">
            {SORT_TABS.map((t) => (
              <button key={t.key} onClick={() => setSort(t.key)}
                className="h-[32px] px-[14px] rounded-full font-['Manrope',sans-serif] font-medium text-[12px] transition-all whitespace-nowrap"
                style={sort === t.key
                  ? { background: "#315350", color: "#fff" }
                  : { color: "#374957" }}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[8px] overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {SPECIALIZATIONS.map((item) => (
              <button
                key={item}
                onClick={() => setSpecialization(item)}
                className="h-[34px] px-[13px] rounded-full border font-['Manrope',sans-serif] font-medium text-[12px] whitespace-nowrap transition-colors"
                style={specialization === item
                  ? { background: "#315350", borderColor: "#315350", color: "#fff" }
                  : { background: "#fff", borderColor: "rgba(55,73,87,0.16)", color: "#374957" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-[20px] gap-4 flex-wrap">
          <div className="relative">
            <button onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-[6px] h-[40px] px-[16px] border border-[rgba(55,73,87,0.15)] bg-white rounded-full font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] hover:border-[#315350] transition-colors">
              <MapPin size={13} className="text-[#315350]" />
              {city}
              <ChevronDown size={12} className={`transition-transform ${cityOpen ? "rotate-180" : ""}`} />
            </button>
            {cityOpen && (
              <div className="absolute right-0 top-full mt-[6px] bg-white border border-[rgba(55,73,87,0.1)] rounded-[14px] shadow-xl z-20 w-[160px] py-[4px]">
                {CITIES.map((c) => (
                  <button key={c} onClick={() => { setCity(c); setCityOpen(false); }}
                    className="w-full text-left px-[14px] py-[9px] font-['Manrope',sans-serif] font-medium text-[13px] hover:bg-[#f5f3ed] transition-colors"
                    style={{ color: city === c ? "#315350" : "#374957" }}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Count */}
        <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mb-[20px]">
          Найдено: <span className="font-semibold text-[#374957]">{filtered.length}</span> мастеров
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-[12px] py-[80px]">
            <BadgeCheck size={40} className="text-[#d8d0c8]" />
            <p className="font-['Manrope',sans-serif] font-medium text-[15px] text-[#374957]">Мастера не найдены</p>
            <button onClick={() => { setSort("all"); setCity("Все города"); setSpecialization("Все специализации"); }}
              className="font-['Manrope',sans-serif] text-[13px] text-[#315350] hover:underline">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[18px]">
            {filtered.map((m) => (
              <MasterCard
                key={m.id}
                master={m}
                onShopClick={() => navigate(`/catalog/ukrasheniya`)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-center gap-[6px] mt-[48px]">
            {[1, 2, 3].map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className="w-9 h-9 rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-all"
                style={page === p
                  ? { background: "#315350", color: "#fff" }
                  : { color: "#374957", border: "1px solid rgba(55,73,87,0.18)", background: "#fff" }}>
                {p}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
