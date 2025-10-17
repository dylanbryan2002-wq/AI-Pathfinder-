import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showJobStats() {
  console.log('📊 Job Database Statistics\n');

  // Total jobs
  const totalJobs = await prisma.job.count();
  console.log(`Total Jobs: ${totalJobs}`);

  // Jobs by type
  const jobsByType = await prisma.$queryRaw`
    SELECT type, COUNT(*) as count
    FROM jobs
    GROUP BY type
    ORDER BY count DESC
  ` as Array<{ type: string; count: bigint }>;

  console.log('\nJobs by Type:');
  jobsByType.forEach((row) => {
    console.log(`  ${row.type}: ${row.count}`);
  });

  // Jobs by source
  const jobsBySource = await prisma.$queryRaw`
    SELECT source, COUNT(*) as count
    FROM jobs
    GROUP BY source
    ORDER BY count DESC
  ` as Array<{ source: string; count: bigint }>;

  console.log('\nJobs by Source:');
  jobsBySource.forEach((row) => {
    console.log(`  ${row.source || 'Unknown'}: ${row.count}`);
  });

  // Recent jobs
  const recentJobs = await prisma.job.findMany({
    take: 5,
    orderBy: { postedAt: 'desc' },
    select: {
      title: true,
      company: true,
      location: true,
      postedAt: true,
    },
  });

  console.log('\nMost Recent Jobs:');
  recentJobs.forEach((job) => {
    console.log(`  ${job.title} at ${job.company} - ${job.location}`);
    console.log(`    Posted: ${job.postedAt.toLocaleDateString()}`);
  });
}

showJobStats()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
