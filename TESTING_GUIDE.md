# AI Pathfinder - Testing Guide

## 🎯 End-to-End Career Matching Flow

This guide walks you through testing the complete career matching feature.

---

## Prerequisites

✅ Dev server running: `npm run dev` (http://localhost:3000)
✅ Test data seeded: `npx ts-node setup-test-data.ts`
✅ Database populated with jobs: Already done (3,206 jobs)

---

## Test Flow Overview

```
Login → Chat → Get Matches → View Careers → Explore Details
```

---

## Step-by-Step Testing

### 1️⃣ Login to Test Account

**URL:** http://localhost:3000/login

**Credentials:**
- Email: `test@aipathfinder.com`
- Password: `testpassword123`

**What to verify:**
- Login form appears
- Credentials work
- Redirects after successful login

---

### 2️⃣ Navigate to Chat

**URL:** http://localhost:3000/chat (or click Chat in navigation)

**What to verify:**
- ✅ Conversation history loads automatically (11 messages)
- ✅ Chat interface shows tech/software development conversation
- ✅ "Get Career Matches" button is visible at bottom
- ✅ Button only appears when user is logged in and has messages

**Sample conversation topics you should see:**
- Python and JavaScript programming
- Web applications and data analysis
- APIs and backend work
- Mentoring junior developers
- Work-life balance and continuous learning
- Technical leadership goals

---

### 3️⃣ Generate Career Matches

**Action:** Click the "Get Career Matches" button

**What happens:**
1. Button changes to "Analyzing conversation..." with spinner
2. API calls OpenAI GPT-4o to:
   - Extract user profile (interests, skills, values, goals)
   - Match against all careers in database
   - Generate match percentages and explanations
3. Success message appears in chat:
   ```
   🎉 Great news! I've analyzed our conversation and found X career matches for you!

   Your top match is "Career Name" with a XX% match!

   [Match explanation]

   Head over to the Careers page to explore all your personalized matches!
   ```
4. Auto-redirects to /careers after 3 seconds

**What to verify:**
- ✅ Loading state shows correctly
- ✅ Success message appears with match count
- ✅ Top match name and percentage displayed
- ✅ Match explanation is relevant
- ✅ Auto-redirect works after 3 seconds

---

### 4️⃣ View Career Matches

**URL:** http://localhost:3000/careers (auto-redirected here)

**What to verify:**
- ✅ "Recommended" tab shows matched careers
- ✅ Careers sorted by match percentage (highest first)
- ✅ Each career card shows:
  - Match percentage
  - Career title
  - Match explanation
  - Salary information
  - Requirements
  - "Try" and "Commit" buttons
  - Bookmark icon

**Expected matches based on test conversation:**
The AI should match careers related to:
- Software development/engineering
- Technical leadership
- Data engineering/analysis
- Backend development
- Full stack development

---

### 5️⃣ Interact with Career Cards

**Actions to test:**

**Try Button:**
- Click "Try" on a career
- Button should toggle state (shows as "tried")
- Saves to database

**Commit Button:**
- Click "Commit" on a career
- Redirects to home page
- Sets as user's committed career

**Bookmark:**
- Click bookmark icon
- Toggles bookmark state
- Saves to bookmarks collection

---

## 🔍 Database Verification

After generating matches, you can verify the data was saved:

```bash
npx ts-node test-e2e-flow.ts
```

This will show:
- User profile data extracted
- Career matches saved
- Match percentages and reasons
- Breakdown by category (interest, skills, values, etc.)

---

## 🧪 Expected API Behavior

### POST /api/match-careers

**Authentication:** Required (401 if not authenticated)

**Process:**
1. Fetches user's last 50 chat messages
2. Calls OpenAI to extract user profile:
   - Interests
   - Skills
   - Values
   - Personality traits
   - Goals
   - Work style preferences
3. Updates user record with extracted profile
4. Calls OpenAI to match against all careers
5. Saves top 10 matches to database
6. Returns matches with percentages and explanations

**Response:**
```json
{
  "message": "Career matches generated successfully",
  "profileData": {
    "interests": [...],
    "skills": [...],
    "values": [...],
    "personality": [...],
    "goals": [...]
  },
  "matches": [
    {
      "career": { "id": "...", "title": "...", ... },
      "matchPercentage": 95,
      "matchReason": "...",
      "matchData": {
        "interest": 98,
        "skills": 92,
        "values": 95,
        "personality": 94,
        "goals": 96
      }
    }
  ],
  "totalMatches": 10
}
```

---

## ⚡ Performance Notes

- **First match generation:** ~5-10 seconds (2 OpenAI API calls)
- **Subsequent views:** Instant (cached in database)
- **Re-matching:** Deletes old matches and generates new ones

---

## 🐛 Troubleshooting

### Button doesn't appear
- Check: User is logged in
- Check: At least 2 messages in conversation

### "No chat history found" error
- Run: `npx ts-node setup-test-data.ts`

### 401 Unauthorized
- Verify you're logged in
- Check session is active

### No careers showing
- Check: Careers exist in database
- Run: `npm run jobs:seed` to populate careers

### API takes too long
- Normal on first run (OpenAI API calls)
- Check OPENAI_API_KEY in .env

---

## ✅ Success Criteria

The feature is working correctly if:

1. ✅ Login works with test credentials
2. ✅ Chat loads conversation history
3. ✅ "Get Career Matches" button appears and works
4. ✅ AI generates relevant matches (check top 3 make sense)
5. ✅ Match percentages are reasonable (60-100%)
6. ✅ Explanations are coherent and relevant
7. ✅ Careers page displays matches correctly
8. ✅ Try/Commit/Bookmark actions work
9. ✅ Data persists in database

---

## 🚀 Next Steps After Testing

Once the core flow works, consider:

1. **Profile/Assessment Page** - Build interactive assessment
2. **Action Plan Feature** - Generate career roadmaps
3. **Jobs Integration** - Connect careers to real job listings
4. **UI Polish** - Improve animations and transitions
5. **Testing** - Add unit and integration tests

---

**Happy Testing! 🎉**
