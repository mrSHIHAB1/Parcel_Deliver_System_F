import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-primary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Toggle {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">DaisyUI Dark/Light Mode</h1>
      <ThemeToggle />
    </div>
  );
}

export default App;
