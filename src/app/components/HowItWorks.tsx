import { useState } from "react";
import { Search, ShoppingBag, Package, UserPlus, Store, TrendingUp } from "lucide-react";

const buyerSteps = [
  {
    icon: Search,
    title: "Найдите товар",
    desc: "Используйте поиск или просматривайте категории. Фильтруйте по городу, цене или виду изделия.",
    number: "01",
  },
  {
    icon: ShoppingBag,
    title: "Оформите заказ",
    desc: "Выберите товар, укажите детали доставки и оплатите удобным способом.",
    number: "02",
  },
  {
    icon: Package,
    title: "Получите посылку",
    desc: "Мастер упакует и отправит ваш заказ. Отслеживайте статус в личном кабинете.",
    number: "03",
  },
];

const sellerSteps = [
  {
    icon: UserPlus,
    title: "Зарегистрируйтесь",
    desc: "Создайте аккаунт мастера, укажите специализацию и пройдите верификацию.",
    number: "01",
  },
  {
    icon: Store,
    title: "Откройте магазин",
    desc: "Добавьте фото товаров, установите цены и настройте способы доставки.",
    number: "02",
  },
  {
    icon: TrendingUp,
    title: "Продавайте и зарабатывайте",
    desc: "Принимайте заказы, общайтесь с покупателями и развивайте своё дело.",
    number: "03",
  },
];

export function HowItWorks() {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");
  const steps = tab === "buyer" ? buyerSteps : sellerSteps;

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm text-accent mb-1 uppercase tracking-wide">Инструкция</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-3xl mb-6">
            Как это работает
          </h2>
          {/* Tab toggle */}
          <div className="inline-flex bg-card rounded-full p-1 border border-border">
            {(["buyer", "seller"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2 rounded-full text-sm transition-all"
                style={
                  tab === t
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { color: "var(--muted-foreground)" }
                }
              >
                {t === "buyer" ? "Для покупателей" : "Для мастеров"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-border" />

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex flex-col items-center text-center relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 relative z-10"
                  style={{ background: "var(--card)", borderColor: "var(--accent)" }}
                >
                  <Icon size={24} style={{ color: "var(--accent)" }} />
                </div>
                <span className="text-xs text-muted-foreground mb-1">{s.number}</span>
                <h3 className="text-base mb-2" style={{ color: "var(--primary)" }}>{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
