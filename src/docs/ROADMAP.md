# 🛤️ Sixty40 Admin Dashboard: Roadmap and Open Issues

This document tracks known UI/UX issues, technical debt, and future feature priorities for the Sixty40 Admin Dashboard.

It will be continuously updated as the project evolves.

---

## 🛠️ Current Known Issues

- **Mobile Responsiveness:**  
  - Certain dashboard layouts do not gracefully adapt to smaller screens.
  - Need dedicated media query breakpoints for cards, modals, timeline.

- **Empty State Improvements:**  
  - Empty dashboards, product lists, and voting screens could be more visually engaging (illustrations, animations, or CTAs).

- **Form Validation Feedback:**  
  - Errors are currently plain text; improve to inline feedback (e.g., form fields highlighted, contextual error messages).

- **Component Refactoring:**  
  - Some older admin components (e.g., ProductWeekCard, StatusTimeline) need final polish or rework to match newer visual style.

---

## 🔥 Technical Debt Areas

- **Database Operation Error Handling:**  
  - More consistent try/catch + toast feedback on all Supabase actions (especially create/update flows).

- **Naming Consistency:**  
  - A few props, tables, and hooks need standardization (`builder_id` vs `admin_id`, etc.).

- **Codebase Reusability:**  
  - Some duplication between modals/forms could be reduced via abstraction.

- **Testing Coverage:**  
  - Minimal unit or integration tests currently exist — need to introduce basic coverage for critical hooks, auth flow, and battle management.

---

## 🚀 Near-Term Feature Priorities

| Priority | Feature |
|:---|:---|
| High | Real-time voting update support (using Supabase Realtime) |
| High | Basic battle analytics (entries per week, votes per week, builder performance) |
| Medium | Builder profile pages (private for admins first) |
| Medium | Activity logging (basic admin audit trail) |
| Medium | "Nudge" system for reminding Harry/Marcos to submit entries |
| Low | Email notifications for new battles, voting reminders |
| Low | Voting fraud detection/prevention (duplicate IP/device checks) |

---

## 🌟 Future Feature Ideas

- **Multi-admin support with roles/permissions** (future-proofing for scale).
- **Advanced builder leaderboard** (total wins, average votes per entry, launch consistency).
- **Public-facing leaderboard/history page** (after admin tool is rock-solid).
- **Gamification mechanics for voting (optional points system).**
- **Weekly battle themes (e.g., "AI Tools Week", "Social SaaS Week") automated with theme pickers.**

---

## ✅ Recently Completed

- [x] Cleaned up Admin Dashboard layout
- [x] Standardized CurrentWeekCard and PastWeekCard
- [x] Fixed broken StatusTimeline component
- [x] Published official project documents (README, Principles, Architecture, Contributing Guide)
- [x] Prepared clean Cursor repo for long-term development

---

This roadmap helps keep priorities clear, technical debt visible, and Sixty40 Admin steadily improving.

Please update this file as features are completed or new priorities emerge.
