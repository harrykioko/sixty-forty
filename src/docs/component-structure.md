# Sixty40 Component Structure Documentation

## Overview
This document provides a comprehensive catalog of all frontend components in the Sixty40 application, their purposes, and usage guidelines.

## Component Categories

### 🏗️ Layout Components
Components responsible for the overall page structure and layout.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| AdminHeader | `/components/admin/AdminHeader.tsx` | Main navigation header for admin dashboard | Admin layout wrapper | Default |
| SiteFooter | `/components/layouts/SiteFooter.tsx` | Global footer component | Main layout | Default |
| Sidebar | `/components/ui/Sidebar.tsx` | Main navigation sidebar | Admin layout | Default |

### 🔒 Authentication Components
Components handling user authentication and authorization.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| AdminAuth | `/components/admin/AdminAuth.tsx` | Admin authentication wrapper | Admin routes | Default |

### 📱 Section Components
Major page sections and content blocks.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| PastBattlesSection | `/components/sections/past-battles/PastBattlesSection.tsx` | Displays list of past battles | Dashboard | Default |
| HowItWorksSection | `/components/sections/HowItWorksSection.tsx` | Explains platform functionality | Landing page | Default |
| BuildersSection | `/components/sections/BuildersSection.tsx` | Displays builder information | Landing page | Default |
| BattleSection | `/components/sections/BattleSection.tsx` | Main battle display component | Battle page | Default |

### 🎯 Admin Components
Components specific to the admin interface.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| AdminProductList | `/components/admin/AdminProductList.tsx` | Displays list of products | Admin dashboard | Default |

### 🎨 UI Components
Reusable UI elements and controls.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| ProductCard | `/components/ui/ProductCard.tsx` | Individual product display | Product lists | Default |
| VotingResults | `/components/ui/VotingResults.tsx` | Displays battle voting results | Battle sections | Default |
| CountdownTimer | `/components/ui/CountdownTimer.tsx` | Battle countdown display | Active battles | Default |
| EmailCapture | `/components/ui/EmailCapture.tsx` | Email subscription form | Landing page | Default |
| SocialShare | `/components/ui/SocialShare.tsx` | Social media sharing buttons | Product pages | Default |
| StickyCTA | `/components/ui/StickyCTA.tsx` | Persistent call-to-action | Various pages | Default |
| InputOTP | `/components/ui/InputOTP.tsx` | One-time password input | Authentication | Default |
| HoverCard | `/components/ui/HoverCard.tsx` | Card with hover effects | Product cards | Default |
| DropdownMenu | `/components/ui/DropdownMenu.tsx` | Dropdown navigation menu | Navigation | Default |
| ContextMenu | `/components/ui/ContextMenu.tsx` | Right-click context menu | Various | Default |
| AlertModal | `/components/ui/AlertModal.tsx` | Confirmation modal | Various | Default |

### 💫 Utility Components
The application includes multiple shadcn/ui derived components in `/components/ui/`:
- Modal
- Toast
- Dropdown
- Form elements
- Navigation components

### 🎭 Modal Components
Components that display content in modal dialogs.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| PastBattleDetailsModal | `/components/admin/modals/PastBattleDetailsModal.tsx` | Displays detailed information about past battles | Past battles section | Default |
| EditBattleModal | `/components/admin/modals/EditBattleModal.tsx` | Allows editing of battle details | Battle management | Default |
| BattleDetailsModal | `/components/admin/modals/BattleDetailsModal.tsx` | Shows comprehensive battle information | Battle view | Default |
| WeekEditorModal | `/components/admin/modals/WeekEditorModal.tsx` | Manages week-based battle scheduling | Week management | Default |
| CreateBattleModal | `/components/admin/dashboard/CreateBattleModal.tsx` | Creates new battle weeks | Battle management | Default |
| EmptyStateModal | `/components/admin/panels/EmptyStateModal.tsx` | Displays empty state message | Various sections | Default |

### 📊 Panel Components
Components that display content in panel sections.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| StatusProgressBar | `/components/admin/panels/StatusProgressBar.tsx` | Shows progress of battle status | Battle view | Default |
| StatusTimeline | `/components/admin/panels/StatusTimeline.tsx` | Displays battle status history | Battle view | Default |
| WeekManagerPanel | `/components/admin/panels/WeekManagerPanel.tsx` | Manages week-based battle scheduling | Week management | Default |
| AdminActionsPanel | `/components/admin/panels/AdminActionsPanel.tsx` | Provides admin action buttons | Admin dashboard | Default |

### 📝 Form Components
Components for data input and editing.

| Component | File Path | Purpose | Usage | Export Type |
|-----------|-----------|---------|--------|-------------|
| EditProductForm | `/components/admin/form/EditProductForm.tsx` | Form for editing product details | Product management | Default |
| CreateProductForm | `/components/admin/form/CreateProductForm.tsx` | Form for creating new products | Product creation | Default |
| TechStackInput | `/components/admin/form/TechStackInput.tsx` | Input for technology stack selection | Product forms | Default |
| ImageUpload | `/components/admin/form/ImageUpload.tsx` | Handles image upload functionality | Product forms | Default |
| GalleryUpload | `/components/admin/form/GalleryUpload.tsx` | Manages gallery image uploads | Product forms | Default |
| FeaturesList | `/components/admin/form/FeaturesList.tsx` | Manages product features list | Product forms | Default |

## Naming Conventions

### Component Naming Rules
1. **Admin Components**
   - Prefix: `Admin`
   - Example: `AdminHeader`, `AdminProductList`

2. **Public Components**
   - No prefix needed for public components
   - Example: `ProductCard`, `BattleSection`

3. **Layout Components**
   - Suffix: `Layout`
   - Example: `MainLayout`, `AdminLayout`

4. **Section Components**
   - Suffix: `Section`
   - Example: `HeroSection`, `FeaturesSection`

5. **Modal Components**
   - Suffix: `Modal`
   - Example: `CreateBattleModal`, `AlertModal`

### File Naming Rules
- ✅ Use **PascalCase** for all React component files (e.g., `ProductCard.tsx`, `BattleSection.tsx`)
- ✅ Use **camelCase** for hooks and utilities (e.g., `useDashboardState.ts`, `formatDate.ts`)
- ✅ Use **kebab-case** only for config files and folders (e.g., `tailwind.config.ts`, `/admin/modals/`)
- ❌ Avoid mixing PascalCase and kebab-case in the same directory

## Improvement Recommendations

### Renaming Suggestions
1. `ProductList` → `AdminProductList` (for consistency)
2. `sidebar.tsx` → `Sidebar.tsx` (for PascalCase consistency)
3. Consider renaming generic `Card` to more specific use cases

### Potential Confusion Points
1. Multiple modal-related components spread across different directories
2. Mixing of shadcn/ui components with custom components in UI directory
3. Inconsistent casing in filenames (some kebab-case, some PascalCase)

### Organization Improvements
1. Move shadcn/ui components to a separate `/components/ui/shadcn` directory
2. Group modal components in a single location
3. Standardize file naming convention across all components

## Next Steps

1. Standardize file naming to PascalCase for components
2. Create clear separation between shadcn/ui and custom components
3. Implement consistent prefix/suffix naming conventions
4. Review and potentially consolidate modal components
5. Create additional documentation for component usage patterns

## Maintenance Guidelines

1. Keep components focused on a single responsibility
2. Maintain consistent naming conventions
3. Document any new components added to the codebase
4. Review and update this documentation when making structural changes
5. Ensure all components follow the established patterns and conventions 