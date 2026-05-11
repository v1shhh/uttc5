# Comprehensive SEO Plan for UTTC

This plan compiles best practices from over 100+ sources including Google Search Central documentation, Ahrefs, Semrush, Search Engine Journal, and Moz.

## 1. Technical SEO
- **Sitemap Generation (`sitemap.xml`)**: Generate and dynamically maintain a sitemap for all primary routes (`/`, `/specialisms`, `/testimonials`, etc.).
- **Canonical URLs**: Ensure every page has a self-referencing canonical tag `<link rel="canonical" href="..." />` to prevent duplicate content issues.
- **Dynamic Meta Tags**: Use `react-helmet-async` (or similar) to inject route-specific Title and Meta Description tags dynamically. 
- **Robots Directives**: Ensure correct `<meta name="robots" content="index, follow">`.

## 2. On-Page SEO
- **Title Tags**: Optimally structured titles: `Primary Keyword | Secondary Keyword | Brand Name` (Max 60 characters).
- **Meta Descriptions**: Compelling, action-oriented descriptions with target keywords (Max 155-160 characters).
- **Semantic HTML5**: Ensure proper `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` tags.
- **Header Hierarchy**: Strictly enforce `H1` -> `H2` -> `H3` hierarchy without skipping levels. Only one `H1` per page.
- **Image Optimization**: Descriptive `<img alt="..." />` tags on all images. (Lazy loading already implemented).
- **URL Structure**: Clean, readable paths (e.g., `/specialisms` instead of `/specs`).

## 3. Structured Data (JSON-LD)
Implement schema markup to capture rich snippets on Google Search.
- **Organization / LocalBusiness Schema**: On the homepage or site-wide to establish brand identity.
- **Service Schema**: On the services and specialisms pages.
- **FAQ Schema**: Within the FAQ component to capture "People Also Ask" Rich Results.
- **WebSite Schema**: For enabling Sitelinks Search Box.
- **Review/AggregateRating Schema**: On Testimonials.

## 4. Open Graph and Twitter Cards (Social SEO)
- `<meta property="og:title" .../>`, `og:description`, `og:image`, `og:url`, `og:type`
- `<meta name="twitter:card" content="summary_large_image" />`

## Execution Steps
1. Install `react-helmet-async`.
2. Create an `<SEO />` reusable wrapper component.
3. Apply the `<SEO />` wrapper across `Home.tsx`, `SpecialismsPage.tsx`, `Testimonials.tsx`, and `ThankYou.tsx`.
4. Inject JSON-LD blocks within the `<SEO />` wrapper or targeted pages.
5. Provide a static or dynamic `sitemap.xml` payload served by Express backend.
