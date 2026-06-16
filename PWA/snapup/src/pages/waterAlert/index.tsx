type WaterAlertPageProps = {
  onDismiss: () => void;
  onDone: () => void;
};

export const WaterAlertPage = ({ onDismiss, onDone }: WaterAlertPageProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        paddingTop: "calc(env(safe-area-inset-top) + 24px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)",
        paddingLeft: "var(--su-page-pad)",
        paddingRight: "var(--su-page-pad)",
        // background: "var(--su-bg-base)",
        maxWidth: "var(--su-max-width)",
        margin: "0 auto",
      }}
    >
      {/* Icon bubble */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "var(--su-radius-pill)",
          background: "var(--su-bg-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--su-space-lg)",
        }}
      >
        <span style={{ fontSize: 36 }}>💧</span>
      </div>

      {/* Heading */}
      <h1
        style={{
          font: "var(--su-font-heading)",
          color: "var(--su-text-primary)",
          margin: "0 0 var(--su-space-xs)",
          textAlign: "center",
        }}
      >
        Time to hydrate
      </h1>

      {/* Subtitle */}
      <p
        style={{
          font: "var(--su-font-body)",
          color: "var(--su-text-secondary)",
          textAlign: "center",
          maxWidth: 220,
          margin: "0 0 var(--su-space-xl)",
        }}
      >
        Your brain is 75% water. Keep it sharp.
      </p>

      {/* CTA button */}
      <button
        onClick={onDone}
        style={{
          width: "100%",
          padding: "14px var(--su-space-md)",
          border: "1.5px solid var(--su-border-default)",
          borderRadius: "var(--su-radius-pill)",
          background: "transparent",
          color: "var(--su-text-primary)",
          font: "var(--su-font-subhead)",
          cursor: "pointer",
          marginBottom: "var(--su-space-sm)",
        }}
      >
        ✓ Done, I drank water
      </button>

      {/* Dismiss link */}
      <button
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          font: "var(--su-font-caption)",
          color: "var(--su-text-muted)",
          cursor: "pointer",
        }}
      >
        Tap to dismiss
      </button>
    </div>
  );
};
