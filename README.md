# Jameson Reeves | Business Architect Portfolio

A high-performance, data-driven portfolio for a Business Architect, built with React, TypeScript, and a minimalist "Algorithmic Ledger" aesthetic.

## Tech Stack
- **Frontend:** React (Vite) + TypeScript
- **Styling:** Vanilla CSS (Grayscale-to-Cobalt aesthetic)
- **Data:** Decoupled JSON-based content management
- **Deployment:** Vercel (Auto-deploys from GitHub `main` branch)

## System Architecture

### 1. Decoupled Content
Almost all text and data on the site is separated from the code:
- `src/data/projects.json`: All project case studies, including images, full descriptions, and metadata.
- `src/data/site-content.json`: Global site messaging, hero titles, navigation, and footer text.
- `src/data/landing-pages.json`: Configuration for personalized job application routes (e.g., `/apply/company-name`).

### 2. Strategic Features
- **Archive Page:** A complete, searchable repository of 36+ projects and research initiatives.
- **Revenue Simulator:** A high-fidelity interactive modeling tool located within specific case studies.
- **Grayscale Hover:** Project images utilize a sophisticated grayscale-to-color transition to maintain a clean "ledger" look.

## Operations

### How to Edit Content
To update any text on the site, simply modify the corresponding JSON file in `src/data/`. For the hero title, you can use markdown-style formatting:
- `**text**` for bold
- `*text*` for cobalt italics
- `~text~` for strikethrough (strategic "redaction")

### Running the Scraper
If you need to refresh the project data from the legacy Squarespace site:
1. Ensure the virtual environment is active: `source venv/bin/activate`
2. Run the script: `python3 scrape_projects.py`
This will crawl `jamesonreeves.com`, download new assets to `public/assets/`, and update `projects.json`.

### Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:5173` to view the site.

## Deployment
Any push to the `main` branch on GitHub will trigger a new production build on Vercel.
