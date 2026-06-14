import { useMemo, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  Box,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Smartphone,
  MoreHorizontal,
  PackageCheck,
  Repeat2,
  Search,
  Settings,
  Star,
  Trash2,
  Truck,
  Upload,
  User,
  WalletCards,
  X,
} from "lucide-react";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import { PageBreadcrumb } from "./PageBreadcrumb";

type SectionKey =
  | "profile"
  | "orders"
  | "favorites"
  | "reviews"
  | "addresses"
  | "settings"
  | "support";

const SECTIONS: {
  key: SectionKey;
  label: string;
  Icon: React.ElementType;
  badge?: string;
  group?: "main" | "settings";
}[] = [
  { key: "profile",   label: "Мой профиль",        Icon: User },
  { key: "orders",    label: "Мои заказы",          Icon: PackageCheck },
  { key: "favorites", label: "Избранное",           Icon: Heart, badge: "12" },
  { key: "reviews",   label: "Мои отзывы",          Icon: MessageCircle },
  { key: "addresses", label: "Адреса доставки",     Icon: MapPin },
  { key: "settings",  label: "Настройки профиля",   Icon: Settings, group: "settings" },
  { key: "support",   label: "Помощь и поддержка",  Icon: HelpCircle, group: "settings" },
];

const SECTION_TITLES: Record<SectionKey, string> = {
  profile:   "Мой профиль",
  orders:    "Мои заказы",
  favorites: "Избранное",
  reviews:   "Мои отзывы",
  addresses: "Адреса доставки",
  settings:  "Настройки профиля",
  support:   "Помощь и поддержка",
};

type PendingReview = { id: string; orderId: string; title: string; master: string; daysAgo: number; img: string; path: string };

const PENDING_REVIEWS: PendingReview[] = [
  { id: "pr1", orderId: "№10245", title: "Ароматическая свеча «Зеленый чай»", master: "Candle Studio", daysAgo: 3, img: imgCat4, path: "/product/sveci/2" },
  { id: "pr2", orderId: "№10198", title: "Серьги с зеленым агатом", master: "Silver Breeze", daysAgo: 7, img: imgImage8, path: "/product/ukrasheniya/1" },
];

const REVIEWS = [
  { img: imgCat4, order: "Заказ №10245 от 12 мая 2024", title: "Ароматическая свеча «Зеленый чай»", master: "Candle Studio", rating: 5.0, text: "Очень приятный аромат, свеча горит ровно и долго. Упаковка красивая, все пришло в целости.", date: "14 мая 2024", path: "/product/sveci/2" },
  { img: imgCat5, order: "Заказ №10234 от 8 мая 2024", title: "Вязаный плед", master: "WarmHouse", rating: 4.8, text: "Плед мягкий и уютный, цвет как на фото. Доставка была немного дольше, чем ожидала.", date: "10 мая 2024", path: "/product/tekstil/10" },
  { img: imgImage8, order: "Заказ №10198 от 5 мая 2024", title: "Серьги с зеленым агатом", master: "Atameken Felt Studio", rating: 5.0, text: "Серьги просто восторг. Легкие, красивые, качественная работа мастера.", date: "7 мая 2024", path: "/product/ukrasheniya/1" },
  { img: imgCat2, order: "Заказ №10123 от 1 мая 2024", title: "Керамическая ваза «Этника»", master: "Clay & Home", rating: 4.5, text: "Красивая ваза, отлично вписалась в интерьер. Хотелось бы чуть больше по размеру.", date: "3 мая 2024", path: "/shop/clay-home" },
];

type Order = {
  id: string; title: string; master: string;
  status: "Оплачен" | "Передан мастеру" | "Отправлен" | "Доставлен" | "Отменён";
  price: string; date: string; img: string; path: string;
  trackNum?: string; carrier?: string;
};

const STAGES = ["Оплачен", "Передан мастеру", "Отправлен", "Доставлен"] as const;

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  "Оплачен":          { bg: "#fff7e6", text: "#b45309" },
  "Передан мастеру":  { bg: "#e6f0ff", text: "#1d5abf" },
  "Отправлен":        { bg: "#e0f2fe", text: "#0369a1" },
  "Доставлен":        { bg: "#eaf4ed", text: "#1f6b45" },
  "Отменён":          { bg: "#fef2f2", text: "#dc2626" },
};

const ORDERS: Order[] = [
  { id: "№10245", title: "Ароматическая свеча «Зеленый чай»", master: "Candle Studio", status: "Доставлен", price: "3 400 ₸", date: "12 мая 2024", img: imgCat4, path: "/product/sveci/2" },
  { id: "№10234", title: "Вязаный плед", master: "WarmHouse", status: "Отправлен", price: "18 900 ₸", date: "8 мая 2024", img: imgCat5, path: "/product/tekstil/10", trackNum: "KZ123456789", carrier: "Казпочта" },
  { id: "№10198", title: "Серьги с зеленым агатом", master: "Silver Breeze", status: "Передан мастеру", price: "14 800 ₸", date: "5 мая 2024", img: imgImage8, path: "/product/ukrasheniya/1" },
  { id: "№10156", title: "Керамическая ваза «Этника»", master: "Clay & Home", status: "Оплачен", price: "16 800 ₸", date: "2 мая 2024", img: imgCat2, path: "/product/handmade/3" },
  { id: "№10102", title: "Панно из войлока «Казахстан»", master: "NurCraft", status: "Отменён", price: "32 000 ₸", date: "15 апр. 2024", img: imgCat3, path: "/product/handmade/4" },
];

const FAVORITES = [
  { img: imgImage8, title: "Серьги-тумар с лазуритом", master: "Silver Breeze", price: "14 800 ₸", path: "/product/ukrasheniya/1" },
  { img: imgCat4, title: "Свеча «Ваниль и сандал»", master: "Candle Studio", price: "3 400 ₸", path: "/product/sveci/2" },
  { img: imgCat2, title: "Керамический чайник «Шыны»", master: "Clay & Home", price: "16 800 ₸", path: "/product/handmade/3" },
  { img: imgCat3, title: "Панно из войлока «Казахстан»", master: "NurCraft", price: "32 000 ₸", path: "/product/handmade/4" },
];

const quickActions = [
  { title: "Повторить последний заказ", desc: "Заказ №10234 от 12 мая 2024", Icon: Repeat2, path: "/profile/orders" },
  { title: "Отследить активный заказ", desc: "Заказ №10198", Icon: Box, badge: "Отправлен", path: "/profile/orders" },
  { title: "Оставить отзыв", desc: "2 заказа без отзыва", Icon: Star, path: "/profile/reviews" },
  { title: "Адреса доставки", desc: "2 сохранённых адреса", Icon: MapPin, path: "/profile/addresses" },
  { title: "Связаться с поддержкой", desc: "Мы онлайн", Icon: MessageCircle, path: "/profile/support" },
];

const helpItems = [
  { label: "Как отследить заказ?", path: "/profile/orders" },
  { label: "Как отменить заказ?", path: "/profile/support" },
  { label: "Как вернуть товар?", path: "/profile/support" },
  { label: "Как оставить отзыв?", path: "/profile/reviews" },
  { label: "Способы доставки", path: "/profile/addresses" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          fill={index + 1 <= Math.round(rating) ? "#FF9900" : "none"}
          stroke={index + 1 <= Math.round(rating) ? "#FF9900" : "#d8d0c8"}
        />
      ))}
      <span className="ml-[6px] font-['Manrope',sans-serif] text-[12px] text-[#374957]">{rating.toFixed(1)}</span>
    </div>
  );
}

function Sidebar({ active }: { active: SectionKey }) {
  const navigate = useNavigate();
  const main = SECTIONS.filter((item) => item.group !== "settings");
  const settings = SECTIONS.filter((item) => item.group === "settings");

  const renderItem = (item: typeof SECTIONS[number]) => {
    const Icon = item.Icon;
    const isActive = item.key === active;

    return (
      <button
        key={item.key}
        type="button"
        onClick={() => navigate(`/profile/${item.key}`)}
        className="w-full h-[42px] rounded-[12px] px-[12px] flex items-center gap-[11px] font-['Manrope',sans-serif] font-semibold text-[13px] transition-colors"
        style={{ background: isActive ? "#eef3ef" : "transparent", color: isActive ? "#315350" : "#1c1c1a" }}
      >
        <Icon size={17} strokeWidth={1.8} />
        <span className="flex-1 text-left truncate">{item.label}</span>
        {item.badge && (
          <span className="min-w-[22px] h-[22px] rounded-full bg-[#eef3ef] text-[#315350] text-[11px] flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[18px] p-[14px] h-fit">
      <div className="space-y-[4px]">{main.map(renderItem)}</div>
      <div className="h-px bg-[rgba(55,73,87,0.08)] my-[14px]" />
      <div className="space-y-[4px]">{settings.map(renderItem)}</div>
      <div className="h-px bg-[rgba(55,73,87,0.08)] my-[14px]" />
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full h-[42px] rounded-[12px] px-[12px] flex items-center gap-[11px] font-['Manrope',sans-serif] font-semibold text-[13px] text-[#ef4444] hover:bg-red-50 transition-colors"
      >
        <LogOut size={17} />
        Выйти из аккаунта
      </button>
    </aside>
  );
}

function RightRail({ active }: { active: SectionKey }) {
  const navigate = useNavigate();

  // Pages where the right rail adds no value
  const hideRail = active === "support" || active === "settings";
  if (hideRail) return null;

  // Context-aware quick actions per section
  const CONTEXTUAL: Record<SectionKey, typeof quickActions> = {
    profile:   [
      { title: "Мои заказы",       desc: "5 заказов всего",          Icon: PackageCheck, path: "/profile/orders" },
      { title: "Избранное",        desc: "12 сохранённых товаров",   Icon: Heart,        path: "/profile/favorites" },
      { title: "Мои отзывы",       desc: "2 ждут отзыва",            Icon: Star,         path: "/profile/reviews" },
    ],
    orders:    [
      { title: "Оставить отзыв",   desc: "2 доставленных заказа",    Icon: Star,         path: "/profile/reviews" },
      { title: "Повторить заказ",  desc: "Заказ №10234",             Icon: Repeat2,      path: "/profile/orders" },
      { title: "Помощь с заказом", desc: "Отмена, возврат",          Icon: HelpCircle,   path: "/profile/support" },
    ],
    favorites: [
      { title: "Перейти в каталог", desc: "Найти новые товары",      Icon: Search,       path: "/catalog" },
      { title: "Мои заказы",        desc: "Посмотреть историю",      Icon: PackageCheck, path: "/profile/orders" },
    ],
    reviews:   [
      { title: "Мои заказы",       desc: "Посмотреть все заказы",    Icon: PackageCheck, path: "/profile/orders" },
      { title: "Написать мастеру", desc: "Задать вопрос",            Icon: MessageCircle,path: "/profile/support" },
    ],
    addresses: [
      { title: "Мои заказы",       desc: "Текущие доставки",         Icon: Truck,        path: "/profile/orders" },
      { title: "Помощь",           desc: "Смена адреса в заказе",    Icon: HelpCircle,   path: "/profile/support" },
    ],
    settings:  [],
    support:   [],
  };

  const actions = CONTEXTUAL[active];

  return (
    <aside className="space-y-[16px]">
      {/* Quick actions */}
      {actions.length > 0 && (
        <div className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[18px] overflow-hidden">
          <div className="px-[18px] pt-[18px] pb-[4px]">
            <h3 className="font-['Manrope',sans-serif] font-bold text-[14px] text-black">Быстрые действия</h3>
          </div>
          <div className="divide-y divide-[rgba(55,73,87,0.06)]">
            {actions.map(({ title, desc, Icon, badge, path }) => (
              <button
                key={title}
                type="button"
                onClick={() => navigate(path)}
                className="w-full px-[18px] py-[13px] flex items-center gap-[12px] text-left hover:bg-[#fafaf8] transition-colors group"
              >
                <div className="size-[36px] rounded-[10px] bg-[#f0f5f4] flex items-center justify-center text-[#315350] shrink-0 group-hover:bg-[#eef3ef] transition-colors">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black truncate">{title}</p>
                  <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px] truncate">{desc}</p>
                </div>
                {badge && (
                  <span className="rounded-full px-[8px] py-[2px] text-[10px] font-['Manrope',sans-serif] font-bold shrink-0"
                    style={{ background: "#e8f5e9", color: "#1f6b45" }}>
                    {badge}
                  </span>
                )}
                <ChevronRight size={14} className="text-[#d0c8bf] group-hover:text-[#315350] transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Help block */}
      <div className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[18px] p-[18px]">
        <div className="flex items-center gap-[10px] mb-[16px]">
          <div className="w-[32px] h-[32px] rounded-[10px] bg-[#eef3ef] flex items-center justify-center">
            <HelpCircle size={15} className="text-[#315350]" />
          </div>
          <h3 className="font-['Manrope',sans-serif] font-bold text-[14px] text-black">Нужна помощь?</h3>
        </div>

        <div className="space-y-[4px] mb-[16px]">
          {helpItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-[8px] px-[10px] py-[9px] rounded-[10px] text-left hover:bg-[#f5f3ed] transition-colors group"
            >
              <ChevronRight size={13} className="text-[#d0c8bf] group-hover:text-[#315350] transition-colors shrink-0" />
              <span className="font-['Manrope',sans-serif] text-[13px] text-[#374957] group-hover:text-[#315350] transition-colors">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[rgba(55,73,87,0.07)] pt-[14px] space-y-[10px]">
          <a href="tel:+77270000000" className="flex items-center gap-[10px] px-[10px] py-[8px] rounded-[10px] hover:bg-[#f5f3ed] transition-colors group">
            <Phone size={14} className="text-[#315350] shrink-0" />
            <div>
              <p className="font-['Manrope',sans-serif] font-semibold text-[12px] text-black">+7 727 000 00 00</p>
              <p className="font-['Manrope',sans-serif] text-[10px] text-[#92887d]">Пн–Пт, 9:00–18:00</p>
            </div>
          </a>
          <button
            type="button"
            onClick={() => navigate("/profile/support")}
            className="w-full h-[40px] rounded-[10px] bg-[#315350] font-['Manrope',sans-serif] font-bold text-[13px] text-white flex items-center justify-center gap-[8px] hover:bg-[#3c6460] transition-colors"
          >
            <MessageCircle size={14} />
            Написать в поддержку
          </button>
        </div>
      </div>
    </aside>
  );
}

function ReviewsSection() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Ждут отзыва");
  const [reviewModalItem, setReviewModalItem] = useState<PendingReview | null>(null);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [hoverMap, setHoverMap] = useState<Record<string, number>>({});

  const pending = PENDING_REVIEWS.filter((item) => !reviewedIds.includes(item.id));

  const reviewModalOrder: Order | null = reviewModalItem
    ? { id: reviewModalItem.orderId, title: reviewModalItem.title, master: reviewModalItem.master, status: "Доставлен", price: "", date: "", img: reviewModalItem.img, path: reviewModalItem.path }
    : null;

  function pluralDays(n: number) {
    if (n === 1) return "день";
    if (n < 5) return "дня";
    return "дней";
  }

  return (
    <>
      {reviewModalOrder && (
        <ReviewModal
          order={reviewModalOrder}
          onClose={() => setReviewModalItem(null)}
          onSubmitted={() => { if (reviewModalItem) setReviewedIds((prev) => [...prev, reviewModalItem.id]); }}
        />
      )}

      <Tabs
        tabs={[["Ждут отзыва", String(pending.length)], ["Мои отзывы", "8"], ["Черновики", "1"]]}
        active={tab}
        onChange={setTab}
      />

      {/* ── Ждут отзыва ── */}
      {tab === "Ждут отзыва" && (
        <div className="space-y-[10px]">
          {pending.length === 0 ? (
            <div className="flex flex-col items-center py-[56px] text-center">
              <div className="w-[64px] h-[64px] bg-[#f5f3ed] rounded-full flex items-center justify-center mb-[14px]">
                <Star size={26} className="text-[#c8c0b8]" />
              </div>
              <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-black mb-[6px]">Всё оценено</p>
              <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">Вы оставили отзывы по всем доставленным заказам</p>
            </div>
          ) : (
            pending.map((item) => {
              const hover = hoverMap[item.id] ?? 0;
              return (
                <div key={item.id} className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[14px] p-[16px] flex items-start gap-[16px]">
                  <button type="button" onClick={() => navigate(item.path)} className="size-[88px] rounded-[10px] overflow-hidden bg-[#f0eeed] shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <button type="button" onClick={() => navigate(item.path)}
                      className="font-['Manrope',sans-serif] font-bold text-[15px] text-black text-left hover:text-[#315350] transition-colors line-clamp-1 w-full">
                      {item.title}
                    </button>
                    <p className="font-['Manrope',sans-serif] text-[13px] text-[#6f6a64] mt-[2px]">{item.master}</p>
                    <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">
                      Доставлен {item.daysAgo} {pluralDays(item.daysAgo)} назад
                    </p>

                    {/* Interactive stars */}
                    <div
                      className="flex gap-[4px] mt-[10px] mb-[12px]"
                      onMouseLeave={() => setHoverMap((m) => ({ ...m, [item.id]: 0 }))}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseEnter={() => setHoverMap((m) => ({ ...m, [item.id]: s }))}
                          onClick={() => setReviewModalItem(item)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={22}
                            fill={s <= hover ? "#FFC633" : "none"}
                            stroke={s <= hover ? "#FFC633" : "#d8d0c8"}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                      {hover > 0 && (
                        <span className="ml-[6px] font-['Manrope',sans-serif] text-[12px] text-[#374957] self-center">
                          {["", "Ужасно", "Плохо", "Нормально", "Хорошо", "Отлично"][hover]}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setReviewModalItem(item)}
                      className="h-[34px] px-[16px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[12px] hover:bg-[#3c6460] transition-colors"
                    >
                      Оставить отзыв
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── Мои отзывы ── */}
      {tab === "Мои отзывы" && (
        <div className="space-y-[8px]">
          {REVIEWS.map((review) => (
            <article key={review.title} className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[14px] p-[14px] flex gap-[18px]">
              <button type="button" onClick={() => navigate(review.path)} className="size-[100px] rounded-[10px] overflow-hidden bg-[#f0eeed] shrink-0">
                <img src={review.img} alt={review.title} className="w-full h-full object-cover" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">{review.order}</p>
                <button type="button" onClick={() => navigate(review.path)}
                  className="font-['Manrope',sans-serif] font-bold text-[15px] text-black mt-[4px] hover:text-[#315350] text-left line-clamp-1 w-full">
                  {review.title}
                </button>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#6f6a64] mt-[2px]">{review.master}</p>
                <div className="mt-[8px]"><Stars rating={review.rating} /></div>
                <p className="font-['Manrope',sans-serif] text-[13px] text-[#5f5a54] mt-[8px] line-clamp-2 leading-[1.6]">{review.text}</p>
              </div>
              <div className="w-[110px] shrink-0 text-right flex flex-col items-end">
                <span className="inline-flex h-[24px] items-center px-[9px] rounded-full bg-[#eaf4ed] text-[#1f6b45] font-['Manrope',sans-serif] font-semibold text-[11px]">
                  Опубликован
                </span>
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#6f6a64] mt-[8px]">{review.date}</p>
                <button
                  type="button"
                  onClick={() => navigate(review.path)}
                  className="mt-auto size-[32px] rounded-[8px] border border-[rgba(55,73,87,0.12)] inline-flex items-center justify-center hover:border-[#315350] hover:text-[#315350] transition-colors"
                  aria-label="Открыть отзыв"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── Черновики ── */}
      {tab === "Черновики" && (
        <div className="flex flex-col items-center py-[56px] text-center">
          <div className="w-[64px] h-[64px] bg-[#f5f3ed] rounded-full flex items-center justify-center mb-[14px]">
            <MoreHorizontal size={26} className="text-[#c8c0b8]" />
          </div>
          <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-black mb-[6px]">Черновики</p>
          <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">Незаконченные отзывы появятся здесь</p>
        </div>
      )}
    </>
  );
}

function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: [string, string][];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-[14px] mb-[14px] border-b border-[rgba(55,73,87,0.08)]">
      {tabs.map(([label, count]) => {
        const selected = label === active;
        return (
        <button
          key={label}
          type="button"
          onClick={() => onChange(label)}
          className="h-[42px] px-[10px] flex items-center gap-[8px] font-['Manrope',sans-serif] font-semibold text-[13px] border-b-2"
          style={{ borderColor: selected ? "#315350" : "transparent", color: selected ? "#315350" : "#1c1c1a" }}
        >
          {label}
          <span className="min-w-[24px] h-[22px] rounded-full bg-[#eef3ef] flex items-center justify-center text-[11px]">{count}</span>
        </button>
        );
      })}
    </div>
  );
}

const DELIVERY_CODE = "1234";

function DeliveryOtpModal({ orderId, onConfirm, onClose }: { orderId: string; onConfirm: () => void; onClose: () => void }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [canResend, setCanResend] = useState(false);

  const r0 = useRef<HTMLInputElement>(null);
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const refs = [r0, r1, r2, r3];

  useEffect(() => { r0.current?.focus(); }, []);

  useEffect(() => {
    if (secondsLeft <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  function checkCode(code: string[]) {
    const entered = code.join("");
    if (entered === DELIVERY_CODE) {
      setChecking(true);
      setTimeout(() => onConfirm(), 500);
    } else {
      setError(true);
      setTimeout(() => {
        setDigits(["", "", "", ""]);
        setError(false);
        r0.current?.focus();
      }, 700);
    }
  }

  function handleInput(i: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    setError(false);
    if (digit) {
      if (i < 3) refs[i + 1].current?.focus();
      else checkCode(next);
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
      refs[i - 1].current?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4).split("");
    const next = ["", "", "", ""].map((_, i) => pasted[i] ?? "");
    setDigits(next);
    if (pasted.length === 4) checkCode(next);
    else refs[Math.min(pasted.length, 3)].current?.focus();
  }

  function handleResend() {
    if (!canResend) return;
    setCanResend(false);
    setSecondsLeft(59);
    setDigits(["", "", "", ""]);
    setError(false);
    r0.current?.focus();
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-[16px]"
      style={{ background: "rgba(0,0,0,0.52)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[28px] w-full max-w-[360px] p-[36px] shadow-[0_28px_64px_rgba(0,0,0,0.24)] flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-[66px] h-[66px] bg-[#ebf5eb] rounded-full flex items-center justify-center mb-[20px]">
          <Smartphone size={30} className="text-[#315350]" />
        </div>

        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black mb-[8px]">
          Код получения
        </p>
        <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7] mb-[6px]">
          Курьер назовёт или покажет код.<br />Введите его, чтобы подтвердить получение заказа.
        </p>
        <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mb-[28px]">
          Заказ <span className="font-semibold text-[#374957]">{orderId}</span>
        </p>

        {/* 4 digit boxes */}
        <div className="flex gap-[10px] mb-[12px]" onPaste={handlePaste}>
          {digits.map((d, i) => {
            const filled = d !== "";
            const borderColor = checking ? "#22c55e" : error ? "#dc2626" : filled ? "#315350" : "rgba(55,73,87,0.2)";
            const bg = checking ? "#f0fdf4" : error ? "#fef2f2" : filled ? "#eef7ee" : "#f8f7f4";
            return (
              <input
                key={i}
                ref={refs[i]}
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={d}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[64px] h-[72px] text-center rounded-[16px] border-2 font-['Manrope',sans-serif] font-bold text-[30px] outline-none transition-all duration-150"
                style={{ borderColor, background: bg, color: error ? "#dc2626" : checking ? "#22c55e" : "#374957" }}
              />
            );
          })}
        </div>

        {error && (
          <p className="font-['Manrope',sans-serif] text-[12px] text-[#dc2626] mb-[4px]">
            Неверный код. Попробуйте ещё раз.
          </p>
        )}

        <div className="h-[28px] flex items-center justify-center mb-[20px]">
          {canResend ? (
            <button type="button" onClick={handleResend}
              className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#315350] hover:underline">
              Запросить код повторно
            </button>
          ) : (
            <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">
              Повторно через{" "}
              <span className="font-semibold text-[#374957]">{secondsLeft} сек</span>
            </p>
          )}
        </div>

        <div className="bg-[#f8f7f4] rounded-[10px] px-[14px] py-[8px] mb-[20px]">
          <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">
            Демо-код: <span className="font-bold text-[#374957] tracking-widest">1234</span>
          </p>
        </div>

        <button type="button" onClick={onClose}
          className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] hover:text-[#374957] transition-colors">
          Отмена
        </button>
      </div>
    </div>
  );
}

const RATING_LABELS = ["", "Ужасно", "Плохо", "Нормально", "Хорошо", "Отлично"];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex gap-[8px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              size={36}
              fill={star <= (hover || value) ? "#FFC633" : "none"}
              stroke={star <= (hover || value) ? "#FFC633" : "#d8d0c8"}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957] h-[18px]">
        {RATING_LABELS[hover || value] ?? ""}
      </p>
    </div>
  );
}

function ReviewModal({ order, onClose, onSubmitted }: { order: Order; onClose: () => void; onSubmitted: () => void }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [recommend, setRecommend] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const canSubmit = rating > 0 && text.trim().length >= 20;

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).slice(0, 5 - photos.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setPhotos((prev) => [...prev.slice(0, 4), e.target?.result as string]);
      reader.readAsDataURL(file);
    });
  }

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmitted();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-[16px]"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={submitted ? onClose : undefined}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] pt-[22px] pb-[18px] border-b border-[rgba(55,73,87,0.08)] sticky top-0 bg-white z-10">
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[20px] text-black">
            {submitted ? "Спасибо за отзыв!" : "Оставить отзыв"}
          </p>
          <button type="button" onClick={onClose} className="w-[32px] h-[32px] rounded-full hover:bg-[#f5f3ed] flex items-center justify-center transition-colors">
            <X size={16} className="text-[#374957]" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-center px-[24px] py-[44px]">
            <div className="w-[72px] h-[72px] bg-[#ebf5eb] rounded-full flex items-center justify-center mb-[18px]">
              <CheckCircle2 size={38} className="text-[#315350]" />
            </div>
            <p className="font-['Manrope',sans-serif] font-bold text-[18px] text-black mb-[8px]">Отзыв опубликован</p>
            <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7] mb-[28px] max-w-[320px]">
              Ваш отзыв поможет другим покупателям сделать правильный выбор. Спасибо!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="h-[46px] px-[32px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[14px] hover:bg-[#3c6460] transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div className="px-[24px] py-[20px] flex flex-col gap-[20px]">
            {/* Product mini-card */}
            <div className="flex items-center gap-[12px] bg-[#f8f7f4] rounded-[14px] p-[12px]">
              <img src={order.img} alt={order.title} className="size-[52px] rounded-[10px] object-cover shrink-0" />
              <div className="min-w-0">
                <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black line-clamp-1">{order.title}</p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">{order.master}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex flex-col items-center">
              <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957] mb-[10px]">Ваша оценка</p>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* Text */}
            <div>
              <label className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957] block mb-[8px]">Ваш отзыв</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Расскажите о качестве товара, упаковке, доставке…"
                rows={4}
                className="w-full rounded-[14px] border border-[rgba(55,73,87,0.16)] px-[14px] py-[12px] font-['Manrope',sans-serif] text-[13px] text-[#374957] placeholder:text-[#b0a89e] outline-none focus:border-[#315350] resize-none transition-colors"
              />
              <div className="flex items-center justify-between mt-[5px]">
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">Минимум 20 символов</p>
                <p className="font-['Manrope',sans-serif] text-[11px]" style={{ color: text.length >= 20 ? "#315350" : "#92887d" }}>
                  {text.length} / 500
                </p>
              </div>
            </div>

            {/* Photos */}
            <div>
              <label className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957] block mb-[8px]">
                Фото покупки <span className="font-normal text-[#92887d]">(до 5)</span>
              </label>
              <div className="flex items-center gap-[8px] flex-wrap">
                {photos.map((src, i) => (
                  <div key={i} className="relative size-[72px] rounded-[10px] overflow-hidden bg-[#f5f3ed] shrink-0">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-[3px] right-[3px] w-[18px] h-[18px] rounded-full bg-black/60 flex items-center justify-center"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                    className="size-[72px] rounded-[10px] border-2 border-dashed flex flex-col items-center justify-center gap-[4px] transition-colors shrink-0"
                    style={{ borderColor: dragging ? "#315350" : "rgba(55,73,87,0.2)", background: dragging ? "#eef7ee" : "#fafaf8" }}
                  >
                    <Upload size={16} className="text-[#92887d]" />
                    <span className="font-['Manrope',sans-serif] text-[10px] text-[#92887d]">Добавить</span>
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </div>

            {/* Recommend checkbox */}
            <button
              type="button"
              onClick={() => setRecommend(!recommend)}
              className="flex items-center gap-[10px] text-left"
            >
              <div
                className="w-[20px] h-[20px] rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-colors"
                style={{ borderColor: recommend ? "#315350" : "rgba(55,73,87,0.3)", background: recommend ? "#315350" : "#fff" }}
              >
                {recommend && (
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="font-['Manrope',sans-serif] text-[13px] text-[#374957]">Рекомендую этого мастера</span>
            </button>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full h-[50px] rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] transition-all"
              style={{
                background: canSubmit ? "#315350" : "#e8e5e0",
                color: canSubmit ? "white" : "#92887d",
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              Отправить отзыв
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CancelModal({ order, onClose, onConfirm }: { order: Order; onClose: () => void; onConfirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-[16px]"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-[400px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] p-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center mb-[22px]">
          <div className="w-[62px] h-[62px] bg-[#fef2f2] rounded-full flex items-center justify-center mb-[16px]">
            <X size={28} className="text-[#dc2626]" />
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black mb-[8px]">Отменить заказ?</p>
          <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7]">
            Это действие нельзя отменить. Средства вернутся на счёт в течение 3–5 рабочих дней.
          </p>
        </div>

        <div className="flex items-center gap-[12px] bg-[#f8f7f4] rounded-[14px] p-[12px] mb-[22px]">
          <img src={order.img} alt={order.title} className="size-[48px] rounded-[10px] object-cover shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black line-clamp-1">{order.title}</p>
            <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">Заказ {order.id}</p>
          </div>
          <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#315350] shrink-0">{order.price}</p>
        </div>

        <div className="flex gap-[10px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[46px] rounded-full border border-[rgba(55,73,87,0.18)] font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957] hover:border-[#315350] transition-colors"
          >
            Нет, оставить
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[46px] rounded-full bg-[#dc2626] text-white font-['Manrope',sans-serif] font-semibold text-[14px] hover:bg-[#b91c1c] transition-colors"
          >
            Да, отменить
          </button>
        </div>
      </div>
    </div>
  );
}

function DeliveryTracker({ status, trackNum, carrier }: { status: string; trackNum?: string; carrier?: string }) {
  const currentIdx = STAGES.indexOf(status as typeof STAGES[number]);
  return (
    <div className="mt-[14px] bg-[#f8f7f4] rounded-[14px] p-[16px]">
      {trackNum && (
        <div className="flex items-center gap-[8px] mb-[14px] pb-[14px] border-b border-[rgba(55,73,87,0.08)]">
          <Truck size={13} className="text-[#315350]" />
          <span className="font-['Manrope',sans-serif] text-[12px] text-[#374957]">
            {carrier ?? "Трек"}: <span className="font-semibold">{trackNum}</span>
          </span>
        </div>
      )}
      {STAGES.map((stage, i) => {
        const done = currentIdx >= i;
        const isCurrent = currentIdx === i;
        return (
          <div key={stage} className="flex items-start gap-[12px]">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center"
                style={{ borderColor: done ? "#315350" : "rgba(55,73,87,0.2)", background: done ? "#315350" : "#fff" }}
              >
                {done && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {i < STAGES.length - 1 && (
                <div className="w-px h-[18px] mt-[2px]" style={{ background: done ? "rgba(49,83,80,0.3)" : "rgba(55,73,87,0.12)" }} />
              )}
            </div>
            <p
              className="pt-[1px] pb-[14px] font-['Manrope',sans-serif] text-[13px]"
              style={{ color: done ? "#315350" : "#b0a89e", fontWeight: isCurrent ? 700 : 500 }}
            >
              {stage}
              {isCurrent && <span className="ml-[6px] font-normal text-[11px] text-[#92887d]">· сейчас</span>}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function OrdersSection() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Все заказы");
  const [openTracker, setOpenTracker] = useState<string | null>(null);
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);
  const [reviewModalId, setReviewModalId] = useState<string | null>(null);
  const [deliveryOtpId, setDeliveryOtpId] = useState<string | null>(null);
  const [cancelledIds, setCancelledIds] = useState<string[]>([]);
  const [deliveredIds, setDeliveredIds] = useState<string[]>([]);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  const effectiveStatus = (order: Order): Order["status"] => {
    if (cancelledIds.includes(order.id)) return "Отменён";
    if (deliveredIds.includes(order.id)) return "Доставлен";
    return order.status;
  };

  const visibleOrders = ORDERS.filter((order) => {
    const s = effectiveStatus(order);
    if (tab === "Активные")    return !["Доставлен", "Отменён"].includes(s);
    if (tab === "Завершённые") return s === "Доставлен";
    if (tab === "Отменённые")  return s === "Отменён";
    return true;
  });

  const cancelOrder = cancelModalId ? ORDERS.find((o) => o.id === cancelModalId) : null;
  const reviewOrder = reviewModalId ? ORDERS.find((o) => o.id === reviewModalId) : null;
  const deliveryOtpOrder = deliveryOtpId ? ORDERS.find((o) => o.id === deliveryOtpId) : null;
  const cancelledCount = ORDERS.filter((o) => effectiveStatus(o) === "Отменён").length;

  return (
    <>
      <Tabs
        tabs={[
          ["Все заказы", String(ORDERS.length)],
          ["Активные", String(ORDERS.filter((o) => !["Доставлен", "Отменён"].includes(effectiveStatus(o))).length)],
          ["Завершённые", String(ORDERS.filter((o) => effectiveStatus(o) === "Доставлен").length)],
          ["Отменённые", String(cancelledCount)],
        ]}
        active={tab}
        onChange={(t) => { setTab(t); setOpenTracker(null); }}
      />

      {cancelOrder && (
        <CancelModal
          order={cancelOrder}
          onClose={() => setCancelModalId(null)}
          onConfirm={() => { setCancelledIds((prev) => [...prev, cancelOrder.id]); setCancelModalId(null); }}
        />
      )}
      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewModalId(null)}
          onSubmitted={() => setReviewedIds((prev) => [...prev, reviewOrder.id])}
        />
      )}
      {deliveryOtpOrder && (
        <DeliveryOtpModal
          orderId={deliveryOtpOrder.id}
          onClose={() => setDeliveryOtpId(null)}
          onConfirm={() => { setDeliveredIds((prev) => [...prev, deliveryOtpOrder.id]); setDeliveryOtpId(null); }}
        />
      )}

      <div className="space-y-[10px]">
        {visibleOrders.map((order) => {
          const status      = effectiveStatus(order);
          const canTrack    = status !== "Отменён";
          const canCancel   = ["Оплачен", "Передан мастеру"].includes(status);
          const isDelivered = status === "Доставлен";
          const isCancelled = status === "Отменён";
          const isReviewed  = reviewedIds.includes(order.id);
          const trackerOpen = openTracker === order.id;
          const sc = STATUS_COLOR[status] ?? { bg: "#f5f3ed", text: "#374957" };

          return (
            <div key={order.id} className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[14px] overflow-hidden">

              {/* Main row */}
              <div className="p-[14px] flex items-center gap-[16px]">
                <button type="button" onClick={() => navigate(order.path)} className="size-[88px] rounded-[10px] overflow-hidden bg-[#f0eeed] shrink-0">
                  <img src={order.img} alt={order.title} className="w-full h-full object-cover" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="font-['Manrope',sans-serif] text-[12px] text-[#6f6a64]">Заказ {order.id} · {order.date}</p>
                  <button type="button" onClick={() => navigate(order.path)}
                    className="font-['Manrope',sans-serif] font-bold text-[15px] text-black mt-[4px] text-left hover:text-[#315350] transition-colors line-clamp-1 w-full">
                    {order.title}
                  </button>
                  <p className="font-['Manrope',sans-serif] text-[13px] text-[#6f6a64] mt-[3px]">{order.master}</p>
                  {order.trackNum && !isCancelled && (
                    <div className="flex items-center gap-[5px] mt-[5px]">
                      <Truck size={11} className="text-[#315350]" />
                      <span className="font-['Manrope',sans-serif] text-[11px] text-[#374957]">
                        {order.carrier ?? "Трек"}: <span className="font-semibold">{order.trackNum}</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span
                    className="inline-flex h-[26px] items-center px-[10px] rounded-full font-['Manrope',sans-serif] font-semibold text-[11px]"
                    style={{ background: sc.bg, color: sc.text }}
                  >
                    {status}
                  </span>
                  <p className="font-['Manrope',sans-serif] font-bold text-[15px] text-[#315350] mt-[10px]">{order.price}</p>
                </div>
              </div>

              {/* Actions row */}
              <div className="border-t border-[rgba(55,73,87,0.06)] px-[14px] py-[10px] flex items-center gap-[8px] flex-wrap">
                {canTrack && (
                  <button
                    type="button"
                    onClick={() => setOpenTracker(trackerOpen ? null : order.id)}
                    className="flex items-center gap-[5px] h-[32px] px-[13px] rounded-full bg-[#315350] text-white font-['Manrope',sans-serif] font-semibold text-[12px] hover:bg-[#3c6460] transition-colors"
                  >
                    <Truck size={12} />
                    {trackerOpen ? "Скрыть" : "Отследить заказ"}
                    <ChevronDown size={12} style={{ transform: trackerOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </button>
                )}
                {status === "Отправлен" && (
                  <button
                    type="button"
                    onClick={() => setDeliveryOtpId(order.id)}
                    className="flex items-center gap-[5px] h-[32px] px-[13px] rounded-full bg-[#1d5abf] text-white font-['Manrope',sans-serif] font-semibold text-[12px] hover:bg-[#1a4fa8] transition-colors"
                  >
                    <Smartphone size={12} />
                    Подтвердить получение
                  </button>
                )}
                {isDelivered && !isReviewed && (
                  <button
                    type="button"
                    onClick={() => setReviewModalId(order.id)}
                    className="flex items-center gap-[5px] h-[32px] px-[13px] rounded-full border border-[rgba(55,73,87,0.18)] text-[#374957] font-['Manrope',sans-serif] font-semibold text-[12px] hover:border-[#315350] hover:text-[#315350] transition-colors"
                  >
                    <Star size={12} />
                    Оставить отзыв
                  </button>
                )}
                {isDelivered && isReviewed && (
                  <button
                    type="button"
                    onClick={() => setReviewModalId(order.id)}
                    className="flex items-center gap-[5px] h-[32px] px-[13px] rounded-full border border-[#315350] text-[#315350] font-['Manrope',sans-serif] font-semibold text-[12px]"
                  >
                    <CheckCircle2 size={12} />
                    Отзыв оставлен
                  </button>
                )}
                {(isDelivered || isCancelled) && (
                  <button
                    type="button"
                    onClick={() => navigate(order.path)}
                    className="flex items-center gap-[5px] h-[32px] px-[13px] rounded-full border border-[rgba(55,73,87,0.18)] text-[#374957] font-['Manrope',sans-serif] font-semibold text-[12px] hover:border-[#315350] hover:text-[#315350] transition-colors"
                  >
                    <Repeat2 size={12} />
                    Повторить заказ
                  </button>
                )}
                {isCancelled && (
                  <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">Заказ отменён</span>
                )}
                {canCancel && (
                  <button
                    type="button"
                    onClick={() => setCancelModalId(order.id)}
                    className="ml-auto flex items-center gap-[5px] h-[32px] px-[13px] rounded-full border border-[rgba(220,38,38,0.25)] text-[#dc2626] font-['Manrope',sans-serif] font-semibold text-[12px] hover:border-[#dc2626] transition-colors"
                  >
                    <X size={12} />
                    Отменить заказ
                  </button>
                )}
              </div>

              {/* Delivery tracker (expandable) */}
              {trackerOpen && (
                <div className="px-[14px] pb-[14px]">
                  <DeliveryTracker status={status} trackNum={order.trackNum} carrier={order.carrier} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

const FAVORITES_SORT_OPTIONS = ["По дате", "По цене", "По популярности"] as const;
type FavSort = typeof FAVORITES_SORT_OPTIONS[number];

function FavoritesSection() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<FavSort>("По дате");

  const sorted = [...FAVORITES].sort((a, b) => {
    if (sort === "По цене") return parseInt(a.price) - parseInt(b.price);
    return 0;
  });

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center gap-[8px] mb-[16px]">
        <span className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mr-[2px]">Сортировка:</span>
        {FAVORITES_SORT_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSort(opt)}
            className="h-[32px] px-[14px] rounded-full font-['Manrope',sans-serif] font-semibold text-[12px] transition-all"
            style={{
              background: sort === opt ? "#315350" : "#f0ede8",
              color: sort === opt ? "white" : "#374957",
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[12px]">
        {sorted.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => navigate(item.path)}
            className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[14px] overflow-hidden text-left hover:border-[#315350] transition-colors"
          >
            <img src={item.img} alt={item.title} className="w-full h-[190px] object-cover bg-[#f0eeed]" />
            <div className="p-[14px]">
              <h3 className="font-['Manrope',sans-serif] font-bold text-[15px] text-black line-clamp-1">{item.title}</h3>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6f6a64] mt-[4px]">{item.master}</p>
              <div className="flex items-center justify-between mt-[12px]">
                <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-[#315350]">{item.price}</p>
                <Heart size={18} fill="#ef4444" stroke="#ef4444" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Shared field ─────────────────────────────────────────────────────────────

function Field({ label, value, type = "text", onChange }: { label: string; value: string; type?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] block mb-[6px]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[44px] rounded-[12px] border border-[rgba(55,73,87,0.16)] px-[14px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:border-[#315350] transition-colors bg-white"
      />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[rgba(55,73,87,0.09)] rounded-[18px] p-[24px] ${className}`}>
      {children}
    </div>
  );
}

function SaveBtn({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-[20px] h-[44px] px-[28px] rounded-full font-['Manrope',sans-serif] font-bold text-[14px] text-white transition-all flex items-center gap-[8px]"
      style={{ background: saved ? "#1f6b45" : "#315350" }}
    >
      {saved && <Check size={15} />}
      {saved ? "Сохранено" : "Сохранить изменения"}
    </button>
  );
}

// ── ProfileSection ────────────────────────────────────────────────────────────

function ProfileSection() {
  const [form, setForm] = useState({ firstName: "Даниял", lastName: "Абуов", phone: "+7 701 000 00 00", email: "daniyal@example.com" });
  const [saved, setSaved] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState<Record<string, boolean>>({});
  const [pwSaved, setPwSaved] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  function handlePwSave() {
    if (!pw.current || !pw.next || pw.next !== pw.confirm) return;
    setPwSaved(true);
    setTimeout(() => { setPwSaved(false); setPwOpen(false); setPw({ current: "", next: "", confirm: "" }); }, 2000);
  }

  const pwValid = pw.current.length > 0 && pw.next.length >= 6 && pw.next === pw.confirm;

  return (
    <div className="space-y-[16px]">
      {/* Avatar + stats */}
      <Card className="flex items-center gap-[24px]">
        <div className="relative shrink-0">
          <div className="w-[88px] h-[88px] rounded-full bg-[#eef3ef] flex items-center justify-center overflow-hidden border-2 border-[rgba(49,83,80,0.2)]">
            <User size={40} className="text-[#315350]" />
          </div>
          <label className="absolute bottom-0 right-0 w-[26px] h-[26px] rounded-full bg-[#315350] flex items-center justify-center cursor-pointer hover:bg-[#3c6460] transition-colors">
            <Upload size={12} className="text-white" />
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black">{form.firstName} {form.lastName}</p>
          <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mt-[2px]">Зарегистрирован: 12 января 2024</p>
          <div className="flex items-center gap-[24px] mt-[12px]">
            {[{ label: "Заказов", value: "5" }, { label: "Отзывов", value: "8" }, { label: "Избранное", value: "12" }].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-['Manrope',sans-serif] font-bold text-[20px] text-[#315350]">{value}</p>
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Edit form */}
      <Card>
        <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black mb-[18px]">Личные данные</h3>
        <div className="grid grid-cols-2 gap-[14px]">
          <Field label="Имя"      value={form.firstName} onChange={(v) => setForm((f) => ({ ...f, firstName: v }))} />
          <Field label="Фамилия"  value={form.lastName}  onChange={(v) => setForm((f) => ({ ...f, lastName: v }))} />
          <Field label="Телефон"  value={form.phone}     onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
          <Field label="Email"    value={form.email}     type="email" onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
        </div>
        <SaveBtn saved={saved} onClick={handleSave} />
      </Card>

      {/* Password */}
      <Card>
        <button
          type="button"
          onClick={() => setPwOpen((o) => !o)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[10px] bg-[#eef3ef] flex items-center justify-center">
              <Lock size={16} className="text-[#315350]" />
            </div>
            <div className="text-left">
              <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black">Изменить пароль</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">Последнее изменение: 3 месяца назад</p>
            </div>
          </div>
          <ChevronDown size={18} className="text-[#92887d] transition-transform" style={{ transform: pwOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
        </button>

        {pwOpen && (
          <div className="mt-[20px] pt-[20px] border-t border-[rgba(55,73,87,0.08)] space-y-[12px]">
            {([
              { key: "current", label: "Текущий пароль" },
              { key: "next",    label: "Новый пароль" },
              { key: "confirm", label: "Повторите новый пароль" },
            ] as const).map(({ key, label }) => (
              <div key={key}>
                <label className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] block mb-[6px]">{label}</label>
                <div className="relative">
                  <input
                    type={showPw[key] ? "text" : "password"}
                    value={pw[key]}
                    onChange={(e) => setPw((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full h-[44px] rounded-[12px] border border-[rgba(55,73,87,0.16)] px-[14px] pr-[44px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:border-[#315350] transition-colors"
                  />
                  <button type="button" onClick={() => setShowPw((s) => ({ ...s, [key]: !s[key] }))}
                    className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#92887d] hover:text-[#374957]">
                    {showPw[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {key === "next" && pw.next.length > 0 && pw.next.length < 6 && (
                  <p className="font-['Manrope',sans-serif] text-[11px] text-[#dc2626] mt-[4px]">Минимум 6 символов</p>
                )}
                {key === "confirm" && pw.confirm.length > 0 && pw.confirm !== pw.next && (
                  <p className="font-['Manrope',sans-serif] text-[11px] text-[#dc2626] mt-[4px]">Пароли не совпадают</p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handlePwSave}
              disabled={!pwValid}
              className="h-[44px] px-[24px] rounded-full font-['Manrope',sans-serif] font-bold text-[14px] text-white flex items-center gap-[8px] transition-all"
              style={{ background: pwSaved ? "#1f6b45" : pwValid ? "#315350" : "#d0c8bf", cursor: pwValid ? "pointer" : "not-allowed" }}
            >
              {pwSaved && <Check size={15} />}
              {pwSaved ? "Пароль изменён" : "Сохранить пароль"}
            </button>
          </div>
        )}
      </Card>

      {/* Log out of all devices */}
      <Card>
        <div className="flex items-start justify-between gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[10px] bg-[#fef2f2] flex items-center justify-center shrink-0">
              <Smartphone size={16} className="text-[#dc2626]" />
            </div>
            <div>
              <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black">Активные сессии</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[2px]">Вы вошли с 2 устройств</p>
            </div>
          </div>
          {!logoutConfirm ? (
            <button type="button" onClick={() => setLogoutConfirm(true)}
              className="h-[36px] px-[16px] rounded-full border border-[#dc2626] font-['Manrope',sans-serif] font-semibold text-[13px] text-[#dc2626] hover:bg-[#fef2f2] transition-colors shrink-0">
              Выйти со всех
            </button>
          ) : (
            <div className="flex items-center gap-[8px] shrink-0">
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#374957]">Вы уверены?</p>
              <button type="button" onClick={() => setLogoutConfirm(false)}
                className="h-[34px] px-[14px] rounded-full bg-[#f0ede8] font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] hover:bg-[#e8e5e0] transition-colors">
                Нет
              </button>
              <button type="button" onClick={() => setLogoutConfirm(false)}
                className="h-[34px] px-[14px] rounded-full bg-[#dc2626] font-['Manrope',sans-serif] font-semibold text-[12px] text-white hover:bg-[#b91c1c] transition-colors">
                Да, выйти
              </button>
            </div>
          )}
        </div>

        <div className="mt-[16px] space-y-[8px]">
          {[
            { device: "iPhone 14 Pro", location: "Алматы, KZ", time: "Сейчас", current: true },
            { device: "MacBook Pro",   location: "Алматы, KZ", time: "2 часа назад", current: false },
          ].map(({ device, location, time, current }) => (
            <div key={device} className="flex items-center justify-between py-[10px] px-[14px] rounded-[12px] bg-[#fafaf8] border border-[rgba(55,73,87,0.07)]">
              <div>
                <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black">{device} {current && <span className="text-[#315350] font-normal text-[11px]">• это устройство</span>}</p>
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">{location} · {time}</p>
              </div>
              {!current && <button type="button" className="font-['Manrope',sans-serif] text-[12px] text-[#dc2626] hover:underline">Завершить</button>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── AddressesSection ──────────────────────────────────────────────────────────

type Address = { id: string; label: string; city: string; street: string; flat: string; code: string; isDefault: boolean };

function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "a1", label: "Дом", city: "Алматы", street: "проспект Абая, 25", flat: "кв. 14", code: "", isDefault: true },
    { id: "a2", label: "Работа", city: "Астана", street: "Кабанбай батыра, 12", flat: "офис 301", code: "1234", isDefault: false },
  ]);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ label: "", city: "", street: "", flat: "", code: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function startAdd() { setDraft({ label: "", city: "", street: "", flat: "", code: "" }); setAdding(true); setEditId(null); }
  function startEdit(a: Address) { setDraft({ label: a.label, city: a.city, street: a.street, flat: a.flat, code: a.code }); setEditId(a.id); setAdding(false); }

  function saveNew() {
    if (!draft.city || !draft.street) return;
    setAddresses((prev) => [...prev, { id: Date.now().toString(), ...draft, isDefault: prev.length === 0 }]);
    setAdding(false);
  }

  function saveEdit() {
    setAddresses((prev) => prev.map((a) => a.id === editId ? { ...a, ...draft } : a));
    setEditId(null);
  }

  function confirmDelete(id: string) {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length > 0 && !next.some((a) => a.isDefault)) next[0].isDefault = true;
      return next;
    });
    setDeleteId(null);
  }

  function setDefault(id: string) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  const AddrForm = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <div className="bg-[#f9f8f6] rounded-[14px] p-[18px] space-y-[12px]">
      <div className="grid grid-cols-2 gap-[12px]">
        <Field label="Название (Дом, Работа...)" value={draft.label}  onChange={(v) => setDraft((d) => ({ ...d, label: v }))} />
        <Field label="Город"                     value={draft.city}   onChange={(v) => setDraft((d) => ({ ...d, city: v }))} />
        <Field label="Улица и номер дома"         value={draft.street} onChange={(v) => setDraft((d) => ({ ...d, street: v }))} />
        <Field label="Квартира / офис"            value={draft.flat}   onChange={(v) => setDraft((d) => ({ ...d, flat: v }))} />
        <Field label="Код домофона (необязательно)" value={draft.code} onChange={(v) => setDraft((d) => ({ ...d, code: v }))} />
      </div>
      <div className="flex items-center gap-[10px] pt-[4px]">
        <button type="button" onClick={onSave}
          disabled={!draft.city || !draft.street}
          className="h-[42px] px-[22px] rounded-full font-['Manrope',sans-serif] font-bold text-[13px] text-white transition-all"
          style={{ background: draft.city && draft.street ? "#315350" : "#d0c8bf", cursor: draft.city && draft.street ? "pointer" : "not-allowed" }}>
          Сохранить адрес
        </button>
        <button type="button" onClick={onCancel}
          className="h-[42px] px-[22px] rounded-full border border-[rgba(55,73,87,0.18)] font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957] hover:border-[#374957] transition-colors">
          Отмена
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-[12px]">
      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-[20px] p-[28px] w-full max-w-[360px] shadow-xl">
            <div className="w-[48px] h-[48px] rounded-full bg-[#fef2f2] flex items-center justify-center mx-auto mb-[16px]">
              <AlertTriangle size={22} className="text-[#dc2626]" />
            </div>
            <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-black text-center mb-[8px]">Удалить адрес?</p>
            <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] text-center mb-[24px]">Адрес будет безвозвратно удалён из вашего профиля.</p>
            <div className="flex gap-[10px]">
              <button type="button" onClick={() => setDeleteId(null)}
                className="flex-1 h-[44px] rounded-full border border-[rgba(55,73,87,0.18)] font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957] hover:border-[#374957] transition-colors">
                Отмена
              </button>
              <button type="button" onClick={() => confirmDelete(deleteId)}
                className="flex-1 h-[44px] rounded-full bg-[#dc2626] font-['Manrope',sans-serif] font-semibold text-[14px] text-white hover:bg-[#b91c1c] transition-colors">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {addresses.map((addr) => (
        <Card key={addr.id}>
          {editId === addr.id ? (
            <AddrForm onSave={saveEdit} onCancel={() => setEditId(null)} />
          ) : (
            <div className="flex items-start justify-between gap-[16px]">
              <div className="flex items-start gap-[14px]">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#eef3ef] flex items-center justify-center shrink-0">
                  <MapPin size={17} className="text-[#315350]" />
                </div>
                <div>
                  <div className="flex items-center gap-[8px]">
                    <p className="font-['Manrope',sans-serif] font-bold text-[15px] text-black">{addr.label || "Адрес"}</p>
                    {addr.isDefault && (
                      <span className="bg-[#eef3ef] text-[#315350] text-[10px] font-['Manrope',sans-serif] font-bold px-[8px] py-[2px] rounded-full">По умолчанию</span>
                    )}
                  </div>
                  <p className="font-['Manrope',sans-serif] text-[13px] text-[#374957] mt-[4px]">{addr.city}, {addr.street}{addr.flat ? `, ${addr.flat}` : ""}</p>
                  {addr.code && <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">Домофон: {addr.code}</p>}
                </div>
              </div>
              <div className="flex items-center gap-[8px] shrink-0">
                {!addr.isDefault && (
                  <button type="button" onClick={() => setDefault(addr.id)}
                    className="h-[32px] px-[12px] rounded-full border border-[rgba(55,73,87,0.18)] font-['Manrope',sans-serif] text-[11px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors">
                    Сделать основным
                  </button>
                )}
                <button type="button" onClick={() => startEdit(addr)}
                  className="w-[32px] h-[32px] rounded-full bg-[#f5f3ed] flex items-center justify-center hover:bg-[#e8e5e0] transition-colors">
                  <Settings size={14} className="text-[#374957]" />
                </button>
                <button type="button" onClick={() => setDeleteId(addr.id)}
                  className="w-[32px] h-[32px] rounded-full bg-[#fef2f2] flex items-center justify-center hover:bg-[#fee2e2] transition-colors">
                  <Trash2 size={14} className="text-[#dc2626]" />
                </button>
              </div>
            </div>
          )}
        </Card>
      ))}

      {adding ? (
        <Card><AddrForm onSave={saveNew} onCancel={() => setAdding(false)} /></Card>
      ) : (
        <button type="button" onClick={startAdd}
          className="w-full h-[52px] rounded-[18px] border-2 border-dashed border-[rgba(49,83,80,0.3)] flex items-center justify-center gap-[10px] font-['Manrope',sans-serif] font-semibold text-[14px] text-[#315350] hover:border-[#315350] hover:bg-[#f0f5f4] transition-all">
          <Plus size={18} />
          Добавить новый адрес
        </button>
      )}
    </div>
  );
}

// ── SettingsSection ───────────────────────────────────────────────────────────

const LANGUAGES_LIST = ["Русский", "Қазақша", "English"] as const;
type Lang = typeof LANGUAGES_LIST[number];

function SettingsSection() {
  const [lang, setLang] = useState<Lang>("Русский");
  const [notifs, setNotifs] = useState({ email: true, push: true, promo: false });
  const [saved, setSaved] = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className="relative w-[46px] h-[26px] rounded-full transition-colors shrink-0"
      style={{ background: value ? "#315350" : "#d0c8bf" }}
    >
      <span
        className="absolute top-[3px] w-[20px] h-[20px] bg-white rounded-full shadow transition-all"
        style={{ left: value ? "23px" : "3px" }}
      />
    </button>
  );

  return (
    <div className="space-y-[16px]">
      {/* Language */}
      <Card>
        <div className="flex items-center gap-[12px] mb-[16px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#eef3ef] flex items-center justify-center">
            <Globe size={16} className="text-[#315350]" />
          </div>
          <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black">Язык интерфейса</h3>
        </div>
        <div className="flex gap-[8px]">
          {LANGUAGES_LIST.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className="flex-1 h-[44px] rounded-[12px] font-['Manrope',sans-serif] font-semibold text-[14px] border transition-all"
              style={{
                background: lang === l ? "#315350" : "#f5f3ed",
                color:      lang === l ? "white"   : "#374957",
                borderColor: lang === l ? "#315350" : "transparent",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-[12px] mb-[18px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#eef3ef] flex items-center justify-center">
            <Settings size={16} className="text-[#315350]" />
          </div>
          <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black">Уведомления</h3>
        </div>
        <div className="space-y-[14px]">
          {([
            { key: "email", label: "Email-уведомления",   desc: "Обновления заказов и акции на почту" },
            { key: "push",  label: "Push-уведомления",    desc: "Уведомления в браузере" },
            { key: "promo", label: "Рекламные рассылки",  desc: "Новые мастера и скидки Crafty" },
          ] as const).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black">{label}</p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[2px]">{desc}</p>
              </div>
              <Toggle value={notifs[key]} onChange={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))} />
            </div>
          ))}
        </div>
      </Card>

      {/* Currency */}
      <Card>
        <div className="flex items-center gap-[12px] mb-[16px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#eef3ef] flex items-center justify-center">
            <WalletCards size={16} className="text-[#315350]" />
          </div>
          <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black">Валюта</h3>
        </div>
        <div className="flex gap-[8px]">
          {["₸ Тенге", "$ USD", "€ EUR"].map((c) => (
            <button
              key={c}
              type="button"
              className="flex-1 h-[44px] rounded-[12px] font-['Manrope',sans-serif] font-semibold text-[14px] border transition-all"
              style={{
                background:  c === "₸ Тенге" ? "#315350" : "#f5f3ed",
                color:       c === "₸ Тенге" ? "white"   : "#374957",
                borderColor: c === "₸ Тенге" ? "#315350" : "transparent",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      <SaveBtn saved={saved} onClick={handleSave} />
    </div>
  );
}

// ── SupportSection ────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { q: "Как отследить мой заказ?",        a: "Перейдите в раздел «Мои заказы», нажмите на нужный заказ и кликните «Отследить заказ». Вы увидите текущий статус и трек-номер посылки." },
  { q: "Как отменить заказ?",             a: "Отменить можно заказы со статусом «Оплачен» или «Передан мастеру». В карточке заказа нажмите «Отменить заказ» и подтвердите действие. Деньги вернутся в течение 3–5 рабочих дней." },
  { q: "Как вернуть товар?",              a: "Возврат возможен в течение 14 дней с момента получения. Напишите в поддержку, укажите номер заказа и причину возврата — мы всё оформим." },
  { q: "Как оставить отзыв о мастере?",   a: "После получения заказа он появится в разделе «Мои отзывы» → «Ждут отзыва». Нажмите «Оставить отзыв», поставьте оценку и напишите текст." },
  { q: "Что делать, если товар пришёл повреждённым?", a: "Сфотографируйте товар и упаковку, затем напишите в поддержку в течение 48 часов после получения. Мы рассмотрим обращение и предложим замену или возврат средств." },
  { q: "Можно ли изменить адрес доставки после оплаты?", a: "Адрес можно изменить только до того, как заказ передан мастеру. Напишите нам как можно скорее через форму ниже." },
];

function SupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ topic: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!form.topic || form.message.length < 10) return;
    setSent(true);
  }

  return (
    <div className="space-y-[16px]">
      {/* Contact info */}
      <div className="grid grid-cols-2 gap-[12px]">
        {[
          { Icon: Phone,   label: "Телефон",   value: "+7 727 000 00 00", sub: "Пн–Пт, 9:00–18:00" },
          { Icon: Mail,    label: "Email",     value: "help@crafty.kz",   sub: "Ответим в течение 24 часов" },
        ].map(({ Icon, label, value, sub }) => (
          <Card key={label} className="flex items-center gap-[14px]">
            <div className="w-[40px] h-[40px] rounded-[12px] bg-[#eef3ef] flex items-center justify-center shrink-0">
              <Icon size={18} className="text-[#315350]" />
            </div>
            <div>
              <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black">{value}</p>
              <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">{sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <Card>
        <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black mb-[16px]">Частые вопросы</h3>
        <div className="divide-y divide-[rgba(55,73,87,0.07)]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-[14px] text-left gap-[12px]"
              >
                <span className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black">{item.q}</span>
                <ChevronDown size={16} className="text-[#92887d] shrink-0 transition-transform" style={{ transform: openFaq === i ? "rotate(180deg)" : "none" }} />
              </button>
              {openFaq === i && (
                <p className="font-['Manrope',sans-serif] text-[13px] text-[#6f6a64] leading-[1.7] pb-[14px]">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Contact form */}
      <Card>
        {sent ? (
          <div className="flex flex-col items-center text-center py-[24px]">
            <div className="w-[56px] h-[56px] rounded-full bg-[#eef3ef] flex items-center justify-center mb-[14px]">
              <CheckCircle2 size={26} className="text-[#315350]" />
            </div>
            <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-black mb-[8px]">Обращение отправлено</p>
            <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] max-w-[300px]">Мы ответим на ваш email в течение 24 часов. Спасибо, что обратились!</p>
          </div>
        ) : (
          <>
            <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black mb-[18px]">Написать в поддержку</h3>
            <div className="space-y-[14px]">
              <div>
                <label className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] block mb-[6px]">Тема обращения</label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                  className="w-full h-[44px] rounded-[12px] border border-[rgba(55,73,87,0.16)] px-[14px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:border-[#315350] transition-colors bg-white appearance-none"
                >
                  <option value="">Выберите тему…</option>
                  <option value="order">Проблема с заказом</option>
                  <option value="return">Возврат товара</option>
                  <option value="payment">Вопрос об оплате</option>
                  <option value="master">Жалоба на мастера</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] block mb-[6px]">
                  Сообщение <span className="font-normal text-[#92887d]">({form.message.length}/500)</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value.slice(0, 500) }))}
                  placeholder="Опишите вашу проблему подробнее…"
                  rows={5}
                  className="w-full rounded-[12px] border border-[rgba(55,73,87,0.16)] px-[14px] py-[12px] font-['Manrope',sans-serif] text-[14px] text-[#374957] placeholder:text-[#b0a89e] outline-none focus:border-[#315350] resize-none transition-colors"
                />
                {form.message.length > 0 && form.message.length < 10 && (
                  <p className="font-['Manrope',sans-serif] text-[11px] text-[#dc2626] mt-[4px]">Минимум 10 символов</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleSend}
                disabled={!form.topic || form.message.length < 10}
                className="h-[46px] px-[28px] rounded-full font-['Manrope',sans-serif] font-bold text-[14px] text-white transition-all flex items-center gap-[8px]"
                style={{
                  background: !form.topic || form.message.length < 10 ? "#d0c8bf" : "#315350",
                  cursor:     !form.topic || form.message.length < 10 ? "not-allowed" : "pointer",
                }}
              >
                <MessageCircle size={16} />
                Отправить обращение
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// ── SimpleListSection ─────────────────────────────────────────────────────────

function SimpleListSection({ section }: { section: SectionKey }) {
  if (section === "profile")   return <ProfileSection />;
  if (section === "favorites") return <FavoritesSection />;
  if (section === "orders")    return <OrdersSection />;
  if (section === "reviews")   return <ReviewsSection />;
  if (section === "addresses") return <AddressesSection />;
  if (section === "settings")  return <SettingsSection />;
  if (section === "support")   return <SupportSection />;
  return null;
}


export function ProfilePage() {
  const { section } = useParams();
  const active = useMemo<SectionKey>(() => {
    const value = section as SectionKey | undefined;
    return value && SECTION_TITLES[value] ? value : "profile";
  }, [section]);

  const showSearch = active === "orders" || active === "favorites";

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[32px] lg:px-[48px] py-[30px]">
        <PageBreadcrumb items={[{ label: "Главная", path: "/" }, { label: "Личный кабинет" }, { label: SECTION_TITLES[active] }]} />

        {/* User banner */}
        <div className="bg-white border border-[rgba(55,73,87,0.09)] rounded-[18px] px-[24px] py-[16px] flex items-center gap-[16px] mb-[24px]">
          <div className="w-[46px] h-[46px] rounded-full bg-[#eef3ef] flex items-center justify-center border border-[rgba(49,83,80,0.18)] shrink-0">
            <User size={22} className="text-[#315350]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Manrope',sans-serif] font-bold text-[16px] text-black truncate">Даниял Абуов</p>
            <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">На Crafty с января 2024</p>
          </div>
          <div className="flex items-center gap-[28px]">
            {[
              { label: "Заказов",   value: "5",  path: "/profile/orders" },
              { label: "Отзывов",   value: "8",  path: "/profile/reviews" },
              { label: "Избранное", value: "12", path: "/profile/favorites" },
            ].map(({ label, value, path }) => (
              <a key={label} href={path} className="text-center hover:opacity-70 transition-opacity">
                <p className="font-['Manrope',sans-serif] font-bold text-[18px] text-[#315350]">{value}</p>
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">{label}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_260px] gap-[24px] items-start">
          <Sidebar active={active} />

          <main className="min-w-0">
            <div className="flex items-center justify-between gap-[18px] mb-[18px]">
              <h1 className="font-['Manrope',sans-serif] font-bold text-[26px] text-black">{SECTION_TITLES[active]}</h1>
              {showSearch && (
                <div className="relative w-[260px]">
                  <Search size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#92887d]" />
                  <input className="w-full h-[38px] rounded-full bg-white border border-[rgba(55,73,87,0.1)] pl-[38px] pr-[14px] font-['Manrope',sans-serif] text-[13px] outline-none focus:border-[#315350]" placeholder={active === "orders" ? "Поиск по заказам" : "Поиск в избранном"} />
                </div>
              )}
            </div>

            <SimpleListSection section={active} />
          </main>

          <RightRail active={active} />
        </div>
      </div>
    </div>
  );
}
