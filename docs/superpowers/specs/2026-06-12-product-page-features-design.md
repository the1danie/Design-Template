# Product Page — 5 Features Design

**Date:** 2026-06-12  
**File:** `src/app/components/ProductPage.tsx`, `src/app/components/Layout.tsx`  
**Stack:** React, motion/react (Framer Motion), Tailwind, lucide-react

---

## 1. Flying to Cart

**Goal:** When the user clicks "В корзину", a small copy of the active product photo flies from the gallery to the cart icon in the header, giving a premium feel.

**Architecture:**
- Add `id="cart-icon-btn"` to the cart `<button>` in `Layout.tsx`
- Add `galleryRef: RefObject<HTMLDivElement>` on the gallery container in `ProductPage`
- Extend `AnimatedCartButton` with two new optional props: `imgSrc?: string`, `flyFromRef?: RefObject<HTMLElement>`
- On click: read `flyFromRef.current.getBoundingClientRect()` (origin) and `document.getElementById("cart-icon-btn").getBoundingClientRect()` (destination)
- Render a `motion.div` via `createPortal(…, document.body)` at `position: fixed`, sized ~60×60px, with the product image as `object-cover`
- Animate: `x/y` from origin center → destination center, `scale 1 → 0.3`, `opacity 1 → 0`, `borderRadius "8px → 50%"` over ~600ms with `ease: [0.2, 0, 0.8, 1]`
- After animation completes: remove the portal element from state

**Constraints:**
- Only one flying element at a time (guard with `isFlying` state)
- If `flyFromRef` or `imgSrc` not provided, fall back to current behavior (no fly animation)

---

## 2. Heart Animation

**Goal:** Clicking the heart button toggles a `favorited` state with a pop animation — no auth redirect.

**Architecture:**
- Add `favorited` state (`useState(false)`) to `ProductPage`
- Replace static `<Heart>` icon with an animated version:
  - `AnimatePresence mode="wait"` to swap outline ↔ filled heart
  - On toggle: fire `useAnimationControls` sequence `scale: [1, 1.5, 0.85, 1]` via spring
- Filled color: `#e53e3e`; outline: `#374957`
- Button bg on favorited: `rgba(229,62,62,0.06)`; hover ring: `rgba(229,62,62,0.12)`
- Remove call to `handleFavorite()` (auth redirect) from this button

---

## 3. Review Cards Reveal

**Goal:** Each review card animates into view as the user scrolls to it.

**Architecture:**
- Wrap each `ReviewCard` render in a `motion.div`:
  ```tsx
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
  ```
- `index` is the position in `visibleReviews` array
- No changes to `ReviewCard` component itself

---

## 4. Sticky Buy Panel

**Goal:** A fixed bottom bar appears when the main "В корзину" button scrolls out of the viewport, keeping the purchase CTA always accessible.

**Architecture:**
- Add `cartButtonRef: RefObject<HTMLDivElement>` wrapping `AnimatedCartButton` in the info block
- `useEffect` with `IntersectionObserver` on `cartButtonRef`: set `showStickyPanel` state when `isIntersecting` changes
- Render `<AnimatePresence>` with a `motion.div` panel:
  - `position: fixed`, `bottom: 0`, `left: 0`, `right: 0`, `z-index: 50`
  - `initial={{ y: 100, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`
  - `exit={{ y: 100, opacity: 0 }}`
  - `transition={{ type: "spring", stiffness: 380, damping: 36 }}`
- Panel content: product name (max 1 line, truncated) + price + `AnimatedCartButton` (same `qty`, same `imgSrc`)
- Panel style: `bg-[#fbfbf8]/95 backdrop-blur-md border-t border-[rgba(55,73,87,0.1)] px-6 py-3`

---

## 5. Accordion (multi-open)

**Goal:** Replace the flat sections below the product block with an accordion. Multiple items can be open simultaneously.

**Items (in order):**
| # | Label | Default | Content source |
|---|-------|---------|----------------|
| 1 | Описание | Open | `details.description` (moved from info column) |
| 2 | Характеристики | Closed | Current characteristics grid |
| 3 | Доставка | Closed | New static content |
| 4 | Возврат | Closed | New static content |
| 5 | Отзывы | Closed | Full current reviews section |

**Architecture:**
- Before building, search 21st.dev via Magic MCP for an accordion component matching the design system
- `AccordionItem` component (defined in `ProductPage.tsx`):
  - Props: `title: string`, `defaultOpen?: boolean`, `children: React.ReactNode`
  - Internal `open` state (independent per item = multi-open)
  - Header: title + animated `ChevronDown` (rotates 0°↔180°)
  - Body: `motion.div` with `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: "auto", opacity: 1 }}`
  - Use `overflow: hidden` on the animated div
- Remove `details.description` paragraph from the info column (bottom of right panel)
- Replace the `<section>` blocks for Характеристики and Отзывы with `AccordionItem` wrappers
- Add new Доставка content: free delivery across Kazakhstan, 1–3 business days, courier + pickup
- Add new Возврат content: 14-day return, unused condition, refund within 5 business days

**Delivery content:**
- Бесплатная доставка по Казахстану
- Курьер 1–3 рабочих дня, самовывоз из пунктов выдачи
- Отслеживание заказа в личном кабинете

**Return content:**
- Возврат в течение 14 дней
- Товар должен быть в исходном состоянии
- Деньги возвращаются в течение 5 рабочих дней

---

## Implementation Order

1. Accordion (structural change, affects layout most)
2. Sticky Buy Panel (needs cart button ref — must be after accordion moves description out)
3. Heart Animation (isolated, self-contained)
4. Review Cards Reveal (wrapper only, no structural change)
5. Flying to Cart (most complex, depends on gallery ref + Layout change)

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/components/Layout.tsx` | Add `id="cart-icon-btn"` to cart button |
| `src/app/components/ProductPage.tsx` | All 5 features; `AccordionItem` component; `favorited` state; `galleryRef`; `cartButtonRef`; extend `AnimatedCartButton` |
| `src/app/context/CartContext.tsx` | No changes |
