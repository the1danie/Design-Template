import type { CSSProperties, ReactNode } from "react";

export function PageControlButton({
  active = false,
  onClick,
  children,
  className = "",
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[36px] px-[14px] rounded-full border font-['Manrope',sans-serif] font-medium text-[13px] whitespace-nowrap transition-colors flex items-center justify-center gap-[7px] ${className}`}
      style={active
        ? { background: "#315350", borderColor: "#315350", color: "#fff" }
        : { background: "#fff", borderColor: "rgba(55,73,87,0.16)", color: "#374957" }}
    >
      {children}
    </button>
  );
}

export function PageControlGroup({ children, className = "", style }: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`flex items-center gap-[6px] flex-wrap ${className}`} style={style}>
      {children}
    </div>
  );
}

export function SegmentedControl({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-[4px] bg-white border border-[rgba(55,73,87,0.1)] rounded-full p-[3px] ${className}`}>
      {children}
    </div>
  );
}
