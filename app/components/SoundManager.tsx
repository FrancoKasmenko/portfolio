"use client";
import { useEffect, useRef } from "react";

type Props = {
  trigger: string;
};

export function SoundManager({ trigger }: Props) {
  const sounds = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    sounds.current = {
      startup: new Audio("/sounds/startup.mp3"),
      shutdown: new Audio("/sounds/shutdown.mp3"),
    };
  }, []);

  useEffect(() => {
    if (trigger && sounds.current[trigger]) {
      sounds.current[trigger].currentTime = 0;
      sounds.current[trigger].play();
    }
  }, [trigger]);

  return null;
}
