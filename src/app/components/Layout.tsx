import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import svgPaths from "../../imports/Главная1/svg-7zpnau8iqv";
import imgImage6 from "../../imports/Главная1/dc67fbdd930fca6bb6a68a7e5753725209c1c5f6.png";

const NAV_LINKS = [
  { label: "Все категории",       path: "/catalog" },
  { label: "Подборки",            path: "/collections" },
  { label: "Проверенные мастера", path: "/masters" },
];

const LANGUAGES = [
  { label: "Қаз", value: "kk" },
  { label: "Рус", value: "ru" },
  { label: "Eng", value: "en" },
];

export function Layout() {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[1]);
  const [languageOpen, setLanguageOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  function handleNav(path: string) {
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      navigate("/");
      window.setTimeout(() => {
        window.history.replaceState(null, "", `/#${id}`);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return;
    }

    navigate(path);
  }

  function authPath(action?: "cart" | "favorite") {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    return `/login?redirect=${encodeURIComponent(redirect)}${action ? `&action=${action}` : ""}`;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-[#fbfbf8] border-b border-[rgba(55,73,87,0.1)]">
        {/* Top row */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#fbfbf8] border-b border-[rgba(55,73,87,0.08)]">
          <div className="max-w-[1440px] mx-auto px-[83px] py-[18px] flex items-center gap-[42px]">
            {/* Logo + nav links */}
            <div className="flex items-center gap-[40px] shrink-0">
              <button onClick={() => navigate("/")} className="w-[120px] h-[40px] flex items-center justify-center shrink-0">
                <img src={imgImage6} alt="Crafty.kz" className="w-full h-full object-contain mix-blend-darken" />
              </button>
              <div className="flex items-end gap-[32px]">
                {NAV_LINKS.map((l) => {
                  const active = l.path.startsWith("/#")
                    ? location.hash === l.path.slice(1)
                    : location.pathname === l.path || (l.path !== "/" && location.pathname.startsWith(l.path));
                  return (
                    <button
                      key={l.label}
                      onClick={() => handleNav(l.path)}
                      className="relative font-['Manrope',sans-serif] font-medium text-[16px] whitespace-nowrap transition-colors leading-normal pb-[2px]"
                      style={{ color: active ? "#315350" : "#374957" }}
                    >
                      {l.label}
                      {active && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#315350]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search + icons */}
            <div className="flex items-center gap-[36px] ml-auto shrink-0">
              {/* Search */}
              <div className="bg-[#f5f3ed] flex items-center gap-[12px] px-[16px] py-[12px] rounded-[62px] w-[413px]">
                <svg className="shrink-0 size-[24px]" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.pc71b800} fill="#92887D" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Найти украшения, текстиль, керамику"
                  className="bg-transparent flex-1 outline-none font-['Manrope',sans-serif] font-medium text-[16px] text-[#374957] placeholder:text-[#92887d]"
                />
              </div>

              {/* Right icons */}
              <div className="flex items-center gap-[28px]">
                {/* Language */}
                <div className="relative">
                  <button
                    onClick={() => setLanguageOpen((open) => !open)}
                    className="flex items-center gap-[2px] h-[32px] rounded-full px-[2px] hover:text-[#315350] transition-colors"
                    aria-expanded={languageOpen}
                    aria-label="Выбрать язык"
                  >
                    <span className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#374957] leading-[20px]">{language.label}</span>
                    <svg className={`size-[18px] transition-transform ${languageOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 18 18">
                      <path d="M5 7L9 11L13 7" stroke="#374957" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {languageOpen && (
                    <div className="absolute right-0 top-full mt-[10px] w-[88px] rounded-[14px] border border-[rgba(55,73,87,0.12)] bg-white py-[5px] shadow-[0_12px_30px_rgba(49,83,80,0.14)]">
                      {LANGUAGES.map((item) => {
                        const active = item.value === language.value;
                        return (
                          <button
                            key={item.value}
                            onClick={() => {
                              setLanguage(item);
                              setLanguageOpen(false);
                            }}
                            className="w-full px-[12px] py-[8px] text-left font-['Manrope',sans-serif] font-medium text-[14px] transition-colors hover:bg-[#f5f3ed]"
                            style={{ color: active ? "#315350" : "#374957" }}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Cart */}
                <button id="cart-icon-btn" onClick={() => navigate(authPath("cart"))} className="relative size-[20px] hover:opacity-70 transition-opacity" aria-label="Корзина">
                  <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3dd6fc00} fill="#374957" />
                  </svg>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 1.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className="absolute -top-[7px] -right-[7px] bg-[#315350] text-white font-['Manrope',sans-serif] font-bold text-[9px] min-w-[15px] h-[15px] rounded-full flex items-center justify-center leading-none pointer-events-none"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
                {/* Heart */}
                <button onClick={() => navigate(authPath("favorite"))} className="relative size-[20px] hover:opacity-70 transition-opacity" aria-label="Избранное">
                  <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3b2d5980} fill="#374957" />
                  </svg>
                </button>
                {/* Sign in */}
                <button
                  onClick={() => navigate(authPath())}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  aria-label="Войти"
                >
                  <div className="rotate-180 size-[20px] relative">
                    <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p4515600} fill="#374957" />
                      <path d={svgPaths.pb9f2500} fill="#374957" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[77px]" aria-hidden="true" />

      </header>

      <Outlet />
    </div>
  );
}
