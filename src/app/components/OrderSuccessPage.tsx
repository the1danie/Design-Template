import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, PackageCheck, ShoppingBag } from "lucide-react";

const ORDER_NUMBER = `#${Math.floor(10000 + Math.random() * 90000)}`;

const STEPS = [
  { label: "Оплачен",         done: true },
  { label: "Передан мастеру", done: true },
  { label: "Отправлен",       done: false },
  { label: "Доставлен",       done: false },
];

export function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbfbf8] min-h-screen flex items-center justify-center px-[24px] py-[60px]">
      <div className="w-full max-w-[520px] flex flex-col items-center text-center">

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 260 }}
          className="w-[88px] h-[88px] bg-[#ebf5eb] rounded-full flex items-center justify-center mb-[24px]"
        >
          <CheckCircle2 size={44} className="text-[#315350]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <p style={{ fontFamily: "'Playfair Display', serif" }}
            className="font-bold text-[32px] text-black mb-[10px]">
            Заказ оформлен!
          </p>
          <p className="font-['Manrope',sans-serif] text-[14px] text-[#92887d] mb-[8px]">
            Номер заказа: <span className="font-semibold text-[#374957]">{ORDER_NUMBER}</span>
          </p>
          <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] leading-[1.7] mb-[32px]">
            Мастер получит уведомление и приступит к подготовке. Статус заказа доступен в личном кабинете.
          </p>

          {/* Status steps */}
          <div className="bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] p-[24px] mb-[28px] text-left">
            <div className="flex items-center gap-[10px] mb-[18px]">
              <PackageCheck size={18} className="text-[#315350]" />
              <p className="font-['Manrope',sans-serif] font-bold text-[15px] text-[#374957]">Статус заказа</p>
            </div>
            <div className="flex flex-col gap-[0px]">
              {STEPS.map((step, i) => (
                <div key={step.label} className="flex items-start gap-[14px]">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center transition-all"
                      style={{
                        borderColor: step.done ? "#315350" : "rgba(55,73,87,0.2)",
                        background: step.done ? "#315350" : "#fff",
                      }}
                    >
                      {step.done && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px h-[20px] mt-[2px]"
                        style={{ background: step.done ? "rgba(49,83,80,0.3)" : "rgba(55,73,87,0.12)" }} />
                    )}
                  </div>
                  <p
                    className="font-['Manrope',sans-serif] font-medium text-[14px] pt-[2px] pb-[14px]"
                    style={{ color: step.done ? "#315350" : "#b0a89e" }}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-[4px] bg-[#f5f3ed] rounded-[12px] px-[14px] py-[10px]">
              <p className="font-['Manrope',sans-serif] text-[12px] text-[#92887d]">
                Трек-номер: <span className="font-semibold text-[#374957]">будет добавлен после отправки</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-[12px] justify-center">
            <button
              onClick={() => navigate("/profile/orders")}
              className="h-[50px] px-[28px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:bg-[#3c6460] transition-colors flex items-center gap-[8px]"
            >
              <PackageCheck size={16} />
              Мои заказы
            </button>
            <button
              onClick={() => navigate("/catalog")}
              className="h-[50px] px-[28px] border border-[rgba(55,73,87,0.18)] text-[#374957] rounded-full font-['Manrope',sans-serif] font-semibold text-[15px] hover:border-[#315350] transition-colors flex items-center gap-[8px]"
            >
              <ShoppingBag size={16} />
              Продолжить покупки
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
