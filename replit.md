# Mami Koka App - Project Architecture

## Overview

Mami Koka is a comprehensive mobile application designed to empower everyday people with access to quick jobs, digital finance tools, event services, and a local marketplace. The platform serves as a bridge between informal workers, freelancers, and service providers, particularly targeting youth, women, and low-income individuals in urban and semi-urban areas.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 15, 2025)

✓ Updated navigation bar to include all main sections: Find Jobs, Post Jobs, Marketplace, Events, and Wallet
✓ Created comprehensive post job page with form validation using React Hook Form and Zod
✓ Added sidebar component with user information, quick actions, notifications, and stats
✓ Implemented sidebar layout with user profile display showing balance, completed jobs, and rating
✓ Enhanced app layout with sidebar navigation for better user experience
✓ Fixed missing form components (textarea, form) required for post job functionality

## System Architecture

### Full-Stack Architecture
The application follows a modern full-stack architecture with:
- **Frontend**: React with TypeScript using Vite for fast development and build processes
- **Backend**: Node.js with Express.js for API endpoints and server-side logic
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui components for consistent, modern UI
- **State Management**: TanStack Query for server state management and caching

### Directory Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-based page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions and constants
├── server/               # Backend Express.js application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database abstraction layer
│   └── vite.ts           # Development server configuration
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and validation
└── migrations/           # Database migration files
```

## Key Components

### Frontend Components
- **Navigation**: Responsive navbar with user authentication state
- **Job System**: Job cards, application forms, and job management
- **Marketplace**: Item listings, seller contact, and category filtering
- **Events**: Event discovery, ticket purchasing, and event management
- **Wallet**: Mobile money integration, balance management, and transaction history
- **Profile**: User profiles with verification badges and rating systems

### Backend Architecture
- **Express.js Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: Abstract interface for database operations with concrete implementations
- **Authentication**: User registration and login with password-based authentication
- **Route Handlers**: Organized API endpoints for all major features

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Users**: User profiles with wallet balances, ratings, and verification status
- **Jobs**: Job postings with categories, locations, and status tracking
- **Job Applications**: Application tracking between users and jobs
- **Marketplace Items**: Second-hand goods with images, conditions, and pricing
- **Events**: Event listings with ticketing and venue information
- **Reviews**: User rating and review system
- **Notifications**: In-app notification system

## Data Flow

### Request Flow
1. Client makes HTTP requests to `/api/*` endpoints
2. Express middleware handles logging and error processing
3. Route handlers validate input using Zod schemas
4. Storage layer abstracts database operations
5. Drizzle ORM manages PostgreSQL interactions
6. Responses are formatted and sent back to client

### State Management
- **TanStack Query**: Handles server state, caching, and data synchronization
- **React State**: Local component state for UI interactions
- **Form Handling**: React Hook Form with Zod validation

## External Dependencies

### Core Technologies
- **React 18** with TypeScript for type-safe frontend development
- **Express.js** for backend API server
- **PostgreSQL** with Drizzle ORM for database operations
- **Vite** for fast development and optimized builds

### UI Framework
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components based on Radix UI primitives
- **Lucide React** for consistent iconography

### Database and Validation
- **Drizzle ORM** for type-safe database queries
- **Zod** for runtime type validation and schema generation
- **@neondatabase/serverless** for serverless PostgreSQL connections

### Mobile Money Integration
- Support for multiple providers (Orange Money, MTN MoMo, Africell Money)
- Bank transfer capabilities for financial transactions

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for rapid development
- **TypeScript**: Compile-time type checking across the entire stack
- **ESBuild**: Fast bundling for production builds

### Production Build
- **Client Build**: Vite builds optimized static assets to `dist/public`
- **Server Build**: ESBuild bundles server code with external dependencies
- **Database Migrations**: Drizzle Kit manages schema changes

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string for Drizzle
- **NODE_ENV**: Environment-specific configuration
- **Replit Integration**: Special handling for Replit development environment

The architecture prioritizes developer experience with TypeScript throughout, modern tooling, and a clear separation between client and server concerns while maintaining shared validation schemas for consistency.