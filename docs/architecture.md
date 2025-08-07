```markdown
# 🧭 CR AudioViz AI — Architecture Guide

This document outlines the modular frontend architecture powering CR AudioViz AI. It’s designed for clarity, recovery, and rapid onboarding.

---

## 🧱 Layout & Routing

- **Framework**: React + Vite
- **Routing**: `react-router-dom` with nested layouts
- **Protected Routes**: Authenticated views gated via Supabase session checks
- **Fallbacks**: 404 and error overlays for unknown paths or failed loads

### File Structure

```
/src
    /components        # Shared UI components
    /layouts           # AppShell, AuthLayout, etc.
    /pages             # Route-based views (Home, Dashboard, etc.)
    /routes            # Route definitions and guards
    /hooks             # Custom React hooks
    /utils             # Utility functions
    /services          # API and Supabase logic
    /assets            # Static assets (images, icons)
    main.tsx           # App entrypoint
    App.tsx            # Root component with router
```
- **Separation of Concerns**: Layouts wrap pages; pages focus on data and UI; components are reusable building blocks.
- **Routing**: All routes defined in `/routes`, imported into `App.tsx`.

---

## 🔒 Authentication Flow

- **Supabase Auth**: Handles sign-in, sign-up, and session persistence.
- **Route Guards**: Custom hooks (e.g., `useAuthGuard`) redirect unauthenticated users.
- **Session Recovery**: On refresh, session is restored from Supabase.

---

## 🧩 Modularity & Extensibility

- **Component-Driven**: All UI is built from atomic, reusable components.
- **Feature Isolation**: Each feature (e.g., Audio Player, Visualizer) lives in its own folder under `/pages` and `/components`.
- **Easy Onboarding**: Clear folder structure and comments for new contributors.

---

## 🛠️ Error Handling & Recovery

- **Error Boundaries**: Catch and display errors at layout and page level.
- **Fallback UI**: Friendly overlays for network/API errors and 404s.

---

## 🚀 Development Workflow

- **Vite Dev Server**: Fast HMR and build times.
- **ESLint & Prettier**: Enforced code style and linting.
- **TypeScript**: Strict typing throughout the codebase.

---

_For more details, see `/src/routes` and `/src/layouts` for practical examples._
```