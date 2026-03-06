import { useState, useCallback, useEffect } from "react";
import Boot from "./components/Boot";
import Desktop from "./components/Desktop";

function App() {
  const [phase, setPhase] = useState("boot"); // boot, desktop

  const handleBootComplete = useCallback(() => {
    setPhase("desktop");
  }, []);

  // ESC key to skip boot
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && phase === "boot") {
        handleBootComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, handleBootComplete]);

  // Force dark mode for OS theme
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#0a0a0f";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0f]">
      {phase === "boot" && <Boot onBootComplete={handleBootComplete} />}
      {phase === "desktop" && <Desktop />}
    </div>
  );
}

export default App;
