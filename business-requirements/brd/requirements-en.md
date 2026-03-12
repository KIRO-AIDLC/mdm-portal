# Master Data Management (MDM) Portal — Business Requirements Document

---

## 1. Business Context

### 1.1 Project Overview

MDM Portal is a modern web application for centralized Master Data management across the organization. Starting with User Management as the first module, the platform has a roadmap to expand into other data domains such as Customers, Orders, and more. The system follows a Minimum Viable Product (MVP) approach to deliver core features rapidly, with additional modules planned according to the roadmap.

### 1.2 Problem Statement

- Master Data is scattered across spreadsheets and emails with no single source of truth
- No efficient tools for searching, filtering, and bulk-managing data
- Need a modern web platform deployable on both local (Docker) and cloud (AWS) environments

### 1.3 Target Users & Roles

| Role | Description | Priority |
|---|---|---|
| Viewer | Read-only access to user directory, search, and filter | **Required (MVP)** |
| System Admin | Full CRUD access to all user accounts | Optional (Phase 2) |
| Manager | View users and update account status | Optional (Phase 2) |

### 1.4 Success Criteria (MVP)

- Viewers can browse user list, search, and filter via web interface
- Displays mockup data immediately
- UI uses design mockup (`business-requirements/ui-mockup/`) as a baseline reference, adaptable as appropriate
- Deployable on Docker (local) and AWS (staging/prod)

### 1.5 UI Reference

- Design Mockup: `business-requirements/ui-mockup/` (React + MUI prototype)
- Figma: [MDM Portal — User Management](https://www.figma.com/design/ctemScybvdoZEXQs1MkLFh/Metro-Service-Hub?node-id=2028-9517&m=dev)

---

## 2. Feature Priority & Phasing

### Priority Matrix

| Priority | Feature | Phase | Remarks |
|---|---|---|---|
| P0 — Required | List Users (read-only table) | MVP | mockup data |
| P0 — Required | Search | MVP | filter by name, email |
| P0 — Required | Filter by Attribute | MVP | dropdown filter |
| P0 — Required | Pagination | MVP | client-side |
| P0 — Required | Backend API (GET endpoints) | MVP | mockup data |
| P0 — Required | Docker Compose (local dev) | MVP | FE + BE + DB |
| P1 — Optional | Responsive Layout | Phase 2 | all breakpoints |
| P1 — Optional | Create User (form + POST) | Phase 2 | subsequent delivery |
| P1 — Optional | Update User (PUT) | Phase 2 | subsequent delivery |
| P1 — Optional | Delete User (DELETE + bulk) | Phase 2 | subsequent delivery |
| P1 — Optional | View User Detail | Phase 2 | subsequent delivery |
| P2 — Optional | Login / Authentication | Phase 3 | JWT-based |
| P2 — Optional | Role-based Access (Admin, Manager) | Phase 3 | RBAC middleware |
| P2 — Optional | Error Handling (Snackbar, inline) | Phase 3 | structured errors |
| P2 — Optional | Terraform Infrastructure | Phase 3 | S3+CloudFront, ECS, RDS |

---

## 3. Functional Requirements

### MVP Features (P0 — Required)

#### FR-01: List Users

- Display users in a paginated data table
- Columns: User (avatar + name), Email, Location (pin icon + city), Account Status (chip), ID
- Row selection via checkboxes (individual + select-all)
- Default: 10 rows per page with total count display (e.g. "1–5 of 13")
- Uses backend seed data (mockup)

#### FR-02: Search

- Search text field filters by name, email, or other text fields
- Debounced input (300ms) triggers API query
- Supports partial match (case-insensitive)

#### FR-03: Filter by Attribute

- Attribute dropdown filters by property (e.g. account status, location)
- Filter works in combination with search

#### FR-04: Pagination

- Client-side pagination from API response
- Rows per page selector (5, 10, 25)
- Displays total count and page navigation

### Phase 2 Features (P1 — Optional)

#### FR-05: Responsive Layout

| Breakpoint | Width | Sidebar |
|---|---|---|
| Extra Large | >= 1536px | Expanded (256px) |
| Large | >= 1200px | Expanded (256px) |
| Medium | >= 900px | Collapsed (64px, icons only) |
| Small | >= 600px | Collapsed (64px, icons only) |
| Extra Small | < 600px | Hidden, replaced by BottomNavigation |

#### FR-06: Create User

- **NEW** button in toolbar opens a form
- Fields: Name (required), Email (required, valid format), Location (required), Account Status (default: Active)
- On success, new user appears in the table without full page reload

#### FR-07: View User Detail

- Clicking a user row opens a detail view displaying all fields
- Detail view is read-only by default

#### FR-08: Update User

- Editable fields: Name, Email, Location, Account Status
- Validate inputs before submission (same rules as Create)
- On success, changes reflect in the table immediately

#### FR-09: Delete User

- Single delete via context action on a row
- Bulk delete via **ACTION** button in toolbar
- Confirmation dialog required before deletion
- On success, remove user(s) and update total count

### Phase 3 Features (P2 — Optional)

#### FR-10: Login / Authentication

- Login page with email + password
- JWT-based authentication
- Token stored in httpOnly cookie or localStorage
- Protected routes redirect to login if no token present

#### FR-11: Role-based Access Control (RBAC)

- Roles: System Admin, Manager, Viewer
- Admin: Full CRUD access
- Manager: View + Update status
- Viewer: Read-only (MVP default)
- RBAC middleware on backend validates role before execution

#### FR-12: Error Handling

- Structured error responses from API (`{ error: string, details?: object }`)
- User-friendly error messages via MUI Snackbar
- Form validation errors displayed inline

---

## 4. Data Model & API

### Data Model

```typescript
interface User {
  id: string
  name: string
  email: string
  location: string
  accountStatus: 'Active' | 'Suspended'
  createdAt: Date
  updatedAt: Date
}
```

### Database Schema (PostgreSQL 18)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  location VARCHAR(255) NOT NULL,
  account_status VARCHAR(20) NOT NULL DEFAULT 'Active'
    CHECK (account_status IN ('Active', 'Suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### API Contract

#### MVP Endpoints (P0)

| Method | Endpoint | Description | Priority |
|---|---|---|---|
| GET | `/api/users` | List users (`?search=`, `?status=`, `?page=`, `?limit=`) | P0 |
| GET | `/api/users/:id` | Get single user | P0 |

#### Phase 2 Endpoints (P1)

| Method | Endpoint | Description | Priority |
|---|---|---|---|
| POST | `/api/users` | Create user | P1 |
| PUT | `/api/users/:id` | Update user | P1 |
| DELETE | `/api/users/:id` | Delete user | P1 |
| DELETE | `/api/users` | Bulk delete (`{ ids: string[] }`) | P1 |

#### Phase 3 Endpoints (P2)

| Method | Endpoint | Description | Priority |
|---|---|---|---|
| POST | `/api/auth/login` | Login (email + password) | P2 |
| POST | `/api/auth/logout` | Logout | P2 |
| GET | `/api/auth/me` | Get current user info + role | P2 |

### Seed Data (Mockup)

```typescript
const seedUsers = [
  { name: 'Prabodhan Fitzgerald', email: 'prabodhan.f@company.com', location: 'Izsahport', accountStatus: 'Active' },
  { name: 'Hiro Joyce', email: 'hiro.j@company.com', location: 'Strackeside', accountStatus: 'Active' },
  { name: 'Lloyd Jefferson', email: 'lloyd.j@company.com', location: 'Texas City', accountStatus: 'Active' },
  { name: 'Ceiran Mayo', email: 'ceiran.m@company.com', location: 'Lake Esmeralda', accountStatus: 'Active' },
  { name: 'Thumbiko James', email: 'thumbiko.j@company.com', location: 'East Paige', accountStatus: 'Suspended' },
  { name: 'Ananya Patel', email: 'ananya.p@company.com', location: 'Mumbai', accountStatus: 'Active' },
  { name: 'Marcus Chen', email: 'marcus.c@company.com', location: 'San Francisco', accountStatus: 'Active' },
  { name: 'Sofia Rodriguez', email: 'sofia.r@company.com', location: 'Barcelona', accountStatus: 'Suspended' },
  { name: 'Kenji Tanaka', email: 'kenji.t@company.com', location: 'Tokyo', accountStatus: 'Active' },
  { name: 'Amara Okafor', email: 'amara.o@company.com', location: 'Lagos', accountStatus: 'Active' },
  { name: 'Erik Lindqvist', email: 'erik.l@company.com', location: 'Stockholm', accountStatus: 'Active' },
  { name: 'Priya Sharma', email: 'priya.s@company.com', location: 'Delhi', accountStatus: 'Suspended' },
  { name: 'Lucas Weber', email: 'lucas.w@company.com', location: 'Berlin', accountStatus: 'Active' },
]
```

---

## 5. Non-Functional Requirements

### NFR-01: Performance

- API list queries respond in < 200ms
- Table renders smoothly up to 1,000 rows
- Frontend bundle size < 500KB gzipped

### NFR-02: Security

- Input sanitization on backend
- CORS restricted to frontend origin
- Environment-based secrets management (no hardcoded credentials)
- Unique email constraint enforced at database level

### NFR-03: Accessibility

- All interactive elements are keyboard-navigable
- Table uses semantic HTML (`<table>`, `<thead>`, `<tbody>`)
- Form inputs have associated `<label>` elements
- Color contrast meets WCAG 2.1 AA guidelines

### NFR-04: Responsiveness

Per breakpoint table in FR-05 (Phase 2)

---

## 6. Tech Stack & Architecture

### 6.1 Frontend (SPA)

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| UI Library | Material UI (MUI) v7 |
| Styling | Emotion via MUI `sx` prop |
| Build Tool | Vite |
| Font | Roboto (`@fontsource/roboto`) |
| Icons | `@mui/icons-material` |

### 6.2 Backend (API)

| Concern | Choice |
|---|---|
| Runtime | Node.js v24.14.0 |
| Framework | Express.js + TypeScript |
| ORM | Prisma |
| Validation | zod |

### 6.3 Database

| Concern | Choice |
|---|---|
| Engine | PostgreSQL 18 |
| Local | Docker container |
| Staging/Production | Amazon RDS Aurora PostgreSQL |

### 6.4 Local Development (Docker)

Docker Compose orchestrates:
- PostgreSQL container (port 5432)
- Backend API container (port 3000)
- Frontend runs natively via `npm run dev` (Vite, port 5173) or as a container

### 6.5 Production (AWS)

| Layer | AWS Service |
|---|---|
| Static Web Hosting | S3 + CloudFront |
| Backend API | ECS Fargate |
| Database | RDS Aurora PostgreSQL |
| Infrastructure as Code | Terraform (HCL) |

### 6.6 Deployment Diagram

```
                     ┌──────────────┐
  User ──────────────► CloudFront   │
                     └──────┬───────┘
                            │
               ┌────────────┼────────────┐
               │ static     │ /api/*     │
               ▼            ▼            │
        ┌──────────┐  ┌───────────┐     │
        │ S3 Bucket│  │ECS Fargate│     │
        │(React SPA)│  │ (Express) │     │
        └──────────┘  └─────┬─────┘     │
                            │            │
                            ▼            │
                     ┌──────────────┐   │
                     │ RDS Aurora   │   │
                     │ PostgreSQL   │   │
                     └──────────────┘   │
```

### 6.7 Project Structure

```
mdm-portal/
├── frontend/                # React SPA (Vite + MUI)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   └── main.tsx         # Entry point
│   └── package.json
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   └── index.ts         # Entry point
│   ├── prisma/              # Prisma schema & migrations
│   └── package.json
├── infra/                   # Terraform infrastructure (Phase 3)
│   ├── modules/             # Terraform module definitions
│   └── package.json
├── docker-compose.yml       # Local dev environment
└── business-requirements/   # Requirements & UI mockup
    ├── brd/
    └── ui-mockup/
```

### 6.8 UI Components (from Design Mockup)

| Component | MUI Equivalent | Usage |
|---|---|---|
| AppBar | `<AppBar>` | Top navigation bar (primary blue) |
| Sidenav | `<Drawer>` | Persistent sidebar, logo, search, expandable nav |
| Data Table | `<Table>` | User listing with checkbox selection |
| Search Field | `<TextField>` | Toolbar search input |
| Attribute Filter | `<Select>` | Toolbar dropdown filter |
| Status Chip | `<Chip>` | Active (green) / Suspended (orange) |
| Avatar | `<Avatar>` | User initials, orange background |
| Pagination | `<TablePagination>` | Rows per page + page navigation |
| Action Button | `<Button variant="outlined">` | Bulk actions (Phase 2) |
| New Button | `<Button variant="contained">` | Create new user (Phase 2) |
| Bottom Nav | `<BottomNavigation>` | Mobile navigation (xs breakpoint) |

---

## 7. Implementation Roadmap

The MDM Portal is designed as a modular platform, starting with **User Management** as the first module and expanding to support other Master Data domains such as Customers, Orders, and more in the future.

### Phase 1 — MVP: User Management (Read-only)

1. Scaffold frontend + backend project structure
2. Implement UI per design mockup (AppHeader, Sidenav, UserTable)
3. Backend API with seed data (GET endpoints)
4. Docker Compose for local development
5. Deliverable: browser displays user table with search/filter/pagination

### Phase 2 — User Management (Full CRUD & UX)

- Responsive Layout across all breakpoints
- CRUD operations (Create, Update, Delete)
- View User Detail

### Phase 3 — Authentication & Infrastructure

- Login / Authentication (JWT)
- Role-based Access Control (Admin, Manager, Viewer)
- Error Handling (Snackbar, inline validation)
- AWS Infrastructure deployment via Terraform

### Phase 4 — Master Data Expansion (Future)

- Customer Management module (CRUD, search, filter)
- Order Management module (CRUD, search, filter)
- Additional Master Data modules based on organizational needs
- Shared components and patterns from User Management are reusable immediately
