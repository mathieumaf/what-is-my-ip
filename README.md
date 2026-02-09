# What Is My IP

A modern, privacy-friendly web application that instantly displays your public IP address with geolocation details, built with Nuxt 4 and server-side rendering.

[![CI/CD Pipeline](https://github.com/mathieumaf/what-is-my-ip/actions/workflows/ci.yml/badge.svg)](https://github.com/mathieumaf/what-is-my-ip/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/mathieumaf/what-is-my-ip/branch/main/graph/badge.svg)](https://codecov.io/gh/mathieumaf/what-is-my-ip)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live Demo](https://what-is-my-ip-sand.vercel.app)**

<!-- TODO: Add screenshot after Epic 2 -->

## Features

- :globe_with_meridians: **IP Detection** — Instantly displays your public IPv4/IPv6 address
- :world_map: **Geolocation** — Shows country, city, region, ISP, and coordinates
- :crescent_moon: **Dark Mode** — Automatic OS detection with manual toggle
- :iphone: **Responsive Design** — Optimized for mobile, tablet, and desktop
- :wheelchair: **Accessible** — WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- :rocket: **Server-Side Rendering** — Fast initial load with Nuxt 4 SSR
- :test_tube: **Fully Tested** — Unit tests (Vitest) and E2E tests (Playwright)
- :gear: **CI/CD** — Automated testing, linting, and deployment via GitHub Actions

## Tech Stack

| Technology                                            | Version     | Purpose                        |
| ----------------------------------------------------- | ----------- | ------------------------------ |
| [Nuxt](https://nuxt.com)                              | 4.3         | Full-stack Vue framework (SSR) |
| [Vue](https://vuejs.org)                              | 3.5.27      | Reactive UI framework          |
| [TypeScript](https://www.typescriptlang.org)          | Strict mode | Type safety                    |
| [Bun](https://bun.sh)                                 | 1.3.8       | Package manager & runtime      |
| [NuxtUI](https://ui.nuxt.com)                         | 4.4+        | Design system (Tailwind-based) |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org)   | —           | Dark mode with SSR             |
| [Vitest](https://vitest.dev)                          | 4.0+        | Unit testing                   |
| [Playwright](https://playwright.dev)                  | 1.58+       | E2E testing                    |
| [ESLint](https://eslint.org)                          | 9.39+       | Linting                        |
| [Prettier](https://prettier.io)                       | 3.8+        | Code formatting                |
| [Husky](https://typicode.github.io/husky)             | 9.1+        | Git hooks                      |
| [GitHub Actions](https://github.com/features/actions) | —           | CI/CD pipeline                 |
| [Vercel](https://vercel.com)                          | —           | Hosting (SSR + Edge CDN)       |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 24.0.0
- [Bun](https://bun.sh) >= 1.3.8

### Installation

```bash
# Clone the repository
git clone https://github.com/mathieumaf/what-is-my-ip.git
cd what-is-my-ip

# Install dependencies
bun install
```

### Environment Setup

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and configure the following variables:

| Variable               | Description                                                    | Default                                  |
| ---------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| `NUXT_PUBLIC_SITE_URL` | Public URL of your deployed site (used for SEO and Open Graph) | `https://your-production-url.vercel.app` |

For local development, set:

```env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Start Development Server

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command                      | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `bun run dev`                | Start development server on http://localhost:3000 |
| `bun run build`              | Build for production                              |
| `bun run preview`            | Preview production build locally                  |
| `bun run lint`               | Run ESLint                                        |
| `bun run lint:fix`           | Run ESLint with auto-fix                          |
| `bun run format`             | Format code with Prettier                         |
| `bun run format:check`       | Check formatting without modifying                |
| `bun run test:unit`          | Run unit tests                                    |
| `bun run test:unit:watch`    | Run unit tests in watch mode                      |
| `bun run test:unit:coverage` | Run unit tests with coverage report               |
| `bun run test:e2e`           | Run E2E tests (Playwright)                        |
| `bun run typecheck`          | TypeScript type checking                          |
| `bun run analyze:bundle`     | Analyze bundle sizes                              |

## Contributing

Contributions are welcome! A detailed contributing guide is coming soon.

<!-- TODO: Link to CONTRIBUTING.md once created -->

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub:** [mathieumaf](https://github.com/mathieumaf)
