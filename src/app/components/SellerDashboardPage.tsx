import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Bell, ChevronDown, ExternalLink, Home, Menu, MessageCircle, Package,
  PlusCircle, Settings, ShoppingBag, Star, Store, Wallet, ClipboardList,
  ShieldCheck, X, TrendingUp, Search, ListFilter, UserRound,
  Edit3, EyeOff, Trash2, Upload, Truck, CheckCircle2, Send, Camera,
  Banknote, Clock, MapPin, Phone, Mail, Percent, Image as ImageIcon,
  MoreVertical, Copy, AlertTriangle, Boxes, Paperclip, LifeBuoy, ChevronRight,
  ShieldAlert, CreditCard, PackageX, Headphones,
} from "lucide-react";
import imgLogo from "../../imports/Главная1/dc67fbdd930fca6bb6a68a7e5753725209c1c5f6.png";
import imgAvatar from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import imgJewelry from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCeramics from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgToy from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgLeather from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgTextile from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgWorkshop from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";

const BRAND = "#315350";

type SellerSection =
  | "dashboard"
  | "orders"
  | "products"
  | "new-product"
  | "reviews"
  | "messages"
  | "finance"
  | "shop"
  | "settings"
  | "support"
  | "order-detail";

const NAV_ITEMS = [
  { key: "dashboard" as SellerSection, label: "Дашборд", path: "/seller/dashboard", Icon: Home },
  { key: "orders" as SellerSection, label: "Заказы", path: "/seller/orders", Icon: ClipboardList },
  { key: "products" as SellerSection, label: "Товары", path: "/seller/products", Icon: ShoppingBag },
  { key: "new-product" as SellerSection, label: "Добавить товар", path: "/seller/products/new", Icon: PlusCircle },
  { key: "reviews" as SellerSection, label: "Отзывы", path: "/seller/reviews", Icon: Star },
  { key: "messages" as SellerSection, label: "Сообщения", path: "/seller/messages", Icon: MessageCircle, count: 3 },
  { key: "finance" as SellerSection, label: "Финансы", path: "/seller/finance", Icon: Wallet },
  { key: "shop" as SellerSection, label: "Мой магазин", path: "/seller/shop", Icon: Store },
  { key: "settings" as SellerSection, label: "Настройки магазина", path: "/seller/settings", Icon: Settings },
  { key: "support" as SellerSection, label: "Поддержка", path: "/seller/support", Icon: LifeBuoy },
];

const METRICS = [
  {
    title: "Новые заказы",
    value: "3",
    hint: "нужно принять сегодня",
    Icon: ShoppingBag,
    accent: "#3A8B75",
    bg: "linear-gradient(135deg, #F3FAF6, #FFFFFF)",
    path: "/seller/orders?status=new",
  },
  {
    title: "Ожидают отправки",
    value: "5",
    hint: "2 заказа с трек-номером",
    Icon: Truck,
    accent: "#C66A1D",
    bg: "linear-gradient(135deg, #FFF6E8, #FFFFFF)",
    path: "/seller/orders?status=processing",
  },
  {
    title: "Товары",
    value: "48",
    hint: "6 товаров заканчиваются",
    Icon: Package,
    accent: "#7B64D8",
    bg: "linear-gradient(135deg, #F3F0FF, #FFFFFF)",
    path: "/seller/products",
  },
  {
    title: "Отзывы",
    value: "4.9",
    hint: "На основе 128 отзывов",
    Icon: Star,
    accent: "#D66B24",
    bg: "linear-gradient(135deg, #FFF1E9, #FFFFFF)",
    path: "/seller/reviews",
  },
];

const ORDERS = [
  { id: "#12543", time: "Сегодня, 14:20", deadline: "Отправить до 15 июня", buyer: "Алина, г. Алматы", price: "18 500 ₸", status: "Новый", tone: "green", image: imgJewelry, delivery: "Ожидает принятия", track: "" },
  { id: "#12542", time: "Сегодня, 12:45", deadline: "Отправить до 15 июня", buyer: "Мадина, г. Астана", price: "27 900 ₸", status: "В обработке", tone: "orange", image: imgCeramics, delivery: "Готовится к отправке", track: "" },
  { id: "#12541", time: "Сегодня, 11:30", deadline: "Отправить до 16 июня", buyer: "Нурсултан, г. Шымкент", price: "14 800 ₸", status: "Новый", tone: "green", image: imgWorkshop, delivery: "Ожидает принятия", track: "" },
  { id: "#12540", time: "Сегодня, 10:15", deadline: "Трек-номер добавлен", buyer: "Айжан, г. Караганда", price: "9 500 ₸", status: "Отправлен", tone: "blue", image: imgCeramics, delivery: "KazPost", track: "KZ123456789" },
  { id: "#12539", time: "Сегодня, 09:50", deadline: "Отправить до 16 июня", buyer: "Дана, г. Алматы", price: "22 000 ₸", status: "В обработке", tone: "orange", image: imgLeather, delivery: "CDEK", track: "" },
  { id: "#12538", time: "Вчера, 18:30", deadline: "Ожидает SMS покупателя", buyer: "Руслан, г. Астана", price: "16 200 ₸", status: "Доставлен", tone: "blue", image: imgTextile, delivery: "CDEK", track: "CDEK882014" },
  { id: "#12537", time: "Вчера, 16:05", deadline: "Отменён покупателем", buyer: "Сауле, г. Алматы", price: "7 800 ₸", status: "Отменён", tone: "orange", image: imgToy, delivery: "Не отправлялся", track: "" },
];

const REVIEWS = [
  { name: "Алина, Алматы", text: "Очень красивые серьги, фото не передает всей красоты! Спасибо мастеру!", time: "Сегодня", image: imgJewelry },
  { name: "Мадина, Астана", text: "Качество на высшем уровне, быстрая доставка и красивая упаковка.", time: "Вчера", image: imgCeramics },
  { name: "Салтанат, Шымкент", text: "Очень милый зайка, ребенку понравился.", time: "2 дня назад", image: imgToy },
  { name: "Айбек, Алматы", text: "Отличная работа, всё аккуратно и качественно!", time: "3 дня назад", image: imgLeather },
];

const REVIEWS_FULL = [
  { id: "r1", name: "Алина", city: "Алматы", text: "Очень красивые серьги, фото не передаёт всей красоты! Спасибо мастеру, упаковка идеальная.", time: "Сегодня", image: imgJewelry, rating: 5, hasPhoto: true, initialReply: "" },
  { id: "r2", name: "Мадина", city: "Астана", text: "Качество на высшем уровне, быстрая доставка и красивая упаковка. Буду заказывать ещё!", time: "Вчера", image: imgCeramics, rating: 5, hasPhoto: false, initialReply: "Мадина, спасибо за тёплые слова! Рады видеть вас снова 🤍" },
  { id: "r3", name: "Салтанат", city: "Шымкент", text: "Очень милый зайка, ребёнку очень понравился. Мягкий и хорошо сшит.", time: "2 дня назад", image: imgToy, rating: 5, hasPhoto: true, initialReply: "" },
  { id: "r4", name: "Айбек", city: "Алматы", text: "Отличная работа, всё аккуратно и качественно. Немного долго шло, но результат стоит того.", time: "3 дня назад", image: imgLeather, rating: 4, hasPhoto: false, initialReply: "" },
  { id: "r5", name: "Нурлан", city: "Астана", text: "Товар пришёл позже срока, упаковка была слегка помята. Само изделие нормальное, но ожидания были выше.", time: "5 дней назад", image: imgWorkshop, rating: 2, hasPhoto: false, initialReply: "" },
  { id: "r6", name: "Гүлнар", city: "Алматы", text: "Прекрасный подарок! Подруга была в восторге. Отдельное спасибо за фирменную упаковку.", time: "7 дней назад", image: imgTextile, rating: 5, hasPhoto: true, initialReply: "" },
];

const RATING_DIST = [
  { stars: 5, count: 112 },
  { stars: 4, count: 12 },
  { stars: 3, count: 3 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

const REVIEW_FILTERS = [
  { key: "all", label: "Все" },
  { key: "no-reply", label: "Без ответа" },
  { key: "5", label: "5 звёзд" },
  { key: "4", label: "4 звезды" },
  { key: "bad", label: "1–2 звезды" },
  { key: "photo", label: "С фото" },
];

const QUICK_ACTIONS = [
  { title: "Добавить товар", text: "Создайте новый товар и добавьте его в свой магазин", image: imgTextile, Icon: PlusCircle, cta: "Добавить товар" },
  { title: "Обработать заказы", text: "Примите новые заказы и подготовьте отправку покупателям", image: imgWorkshop, Icon: Package, cta: "К заказам" },
  { title: "Открыть магазин", text: "Посмотрите публичную страницу вашего магазина", image: imgCeramics, Icon: ExternalLink, cta: "Открыть магазин" },
];

const PRODUCTS = [
  { id: "p1", title: "Серьги-тумар с лазуритом", category: "Украшения", price: "18 500 ₸", stockLabel: "Остаток: 2 шт", stockCount: 2, status: "Активен", views: 1240, rating: "4.9", reviews: 28, sold: 53, updated: "14 июня", image: imgJewelry },
  { id: "p2", title: "Керамический чайник «Шыны»", category: "Керамика", price: "27 900 ₸", stockLabel: "Под заказ", stockCount: 8, status: "На модерации", views: 680, rating: "4.8", reviews: 14, sold: 19, updated: "13 июня", image: imgCeramics },
  { id: "p3", title: "Брелок с казахским орнаментом", category: "Подарки", price: "4 800 ₸", stockLabel: "Нет в наличии", stockCount: 0, status: "Скрыт", views: 214, rating: "4.7", reviews: 9, sold: 31, updated: "10 июня", image: imgWorkshop },
  { id: "p4", title: "Кожаная сумка «Батыр»", category: "Кожа и сумки", price: "22 000 ₸", stockLabel: "Остаток: 5 шт", stockCount: 5, status: "Активен", views: 932, rating: "5.0", reviews: 17, sold: 24, updated: "8 июня", image: imgLeather },
];

const PRODUCT_FILTERS = [
  { key: "active", label: "Активные", predicate: (product: typeof PRODUCTS[number]) => product.status === "Активен" },
  { key: "moderation", label: "На модерации", predicate: (product: typeof PRODUCTS[number]) => product.status === "На модерации" },
  { key: "hidden", label: "Скрытые", predicate: (product: typeof PRODUCTS[number]) => product.status === "Скрыт" },
  { key: "low-stock", label: "Заканчиваются", predicate: (product: typeof PRODUCTS[number]) => product.stockCount > 0 && product.stockCount <= 3 },
  { key: "out-stock", label: "Нет в наличии", predicate: (product: typeof PRODUCTS[number]) => product.stockCount === 0 },
];

const TRANSACTIONS = [
  { id: "TR-2041", type: "Продажа", amount: "+18 500 ₸", status: "Холд 14 дней", date: "Сегодня" },
  { id: "TR-2038", type: "Комиссия Crafty", amount: "-1 850 ₸", status: "Списано", date: "Вчера" },
  { id: "TR-1997", type: "Выплата", amount: "-240 000 ₸", status: "Выплачено", date: "8 июня" },
];

const MESSAGES = [
  { name: "Алина", text: "Здравствуйте! Можно сделать серьги чуть длиннее?", time: "14:22", unread: true },
  { name: "Мадина", text: "Спасибо, заказ получила. Очень красиво!", time: "Вчера", unread: false },
  { name: "Салтанат", text: "Когда будет отправка зайки?", time: "2 дня назад", unread: true },
];

const LOW_STOCK_ITEMS = [
  { title: "Серьги «Тумар»", count: 2, image: imgJewelry },
  { title: "Свеча «Зеленый чай»", count: 1, image: imgCeramics },
  { title: "Игрушка «Зайка»", count: 3, image: imgToy },
];

const SHOP_EVENTS = [
  { title: "Новый заказ #12543", desc: "Алина, г. Алматы · 18 500 ₸", Icon: ShoppingBag },
  { title: "Новый отзыв 5.0", desc: "Покупатель отметил качество упаковки", Icon: Star },
  { title: "Остаток товара заканчивается", desc: "Свеча «Зеленый чай» · остаток 1", Icon: Package },
];

function sectionFromPath(pathname: string): SellerSection {
  if (pathname.startsWith("/seller/orders/")) return "order-detail";
  if (pathname === "/seller/products/new") return "new-product";
  if (pathname.startsWith("/seller/products/") && pathname.endsWith("/edit")) return "new-product";
  const found = NAV_ITEMS.find((item) => pathname === item.path);
  return found?.key ?? "dashboard";
}

function StatusBadge({ children, tone }: { children: string; tone: string }) {
  const styleByTone: Record<string, { bg: string; color: string }> = {
    green: { bg: "#EAF6EE", color: "#267B49" },
    orange: { bg: "#FFF0D8", color: "#C86B11" },
    blue: { bg: "#EAF2FF", color: "#2867B2" },
  };
  const style = styleByTone[tone] ?? styleByTone.green;

  return (
    <span className="rounded-full px-[14px] py-[7px] font-['Manrope',sans-serif] text-[12px] font-bold" style={{ background: style.bg, color: style.color }}>
      {children}
    </span>
  );
}

function Sidebar({ section }: { section: SellerSection }) {
  const navigate = useNavigate();

  return (
    <aside className="hidden xl:flex fixed left-0 top-0 h-screen w-[280px] flex-col border-r border-[rgba(55,73,87,0.1)] bg-white px-[30px] py-[30px]">
      <img src={imgLogo} alt="Crafty.kz" className="mb-[44px] h-[42px] w-[142px] object-contain object-left" />
      <nav className="flex flex-col gap-[8px]">
        {NAV_ITEMS.map(({ key, label, path, Icon, count }) => {
          const active = key === section;
          return (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex h-[54px] items-center justify-between rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] font-bold transition-colors"
            style={{
              background: active ? "linear-gradient(135deg, #315350, #11604f)" : "transparent",
              color: active ? "#fff" : "#172825",
              boxShadow: active ? "0 12px 26px rgba(49,83,80,0.22)" : "none",
            }}
          >
            <span className="flex items-center gap-[14px]">
              <Icon size={18} strokeWidth={2} />
              {label}
            </span>
            {count && <span className="flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-[#E5F1EC] px-[7px] text-[12px] text-[#315350]">{count}</span>}
          </button>
        );})}
      </nav>
    </aside>
  );
}

function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-[96px] border-b border-[rgba(55,73,87,0.1)] bg-white/92 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-[28px] lg:px-[34px] xl:px-[40px]">
        <div className="flex items-center gap-[26px]">
          <button className="flex size-[34px] items-center justify-center rounded-full hover:bg-[#F4F6F3] xl:hidden" aria-label="Открыть меню">
            <Menu size={20} />
          </button>
          <button onClick={() => navigate("/")} className="hidden items-center gap-[10px] font-['Manrope',sans-serif] text-[14px] font-bold text-[#172825] xl:flex">
            <Menu size={18} />
            Главная
          </button>
        </div>

        <div className="flex items-center gap-[22px]">
          <button className="relative size-[26px]" aria-label="Сообщения">
            <MessageCircle size={22} />
            <span className="absolute -right-[5px] -top-[7px] flex size-[17px] items-center justify-center rounded-full bg-[#E53935] font-['Manrope',sans-serif] text-[9px] font-bold text-white">3</span>
          </button>
          <button className="size-[26px]" aria-label="Уведомления"><Bell size={21} /></button>
          <div className="flex items-center gap-[12px]">
            <img src={imgAvatar} alt="Айгерим Handmade" className="size-[44px] rounded-full object-cover" />
            <div className="hidden sm:block">
              <p className="font-['Manrope',sans-serif] text-[14px] font-bold text-[#172825]">Айгерим Handmade</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#78716A]">Продавец</p>
            </div>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}

function MetricCard({ metric }: { metric: typeof METRICS[number] }) {
  const navigate = useNavigate();
  const Icon = metric.Icon;
  return (
    <button onClick={() => navigate(metric.path)} className="relative overflow-hidden rounded-[24px] p-[24px] text-left transition-transform hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(49,83,80,0.08)]" style={{ background: metric.bg }}>
      <div className="mb-[30px] flex size-[58px] items-center justify-center rounded-[18px] bg-white/58">
        <Icon size={28} style={{ color: metric.accent }} />
      </div>
      <p className="font-['Manrope',sans-serif] text-[15px] font-bold text-[#172825]">{metric.title}</p>
      <p className="mt-[16px] font-['Manrope',sans-serif] text-[34px] font-black tracking-normal text-black">{metric.value}</p>
      <div className="mt-[22px] flex items-center justify-between gap-[12px]">
        <p className="font-['Manrope',sans-serif] text-[12px] font-medium text-[#6F6A64]">
          <span style={{ color: metric.accent }} className="font-bold">{metric.hint.split(" ")[0]}</span>{" "}
          {metric.hint.split(" ").slice(1).join(" ")}
        </p>
        <TrendingUp size={52} strokeWidth={1.4} style={{ color: metric.accent, opacity: 0.75 }} />
      </div>
    </button>
  );
}

function Panel({ title, link, children, onLink }: { title: string; link: string; children: React.ReactNode; onLink?: () => void }) {
  return (
    <section className="rounded-[24px] border border-[rgba(55,73,87,0.1)] bg-white p-[22px] shadow-[0_12px_34px_rgba(49,83,80,0.04)]">
      <div className="mb-[20px] flex items-center justify-between gap-[16px]">
        <h2 className="font-['Manrope',sans-serif] text-[21px] font-black text-[#172825]">{title}</h2>
        <button onClick={onLink} className="font-['Manrope',sans-serif] text-[12px] font-bold text-[#315350] hover:underline">{link}</button>
      </div>
      {children}
    </section>
  );
}

function OrdersPanel() {
  const navigate = useNavigate();

  return (
    <Panel title="Последние заказы" link="Смотреть все заказы" onLink={() => navigate("/seller/orders")}>
      <div className="divide-y divide-[rgba(55,73,87,0.1)]">
        {ORDERS.map((order) => (
          <div key={order.id} className="grid gap-[14px] py-[13px] first:pt-0 lg:grid-cols-[58px_1fr_auto_auto_auto] lg:items-center">
            <img src={order.image} alt="" className="size-[58px] rounded-[14px] object-cover" />
            <div>
              <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{order.id}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] font-medium text-[#6F6A64]">{order.time}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] font-medium text-[#6F6A64]">{order.buyer}</p>
            </div>
            <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{order.price}</p>
            <StatusBadge tone={order.tone}>{order.status}</StatusBadge>
            <div className="flex flex-wrap gap-[8px] lg:justify-end">
              {order.status === "Новый" && (
                <button className="rounded-[10px] border border-[#CDE8D5] px-[10px] py-[8px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#267B49]">
                  Принять
                </button>
              )}
              {order.status === "В обработке" && (
                <button className="rounded-[10px] border border-[rgba(55,73,87,0.14)] px-[10px] py-[8px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825]">
                  Отправить
                </button>
              )}
              <button onClick={() => navigate(`/seller/orders/${order.id.slice(1)}`)} className="rounded-[10px] border border-[rgba(55,73,87,0.14)] px-[10px] py-[8px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825]">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-[16px] h-[48px] w-full rounded-[12px] border border-[rgba(55,73,87,0.13)] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825] hover:border-[#315350]">
        Все заказы
      </button>
    </Panel>
  );
}

function LowStockPanel() {
  const navigate = useNavigate();

  return (
    <Panel title="Заканчиваются товары" link="Все товары" onLink={() => navigate("/seller/products")}>
      <div className="grid gap-[12px]">
        {LOW_STOCK_ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-[12px] rounded-[16px] bg-[#FFF8EA] px-[14px] py-[12px]">
            <img src={item.image} alt="" className="size-[44px] rounded-[12px] object-cover" />
            <div className="flex-1">
              <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{item.title}</p>
              <p className="mt-[2px] font-['Manrope',sans-serif] text-[12px] text-[#9A650C]">Остаток: {item.count}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/seller/products")} className="mt-[16px] h-[46px] w-full rounded-[14px] bg-[#315350] font-['Manrope',sans-serif] text-[13px] font-bold text-white hover:bg-[#3c6460]">
        Пополнить остатки
      </button>
    </Panel>
  );
}

function PayoutWidget() {
  const navigate = useNavigate();

  return (
    <Panel title="Баланс к выводу" link="Финансы" onLink={() => navigate("/seller/finance")}>
      <div className="rounded-[20px] bg-[#F2F8F4] px-[20px] py-[22px]">
        <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">Доступно к выводу</p>
        <p className="mt-[10px] font-['Manrope',sans-serif] text-[34px] font-black text-[#172825]">124 500 ₸</p>
        <div className="mt-[14px] grid gap-[8px]">
          <div className="flex justify-between font-['Manrope',sans-serif] text-[12px]">
            <span className="text-[#6F6A64]">В холде</span>
            <span className="font-black text-[#172825]">18 500 ₸</span>
          </div>
          <div className="flex justify-between font-['Manrope',sans-serif] text-[12px]">
            <span className="text-[#6F6A64]">Следующая выплата</span>
            <span className="font-black text-[#172825]">18 июня</span>
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/seller/finance")} className="mt-[16px] h-[46px] w-full rounded-[14px] bg-[#315350] font-['Manrope',sans-serif] text-[13px] font-bold text-white hover:bg-[#3c6460]">
        Вывести средства
      </button>
    </Panel>
  );
}

function AttentionBanner() {
  const navigate = useNavigate();

  return (
    <section className="mb-[24px] flex flex-col gap-[14px] rounded-[22px] border border-[#F4C7C7] bg-[#FFF4F4] px-[20px] py-[18px] md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-[12px]">
        <div className="mt-[2px] size-[10px] rounded-full bg-[#E53935]" />
        <div>
          <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">Требует внимания</p>
          <p className="mt-[4px] font-['Manrope',sans-serif] text-[13px] text-[#7A4A4A]">3 новых заказа ожидают подтверждения</p>
        </div>
      </div>
      <button onClick={() => navigate("/seller/orders?status=new")} className="h-[42px] rounded-[12px] bg-[#315350] px-[20px] font-['Manrope',sans-serif] text-[13px] font-bold text-white">
        Обработать
      </button>
    </section>
  );
}

function ShopEventsPanel() {
  return (
    <Panel title="Последние события" link="Все события">
      <div className="grid gap-[12px]">
        {SHOP_EVENTS.map(({ title, desc, Icon }) => (
          <div key={title} className="flex gap-[12px] rounded-[16px] bg-[#F7FAF8] px-[14px] py-[12px]">
            <div className="flex size-[36px] items-center justify-center rounded-[12px] bg-white">
              <Icon size={17} className="text-[#315350]" />
            </div>
            <div>
              <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{title}</p>
              <p className="mt-[3px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ReviewsPanel() {
  const navigate = useNavigate();

  return (
    <Panel title="Последние отзывы" link="Смотреть все отзывы" onLink={() => navigate("/seller/reviews")}>
      <div className="divide-y divide-[rgba(55,73,87,0.1)]">
        {REVIEWS.map((review) => (
          <div key={review.name} className="grid grid-cols-[44px_1fr_64px] gap-[14px] py-[13px] first:pt-0">
            <img src={imgAvatar} alt="" className="size-[44px] rounded-full object-cover" />
            <div>
              <div className="mb-[5px] flex flex-wrap items-center gap-[8px]">
                <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{review.name}</p>
                <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">{review.time}</span>
              </div>
              <div className="mb-[8px] flex items-center gap-[3px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={13} fill="#FFB800" stroke="#FFB800" />
                ))}
                <span className="ml-[6px] font-['Manrope',sans-serif] text-[11px] font-bold text-[#172825]">5.0</span>
              </div>
              <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.55] text-[#4C4640]">{review.text}</p>
            </div>
            <img src={review.image} alt="" className="size-[64px] rounded-[14px] object-cover" />
          </div>
        ))}
      </div>
      <button className="mt-[16px] h-[48px] w-full rounded-[12px] border border-[rgba(55,73,87,0.13)] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825] hover:border-[#315350]">
        Все отзывы
      </button>
    </Panel>
  );
}

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="mt-[34px]">
      <h2 className="mb-[20px] font-['Manrope',sans-serif] text-[21px] font-black text-[#172825]">Быстрые действия</h2>
      <div className="grid gap-[20px] md:grid-cols-3">
        {QUICK_ACTIONS.map(({ title, text, image, Icon, cta }) => (
          <div key={title} className="rounded-[24px] bg-white p-[24px] text-center shadow-[0_12px_34px_rgba(49,83,80,0.04)]" style={{ background: "linear-gradient(135deg, #F7FBF8, #FFFFFF)" }}>
            <div className="relative mx-auto mb-[18px] h-[118px] w-[160px]">
              <img src={image} alt="" className="h-full w-full object-contain" />
              <div className="absolute bottom-[2px] right-[12px] flex size-[46px] items-center justify-center rounded-full text-white shadow-[0_10px_20px_rgba(49,83,80,0.24)]" style={{ background: BRAND }}>
                <Icon size={24} />
              </div>
            </div>
            <p className="font-['Manrope',sans-serif] text-[16px] font-black text-[#172825]">{title}</p>
            <p className="mx-auto mt-[8px] min-h-[42px] max-w-[230px] font-['Manrope',sans-serif] text-[12px] leading-[1.65] text-[#6F6A64]">{text}</p>
            <button
              onClick={() => {
                if (title === "Добавить товар") navigate("/seller/products/new");
                else if (title === "Обработать заказы") navigate("/seller/orders");
                else if (title === "Открыть магазин") navigate("/shop/aigerim-handmade");
                else navigate("/seller/products");
              }}
              className="mt-[18px] h-[42px] min-w-[180px] rounded-[10px] bg-[#315350] px-[20px] font-['Manrope',sans-serif] text-[13px] font-bold text-white hover:bg-[#3c6460]"
            >
              {cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function PageTitle({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="mb-[26px] flex flex-col gap-[16px] lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="font-['Manrope',sans-serif] text-[30px] font-black tracking-normal text-[#111111]">{title}</h1>
        <p className="mt-[8px] font-['Manrope',sans-serif] text-[14px] text-[#6F6A64]">{desc}</p>
      </div>
      {action}
    </div>
  );
}

function Toolbar({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-[18px] flex flex-col gap-[12px] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex h-[46px] max-w-[440px] flex-1 items-center gap-[10px] rounded-[14px] bg-white px-[14px] shadow-[0_10px_28px_rgba(49,83,80,0.05)]">
        <Search size={17} className="text-[#92887D]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="h-full flex-1 bg-transparent font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none placeholder:text-[#92887D]" />
      </div>
      <button className="flex h-[46px] items-center gap-[8px] rounded-[14px] border border-[rgba(55,73,87,0.12)] bg-white px-[14px] font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">
        <ListFilter size={16} />
        Фильтр
      </button>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[24px] border border-[rgba(55,73,87,0.1)] bg-white p-[22px] shadow-[0_12px_34px_rgba(49,83,80,0.04)] ${className}`}>{children}</section>;
}

function SellerDashboardContent() {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle
        title="Добро пожаловать, Айгерим! 👋"
        desc="Управляйте своим магазином и развивайте свой бренд на Crafty.kz"
        action={(
          <button
            onClick={() => navigate("/shop/aigerim-handmade")}
            className="flex h-[48px] items-center justify-center gap-[10px] rounded-[14px] border border-[rgba(55,73,87,0.13)] bg-white px-[22px] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825] hover:border-[#315350]"
          >
            Посмотреть магазин
            <ExternalLink size={17} />
          </button>
        )}
      />

      <AttentionBanner />

      <div className="grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((metric) => <MetricCard key={metric.title} metric={metric} />)}
      </div>

      <div className="mt-[34px] grid gap-[24px] xl:grid-cols-[1fr_360px]">
        <LowStockPanel />
        <PayoutWidget />
      </div>

      <div className="mt-[34px] grid gap-[24px] xl:grid-cols-[1fr_360px]">
        <OrdersPanel />
        <ShopEventsPanel />
      </div>

      <div className="mt-[34px]">
        <ReviewsPanel />
      </div>

      <QuickActions />
      <ProfileProgress />
    </>
  );
}

function ProductStatCard({ title, value, hint, Icon, tone }: { title: string; value: string; hint: string; Icon: typeof Package; tone: string }) {
  return (
    <div className="rounded-[20px] bg-white px-[18px] py-[17px] shadow-[0_10px_28px_rgba(49,83,80,0.05)]">
      <div className="flex items-center justify-between gap-[12px]">
        <div>
          <p className="font-['Manrope',sans-serif] text-[12px] font-bold text-[#6F6A64]">{title}</p>
          <p className="mt-[6px] font-['Manrope',sans-serif] text-[26px] font-black text-[#172825]">{value}</p>
        </div>
        <div className="flex size-[42px] items-center justify-center rounded-[14px]" style={{ background: `${tone}1A`, color: tone }}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-[8px] font-['Manrope',sans-serif] text-[12px] text-[#8A8178]">{hint}</p>
    </div>
  );
}

function ProductActionsMenu({ productId, onHide, onDuplicate, onDelete }: { productId: string; onHide: () => void; onDuplicate: () => void; onDelete: () => void }) {
  const navigate = useNavigate();

  return (
    <details className="group relative">
      <summary className="flex size-[38px] cursor-pointer list-none items-center justify-center rounded-[12px] border border-[rgba(55,73,87,0.14)] bg-white text-[#172825] transition-colors hover:border-[#315350]">
        <MoreVertical size={17} />
      </summary>
      <div className="absolute right-0 z-20 mt-[8px] w-[190px] rounded-[16px] border border-[rgba(55,73,87,0.12)] bg-white p-[7px] shadow-[0_16px_38px_rgba(23,40,37,0.14)]">
        <button onClick={() => navigate(`/seller/products/${productId}/edit`)} className="flex h-[38px] w-full items-center gap-[9px] rounded-[10px] px-[10px] text-left font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825] hover:bg-[#F5F3ED]">
          <Edit3 size={14} />
          Редактировать
        </button>
        <button onClick={onHide} className="flex h-[38px] w-full items-center gap-[9px] rounded-[10px] px-[10px] text-left font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825] hover:bg-[#F5F3ED]">
          <EyeOff size={14} />
          Скрыть
        </button>
        <button onClick={onDuplicate} className="flex h-[38px] w-full items-center gap-[9px] rounded-[10px] px-[10px] text-left font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825] hover:bg-[#F5F3ED]">
          <Copy size={14} />
          Дублировать
        </button>
        <button onClick={onDelete} className="flex h-[38px] w-full items-center gap-[9px] rounded-[10px] px-[10px] text-left font-['Manrope',sans-serif] text-[12px] font-bold text-[#C43D32] hover:bg-[#FFF3F1]">
          <Trash2 size={14} />
          Удалить
        </button>
      </div>
    </details>
  );
}

function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(PRODUCTS);
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredProducts = products.filter((product) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || [product.title, product.category, product.status, product.stockLabel].some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesFilter = activeFilters.length === 0 || activeFilters.some((filterKey) => PRODUCT_FILTERS.find((filter) => filter.key === filterKey)?.predicate(product));

    return matchesQuery && matchesFilter;
  });

  const toggleFilter = (key: string) => {
    setActiveFilters((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  const hideProduct = (productId: string) => {
    setProducts((current) => current.map((product) => product.id === productId ? { ...product, status: "Скрыт" } : product));
  };

  const duplicateProduct = (productId: string) => {
    setProducts((current) => {
      const product = current.find((item) => item.id === productId);
      if (!product) return current;

      return [
        { ...product, id: `${product.id}-copy-${Date.now()}`, title: `${product.title} — копия`, status: "На модерации", views: 0, sold: 0, updated: "Сегодня" },
        ...current,
      ];
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((current) => current.filter((product) => product.id !== productId));
  };

  return (
    <>
      <PageTitle
        title="Товары"
        desc="Управляйте листингами: наличие, цены, модерация, скрытие и редактирование."
        action={<button onClick={() => navigate("/seller/products/new")} className="flex h-[46px] items-center gap-[8px] rounded-[14px] bg-[#315350] px-[18px] font-['Manrope',sans-serif] text-[13px] font-bold text-white"><PlusCircle size={16} /> Добавить товар</button>}
      />
      <div className="mb-[22px] grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
        <ProductStatCard title="Активные" value="48" hint="видны покупателям" Icon={CheckCircle2} tone="#267B49" />
        <ProductStatCard title="На модерации" value="2" hint="ожидают проверки Crafty" Icon={ShieldCheck} tone="#C86B11" />
        <ProductStatCard title="Скрытые" value="5" hint="не показываются в магазине" Icon={EyeOff} tone="#2867B2" />
        <ProductStatCard title="Заканчиваются" value="3" hint="нужно пополнить остатки" Icon={AlertTriangle} tone="#C43D32" />
      </div>
      <div className="mb-[18px] flex flex-col gap-[12px] xl:flex-row xl:items-start xl:justify-between">
        <div className="flex h-[46px] max-w-[480px] flex-1 items-center gap-[10px] rounded-[14px] bg-white px-[14px] shadow-[0_10px_28px_rgba(49,83,80,0.05)]">
          <Search size={17} className="text-[#92887D]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск товара, категории, статуса" className="h-full flex-1 bg-transparent font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none placeholder:text-[#92887D]" />
        </div>
        <div className="flex flex-wrap gap-[8px]">
          {PRODUCT_FILTERS.map((filter) => {
            const active = activeFilters.includes(filter.key);
            return (
              <button
                key={filter.key}
                onClick={() => toggleFilter(filter.key)}
                className="flex h-[40px] items-center gap-[8px] rounded-[12px] border px-[12px] font-['Manrope',sans-serif] text-[12px] font-bold transition-colors"
                style={{ borderColor: active ? "#315350" : "rgba(55,73,87,0.12)", background: active ? "#EAF6EE" : "#FFFFFF", color: active ? "#315350" : "#172825" }}
              >
                <span className="flex size-[16px] items-center justify-center rounded-[4px] border" style={{ borderColor: active ? "#315350" : "rgba(55,73,87,0.26)", background: active ? "#315350" : "transparent" }}>
                  {active && <CheckCircle2 size={12} className="text-white" />}
                </span>
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      <Card>
        <div className="mb-[12px] hidden grid-cols-[68px_1fr_130px_160px_150px_58px] gap-[14px] px-[2px] font-['Manrope',sans-serif] text-[11px] font-bold uppercase tracking-normal text-[#92887D] lg:grid">
          <span />
          <span>Товар</span>
          <span>Цена</span>
          <span>Статус</span>
          <span>Показатели</span>
          <span />
        </div>
        {filteredProducts.map((product) => (
          <div key={product.id} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 lg:grid-cols-[68px_1fr_130px_160px_150px_58px] lg:items-center">
            <img src={product.image} alt="" className="size-[58px] rounded-[14px] object-cover" />
            <div>
              <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{product.title}</p>
              <div className="mt-[5px] flex flex-wrap items-center gap-x-[10px] gap-y-[4px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">
                <span>{product.category}</span>
                <span className={product.stockCount <= 3 ? "font-bold text-[#C43D32]" : ""}>{product.stockLabel}</span>
                <span>Обновлен: {product.updated}</span>
              </div>
            </div>
            <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">{product.price}</p>
            <StatusBadge tone={product.status === "Активен" ? "green" : product.status === "Скрыт" ? "blue" : "orange"}>{product.status}</StatusBadge>
            <div className="grid gap-[5px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">
              <span className="flex items-center gap-[5px] font-bold text-[#172825]"><Star size={13} fill="#FFB800" stroke="#FFB800" /> {product.rating} ({product.reviews})</span>
              <span><Boxes size={13} className="mr-[5px] inline text-[#315350]" />Продано: {product.sold}</span>
              <span>{product.views} просмотров</span>
            </div>
            <div className="flex justify-start lg:justify-end">
              <ProductActionsMenu productId={product.id} onHide={() => hideProduct(product.id)} onDuplicate={() => duplicateProduct(product.id)} onDelete={() => deleteProduct(product.id)} />
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="rounded-[18px] bg-[#F7F6F3] px-[18px] py-[28px] text-center font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">
            По этим фильтрам товаров не найдено
          </div>
        )}
      </Card>
    </>
  );
}

const CATEGORIES = ["Украшения", "Керамика", "Текстиль", "Кожа и сумки", "Подарки", "Игрушки", "Декор"];

const MATERIALS_BY_CATEGORY: Record<string, string[]> = {
  Украшения: ["Серебро", "Золото", "Медь", "Дерево", "Кожа", "Камень"],
  Керамика: ["Глина", "Фарфор", "Шамот", "Терракота"],
  Текстиль: ["Шерсть", "Хлопок", "Лён", "Шёлк"],
  "Кожа и сумки": ["Натуральная кожа", "Эко-кожа", "Замша"],
  Подарки: ["Дерево", "Металл", "Текстиль", "Керамика"],
  Игрушки: ["Шерсть", "Хлопок", "Дерево", "Фетр"],
  Декор: ["Дерево", "Металл", "Керамика", "Стекло"],
};

const CHARACTERISTICS_BY_CATEGORY: Record<string, { label: string; placeholder: string }[]> = {
  Украшения: [
    { label: "Размер / длина", placeholder: "18 мм, 45 см" },
    { label: "Вес", placeholder: "5 г" },
    { label: "Цвет", placeholder: "Серебристый" },
  ],
  Керамика: [
    { label: "Объем", placeholder: "300 мл" },
    { label: "Высота", placeholder: "12 см" },
    { label: "Диаметр", placeholder: "8 см" },
  ],
  Текстиль: [
    { label: "Размер", placeholder: "S / M / L" },
    { label: "Состав", placeholder: "100% хлопок" },
    { label: "Цвет", placeholder: "Голубой" },
  ],
  "Кожа и сумки": [
    { label: "Размер", placeholder: "30×20 см" },
    { label: "Цвет", placeholder: "Коричневый" },
  ],
  Подарки: [
    { label: "Размер", placeholder: "10×15 см" },
    { label: "Цвет", placeholder: "Розовый" },
  ],
  Игрушки: [
    { label: "Высота", placeholder: "25 см" },
    { label: "Цвет", placeholder: "Серый" },
  ],
  Декор: [
    { label: "Размер", placeholder: "15×10 см" },
    { label: "Цвет", placeholder: "" },
  ],
};

const PRODUCTION_TIMES = ["1–3 дня", "3–7 дней", "7–14 дней"];

function ProductFormPage() {
  const [category, setCategory] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [productionTime, setProductionTime] = useState("");

  const availableMaterials = MATERIALS_BY_CATEGORY[category] ?? [];
  const characteristics = CHARACTERISTICS_BY_CATEGORY[category] ?? [];

  const toggleMaterial = (mat: string) =>
    setMaterials((prev) => prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]);

  return (
    <>
      <PageTitle title="Добавить товар" desc="Заполните карточку товара. Обязательно добавьте минимум одно фото процесса изготовления." />
      <div className="grid gap-[20px] xl:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-[20px]">
          <Card>
            <h2 className="mb-[18px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Основная информация</h2>
            <div className="grid gap-[14px] md:grid-cols-2">
              <Field label="Название товара" placeholder="Серьги-тумар с лазуритом" />
              <Field label="Артикул" placeholder="EAR-001" />
              <label>
                <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Категория</span>
                <div className="relative mt-[7px]">
                  <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setMaterials([]); }}
                    className="h-[46px] w-full appearance-none rounded-[14px] bg-[#F5F3ED] px-[14px] pr-[38px] font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none focus:ring-2 focus:ring-[#315350]"
                  >
                    <option value="">Выберите категорию</option>
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6F6A64]" />
                </div>
              </label>
              <Field label="Цена" placeholder="18 500 ₸" />
              <label>
                <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Наличие</span>
                <div className="relative mt-[7px]">
                  <select className="h-[46px] w-full appearance-none rounded-[14px] bg-[#F5F3ED] px-[14px] pr-[38px] font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none focus:ring-2 focus:ring-[#315350]">
                    <option>В наличии</option>
                    <option>Под заказ</option>
                    <option>Нет в наличии</option>
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6F6A64]" />
                </div>
              </label>
              <Field label="Количество" placeholder="10 шт" />
            </div>

            {availableMaterials.length > 0 && (
              <div className="mt-[18px]">
                <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Материал</span>
                <div className="mt-[9px] flex flex-wrap gap-[8px]">
                  {availableMaterials.map((mat) => {
                    const active = materials.includes(mat);
                    return (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => toggleMaterial(mat)}
                        className="rounded-full px-[14px] py-[7px] font-['Manrope',sans-serif] text-[12px] font-bold transition-colors"
                        style={{ background: active ? "#315350" : "#F5F3ED", color: active ? "#fff" : "#172825" }}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-[18px]">
              <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Срок изготовления</span>
              <div className="mt-[9px] flex flex-wrap gap-[8px]">
                {PRODUCTION_TIMES.map((time) => {
                  const active = productionTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setProductionTime(active ? "" : time)}
                      className="rounded-full px-[14px] py-[7px] font-['Manrope',sans-serif] text-[12px] font-bold transition-colors"
                      style={{ background: active ? "#315350" : "#F5F3ED", color: active ? "#fff" : "#172825" }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="mb-[14px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Описание</h2>
            <textarea
              className="min-h-[132px] w-full rounded-[14px] bg-[#F5F3ED] px-[14px] py-[12px] font-['Manrope',sans-serif] text-[13px] outline-none focus:ring-2 focus:ring-[#315350]"
              placeholder="Материалы, процесс изготовления, размеры, уход за изделием"
            />
          </Card>

          {category ? (
            characteristics.length > 0 && (
              <Card>
                <h2 className="mb-[4px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Характеристики</h2>
                <p className="mb-[14px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">Для категории «{category}»</p>
                <div className="grid gap-[14px] md:grid-cols-2">
                  {characteristics.map((char) => <Field key={char.label} label={char.label} placeholder={char.placeholder} />)}
                </div>
              </Card>
            )
          ) : (
            <div className="rounded-[18px] border-2 border-dashed border-[rgba(55,73,87,0.15)] bg-[#F7F6F3] px-[20px] py-[18px]">
              <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">Выберите категорию — появятся характеристики товара</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[20px]">
          <Card>
            <h2 className="mb-[10px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Фото товара</h2>
            <p className="mb-[12px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">До 5 фотографий. Первое фото — главное на карточке.</p>
            <div className="rounded-[20px] border-2 border-dashed border-[rgba(55,73,87,0.18)] bg-[#F7F6F3] px-[20px] py-[28px] text-center">
              <Upload size={26} className="mx-auto text-[#315350]" />
              <p className="mt-[10px] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">Загрузить фото товара</p>
              <p className="mt-[4px] font-['Manrope',sans-serif] text-[11px] text-[#6F6A64]">JPG, PNG до 10 МБ</p>
            </div>
            <div className="mt-[12px] grid grid-cols-5 gap-[8px]">
              {[imgJewelry, imgWorkshop].map((image) => (
                <div key={image} className="relative">
                  <img src={image} alt="" className="aspect-square w-full rounded-[10px] object-cover" />
                  <button type="button" className="absolute right-[3px] top-[3px] flex size-[18px] items-center justify-center rounded-full bg-white/90 text-[#C43D32] shadow">
                    <X size={11} />
                  </button>
                </div>
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-[10px] border-2 border-dashed border-[rgba(55,73,87,0.15)] bg-[#F7F6F3]" />
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-[10px] flex items-center gap-[10px]">
              <h2 className="font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Фото процесса</h2>
              <span className="shrink-0 rounded-full bg-[#FEEDED] px-[10px] py-[4px] font-['Manrope',sans-serif] text-[11px] font-bold text-[#C43D32]">1 обязательно</span>
            </div>
            <p className="mb-[12px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">Руки мастера, инструменты или этапы работы — подтверждает handmade.</p>
            <div className="rounded-[20px] border-2 border-dashed border-[rgba(55,73,87,0.18)] bg-[#F7F6F3] px-[20px] py-[28px] text-center">
              <Camera size={26} className="mx-auto text-[#315350]" />
              <p className="mt-[10px] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">Загрузить фото процесса</p>
              <p className="mt-[4px] font-['Manrope',sans-serif] text-[11px] text-[#6F6A64]">Минимум 1, до 3 фото</p>
            </div>
            <div className="mt-[12px] grid grid-cols-3 gap-[8px]">
              <div className="relative">
                <img src={imgWorkshop} alt="" className="aspect-square w-full rounded-[10px] object-cover" />
                <button type="button" className="absolute right-[3px] top-[3px] flex size-[18px] items-center justify-center rounded-full bg-white/90 text-[#C43D32] shadow">
                  <X size={11} />
                </button>
              </div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-[10px] border-2 border-dashed border-[rgba(55,73,87,0.15)] bg-[#F7F6F3]" />
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-[10px]">
            <button type="button" className="h-[46px] w-full rounded-[14px] border border-[rgba(55,73,87,0.18)] bg-white font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825] hover:border-[#315350]">
              Сохранить черновик
            </button>
            <button type="button" className="h-[46px] w-full rounded-[14px] border border-[rgba(55,73,87,0.18)] bg-white font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825] hover:border-[#315350]">
              Предпросмотр товара
            </button>
            <button type="button" className="h-[50px] w-full rounded-[14px] bg-[#315350] font-['Manrope',sans-serif] text-[14px] font-bold text-white hover:bg-[#3c6460]">
              Отправить на модерацию
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label>
      <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">{label}</span>
      <input className="mt-[7px] h-[46px] w-full rounded-[14px] bg-[#F5F3ED] px-[14px] font-['Manrope',sans-serif] text-[13px] outline-none focus:ring-2 focus:ring-[#315350]" placeholder={placeholder} />
    </label>
  );
}

function OrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const filter = new URLSearchParams(location.search).get("status") ?? "all";
  const tabs = [
    { key: "all", label: "Все", count: 24 },
    { key: "new", label: "Новые", count: 3 },
    { key: "processing", label: "В обработке", count: 5 },
    { key: "shipped", label: "Отправлены", count: 8 },
    { key: "delivered", label: "Доставлены", count: 7 },
    { key: "cancelled", label: "Отменены", count: 1 },
  ];
  const statusByFilter: Record<string, string> = {
    new: "Новый",
    processing: "В обработке",
    shipped: "Отправлен",
    delivered: "Доставлен",
    cancelled: "Отменён",
  };
  const filteredOrders = filter === "all" ? ORDERS : ORDERS.filter((order) => order.status === statusByFilter[filter]);

  return (
    <>
      <PageTitle
        title="Заказы"
        desc={filter === "new" ? "Показаны новые заказы, которые ожидают подтверждения." : filter === "shipped" ? "Показаны отправленные заказы и трек-номера." : "Принимайте заказы, передавайте курьеру, добавляйте трек-номер и обновляйте статусы."}
      />
      <div className="mb-[18px] grid gap-[14px] md:grid-cols-3">
        {[
          { label: "Новые", value: "3", tone: "green" },
          { label: "В обработке", value: "5", tone: "orange" },
          { label: "Отправлены", value: "8", tone: "blue" },
        ].map((item) => (
          <Card key={item.label} className="p-[18px]">
            <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">{item.label}</p>
            <p className="mt-[8px] font-['Manrope',sans-serif] text-[30px] font-black text-[#172825]">{item.value}</p>
          </Card>
        ))}
      </div>
      <div className="mb-[18px] flex gap-[8px] overflow-x-auto pb-[2px]" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.key === "all" ? "/seller/orders" : `/seller/orders?status=${tab.key}`)}
              className="h-[40px] shrink-0 rounded-full px-[15px] font-['Manrope',sans-serif] text-[13px] font-bold transition-colors"
              style={{ background: active ? "#315350" : "#fff", color: active ? "#fff" : "#172825", border: active ? "1px solid #315350" : "1px solid rgba(55,73,87,0.12)" }}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>
      <Toolbar placeholder="Поиск заказа, покупателя, статуса" />
      <Card>
        {filteredOrders.map((order) => (
          <div key={order.id} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 xl:grid-cols-[68px_1fr_120px_150px_320px] xl:items-center">
            <img src={order.image} alt="" className="size-[58px] rounded-[14px] object-cover" />
            <div>
              <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{order.id}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{order.time} · {order.buyer}</p>
              <p className="mt-[3px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#9A650C]">{order.deadline}</p>
            </div>
            <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">{order.price}</p>
            <StatusBadge tone={order.tone}>{order.status}</StatusBadge>
            <OrderRowActions order={order} onDetails={() => navigate(`/seller/orders/${order.id.slice(1)}`)} />
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="py-[42px] text-center">
            <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">Заказов в этом статусе нет</p>
            <p className="mt-[6px] font-['Manrope',sans-serif] text-[13px] text-[#6F6A64]">Выберите другой фильтр или вернитесь ко всем заказам.</p>
          </div>
        )}
      </Card>
    </>
  );
}

function OrderRowActions({ order, onDetails }: { order: typeof ORDERS[number]; onDetails: () => void }) {
  const baseClass = "rounded-[10px] border px-[10px] py-[8px] font-['Manrope',sans-serif] text-[12px] font-bold";
  return (
    <div className="flex flex-wrap gap-[8px] xl:justify-end">
      {order.status === "Новый" && (
        <>
          <button className={`${baseClass} border-[#CDE8D5] text-[#267B49]`}><CheckCircle2 size={13} className="inline" /> Принять</button>
          <button className={`${baseClass} border-[#F2C7C1] text-[#C43D32]`}>Отклонить</button>
        </>
      )}
      {order.status === "В обработке" && (
        <button className={`${baseClass} border-[rgba(55,73,87,0.14)] text-[#172825]`}><Truck size={13} className="inline" /> Передать курьеру</button>
      )}
      {order.status === "Отправлен" && (
        <button className={`${baseClass} border-[rgba(55,73,87,0.14)] text-[#172825]`}>Добавить трек-номер</button>
      )}
      <button onClick={onDetails} className={`${baseClass} border-[rgba(55,73,87,0.14)] text-[#172825]`}>Подробнее</button>
    </div>
  );
}

function OrderDetailPage() {
  const navigate = useNavigate();
  const order = ORDERS[0];
  const orderItems = [
    { title: "Серьги-Тумар с лазуритом", qty: 1, price: "18 500 ₸", image: imgJewelry },
    { title: "Свеча ручной работы", qty: 2, price: "8 400 ₸", image: imgCeramics },
  ];
  const statusDates = [
    { label: "Оплачен", date: "14 июня 2026, 14:20", done: true },
    { label: "Принят продавцом", date: "14 июня 2026, 14:35", done: true },
    { label: "Готовится к отправке", date: "Ожидает", done: false },
    { label: "Передан курьеру", date: "Ожидает", done: false },
    { label: "Доставлен", date: "Ожидает", done: false },
    { label: "SMS-подтверждение покупателя", date: "Ожидает", done: false },
  ];

  return (
    <>
      <PageTitle
        title={`Заказ ${order.id}`}
        desc="Детальная карточка заказа: покупатель, товары, доставка, статусы и выплаты."
        action={<button onClick={() => navigate("/seller/orders")} className="h-[46px] rounded-[14px] border border-[rgba(55,73,87,0.14)] bg-white px-[18px] font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">К списку заказов</button>}
      />
      <div className="grid gap-[20px] xl:grid-cols-[1fr_360px]">
        <div className="grid gap-[20px]">
          <Card>
            <div className="grid gap-[14px] md:grid-cols-3">
              <InfoRow Icon={ClipboardList} label="Создан" value="14 июня 2026, 14:20" />
              <InfoRow Icon={Package} label="Статус" value={order.status} />
              <InfoRow Icon={Wallet} label="Сумма" value="26 900 ₸" />
            </div>
          </Card>

          <Card>
            <div className="mb-[16px] flex items-center justify-between">
              <h2 className="font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Товары в заказе</h2>
              <StatusBadge tone={order.tone}>{order.status}</StatusBadge>
            </div>
            <div className="divide-y divide-[rgba(55,73,87,0.08)]">
              {orderItems.map((item) => (
                <div key={item.title} className="grid grid-cols-[58px_1fr_auto_auto] items-center gap-[14px] py-[12px] first:pt-0">
                  <img src={item.image} alt="" className="size-[58px] rounded-[14px] object-cover" />
                  <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">{item.title}</p>
                  <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">{item.qty} шт</p>
                  <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">{item.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-[12px] flex justify-between rounded-[16px] bg-[#F7F6F3] px-[16px] py-[12px]">
              <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">Итого товаров: 3</span>
              <span className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">26 900 ₸</span>
            </div>
          </Card>

          <Card>
            <h2 className="mb-[16px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Покупатель и доставка</h2>
            <div className="grid gap-[14px] md:grid-cols-2">
              <InfoRow Icon={UserRound} label="Покупатель" value="Алина Рахимова" />
              <InfoRow Icon={Phone} label="Телефон" value="+7 777 120 45 11" />
              <InfoRow Icon={Mail} label="Email" value="alina@mail.kz" />
              <InfoRow Icon={MapPin} label="Адрес" value="Алматы, ул. Абая 25, кв. 10" />
            </div>
            <div className="mt-[18px] rounded-[18px] bg-[#F7F6F3] px-[16px] py-[14px]">
              <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Комментарий покупателя</p>
              <p className="mt-[6px] font-['Manrope',sans-serif] text-[13px] text-[#6F6A64]">Пожалуйста, упакуйте как подарок. Если можно, добавьте открытку.</p>
            </div>
            <div className="mt-[14px] flex flex-wrap gap-[10px]">
              <button className="h-[42px] rounded-[12px] bg-[#315350] px-[16px] font-['Manrope',sans-serif] text-[13px] font-bold text-white"><MessageCircle size={15} className="inline" /> Написать покупателю</button>
              <button className="h-[42px] rounded-[12px] border border-[rgba(55,73,87,0.14)] bg-white px-[16px] font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]"><Phone size={15} className="inline" /> Связаться</button>
            </div>
          </Card>

          <Card>
            <h2 className="mb-[16px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">История статусов</h2>
            {statusDates.map((step, index) => (
              <div key={step.label} className="flex gap-[12px] pb-[14px] last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`flex size-[24px] items-center justify-center rounded-full ${step.done ? "bg-[#315350]" : "bg-[#DDE4E0]"}`}>
                    {step.done && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  {index < 5 && <div className="mt-[4px] h-[22px] w-px bg-[rgba(55,73,87,0.12)]" />}
                </div>
                <div>
                  <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{step.label}</p>
                  <p className="mt-[2px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{step.date}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="grid gap-[20px] self-start">
          <Card>
            <h2 className="mb-[16px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Действия</h2>
            <div className="grid gap-[10px]">
              {order.status === "Новый" && <button className="h-[44px] rounded-[14px] bg-[#315350] font-['Manrope',sans-serif] text-[13px] font-bold text-white">Принять заказ</button>}
              {order.status === "В обработке" && <button className="h-[44px] rounded-[14px] bg-[#315350] font-['Manrope',sans-serif] text-[13px] font-bold text-white">Передать курьеру</button>}
              {order.status === "Отправлен" && <button className="h-[44px] rounded-[14px] bg-[#315350] font-['Manrope',sans-serif] text-[13px] font-bold text-white">Добавить трек-номер</button>}
              {order.status === "Доставлен" && <p className="rounded-[14px] bg-[#F7F6F3] px-[14px] py-[12px] font-['Manrope',sans-serif] text-[13px] text-[#6F6A64]">Действия недоступны: заказ доставлен.</p>}
              <button className="h-[44px] rounded-[14px] border border-[rgba(55,73,87,0.14)] bg-white font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Написать покупателю</button>
              <button className="h-[44px] rounded-[14px] border border-[#F2C7C1] bg-white font-['Manrope',sans-serif] text-[13px] font-bold text-[#C43D32]">Отменить заказ</button>
            </div>
          </Card>

          <Card>
            <h2 className="mb-[16px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Финансы заказа</h2>
            <div className="grid gap-[10px] font-['Manrope',sans-serif] text-[13px]">
              <div className="flex justify-between"><span className="text-[#6F6A64]">Сумма заказа</span><b>26 900 ₸</b></div>
              <div className="flex justify-between"><span className="text-[#6F6A64]">Комиссия Crafty</span><b>-2 690 ₸</b></div>
              <div className="flex justify-between"><span className="text-[#6F6A64]">К выплате</span><b>24 210 ₸</b></div>
              <div className="flex justify-between"><span className="text-[#6F6A64]">Холд</span><b>14 дней после SMS</b></div>
              <div className="flex justify-between"><span className="text-[#6F6A64]">Дата выплаты</span><b>28 июня</b></div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function InfoRow({ Icon, label, value }: { Icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex gap-[10px] rounded-[16px] bg-[#F7F6F3] px-[14px] py-[12px]">
      <Icon size={18} className="mt-[2px] text-[#315350]" />
      <div>
        <p className="font-['Manrope',sans-serif] text-[12px] font-bold text-[#6F6A64]">{label}</p>
        <p className="mt-[3px] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{value}</p>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  reply,
  draft,
  isOpen,
  onOpenReply,
  onChangeDraft,
  onSubmit,
}: {
  review: typeof REVIEWS_FULL[number];
  reply: string;
  draft: string;
  isOpen: boolean;
  onOpenReply: () => void;
  onChangeDraft: (text: string) => void;
  onSubmit: () => void;
}) {
  const toneColor = review.rating >= 4 ? "#FFB800" : review.rating === 3 ? "#C86B11" : "#C43D32";

  return (
    <div className="border-t border-[rgba(55,73,87,0.08)] py-[20px] first:border-t-0">
      <div className="grid grid-cols-[44px_1fr] gap-[14px]">
        <img src={imgAvatar} alt="" className="size-[44px] rounded-full object-cover" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[4px]">
            <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{review.name}, {review.city}</p>
            <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">{review.time}</span>
            {review.hasPhoto && (
              <span className="flex items-center gap-[4px] rounded-full bg-[#EAF6EE] px-[8px] py-[2px] font-['Manrope',sans-serif] text-[10px] font-bold text-[#267B49]">
                <Camera size={10} /> Фото
              </span>
            )}
          </div>

          <div className="mt-[6px] flex items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[3px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill={i < review.rating ? toneColor : "none"} stroke={i < review.rating ? toneColor : "#C8C0B8"} />
              ))}
              <span className="ml-[6px] font-['Manrope',sans-serif] text-[11px] font-bold" style={{ color: toneColor }}>{review.rating}.0</span>
            </div>
            {review.image && <img src={review.image} alt="" className="size-[58px] shrink-0 rounded-[12px] object-cover" />}
          </div>

          <p className="mt-[8px] font-['Manrope',sans-serif] text-[13px] leading-[1.6] text-[#4C4640]">{review.text}</p>

          {reply ? (
            <div className="mt-[12px] rounded-[14px] bg-[#F2F8F4] px-[14px] py-[12px]">
              <p className="mb-[5px] flex items-center gap-[6px] font-['Manrope',sans-serif] text-[11px] font-bold text-[#315350]">
                <MessageCircle size={12} /> Ответ магазина
              </p>
              <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.55] text-[#4C4640]">{reply}</p>
            </div>
          ) : (
            <>
              {!isOpen && (
                <button
                  onClick={onOpenReply}
                  className="mt-[10px] flex items-center gap-[6px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#315350] hover:underline"
                >
                  <MessageCircle size={13} /> Ответить
                </button>
              )}
              {isOpen && (
                <div className="mt-[12px]">
                  <textarea
                    value={draft}
                    onChange={(e) => onChangeDraft(e.target.value)}
                    placeholder="Напишите ответ покупателю..."
                    className="min-h-[80px] w-full resize-none rounded-[14px] bg-[#F5F3ED] px-[14px] py-[10px] font-['Manrope',sans-serif] text-[13px] leading-[1.55] text-[#172825] outline-none focus:ring-2 focus:ring-[#315350]"
                  />
                  <div className="mt-[8px] flex gap-[8px]">
                    <button
                      onClick={onSubmit}
                      disabled={!draft.trim()}
                      className="flex h-[38px] items-center gap-[6px] rounded-[10px] bg-[#315350] px-[16px] font-['Manrope',sans-serif] text-[12px] font-bold text-white disabled:opacity-40"
                    >
                      <Send size={13} /> Отправить ответ
                    </button>
                    <button
                      onClick={onOpenReply}
                      className="h-[38px] rounded-[10px] border border-[rgba(55,73,87,0.14)] px-[14px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825]"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const [replies, setReplies] = useState<Record<string, string>>(
    Object.fromEntries(REVIEWS_FULL.map((r) => [r.id, r.initialReply]))
  );
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [openReply, setOpenReply] = useState<string | null>(null);

  const unanswered = REVIEWS_FULL.filter((r) => !replies[r.id]).length;
  const maxDist = Math.max(...RATING_DIST.map((d) => d.count));

  const filtered = REVIEWS_FULL.filter((r) => {
    if (filter === "no-reply") return !replies[r.id];
    if (filter === "5") return r.rating === 5;
    if (filter === "4") return r.rating === 4;
    if (filter === "bad") return r.rating <= 2;
    if (filter === "photo") return r.hasPhoto;
    return true;
  });

  const submitReply = (id: string) => {
    const text = drafts[id]?.trim();
    if (!text) return;
    setReplies((prev) => ({ ...prev, [id]: text }));
    setDrafts((prev) => ({ ...prev, [id]: "" }));
    setOpenReply(null);
  };

  return (
    <>
      <PageTitle title="Отзывы" desc="Следите за рейтингом магазина и отвечайте покупателям." />

      <div className="grid gap-[18px] xl:grid-cols-[1fr_360px]">
        <div className="grid gap-[18px] md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-[10px]">
              <div className="flex size-[42px] items-center justify-center rounded-[14px] bg-[#FFF6E0]">
                <Star size={20} fill="#FFB800" stroke="#FFB800" />
              </div>
              <div>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">Средний рейтинг</p>
                <p className="font-['Manrope',sans-serif] text-[28px] font-black text-[#172825]">4.9</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-[10px]">
              <div className="flex size-[42px] items-center justify-center rounded-[14px] bg-[#F0F5F4]">
                <MessageCircle size={20} className="text-[#315350]" />
              </div>
              <div>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">Всего отзывов</p>
                <p className="font-['Manrope',sans-serif] text-[28px] font-black text-[#172825]">128</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-[10px]">
              <div className="flex size-[42px] items-center justify-center rounded-[14px]" style={{ background: unanswered > 0 ? "#FFF0D8" : "#F0F5F4" }}>
                <Bell size={20} style={{ color: unanswered > 0 ? "#C86B11" : "#315350" }} />
              </div>
              <div>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">Нужно ответить</p>
                <p className="font-['Manrope',sans-serif] text-[28px] font-black" style={{ color: unanswered > 0 ? "#C86B11" : "#172825" }}>{unanswered}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <p className="mb-[14px] font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">Распределение оценок</p>
          <div className="grid gap-[8px]">
            {RATING_DIST.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-[10px]">
                <div className="flex w-[56px] shrink-0 items-center gap-[2px]">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={10} fill="#FFB800" stroke="#FFB800" />
                  ))}
                </div>
                <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#EDE8E0]">
                  <div
                    className="h-full rounded-full bg-[#FFB800] transition-all"
                    style={{ width: maxDist > 0 ? `${(count / maxDist) * 100}%` : "0%" }}
                  />
                </div>
                <span className="w-[28px] shrink-0 text-right font-['Manrope',sans-serif] text-[11px] font-bold text-[#6F6A64]">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-[20px] flex gap-[8px] overflow-x-auto pb-[2px]" style={{ scrollbarWidth: "none" }}>
        {REVIEW_FILTERS.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="h-[38px] shrink-0 rounded-full px-[15px] font-['Manrope',sans-serif] text-[13px] font-bold transition-colors"
              style={{ background: active ? "#315350" : "#fff", color: active ? "#fff" : "#172825", border: active ? "1px solid #315350" : "1px solid rgba(55,73,87,0.12)" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <Card className="mt-[16px]">
        {filtered.length === 0 ? (
          <div className="py-[36px] text-center font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">
            По этому фильтру отзывов не найдено
          </div>
        ) : (
          filtered.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              reply={replies[review.id] ?? ""}
              draft={drafts[review.id] ?? ""}
              isOpen={openReply === review.id}
              onOpenReply={() => setOpenReply(openReply === review.id ? null : review.id)}
              onChangeDraft={(text) => setDrafts((prev) => ({ ...prev, [review.id]: text }))}
              onSubmit={() => submitReply(review.id)}
            />
          ))
        )}
      </Card>
    </>
  );
}

function MessagesPage() {
  return (
    <>
      <PageTitle title="Сообщения" desc="Мессенджер с покупателями: вопросы по товарам, срокам и индивидуальным заказам." />
      <div className="grid gap-[20px] xl:grid-cols-[360px_1fr]">
        <Card className="p-0">
          {MESSAGES.map((message) => (
            <button key={message.name} className="flex w-full items-start gap-[12px] border-t border-[rgba(55,73,87,0.08)] px-[18px] py-[16px] text-left first:border-t-0">
              <img src={imgAvatar} alt="" className="size-[42px] rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between"><p className="font-bold">{message.name}</p><span className="text-[11px] text-[#6F6A64]">{message.time}</span></div>
                <p className="mt-[4px] text-[12px] text-[#6F6A64]">{message.text}</p>
              </div>
              {message.unread && <span className="mt-[4px] size-[8px] rounded-full bg-[#315350]" />}
            </button>
          ))}
        </Card>
        <Card>
          <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">Алина</p>
          <div className="mt-[18px] min-h-[260px] rounded-[18px] bg-[#F7F6F3] p-[18px]">
            <p className="max-w-[420px] rounded-[16px] bg-white px-[14px] py-[10px] text-[13px]">Здравствуйте! Можно сделать серьги чуть длиннее?</p>
            <p className="ml-auto mt-[12px] max-w-[420px] rounded-[16px] bg-[#315350] px-[14px] py-[10px] text-[13px] text-white">Да, можно. Уточните желаемую длину в сантиметрах.</p>
          </div>
          <div className="mt-[14px] flex gap-[10px]"><input className="h-[46px] flex-1 rounded-[14px] bg-[#F5F3ED] px-[14px] outline-none" placeholder="Написать сообщение" /><button className="flex h-[46px] w-[52px] items-center justify-center rounded-[14px] bg-[#315350] text-white"><Send size={18} /></button></div>
        </Card>
      </div>
    </>
  );
}

function FinancePage() {
  return (
    <>
      <PageTitle title="Финансы" desc="Баланс, холд 14 дней, комиссия Crafty и история выплат." />
      <div className="grid gap-[18px] md:grid-cols-3">
        <Card><Banknote className="text-[#315350]" /><p className="mt-[18px] text-[13px] text-[#6F6A64]">Доступно к выводу</p><p className="mt-[8px] text-[30px] font-black">420 000 ₸</p></Card>
        <Card><Clock className="text-[#B47A24]" /><p className="mt-[18px] text-[13px] text-[#6F6A64]">В 14-дневном холде</p><p className="mt-[8px] text-[30px] font-black">180 000 ₸</p></Card>
        <Card><Wallet className="text-[#7B64D8]" /><p className="mt-[18px] text-[13px] text-[#6F6A64]">Комиссия за месяц</p><p className="mt-[8px] text-[30px] font-black">62 250 ₸</p></Card>
      </div>
      <Card className="mt-[20px]">
        {TRANSACTIONS.map((tx) => <div key={tx.id} className="grid gap-[12px] border-t border-[rgba(55,73,87,0.08)] py-[14px] first:border-t-0 md:grid-cols-[110px_1fr_150px_160px]"><b>{tx.id}</b><span>{tx.type}</span><b>{tx.amount}</b><StatusBadge tone={tx.status === "Выплачено" ? "green" : "orange"}>{tx.status}</StatusBadge></div>)}
        <button className="mt-[16px] h-[46px] rounded-[14px] bg-[#315350] px-[22px] font-bold text-white">Запросить выплату</button>
      </Card>
    </>
  );
}

function ShopPage() {
  return (
    <>
      <PageTitle title="Мой магазин" desc="Публичный профиль продавца: обложка, аватар, описание, контакты и регион." />
      <div className="grid gap-[20px] xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="relative h-[220px] overflow-hidden rounded-[22px] bg-[#F0F5F4]"><img src={imgWorkshop} alt="" className="h-full w-full object-cover" /><button className="absolute right-[14px] top-[14px] rounded-[12px] bg-white px-[12px] py-[8px] text-[12px] font-bold"><Camera size={14} className="inline" /> Сменить обложку</button></div>
          <img src={imgAvatar} alt="" className="mx-auto -mt-[44px] size-[88px] rounded-full border-4 border-white object-cover" />
          <p className="mt-[12px] text-center text-[20px] font-black">Айгерим Handmade</p>
          <p className="mt-[6px] text-center text-[13px] text-[#6F6A64]">Украшения ручной работы из Алматы</p>
          <button className="mt-[18px] h-[46px] w-full rounded-[14px] bg-[#315350] font-bold text-white">Открыть публичную страницу</button>
        </Card>
        <Card>
          <h2 className="mb-[18px] text-[20px] font-black">Данные магазина</h2>
          <div className="grid gap-[14px] md:grid-cols-2">
            <Field label="Название магазина" placeholder="Айгерим Handmade" />
            <Field label="Регион" placeholder="Алматы" />
            <Field label="Телефон" placeholder="+7 701 540 19 20" />
            <Field label="Email" placeholder="shop@crafty.kz" />
          </div>
          <label className="mt-[14px] block"><span className="text-[13px] font-bold">Описание</span><textarea className="mt-[7px] min-h-[132px] w-full rounded-[14px] bg-[#F5F3ED] px-[14px] py-[12px] outline-none" placeholder="Расскажите о мастерской, материалах и процессе" /></label>
          <button className="mt-[18px] h-[46px] rounded-[14px] bg-[#315350] px-[22px] font-bold text-white">Сохранить магазин</button>
        </Card>
      </div>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <PageTitle title="Настройки магазина" desc="Реквизиты выплат, доставка, уведомления и верификация handmade." />
      <div className="grid gap-[20px] xl:grid-cols-2">
        <Card><h2 className="mb-[18px] text-[20px] font-black">Реквизиты для выплат</h2><div className="grid gap-[14px]"><Field label="IBAN / счёт" placeholder="KZ..." /><Field label="Банк" placeholder="Kaspi Bank" /><Field label="ИИН / БИН" placeholder="000000000000" /></div><button className="mt-[18px] h-[46px] rounded-[14px] bg-[#315350] px-[22px] font-bold text-white">Сохранить реквизиты</button></Card>
        <Card><h2 className="mb-[18px] text-[20px] font-black">Доставка и уведомления</h2><div className="space-y-[12px]">{["KazPost", "CDEK", "Собственный курьер Crafty", "Email о новых заказах", "SMS о срочных изменениях"].map((item) => <label key={item} className="flex items-center justify-between rounded-[14px] bg-[#F7F6F3] px-[14px] py-[12px]"><span className="font-bold">{item}</span><input type="checkbox" defaultChecked /></label>)}</div></Card>
        <Card className="xl:col-span-2"><h2 className="mb-[18px] text-[20px] font-black">Верификация handmade</h2><div className="grid gap-[14px] md:grid-cols-3">{["Фото мастера за работой", "Фото материалов", "Видео 30-60 секунд"].map((item) => <div key={item} className="rounded-[18px] border-2 border-dashed border-[rgba(55,73,87,0.18)] p-[22px] text-center"><ImageIcon className="mx-auto text-[#315350]" /><p className="mt-[10px] text-[13px] font-bold">{item}</p></div>)}</div></Card>
      </div>
    </>
  );
}

function ProfileProgress() {
  const items = [
    { label: "Аватар", done: true },
    { label: "Описание", done: true },
    { label: "Телефон", done: true },
    { label: "Баннер магазина", done: false },
    { label: "Политика доставки", done: false },
  ];

  return (
    <div className="mt-[32px] rounded-[22px] bg-white px-[24px] py-[20px] shadow-[0_12px_34px_rgba(49,83,80,0.05)]">
      <div className="flex flex-col gap-[18px] md:flex-row md:items-center">
        <div className="flex items-center gap-[16px] md:flex-1">
          <div className="flex size-[44px] items-center justify-center rounded-[14px] bg-[#EAF6EE]">
            <ShieldCheck size={24} className="text-[#315350]" />
          </div>
          <div>
            <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">Заполните профиль магазина на 100%</p>
            <p className="mt-[3px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">Заполненный профиль вызывает больше доверия у покупателей</p>
          </div>
        </div>
        <div className="flex items-center gap-[14px] md:w-[250px]">
          <span className="font-['Manrope',sans-serif] text-[16px] font-black text-[#315350]">80%</span>
          <div className="h-[4px] flex-1 rounded-full bg-[#DDE4E0]">
            <div className="h-full w-[80%] rounded-full bg-[#315350]" />
          </div>
        </div>
        <button className="h-[44px] rounded-[12px] border border-[rgba(55,73,87,0.1)] px-[22px] font-['Manrope',sans-serif] text-[12px] font-black text-[#172825] hover:border-[#315350]">
          Заполнить профиль
        </button>
        <button className="hidden text-[#172825] md:block" aria-label="Закрыть"><X size={20} /></button>
      </div>
      <div className="mt-[18px] grid gap-[10px] sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-[8px] rounded-[12px] bg-[#F7F6F3] px-[12px] py-[10px]">
            {item.done ? <CheckCircle2 size={15} className="text-[#315350]" /> : <div className="size-[15px] rounded-[4px] border border-[#B8B0A8]" />}
            <span className="font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SUPPORT_TOPICS = [
  {
    Icon: ShieldAlert,
    title: "Товар на модерации",
    desc: "Почему товар не прошёл, сколько ждать, как исправить",
    color: "#C86B11",
    bg: "#FFF6E0",
    category: "moderation",
  },
  {
    Icon: CreditCard,
    title: "Выплаты и финансы",
    desc: "Задержка выплаты, холд, вопросы по комиссии",
    color: "#2867B2",
    bg: "#EAF2FF",
    category: "payment",
  },
  {
    Icon: ShieldCheck,
    title: "Спор с покупателем",
    desc: "Покупатель открыл спор, требует возврат или жалуется",
    color: "#C43D32",
    bg: "#FFF3F1",
    category: "dispute",
  },
  {
    Icon: PackageX,
    title: "Проблема с доставкой",
    desc: "Посылка потерялась, повреждена или не дошла вовремя",
    color: "#315350",
    bg: "#F0F5F4",
    category: "delivery",
  },
];

const SUPPORT_CATEGORIES = [
  { value: "moderation", label: "Модерация товара" },
  { value: "payment", label: "Выплаты и финансы" },
  { value: "dispute", label: "Спор с покупателем" },
  { value: "delivery", label: "Доставка" },
  { value: "other", label: "Другое" },
];

const SUPPORT_TICKETS = [
  { id: "TK-441", category: "Модерация товара", subject: "Керамический чайник не прошёл модерацию", status: "В работе", date: "Сегодня", tone: "orange" },
  { id: "TK-398", category: "Выплаты", subject: "Выплата за май не поступила", status: "Решён", date: "5 июня", tone: "green" },
  { id: "TK-377", category: "Доставка", subject: "Посылка KZ123456789 потерялась", status: "Ожидает ответа", date: "1 июня", tone: "blue" },
];

function SupportPage() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [prefillCategory, setPrefillCategory] = useState("");

  const handleTopicClick = (cat: string) => {
    setPrefillCategory(cat);
    setCategory(cat);
    document.getElementById("support-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (!category || !subject.trim() || !message.trim()) return;
    setSent(true);
    setSubject("");
    setMessage("");
    setCategory("");
    setPrefillCategory("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <PageTitle
        title="Поддержка"
        desc="Задайте вопрос команде Crafty — мы отвечаем в течение 24 часов."
        action={
          <div className="flex items-center gap-[10px] rounded-[16px] bg-[#F0F5F4] px-[16px] py-[10px]">
            <Headphones size={18} className="text-[#315350]" />
            <div>
              <p className="font-['Manrope',sans-serif] text-[12px] font-black text-[#172825]">Время ответа</p>
              <p className="font-['Manrope',sans-serif] text-[11px] text-[#6F6A64]">до 24 часов</p>
            </div>
          </div>
        }
      />

      {/* Quick topic cards */}
      <div className="grid gap-[14px] sm:grid-cols-2 xl:grid-cols-4">
        {SUPPORT_TOPICS.map(({ Icon, title, desc, color, bg, category: cat }) => (
          <button
            key={cat}
            onClick={() => handleTopicClick(cat)}
            className="flex flex-col gap-[12px] rounded-[20px] p-[18px] text-left transition-transform hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(49,83,80,0.08)]"
            style={{ background: bg }}
          >
            <div className="flex size-[42px] items-center justify-center rounded-[14px] bg-white">
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">{title}</p>
              <p className="mt-[4px] font-['Manrope',sans-serif] text-[12px] leading-[1.5] text-[#6F6A64]">{desc}</p>
            </div>
            <div className="mt-auto flex items-center gap-[4px] font-['Manrope',sans-serif] text-[12px] font-bold" style={{ color }}>
              Написать <ChevronRight size={13} />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-[28px] grid gap-[24px] xl:grid-cols-[1fr_380px]">
        {/* New ticket form */}
        <Card id="support-form">
          <h2 className="mb-[18px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Новый запрос</h2>

          {sent && (
            <div className="mb-[16px] flex items-center gap-[10px] rounded-[14px] bg-[#EAF6EE] px-[16px] py-[12px]">
              <CheckCircle2 size={18} className="text-[#267B49]" />
              <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#267B49]">Запрос отправлен! Мы ответим в течение 24 часов.</p>
            </div>
          )}

          <div className="grid gap-[14px]">
            <label>
              <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Тема обращения</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-[7px] h-[46px] w-full rounded-[14px] bg-[#F5F3ED] px-[14px] font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none focus:ring-2 focus:ring-[#315350]"
              >
                <option value="">Выберите тему...</option>
                {SUPPORT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Заголовок</span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Кратко опишите проблему"
                className="mt-[7px] h-[46px] w-full rounded-[14px] bg-[#F5F3ED] px-[14px] font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none focus:ring-2 focus:ring-[#315350]"
              />
            </label>

            <label>
              <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">Сообщение</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Подробно опишите ситуацию: номер заказа, товар, что произошло..."
                className="mt-[7px] min-h-[130px] w-full resize-none rounded-[14px] bg-[#F5F3ED] px-[14px] py-[12px] font-['Manrope',sans-serif] text-[13px] leading-[1.6] text-[#172825] outline-none focus:ring-2 focus:ring-[#315350]"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-[12px]">
              <button className="flex h-[42px] items-center gap-[8px] rounded-[12px] border border-[rgba(55,73,87,0.14)] bg-white px-[14px] font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">
                <Paperclip size={15} /> Прикрепить файл
              </button>
              <button
                onClick={handleSubmit}
                disabled={!category || !subject.trim() || !message.trim()}
                className="flex h-[46px] items-center gap-[8px] rounded-[14px] bg-[#315350] px-[22px] font-['Manrope',sans-serif] text-[13px] font-bold text-white disabled:opacity-40 hover:bg-[#3c6460]"
              >
                <Send size={15} /> Отправить запрос
              </button>
            </div>
          </div>
        </Card>

        {/* Ticket history */}
        <div className="grid gap-[20px] self-start">
          <Card>
            <h2 className="mb-[16px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Мои обращения</h2>
            <div className="grid gap-[10px]">
              {SUPPORT_TICKETS.map((ticket) => (
                <div key={ticket.id} className="rounded-[16px] bg-[#F7F6F3] px-[14px] py-[12px]">
                  <div className="flex items-start justify-between gap-[8px]">
                    <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825] leading-[1.4]">{ticket.subject}</p>
                    <StatusBadge tone={ticket.tone}>{ticket.status}</StatusBadge>
                  </div>
                  <div className="mt-[6px] flex items-center gap-[10px]">
                    <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">{ticket.id}</span>
                    <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">·</span>
                    <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">{ticket.category}</span>
                    <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">·</span>
                    <span className="font-['Manrope',sans-serif] text-[11px] text-[#8A8178]">{ticket.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-[14px] font-['Manrope',sans-serif] text-[16px] font-black text-[#172825]">Частые вопросы</h2>
            <div className="grid gap-[8px]">
              {[
                "Когда будет выплата за мои заказы?",
                "Как добавить трек-номер к заказу?",
                "Почему мой товар скрыт после модерации?",
                "Как изменить реквизиты для выплат?",
                "Сколько стоит комиссия Crafty?",
              ].map((q) => (
                <button key={q} className="flex items-center justify-between gap-[8px] rounded-[12px] bg-[#F7F6F3] px-[12px] py-[10px] text-left transition-colors hover:bg-[#EEF0EC]">
                  <span className="font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825]">{q}</span>
                  <ChevronRight size={14} className="shrink-0 text-[#8A8178]" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export function SellerDashboardPage() {
  const location = useLocation();
  const section = sectionFromPath(location.pathname);

  const content = useMemo(() => {
    if (section === "products") return <ProductsPage />;
    if (section === "new-product") return <ProductFormPage />;
    if (section === "orders") return <OrdersPage />;
    if (section === "order-detail") return <OrderDetailPage />;
    if (section === "reviews") return <ReviewsPage />;
    if (section === "messages") return <MessagesPage />;
    if (section === "finance") return <FinancePage />;
    if (section === "shop") return <ShopPage />;
    if (section === "settings") return <SettingsPage />;
    if (section === "support") return <SupportPage />;
    return <SellerDashboardContent />;
  }, [section]);

  return (
    <div className="min-h-screen bg-[#FBFAF7]">
      <Sidebar section={section} />
      <main className="xl:pl-[280px]">
        <Header />
        <div className="px-[24px] py-[40px] lg:px-[34px] xl:px-[40px]">
          {content}
        </div>
      </main>
    </div>
  );
}
