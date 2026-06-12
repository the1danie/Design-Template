import { Heart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const gifts = [
  {
    name: "Свеча соевая «Лаванда»",
    price: "2 900 ₸",
    master: "Балнур Д.",
    image: "https://images.unsplash.com/photo-1603905179139-db12ab535ca9?w=400&h=400&fit=crop&auto=format",
    tag: "Хит",
    tagColor: "bg-accent text-white",
  },
  {
    name: "Ваза керамическая ручной работы",
    price: "8 500 ₸",
    master: "Айгерим К.",
    image: "https://images.unsplash.com/photo-1620140036708-455ed5c0426a?w=400&h=400&fit=crop&auto=format",
    tag: "Новинка",
    tagColor: "bg-primary text-primary-foreground",
  },
  {
    name: "Свеча «Ваниль и дерево»",
    price: "3 200 ₸",
    master: "Балнур Д.",
    image: "https://images.unsplash.com/photo-1612179543058-ab74d388e0ce?w=400&h=400&fit=crop&auto=format",
    tag: null,
    tagColor: "",
  },
  {
    name: "Набор ароматических свечей",
    price: "6 800 ₸",
    master: "Мадина А.",
    image: "https://images.unsplash.com/photo-1718788392540-0862a47c8c30?w=400&h=400&fit=crop&auto=format",
    tag: "Подарок",
    tagColor: "bg-secondary text-secondary-foreground",
  },
  {
    name: "Декоративная тарелка с росписью",
    price: "5 400 ₸",
    master: "Айгерим К.",
    image: "https://images.unsplash.com/photo-1607556672044-6110fc499247?w=400&h=400&fit=crop&auto=format",
    tag: null,
    tagColor: "",
  },
];

export function GiftProducts() {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-accent mb-1 uppercase tracking-wide">Коллекция</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-3xl">
              Подарки для вдохновения
            </h2>
          </div>
          <button onClick={() => navigate("/catalog")} className="hidden sm:flex items-center gap-1 text-sm text-accent hover:underline">
            Смотреть все <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {gifts.map((g) => (
            <div key={g.name} className="bg-card rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow border border-border">
              <div className="relative">
                <img src={g.image} alt={g.name} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" />
                {g.tag && (
                  <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${g.tagColor}`}>
                    {g.tag}
                  </span>
                )}
                <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                  <Heart size={13} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">{g.master}</p>
                <p className="text-sm text-foreground leading-tight mb-2">{g.name}</p>
                <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>{g.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
