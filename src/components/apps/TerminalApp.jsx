import { useState, useRef, useEffect, useCallback } from "react";

const WELCOME_MSG = [
  "\x1b[purple]  ███████╗      ██╗██╗  ██╗███████╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███╗   ███╗\x1b[/]",
  "\x1b[purple]  ██╔════╝      ██║╚██╗██╔╝██╔════╝██║   ██║██╔══██╗██║  ██║██╔══██╗████╗ ████║\x1b[/]",
  "\x1b[purple]  ███████╗      ██║ ╚███╔╝ ███████╗██║   ██║██████╔╝███████║███████║██╔████╔██║\x1b[/]",
  "\x1b[purple]  ╚════██║██   ██║ ██╔██╗ ╚════██║██║   ██║██╔══██╗██╔══██║██╔══██║██║╚██╔╝██║\x1b[/]",
  "\x1b[purple]  ███████║╚█████╔╝██╔╝ ██╗███████║╚██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║\x1b[/]",
  "\x1b[purple]  ╚══════╝ ╚════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝\x1b[/]",
  "",
  "  \x1b[cyan]Welcome to SjxSubhamOS Terminal v2.0\x1b[/]",
  "  Type \x1b[green]help\x1b[/] to see available commands.",
  "",
];

const NEOFETCH = [
  "",
  "\x1b[purple]        ▄▄▄▄▄▄▄▄▄▄▄▄▄       \x1b[/] \x1b[cyan]sjxsubham\x1b[/]\x1b[white]@\x1b[/]\x1b[purple]portfolio\x1b[/]",
  "\x1b[purple]      ▄█████████████████▄     \x1b[/] \x1b[white]─────────────────\x1b[/]",
  "\x1b[purple]    ▄███████████████████████▄   \x1b[/]\x1b[cyan]OS:\x1b[/]       SjxSubhamOS v2.0",
  "\x1b[purple]   ████████████████████████████  \x1b[/]\x1b[cyan]Host:\x1b[/]     Kolkata, India",
  "\x1b[purple]  ██████████████████████████████ \x1b[/]\x1b[cyan]Kernel:\x1b[/]   React 18.2.0",
  "\x1b[purple]  ███████████  ████  ███████████ \x1b[/]\x1b[cyan]Uptime:\x1b[/]   Since 2003",
  "\x1b[purple]  ███████████  ████  ███████████ \x1b[/]\x1b[cyan]Shell:\x1b[/]    sjx-terminal 2.0",
  "\x1b[purple]  ██████████████████████████████ \x1b[/]\x1b[cyan]DE:\x1b[/]       SjxSubhamOS Desktop",
  "\x1b[purple]   ████████████████████████████  \x1b[/]\x1b[cyan]Theme:\x1b[/]    Midnight Purple",
  "\x1b[purple]    ▀███████████████████████▀   \x1b[/]\x1b[cyan]CPU:\x1b[/]      Full Stack Engine",
  "\x1b[purple]      ▀█████████████████▀       \x1b[/]\x1b[cyan]GPU:\x1b[/]      Creative Rendering",
  "\x1b[purple]        ▀▀▀▀▀▀▀▀▀▀▀▀▀         \x1b[/]\x1b[cyan]Memory:\x1b[/]   JS / TS / Py / C++",
  "",
  "  \x1b[red]███\x1b[/]\x1b[orange]███\x1b[/]\x1b[yellow]███\x1b[/]\x1b[green]███\x1b[/]\x1b[cyan]███\x1b[/]\x1b[blue]███\x1b[/]\x1b[purple]███\x1b[/]\x1b[white]███\x1b[/]",
  "",
];

const HELP_TEXT = [
  "",
  "  \x1b[yellow]╔══════════════════════════════════════════════════════════╗\x1b[/]",
  "  \x1b[yellow]║\x1b[/]        \x1b[cyan]SjxSubhamOS Terminal — Command Reference\x1b[/]        \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]╠══════════════════════════════════════════════════════════╣\x1b[/]",
  "  \x1b[yellow]║\x1b[/]                                                          \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]whoami\x1b[/]       → Display personal info                  \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]about\x1b[/]        → Who am I + background                   \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]skills\x1b[/]       → List all technical skills                \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]projects\x1b[/]     → Show portfolio projects                  \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]leetcode\x1b[/]     → Open LeetCode profile card              \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]github\x1b[/]       → Open GitHub stats                       \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]contact\x1b[/]      → Open Contact form                       \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]neofetch\x1b[/]     → System info (the cool way)              \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]social\x1b[/]       → Social media links                      \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]resume\x1b[/]       → Download resume                         \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]run\x1b[/]          → Open Code Runner                        \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]history\x1b[/]      → Show command history                    \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]date\x1b[/]         → Current date/time                       \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]echo <text>\x1b[/]  → Print text to terminal                  \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]clear\x1b[/]        → Clear the terminal                      \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]banner\x1b[/]       → Show the welcome banner again           \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]  \x1b[green]sudo rm -rf\x1b[/]  → 😈 Try it                               \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]║\x1b[/]                                                          \x1b[yellow]║\x1b[/]",
  "  \x1b[yellow]╚══════════════════════════════════════════════════════════╝\x1b[/]",
  "",
];

const SKILLS_OUTPUT = [
  "",
  "  \x1b[cyan]╭─── Programming Languages ─────────────────────────╮\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  C          \x1b[green]██████████████████████████████████████░░\x1b[/]  90%  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  C++        \x1b[green]██████████████████████████████████░░░░░░\x1b[/]  85%  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  Python     \x1b[green]██████████████████████████████████░░░░░░\x1b[/]  85%  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  JavaScript \x1b[green]██████████████████████████████████████░░\x1b[/]  90%  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  TypeScript \x1b[green]████████████████████████████████░░░░░░░░\x1b[/]  80%  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  Java       \x1b[green]██████████████████████████████░░░░░░░░░░\x1b[/]  75%  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]╰───────────────────────────────────────────────────╯\x1b[/]",
  "",
  "  \x1b[blue]╭─── Frontend ──────────────────────────────────────╮\x1b[/]",
  "  \x1b[blue]│\x1b[/]  React      \x1b[green]██████████████████████████████████░░░░░░\x1b[/]  85%  \x1b[blue]│\x1b[/]",
  "  \x1b[blue]│\x1b[/]  Next.js    \x1b[green]██████████████████████████████░░░░░░░░░░\x1b[/]  75%  \x1b[blue]│\x1b[/]",
  "  \x1b[blue]│\x1b[/]  Tailwind   \x1b[green]██████████████████████████████████░░░░░░\x1b[/]  85%  \x1b[blue]│\x1b[/]",
  "  \x1b[blue]│\x1b[/]  HTML/CSS   \x1b[green]██████████████████████████████████████░░\x1b[/]  90%  \x1b[blue]│\x1b[/]",
  "  \x1b[blue]╰───────────────────────────────────────────────────╯\x1b[/]",
  "",
  "  \x1b[green]╭─── Backend & Database ────────────────────────────╮\x1b[/]",
  "  \x1b[green]│\x1b[/]  Node.js    \x1b[green]████████████████████████████████░░░░░░░░\x1b[/]  80%  \x1b[green]│\x1b[/]",
  "  \x1b[green]│\x1b[/]  Express    \x1b[green]██████████████████████████████░░░░░░░░░░\x1b[/]  75%  \x1b[green]│\x1b[/]",
  "  \x1b[green]│\x1b[/]  Django     \x1b[green]████████████████████████████░░░░░░░░░░░░\x1b[/]  70%  \x1b[green]│\x1b[/]",
  "  \x1b[green]│\x1b[/]  MongoDB    \x1b[green]██████████████████████████████░░░░░░░░░░\x1b[/]  75%  \x1b[green]│\x1b[/]",
  "  \x1b[green]│\x1b[/]  PostgreSQL \x1b[green]████████████████████████████░░░░░░░░░░░░\x1b[/]  70%  \x1b[green]│\x1b[/]",
  "  \x1b[green]╰───────────────────────────────────────────────────╯\x1b[/]",
  "",
  "  \x1b[yellow]╭─── Tools & DevOps ────────────────────────────────╮\x1b[/]",
  "  \x1b[yellow]│\x1b[/]  Git/GitHub \x1b[green]██████████████████████████████████░░░░░░\x1b[/]  85%  \x1b[yellow]│\x1b[/]",
  "  \x1b[yellow]│\x1b[/]  VS Code    \x1b[green]██████████████████████████████████████░░\x1b[/]  90%  \x1b[yellow]│\x1b[/]",
  "  \x1b[yellow]│\x1b[/]  Docker     \x1b[green]██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░\x1b[/]  25%  \x1b[yellow]│\x1b[/]",
  "  \x1b[yellow]│\x1b[/]  Linux      \x1b[green]████████████████████░░░░░░░░░░░░░░░░░░░\x1b[/]  50%  \x1b[yellow]│\x1b[/]",
  "  \x1b[yellow]│\x1b[/]  Postman    \x1b[green]██████████████████████████████████░░░░░░\x1b[/]  85%  \x1b[yellow]│\x1b[/]",
  "  \x1b[yellow]╰───────────────────────────────────────────────────╯\x1b[/]",
  "",
];

const PROJECTS_OUTPUT = [
  "",
  "  \x1b[cyan]┌─────────────────────────────────────────────────────────┐\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[yellow]01.\x1b[/] \x1b[white]FeedX\x1b[/]                                                \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      SaaS feedback collection platform                    \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[green]Stack:\x1b[/] React, Next.js, Supabase, Vercel              \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[blue]Live:\x1b[/] feedx.vercel.app                                \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[purple]Repo:\x1b[/] github.com/SjxSubham/saas-feedx                \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]├─────────────────────────────────────────────────────────┤\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[yellow]02.\x1b[/] \x1b[white]ZitaCode\x1b[/]                                             \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      AI-powered coding platform for developers            \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[green]Stack:\x1b[/] Next.js, TypeScript, Convex, AI                \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[blue]Live:\x1b[/] zita-code.vercel.app                             \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[purple]Repo:\x1b[/] github.com/SjxSubham/ZitaCode                  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]├─────────────────────────────────────────────────────────┤\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[yellow]03.\x1b[/] \x1b[white]MyGithub\x1b[/]                                             \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      GitHub profile viewer & repo management              \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[green]Stack:\x1b[/] React, GitHub API, Node.js                     \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[blue]Live:\x1b[/] mygithubapp.onrender.com                         \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[purple]Repo:\x1b[/] github.com/SjxSubham/MyGithub                  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]├─────────────────────────────────────────────────────────┤\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[yellow]04.\x1b[/] \x1b[white]JOBSEEK\x1b[/]                                              \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      Job searching platform to find dream jobs            \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[green]Stack:\x1b[/] React, Supabase, Vercel                        \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[blue]Live:\x1b[/] job-seek-umber.vercel.app                        \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[purple]Repo:\x1b[/] github.com/SjxSubham/JOB-SEEK                  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]├─────────────────────────────────────────────────────────┤\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[yellow]05.\x1b[/] \x1b[white]Sjx_Chat\x1b[/]                                             \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      Real-time chat app with active user status           \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[green]Stack:\x1b[/] React, Socket.IO, MongoDB, Zustand             \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[blue]Live:\x1b[/] sjx-chatapp.onrender.com                         \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]      \x1b[purple]Repo:\x1b[/] github.com/SjxSubham/Sjx_Chat                  \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]└─────────────────────────────────────────────────────────┘\x1b[/]",
  "",
];

const SOCIAL_OUTPUT = [
  "",
  "  \x1b[cyan]Social Links:\x1b[/]",
  "",
  "  \x1b[white]  GitHub    →\x1b[/]  \x1b[blue]https://github.com/SjxSubham\x1b[/]",
  "  \x1b[white]  LinkedIn  →\x1b[/]  \x1b[blue]https://linkedin.com/in/subham-mondal-914b0b2b8\x1b[/]",
  "  \x1b[white]  Twitter   →\x1b[/]  \x1b[blue]https://x.com/SjxSubham4249\x1b[/]",
  "  \x1b[white]  LeetCode  →\x1b[/]  \x1b[blue]https://leetcode.com/u/Sjx_Subham\x1b[/]",
  "",
];

const WHOAMI_OUTPUT = [
  "",
  "  \x1b[cyan]┌────────────────────────────────────┐\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[white]Name:\x1b[/]      Subham Mondal          \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[white]Role:\x1b[/]      Full Stack Developer   \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[white]Email:\x1b[/]     sjxsubham@gmail.com    \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[white]Location:\x1b[/]  Kolkata, India         \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[white]Status:\x1b[/]    \x1b[green]Available for work\x1b[/]     \x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]│\x1b[/]  \x1b[white]Shell:\x1b[/]     SjxSubhamOS Terminal 2.0\x1b[cyan]│\x1b[/]",
  "  \x1b[cyan]└────────────────────────────────────┘\x1b[/]",
  "",
];

const ABOUT_OUTPUT = [
  "",
  "  \x1b[yellow]━━━ About Subham Mondal ━━━\x1b[/]",
  "",
  "  I am a passionate \x1b[cyan]Full Stack Developer\x1b[/] with expertise in building",
  "  modern web applications. With a strong foundation in both frontend",
  "  and backend technologies, I create seamless, user-friendly",
  "  experiences that solve real-world problems.",
  "",
  "  My journey in software development has led me through various",
  "  projects ranging from small business websites to complex web",
  "  applications. I'm constantly learning and exploring new",
  "  technologies to enhance my skill set.",
  "",
  "  \x1b[green]►\x1b[/] Building SaaS products & real-time applications",
  "  \x1b[green]►\x1b[/] Open source contributor on GitHub",
  "  \x1b[green]►\x1b[/] Problem solver on LeetCode",
  "  \x1b[green]►\x1b[/] Always open to collaboration & new opportunities",
  "",
];

// Color parser: converts \x1b[color] text \x1b[/] into styled spans
const colorMap = {
  red: "#ef4444",
  orange: "#f97316",
  yellow: "#facc15",
  green: "#4ade80",
  cyan: "#22d3ee",
  blue: "#60a5fa",
  purple: "#c084fc",
  white: "#e2e8f0",
  gray: "#94a3b8",
};

function parseLine(text) {
  if (!text) return [{ text: "\u00A0", color: null }];

  const parts = [];
  const regex = /\x1b\[(\w+)\](.*?)\x1b\[\/\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), color: null });
    }
    parts.push({ text: match[2], color: colorMap[match[1]] || null });
    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), color: null });
  }

  if (parts.length === 0) {
    parts.push({ text: text || "\u00A0", color: null });
  }

  return parts;
}

function TerminalLine({ parts }) {
  return (
    <div
      className="whitespace-pre leading-[1.55] font-mono"
      style={{ fontSize: "12.5px" }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          style={part.color ? { color: part.color } : { color: "#94a3b8" }}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
}

const TerminalApp = ({ onOpenApp }) => {
  const [lines, setLines] = useState(() =>
    WELCOME_MSG.map((l) => ({ type: "output", parts: parseLine(l) })),
  );
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const linesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (linesEndRef.current) {
        linesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    // Auto-focus input when terminal mounts
    inputRef.current?.focus();
  }, []);

  const addOutput = (outputLines) => {
    setLines((prev) => [
      ...prev,
      ...outputLines.map((l) => ({ type: "output", parts: parseLine(l) })),
    ]);
  };

  const addPromptLine = (cmd) => {
    setLines((prev) => [
      ...prev,
      {
        type: "prompt",
        parts: [
          { text: "sjxsubham", color: colorMap.green },
          { text: "@", color: colorMap.white },
          { text: "portfolio", color: colorMap.purple },
          { text: ":~$ ", color: colorMap.white },
          { text: cmd, color: "#e2e8f0" },
        ],
      },
    ]);
  };

  const processCommand = async (rawCmd) => {
    const trimmed = rawCmd.trim();
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1).join(" ");

    addPromptLine(rawCmd);

    if (!cmd) {
      return;
    }

    // Add to history
    setCommandHistory((prev) => {
      const next = [...prev, trimmed];
      if (next.length > 50) next.shift();
      return next;
    });
    setHistoryIndex(-1);

    switch (cmd) {
      case "help":
        addOutput(HELP_TEXT);
        break;

      case "neofetch":
        addOutput(NEOFETCH);
        break;

      case "whoami":
        addOutput(WHOAMI_OUTPUT);
        break;

      case "about":
        addOutput(ABOUT_OUTPUT);
        if (onOpenApp) {
          addOutput(["  \x1b[gray]→ Opening About window...\x1b[/]", ""]);
          setTimeout(() => onOpenApp("about"), 300);
        }
        break;

      case "skills":
        addOutput(SKILLS_OUTPUT);
        break;

      case "projects":
        addOutput(PROJECTS_OUTPUT);
        break;

      case "social":
        addOutput(SOCIAL_OUTPUT);
        break;

      case "leetcode":
        addOutput([
          "",
          "  \x1b[yellow]Opening LeetCode profile window...\x1b[/]",
          "  \x1b[gray]Profile: leetcode.com/u/Sjx_Subham\x1b[/]",
          "",
        ]);
        if (onOpenApp) {
          setTimeout(() => onOpenApp("leetcode"), 300);
        }
        break;

      case "github":
        addOutput([
          "",
          "  \x1b[white]Opening GitHub stats window...\x1b[/]",
          "  \x1b[gray]Profile: github.com/SjxSubham\x1b[/]",
          "",
        ]);
        if (onOpenApp) {
          setTimeout(() => onOpenApp("github"), 300);
        }
        break;

      case "contact":
        addOutput([
          "",
          "  \x1b[purple]Opening Contact form window...\x1b[/]",
          "",
        ]);
        if (onOpenApp) {
          setTimeout(() => onOpenApp("contact"), 300);
        }
        break;

      case "run":
      case "code":
        addOutput([
          "",
          "  \x1b[yellow]Opening Code Runner window...\x1b[/]",
          "  \x1b[gray]Powered by Piston API — supports 50+ languages\x1b[/]",
          "",
        ]);
        if (onOpenApp) {
          setTimeout(() => onOpenApp("codeeditor"), 300);
        }
        break;

      case "resume":
        addOutput([
          "",
          "  \x1b[green]Downloading resume...\x1b[/]",
          "  \x1b[gray](Resume download link will be configured)\x1b[/]",
          "",
        ]);
        break;

      case "date":
        addOutput(["", `  \x1b[cyan]${new Date().toString()}\x1b[/]`, ""]);
        break;

      case "echo":
        addOutput([`  ${args || ""}`]);
        break;

      case "clear":
      case "cls":
        setLines([]);
        break;

      case "banner":
        addOutput(WELCOME_MSG);
        break;

      case "history":
        if (commandHistory.length === 0) {
          addOutput(["", "  \x1b[gray]No commands in history.\x1b[/]", ""]);
        } else {
          addOutput([
            "",
            "  \x1b[cyan]Command History:\x1b[/]",
            "",
            ...commandHistory.map(
              (c, i) =>
                `  \x1b[gray]${String(i + 1).padStart(4, " ")}\x1b[/]  ${c}`,
            ),
            "",
          ]);
        }
        break;

      case "ls":
        addOutput([
          "",
          "  \x1b[blue]about/\x1b[/]   \x1b[blue]projects/\x1b[/]   \x1b[blue]skills/\x1b[/]   \x1b[green]resume.pdf\x1b[/]   \x1b[green]README.md\x1b[/]",
          "",
        ]);
        break;

      case "pwd":
        addOutput(["", "  /home/sjxsubham/portfolio", ""]);
        break;

      case "cd":
        addOutput(["", `  \x1b[gray]Navigated to ${args || "~"}\x1b[/]`, ""]);
        break;

      case "cat":
        if (args.toLowerCase().includes("readme")) {
          addOutput([
            "",
            "  \x1b[yellow]# SjxSubhamOS Portfolio\x1b[/]",
            "",
            "  A terminal-based portfolio operating system.",
            "  Built with React, Tailwind CSS, and Piston API.",
            "",
            "  \x1b[green]Author:\x1b[/] Subham Mondal",
            "  \x1b[green]License:\x1b[/] MIT",
            "",
          ]);
        } else {
          addOutput([
            `  \x1b[red]cat: ${args || "?"}: No such file or directory\x1b[/]`,
          ]);
        }
        break;

      case "sudo":
        if (trimmed.includes("rm -rf")) {
          setIsProcessing(true);
          addOutput([
            "",
            "  \x1b[red]☠  INITIATING SYSTEM DESTRUCTION... ☠\x1b[/]",
          ]);
          await new Promise((r) => setTimeout(r, 800));
          addOutput([
            "  \x1b[red]  Deleting /home/sjxsubham/skills... ████████░░ 80%\x1b[/]",
          ]);
          await new Promise((r) => setTimeout(r, 600));
          addOutput([
            "  \x1b[red]  Deleting /home/sjxsubham/projects... ██████░░░░ 60%\x1b[/]",
          ]);
          await new Promise((r) => setTimeout(r, 600));
          addOutput([
            "  \x1b[red]  Deleting /home/sjxsubham/life... ████░░░░░░ 40%\x1b[/]",
          ]);
          await new Promise((r) => setTimeout(r, 800));
          addOutput([
            "",
            "  \x1b[green]  Just kidding! 😄 Nice try though.\x1b[/]",
            "  \x1b[gray]  Pro tip: Never run sudo rm -rf on a real system.\x1b[/]",
            "",
          ]);
          setIsProcessing(false);
        } else {
          addOutput([
            "",
            `  \x1b[red][sudo] password for sjxsubham: Nice try! 🔒\x1b[/]`,
            "",
          ]);
        }
        break;

      case "exit":
      case "quit":
        addOutput([
          "",
          "  \x1b[yellow]You can't escape this portfolio that easily! 😄\x1b[/]",
          '  \x1b[gray]But thanks for visiting! Type "contact" to get in touch.\x1b[/]',
          "",
        ]);
        break;

      case "matrix":
        addOutput([
          "",
          "  \x1b[green]Wake up, Neo...\x1b[/]",
          "  \x1b[green]The Matrix has you...\x1b[/]",
          "  \x1b[green]Follow the white rabbit. 🐇\x1b[/]",
          "",
        ]);
        break;

      case "ping":
        addOutput([
          "",
          `  \x1b[cyan]PING ${args || "sjxsubham.dev"} — 64 bytes: time=0.42ms TTL=64\x1b[/]`,
          `  \x1b[cyan]PING ${args || "sjxsubham.dev"} — 64 bytes: time=0.38ms TTL=64\x1b[/]`,
          `  \x1b[cyan]PING ${args || "sjxsubham.dev"} — 64 bytes: time=0.41ms TTL=64\x1b[/]`,
          "",
          `  \x1b[gray]--- ${args || "sjxsubham.dev"} ping statistics ---\x1b[/]`,
          `  \x1b[gray]3 packets transmitted, 3 received, 0% packet loss\x1b[/]`,
          "",
        ]);
        break;

      case "cowsay":
        const msg = args || "Moo! Hire SjxSubham!";
        const border = "-".repeat(msg.length + 2);
        addOutput([
          "",
          `   ${border}`,
          `  < ${msg} >`,
          `   ${border}`,
          "          \\   ^__^",
          "           \\  (oo)\\_______",
          "              (__)\\       )\\/\\",
          "                  ||----w |",
          "                  ||     ||",
          "",
        ]);
        break;

      case "fortune":
        const fortunes = [
          '"The best way to predict the future is to implement it." — David Heinemeier Hansson',
          '"First, solve the problem. Then, write the code." — John Johnson',
          '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
          '"Simplicity is the soul of efficiency." — Austin Freeman',
          '"Make it work, make it right, make it fast." — Kent Beck',
        ];
        const f = fortunes[Math.floor(Math.random() * fortunes.length)];
        addOutput(["", `  \x1b[yellow]${f}\x1b[/]`, ""]);
        break;

      default:
        addOutput([
          "",
          `  \x1b[red]Command not found:\x1b[/] ${cmd}`,
          `  \x1b[gray]Type "help" for available commands.\x1b[/]`,
          "",
        ]);
    }
  };

  const handleKeyDown = (e) => {
    if (isProcessing) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input;
      setInput("");
      processCommand(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex] || "");
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const commands = [
        "help",
        "neofetch",
        "whoami",
        "about",
        "skills",
        "projects",
        "social",
        "leetcode",
        "github",
        "contact",
        "run",
        "resume",
        "date",
        "echo",
        "clear",
        "banner",
        "history",
        "ls",
        "pwd",
        "cd",
        "cat",
        "sudo",
        "exit",
        "matrix",
        "ping",
        "cowsay",
        "fortune",
      ];
      const match = commands.filter((c) => c.startsWith(input.toLowerCase()));
      if (match.length === 1) {
        setInput(match[0]);
      } else if (match.length > 1) {
        addPromptLine(input);
        addOutput([`  ${match.join("  ")}`]);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="h-full flex flex-col bg-[#0a0e14] text-[#94a3b8] font-mono cursor-text"
      onClick={handleContainerClick}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0d1117] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] text-white/20">
          <span className="px-1.5 py-0.5 bg-white/5 rounded text-green-400/60">
            bash
          </span>
          <span>—</span>
          <span>sjxsubham@portfolio:~</span>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b #0a0e14" }}
      >
        {lines.map((line, i) => (
          <TerminalLine key={i} parts={line.parts} />
        ))}

        {/* Current input line */}
        {!isProcessing && (
          <div
            className="flex items-center whitespace-pre font-mono leading-[1.55]"
            style={{ fontSize: "12.5px" }}
          >
            <span style={{ color: colorMap.green }}>sjxsubham</span>
            <span style={{ color: colorMap.white }}>@</span>
            <span style={{ color: colorMap.purple }}>portfolio</span>
            <span style={{ color: colorMap.white }}>:~$ </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-[#e2e8f0] font-mono caret-green-400"
                style={{ fontSize: "12.5px", lineHeight: "1.55" }}
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="flex items-center gap-2 text-yellow-400/60 text-xs font-mono py-1">
            <span className="animate-spin">⣾</span>
            <span>Processing...</span>
          </div>
        )}

        <div ref={linesEndRef} />
      </div>
    </div>
  );
};

export default TerminalApp;
