# Job Database Management Scripts

These scripts help you manage the job listings database for AI Pathfinder.

## Available Scripts

### 1. Seed Jobs Database
Populates the database with real job listings from Adzuna across 35+ different career categories.

```bash
npm run jobs:seed
```

**What it does:**
- Fetches 50 jobs per search category (1,500+ jobs total)
- Covers tech, healthcare, finance, education, creative, engineering, and more
- Automatically skips duplicate jobs
- Rate-limited to respect Adzuna API limits
- Shows progress and statistics

**Requirements:**
- Adzuna API credentials must be set in `.env`

**Expected output:**
```
🌱 Starting job database seeding...
Fetching: software engineer in US (page 1)...
  ✓ Saved 50 new jobs, skipped 0 duplicates
...
✅ Job seeding completed!
📊 Total jobs saved: 1592
💾 Total jobs in database: 1831
```

### 2. Cleanup Old Jobs
Removes job listings older than 30 days to keep the database fresh.

```bash
npm run jobs:cleanup
```

**What it does:**
- Finds jobs posted more than 30 days ago
- Deletes outdated listings
- Shows statistics about remaining jobs
- Displays breakdown by job type

**Expected output:**
```
🧹 Starting job cleanup...
Found 245 old jobs to remove...
✅ Successfully removed 245 old job listings
💾 Total jobs remaining in database: 1586
```

### 3. View Job Statistics
Displays current database statistics and recent jobs.

```bash
npm run jobs:stats
```

**What it does:**
- Shows total job count
- Breaks down jobs by type (Full-time, Part-time, Contract, etc.)
- Shows jobs by source (Adzuna, Manual, etc.)
- Lists 5 most recent job postings

**Expected output:**
```
📊 Job Database Statistics

Total Jobs: 1831

Jobs by Type:
  Full-time: 1764
  permanent: 35
  contract: 32

Jobs by Source:
  Adzuna: 1826
  Manual: 5
```

## Job Search Categories

The seed script fetches jobs across these categories:

**Technology (8 searches)**
- Software Engineer, Data Scientist, Web Developer
- Product Manager, UX Designer, DevOps Engineer
- Cybersecurity, Cloud Architect

**Healthcare (5 searches)**
- Registered Nurse, Physician Assistant, Medical Assistant
- Pharmacist, Physical Therapist

**Finance & Business (6 searches)**
- Financial Analyst, Accountant, Business Analyst
- Marketing Manager, Sales Representative, Human Resources

**Education (3 searches)**
- Teacher, Corporate Trainer, Instructional Designer

**Creative & Media (4 searches)**
- Graphic Designer, Content Writer, Video Editor, Social Media Manager

**Engineering (4 searches)**
- Mechanical Engineer, Electrical Engineer, Civil Engineer, Project Manager

**Service & Hospitality (2 searches)**
- Customer Service, Restaurant Manager

**Remote Jobs (3 searches)**
- Remote Software Developer, Remote Customer Support, Remote Writer

## Database Schema

Jobs are stored with these fields:
- `title` - Job title
- `company` - Company name
- `location` - Geographic location
- `type` - Employment type (Full-time, Part-time, Contract, etc.)
- `salary` - Salary range (if available)
- `description` - Full job description
- `tags` - Array of skill/category tags
- `postedAt` - Original posting date
- `sourceUrl` - Link to original job posting
- `externalId` - External API identifier
- `source` - Source name (e.g., "Adzuna")

## Indexes

The following indexes are applied for optimal search performance:
- Title (for keyword searches)
- Location (for geographic filtering)
- Type (for employment type filtering)
- Posted date (for sorting by recency)
- External ID + Source (for duplicate detection)

## Maintenance Schedule

**Recommended schedule:**
- Run `jobs:seed` weekly to refresh job listings
- Run `jobs:cleanup` monthly to remove old jobs
- Run `jobs:stats` anytime to check database health

## API Integration

The job search endpoint (`/api/jobs/search`) automatically:
- Fetches fresh jobs from Adzuna when credentials are configured
- Syncs new jobs to database on first page of results
- Falls back to database when API is unavailable
- Returns job count and average salary metadata
