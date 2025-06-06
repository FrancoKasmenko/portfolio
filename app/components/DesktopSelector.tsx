"use client";
import { useRef, useState } from "react";

type IconRef = {
  id: string;
  ref: React.RefObject<HTMLButtonElement>;
};

type Rect = { x: number; y: number; w: number; h: number } | null;

type Props = {
  iconRefs: React.MutableRefObject<IconRef[]>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export function DesktopSelector({ iconRefs, setSelected }: Props) {
  const [rect, setRect] = useState<Rect>(null);
  const origin = useRef<{ x: number; y: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    origin.current = { x: e.clientX, y: e.clientY };
    setRect({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!origin.current) return;
    const x = Math.min(origin.current.x, e.clientX);
    const y = Math.min(origin.current.y, e.clientY);
    const w = Math.abs(origin.current.x - e.clientX);
    const h = Math.abs(origin.current.y - e.clientY);
    setRect({ x, y, w, h });
  };
  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    if (!rect) return;
    setSelected(
      iconRefs.current
        .filter(({ ref, id }) => {
          const dom = ref.current;
          if (!dom) return false;
          const { left, top, right, bottom } = dom.getBoundingClientRect();
          return (
            left < rect.x + rect.w &&
            right > rect.x &&
            top < rect.y + rect.h &&
            bottom > rect.y
          );
        })
        .map(({ id }) => id)
    );
    setRect(null);
    origin.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-10"
      style={{ cursor: "default" }}
      onMouseDown={onMouseDown}
    >
      {rect && (
        <div
          className="fixed z-30 bg-blue-500/30 border-2 border-blue-500"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
