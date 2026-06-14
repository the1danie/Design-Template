import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Package, CreditCard, MapPin, Smartphone, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PageBreadcrumb } from "./PageBreadcrumb";

const CITIES = ["Алматы", "Астана", "Шымкент", "Караганда", "Тараз", "Павлодар", "Актобе", "Атырау"];

type DeliveryMethod = "kazpost" | "cdek" | "courier" | "pickup";
type PaymentMethod = "kaspi" | "card";

const DELIVERY_OPTIONS: { id: DeliveryMethod; label: string; desc: string; price: number }[] = [
  { id: "kazpost", label: "Казпочта",   desc: "3–7 рабочих дней",   price: 1500 },
  { id: "cdek",    label: "CDEK",       desc: "2–4 рабочих дня",    price: 2500 },
  { id: "courier", label: "Курьер",     desc: "1–2 рабочих дня",    price: 3500 },
  { id: "pickup",  label: "Самовывоз",  desc: "Пункт мастера",      price: 0 },
];

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; desc: string }[] = [
  { id: "kaspi", label: "Kaspi Pay",      desc: "Оплата через Kaspi" },
  { id: "card",  label: "Банковская карта", desc: "Visa, Mastercard, Мир" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957]">{children}</label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <div className="flex flex-col gap-[6px]">
      <FieldLabel>{label}</FieldLabel>
      <input
        {...rest}
        className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-[#374957] placeholder:text-[#b0a89e] outline-none focus:ring-2 focus:ring-[#315350] transition"
      />
    </div>
  );
}

function CitySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[6px]">
      <FieldLabel>Город</FieldLabel>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-left flex items-center justify-between outline-none focus:ring-2 focus:ring-[#315350] transition"
          style={{ color: value ? "#374957" : "#b0a89e" }}
        >
          {value || "Выберите город"}
          <ChevronDown size={14} className={`text-[#92887d] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-[4px] w-full bg-white rounded-[14px] border border-[rgba(55,73,87,0.1)] shadow-xl z-20 py-[4px] max-h-[200px] overflow-y-auto">
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { onChange(c); setOpen(false); }}
                className="w-full text-left px-[16px] py-[10px] font-['Manrope',sans-serif] text-[13px] hover:bg-[#f5f3ed] transition-colors"
                style={{ color: value === c ? "#315350" : "#374957", fontWeight: value === c ? 600 : 400 }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RadioCard<T extends string>({
  id, label, desc, extra, selected, onSelect,
}: { id: T; label: string; desc: string; extra?: string; selected: boolean; onSelect: (id: T) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className="flex items-center gap-[14px] px-[16px] py-[14px] rounded-[16px] border-[1.5px] transition-all text-left w-full"
      style={{
        borderColor: selected ? "#315350" : "rgba(55,73,87,0.14)",
        background: selected ? "#f0f5f4" : "#fff",
      }}
    >
      <div
        className="w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center shrink-0 transition-all"
        style={{ borderColor: selected ? "#315350" : "#d0c8bf" }}
      >
        {selected && <div className="w-[8px] h-[8px] rounded-full bg-[#315350]" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-['Manrope',sans-serif] font-semibold text-[14px]" style={{ color: selected ? "#315350" : "#374957" }}>
          {label}
        </p>
        <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[2px]">{desc}</p>
      </div>
      {extra && (
        <span className="font-['Manrope',sans-serif] font-bold text-[14px] shrink-0" style={{ color: selected ? "#315350" : "#374957" }}>
          {extra}
        </span>
      )}
    </button>
  );
}

function SectionCard({ icon: Icon, title, children }: {
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] px-[28px] py-[24px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <div className="w-[34px] h-[34px] bg-[#ebf5eb] rounded-full flex items-center justify-center shrink-0">
          <Icon size={16} className="text-[#315350]" />
        </div>
        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[18px] text-[#374957]">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

const DEMO_CODE = "1234";

function OtpModal({ phone, onConfirm, onClose }: { phone: string; onConfirm: () => void; onClose: () => void }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [checking, setChecking] = useState(false);

  const r0 = useRef<HTMLInputElement>(null);
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const refs = [r0, r1, r2, r3];

  // Autofocus first box on mount
  useEffect(() => { r0.current?.focus(); }, []);

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  function checkCode(code: string[]) {
    const entered = code.join("");
    if (entered === DEMO_CODE) {
      setChecking(true);
      setTimeout(() => onConfirm(), 400); // brief green flash
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
      if (i < 3) {
        refs[i + 1].current?.focus();
      } else {
        checkCode(next);
      }
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
    if (pasted.length === 4) {
      checkCode(next);
    } else {
      refs[Math.min(pasted.length, 3)].current?.focus();
    }
  }

  function handleResend() {
    if (!canResend) return;
    setCanResend(false);
    setSecondsLeft(59);
    setDigits(["", "", "", ""]);
    setError(false);
    r0.current?.focus();
  }

  const displayPhone = phone
    ? phone.replace(/[^\d+]/g, "").replace(/^(\+?7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/, "+7 ($2) $3-$4-$5")
    : "+7 (___) ___-__-__";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-[16px]"
      style={{ background: "rgba(0,0,0,0.52)" }}
    >
      <div className="bg-white rounded-[28px] w-full max-w-[360px] p-[36px] shadow-[0_28px_64px_rgba(0,0,0,0.24)] flex flex-col items-center text-center">

        {/* Icon */}
        <div className="w-[66px] h-[66px] bg-[#e8f0fe] rounded-full flex items-center justify-center mb-[20px]">
          <Smartphone size={30} className="text-[#1d5abf]" />
        </div>

        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[22px] text-black mb-[8px]">
          Введите код из SMS
        </p>
        <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7] mb-[28px]">
          Код отправлен на номер<br />
          <span className="font-semibold text-[#374957]">{displayPhone}</span>
        </p>

        {/* 4 digit boxes */}
        <div className="flex gap-[10px] mb-[12px]" onPaste={handlePaste}>
          {digits.map((d, i) => {
            const filled = d !== "";
            const borderColor = checking
              ? "#22c55e"
              : error
              ? "#dc2626"
              : filled
              ? "#315350"
              : "rgba(55,73,87,0.2)";
            const bg = checking
              ? "#f0fdf4"
              : error
              ? "#fef2f2"
              : filled
              ? "#eef7ee"
              : "#f8f7f4";
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

        {/* Error */}
        {error && (
          <p className="font-['Manrope',sans-serif] text-[12px] text-[#dc2626] mb-[4px]">
            Неверный код. Попробуйте ещё раз.
          </p>
        )}

        {/* Resend timer */}
        <div className="h-[28px] flex items-center justify-center mb-[20px]">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#315350] hover:underline"
            >
              Отправить код повторно
            </button>
          ) : (
            <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">
              Повторно через{" "}
              <span className="font-semibold text-[#374957]">{secondsLeft} сек</span>
            </p>
          )}
        </div>

        {/* Demo hint */}
        <div className="bg-[#f8f7f4] rounded-[10px] px-[14px] py-[8px] mb-[20px]">
          <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">
            Демо-код: <span className="font-bold text-[#374957] tracking-widest">1234</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] hover:text-[#374957] transition-colors"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const isOrdering = useRef(false);

  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", address: "" });
  const [delivery, setDelivery] = useState<DeliveryMethod>("kazpost");
  const [payment, setPayment] = useState<PaymentMethod>("kaspi");

  const deliveryPrice = DELIVERY_OPTIONS.find((o) => o.id === delivery)?.price ?? 0;
  const orderTotal = total + deliveryPrice;
  const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₸";

  const canOrder = form.name.trim() && form.phone.trim() && form.city && form.address.trim();

  function handleOrder() {
    if (!canOrder) return;
    isOrdering.current = true;
    clearCart();
    navigate("/order-success");
  }

  if (items.length === 0 && !isOrdering.current) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-[32px] lg:px-[48px] py-[36px]">
        <PageBreadcrumb items={[
          { label: "Главная", path: "/" },
          { label: "Корзина", path: "/cart" },
          { label: "Оформление заказа" },
        ]} />

        <p style={{ fontFamily: "'Playfair Display', serif" }}
          className="font-bold text-[32px] text-black mb-[28px]">
          Оформление заказа
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">

          {/* Left: form */}
          <div className="flex flex-col gap-[16px]">

            {/* Contacts */}
            <SectionCard icon={User} title="Контактные данные">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                <TextInput label="Имя и фамилия" placeholder="Айгерим Сейткали" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextInput label="Телефон" placeholder="+7 (777) 000-00-00" type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="mt-[12px]">
                <TextInput label="Email (для чека)" placeholder="example@mail.com" type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </SectionCard>

            {/* Address */}
            <SectionCard icon={MapPin} title="Адрес доставки">
              <div className="flex flex-col gap-[12px]">
                <CitySelect value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                <TextInput label="Улица, дом, квартира" placeholder="ул. Абая 25, кв. 10" value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
            </SectionCard>

            {/* Delivery */}
            <SectionCard icon={Package} title="Способ доставки">
              <div className="flex flex-col gap-[10px]">
                {DELIVERY_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    desc={opt.desc}
                    extra={opt.price === 0 ? "Бесплатно" : fmt(opt.price)}
                    selected={delivery === opt.id}
                    onSelect={setDelivery}
                  />
                ))}
              </div>
            </SectionCard>

            {/* Payment */}
            <SectionCard icon={CreditCard} title="Способ оплаты">
              <div className="flex flex-col gap-[10px]">
                {PAYMENT_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    desc={opt.desc}
                    selected={payment === opt.id}
                    onSelect={setPayment}
                  />
                ))}
              </div>
            </SectionCard>

          </div>

          {/* Right: order summary (sticky) */}
          <div className="bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] p-[24px] lg:sticky lg:top-[100px]">
            <p style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[20px] text-black mb-[20px]">
              Ваш заказ
            </p>

            {/* Items */}
            <div className="flex flex-col gap-[12px] mb-[20px]">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-[12px]">
                  <div className="w-[52px] h-[52px] rounded-[10px] overflow-hidden bg-[#f5f3ed] shrink-0">
                    {item.img
                      ? <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-[#f5f3ed]" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Manrope',sans-serif] font-semibold text-[12px] text-[#374957] line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    <p className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] mt-[2px]">
                      × {item.qty}
                    </p>
                  </div>
                  <span className="font-['Manrope',sans-serif] font-bold text-[13px] text-[#374957] shrink-0">
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-[rgba(55,73,87,0.08)] mb-[16px]" />

            <div className="flex flex-col gap-[10px] mb-[20px]">
              <div className="flex justify-between">
                <span className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">Товары</span>
                <span className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957]">{fmt(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">Доставка</span>
                <span className="font-['Manrope',sans-serif] font-semibold text-[13px] text-[#374957]">
                  {deliveryPrice === 0 ? "Бесплатно" : fmt(deliveryPrice)}
                </span>
              </div>
            </div>

            <div className="h-px bg-[rgba(55,73,87,0.08)] mb-[20px]" />

            <div className="flex justify-between mb-[24px]">
              <span className="font-['Manrope',sans-serif] font-bold text-[16px] text-black">Итого</span>
              <span className="font-['Manrope',sans-serif] font-bold text-[22px] text-[#315350]">{fmt(orderTotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleOrder}
              className="w-full h-[54px] rounded-full font-['Manrope',sans-serif] font-semibold text-[16px] text-white transition-all"
              style={{ background: canOrder ? "#315350" : "#c8c0b8", cursor: canOrder ? "pointer" : "not-allowed" }}
            >
              Оплатить {fmt(orderTotal)}
            </button>

            {!canOrder && (
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] text-center mt-[10px]">
                Заполните имя, телефон и адрес
              </p>
            )}

            <p className="font-['Manrope',sans-serif] text-[11px] text-[#b0a89e] text-center mt-[14px] leading-[1.6]">
              Нажимая «Оплатить», вы соглашаетесь с условиями оферты
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
