"use client";

import { ReactNode, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
  titulo: string;
  onClose: () => void;
  onMinimizar: () => void;
  onMaximizar: () => void;
  onFocus: () => void;
  children: ReactNode;
  posicion: { x: number; y: number };
  zIndex: number;
  max: boolean;
  width?: number | string;
  height?: number | string;
  isMobile?: boolean;
};

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 350;

export function VentanaApp({
  id,
  titulo,
  onClose,
  onMinimizar,
  onMaximizar,
  onFocus,
  children,
  posicion,
  zIndex,
  max,
  width,
  height,
  isMobile,
}: Props) {
  const [mobile, setMobile] = useState(isMobile ?? false);

  useEffect(() => {
    if (typeof window !== "undefined" && isMobile === undefined) {
      const check = () => setMobile(window.innerWidth <= 600);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, [isMobile]);

  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const style: React.CSSProperties = max
  ? {
      position: "fixed",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      zIndex,
      transform: "none",
    }
  : isMobile
    ? {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "98vw",
        height: "50vh",      
        minWidth: 0,
        minHeight: 0,
        maxWidth: "98vw",
        maxHeight: "80vh",
        zIndex,
        boxShadow: "0 0 24px #0008",
      }
    : {
        position: "absolute",
        top: posicion.y,
        left: posicion.x,
        width: width ?? DEFAULT_WIDTH,
        height: height ?? DEFAULT_HEIGHT,
        minWidth: 300,
        minHeight: 200,
        zIndex,
        transform: "none",
      };


  const dragListeners = !mobile ? listeners : undefined;
  const dragAttributes = !mobile ? attributes : undefined;

  return (
    <div
      ref={setNodeRef}
      onMouseDown={onFocus}
      style={style}
      {...dragAttributes}
      className={`transition-all duration-200 bg-white rounded-lg shadow-lg border border-gray-300
        ${max ? "" : !mobile ? "resize" : ""}
        overflow-hidden ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
      `}
    >
      <div className="flex justify-between items-center bg-[#2e2e2e] text-white text-sm">
        <div
          className={`flex-1 px-4 py-2 select-none ${
            !mobile ? "cursor-move" : ""
          }`}
          {...dragListeners}
        >
          {titulo}
        </div>
        <div className="flex">
          <button
            onClick={e => {
              e.stopPropagation();
              onMinimizar();
            }}
            className="w-10 h-8 hover:bg-[#444] text-white"
            title="Minimizar"
          >
            &minus;
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onMaximizar();
            }}
            className="w-10 h-8 hover:bg-[#444] text-white"
            title="Maximizar"
          >
            &#9633;
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              handleClose();
            }}
            className="w-10 h-8 bg-red-600 hover:bg-red-700 text-white"
            title="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="text-black w-full h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>
    </div>
  );
}
