# PROJECT: JAMESON REEVES | BUSINESS ARCHITECT PORTFOLIO
**Session Handover Document // 2026-03-06**

## 1. CURRENT STATE
*   **Tech Stack:** React (Vite) + TypeScript + Vanilla CSS.
*   **Deployment:** Connected to GitHub (`jamesonreeves/website`) with auto-deploys to Vercel ($0/month).
*   **Design Aesthetic:** "Algorithmic Ledger" / "Strategic Catalyst."
    *   **Colors:** Deep Cobalt (`#0047AB`), Charcoal (`#121212`), Soft White (`#FCFCFC`).
    *   **Typography:** High-end pairing using *Crimson Pro* (Serif) and *Inter/JetBrains Mono* (Sans/Mono).
*   **Key Feature:** A generative "Background Flow" using an Inflection Point narrative (the "me" marker) to visualize professional impact.

## 2. SYSTEM ARCHITECTURE
*   **Data-Driven:** Content is decoupled from UI.
    *   `src/data/projects.json`: Core portfolio projects with "Personal Insights."
    *   `src/data/landing-pages.json`: Configuration for custom job application routes (e.g., `/apply/city-of-ny`).
*   **Interactive Revenue Engine:** 
    *   `src/components/RevenueSimulator.tsx`: A high-fidelity modeling tool using a Logarithmic Front-Loaded weighted distribution for revenue forecasting.
*   **AI-Friendliness:** 
    *   Hidden `ld+json` script in `index.html`.
    *   Hidden `#ai-context` section in `Home.tsx` for LLM parsers.

## 3. HOW TO OPERATE
*   **Adding a Project:** Add a new object to `src/data/projects.json`. Use the `insight` field to maintain the "Human" perspective.
*   **Creating a Landing Page:** Add a new entry to `src/data/landing-pages.json` with a unique `slug`. Visit `jamesonreeves.com/apply/{slug}` to view.
*   **Styling:** Global styles reside in `src/styles/global.css`.

## 4. FUTURE STEPS
- [ ] **Visual Hero:** Replace the placeholder in `Home.tsx` with a high-end data visualization or a map from the original portfolio.
- [ ] **Resume Integration:** Add a "Download PDF" button or a dedicated `/resume` route.
- [ ] **Design Refinement:** Add subtle "fade-in" animations for section transitions.
- [ ] **Content Expansion:** Migrate remaining projects from `jamesonreeves.com` into the new `projects.json` structure.

---
**TO START A NEW SESSION:** Point the agent to this `GEMINI.md` file. It contains all architectural and strategic context.
