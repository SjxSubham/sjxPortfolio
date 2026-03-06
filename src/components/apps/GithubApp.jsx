import { useState } from 'react';
import { ExternalLink, RefreshCw, GitBranch, Star, GitPullRequest, Code2, Activity, Users } from 'lucide-react';
import { BiLogoGithub } from 'react-icons/bi';

const GITHUB_USERNAME = 'SjxSubham';
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const STAT_CARDS = [
  {
    id: 'profile-details',
    label: 'Profile Details',
    url: `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${GITHUB_USERNAME}&theme=tokyonight`,
  },
  {
    id: 'stats',
    label: 'GitHub Stats',
    url: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=c084fc&icon_color=22d3ee&text_color=94a3b8&ring_color=c084fc`,
  },
  {
    id: 'languages',
    label: 'Top Languages',
    url: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=c084fc&text_color=94a3b8`,
  },
  {
    id: 'streak',
    label: 'Streak Stats',
    url: `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=tokyonight&hide_border=true&background=00000000&ring=c084fc&fire=f97316&currStreakLabel=c084fc&sideLabels=94a3b8&dates=475569`,
  },
];

const REPOS = [
  {
    name: 'saas-feedx',
    description: 'SaaS feedback collection platform',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '—',
    url: 'https://github.com/SjxSubham/saas-feedx',
  },
  {
    name: 'ZitaCode',
    description: 'AI-powered coding platform for developers',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: '—',
    url: 'https://github.com/SjxSubham/ZitaCode',
  },
  {
    name: 'MyGithub',
    description: 'GitHub profile viewer & repo management',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '—',
    url: 'https://github.com/SjxSubham/MyGithub',
  },
  {
    name: 'JOB-SEEK',
    description: 'Job searching platform to find dream jobs',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '—',
    url: 'https://github.com/SjxSubham/JOB-SEEK',
  },
  {
    name: 'Sjx_Chat',
    description: 'Real-time chat app with Socket.IO',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '—',
    url: 'https://github.com/SjxSubham/Sjx_Chat',
  },
  {
    name: 'sjxPortfolio',
    description: 'OS-style terminal portfolio website',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '—',
    url: 'https://github.com/SjxSubham/sjxPortfolio',
  },
];

const GithubApp = () => {
  const [loadedCards, setLoadedCards] = useState({});
  const [errorCards, setErrorCards] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview, repos

  const handleRefresh = () => {
    setLoadedCards({});
    setErrorCards({});
    setRefreshKey((prev) => prev + 1);
  };

  const handleCardLoad = (id) => {
    setLoadedCards((prev) => ({ ...prev, [id]: true }));
  };

  const handleCardError = (id) => {
    setErrorCards((prev) => ({ ...prev, [id]: true }));
    setLoadedCards((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="h-full overflow-y-auto bg-[#0a0e14] custom-scrollbar">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
              <BiLogoGithub size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                GitHub Profile
              </h2>
              <p className="text-white/30 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                @{GITHUB_USERNAME}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 text-xs transition-all duration-200"
              title="Refresh stats"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/25 text-white/70 hover:text-white text-xs font-medium transition-all duration-200"
            >
              <ExternalLink size={12} />
              View Profile
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              icon: <Code2 size={16} />,
              label: 'Repositories',
              value: '15+',
              color: 'text-blue-400',
              bg: 'bg-blue-500/8',
              border: 'border-blue-500/15',
            },
            {
              icon: <GitBranch size={16} />,
              label: 'Contributions',
              value: 'Active',
              color: 'text-green-400',
              bg: 'bg-green-500/8',
              border: 'border-green-500/15',
            },
            {
              icon: <Star size={16} />,
              label: 'Stars Earned',
              value: '—',
              color: 'text-yellow-400',
              bg: 'bg-yellow-500/8',
              border: 'border-yellow-500/15',
            },
            {
              icon: <Users size={16} />,
              label: 'Open Source',
              value: 'Yes',
              color: 'text-purple-400',
              bg: 'bg-purple-500/8',
              border: 'border-purple-500/15',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} border ${stat.border} rounded-xl p-3.5 group hover:scale-[1.02] transition-all duration-300 cursor-default`}
            >
              <div className={`${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 inline-block`}>
                {stat.icon}
              </div>
              <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-0.5">
                {stat.label}
              </p>
              <p className={`text-sm font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.02] border border-white/5 rounded-xl mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: <Activity size={12} /> },
            { id: 'repos', label: 'Repositories', icon: <GitBranch size={12} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white/8 text-white border border-white/10 shadow-sm'
                  : 'text-white/40 hover:text-white/60 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {STAT_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
              >
                <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                    {card.label}
                  </h3>
                  {!loadedCards[card.id] && !errorCards[card.id] && (
                    <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                      <RefreshCw size={9} className="animate-spin" />
                      Loading...
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Loading skeleton */}
                  {!loadedCards[card.id] && !errorCards[card.id] && (
                    <div className="flex items-center justify-center py-12">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
                        <BiLogoGithub
                          size={14}
                          className="text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  )}

                  {/* Error state */}
                  {errorCards[card.id] && (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                        <BiLogoGithub size={18} className="text-red-400/50" />
                      </div>
                      <p className="text-white/30 text-xs">Failed to load {card.label.toLowerCase()}</p>
                      <button
                        onClick={handleRefresh}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 text-[11px] transition-all duration-200"
                      >
                        <RefreshCw size={10} />
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Card image */}
                  <img
                    key={`${card.id}-${refreshKey}`}
                    src={`${card.url}&cache=${refreshKey}`}
                    alt={card.label}
                    className={`w-full rounded-lg transition-opacity duration-500 ${
                      loadedCards[card.id] && !errorCards[card.id] ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                    }`}
                    onLoad={() => handleCardLoad(card.id)}
                    onError={() => handleCardError(card.id)}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Repos Tab */}
        {activeTab === 'repos' && (
          <div className="space-y-3">
            {REPOS.map((repo, i) => (
              <a
                key={i}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <GitBranch size={14} className="text-blue-400 shrink-0" />
                    <h3 className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 truncate transition-colors duration-200">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink
                    size={12}
                    className="text-white/0 group-hover:text-white/30 transition-all duration-300 shrink-0 mt-0.5 ml-2"
                  />
                </div>

                <p className="text-white/40 text-xs mb-3 leading-relaxed">{repo.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span className="text-[11px] text-white/50">{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-1 text-white/30">
                    <Star size={11} />
                    <span className="text-[11px]">{repo.stars}</span>
                  </div>

                  <div className="flex items-center gap-1 text-white/30">
                    <GitPullRequest size={11} />
                    <span className="text-[11px]">Open</span>
                  </div>
                </div>
              </a>
            ))}

            {/* View all on GitHub */}
            <a
              href={`${GITHUB_PROFILE_URL}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 rounded-xl text-white/40 hover:text-white/70 text-xs transition-all duration-200 group"
            >
              <BiLogoGithub size={14} className="group-hover:scale-110 transition-transform duration-200" />
              View all repositories on GitHub
              <ExternalLink size={11} className="opacity-40" />
            </a>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 pb-2">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700/80 to-gray-800/80 hover:from-gray-600 hover:to-gray-700 rounded-xl text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-0.5"
          >
            <BiLogoGithub size={18} />
            Follow @{GITHUB_USERNAME} on GitHub
            <ExternalLink size={13} className="ml-1 opacity-50" />
          </a>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.12);
        }
      `}</style>
    </div>
  );
};

export default GithubApp;
