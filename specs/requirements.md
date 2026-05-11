# UTTC Project Requirements

## A. Funnel and UX improvements
- Rewrite landing page and key conversion pages for clear hierarchy.
- Improve hero section, headlines, CTAs, structure, trust signals, scannability.
- Optimize mobile and desktop separately.
- Utilize persuasive copywriting.

## B. Measurement and instrumentation
- Track events at page, session, element, and funnel-step level.
- Acquisition and source tracking (UTM, referrer, OS, device, geography).
- Attention and engagement tracking (scroll depth, CTA exposure, unique clicks, read depth, interactions).
- Funnel and conversion (conversion rate, step drop-off, macro/micro conversions).
- Behavior and frustration (rage clicks, dead clicks, backtracking, rapid page refreshes).
- Performance and technical quality (Core Web Vitals, INP, CLS, LCP, JS errors).
- Content effectiveness (CTR by component, section drop-off).
- Segmentation (device, browser, source/medium, time of day/week).

## C. Admin panel requirements
- Dashboards: funnel overview, live metrics, page performance, CTA performance, scroll, drop-off, form analytics, errors, experiments, segmentation, recommendations.
- Required UX: Use charts/tables, highest-impact first, filtering capability, compare variants, highlight statistically meaningful changes.

## D. AI recommendation layer
- AI assistant in the admin panel to generate specific website optimization recommendations.
- Recommendations must be ranked by impact and confidence.
- Format: Title, problem, evidence, recommended change, expected impact, priority, etc.

## E. Experimentation support
- A/B test support (variant tracking, conversion comparison).
- Copy, CTA, layout variants.

## F. Implementation rules
- Keep aligned with existing stack (React, Vite, Express, SQLite).
- Reusable components for analytics and tracking.
- Aggregate behavioral data over invasive tracking.
