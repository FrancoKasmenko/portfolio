"use client";
import { useEffect, useState } from "react";

export default function IntroText() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const textoPrincipal = "Soy Franco Kasmenko";
  const textoSecundario = "Y este es mi portfolio.";

  useEffect(() => {
    const totalLength = textoPrincipal.length + textoSecundario.length + 1;
    const interval = setInterval(() => {
      setVisibleIndex(prev => {
        if (prev >= totalLength) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(c => !c);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const texto1 = textoPrincipal.slice(0, Math.min(visibleIndex, textoPrincipal.length));
  const texto2 = visibleIndex > textoPrincipal.length
    ? textoSecundario.slice(0, visibleIndex - textoPrincipal.length - 1)
    : "";

  const finished =
    visibleIndex >= textoPrincipal.length + textoSecundario.length + 1;

  return (
    <div
      id="introtext"
      className="absolute right-10 top-1/2 -translate-y-1/2 z-[-50] select-none"
      style={{ fontFamily: '"Press Start 2P", monospace' }}
    >
      <h1 className="text-white font-bold text-5xl mb-4 whitespace-pre">
        {texto1}
        {!finished && visibleIndex <= textoPrincipal.length && showCursor && (
          <span className="animate-cursor align-middle" style={{ fontSize: "0.9em", marginLeft: 4 }}>|</span>
        )}
      </h1>
      <p className="text-white text-xl whitespace-pre">
        {texto2}
        {!finished &&
          visibleIndex > textoPrincipal.length &&
          texto2.length < textoSecundario.length &&
          showCursor && (
            <span className="animate-cursor align-middle" style={{ fontSize: "1em", marginLeft: 3 }}>|</span>
          )}
        {finished && showCursor && (
          <span className="animate-cursor align-middle" style={{ fontSize: "1em", marginLeft: 3 }}>|</span>
        )}
      </p>
      <style jsx>{`
        .animate-cursor {
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
