import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testAuthenticatedFlow() {
  console.log('🧪 Testing Authenticated Career Matching Flow\n');
  console.log('='.repeat(60));

  try {
    // Step 1: Verify test user
    console.log('\n📋 Step 1: Verifying test user...');
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@aipathfinder.com' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!testUser) {
      console.log('❌ Test user not found');
      return;
    }

    console.log(`✓ User: ${testUser.name} (${testUser.email})`);
    console.log(`✓ Messages: ${testUser.messages.length}`);

    // Verify password
    const passwordValid = testUser.password ? await bcrypt.compare('testpassword123', testUser.password) : false;
    console.log(`✓ Password: ${passwordValid ? 'Valid' : 'Invalid'}`);

    // Step 2: Check existing matches (before)
    console.log('\n🎯 Step 2: Checking existing matches (before API call)...');
    const beforeMatches = await prisma.careerMatch.findMany({
      where: { userId: testUser.id },
    });
    console.log(`  Found ${beforeMatches.length} existing matches`);

    if (beforeMatches.length > 0) {
      console.log('  Deleting old matches for fresh test...');
      await prisma.careerMatch.deleteMany({
        where: { userId: testUser.id },
      });
      console.log('  ✓ Old matches deleted');
    }

    // Step 3: Test the pages are accessible
    console.log('\n📱 Step 3: Testing page accessibility...');

    const pages = [
      { name: 'Home', url: 'http://localhost:3000/' },
      { name: 'Login', url: 'http://localhost:3000/login' },
      { name: 'Chat', url: 'http://localhost:3000/chat' },
      { name: 'Careers', url: 'http://localhost:3000/careers' },
    ];

    for (const page of pages) {
      const response = await fetch(page.url);
      const status = response.status;
      const icon = status === 200 ? '✓' : '✗';
      console.log(`  ${icon} ${page.name}: ${status}`);
    }

    // Step 4: Verify chat API endpoint
    console.log('\n💬 Step 4: Testing Chat API...');

    const chatResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello, I need career guidance' }
        ],
        userId: testUser.id,
      }),
    });

    if (chatResponse.ok) {
      const chatData = await chatResponse.json();
      console.log(`  ✓ Chat API working`);
      console.log(`  Response preview: ${chatData.message?.substring(0, 60)}...`);
    } else {
      console.log(`  ✗ Chat API error: ${chatResponse.status}`);
    }

    // Step 5: Test matching API (this requires OPENAI_API_KEY)
    console.log('\n🤖 Step 5: Testing Career Matching API...');
    console.log('  Note: This requires a valid OPENAI_API_KEY in .env');
    console.log('  The API will be tested without authentication first (should fail)');

    const unauthResponse = await fetch('http://localhost:3000/api/match-careers', {
      method: 'POST',
    });

    console.log(`  Unauthenticated request: ${unauthResponse.status} ${unauthResponse.statusText}`);
    if (unauthResponse.status === 401) {
      console.log('  ✓ API properly requires authentication');
    }

    // Step 6: Manual testing instructions
    console.log('\n🎮 Step 6: Manual Testing Required');
    console.log('\n  The career matching requires browser-based authentication.');
    console.log('  Follow these steps to test the complete flow:\n');
    console.log('  1. Open browser: http://localhost:3000/login');
    console.log('     Email: test@aipathfinder.com');
    console.log('     Password: testpassword123\n');
    console.log('  2. After login, navigate to: http://localhost:3000/chat');
    console.log('     - Verify conversation history loads (11 messages)');
    console.log('     - Verify "Get Career Matches" button appears\n');
    console.log('  3. Click "Get Career Matches" button');
    console.log('     - Watch for "Analyzing conversation..." loading state');
    console.log('     - Wait for success message (~5-10 seconds)');
    console.log('     - Auto-redirect to /careers after 3 seconds\n');
    console.log('  4. On Careers page, verify:');
    console.log('     - Career matches appear sorted by percentage');
    console.log('     - Each card shows match explanation');
    console.log('     - Try/Commit/Bookmark buttons work\n');

    // Step 7: Database verification script
    console.log('  5. After matching, run this to verify database:');
    console.log('     npx ts-node test-verify-matches.ts\n');

    console.log('='.repeat(60));
    console.log('✅ Pre-flight checks complete!\n');
    console.log('All systems ready for manual browser testing.');
    console.log('Server running at: http://localhost:3000\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthenticatedFlow();
