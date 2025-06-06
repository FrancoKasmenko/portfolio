"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/components/LanguageProvider";

type Entrada = { tipo: "comando" | "respuesta"; texto: string };
type Props = {
  abrirVentana: (id: string) => void;
};

export default function Terminal({ abrirVentana }: Props) {
  const { t, lang } = useTranslation();

  const [historial, setHistorial] = useState<Entrada[]>([
    { tipo: "respuesta", texto: t("terminalBienvenida") },
    { tipo: "respuesta", texto: t("terminalAyudaSugerencia") },
  ]);
  const [comando, setComando] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [historial, escribiendo]);

  useEffect(() => {
    setHistorial([
      { tipo: "respuesta", texto: t("terminalBienvenida") },
      { tipo: "respuesta", texto: t("terminalAyudaSugerencia") },
    ]);
  }, [lang]);

  const simularRespuesta = async (texto: string) => {
    setEscribiendo(true);
    for (let i = 0; i <= texto.length; i++) {
      const parcial = texto.slice(0, i);
      setHistorial((prev) => [...prev.slice(0, -1), { tipo: "respuesta", texto: parcial + "▌" }]);
      await new Promise((r) => setTimeout(r, 10));
    }
    setHistorial((prev) => [...prev.slice(0, -1), { tipo: "respuesta", texto }]);
    setEscribiendo(false);
  };

  const comandos = [
    "cmdAyuda",
    "cmdSobre",
    "cmdContacto",
    "cmdProyectos",
    "cmdNavegador",
    "cmdLimpiar"
  ];

  const manejarComando = async () => {
    const input = comando.trim().toLowerCase();
    if (!input) return;
    setHistorial((prev) => [...prev, { tipo: "comando", texto: `> ${input}` }]);
    setComando("");

    // Detectar comando traducido
    const comandoTraducido = comandos.find(c => t(c).toLowerCase() === input);

    switch (comandoTraducido) {
      case "cmdAyuda":
        await simularRespuesta(t("terminalComandos"));
        break;
      case "cmdSobre":
        await simularRespuesta(t("terminalSobre"));
        break;
      case "cmdContacto":
        await simularRespuesta(t("terminalContacto"));
        break;
      case "cmdProyectos":
        await simularRespuesta(t("terminalProyectos"));
        break;
      case "cmdNavegador":
        abrirVentana("navegador");
        await simularRespuesta(t("terminalNavegador"));
        break;
      case "cmdLimpiar":
        setHistorial([]);
        return;
      default:
        await simularRespuesta(
          t("terminalNoReconocido").replace("{{cmd}}", input)
        );
    }
  };

  return (
    <div
      ref={terminalRef}
      className="bg-black text-green-400 font-mono text-sm h-full p-4 overflow-y-auto select-none"
    >
      {historial.map((linea, idx) => (
        <div key={idx} className={`${linea.tipo === "comando" ? "text-green-300" : ""}`}>
          {linea.texto}
        </div>
      ))}

      {!escribiendo && (
        <div className="flex mt-2">
          <span className="mr-2">&gt;</span>
          <input
            className="bg-transparent outline-none flex-1 text-green-400 caret-green-500 animate-pulse"
            value={comando}
            onChange={(e) => setComando(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") manejarComando();
            }}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
