"use client";
import Image from "next/image";

export default function Navegador() {
  return (
    <div className="w-full h-full bg-[#c0c0c0] border-2 border-gray-500 flex flex-col font-sans text-sm text-black">

      <div className="p-4 flex flex-col items-center justify-center flex-1 bg-white overflow-auto">
        <Image src="/icons/navegador.png" alt="Retro browser" width={48} height={48} />
        <p className="text-center mt-2">Franco Explorer no puede conectarse a internet 🧑‍💻</p>
        <p className="text-xs mt-1 text-gray-600">Funcionalidad de navegación no disponible en esta versión.</p>
      </div>
    </div>
  );
}
