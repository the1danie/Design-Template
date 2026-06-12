# Product Page — 5 Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Flying to Cart, Heart Animation, Review Cards Reveal, Sticky Buy Panel, and Accordion to `ProductPage.tsx`.

**Architecture:** All changes live in `ProductPage.tsx` (plus a one-line change to `Layout.tsx`). The Accordion restructures the lower page sections. The Sticky Panel and Flying Cart use `useRef` + `IntersectionObserver` / `createPortal`. Heart and Review Reveal are self-contained state/animation additions.

**Tech Stack:** React 18, motion/react (Framer Motion v12), Tailwind CSS, lucide-react, react-dom (createPortal)

**Spec:** `docs/superpowers/specs/2026-06-12-product-page-features-design.md`

---

## File Map

| File | Change |
|------|--------|
| `src/app/components/ProductPage.tsx` | All 5 features; `AccordionItem` component; `favorited` + `heartControls`; `galleryRef` + `cartButtonRef`; `FlyingImage` component; extend `AnimatedCartButton` |
| `src/app/components/Layout.tsx` | Add `id="cart-icon-btn"` to cart `<button>` (1 line) |

---

## Task 1: AccordionItem component

**Files:**
- Modify: `src/app/components/ProductPage.tsx` (add component before `// ── Main page ──`)

- [ ] **Step 1: Add `AccordionItem` component**

Insert this function just before the `// ── Main page ──` comment (around line 646):

```tsx
// ── Accordion ────────────────────────────────────────────────────────────────

function AccordionItem({ title, defaultOpen = false, children }: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[rgba(55,73,87,0.1)] last:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-[20px] text-left group"
      >
        <span
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="font-bold text-[20px] text-black group-hover:text-[#315350] transition-colors"
        >
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className="text-[#92887d] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-[28px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Verify dev server still compiles**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && npm run dev
```

Expected: dev server starts, no TypeScript errors in terminal.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && git add src/app/components/ProductPage.tsx && git commit -m "feat: add AccordionItem component"
```

---

## Task 2: Restructure page sections into Accordion

**Files:**
- Modify: `src/app/components/ProductPage.tsx`

This task:
1. Removes description from the info column
2. Replaces separate `<section>` blocks for Характеристики and Отзывы with AccordionItem wrappers
3. Adds Доставка and Возврат items with new content

- [ ] **Step 1: Remove the description paragraph from the info column**

Find and remove this block (currently the last element before the closing `</div>` of the info column, around line 865):

```tsx
            <p className="font-['Manrope',sans-serif] font-normal text-[14px] text-[rgba(0,0,0,0.6)] leading-[1.7] border-t border-[rgba(55,73,87,0.1)] pt-[20px]">
              {details.description}
            </p>
```

- [ ] **Step 2: Replace the Характеристики section**

Find and replace the entire `{/* ── Characteristics ── */}` section (currently around line 872–882):

Old code:
```tsx
        {/* ── Characteristics ── */}
        <section className="mb-[64px]">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[28px] text-black mb-[24px]">Характеристики</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-[rgba(55,73,87,0.08)] rounded-[20px] overflow-hidden">
            {details.characteristics.map((c) => (
              <div key={c.label} className="bg-[#fbfbf8] px-[24px] py-[18px]">
                <p className="font-['Manrope',sans-serif] font-normal text-[12px] text-[#92887d] mb-[4px] uppercase tracking-wide">{c.label}</p>
                <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">{c.value}</p>
              </div>
            ))}
          </div>
        </section>
```

Replace with the full accordion wrapper containing all 5 items:

```tsx
        {/* ── Accordion sections ── */}
        <div className="mb-[64px] bg-white rounded-[24px] border border-[rgba(55,73,87,0.08)] px-[32px]">

          <AccordionItem title="Описание" defaultOpen>
            <p className="font-['Manrope',sans-serif] font-normal text-[14px] text-[rgba(0,0,0,0.6)] leading-[1.7]">
              {details.description}
            </p>
          </AccordionItem>

          <AccordionItem title="Характеристики">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-[rgba(55,73,87,0.08)] rounded-[20px] overflow-hidden">
              {details.characteristics.map((c) => (
                <div key={c.label} className="bg-[#fbfbf8] px-[24px] py-[18px]">
                  <p className="font-['Manrope',sans-serif] font-normal text-[12px] text-[#92887d] mb-[4px] uppercase tracking-wide">{c.label}</p>
                  <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">{c.value}</p>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem title="Доставка">
            <div className="flex flex-col gap-[14px]">
              {([
                { Icon: Truck,  title: "Бесплатная доставка",   desc: "По всему Казахстану при любой сумме заказа" },
                { Icon: Clock,  title: "1–3 рабочих дня",        desc: "Курьер или самовывоз из пунктов выдачи KazPost" },
                { Icon: Check,  title: "Отслеживание заказа",    desc: "Статус и трекинг доступны в личном кабинете" },
              ] as const).map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-[14px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#f0f5f4] flex items-center justify-center shrink-0 mt-[1px]">
                    <Icon size={16} color="#315350" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">{title}</p>
                    <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem title="Возврат">
            <div className="flex flex-col gap-[14px]">
              {([
                { Icon: RotateCcw, title: "Возврат в течение 14 дней",  desc: "С момента получения заказа" },
                { Icon: Shield,    title: "Исходное состояние",          desc: "Товар без следов использования, в оригинальной упаковке" },
                { Icon: Check,     title: "Деньги за 5 рабочих дней",   desc: "Возврат на карту после подтверждения получения" },
              ] as const).map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-[14px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#f0f5f4] flex items-center justify-center shrink-0 mt-[1px]">
                    <Icon size={16} color="#315350" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-[#374957]">{title}</p>
                    <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>

          <div ref={reviewsRef}>
            <AccordionItem title={`Отзывы (${totalReviews})`}>
              <div className="flex justify-end mb-[20px]">
                <button
                  onClick={() => setWriteReview(true)}
                  className="flex items-center gap-[8px] h-[42px] px-[20px] bg-[#315350] text-white rounded-full font-['Manrope',sans-serif] font-semibold text-[13px] hover:bg-[#3c6460] transition-colors"
                >
                  Написать отзыв
                </button>
              </div>
              <div className="grid lg:grid-cols-[260px_1fr] gap-[40px]">
                {/* Summary */}
                <div className="bg-[#fbfbf8] rounded-[20px] p-[28px] border border-[rgba(55,73,87,0.08)] flex flex-col items-center gap-[20px] h-fit">
                  <div className="text-center">
                    <p className="font-['Manrope',sans-serif] font-bold text-[64px] text-black leading-none">{avgRating}</p>
                    <div className="flex justify-center mt-[8px]"><StarRow rating={+avgRating} size={20} /></div>
                    <p className="font-['Manrope',sans-serif] text-[13px] text-[#92887d] mt-[6px]">{totalReviews} отзывов</p>
                  </div>
                  <div className="w-full flex flex-col gap-[8px]">
                    {ratingBreakdown.map(({ stars, count }) => {
                      const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
                      const active = reviewFilter === stars;
                      return (
                        <button key={stars}
                          onClick={() => { setReviewFilter(active ? null : stars); setShowAllReviews(true); }}
                          className="flex items-center gap-[8px] group rounded-[8px] px-[4px] py-[3px] -mx-[4px] transition-colors"
                          style={{ background: active ? "rgba(49,83,80,0.07)" : "transparent" }}>
                          <span className="font-['Manrope',sans-serif] text-[12px] w-[8px] shrink-0 transition-colors"
                            style={{ color: active ? "#315350" : "#92887d" }}>{stars}</span>
                          <Star size={11} fill={active ? "#315350" : "#FFC633"} stroke={active ? "#315350" : "#FFC633"} />
                          <div className="flex-1 h-[6px] bg-[#f0ede8] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all"
                              style={{ width: `${pct}%`, background: active ? "#315350" : "#FFC633" }} />
                          </div>
                          <span className="font-['Manrope',sans-serif] text-[12px] w-[24px] text-right shrink-0 transition-colors"
                            style={{ color: active ? "#315350" : "#92887d" }}>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                  {reviewFilter !== null && (
                    <button onClick={() => setReviewFilter(null)}
                      className="w-full flex items-center justify-center gap-[6px] h-[36px] border border-[rgba(55,73,87,0.2)] rounded-full font-['Manrope',sans-serif] font-medium text-[12px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors">
                      <X size={12} /> Сбросить фильтр
                    </button>
                  )}
                </div>
                {/* Review list */}
                <div className="flex flex-col gap-[14px]">
                  <div className="flex items-center gap-[8px] flex-wrap">
                    <span className="font-['Manrope',sans-serif] font-medium text-[13px] text-[#92887d]">Сортировать:</span>
                    {([
                      { key: "newest", label: "Сначала новые" },
                      { key: "best",   label: "Сначала лучшие" },
                      { key: "worst",  label: "Сначала плохие" },
                    ] as const).map((opt) => (
                      <button key={opt.key}
                        onClick={() => setReviewSort(opt.key)}
                        className="h-[32px] px-[14px] rounded-full font-['Manrope',sans-serif] font-medium text-[12px] transition-all border"
                        style={reviewSort === opt.key
                          ? { background: "#315350", color: "#fff", borderColor: "#315350" }
                          : { background: "#fff", color: "#374957", borderColor: "rgba(55,73,87,0.18)" }}>
                        {opt.label}
                      </button>
                    ))}
                    {reviewFilter !== null && (
                      <span className="font-['Manrope',sans-serif] text-[12px] text-[#315350] ml-auto">
                        Показаны: {sortedFilteredReviews.length} из {totalReviews}
                      </span>
                    )}
                  </div>
                  {sortedFilteredReviews.length === 0 ? (
                    <div className="bg-white rounded-[20px] p-[40px] border border-[rgba(55,73,87,0.08)] flex flex-col items-center gap-[10px]">
                      <Star size={32} className="text-[#d8d0c8]" />
                      <p className="font-['Manrope',sans-serif] font-medium text-[15px] text-[#374957]">Нет отзывов с такой оценкой</p>
                      <button onClick={() => setReviewFilter(null)}
                        className="font-['Manrope',sans-serif] text-[13px] text-[#315350] hover:underline">
                        Показать все отзывы
                      </button>
                    </div>
                  ) : (
                    <>
                      {visibleReviews.map((r) => (
                        <ReviewCard
                          key={r.id}
                          review={r}
                          isOwn={ownReviewIds.has(r.id)}
                          onEdit={() => setEditingReview(r)}
                          onDelete={() => handleDeleteReview(r.id)}
                        />
                      ))}
                      {sortedFilteredReviews.length > 3 && (
                        <button onClick={() => setShowAllReviews(!showAllReviews)}
                          className="flex items-center justify-center gap-[8px] h-[46px] border border-[rgba(55,73,87,0.2)] rounded-full font-['Manrope',sans-serif] font-medium text-[14px] text-[#374957] hover:border-[#315350] hover:text-[#315350] transition-colors bg-white">
                          {showAllReviews
                            ? <><ChevronUp size={16} /> Свернуть отзывы</>
                            : <><ChevronDown size={16} /> Показать все {sortedFilteredReviews.length} отзывов</>
                          }
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </AccordionItem>
          </div>

        </div>
```

- [ ] **Step 3: Remove the old Reviews section**

Delete the entire `{/* ── Reviews ── */}` section that used to follow Характеристики (it no longer exists after Step 2 above replaced both).

- [ ] **Step 4: Start dev server and verify accordion**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && npm run dev
```

Navigate to `http://localhost:5173/product/ukrasheniya/1`. Verify:
- Accordion shows 5 items: Описание (open), Характеристики, Доставка, Возврат, Отзывы
- Each item opens/closes independently with chevron animation
- Description, characteristics grid, delivery icons, return icons all display correctly
- Reviews accordion contains the full review summary + list

- [ ] **Step 5: Commit**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && git add src/app/components/ProductPage.tsx && git commit -m "feat: restructure product page sections into accordion"
```

---

## Task 3: Sticky Buy Panel

**Files:**
- Modify: `src/app/components/ProductPage.tsx`

- [ ] **Step 1: Add state and ref**

In `ProductPage`, add after the existing `const reviewsRef = useRef...` line:

```tsx
const cartButtonRef = useRef<HTMLDivElement>(null);
const [showStickyPanel, setShowStickyPanel] = useState(false);
```

- [ ] **Step 2: Add IntersectionObserver effect**

Add this `useEffect` after the existing `useEffect` blocks (or after `reviewsRef` declaration):

```tsx
useEffect(() => {
  const el = cartButtonRef.current;
  if (!el) return;
  const observer = new IntersectionObserver(
    ([entry]) => setShowStickyPanel(!entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(el);
  return () => observer.disconnect();
}, []);
```

- [ ] **Step 3: Wrap the main AnimatedCartButton with the ref div**

Find the `AnimatedCartButton` inside the qty + actions flex row (the main one with `flex-1 h-[50px]`). Wrap it:

```tsx
              <div ref={cartButtonRef} className="flex-1">
                <AnimatedCartButton
                  qty={qty}
                  className="w-full h-[50px] rounded-full flex items-center justify-center bg-[#315350] hover:bg-[#3c6460] transition-colors font-['Manrope',sans-serif] font-semibold text-[15px] text-white"
                  iconSize={17}
                />
              </div>
```

Note: change `className` on `AnimatedCartButton` from `flex-1 h-[50px]...` to `w-full h-[50px]...` since flex-1 now applies to the wrapper div.

- [ ] **Step 4: Add the sticky panel JSX**

Add this just before the final closing `</div>` of the `ProductPage` return (after the `{/* Similar products */}` section):

```tsx
        {/* ── Sticky Buy Panel ── */}
        <AnimatePresence>
          {showStickyPanel && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#fbfbf8]/95 backdrop-blur-md border-t border-[rgba(55,73,87,0.1)]"
            >
              <div className="max-w-[1440px] mx-auto px-[80px] py-[14px] flex items-center gap-[20px]">
                <img
                  src={GALLERY[activeImg]}
                  alt=""
                  className="w-[48px] h-[48px] rounded-[10px] object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-['Manrope',sans-serif] font-semibold text-[14px] text-black truncate">{product.name}</p>
                  <p className="font-['Manrope',sans-serif] font-bold text-[18px] text-black leading-none">
                    {product.price.toLocaleString("ru-RU")} ₸
                  </p>
                </div>
                <AnimatedCartButton
                  qty={qty}
                  className="shrink-0 h-[46px] px-[28px] rounded-full flex items-center justify-center bg-[#315350] hover:bg-[#3c6460] transition-colors font-['Manrope',sans-serif] font-semibold text-[14px] text-white"
                  iconSize={16}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
```

- [ ] **Step 5: Verify sticky panel**

Run dev server. Navigate to `/product/ukrasheniya/1`. Scroll down past the "В корзину" button — sticky panel should slide up from the bottom. Scroll back up — it should slide back down.

- [ ] **Step 6: Commit**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && git add src/app/components/ProductPage.tsx && git commit -m "feat: add sticky buy panel"
```

---

## Task 4: Heart Animation

**Files:**
- Modify: `src/app/components/ProductPage.tsx`

- [ ] **Step 1: Add `useAnimationControls` to the import**

Find the existing motion/react import:
```tsx
import { animate, motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
```

Add `useAnimationControls`:
```tsx
import { animate, motion, AnimatePresence, useMotionValue, useTransform, useAnimationControls } from "motion/react";
```

- [ ] **Step 2: Add state and controls in `ProductPage`**

After the `const [qty, setQty] = useState(1);` line, add:

```tsx
const [favorited, setFavorited] = useState(false);
const heartControls = useAnimationControls();
```

- [ ] **Step 3: Add click handler**

Replace the existing `handleFavorite` function:

```tsx
// Old:
function handleFavorite() { requireAuth("favorite"); }
```

With:

```tsx
async function handleFavoriteClick() {
  const next = !favorited;
  setFavorited(next);
  await heartControls.start({
    scale: [1, 1.5, 0.85, 1],
    transition: { duration: 0.4, times: [0, 0.3, 0.7, 1] },
  });
}
```

- [ ] **Step 4: Update the heart button JSX**

Find the heart button (after the AnimatedCartButton, looks like):
```tsx
              <button onClick={handleFavorite}
                className="w-[50px] h-[50px] rounded-full border border-[rgba(55,73,87,0.2)] flex items-center justify-center hover:border-[#315350] transition-colors"
                style={{ background: "#fff" }}>
                <Heart size={18} fill="none" stroke="#374957" strokeWidth={1.5} />
              </button>
```

Replace with:
```tsx
              <motion.button
                onClick={handleFavoriteClick}
                animate={heartControls}
                className="w-[50px] h-[50px] rounded-full border flex items-center justify-center transition-colors"
                style={{
                  borderColor: favorited ? "rgba(229,62,62,0.3)" : "rgba(55,73,87,0.2)",
                  background: favorited ? "rgba(229,62,62,0.06)" : "#fff",
                }}
              >
                <Heart
                  size={18}
                  fill={favorited ? "#e53e3e" : "none"}
                  stroke={favorited ? "#e53e3e" : "#374957"}
                  strokeWidth={1.5}
                />
              </motion.button>
```

- [ ] **Step 5: Verify heart animation**

In browser, click the heart button. The heart should pop (scale up then bounce back), icon changes to filled red. Click again — toggles back to outline. No page navigation should occur.

- [ ] **Step 6: Commit**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && git add src/app/components/ProductPage.tsx && git commit -m "feat: add heart toggle animation"
```

---

## Task 5: Review Cards Reveal

**Files:**
- Modify: `src/app/components/ProductPage.tsx`

- [ ] **Step 1: Wrap each ReviewCard with motion.div**

Inside the accordion's reviews content, find the `visibleReviews.map` render:

```tsx
                      {visibleReviews.map((r) => (
                        <ReviewCard
                          key={r.id}
                          review={r}
                          isOwn={ownReviewIds.has(r.id)}
                          onEdit={() => setEditingReview(r)}
                          onDelete={() => handleDeleteReview(r.id)}
                        />
                      ))}
```

Replace with:
```tsx
                      {visibleReviews.map((r, index) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
                        >
                          <ReviewCard
                            review={r}
                            isOwn={ownReviewIds.has(r.id)}
                            onEdit={() => setEditingReview(r)}
                            onDelete={() => handleDeleteReview(r.id)}
                          />
                        </motion.div>
                      ))}
```

Note: `key` moves from `ReviewCard` to the outer `motion.div`.

- [ ] **Step 2: Verify review reveal**

Open the reviews accordion, then slowly scroll down through the review list — each card should fade up into view sequentially with a stagger delay. Already-visible cards should not re-animate (once: true).

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && git add src/app/components/ProductPage.tsx && git commit -m "feat: add scroll-reveal animation to review cards"
```

---

## Task 6: Flying to Cart

**Files:**
- Modify: `src/app/components/Layout.tsx` (add id to cart button)
- Modify: `src/app/components/ProductPage.tsx` (FlyingImage component + AnimatedCartButton extension + galleryRef)

- [ ] **Step 1: Add `id` to cart button in Layout.tsx**

Find the cart button in `Layout.tsx` (around line 144):
```tsx
                <button onClick={() => navigate(authPath("cart"))} className="relative size-[20px] hover:opacity-70 transition-opacity" aria-label="Корзина">
```

Add `id="cart-icon-btn"`:
```tsx
                <button id="cart-icon-btn" onClick={() => navigate(authPath("cart"))} className="relative size-[20px] hover:opacity-70 transition-opacity" aria-label="Корзина">
```

- [ ] **Step 2: Add `createPortal` import to ProductPage.tsx**

Find the react import:
```tsx
import { useCallback, useEffect, useRef, useState } from "react";
```

Add `createPortal`:
```tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
```

- [ ] **Step 3: Add `FlyingImage` component**

Add this function just before `// ── Animated Cart Button ──` (around line 249):

```tsx
// ── Flying Image ─────────────────────────────────────────────────────────────

type FlyPos = { startX: number; startY: number; endX: number; endY: number };

function FlyingImage({ imgSrc, pos, onComplete }: {
  imgSrc: string;
  pos: FlyPos;
  onComplete: () => void;
}) {
  return createPortal(
    <motion.div
      initial={{ x: pos.startX, y: pos.startY, scale: 1, opacity: 1, borderRadius: "8px" }}
      animate={{ x: pos.endX, y: pos.endY, scale: 0.2, opacity: 0, borderRadius: "50%" }}
      transition={{ duration: 0.65, ease: [0.2, 0, 0.8, 1] }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        zIndex: 9999,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <img src={imgSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
    </motion.div>,
    document.body
  );
}
```

- [ ] **Step 4: Extend `AnimatedCartButton` with new props**

Replace the existing `AnimatedCartButton` function signature and body:

Old signature:
```tsx
function AnimatedCartButton({
  qty,
  className,
  iconSize = 17,
  stopPropagation = false,
}: {
  qty: number;
  className: string;
  iconSize?: number;
  stopPropagation?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleClick(e: React.MouseEvent) {
    if (stopPropagation) e.stopPropagation();
    if (added) return;
    setAdded(true);
    addToCart(qty);
    setTimeout(() => setAdded(false), 2000);
  }
```

New signature and click handler (keep the JSX return unchanged):
```tsx
function AnimatedCartButton({
  qty,
  className,
  iconSize = 17,
  stopPropagation = false,
  imgSrc,
  flyFromRef,
}: {
  qty: number;
  className: string;
  iconSize?: number;
  stopPropagation?: boolean;
  imgSrc?: string;
  flyFromRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [added, setAdded] = useState(false);
  const [flyPos, setFlyPos] = useState<FlyPos | null>(null);
  const { addToCart } = useCart();

  function handleClick(e: React.MouseEvent) {
    if (stopPropagation) e.stopPropagation();
    if (added) return;
    setAdded(true);
    addToCart(qty);
    setTimeout(() => setAdded(false), 2000);

    if (imgSrc && flyFromRef?.current) {
      const from = flyFromRef.current.getBoundingClientRect();
      const cartBtn = document.getElementById("cart-icon-btn");
      if (cartBtn) {
        const to = cartBtn.getBoundingClientRect();
        setFlyPos({
          startX: from.left + from.width / 2 - 30,
          startY: from.top + from.height / 2 - 30,
          endX: to.left + to.width / 2 - 10,
          endY: to.top + to.height / 2 - 10,
        });
      }
    }
  }
```

Then append the portal after the closing `</motion.button>` in the return, and close the fragment:

Old return:
```tsx
  return (
    <motion.button
      onClick={handleClick}
      ...
    >
      ...
    </motion.button>
  );
```

New return:
```tsx
  return (
    <>
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`${className} overflow-hidden`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-[8px]"
            >
              <Check size={iconSize} strokeWidth={2.5} />
              Добавлено
            </motion.span>
          ) : (
            <motion.span
              key="cart"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-[8px]"
            >
              <ShoppingCart size={iconSize} strokeWidth={2} />
              В корзину
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      {flyPos && imgSrc && (
        <FlyingImage
          imgSrc={imgSrc}
          pos={flyPos}
          onComplete={() => setFlyPos(null)}
        />
      )}
    </>
  );
```

- [ ] **Step 5: Add `galleryRef` in `ProductPage` and pass to the main `AnimatedCartButton`**

After `const [activeImg, setActiveImg] = useState(0);`, add:
```tsx
const galleryRef = useRef<HTMLDivElement>(null);
```

Find the gallery container div (the one with `className="flex-1 bg-[#f0eeed] rounded-[24px] overflow-hidden relative aspect-square"`), add `ref={galleryRef}`:
```tsx
            <div ref={galleryRef} className="flex-1 bg-[#f0eeed] rounded-[24px] overflow-hidden relative aspect-square">
```

Pass props to the main AnimatedCartButton (the one inside `<div ref={cartButtonRef}>`):
```tsx
                <AnimatedCartButton
                  qty={qty}
                  className="w-full h-[50px] rounded-full flex items-center justify-center bg-[#315350] hover:bg-[#3c6460] transition-colors font-['Manrope',sans-serif] font-semibold text-[15px] text-white"
                  iconSize={17}
                  imgSrc={GALLERY[activeImg]}
                  flyFromRef={galleryRef}
                />
```

- [ ] **Step 6: Verify flying to cart**

In browser, navigate to a product page. Click "В корзину". A small circular copy of the product photo should fly from the gallery area toward the cart icon in the header, shrinking and fading as it goes. The cart count badge should increment simultaneously.

- [ ] **Step 7: Commit**

```bash
cd "/Volumes/KINGSTON/Downloads/Implement feature (1)" && git add src/app/components/ProductPage.tsx src/app/components/Layout.tsx && git commit -m "feat: add flying to cart animation"
```

---

## Self-Review Checklist

- [x] **Accordion** — 5 items, multi-open, defaultOpen on Описание, chevron rotates, height animates
- [x] **Sticky Buy Panel** — IntersectionObserver on cartButtonRef, AnimatePresence spring, shows price + button
- [x] **Heart Animation** — favorited toggle, useAnimationControls pop, no auth redirect
- [x] **Review Cards Reveal** — whileInView on each card, stagger delay, once:true
- [x] **Flying to Cart** — FlyingImage portal, galleryRef origin, cart-icon-btn destination, scale+opacity out
- [x] No TBD/TODO placeholders
- [x] Type `FlyPos` defined in Task 6 Step 3, used in Step 4 — consistent
- [x] `cartButtonRef` type `RefObject<HTMLDivElement | null>` matches `useRef<HTMLDivElement>(null)` 
- [x] `AnimatedCartButton` sticky panel variant does not pass `flyFromRef` (intentional — sticky panel button has no gallery ref, no fly animation)
- [x] `reviewsRef` moved to wrapper div around reviews AccordionItem — scroll-to still works
