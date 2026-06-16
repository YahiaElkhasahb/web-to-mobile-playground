import { CircularRing } from "../../../assets/svgs/CircularRing";

type RingCardProps = {
  emoji: string;
  label: string;
  countdown: string;
  durationLabel: string;
  progress: number;
  isPaused?: boolean;
};

export const RingCard = ({
  emoji,
  label,
  countdown,
  durationLabel,
  progress,
  isPaused,
}: RingCardProps) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--su-space-md) 16px",
        borderRadius: "var(--su-radius-lg)",
        background: "var(--su-bg-surface)",
        gap: "var(--su-space-xs)",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularRing progress={progress} size={96} strokeWidth={7} />
        <span style={{ position: "absolute", fontSize: 24 }}>{emoji}</span>
      </div>

      <span
        style={{
          font: "var(--su-font-label)",
          color: "var(--su-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </span>

      <span
        style={{
          font: "var(--su-font-timer)",
          color: isPaused ? "var(--su-text-muted)" : "var(--su-accent)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {countdown}
      </span>

      <span
        style={{
          font: "var(--su-font-caption)",
          color: "var(--su-text-faint)",
        }}
      >
        {durationLabel}
      </span>
    </div>
  );
};
