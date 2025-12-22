# UMB Course Scheduler Project Timeline

## Overall Timeline (Big Picture)

**Weeks 1–3**: Data + foundation  
**Weeks 4–6**: Backend + scheduling logic  
**Weeks 7–9**: Frontend + UI polish  
**Weeks 10–12**: Integration, testing, soft launch

You can compress or stretch this, but don’t skip phases.

---

## Week 1: Project Setup & Design

**Goal:** clarity before code

**Tasks**

-   Write 1-page product spec (MVP + non-goals)
-   Lock tech stack: Playwright + Node, Express + TypeScript, PostgreSQL + Prisma, React + Tailwind
-   Sketch database schema (courses, sections, meetings)
-   Set up GitHub repo(s)

**Deliverable**

-   README with architecture diagram
-   Empty project skeleton

---

## Week 2: Learn Playwright & Inspect Data Sources

**Goal:** confirm data is extractable

**Tasks**

-   Learn Playwright basics
-   Inspect UMB catalog Network tab
-   Identify XHR / GraphQL calls and fallback DOM selectors
-   Decide scraping strategy (API intercept vs DOM)

**Deliverable**

-   Script that opens catalog and logs course titles

---

## Week 3: Build Scraper v1

**Goal:** clean, usable course data

**Tasks**

-   Scrape course code, title, sections, days/times, instructor names
-   Normalize time strings
-   Handle async / TBA cases
-   Write data to Postgres

**Deliverable**

-   Database populated with real UMB data

---

## Week 4: Backend Setup (Express + Prisma)

**Goal:** API can serve data

**Tasks**

-   Set up Express + TypeScript
-   Connect Prisma to Postgres
-   Implement GET /courses, GET /sections?course=CS220
-   Seed DB from scraper

**Deliverable**

-   API returns real course data

---

## Week 5: Scheduling Engine v1

**Goal:** generate correct schedules

**Tasks**

-   Implement conflict detection
-   DFS/backtracking schedule generator
-   Return one valid schedule
-   Write unit tests for conflicts

**Deliverable**

-   API endpoint POST /generate-schedule

---

## Week 6: Ranking & Filters

**Goal:** “smart” schedules

**Tasks**

-   Implement scoring function
-   Filters: no classes before X, avoid days
-   Generate multiple schedules
-   Rank results

**Deliverable**

-   Ranked schedule list returned by API

---

## Week 7: Frontend Setup

**Goal:** see real data

**Tasks**

-   Set up React + Tailwind
-   Build course search UI
-   Fetch data from backend
-   Display sections list

**Deliverable**

-   Users can browse courses

---

## Week 8: Calendar UI + Schedule Display

**Goal:** core UX

**Tasks**

-   Weekly calendar grid
-   Render generated schedules
-   Toggle between schedules
-   Visual conflict highlighting

**Deliverable**

-   Full scheduling loop works

---

## Week 9: RateMyProfessor Integration

**Goal:** differentiator feature

**Tasks**

-   Scrape RMP ratings
-   Cache in DB
-   Display rating per section
-   Sort / filter by rating

**Deliverable**

-   Ratings visible in UI

---

## Week 10: Polish & Reliability

**Goal:** trustworthiness

**Tasks**

-   Error handling
-   Empty states
-   Loading indicators
-   Validate scraped data
-   Add disclaimers

**Deliverable**

-   App feels stable and intentional

---

## Week 11: Soft Launch

**Goal:** real users

**Tasks**

-   Deploy backend + frontend
-   Share with friends
-   Collect feedback
-   Fix obvious UX issues

**Deliverable**

-   First real users

---

## Week 12: Portfolio & Transfer Prep

**Goal:** leverage the work

**Tasks**

-   Write case study for website
-   Record demo video
-   Update resume
-   Prepare transfer essay angle

**Deliverable**

-   Project becomes an asset, not just code

---

## Important Rules to Follow

-   **Never skip data correctness**
-   **Don’t over-scope early**
-   **Ship something usable first**
-   **Keep notes on design decisions**
