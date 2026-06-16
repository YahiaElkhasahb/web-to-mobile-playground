type CheckInItemProps = {
  dotVar: string;
  name: string;
  time: string;
};

export const CheckInItem = ({ dotVar, name, time }: CheckInItemProps) => {
  return (
    <div
      style={{
        height: 40,
        display: "flex",
        alignItems: "center",
        gap: "var(--su-space-xs)",
        borderBottom: "0.5px solid var(--su-border-subtle)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "var(--su-radius-pill)",
          backgroundColor: `var(${dotVar})`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          flex: 1,
          font: "var(--su-font-body)",
          color: "var(--su-text-primary)",
        }}
      >
        {name}
      </span>
      <span
        style={{
          font: "var(--su-font-caption)",
          color: "var(--su-text-faint)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </span>
    </div>
  );
};
