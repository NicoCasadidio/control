# CONTROL — Claude Code Instructions

## Project overview

CONTROL is a task and team management web app (Trello/Linear-inspired).
Users can create workspaces, invite members, create and assign tasks, add comments, and track progress.
The goal is a functional, maintainable, and professional-looking product — something that looks and feels like a real SaaS tool.

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma v7
- **Auth**: Clerk
- **Styles**: Tailwind CSS
- **Icons**: Lucide React

## Project structure

```
src/
  actions/        # Server Actions (comment.ts, invitation.ts, member.ts, task.ts, workspace.ts)
  app/            # Next.js App Router pages and layouts
  components/     # Reusable React components
  generated/      # Prisma generated client (do not edit)
  lib/            # Shared utilities (prisma.ts, priority.ts)
```

## Brand color

The app's accent color is **Cobalt Blue `#0047AB`**. Use it as the primary brand color throughout the UI.

## Code conventions

- All components in `src/components/` are Client Components unless stated otherwise
- Server Components live in `src/app/`
- Server Actions live in `src/actions/`
- Keep components focused — one responsibility per file
- Use TypeScript interfaces for all props
- Existing Server Actions and data fetching logic must not be modified unless explicitly requested
- When adding new UI to existing pages, preserve all existing functionality

## Hard rules

- Do not modify database schema or Prisma models
- Do not modify Server Actions logic
- Do not modify authentication (Clerk) configuration
- Do not add new dependencies without asking first
- Do not remove or break existing functionality