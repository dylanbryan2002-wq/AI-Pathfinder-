import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testEndToEndFlow() {
  console.log('🧪 Testing End-to-End Career Matching Flow\n');
  console.log('='.repeat(60));

  try {
    // Step 1: Verify test user and conversation
    console.log('\n📋 Step 1: Verifying test user and conversation...');
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@aipathfinder.com' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!testUser) {
      console.log('❌ Test user not found. Run: npx ts-node setup-test-data.ts');
      return;
    }

    console.log(`✓ User: ${testUser.name} (${testUser.email})`);
    console.log(`✓ Messages: ${testUser.messages.length}`);
    console.log('\nConversation preview:');
    testUser.messages.slice(0, 3).forEach((msg, i) => {
      const preview = msg.content.substring(0, 50);
      console.log(`  ${i + 1}. ${msg.role}: ${preview}...`);
    });

    // Step 2: Check careers in database
    console.log('\n📊 Step 2: Checking careers database...');
    const careers = await prisma.career.findMany();
    console.log(`✓ Found ${careers.length} careers available for matching`);
    if (careers.length > 0) {
      careers.slice(0, 3).forEach((career, i) => {
        console.log(`  ${i + 1}. ${career.title}`);
      });
      if (careers.length > 3) {
        console.log(`  ... and ${careers.length - 3} more`);
      }
    }

    // Step 3: Check if matches already exist
    console.log('\n🎯 Step 3: Checking existing career matches...');
    const existingMatches = await prisma.careerMatch.findMany({
      where: { userId: testUser.id },
      include: { career: true },
      orderBy: { matchPercentage: 'desc' },
    });

    if (existingMatches.length > 0) {
      console.log(`✓ Found ${existingMatches.length} existing matches:`);
      existingMatches.forEach((match, i) => {
        console.log(`\n  ${i + 1}. ${match.career.title} - ${match.matchPercentage}%`);
        console.log(`     ${match.matchReason}`);
        if (match.matchData) {
          console.log(`     Breakdown:`, match.matchData);
        }
      });
    } else {
      console.log('  No existing matches found (will be created when API is called)');
    }

    // Step 4: Test the API flow
    console.log('\n🚀 Step 4: Testing API availability...');
    const response = await fetch('http://localhost:3000/api/match-careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`  API Status: ${response.status} ${response.statusText}`);

    if (response.status === 401) {
      console.log('  ✓ API is properly secured (requires authentication)');
    } else if (response.ok) {
      const data = await response.json();
      console.log(`  ✓ API returned ${data.totalMatches} matches`);
    }

    // Step 5: User flow instructions
    console.log('\n📱 Step 5: User Flow Test Instructions:');
    console.log('\n  To test the complete end-to-end flow:');
    console.log('\n  1. Open browser to http://localhost:3000/login');
    console.log('     Email: test@aipathfinder.com');
    console.log('     Password: testpassword123');
    console.log('\n  2. After login, go to http://localhost:3000/chat');
    console.log('     - You should see the conversation history loaded');
    console.log('     - The "Get Career Matches" button should be visible');
    console.log('\n  3. Click "Get Career Matches" button');
    console.log('     - Button shows "Analyzing conversation..."');
    console.log('     - AI analyzes the 11-message conversation');
    console.log('     - Success message appears with top match');
    console.log('     - Auto-redirects to /careers after 3 seconds');
    console.log('\n  4. On Careers page, you should see:');
    console.log('     - All matched careers sorted by percentage');
    console.log('     - Match descriptions for each career');
    console.log('     - "Try" and "Commit" buttons for each career');

    // Step 6: Expected results
    console.log('\n✅ Step 6: Expected Results:');
    console.log('\n  Based on the test conversation about tech/software:');
    console.log('  - Software Developer/Engineer (high match)');
    console.log('  - Technical Lead roles (matches leadership goals)');
    console.log('  - Data Analyst/Engineer (matches data interest)');
    console.log('  - Backend Developer (matches API interest)');
    console.log('  - Full Stack Developer (matches versatility)');

    console.log('\n' + '='.repeat(60));
    console.log('✅ End-to-End Test Setup Complete!\n');
    console.log('Dev server should be running on http://localhost:3000');
    console.log('Follow the User Flow Test Instructions above.\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testEndToEndFlow();
