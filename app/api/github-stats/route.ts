import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return NextResponse.json({
        commitsThisWeek: 0,
        streak: 0,
        error: 'GITHUB_USERNAME not set in .env.local'
      });
    }

    if (!token) {
      return NextResponse.json({
        commitsThisWeek: 0,
        streak: 0,
        error: 'GITHUB_TOKEN required for accurate stats'
      });
    }

    // Use GraphQL API for accurate contribution data
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const graphqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: oneWeekAgo.toISOString(),
          to: new Date().toISOString(),
        }
      }),
      cache: 'no-store',
    });

    if (!graphqlRes.ok) {
      const errorText = await graphqlRes.text();
      console.error('GitHub GraphQL Error:', graphqlRes.status, errorText);
      throw new Error(`GitHub API error: ${graphqlRes.status}`);
    }

    const graphqlData = await graphqlRes.json();
    
    if (graphqlData.errors) {
      console.error('GitHub GraphQL Errors:', graphqlData.errors);
      throw new Error('GraphQL query failed');
    }

    const contributionDays = graphqlData.data?.user?.contributionsCollection?.contributionCalendar?.weeks
      ?.flatMap((week: any) => week.contributionDays) || [];

    const commitsThisWeek = contributionDays.reduce((total: number, day: any) => {
      return total + (day.contributionCount || 0);
    }, 0);

    console.log(`GitHub: ${commitsThisWeek} contributions this week`);

    // Calculate streak from contribution calendar
    // Get the last 365 days of contributions
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    const streakQuery = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const streakRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: streakQuery,
        variables: {
          username,
          from: yearAgo.toISOString(),
          to: new Date().toISOString(),
        }
      }),
      cache: 'no-store',
    });

    const streakData = await streakRes.json();
    const allDays = streakData.data?.user?.contributionsCollection?.contributionCalendar?.weeks
      ?.flatMap((week: any) => week.contributionDays) || [];

    const streak = calculateStreakFromDays(allDays);
    console.log(`GitHub: Current streak is ${streak} days`);

    return NextResponse.json({
      commitsThisWeek,
      streak,
      username,
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats', commitsThisWeek: 0, streak: 0 },
      { status: 500 }
    );
  }
}

function calculateStreakFromDays(days: any[]): number {
  if (!days || days.length === 0) return 0;

  // Sort days in reverse chronological order (newest first)
  const sortedDays = [...days].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDays.length; i++) {
    const day = sortedDays[i];
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    // Check if this day matches the expected consecutive day
    if (dayDate.getTime() === expectedDate.getTime()) {
      if (day.contributionCount > 0) {
        streak++;
      } else if (i > 0) {
        // If it's not today and has no contributions, break the streak
        break;
      }
    } else {
      break;
    }
  }

  return streak;
}
