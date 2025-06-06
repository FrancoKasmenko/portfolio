"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/app/components/LanguageProvider";

type Props = {
  onComplete: () => void;
};

export const ShutdownModal = ({ onComplete }: Props) => {
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete(); // Cierra todas las ventanas
    }, 3000); // 3 segundos de "apagado"
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    visible && (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-[999]">
        <div className="text-center text-xl animate-pulse">
          <p className="mb-2">{t("apagando")}</p>
          <p className="text-sm text-gray-400">{t("espere")}</p>
        </div>
      </div>
    )
  );
};
