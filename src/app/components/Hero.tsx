import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1609881583302-61548332039c?w=400&h=400&fit=crop&auto=format",
    alt: "Мастер за работой с глиной",
    cls: "w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg",
    position: "top-0 right-0",
  },
  {
    url: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=300&h=350&fit=crop&auto=format",
    alt: "Гончарное изделие",
    cls: "w-36 h-40 rounded-3xl object-cover border-4 border-white shadow-lg",
    position: "top-40 right-52",
  },
  {
    url: "https://images.unsplash.com/photo-1622691078858-58f9eb8825e0?w=280&h=280&fit=crop&auto=format",
    alt: "Ручная работа",
    cls: "w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg",
    position: "bottom-0 right-24",
  },
];

export function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Казахстанские мастера
            </div>
            <h1
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }}
              className="text-4xl lg:text-5xl mb-6 leading-tight"
            >
              Товары ручной работы от местных мастеров
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Найдите уникальные изделия от талантливых казахстанских мастеров.
              Каждый товар создан с любовью и несёт в себе частицу души своего создателя.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "500+", label: "мастеров" },
                { value: "1000+", label: "товаров" },
                { value: "4.9★", label: "рейтинг" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-2xl font-bold">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate("/catalog")} className="bg-primary text-primary-foreground px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
                Выбрать раздел
                <ArrowRight size={16} />
              </button>
              <button className="border border-border text-foreground px-6 py-3 rounded-full hover:bg-muted transition-colors">
                Стать мастером
              </button>
            </div>
          </div>

          {/* Right — organic image collage */}
          <div className="relative h-96 lg:h-[480px] hidden lg:block">
            {heroImages.map((img, i) => (
              <div key={i} className={`absolute ${img.position}`}>
                <img src={img.url} alt={img.alt} className={img.cls} />
              </div>
            ))}
            {/* Decorative blob */}
            <div
              className="absolute top-16 right-16 w-64 h-64 rounded-full opacity-20"
              style={{ background: "var(--accent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
