"use client";
import { useEffect, useState } from "react";

export default function TaskbarClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now
    .toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <span
      style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 14,
        color: "#fff",
        background: "#222",
        border: "1.5px outset #888",
        padding: "3px 16px 3px 16px",
        marginRight: 8,
        marginLeft: "auto",
        minWidth: 82,
        textAlign: "center",
        letterSpacing: 2,
        boxShadow: "1px 1px 0 #333"
      }}
    >
      {timeStr}
    </span>
  );
}
