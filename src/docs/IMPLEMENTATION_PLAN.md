# 🚀 Sixty40 Admin Dashboard – Implementation Plan

_This is a living document. Update as you make progress._

---

## ✅ Recently Completed

### Winner Selection System
- [x] Core Winner Selection Implementation
  - [x] Created WinnerSelectionPanel component
  - [x] Added vote count display for each product
  - [x] Implemented winner declaration functionality
  - [x] Added winner status display
  - [x] Integrated with CurrentBattleSection
  - [x] Added success/error toasts
  - [x] Implemented button disable logic when winner is selected

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

### Builder Stats Display Implementation
- [ ] Fix TypeScript errors in BattleCard component
  - [ ] Create proper types for builder stats data structure
  - [ ] Update useBuilderStats hook return type
  - [ ] Fix property access in BattleCard for stats.name, stats.avatar_url, etc.
  - [ ] Ensure proper typing for Product interface
- [ ] Improve builder stats display
  - [x] Show wins and products_launched in hero section
  - [x] Match builders by builder_id instead of name
  - [x] Add proper fallbacks for missing data
  - [ ] Fix type safety for builder info access
- [ ] Add loading states for builder stats
  - [ ] Show skeleton UI while loading
  - [ ] Handle error states gracefully
  - [ ] Add retry mechanism for failed loads

### Winner Selection System Enhancements
- [ ] Add confirmation dialog before declaring winner
- [ ] Add ability to change winner (admin override)
- [ ] Add winner announcement scheduling
- [ ] Implement winner history tracking
- [ ] Add winner statistics and analytics

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

### Product Details Modal UI Restoration
Priority: High
- [ ] Restore glassmorphic styling and layout
  - [ ] Add proper backdrop blur effects
  - [ ] Restore translucent background with proper opacity
  - [ ] Fix border styling with white/10 opacity
  - [ ] Add subtle shadow effects for depth
  
- [ ] Improve content organization
  - [ ] Create distinct card sections for different content types
  - [ ] Add proper spacing between sections
  - [ ] Implement consistent padding rules
  - [ ] Restore proper heading hierarchy

- [ ] Fix tech stack display
  - [ ] Restore pill-style tech badges
  - [ ] Add proper spacing between badges
  - [ ] Implement hover effects
  - [ ] Ensure consistent badge sizes

- [ ] Enhance action sections
  - [ ] Restore styled "Vote for this Product" button
  - [ ] Add proper hover and focus states
  - [ ] Fix pricing section layout
  - [ ] Improve demo link presentation

- [ ] Polish modal interactions
  - [ ] Add smooth open/close animations
  - [ ] Implement proper backdrop click handling
  - [ ] Add keyboard navigation support
  - [ ] Ensure proper mobile responsiveness

### Component Structure Updates
- [ ] Create reusable styled sections
  - [ ] Extract ProductDetailSection component
  - [ ] Create TechStackDisplay component
  - [ ] Build PricingSection component
  - [ ] Implement ActionButton component

- [ ] Improve component organization
  - [ ] Move modal-specific components to dedicated directory
  - [ ] Create shared styled components for reuse
  - [ ] Update import structure
  - [ ] Add proper component documentation

## 🔜 Up Next

1. Restore product details modal UI
2. Implement loading states for builder stats
3. Add error handling for subscription failures
4. Implement winner selection enhancements
5. Add comprehensive testing suite

## 📝 Notes
- Modal UI regression needs immediate attention
- Original glassmorphic design should be restored
- Focus on maintaining consistency with Sixty40's visual language
- Ensure all interactive elements follow accessibility guidelines
- Consider extracting reusable components for future modals

## 🎯 Visual Requirements

### Glassmorphic Style Guide
- Background: `bg-black/20`
- Backdrop blur: `backdrop-blur-md`
- Border: `border border-white/10`
- Shadow: `shadow-2xl`
- Content background: `bg-white/5`

### Layout Guidelines
- Section padding: `p-6` (desktop), `p-4` (mobile)
- Content gap: `gap-6`
- Border radius: `rounded-lg`
- Max width: `max-w-3xl`

### Typography
- Title: `text-2xl font-bold`
- Section headers: `text-lg font-semibold`
- Body text: `text-base text-white/80`
- Tech stack badges: `text-sm font-medium`

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
