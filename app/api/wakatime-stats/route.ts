import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      console.log('WakaTime: API key not configured');
      return NextResponse.json({
        hours: 0,
        minutes: 0,
        totalText: '0h 0m',
        error: 'API key not configured'
      });
    }

    console.log('WakaTime: Fetching stats...');
    console.log('WakaTime: Using API key starting with:', apiKey.substring(0, 10) + '...');

    // Try with Basic Auth instead of Bearer
    const encodedKey = Buffer.from(apiKey).toString('base64');

    // Get stats for last 7 days
    const res = await fetch(
      'https://wakatime.com/api/v1/users/current/stats/last_7_days',
      {
        headers: {
          Authorization: `Basic ${encodedKey}`,
        },
        cache: 'no-store', // Don't cache for testing
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('WakaTime API Error:', res.status, errorText);
      return NextResponse.json({
        hours: 0,
        minutes: 0,
        totalText: '0h 0m',
        error: `API error: ${res.status}`
      });
    }

    const data = await res.json();
    console.log('WakaTime response:', JSON.stringify(data, null, 2));
    
    const totalSeconds = data.data?.total_seconds || 0;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    console.log(`WakaTime: ${hours}h ${minutes}m (${totalSeconds}s total)`);

    return NextResponse.json({
      hours,
      minutes,
      totalText: `${hours}h ${minutes}m`,
      dailyAverage: data.data?.daily_average_text || '0h 0m',
    });
  } catch (error) {
    console.error('WakaTime API Error:', error);
    return NextResponse.json({
      hours: 0,
      minutes: 0,
      totalText: '0h 0m',
      error: 'Failed to fetch stats'
    });
  }
}
