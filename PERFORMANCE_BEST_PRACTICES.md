# UTTC Performance & Code Quality Best Practices

## Audit Summary
A comprehensive performance and code quality audit was conducted across the codebase. Several high-impact improvements were applied directly, primarily targeting initial load time, rendering performance, bundle size, and database query efficiency. 

## Best Practices Researched and Implemented

1. **Route-Level and Below-The-Fold Code Splitting**
   - **Research:** Monolithic React apps load unused code upfront, increasing TTI (Time to Interactive). Modern React apps should leverage `React.lazy` and `Suspense` to defer loading components that don't need to be rendered immediately.
   - **Implementation:** Re-wired `App.tsx` and `Home.tsx` to lazy load all secondary routes (e.g., Services, Contact, Admin Layout) and below-the-fold landing page sections (e.g., LeadMagnet, FAQ, Footer). This significantly shrinks the critical main bundle size.

2. **Migrating to `motion/react`**
   - **Research:** `framer-motion` adds ~30-40kb (gzipped) by default if not tree-shaken meticulously. The new approach is importing specifically from `motion/react`, which acts as a slimmer entry point that works well with Vite.
   - **Implementation:** Swept all components and replaced `import { motion } from 'framer-motion'` with `import { motion } from 'motion/react'`.

3. **Avoiding Full Application Re-Renders in Providers**
   - **Research:** Providers at the root of a React tree that use `useState` will trigger a re-render down the entire React component trunk every time state is modified. If data only needs to be read safely and persisted to `localStorage` (like generating a random A/B test variant), `useState` is an anti-pattern.
   - **Implementation:** Converted the state mechanism in `ExperimentProvider` (`useExperiment`) to use a `useRef`. This avoids causing multi-level application-wide React re-renders when a user opens a new page and gets assigned a variant.

4. **Resource Hinting for Fonts**
   - **Research:** `@import` inside CSS blocks parallelized downloading and pushes font loading down the waterfall.
   - **Implementation:** Moved Google Fonts from `index.css` `@import` to `index.html` using `<link rel="preconnect">` and direct `<link rel="stylesheet">`, allowing the browser to resolve the DNS and fetch fonts much earlier.

5. **Race Condition Prevention in Network Requests**
   - **Research:** Rapidly interacting with UI elements (like changing sorting/filters on data tables) can fire overlapping `fetch` requests that resolve out of order.
   - **Implementation:** Added `AbortController` usage inside `LeadsTable.tsx` to automatically cancel in-flight API requests when the user changes filters rapidly.

6. **SQLite Database Indexing**
   - **Research:** Even locally stored databases or `better-sqlite3` setups slow down under load if sorting by date or filtering by statuses happens over large non-indexed tables.
   - **Implementation:** Appended `CREATE INDEX` modifiers safely in `schema.ts` for frequently queried paths (`leads.status`, `analytics_events.event_type`, etc.).
   
7. **Reliable LLM Output Parsing**
   - **Research:** Prompting LLMs for JSON sometimes yields markdown artifacts (\`\`\`json). Relying solely on regex cleaning is flaky and can break.
   - **Implementation:** Updated the generation config in the AI route handler to enforce `responseMimeType: "application/json"`.

## Opportunities Evaluated but Not Implemented

1. **Complete CSS Migration (Inline styles to Tailwind)**
   *Reason:* The codebase utilizes heavily customized inline styles (`style={{...}}`) combined with a few CSS classes. Refactoring the whole repository strictly to Tailwind would be a "cosmetic refactor." We chose to preserve current structural CSS implementation behavior to prevent layout regressions on an already well-styled app.
   
2. **Dedicated Query Caching Lib (e.g., TanStack Query or SWR)**
   *Reason:* The app's data flow is currently kept barebones with `fetch()`. Adding new mega-dependencies was outside the scope as native hooks mapped to AbortControllers provided enough stability for the specific admin table usage.

## Checklist for Future Development
- [ ] **Images:** Audit usage of `<img />`. Implement standard `loading="lazy"` on any newly introduced below-the-fold images.
- [ ] **Imports:** Whenever introducing a heavy component, consider using `React.lazy(() => import('...'))`.
- [ ] **Providers:** Ensure context providers at the root levels of the app rarely or never execute state changes unnecessarily.
- [ ] **Tables/Queries:** Ensure database tables have correct indexes when new filtering axes are added server-side.
- [ ] **Animations:** Continue using `motion/react` over `framer-motion` for bundle efficiency.

## Notes for Contributors
Keep client payload slim. Add `AbortController` to all future `fetch` hooks in the admin dashboard. Re-verify the `/api/analytics/summary` endpoint whenever adding new data types, as `sqlite` execution remains synchronous and needs lightweight, indexed fetches.
