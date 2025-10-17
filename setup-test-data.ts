import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function setupTestData() {
  console.log('🧪 Setting up test data for career matching...\n');

  try {
    // Create test user with conversation
    const hashedPassword = await bcrypt.hash('testpassword123', 10);

    let testUser = await prisma.user.findUnique({
      where: { email: 'test@aipathfinder.com' },
    });

    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'test@aipathfinder.com',
          name: 'Test User',
          password: hashedPassword,
        },
      });
      console.log('✓ Created test user');
    } else {
      console.log('✓ Test user exists');
    }

    // Create realistic conversation about tech career
    const messages = [
      { role: 'user', content: 'Hi, I need help finding the right career path' },
      { role: 'assistant', content: 'Hello! I would love to help you explore career options. What are you passionate about?' },
      { role: 'user', content: 'I really enjoy working with technology and computers. I like solving challenging problems and building things.' },
      { role: 'assistant', content: 'That sounds exciting! Can you tell me more about what kind of things you like to build? Any specific technologies you enjoy?' },
      { role: 'user', content: 'I love programming. I work with Python and JavaScript mostly. I build web applications and also do some data analysis work.' },
      { role: 'assistant', content: 'Great! Are you more interested in the creative visual side or the backend logic and data side?' },
      { role: 'user', content: 'I enjoy both actually, but I really love working with data and creating APIs. I also like mentoring junior developers on my team.' },
      { role: 'assistant', content: 'It sounds like you have leadership skills too. What about work environment - do you prefer working independently or collaborating?' },
      { role: 'user', content: 'I like collaboration. I enjoy pair programming and code reviews. I also value work-life balance and continuous learning.' },
      { role: 'assistant', content: 'What are your long-term career goals?' },
      { role: 'user', content: 'I want to grow into a technical leadership role, maybe a senior engineer or tech lead position. I want to keep coding but also mentor others.' },
    ];

    // Delete existing messages
    await prisma.message.deleteMany({
      where: { userId: testUser.id },
    });

    // Create new messages
    for (const msg of messages) {
      await prisma.message.create({
        data: {
          userId: testUser.id,
          role: msg.role,
          content: msg.content,
        },
      });
    }

    console.log(`✓ Created ${messages.length} conversation messages`);

    // Check careers
    const careerCount = await prisma.career.count();
    console.log(`✓ Found ${careerCount} careers in database`);

    console.log('\n✅ Test data ready!');
    console.log('\nTest user credentials:');
    console.log('  Email: test@aipathfinder.com');
    console.log('  Password: testpassword123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupTestData();
