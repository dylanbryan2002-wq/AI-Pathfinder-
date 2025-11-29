/**
 * Test script to call the match-careers API
 * Run with: npx ts-node test-match-api.ts
 */

async function testMatching() {
  console.log('🧪 Testing career matching API...\n');

  try {
    // Get session first
    const sessionRes = await fetch('http://localhost:3000/api/auth/session');
    const session = await sessionRes.json();

    if (!session?.user) {
      console.error('❌ No active session. Please log in first.');
      return;
    }

    console.log(`✅ Session found for user: ${session.user.email}\n`);

    // Call match-careers endpoint
    console.log('🔄 Calling /api/match-careers...\n');

    const matchRes = await fetch('http://localhost:3000/api/match-careers', {
      method: 'POST',
      headers: {
        'Cookie': sessionRes.headers.get('set-cookie') || '',
      },
    });

    const matchData = await matchRes.json();

    if (matchRes.ok) {
      console.log('✅ Matching successful!');
      console.log(`\n📊 Results:`);
      console.log(`   - Total matches: ${matchData.totalMatches}`);
      console.log(`   - Profile data extracted: ${JSON.stringify(matchData.profileData, null, 2)}`);
      console.log(`\n🎯 Top 3 matches:`);
      matchData.matches.slice(0, 3).forEach((match: any, index: number) => {
        console.log(`   ${index + 1}. ${match.career.title} (${match.matchPercentage}% match)`);
        console.log(`      Reason: ${match.matchReason}`);
      });
    } else {
      console.error('❌ Matching failed:', matchData.error);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testMatching();
