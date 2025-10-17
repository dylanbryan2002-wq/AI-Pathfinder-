import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupOldJobs() {
  console.log('🧹 Starting job cleanup...\n');

  // Calculate date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  console.log(`Removing jobs posted before: ${thirtyDaysAgo.toLocaleDateString()}`);

  try {
    // Count jobs to be deleted
    const oldJobsCount = await prisma.job.count({
      where: {
        postedAt: {
          lt: thirtyDaysAgo,
        },
      },
    });

    if (oldJobsCount === 0) {
      console.log('✨ No old jobs to remove. Database is clean!');
      return;
    }

    console.log(`Found ${oldJobsCount} old jobs to remove...`);

    // Delete old jobs
    const result = await prisma.job.deleteMany({
      where: {
        postedAt: {
          lt: thirtyDaysAgo,
        },
      },
    });

    console.log(`✅ Successfully removed ${result.count} old job listings\n`);

    // Get remaining job count
    const remainingJobs = await prisma.job.count();
    console.log(`💾 Total jobs remaining in database: ${remainingJobs}`);

    // Show breakdown by type
    const jobsByType = await prisma.$queryRaw`
      SELECT type, COUNT(*) as count
      FROM jobs
      GROUP BY type
      ORDER BY count DESC
    ` as Array<{ type: string; count: bigint }>;

    console.log('\n📊 Jobs by type:');
    jobsByType.forEach((row) => {
      console.log(`   ${row.type}: ${row.count}`);
    });

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

// Run the cleanup script
cleanupOldJobs()
  .catch((error) => {
    console.error('Fatal error during cleanup:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
