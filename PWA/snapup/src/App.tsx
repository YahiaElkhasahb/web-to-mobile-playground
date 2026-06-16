import { useEffect, useState } from "react";
import { OnboardingPage } from "./pages/onboarding";
import { HomePage } from "./pages/homePage";
import { WaterAlertPage } from "./pages/waterAlert";
import { MovementAlertPage } from "./pages/movementAlert";
import { WaitingPage } from "./pages/waitingPage";
import { parseTimeToDate } from "./utils/time";

type Screen =
  | "onboarding"
  | "waiting"
  | "home"
  | "water-alert"
  | "movement-alert";

export const App = () => {
  const [screen, setScreen] = useState<Screen>("onboarding");

  const [workStart, setWorkStart] = useState("9:00 AM");

  const [now, setNow] = useState(new Date());

  const [checkIns, setCheckIns] = useState<any[]>([]);

  useEffect(() => {
    console.log(
      "standalone:",
      window.matchMedia("(display-mode: standalone)").matches,
    );
  }, []);

  // LIVE CLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // AUTO WAITING -> HOME
  useEffect(() => {
    if (screen !== "waiting") return;

    const startTime = parseTimeToDate(workStart);

    if (now >= startTime) {
      setScreen("home");
    }
  }, [now, workStart, screen]);

  // ONBOARDING
  if (screen === "onboarding") {
    return (
      <OnboardingPage
        onContinue={(ws) => {
          setWorkStart(ws);
          setScreen("waiting");
        }}
      />
    );
  }

  // WAITING
  if (screen === "waiting") {
    return <WaitingPage workStart={workStart} />;
  }

  return (
    <div style={{ position: "relative" }}>
      {/* HOME ALWAYS UNDER */}
      <HomePage
        workStart={workStart}
        setScreen={setScreen}
        checkIns={checkIns}
      />

      {/* WATER OVERLAY */}
      {screen === "water-alert" && (
        <WaterAlertPage
          onDone={() => {
            setCheckIns((prev) => [
              {
                id: Date.now().toString(),
                dotVar: "--su-dot-water",
                name: "Water break",
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              ...prev,
            ]);

            setScreen("home");
          }}
          onDismiss={() => {
            setScreen("home");
          }}
        />
      )}

      {/* MOVE OVERLAY */}
      {screen === "movement-alert" && (
        <MovementAlertPage
          onDismiss={() => setScreen("home")}
          onDone={() => {
            setCheckIns((prev) => [
              {
                id: Date.now().toString(),
                dotVar: "--su-dot-move",
                name: "Movement break",
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              ...prev,
            ]);

            setScreen("home");
          }}
        />
      )}
    </div>
  );
};
