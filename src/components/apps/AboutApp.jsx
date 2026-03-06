import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaCode } from 'react-icons/fa';

const AboutApp = () => {
  return (
    <div className="h-full overflow-y-auto bg-[#0a0e14] p-6 custom-scrollbar">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-500/60 transition-all duration-500 shadow-lg shadow-purple-500/10">
            <img
              src="https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/profile.png"
              alt="Subham Mondal"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">SM</div>';
              }}
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0a0e14] shadow-lg shadow-green-500/30">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-40" />
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">Subham Mondal</h1>
          <p className="text-purple-400 font-medium mb-3 flex items-center justify-center md:justify-start gap-2">
            <FaCode className="text-sm" />
            Full Stack Developer
          </p>

          {/* Quick info chips */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
              <FaMapMarkerAlt className="text-red-400" size={10} />
              Kolkata, India
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
              <FaEnvelope className="text-blue-400" size={10} />
              sjxsubham@gmail.com
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Available for work
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <a
              href="https://github.com/SjxSubham"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/40 hover:text-white transition-all duration-300"
            >
              <FaGithub size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/subham-mondal-914b0b2b8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/30 text-white/40 hover:text-blue-400 transition-all duration-300"
            >
              <FaLinkedin size={14} />
            </a>
            <a
              href="https://x.com/SjxSubham4249"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-sky-500/20 border border-white/5 hover:border-sky-500/30 text-white/40 hover:text-sky-400 transition-all duration-300"
            >
              <FaTwitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

      {/* About Text */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full" />
          About Me
        </h2>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 space-y-4">
          <p className="text-white/70 text-sm leading-relaxed">
            I am a passionate <span className="text-purple-400 font-medium">Full Stack Developer</span> with
            expertise in building modern web applications. With a strong foundation in both frontend and backend
            technologies, I create seamless, user-friendly experiences that solve real-world problems.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            My journey in software development has led me through various projects ranging from
            small business websites to complex web applications. I'm constantly learning and exploring
            new technologies to enhance my skill set.
          </p>
        </div>
      </div>

      {/* What I Do */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-500 rounded-full" />
          What I Do
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              emoji: '🚀',
              title: 'SaaS Products',
              desc: 'Building scalable SaaS applications with modern tech stacks',
              color: 'from-purple-500/10 to-blue-500/10',
              borderColor: 'hover:border-purple-500/30',
            },
            {
              emoji: '💬',
              title: 'Real-time Apps',
              desc: 'Chat apps, live features with Socket.IO and WebSockets',
              color: 'from-green-500/10 to-emerald-500/10',
              borderColor: 'hover:border-green-500/30',
            },
            {
              emoji: '🧠',
              title: 'Problem Solving',
              desc: 'Active on LeetCode, competitive programming enthusiast',
              color: 'from-amber-500/10 to-orange-500/10',
              borderColor: 'hover:border-amber-500/30',
            },
            {
              emoji: '🤝',
              title: 'Open Source',
              desc: 'Contributing to open source and building in public',
              color: 'from-cyan-500/10 to-blue-500/10',
              borderColor: 'hover:border-cyan-500/30',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.color} border border-white/5 ${item.borderColor} rounded-xl p-4 transition-all duration-300 group cursor-default`}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                {item.emoji}
              </div>
              <h3 className="text-white/90 text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Quick Info
        </h2>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
          {[
            { label: 'Name', value: 'Subham Mondal' },
            { label: 'Role', value: 'Full Stack Developer' },
            { label: 'Email', value: 'sjxsubham@gmail.com' },
            { label: 'Location', value: 'Kolkata, India' },
            { label: 'Languages', value: 'English, Hindi, Bengali' },
            { label: 'Status', value: 'Available for work', isStatus: true },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-3 ${
                i !== 5 ? 'border-b border-white/5' : ''
              } hover:bg-white/[0.02] transition-colors`}
            >
              <span className="text-white/40 text-xs font-medium">{item.label}</span>
              {item.isStatus ? (
                <span className="text-green-400 text-xs font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {item.value}
                </span>
              ) : (
                <span className="text-white/80 text-xs">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Download Resume */}
      <div className="mt-6 pb-2">
        <a
          href="#"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </a>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }
      `}</style>
    </div>
  );
};

export default AboutApp;
