import { Star, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Алина К.",
    avatar: "АК",
    rating: 5,
    date: "12 мая 2026",
    product: "Керамическая ваза",
    text: "Невероятно красивая работа! Ваза превзошла все ожидания. Мастер очень внимательно отнеслась к деталям, упаковка идеальная. Буду заказывать ещё!",
    color: "#D4B896",
  },
  {
    name: "Темирлан М.",
    avatar: "ТМ",
    rating: 5,
    date: "3 июня 2026",
    product: "Деревянная шкатулка",
    text: "Заказал шкатулку в подарок маме — она в восторге. Качество превосходное, дерево обработано идеально. Мастер выполнил заказ раньше срока.",
    color: "#A8C5A0",
  },
  {
    name: "Дильнара Р.",
    avatar: "ДР",
    rating: 5,
    date: "28 апреля 2026",
    product: "Свеча с травами",
    text: "Аромат просто волшебный! Свеча горит равномерно, травы добавляют особый шарм. Оформление магазина на высшем уровне. Спасибо мастеру за труд!",
    color: "#C4A882",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-yellow-400" : "text-muted"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-accent mb-1 uppercase tracking-wide">Отзывы</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-3xl">
              Отзывы покупателей
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-sm text-accent hover:underline">
            Все отзывы <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shrink-0"
                  style={{ background: r.color }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className="ml-auto">
                  <StarRow rating={r.rating} />
                </div>
              </div>
              <p className="text-xs text-accent mb-2 font-medium">{r.product}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
