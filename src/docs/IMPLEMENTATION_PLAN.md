# 🚀 Sixty40 Admin Dashboard – Implementation Plan

_This is a living document. Update as you make progress._

---

## 🟢 In Progress

### Battle Card Visual Polish
- [x] Apply glassmorphism (backdrop-blur, translucent background, soft shadow)
- [x] Increase internal padding and spacing
- [x] Refine border and card styling (rounded corners, subtle border)
- [x] Improve hierarchy and readability (typography, section separation)
  - [x] Add divider between timeline/status and metadata row
- [x] Ensure responsiveness and accessibility
  - [x] Metadata row is mobile-friendly (column layout on small screens)
- [x] Maintain and improve edit/view buttons in top-right
  - [x] Use glassmorphic, circular style with focus/hover states
  - [x] Add tooltips and aria-labels for accessibility
  - [x] Ensure mobile-friendly placement and spacing

### General Dashboard Layout Polish
- [x] Remove redundant elements (e.g., rogue footer button)
  - [x] Persistent Create New Battle footer button removed
- [x] Ensure consistent glassmorphic effects across panels
- [x] Streamline layout for clarity and usability
  - [x] Spacing, alignment, and glassmorphism are now consistent across dashboard

### Center and Glassify "Add New Product" Modal
- [x] Move modal to true center of screen
- [x] Apply glassmorphism styling
  - [x] Added backdrop blur and translucent background
  - [x] Improved card styling with proper border opacity
  - [x] Added gradient text effect to header
- [x] Ensure modal is responsive and accessible
  - [x] Proper max-width and max-height constraints
  - [x] Improved scrollbar styling for better UX
  - [x] Added smooth animations and transitions
  - [x] Implemented click outside to close
- [ ] **Polish Scrollbar and Close Button**
  - [ ] Make scrollbar ultra-minimalist: thinner, more translucent, rounded, and trackless
  - [ ] Remove top-right "X" close button for a cleaner look
  - [ ] Ensure modal can still be closed via outside click and Cancel button

### Bugfix: ProductForm 'Failed to save product' (week_id missing)
- [ ] Pass the current/selected week as a prop to ProductForm wherever it is used
- [ ] Update ProductForm and useProductForm to accept and use the week prop
- [ ] Test that new products can be saved and are associated with the correct week

### Battle Details Page & Product Modal Redesign
- [ ] Header: Show week pill, date range pill, and new status/stage pill (replaces timeline)
- [ ] Product Overview: 
  - [ ] If 2+ products: show side-by-side in responsive grid
  - [ ] If 1 product: center card, add prominent Add Product button
  - [ ] If 0 products: center Add Product button with CTA
- [ ] Product Card: Builder pill, name, hero image, short description, edit/view button
- [ ] Product Modal: Remove timeline, add status pill near title, prioritize product info at top, glassmorphic styling
- [ ] Responsive: Grid collapses to 1 column on mobile, all elements accessible
- [ ] Test: Add, edit, and view flows for all product states

---

## ✅ Completed

- [x] TimelineStepper (StatusTimeline) Redesign
  - Icons above line
  - Thicker/animated progress line
  - Improved spacing and responsiveness
  - Accessibility/tooltips
  - Glassmorphic polish
- [x] Frontend Audit Completed (May 28, 2025)
- [x] Project Rules and Documentation Setup (May 28, 2025)

---

## 🔜 Up Next

- [ ] Build PastWeekCard component (show historical battle weeks below current battle)
- [ ] Improve Edit Week Modal layout (spacing, mobile responsiveness)
- [ ] Add Voting Analytics Overview (entries, votes, winner inline on dashboard)
- [ ] Improve responsiveness across Admin Dashboard (mobile, tablet, desktop)
- [ ] Create "Nudge Builders" Button (admin action for reminders)
- [ ] Accessibility & Color Contrast Audit (ensure all new UI changes meet standards)
- [ ] Add/Update Unit & Integration Tests (cover new UI logic and layout changes)

---

## 🧠 Guidelines

- Move tasks to **Completed** when finished (with date).
- Use checklists for multi-step features.
- Keep entries clear, concise, and action-oriented.

---

## 🏁 Last Updated
- May 29, 2025

## Longer Term Items

- Ultra-minimalist, trackless, translucent scrollbar for modals
  - Use custom CSS for a 3px, highly translucent, fully rounded white thumb
  - Track should be fully transparent
  - Scope only to modal containers
  - Revisit after higher-priority issues are addressed
