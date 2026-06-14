type PageHeaderStat = {
  label: string;
  value: string;
};

export function PageHeader({
  title,
  description,
  stats = [],
  actions,
  children,
  visual,
}: {
  title: string;
  description: string;
  stats?: PageHeaderStat[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  visual?: React.ReactNode;
}) {
  const statsBlock = stats.length > 0 && (
    <div className="flex items-center gap-[10px] flex-wrap">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="h-[34px] px-[13px] rounded-full bg-white border border-[rgba(55,73,87,0.1)] flex items-center gap-[6px] font-['Manrope',sans-serif]"
        >
          <span className="font-bold text-[13px] text-[#315350]">{stat.value}</span>
          <span className="font-medium text-[12px] text-[#92887d]">{stat.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="mb-[28px] border-b border-[rgba(55,73,87,0.08)] pb-[24px]">
      {visual ? (
        <div className="grid grid-cols-[minmax(0,1fr)_500px] items-center gap-[52px]">
          <div className="min-w-0">
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="font-bold text-[42px] text-black leading-none mb-[14px]"
            >
              {title}
            </h1>
            <p className="font-['Manrope',sans-serif] text-[16px] text-[rgba(0,0,0,0.56)] leading-[1.65] max-w-[720px]">
              {description}
            </p>
            {actions && (
              <div className="mt-[20px] flex items-center gap-[10px]">
                {actions}
              </div>
            )}
            {(stats.length > 0 || children) && (
              <div className="mt-[26px] flex items-center justify-between gap-[16px] flex-wrap">
                {statsBlock}
                {children}
              </div>
            )}
          </div>
          {visual}
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-[28px]">
            <div className="min-w-0">
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="font-bold text-[34px] text-black leading-none mb-[10px]"
              >
                {title}
              </h1>
              <p className="font-['Manrope',sans-serif] text-[14px] text-[rgba(0,0,0,0.55)] leading-[1.55] max-w-[680px]">
                {description}
              </p>
            </div>
            {actions && (
              <div className="shrink-0 flex items-center gap-[10px]">
                {actions}
              </div>
            )}
          </div>

          {(stats.length > 0 || children) && (
            <div className="mt-[18px] flex items-center justify-between gap-[16px] flex-wrap">
              {statsBlock}
              {children}
            </div>
          )}
        </>
      )}
    </section>
  );
}
