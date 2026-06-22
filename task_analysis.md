# Task Breakdown & Analysis: Exams & Careers Modules

This document contains a structured task breakdown of the work done and the future roadmap for the **Exams** and **Careers/Vacancies** modules. You can copy and paste these lists directly into your task management tool (e.g., ClickUp, Jira, Trello, Notion).

---

## MODULE 1: Careers & Vacancies (Job Board)

This module handles the listing of active vacancies, detailed job specs, share utilities, and the application intake form.

### TASK 1.1: Careers Data Layer & Logic [COMPLETED]
*   **Sub-task 1.1.1**: Define TypeScript interfaces for `Job`, `Company`, `EmploymentType`, `WorkMode`, `ExperienceLevel`, and `JobStatus`.
*   **Sub-task 1.1.2**: Set up Mock Careers dataset containing sample roles (e.g., Software Engineer, Senior React Developer, HR Manager, Product Designer) with realistic benefits, skills, and qualifications.
*   **Sub-task 1.1.3**: Create public helper functions: `getPublicJobs` (filters by status and sorts by date), `getFeaturedJobs`, `getJobBySlug`, and `getRelatedJobs`.
*   **Sub-task 1.1.4**: Implement formatting utilities: `formatSalary` (shows LPA range or conceals undisclosed salaries) and `postedAgo` (calculates relative date strings like "Posted 3 days ago").

### TASK 1.2: Careers Main Listing Page [COMPLETED]
*   **Sub-task 1.2.1**: Implement a premium Hero section with decorative glow layers, search bar, and popular category shortcuts (Engineering, Design, Remote, Internships) linking to openings with a smooth scroll.
*   **Sub-task 1.2.2**: Integrate real-time counters displaying statistics (Total Openings, Departments, Locations, Remote roles).
*   **Sub-task 1.2.3**: Build a sidebar containing dropdown filters for Department, Location, Employment Type, Experience Level, and Work Mode.
*   **Sub-task 1.2.4**: Implement dynamic multi-parameter filtering logic using React `useMemo` hooks.
*   **Sub-task 1.2.5**: Add an active filters counter badge with a one-click "Clear Filters" action.
*   **Sub-task 1.2.6**: Create layout toggle switches (`List View` vs `Grid View`) with UI icons.
*   **Sub-task 1.2.7**: Design an empty state card shown when no search results match, offering quick filter reset actions.
*   **Sub-task 1.2.8**: Build a Collapsible Accordion FAQ section at the bottom of the listings.

### TASK 1.3: Vacancy Listing Cards (Grid/List) [COMPLETED]
*   **Sub-task 1.3.1**: Build `VacancyCard` component supporting dual layouts.
*   **Sub-task 1.3.2**: Implement `List View` rendering — horizontal layout, primary details, employment tags, experience highlights, and salary range.
*   **Sub-task 1.3.3**: Implement `Grid View` rendering — vertical cards fitting a responsive grid (`grid-cols-1 sm:grid-cols-2`), incorporating a truncated job description (`line-clamp-2`).
*   **Sub-task 1.3.4**: Integrate custom color badges based on Employment Type (e.g. green for Full Time, blue for Part Time) and Work Mode (e.g. teal for Remote).
*   **Sub-task 1.3.5**: Implement "Urgent Hiring" red badges for high-priority positions.

### TASK 1.4: Job Details Page [COMPLETED]
*   **Sub-task 1.4.1**: Configure SEO headers, metadata descriptions, and structured JSON-LD schemas (FAQPage schema) for Google crawling.
*   **Sub-task 1.4.2**: Design a detailed Hero banner summary block showing core parameters at a glance.
*   **Sub-task 1.4.3**: Integrate a JS-based sticky sidebar that pins to the side of the viewport to keep the "Apply Now" button and job parameters visible during scroll.
*   **Sub-task 1.4.4**: Format sections for Job Overview, Key Responsibilities, Required/Preferred Skills, Qualifications, and Benefits.
*   **Sub-task 1.4.5**: Design a step-by-step horizontal stepper diagram explaining the selection/hiring process.
*   **Sub-task 1.4.6**: Build a "Share this Job" card featuring copy-link button (with stateful confirmation), WhatsApp sharing, and email sharing options.
*   **Sub-task 1.4.7**: Render a "Related Jobs" section showing matching vacancies from the same department or work mode.

### TASK 1.5: Job Application Form [COMPLETED]
*   **Sub-task 1.5.1**: Build input fields for Personal Info (Full Name, Email, Mobile, Current Location).
*   **Sub-task 1.5.2**: Build input fields for Professional Info (Current Company, Designation, Total/Relevant Experience, Current/Expected Salary, Notice Period).
*   **Sub-task 1.5.3**: Build custom drag/click File Upload element for Resumes supporting PDF/Word uploads, size limits (5MB), and name display.
*   **Sub-task 1.5.4**: Add validation checks on submit for emails, phone numbers, and compulsory fields.
*   **Sub-task 1.5.5**: Add a hidden Honeypot field (`company_website`) to silently reject bot/spam submissions.
*   **Sub-task 1.5.6**: Implement loading state (`Submitting...` spinner) and success confirmation screen.

### TASK 1.6: Careers Backend & Integrations [PENDING / FUTURE]
*   **Sub-task 1.6.1**: Create Next.js API route (`POST /api/careers/apply`) to accept application submissions.
*   **Sub-task 1.6.2**: Configure file storage (e.g., AWS S3 or Supabase Storage) to upload and save resumes.
*   **Sub-task 1.6.3**: Connect submission handler to email service (e.g., Resend, Nodemailer, SendGrid) to notify the HR team and send confirmation receipts to candidate.
*   **Sub-task 1.6.4**: Integrate with an applicant tracking system (ATS) or admin dashboard database to store candidate profiles.

---

## MODULE 2: Entrance Exams

This module helps students discover, filter, and review details of various academic entrance exams in India.

### TASK 2.1: Exams Data Layer & Setup [COMPLETED]
*   **Sub-task 2.1.1**: Set up standard `examCategories` metadata (Engineering, Medical, Management, etc.).
*   **Sub-task 2.1.2**: Build exams database mapping details like exam date range, application form date, result dates, status badges, and description.
*   **Sub-task 2.1.3**: Configure sub-categories (e.g., BE/B.Tech, ME/M.Tech, Diploma) with corresponding exam counts.
*   **Sub-task 2.1.4**: Define filters structure for exam listings (Exam Type, Application Status, Application Mode, Exam Mode, Others).

### TASK 2.2: Exam Category Listing Page [COMPLETED]
*   **Sub-task 2.2.1**: Design a dynamic category-based listing route (`/exams/[examSlug]`).
*   **Sub-task 2.2.2**: Render category Hero banner with breadcrumbs and title (e.g. "Engineering Entrance Exams in India").
*   **Sub-task 2.2.3**: Build collapsible category filter panels in the sidebar.
*   **Sub-task 2.2.4**: Implement horizontal sub-category pills filter at the top of the main listing with "Show More/Less" toggles.
*   **Sub-task 2.2.5**: Set up listing default state action to reset selected pills.

### TASK 2.3: Layout Toggle Switch & View Options [COMPLETED]
*   **Sub-task 2.3.1**: Integrate state hook to toggle layouts and import Lucide view switcher icons (`List`, `LayoutGrid`).
*   **Sub-task 2.3.2**: Create a control bar header indicating count of filtered exams and grid/list switches.
*   **Sub-task 2.3.3**: Style the default `ExamListCard` — wide row layout with clear date markers (application form, exam dates, result announcements), sub-links, and "Apply Now" CTA.
*   **Sub-task 2.3.4**: Create and style `ExamGridCard` — vertical card layout organized inside a 2-column responsive layout (`grid-cols-1 md:grid-cols-2`), utilizing description truncation (`line-clamp-3`) and a compact dates table.

### TASK 2.4: Exam Details Tabs Page [COMPLETED]
*   **Sub-task 2.4.1**: Set up tabbed router system (`/exams/[examSlug]/[tabSlug]`) supporting sub-pages (Overview, Syllabus, Pattern, Dates, Results, Admit Card).
*   **Sub-task 2.4.2**: Design the exam detail Hero panel containing basic details and registration status.
*   **Sub-task 2.4.3**: Integrate scroll-aware sticky sidebar showing links, mock tests, and alert notifications.

### TASK 2.5: Active Filtering Logic [PENDING / FUTURE]
*   **Sub-task 2.5.1**: Map the sidebar filter checkboxes (Exam Type, Status, Mode) to component state.
*   **Sub-task 2.5.2**: Update the search filtering logic to dynamically filter exams in real-time according to selected checkboxes.

### TASK 2.6: Exam Alerts & Subscriptions [PENDING / FUTURE]
*   **Sub-task 2.6.1**: Build "Subscribe to Alerts" form component in the sidebar.
*   **Sub-task 2.6.2**: Design email alert system alerting students when registration starts or results are declared.
