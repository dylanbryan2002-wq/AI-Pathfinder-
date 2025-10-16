# AI Pathfinder - Complete Product Requirements Document

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Authentication & Onboarding](#authentication--onboarding)
4. [Main Chat Interface](#main-chat-interface)
5. [Voice Mode](#voice-mode)
6. [Career Matching System](#career-matching-system)
7. [Career Recommendations](#career-recommendations)
8. [Career Detail Page](#career-detail-page)
9. [Job Listings](#job-listings)
10. [Job Detail Page](#job-detail-page)
11. [Home Page - Explore Mode](#home-page---explore-mode)
12. [Career Exploration Resources](#career-exploration-resources)
13. [Home Page - Committed Mode](#home-page---committed-mode)
14. [Career Tools](#career-tools)
15. [Profile Page](#profile-page)
16. [Settings](#settings)
17. [Data Sources & APIs](#data-sources--apis)

---

## Overview

**AI Pathfinder** is an AI-powered career advisor platform that helps users discover, explore, and commit to career paths through personalized guidance, psychometric analysis, and actionable resources.

**Target Users:**
- High school students
- College students
- Working professionals
- Job seekers

---

## Tech Stack

### AI & Voice
- **OpenAI** - Chat responses and career advisor system (needs career advisor prompt engineering)
- **AssemblyAI** - Speech recognition
- **Rime** - Text-to-speech
- **LiveKit** - Real-time communication for voice mode

### Platform
- Web application
- Mobile-responsive design

---

## Authentication & Onboarding

### Login/Signup
- Full authentication system needed (email/password, OAuth options TBD)
- User accounts required

### Onboarding Questions
After login, users answer:
1. **Status:** Are you in high school, college, working, or looking for a job?
2. **Career Decision:** Have you already decided on a career path?
   - If yes → "What is it?" (text input)
3. **Name:** What's your name?

### Post-Onboarding
- First screen after onboarding is the **Main Chat Interface**
- Subsequent logins go directly to Main Chat (or last active page)

---

## Main Chat Interface

### Layout
- **Header:** "ai-pathfinder" branding with green/blue gradient
- **Top Left:** Three-line hamburger menu → Opens chat history/previous conversations
- **Top Right:** Bookmark icon → Saved jobs/careers page
- **Chat Area:** Conversation bubbles (AI and user messages)
- **Bottom Input:**
  - "+" button (left) → Upload files/attachments
  - Text input: "Ask me anything..."
  - Microphone icon (bottom right)
  - Audio/voice toggle icon (black, bottom right) → Activates voice mode

### Personalization
- AI greets user by name (from onboarding)
- Initial message: "Hi [Name], My name is Ai pathfinder. Think of me like your personal career advisor. What are the different ways I can help you today?"

### File Uploads
- **Accepted formats:** All formats ChatGPT accepts (PDF, DOCX, images, code files, etc.)
- **AI behavior:** Analyzes uploaded files in conversation context
- Used for resume analysis, document review, etc.

### Chat Behavior
- **AI System Prompt:** Career advisor personality (built into app)
- **Conversation persistence:** All conversations saved and accessible
- **Chat history:** Accessible via hamburger menu (top left)
- **Context retention:** AI remembers previous conversations

### Navigation
- Bottom navigation bar (4 icons):
  1. **Home** (house icon) → Main chat/current active page
  2. **Center button** (glowing green circle) → Indicates current page
  3. **Briefcase** → Jobs page
  4. **Profile** → Profile page
- Chat persists when navigating away and returning

---

## Voice Mode

### Activation
- Click black audio icon (bottom right next to microphone)
- Button toggles voice mode on/off

### UI Changes
- Green animated blob appears in center (where center nav button was)
- Blob pulses/animates in rhythm with speech (both user and AI)
- Blue button with 3 dots appears when someone is talking

### Voice Behavior
- **Always listening** (not tap-to-talk)
- **Users can still type** messages while in voice mode
- **Real-time transcription:** Both user speech and AI speech transcribed to text in chat bubbles
- **Interruptions allowed:** User can interrupt AI mid-speech
- **Audio output:** Plays through speaker by default

### Voice Across Screens
- **Background operation:** Voice conversation continues when navigating to other screens
- **Visibility:** AI responses visible/audible on other screens
- **Green blob:** Only appears on main chat screen (not on other screens)

### Exiting Voice Mode
- Click the audio icon again to toggle off
- Returns to standard text interface

---

## Career Matching System

### Matching Algorithm (MVP)
**AI Conversation Analysis** based on:
- Skills
- Goals
- Personality
- Values
- Interests
- Work experience

**Future Integration:**
- Formal psychometric assessments (method TBD)

### Match Factors
AI analyzes user conversations to extract:
- Current skills and competencies
- Career goals and aspirations
- Personality traits
- Personal values
- Areas of interest
- Work experience and history
- Financial situation (income, debt)
- Location preferences

### Real-Time Updates
- Recommendations update **live** as user continues chatting
- Match quality improves with more conversation data
- If AI has limited info, matches will be weaker initially

---

## Career Recommendations

### Page Layout
**Header:**
- PF logo (left) - No click action (just branding)
- "pathfinder" text (center)
- Bookmark icon (right) → Saved jobs/careers

**Tabs:**
- **Recommended** (active by default)
- **All Jobs**

### Recommended Tab

**Empty State:**
- Message: "Sorry no recommendations yet, have a conversation with ai pathfinder to get a recommended list of careers"

**With Recommendations:**
Each career card shows:
- **Match percentage** (e.g., "97% match") in green
- **Career title** (e.g., "Youth Development Leader")
- **Match explanation:** "The Match: [AI-generated reasoning]"
- **"Read more"** dropdown → Expands to career detail page

**Sorting:**
- Highest match percentage at top
- Updates in real-time as user chats with AI

### All Jobs Tab
- TBD (will be covered in separate screenshots)

---

## Career Detail Page

### Header Info
- **Match percentage** (e.g., "97% match")
- **Career title**
- **Match explanation:** Brief AI reasoning
- **Average salary** (e.g., "Avg. Salary: 64k")
- **Typical requirements** (e.g., "Experience working with kids")
- **Bookmark icon** (top right of card) → Save this career

### Action Buttons
Two primary buttons:
1. **"Try"** (light blue)
   - Adds career to "Explore list" on home page
   - Button changes to "Added" with person/checkmark icon when clicked
   - Toggle-able (click again to remove)
   - Users can have **multiple careers** in "Try" state

2. **"Commit"** (dark blue)
   - Adds career to "Plan of action" on home page
   - Button changes to "Committed" with chart icon when clicked
   - Toggle-able (click again to un-commit)
   - Users can only have **ONE career** in "Commit" state at a time
   - If user tries to commit to second career, commit button disappears

**Button Switching:**
- Users can go directly from "Added" (Try) → "Committed"

### Match Analysis Section
**Title:** "See how you match in these different areas"

**6 Clickable Buttons:**
1. Interest
2. Goals
3. Skills
4. Location
5. Personality
6. Values

**Behavior:**
- Clicking any button opens an **AI chat overlay** (not main chatbox)
- Overlay slides up from bottom
- **Swipe down** or **pull down** to close overlay (add visual indicator line at top)
- AI explains how user matches in that specific area
- User can ask questions and interact
- **Single overlay at a time** (can't have multiple open)
- **Conversation not saved** for user to revisit, but AI remembers context
- Works in **voice mode** too

**Location Example:**
"Since you want to live in [locations], this could be a great job for you as there are [X] jobs in [places]"

### A Day in the Life
**Content:**
- "Here's what a day in the life can look like as a [career]"
- Bulleted list of daily responsibilities
- "Read more" button → Expands content

**Interaction:**
- Clicking section opens **AI chatbox overlay**
- User can ask questions about daily responsibilities
- Voice mode compatible
- Same overlay behavior as match analysis buttons

### Salary Curve
**Display:**
- Bell curve showing salary distribution
- X-axis: Income levels (30k, 40k, 50k, 60k, 70k, 80k, 90k+) in thousands
- Y-axis: Frequency/distribution
- Blue dots on curve are **clickable**
- Note: "*In Thousands"
- Caption: "*Click on the curve to explore what factors lead to that income level"

**Interaction:**
- Clicking blue dots opens **same AI chatbox overlay**
- AI explains factors leading to different income levels:
  - Education level
  - Years of experience
  - Location
  - Certifications
- User can respond and ask questions

### Navigation
- **Back:** Swipe down gesture
- Visual indicator line at top of page for swipe hint

---

## Job Listings

### Page Layout
**Header:**
- PF logo (left)
- "pathfinder" text (center)
- Bookmark icon (right) → Saved jobs

**Tabs:**
- **Recommended** (careers/career paths)
- **All Jobs** (live job postings) ← Active tab

### Search & Filters
**Search Bar:**
- "Search" placeholder
- Search by job title or company name

**Filter Button:**
- Slider icon (left of search filters)
- Opens additional filtering options

**Filter Dropdowns:**
- Job Type
- Location
- Committed
- (Additional filters appear via slider icon)

**Filter Icon (Slider) Options:**
- Salary range
- Internships
- Remote/Hybrid/Onsite
- Experience level (Entry-level, Mid-level, Senior)
- Company size (Startup, Small, Medium, Large, Enterprise)
- Industry/Sector (Tech, Healthcare, Education, etc.)
- Job posted date (Last 24 hours, Last week, Last month)
- Employment type (Full-time, Part-time, Contract, Temporary)
- Education required (High School, Associate's, Bachelor's, Master's+)

**Active Filters:**
- Selected filters show as **darker grey** (visual indicator)

### Job Listings

**Default Sort:**
- Best match quality (AI-powered ranking based on user profile)

**Alternative Sort:**
- Most recent (available in filter options)

**Job Card Format:**
Each listing shows:
- **Company logo** (left)
- **Company name** (below logo)
- **Job title**
- **Location** (city, state)
- **Posted date** (e.g., "4 days ago")
- **Salary range** (e.g., "$65,000 - $70,000/year")

**Examples shown:**
- perplexity - Event Organizer, San Francisco, CA
- IMG - Special Event Organizer, Bradenton, FL
- Nike - Special Event Organizer, New York, NY

### Data Sources
**All previously mentioned APIs:**
- Adzuna
- Indeed
- LinkedIn
- O*NET
- BLS
- CareerOneStop
- Others from data architecture

### Update Frequency
- **Real-time** job listing updates

### Interaction
- Clicking job card → Opens job detail page

---

## Job Detail Page

### Header Info
- **Company logo** (e.g., IMG Academy)
- **Job title** (e.g., "Special Event Organizer")
- **Location** (e.g., "Bradenton, FL")
- **Posted date** (e.g., "1 day ago")
- **Salary range** (e.g., "$65,000 - $70,000/year")

### Action Buttons
Positioned **right under salary** and **above Position Overview:**

1. **Apply Button**
   - Redirects to external job application site
   - Opens company's application page

2. **AI Match Analysis Button** (next to Apply button)
   - AI assessment comparing job to user's profile
   - TBD: Specific implementation

### Job Content (Scrollable)

**Content is copied directly from job source:**
- Position Overview
- Key Responsibilities (bulleted)
- Qualifications (bulleted)
- Benefits
- Company culture
- Application deadline
- Other standard job posting sections

**No editing** - just display copied content

### Bookmark Feature
- **Bookmark icon** (top right)
- Saves job to user's saved list
- **Visual feedback:** Icon fills in/changes color when saved

### AI Chatbox
- **Interactive AI chat overlay** available
- User can ask questions about this specific job posting
- Same overlay UI as other chatboxes

### Navigation
- **Back:** Swipe down to return to job list
- Visual indicator line at top

---

## Home Page - Explore Mode

### When This Appears
- User has clicked "Try" on one or more careers
- User has NOT committed to a career yet

### Layout

**Header:**
- "Your Explore list" with exploration icon
- **"Try them out!"** headline
- "Click on anyone to explore" subtext

**Career List:**
Vertical list of clickable cards with career names:
- Youth Development Leader
- Highschool Teacher
- Program Director
- Engagement Manager
- (More if user added more)

**Visual:**
- Large illustration at bottom (person with magnifying glass)
- Represents exploration/discovery theme

**Navigation:**
- Home icon is **filled/active** (current page)

### Behavior
- **Scrollable** if user has many careers in explore list
- **No limit** on how many careers can be added to explore

### Empty State
- If user hasn't added any careers to "Try":
  - Prompt to go explore careers
  - Encourage user to browse recommendations

### Removing Careers
- User can remove careers by going back to career detail page and clicking "Added" button again
- Careers disappear from explore list when un-selected

---

## Career Exploration Resources

### When This Appears
- User clicks on a career from their Explore List

### Page Layout

**Header:**
- Career title (e.g., "Youth Development Leader")
- **"Commit!" button** (gradient green to blue with chart icon)
  - Clicking takes user to Committed home page layout
  - Career stays accessible but page layout changes
  - User can only go back by clicking "Uncommit" (location TBD)
- "Explore through these resources" subtext

### 7 Exploration Methods

**1. Simulator**
- **Icon:** Person at computer/VR headset
- **Availability:** Only shows if simulator resources available for this career
- **If NOT available:** Option is hidden from page
- **MVP:** Shows "Not in use yet" message when clicked (placeholder)
- **Future:** VR mode + integrations with simulator companies:
  - Owlchemy Labs (Job Simulator VR)
  - Alelo (AI conversation/soft skills)
  - ETU (scenario-based learning)
  - CAE, FlightSafety, Frasca (aviation)
  - Laerdal, Simulab, Gaumard (medical)
  - Loft Dynamics (VR aviation)
  - Interpretive Simulations (business/management)
  - ABB, Andritz, Siemens, Yokogawa, Corys TESS (industrial)

**2. Local Experts**
- **Icon:** Person with star badge
- **Behavior:** AI recommends local professionals based on:
  - User's location
  - Career type
- **Clicking opens:**
  - List of local experts with profiles
  - Contact info
  - AI-facilitated introduction/messaging (chatbox)
  - NOT direct booking/scheduling

**3. Online Experts**
- **Icon:** Person on computer screen
- **Difference from Local:** Not location-based
- **AI recommends based on:**
  - Valuable information about specific career
  - Actually work in that career field
- **Clicking opens:**
  - List of top experts
  - Clickable profiles showing different ways to access them/their work
  - Contact info
  - AI-facilitated messaging (chatbox)

**4. Articles**
- **Icon:** Stack of papers/documents
- **Behavior:** Opens new page with list of external article links
- **Content:** AI-curated based on user's level and interests

**5. Blogs**
- **Icon:** Computer with notepad
- **Behavior:** Opens new page with list of external blog links
- **Content:** AI-curated based on user's level and interests

**6. Videos**
- **Icon:** Play button
- **Behavior:** Opens new page with list of external video links
- **Content:** AI-curated based on user's level and interests

**7. Try on your own**
- **Icon:** Person walking through doorway
- **Behavior:** Opens AI chatbox overlay
- **Content:** AI provides suggestions for how user can try job activities in daily life
- User can respond and interact with suggestions

### Commit Button Behavior
- Takes user to "Committed" home page layout
- Career remains accessible (doesn't disappear)
- Other explore careers disappear temporarily
- If user clicks "Uncommit" later, other explore careers reappear
- User locked into committed career path view until uncommit

---

## Home Page - Committed Mode

### When This Appears
- User has clicked "Commit" on a career
- Replaces Explore mode layout

### Layout

**Header:**
- **"You're set on becoming a [Career Title]!"**
- "Here's your next steps towards making this a reality"

### Personalized Action Steps

**AI-Generated Steps (5 example steps shown):**
Each step is clickable and numbered:

1. **Step 1** - Pay off debt
2. **Step 2** - Earn your CTDS certificate
3. **Step 3** - Network with youth leaders
4. **Step 4** - Apply! Use the tools :)
5. **Step 5** - Use creative "Side Door" approaches

**Step Completion Tracking:**
- **Checkbox or toggle** on each step card
- User can mark steps as complete
- **Progress indicator** showing X/5 steps completed
- Provides motivation and visibility
- AI uses completion status for better guidance context

**Personalization:**
- Steps generated based on user's:
  - Current situation
  - Skills
  - Education
  - Experience
  - Location
  - Financial situation
  - Career goals
- Steps **update/change** as user progresses or provides more info

### Tools Section

**Title:** "Tools to help you land this role"

**3 Tool Cards:**

1. **Tailored Resume**
   - Icon: Document with checkmark
   - Opens resume builder tool

2. **Tailored Mock Interview**
   - Icon: Two people interviewing
   - Opens mock interview mode

3. **Strategy session with AI**
   - Icon: Chess piece
   - Opens strategy mode

### Navigation
- Home icon is **filled/active** (current page)
- Uncommit button location: TBD

---

## Step Detail Pages

### Access
- Click any step from Committed home page

### Layout

**Header:**
- Maintains committed career headline
- Shows step number and title (e.g., "Step 1 - Pay off Debt")

**Navigation:**
- **Back arrow** (top left) → Returns to steps list
- **Next arrow** (top right) → Jumps to next step

### Content Structure

**AI-Generated Personalized Guidance:**
Each step follows similar format with sections like:
- Why this step matters
- How to accomplish it
- Specific strategies/approaches
- Resources and links
- Action items (if AI deems helpful)

### Example: Step 1 - Pay off Debt

**Sections:**
- "Here's why paying off your debt is a great first step"
- Bulleted benefits (personalized to user):
  - Pay for certification needed
  - Current job can pay off debt in X months
  - Accept lower-paying jobs with growth opportunities
  - Make big moves (relocate) without financial constraints
  - Negotiate confidently
  - Extra money for networking events

**AI knows:** User's income, debt amount, current job (from conversation)

### Example: Step 2 - Earn CTDS Certificate

**Sections:**
- Why get this certification?
- Here's the quickest way
- What you'll learn (bulleted)
- Certification details (duration, cost, format)
- Use these resources to pass (clickable links)

**Example content:**
- Duration: 4-8 weeks
- Cost: $600
- Format: Online
- Resources: Intro videos, articles (clickable)

### Example: Step 3 - Network with Youth Leaders

**Sections:**
- Why network?
- Why you're in a great position
- Where to network (location-specific events)
- How to sell yourself

**Location-Aware Content:**
- **Real upcoming events** in user's area with:
  - Event name (clickable link)
  - Venue
  - Date
- Example: "Youth Symposium, Austin Central Library, Feb 22-23, 2025"

### Example: Step 4 - Apply!

**Sections:**
- Tips when applying
- How to use the resume tool
- Cover letters (+ icon in chat for "Cover letter mode")
- Apply side door approaches
- Resources to check out

### Example: Step 5 - Side Door Approaches

**Sections:**
- What are side door approaches?
- Why use them?
- Different approaches:
  - Contribute before you're hired
  - Connect authentically
  - Be visible in the right spaces
- Featured resources (clickable links)

### Chat Overlay

**Bottom of each step page:**
- **AI chatbox overlay** (same as other overlays)
- User can ask questions about this specific step
- **Context-aware** but allows off-topic
- AI tries to keep conversation on-topic for the step
- Same overlay UI pattern

### Action Items & Links

**Dynamic Content:**
- AI includes relevant tools/calculators/links when helpful
- Specific to user's situation
- External resources when appropriate

---

## Career Tools

These tools are accessible from the Committed home page "Tools" section.

---

## Tool 1: Tailored Resume

### Page Layout

**Header:**
"Make your tailored resume"

### Upload Resume Section

**Two upload options:**
1. **Choose from Library** (document icon)
   - Select existing file from device
   - Accepted formats: PDF, DOCX, TXT, images

2. **Take a picture** (camera icon)
   - Snap photo of resume
   - Uses OCR to extract text
   - ⚠️ OCR optional for MVP (can launch without)

### Link to Job Description

**Text input field:**
- Placeholder: "Paste the link to the job position here..."
- Works with any job site (Indeed, LinkedIn, company websites)
- **Alternative option:** Manual job description paste (not just links)

### Action Button

**"Tailor Resume" button:**
- Large button at bottom
- Triggers AI to analyze resume + job description
- Creates tailored version optimized for that specific job

### After Clicking "Tailor Resume"

**Loading:**
- Loading screen: TBD

**Results Page:**
- **Before/After comparison** displayed
- Original resume on one side
- Tailored resume on other side
- **Editable after version** (like Word doc)
  - User can make changes
  - Full text editing capabilities

**Save Options:**
- Button below tailored resume
- **Export formats:**
  - PDF
  - Picture/Image
  - JPG

### Resume Storage

**Manual Save:**
- User must **manually save** each tailored resume
- NOT auto-saved after generation

**Resume Library:**
- App stores multiple resume versions
- Saved resumes managed in **Profile Settings**
- User can view, download, or delete saved resumes

---

## Tool 2: Tailored Mock Interview

### Access
- Click "Tailored Mock Interview" from Tools section
- Takes user to main AI chat page

### Opening Sequence

**AI's Initial Messages:**
1. "Hi [Name], welcome to mock mode where I'm going to interview you"
2. "To make the interview as close to the real thing as possible, please send me the link to the job description and I'll ask questions that they will most likely ask"

**User Input:**
- User pastes job link or job description
- Can be any job site URL

### Mode Selection

**AI asks user to choose:**
- **Practice Mode** OR **Real Mode**

**AI explains difference:**
- **Practice Mode:**
  - Can restart/redo questions
  - Lower pressure environment
  - Good for building confidence

- **Real Mode:**
  - No redos allowed
  - Simulates real interview pressure
  - More realistic experience

### Voice Mode Recommendation

**AI behavior:**
- **Heavily suggests** using voice mode for realism
- Explains benefits of voice-based interview practice
- User can still choose text if preferred

### Interview Flow

**Start:**
- AI waits for user confirmation they're ready
- User can say "I'm ready" or similar

**Question Format:**
- AI asks one question at a time
- Waits for user's complete answer
- Realistic pacing (like real interview)

**Interview Length:**
- **Full interview:** 10-15 questions (typical interview length)
- User can stop anytime by saying "stop" or "I'm done"

**Multiple Jobs:**
- User can do mock interviews for different jobs in same session
- AI remembers which job they're practicing for (tracks context)

### Post-Interview Feedback

**After interview completion, AI provides:**
- ✅ **Overall performance feedback**
- ✅ **Specific answer improvements** (question by question)
- ❌ **NO numerical score** (qualitative feedback only)
- ✅ **Full transcript** of the interview

**Feedback format:**
- Conversational AI analysis
- Constructive suggestions
- Highlighting strengths and areas for improvement

### Exiting Mock Mode

**How to exit:**
- User tells AI (text or voice): "Exit mock mode", "I'm done", etc.
- AI confirms and exits mode

**Conversation Storage:**
- Mock interview stays in **same chat history** (not separate)
- Can be reviewed later in chat history

---

## Tool 3: Strategy Session with AI

### Access
- Click "Strategy session with AI" from Tools section
- Takes user to main AI chat page

### Opening Message

**AI greeting:**
"Hi [Name], welcome to strategy mode where we're going to come up with some creative ideas to get this Job"

### Job Specification

**AI requests:**
- User to **upload/paste link to job description**
- Can be specific job posting or general career

**User provides:**
- Job link (from any site)
- OR manual job description paste

**AI analyzes:**
- Specific role requirements
- Company culture (if job posting)
- Industry context

### Strategy Generation Flow

**Step 1: AI creates comprehensive list**
- Multiple "side door" approaches
- Creative, unconventional strategies
- Tailored to specific job/career

**Step 2: Interactive discussion**
- User and AI **go through list together**
- User can ask questions about each strategy
- AI provides context and examples

**Step 3: Implementation (if user chooses)**
- If user wants to pursue a specific strategy
- AI provides **detailed action steps**
- Specific, actionable guidance
- Resources and tools needed

### Side Door Strategies Examples

**Types of strategies AI suggests:**
- **Contribute Before You're Hired**
  - Create spec work showing value
  - Build something relevant to company
  - Demonstrate skills proactively

- **Connect Authentically**
  - Build relationships before needing them
  - Engage with decision makers genuinely
  - Add value to their network first

- **Be Visible in the Right Spaces**
  - Share learning journey publicly
  - Engage in relevant communities
  - Build reputation in field

- **Creative Outreach**
  - Unique ways to stand out
  - Personalized approaches
  - Leveraging networks creatively

- **Volunteer/Freelance to Foot in Door**
  - Low-commitment ways to prove value
  - Building portfolio of work
  - Transitioning to full role

**Customization:**
- Strategies tailored to:
  - User's current situation
  - Target role requirements
  - Industry norms
  - User's strengths

### Exiting Strategy Mode

**How to exit:**
- User tells AI: "Exit strategy mode", "I'm done", etc.
- Can exit anytime

**Conversation Storage:**
- Strategy session stays in **same chat history**
- Can reference later

---

## Profile Page

### Header
- User's name (e.g., "Dylan Bryan")
- **Hamburger menu** (three lines, top right) → Settings

### Progress Slider

**Section Title:**
"Moving away from..." | "Moving towards..."

**Visual:**
- Horizontal slider bar
- Red (left) to green (right) gradient
- Draggable white circle handle

**Current Quote Displayed:**
- Example: "My Toxic Work Environment"
- Based on AI-gathered information from conversations

**Slider Behavior:**
- User can **drag slider** left or right
- **3-9 different quotes** appear as user moves slider
- Number of quotes depends on how much info AI has gathered
- Personalized to user's career journey

**Quote Types Examples:**
- Things moving away from (red side): toxic environments, limiting beliefs, unfulfilling work
- Things moving towards (green side): dream career, better work-life balance, meaningful impact

### Your Career Highlights

**Large clickable card** (green-to-blue gradient)

**Behavior:**
- Clicking opens new page
- Shows **AI's top 5 favorite accomplishments**
- Based on what AI learned from conversations

**Content shown:**
- List of 5 work accomplishments
- What each accomplishment says about user as:
  - Person
  - Worker
  - Professional
- AI's analysis of patterns and strengths

### Learn About You're

**Section Title:** "Learn about you're" (sic - as shown in design)

**6 Psychometric Cards** (colorful gradients):

1. **Personality** (red-purple gradient)
2. **Skills** (teal-yellow gradient)
3. **Goals** (light blue-green gradient)
4. **Values** (purple-teal gradient)
5. **Interest** (blue-purple gradient)
6. **Beliefs** (yellow-pink gradient)

**Each card is clickable**

### Psychometric Detail Pages

**When user clicks any psychometric card:**

**Content shown:**
- **Psychometric ratings** for that specific area
- Scores, assessments, or descriptive analysis
- Based on AI's analysis of conversations
- Future: Formal psychometric test results

**Purpose:**
- Self-awareness
- Understanding strengths/weaknesses
- Career alignment insights

**Interaction:**
- **Chatbox below** the psychometric content
- User can ask questions
- Discuss and explore the analysis
- Get AI guidance on how to leverage or develop areas

**Examples:**

**Personality:**
- Big Five traits analysis
- MBTI-style insights
- How personality fits career

**Skills:**
- Technical skills assessment
- Soft skills evaluation
- Skill gaps for target career

**Goals:**
- Short-term career goals
- Long-term aspirations
- Goal alignment with path

**Values:**
- Work values (autonomy, impact, security)
- Personal values alignment
- Values-career fit

**Interest:**
- RIASEC codes
- Interest areas
- How interests match careers

**Beliefs:**
- Limiting beliefs identified
- Empowering beliefs
- Mindset for career success

---

## Settings

Accessed via **hamburger menu** (three lines) in top right of Profile page.

### Account & Profile
- Edit profile (name, email, password)
- Profile photo upload/change
- Delete account option

### Resume Management
- View all saved resumes
- Download previous tailored versions
- Rename resumes
- Delete resumes
- Organize resume library

### Conversation History
- View past AI conversations
- Search through chat history
- Filter by date or topic
- Delete individual conversations
- Clear all history option

### Career Preferences
- Update onboarding answers:
  - Education level
  - Current status (high school, college, working, job seeking)
  - Location preferences
  - Career interests
- Change committed career
- Manage explore list:
  - View all careers in "Try" state
  - Remove careers from explore list
  - Reorder priority

### Data & Privacy
- Export your data (download all user data)
- Privacy settings
- Data usage preferences
- Control what AI remembers
- Clear conversation data

### Notifications
- Job alerts (new relevant postings)
- New career recommendations
- Event reminders (networking events, conferences)
- App updates
- Push notification preferences
- Email notification preferences

### App Settings
- Voice preferences:
  - Voice speed
  - Voice accent/type
  - Audio quality
- Theme/appearance:
  - Light/dark mode
  - Color schemes
  - Font size
- Language selection

### Help & Support
- FAQs (frequently asked questions)
- Contact support
- Report a bug
- Feature requests
- Tutorial/onboarding replay
- In-app guides

### About
- App version number
- Terms of service
- Privacy policy
- Licenses
- Credits

---

## Data Sources & APIs

### Career & Job Market Data (Core Layer)

**O*NET API** (Primary source)
- Job traits, interests, abilities
- Required skills
- Work styles
- RIASEC mapping

**Bureau of Labor Statistics (BLS)**
- Salary ranges
- Job outlook and growth projections
- Employment data
- Industry statistics

**CareerOneStop API**
- Training paths
- Required certifications
- Educational programs

**Adzuna API**
- Real-time job postings
- Job titles
- Salary data
- Lightweight integration

**Future integrations:**
- Indeed API
- LinkedIn Jobs API
- Janzz.technology (advanced matching)

**Goal:** Ground recommendation engine in factual job structure and real-time openings

### Psychometric & Personality Data

**O*NET Work Styles & Interests**
- Built-in RIASEC mapping
- Work style preferences

**RIASEC / Holland Codes Dataset**
- Connects personality to job families
- Six personality types (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)

**IPIP-NEO / Big Five Dataset**
- Open psychometric data
- Personality scoring (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)

**MBTI or 16Personalities Mapping Tables**
- Optional for user familiarity
- Popular personality framework

**Future:**
- Custom Pathfinder psychometric embedding
- Trained on collected user data

**Goal:** Represent user personality and interests as numerical vectors comparable to job vectors

### Education & Skill Development Data

**Coursera API**
- Online courses
- Skills mapping
- Certificates

**edX API**
- Alternative education database
- University-level courses

**OpenSkills / SkillUp API**
- Free skill taxonomy
- Job alignment

**Future:**
- Google Skills Graph
- LinkedIn Learning (premium integration)

**Goal:** Recommend learning paths and certifications aligned with matched careers

### Company & Industry Insights

**Glassdoor API**
- Company culture
- Salary data
- Employee satisfaction ratings
- Interview reviews

**Crunchbase API**
- Company size
- Funding information
- Industry data
- Growth stage

**Apollo.io / Clearbit / LinkedIn APIs**
- Company insights
- Network data
- Contact information

**Goal:** Help users explore "where they'd fit" by industry and company type

### Labor Trends & Future Outlook

**World Economic Forum "Future of Jobs Report"**
- Open data
- Emerging skills
- Industry transformations

**OECD Skills for Jobs Database**
- Skill demands
- Labor market trends
- Regional insights

**U.S. Census / ACS Data (Optional)**
- Regional employment trends
- Demographic data

**Goal:** Score careers based on long-term relevance and automation resistance

### Internal Pathfinder Database (Core User Data)

**User Profiles:**
- Name, demographics
- Onboarding answers
- Goals and preferences
- Assessment history

**Assessment Results:**
- Personality scores
- Skills inventory
- Values alignment
- Interests mapping

**Career Matches:**
- Vector-based matches
- Match percentages
- Recommended careers
- Explore list
- Committed career

**Conversation History:**
- All chat transcripts
- AI context and memory
- Voice conversation transcripts

**Feedback Logs:**
- User likes/dislikes
- Career skips
- Job applications
- Ratings

**Progress Tracking:**
- Step completions
- Resume versions
- Mock interview history
- Strategy sessions

**Goal:** Internal dataset becomes Pathfinder's proprietary knowledge base and personalization engine

### Integration Architecture

**Data Flow:**
1. User → Conversation with AI
2. AI extracts: skills, goals, personality, values, interests, experience
3. AI queries multiple data sources:
   - O*NET for job characteristics
   - BLS for salary/outlook
   - Psychometric datasets for personality matching
   - Job APIs for real-time postings
4. Vector similarity matching
5. Ranked recommendations returned to user
6. Feedback loop: User actions refine future matches

**API Endpoints:**
- Each data source has dedicated service/integration
- Caching layer for performance
- Real-time updates where applicable

**Vector Embeddings:**
- User profile → numerical vector
- Job characteristics → numerical vector
- Cosine similarity for matching
- Continuous learning from user feedback

**Adaptive Recommendations:**
- Internal Pathfinder DB evolves with user interaction
- Machine learning improves over time
- Personalization strengthens with more data

---

## Additional Features & Notes

### Deferred/TBD Items

**Cover Letter Mode:**
- Accessed via + icon in AI chat
- Creates framework
- Live AI assistance
- Specific implementation: TBD

**Resume Tool Detailed Workflow:**
- Specific UI for before/after comparison
- Editing interface details
- TBD

**Side Door Approaches Detail:**
- Clicking behavior
- Resource links vs interactive content
- TBD

**Uncommit Button Location:**
- Where to place on committed home page
- Still figuring out best UX

**"Committed" Filter (All Jobs page):**
- What this filters
- Behavior: TBD

**Loading Screens:**
- Design and messaging
- Duration estimates
- TBD throughout app

### Voice Mode Additional Notes

**Technology Stack:**
- AssemblyAI: Real-time speech-to-text
- Rime: Text-to-speech synthesis
- LiveKit: WebRTC infrastructure for real-time audio
- Integration points with OpenAI for conversational AI

**Voice Quality:**
- Natural, conversational tone
- Career advisor personality
- Consistent across all modes

### Chat History Management

**Hamburger Menu (Top Left of Main Chat):**
- Opens sidebar or new page
- Shows all previous conversations
- Organized by date or topic
- Search functionality
- Delete individual chats

### Mobile Responsiveness

**Design Considerations:**
- Mobile-first approach
- Touch-friendly buttons and controls
- Swipe gestures for navigation
- Responsive text sizing
- Optimized for various screen sizes

### Accessibility

**To Consider:**
- Screen reader compatibility
- Keyboard navigation
- High contrast modes
- Text size adjustments
- Voice as primary interface option

---

## MVP Priorities

### Must-Have for MVP

1. ✅ Authentication & Onboarding
2. ✅ Main Chat Interface (text mode)
3. ✅ Career Matching (AI conversation analysis)
4. ✅ Career Recommendations page
5. ✅ Career Detail page (with Try/Commit)
6. ✅ Job Listings (All Jobs tab)
7. ✅ Job Detail page
8. ✅ Home Page - Explore Mode
9. ✅ Home Page - Committed Mode
10. ✅ Step Detail pages
11. ✅ Tailored Resume tool (basic version)
12. ✅ Profile page (basic version)
13. ✅ Settings (essential features)

### Nice-to-Have for MVP

1. ⚠️ Voice Mode (can launch without, but highly desired)
2. ⚠️ Mock Interview tool
3. ⚠️ Strategy Session tool
4. ⚠️ Career Highlights page
5. ⚠️ Psychometric detail pages
6. ⚠️ OCR for resume photo upload

### Post-MVP

1. 🔮 Simulator integrations
2. 🔮 Formal psychometric assessments
3. 🔮 VR mode
4. 🔮 Advanced analytics
5. 🔮 Community features
6. 🔮 Mentorship matching

---

## Success Metrics

**User Engagement:**
- Conversation frequency
- Voice mode adoption rate
- Time spent exploring careers
- Number of careers tried/committed

**Career Progress:**
- Step completion rates
- Resume creation/tailoring usage
- Mock interview participation
- Job applications tracked

**Matching Quality:**
- User satisfaction with recommendations
- Commit rate (% of users who commit to a career)
- Career changes (switching committed careers)

**Retention:**
- Daily/weekly active users
- Conversation return rate
- Long-term engagement (months)

---

*Document created: 2025-10-16*
*Last updated: 2025-10-16*
*Version: 1.0*
