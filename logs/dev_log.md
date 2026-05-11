# Development Log

## 2026-05-10
- Initialized core project files: PROMPT.md, specs/requirements.md, @fix_plan.md, logs/dev_log.md.
- Identified project stack: React, Vite, Tailwind CSS, Express, SQLite.
- Updated Database Schema (`analytics_events`) to store metadata, experiments wrapper, and detailed tracking logs.
- Added `useAnalytics.ts` with scroll observing, rage clicks computation, time_on_page.
- Created `useExperiment.ts` context hook to implement A/B variant splits locally.
- Added `/api/ai` endpoint to provide generative AI analysis based on live tracking events, using Gemini API.
- Implemented `Recommendations.tsx` panel in the Admin dashboard.
- Redesigned `Hero.tsx` using `<ExperimentView />` wrapper for headline variants.
- Enhanced `BudgetCalculator.tsx` and `QuoteForm.tsx` to emit `form_start`, `form_field_focus`, `form_submit` metrics.
- Moved FAQs section below the Contact/Form section.
- Moved Specialisms to its own standalone page (/specialisms) accessible via a "See Full List" button below the Services grid on the home page.
- Conducted an exhaustive performance and code quality audit repo-wide.
- Implemented lazy loading for React Routes and below-the-fold components (`React.lazy`).
- Migrated legacy `framer-motion` to lighter `motion/react` and removed untouched package from manifest.
- Resolved synchronous re-render loops in root `ExperimentProvider` context.
- Configured DNS preconnecting and early font resolution for typography.
- Enhanced backend stability by creating SQLite DB indexes and abort-handling for dashboard network races.
- Forced Gemini API structured output generation using `responseMimeType: "application/json"`.
- Documented changes to `PERFORMANCE_BEST_PRACTICES.md` doc.
- Researched, generated, and implemented maximally detailed `SEO_PLAN.md` including LocalBusiness JSON-LD schema, `<SEO>` helmet wrappers, and `sitemap.xml`.
- Researched, generated, and implemented Generative Engine Optimization `AI_SEARCH_PLAN.md` delivering `llms.txt` and AI-Bot `robots.txt` configurations out of `/client/public`.
