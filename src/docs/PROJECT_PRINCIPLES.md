# 📜 Sixty40 Admin Dashboard: Project Principles

This document defines the **core design, UX, UI, and engineering philosophies** guiding the development of the Sixty40 Admin Dashboard.

---

## 🎨 Design System Principles

- **Visual Style:**
  - Dark glassmorphic theme with translucent layers and subtle depth.
  - Heavy use of soft shadows, backdrop blur, and light gradients.
  - Modern, futuristic, sleek, and slightly playful.

- **Primary Color Palette:**
  - Sixty40 Blue: `#0EA5E9`
  - Sixty40 Purple: `#9B87F5`
  - Dark Background: `#1A1F2C`
  - Neutrals: `#8E9196` (gray), `#F1F0FB` (light)
  - Accent Colors: Green `#10B981`, Yellow `#F59E0B`, Orange `#F97316`, Pink `#D946EF`

- **Typography:**
  - Display font: `Space Grotesk`
  - Body font: `Inter`
  - Headings: 2xl (1.5rem) to 3xl (1.875rem)
  - Body text: sm (0.875rem) to base (1rem)
  - Font weights: 400 (Regular), 500 (Medium), 700 (Bold)

- **Spacing System:**
  - Base on Tailwind spacing scale.
  - Major sections: `gap-8`, `mb-8`.
  - Inside cards: `p-6` to `p-10`.

---

## 🧠 UX Principles

- **Clarity Over Complexity:**  
  Prioritize understandable flows, simple wording, and intuitive interactions over visual cleverness.

- **Clear Visual Hierarchy:**  
  - Primary actions should be visually dominant.
  - Secondary actions should be lighter but still visible.
  - Metadata should be readable but unobtrusive.

- **Responsiveness Focus:**
  - Desktop-first optimization.
  - Tablet and mobile adaptations where necessary (future proofing).
  - Avoid stacking critical buttons vertically unless on small screens.

- **Progressive Disclosure:**  
  Show primary information first; reveal deeper options only when needed.

- **Speed and Delight:**
  - All actions should have quick visual feedback (hover, click, load).
  - Subtle animations (0.2s–0.3s) using `easeInOut`.
  - Avoid unnecessary loading spinners — prefer optimistic UI when possible.

---

## 🎯 UI Interaction Best Practices

- **Hover Effects:**
  - Scale 1.02–1.05x max.
  - Lighten background or outline subtly.

- **Focus States:**
  - Always provide ring outlines (`ring-2`, `ring-sixty40-purple`) for accessibility.
  - No invisible focus-only behavior.

- **Animation Guidelines:**
  - Entrance animations: Fade + slight scale (staggered for lists).
  - Feedback animations: Quick (under 0.3s).
  - Never disable animations for performance unless profiling shows major issues.

- **Glassmorphism Effects:**
  - Use `backdrop-blur-md` or `backdrop-blur-xl`.
  - Maintain translucent contrast levels (bg-opacity-5 to bg-opacity-20).
  - Border radius: 8px for small elements, 16px for larger cards.

---

## 🧹 Code & Component Principles

- **Atomic Components:**  
  Each component should do **one thing well** — no “god components.”

- **Modular Organization:**  
  - Pages under `/pages/`
  - Components under `/components/`
  - Hooks under `/hooks/`
  - Libs/utilities under `/lib/`
  - Constants under `/constants/`

- **Consistent Naming:**
  - `CurrentWeekCard.tsx`, `PastWeekCard.tsx` (PascalCase for components)
  - `useCurrentBattle.ts`, `useDashboardState.ts` for hooks

- **Clean File Size:**  
  - Component files ideally <300 lines.
  - Break out subcomponents if exceeding.

- **Type Safety:**
  - All components typed with explicit prop interfaces.
  - No `any` unless absolutely unavoidable.

---

## 🚫 Global Rules

- ❌ No emojis in prompts, commits, UI copy.
- ❌ No public user signup for admin dashboard.
- ❌ No duplicate utility components.
- ❌ No unnecessary wrapper divs ("div soup").

- ✅ Prefer Tailwind utilities first; shadcn/ui for more complex controls.
- ✅ Minimal additional dependencies unless justified.
- ✅ Always favor reusability and clarity.

---

This document defines the foundation for every design, coding, and UX decision moving forward.

Consistency here = scalability and maintainability later.
