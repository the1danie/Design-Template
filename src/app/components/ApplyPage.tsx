import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Store, Upload, X, CheckCircle2, Instagram, Send, Music,
  ChevronDown, Image as ImageIcon, CheckCircle, Clock, Sparkles, ShoppingBag,
  Users, Banknote, BadgeCheck,
} from "lucide-react";
import { PageBreadcrumb } from "./PageBreadcrumb";

const CATEGORIES = [
  { id: "ceramics",    label: "Керамика" },
  { id: "jewelry",     label: "Украшения" },
  { id: "textiles",    label: "Текстиль" },
  { id: "accessories", label: "Аксессуары" },
  { id: "decor",       label: "Декор и живопись" },
  { id: "candles",     label: "Свечи и ароматика" },
  { id: "toys",        label: "Игрушки" },
  { id: "leather",     label: "Кожаные изделия" },
  { id: "other",       label: "Прочее" },
];

const CITIES = ["Алматы", "Астана", "Шымкент", "Караганда", "Тараз", "Павлодар", "Актобе", "Атырау"];
const COUNTRIES = ["Казахстан", "Россия", "Кыргызстан", "Узбекистан"];

const PROCESS_STEPS = [
  { icon: Store,       label: "Отправка заявки",       desc: "Заполните форму и нажмите «Отправить»" },
  { icon: Clock,       label: "Проверка 3–5 дней",      desc: "Мы проверим информацию о вас и товарах" },
  { icon: CheckCircle, label: "Одобрение",              desc: "Вы получите письмо с доступом к кабинету" },
  { icon: ShoppingBag, label: "Добавление товаров",     desc: "Опубликуйте первые работы и начните продавать" },
];

const PERKS = [
  { icon: Users,      text: "Тысячи покупателей" },
  { icon: BadgeCheck, text: "Продажи по всему Казахстану" },
  { icon: Sparkles,   text: "Поддержка мастеров 24/7" },
  { icon: Banknote,   text: "Безопасные и быстрые выплаты" },
];

type FormData = {
  firstName: string; lastName: string; phone: string; email: string;
  shopName: string; description: string; city: string; country: string;
  categories: string[]; photos: File[];
  instagram: string; tiktok: string; telegram: string;
  agreed: boolean; handmade: boolean;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] px-[28px] py-[24px] ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'Playfair Display', serif" }}
      className="font-bold text-[18px] text-[#374957] mb-[16px]">
      {children}
    </p>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957]">
      {children}
    </label>
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

function SelectDropdown({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[6px]">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-left flex items-center justify-between outline-none focus:ring-2 focus:ring-[#315350] transition"
          style={{ color: value ? "#374957" : "#b0a89e" }}
        >
          {value || `Выберите ${label.toLowerCase()}`}
          <ChevronDown size={14} className={`text-[#92887d] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-[4px] w-full bg-white rounded-[14px] border border-[rgba(55,73,87,0.1)] shadow-xl z-20 py-[4px] max-h-[200px] overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-[16px] py-[10px] font-['Manrope',sans-serif] text-[13px] hover:bg-[#f5f3ed] transition-colors"
                style={{ color: value === opt ? "#315350" : "#374957", fontWeight: value === opt ? 600 : 400 }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SocialInput({
  icon, placeholder, value, onChange,
}: { icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center h-[48px] bg-[#f5f3ed] rounded-[14px] overflow-hidden">
      <div className="w-[44px] flex items-center justify-center text-[#92887d] shrink-0">{icon}</div>
      <div className="w-px h-[24px] bg-[rgba(55,73,87,0.14)]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-full px-[14px] bg-transparent font-['Manrope',sans-serif] text-[14px] text-[#374957] placeholder:text-[#b0a89e] outline-none"
      />
    </div>
  );
}

function Checkmark() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxRow({
  checked, onChange, children,
}: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-[12px] cursor-pointer">
      <button
        type="button"
        onClick={onChange}
        className="w-[20px] h-[20px] rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 mt-[1px] transition-all"
        style={{ borderColor: checked ? "#315350" : "#d0c8bf", background: checked ? "#315350" : "#fff" }}
      >
        {checked && <Checkmark />}
      </button>
      <span className="font-['Manrope',sans-serif] text-[13px] text-[#374957] leading-[1.6]">{children}</span>
    </label>
  );
}

// ── Info blocks ───────────────────────────────────────────────────────────────

function ProcessCard() {
  return (
    <Card>
      <SectionTitle>Как проходит проверка?</SectionTitle>
      <div className="flex flex-col gap-[16px]">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-start gap-[12px]">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-[36px] h-[36px] rounded-full bg-[#ebf5eb] flex items-center justify-center">
                  <Icon size={16} className="text-[#315350]" />
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="w-px flex-1 min-h-[16px] mt-[4px] bg-[rgba(49,83,80,0.15)]" />
                )}
              </div>
              <div className="pb-[4px]">
                <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">{step.label}</p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] mt-[2px] leading-[1.5]">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function PerksCard() {
  return (
    <Card>
      <SectionTitle>Почему Crafty?</SectionTitle>
      <div className="flex flex-col gap-[12px]">
        {PERKS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] rounded-full bg-[#ebf5eb] flex items-center justify-center shrink-0">
              <Icon size={14} className="text-[#315350]" />
            </div>
            <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957]">{text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ email }: { email: string }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fbfbf8] min-h-screen flex items-center justify-center px-[24px]">
      <div className="flex flex-col items-center text-center max-w-[460px]">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 280 }}
          className="w-[84px] h-[84px] bg-[#ebf5eb] rounded-full flex items-center justify-center mb-[24px]"
        >
          <CheckCircle2 size={42} className="text-[#315350]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <p style={{ fontFamily: "'Playfair Display', serif" }}
            className="font-bold text-[30px] text-black mb-[12px]">
            Заявка отправлена!
          </p>
          <p className="font-['Manrope',sans-serif] text-[14px] text-[#92887d] leading-[1.7] mb-[32px]">
            Мы получили вашу заявку и рассмотрим её в течение 3–5 рабочих дней.
            Ответ придёт на <span className="text-[#374957] font-medium">{email}</span>.
          </p>
          <div className="flex items-center gap-[12px] justify-center">
            <button
              onClick={() => navigate("/masters")}
              className="h-[50px] px-[28px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#3c6460] transition-colors"
            >
              К мастерам
            </button>
            <button
              onClick={() => navigate("/")}
              className="h-[50px] px-[28px] border border-[rgba(55,73,87,0.18)] text-[#374957] rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:border-[#315350] transition-colors"
            >
              На главную
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function ApplyPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", phone: "", email: "",
    shopName: "", description: "", city: "", country: "Казахстан",
    categories: [], photos: [],
    instagram: "", tiktok: "", telegram: "",
    agreed: false, handmade: false,
  });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleCategory = (id: string) =>
    set("categories", form.categories.includes(id)
      ? form.categories.filter((c) => c !== id)
      : [...form.categories, id]);

  const addPhotos = useCallback((files: FileList | null) => {
    if (!files) return;
    const room = 6 - form.photos.length;
    if (room <= 0) return;
    const next = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room);
    setForm((f) => ({ ...f, photos: [...f.photos, ...next] }));
  }, [form.photos.length]);

  const removePhoto = (i: number) =>
    set("photos", form.photos.filter((_, j) => j !== i));

  const canSubmit =
    form.firstName.trim() && form.lastName.trim() && form.email.trim() &&
    form.shopName.trim() && form.description.trim() &&
    form.categories.length > 0 && form.agreed && form.handmade;

  if (submitted) return <SuccessScreen email={form.email} />;

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-[32px] lg:px-[48px] py-[36px]">

        <PageBreadcrumb items={[
          { label: "Главная", path: "/" },
          { label: "Мастера", path: "/masters" },
          { label: "Заявка на открытие магазина" },
        ]} />

        {/* Header */}
        <div className="mb-[32px]">
          <div className="flex items-center gap-[12px] mb-[8px]">
            <div className="w-[44px] h-[44px] bg-[#ebf5eb] rounded-full flex items-center justify-center shrink-0">
              <Store size={20} className="text-[#315350]" />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[28px] sm:text-[32px] text-black leading-tight">
              Заявка на открытие магазина
            </p>
          </div>
          <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7] ml-[56px]">
            Заполните форму ниже. Мы рассмотрим заявку в течение 3–5 рабочих дней и свяжемся с вами по email.
          </p>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-[16px]">

            {/* 1. Master info */}
            <Card>
              <SectionTitle>Информация о мастере</SectionTitle>
              <div className="grid grid-cols-2 gap-[12px]">
                <TextInput label="Имя" placeholder="Айгерим" value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)} />
                <TextInput label="Фамилия" placeholder="Сейткали" value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-[12px] mt-[12px]">
                <TextInput label="Телефон" placeholder="+7 (777) 000-00-00" type="tel" value={form.phone}
                  onChange={(e) => set("phone", e.target.value)} />
                <TextInput label="Email" placeholder="example@mail.com" type="email" value={form.email}
                  onChange={(e) => set("email", e.target.value)} />
              </div>
            </Card>

            {/* Info: process steps */}
            <ProcessCard />

            {/* Info: perks */}
            <PerksCard />

            {/* Social */}
            <Card>
              <div className="flex items-center justify-between mb-[16px]">
                <p style={{ fontFamily: "'Playfair Display', serif" }}
                  className="font-bold text-[18px] text-[#374957]">
                  Социальные сети
                </p>
                <span className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] bg-[#f5f3ed] px-[10px] py-[4px] rounded-full">
                  необязательно
                </span>
              </div>
              <div className="flex flex-col gap-[10px]">
                <SocialInput
                  icon={<Instagram size={16} />}
                  placeholder="instagram.com/вашмагазин"
                  value={form.instagram}
                  onChange={(v) => set("instagram", v)}
                />
                <SocialInput
                  icon={<Music size={15} />}
                  placeholder="tiktok.com/@вашмагазин"
                  value={form.tiktok}
                  onChange={(v) => set("tiktok", v)}
                />
                <SocialInput
                  icon={<Send size={15} />}
                  placeholder="t.me/вашмагазин"
                  value={form.telegram}
                  onChange={(v) => set("telegram", v)}
                />
              </div>
            </Card>

            {/* Consent + submit */}
            <Card>
              <div className="flex flex-col gap-[14px] mb-[22px]">
                <CheckboxRow checked={form.handmade} onChange={() => set("handmade", !form.handmade)}>
                  <span>
                    Подтверждаю, что все товары изготовлены{" "}
                    <span className="font-semibold text-[#374957]">мной или моей мастерской</span>
                  </span>
                </CheckboxRow>
                <CheckboxRow checked={form.agreed} onChange={() => set("agreed", !form.agreed)}>
                  Я принимаю{" "}
                  <span className="text-[#315350] hover:underline cursor-pointer">условия использования</span>
                  {" "}и даю согласие на обработку персональных данных
                </CheckboxRow>
              </div>

              <button
                type="button"
                onClick={() => canSubmit && setSubmitted(true)}
                className="w-full h-[54px] rounded-full font-['Manrope',sans-serif] font-semibold text-[16px] text-white transition-all"
                style={{ background: canSubmit ? "#315350" : "#c8c0b8", cursor: canSubmit ? "pointer" : "not-allowed" }}
              >
                Отправить заявку
              </button>

              {!canSubmit && (
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] text-center mt-[10px]">
                  Заполните обязательные поля, выберите категорию и подтвердите оба пункта
                </p>
              )}
            </Card>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-[16px]">

            {/* Shop info */}
            <Card>
              <SectionTitle>Информация о магазине</SectionTitle>
              <div className="flex flex-col gap-[12px]">
                <TextInput label="Название магазина" placeholder="Silver Breeze" value={form.shopName}
                  onChange={(e) => set("shopName", e.target.value)} />

                <div className="flex flex-col gap-[6px]">
                  <FieldLabel>Описание</FieldLabel>
                  <textarea
                    placeholder="Опишите ваш магазин и что вы продаёте"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={4}
                    className="w-full bg-[#f5f3ed] rounded-[14px] px-[16px] py-[14px] font-['Manrope',sans-serif] text-[14px] text-[#374957] placeholder:text-[#b0a89e] outline-none focus:ring-2 focus:ring-[#315350] transition resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-[12px]">
                  <SelectDropdown label="Город" value={form.city} options={CITIES}
                    onChange={(v) => set("city", v)} />
                  <SelectDropdown label="Страна" value={form.country} options={COUNTRIES}
                    onChange={(v) => set("country", v)} />
                </div>
              </div>
            </Card>

            {/* Categories */}
            <Card>
              <SectionTitle>Категории товаров</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px]">
                {CATEGORIES.map((cat) => {
                  const checked = form.categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className="flex items-center gap-[10px] px-[14px] py-[12px] rounded-[14px] border-[1.5px] transition-all text-left"
                      style={{
                        borderColor: checked ? "#315350" : "rgba(55,73,87,0.14)",
                        background: checked ? "#f0f5f4" : "#fff",
                      }}
                    >
                      <div
                        className="w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center shrink-0 transition-all"
                        style={{ borderColor: checked ? "#315350" : "#d0c8bf", background: checked ? "#315350" : "#fff" }}
                      >
                        {checked && <Checkmark />}
                      </div>
                      <span className="font-['Manrope',sans-serif] font-medium text-[13px]"
                        style={{ color: checked ? "#315350" : "#374957" }}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Photos — bigger dropzone */}
            <Card>
              <SectionTitle>Фото работ</SectionTitle>
              <div
                className="border-[2px] border-dashed rounded-[20px] flex flex-col items-center justify-center py-[48px] px-[24px] cursor-pointer transition-all"
                style={{
                  borderColor: isDragging ? "#315350" : "rgba(55,73,87,0.2)",
                  background: isDragging ? "#f0f5f4" : "#f7f6f3",
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); addPhotos(e.dataTransfer.files); }}
              >
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
                  onChange={(e) => addPhotos(e.target.files)} />
                <div className="w-[56px] h-[56px] rounded-full bg-white border border-[rgba(55,73,87,0.1)] flex items-center justify-center mb-[14px] shadow-sm">
                  <Upload size={24} className="text-[#315350]" />
                </div>
                <p className="font-['Manrope',sans-serif] font-semibold text-[15px] text-[#374957] mb-[6px]">
                  Перетащите фото сюда
                </p>
                <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">
                  или <span className="text-[#315350] underline">выберите файлы</span>
                </p>
                <p className="font-['Manrope',sans-serif] text-[12px] text-[#b0a89e] mt-[6px]">
                  до 6 фото · JPG, PNG, WEBP
                </p>
              </div>

              {form.photos.length > 0 && (
                <div className="mt-[16px] flex flex-wrap gap-[10px]">
                  {form.photos.map((file, i) => (
                    <div key={i} className="relative w-[90px] h-[90px] rounded-[14px] overflow-hidden bg-[#f5f3ed]">
                      <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                        className="absolute top-[5px] right-[5px] w-[20px] h-[20px] bg-black/55 rounded-full flex items-center justify-center hover:bg-black/75 transition-colors"
                      >
                        <X size={10} color="white" />
                      </button>
                    </div>
                  ))}
                  {form.photos.length < 6 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-[90px] h-[90px] rounded-[14px] border-[2px] border-dashed border-[rgba(55,73,87,0.2)] flex flex-col items-center justify-center gap-[4px] hover:border-[#315350] transition-colors"
                    >
                      <ImageIcon size={18} className="text-[#92887d]" />
                      <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d]">Добавить</span>
                    </button>
                  )}
                </div>
              )}
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
