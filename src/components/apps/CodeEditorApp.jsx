import { useState, useRef, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  Terminal,
  Trash2,
} from "lucide-react";

const LANGUAGES = [
  {
    id: "python",
    name: "Python",
    version: "3.10.0",
    icon: "🐍",
    template: `# Python 3.10 — SjxSubhamOS Code Runner
# Write your code below and hit Run!

def greet(name):
    return f"Hello, {name}! Welcome to SjxSubhamOS 🚀"

print(greet("World"))
print()

# Quick fibonacci
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=" ")
        a, b = b, a + b
    print()

print("Fibonacci sequence (first 10):")
fib(10)
`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    version: "18.15.0",
    icon: "🟨",
    template: `// JavaScript (Node.js 18) — SjxSubhamOS Code Runner
// Write your code below and hit Run!

const greet = (name) => \`Hello, \${name}! Welcome to SjxSubhamOS 🚀\`;

console.log(greet("World"));
console.log();

// Array operations
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);

console.log("Even numbers:", evens.join(", "));
console.log("Sum of 1-10:", sum);
`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    version: "5.0.3",
    icon: "🔷",
    template: `// TypeScript 5.0 — SjxSubhamOS Code Runner

interface Developer {
  name: string;
  role: string;
  skills: string[];
}

const subham: Developer = {
  name: "Subham Mondal",
  role: "Full Stack Developer",
  skills: ["React", "Node.js", "TypeScript", "Python"]
};

console.log(\`\${subham.name} — \${subham.role}\`);
console.log(\`Skills: \${subham.skills.join(", ")}\`);
`,
  },
  {
    id: "cpp",
    name: "C++",
    version: "10.2.0",
    icon: "⚙️",
    template: `// C++ 10.2 — SjxSubhamOS Code Runner
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    cout << "Hello from C++! Welcome to SjxSubhamOS 🚀" << endl;
    cout << endl;

    // Vector operations
    vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6, 10};

    sort(nums.begin(), nums.end());

    cout << "Sorted: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    cout << "Min: " << *min_element(nums.begin(), nums.end()) << endl;
    cout << "Max: " << *max_element(nums.begin(), nums.end()) << endl;

    return 0;
}
`,
  },
  {
    id: "c",
    name: "C",
    version: "10.2.0",
    icon: "🔧",
    template: `// C 10.2 — SjxSubhamOS Code Runner
#include <stdio.h>
#include <string.h>

int main() {
    printf("Hello from C! Welcome to SjxSubhamOS 🚀\\n\\n");

    // Simple pattern
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    printf("\\nPattern complete!\\n");
    return 0;
}
`,
  },
  {
    id: "java",
    name: "Java",
    version: "15.0.2",
    icon: "☕",
    template: `// Java 15 — SjxSubhamOS Code Runner
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java! Welcome to SjxSubhamOS 🚀");
        System.out.println();

        // Factorial
        int n = 10;
        long factorial = 1;
        for (int i = 2; i <= n; i++) {
            factorial *= i;
        }
        System.out.println(n + "! = " + factorial);

        // String reversal
        String str = "SjxSubhamOS";
        String reversed = new StringBuilder(str).reverse().toString();
        System.out.println("Reversed: " + reversed);
    }
}
`,
  },
  {
    id: "rust",
    name: "Rust",
    version: "1.68.2",
    icon: "🦀",
    template: `// Rust 1.68 — SjxSubhamOS Code Runner

fn main() {
    println!("Hello from Rust! Welcome to SjxSubhamOS 🚀");
    println!();

    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    let product: i64 = numbers.iter().map(|&x| x as i64).product();

    println!("Numbers: {:?}", numbers);
    println!("Sum: {}", sum);
    println!("Product: {}", product);

    // Pattern matching
    for i in 1..=15 {
        match (i % 3 == 0, i % 5 == 0) {
            (true, true) => println!("{}: FizzBuzz", i),
            (true, false) => println!("{}: Fizz", i),
            (false, true) => println!("{}: Buzz", i),
            _ => println!("{}", i),
        }
    }
}
`,
  },
  {
    id: "go",
    name: "Go",
    version: "1.16.2",
    icon: "🐹",
    template: `// Go 1.16 — SjxSubhamOS Code Runner
package main

import (
    "fmt"
    "strings"
)

func main() {
    fmt.Println("Hello from Go! Welcome to SjxSubhamOS 🚀")
    fmt.Println()

    // String building
    words := []string{"Full", "Stack", "Developer"}
    fmt.Println(strings.Join(words, " "))

    // FizzBuzz
    for i := 1; i <= 15; i++ {
        switch {
        case i%15 == 0:
            fmt.Printf("%d: FizzBuzz\\n", i)
        case i%3 == 0:
            fmt.Printf("%d: Fizz\\n", i)
        case i%5 == 0:
            fmt.Printf("%d: Buzz\\n", i)
        default:
            fmt.Println(i)
        }
    }
}
`,
  },
];

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

const CodeEditorApp = () => {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].template);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [execTime, setExecTime] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [outputType, setOutputType] = useState("idle"); // idle, success, error, running
  const textareaRef = useRef(null);
  const langMenuRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setCode(lang.template);
    setOutput("");
    setExecTime(null);
    setError(null);
    setOutputType("idle");
    setShowLangMenu(false);
  };

  const handleRun = async () => {
    if (isRunning || !code.trim()) return;

    setIsRunning(true);
    setOutput("");
    setError(null);
    setExecTime(null);
    setOutputType("running");

    const startTime = performance.now();

    try {
      const response = await fetch(PISTON_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang.id === "cpp" ? "c++" : selectedLang.id,
          version: selectedLang.version,
          files: [{ content: code }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecTime(elapsed);

      if (result.run) {
        const stdout = result.run.stdout || "";
        const stderr = result.run.stderr || "";

        if (result.run.code !== 0 && stderr) {
          setOutput(stderr);
          setOutputType("error");
          setError(`Process exited with code ${result.run.code}`);
        } else if (stderr && stdout) {
          setOutput(stdout + "\n--- stderr ---\n" + stderr);
          setOutputType("success");
        } else if (stderr) {
          setOutput(stderr);
          setOutputType("error");
        } else {
          setOutput(stdout || "(No output)");
          setOutputType("success");
        }
      } else if (result.compile && result.compile.stderr) {
        setOutput(result.compile.stderr);
        setOutputType("error");
        setError("Compilation failed");
      } else {
        setOutput("No output returned from execution.");
        setOutputType("error");
      }
    } catch (err) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecTime(elapsed);
      setOutput(
        err.message ||
          "Failed to execute code. Check your internet connection.",
      );
      setOutputType("error");
      setError("Execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setOutput("");
    setExecTime(null);
    setError(null);
    setOutputType("idle");
  };

  const handleReset = () => {
    setCode(selectedLang.template);
    setOutput("");
    setExecTime(null);
    setError(null);
    setOutputType("idle");
  };

  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
      return;
    }

    // Tab key inserts spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      });
    }
  };

  const lineCount = code.split("\n").length;

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d1117] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-xs text-white/80 transition-all duration-200"
            >
              <span>{selectedLang.icon}</span>
              <span className="font-medium">{selectedLang.name}</span>
              <span className="text-white/30 text-[10px]">
                v{selectedLang.version}
              </span>
              <ChevronDown
                size={12}
                className={`text-white/30 transition-transform duration-200 ${showLangMenu ? "rotate-180" : ""}`}
              />
            </button>

            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#161b22] border border-white/10 rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden animate-dropdownIn">
                <div className="p-1.5">
                  <div className="px-2 py-1.5 text-[10px] text-white/30 uppercase tracking-wider font-medium">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 ${
                        selectedLang.id === lang.id
                          ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                          : "text-white/60 hover:bg-white/5 hover:text-white/90 border border-transparent"
                      }`}
                    >
                      <span className="text-sm">{lang.icon}</span>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-[10px] text-white/25">
                          v{lang.version}
                        </span>
                      </div>
                      {selectedLang.id === lang.id && (
                        <Check size={12} className="ml-auto text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-white/10" />

          {/* Action buttons */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            title="Copy code"
          >
            {copied ? (
              <Check size={12} className="text-green-400" />
            ) : (
              <Copy size={12} />
            )}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            title="Reset to template"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        </div>

        {/* Run button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
            isRunning
              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 cursor-not-allowed"
              : "bg-green-500/15 hover:bg-green-500/25 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
          }`}
        >
          {isRunning ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play size={13} fill="currentColor" />
              Run
              <span className="text-[9px] text-white/20 ml-1 font-normal">
                Ctrl+↵
              </span>
            </>
          )}
        </button>
      </div>

      {/* Main content area: Editor + Output */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex overflow-hidden min-h-0 border-b border-white/5">
          {/* Line numbers */}
          <div
            className="shrink-0 bg-[#080b10] text-white/15 text-[11px] font-mono leading-[1.7] px-3 py-3 text-right select-none overflow-hidden border-r border-white/5"
            style={{ minWidth: "44px" }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-[#0a0e14] text-[#c9d1d9] text-[12.5px] font-mono leading-[1.7] p-3 resize-none outline-none overflow-auto placeholder:text-white/15"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Write your code here..."
            style={{
              tabSize: 4,
              scrollbarWidth: "thin",
              scrollbarColor: "#1e293b #0a0e14",
            }}
          />
        </div>

        {/* Output Panel */}
        <div
          className="shrink-0 flex flex-col"
          style={{ height: "35%", minHeight: "120px" }}
        >
          {/* Output header */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#0d1117] border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal
                size={12}
                className={`${
                  outputType === "error"
                    ? "text-red-400"
                    : outputType === "success"
                      ? "text-green-400"
                      : outputType === "running"
                        ? "text-yellow-400 animate-pulse"
                        : "text-white/30"
                }`}
              />
              <span className="text-[11px] font-medium text-white/50">
                Output
              </span>

              {/* Status badge */}
              {outputType === "success" && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-400">
                  <span className="w-1 h-1 bg-green-400 rounded-full" />
                  Success
                </span>
              )}
              {outputType === "error" && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] text-red-400">
                  <span className="w-1 h-1 bg-red-400 rounded-full" />
                  {error || "Error"}
                </span>
              )}
              {outputType === "running" && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] text-yellow-400">
                  <Loader2 size={8} className="animate-spin" />
                  Executing...
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {execTime && (
                <span className="text-[10px] text-white/20 font-mono">
                  {execTime}s
                </span>
              )}
              {output && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200"
                  title="Clear output"
                >
                  <Trash2 size={10} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Output content */}
          <div
            ref={outputRef}
            className="flex-1 overflow-auto p-3 font-mono text-[12px] leading-[1.65]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1e293b #0a0e14",
            }}
          >
            {outputType === "idle" && !output && (
              <div className="h-full flex flex-col items-center justify-center text-white/15 text-xs gap-2">
                <Terminal size={24} />
                <span>Run your code to see output here</span>
                <span className="text-[10px] text-white/10">
                  Press Ctrl + Enter to execute
                </span>
              </div>
            )}

            {outputType === "running" && (
              <div className="h-full flex flex-col items-center justify-center text-yellow-400/50 text-xs gap-2">
                <Loader2 size={20} className="animate-spin" />
                <span>Executing {selectedLang.name} code...</span>
              </div>
            )}

            {output && outputType !== "running" && (
              <pre
                className={`whitespace-pre-wrap break-words ${
                  outputType === "error"
                    ? "text-red-400/80"
                    : "text-green-300/90"
                }`}
              >
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0d1117] border-t border-white/5 shrink-0 text-[10px] text-white/20 font-mono">
        <div className="flex items-center gap-3">
          <span>
            {selectedLang.icon} {selectedLang.name}
          </span>
          <span>Ln {lineCount}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Piston API</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Connected
          </span>
        </div>
      </div>

      <style>{`
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-4px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dropdownIn {
          animation: dropdownIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default CodeEditorApp;
