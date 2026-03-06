import { useState } from 'react';
import { ExternalLink, RefreshCw, Trophy, Target, Flame, Code2, TrendingUp, Star } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const LEETCODE_USERNAME = 'Sjx_Subham';
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
const LEETCODE_CARD_URL = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=Source%20Code%20Pro&ext=heatmap&border=0&radius=16`;

const LeetCodeApp = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setImageLoaded(false);
    setImageError(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#0a0e14] custom-scrollbar">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
              <SiLeetcode size={20} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                LeetCode Profile
              </h2>
              <p className="text-white/30 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                @{LEETCODE_USERNAME}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 text-xs transition-all duration-200"
              title="Refresh stats"
            >
              <RefreshCw size={12} className={!imageLoaded && !imageError ? 'animate-spin' : ''} />
              Refresh
            </button>
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 text-xs font-medium transition-all duration-200"
            >
              <ExternalLink size={12} />
              View Profile
            </a>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              icon: <Target size={16} />,
              label: 'Focus',
              value: 'DSA',
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/8',
              border: 'border-cyan-500/15',
            },
            {
              icon: <Flame size={16} />,
              label: 'Consistency',
              value: 'Active',
              color: 'text-orange-400',
              bg: 'bg-orange-500/8',
              border: 'border-orange-500/15',
            },
            {
              icon: <Code2 size={16} />,
              label: 'Languages',
              value: 'C++ / Py',
              color: 'text-blue-400',
              bg: 'bg-blue-500/8',
              border: 'border-blue-500/15',
            },
            {
              icon: <TrendingUp size={16} />,
              label: 'Status',
              value: 'Grinding',
              color: 'text-green-400',
              bg: 'bg-green-500/8',
              border: 'border-green-500/15',
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

        {/* LeetCode Card Image */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={13} className="text-amber-400" />
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Stats & Heatmap
              </h3>
            </div>
            <span className="text-[10px] text-white/20 font-mono">
              via leetcard.jacoblin.cool
            </span>
          </div>

          <div className="p-4">
            {/* Loading state */}
            {!imageLoaded && !imageError && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
                  <SiLeetcode size={16} className="text-amber-400/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-white/30 text-xs">Loading LeetCode stats...</p>
                <p className="text-white/15 text-[10px]">This may take a few seconds</p>
              </div>
            )}

            {/* Error state */}
            {imageError && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
                  <SiLeetcode size={24} className="text-red-400/60" />
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm font-medium mb-1">Failed to load stats</p>
                  <p className="text-white/25 text-xs mb-4 max-w-xs">
                    The LeetCode stats card might be temporarily unavailable. Try refreshing or visit the profile directly.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white/90 text-xs transition-all duration-200"
                  >
                    <RefreshCw size={12} />
                    Try Again
                  </button>
                  <a
                    href={LEETCODE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/20 text-amber-400 text-xs font-medium transition-all duration-200"
                  >
                    <ExternalLink size={12} />
                    Visit LeetCode
                  </a>
                </div>
              </div>
            )}

            {/* Actual card image */}
            <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
              <a
                href={LEETCODE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-95 transition-opacity duration-200 cursor-pointer"
              >
                <img
                  key={refreshKey}
                  src={`${LEETCODE_CARD_URL}&t=${refreshKey}`}
                  alt={`LeetCode Profile — ${LEETCODE_USERNAME}`}
                  className="w-full rounded-xl shadow-lg shadow-black/20"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(false);
                  }}
                  loading="eager"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Approach & Strategy */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Star size={13} className="text-purple-400" />
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Problem Solving Approach
            </h3>
          </div>

          <div className="p-4 space-y-3">
            {[
              {
                difficulty: 'Easy',
                color: 'text-green-400',
                bg: 'bg-green-500/8',
                border: 'border-green-500/15',
                barColor: 'bg-green-500',
                desc: 'Array, String, HashMap fundamentals',
                barWidth: '85%',
              },
              {
                difficulty: 'Medium',
                color: 'text-amber-400',
                bg: 'bg-amber-500/8',
                border: 'border-amber-500/15',
                barColor: 'bg-amber-500',
                desc: 'DP, Trees, Graphs, Binary Search',
                barWidth: '60%',
              },
              {
                difficulty: 'Hard',
                color: 'text-red-400',
                bg: 'bg-red-500/8',
                border: 'border-red-500/15',
                barColor: 'bg-red-500',
                desc: 'Advanced DP, Segment Trees, Complex Graphs',
                barWidth: '30%',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.bg} border ${item.border} rounded-xl p-3.5 group hover:scale-[1.005] transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${item.color}`}>{item.difficulty}</span>
                    <span className="text-[10px] text-white/20">—</span>
                    <span className="text-[11px] text-white/40">{item.desc}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.barColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: item.barWidth }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Code2 size={13} className="text-cyan-400" />
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Topics Practiced
            </h3>
          </div>

          <div className="p-4 flex flex-wrap gap-2">
            {[
              'Arrays', 'Strings', 'HashMap', 'Two Pointers', 'Sliding Window',
              'Binary Search', 'Linked List', 'Stack', 'Queue', 'Trees',
              'BFS', 'DFS', 'Graphs', 'Dynamic Programming', 'Recursion',
              'Backtracking', 'Sorting', 'Greedy', 'Bit Manipulation', 'Math',
            ].map((topic, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/[0.03] border border-white/8 rounded-lg text-[11px] text-white/40 hover:text-white/70 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200 cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pb-2">
          <a
            href={LEETCODE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600/80 to-orange-600/80 hover:from-amber-500 hover:to-orange-500 rounded-xl text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            <SiLeetcode size={16} />
            View Full LeetCode Profile
            <ExternalLink size={13} className="ml-1 opacity-60" />
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

export default LeetCodeApp;
