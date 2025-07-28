# 2X4 Stack

A modern full-stack TypeScript monorepo built with Turborepo + Convex + React + Vite + TanStack Router + shadcn/ui + Autumn Billing.

## Tech Stack

- **Frontend**: React 19 with TanStack Router, Vite, and shadcn/ui components
- **Backend**: Convex for real-time database and serverless functions  
- **Auth**: Kinde Auth integration
- **Styling**: Tailwind CSS v4 with Radix UI primitives
- **Billing**: Autumn for payment management
- **Build System**: Turborepo with Bun package manager
- **Type Safety**: TypeScript throughout with strict configurations

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `web`: React application with TanStack Router, Convex integration, and Kinde Auth
- `atmn`: Autumn billing management CLI and utilities  
- `backend`: Convex backend with database schema, auth, and serverless functions
- `typescript-config`: Shared TypeScript configurations for different environments

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager and runtime)
- [Convex](https://convex.dev/) account for backend services
- [Autumn](https://useautumn.com) account for billing engine

### Development

To develop all apps and packages:

```bash
# Install dependencies
bun install

# Start all development servers
bun dev

# Or with turbo directly
turbo dev
```

You can develop specific packages using filters:

```bash
# Web app only
turbo dev --filter=web

# Backend only  
turbo dev --filter=backend

# Autumn billing CLI
turbo dev --filter=atmn
```

### Build

To build all apps and packages:

```bash
bun run build

# Or with turbo
turbo build
```

Build specific packages:

```bash
turbo build --filter=web
turbo build --filter=backend
```

### Additional Commands

```bash
# Type checking across monorepo
bun run check-types

# Linting
bun run lint

# Code formatting
bun run format
```

## Project Structure

- **apps/web**: Main React application with TanStack Router and Convex integration
- **apps/atmn**: Autumn billing management tools and CLI
- **packages/backend**: Convex backend with auth, database schema, and functions
- **packages/typescript-config**: Shared TypeScript configurations

## Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Turbo](https://turborepo.com/) for build system and task runner

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
# Authenticate with Vercel
turbo login

# Link your repo to Remote Cache  
turbo link
```

## Useful Links

Learn more about the technologies used:

### 2X4 Stack Components
- [Convex](https://convex.dev/) - Backend-as-a-Service with real-time database
- [TanStack Router](https://tanstack.com/router) - Type-safe router for React
- [Kinde Auth](https://kinde.com/) - Authentication and user management
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Autumn](https://useautumn.com/) - Billing and payment management
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime and package manager

### Turborepo
- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
