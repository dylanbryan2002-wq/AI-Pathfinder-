import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function populateDayInLife() {
  console.log('🔍 Finding careers without day in life data...\n');

  // Get careers with empty dayInLifeList using raw query
  const careers: any[] = await prisma.$queryRaw`
    SELECT * FROM careers
    WHERE dayInLifeList = '[]' OR dayInLifeList IS NULL
  `;

  console.log(`Found ${careers.length} careers needing day in life data\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const career of careers) {
    try {
      console.log(`📝 Generating day in life for: ${career.title}`);

      const prompt = `Generate a "day in the life" description for a ${career.title}.

Career description: ${career.description}

Return ONLY a JSON array with exactly 3 bullet points that describe typical daily activities. Each bullet should be:
- 1-2 sentences long
- Action-oriented (starting with a verb)
- Specific to this career
- Professional and realistic

Format: ["Activity 1", "Activity 2", "Activity 3"]

Example format:
["Design and lead programs that help young people build leadership, teamwork, and life skills.", "Mentor and coach youth one-on-one or in small groups to set goals and overcome challenges.", "Organize events and projects like workshops, volunteer days, and community initiatives."]

Return ONLY the JSON array, nothing else.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a career counselor expert. Generate realistic "day in the life" activities for various careers. Return only valid JSON arrays.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      const content = response.choices[0].message.content?.trim() || '[]';

      // Parse to validate JSON
      const dayInLifeList = JSON.parse(content);

      if (!Array.isArray(dayInLifeList) || dayInLifeList.length !== 3) {
        throw new Error(`Invalid response format: expected array of 3 items, got ${dayInLifeList.length}`);
      }

      // Update the career
      await prisma.career.update({
        where: { id: career.id },
        data: { dayInLifeList: JSON.stringify(dayInLifeList) }
      });

      console.log(`   ✅ Success: ${dayInLifeList.length} activities added\n`);
      successCount++;

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total processed: ${careers.length}`);

  await prisma.$disconnect();
}

populateDayInLife().catch(console.error);
