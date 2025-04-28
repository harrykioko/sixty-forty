# 🤝 Sixty40 Admin Dashboard: Contributing Guide

Welcome!  
This guide outlines the conventions, coding standards, and best practices for contributing to the Sixty40 Admin Dashboard project.

Whether you're fixing a typo, shipping a new feature, or refactoring code, please follow these principles to maintain a high-quality, scalable codebase.

---

## 🛠️ Project Setup

```bash
# Clone the repo
git clone [repo_url]

# Install dependencies
npm install

# Start local dev server
npm run dev
```

---

## 🧹 Code Organization Rules

### Components:
- Place shared components under `/components/`.
- Place Admin-specific components under `/components/admin/`.
- Keep component files ideally <300 lines; break down if necessary.

### Hooks:
- Place custom React hooks under `/hooks/`.
- Name hooks starting with `use` (e.g., `useDashboardState.ts`).

### Utilities:
- Place utility functions under `/lib/`.
- Group constants under `/constants/` (colors, routes, enums).

### Pages:
- Public and admin pages live under `/pages/`.
- Only minimal logic in pages — delegate to components/hooks.

---

## 🎨 Styling Conventions

- Use **TailwindCSS utilities first**.
- Use **shadcn/ui components** for complex UI controls (e.g., Dialogs, Menus).
- Custom styles via Tailwind utility classes or reusable custom classes.
- **Glassmorphic visual style**: Use `backdrop-blur`, translucent backgrounds, soft border radii.
- Avoid custom CSS unless absolutely necessary.

---

## 🔥 Code Style Guidelines

### TypeScript:
- Always define prop types via interfaces.
- Avoid `any` unless absolutely necessary.
- Prefer explicit return types for non-trivial functions.

### Naming:
- Components: `PascalCase`
- Hooks: `camelCase` starting with `use`
- Variables and Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Folder Structure:
- Keep hierarchy flat and logical.
- Avoid deeply nested folders unless absolutely necessary.

### Imports:
- Group external libraries first.
- Then absolute imports (`@/components/...`).
- Then relative imports (`./`).

---

## 📝 Commit Message Guidelines

Use **clear, descriptive commit messages**.

**Format:**

```plaintext
[type]: short message

(optional) longer explanatory message if needed
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactor (no new features or bugs)
- `style`: Visual/UI tweaks only
- `chore`: Maintenance tasks (e.g., updating deps)

**Examples:**
```plaintext
feat: add PastWeekCard component to admin dashboard
fix: correct auth redirect issue for unauthenticated admins
refactor: clean up product form and modal structure
style: polish hover effects for cards
```

---

## 🚫 Global "Don't Break It" Rules

- ❌ No public signup added to admin dashboard.
- ❌ No emoji in commits, prompts, or UI copy.
- ❌ No redundant utility components.
- ❌ No introducing external libraries without approval.

- ✅ Prefer Tailwind utilities first; shadcn/ui for complex components.
- ✅ Minimize component bloat — keep files readable.
- ✅ Always favor clarity, consistency, and reusability.

---

## ✅ How to Make a Pull Request

1. Create a new branch off `main`:
   ```bash
   git checkout -b feature/your-branch-name
   ```

2. Make your changes.

3. Commit using correct format.

4. Push your branch:
   ```bash
   git push origin feature/your-branch-name
   ```

5. Open a Pull Request against `main` branch.

6. Link PR to related issues if applicable.

7. Request a review.

---

This guide helps ensure that Sixty40 Admin remains clean, scalable, and easy to maintain as it grows.

Thank you for keeping the standard high! 🚀
