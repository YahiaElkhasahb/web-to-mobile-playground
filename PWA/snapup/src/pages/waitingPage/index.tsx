import { RingCard } from "../homePage/components/RingCard";
import { CheckInItem } from "../homePage/components/CheckInItem";
import { useEffect, useState } from "react";
import { AppIcon } from "../../assets/svgs/appIcon";
import { ClockIcon } from "../../assets/svgs/clockIcon";

type WaitingPageProps = {
  workStart: string;
};

const yesterdayCheckIns = [
  { id: "1", dotVar: "--su-dot-water", name: "Water break", time: "5:45 PM" },
  { id: "2", dotVar: "--su-dot-move", name: "Movement break", time: "4:30 PM" },
  { id: "3", dotVar: "--su-dot-water", name: "Water break", time: "3:15 PM" },
];

export const WaitingPage = ({ workStart }: WaitingPageProps) => {
  const [currentTime, setCurrentTime] = useState(() => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000); // update every second (you can change to 60000 for every minute)

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 24px)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "var(--su-page-pad)",
        paddingRight: "var(--su-page-pad)",
        background: "var(--su-bg-base)",
        maxWidth: "var(--su-max-width)",
        margin: "0 auto",
      }}
    >
      {/* Brand header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--su-space-sm)",
          marginBottom: "var(--su-space-lg)",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--su-radius-md)",
            background: "var(--su-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <AppIcon />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              font: "var(--su-font-subhead)",
              color: "var(--su-text-primary)",
            }}
          >
            SnapUp
          </span>
          <span
            style={{
              font: "var(--su-font-caption)",
              color: "var(--su-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Wellness Companion
          </span>
        </div>
      </div>

      {/* Paused ring cards */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: "var(--su-space-md)" }}
      >
        <RingCard
          emoji="💧"
          label="WATER"
          countdown="—:—"
          durationLabel="paused"
          progress={0}
          isPaused
        />
        <RingCard
          emoji="🏃"
          label="MOVE"
          countdown="—:—"
          durationLabel="paused"
          progress={0}
          isPaused
        />
      </div>

      {/* Info card */}
      <div
        style={{
          background: "var(--su-bg-surface)",
          borderRadius: "var(--su-radius-lg)",
          padding: "var(--su-space-md)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--su-space-sm)",
          textAlign: "center",
          marginBottom: "var(--su-space-md)",
        }}
      >
        <ClockIcon />
        <p
          style={{
            font: "var(--su-font-subhead)",
            color: "var(--su-text-primary)",
            margin: 0,
          }}
        >
          Your work day starts at{" "}
          <span style={{ color: "var(--su-accent)" }}>{workStart}</span>
        </p>
        <p
          style={{
            font: "var(--su-font-body)",
            color: "var(--su-text-secondary)",
            margin: 0,
          }}
        >
          Timers will kick in automatically. Until then — rest up.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--su-text-muted)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              font: "var(--su-font-caption)",
              color: "var(--su-text-muted)",
            }}
          >
            Currently {currentTime}
          </span>
        </div>
      </div>

      {/* Yesterday's check-ins */}
      <p
        style={{
          font: "var(--su-font-caption)",
          color: "var(--su-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          margin: "0 0 var(--su-space-xs)",
        }}
      >
        Yesterday&apos;s Check-Ins
      </p>

      <div>
        {yesterdayCheckIns.map((item) => (
          <CheckInItem
            key={item.id}
            dotVar={item.dotVar}
            name={item.name}
            time={item.time}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          paddingTop: "var(--su-space-md)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            font: "var(--su-font-caption)",
            color: "var(--su-text-muted)",
            margin: 0,
          }}
        >
          Timers start when your work day begins
        </p>
      </div>
    </div>
  );
};
