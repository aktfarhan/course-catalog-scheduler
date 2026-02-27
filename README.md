# 🗓️ UMBWizard
A modern UMass Boston course catalog and constraint-based schedule generator built with React, TypeScript, TailwindCSS, Node.js, and PostgreSQL. It allows students to browse 2,000+ courses and automatically generate conflict-free schedules using Depth-First Search (DFS) algorithm.

🌐 Page: https://umbwizard.vercel.app

## 📦 Technologies
- React
- TypeScript
- Node.js
- PostgreSQL
- Playwright
- TailwindCSS
- Vite
- REST API

## 🦄 Features

### 📚 Browse the Course Catalog
- Search and filter through 2,000+ courses offered during the year with fast UI updates.

### 🔍 Advanced Filtering
- Filter by semester, department, course, days, instructor, duration, time-range, and section-type.

### 🗓️ Automated Schedule Generation
- Generate conflict-free schedules based on selected courses and filters using a DFS backtracking algorithm.

### ⚡ Fast Search Performance
- Optimized lookups using Map-based data structures and memoization in the frontend.

### 🧱 Robust Data Normalization
- Handles inconsistent data entries and missing "TBA" values during ingestion.

### 📱 Fully Responsive
- Works across desktop, laptop, and mobile devices.

## 👨🏽‍🍳 The Process
I started by building a web scraper using Playwright to extract the complete UMass Boston course catalog data and saved it to a JSON.

I realized that there was a lot of info, and some of it needed to be cleaned in cases where there was missing data, TBA values, or inconsistent formatting. So, I wrote functions to normalize meeting times, meeting days, and instructor names.

Next, I used Prisma to design a schema for my data, which included one-to-many and many-to-many relations.

Then, I built a responsive frontend, where I focused heavily on performance, ensuring that filtering remained instantaneous.

Finally, I implemented the DFS backtracking algorithm for schedule generation. The main challenge was exploring combinations efficiently while pruning time conflicts early instead of brute-forcing everything.

## 📚 What I Learned

During this project, I've picked up important skills and a better understanding of complex ideas, which improved my logical thinking.

### 🧩 Full-Stack Development:
- **Connecting Everything**: Building both the frontend and backend gave me a much clearer picture of how systems communicate. From scraping data, to storing it in PostgreSQL, to serving it through an API, to rendering it in React — I saw the entire pipeline working together.
  
### 🗄️ Data Relationships:
- **Thinking in Structure**: Designing relationships between courses, sections, and meeting times improved how I think about relational data. I had to carefully model how everything connects so queries stayed clean and efficient.

### ⚡ Performance:
- **Efficiency Matters**: Generating schedules and filtering thousands of courses forced me to think about optimization. Map-based lookups, pruning logic, and memoization made the app feel fast and responsive.

### 🎣 React Hooks (useMemo):
- **Smarter Rendering**: Using `useMemo` helped me better understand React’s rendering behavior and how to prevent unnecessary recalculations when working with large datasets.

### 🕷️ Web Scraping:
- **Real-World Data**: Scraping the university catalog showed me that real production data is messy. I had to normalize inconsistent formats and handle missing fields before the rest of the system could function properly.

### 🔒 Type Safety:
- **Confidence in Code**: Using TypeScript across the stack made the codebase safer and easier to refactor. Clear types between frontend and backend reduced unexpected runtime issues.

### 📈 Overall Growth:
- This project wasn’t just about generating schedules. It helped me think more like a systems engineer — understanding how architecture, data modeling, and performance all connect.

## 💭 How It Can Be Improved

- Save and compare multiple generated schedules
- Make the calendar interactive
- Export schedules to Google Calendar
- Support future academic years
- Add instructor rating integration
- Add local caching for filters and pinned courses
- Add dark mode

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Set up a local PostgreSQL database.
3. Create a `.env` file inside root directory with your `DATABASE_URL`.
4. Run `npm run deps`
5. Run `npm run db`
6. Run `npm run dev` (backend)
7. In another terminal, run:
   - `cd client`
   - `npm run dev`
8. Open http://localhost:5173 in your browser.


















