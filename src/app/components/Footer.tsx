export function Footer() {
  const links = {
    "Покупателям": ["Как купить", "Доставка и оплата", "Возврат товара", "Служба поддержки", "Часто задаваемые вопросы"],
    "Мастерам": ["Стать мастером", "Как продавать", "Тарифы и комиссии", "Продвижение", "Правила маркетплейса"],
    "Компания": ["О нас", "Наша миссия", "Команда", "Блог", "Пресса"],
  };

  return (
    <footer style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold">
                Crafty<span style={{ color: "#A8C5A0" }}>.kz</span>
              </span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Маркетплейс уникальных товаров ручной работы от казахстанских мастеров.
            </p>
            <div className="flex gap-3">
              {["ВКонтакте", "Instagram", "Telegram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs px-2 py-1 rounded border opacity-50 hover:opacity-100 transition-opacity"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm mb-4 opacity-90">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-xs opacity-50">© 2026 Crafty.kz. Все права защищены.</p>
          <div className="flex gap-4">
            {["Пользовательское соглашение", "Политика конфиденциальности"].map((l) => (
              <a key={l} href="#" className="text-xs opacity-50 hover:opacity-100 transition-opacity">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
