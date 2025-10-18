# Testing Guide - Quick Reference

## 🚀 Quick Start

```bash
# 1. Start the dev server
npm run dev

# 2. Setup test data
npx ts-node setup-test-data.ts

# 3. Run pre-flight checks
npx ts-node test-authenticated-flow.ts

# 4. Open browser and test
# Go to: http://localhost:3000/login
# Login: test@aipathfinder.com / testpassword123

# 5. After matching, verify results
npx ts-node test-verify-matches.ts
```

---

## 📁 Test Files Overview

### Core Test Scripts

| File | Purpose | When to Run |
|------|---------|-------------|
| `setup-test-data.ts` | Creates test user and conversation | Before testing |
| `test-authenticated-flow.ts` | Verifies all systems working | Before manual test |
| `test-browser-simulation.ts` | Documents expected browser flow | For reference |
| `test-verify-matches.ts` | Validates matches in database | After manual test |
| `test-e2e-flow.ts` | Complete flow verification | Anytime |

### Documentation

| File | Content |
|------|---------|
| `TESTING_GUIDE.md` | Step-by-step manual testing instructions |
| `TEST_SUMMARY.md` | Testing procedures and success criteria |
| `TEST_REPORT.md` | Automated test results and status |
| `TESTING_README.md` | This quick reference (you are here) |

---

## 🎯 Test Sequence

### 1. Pre-Test Setup
```bash
# Ensure dev server is running
npm run dev

# Create/refresh test data
npx ts-node setup-test-data.ts
```

**Expected Output:**
```
✓ Test user exists
✓ Created 11 conversation messages
✓ Found 5 careers in database
```

### 2. System Verification
```bash
# Verify all systems operational
npx ts-node test-authenticated-flow.ts
```

**Expected Output:**
```
✓ User: Test User (test@aipathfinder.com)
✓ Password: Valid
✓ Login: 200
✓ Chat: 200
✓ Careers: 200
✓ Chat API working
✓ API properly requires authentication
```

### 3. Manual Browser Testing
1. **Login:** http://localhost:3000/login
   - Email: test@aipathfinder.com
   - Password: testpassword123

2. **Chat:** http://localhost:3000/chat
   - Verify 11 messages load
   - Click "Get Career Matches"
   - Wait for success message
   - Auto-redirect to careers

3. **Careers:** http://localhost:3000/careers
   - Verify matches display
   - Check match percentages
   - Test Try/Commit/Bookmark

### 4. Verify Results
```bash
# Check database matches
npx ts-node test-verify-matches.ts
```

**Expected Output:**
```
✓ Total matches: 10
🎯 Career Matches:
   1. [Career Title] - XX%
      Reason: [Match explanation]
      Breakdown: {interest, skills, values, ...}
```

---

## ✅ Success Checklist

### Automated Tests
- [ ] All pages return 200 OK
- [ ] Chat API returns message history
- [ ] Match API returns 401 without auth
- [ ] Database has test user
- [ ] Conversation has 11 messages

### Manual Tests
- [ ] Login works with test credentials
- [ ] Chat loads conversation history
- [ ] "Get Career Matches" button appears
- [ ] Button shows loading state
- [ ] Success message appears (5-10s)
- [ ] Auto-redirects to /careers
- [ ] Career matches display correctly
- [ ] Match percentages are reasonable
- [ ] Explanations are relevant
- [ ] Try/Commit/Bookmark work

### Database Verification
- [ ] 10 matches saved
- [ ] Match percentages 60-100%
- [ ] Explanations reference user traits
- [ ] Category breakdowns present
- [ ] User profile updated

---

## 🐛 Troubleshooting

### "Test user not found"
```bash
npx ts-node setup-test-data.ts
```

### "No chat history found"
Check test user has messages:
```bash
npx ts-node test-authenticated-flow.ts
```

### "401 Unauthorized" in browser
- Clear browser cookies
- Re-login at /login

### API takes too long
- Check OPENAI_API_KEY in .env
- First call may take 5-10 seconds (normal)

### Pages return 500
```bash
# Clean Next.js cache and restart
rm -rf .next
npm run dev
```

---

## 📊 Test Metrics

### Performance Targets
- Page load: <1s
- Chat history: <500ms
- Career matching: 5-10s
- Match display: <1s

### Quality Targets
- Match relevance: High (tech-focused)
- Average match: 70%+
- High matches (80%+): 3-5 careers
- Explanation quality: Personalized

---

## 📚 Additional Resources

- **Full Testing Guide:** [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **Test Summary:** [TEST_SUMMARY.md](./TEST_SUMMARY.md)
- **Test Report:** [TEST_REPORT.md](./TEST_REPORT.md)
- **API Documentation:** See `/src/app/api` routes
- **Database Schema:** `prisma/schema.prisma`

---

## 🎓 Test User Profile

**Conversation Theme:** Software Development / Tech Career

**Extracted Profile (Expected):**
- **Interests:** Technology, software development, problem-solving
- **Skills:** Python, JavaScript, web development, APIs, data analysis
- **Values:** Work-life balance, continuous learning, collaboration
- **Goals:** Technical leadership, senior engineer role, mentoring
- **Work Style:** Team collaboration, pair programming, code reviews

**Expected Top Matches:**
1. Software Developer (85%+)
2. Full Stack Engineer (85%+)
3. Technical Lead (80%+)
4. Data Engineer (75%+)
5. Backend Developer (75%+)

---

## 🔄 Continuous Testing

### Before Each Feature Addition
```bash
npx ts-node test-authenticated-flow.ts
```

### After Code Changes
```bash
# Restart server
npm run dev

# Verify core flow still works
# Run quick manual test (Steps 1-3)
```

### Before Deployment
```bash
# Full test suite
npx ts-node setup-test-data.ts
npx ts-node test-authenticated-flow.ts
# Complete manual browser test
npx ts-node test-verify-matches.ts
```

---

**Last Updated:** October 17, 2025
**Server:** http://localhost:3000
**Status:** ✅ All Systems Operational
