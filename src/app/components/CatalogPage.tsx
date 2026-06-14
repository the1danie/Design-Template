import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import {
  ChevronDown, SlidersHorizontal, X, Flame, Star, Sparkles,
  BadgeCheck, Clock, RotateCcw, Heart, LayoutGrid, List,
} from "lucide-react";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgCat6 from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import { ALL_CATEGORIES, CATEGORY_MAP, type Product, type Badge } from "../catalogData";
import { PageBreadcrumb } from "./PageBreadcrumb";
import { SegmentedControl } from "./PageControls";
import { PageHeader } from "./PageHeader";

// ── Constants ─────────────────────────────────────────────────────────────────

// Diverse pool of images — no duplicates adjacent
const ALL_IMGS = [imgImage8, imgCat2, imgCat1, imgCat5, imgCat3, imgCat6, imgCat4, imgCat2];

const SORT_OPTIONS = ["Популярные", "Новинки", "Сначала дешевые", "Сначала дорогие", "По рейтингу"];

const DEFAULT_MATERIALS = ["Натуральный материал", "Дерево", "Ткань", "Керамика", "Войлок", "Металл"];
const MATERIALS_BY_CATEGORY: Record<string, string[]> = {
  ukrasheniya: ["Серебро", "Золото", "Лазурит", "Агат", "Натуральный камень", "Дерево"],
  kozha: ["Натуральная кожа", "Экокожа", "Замша", "Фетр", "Текстиль", "Комбинированный материал"],
  tekstil: ["Войлок", "Шёлк", "Хлопок", "Лён", "Шерсть", "Вышивка"],
  sveci: ["Соевый воск", "Пчелиный воск", "Эфирные масла", "Сухоцветы", "Дерево", "Стекло"],
};

const MASTER_CITIES: Record<string, string> = {
  "Айгерим К.": "Алматы",
  "Зарина Н.": "Астана",
  "Мадина А.": "Тараз",
  "Балнур Д.": "Астана",
  "Данияр С.": "Шымкент",
  "Алия М.": "Алматы",
  "Гульнара Р.": "Караганда",
  "Асем Б.": "Павлодар",
  "Сейткали Д.": "Алматы",
  "Нурлан Б.": "Шымкент",
  "Аружан Т.": "Астана",
  "Меруерт К.": "Тараз",
  "Ермек С.": "Караганда",
  "Лаура Ж.": "Алматы",
};

function productCountText(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return `${count} товаров`;
  if (last === 1) return `${count} товар`;
  if (last >= 2 && last <= 4) return `${count} товара`;
  return `${count} товаров`;
}

// ── Badge pill ────────────────────────────────────────────────────────────────

type BadgeConfig = { bg: string; text: string; label: string; Icon: React.ElementType };

const BADGE_STYLES: Record<NonNullable<Badge>, BadgeConfig> = {
  "Новинка":    { bg: "rgba(49,83,80,0.82)",   text: "#fff",    label: "Новинка",    Icon: Sparkles },
  "Хит":        { bg: "rgba(214,83,10,0.88)",  text: "#fff",    label: "Хит",        Icon: Flame },
  "Топ мастер": { bg: "rgba(255,198,51,0.95)", text: "#2d1f00", label: "Топ мастер", Icon: Star },
};

function BadgePill({ type }: { type: NonNullable<Badge> }) {
  const { bg, text, label, Icon } = BADGE_STYLES[type];
  return (
    <div className="absolute left-[11px] top-[11px] backdrop-blur-[5px] px-[9px] py-[4px] rounded-[10px] flex items-center gap-[4px]"
      style={{ background: bg }}>
      <Icon size={10} color={text} strokeWidth={2.5} />
      <span className="font-['Manrope',sans-serif] font-semibold text-[11px] leading-normal" style={{ color: text }}>
        {label}
      </span>
    </div>
  );
}

// ── Stars (prominent) ─────────────────────────────────────────────────────────

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-[5px]">
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5);
          return (
            <Star key={i} size={13}
              fill={filled ? "#FFC633" : "none"}
              stroke={filled ? "#FFC633" : "#d8d0c8"}
              strokeWidth={1.5} />
          );
        })}
      </div>
      <span className="font-['Manrope',sans-serif] font-bold text-[13px] text-black">{rating.toFixed(1)}</span>
      <span className="font-['Manrope',sans-serif] font-normal text-[12px] text-[#92887d]">({reviews} отз.)</span>
    </div>
  );
}

// ── Availability badge ────────────────────────────────────────────────────────

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

function ProductCard({ product, favorited, onFav, img, catSlug }: {
  product: Product; favorited: boolean; onFav: () => void; img: string; catSlug: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  // Deterministic: odd ids are "under order", rest are in stock
  const inStock = product.id % 5 !== 0;
  const requireAuth = (action: "cart" | "favorite") => {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    navigate(`/login?redirect=${encodeURIComponent(redirect)}&action=${action}`);
  };

  return (
    <div className="flex flex-col w-full group cursor-pointer"
      onClick={() => navigate(`/product/${catSlug}/${product.id}`)}>

      {/* Photo */}
      <div className="bg-[#f0eeed] overflow-hidden relative rounded-[18px] w-full aspect-square shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200">
        <img src={img} alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
        {product.badge && <BadgePill type={product.badge} />}
        <button onClick={(e) => { e.stopPropagation(); requireAuth("favorite"); }}
          className="absolute right-[10px] top-[10px] bg-white size-[34px] flex items-center justify-center rounded-full shadow-sm hover:scale-110 transition-transform">
          <Heart size={15} fill={favorited ? "#ef4444" : "none"} stroke={favorited ? "#ef4444" : "#374957"} strokeWidth={1.6} />
        </button>
      </div>

      {/* Info */}
      <div className="pt-[10px] flex flex-col gap-[5px] px-[2px]">

        {/* Master — clickable */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate("/masters"); }}
          className="flex items-center gap-[4px] w-fit h-[16px] group/master"
        >
          <BadgeCheck size={12} className="text-[#315350] shrink-0" />
          <span className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#315350] group-hover/master:underline leading-none">
            {product.master} · {MASTER_CITIES[product.master] ?? "Алматы"}
          </span>
        </button>

        {/* Name */}
        <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black leading-[1.35] line-clamp-2 min-h-[38px]">
          {product.name}
        </p>

        {/* Rating — prominent */}
        <div className="h-[18px] flex items-center">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>

        {/* Availability */}
        <div className="h-[16px] flex items-center">
          <Availability inStock={inStock} />
        </div>

        {/* Prices */}
        <div className="flex items-center gap-[7px] flex-wrap min-h-[30px]">
          <span className="font-['Manrope',sans-serif] font-bold text-[18px] text-black leading-none">
            {product.price.toLocaleString("ru-RU")} ₸
          </span>
          {product.oldPrice && (
            <>
              <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[rgba(0,0,0,0.32)] line-through leading-none">
                {product.oldPrice.toLocaleString("ru-RU")} ₸
              </span>
              <div className="bg-[rgba(229,62,62,0.1)] px-[7px] py-[2px] rounded-full">
                <span className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#e53e3e]">
                  -{discount}%
                </span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); requireAuth("cart"); }}
          className="mt-[4px] w-full h-[42px] bg-[#315350] rounded-full flex items-center justify-center hover:bg-[#3c6460] active:scale-[0.98] transition-all">
          <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-white">В корзину</span>
        </button>
      </div>
    </div>
  );
}

// ── Custom checkbox ───────────────────────────────────────────────────────────

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange}
      className="w-[15px] h-[15px] rounded-[4px] border flex items-center justify-center shrink-0 cursor-pointer transition-all"
      style={{ background: checked ? "#315350" : "#fff", borderColor: checked ? "#315350" : "rgba(55,73,87,0.22)" }}>
      {checked && (
        <svg className="size-[9px]" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function FilterSidebar({
  checkedSubs, toggleSub, priceRange, setPriceRange,
  minRating, setMinRating, checkedMats, toggleMat,
  subCats, hasActiveFilters, onClearAll,
  materials, currentCategory,
}: {
  checkedSubs: string[];
  toggleSub: (id: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  checkedMats: string[];
  toggleMat: (m: string) => void;
  subCats: { id: string; label: string }[];
  hasActiveFilters: boolean;
  onClearAll: () => void;
  materials: string[];
  currentCategory?: string;
}) {
  const navigate = useNavigate();
  const showCategoryFilters = Boolean(currentCategory);

  return (
    <aside className="w-[205px] shrink-0 flex flex-col gap-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-[#374957]">Фильтры</h3>
        {hasActiveFilters && (
          <button onClick={onClearAll}
            className="flex items-center gap-[4px] font-['Manrope',sans-serif] font-medium text-[12px] text-[#e53e3e] hover:text-[#c53030] transition-colors">
            <RotateCcw size={11} />
            Очистить
          </button>
        )}
      </div>

      {/* "Clear all" prominent button when filters active */}
      {hasActiveFilters && (
        <button onClick={onClearAll}
          className="w-full h-[38px] flex items-center justify-center gap-[6px] border border-[rgba(229,62,62,0.3)] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] text-[#e53e3e] hover:bg-[rgba(229,62,62,0.05)] transition-colors">
          <RotateCcw size={13} />
          Очистить все фильтры
        </button>
      )}

      {/* Main categories */}
      <div>
        <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Категории</p>
        <div className="flex flex-col gap-[4px]">
          <button
            onClick={() => {
              onClearAll();
              navigate("/catalog");
            }}
            className="w-full flex items-center justify-between px-[11px] py-[8px] rounded-[12px] text-left transition-colors"
            style={{
              background: !currentCategory ? "#315350" : "transparent",
              color: !currentCategory ? "#fff" : "#374957",
            }}
          >
            <span className="font-['Manrope',sans-serif] font-medium text-[13px] leading-normal">Все товары</span>
            <span className="font-['Manrope',sans-serif] text-[11px] opacity-60">
              {ALL_CATEGORIES.reduce((sum, item) => sum + item.total, 0)}
            </span>
          </button>
          {ALL_CATEGORIES.map((category) => {
            const active = category.slug === currentCategory;
            return (
              <button
                key={category.slug}
                onClick={() => {
                  onClearAll();
                  navigate(`/catalog/${category.slug}`);
                }}
                className="w-full flex items-center justify-between px-[11px] py-[8px] rounded-[12px] text-left transition-colors"
                style={{
                  background: active ? "#315350" : "transparent",
                  color: active ? "#fff" : "#374957",
                }}
              >
                <span className="font-['Manrope',sans-serif] font-medium text-[13px] leading-normal">{category.title}</span>
                <span className="font-['Manrope',sans-serif] text-[11px] opacity-60">{category.total}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-categories */}
      {showCategoryFilters && subCats.length > 0 && (
        <div>
          <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Подкатегории</p>
          <div className="flex flex-col gap-[8px]">
            {subCats.map((c) => (
              <label key={c.id} className="flex items-center gap-[9px] cursor-pointer group">
                <Checkbox checked={checkedSubs.includes(c.id)} onChange={() => toggleSub(c.id)} />
                <span className="font-['Manrope',sans-serif] font-medium text-[13px] leading-normal group-hover:text-[#315350] transition-colors"
                  style={{ color: checkedSubs.includes(c.id) ? "#315350" : "#374957" }}>
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Цена</p>
        <div className="flex gap-[8px] mb-[10px]">
          {(["от", "до"] as const).map((ph, i) => (
            <input key={ph} type="number" value={priceRange[i]}
              onChange={(e) => setPriceRange(i === 0 ? [+e.target.value, priceRange[1]] : [priceRange[0], +e.target.value])}
              className="w-full bg-[#f5f3ed] rounded-[10px] px-[10px] py-[7px] font-['Manrope',sans-serif] text-[12px] text-[#374957] outline-none focus:ring-1 focus:ring-[#315350]"
              placeholder={ph} />
          ))}
        </div>
        <input type="range" min={0} max={100000} value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full accent-[#315350]" />
        <div className="flex justify-between mt-[3px]">
          <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">0 ₸</span>
          <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">100 000 ₸</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Наличие</p>
        <div className="flex flex-col gap-[8px]">
          {[
            { id: "instock",   label: "В наличии",  dot: "#22a355" },
            { id: "preorder",  label: "Под заказ",  dot: "#92887d" },
          ].map((a) => (
            <label key={a.id} className="flex items-center gap-[9px] cursor-pointer group">
              <Checkbox checked={checkedSubs.includes(a.id)} onChange={() => toggleSub(a.id)} />
              <div className="flex items-center gap-[5px]">
                <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: a.dot }} />
                <span className="font-['Manrope',sans-serif] font-medium text-[13px] group-hover:text-[#315350] transition-colors"
                  style={{ color: checkedSubs.includes(a.id) ? "#315350" : "#374957" }}>
                  {a.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Рейтинг</p>
        <div className="flex flex-col gap-[8px]">
          {[5, 4, 3].map((r) => (
            <label key={r} className="flex items-center gap-[9px] cursor-pointer" onClick={() => setMinRating(minRating === r ? 0 : r)}>
              <div className="w-[15px] h-[15px] rounded-full border flex items-center justify-center shrink-0 transition-all"
                style={{ borderColor: minRating === r ? "#315350" : "rgba(55,73,87,0.22)" }}>
                {minRating === r && <div className="w-[7px] h-[7px] rounded-full bg-[#315350]" />}
              </div>
              <div className="flex items-center gap-[4px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12}
                    fill={i < r ? "#FFC633" : "none"}
                    stroke={i < r ? "#FFC633" : "#d8d0c8"} strokeWidth={1.5} />
                ))}
                <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] ml-1">и выше</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Master city */}
      <div>
        <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Город мастера</p>
        <div className="flex flex-col gap-[8px]">
          {["Алматы", "Астана", "Шымкент", "Караганда", "Тараз"].map((city) => (
            <label key={city} className="flex items-center gap-[9px] cursor-pointer group">
              <Checkbox checked={checkedSubs.includes(city)} onChange={() => toggleSub(city)} />
              <span className="font-['Manrope',sans-serif] font-medium text-[13px] group-hover:text-[#315350] transition-colors"
                style={{ color: checkedSubs.includes(city) ? "#315350" : "#374957" }}>
                {city}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery */}
      <div>
        <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Тип доставки</p>
        <div className="flex flex-col gap-[8px]">
          {["Доставка по Казахстану", "Самовывоз", "Экспресс-доставка"].map((delivery) => (
            <label key={delivery} className="flex items-center gap-[9px] cursor-pointer group">
              <Checkbox checked={checkedSubs.includes(delivery)} onChange={() => toggleSub(delivery)} />
              <span className="font-['Manrope',sans-serif] font-medium text-[13px] group-hover:text-[#315350] transition-colors"
                style={{ color: checkedSubs.includes(delivery) ? "#315350" : "#374957" }}>
                {delivery}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      {showCategoryFilters && materials.length > 0 && (
        <div>
          <p className="font-['Manrope',sans-serif] font-semibold text-[11px] text-[#92887d] uppercase tracking-[0.06em] mb-[10px]">Материал</p>
          <div className="flex flex-col gap-[8px]">
            {materials.map((m) => (
              <label key={m} className="flex items-center gap-[9px] cursor-pointer group">
                <Checkbox checked={checkedMats.includes(m)} onChange={() => toggleMat(m)} />
                <span className="font-['Manrope',sans-serif] font-medium text-[13px] group-hover:text-[#315350] transition-colors"
                  style={{ color: checkedMats.includes(m) ? "#315350" : "#374957" }}>
                  {m}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button className="w-full h-[46px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[13px] hover:bg-[#3c6460] transition-colors">
        Применить
      </button>
    </aside>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function CatalogPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const config = category && CATEGORY_MAP[category] ? CATEGORY_MAP[category] : undefined;
  const isCategoryPage = Boolean(config);
  const currentCategory = config?.slug;
  const pageTitle = config?.title ?? "Каталог товаров";
  const pageDescription = isCategoryPage
    ? `Авторские товары в категории «${pageTitle}»: ручная работа, проверенные мастера и локальное производство.`
    : "Все категории Crafty в одном месте: украшения, текстиль, декор, свечи, игрушки и другие handmade-изделия.";
  const allCatalogProducts = ALL_CATEGORIES.flatMap((item) =>
    item.products.map((product) => ({ product, catSlug: item.slug }))
  );

  const [checkedSubs, setCheckedSubs] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [checkedMats, setCheckedMats] = useState<string[]>([]);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [activePage, setActivePage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  function toggleFav(id: number) {
    setFavorites((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }
  function toggleSub(id: string) {
    setCheckedSubs((p) => (p.includes(id) ? p.filter((c) => c !== id) : [...p, id]));
  }
  function toggleMat(m: string) {
    setCheckedMats((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }
  function clearAll() {
    setCheckedSubs([]);
    setCheckedMats([]);
    setMinRating(0);
    setPriceRange([0, 100000]);
  }

  const hasActiveFilters = checkedSubs.length > 0 || checkedMats.length > 0 || minRating > 0 || priceRange[1] < 100000;

  // Sort products
  const sorted = (isCategoryPage
    ? config!.products.map((product) => ({ product, catSlug: config!.slug }))
    : allCatalogProducts
  ).sort((a, b) => {
    if (sort === SORT_OPTIONS[0]) return b.product.reviews - a.product.reviews;
    if (sort === SORT_OPTIONS[1]) return b.product.id - a.product.id;
    if (sort === SORT_OPTIONS[2]) return a.product.price - b.product.price;
    if (sort === SORT_OPTIONS[3]) return b.product.price - a.product.price;
    return b.product.rating - a.product.rating;
  });

  // Filtered count (for display)
  const totalCount = isCategoryPage
    ? config!.total
    : ALL_CATEGORIES.reduce((sum, item) => sum + item.total, 0);
  const filteredCount = hasActiveFilters
    ? Math.max(1, Math.floor(sorted.length * 0.7))
    : totalCount;

  const materials = currentCategory ? MATERIALS_BY_CATEGORY[currentCategory] ?? DEFAULT_MATERIALS : [];

  const headerActions = (
    <>
      <button className="lg:hidden h-[36px] px-[14px] flex items-center gap-[7px] font-['Manrope',sans-serif] font-medium text-[13px] border border-[rgba(55,73,87,0.16)] rounded-full bg-white text-[#374957]"
        onClick={() => setMobileFiltersOpen(true)}>
        <SlidersHorizontal size={13} /> Фильтры
      </button>
      <SegmentedControl className="hidden lg:flex">
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
      </SegmentedControl>
      <div className="relative">
        <button onClick={() => setSortOpen(!sortOpen)}
          className="h-[36px] px-[14px] flex items-center gap-[8px] font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] border border-[rgba(55,73,87,0.16)] bg-white rounded-full hover:border-[#315350] transition-colors">
          {sort}
          <ChevronDown size={13} className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
        </button>
        {sortOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-[rgba(55,73,87,0.1)] rounded-[14px] shadow-xl z-20 w-56 py-1 overflow-hidden">
            {SORT_OPTIONS.map((o) => (
              <button key={o} onClick={() => { setSort(o); setSortOpen(false); }}
                className="w-full text-left px-4 py-[10px] font-['Manrope',sans-serif] font-medium text-[13px] hover:bg-[#f5f3ed] transition-colors"
                style={{ color: sort === o ? "#315350" : "#374957" }}>
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const sidebar = (
    <FilterSidebar
      checkedSubs={checkedSubs} toggleSub={toggleSub}
      priceRange={priceRange} setPriceRange={setPriceRange}
      minRating={minRating} setMinRating={setMinRating}
      checkedMats={checkedMats} toggleMat={toggleMat}
      subCats={config?.subCats ?? []}
      hasActiveFilters={hasActiveFilters}
      onClearAll={clearAll}
      materials={materials}
      currentCategory={currentCategory}
    />
  );

  return (
    <div className="flex-1 bg-[#fbfbf8]">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[36px]">

        <PageBreadcrumb
          items={[
            { label: "Главная", path: "/" },
            { label: "Каталог", path: "/catalog" },
            ...(isCategoryPage ? [{ label: pageTitle }] : []),
          ]}
        />

        <PageHeader
          title={pageTitle}
          description={pageDescription}
          stats={[{ value: productCountText(filteredCount), label: "найдено" }]}
          actions={headerActions}
        >
          {hasActiveFilters && (
            <button onClick={clearAll}
              className="flex items-center gap-[4px] font-['Manrope',sans-serif] font-medium text-[12px] text-[#e53e3e] hover:underline">
              <X size={11} /> Очистить все фильтры
            </button>
          )}
        </PageHeader>

        <div className="flex gap-[52px]">
          <div className="hidden lg:block">{sidebar}</div>

          <div className="flex-1 min-w-0">
            {/* Product grid — diverse images via index */}
            <div className={viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-[18px] gap-y-[32px]"
              : "grid grid-cols-1 sm:grid-cols-2 gap-x-[18px] gap-y-[32px]"}>
              {sorted.map(({ product, catSlug }, i) => (
                <ProductCard
                  key={`${catSlug}-${product.id}`}
                  product={product}
                  favorited={favorites.has(product.id)}
                  onFav={() => toggleFav(product.id)}
                  img={ALL_IMGS[i % ALL_IMGS.length]}
                  catSlug={catSlug}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-[6px] mt-12">
              {[1, 2, 3, 4, 5].map((p) => (
                <button key={p} onClick={() => setActivePage(p)}
                  className="w-9 h-9 rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-all"
                  style={activePage === p
                    ? { background: "#315350", color: "#fff" }
                    : { color: "#374957", border: "1px solid rgba(55,73,87,0.18)", background: "#fff" }}>
                  {p}
                </button>
              ))}
              <span className="text-[#92887d] px-1 font-['Manrope',sans-serif] text-[13px]">...</span>
              <button onClick={() => setActivePage(26)}
                className="w-9 h-9 rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-all"
                style={activePage === 26
                  ? { background: "#315350", color: "#fff" }
                  : { color: "#374957", border: "1px solid rgba(55,73,87,0.18)", background: "#fff" }}>
                26
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto w-72 bg-[#fbfbf8] h-full overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-['Manrope',sans-serif] font-bold text-[17px] text-[#374957]">Фильтры</h3>
              <button onClick={() => setMobileFiltersOpen(false)}><X size={18} className="text-[#92887d]" /></button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
