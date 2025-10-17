// Test the career matching API
async function testAPI() {
  try {
    console.log('Testing career matching API...\n');

    const response = await fetch('http://localhost:3000/api/match-careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: This won't work without a session cookie
        // You'll need to test this in the browser where you're signed in
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Success!');
      console.log(`\nGenerated ${data.totalMatches} career matches:\n`);

      data.matches.forEach((match: any, index: number) => {
        console.log(`${index + 1}. ${match.career.title}`);
        console.log(`   Match: ${match.matchPercentage}%`);
        console.log(`   Reason: ${match.matchReason}\n`);
      });

      console.log('\nUser Profile Extracted:');
      console.log(JSON.stringify(data.profileData, null, 2));
    } else {
      console.log('❌ Error:', data.error);
      console.log('\nNote: You need to be signed in to test this.');
      console.log('Please go to http://localhost:3000/chat and click "Get Career Matches"');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
