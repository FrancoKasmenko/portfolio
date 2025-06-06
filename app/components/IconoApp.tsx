"use client";
import { useState } from "react";

type Props = {
  nombre: string;
  onDoubleClick: () => void;
  isMobile?: boolean;
  onSingleTap?: () => void;
};

const iconosPorNombre: Record<string, string> = {
  "Sobre mí": "/icons/computer.png",
  "CV": "/icons/cv.png",
  "Proyectos": "/icons/portfolio.png",
  "Contacto": "/icons/contacto.png",
  "Terminal": "/icons/terminal.png",
  "Paint": "/icons/paint.png",
  "Navegador": "/icons/navegador.png",
  "Mail": "/icons/mail.png",
  "About me": "/icons/computer.png",
  "Resume": "/icons/cv.png",
  "Projects": "/icons/portfolio.png",
  "Contact": "/icons/contacto.png",
  "Browser": "/icons/navegador.png",
  "Solitario": "/icons/solitario.png",
  "Solitaire": "/icons/solitario.png",
};

export function IconoApp({ nombre, onDoubleClick, isMobile, onSingleTap }: Props) {
  const [seleccionado, setSeleccionado] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setSeleccionado(true);
    if (isMobile && onSingleTap) {
      e.preventDefault(); 
      onSingleTap();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onDoubleClick={!isMobile ? onDoubleClick : undefined}
      onBlur={() => setSeleccionado(false)}
      tabIndex={0}
      className="flex flex-col items-center focus:outline-none select-none"
      style={{ userSelect: "none", WebkitUserSelect: "none", touchAction: "manipulation" }}
    >
      <div className="w-12 h-12 relative flex items-center justify-center mb-1">
        <img
          src={iconosPorNombre[nombre] || "/icons/folder.png"}
          alt={nombre}
          className="w-8 h-8 drop-shadow"
          draggable={false}
        />
        {seleccionado && (
          <div className="absolute inset-0 bg-blue-700 opacity-30 pointer-events-none" />
        )}
      </div>

      <span
        className={`text-xs text-center px-1 ${
          seleccionado
            ? "bg-[#000080] text-white border border-dotted border-yellow-300"
            : "text-white"
        }`}
      >
        {nombre}
      </span>
    </button>
  );
}
