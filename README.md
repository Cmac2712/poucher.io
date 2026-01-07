# Poucher.io

Poucher.io is a full-stack cloud application to keep all your bookmarks in one place.

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- shadcn/ui + Radix UI (component library)
- Tailwind CSS (styling)
- Lucide React (icons)
- Auth0 (authentication)

**Backend:**
- GraphQL + Apollo Server/Client
- Prisma (ORM)
- AWS Lambda, S3, CloudFront, RDS
- Serverless Framework

**Testing:**
- Vitest + React Testing Library + Cypress

## UI Design System

### Color Palette

**Brand Colors:**
- Primary Purple: `#a855f7` (HSL: 271 91% 65%)
- Full purple scale from 50-900 for variations

**Theme Support:**
- Light and dark modes with CSS variables
- Accessible color contrast ratios (WCAG compliant)
- Semantic colors: success, warning, error, info

### Components

Built with shadcn/ui and Radix UI primitives:
- **Button**: Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Flexible card layouts with header, content, footer
- **Input**: Accessible form inputs
- **Dialog**: Modal dialogs with animations
- **Badge**: Tags and status indicators
- **Skeleton**: Loading states
- **Avatar**: User profile images
- **Separator**: Content dividers

See `UI_MODERNIZATION_PLAN.md` for the complete modernization roadmap.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Deploy to AWS
npm run deploy
```

## Links

[Try Poucher.io here](https://poucher.io)

## Documentation

- [UI Modernization Plan](./UI_MODERNIZATION_PLAN.md) - Detailed plan for the shadcn/ui migration
- [UI Update Plan](./UI_UPDATE_PLAN.md) - Original comprehensive UI update strategy