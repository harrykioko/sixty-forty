# 🚀 Sixty40 Admin Dashboard – Implementation Plan

_This is a living document. Update as you make progress._

---

## 🟢 In Progress

### Past Battles Section
- [x] Create PastBattlesSection component
  - [x] Show grid of past battle cards
  - [x] Each card shows week number, date range, winner
  - [x] Add view details button
  - [x] Implement glassmorphic styling
- [x] Add PastBattleCard component
  - [x] Show week number and date range
  - [x] Display winner product with image
  - [x] Add view details button
  - [x] Apply glassmorphic styling
- [ ] Implement past battle details modal
  - [ ] Show all products from the battle
  - [ ] Display voting results
  - [ ] Show winner details
  - [ ] Add close button
- [ ] Add pagination or infinite scroll for past battles
- [ ] Ensure responsive design for all screen sizes

### PastBattlesSection Component Standardization
- [ ] Define consistent interface for PastBattlesSection component
  - [ ] Document proper prop types (pastWeeks vs weeks naming)
  - [ ] Standardize event handler names (onView/onViewBattle)
  - [ ] Add proper TypeScript interfaces
- [ ] Update component implementations
  - [ ] Modify PastBattlesSection to use new interface
  - [ ] Update AdminDashboardLayout usage
  - [ ] Update DashboardContent usage
- [ ] Add test coverage for standardized component
- [ ] Verify no breaking changes in other components
- [ ] Document the standardized interface for future reference

### Product Overview Improvements
- [ ] If 2+ products: show side-by-side in responsive grid
- [ ] If 1 product: center card and add prominent Add Product button
- [ ] If 0 products: center Add Product button with CTA
- [ ] Product Card: Builder pill, name, hero image, short description, edit/view button
- [ ] Product Modal: Remove timeline, add status pill near title, prioritize product info at top, glassmorphic styling
- [ ] Responsive: Grid collapses to 1 column on mobile, all elements accessible
- [ ] Test: Add, edit, and view flows for all product states

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

### Battle Details Page & Product Modal Redesign
- [x] Product Modal overlay for editing products (edit button opens ProductForm as overlay, battle details modal remains open)
- [x] Split Product Form into Create and Edit flows:
  - [x] Extract shared field components (ProductFormFields, etc.)
  - [x] Refactor ProductForm to use ProductFormFields
  - [x] Create CreateProductForm (empty/default values, create logic)
  - [x] Create EditProductForm (prepopulated, update logic)
  - [x] Refactor modal state management to distinguish add vs. edit
  - [x] Update parent handlers to open correct form/modal
  - [x] Test add, edit, and cancel flows for both forms
  - [x] Remove legacy ProductForm and related code (after successful migration and testing)
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
- [x] Header improvements:
  - [x] Show week pill
  - [x] Add date range pill
  - [x] Add new status/stage pill (replaces timeline)
- [x] Product Form Refactoring:
  - [x] Extract shared `ProductFormFields` component
  - [x] Split into `CreateProductForm` and `EditProductForm`
  - [x] Refactor legacy code and implement new forms
  - [x] Add comprehensive tests
  - [x] Remove legacy components
- [x] Modal Naming Standardization:
  - [x] Renamed `Dialog.tsx` to `Modal.tsx`
  - [x] Renamed `AlertDialog.tsx` to `AlertModal.tsx`
  - [x] Renamed `CreateBattleDialog.tsx` to `CreateBattleModal.tsx`
  - [x] Updated all imports and references
  - [x] Updated documentation to reflect changes

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
- June 2, 2025

## Longer Term Items

### Battle Details Improvements
- [ ] Ultra-minimalist, trackless, translucent scrollbar for modals
  - Use custom CSS for a 3px, highly translucent, fully rounded white thumb
  - Track should be fully transparent
  - Scope only to modal containers
  - Revisit after higher-priority issues are addressed
- [ ] Battle Details Page & Product Modal Redesign
  - [ ] Product Modal overlay for editing products
  - [ ] Split Product Form into Create and Edit flows
  - [ ] Header: Show week pill, date range pill, and new status/stage pill
  - [ ] Product Overview: 
    - [ ] If 2+ products: show side-by-side in responsive grid
    - [ ] If 1 product: center card, add prominent Add Product button
    - [ ] If 0 products: center Add Product button with CTA
  - [ ] Product Card: Builder pill, name, hero image, short description, edit/view button
  - [ ] Product Modal: Remove timeline, add status pill near title, prioritize product info at top, glassmorphic styling
  - [ ] Responsive: Grid collapses to 1 column on mobile, all elements accessible
  - [ ] Test: Add, edit, and view flows for all product states

## 🗑️ Files/Components to Delete After Migration
- `src/components/admin/form/ProductForm.tsx` (after both new forms are live)
- Any now-unused hooks or modal logic related to the old ProductForm
- Any legacy test files for the old ProductForm

## 🎯 Component Structure Standardization

### Phase 1: File Naming Standardization
- [x] Audit current file naming patterns
  - [x] List all files using kebab-case that should be PascalCase
  - [x] List all files using PascalCase that should be camelCase
  - [x] Document any exceptions to the rules
- [x] Create renaming script
  - [x] Script to handle kebab-case to PascalCase conversion
  - [x] Script to handle kebab-case to camelCase conversion
  - [x] Script to update import statements
- [x] Rename component files to PascalCase
  - [x] UI Components (11 files)
    - [x] `voting-results.tsx` → `VotingResults.tsx`
    - [x] `product-card.tsx` → `ProductCard.tsx`
    - [x] `countdown-timer.tsx` → `CountdownTimer.tsx`
    - [x] `email-capture.tsx` → `EmailCapture.tsx`
    - [x] `social-share.tsx` → `SocialShare.tsx`
    - [x] `sticky-cta.tsx` → `StickyCTA.tsx`
    - [x] `input-otp.tsx` → `InputOTP.tsx`
    - [x] `hover-card.tsx` → `HoverCard.tsx`
    - [x] `dropdown-menu.tsx` → `DropdownMenu.tsx`
    - [x] `context-menu.tsx` → `ContextMenu.tsx`
    - [x] `alert-dialog.tsx` → `AlertModal.tsx`
  - [x] Layout Components (1 file)
    - [x] `site-footer.tsx` → `SiteFooter.tsx`
  - [x] Modal Components (1 file)
    - [x] `empty-state-modal.tsx` → `EmptyStateModal.tsx`
  - [x] Form Components (4 files)
    - [x] `tech-stack-input.tsx` → `TechStackInput.tsx`
    - [x] `image-upload.tsx` → `ImageUpload.tsx`
    - [x] `gallery-upload.tsx` → `GalleryUpload.tsx`
    - [x] `features-list.tsx` → `FeaturesList.tsx`
- [x] Rename utility files to camelCase
  - [x] Hooks (1 file)
    - [x] `use-toast.ts` → `useToast.ts`
- [x] Rename generic components to be more specific
  - [x] UI Components (3 files)
    - [x] `card.tsx` → `AdminBattleCard.tsx`
    - [x] `form.tsx` → `AdminProductForm.tsx`
    - [x] `table.tsx` → `AdminDataTable.tsx`
  - [x] Panel Components (1 file)
    - [x] `panel.tsx` → `AdminStatusPanel.tsx`
- [x] Handle exceptions
  - [x] Move shadcn/ui components to `/components/ui/shadcn/`
  - [x] Keep original names for third-party wrappers
- [x] Update all import statements across codebase
- [x] Test all renamed components for functionality
- [x] Document any breaking changes

### Phase 2: Component Prefixing and Suffixing
- [x] Add `Admin` prefix to admin-only components
  - [x] `ProductList.tsx` → `AdminProductList.tsx`
  - [x] `Header.tsx` → `AdminHeader.tsx`
  - [x] Other admin components following same pattern
- [x] Add appropriate suffixes to components
  - [x] Layout components: `AdminLayout.tsx`
  - [x] Form components: `EditProductForm.tsx`
  - [x] Modal components: `WeekEditorModal.tsx`
  - [x] Section components: `BuildersSection.tsx`
- [x] Update all import statements and component references
- [x] Test all renamed components for functionality

### Phase 3: File Structure Reorganization
- [x] Create new directory structure
  - [x] `/components/admin/modals/`
  - [x] `/components/admin/forms/`
  - [x] `/components/ui/shadcn/`
  - [x] `/components/ui/forms/`
  - [x] `/components/ui/inputs/`
  - [x] `/components/admin/panels/`
- [x] Move admin modals to `/components/admin/modals/`
  - [x] `PastBattleDetailsModal.tsx`
  - [x] `EditBattleModal.tsx`
  - [x] `BattleDetailsModal.tsx`
  - [x] `WeekEditorModal.tsx`
- [x] Move admin forms to `/components/admin/forms/`
  - [x] `EditProductForm.tsx`
  - [x] `CreateProductForm.tsx`
- [x] Move shared UI components to appropriate folders
  - [x] Move form-related components to `/components/ui/forms/`
  - [x] Move input components to `/components/ui/inputs/`
- [x] Move shadcn/ui components to `/components/ui/shadcn/`
- [x] Move admin panels to `/components/admin/panels/`
- [x] Update all import paths
- [x] Test all moved components for functionality

### Phase 4: Component Cleanup
- [x] Identify and rename generic components
  - [x] `Card.tsx` → `AdminBattleCard.tsx`
  - [x] `List.tsx` → `AdminProductList.tsx`
- [x] Review and consolidate duplicate modals
  - [x] Compare functionality of similar modals
  - [x] Merge or remove duplicates
  - [x] Update all references
- [x] Test all modified components

### Phase 5: Documentation Update
- [x] Update `/docs/component-structure.md`
  - [x] Add new folder structure
  - [x] Update naming conventions
  - [x] Add component categorization
  - [x] Document any exceptions to rules
- [x] Create migration guide for future reference
- [x] Update README with new structure guidelines

### Phase 6: Testing and Validation
- [x] Run full test suite
- [x] Check for any broken imports
- [x] Verify all components render correctly
- [x] Test all functionality
- [x] Document any issues found

## 📝 Notes
- Each phase should be completed and tested before moving to the next
- Create backup branches before each major change
- Update documentation as changes are made
- Consider creating a script to automate some of the renaming tasks

## 🏁 Timeline
- Phase 1: 1-2 days
- Phase 2: 1-2 days
- Phase 3: 2-3 days
- Phase 4: 1-2 days
- Phase 5: 1 day
- Phase 6: 1-2 days

Total estimated time: 7-12 days
