"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { VentanaApp } from "@/app/components/VentanaApp";
import { IconoApp } from "@/app/components/IconoApp";
import { MenuInicio } from "@/app/components/MenuInicio";
import { ShutdownModal } from "@/app/components/ShutdownModal";
import { SoundManager } from "@/app/components/SoundManager";
import { StartupModal } from "@/app/components/StartupModal";
import { useTranslation } from "@/app/components/useTranslation";
import { useLang } from "@/app/components/LanguageProvider";
import { User, Folder, Terminal, FileText, Mail as MailIcon, Paintbrush, Globe } from "lucide-react";

import SobreMi from "@/app/windows/SobreMi";
import Proyectos from "@/app/windows/Proyectos";
import Contacto from "@/app/windows/Contacto";
import CV from "@/app/windows/CV";
import Terminall from "@/app/windows/Terminal";
import Paint from "@/app/windows/Paint";
import Navegador from "@/app/windows/Navegador";
import Mail from "@/app/windows/Mail";
import IntroText from "@/app/components/IntroText";
import TaskbarClock from "@/app/windows/TaskbarClock";
import Solitario from "./windows/Solitario";

const iconosVentana: Record<string, React.ReactElement> = {
  sobreMi: <User size={18} />,
  proyectos: <Folder size={18} />,
  contacto: <MailIcon size={18} />,
  cv: <FileText size={18} />,
  terminal: <Terminal size={18} />,
  paint: <Paintbrush size={18} />,
  navegador: <Globe size={18} />,
  mail: <MailIcon size={18} />,
  solitario: <Folder size={18} />,
};

export default function Home() {
  const [mostrarMenuInicio, setMostrarMenuInicio] = useState(false);
  const [fondoIndex, setFondoIndex] = useState(0);
  const [apagar, setApagar] = useState(false);
  const [sonido, setSonido] = useState("");
  const [arrancando, setArrancando] = useState(true);

  const { t } = useTranslation();
  const { lang, setLang } = useLang();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fondos = [
    "",
    "/wallpapers/windows95.jpg",
    "/wallpapers/windows98.jpg",
    "/wallpapers/windows98-2.jpg",
  ];

  const [ventanas, setVentanas] = useState([
    { id: "sobreMi", nombre: t("sobreMi"), abierta: true, minimizada: false, max: false, zIndex: 20, pos: { x: 100, y: 100 } },
    { id: "proyectos", nombre: t("proyectos"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 150, y: 150 } },
    { id: "contacto", nombre: t("contacto"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 200, y: 200 } },
    { id: "cv", nombre: t("cv"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 250, y: 250 } },
    { id: "terminal", nombre: t("terminal"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 300, y: 300 } },
    { id: "paint", nombre: t("paint"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 350, y: 350 } },
    { id: "navegador", nombre: t("navegador"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 400, y: 400 } },
    { id: "mail", nombre: t("mail"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 80, y: 80 } },
    { id: "solitario", nombre: t("solitario"), abierta: false, minimizada: false, max: false, zIndex: 20, pos: { x: 80, y: 80 } }
  ]);

  useEffect(() => {
    setVentanas(prev =>
      prev.map(v => ({
        ...v,
        nombre: t(v.id),
      }))
    );
  }, [lang]);

  const getNextZIndex = () => Math.max(20, ...ventanas.map(v => v.zIndex)) + 1;

  const abrirVentana = (id: string) => {
    const nuevoZ = getNextZIndex();
    setVentanas(prev =>
      prev.map(v =>
        v.id === id ? { ...v, abierta: true, minimizada: false, zIndex: nuevoZ } : v
      )
    );
  };

  const cerrarVentana = (id: string) => {
    setVentanas(prev =>
      prev.map(v => v.id === id ? { ...v, abierta: false, minimizada: false } : v)
    );
  };

  const minimizarVentana = (id: string) => {
    setVentanas(prev =>
      prev.map(v => v.id === id ? { ...v, minimizada: true } : v)
    );
  };

  const moverVentana = (event: DragEndEvent) => {
    const { delta, active } = event;
    setVentanas(prev =>
      prev.map(v =>
        v.id === active.id
          ? { ...v, pos: { x: v.pos.x + delta.x, y: v.pos.y + delta.y } }
          : v
      )
    );
  };

  const cambiarFondo = () => {
    setFondoIndex(prev => (prev + 1) % fondos.length);
  };

  const cerrarTodo = () => {
    setSonido("shutdown");
    setApagar(true);
  };

  const getWindowSize = (id: string) => {
    if (!isMobile) {
      return {
        width:
          id === "mail" ? 700 :
            id === "paint" ? 900 :
              id === "cv" ? 800 :
                id === "sobreMi" ? 800 :
                  id === "solitario" ? 800 :
                    id === "proyectos" ? 600 : undefined,
        height:
          id === "mail" ? 600 :
            id === "paint" ? 500 :
              id === "cv" ? 700 :
                id === "sobreMi" ? 600 :
                  id === "solitario" ? 500 :
                    id === "proyectos" ? 500 : undefined,
      };
    }
    return {
      width: "98vw",
      height: "85vh"
    };
  };

  return (
    <>
      <SoundManager trigger={sonido} />

      <button
        onClick={() => setLang(lang === "es" ? "en" : "es")}
        className="fixed top-3 right-4 z-50 flex items-center gap-2 px-3 py-1 bg-[#ececec] border border-[#777] rounded shadow-lg hover:bg-blue-100 text-blue-900 font-semibold"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 13,
          boxShadow: "2px 2px 0 #a8a8a8",
          transition: "background 0.2s, color 0.2s"
        }}
        title={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
      >
        <Globe size={16} className="mr-1" />
        {lang === "es" ? (
          <>
            <span role="img" aria-label="English">🇺🇸</span> English
          </>
        ) : (
          <>
            <span role="img" aria-label="Español">🇪🇸</span> Español
          </>
        )}
      </button>

      {arrancando && (
        <StartupModal onComplete={() => {
          setArrancando(false);
          setSonido("startup");
        }} />
      )}

      {!arrancando && (
        <main
          className="w-screen h-screen bg-cover relative font-mono overflow-hidden"
          style={{
            backgroundImage: `url(${fondos[fondoIndex]})`,
            backgroundSize: isMobile ? "cover" : "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "",
            zIndex: 0,
          }}
        >
          {apagar && (
            <ShutdownModal
              onComplete={() => {
                setVentanas(prev => prev.map(v => ({ ...v, abierta: false, minimizada: false })));
                setApagar(false);
                setMostrarMenuInicio(false);
              }}
            />
          )}

          <DndContext onDragEnd={moverVentana}>
            <div className={`absolute left-2 top-2 flex flex-col gap-3 z-0 ${isMobile ? "scale-90" : ""}`}>
              {ventanas.map(v => (
                <IconoApp
                  key={v.id}
                  nombre={v.nombre}
                  onDoubleClick={() => abrirVentana(v.id)}
                  isMobile={isMobile}
                  onSingleTap={() => abrirVentana(v.id)}
                />
              ))}
            </div>

            {ventanas.map(v =>
              v.abierta && !v.minimizada ? (
                <VentanaApp
                  key={v.id}
                  id={v.id}
                  titulo={v.nombre}
                  isMobile={isMobile}
                  onClose={() => cerrarVentana(v.id)}
                  onMinimizar={() => minimizarVentana(v.id)}
                  onMaximizar={() =>
                    setVentanas(prev =>
                      prev.map(w => (w.id === v.id ? { ...w, max: !w.max } : w))
                    )
                  }
                  max={v.max}
                  posicion={v.pos}
                  zIndex={v.zIndex}
                  onFocus={() =>
                    setVentanas(prev =>
                      prev.map(w =>
                        w.id === v.id ? { ...w, zIndex: getNextZIndex() } : w
                      )
                    )
                  }
                  {...getWindowSize(v.id)}
                >
                  {v.id === "sobreMi" && <SobreMi />}
                  {v.id === "proyectos" && <Proyectos />}
                  {v.id === "contacto" && <Contacto />}
                  {v.id === "cv" && <CV />}
                  {v.id === "terminal" && <Terminall abrirVentana={abrirVentana} />}
                  {v.id === "paint" && <Paint />}
                  {v.id === "navegador" && <Navegador />}
                  {v.id === "mail" && <Mail />}
                  {v.id === "solitario" && <Solitario />}
                </VentanaApp>
              ) : null
            )}

            <div className="fixed bottom-0 left-0 w-full h-12 bg-black/70 backdrop-blur-md border-t border-white/10 text-white flex items-center px-2 sm:px-4 z-50"
              style={{
                height: isMobile ? 46 : 48,
                fontSize: isMobile ? 14 : 16,
                paddingLeft: isMobile ? 2 : 16,
                paddingRight: isMobile ? 2 : 16
              }}>
              <button
                onClick={() => setMostrarMenuInicio(prev => !prev)}
                className="mr-2 sm:mr-4 px-2 sm:px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs sm:text-sm font-semibold"
              >
                ⊞ {t("inicio")}
              </button>
              {mostrarMenuInicio && (
                <MenuInicio cerrarTodo={cerrarTodo} cambiarFondo={cambiarFondo} />
              )}

              <div className={`flex gap-1 sm:gap-2 ${isMobile ? "overflow-x-auto max-w-[60vw]" : ""}`}>
                {ventanas.filter(v => v.abierta).map(v => (
                  <button
                    key={v.id}
                    onClick={() =>
                      setVentanas(prev =>
                        prev.map(w =>
                          w.id === v.id ? { ...w, minimizada: !w.minimizada } : w
                        )
                      )
                    }
                    className={`flex items-center gap-1 px-2 sm:px-3 h-8 rounded-md text-xs sm:text-sm transition font-medium ${v.minimizada ? "bg-white/20" : "bg-blue-600"
                      } hover:bg-blue-500`}
                    title={v.nombre}
                  >
                    {iconosVentana[v.id]}
                    <span className="hidden sm:inline">{v.nombre}</span>
                  </button>
                ))}
              </div>
              <TaskbarClock />
            </div>
          </DndContext>
          <IntroText />
        </main>
      )}
    </>
  );
}
