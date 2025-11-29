import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const finalCareers = [
  // Additional Healthcare & Wellness
  {
    title: 'Orthodontist',
    description: 'Examine, diagnose, and treat dental malocclusions and oral cavity anomalies. Design and fabricate appliances to realign teeth and jaws.',
    avgSalary: '$208,000',
    salaryRange: '$125,000 - $300,000+',
    requirements: 'Dental degree and orthodontic residency',
    education: 'Doctoral degree',
    growth: 'Faster than average (6%)',
    onetCode: '29-1023.00',
  },
  {
    title: 'Podiatrist',
    description: 'Diagnose and treat foot, ankle, and lower leg problems. They perform surgery, prescribe medications, and recommend physical therapy.',
    avgSalary: '$134,300',
    salaryRange: '$68,000 - $208,000+',
    requirements: 'Doctor of Podiatric Medicine (D.P.M.) degree',
    education: 'Doctoral degree',
    growth: 'Average (2%)',
    onetCode: '29-1081.00',
  },
  {
    title: 'Audiologist',
    description: 'Diagnose, manage, and treat hearing, balance, or ear problems. They work with patients of all ages.',
    avgSalary: '$81,030',
    salaryRange: '$56,000 - $120,000',
    requirements: 'Doctor of Audiology (Au.D.) degree',
    education: 'Doctoral degree',
    growth: 'Much faster than average (13%)',
    onetCode: '29-1181.00',
  },
  {
    title: 'Art Therapist',
    description: 'Use creative art-making to help individuals explore feelings, reconcile emotional conflicts, and foster self-awareness.',
    avgSalary: '$50,000',
    salaryRange: '$35,000 - $75,000',
    requirements: "Master's degree in Art Therapy",
    education: "Master's degree",
    growth: 'Faster than average (8%)',
    onetCode: '29-1129.01',
  },
  {
    title: 'Nutritionist',
    description: 'Advise people on what to eat to lead a healthy lifestyle or achieve specific health goals.',
    avgSalary: '$63,090',
    salaryRange: '$40,000 - $91,000',
    requirements: "Bachelor's degree in Nutrition or Dietetics",
    education: "Bachelor's degree",
    growth: 'Faster than average (7%)',
    onetCode: '29-1031.00',
  },

  // Technology & Innovation
  {
    title: 'Robotics Engineer',
    description: 'Design, build, and test robots. They create robots for various applications including manufacturing, healthcare, and exploration.',
    avgSalary: '$100,000',
    salaryRange: '$70,000 - $150,000',
    requirements: "Bachelor's degree in Robotics, Mechanical, or Electrical Engineering",
    education: "Bachelor's degree",
    growth: 'Much faster than average (22%)',
    onetCode: '17-2199.08',
  },
  {
    title: 'Cybersecurity Consultant',
    description: 'Help organizations protect their computer systems and networks from cyber threats. They assess vulnerabilities and recommend solutions.',
    avgSalary: '$110,000',
    salaryRange: '$75,000 - $180,000',
    requirements: "Bachelor's degree in Cybersecurity and relevant certifications",
    education: "Bachelor's degree",
    growth: 'Much faster than average (32%)',
    onetCode: '15-1212.00',
  },
  {
    title: 'Computer Hardware Engineer',
    description: 'Research, design, develop, and test computer systems and components such as processors, memory devices, and routers.',
    avgSalary: '$128,170',
    salaryRange: '$77,000 - $192,000',
    requirements: "Bachelor's degree in Computer Engineering",
    education: "Bachelor's degree",
    growth: 'Faster than average (6%)',
    onetCode: '17-2061.00',
  },
  {
    title: 'Quality Assurance Engineer',
    description: 'Test software applications and systems to find bugs and ensure quality. They create test plans and automate testing.',
    avgSalary: '$88,000',
    salaryRange: '$55,000 - $135,000',
    requirements: "Bachelor's degree in Computer Science or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (22%)',
    onetCode: '15-1253.00',
  },
  {
    title: 'IT Project Manager',
    description: 'Plan and coordinate technology projects. They manage budgets, timelines, and teams to deliver IT solutions.',
    avgSalary: '$95,000',
    salaryRange: '$65,000 - $145,000',
    requirements: "Bachelor's degree in IT or Business",
    education: "Bachelor's degree",
    growth: 'Faster than average (11%)',
    onetCode: '11-3021.00',
  },

  // Business & Entrepreneurship
  {
    title: 'Entrepreneur',
    description: 'Create and manage their own business ventures. They identify opportunities, take risks, and build companies.',
    avgSalary: '$71,000',
    salaryRange: '$30,000 - $200,000+',
    requirements: 'Varies; business knowledge and experience',
    education: 'Varies',
    growth: 'Faster than average (10%)',
    onetCode: '11-1021.00',
  },
  {
    title: 'Brand Manager',
    description: 'Develop and execute brand strategies. They manage brand identity, positioning, and marketing campaigns.',
    avgSalary: '$96,000',
    salaryRange: '$60,000 - $150,000',
    requirements: "Bachelor's degree in Marketing or Business",
    education: "Bachelor's degree",
    growth: 'Faster than average (10%)',
    onetCode: '11-2021.00',
  },
  {
    title: 'Management Analyst',
    description: 'Recommend ways to improve an organization\'s efficiency. They advise managers on how to make operations more profitable.',
    avgSalary: '$93,000',
    salaryRange: '$55,000 - $160,000',
    requirements: "Bachelor's degree in Business or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (14%)',
    onetCode: '13-1111.00',
  },
  {
    title: 'Economist',
    description: 'Study the production and distribution of resources, goods, and services. They collect and analyze data and forecast market trends.',
    avgSalary: '$108,350',
    salaryRange: '$62,000 - $193,000',
    requirements: "Master's or Doctoral degree in Economics",
    education: "Master's degree",
    growth: 'Faster than average (6%)',
    onetCode: '19-3011.00',
  },
  {
    title: 'Market Research Analyst',
    description: 'Study market conditions to examine potential sales of products and services. They help companies understand what people want.',
    avgSalary: '$65,810',
    salaryRange: '$38,000 - $122,000',
    requirements: "Bachelor's degree in Market Research or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (19%)',
    onetCode: '13-1161.00',
  },

  // Education & Child Development
  {
    title: 'Child Psychologist',
    description: 'Assess and treat mental, emotional, and behavioral disorders in children and adolescents.',
    avgSalary: '$79,820',
    salaryRange: '$50,000 - $125,000',
    requirements: 'Doctoral degree in Psychology',
    education: 'Doctoral degree',
    growth: 'Faster than average (8%)',
    onetCode: '19-3031.02',
  },
  {
    title: 'Education Consultant',
    description: 'Advise schools and educational organizations on curriculum development, teaching methods, and educational programs.',
    avgSalary: '$68,000',
    salaryRange: '$45,000 - $110,000',
    requirements: "Master's degree in Education",
    education: "Master's degree",
    growth: 'Faster than average (10%)',
    onetCode: '25-9031.00',
  },
  {
    title: 'Museum Educator',
    description: 'Develop and deliver educational programs for museum visitors. They create engaging learning experiences around exhibits.',
    avgSalary: '$52,000',
    salaryRange: '$35,000 - $75,000',
    requirements: "Bachelor's degree in Education, Museum Studies, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (11%)',
    onetCode: '25-4012.00',
  },
  {
    title: 'Career Counselor',
    description: 'Help individuals make career decisions. They administer assessments, explore interests, and provide guidance on career paths.',
    avgSalary: '$58,120',
    salaryRange: '$37,000 - $95,000',
    requirements: "Master's degree in Counseling",
    education: "Master's degree",
    growth: 'Faster than average (8%)',
    onetCode: '21-1012.00',
  },

  // Creative Arts & Entertainment
  {
    title: 'Sound Engineer',
    description: 'Set up, operate, and maintain the electrical equipment for concerts, sports events, and theatrical productions.',
    avgSalary: '$50,000',
    salaryRange: '$28,000 - $95,000',
    requirements: 'Postsecondary training in audio technology',
    education: 'Certificate program',
    growth: 'Faster than average (8%)',
    onetCode: '27-4014.00',
  },
  {
    title: 'Choreographer',
    description: 'Create original dances and develop new interpretations of existing dances. They work in theaters, dance companies, and films.',
    avgSalary: '$43,680',
    salaryRange: '$22,000 - $78,000',
    requirements: 'Training and experience in dance',
    education: 'High school diploma',
    growth: 'Average (5%)',
    onetCode: '27-2032.00',
  },
  {
    title: 'Set Designer',
    description: 'Design sets for film, television, and theater productions. They create the physical surroundings in which action takes place.',
    avgSalary: '$56,000',
    salaryRange: '$32,000 - $98,000',
    requirements: "Bachelor's degree in Theater or Design",
    education: "Bachelor's degree",
    growth: 'Average (3%)',
    onetCode: '27-1027.00',
  },
  {
    title: 'Voice Actor',
    description: 'Provide voice-over work for animations, video games, commercials, audiobooks, and other media.',
    avgSalary: '$45,000',
    salaryRange: '$20,000 - $120,000',
    requirements: 'Training in voice acting and performance',
    education: 'Varies',
    growth: 'Faster than average (10%)',
    onetCode: '27-2012.02',
  },
  {
    title: 'Costume Designer',
    description: 'Design costumes for theater, film, television, and other performances. They research historical periods and create sketches.',
    avgSalary: '$65,000',
    salaryRange: '$35,000 - $110,000',
    requirements: "Bachelor's degree in Costume Design or Fashion",
    education: "Bachelor's degree",
    growth: 'Average (3%)',
    onetCode: '27-1022.00',
  },

  // Environmental & Sustainability
  {
    title: 'Conservation Scientist',
    description: 'Manage the overall land quality of forests, parks, rangeways, and other natural resources.',
    avgSalary: '$64,010',
    salaryRange: '$41,000 - $98,000',
    requirements: "Bachelor's degree in Forestry, Environmental Science, or related field",
    education: "Bachelor's degree",
    growth: 'Average (3%)',
    onetCode: '19-1031.00',
  },
  {
    title: 'Sustainability Coordinator',
    description: 'Develop and implement sustainability programs for organizations. They focus on reducing environmental impact.',
    avgSalary: '$68,000',
    salaryRange: '$45,000 - $105,000',
    requirements: "Bachelor's degree in Environmental Science or Sustainability",
    education: "Bachelor's degree",
    growth: 'Much faster than average (15%)',
    onetCode: '11-9199.11',
  },
  {
    title: 'Wildlife Biologist',
    description: 'Study animals and their behavior, diseases, genetics, and life processes. They work to protect endangered species.',
    avgSalary: '$64,650',
    salaryRange: '$41,000 - $102,000',
    requirements: "Bachelor's degree in Wildlife Biology",
    education: "Bachelor's degree",
    growth: 'Average (5%)',
    onetCode: '19-1023.00',
  },
  {
    title: 'Renewable Energy Engineer',
    description: 'Design and develop systems to generate renewable energy from sources like solar, wind, and hydroelectric power.',
    avgSalary: '$90,000',
    salaryRange: '$60,000 - $130,000',
    requirements: "Bachelor's degree in Engineering",
    education: "Bachelor's degree",
    growth: 'Much faster than average (20%)',
    onetCode: '17-2199.11',
  },

  // Social Services & Community
  {
    title: 'Substance Abuse Counselor',
    description: 'Counsel individuals and families affected by addiction to alcohol, drugs, gambling, or other substances.',
    avgSalary: '$48,520',
    salaryRange: '$31,000 - $79,000',
    requirements: "Bachelor's degree and counseling certification",
    education: "Bachelor's degree",
    growth: 'Much faster than average (22%)',
    onetCode: '21-1011.00',
  },
  {
    title: 'Community Health Worker',
    description: 'Promote health within a community by assisting individuals to adopt healthy behaviors and connecting them to resources.',
    avgSalary: '$42,000',
    salaryRange: '$29,000 - $65,000',
    requirements: 'High school diploma; some positions require certification',
    education: 'High school diploma',
    growth: 'Much faster than average (13%)',
    onetCode: '21-1094.00',
  },
  {
    title: 'Rehabilitation Counselor',
    description: 'Help people with physical, mental, developmental, or emotional disabilities live independently.',
    avgSalary: '$37,530',
    salaryRange: '$27,000 - $60,000',
    requirements: "Master's degree in Rehabilitation Counseling",
    education: "Master's degree",
    growth: 'Faster than average (10%)',
    onetCode: '21-1015.00',
  },
  {
    title: 'Grant Writer',
    description: 'Write proposals to secure funding for nonprofit organizations, research projects, or other initiatives.',
    avgSalary: '$58,000',
    salaryRange: '$40,000 - $85,000',
    requirements: "Bachelor's degree in English, Communications, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (9%)',
    onetCode: '27-3043.00',
  },

  // Skilled Trades & Technical
  {
    title: 'Locksmith',
    description: 'Install, repair, and adjust locks in everything from cars to office buildings. They also offer services to people who are locked out.',
    avgSalary: '$43,000',
    salaryRange: '$28,000 - $65,000',
    requirements: 'High school diploma and apprenticeship or training',
    education: 'High school diploma',
    growth: 'Faster than average (8%)',
    onetCode: '49-9094.00',
  },
  {
    title: 'Machinist',
    description: 'Set up and operate machine tools to produce precision metal parts, instruments, and tools.',
    avgSalary: '$47,000',
    salaryRange: '$31,000 - $70,000',
    requirements: 'High school diploma and apprenticeship or technical training',
    education: 'High school diploma',
    growth: 'Average (3%)',
    onetCode: '51-4041.00',
  },
  {
    title: 'Heavy Equipment Operator',
    description: 'Operate heavy machinery used in construction projects such as bulldozers, cranes, and excavators.',
    avgSalary: '$49,100',
    salaryRange: '$33,000 - $80,000',
    requirements: 'High school diploma and on-the-job training',
    education: 'High school diploma',
    growth: 'Faster than average (6%)',
    onetCode: '47-2073.00',
  },
  {
    title: 'Elevator Installer and Repairer',
    description: 'Install, fix, and maintain elevators, escalators, moving walkways, and other lifts.',
    avgSalary: '$88,540',
    salaryRange: '$48,000 - $125,000',
    requirements: 'High school diploma and apprenticeship',
    education: 'High school diploma',
    growth: 'Faster than average (6%)',
    onetCode: '47-4021.00',
  },

  // Food & Hospitality
  {
    title: 'Pastry Chef',
    description: 'Specialize in making desserts, breads, and other baked goods. They create recipes and oversee pastry production.',
    avgSalary: '$52,000',
    salaryRange: '$30,000 - $85,000',
    requirements: 'Culinary school or apprenticeship',
    education: 'Certificate program',
    growth: 'Much faster than average (15%)',
    onetCode: '35-1011.00',
  },
  {
    title: 'Sommelier',
    description: 'Wine experts who create wine lists, make recommendations, and educate staff and customers about wine.',
    avgSalary: '$60,000',
    salaryRange: '$35,000 - $120,000',
    requirements: 'Training and certification in wine',
    education: 'Certificate program',
    growth: 'Faster than average (11%)',
    onetCode: '35-9031.00',
  },
  {
    title: 'Travel Agent',
    description: 'Plan and sell transportation, lodging, and entertainment activities to individuals and groups.',
    avgSalary: '$43,810',
    salaryRange: '$25,000 - $70,000',
    requirements: 'High school diploma; certification helpful',
    education: 'High school diploma',
    growth: 'Average (3%)',
    onetCode: '41-3041.00',
  },

  // Sports & Recreation
  {
    title: 'Sports Coach',
    description: 'Teach amateur or professional athletes the skills they need to succeed. They organize practices and motivate players.',
    avgSalary: '$44,890',
    salaryRange: '$21,000 - $80,000',
    requirements: "Bachelor's degree for high school and college level",
    education: "Bachelor's degree",
    growth: 'Much faster than average (20%)',
    onetCode: '27-2022.00',
  },
  {
    title: 'Recreation Therapist',
    description: 'Plan, direct, and coordinate recreation-based treatment programs for people with illnesses or disabling conditions.',
    avgSalary: '$48,220',
    salaryRange: '$32,000 - $72,000',
    requirements: "Bachelor's degree in Recreational Therapy",
    education: "Bachelor's degree",
    growth: 'Faster than average (7%)',
    onetCode: '29-1125.00',
  },
  {
    title: 'Sports Agent',
    description: 'Represent athletes and negotiate contracts for them. They handle endorsements, transfers, and other business matters.',
    avgSalary: '$62,000',
    salaryRange: '$35,000 - $150,000+',
    requirements: "Bachelor's degree; many have law degrees",
    education: "Bachelor's degree",
    growth: 'Faster than average (10%)',
    onetCode: '13-1011.00',
  },

  // Emerging & Specialized Fields
  {
    title: 'User Researcher',
    description: 'Study how people interact with products and services. They conduct interviews, surveys, and usability tests.',
    avgSalary: '$85,000',
    salaryRange: '$60,000 - $125,000',
    requirements: "Bachelor's degree in Psychology, HCI, or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (18%)',
    onetCode: '19-3099.01',
  },
  {
    title: 'Data Engineer',
    description: 'Build and maintain data pipelines and infrastructure. They ensure data is accessible and reliable for analysis.',
    avgSalary: '$110,000',
    salaryRange: '$75,000 - $170,000',
    requirements: "Bachelor's degree in Computer Science or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (36%)',
    onetCode: '15-1243.00',
  },
  {
    title: 'Clinical Research Coordinator',
    description: 'Manage clinical trials and research studies. They recruit participants, collect data, and ensure regulatory compliance.',
    avgSalary: '$55,000',
    salaryRange: '$40,000 - $80,000',
    requirements: "Bachelor's degree in Life Sciences or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (17%)',
    onetCode: '19-1042.00',
  },
  {
    title: 'Ethical Hacker',
    description: 'Test computer systems and networks for security vulnerabilities by attempting to breach them legally and ethically.',
    avgSalary: '$103,000',
    salaryRange: '$70,000 - $160,000',
    requirements: "Bachelor's degree in Cybersecurity and certifications",
    education: "Bachelor's degree",
    growth: 'Much faster than average (32%)',
    onetCode: '15-1212.00',
  },
  {
    title: 'Technical Recruiter',
    description: 'Source, screen, and recruit candidates for technical positions. They understand technology roles and assess technical skills.',
    avgSalary: '$65,000',
    salaryRange: '$45,000 - $100,000',
    requirements: "Bachelor's degree in HR or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (8%)',
    onetCode: '13-1071.00',
  },
  {
    title: 'Dental Assistant',
    description: 'Assist dentists during procedures, prepare patients, sterilize instruments, and schedule appointments.',
    avgSalary: '$41,180',
    salaryRange: '$29,000 - $58,000',
    requirements: 'Postsecondary training or on-the-job training',
    education: 'Certificate program',
    growth: 'Faster than average (8%)',
    onetCode: '31-9091.00',
  },
];

async function seedFinalCareers() {
  console.log('🌱 Adding final 50 careers to database...\n');

  let savedCount = 0;
  let skippedCount = 0;

  for (const career of finalCareers) {
    try {
      const existing = await prisma.career.findFirst({
        where: { title: career.title },
      });

      if (!existing) {
        await prisma.career.create({
          data: {
            ...career,
            dayInLife: career.description,
            dayInLifeList: [],
          },
        });
        console.log(`✓ Added: ${career.title}`);
        savedCount++;
      } else {
        console.log(`- Skipped: ${career.title}`);
        skippedCount++;
      }
    } catch (error) {
      console.error(`Error saving ${career.title}:`, error);
    }
  }

  console.log('\n✅ Final career seeding completed!');
  console.log(`📊 Careers saved: ${savedCount}`);
  console.log(`⏭️  Duplicates skipped: ${skippedCount}`);

  const totalCareers = await prisma.career.count();
  console.log(`💾 Total careers in database: ${totalCareers}\n`);
}

seedFinalCareers()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
