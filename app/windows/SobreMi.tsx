"use client";
import Image from "next/image";
import { useTranslation } from "@/app/components/useTranslation";

const skills = [
  { nombre: "React", label: "React", color: "#f7df1e", text: "#222" },
  { nombre: "HTML5", label: "HTML5", color: "#e44d26" },
  { nombre: "CSS3", label: "CSS3", color: "#1572b6" },
  { nombre: "Tailwind", label: "Tailwind", color: "#38bdf8", text: "#222" },
  { nombre: "PHP", label: "PHP", color: "#8993be" },
  { nombre: "MySQL", label: "MySQL", color: "#00618a" },
  { nombre: "Node.js", label: "Next.js", color: "#00FF00", text: "#222" },
];

export default function SobreMi() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-[95vh] px-8 py-10 flex flex-col items-center bg-[#d6d7d8] font-mono select-none overflow-auto">
      {/* INTRO + TECNOLOGÍAS DESTACADAS */}
      <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-4xl gap-8 mb-5">
        <div className="flex-shrink-0 rounded-lg overflow-hidden border-4 border-[#fff] shadow-lg bg-[#c0c0c0]">
          <Image
            src="/archivos/pp.jpg"
            alt="Franco Kasmenko"
            width={180}
            height={180}
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-[#181b22] mb-1 leading-none">
            Franco <span className="text-[#1c4bdd]">Nicolás Kasmenko</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#232323] mt-1">
            {t("tituloProfesional")}
          </h2>
          <p className="text-base md:text-lg text-[#444]">
            {t("subtituloProfesional")}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((s) => (
              <span
                key={s.nombre}
                className="px-3 py-1 rounded-md text-xs font-bold shadow"
                style={{
                  background: s.color,
                  color: s.text || "#fff",
                  fontFamily: "inherit",
                  border: "2px solid #fff",
                  textShadow: "0 1px #111",
                }}
              >
                {s.nombre}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="https://linkedin.com/in/franco-kasmenko"
              target="_blank"
              className="underline hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/FrancoKasmenko"
              target="_blank"
              className="underline hover:text-blue-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* EXPERIENCIA PROFESIONAL */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-2 text-[#181b22]">
          {t("experiencia")}
        </h2>
        <ul className="space-y-6">
          {/* ASTROTECH */}
          <li className="rounded-lg bg-[#ededed] border-l-4 border-[#1c4bdd] p-4 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
              <span className="font-bold text-[#191b24]">
                {t("expAstroTitulo")}
              </span>
              <span className="text-xs text-[#1c4bdd]">
                {t("expAstroLugar")}
              </span>
            </div>
            <span className="text-xs text-[#3c3c3c]">
              {t("expAstroPuesto")}
            </span>
            <span className="text-xs text-[#666]">{t("expAstroTiempo")}</span>
            <ul className="list-disc pl-5 mt-2 text-sm text-[#222] space-y-1">
              <li>{t("expAstroBullets1")}</li>
              <li>{t("expAstroBullets2")}</li>
              <li>{t("expAstroBullets3")}</li>
            </ul>
          </li>

          {/* NETPC */}
          <li className="rounded-lg bg-[#ededed] border-l-4 border-[#1c4bdd] p-4 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
              <span className="font-bold text-[#191b24]">
                {t("expNetpcTitulo")}
              </span>
              <span className="text-xs text-[#1c4bdd]">
                {t("expNetpcLugar")}
              </span>
            </div>
            <span className="text-xs text-[#3c3c3c]">
              {t("expNetpcPuesto")}
            </span>
            <span className="text-xs text-[#666]">{t("expNetpcTiempo")}</span>
            <ul className="list-disc pl-5 mt-2 text-sm text-[#222] space-y-1">
              <li>{t("expNetpcBullets1")}</li>
              <li>{t("expNetpcBullets2")}</li>
              <li>{t("expNetpcBullets3")}</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* EDUCACIÓN */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-2 text-[#181b22]">
          {t("educacionTitulo")}
        </h2>
        <ul className="space-y-3">
          <li>
            <span className="font-bold">{t("eduOrt")}</span> -{" "}
            {t("eduOrtTitulo")}
            <br />
            <span className="text-xs text-[#1c4bdd]">
              {t("eduOrtLugar")}
            </span> · <span className="text-xs">{t("eduOrtTiempo")}</span>
          </li>
          <li>
            <span className="font-bold">{t("eduEsi")}</span> -{" "}
            {t("eduEsiTitulo")}
            <br />
            <span className="text-xs text-[#1c4bdd]">
              {t("eduEsiLugar")}
            </span> · <span className="text-xs">{t("eduEsiTiempo")}</span>
          </li>
        </ul>
      </div>

      {/* SKILLS ADICIONALES */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-2 text-[#181b22]">
          {t("skillsTitulo")}
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[#222]">
          <li>{t("skills1")}</li>
          <li>{t("skills2")}</li>
          <li>{t("skills3")}</li>
          <li>{t("skills4")}</li>
          <li>{t("skills5")}</li>
          <li>{t("skills6")}</li>
          <li>{t("skills7")}</li>
        </ul>
      </div>
    </div>
  );
}
