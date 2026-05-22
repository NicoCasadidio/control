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

## Design System

### Color Palette

**Dark Theme (OLED-inspired)**
- Background: `#020617` (near-black)
- Primary Surface: `#0f172a` (dark navy)
- Secondary Surface: `#1e293b` (slate)
- Tertiary: `#1a2642` (darker slate for inputs/hovers)
- Brand Accent: `#0047ab` (Cobalt Blue)
- Text Primary: `#f8fafc` (near-white)
- Text Secondary: `#cbd5e1` (light slate)
- Text Muted: `#94a3b8` (muted slate)
- Text Disabled: `#64748b` (darker slate)

### Typography

- Font: Geist Sans (system font stack)
- Headings: Bold weight (600-700) with tight tracking
- Body: Regular weight (400-500), 16px minimum on mobile
- Line height: 1.5-1.75 for body text
- Line length: Content constrained to `max-w-6xl` or `max-w-7xl`

### Spacing & Layout

- Use consistent gaps: `gap-4`, `gap-6`, `gap-8`
- Padding patterns: `p-4`, `p-6`, `p-8` for cards and sections
- Container max-widths: `max-w-4xl` for narrow, `max-w-6xl` for standard, `max-w-7xl` for wide
- Navigation bar height: `h-16` (64px)
- Add `pt-16` to main content when navbar is fixed

### Component Patterns

**Cards**
- Border: `border-[#1e293b]` with 1px width
- Background: `bg-[#0f172a]`
- Padding: `p-6` standard, `p-8` for larger cards
- Hover: `hover:border-[#0047ab] hover:bg-[#1a2642] transition-all duration-200`
- Radius: `rounded-lg`

**Buttons**
- Primary: `bg-[#0047ab] hover:bg-[#0037a3] text-white`
- Secondary: `border border-[#1e293b] hover:border-[#0047ab] text-white`
- Muted: `bg-[#1e293b] text-[#cbd5e1] hover:text-white`
- Danger: `bg-red-900/50 hover:bg-red-900 text-red-300`
- All buttons: `transition-colors` with 200ms timing

**Modals**
- Backdrop: `fixed inset-0 bg-black/50`
- Dialog: `bg-[#0f172a] border border-[#1e293b] rounded-lg`
- Width: `w-full max-w-md` standard, `max-w-2xl` for larger
- Padding: `p-6`

**Form Inputs**
- Container: `border border-[#1e293b] bg-[#1a2642] rounded-md`
- Padding: `px-3 py-2`
- Text: `text-white placeholder-[#64748b]`
- Focus: `focus:border-[#0047ab] focus:outline-none`
- Labels: `text-sm font-medium text-[#cbd5e1]`

**Navigation Links**
- Active state: `text-[#0047ab] bg-[#0047ab]/10`
- Inactive: `text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]`
- All: `transition-colors cursor-pointer`

### Icons

- Use Lucide React icons throughout
- Never use emojis as UI icons
- Icon sizing: Standard `w-6 h-6` or `w-5 h-5` for compact
- Icon containers: `w-10 h-10` or `w-12 h-12` with flex centering
- Icon colors: Use brand color `text-[#0047ab]` for interactive, `text-[#94a3b8]` for muted

### Transitions & Animations

- Standard duration: `duration-200` (200ms)
- Properties to animate: `transition-colors`, `transition-all`
- Avoid animating layout-affecting properties (width, height, margin)
- Use `opacity` and `transform` for performance-critical animations

### Responsive Design

- Mobile-first approach: Design for mobile, then enhance with `md:` breakpoints
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Hide on mobile: Use `hidden md:block` or `hidden sm:inline-block`
- Stack layouts: `flex flex-col sm:flex-row`
- Grid cols: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Accessibility

- All interactive elements: Include `cursor-pointer`
- Links and buttons: Visible focus states (usually handled by Tailwind)
- Color contrast: Minimum 4.5:1 for normal text (verified in dark theme)
- Form labels: Always use `<label htmlFor>` pattern
- Icon-only buttons: Include `title` or `aria-label`

## Hard rules

- Do not modify database schema or Prisma models
- Do not modify Server Actions logic
- Do not modify authentication (Clerk) configuration
- Do not add new dependencies without asking first
- Do not remove or break existing functionality
- Dark theme is the default and primary design—no light mode
- Always use Cobalt Blue (#0047ab) for brand interactions and highlights
- Maintain consistent spacing and border colors across all components
- All forms and inputs must follow the established input pattern
- Navigation always shows active state using brand color background + text color