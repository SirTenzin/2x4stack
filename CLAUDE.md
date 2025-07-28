# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo called "2x4" using Bun as the package manager. The project consists of a React web application built with TanStack Start/Router, a Convex backend, and shared TypeScript configurations.

## Key Commands

### Development
- `bun dev` - Start development servers for all apps (uses Turbo)
- `turbo dev --filter=web` - Start only the web app development server
- `turbo dev --filter=backend` - Start only the backend (Convex) development server

### Building & Type Checking
- `bun run build` - Build all apps and packages
- `bun run check-types` - Run TypeScript type checking across the monorepo
- `bun run lint` - Run linting across all packages
- `bun run format` - Format code using Prettier

### Package-specific Commands
- `cd apps/web && bun dev` - Run web app with Vite dev server
- `cd apps/web && bun build` - Build web app (includes TypeScript compilation)
- `cd packages/backend && bun dev` - Start Convex development server

## Architecture

### Monorepo Structure
- **apps/web**: React application using TanStack Start/Router with Kinde Auth, Tailwind CSS, and Convex integration
- **packages/backend**: Convex backend with database schema and functions
- **packages/typescript-config**: Shared TypeScript configurations for different environments (TanStack Start, Convex, etc.)

### Key Technologies
- **Frontend**: React 19, TanStack Start/Router, Tailwind CSS v4, Vite
- **Backend**: Convex (real-time database and functions)
- **Auth**: Kinde Auth
- **Build System**: Turborepo with Bun package manager
- **Styling**: Tailwind CSS with Radix UI components

### Important Files
- `turbo.json`: Defines build pipeline tasks and dependencies
- `apps/web/vite.config.ts`: Vite configuration for the web app
- `packages/backend/convex/schema.ts`: Database schema definitions
- `packages/typescript-config/`: Contains base TypeScript configs for different environments

## Development Workflow

1. The web app runs on Vite with TanStack Start for SSR/routing
2. Backend uses Convex for real-time database and serverless functions
3. Turbo handles task orchestration and caching across the monorepo
4. TypeScript is used throughout with strict type checking
5. All packages are private and use ESM modules

## Important Notes

- Uses Bun 1.2.19 as the package manager (specified in package.json)
- Node.js >= 18 required
- The project appears to be transitioning from a standard Turborepo starter to a custom full-stack application
- Convex backend requires running `convex dev` for local development
- Web app integrates with Convex using `@convex-dev/react-query`