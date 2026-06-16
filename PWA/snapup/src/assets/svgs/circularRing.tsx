type CircularRingProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
};

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const CircularRing = ({
  progress,
  size = 96,
  strokeWidth = 7,
}: CircularRingProps) => {
  const clamped = Math.min(1, Math.max(0, progress));
  const dashoffset = CIRCUMFERENCE * (1 - clamped);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: "block" }}
    >
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="var(--su-ring-track-bg)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="var(--su-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashoffset}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
};
