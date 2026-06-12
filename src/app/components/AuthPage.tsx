import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, LogIn } from "lucide-react";

function authMessage(action: string | null) {
  if (action === "cart") return "Войдите, чтобы добавить товар в корзину.";
  if (action === "favorite") return "Войдите, чтобы сохранять товары в избранное.";
  return "Войдите или создайте аккаунт, чтобы продолжить.";
}

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") || "/";
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[52px] flex justify-center">
        <div className="w-full max-w-[430px] bg-white rounded-[28px] border border-[rgba(55,73,87,0.08)] p-[36px] shadow-[0_16px_48px_rgba(49,83,80,0.08)]">
          <div className="flex items-center gap-[10px] mb-[6px]">
            <div className="w-[38px] h-[38px] bg-[#f0f5f4] rounded-full flex items-center justify-center">
              <LogIn size={17} color="#315350" />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[24px] text-black">
              {tab === "login" ? "Войти" : "Регистрация"}
            </p>
          </div>

          <p className="font-['Manrope',sans-serif] font-normal text-[13px] text-[#92887d] mb-[24px]">
            {authMessage(params.get("action"))}
          </p>

          <div className="flex bg-[#f5f3ed] rounded-full p-[4px] mb-[24px]">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className="flex-1 py-[8px] rounded-full font-['Manrope',sans-serif] font-medium text-[13px] transition-all"
                style={tab === item ? { background: "#315350", color: "#fff" } : { color: "#374957" }}
              >
                {item === "login" ? "Войти" : "Создать аккаунт"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-[12px]">
            {tab === "register" && (
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Имя"
                className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]"
              />
            )}
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              type="email"
              className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Пароль"
                type={showPass ? "text" : "password"}
                className="w-full h-[48px] bg-[#f5f3ed] rounded-[14px] px-[16px] pr-[44px] font-['Manrope',sans-serif] text-[14px] text-[#374957] outline-none focus:ring-2 focus:ring-[#315350]"
              />
              <button
                onClick={() => setShowPass((value) => !value)}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#92887d] hover:text-[#374957]"
                aria-label={showPass ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate(redirect)}
            className="mt-[20px] w-full h-[50px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#3c6460] transition-colors"
          >
            {tab === "login" ? "Войти" : "Зарегистрироваться"}
          </button>

          {tab === "login" && (
            <p className="text-center mt-[12px] font-['Manrope',sans-serif] text-[12px] text-[#92887d]">
              Нет аккаунта?{" "}
              <button onClick={() => setTab("register")} className="text-[#315350] font-medium hover:underline">
                Создать
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
