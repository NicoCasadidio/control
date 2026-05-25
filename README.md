# CONTROL

A workspace-based task management platform. Built with modern full-stack technologies and deployed to production.

**Live demo:** https://control-two-jet.vercel.app

---

## What is CONTROL?

CONTROL is a team collaboration platform where users can:
- Create workspaces and invite team members
- Create and assign tasks with due dates
- Track task progress with status updates
- Comment on tasks for collaboration
- View activity feeds and personal dashboards
- Search and filter tasks across workspaces

The platform is built for simplicity and clarity — every feature solves a real problem without unnecessary complexity.

---

## Architecture & Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 16 + TypeScript + Tailwind CSS | Single codebase for frontend and backend. Type safety out of the box. Fast styling. |
| **Backend** | Next.js Server Components + Server Actions | Queries database directly from components. No separate API layer needed. |
| **Database** | PostgreSQL + Prisma v7 | Type-safe database access. Versioned migrations. Automatic type generation. |
| **Auth** | Clerk | Handles authentication, session management, and user profiles. Webhooks sync users to our database. |
| **Email** | Resend | Simple API for transactional emails. Notifications for task assignments and invitations. |
| **Hosting** | Vercel + Supabase | Vercel for the app (serverless). Supabase for PostgreSQL (managed cloud database). |

### Key Decisions

- **Server Components over traditional API routes:** Data fetching lives inside components. Reduces boilerplate and improves performance by eliminating client-side hydration for read-only data.
- **Server Actions for mutations:** Form submissions call functions directly instead of POST endpoints. Simpler for CRUD operations.
- **Clerk for auth:** Pre-built UI and webhook system. Reduces implementation time for authentication.

---

## How It Works

### Authentication Flow
1. User signs up with Clerk
2. Clerk webhook triggers → user record created in our database
3. User can now create workspaces and get invited to existing ones

### Workspace & Members
- Users can create multiple workspaces
- Admins can invite members by email
- Members can accept or reject invitations
- Admins can remove members; members can leave

### Tasks
- Tasks belong to a workspace
- Can be assigned to any workspace member
- Status: pending → in_progress → done
- Priority calculated dynamically from due date
- Tasks can have multiple comments

### Activity Tracking
- Events logged for: task creation, status changes, comments, member joins
- Activity feed shows last 7 days of workspace events
- Immutable historical records (event data captured at creation time)

---

## Features

### Core
- ✅ Workspace management (create, edit, delete)
- ✅ Member management (invite, accept, remove, leave)
- ✅ Task management (create, edit, delete, change status)
- ✅ Comments on tasks
- ✅ Email notifications for task assignments and invitations

### Discovery
- ✅ Search tasks by title (real-time, debounced)
- ✅ Filter by status and priority
- ✅ "My Tasks" dashboard (all tasks assigned to you, cross-workspace)
- ✅ Activity feed per workspace

### UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states for all async operations
- ✅ Confirmation modals for destructive actions
- ✅ Error handling and user feedback

---

## Try It Out

**Live demo:** https://control-two-jet.vercel.app

Sign up with any email and start creating workspaces and tasks.

For developers interested in running this locally, the code is open source on GitHub. Check the `package.json` for dependencies and `prisma/schema.prisma` for the database design.

---

## Project Structure

```
control/
├── prisma/
│   ├── schema.prisma              # Database schema definition
│   ├── migrations/                # Migration history
│   └── prisma.config.ts           # Prisma v7 config with driver adapter
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Sign in, sign up pages
│   │   ├── dashboard/             # Protected routes
│   │   │   ├── workspace/[id]/    # Workspace and task pages
│   │   │   ├── my-tasks/          # Personal task dashboard
│   │   │   ├── invitations/       # Pending invitations
│   │   │   └── layout.tsx         # Shared sidebar
│   │   ├── api/webhooks/          # Webhook endpoints
│   │   ├── page.tsx               # Landing page
│   │   └── layout.tsx             # Root layout + ClerkProvider
│   │
│   ├── actions/                   # Server Actions (mutations)
│   │   ├── task.ts
│   │   ├── workspace.ts
│   │   ├── comment.ts
│   │   ├── invitation.ts
│   │   └── member.ts
│   │
│   ├── components/                # React components
│   │   ├── TaskCard.tsx
│   │   ├── CommentSection.tsx
│   │   ├── SearchAndFilterBar.tsx
│   │   ├── ConfirmModal.tsx       # Reusable confirmation dialog
│   │   └── ... (others)
│   │
│   ├── lib/                       # Utilities
│   │   ├── prisma.ts              # Prisma client instance
│   │   ├── email.ts               # Email functions
│   │   ├── priority.ts            # Priority calculation
│   │   └── activity.ts            # Activity logging
│   │
│   └── proxy.ts                   # Next.js middleware for auth
│
├── .env                           # Environment variables (local)
├── package.json
└── tsconfig.json
```

### Key Files to Review

- **`src/app/dashboard/workspace/[id]/page.tsx`** — Shows Server Component data fetching + composition with Client Components
- **`src/actions/task.ts`** — Server Actions with validation and error handling
- **`src/components/SearchAndFilterBar.tsx`** — URL params → server-side filtering pattern
- **`prisma/schema.prisma`** — Database design with relationships and constraints

---

## Technical Highlights

### Database Design
- Normalized schema with proper foreign keys and constraints
- Cascade deletes for data integrity
- Unique constraints on composite keys (user + workspace combination)
- Activity table with immutable event records

### Authentication & Authorization
- Clerk handles sign-up and login flows
- Webhook syncs user data to database
- Route protection at two levels: middleware (authenticated?) and page-level (authorized?)
- Server Actions validate permissions before mutations

### Frontend Patterns
- **URL as source of truth:** Filters stored in `searchParams` for persistence and shareability
- **Debounced search:** 300ms delay before fetching to reduce network requests
- **Server → Client composition:** Parent fetches data, child handles interactivity
- **Reusable components:** Generic `ConfirmModal` used for all destructive actions

### Performance
- Static site generation where applicable
- Incremental Static Regeneration for dynamic content
- Optimized database queries with Prisma includes
- Connection pooling for serverless deployments

---

## What's Not Included

This is version 1.0. Features for future iterations:

- Multi-assign tasks
- Tags and labels
- Sprints/cycles
- Advanced filtering and search
- Custom roles beyond admin/member
- File attachments
- Real-time collaboration
- Analytics and reporting

---

## Deployment

The app is deployed on:
- **Frontend:** Vercel (Next.js)
- **Database:** Supabase (PostgreSQL)
- **DNS & Auth:** Clerk webhooks configured for production

---

## Learning Outcomes

Building CONTROL taught:

1. **Full-stack architecture** — how frontend, backend, auth, and database connect
2. **Type-safe development** — TypeScript prevents entire classes of bugs
3. **Database design** — relationships, constraints, and migrations
4. **Real authentication** — not just tutorials, but production-ready patterns
5. **Production deployment** — serverless, environment variables, monitoring
6. **Debugging production issues** — cold starts, connection pooling, migration strategies

The project prioritizes **working software** over premature optimization. Every feature is complete before moving to the next.

---

## License

MIT