import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  BarChart3, Bell, BookOpen, Boxes, CheckCircle2, ChevronDown, Edit3,
  ExternalLink, FileText, Flag, Home, Image, LayoutDashboard, ListFilter,
  Lock, Menu, PackageCheck, Plus, Search, Settings2, ShieldCheck, ShoppingBag,
  Store, Truck, UserRound, Users, Wallet, XCircle,
} from "lucide-react";
import imgLogo from "../../imports/Главная1/dc67fbdd930fca6bb6a68a7e5753725209c1c5f6.png";
import imgAvatar from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import imgProduct from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgBanner from "../../imports/Главная1/1b40a139f3b92da83ffa01b78146295961abad51.png";

type AdminSection =
  | "dashboard"
  | "users"
  | "shops"
  | "products"
  | "orders"
  | "categories"
  | "banners"
  | "blog"
  | "finance";

const ADMIN_NAV: { key: AdminSection; label: string; path: string; Icon: React.ElementType; count?: number }[] = [
  { key: "dashboard", label: "Дашборд", path: "/admin/dashboard", Icon: LayoutDashboard },
  { key: "users", label: "Пользователи", path: "/admin/users", Icon: Users },
  { key: "shops", label: "Магазины", path: "/admin/shops", Icon: Store, count: 4 },
  { key: "products", label: "Модерация товаров", path: "/admin/products", Icon: ShoppingBag, count: 12 },
  { key: "orders", label: "Заказы и логистика", path: "/admin/orders", Icon: Truck },
  { key: "categories", label: "Категории", path: "/admin/categories", Icon: Boxes },
  { key: "banners", label: "Баннеры главной", path: "/admin/banners", Icon: Image },
  { key: "blog", label: "Блог / Контент", path: "/admin/blog", Icon: BookOpen },
  { key: "finance", label: "Финансы", path: "/admin/finance", Icon: Wallet, count: 3 },
];

const DASHBOARD_STATS = [
  { label: "GMV за месяц", value: "12.8 млн ₸", hint: "+18% к прошлому месяцу", Icon: BarChart3, color: "#315350" },
  { label: "Активные пользователи", value: "8 420", hint: "+540 за неделю", Icon: Users, color: "#5B6ACF" },
  { label: "Заказы сегодня", value: "186", hint: "32 ожидают курьера", Icon: PackageCheck, color: "#C66A1D" },
  { label: "Средний чек", value: "18 900 ₸", hint: "+6.4% за 30 дней", Icon: Wallet, color: "#267B49" },
];

const USERS = [
  { name: "Алина Рахимова", role: "Покупатель", phone: "+7 777 120 45 11", email: "alina@mail.kz", status: "Активен", orders: 8 },
  { name: "Айгерим Handmade", role: "Продавец", phone: "+7 701 540 19 20", email: "shop@crafty.kz", status: "Активен", orders: 42 },
  { name: "Мадина Керамика", role: "Продавец", phone: "+7 702 300 91 10", email: "madina@mail.kz", status: "Проверка", orders: 14 },
  { name: "Нурлан Е.", role: "Покупатель", phone: "+7 747 011 31 88", email: "nurlan@mail.kz", status: "Заблокирован", orders: 2 },
];

const SHOPS = [
  { name: "Айгерим Handmade", city: "Алматы", owner: "Айгерим С.", status: "Активный", products: 48, sales: "1 245 000 ₸" },
  { name: "Clay & Home", city: "Кокшетау", owner: "Мадина К.", status: "Ожидает одобрения", products: 12, sales: "0 ₸" },
  { name: "Atameken Felt", city: "Петропавловск", owner: "Нуржан А.", status: "Активный", products: 33, sales: "780 000 ₸" },
  { name: "Digital Ornament", city: "Астана", owner: "Рустем Д.", status: "Заблокирован", products: 21, sales: "120 000 ₸" },
];

const PRODUCTS = [
  { title: "Серьги-тумар с лазуритом", shop: "Айгерим Handmade", category: "Украшения", status: "На модерации", reason: "Нужно фото процесса" },
  { title: "Керамический чайник «Шыны»", shop: "Clay & Home", category: "Керамика", status: "На модерации", reason: "Новый товар" },
  { title: "Сырмак настенный", shop: "Atameken Felt", category: "Казахское handmade", status: "Одобрен", reason: "Проверено" },
  { title: "Пак орнаментов SVG", shop: "Digital Ornament", category: "Цифровые товары", status: "Флаг", reason: "Похожие изображения" },
];

const ORDERS = [
  { id: "#12543", buyer: "Алина Р.", shop: "Айгерим Handmade", amount: "18 500 ₸", status: "Принят", delivery: "Назначить курьера" },
  { id: "#12542", buyer: "Мадина Н.", shop: "Clay & Home", amount: "27 900 ₸", status: "В пути", delivery: "Курьер Аман" },
  { id: "#12541", buyer: "Нурсултан Т.", shop: "Atameken Felt", amount: "14 800 ₸", status: "Доставлен", delivery: "SMS ожидает" },
  { id: "#12540", buyer: "Айжан К.", shop: "Айгерим Handmade", amount: "9 500 ₸", status: "Завершён", delivery: "Закрыт" },
];

const CATEGORIES = [
  { name: "Казахское handmade", slug: "kazakh-handmade", products: 128, order: 1 },
  { name: "Украшения", slug: "ukrasheniya", products: 245, order: 2 },
  { name: "Керамика и глина", slug: "ceramics", products: 84, order: 3 },
  { name: "Свечи и ароматы", slug: "sveci", products: 76, order: 4 },
];

const BANNERS = [
  { title: "Летние подарки ручной работы", placement: "Главная hero", status: "Активен", image: imgBanner },
  { title: "Новые мастера Петропавловска", placement: "Популярные категории", status: "Черновик", image: imgProduct },
];

const BLOG = [
  { title: "Как выбрать подарок ручной работы", type: "Статья", status: "Опубликовано", date: "12 июня 2026" },
  { title: "История сырмака: традиция и современность", type: "Статья", status: "Черновик", date: "10 июня 2026" },
  { title: "Советы мастерам по фото товаров", type: "Советы", status: "Запланировано", date: "18 июня 2026" },
];

const PAYOUTS = [
  { shop: "Айгерим Handmade", amount: "420 000 ₸", status: "Ожидает выплаты", hold: "14 дней прошли" },
  { shop: "Atameken Felt", amount: "180 000 ₸", status: "В обработке", hold: "Заявка создана" },
  { shop: "Clay & Home", amount: "95 000 ₸", status: "Холд", hold: "9 дней осталось" },
];

function sectionFromPath(pathname: string): AdminSection {
  const found = ADMIN_NAV.find((item) => pathname.startsWith(item.path));
  return found?.key ?? "dashboard";
}

function statusTone(status: string) {
  if (["Активен", "Активный", "Одобрен", "Опубликовано", "Завершён"].includes(status)) return { bg: "#EAF6EE", color: "#267B49" };
  if (["Ожидает одобрения", "На модерации", "В обработке", "Проверка", "Запланировано"].includes(status)) return { bg: "#FFF0D8", color: "#C86B11" };
  if (["Заблокирован", "Флаг"].includes(status)) return { bg: "#FDECEC", color: "#C43D32" };
  if (["Доставлен", "В пути", "Принят", "Активен"].includes(status)) return { bg: "#EAF2FF", color: "#2867B2" };
  return { bg: "#F1F3F1", color: "#5F6862" };
}

function Badge({ children }: { children: string }) {
  const tone = statusTone(children);
  return <span className="rounded-full px-[12px] py-[6px] font-['Manrope',sans-serif] text-[12px] font-bold" style={{ background: tone.bg, color: tone.color }}>{children}</span>;
}

function AdminSidebar({ section }: { section: AdminSection }) {
  const navigate = useNavigate();

  return (
    <aside className="hidden xl:flex fixed left-0 top-0 h-screen w-[292px] flex-col border-r border-[rgba(55,73,87,0.1)] bg-white px-[28px] py-[28px]">
      <button onClick={() => navigate("/")} className="mb-[36px] flex items-center">
        <img src={imgLogo} alt="Crafty.kz" className="h-[42px] w-[140px] object-contain object-left" />
      </button>
      <div className="mb-[18px] rounded-[18px] bg-[#F3F8F5] px-[16px] py-[14px]">
        <p className="font-['Manrope',sans-serif] text-[12px] font-bold uppercase tracking-[0.08em] text-[#315350]">Администратор</p>
        <p className="mt-[4px] font-['Manrope',sans-serif] text-[13px] text-[#6F6A64]">Полный доступ к платформе</p>
      </div>
      <nav className="flex flex-col gap-[7px]">
        {ADMIN_NAV.map(({ key, label, path, Icon, count }) => {
          const active = key === section;
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="flex min-h-[50px] items-center justify-between rounded-[14px] px-[15px] text-left font-['Manrope',sans-serif] text-[13px] font-bold transition-all"
              style={{
                background: active ? "linear-gradient(135deg, #315350, #11604f)" : "transparent",
                color: active ? "#fff" : "#172825",
                boxShadow: active ? "0 12px 26px rgba(49,83,80,0.22)" : "none",
              }}
            >
              <span className="flex items-center gap-[12px]">
                <Icon size={17} />
                {label}
              </span>
              {count && <span className="flex h-[23px] min-w-[23px] items-center justify-center rounded-full bg-white/85 px-[7px] text-[11px] text-[#315350]">{count}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function AdminHeader({ title, onAction }: { title: string; onAction: (message: string) => void }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-[88px] border-b border-[rgba(55,73,87,0.1)] bg-white/92 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-[24px] lg:px-[36px]">
        <div className="flex items-center gap-[18px]">
          <button className="flex size-[36px] items-center justify-center rounded-full hover:bg-[#F4F6F3]" aria-label="Открыть меню">
            <Menu size={20} />
          </button>
          <div>
            <p className="font-['Manrope',sans-serif] text-[13px] text-[#6F6A64]">Crafty.kz Admin</p>
            <h1 className="font-['Manrope',sans-serif] text-[22px] font-black text-[#172825]">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-[14px]">
          <button onClick={() => onAction("Открыта панель уведомлений")} className="relative flex size-[38px] items-center justify-center rounded-full border border-[rgba(55,73,87,0.12)] bg-white">
            <Bell size={18} />
            <span className="absolute -right-[2px] -top-[4px] flex size-[16px] items-center justify-center rounded-full bg-[#E53935] text-[9px] font-bold text-white">7</span>
          </button>
          <button onClick={() => navigate("/")} className="hidden h-[38px] items-center gap-[8px] rounded-[12px] border border-[rgba(55,73,87,0.12)] bg-white px-[14px] font-['Manrope',sans-serif] text-[12px] font-bold text-[#172825] md:flex">
            <Home size={15} />
            На сайт
          </button>
          <div className="flex items-center gap-[10px]">
            <img src={imgAvatar} alt="Admin" className="size-[40px] rounded-full object-cover" />
            <div className="hidden sm:block">
              <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">Админ Crafty</p>
              <p className="font-['Manrope',sans-serif] text-[11px] text-[#6F6A64]">Super admin</p>
            </div>
            <ChevronDown size={17} />
          </div>
        </div>
      </div>
    </header>
  );
}

function Toolbar({ placeholder, onAction }: { placeholder: string; onAction: (message: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-[20px] flex flex-col gap-[12px] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex h-[44px] max-w-[420px] flex-1 items-center gap-[10px] rounded-[14px] bg-white px-[14px] shadow-[0_10px_28px_rgba(49,83,80,0.05)]">
        <Search size={17} className="text-[#92887D]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="h-full flex-1 bg-transparent font-['Manrope',sans-serif] text-[13px] text-[#172825] outline-none placeholder:text-[#92887D]" />
      </div>
      <div className="flex flex-wrap gap-[10px]">
        <button onClick={() => onAction("Фильтр применён")} className="flex h-[44px] items-center gap-[8px] rounded-[14px] border border-[rgba(55,73,87,0.12)] bg-white px-[14px] font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">
          <ListFilter size={16} />
          Фильтр
        </button>
        <button onClick={() => onAction("Открыта форма создания")} className="flex h-[44px] items-center gap-[8px] rounded-[14px] bg-[#315350] px-[16px] font-['Manrope',sans-serif] text-[13px] font-bold text-white">
          <Plus size={16} />
          Добавить
        </button>
      </div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[24px] border border-[rgba(55,73,87,0.08)] bg-white p-[22px] shadow-[0_12px_34px_rgba(49,83,80,0.04)] ${className}`}>{children}</section>;
}

function ActionButton({ children, onClick, tone = "default" }: { children: React.ReactNode; onClick: () => void; tone?: "default" | "danger" | "success" }) {
  const styles = {
    default: "border-[rgba(55,73,87,0.14)] text-[#172825] hover:border-[#315350]",
    danger: "border-[#F2C7C1] text-[#C43D32] hover:border-[#C43D32]",
    success: "border-[#CDE8D5] text-[#267B49] hover:border-[#267B49]",
  };
  return <button onClick={onClick} className={`rounded-[10px] border bg-white px-[11px] py-[8px] font-['Manrope',sans-serif] text-[12px] font-bold ${styles[tone]}`}>{children}</button>;
}

function DashboardPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map(({ label, value, hint, Icon, color }) => (
          <SectionCard key={label}>
            <div className="mb-[26px] flex size-[48px] items-center justify-center rounded-[15px]" style={{ background: `${color}14` }}>
              <Icon size={23} style={{ color }} />
            </div>
            <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#6F6A64]">{label}</p>
            <p className="mt-[10px] font-['Manrope',sans-serif] text-[28px] font-black text-[#111]">{value}</p>
            <p className="mt-[12px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{hint}</p>
          </SectionCard>
        ))}
      </div>
      <div className="mt-[24px] grid gap-[20px] xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard>
          <div className="mb-[18px] flex items-center justify-between">
            <h2 className="font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Операционная очередь</h2>
            <ActionButton onClick={() => onAction("Открыт общий список задач")}>Все задачи</ActionButton>
          </div>
          {[
            ["4 заявки магазинов ждут проверки", "Проверить магазины", "shops"],
            ["12 товаров на модерации", "Открыть модерацию", "products"],
            ["32 заказа без назначенного курьера", "Назначить курьера", "orders"],
            ["3 выплаты ожидают подтверждения", "Проверить выплаты", "finance"],
          ].map(([title, button, key]) => (
            <div key={title} className="flex items-center justify-between border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0">
              <p className="font-['Manrope',sans-serif] text-[14px] font-bold text-[#172825]">{title}</p>
              <ActionButton onClick={() => onAction(`${button}: /admin/${key}`)}>{button}</ActionButton>
            </div>
          ))}
        </SectionCard>
        <SectionCard>
          <h2 className="mb-[18px] font-['Manrope',sans-serif] text-[20px] font-black text-[#172825]">Модерация доверия</h2>
          {["Случайная проверка 6 магазинов", "2 жалобы на листинги", "1 совпадение фото у разных продавцов"].map((item) => (
            <div key={item} className="mb-[12px] flex items-center gap-[12px] rounded-[16px] bg-[#F7FAF8] px-[14px] py-[13px]">
              <ShieldCheck size={18} className="text-[#315350]" />
              <span className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">{item}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </>
  );
}

function UsersPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск по имени, телефону, email" onAction={onAction} />
      <SectionCard>
        {USERS.map((user) => (
          <div key={user.email} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 md:grid-cols-[1fr_130px_150px_230px] md:items-center">
            <div className="flex items-center gap-[12px]">
              <div className="flex size-[44px] items-center justify-center rounded-full bg-[#F0F5F4]"><UserRound size={20} className="text-[#315350]" /></div>
              <div>
                <p className="font-['Manrope',sans-serif] text-[14px] font-black text-[#172825]">{user.name}</p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{user.phone} · {user.email}</p>
              </div>
            </div>
            <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">{user.role}</p>
            <Badge>{user.status}</Badge>
            <div className="flex gap-[8px] md:justify-end">
              <ActionButton onClick={() => onAction(`Открыта история заказов: ${user.name}`)}>История</ActionButton>
              <ActionButton tone={user.status === "Заблокирован" ? "success" : "danger"} onClick={() => onAction(`${user.status === "Заблокирован" ? "Разблокирован" : "Заблокирован"} пользователь: ${user.name}`)}>
                {user.status === "Заблокирован" ? "Разблокировать" : "Блокировать"}
              </ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function ShopsPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск магазина, владельца, города" onAction={onAction} />
      <SectionCard>
        {SHOPS.map((shop) => (
          <div key={shop.name} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 lg:grid-cols-[1fr_150px_160px_260px] lg:items-center">
            <div>
              <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{shop.name}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{shop.owner} · {shop.city} · {shop.products} товаров</p>
            </div>
            <Badge>{shop.status}</Badge>
            <p className="font-['Manrope',sans-serif] text-[13px] font-black text-[#172825]">{shop.sales}</p>
            <div className="flex flex-wrap gap-[8px] lg:justify-end">
              <ActionButton tone="success" onClick={() => onAction(`Магазин одобрен: ${shop.name}`)}><CheckCircle2 size={13} className="inline" /> Одобрить</ActionButton>
              <ActionButton tone="danger" onClick={() => onAction(`Магазин отклонён/заблокирован: ${shop.name}`)}><XCircle size={13} className="inline" /> Отклонить</ActionButton>
              <ActionButton onClick={() => onAction(`Открыт магазин: ${shop.name}`)}><ExternalLink size={13} className="inline" /> Открыть</ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function ProductsPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск товара, магазина, категории" onAction={onAction} />
      <SectionCard>
        {PRODUCTS.map((product) => (
          <div key={product.title} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 lg:grid-cols-[64px_1fr_140px_290px] lg:items-center">
            <img src={imgProduct} alt="" className="size-[56px] rounded-[14px] object-cover" />
            <div>
              <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{product.title}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{product.shop} · {product.category} · {product.reason}</p>
            </div>
            <Badge>{product.status}</Badge>
            <div className="flex flex-wrap gap-[8px] lg:justify-end">
              <ActionButton tone="success" onClick={() => onAction(`Товар одобрен: ${product.title}`)}>Одобрить</ActionButton>
              <ActionButton tone="danger" onClick={() => onAction(`Товар отклонён: ${product.title}`)}>Отклонить</ActionButton>
              <ActionButton onClick={() => onAction(`Создан флаг модерации: ${product.title}`)}><Flag size={13} className="inline" /> Флаг</ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function OrdersPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск заказа, покупателя, продавца" onAction={onAction} />
      <SectionCard>
        {ORDERS.map((order) => (
          <div key={order.id} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 lg:grid-cols-[110px_1fr_150px_260px] lg:items-center">
            <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{order.id}</p>
            <div>
              <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">{order.buyer} → {order.shop}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{order.amount} · {order.delivery}</p>
            </div>
            <Badge>{order.status}</Badge>
            <div className="flex flex-wrap gap-[8px] lg:justify-end">
              <ActionButton onClick={() => onAction(`Курьер назначен для заказа ${order.id}`)}>Назначить курьера</ActionButton>
              <ActionButton tone="success" onClick={() => onAction(`Статус доставки обновлён: ${order.id}`)}>Обновить статус</ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function CategoriesPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск категории" onAction={onAction} />
      <SectionCard>
        {CATEGORIES.map((category) => (
          <div key={category.slug} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 md:grid-cols-[80px_1fr_130px_190px] md:items-center">
            <p className="font-['Manrope',sans-serif] text-[20px] font-black text-[#315350]">#{category.order}</p>
            <div>
              <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{category.name}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">/{category.slug}</p>
            </div>
            <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">{category.products} товаров</p>
            <div className="flex gap-[8px] md:justify-end">
              <ActionButton onClick={() => onAction(`Редактирование категории: ${category.name}`)}><Edit3 size={13} className="inline" /> Изменить</ActionButton>
              <ActionButton tone="danger" onClick={() => onAction(`Категория удалена: ${category.name}`)}>Удалить</ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function BannersPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск баннера" onAction={onAction} />
      <div className="grid gap-[18px] md:grid-cols-2">
        {BANNERS.map((banner) => (
          <SectionCard key={banner.title}>
            <img src={banner.image} alt="" className="mb-[16px] h-[180px] w-full rounded-[18px] object-cover" />
            <div className="flex items-start justify-between gap-[12px]">
              <div>
                <p className="font-['Manrope',sans-serif] text-[16px] font-black text-[#172825]">{banner.title}</p>
                <p className="mt-[4px] font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{banner.placement}</p>
              </div>
              <Badge>{banner.status}</Badge>
            </div>
            <div className="mt-[16px] flex gap-[8px]">
              <ActionButton onClick={() => onAction(`Редактирование баннера: ${banner.title}`)}>Изменить</ActionButton>
              <ActionButton tone="danger" onClick={() => onAction(`Баннер удалён: ${banner.title}`)}>Удалить</ActionButton>
            </div>
          </SectionCard>
        ))}
      </div>
    </>
  );
}

function BlogPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск статьи, новости, производителя" onAction={onAction} />
      <SectionCard>
        {BLOG.map((post) => (
          <div key={post.title} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 md:grid-cols-[1fr_130px_150px_190px] md:items-center">
            <div className="flex items-center gap-[12px]">
              <div className="flex size-[44px] items-center justify-center rounded-[14px] bg-[#F0F5F4]"><FileText size={20} className="text-[#315350]" /></div>
              <div>
                <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{post.title}</p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{post.date}</p>
              </div>
            </div>
            <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#172825]">{post.type}</p>
            <Badge>{post.status}</Badge>
            <div className="flex gap-[8px] md:justify-end">
              <ActionButton onClick={() => onAction(`Редактирование публикации: ${post.title}`)}>Изменить</ActionButton>
              <ActionButton tone="success" onClick={() => onAction(`Публикация опубликована: ${post.title}`)}>Опубликовать</ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function FinancePage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <Toolbar placeholder="Поиск выплаты, магазина, транзакции" onAction={onAction} />
      <SectionCard>
        {PAYOUTS.map((payout) => (
          <div key={payout.shop} className="grid gap-[14px] border-t border-[rgba(55,73,87,0.08)] py-[16px] first:border-t-0 md:grid-cols-[1fr_160px_150px_230px] md:items-center">
            <div>
              <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{payout.shop}</p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#6F6A64]">{payout.hold}</p>
            </div>
            <p className="font-['Manrope',sans-serif] text-[15px] font-black text-[#172825]">{payout.amount}</p>
            <Badge>{payout.status}</Badge>
            <div className="flex gap-[8px] md:justify-end">
              <ActionButton tone="success" onClick={() => onAction(`Выплата подтверждена: ${payout.shop}`)}>Подтвердить</ActionButton>
              <ActionButton onClick={() => onAction(`Открыта история транзакций: ${payout.shop}`)}>История</ActionButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

export function AdminDashboardPage() {
  const location = useLocation();
  const section = sectionFromPath(location.pathname);
  const active = ADMIN_NAV.find((item) => item.key === section) ?? ADMIN_NAV[0];
  const [toast, setToast] = useState("Админка готова к работе");

  const content = useMemo(() => {
    const props = { onAction: setToast };
    if (section === "users") return <UsersPage {...props} />;
    if (section === "shops") return <ShopsPage {...props} />;
    if (section === "products") return <ProductsPage {...props} />;
    if (section === "orders") return <OrdersPage {...props} />;
    if (section === "categories") return <CategoriesPage {...props} />;
    if (section === "banners") return <BannersPage {...props} />;
    if (section === "blog") return <BlogPage {...props} />;
    if (section === "finance") return <FinancePage {...props} />;
    return <DashboardPage {...props} />;
  }, [section]);

  return (
    <div className="min-h-screen bg-[#FBFAF7]">
      <AdminSidebar section={section} />
      <main className="xl:pl-[292px]">
        <AdminHeader title={active.label} onAction={setToast} />
        <div className="px-[24px] py-[28px] lg:px-[36px]">
          <div className="mb-[20px] flex items-center gap-[10px] rounded-[16px] border border-[rgba(49,83,80,0.14)] bg-[#F2F8F4] px-[16px] py-[12px]">
            <ShieldCheck size={18} className="text-[#315350]" />
            <p className="font-['Manrope',sans-serif] text-[13px] font-bold text-[#315350]">{toast}</p>
          </div>
          {content}
        </div>
      </main>
    </div>
  );
}
