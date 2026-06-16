import { useEffect, useRef, useState } from "react";
import { parseTimeToDate } from "../utils/time";

export const useWellnessEngine = (
  workStart: string,
  setScreen: (screen: any) => void,
) => {
  const [now, setNow] = useState(new Date());

  const [started, setStarted] = useState(false);

  const [waterProgress, setWaterProgress] = useState(1);
  const [moveProgress, setMoveProgress] = useState(1);

  const [checkIns, setCheckIns] = useState<any[]>([]);

  const waterAlertShown = useRef(false);
  const moveAlertShown = useRef(false);

  const startTime = parseTimeToDate(workStart);

  // LIVE CLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();

      setNow(current);

      if (current >= startTime) {
        setStarted(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // MAIN ENGINE
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      const current = new Date();

      const diffMin = Math.floor(
        (current.getTime() - startTime.getTime()) / 60000,
      );

      // WATER
      const waterCycle = diffMin % 15;
      const waterRemaining = 1 - waterCycle / 15;

      setWaterProgress(waterRemaining);

      // MOVE
      const moveCycle = diffMin % 4;
      const moveRemaining = 1 - moveCycle / 4;

      setMoveProgress(moveRemaining);

      // WATER ALERT
      if (waterCycle === 0 && diffMin > 0) {
        if (!waterAlertShown.current) {
          setScreen("water-alert");
          waterAlertShown.current = true;
        }
      } else {
        waterAlertShown.current = false;
      }

      // MOVE ALERT
      if (moveCycle === 0 && diffMin > 0) {
        if (!moveAlertShown.current) {
          setScreen("movement-alert");
          moveAlertShown.current = true;
        }
      } else {
        moveAlertShown.current = false;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [started, startTime, setScreen]);

  const addWaterCheckIn = () => {
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
  };

  const addMoveCheckIn = () => {
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
  };

  return {
    now,
    started,
    waterProgress,
    moveProgress,
    checkIns,
    addWaterCheckIn,
    addMoveCheckIn,
  };
};
