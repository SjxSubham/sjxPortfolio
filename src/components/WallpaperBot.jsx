import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my code a joke... it didn't get it. Turns out it had no sense of humor.",
  "Why did the developer go broke? Because they used up all their cache.",
  "What's a programmer's favorite hangout spot? The Foo Bar.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "I tried to catch some fog... but I mist.",
  "Why did the function break up with the loop? It felt stuck in a cycle.",
  "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
  "Why did the database refuse to hang out? It couldn't find a good connection.",
  "Debugging: removing the needles from the haystack.",
];

const parseCsvRow = (row) => {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i += 1) {
    const char = row[i];
    const next = row[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
};

const parseCsv = (text) => {
  const rows = text.trim().split(/\r?\n/).filter(Boolean);
  if (rows.length <= 1) return [];

  return rows.slice(1).map((row) => {
    const [keywords, answer] = parseCsvRow(row);
    return {
      keywords: keywords || "",
      answer: answer || "",
    };
  });
};

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "could",
  "do",
  "for",
  "from",
  "how",
  "i",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "the",
  "to",
  "what",
  "when",
  "where",
  "who",
  "why",
  "you",
  "your",
]);

const extractTopic = (question) => {
  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !STOPWORDS.has(word));

  if (!words.length) return "";
  return words.slice(0, 3).join(" ");
};

const generateAnswer = (question) => {
  const normalized = question.toLowerCase();
  const topic = extractTopic(question);

  if (/(^|\s)(hi|hello|hey|yo)(\s|!|\?|$)/.test(normalized)) {
    return "Hey! I can answer from my CSV notes and share a tech joke. Ask about skills, projects, or socials.";
  }

  if (normalized.includes("help") || normalized.includes("what can you do")) {
    return "I answer questions from a CSV knowledge base and add a joke. Try: skills, projects, email, GitHub, or location.";
  }

  if (normalized.includes("joke")) {
    return "You got it—here's a fresh one plus your info.";
  }

  return `Interesting question about ${topic || "that topic"}. I'm a local bot without internet, so here's a quick take: break it into smaller parts, validate assumptions, and test iteratively.`;
};

const PROFILE = {
  name: "Subham Mondal",
  role: "Full Stack Developer",
  location: "Kolkata, India",
  email: "sjxsubham@gmail.com",
  status: "Available for work",
  languages: "English, Hindi, Bengali",
  skills: ["React", "Node.js", "Python"],
  socials: [
    { label: "GitHub", href: "https://github.com/SjxSubham" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/subham-mondal-914b0b2b8",
    },
    { label: "X", href: "https://x.com/SjxSubham4249" },
    { label: "LeetCode", href: "https://leetcode.com/u/Sjx_Subham/" },
  ],
  projectsNote: "Open the Projects window for highlights.",
};

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const WallpaperBot = () => {
  const [input, setInput] = useState("");
  const [knowledge, setKnowledge] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: makeId(),
      role: "bot",
      type: "intro",
      joke: JOKES[0],
      answer: "Ask me about your name, skills, projects, or socials.",
    },
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/bot_knowledge.csv")
      .then((response) => response.text())
      .then((text) => {
        if (!isMounted) return;
        setKnowledge(parseCsv(text));
      })
      .catch(() => {
        if (!isMounted) return;
        setKnowledge([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const findAnswer = (question) => {
    if (!knowledge.length) return null;
    const normalized = question.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    knowledge.forEach((row) => {
      const keywords = row.keywords
        .split("|")
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean);

      keywords.forEach((keyword) => {
        if (normalized.includes(keyword) && keyword.length > bestScore) {
          bestMatch = row.answer;
          bestScore = keyword.length;
        }
      });
    });

    return bestMatch;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;

    const joke = JOKES[Math.floor(Math.random() * JOKES.length)];
    const answer = findAnswer(question) || generateAnswer(question);

    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: "user", text: question },
      { id: makeId(), role: "bot", joke, answer, type: "reply" },
    ]);
    setInput("");
  };

  return (
    <div className="absolute right-6 bottom-20 w-[320px] max-h-[70vh] z-[5] pointer-events-auto">
      <div className="bg-[#121018]/90 backdrop-blur-xl border border-amber-400/20 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-white/80">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
              <Sparkles size={16} className="text-amber-300" />
            </span>
            <div>
              <p className="text-sm font-display">Studio Bot</p>
              <p className="text-[10px] text-white/40">
                Local joke engine + profile info
              </p>
            </div>
          </div>
          <MessageCircle size={16} className="text-white/30" />
        </div>

        <div
          ref={listRef}
          className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3"
        >
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              {msg.role === "user" ? (
                <div className="ml-auto max-w-[85%] rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-[11px] text-white/80">
                  {msg.text}
                </div>
              ) : (
                <div className="rounded-xl bg-amber-500/10 border border-amber-400/20 px-3 py-3 text-[11px] text-white/70 space-y-2">
                  <p className="text-amber-100/90">
                    <span className="font-semibold">Joke:</span> {msg.joke}
                  </p>
                  {msg.answer && (
                    <p className="text-white/80">
                      <span className="font-semibold">Answer:</span>{" "}
                      {msg.answer}
                    </p>
                  )}
                  <div className="space-y-1 text-white/60">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Profile
                    </p>
                    <p>
                      <span className="text-white/80">Name:</span>{" "}
                      {PROFILE.name}
                    </p>
                    <p>
                      <span className="text-white/80">Role:</span>{" "}
                      {PROFILE.role}
                    </p>
                    <p>
                      <span className="text-white/80">Location:</span>{" "}
                      {PROFILE.location}
                    </p>
                    <p>
                      <span className="text-white/80">Email:</span>{" "}
                      {PROFILE.email}
                    </p>
                    <p>
                      <span className="text-white/80">Status:</span>{" "}
                      {PROFILE.status}
                    </p>
                    <p>
                      <span className="text-white/80">Languages:</span>{" "}
                      {PROFILE.languages}
                    </p>
                    <p>
                      <span className="text-white/80">Skills:</span>{" "}
                      {PROFILE.skills.join(", ")}
                    </p>
                    <p>
                      <span className="text-white/80">Projects:</span>{" "}
                      {PROFILE.projectsNote}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {PROFILE.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-white/10"
        >
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent text-[12px] text-white/80 placeholder:text-white/30 outline-none"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 flex items-center justify-center transition"
            >
              <Send size={14} className="text-amber-200" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WallpaperBot;
