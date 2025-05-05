# 🚀 Sixty40 Admin Dashboard – Implementation Plan

_This is a living document. Update as you make progress._

---

## 🟢 Current Sprint Focus

### Product Details Modal Redesign (CareerHQ Style)
- [ ] Implement full-width, glassmorphic hero header (image stretches across top)
- [ ] Organize modal with two-column layout:
  - [ ] Left: Product content (title, subtitle, about, features, builder notes)
  - [ ] Right: Metadata/actions (tech stack, pricing, demo, vote button)
- [ ] Apply modern glassmorphism (backdrop-blur, bg-black/40 or bg-slate-900/60, rounded corners, subtle borders)
- [ ] Ensure strong visual hierarchy (headings, spacing, section separation)
- [ ] Make "Vote for this Product" CTA visually prominent (purple gradient, shadow)
- [ ] Ensure mobile responsiveness and accessibility
- [ ] Update component documentation and README

---

## ✅ Recently Completed

- [x] Winner selection system core implementation
- [x] Voting functionality core implementation
- [x] Vote display enhancement
- [x] User vote status integration
- [x] Real-time updates for votes
- [x] Component/file renaming and structure standardization

---

## 🔜 Up Next

- [ ] Add loading and error states for modal and builder stats
- [ ] Add confirmation dialog before declaring winner
- [ ] Winner announcement scheduling and history tracking
- [ ] Winner statistics and analytics
- [ ] Comprehensive unit and integration tests for modal and voting flows

---

## 📝 Visual & Technical Requirements

### Modal Design
- **Hero:** Full-width image header, gradient overlay, "Built by" badge, close button top-right
- **Layout:** Two-column grid (`grid-cols-3`), left (2 cols) for content, right (1 col) for metadata/actions
- **Glassmorphism:** `bg-black/40` or `bg-slate-900/60`, `backdrop-blur-md/xl`, `rounded-xl/2xl`, `border-white/10`
- **Typography:** Clear heading hierarchy, `text-white`/`text-white/80`, strong section separation
- **Buttons:** CTA with purple gradient, shadow, and hover/focus states
- **Badges:** Tech stack as pill-style tags, modern and consistent
- **Responsiveness:** Stacks to single column on mobile, all actions accessible

### Code & Structure
- **Component size:** <300 lines, split logic as needed
- **Props:** Typed with interfaces, no `any`
- **Styling:** TailwindCSS utilities, shadcn/ui for advanced controls
- **File structure:** `/components/ui/ProductModal/` for modal and subcomponents

---

## 📚 Documentation & Testing

- [ ] Update README with new modal structure and usage
- [ ] Add/refresh JSDoc for all modal-related components
- [ ] Add unit tests for modal rendering, layout, and actions
- [ ] Add integration tests for voting and demo link flows

---

## 🧠 Guidelines

- Keep this plan up to date as tasks are completed or priorities shift.
- Remove or archive any completed or out-of-scope items regularly.
- Reference Sixty40 visual and code standards for all new work.

---

_Last updated: [Update this date as you work]_
