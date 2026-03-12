# Design: Complete Shop Removal from Casa da Alquimia v2

**Date:** 2026-03-11
**Status:** Design Complete
**Scope:** Remove all shop/e-commerce functionality from the site

---

## Overview

The Casa da Alquimia v2 project currently has a Shop component that is not actively used. Since the organization does not have a virtual store at this time, the entire shop functionality will be removed from the codebase to keep it clean and focused.

This is a complete removal including UI, backend services, database schema, and documentation.

---

## What's Being Removed

### 1. Frontend Components
- **File:** `src/components/Shop.tsx` (~740 lines)
  - Contains shop UI with product catalog, cart, and checkout simulation
  - Currently uses hardcoded product data
  - No integration with real payment systems

### 2. Navigation
- **File:** `src/components/Navbar.tsx`
  - Remove shop navigation link/menu item

### 3. Page Rendering
- **File:** `src/pages/Index.tsx`
  - Remove Shop component import (line 10)
  - Remove `<Shop />` render (line 47)

### 4. Backend Services
- **File:** `src/integrations/supabase/services.ts`
  - Remove `shopService` functions
  - Remove `orderService` functions
  - These handle product queries, cart operations, and order management

### 5. Database
- **Directory:** `supabase/migrations/`
  - Remove or archive migrations related to shop tables (products, orders, inventory)
  - Schema includes: `products`, `orders`, `order_items`, `inventory`

### 6. Assets
- **Directory:** `/img/loja-colecao/`
  - Delete all shop product images and promotional images
  - Contains: product photos, logo, collection images

### 7. Documentation
- **File:** `docs/LIBRARY_SHOP_SETUP.md`
  - Remove shop setup guide
- **File:** `docs/LIBRARY_SHOP_QUICK_START.md`
  - Remove shop quickstart guide
- **File:** `docs/CLAUDE.md`
  - Remove any references to shop
- **File:** `docs/PROJECT_STRUCTURE.md`
  - Update to remove shop from structure documentation

---

## Dependencies & Order of Operations

**No exclusive dependencies:** All packages used by the Shop component (React, Shadcn UI, Lucide icons, React Router, etc.) are used elsewhere in the project.

**Removal Order:**
1. Delete Shop component first (will show import errors)
2. Update Index.tsx to remove Shop import and render
3. Update Navbar.tsx to remove shop link
4. Clean up Supabase services
5. Remove database migrations
6. Delete images directory
7. Update documentation

---

## Verification Steps

After completion, verify:

| Check | Command | Expected Result |
|-------|---------|-----------------|
| No lint errors | `npm run lint` | 0 errors |
| No import errors | Check IDE | No red squiggles on imports |
| Page renders | Visit site locally | All sections visible except shop |
| No broken links | Check Navbar | No 404s or broken anchors |
| Build succeeds | `npm run build` | Build completes without errors |

---

## Impact Analysis

### What Stays
- ✅ Hero section
- ✅ About section
- ✅ Rituals section
- ✅ Library/Gallery
- ✅ Social Media section
- ✅ Testimonials
- ✅ Donations section
- ✅ Contact form
- ✅ Spotify player
- ✅ All general dependencies

### What Changes
- 🔄 Page layout (one less section)
- 🔄 Navbar (one less link)
- 🔄 Supabase services file (fewer functions)
- 🔄 Documentation structure

### What's Preserved
- 📜 Git history (all code remains in git)
- 📝 Commit messages (reason for removal documented)

---

## Timeline & Effort

- **Files to delete:** 4 files/directories
- **Files to modify:** 6 files
- **Total changes:** ~10 files
- **Estimated effort:** Low (straightforward removal, no refactoring)

---

## Future Considerations

If a shop is needed later:
1. Code can be restored from git history
2. Consider using a dedicated e-commerce platform (Shopify, WooCommerce) rather than custom implementation
3. Current hardcoded product data approach won't scale for real store operations

---

## Approval Checklist

- [x] Component identified and scoped
- [x] Dependencies analyzed
- [x] Files to modify listed
- [x] Verification steps defined
- [x] Order of operations clear
- [x] No impact on other features

