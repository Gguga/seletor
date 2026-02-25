import { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { FormScreen } from "./components/FormScreen";
import { ResultScreen } from "./components/ResultScreen";
import { AppState, UserData } from "./types";

export default function App() {
  const [appState, setAppState] = useState<AppState>("start");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleStart = () => {
    setAppState("form");
  };

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setAppState("result");
  };

  const handleReset = () => {
    setUserData(null);
    setAppState("start");
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] font-sans text-gray-900 selection:bg-[var(--color-brand-green)] selection:text-white">
      
      {appState === "start" && (
        <StartScreen onStart={handleStart} />
      )}

      {appState === "form" && (
        <FormScreen onSubmit={handleFormSubmit} />
      )}

      {appState === "result" && userData && (
        <ResultScreen data={userData} onReset={handleReset} />
      )}

    </div>
  );
}
