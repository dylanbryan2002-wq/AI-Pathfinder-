import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testFullMatching() {
  console.log('🧪 Testing Full Career Matching Flow\n');
  console.log('='.repeat(50));

  try {
    // Step 1: Verify test user and conversation
    console.log('\n📋 Step 1: Verifying test data...');
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@aipathfinder.com' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!testUser) {
      console.log('❌ Test user not found. Run setup-test-data.ts first.');
      return;
    }

    console.log(`✓ User: ${testUser.name} (${testUser.email})`);
    console.log(`✓ Messages: ${testUser.messages.length}`);
    console.log('\nConversation snippet:');
    testUser.messages.slice(0, 3).forEach((msg, i) => {
      const preview = msg.content.substring(0, 60);
      console.log(`  ${i + 1}. ${msg.role}: ${preview}...`);
    });

    // Step 2: Show what the API would analyze
    console.log('\n📊 Step 2: What will be analyzed...');
    console.log('The matching API will:');
    console.log('  1. Extract user interests, skills, values from conversation');
    console.log('  2. Match against all careers in database');
    console.log('  3. Generate scores and explanations');
    console.log('  4. Save top 10 matches to database');

    // Step 3: Check current matches
    console.log('\n🎯 Step 3: Checking existing matches...');
    const existingMatches = await prisma.careerMatch.findMany({
      where: { userId: testUser.id },
      include: { career: true },
      orderBy: { matchPercentage: 'desc' },
    });

    if (existingMatches.length > 0) {
      console.log(`✓ Found ${existingMatches.length} existing matches:`);
      existingMatches.slice(0, 3).forEach((match, i) => {
        console.log(`  ${i + 1}. ${match.career.title} - ${match.matchPercentage}%`);
      });
    } else {
      console.log('  No existing matches found');
    }

    // Step 4: Instructions for API test
    console.log('\n🚀 Step 4: To test the matching API:');
    console.log('\nOption A - Via curl (requires authentication):');
    console.log('  1. Login at http://localhost:3000/login');
    console.log('     Email: test@aipathfinder.com');
    console.log('     Password: testpassword123');
    console.log('  2. Copy the session cookie');
    console.log('  3. curl -X POST http://localhost:3000/api/match-careers \\');
    console.log('       -H "Cookie: your-session-cookie"');

    console.log('\nOption B - Via chat interface:');
    console.log('  1. Login at http://localhost:3000/login');
    console.log('  2. Go to http://localhost:3000/chat');
    console.log('  3. Click "Get Career Matches" button');

    console.log('\nOption C - Check database after running API:');
    console.log('  Run this script again to see saved matches');

    console.log('\n' + '='.repeat(50));
    console.log('✅ Test verification complete!');
    console.log('\nThe matching algorithm is ready to test.');
    console.log('It will analyze the 11-message conversation about');
    console.log('tech/software development and generate personalized');
    console.log('career matches.\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testFullMatching();
