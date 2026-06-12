import { ShieldCheck, Truck, HeartHandshake, Leaf, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Безопасные покупки",
    desc: "Гарантия возврата денег в течение 14 дней. Каждый мастер проверен.",
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    desc: "Доставляем по всему Казахстану. Отслеживание заказа в реальном времени.",
  },
  {
    icon: HeartHandshake,
    title: "Поддержка мастеров",
    desc: "Покупая у нас, вы поддерживаете местных ремесленников и их семьи.",
  },
  {
    icon: Leaf,
    title: "Экологично",
    desc: "Большинство мастеров используют натуральные и экологичные материалы.",
  },
  {
    icon: Award,
    title: "Уникальные изделия",
    desc: "Каждый товар создан вручную и является уникальным произведением искусства.",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    desc: "Наша команда всегда готова помочь с выбором или решением вопросов.",
  },
];

export function WhyCrafty() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm text-accent mb-1 uppercase tracking-wide">Наши преимущества</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-3xl">
            Почему выбирают Crafty?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--secondary)" }}
                >
                  <Icon size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="text-base mb-1" style={{ color: "var(--primary)" }}>{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
