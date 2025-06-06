"use client";

import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

type Props = {
  id: string;
  children: React.ReactNode;
};

export default function DragVentana({ id, children }: Props) {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        position: "absolute",
        top: 0,
        left: 0,
        touchAction: "none",
      }}
    >
      {children}
    </div>
  );
}
