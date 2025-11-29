# AI Pathfinder

Your Personal AI Career Advisor - Discover, explore, and commit to your ideal career path with personalized AI-powered guidance.

## Overview

AI Pathfinder is a comprehensive career advisory platform that helps users at all stages (high school, college, working professionals, job seekers) navigate their career journey through:

- **AI-Powered Conversations** - Natural chat interface with career advisor personality
- **Psychometric Analysis** - Match users with careers based on personality, skills, values, interests, and goals
- **Voice Mode** - Real-time voice conversations for more natural interactions
- **Career Exploration** - Try multiple careers before committing
- **Action Plans** - Personalized step-by-step guidance to achieve career goals
- **Live Job Listings** - Real-time job postings matched to user profiles
- **Career Tools** - Resume tailoring, mock interviews, and strategy sessions

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Styled Components
- **Database**: PostgreSQL + Prisma ORM
- **AI**: OpenAI API (GPT-4)
- **Voice**: AssemblyAI (speech-to-text), Rime (text-to-speech), LiveKit (real-time audio)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- API keys for:
  - OpenAI
  - AssemblyAI
  - Rime
  - LiveKit
  - O*NET (optional)
  - Job APIs (Adzuna, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aipathfinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your actual API keys and database URL.

4. **Set up the database** (coming soon)
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
aipathfinder/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   ├── lib/                    # Utility functions and configs
│   │   └── registry.tsx        # Styled Components registry
│   ├── hooks/                  # Custom React hooks
│   ├── styles/                 # Shared styles
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
│   ├── images/
│   └── icons/
├── prisma/                     # Database schema and migrations
├── AI_PATHFINDER_REQUIREMENTS.md  # Detailed product requirements
├── .env.example                # Environment variables template
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Development Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup (Next.js, TypeScript, Styled Components)
- [x] Git repository initialization
- [x] Development environment setup
- [ ] Database setup (PostgreSQL + Prisma)
- [ ] Authentication system
- [ ] Basic UI components

### Phase 2: Core Features
- [ ] Onboarding flow
- [ ] Main chat interface
- [ ] OpenAI integration
- [ ] Career matching algorithm
- [ ] Career recommendations page
- [ ] Job listings integration

### Phase 3: Advanced Features
- [ ] Voice mode (AssemblyAI + Rime + LiveKit)
- [ ] Career detail pages
- [ ] Explore vs Committed home modes
- [ ] Career tools (Resume, Mock Interview, Strategy)
- [ ] Profile and psychometrics

### Phase 4: Polish & Deploy
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Testing (unit, integration, e2e)
- [ ] Deployment to Vercel
- [ ] API integrations (O*NET, BLS, job APIs)

## Key Features Documentation

See [`AI_PATHFINDER_REQUIREMENTS.md`](./AI_PATHFINDER_REQUIREMENTS.md) for comprehensive feature specifications including:

- Detailed user flows
- UI/UX specifications
- API integration requirements
- Data architecture
- Psychometric matching system

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="postgresql://..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Voice Services
ASSEMBLYAI_API_KEY="..."
RIME_API_KEY="..."
LIVEKIT_API_KEY="..."
LIVEKIT_API_SECRET="..."

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# External APIs
ONET_API_KEY="..."
ADZUNA_APP_ID="..."
ADZUNA_API_KEY="..."
# ... etc
```

## Contributing

This is currently a private project. Contribution guidelines will be added later.

## License

Proprietary - All rights reserved

## Support

For questions or issues, please refer to the project documentation or contact the development team.

---

**Built with Next.js 15 + React 19 + TypeScript + Styled Components**
# Trigger fresh deployment
