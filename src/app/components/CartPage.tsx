import { useNavigate } from "react-router";
import { Minus, Plus, ShoppingBag, ArrowRight, BadgeCheck, Star, Truck, Shield, RotateCcw, HeadphonesIcon } from "lucide-react";
import { useCart, CartItem } from "../context/CartContext";
import { PageBreadcrumb } from "./PageBreadcrumb";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";

const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₸";

// ── Mock recommendations ──────────────────────────────────────────────────────

const RECS = [
  { id: "r1", name: "Серьги с лазуритом «Тумар»",    price: 12600, img: imgImage8, master: "Silver Breeze" },
  { id: "r2", name: "Керамическая ваза «Этника»",     price: 16800, img: imgCat2,   master: "Clay & Home" },
  { id: "r3", name: "Свеча «Ваниль и сандал»",        price: 3400,  img: imgCat4,   master: "Candle Studio" },
  { id: "r4", name: "Панно из войлока «Казахстан»",   price: 32000, img: imgCat3,   master: "NurCraft" },
  { id: "r5", name: "Деревянная лошадь",              price: 8200,  img: imgCat5,   master: "WoodCraft" },
];

// ── Trust strip ───────────────────────────────────────────────────────────────

const TRUST = [
  { Icon: Truck,           label: "Доставка",         desc: "По всему Казахстану" },
  { Icon: Shield,          label: "Безопасная оплата", desc: "Защита данных" },
  { Icon: RotateCcw,       label: "Возврат товара",   desc: "В течение 14 дней" },
  { Icon: HeadphonesIcon,  label: "Поддержка 24/7",   desc: "Всегда на связи" },
];

// ── Avatar initials ───────────────────────────────────────────────────────────

const AVATAR_COLORS = ["#ebf5eb", "#fff3ec", "#fff8e8", "#eef6f5", "#eef2fe"];

function MasterAvatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div
      className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 font-['Manrope',sans-serif] font-bold text-[14px] text-[#315350]"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

// ── Master group ──────────────────────────────────────────────────────────────

function MasterGroup({ master, items }: { master: string; items: CartItem[] }) {
  const navigate = useNavigate();
  const { removeFromCart, updateQty } = useCart();

  return (
    <div className="bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] overflow-hidden">
      {/* Master header */}
      <div className="flex items-center gap-[12px] px-[22px] py-[16px] border-b border-[rgba(55,73,87,0.07)]">
        <MasterAvatar name={master} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[8px] flex-wrap">
            <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-black">{master}</p>
            <div className="flex items-center gap-[4px] px-[7px] py-[3px] rounded-full border bg-[#ebf5eb] border-[rgba(30,107,30,0.2)]">
              <BadgeCheck size={10} className="text-[#1e6b1e]" />
              <span className="font-['Manrope',sans-serif] font-semibold text-[10px] text-[#1e6b1e]">Проверен Crafty</span>
            </div>
          </div>
          <div className="flex items-center gap-[4px] mt-[3px]">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={11} fill={s <= 4 ? "#FFC633" : "none"} stroke={s <= 4 ? "#FFC633" : "#d8d0c8"} strokeWidth={1.5} />
            ))}
            <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] ml-[3px]">4.8 · 127 отзывов</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/masters")}
          className="font-['Manrope',sans-serif] font-medium text-[12px] text-[#315350] hover:underline whitespace-nowrap shrink-0"
        >
          Перейти в магазин →
        </button>
      </div>

      {/* Products */}
      <div className="divide-y divide-[rgba(55,73,87,0.06)]">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-[16px] px-[22px] py-[18px]">
            {/* Image */}
            <div className="w-[80px] h-[80px] rounded-[14px] overflow-hidden bg-[#f5f3ed] shrink-0">
              {item.img
                ? <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={20} className="text-[#c8c0b8]" /></div>
              }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-['Manrope',sans-serif] font-bold text-[15px] text-black leading-snug mb-[4px] line-clamp-2">
                {item.title}
              </p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mb-[12px]">
                Ручная работа · Казахстан
              </p>
              <p className="font-['Manrope',sans-serif] font-bold text-[17px] text-black">
                {fmt(item.price * item.qty)}
              </p>
              {item.qty > 1 && (
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">
                  {fmt(item.price)} / шт.
                </p>
              )}
            </div>

            {/* Qty + delete */}
            <div className="flex flex-col items-end gap-[12px] shrink-0">
              <div className="flex items-center gap-[0px] border border-[rgba(55,73,87,0.16)] rounded-full overflow-hidden h-[34px]">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-[34px] h-full flex items-center justify-center hover:bg-[#f5f3ed] transition-colors"
                >
                  <Minus size={12} className="text-[#374957]" />
                </button>
                <span className="w-[28px] text-center font-['Manrope',sans-serif] font-semibold text-[13px] text-black">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-[34px] h-full flex items-center justify-center hover:bg-[#f5f3ed] transition-colors"
                >
                  <Plus size={12} className="text-[#374957]" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] hover:text-[#ef4444] transition-colors"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function CartPage() {
  const navigate = useNavigate();
  const { items, total, addToCart } = useCart();

  // Group items by master
  const groups = items.reduce<Record<string, CartItem[]>>((acc, item) => {
    const key = item.master || "Другой мастер";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="bg-[#fbfbf8] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-[32px] lg:px-[48px] py-[36px]">
          <PageBreadcrumb items={[{ label: "Главная", path: "/" }, { label: "Корзина" }]} />
          <div className="flex flex-col items-center justify-center py-[100px] text-center">
            <div className="w-[80px] h-[80px] bg-[#f5f3ed] rounded-full flex items-center justify-center mb-[24px]">
              <ShoppingBag size={36} className="text-[#c8c0b8]" />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[28px] text-black mb-[12px]">
              Корзина пуста
            </p>
            <p className="font-['Manrope',sans-serif] text-[14px] text-[#92887d] mb-[32px] max-w-[360px] leading-[1.7]">
              Добавьте товары из каталога, чтобы оформить заказ
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="h-[50px] px-[32px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#3c6460] transition-colors flex items-center gap-[8px]"
            >
              <ShoppingBag size={16} />
              В каталог
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[32px] lg:px-[48px] py-[36px]">
        <PageBreadcrumb items={[{ label: "Главная", path: "/" }, { label: "Корзина" }]} />

        {/* Title */}
        <div className="flex items-baseline gap-[10px] mb-[24px]">
          <p style={{ fontFamily: "'Playfair Display', serif" }}
            className="font-bold text-[32px] text-black">
            Корзина
          </p>
          <p className="font-['Manrope',sans-serif] text-[16px] text-[#92887d]">
            ({itemCount} {itemCount === 1 ? "товар" : itemCount < 5 ? "товара" : "товаров"})
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">

          {/* Left: master groups + trust */}
          <div className="flex flex-col gap-[16px]">

            {/* Master groups */}
            {Object.entries(groups).map(([master, masterItems]) => (
              <MasterGroup key={master} master={master} items={masterItems} />
            ))}

            {/* Trust strip */}
            <div className="bg-white rounded-[20px] border border-[rgba(55,73,87,0.08)] px-[22px] py-[16px]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
                {TRUST.map(({ Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-[10px]">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#f5f3ed] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#315350]" />
                    </div>
                    <div>
                      <p className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957]">{label}</p>
                      <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: summary */}
          <div className="bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] p-[24px] lg:sticky lg:top-[100px]">
            <p style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[20px] text-black mb-[20px]">
              Оформление заказа
            </p>

            <div className="flex flex-col gap-[12px] mb-[16px]">
              <div className="flex items-center justify-between">
                <span className="font-['Manrope',sans-serif] text-[14px] text-[#92887d]">
                  Товары ({itemCount} {itemCount === 1 ? "товар" : itemCount < 5 ? "товара" : "товаров"})
                </span>
                <span className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">
                  {fmt(total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Manrope',sans-serif] text-[14px] text-[#92887d]">Доставка</span>
                <span className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] italic">рассчитывается</span>
              </div>
            </div>

            <div className="h-px bg-[rgba(55,73,87,0.08)] mb-[16px]" />

            <div className="flex items-center justify-between mb-[22px]">
              <span className="font-['Manrope',sans-serif] font-bold text-[16px] text-black">Итого</span>
              <span className="font-['Manrope',sans-serif] font-bold text-[24px] text-[#315350]">{fmt(total)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full h-[52px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#3c6460] transition-colors flex items-center justify-center gap-[8px] mb-[14px]"
            >
              Оформить заказ
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-center gap-[6px] mb-[16px]">
              <Shield size={13} className="text-[#92887d]" />
              <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">Безопасная оплата</span>
            </div>

            <div className="h-px bg-[rgba(55,73,87,0.08)] mb-[14px]" />

            <div className="flex flex-col gap-[8px]">
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] flex items-start gap-[6px]">
                <BadgeCheck size={13} className="text-[#315350] shrink-0 mt-[1px]" />
                Все товары ручной работы Crafty.kz
              </p>
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] flex items-start gap-[6px]">
                <RotateCcw size={13} className="text-[#315350] shrink-0 mt-[1px]" />
                Безопасные возвраты и поддержка
              </p>
            </div>
          </div>

        </div>

        {/* Recommendations */}
        <div className="mt-[40px]">
          <div className="flex items-center justify-between mb-[20px]">
            <p style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[24px] text-black">
              Вам также может понравиться
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#315350] hover:underline"
            >
              Смотреть всё →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[14px]">
            {RECS.map((rec) => (
              <div key={rec.id} className="flex flex-col group cursor-pointer" onClick={() => navigate("/catalog")}>
                <div className="w-full aspect-square bg-[#f5f3ed] rounded-[18px] overflow-hidden mb-[10px] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-shadow">
                  <img src={rec.img} alt={rec.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                </div>
                <p className="font-['Manrope',sans-serif] font-semibold text-[13px] text-black leading-snug mb-[4px] line-clamp-2">{rec.name}</p>
                <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mb-[4px]">{rec.master}</p>
                <p className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#315350] mb-[8px]">{fmt(rec.price)}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ id: rec.id, title: rec.name, price: rec.price, img: rec.img, master: rec.master });
                  }}
                  className="mt-auto w-full h-[34px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-medium text-[12px] hover:bg-[#3c6460] transition-colors"
                >
                  В корзину
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
