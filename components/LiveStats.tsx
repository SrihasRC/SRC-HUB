'use client';
import { useEffect, useState } from 'react';
import { Coffee, Code2, Flame, Clock, Github } from 'lucide-react';

interface Stats {
  githubStreak: number;
  githubCommits: number;
  wakatimeHours: string;
}

const statusMessages = [
  "Building cool stuff 🚀",
  "Debugging life, one error at a time 🐛",
  "Converting coffee to code ☕",
  "In the zone 🎯",
  "Shipping features ⚡",
  "Open to opportunities 💼",
  "Learning something new 📚",
  "Making magic happen ✨",
];

export default function LiveStats() {
  const [stats, setStats] = useState<Stats>({
    githubStreak: 0,
    githubCommits: 0,
    wakatimeHours: '0h 0m',
  });
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [currentStatus, setCurrentStatus] = useState(statusMessages[0]);
  const [isClient, setIsClient] = useState(false);

  // Only render dynamic content on client to avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsClient(true);
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setCoffeeCount(Math.floor(Math.random() * 3) + 1);
    else if (hour >= 12 && hour < 18) setCoffeeCount(Math.floor(Math.random() * 3) + 3);
    else setCoffeeCount(Math.floor(Math.random() * 2) + 5);
  }, []);

  useEffect(() => {
    // Fetch all stats
    const fetchStats = async () => {
      try {
        const [github, wakatime] = await Promise.all([
          fetch('/api/github-stats').then(r => r.json()),
          fetch('/api/wakatime-stats').then(r => r.json()),
        ]);

        setStats({
          githubStreak: github.streak || 0,
          githubCommits: github.commitsThisWeek || 0,
          wakatimeHours: wakatime.totalText || '0h 0m',
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata', // Change to your timezone
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Rotate status message every 5 seconds
  useEffect(() => {
    let currentIndex = 0;
    const statusInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statusMessages.length;
      setCurrentStatus(statusMessages[currentIndex]);
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  const statItems = [
    { 
      label: 'GitHub Streak', 
      value: `${stats.githubStreak} days`, 
      icon: Flame, 
      color: 'text-orange-400' 
    },
    { 
      label: 'Commits This Week', 
      value: stats.githubCommits.toString(), 
      icon: Github, 
      color: 'text-purple-400' 
    },
    { 
      label: 'Coding Hours', 
      value: stats.wakatimeHours, 
      icon: Code2, 
      color: 'text-blue-400' 
    },
    { 
      label: 'Coffee Consumed', 
      value: isClient ? `${coffeeCount} cups` : '...', 
      icon: Coffee, 
      color: 'text-amber-400' 
    },
  ];

  return (
    <div className="mt-12 px-6 pb-15">
      <div className="max-w-2xl mx-auto">
        {/* Local Time + Status */}
        <div className="mb-6 p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <p className="font-space-grotesk text-xs text-gray-500 mb-1">Local Time</p>
              <p className="font-space-grotesk text-sm text-gray-300 font-mono">{currentTime}</p>
            </div>
            <div className="flex-1 text-right">
              <p className="font-space-grotesk text-xs text-gray-400 transition-all duration-500">
                {currentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-4 border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-target cursor-none"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="font-space-grotesk text-xs text-gray-500">{stat.label}</span>
                </div>
                <p className="font-space-grotesk text-lg font-semibold text-gray-200">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
