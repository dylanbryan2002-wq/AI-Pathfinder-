import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testMatching() {
  try {
    // Get the test user (the one you signed up with)
    const user = await prisma.user.findFirst({
      where: { email: 'dylanbryan2002@gmail.com' },
    });

    if (!user) {
      console.log('User not found. Please sign up first.');
      return;
    }

    console.log('Found user:', user.email);

    // Create some test messages if they don't exist
    const existingMessages = await prisma.message.count({
      where: { userId: user.id },
    });

    if (existingMessages === 0) {
      console.log('Creating test conversation...');

      await prisma.message.createMany({
        data: [
          {
            userId: user.id,
            role: 'user',
            content: 'Hi! I\'m interested in finding a career that matches my interests.',
          },
          {
            userId: user.id,
            role: 'assistant',
            content: 'Great! I\'d love to help you discover the perfect career. Tell me about your interests and what you enjoy doing.',
          },
          {
            userId: user.id,
            role: 'user',
            content: 'I really love working with kids and teaching. I enjoy helping young people develop their skills and reach their potential. I also value work-life balance and making a positive impact in my community.',
          },
          {
            userId: user.id,
            role: 'assistant',
            content: 'That\'s wonderful! It sounds like you have a passion for education and youth development. What kind of skills do you have?',
          },
          {
            userId: user.id,
            role: 'user',
            content: 'I\'m good at communication, leadership, and organizing activities. I have experience mentoring and coaching, and I\'m creative when it comes to designing programs.',
          },
          {
            userId: user.id,
            role: 'assistant',
            content: 'Excellent! Those are valuable skills. What are your long-term career goals?',
          },
          {
            userId: user.id,
            role: 'user',
            content: 'I want to have a fulfilling career where I can make a difference in young people\'s lives. I\'d like to advance to leadership positions eventually, but I want to stay connected to the work with youth.',
          },
        ],
      });

      console.log('Test conversation created!');
    } else {
      console.log(`Found ${existingMessages} existing messages`);
    }

    // Now test the matching
    console.log('\nYou can now:');
    console.log('1. Go to http://localhost:3000/chat');
    console.log('2. Click "Get Career Matches" button');
    console.log('3. Or manually call: POST http://localhost:3000/api/match-careers');
    console.log('\nThe system will analyze the conversation and generate career matches!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testMatching();
