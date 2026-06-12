import { Star, ChevronRight } from "lucide-react";

const masters = [
  {
    name: "Айгерим Касымова",
    specialty: "Керамика и гончарство",
    rating: 4.9,
    reviews: 128,
    photo: "https://images.unsplash.com/photo-1698768195616-2d49cb36477f?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Зарина Нурланова",
    specialty: "Украшения и бижутерия",
    rating: 4.8,
    reviews: 94,
    photo: "https://images.unsplash.com/photo-1768478563696-ca21b9692a8f?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Мадина Ахметова",
    specialty: "Текстиль и вышивка",
    rating: 4.9,
    reviews: 211,
    photo: "https://images.unsplash.com/photo-1680759112621-3c56f749eda4?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Данияр Сейткали",
    specialty: "Деревянные изделия",
    rating: 5.0,
    reviews: 67,
    photo: "https://images.unsplash.com/photo-1678890026972-ffda4cc5549d?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Балнур Дюсенова",
    specialty: "Свечи и ароматика",
    rating: 4.7,
    reviews: 155,
    photo: "https://images.unsplash.com/photo-1743807059766-9d3ca4f35b60?w=200&h=200&fit=crop&auto=format",
  },
];

export function Masters() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-accent mb-1 uppercase tracking-wide">Наше сообщество</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-3xl">
              Лучшие мастера
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-sm text-accent hover:underline">
            Смотреть всех <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {masters.map((m) => (
            <div
              key={m.name}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative mb-3">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 bg-accent text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Star size={9} fill="white" />
                  {m.rating}
                </div>
              </div>
              <p className="text-sm text-foreground font-medium leading-tight mb-0.5">{m.name}</p>
              <p className="text-xs text-muted-foreground mb-1">{m.specialty}</p>
              <p className="text-xs text-muted-foreground">{m.reviews} отзывов</p>
              <button className="mt-3 text-xs border border-border px-3 py-1 rounded-full hover:border-accent hover:text-accent transition-colors">
                Подписаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
