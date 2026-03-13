# Shop Removal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely remove all shop/e-commerce functionality from the Casa da Alquimia v2 website.

**Architecture:** Sequential removal of UI components, backend services, database migrations, assets, and documentation. Each task is self-contained and can be verified independently. No code refactoring needed—only deletions and removal of references.

**Tech Stack:** React, Vite, TypeScript, Supabase, Tailwind CSS

---

## Chunk 1: Frontend Cleanup

### Task 1: Remove Shop Component and Clean Up Imports

**Files:**
- Delete: `src/components/Shop.tsx`
- Modify: `src/pages/Index.tsx:1-15`

- [ ] **Step 1: Delete Shop.tsx component**

```bash
rm src/components/Shop.tsx
```

- [ ] **Step 2: Open Index.tsx and locate Shop import**

File: `src/pages/Index.tsx` (line 10)
Current: `import Shop from '@/components/Shop';`

- [ ] **Step 3: Remove Shop import from Index.tsx**

Replace this line:
```typescript
import Shop from '@/components/Shop';
```

With nothing (delete the entire line).

- [ ] **Step 4: Open Index.tsx and locate Shop render**

File: `src/pages/Index.tsx` (line 47)
Current: `<Shop />`

- [ ] **Step 5: Remove Shop component render from Index.tsx**

Replace this line:
```typescript
<Shop />
```

With nothing (delete the entire line). The file should now show:
```typescript
<main id="main-content">
  <Hero />
  <About />
  <Rituals />
  <LibraryGallery />
  <SocialMedia />

{/* Testimonials Section */}
```

- [ ] **Step 6: Verify Index.tsx is valid**

Run: `npm run lint src/pages/Index.tsx`
Expected: No errors related to Shop import

- [ ] **Step 7: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: remove Shop component from Index page"
```

---

### Task 2: Update Navbar.tsx to Remove Shop Link

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Open Navbar.tsx and search for shop link**

File: `src/components/Navbar.tsx`

Search for:
- "shop" (case-insensitive)
- "loja" (Portuguese for shop)
- Any navigation link pointing to `#shop`

- [ ] **Step 2: Locate the shop navigation entry**

It will likely be in a navigation menu array or JSX, something like:
```typescript
{ name: 'Loja', href: '#shop' }
// or
<a href="#shop">Loja</a>
```

- [ ] **Step 3: Delete the shop navigation entry**

Remove the entire line/object that references the shop link.

- [ ] **Step 4: Verify Navbar still renders**

Run: `npm run lint src/components/Navbar.tsx`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: remove shop link from Navbar"
```

---

## Chunk 2: Backend Cleanup

### Task 3: Clean Up Supabase Services

**Files:**
- Modify: `src/integrations/supabase/services.ts`

- [ ] **Step 1: Open services.ts and search for shop-related functions**

File: `src/integrations/supabase/services.ts`

Search for:
- `shopService`
- `orderService`
- `getProducts`
- `getOrders`
- `createOrder`
- `order_items`
- `products` (table reference)

- [ ] **Step 2: Identify shop-related function exports and definitions**

These will likely be:
```typescript
export const shopService = { /* ... */ }
export const orderService = { /* ... */ }
// or individual functions
export const getProducts = () => { /* ... */ }
export const createOrder = () => { /* ... */ }
```

- [ ] **Step 3: Delete all shop/order-related functions**

Remove:
- `shopService` object and all its methods
- `orderService` object and all its methods
- Any functions related to products, orders, or inventory
- Any type definitions specific to shop (Product, Order, OrderItem interfaces if only used by shop)

- [ ] **Step 4: Remove any shop imports at the top of services.ts**

Look for imports like:
```typescript
import { Product, Order, OrderItem } from '@/types'
```

If these types are ONLY used by shop services, delete them. If used elsewhere, keep them.

- [ ] **Step 5: Verify no broken imports**

Run: `npm run lint src/integrations/supabase/services.ts`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/integrations/supabase/services.ts
git commit -m "feat: remove shop and order services from Supabase integration"
```

---

### Task 4: Remove Shop Database Migrations

**Files:**
- Check/Delete: `supabase/migrations/`

- [ ] **Step 1: List all migrations**

```bash
ls -la supabase/migrations/
```

Look for SQL migration files related to shop, likely named:
- `*_create_products_*`
- `*_create_orders_*`
- `*_create_order_items_*`
- `*_shop_*`
- `*_library_and_shop*`

- [ ] **Step 2: Identify shop migrations**

Review migration file names and timestamps. According to PROJECT_STRUCTURE.md, there's `library_and_shop.sql`.

- [ ] **Step 3: Delete shop-only migrations**

If there's a `library_and_shop.sql`:
```bash
# Check content first
cat supabase/migrations/library_and_shop.sql
```

If it contains ONLY shop tables (products, orders, order_items, inventory), delete it:
```bash
rm supabase/migrations/library_and_shop.sql
```

If it contains both library AND shop tables, edit it to remove only the shop-related tables (ALTER TABLE statements, DROP statements for products, orders, etc.).

- [ ] **Step 4: Verify no broken schema**

Check if there are any foreign key references from other tables to shop tables. Look for:
- `REFERENCES products`
- `REFERENCES orders`

If found, these need to be removed before deleting the migration.

- [ ] **Step 5: Commit deletion**

```bash
git add supabase/migrations/
git commit -m "feat: remove shop database migrations"
```

---

## Chunk 3: Assets and Documentation

### Task 5: Delete Shop Images Directory

**Files:**
- Delete: `/img/loja-colecao/`

- [ ] **Step 1: Verify directory exists and contents**

```bash
ls -la img/loja-colecao/
```

- [ ] **Step 2: Delete the entire directory**

```bash
rm -rf img/loja-colecao/
```

- [ ] **Step 3: Verify deletion**

```bash
ls img/ | grep loja
```

Expected: No output (directory deleted)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove shop product images"
```

---

### Task 6: Remove Shop Documentation Files

**Files:**
- Delete: `docs/LIBRARY_SHOP_SETUP.md`
- Delete: `docs/LIBRARY_SHOP_QUICK_START.md`

- [ ] **Step 1: Delete LIBRARY_SHOP_SETUP.md**

```bash
rm docs/LIBRARY_SHOP_SETUP.md
```

- [ ] **Step 2: Delete LIBRARY_SHOP_QUICK_START.md**

```bash
rm docs/LIBRARY_SHOP_QUICK_START.md
```

- [ ] **Step 3: Verify deletions**

```bash
ls docs/LIBRARY_SHOP*
```

Expected: "No such file or directory" (both files deleted)

- [ ] **Step 4: Commit**

```bash
git add docs/
git commit -m "docs: remove shop setup documentation"
```

---

### Task 7: Update Project Documentation

**Files:**
- Modify: `docs/PROJECT_STRUCTURE.md`
- Modify: `docs/CLAUDE.md` (if it mentions shop)

- [ ] **Step 1: Open PROJECT_STRUCTURE.md**

File: `docs/PROJECT_STRUCTURE.md`

- [ ] **Step 2: Find shop references**

Search for:
- "Shop.tsx"
- "Loja Virtual"
- "shopService"
- "orderService"

These appear at:
- Line 52: `├── Shop.tsx`
- Line 72: `├── shopService`
- Line 73: `├── orderService`

- [ ] **Step 3: Remove shop references from component list**

In the components section, remove the line:
```
├── Shop.tsx                     # Loja virtual
```

- [ ] **Step 4: Remove shop services from services.ts section**

In the integrations section, remove:
```
├── shopService
├── orderService
```

- [ ] **Step 5: Update the services.ts description (if applicable)**

Change:
```
│       ├── services.ts              # Serviços API
│       │   ├── mediaLibraryService
│       │   ├── shopService
│       │   └── orderService
```

To:
```
│       ├── services.ts              # Serviços API
│       │   └── mediaLibraryService
```

- [ ] **Step 6: Check CLAUDE.md for shop mentions**

File: `docs/CLAUDE.md`

Search for "shop", "loja", "shop", "e-commerce" references. If found, remove or update them.

- [ ] **Step 7: Verify documentation is consistent**

Run: `npm run lint docs/`
Expected: No errors (markdown linting)

- [ ] **Step 8: Commit**

```bash
git add docs/PROJECT_STRUCTURE.md docs/CLAUDE.md
git commit -m "docs: remove shop references from documentation"
```

---

## Chunk 4: Verification

### Task 8: Verify Complete Removal and Lint

**Files:**
- Global verification

- [ ] **Step 1: Run linting**

```bash
npm run lint
```

Expected: 0 errors (no "Shop" references found)

- [ ] **Step 2: Check for remaining shop imports**

```bash
grep -r "from '@/components/Shop'" src/
grep -r "shopService" src/
grep -r "orderService" src/
```

Expected: No results (all references removed)

- [ ] **Step 3: Check for remaining shop-related files**

```bash
find . -name "*shop*" -o -name "*Shop*" -o -name "*loja*" 2>/dev/null | grep -v node_modules | grep -v .git
```

Expected: Only this plan file should show up (docs/superpowers/specs/...)

- [ ] **Step 4: Build the project**

```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 5: Verify page structure in localhost**

```bash
npm run dev
```

Visit: `http://localhost:8087`

Expected:
- Page loads without errors
- Navbar displays correctly without shop link
- Sections visible: Hero → About → Rituals → Library → Social Media → Testimonials → Donate → Contact → Footer
- No Shop section between Library and Social Media
- Console has no errors

- [ ] **Step 6: Final verification commit**

```bash
git status
```

Expected: "nothing to commit, working tree clean"

---

## Summary

**Total tasks:** 8
**Total commits:** 7
**Files deleted:** 5 (Shop.tsx, 2 docs, 1 directory, potentially 1 migration)
**Files modified:** 4 (Index.tsx, Navbar.tsx, services.ts, 2 docs)
**Expected outcome:** Clean codebase with zero shop references
