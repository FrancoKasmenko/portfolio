"use client";
import { Mail, Phone, Copy } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/app/components/useTranslation";

export default function Contacto() {
  const [copiado, setCopiado] = useState("");
  const { t } = useTranslation();

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(texto);
    setTimeout(() => setCopiado(""), 2000);
  };

  const contacto = {
    telefono: "092 249 764",
    correo: "fkasmenko@gmail.com",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Phone className="text-blue-600" />
        <span className="text-gray-800">{contacto.telefono}</span>
        <button
          onClick={() => copiar(contacto.telefono)}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <Copy size={14} /> {t("copiar")}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Mail className="text-blue-600" />
        <span className="text-gray-800">{contacto.correo}</span>
        <a
          href={`mailto:${contacto.correo}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {t("enviarMail")}
        </a>
      </div>

      {copiado && (
        <div className="text-green-600 text-sm">
          {t("copiadoAlPortapapeles")}: {copiado}
        </div>
      )}
    </div>
  );
}
