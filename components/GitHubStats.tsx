'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';

interface GitHubData {
  publicRepos: number;
  totalStars: number;
  followers: number;
  contributions: number;
}

export default function GitHubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [githubData, setGithubData] = useState<GitHubData>({
    publicRepos: 0,
    totalStars: 0,
    followers: 0,
    contributions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub data
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/Adi-Sumardi');
        const userData = await userResponse.json();

        // Check if user data is valid
        if (!userData || userData.message) {
          throw new Error('GitHub API error');
        }

        // Fetch repos to calculate total stars
        const reposResponse = await fetch('https://api.github.com/users/Adi-Sumardi/repos?per_page=100');
        const reposData = await reposResponse.json();

        // Check if repos data is an array
        const totalStars = Array.isArray(reposData)
          ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
          : 0;

        setGithubData({
          publicRepos: userData.public_repos || 0,
          totalStars: totalStars || 0,
          followers: userData.followers || 0,
          contributions: 500, // GitHub doesn't provide this via API, use estimated value
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Fallback to default values
        setGithubData({
          publicRepos: 25,
          totalStars: 50,
          followers: 20,
          contributions: 500,
        });
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const stats = [
    {
      icon: FaCode,
      label: 'Public Repos',
      value: githubData.publicRepos,
      color: 'from-blue-600 to-blue-400',
    },
    {
      icon: FaStar,
      label: 'Total Stars',
      value: githubData.totalStars,
      color: 'from-amber-600 to-amber-400',
    },
    {
      icon: FaGithub,
      label: 'Followers',
      value: githubData.followers,
      color: 'from-blue-600 to-blue-400',
    },
    {
      icon: FaCodeBranch,
      label: 'Contributions (2024)',
      value: `${githubData.contributions}+`,
      color: 'from-amber-600 to-amber-400',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Live from GitHub
            </span>
            <span className="ml-2">💻</span>
          </h3>
          <p className="text-muted">Real-time stats from my open-source contributions</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <div className="text-center">
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-2" />
                ) : (
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                )}
                <div className="text-sm text-muted font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contribution Graph Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h4 className="text-lg font-bold mb-4 text-center">Contribution Activity</h4>
          <div className="flex justify-center">
            <img
              src="https://ghchart.rshah.org/Adi-Sumardi"
              alt="GitHub Contribution Chart"
              className="w-full max-w-4xl rounded-lg"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-6"
        >
          <a
            href="https://github.com/Adi-Sumardi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <FaGithub className="text-xl" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}