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

## Export Patterns

### Component Export Rules
1. **Custom UI Components**
   - Use default exports for reusable UI components
   - Example: `export default ProductCard`

2. **Section Components**
   - Use named exports for page sections
   - Example: `export const BattleSection = () => {}`

3. **Layout Components**
   - Use default exports for layout wrappers
   - Example: `export default AdminLayout`

4. **Form Components**
   - Use default exports for form components
   - Example: `export default CreateProductForm`

5. **Modal Components**
   - Use default exports for modal components
   - Example: `export default ProductModal`

6. **shadcn/ui Components**
   - Use named exports to match shadcn/ui patterns
   - Example: `export { Button, type ButtonProps }`

### File Naming Conventions

1. **Custom Components**
   - Use PascalCase for all custom component files
   - Example: `ProductCard.tsx`, `BattleSection.tsx`

2. **shadcn/ui Components**
   - Use kebab-case to match shadcn/ui conventions
   - Example: `dropdown-menu.tsx`, `alert-dialog.tsx`

3. **Hooks and Utilities**
   - Use camelCase for all utility files
   - Example: `useToast.ts`, `formatDate.ts`

4. **Configuration Files**
   - Use kebab-case for config files
   - Example: `tailwind.config.ts`

### Import Patterns

1. **Default Exports**
   ```typescript
   import ProductCard from '@/components/ui/ProductCard';
   ```

2. **Named Exports**
   ```typescript
   import { Button } from '@/components/ui/button';
   import { BattleSection } from '@/components/sections/BattleSection';
   ```

3. **Multiple Named Exports**
   ```typescript
   import { Badge, type BadgeProps } from '@/components/ui/badge';
   ```

4. **Hooks**
   ```typescript
   import { useToast } from '@/hooks/useToast';
   ```

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

### Export Pattern Improvements
1. Standardize export patterns across similar component types
2. Update imports to match standardized export patterns
3. Document export decisions in component comments
4. Create automated checks for export consistency

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

## Common Import Issues and Solutions

### Import Path Issues
1. **Hook Imports**
   - ✅ Correct: `import { toast } from "@/hooks/use-toast";`
   - ❌ Incorrect: `import { toast } from "@/components/ui/use-toast";`
   - Note: Hooks should be imported from `/hooks` directory, not `/components`

2. **UI Component Imports**
   - ✅ Correct: `import { Button } from "@/components/ui/button";`
   - ❌ Incorrect: `import { Button } from "@/components/Button";`
   - Note: shadcn/ui components use kebab-case filenames

3. **Custom Component Imports**
   - ✅ Correct: `import { SocialShare } from "@/components/ui/SocialShare";`
   - ❌ Incorrect: `import { social-share } from "@/components/ui/social-share";`
   - Note: Custom components use PascalCase filenames

### Common Patterns to Watch
1. **Toast Usage**
   - Always import from hooks directory
   - Use the kebab-case filename (`use-toast.ts`)
   - Will be renamed to camelCase in future (`useToast.ts`)

2. **Button Component**
   - Always import from shadcn/ui location
   - Use kebab-case for the import path
   - Maintain consistent variant usage

3. **Modal Components**
   - Use `Modal` suffix (not `Dialog`)
   - Import from appropriate directory based on scope
   - Follow PascalCase naming

### Known Issues to Address
1. **Inconsistent Hook Naming**
   - Some hooks use kebab-case (`use-toast.ts`)
   - Others use camelCase (`useToast.ts`)
   - Plan to standardize all to camelCase

2. **Mixed Component Locations**
   - Some UI components in root `/components`
   - Others in `/components/ui`
   - Need to consolidate locations

3. **Import Path Confusion**
   - Multiple possible locations for similar components
   - Need to establish clear import patterns
   - Document exceptions to rules

4. **Directory Casing Inconsistency**
   - ❌ Issue: Duplicate directories with different casing (e.g., `past-battle-modal` and `PastBattleModal`)
   - ✅ Standard: Use PascalCase for component directories (e.g., `PastBattleModal`, `ProductModal`)
   - 🔄 Action: Need to consolidate duplicate directories and update imports
   - ⚠️ Impact: May cause import errors if not handled systematically

### Directory Naming Rules
1. **Component Directories**
   - ✅ Use PascalCase for component directories
   - Example: `ProductModal/`, `PastBattleModal/`
   - Matches component file naming convention

2. **Config and Utility Directories**
   - ✅ Use kebab-case for non-component directories
   - Example: `config/`, `utils/`

3. **Directory Structure Validation**
   - Regular audits needed to catch casing inconsistencies
   - Automated checks recommended
   - Document any temporary exceptions 