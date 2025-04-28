# Sixty40 Admin Dashboard

Modern admin dashboard for managing Sixty40.dev weekly SaaS product battles.  
Built for clarity, performance, and a futuristic UX.

---

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS, shadcn/ui (based on Radix UI)
- **Animations:** Framer Motion
- **Forms:** react-hook-form, zod
- **State Management:** React Query, Context API
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Icons:** Lucide
- **Utilities:** date-fns, react-day-picker, sonner

---

## 🧠 Project Structure

- `/pages/admin/index.tsx` - Admin dashboard page
- `/components/admin/CurrentWeekCard.tsx` - Current featured battle
- `/components/admin/PastWeekCard.tsx` - Past battles list
- `/components/admin/dashboard/` - Dashboard layouts and utilities
- `/hooks/` - Custom React hooks
- `/lib/` - Utility functions

---

## 🛡️ Authentication

- Supabase email/password authentication
- Admin-only access (no public signup)
- Auth state via Context
- JWT tokens with local storage
- Auto-redirect for unauthorized access

---

## 🗄️ Database Overview

**Tables:**
- `weeks`: Battle periods
- `products`: Product entries
- `builders`: Builder profiles
- `votes`: Voting records
- `admins`: Admin users
- `emails`: Email subscriptions

**Relationships:**
- Products linked to builders and weeks
- Votes linked to products and weeks

---

## 🎨 Visual and Interaction Design

- Dark glassmorphic theme
- Primary Colors: Sixty40 Blue `#0EA5E9`, Purple `#9B87F5`
- Responsive first for desktop
- Subtle animations, hover states, focus outlines

---

## 🛠️ Setup Instructions

```bash
git clone [repo_url]
cd sixty40-admin
npm install
npm run dev
