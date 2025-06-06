"use client";
import Image from "next/image";
import { Github } from "lucide-react";
import { useTranslation } from "@/app/components/useTranslation";

const proyectos = [
  {
    nombre: "Petiqueta",
    descripcionKey: "petiquetaDesc",
    link: "https://petiqueta.uy",
    github: "https://github.com/FrancoKasmenko/petiqueta",
    img: "/archivos/petiqueta.png",
    tecnologias: [
      "PHP",
      "TailwindCSS",
      "JavaScript",
      "MySQL",
      "MercadoPago",
      "Git",
      "cPanel",
      "AJAX",
      "HTML5",
      "CSS3"
    ],
  },
  {
    nombre: "Scouting Club",
    descripcionKey: "scoutingClubDescProy",
    link: "",
    img: "/archivos/scoutingclub.png",
    tecnologias: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML5", "CSS3", "SweetAlert2", "Chartjs"],
  },
  {
    nombre: "Portfolio",
    descripcionKey: "portfolioDesc",
    link: "https://francokasmenko.dev",
    github: "https://github.com/FrancoKasmenko/portfolio",
    img: "/archivos/portfolio.png",  
    tecnologias: [
      "React",
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "TypeScript",
      "Git",
    ],
  },
  {
    nombre: "Karamba",
    descripcionKey: "karambaDesc",
    link: "https://karamba.com.uy",
    img: "/archivos/karamba.png",
    tecnologias: ["WordPress", "Elementor", "HTML5", "CSS3"],
  },
];

export default function Proyectos() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {proyectos.map((p, i) => (
        <div
          key={i}
          className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center">
            <Image
              src={p.img}
              alt={p.nombre}
              width={100}
              height={100}
              className="object-cover w-24 h-24"
            />
            <div className="p-4 w-full">
              <h3 className="font-bold text-lg text-gray-800">{p.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2">{t(p.descripcionKey)}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tecnologias.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {t(tech) || tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-sm">
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    🌐 {t("verSitio")}
                  </a>
                ) : (
                  <span className="text-gray-500 font-medium">🌐 {t("enProceso") || "En proceso"}</span>
                )}

                {/* LINK GITHUB */}
                {"github" in p && p.github ? (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:underline font-medium"
                  >
                    <Github size={14} /> GitHub
                  </a>
                ) : (
                  <span className="text-gray-400 font-medium"><Github size={14} /> {t("privado") || "Privado"}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
