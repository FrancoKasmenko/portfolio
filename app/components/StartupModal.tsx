"use client";

import { useEffect, useState } from "react";

export function StartupModal({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return visible ? (
    <div className="fixed inset-0 z-[999] bg-black text-green-400 font-mono flex flex-col items-center justify-center text-lg animate-fade-in">
      <div className="mb-2">[Starting FrancoOS...]</div>
      <div className="animate-pulse">Loading modules ██████████</div>
    </div>
  ) : null;
}
