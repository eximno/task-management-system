<p align="center">
  <img src="assets/logo.png" width="96" alt="DLSU-D seal" />
</p>

<h1 align="center">DLSU-D Student Task Management System</h1>

<p align="center">
  A simple web app that helps students record, track, and complete their academic tasks.<br/>
  <b>Enabling Assessment 6 — Agile Software Development Using the Scrum Framework</b>
</p>

---

## Quick Start

1. Clone or download this repository.
2. Open the folder in **VS Code**.
3. Open `index.html` in a browser (or use the **Live Server** extension).

No installation needed — Tailwind CSS and petite-vue load from a CDN.

| | |
|---|---|
| **Languages** | HTML, CSS, JavaScript |
| **Libraries** | Tailwind CSS (styling), petite-vue (reactivity) |
| **Fonts** | Figtree (headings), Roboto (body) |
| **Storage** | Browser Local Storage (no database) |
| **Data** | Hardcoded sample tasks for Justin, Aian, and Timothy |

## Contents

1. [Product Vision](#1-product-vision)
2. [Scrum Team](#2-scrum-team)
3. [Product Backlog](#3-product-backlog)
4. [Definition of Done](#4-definition-of-done)
5. [Acceptance Criteria](#5-acceptance-criteria)
6. [Branches](#branches)
7. [Project Structure](#project-structure)

## 1. Product Vision

> "Our goal is to develop a simple and accessible Student Task Management System that helps DLSU-D students organize academic activities, monitor deadlines, and manage their task completion efficiently."

## 2. Scrum Team

| Member | Scrum Role | Responsibilities | Git Branch |
|---|---|---|---|
| **Justin Basilides** | Product Owner | Product vision, user stories, backlog priority, acceptance of features, sample data | `justin` |
| **Aian Cuento** | Scrum Master | Facilitates Scrum events, removes impediments, CSS design & layout, Scrum records | `aian` |
| **Timothy Delmoro** | Developer | HTML structure, JavaScript functionality, integration, testing | `tim` |

> With only three members, the Product Owner and Scrum Master also helped as Developers. All code was reviewed by at least one other member before merging.

## 3. Product Backlog

Priority guide: **High** = essential · **Medium** = improves usability · **Low** = can wait for later Sprints.

| ID | User Story | Priority | Sprint |
|---|---|---|---|
| US01 | As a student, I want to **add a new academic task** so that I can record my responsibilities. | High | 1 |
| US02 | As a student, I want to **specify a deadline** so that I can monitor due dates. | High | 1 |
| US03 | As a student, I want to **categorize tasks** so that I can organize my activities. | High | 1 |
| US04 | As a student, I want to **view all my tasks** so that I can monitor my workload. | High | 1 |
| US05 | As a student, I want to **mark tasks as completed** so that I can track my progress. | High | 1 |
| US06 | As a student, I want to **edit task information** so that I can correct or update details. | Medium | 2 |
| US07 | As a student, I want to **delete tasks** so that I can remove unnecessary records. | Medium | 2 |
| US08 | As a student, I want to **search for tasks** so that I can easily find specific activities. | Medium | 2 |
| US09 | As a student, I want to **filter tasks by category** so that I can view related activities. | Medium | 2 |
| US10 | As a student, I want to **see the number of pending tasks** so that I can monitor my workload. | Medium | 2 |
| US11 | As a student, I want **completed tasks to be visually distinguished** so that I can identify finished activities. | Low | Final |
| US12 | As a student, I want my tasks to **remain saved after closing the browser** so that I do not lose my records. | High | 2 |
| US13 | As a student, I want to **sort tasks by nearest deadline** so that I can work on urgent tasks first. | Medium | Final |
| US14 | As a student, I want **overdue tasks to be highlighted** so that I do not miss late submissions. | Medium | Final |
| US15 | As a student in a group, I want to **filter tasks by member** so that I can see who is responsible for each task. | Low | Final |

## 4. Definition of Done

A backlog item is **Done** when:

1. The functionality is implemented.
2. The code is integrated into the application.
3. The feature has been tested.
4. It works according to its requirements.
5. No critical errors remain.
6. The code was reviewed by at least one other member.
7. It does not break previously completed features.

## 5. Acceptance Criteria

| User Story | Accepted when… |
|---|---|
| **US01** Add task | User can enter a title, select a category, set a deadline, and click **Add Task** · the new task appears in the list · submission is blocked when required fields are empty |
| **US02** Deadline | A date picker is available · the deadline is shown on each task · a task cannot be added without a deadline |
| **US03** Category | Category dropdown has Assignment, Project, Quiz, Exam, Other · the selected category is shown on the task |
| **US05** Complete task | Ticking the checkbox changes status to **Completed** · unticking returns it to **Pending** |
| **US06** Edit task | Clicking ✎ loads the task into the form · **Save Changes** updates the task · **Cancel** discards edits |
| **US07** Delete task | Clicking ✕ removes only the selected task · the counters update |
| **US08** Search | Typing in the search box shows only tasks whose title matches (case-insensitive) |
| **US09** Filter | Choosing a category shows only tasks in that category · "All categories" shows everything |
| **US10** Statistics | Pending and completed counts are always correct after add / edit / delete / complete |
| **US12** Persistence | Tasks remain after refreshing or reopening the browser |

## Branches

Each Sprint is preserved as its own branch so the product increment can be compared version by version.

| Branch | Contents |
|---|---|
| `main` | **Final Sprint** — complete, tested product |
| `sprint-2` | Sprint 2 increment (edit, delete, search, filter, stats, Local Storage) |
| `sprint-1` | Sprint 1 increment (add, categorize, list, complete) |
| `justin` | Product Owner work — backlog, acceptance criteria, reviews, sample data |
| `aian` | Scrum Master work — CSS design, Scrum event records |
| `tim` | Developer work — HTML structure and JavaScript features |

Workflow: members work on their own branch → merge into the current `sprint-*` branch after review → the final increment is merged into `main`.

## Project Structure

```
StudentTaskManagement/
├── index.html      # Structure and UI (Tailwind classes, petite-vue bindings)
├── style.css       # Custom components, theme, task states
├── script.js       # App logic, validation, Local Storage
├── assets/logo.png
└── docs/screenshots/
```
