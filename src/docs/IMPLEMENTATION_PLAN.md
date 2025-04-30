# 🚀 Sixty40 Admin Dashboard – Implementation Plan

_This is a living document. Update as you make progress._

---

## ✅ Recently Completed

### Voting Functionality Core Implementation
- [x] Database Layer
  - [x] Fixed Supabase RLS policies for votes table
  - [x] Implemented vote submission with validation
  - [x] Added real-time subscription for votes
  - [x] Set up vote validation rules
  - [x] Added frontend rate limiting

- [x] Application Layer
  - [x] Update `handleVote` in BattleSection to write to Supabase
  - [x] Add vote validation logic
  - [x] Implement real-time vote updates
  - [x] Add user-friendly rate limit feedback

- [x] Security Layer
  - [x] Fixed RLS policies to prevent infinite recursion
  - [x] Add vote validation rules
  - [x] Implement frontend rate limiting
  - [x] Add duplicate vote prevention

### Vote Display Enhancement
- [x] Core Vote Count Query
  - [x] Create `getVoteCountsByProduct` function in `voting.ts`
  - [x] Implement Supabase query for vote counts by product
  - [x] Add TypeScript interfaces for vote count response
  - [x] Add error handling for query failures

- [x] Live Results Component Update
  - [x] Add `hasVotes` state based on total vote count
  - [x] Update conditional rendering logic in VotingResults
  - [x] Create "No votes yet" placeholder
  - [x] Preserve existing UI structure and styling

- [x] User Vote Status Integration
  - [x] Create utility to check user's vote status
  - [x] Query votes table by voter_id and week_id
  - [x] Handle "You voted for: X" message display
  - [x] Ensure localStorage voter_id integration

- [ ] Real-time Updates
  - [x] Set up Supabase subscription for vote changes
  - [x] Update vote counts on new votes
  - [x] Handle subscription cleanup
  - [ ] Add error handling for subscription failures

## 🟢 In Progress

### Winner Selection System
- [ ] Implementation Tasks
  - [ ] Define selection criteria
  - [ ] Build selection algorithm
  - [ ] Create admin override interface
  - [ ] Implement announcement system

### Testing & Documentation
- [ ] Unit Tests
  - [ ] Test vote count query function
  - [ ] Test conditional rendering logic
  - [ ] Test user vote detection
  - [ ] Test real-time update handling
  - [ ] Test winner selection algorithm
- [ ] Documentation
  - [ ] Document vote count query function
  - [ ] Document component props and state
  - [ ] Document winner selection process
  - [ ] Add inline comments for complex logic
  - [ ] Update README with new functionality

## 🔜 Up Next

1. Add error handling for subscription failures
2. Implement winner selection system
3. Add comprehensive testing suite
4. Create user documentation

## 📝 Notes
- Frontend rate limiting implemented with 10-second cooldown
- Supabase RLS policies fixed and working correctly
- Real-time vote updates functioning as expected
- User feedback improved with gentler messaging
- Vote display will show automatically when first vote is cast
- Existing UI components will be preserved
- Winner selection will be implemented after vote display enhancement
- Vote counts are now managed through a dedicated function
- Real-time updates are working but need better error handling

---
_Last updated: June 2, 2025_

---

## 🟢 In Progress

### Voting Functionality Implementation
- [x] Database Layer
  - [x] Implement Supabase RLS policies for votes table
  - [x] Create vote submission function
  - [x] Add real-time subscription for votes
  - [x] Set up vote validation rules
  - [ ] Implement rate limiting

- [ ] Application Layer
  - [x] Update `handleVote` in BattleSection to write to Supabase
  - [x] Add vote validation logic
  - [x] Implement real-time vote updates
  - [ ] Add vote analytics dashboard
  - [ ] Implement winner selection logic
  - [ ] Add vote export functionality

- [x] Security Layer
  - [x] Implement RLS policies
  - [x] Add vote validation rules
  - [ ] Set up rate limiting
  - [x] Add duplicate vote prevention

- [ ] Testing & Documentation
  - [ ] Add unit tests for vote submission
  - [ ] Add integration tests for vote flow
  - [ ] Document vote validation rules
  - [ ] Create vote analytics documentation
  - [ ] Add security documentation

### Completed Voting Implementation Details
- [x] Created `voting.ts` utility functions:
  - [x] `getOrCreateVoterId()`: Manages unique voter identification
  - [x] `submitVote()`: Handles vote submission with validation
  - [x] `subscribeToVotes()`: Sets up real-time vote subscription
- [x] Implemented duplicate vote prevention using voter_id
- [x] Added error handling for database constraints
- [x] Set up Supabase RLS policies for vote table
- [x] Integrated vote submission with BattleSection component
- [x] Added real-time vote updates:
  - [x] Created Supabase real-time subscription for votes
  - [x] Implemented vote count refresh on new votes
  - [x] Added cleanup for subscription on component unmount
  - [x] Integrated with VotingResults component for live updates

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

### Import Path Standardization
- [x] Fix hook import paths
  - [x] Update toast import in SocialShare component
  - [x] Fixed ImageGallery import in product-modal
  - [x] Fixed PastProductColumn import in past-battle-modal
  - [ ] Audit all hook imports across codebase
  - [ ] Create list of components using incorrect hook paths
  - [ ] Fix remaining hook import issues
- [ ] Standardize component import paths
  - [x] Document components with incorrect imports
  - [ ] Update imports to follow conventions
  - [ ] Test all components after updates
- [ ] Create automated import checker
  - [ ] Write script to verify import paths
  - [ ] Add import path rules to ESLint config
  - [ ] Document common import patterns

### Directory Casing Consolidation
- [ ] Audit and fix directory casing issues
  - [x] Identified duplicate directories (`past-battle-modal` vs `PastBattleModal`)
  - [x] Renamed `product-modal` to `ProductModal`
  - [x] Fixed index file casing (`Index.tsx` → `index.tsx`)
  - [x] Updated imports in BattleSection.tsx
  - [ ] Create list of all affected directories and files
  - [ ] Plan migration sequence to minimize conflicts
  - [ ] Back up affected files
- [ ] Execute directory consolidation
  - [ ] Move files from kebab-case to PascalCase directories
  - [ ] Update all import paths
  - [ ] Remove empty kebab-case directories
  - [ ] Test affected components
- [ ] Document and prevent future issues
  - [x] Added directory naming rules to documentation
  - [ ] Create PR checklist item for directory naming
  - [ ] Add automated check for directory casing
  - [ ] Update component templates to use correct casing

### PastBattleModal Migration Plan
1. **Current State Analysis** ✅
   - Compared both versions:
     - `past-battle-modal/` (kebab-case) - 3.7KB index.tsx
     - `PastBattleModal/` (PascalCase) - 3.8KB index.tsx, PastProductColumn.tsx, Types.ts
   - Identified differences:
     - Import paths (relative vs absolute)
     - Type imports (explicit vs implicit)
     - Unused imports in PascalCase version
     - No functional differences in component logic

2. **Migration Steps Completed**
   - [x] Backed up kebab-case version
   - [x] Updated import in PastBattlesSection.tsx to use PascalCase path
   - [x] Removed kebab-case directory
   - [x] Verified PascalCase directory structure

3. **Type Fixes Completed**
   - [x] Updated Week interface in Types.ts:
     - Made `id` optional as it's not needed in modal context
     - Made `status` optional as it's not used in modal
     - Kept required fields: `number`, `startDate`, `endDate`
   - [x] Updated Product interface in Types.ts:
     - Made `id` optional for modal usage
     - Added missing fields: `longDesc`, `features`, `techStack`, etc.
     - Made appropriate fields optional with `?` modifier
   - [x] Fixed PastBattlesSection.tsx mappings:
     - Added required `description` field
     - Ensured all property names match interface

4. **Remaining Tasks**
   - [ ] Import Updates
     - [x] Updated PastBattlesSection.tsx imports
     - [ ] Verify no other files import from old path
   - [ ] Post-Migration Verification
     - [ ] Run full test suite
     - [ ] Verify build process
     - [ ] Check for runtime errors

5. **Next Steps**
   - [ ] Run build to verify type fixes
   - [ ] Test modal functionality with updated types
   - [ ] Document type changes for team reference
   - [ ] Consider adding JSDoc comments to explain optional fields

## ✅ Completed Today (June 2, 2025)
- [x] Fixed ImageGallery import in ProductModal/index.tsx
- [x] Fixed PastProductColumn import using absolute path
- [x] Updated component-structure.md with directory naming rules
- [x] Documented directory casing inconsistency issue
- [x] Created plan for directory consolidation
- [x] Renamed product-modal directory to ProductModal
- [x] Fixed index file casing in ProductModal
- [x] Updated imports in affected components
- [x] Migrated past-battle-modal to PascalCase version
- [x] Fixed type mismatches in PastBattleModal interfaces

### Remaining Directory Casing Issues to Fix:
1. `past-battle-modal` → `PastBattleModal`
2. Check for any other kebab-case component directories
3. Verify all index.tsx files use lowercase
4. Update any affected imports

---

## 🔜 Up Next

- [ ] Build PastWeekCard component (show historical battle weeks below current battle)
- [ ] Improve Edit Week Modal layout (spacing, mobile responsiveness)
- [ ] Add Voting Analytics Overview (entries, votes, winner inline on dashboard)
- [ ] Improve responsiveness across Admin Dashboard (mobile, tablet, desktop)
- [ ] Create "Nudge Builders" Button (admin action for reminders)
- [ ] Accessibility & Color Contrast Audit (ensure all new UI changes meet standards)
- [ ] Add/Update Unit & Integration Tests (cover new UI logic and layout changes)
- [ ] Complete hook naming standardization
- [ ] Fix remaining import path issues
- [ ] Implement automated import checking
- [ ] Update component documentation

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

## Current Sprint Focus: Import Error Resolution & Component Standardization

### Completed Tasks
1. ✅ Standardized modal naming conventions
2. ✅ Fixed import issues in several components
3. ✅ Renamed `DropdownMenu.tsx` to `dropdown-menu.tsx`
4. ✅ Documented component export patterns
5. ✅ Updated component structure documentation

### In Progress
1. 🔄 Resolving import errors across components
2. 🔄 Standardizing component export patterns
3. 🔄 Updating import statements to match new conventions

### Next Steps

#### Phase 1: Error Resolution
1. Document and categorize all import errors
2. Create prioritized list of components to fix
3. Update import statements following documented patterns
4. Test components after import fixes
5. Document any breaking changes

#### Phase 2: Component Standardization
1. Review all component exports
2. Update exports to match documented patterns
3. Standardize file naming across components
4. Update import statements project-wide
5. Verify component functionality

#### Phase 3: Testing & Documentation
1. Test all modified components
2. Update component documentation
3. Create automated tests for critical components
4. Document export patterns in component files
5. Update development guidelines

### Technical Debt Items
1. Inconsistent export patterns
2. Mixed file naming conventions
3. Outdated import statements
4. Missing component documentation
5. Incomplete test coverage

### Quality Gates
1. No import errors in console
2. All components follow naming conventions
3. Export patterns match documentation
4. Tests pass for modified components
5. Documentation is up to date

### Risk Mitigation
1. Maintain list of modified components
2. Create backup branches before major changes
3. Test components in isolation
4. Document all breaking changes
5. Regular progress updates

## Timeline
- Phase 1: 2-3 days
- Phase 2: 2-3 days
- Phase 3: 1-2 days

## Dependencies
1. shadcn/ui component patterns
2. TypeScript configuration
3. Vite build settings
4. Component test suite

## Success Criteria
1. Zero import errors in console
2. Consistent component patterns
3. Updated documentation
4. Passing tests
5. Improved developer experience
