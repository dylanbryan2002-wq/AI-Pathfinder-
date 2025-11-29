import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const careers = [
  // Healthcare Careers
  {
    title: 'Registered Nurse',
    description: 'Provide and coordinate patient care, educate patients and the public about various health conditions, and provide advice and emotional support to patients and their families.',
    avgSalary: '$77,600',
    salaryRange: '$59,000 - $116,000',
    requirements: "Bachelor's degree in Nursing (BSN)",
    education: "Bachelor's degree",
    growth: 'Much faster than average (9%)',
    dayInLife: 'A typical day involves assessing patient conditions, administering medications, collaborating with physicians, updating patient records, and providing emotional support to patients and families.',
    dayInLifeList: [
      'Monitor patient vital signs and symptoms',
      'Administer medications and treatments',
      'Collaborate with doctors and healthcare team',
      'Educate patients about health conditions',
      'Maintain detailed patient records'
    ],
    onetCode: '29-1141.00',
  },
  {
    title: 'Physician Assistant',
    description: 'Practice medicine on teams with physicians, surgeons, and other healthcare workers. They examine, diagnose, and treat patients.',
    avgSalary: '$121,530',
    salaryRange: '$87,000 - $157,000',
    requirements: "Master's degree from an accredited PA program",
    education: "Master's degree",
    growth: 'Much faster than average (28%)',
    dayInLife: 'Physician Assistants work closely with doctors to diagnose illnesses, develop treatment plans, prescribe medications, and sometimes assist in surgeries.',
    dayInLifeList: [
      'Examine patients and take medical histories',
      'Order and interpret diagnostic tests',
      'Prescribe medications',
      'Assist in surgical procedures',
      'Counsel patients on preventive care'
    ],
    onetCode: '29-1071.00',
  },
  {
    title: 'Physical Therapist',
    description: 'Help injured or ill people improve movement and manage pain. They are often an important part of preventive care, rehabilitation, and treatment for patients with chronic conditions.',
    avgSalary: '$95,620',
    salaryRange: '$64,000 - $128,000',
    requirements: "Doctor of Physical Therapy (DPT) degree",
    education: "Doctoral degree",
    growth: 'Much faster than average (15%)',
    dayInLife: 'Physical therapists evaluate patients, develop personalized treatment plans, use exercises and hands-on therapy to improve mobility, and track patient progress.',
    dayInLifeList: [
      'Evaluate patient conditions and mobility',
      'Develop personalized treatment plans',
      'Guide patients through therapeutic exercises',
      'Use hands-on therapy techniques',
      'Track and document patient progress'
    ],
    onetCode: '29-1123.00',
  },
  {
    title: 'Medical Assistant',
    description: 'Complete administrative and clinical tasks in hospitals, offices of physicians, and other healthcare facilities. Their duties vary with location, specialty, and size of the practice.',
    avgSalary: '$37,190',
    salaryRange: '$29,000 - $50,000',
    requirements: 'Postsecondary certificate or diploma',
    education: 'Certificate program',
    growth: 'Much faster than average (16%)',
    dayInLife: 'Medical assistants record patient history, measure vital signs, assist physicians with examinations, schedule appointments, and handle administrative tasks.',
    dayInLifeList: [
      'Record patient medical histories',
      'Measure vital signs (blood pressure, temperature)',
      'Assist doctors during examinations',
      'Schedule patient appointments',
      'Prepare lab specimens for testing'
    ],
    onetCode: '31-9092.00',
  },
  {
    title: 'Pharmacist',
    description: 'Dispense prescription medications and provide information to patients about medications and their use. They also advise physicians and other healthcare workers on medication selection and dosage.',
    avgSalary: '$128,570',
    salaryRange: '$92,000 - $161,000',
    requirements: 'Doctor of Pharmacy (Pharm.D.) degree',
    education: 'Doctoral degree',
    growth: 'Little or no change (2%)',
    dayInLife: 'Pharmacists review prescriptions, dispense medications, counsel patients on proper usage, check for drug interactions, and provide immunizations.',
    dayInLifeList: [
      'Review and verify prescription orders',
      'Dispense medications accurately',
      'Counsel patients on medication use and side effects',
      'Check for drug interactions',
      'Administer immunizations and health screenings'
    ],
    onetCode: '29-1051.00',
  },

  // Technology Careers
  {
    title: 'Software Engineer',
    description: 'Design, develop, and test software applications and systems. They apply engineering principles to create solutions for end users.',
    avgSalary: '$120,730',
    salaryRange: '$75,000 - $180,000',
    requirements: "Bachelor's degree in Computer Science or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (22%)',
    dayInLife: 'Software engineers write code, debug programs, collaborate with team members, participate in code reviews, and continuously learn new technologies.',
    dayInLifeList: [
      'Write and test code for software applications',
      'Debug and fix software issues',
      'Collaborate with designers and product managers',
      'Participate in code reviews and team meetings',
      'Stay updated on new programming languages and tools'
    ],
    onetCode: '15-1252.00',
  },
  {
    title: 'Data Scientist',
    description: 'Use analytical tools and techniques to extract meaningful insights from data. They combine computer science, statistics, and domain expertise to solve complex problems.',
    avgSalary: '$100,910',
    salaryRange: '$60,000 - $165,000',
    requirements: "Bachelor's degree in Data Science, Statistics, or related field; many positions require a Master's",
    education: "Master's degree",
    growth: 'Much faster than average (36%)',
    dayInLife: 'Data scientists collect and clean data, build predictive models, create visualizations, and present findings to stakeholders to drive business decisions.',
    dayInLifeList: [
      'Collect and clean large datasets',
      'Build statistical and machine learning models',
      'Create data visualizations and dashboards',
      'Present insights to stakeholders',
      'Collaborate with engineering teams to deploy models'
    ],
    onetCode: '15-2051.00',
  },
  {
    title: 'Web Developer',
    description: 'Create and maintain websites. They are responsible for the look of the site as well as technical aspects such as site performance and capacity.',
    avgSalary: '$77,200',
    salaryRange: '$45,000 - $130,000',
    requirements: "Associate's or Bachelor's degree in Web Development or related field",
    education: "Associate's degree",
    growth: 'Much faster than average (13%)',
    dayInLife: 'Web developers write code for websites, test functionality across browsers, optimize site performance, and work with designers to implement visual elements.',
    dayInLifeList: [
      'Write HTML, CSS, and JavaScript code',
      'Test websites across different browsers and devices',
      'Optimize website speed and performance',
      'Collaborate with designers to implement UI/UX',
      'Maintain and update existing websites'
    ],
    onetCode: '15-1254.00',
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Plan and carry out security measures to protect an organization\'s computer networks and systems. Monitor networks for security breaches and investigate when one occurs.',
    avgSalary: '$102,600',
    salaryRange: '$60,000 - $165,000',
    requirements: "Bachelor's degree in Cybersecurity, Information Technology, or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (32%)',
    dayInLife: 'Cybersecurity analysts monitor networks for threats, investigate security breaches, implement security measures, and educate staff on security best practices.',
    dayInLifeList: [
      'Monitor networks for security threats',
      'Investigate and respond to security incidents',
      'Implement firewalls and encryption programs',
      'Conduct security audits and risk assessments',
      'Train employees on security protocols'
    ],
    onetCode: '15-1212.00',
  },
  {
    title: 'UX Designer',
    description: 'Create engaging and effective user experiences for websites, applications, and other digital products. They research user needs and design intuitive interfaces.',
    avgSalary: '$85,490',
    salaryRange: '$55,000 - $135,000',
    requirements: "Bachelor's degree in Design, Human-Computer Interaction, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (8%)',
    dayInLife: 'UX designers conduct user research, create wireframes and prototypes, run usability tests, and collaborate with developers to implement designs.',
    dayInLifeList: [
      'Research user needs and behaviors',
      'Create wireframes and interactive prototypes',
      'Conduct usability testing sessions',
      'Design user interfaces and navigation flows',
      'Collaborate with developers and product managers'
    ],
    onetCode: '15-1255.00',
  },

  // Education Careers
  {
    title: 'High School Teacher',
    description: 'Educate students in one or more subjects such as English, mathematics, or history. They prepare lessons, teach students, assess progress, and help students develop critical thinking skills.',
    avgSalary: '$62,870',
    salaryRange: '$45,000 - $100,000',
    requirements: "Bachelor's degree and state teaching certification",
    education: "Bachelor's degree",
    growth: 'Average (4%)',
    dayInLife: 'High school teachers plan engaging lessons, deliver instruction, grade assignments, communicate with parents, and participate in school activities.',
    dayInLifeList: [
      'Develop lesson plans aligned with curriculum standards',
      'Teach classes and lead discussions',
      'Grade assignments, tests, and projects',
      'Communicate with parents about student progress',
      'Participate in faculty meetings and professional development'
    ],
    onetCode: '25-2031.00',
  },
  {
    title: 'Elementary School Teacher',
    description: 'Prepare younger students for future schooling by teaching basic subjects such as math and reading. They create lesson plans, assess student progress, and foster a positive learning environment.',
    avgSalary: '$60,660',
    salaryRange: '$42,000 - $95,000',
    requirements: "Bachelor's degree in Elementary Education and state certification",
    education: "Bachelor's degree",
    growth: 'Average (4%)',
    dayInLife: 'Elementary teachers create engaging lessons across multiple subjects, manage classroom behavior, assess student learning, and communicate regularly with parents.',
    dayInLifeList: [
      'Teach reading, writing, math, and other subjects',
      'Create hands-on learning activities',
      'Manage classroom behavior and routines',
      'Assess student learning and progress',
      'Collaborate with parents and support staff'
    ],
    onetCode: '25-2021.00',
  },
  {
    title: 'School Counselor',
    description: 'Help students develop academic and social skills needed for success. They also help students with college and career planning and address behavioral or personal issues.',
    avgSalary: '$60,510',
    salaryRange: '$39,000 - $95,000',
    requirements: "Master's degree in School Counseling and state certification",
    education: "Master's degree",
    growth: 'Faster than average (10%)',
    dayInLife: 'School counselors meet with students individually and in groups, coordinate testing, develop intervention plans, and collaborate with teachers and parents.',
    dayInLifeList: [
      'Provide individual and group counseling sessions',
      'Help students with college and career planning',
      'Coordinate standardized testing',
      'Develop intervention plans for struggling students',
      'Collaborate with teachers, parents, and administrators'
    ],
    onetCode: '21-1012.00',
  },
  {
    title: 'Special Education Teacher',
    description: 'Work with students who have learning, mental, emotional, or physical disabilities. They adapt general education lessons and teach various subjects to students with mild to moderate disabilities.',
    avgSalary: '$61,500',
    salaryRange: '$43,000 - $95,000',
    requirements: "Bachelor's degree and special education certification",
    education: "Bachelor's degree",
    growth: 'Average (3%)',
    dayInLife: 'Special education teachers create individualized education programs (IEPs), adapt curriculum, work one-on-one with students, and collaborate with parents and specialists.',
    dayInLifeList: [
      'Develop individualized education programs (IEPs)',
      'Adapt lessons to meet diverse learning needs',
      'Provide one-on-one instruction and support',
      'Track student progress toward goals',
      'Collaborate with parents, therapists, and support staff'
    ],
    onetCode: '25-2052.00',
  },
  {
    title: 'Instructional Designer',
    description: 'Design and develop instructional materials, online courses, and training programs. They apply learning theories and technology to create effective educational experiences.',
    avgSalary: '$68,340',
    salaryRange: '$45,000 - $105,000',
    requirements: "Bachelor's or Master's degree in Instructional Design, Education, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (6%)',
    dayInLife: 'Instructional designers analyze learning needs, design course materials, create e-learning modules, and evaluate training effectiveness.',
    dayInLifeList: [
      'Analyze learning needs and objectives',
      'Design course curriculum and learning activities',
      'Create e-learning modules and multimedia content',
      'Collaborate with subject matter experts',
      'Evaluate and improve training programs'
    ],
    onetCode: '25-9031.00',
  },

  // Business & Finance Careers
  {
    title: 'Financial Analyst',
    description: 'Provide guidance to businesses and individuals making investment decisions. They assess the performance of stocks, bonds, and other types of investments.',
    avgSalary: '$83,660',
    salaryRange: '$50,000 - $155,000',
    requirements: "Bachelor's degree in Finance, Economics, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'Financial analysts research economic trends, analyze financial statements, create financial models, and present investment recommendations.',
    dayInLifeList: [
      'Research economic and business trends',
      'Analyze financial statements and data',
      'Create financial models and projections',
      'Present investment recommendations',
      'Monitor portfolio performance'
    ],
    onetCode: '13-2051.00',
  },
  {
    title: 'Accountant',
    description: 'Prepare and examine financial records. They ensure records are accurate and that taxes are paid properly and on time.',
    avgSalary: '$77,250',
    salaryRange: '$48,000 - $128,000',
    requirements: "Bachelor's degree in Accounting; CPA certification for many positions",
    education: "Bachelor's degree",
    growth: 'Average (4%)',
    dayInLife: 'Accountants maintain financial records, prepare tax returns, conduct audits, analyze financial data, and ensure compliance with regulations.',
    dayInLifeList: [
      'Prepare and review financial statements',
      'Ensure accuracy of financial records',
      'Prepare tax returns and ensure tax compliance',
      'Conduct internal audits',
      'Provide financial advice to management'
    ],
    onetCode: '13-2011.00',
  },
  {
    title: 'Marketing Manager',
    description: 'Plan programs to generate interest in products or services. They work with art directors, advertising sales agents, and financial staff members.',
    avgSalary: '$141,490',
    salaryRange: '$77,000 - $208,000',
    requirements: "Bachelor's degree in Marketing, Business, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (10%)',
    dayInLife: 'Marketing managers develop marketing strategies, manage campaigns, analyze market trends, oversee creative teams, and measure campaign effectiveness.',
    dayInLifeList: [
      'Develop marketing strategies and campaigns',
      'Manage marketing budgets and timelines',
      'Analyze market trends and consumer behavior',
      'Oversee creative development of ads and content',
      'Measure and report on campaign performance'
    ],
    onetCode: '11-2021.00',
  },
  {
    title: 'Human Resources Manager',
    description: 'Plan, coordinate, and direct the administrative functions of an organization. They oversee recruiting, interviewing, and hiring of new staff.',
    avgSalary: '$126,230',
    salaryRange: '$75,000 - $205,000',
    requirements: "Bachelor's degree in Human Resources, Business, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'HR managers recruit talent, manage employee relations, ensure compliance with labor laws, develop training programs, and handle compensation and benefits.',
    dayInLifeList: [
      'Oversee recruitment and hiring processes',
      'Manage employee relations and resolve conflicts',
      'Ensure compliance with labor laws',
      'Develop compensation and benefits programs',
      'Coordinate employee training and development'
    ],
    onetCode: '11-3121.00',
  },
  {
    title: 'Business Analyst',
    description: 'Use data analysis to assess processes, determine requirements, and deliver data-driven recommendations and reports to executives and stakeholders.',
    avgSalary: '$82,280',
    salaryRange: '$52,000 - $130,000',
    requirements: "Bachelor's degree in Business, Finance, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (11%)',
    dayInLife: 'Business analysts gather and document requirements, analyze business processes, identify improvement opportunities, and facilitate communication between stakeholders.',
    dayInLifeList: [
      'Gather and document business requirements',
      'Analyze business processes and workflows',
      'Identify opportunities for improvement',
      'Create reports and presentations for stakeholders',
      'Facilitate communication between teams'
    ],
    onetCode: '13-1111.00',
  },

  // Creative & Media Careers
  {
    title: 'Graphic Designer',
    description: 'Create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers.',
    avgSalary: '$53,380',
    salaryRange: '$33,000 - $89,000',
    requirements: "Bachelor's degree in Graphic Design or related field",
    education: "Bachelor's degree",
    growth: 'Little or no change (3%)',
    dayInLife: 'Graphic designers meet with clients, develop design concepts, create layouts and visual elements, and prepare designs for print or digital media.',
    dayInLifeList: [
      'Meet with clients to understand project requirements',
      'Develop creative concepts and design solutions',
      'Create visual elements using design software',
      'Present designs to clients for feedback',
      'Prepare final designs for production'
    ],
    onetCode: '27-1024.00',
  },
  {
    title: 'Content Writer',
    description: 'Create engaging content for various platforms including websites, blogs, social media, and marketing materials. They research topics and write clear, compelling copy.',
    avgSalary: '$49,650',
    salaryRange: '$32,000 - $80,000',
    requirements: "Bachelor's degree in English, Journalism, Communications, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'Content writers research topics, write articles and blog posts, optimize content for SEO, collaborate with marketing teams, and revise based on feedback.',
    dayInLifeList: [
      'Research topics and gather information',
      'Write clear, engaging content for various platforms',
      'Optimize content for search engines (SEO)',
      'Collaborate with marketing and design teams',
      'Edit and revise content based on feedback'
    ],
    onetCode: '27-3043.00',
  },
  {
    title: 'Social Media Manager',
    description: 'Plan, implement, and monitor company\'s social media strategy to increase brand awareness, improve marketing efforts, and increase sales.',
    avgSalary: '$62,910',
    salaryRange: '$40,000 - $100,000',
    requirements: "Bachelor's degree in Marketing, Communications, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (10%)',
    dayInLife: 'Social media managers create content calendars, post updates, engage with followers, analyze metrics, run advertising campaigns, and stay current with trends.',
    dayInLifeList: [
      'Develop and execute social media strategies',
      'Create and schedule engaging content',
      'Monitor and respond to comments and messages',
      'Analyze social media metrics and performance',
      'Manage social media advertising campaigns'
    ],
    onetCode: '11-2021.00',
  },
  {
    title: 'Video Editor',
    description: 'Manipulate and rearrange video shots to create a finished product. They work closely with directors and producers to achieve the desired final product.',
    avgSalary: '$62,680',
    salaryRange: '$35,000 - $115,000',
    requirements: "Bachelor's degree in Film, Broadcasting, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (7%)',
    dayInLife: 'Video editors review footage, select the best shots, arrange clips in sequence, add effects and transitions, sync audio, and export final videos.',
    dayInLifeList: [
      'Review and organize raw footage',
      'Select and arrange best shots into sequences',
      'Add effects, graphics, and transitions',
      'Sync and mix audio tracks',
      'Color correct and finalize video exports'
    ],
    onetCode: '27-4032.00',
  },
  {
    title: 'Art Director',
    description: 'Responsible for the visual style and images in magazines, newspapers, product packaging, and movie and television productions. They create the overall design and direct others who develop artwork and layouts.',
    avgSalary: '$100,890',
    salaryRange: '$58,000 - $175,000',
    requirements: "Bachelor's degree in Art, Design, or related field",
    education: "Bachelor's degree",
    growth: 'Little or no change (2%)',
    dayInLife: 'Art directors develop design concepts, review and approve designs, collaborate with creative teams, manage budgets, and ensure brand consistency.',
    dayInLifeList: [
      'Develop visual style and creative concepts',
      'Lead and direct creative teams',
      'Review and approve designs and layouts',
      'Manage project budgets and timelines',
      'Present concepts to clients or stakeholders'
    ],
    onetCode: '27-1011.00',
  },

  // Engineering Careers
  {
    title: 'Mechanical Engineer',
    description: 'Design, develop, build, and test mechanical and thermal sensors and devices. They work on power-producing machines and power-using machines.',
    avgSalary: '$95,300',
    salaryRange: '$61,000 - $141,000',
    requirements: "Bachelor's degree in Mechanical Engineering",
    education: "Bachelor's degree",
    growth: 'Average (2%)',
    dayInLife: 'Mechanical engineers analyze problems, design solutions using CAD software, conduct tests, oversee manufacturing processes, and ensure product quality.',
    dayInLifeList: [
      'Analyze mechanical systems and identify problems',
      'Design solutions using CAD software',
      'Build and test prototypes',
      'Oversee manufacturing and installation',
      'Ensure products meet safety and efficiency standards'
    ],
    onetCode: '17-2141.00',
  },
  {
    title: 'Electrical Engineer',
    description: 'Design, develop, test, and supervise the manufacture of electrical equipment. This includes electric motors, radar and navigation systems, communications systems, and power generation equipment.',
    avgSalary: '$103,390',
    salaryRange: '$65,000 - $159,000',
    requirements: "Bachelor's degree in Electrical Engineering",
    education: "Bachelor's degree",
    growth: 'Faster than average (7%)',
    dayInLife: 'Electrical engineers design electrical systems, create technical drawings, test equipment, troubleshoot problems, and collaborate with other engineers.',
    dayInLifeList: [
      'Design electrical systems and components',
      'Create detailed technical drawings and specifications',
      'Test electrical equipment and systems',
      'Troubleshoot and solve electrical problems',
      'Collaborate with project managers and other engineers'
    ],
    onetCode: '17-2071.00',
  },
  {
    title: 'Civil Engineer',
    description: 'Design, build, supervise, operate, and maintain construction projects and systems in the public and private sector, including roads, buildings, airports, tunnels, and systems for water supply.',
    avgSalary: '$88,050',
    salaryRange: '$58,000 - $133,000',
    requirements: "Bachelor's degree in Civil Engineering",
    education: "Bachelor's degree",
    growth: 'Faster than average (8%)',
    dayInLife: 'Civil engineers analyze survey reports, design infrastructure projects, manage construction, ensure regulatory compliance, and oversee maintenance.',
    dayInLifeList: [
      'Analyze survey reports and land data',
      'Design infrastructure projects using CAD software',
      'Manage construction projects and budgets',
      'Ensure compliance with building codes',
      'Inspect and maintain existing structures'
    ],
    onetCode: '17-2051.00',
  },
  {
    title: 'Biomedical Engineer',
    description: 'Combine engineering principles with medical sciences to design and create equipment, devices, computer systems, and software used in healthcare.',
    avgSalary: '$97,410',
    salaryRange: '$60,000 - $148,000',
    requirements: "Bachelor's degree in Biomedical Engineering",
    education: "Bachelor's degree",
    growth: 'Faster than average (6%)',
    dayInLife: 'Biomedical engineers design medical devices, develop software for medical applications, test equipment, and ensure devices meet safety standards.',
    dayInLifeList: [
      'Design medical equipment and devices',
      'Develop software for medical applications',
      'Test and evaluate medical equipment',
      'Ensure devices meet safety regulations',
      'Train clinicians on equipment use'
    ],
    onetCode: '17-2031.00',
  },
  {
    title: 'Chemical Engineer',
    description: 'Apply the principles of chemistry, biology, physics, and math to solve problems involving the production or use of chemicals, fuel, drugs, food, and many other products.',
    avgSalary: '$105,550',
    salaryRange: '$68,000 - $168,000',
    requirements: "Bachelor's degree in Chemical Engineering",
    education: "Bachelor's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'Chemical engineers design chemical manufacturing processes, conduct tests, troubleshoot problems, evaluate equipment, and ensure safety compliance.',
    dayInLifeList: [
      'Design chemical manufacturing processes',
      'Conduct tests and analyze results',
      'Troubleshoot production problems',
      'Evaluate equipment and processes for efficiency',
      'Ensure compliance with safety regulations'
    ],
    onetCode: '17-2041.00',
  },

  // Social Services & Counseling
  {
    title: 'Social Worker',
    description: 'Help people solve and cope with problems in their everyday lives. Clinical social workers diagnose and treat mental, behavioral, and emotional issues.',
    avgSalary: '$51,760',
    salaryRange: '$35,000 - $82,000',
    requirements: "Bachelor's degree in Social Work (BSW); Master's for clinical positions",
    education: "Bachelor's degree",
    growth: 'Much faster than average (12%)',
    dayInLife: 'Social workers assess client needs, develop service plans, connect clients with resources, provide counseling, and advocate for client welfare.',
    dayInLifeList: [
      'Assess client needs and situations',
      'Develop service plans and set goals',
      'Connect clients with community resources',
      'Provide counseling and support',
      'Advocate for client rights and welfare'
    ],
    onetCode: '21-1021.00',
  },
  {
    title: 'Mental Health Counselor',
    description: 'Provide treatment to individuals, families, couples, or groups who are dealing with issues affecting their mental health and wellbeing.',
    avgSalary: '$48,520',
    salaryRange: '$33,000 - $78,000',
    requirements: "Master's degree in Clinical Mental Health Counseling or related field",
    education: "Master's degree",
    growth: 'Much faster than average (22%)',
    dayInLife: 'Mental health counselors conduct therapy sessions, assess mental health conditions, develop treatment plans, and maintain detailed client records.',
    dayInLifeList: [
      'Conduct individual and group therapy sessions',
      'Assess and diagnose mental health conditions',
      'Develop personalized treatment plans',
      'Teach coping strategies and life skills',
      'Maintain confidential client records'
    ],
    onetCode: '21-1014.00',
  },
  {
    title: 'Marriage and Family Therapist',
    description: 'Help people manage and overcome problems with family and other relationships. They work with individuals, couples, and families.',
    avgSalary: '$51,340',
    salaryRange: '$35,000 - $87,000',
    requirements: "Master's degree in Marriage and Family Therapy",
    education: "Master's degree",
    growth: 'Much faster than average (15%)',
    dayInLife: 'Marriage and family therapists conduct therapy sessions, assess relationship dynamics, develop treatment plans, and help clients improve communication.',
    dayInLifeList: [
      'Conduct couples and family therapy sessions',
      'Assess relationship patterns and dynamics',
      'Develop treatment strategies',
      'Teach communication and conflict resolution skills',
      'Collaborate with other healthcare providers'
    ],
    onetCode: '21-1013.00',
  },
  {
    title: 'School Psychologist',
    description: 'Apply psychological principles and techniques to educational settings. They help children and youth succeed academically, socially, behaviorally, and emotionally.',
    avgSalary: '$81,500',
    salaryRange: '$52,000 - $125,000',
    requirements: "Specialist degree (Ed.S.) or Doctorate in School Psychology",
    education: "Doctoral degree",
    growth: 'Faster than average (8%)',
    dayInLife: 'School psychologists conduct assessments, provide counseling, consult with teachers and parents, and develop intervention plans for students.',
    dayInLifeList: [
      'Conduct psychological and academic assessments',
      'Provide individual and group counseling',
      'Consult with teachers and parents',
      'Develop intervention plans for students',
      'Support crisis intervention and mental health initiatives'
    ],
    onetCode: '19-3034.00',
  },

  // Science & Research
  {
    title: 'Research Scientist',
    description: 'Plan and conduct experiments and investigations in a range of scientific areas. They analyze data, present findings, and contribute to scientific knowledge.',
    avgSalary: '$89,910',
    salaryRange: '$52,000 - $160,000',
    requirements: "Doctorate degree in relevant scientific field",
    education: "Doctoral degree",
    growth: 'Faster than average (7%)',
    dayInLife: 'Research scientists design experiments, conduct tests, analyze data, write research papers, and present findings at conferences.',
    dayInLifeList: [
      'Design and conduct scientific experiments',
      'Collect and analyze research data',
      'Write research papers and grant proposals',
      'Present findings at conferences',
      'Collaborate with other researchers'
    ],
    onetCode: '19-1029.00',
  },
  {
    title: 'Environmental Scientist',
    description: 'Use their knowledge of the natural sciences to protect the environment and human health. They clean up polluted areas, advise policymakers, or work with industry.',
    avgSalary: '$76,530',
    salaryRange: '$45,000 - $129,000',
    requirements: "Bachelor's degree in Environmental Science or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (8%)',
    dayInLife: 'Environmental scientists conduct field research, analyze environmental data, develop conservation plans, and ensure compliance with regulations.',
    dayInLifeList: [
      'Conduct environmental field studies',
      'Analyze soil, water, and air samples',
      'Develop plans to prevent or fix environmental problems',
      'Ensure compliance with environmental regulations',
      'Present findings to policymakers and stakeholders'
    ],
    onetCode: '19-2041.00',
  },
  {
    title: 'Biologist',
    description: 'Study living organisms and their relationships to their environment. They perform research to gain a better understanding of fundamental life processes.',
    avgSalary: '$84,640',
    salaryRange: '$48,000 - $140,000',
    requirements: "Bachelor's degree in Biology; advanced degree for research positions",
    education: "Bachelor's degree",
    growth: 'Average (5%)',
    dayInLife: 'Biologists conduct experiments, collect and analyze specimens, use lab equipment and technology, and document findings in scientific papers.',
    dayInLifeList: [
      'Conduct laboratory and field research',
      'Collect and analyze biological specimens',
      'Use microscopes and other lab equipment',
      'Record and interpret research data',
      'Write scientific papers and reports'
    ],
    onetCode: '19-1029.01',
  },

  // Legal & Public Service
  {
    title: 'Lawyer',
    description: 'Advise and represent individuals, businesses, and government agencies on legal issues and disputes. They interpret laws, rulings, and regulations.',
    avgSalary: '$126,930',
    salaryRange: '$63,000 - $208,000',
    requirements: 'Juris Doctor (J.D.) degree and state bar license',
    education: 'Doctoral degree',
    growth: 'Faster than average (10%)',
    dayInLife: 'Lawyers research cases, draft legal documents, represent clients in court, negotiate settlements, and provide legal advice.',
    dayInLifeList: [
      'Research and analyze legal issues',
      'Draft legal documents and contracts',
      'Represent clients in court proceedings',
      'Negotiate settlements on behalf of clients',
      'Provide legal advice and counsel'
    ],
    onetCode: '23-1011.00',
  },
  {
    title: 'Paralegal',
    description: 'Assist lawyers by investigating facts, preparing legal documents, or researching legal precedent. Conduct research to support a legal proceeding.',
    avgSalary: '$56,230',
    salaryRange: '$37,000 - $90,000',
    requirements: "Associate's degree or certificate in Paralegal Studies",
    education: "Associate's degree",
    growth: 'Faster than average (12%)',
    dayInLife: 'Paralegals conduct legal research, draft documents, organize case files, interview clients, and assist lawyers in trial preparation.',
    dayInLifeList: [
      'Conduct legal research and gather evidence',
      'Draft legal documents and correspondence',
      'Organize and maintain case files',
      'Interview clients and witnesses',
      'Assist with trial preparation'
    ],
    onetCode: '23-2011.00',
  },
  {
    title: 'Police Officer',
    description: 'Protect lives and property. Duties include patrolling assigned areas, responding to calls for service, enforcing laws, and conducting investigations.',
    avgSalary: '$67,290',
    salaryRange: '$42,000 - $109,000',
    requirements: 'High school diploma and police academy training',
    education: 'High school diploma',
    growth: 'Average (3%)',
    dayInLife: 'Police officers patrol communities, respond to emergency calls, conduct investigations, write reports, and testify in court.',
    dayInLifeList: [
      'Patrol assigned areas in vehicles or on foot',
      'Respond to emergency and non-emergency calls',
      'Conduct investigations and gather evidence',
      'Write detailed incident reports',
      'Testify in court when required'
    ],
    onetCode: '33-3051.00',
  },

  // Skilled Trades
  {
    title: 'Electrician',
    description: 'Install, maintain, and repair electrical power, communications, lighting, and control systems in homes, businesses, and factories.',
    avgSalary: '$60,040',
    salaryRange: '$37,000 - $99,000',
    requirements: 'High school diploma and apprenticeship',
    education: 'High school diploma',
    growth: 'Faster than average (9%)',
    dayInLife: 'Electricians read blueprints, install wiring and fixtures, test electrical systems, troubleshoot problems, and ensure code compliance.',
    dayInLifeList: [
      'Read and interpret blueprints and diagrams',
      'Install electrical wiring and fixtures',
      'Test electrical systems using tools',
      'Troubleshoot and repair electrical problems',
      'Ensure work meets electrical codes'
    ],
    onetCode: '47-2111.00',
  },
  {
    title: 'Plumber',
    description: 'Install and repair pipes that carry liquids or gases to, from, and within businesses, homes, and factories.',
    avgSalary: '$59,880',
    salaryRange: '$37,000 - $99,000',
    requirements: 'High school diploma and apprenticeship',
    education: 'High school diploma',
    growth: 'Average (5%)',
    dayInLife: 'Plumbers install and repair pipes, read blueprints, inspect plumbing systems, troubleshoot issues, and ensure code compliance.',
    dayInLifeList: [
      'Install and repair water and gas pipes',
      'Read blueprints and building codes',
      'Inspect plumbing systems and equipment',
      'Troubleshoot and diagnose plumbing issues',
      'Ensure installations meet regulations'
    ],
    onetCode: '47-2152.00',
  },
  {
    title: 'HVAC Technician',
    description: 'Install, maintain, and repair heating, ventilation, air conditioning, and refrigeration systems that control the temperature and air quality in buildings.',
    avgSalary: '$51,390',
    salaryRange: '$32,000 - $80,000',
    requirements: 'Postsecondary education or apprenticeship',
    education: 'Certificate program',
    growth: 'Average (5%)',
    dayInLife: 'HVAC technicians install systems, perform maintenance, diagnose problems, repair equipment, and ensure energy efficiency.',
    dayInLifeList: [
      'Install heating and cooling systems',
      'Perform routine maintenance and inspections',
      'Diagnose and repair system malfunctions',
      'Test system performance and safety',
      'Advise customers on energy efficiency'
    ],
    onetCode: '49-9021.00',
  },

  // Hospitality & Service
  {
    title: 'Chef',
    description: 'Direct the preparation, seasoning, and cooking of food. They may create recipes, oversee kitchen staff, and ensure food quality.',
    avgSalary: '$56,520',
    salaryRange: '$32,000 - $90,000',
    requirements: 'Culinary school or on-the-job training',
    education: 'Certificate program',
    growth: 'Much faster than average (15%)',
    dayInLife: 'Chefs plan menus, prepare dishes, manage kitchen staff, order supplies, and ensure food safety and quality standards.',
    dayInLifeList: [
      'Plan menus and create new recipes',
      'Prepare and cook dishes',
      'Supervise kitchen staff and coordinate activities',
      'Order food supplies and equipment',
      'Ensure food safety and sanitation standards'
    ],
    onetCode: '35-1011.00',
  },
  {
    title: 'Hotel Manager',
    description: 'Ensure that guests have a pleasant experience at a hotel or other types of establishment with accommodations. They also ensure that the establishment is run efficiently and profitably.',
    avgSalary: '$59,430',
    salaryRange: '$35,000 - $105,000',
    requirements: "Bachelor's degree in Hospitality or Business",
    education: "Bachelor's degree",
    growth: 'Average (1%)',
    dayInLife: 'Hotel managers oversee operations, manage staff, handle guest concerns, monitor budgets, and ensure quality service standards.',
    dayInLifeList: [
      'Oversee daily hotel operations',
      'Manage and train hotel staff',
      'Handle guest complaints and concerns',
      'Monitor budgets and financial performance',
      'Ensure quality service standards are met'
    ],
    onetCode: '11-9081.00',
  },
  {
    title: 'Event Planner',
    description: 'Organize and coordinate meetings, weddings, and other events. They choose locations, arrange services, and monitor event budgets.',
    avgSalary: '$51,560',
    salaryRange: '$30,000 - $87,000',
    requirements: "Bachelor's degree in Hospitality, Communications, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (8%)',
    dayInLife: 'Event planners meet with clients, choose venues, coordinate vendors, manage budgets, and oversee event execution.',
    dayInLifeList: [
      'Meet with clients to understand event needs',
      'Choose and book event venues',
      'Coordinate with vendors and suppliers',
      'Manage event budgets and timelines',
      'Oversee event setup and execution'
    ],
    onetCode: '13-1121.00',
  },

  // Architecture & Construction
  {
    title: 'Architect',
    description: 'Plan and design buildings and other structures. They work with clients to determine requirements, create designs, and oversee construction.',
    avgSalary: '$82,840',
    salaryRange: '$52,000 - $129,000',
    requirements: "Bachelor's or Master's degree in Architecture and state license",
    education: "Bachelor's degree",
    growth: 'Average (3%)',
    dayInLife: 'Architects meet with clients, create design concepts, draft plans using CAD software, ensure code compliance, and oversee construction.',
    dayInLifeList: [
      'Meet with clients to determine project requirements',
      'Create design concepts and drawings',
      'Use CAD software to draft detailed plans',
      'Ensure designs comply with building codes',
      'Oversee construction to ensure design is followed'
    ],
    onetCode: '17-1011.00',
  },
  {
    title: 'Construction Manager',
    description: 'Plan, coordinate, budget, and supervise construction projects from start to finish. They work closely with architects, engineers, and contractors.',
    avgSalary: '$98,890',
    salaryRange: '$60,000 - $163,000',
    requirements: "Bachelor's degree in Construction Management or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (8%)',
    dayInLife: 'Construction managers develop project plans, manage budgets, coordinate workers, ensure safety compliance, and resolve construction issues.',
    dayInLifeList: [
      'Develop construction project plans and schedules',
      'Manage project budgets and costs',
      'Coordinate and supervise construction workers',
      'Ensure compliance with safety regulations',
      'Resolve problems and conflicts on site'
    ],
    onetCode: '11-9021.00',
  },

  // Agriculture & Environment
  {
    title: 'Agricultural Engineer',
    description: 'Solve problems concerning power supplies, machine efficiency, the use of structures and facilities, pollution, and environmental issues.',
    avgSalary: '$84,410',
    salaryRange: '$55,000 - $126,000',
    requirements: "Bachelor's degree in Agricultural Engineering",
    education: "Bachelor's degree",
    growth: 'Average (5%)',
    dayInLife: 'Agricultural engineers design agricultural machinery, develop crop storage structures, plan irrigation systems, and find ways to improve farming efficiency.',
    dayInLifeList: [
      'Design agricultural machinery and equipment',
      'Develop systems for crop storage and processing',
      'Plan irrigation and drainage systems',
      'Test and modify equipment',
      'Work to improve sustainability and efficiency'
    ],
    onetCode: '17-2021.00',
  },
  {
    title: 'Veterinarian',
    description: 'Care for the health of animals and work to protect public health. They diagnose, treat, and research medical conditions and diseases of pets, livestock, and other animals.',
    avgSalary: '$100,370',
    salaryRange: '$62,000 - $165,000',
    requirements: 'Doctor of Veterinary Medicine (D.V.M. or V.M.D.) degree and state license',
    education: 'Doctoral degree',
    growth: 'Much faster than average (19%)',
    dayInLife: 'Veterinarians examine animals, diagnose illnesses, treat injuries, perform surgery, prescribe medications, and educate pet owners.',
    dayInLifeList: [
      'Examine animals and diagnose health issues',
      'Treat injuries and illnesses',
      'Perform surgical procedures',
      'Prescribe medications',
      'Educate animal owners about care'
    ],
    onetCode: '29-1131.00',
  },

  // Transportation & Logistics
  {
    title: 'Logistics Manager',
    description: 'Plan, direct, or coordinate the distribution and movement of products. They ensure efficiency in the supply chain.',
    avgSalary: '$77,030',
    salaryRange: '$48,000 - $129,000',
    requirements: "Bachelor's degree in Business, Supply Chain, or related field",
    education: "Bachelor's degree",
    growth: 'Much faster than average (28%)',
    dayInLife: 'Logistics managers coordinate shipments, manage inventory, negotiate with suppliers, analyze data, and optimize supply chain processes.',
    dayInLifeList: [
      'Coordinate product shipments and deliveries',
      'Manage warehouse and inventory operations',
      'Negotiate contracts with suppliers and carriers',
      'Analyze logistics data to improve efficiency',
      'Ensure timely delivery of products'
    ],
    onetCode: '11-3071.00',
  },
  {
    title: 'Commercial Pilot',
    description: 'Fly and navigate airplanes or helicopters. Commercial pilots are involved in unscheduled flight activities, such as aerial application, charter flights, and rescue operations.',
    avgSalary: '$99,640',
    salaryRange: '$50,000 - $205,000',
    requirements: 'Commercial pilot license from FAA',
    education: 'High school diploma',
    growth: 'Faster than average (13%)',
    dayInLife: 'Commercial pilots plan flights, check aircraft, navigate routes, communicate with air traffic control, and ensure passenger safety.',
    dayInLifeList: [
      'Plan flight routes and check weather',
      'Perform pre-flight aircraft inspections',
      'Navigate aircraft using instruments',
      'Communicate with air traffic control',
      'Ensure passenger and cargo safety'
    ],
    onetCode: '53-2012.00',
  },

  // Real Estate & Property
  {
    title: 'Real Estate Agent',
    description: 'Help clients buy, sell, and rent properties. They advise clients about market conditions, conduct walkthroughs, and negotiate purchase terms.',
    avgSalary: '$51,220',
    salaryRange: '$28,000 - $111,000',
    requirements: 'High school diploma and state real estate license',
    education: 'High school diploma',
    growth: 'Average (5%)',
    dayInLife: 'Real estate agents show properties, market listings, negotiate offers, coordinate inspections, and guide clients through transactions.',
    dayInLifeList: [
      'Show properties to prospective buyers',
      'Market and advertise property listings',
      'Negotiate purchase offers and terms',
      'Coordinate property inspections and appraisals',
      'Guide clients through closing process'
    ],
    onetCode: '41-9021.00',
  },

  // Nonprofit & Community Service
  {
    title: 'Nonprofit Program Manager',
    description: 'Plan, direct, and coordinate programs for nonprofit organizations. They manage budgets, oversee staff, and work to fulfill the organization\'s mission.',
    avgSalary: '$69,600',
    salaryRange: '$45,000 - $115,000',
    requirements: "Bachelor's degree in Nonprofit Management, Social Work, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (12%)',
    dayInLife: 'Nonprofit program managers develop programs, manage budgets, coordinate volunteers, build partnerships, and measure program outcomes.',
    dayInLifeList: [
      'Develop and implement program strategies',
      'Manage program budgets and resources',
      'Recruit and coordinate volunteers',
      'Build partnerships with community organizations',
      'Track and report on program outcomes'
    ],
    onetCode: '11-9151.00',
  },
  {
    title: 'Youth Development Leader',
    description: 'Design and lead programs that help young people build leadership, teamwork, and life skills. Work in schools, community centers, and youth organizations.',
    avgSalary: '$48,320',
    salaryRange: '$32,000 - $72,000',
    requirements: "Bachelor's degree in Education, Social Work, or related field",
    education: "Bachelor's degree",
    growth: 'Faster than average (11%)',
    dayInLife: 'Youth development leaders plan activities, mentor young people, coordinate events, collaborate with parents, and create safe learning environments.',
    dayInLifeList: [
      'Design and lead youth development programs',
      'Mentor and coach young people',
      'Organize events and activities',
      'Collaborate with parents and community partners',
      'Create safe and supportive learning environments'
    ],
    onetCode: '21-1093.00',
  },

  // Additional High-Demand Careers
  {
    title: 'Occupational Therapist',
    description: 'Treat injured, ill, or disabled patients through the therapeutic use of everyday activities. Help patients develop, recover, improve, and maintain the skills needed for daily living.',
    avgSalary: '$85,570',
    salaryRange: '$58,000 - $120,000',
    requirements: "Master's degree in Occupational Therapy",
    education: "Master's degree",
    growth: 'Much faster than average (14%)',
    dayInLife: 'Occupational therapists assess patient needs, develop treatment plans, teach adaptive techniques, and help patients regain independence.',
    dayInLifeList: [
      'Assess patient abilities and limitations',
      'Develop personalized treatment plans',
      'Teach patients how to use adaptive equipment',
      'Help patients develop daily living skills',
      'Track and document patient progress'
    ],
    onetCode: '29-1122.00',
  },
  {
    title: 'Speech-Language Pathologist',
    description: 'Assess, diagnose, treat, and help prevent communication and swallowing disorders in children and adults.',
    avgSalary: '$80,480',
    salaryRange: '$53,000 - $122,000',
    requirements: "Master's degree in Speech-Language Pathology",
    education: "Master's degree",
    growth: 'Much faster than average (21%)',
    dayInLife: 'Speech-language pathologists evaluate speech disorders, develop treatment plans, provide therapy, and work with families and educators.',
    dayInLifeList: [
      'Evaluate and diagnose speech and language disorders',
      'Develop individualized treatment plans',
      'Provide therapy to improve communication',
      'Teach alternative communication methods',
      'Collaborate with families and educators'
    ],
    onetCode: '29-1127.00',
  },
  {
    title: 'Dental Hygienist',
    description: 'Clean teeth, examine patients for signs of oral diseases, and provide preventive dental care. They also educate patients on ways to improve and maintain oral health.',
    avgSalary: '$77,810',
    salaryRange: '$55,000 - $104,000',
    requirements: "Associate's degree in Dental Hygiene and state license",
    education: "Associate's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'Dental hygienists clean teeth, take x-rays, examine patients for oral diseases, apply preventive materials, and educate patients on oral health.',
    dayInLifeList: [
      'Clean and polish patients\' teeth',
      'Take and develop dental x-rays',
      'Examine patients for oral diseases',
      'Apply fluoride and sealants',
      'Educate patients on oral hygiene'
    ],
    onetCode: '29-1292.00',
  },
  {
    title: 'Radiologic Technologist',
    description: 'Perform diagnostic imaging examinations, such as x-rays, on patients. Some specialize in more advanced imaging technology such as CT scans or MRIs.',
    avgSalary: '$63,710',
    salaryRange: '$46,000 - $92,000',
    requirements: "Associate's degree in Radiography and state license/certification",
    education: "Associate's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'Radiologic technologists prepare patients for imaging, operate x-ray equipment, position patients correctly, and ensure image quality.',
    dayInLifeList: [
      'Prepare patients for imaging procedures',
      'Operate x-ray and imaging equipment',
      'Position patients to get best images',
      'Follow safety procedures to minimize radiation',
      'Work with physicians to review images'
    ],
    onetCode: '29-2034.00',
  },
  {
    title: 'Respiratory Therapist',
    description: 'Care for patients who have trouble breathing. They evaluate, treat, and care for patients with breathing or cardiopulmonary disorders.',
    avgSalary: '$62,810',
    salaryRange: '$45,000 - $88,000',
    requirements: "Associate's degree in Respiratory Therapy and state license",
    education: "Associate's degree",
    growth: 'Much faster than average (13%)',
    dayInLife: 'Respiratory therapists assess lung capacity, provide breathing treatments, manage ventilators, respond to emergencies, and educate patients.',
    dayInLifeList: [
      'Assess patient lung capacity and breathing',
      'Provide breathing treatments and therapies',
      'Manage mechanical ventilators',
      'Respond to respiratory emergencies',
      'Educate patients on lung health'
    ],
    onetCode: '29-1126.00',
  },
  {
    title: 'Database Administrator',
    description: 'Use specialized software to store and organize data. They ensure data is available to users and secure from unauthorized access.',
    avgSalary: '$96,710',
    salaryRange: '$55,000 - $151,000',
    requirements: "Bachelor's degree in Computer Science or Information Systems",
    education: "Bachelor's degree",
    growth: 'Faster than average (9%)',
    dayInLife: 'Database administrators maintain databases, ensure data security, optimize performance, backup data, and troubleshoot issues.',
    dayInLifeList: [
      'Maintain and update database systems',
      'Ensure data security and integrity',
      'Optimize database performance',
      'Backup and recover data',
      'Grant user access and set permissions'
    ],
    onetCode: '15-1242.00',
  },
  {
    title: 'Network Administrator',
    description: 'Responsible for the day-to-day operation of computer networks. They organize, install, and support an organization\'s computer systems.',
    avgSalary: '$84,810',
    salaryRange: '$52,000 - $132,000',
    requirements: "Bachelor's degree in Computer Science or related field",
    education: "Bachelor's degree",
    growth: 'Average (5%)',
    dayInLife: 'Network administrators maintain network hardware and software, monitor performance, troubleshoot issues, and ensure network security.',
    dayInLifeList: [
      'Maintain network hardware and software',
      'Monitor network performance',
      'Troubleshoot network problems',
      'Ensure network security',
      'Upgrade and expand network systems'
    ],
    onetCode: '15-1244.00',
  },
  {
    title: 'Technical Writer',
    description: 'Prepare instruction manuals, how-to guides, journal articles, and other supporting documents to communicate complex technical information.',
    avgSalary: '$78,060',
    salaryRange: '$48,000 - $122,000',
    requirements: "Bachelor's degree in English, Communications, or technical field",
    education: "Bachelor's degree",
    growth: 'Faster than average (7%)',
    dayInLife: 'Technical writers research products, create documentation, collaborate with subject matter experts, and ensure accuracy of technical content.',
    dayInLifeList: [
      'Research and understand technical products',
      'Write clear user manuals and guides',
      'Collaborate with engineers and developers',
      'Create diagrams and visual aids',
      'Revise documents based on feedback'
    ],
    onetCode: '27-3042.00',
  },
  {
    title: 'Industrial Designer',
    description: 'Develop concepts and designs for manufactured products. They combine art, business, and engineering to make products functional and visually appealing.',
    avgSalary: '$71,640',
    salaryRange: '$42,000 - $113,000',
    requirements: "Bachelor's degree in Industrial Design",
    education: "Bachelor's degree",
    growth: 'Average (2%)',
    dayInLife: 'Industrial designers research user needs, sketch concepts, create prototypes, test designs, and work with engineers to refine products.',
    dayInLifeList: [
      'Research user needs and market trends',
      'Sketch design concepts and ideas',
      'Create 3D models and prototypes',
      'Test designs for functionality and safety',
      'Work with engineers to refine designs'
    ],
    onetCode: '27-1021.00',
  },
  {
    title: 'Urban Planner',
    description: 'Develop plans and programs for the use of land. They help create communities, accommodate population growth, and revitalize physical facilities.',
    avgSalary: '$78,500',
    salaryRange: '$48,000 - $121,000',
    requirements: "Master's degree in Urban or Regional Planning",
    education: "Master's degree",
    growth: 'Faster than average (7%)',
    dayInLife: 'Urban planners analyze data, create development plans, review proposals, conduct community meetings, and ensure compliance with regulations.',
    dayInLifeList: [
      'Analyze demographic and economic data',
      'Create land use plans and zoning proposals',
      'Review development proposals',
      'Conduct community meetings and hearings',
      'Ensure plans comply with regulations'
    ],
    onetCode: '19-3051.00',
  },
];

async function seedCareers() {
  console.log('🌱 Starting comprehensive career database seeding...\n');

  let savedCount = 0;
  let skippedCount = 0;

  for (const career of careers) {
    try {
      // Check if career already exists
      const existing = await prisma.career.findFirst({
        where: {
          title: career.title,
        },
      });

      if (!existing) {
        await prisma.career.create({
          data: career,
        });
        console.log(`✓ Added: ${career.title}`);
        savedCount++;
      } else {
        console.log(`- Skipped (exists): ${career.title}`);
        skippedCount++;
      }
    } catch (error) {
      console.error(`Error saving career ${career.title}:`, error);
    }
  }

  console.log('\n✅ Career seeding completed!');
  console.log(`📊 Total careers saved: ${savedCount}`);
  console.log(`⏭️  Total duplicates skipped: ${skippedCount}`);

  // Get final count
  const totalCareers = await prisma.career.count();
  console.log(`💾 Total careers in database: ${totalCareers}\n`);
}

// Run the seeding script
seedCareers()
  .catch((error) => {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
