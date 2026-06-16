import { useState } from "react";
import { AppIcon } from "../../assets/svgs/appIcon";

const TIME_OPTIONS: string[] = [];
for (let h = 5; h <= 23; h++) {
  for (const m of [0, 30]) {
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const period = h < 12 ? "AM" : "PM";
    TIME_OPTIONS.push(`${hour}:${m === 0 ? "00" : m} ${period}`);
  }
}

type OnboardingPageProps = {
  onContinue: (workStart: string, workEnd: string) => void;
};

export const OnboardingPage = ({ onContinue }: OnboardingPageProps) => {
  const [workStart, setWorkStart] = useState("5:00 AM");
  const [workEnd, setWorkEnd] = useState("5:00 PM");

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 24px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)",
        paddingLeft: "var(--su-page-pad)",
        paddingRight: "var(--su-page-pad)",
        background: "var(--su-bg-base)",
        maxWidth: "var(--su-max-width)",
        margin: "0 auto",
        gap: "var(--su-space-lg)",
      }}
    >
      {/* Brand header */}
      <div className="flex items-center gap-3">
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

      {/* Hero block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--su-space-xs)",
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          <span style={{ color: "var(--su-text-primary)", display: "block" }}>
            Work hard.
          </span>
          <span style={{ color: "var(--su-accent)", display: "block" }}>
            Stay human.
          </span>
        </h1>
        <p
          style={{
            font: "var(--su-font-body)",
            color: "var(--su-text-secondary)",
            margin: 0,
          }}
        >
          SnapUp reminds you to drink water and move your body — automatically,
          while you work.
        </p>
      </div>

      {/* Work hours block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--su-space-md)",
        }}
      >
        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--su-space-sm)",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: "var(--su-border-default)",
            }}
          />
          <span
            style={{
              font: "var(--su-font-caption)",
              color: "var(--su-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
            }}
          >
            Set Your Work Hours
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "var(--su-border-default)",
            }}
          />
        </div>

        {/* Work starts */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--su-space-xs)",
          }}
        >
          <label
            style={{
              font: "var(--su-font-label)",
              color: "var(--su-text-secondary)",
            }}
          >
            Work starts
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={workStart}
              onChange={(e) => setWorkStart(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 40px 14px var(--su-space-md)",
                background: "var(--su-bg-surface)",
                border: "1px solid var(--su-border-default)",
                borderRadius: "var(--su-radius-md)",
                color: "var(--su-text-primary)",
                font: "var(--su-font-subhead)",
                appearance: "none",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--su-text-muted)",
                pointerEvents: "none",
                fontSize: 14,
              }}
            >
              ▾
            </span>
          </div>
        </div>

        {/* Work ends */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--su-space-xs)",
          }}
        >
          <label
            style={{
              font: "var(--su-font-label)",
              color: "var(--su-text-secondary)",
            }}
          >
            Work ends
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={workEnd}
              onChange={(e) => setWorkEnd(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 40px 14px var(--su-space-md)",
                background: "var(--su-bg-surface)",
                border: "1px solid var(--su-border-default)",
                borderRadius: "var(--su-radius-md)",
                color: "var(--su-text-primary)",
                font: "var(--su-font-subhead)",
                appearance: "none",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--su-text-muted)",
                pointerEvents: "none",
                fontSize: 14,
              }}
            >
              ▾
            </span>
          </div>
        </div>

        {/* Info note */}
        <div
          style={{
            display: "flex",
            gap: "var(--su-space-xs)",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              color: "var(--su-text-muted)",
              fontSize: 14,
              flexShrink: 0,
              lineHeight: "1.4",
            }}
          >
            ⓘ
          </span>
          <p
            style={{
              font: "var(--su-font-caption)",
              color: "var(--su-text-muted)",
              margin: 0,
            }}
          >
            Timers only run during your work hours. Outside these times
            everything pauses automatically.
          </p>
        </div>
      </div>

      {/* CTA + footer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--su-space-sm)",
          flex: "1",
          justifyContent: "space-around",
        }}
      >
        <p></p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onContinue(workStart, workEnd)}
            style={{
              width: "100%",
              padding: "16px var(--su-space-md)",
              background: "var(--su-text-primary)",
              color: "var(--su-bg-base)",
              border: "none",
              borderRadius: "var(--su-radius-lg)",
              font: "var(--su-font-subhead)",
              cursor: "pointer",
            }}
          >
            Start Protecting My Health
          </button>
          <p
            style={{
              font: "var(--su-font-caption)",
              color: "var(--su-text-muted)",
              textAlign: "center",
              margin: 0,
            }}
          >
            You can change your hours anytime in settings
          </p>
        </div>
      </div>
    </div>
  );
};
