# 🏗️ Sixty40 Admin Dashboard: Architecture Overview

This document explains the full technical architecture of the Sixty40 Admin Dashboard, covering frontend, backend, authentication, database design, and key infrastructure.

---

## 🚀 Tech Stack Overview

**Frontend:**
- React 18
- TypeScript
- Vite (modern bundler)
- TailwindCSS (utility-first styling)
- shadcn/ui (built on Radix UI primitives)
- Framer Motion (animations)
- TanStack React Query (server state management)
- react-hook-form + zod (form management and validation)

**Backend:**
- Supabase (PostgreSQL database, Auth, Storage)

**Utilities:**
- date-fns (date formatting)
- react-day-picker (date picker component)
- sonner (toast notifications)
- Lucide React (icon set)

---

## 🧩 Frontend Structure

| Folder | Purpose |
|:---|:---|
| `/pages/` | Public and Admin route pages (e.g., `/`, `/admin`) |
| `/components/` | Shared and Admin-specific UI components |
| `/components/admin/` | All admin dashboard components (cards, timeline, layouts) |
| `/hooks/` | Custom React hooks for fetching, UI state, form state |
| `/lib/` | Utility functions (e.g., API clients, formatting helpers) |
| `/constants/` | Shared constants (colors, routes, configs) |
| `/context/` | Authentication provider and other context providers |

**Routing:**
- React Router DOM manages client-side routing.
- Admin routes are protected by auth checking hooks.

**State Management:**
- Context API for authentication (`AuthProvider`).
- React Query for fetching, caching, and syncing server state.
- Local useState or custom hooks for lightweight UI state.

---

## 🛡️ Authentication Architecture

**Auth Provider:**
- Supabase email/password login (no magic links, no OAuth).
- Auth state handled via Supabase `onAuthStateChange` event listener.
- JWT tokens are automatically refreshed by Supabase client SDK.

**Access Control:**
- Only authenticated admins can access `/admin` routes.
- `useAuth()` hook checks auth state.
- Redirect unauthenticated users to login page.

**Security Considerations:**
- Sessions stored securely.
- Sensitive routes gated client-side and backend-protected (where needed).
- Admin emails must be manually whitelisted via Supabase dashboard.

---

## 🗄️ Database Architecture (Supabase)

### Key Tables

| Table | Purpose |
|:---|:---|
| `weeks` | Defines each battle week (start/end dates, status, winner) |
| `products` | Entries submitted by builders for a given week |
| `builders` | Registered builder profiles (can be admins) |
| `votes` | Individual votes for products during battle |
| `admins` | Admin-level users (login credentials) |
| `emails` | Email subscription list for announcements/newsletters |

---

### Key Table Schemas

**weeks**
- `id` (UUID)
- `number` (integer)
- `start_date` (timestamp)
- `end_date` (timestamp)
- `status` (enum: draft, active, voting, completed)
- `winner_id` (UUID, references products)
- `created_at`, `updated_at`

**products**
- `id` (UUID)
- `builder_id` (UUID, references builders)
- `week_id` (UUID, references weeks)
- `name`, `short_desc`, `long_desc`
- `tech_stack` (text[])
- `features` (text[])
- `demo_url`
- `image_url`
- `pricing`
- `builder_notes`
- `created_at`

**builders**
- `id` (UUID)
- `name`
- `slug`
- `tagline`
- `avatar_url`
- `admin_id` (UUID, optional link to `admins`)

**votes**
- `id` (UUID)
- `product_id` (UUID, references products)
- `week_id` (UUID, references weeks)
- `voter_id` (string or UUID for device/browser hash)
- `metadata` (JSONB for storing browser/ip/user agent details)
- `created_at`

**admins**
- `id` (UUID)
- `email`
- `password_hash`
- `name`
- `created_at`

---

## 📦 Supabase Storage

- Used for uploading product hero images.
- Images stored under buckets by week or builder.
- Public URLs generated for frontend rendering.

---

## ⚡ Infrastructure and Deployment

| Tool | Purpose |
|:---|:---|
| Vercel | Hosting and deployment |
| Supabase | Database and authentication hosting |
| GitHub | Source code version control |
| Cursor | Local development and code editing |

---

## 📚 Future Enhancements

- Real-time database updates (using Supabase Realtime subscriptions)
- Admin activity audit logs
- Builder performance dashboards
- Secure analytics endpoints (private Supabase functions or edge functions)

---

This architecture document defines the technical foundation of the Sixty40 Admin Dashboard project.  
It should be kept up to date as infrastructure, authentication methods, or component structure evolves.
