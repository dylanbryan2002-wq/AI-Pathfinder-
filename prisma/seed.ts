import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create careers
  const careers = [
    {
      title: 'Youth Development Leader',
      description: 'Work with young people to help them build leadership skills, overcome challenges, and reach their potential.',
      avgSalary: '$64k',
      salaryRange: {
        min: 45000,
        max: 92000,
        percentiles: {
          10: 45000,
          25: 52000,
          50: 64000,
          75: 78000,
          90: 92000,
        },
      },
      requirements: 'Experience working with kids',
      education: "Bachelor's degree",
      growth: '+12% (5 years)',
      dayInLife: 'As a Youth Development Leader, you start your day by preparing engaging activities for the youth center. You spend time mentoring teenagers, organizing community programs, and coordinating with parents and schools.',
      dayInLifeList: [
        'Design and lead programs that help young people build leadership, teamwork, and life skills.',
        'Mentor and coach youth one-on-one or in small groups to set goals and overcome challenges.',
        'Organize events and projects like workshops, volunteer days, and community initiatives.',
      ],
      onetCode: '21-1093.00',
    },
    {
      title: 'High School Teacher',
      description: 'Educate and inspire high school students across various subjects, helping them develop critical thinking skills and prepare for their future.',
      avgSalary: '$58k',
      salaryRange: {
        min: 42000,
        max: 82000,
        percentiles: {
          10: 42000,
          25: 48000,
          50: 58000,
          75: 70000,
          90: 82000,
        },
      },
      requirements: 'Teaching certification',
      education: "Bachelor's + Teaching License",
      growth: '+8% (5 years)',
      dayInLife: 'Your day begins with preparing lesson plans and setting up the classroom. You teach 5-6 classes throughout the day, engaging students in various subjects and fostering critical thinking.',
      dayInLifeList: [
        'Develop and deliver engaging lesson plans that align with curriculum standards.',
        'Assess student progress through assignments, tests, and one-on-one support.',
        'Collaborate with parents, administrators, and other teachers to support student success.',
      ],
      onetCode: '25-2031.00',
    },
    {
      title: 'Nonprofit Program Manager',
      description: 'Lead program development and implementation for nonprofit organizations, making a positive impact on communities.',
      avgSalary: '$72k',
      salaryRange: {
        min: 48000,
        max: 105000,
        percentiles: {
          10: 48000,
          25: 58000,
          50: 72000,
          75: 88000,
          90: 105000,
        },
      },
      requirements: 'Program management experience',
      education: "Bachelor's or Master's degree",
      growth: '+15% (5 years)',
      dayInLife: 'You begin by reviewing program metrics and planning strategic initiatives. Your morning involves meeting with stakeholders, funders, and community partners to discuss program impact.',
      dayInLifeList: [
        'Develop and implement programs that address community needs and organizational goals.',
        'Manage budgets, write grants, and report on program effectiveness to funders.',
        'Lead and support staff, volunteers, and partners to ensure quality service delivery.',
      ],
      onetCode: '11-9151.00',
    },
    {
      title: 'Social Worker',
      description: 'Help individuals, families, and communities cope with challenges and improve their wellbeing.',
      avgSalary: '$55k',
      salaryRange: {
        min: 38000,
        max: 78000,
        percentiles: {
          10: 38000,
          25: 45000,
          50: 55000,
          75: 68000,
          90: 78000,
        },
      },
      requirements: 'Social Work degree and license',
      education: "Bachelor's or Master's in Social Work",
      growth: '+12% (5 years)',
      dayInLife: 'You meet with clients to assess their needs, develop care plans, and connect them with resources. Your work involves advocacy, counseling, and collaboration with other service providers.',
      dayInLifeList: [
        'Assess client needs and develop individualized care plans.',
        'Connect clients with resources like housing, healthcare, and employment services.',
        'Provide counseling and support to help clients overcome challenges.',
      ],
      onetCode: '21-1022.00',
    },
    {
      title: 'Community Organizer',
      description: 'Mobilize communities to take action on social issues and create positive change.',
      avgSalary: '$52k',
      salaryRange: {
        min: 35000,
        max: 75000,
        percentiles: {
          10: 35000,
          25: 42000,
          50: 52000,
          75: 65000,
          90: 75000,
        },
      },
      requirements: 'Community engagement experience',
      education: "Bachelor's degree preferred",
      growth: '+10% (5 years)',
      dayInLife: 'You engage with community members, identify issues, and organize campaigns for change. Your work involves building coalitions, planning events, and advocating for policy reforms.',
      dayInLifeList: [
        'Build relationships with community members and identify shared concerns.',
        'Organize campaigns, events, and advocacy efforts to address community issues.',
        'Develop leaders within the community to sustain long-term change.',
      ],
      onetCode: '13-1199.05',
    },
  ];

  console.log('Creating careers...');
  for (const careerData of careers) {
    await prisma.career.create({
      data: careerData,
    });
    console.log(`✓ Created career: ${careerData.title}`);
  }

  // Create sample jobs
  const jobs = [
    {
      title: 'Youth Program Coordinator',
      company: 'Community Centers Inc',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$55k - $68k',
      description: 'Join our team to develop and implement engaging youth programs. Work directly with teens to provide mentorship, life skills training, and career exploration opportunities.',
      tags: ['Youth Development', 'Program Management', 'Community Outreach'],
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      source: 'Manual',
    },
    {
      title: 'High School Teacher - English',
      company: 'Oakland Public Schools',
      location: 'Oakland, CA',
      type: 'Full-time',
      salary: '$52k - $72k',
      description: 'Seeking passionate educator to teach English Literature and Writing to high school students. Develop curriculum, assess student progress, and foster love of learning.',
      tags: ['Education', 'Curriculum Development', 'Mentoring'],
      postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      source: 'Manual',
    },
    {
      title: 'Nonprofit Program Manager',
      company: 'Bay Area Youth Services',
      location: 'Berkeley, CA',
      type: 'Full-time',
      salary: '$68k - $82k',
      description: 'Lead program development and implementation for youth-focused nonprofit. Manage team, oversee budgets, and measure program impact. Experience with grant writing preferred.',
      tags: ['Nonprofit', 'Leadership', 'Grant Writing'],
      postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      source: 'Manual',
    },
    {
      title: 'Community Outreach Coordinator',
      company: 'Local Arts Foundation',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$48k - $62k',
      description: 'Coordinate community engagement initiatives and build partnerships with local organizations to expand arts access.',
      tags: ['Community Engagement', 'Arts', 'Partnership Development'],
      postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      source: 'Manual',
    },
    {
      title: 'Education Specialist',
      company: 'Tech Education Nonprofit',
      location: 'Remote',
      type: 'Full-time',
      salary: '$60k - $75k',
      description: 'Design and deliver technology education programs for underserved communities. Curriculum development experience required.',
      tags: ['Education', 'Technology', 'Curriculum Design'],
      postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      source: 'Manual',
    },
  ];

  console.log('\nCreating jobs...');
  for (const jobData of jobs) {
    await prisma.job.create({
      data: jobData,
    });
    console.log(`✓ Created job: ${jobData.title}`);
  }

  console.log('\n✅ Seeding completed!');
  console.log(`\nCreated:\n- ${careers.length} careers\n- ${jobs.length} jobs`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
