import { useNavigate } from "react-router";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

export function PageBreadcrumb({ items, className = "" }: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Хлебные крошки"
      className={`flex flex-wrap items-center gap-[6px] font-['Manrope',sans-serif] text-[14px] mb-[28px] ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-[6px] min-w-0">
            {item.path && !isLast ? (
              <button
                type="button"
                onClick={() => navigate(item.path!)}
                className="font-medium text-[#92887d] hover:text-[#315350] transition-colors truncate"
              >
                {item.label}
              </button>
            ) : (
              <span
                className={`font-medium truncate ${isLast ? "text-[#374957]" : "text-[#92887d]"}`}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-[#c5bdb5]">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
