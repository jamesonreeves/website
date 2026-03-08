# PROJECT: JAMESON REEVES | BUSINESS ARCHITECT PORTFOLIO
**Session Handover Document // 2026-03-07**

## 1. CURRENT STATE
*   **Architecture:** Fully decoupled content via JSON files (`projects.json`, `site-content.json`).
*   **Archive:** 36 projects migrated from legacy Squarespace site with full text and grayscale-to-cobalt image hover effects.
*   **Hero Statement:** "I am a business architect. **Business Architecture:** The art of ~designing buildings~ joining operations to ~construct~ grow revenue."
*   **Location:** Updated to CALIFORNIA in footer.

## 2. SYSTEM ARCHITECTURE
*   **Markdown-Like Titles:** The `formatRichText` helper in `Home.tsx` and `Projects.tsx` supports:
    *   `**bold**`: High-contrast black.
    *   `*italics*`: Deep Cobalt.
    *   `~strikethrough~`: Redacted style (strategic deletion).
*   **Archive Route:** `/projects` hosts the full repository, accessible via the "View Full Archive" tile on the homepage.
*   **Layout Logic:** The 3-column grid is standardized to 8rem vertical gaps with `align-items: start` to prevent jagged heights.

## 3. HOW TO OPERATE
*   **Editing the Site:** Modify `src/data/site-content.json` for all global messaging.
*   **Managing Projects:** Modify `src/data/projects.json`.
    *   The first 5 items appear on the homepage (Featured).
    *   All items appear in the Archive.
    *   `insight`: Direct perspective quote.
    *   `full_description`: Shown only when the user clicks "// READ FULL CASE STUDY".
*   **Refreshing Content:** Run `python3 scrape_projects.py` (ensure `venv` is active) to crawl the latest from the legacy site.

## 4. FUTURE STEPS
- [ ] **Resume Integration:** Add a "Download PDF" button or a dedicated `/resume` route.
- [ ] **Interactive Visuals:** Implement a data visualization or interactive map for the hero section or background.
- [ ] **Tag Filtering:** Implement a filter in the Archive page to sort by category or tag.
- [ ] **SEO:** Update meta-tags in `index.html` and the `ai-context` in `Home.tsx` based on the new "Business Architect" branding.

---
**TO START A NEW SESSION:** Point the agent to this `GEMINI.md` file. It contains the refined architectural and strategic context.
