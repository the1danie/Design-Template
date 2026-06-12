import { Search, Heart, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 shrink-0">
          <span style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary)" }} className="text-xl font-bold">
            Crafty
          </span>
          <span style={{ color: "var(--accent)" }} className="text-xl font-bold">.kz</span>
        </a>

        {/* Search */}
        <div className="flex-1 flex items-center bg-muted rounded-full px-4 py-2 gap-2 max-w-xl">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск товаров, мастеров..."
            className="bg-transparent flex-1 outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Location */}
        <button className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MapPin size={14} />
          <span>Алматы</span>
          <ChevronDown size={12} />
        </button>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <button className="hidden sm:flex items-center gap-1 text-sm text-foreground hover:text-accent transition-colors">
            <Heart size={18} />
          </button>
          <button className="relative flex items-center gap-1 text-sm text-foreground hover:text-accent transition-colors">
            <ShoppingCart size={18} />
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">
              1
            </span>
          </button>
          <button className="hidden sm:flex items-center gap-1 text-sm text-foreground hover:text-accent transition-colors">
            <User size={18} />
          </button>
          <button className="hidden md:block bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
            Стать мастером
          </button>
        </div>
      </div>

      {/* Nav categories */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex gap-6 overflow-x-auto scrollbar-hide">
          {["Все товары", "Украшения", "Декор", "Текстиль", "Керамика", "Свечи", "Косметика", "Одежда"].map((cat) => (
            <button
              key={cat}
              className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-accent"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
