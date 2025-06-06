"use client";
import { useTranslation } from "@/app/components/LanguageProvider";
import Link from "next/link";

export function MenuInicio({
  cerrarTodo,
  cambiarFondo,
}: { cerrarTodo: () => void; cambiarFondo: () => void }) {
  const { t, lang } = useTranslation();

  const cvHref = lang === "en" ? "/archivos/CV_FRANCO_KASMENKO_ENG.pdf" : "/archivos/CV_FRANCO_KASMENKO.pdf";

  return (
    <div className="absolute bottom-12 left-4 bg-[#c0c0c0] border border-gray-600 w-56 shadow-lg z-[999] font-sans text-sm">
      <ul className="divide-y divide-gray-400">
        <li>
          <Link
            href="https://github.com/FrancoKasmenko"
            target="_blank"
            className="block px-4 py-2 hover:bg-blue-600 hover:text-white"
          >
            GitHub
          </Link>
        </li>
        <li>
          <a
            href={cvHref}
            target="_blank"
            className="block px-4 py-2 hover:bg-blue-600 hover:text-white"
          >
            {t("verCvPdf")}
          </a>
        </li>
        <li>
          <button
            onClick={cambiarFondo}
            className="w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white"
          >
            {t("cambiarFondo")}
          </button>
        </li>
        <li>
          <button
            onClick={cerrarTodo}
            className="w-full text-left px-4 py-2 text-red-700 hover:bg-red-600 hover:text-white"
          >
            {t("apagarSistema")}
          </button>
        </li>
      </ul>
    </div>
  );
}
