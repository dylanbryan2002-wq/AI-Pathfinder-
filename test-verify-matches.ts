import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyMatches() {
  console.log('🔍 Verifying Career Matches in Database\n');
  console.log('='.repeat(60));

  try {
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@aipathfinder.com' },
      include: {
        careerMatches: {
          include: {
            career: true,
          },
          orderBy: {
            matchPercentage: 'desc',
          },
        },
      },
    });

    if (!testUser) {
      console.log('❌ Test user not found');
      return;
    }

    console.log(`\n✓ User: ${testUser.name}`);
    console.log(`✓ Total matches: ${testUser.careerMatches.length}\n`);

    if (testUser.careerMatches.length === 0) {
      console.log('⚠️  No career matches found in database.');
      console.log('\nThis means either:');
      console.log('  1. You haven\'t clicked "Get Career Matches" yet');
      console.log('  2. The matching API call failed');
      console.log('  3. You need to login and generate matches first\n');
      console.log('Follow the manual testing steps in test-authenticated-flow.ts\n');
      return;
    }

    console.log('🎯 Career Matches:\n');

    testUser.careerMatches.forEach((match, i) => {
      console.log(`${i + 1}. ${match.career.title}`);
      console.log(`   Match: ${match.matchPercentage}%`);
      console.log(`   Reason: ${match.matchReason}`);

      if (match.matchData && typeof match.matchData === 'object') {
        console.log(`   Breakdown:`);
        const breakdown = match.matchData as Record<string, any>;
        Object.entries(breakdown).forEach(([key, value]) => {
          console.log(`     - ${key}: ${value}%`);
        });
      }
      console.log('');
    });

    // Check user profile data
    console.log('📊 User Profile Data:\n');
    console.log(`Interests: ${testUser.interestData?.length || 0} items`);
    if (testUser.interestData && Array.isArray(testUser.interestData)) {
      console.log(`  ${testUser.interestData.join(', ')}`);
    }

    console.log(`\nSkills: ${testUser.skillsData?.length || 0} items`);
    if (testUser.skillsData && Array.isArray(testUser.skillsData)) {
      console.log(`  ${testUser.skillsData.join(', ')}`);
    }

    console.log(`\nValues: ${testUser.valuesData?.length || 0} items`);
    if (testUser.valuesData && Array.isArray(testUser.valuesData)) {
      console.log(`  ${testUser.valuesData.join(', ')}`);
    }

    console.log(`\nGoals: ${testUser.goalsData?.length || 0} items`);
    if (testUser.goalsData && Array.isArray(testUser.goalsData)) {
      console.log(`  ${testUser.goalsData.join(', ')}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Verification complete!\n');

    // Quality check
    const avgMatch = testUser.careerMatches.reduce((sum, m) => sum + m.matchPercentage, 0) / testUser.careerMatches.length;
    console.log(`📈 Average match percentage: ${avgMatch.toFixed(1)}%`);

    const highMatches = testUser.careerMatches.filter(m => m.matchPercentage >= 80).length;
    console.log(`🎯 High matches (80%+): ${highMatches}/${testUser.careerMatches.length}`);

    if (avgMatch < 60) {
      console.log('\n⚠️  Warning: Average match seems low. Consider:');
      console.log('  - Adding more conversation history');
      console.log('  - Being more specific about interests/goals');
    }

    console.log('');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyMatches();
