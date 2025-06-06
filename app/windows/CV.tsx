"use client";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useLang } from "@/app/components/LanguageProvider";

const PDF_IDS = {
  es: "1QkFT8nV5me1R_o-zAypD91Q9L_kmurEQ",
  en: "1IlOfK2tnTncwkoj9IIgFnCTlkNNb3E-V",
};

const PDF_LOCAL = {
  es: "/archivos/CV_FRANCO_KASMENKO.pdf",
  en: "/archivos/CV_FRANCO_KASMENKO_ENG.pdf",
};

export default function CV() {
  const { lang } = useLang();
  const pdfId = PDF_IDS[lang] || PDF_IDS.es;
  const pdfUrl = `https://drive.google.com/file/d/${pdfId}/view?usp=sharing`;
  const embedUrl = `https://drive.google.com/file/d/${pdfId}/preview`;
  const downloadUrl = PDF_LOCAL[lang] || PDF_LOCAL.es;
  const pdfPath = PDF_LOCAL[lang] || PDF_LOCAL.es;

  return (
    <div className="flex flex-col h-full w-full bg-[#cacaca] border border-[#888]">
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ececec] border-b border-[#999] text-sm">
        <FileText className="text-blue-700" size={18} />
        <span className="font-bold">{lang === "es" ? "Currículum Vitae" : "Resume"}</span>
        <div className="ml-auto flex gap-2">
           <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-[#ededed] border border-[#aaa] rounded hover:bg-[#e0e0e0] flex items-center gap-1"
            title={lang === "es" ? "Abrir en nueva pestaña" : "Open in new tab"}
          >
            <ExternalLink size={15} /> {lang === "es" ? "Abrir" : "Open"}
          </a>
          <a
            href={downloadUrl}
            download
            className="px-2 py-1 bg-[#ededed] border border-[#aaa] rounded hover:bg-[#e0e0e0] flex items-center gap-1"
            title={lang === "es" ? "Descargar CV" : "Download CV"}
          >
            <Download size={15} /> {lang === "es" ? "Descargar" : "Download"}
          </a>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-0 bg-[#cacaca]">
        <iframe
          src={embedUrl}
          title="CV Franco Kasmenko"
          width="100%"
          height="100%"
          style={{
            minHeight: 500,
            minWidth: 340,
            border: "none",
            background: "#eee",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
