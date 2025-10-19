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
   {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function App() {
  return (
    <div >
      
      <ThemeToggle />
    </div>
  );
}

export default App;
