import { RingCard } from "./components/RingCard";
import { CheckInItem } from "./components/CheckInItem";
import { useWellnessEngine } from "../../hooks/useWellnessEngine";
import { AppIcon } from "../../assets/svgs/appIcon";

export const HomePage = ({
  workStart,
  setScreen,
  checkIns,
}: {
  workStart: string;
  setScreen: (screen: any) => void;
  checkIns: any[];
}) => {
  const { now, waterProgress, moveProgress } = useWellnessEngine(
    workStart,
    setScreen,
  );

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
      {/* HEADER */}
      <div
        style={{ height: 56, marginBottom: "var(--su-space-lg)" }}
        className="flex items-center gap-3"
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
        <div className="flex flex-col gap-1">
          <span
            style={{
              font: "var(--su-font-subhead)",
              margin: 0,
              color: "var(--su-text-primary)",
            }}
          >
            SnapUp
          </span>

          <span
            style={{
              font: "var(--su-font-caption)",
              color: "var(--su-text-muted)",
            }}
          >
            {now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* RINGS */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: "var(--su-space-xl)",
        }}
      >
        <RingCard
          emoji="💧"
          label="WATER"
          countdown="15 min"
          durationLabel="cycle"
          progress={waterProgress}
        />

        <RingCard
          emoji="🏃"
          label="MOVE"
          countdown="45 min"
          durationLabel="cycle"
          progress={moveProgress}
        />
      </div>

      {/* CHECK-INS */}
      <p
        style={{
          font: "var(--su-font-caption)",
          color: "var(--su-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          margin: "0 0 var(--su-space-xs)",
        }}
      >
        Today&apos;s Check-Ins
      </p>

      <div style={{ maxHeight: 240, overflowY: "auto" }}>
        {checkIns.length === 0 ? (
          <p style={{ color: "var(--su-text-muted)" }}>No check-ins yet</p>
        ) : (
          checkIns.map((item) => (
            <CheckInItem
              key={item.id}
              dotVar={item.dotVar}
              name={item.name}
              time={item.time}
            />
          ))
        )}
      </div>

      {/* FOOTER */}
      <div
        style={{
          // marginTop: "auto",
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
          Keep this tab open while you work
        </p>
      </div>
    </div>
  );
};
