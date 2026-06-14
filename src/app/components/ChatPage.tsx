import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, BadgeCheck, Clock, ImagePlus, Paperclip, Search, Send, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import imgCat1 from "../../imports/Главная1/8b6bb52a3edf386cb865b41ec89559fc52b9ac8b.png";
import imgCat2 from "../../imports/Главная1/bb11288ae7495004fa7935a2c8c92dfeb19e39c2.png";
import imgCat3 from "../../imports/Главная1/6d5ed20763f358f3424ba01ed14de3a13dd5cb7f.png";
import imgCat4 from "../../imports/Главная1/c82f907c58912fd52cfe2dafef2f9a8fd97803c0.png";
import imgCat5 from "../../imports/Главная1/1a127ff4aeda0ca697d11c7943256279991814e2.png";
import imgCat6 from "../../imports/Главная1/24390a85724f954aa31bb0f87a83125f1714f165.png";
import imgImage8 from "../../imports/Главная1/2f8c2d4769fcbe496b4559a5853a97d632a4eeaa.png";
import { PageBreadcrumb } from "./PageBreadcrumb";

type ChatMaster = {
  id: string;
  name: string;
  category: string;
  responseTime: string;
  avatar: string;
  online: boolean;
};

type ChatMessage = {
  id: number;
  from: "buyer" | "master";
  text: string;
  time: string;
};

const MASTERS: ChatMaster[] = [
  { id: "silver-breeze", name: "Silver Breeze", category: "Украшения", responseTime: "обычно отвечает за 2 часа", avatar: imgImage8, online: true },
  { id: "candle-studio", name: "Candle Studio", category: "Свечи и ароматика", responseTime: "обычно отвечает за 3 часа", avatar: imgCat4, online: true },
  { id: "clay-home", name: "Clay & Home", category: "Гончарство", responseTime: "обычно отвечает в течение дня", avatar: imgCat2, online: false },
  { id: "aizatman", name: "Aizatman Felt Studio", category: "Войлок и текстиль", responseTime: "обычно отвечает за 4 часа", avatar: imgCat1, online: true },
  { id: "nurcraft", name: "NurCraft", category: "Казахское handmade", responseTime: "обычно отвечает за 2 часа", avatar: imgCat3, online: true },
  { id: "leather-agentin", name: "Leather by Agentin", category: "Кожаные изделия", responseTime: "обычно отвечает в течение дня", avatar: imgCat6, online: false },
  { id: "craftylan", name: "CraftyLan", category: "Декор и живопись", responseTime: "обычно отвечает за 5 часов", avatar: imgCat5, online: true },
  { id: "felt-tales", name: "Felt & Tales", category: "Игрушки", responseTime: "обычно отвечает за 3 часа", avatar: imgCat5, online: true },
];

const QUICK_MESSAGES = [
  "Здравствуйте, товар есть в наличии?",
  "Можно сделать под заказ?",
  "Сколько будет доставка?",
  "Можно упаковать как подарок?",
];

function initialMessages(master: ChatMaster): ChatMessage[] {
  return [
    {
      id: 1,
      from: "master",
      text: `Здравствуйте! Я ${master.name}. Можете написать вопрос по изделию, срокам изготовления или доставке.`,
      time: "10:24",
    },
    {
      id: 2,
      from: "buyer",
      text: "Здравствуйте! Хочу уточнить детали перед заказом.",
      time: "10:25",
    },
    {
      id: 3,
      from: "master",
      text: "Конечно. Подскажите, какое изделие вам понравилось и нужен ли подарок к конкретной дате?",
      time: "10:27",
    },
  ];
}

function currentTime() {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export function ChatPage() {
  const { masterId } = useParams();
  const navigate = useNavigate();
  const activeMaster = MASTERS.find((master) => master.id === masterId) ?? MASTERS[0];
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messagesByMaster, setMessagesByMaster] = useState<Record<string, ChatMessage[]>>(() =>
    Object.fromEntries(MASTERS.map((master) => [master.id, initialMessages(master)]))
  );

  const filteredMasters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return MASTERS;
    return MASTERS.filter((master) =>
      [master.name, master.category].join(" ").toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const messages = messagesByMaster[activeMaster.id] ?? [];

  function sendMessage(text = draft) {
    const value = text.trim();
    if (!value) return;

    setMessagesByMaster((current) => ({
      ...current,
      [activeMaster.id]: [
        ...(current[activeMaster.id] ?? []),
        {
          id: Date.now(),
          from: "buyer",
          text: value,
          time: currentTime(),
        },
      ],
    }));
    setDraft("");
  }

  return (
    <div className="bg-[#fbfbf8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[36px]">
        <PageBreadcrumb
          items={[
            { label: "Главная", path: "/" },
            { label: "Проверенные мастера", path: "/masters" },
            { label: "Чат с мастером" },
          ]}
        />

        <div className="grid grid-cols-[340px_1fr] gap-[20px] h-[calc(100vh-180px)] min-h-[620px]">
          <aside className="bg-white border border-[rgba(55,73,87,0.08)] rounded-[24px] overflow-hidden flex flex-col">
            <div className="p-[18px] border-b border-[rgba(55,73,87,0.08)]">
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black leading-tight mb-[14px]">
                Сообщения
              </h1>
              <div className="relative">
                <Search size={15} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#92887d]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Найти мастера..."
                  className="w-full h-[40px] rounded-full border border-[rgba(55,73,87,0.14)] bg-[#fbfbf8] pl-[38px] pr-[14px] font-['Manrope',sans-serif] font-medium text-[13px] text-[#374957] outline-none focus:border-[#315350]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto p-[8px]">
              {filteredMasters.map((master) => {
                const active = master.id === activeMaster.id;
                const last = messagesByMaster[master.id]?.at(-1);

                return (
                  <button
                    key={master.id}
                    type="button"
                    onClick={() => navigate(`/chat/${master.id}`)}
                    className="w-full rounded-[18px] px-[10px] py-[10px] flex items-center gap-[10px] text-left transition-colors"
                    style={{ background: active ? "#eef6f5" : "transparent" }}
                  >
                    <div className="relative size-[48px] rounded-full overflow-hidden bg-[#f0eeed] shrink-0">
                      <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
                      {master.online && <span className="absolute right-[2px] bottom-[2px] size-[10px] rounded-full bg-[#3aa76d] border-2 border-white" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-[5px]">
                        <p className="font-['Manrope',sans-serif] font-bold text-[13px] text-[#374957] truncate">{master.name}</p>
                        <BadgeCheck size={13} className="text-[#315350] shrink-0" />
                      </div>
                      <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] truncate">{last?.text ?? master.category}</p>
                    </div>
                    <span className="font-['Manrope',sans-serif] text-[11px] text-[#92887d] shrink-0">{last?.time}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="bg-white border border-[rgba(55,73,87,0.08)] rounded-[24px] overflow-hidden flex flex-col">
            <header className="h-[86px] px-[22px] border-b border-[rgba(55,73,87,0.08)] flex items-center justify-between gap-[18px]">
              <div className="flex items-center gap-[13px] min-w-0">
                <button
                  type="button"
                  onClick={() => navigate("/masters")}
                  className="size-[36px] rounded-full border border-[rgba(55,73,87,0.14)] flex items-center justify-center text-[#374957] hover:text-[#315350] hover:border-[#315350] transition-colors shrink-0"
                  aria-label="Назад к мастерам"
                >
                  <ArrowLeft size={17} />
                </button>
                <div className="relative size-[52px] rounded-full overflow-hidden bg-[#f0eeed] shrink-0">
                  <img src={activeMaster.avatar} alt={activeMaster.name} className="w-full h-full object-cover" />
                  {activeMaster.online && <span className="absolute right-[2px] bottom-[2px] size-[11px] rounded-full bg-[#3aa76d] border-2 border-white" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-[6px]">
                    <h2 className="font-['Manrope',sans-serif] font-bold text-[16px] text-[#374957] truncate">{activeMaster.name}</h2>
                    <BadgeCheck size={15} className="text-[#315350] shrink-0" />
                  </div>
                  <div className="flex items-center gap-[6px] mt-[2px]">
                    <Clock size={12} className="text-[#92887d]" />
                    <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d] truncate">{activeMaster.responseTime}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/shop/${activeMaster.id}`)}
                className="h-[38px] px-[14px] rounded-full bg-[#315350] text-white font-['Manrope',sans-serif] font-semibold text-[13px] flex items-center gap-[7px] hover:bg-[#253f3d] transition-colors shrink-0"
              >
                <ShoppingBag size={15} />
                В магазин
              </button>
            </header>

            <div className="flex-1 overflow-auto px-[22px] py-[22px] bg-[#fbfbf8]">
              <div className="max-w-[760px] mx-auto">
                <div className="text-center mb-[20px]">
                  <span className="inline-flex items-center h-[28px] px-[12px] rounded-full bg-white border border-[rgba(55,73,87,0.08)] font-['Manrope',sans-serif] text-[12px] text-[#92887d]">
                    Сегодня
                  </span>
                </div>

                <div className="space-y-[12px]">
                  {messages.map((message) => {
                    const buyer = message.from === "buyer";

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${buyer ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[68%] rounded-[20px] px-[15px] py-[11px] shadow-sm ${
                            buyer
                              ? "bg-[#315350] text-white rounded-br-[6px]"
                              : "bg-white text-[#374957] rounded-bl-[6px] border border-[rgba(55,73,87,0.08)]"
                          }`}
                        >
                          <p className="font-['Manrope',sans-serif] text-[14px] leading-[1.55]">{message.text}</p>
                          <p className={`font-['Manrope',sans-serif] text-[11px] mt-[5px] ${buyer ? "text-white/65" : "text-[#92887d]"}`}>
                            {message.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <footer className="border-t border-[rgba(55,73,87,0.08)] bg-white px-[22px] py-[16px]">
              <div className="flex gap-[8px] mb-[12px] overflow-x-auto pb-[2px]" style={{ scrollbarWidth: "none" }}>
                {QUICK_MESSAGES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => sendMessage(item)}
                    className="h-[32px] px-[12px] rounded-full border border-[rgba(55,73,87,0.12)] bg-[#fbfbf8] font-['Manrope',sans-serif] font-medium text-[12px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors whitespace-nowrap"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-[10px]">
                <button
                  type="button"
                  className="size-[42px] rounded-full border border-[rgba(55,73,87,0.14)] flex items-center justify-center text-[#92887d] hover:text-[#315350] hover:border-[#315350] transition-colors shrink-0"
                  aria-label="Прикрепить файл"
                >
                  <Paperclip size={17} />
                </button>
                <button
                  type="button"
                  className="size-[42px] rounded-full border border-[rgba(55,73,87,0.14)] flex items-center justify-center text-[#92887d] hover:text-[#315350] hover:border-[#315350] transition-colors shrink-0"
                  aria-label="Прикрепить изображение"
                >
                  <ImagePlus size={17} />
                </button>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Напишите сообщение мастеру..."
                  rows={1}
                  className="min-h-[42px] max-h-[110px] flex-1 resize-none rounded-[20px] border border-[rgba(55,73,87,0.14)] bg-[#fbfbf8] px-[16px] py-[11px] font-['Manrope',sans-serif] text-[14px] text-[#374957] placeholder:text-[#92887d] outline-none focus:border-[#315350]"
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={!draft.trim()}
                  className="size-[42px] rounded-full bg-[#315350] text-white flex items-center justify-center transition-colors disabled:bg-[#d8d0c8] disabled:cursor-not-allowed shrink-0"
                  aria-label="Отправить сообщение"
                >
                  <Send size={17} />
                </button>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
