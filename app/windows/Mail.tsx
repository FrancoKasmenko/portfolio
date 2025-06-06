"use client";
import { useState } from "react";
import { useTranslation } from "@/app/components/LanguageProvider";

export default function Mail() {
  const { t, lang } = useTranslation();

  const [to] = useState("Franco");
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(false);
    setError("");
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, from, message }),
      });
      if (res.ok) {
        setSent(true);
        setSubject("");
        setFrom("");
        setMessage("");
      } else {
        setError(t("mailErrorSend"));
      }
    } catch {
      setError(t("mailErrorNetwork"));
    }
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <div
      style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 14,
        background: "#ececec",
        border: "1px solid #aaa",
        minWidth: 410,
        minHeight: 340,
        width: "100%",
        height: "100%",
        boxShadow: "inset 0 1px 1px #fff, 0 2px 10px #bbb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        background: "#c3c3c3",
        borderBottom: "1px solid #bdbdbd",
        padding: "4px 0 4px 4px",
        height: 28,
        display: "flex",
        alignItems: "center"
      }}>
        <button
          style={{
            border: "2px outset #fff",
            background: "#ededed",
            color: "#111",
            fontWeight: "bold",
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 14,
            padding: "3px 18px 3px 18px",
            marginRight: 8,
            marginTop: 2,
            marginBottom: 2,
            cursor: "pointer",
            outline: "none",
          }}
          onClick={() => document.getElementById("mail-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
          type="button"
        >
          <span style={{ marginRight: 4, color: "#111" }}>&#x2611;</span>
          {t("mailSend")}
        </button>
        {sent && <span style={{ marginLeft: 16, color: "green" }}>{t("mailSent")}</span>}
        {error && <span style={{ marginLeft: 16, color: "crimson" }}>{error}</span>}
      </div>

      <form
        id="mail-form"
        onSubmit={handleSend}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 0,
          background: "#fff",
          border: 0,
        }}>
        <div style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 20,
          fontWeight: "bold",
          margin: "12px 0 10px 8px",
          letterSpacing: 0,
          color: "#111"
        }}>{t("mailNewMessage")}</div>

        <div style={{
          display: "flex", alignItems: "center", marginBottom: 4, marginLeft: 10
        }}>
          <span style={{ width: 62, color: "#444" }}>{t("mailTo")}:</span>
          <input
            value={to}
            readOnly
            disabled
            style={{
              background: "#e9e9e9",
              border: "1px solid #bdbdbd",
              fontWeight: "bold",
              color: "#234fd7",
              padding: "2px 8px",
              fontSize: 14,
              minWidth: 64,
              fontFamily: '"Press Start 2P", monospace',
              outline: "none"
            }}
          />
        </div>

        <div style={{
          display: "flex", alignItems: "center", marginBottom: 4, marginLeft: 10
        }}>
          <span style={{ width: 62, color: "#888" }}>{t("mailSubject")}:</span>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{
              background: "#f5f5f5",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "2px 8px",
              fontSize: 14,
              flex: 1,
              fontFamily: '"Press Start 2P", monospace',
              outline: "none"
            }}
            placeholder=""
          />
        </div>

        <div style={{
          display: "flex", alignItems: "center", marginBottom: 4, marginLeft: 10
        }}>
          <span style={{ width: 62, color: "#888" }}>{t("mailFrom")}:</span>
          <input
            value={from}
            onChange={e => setFrom(e.target.value)}
            style={{
              background: "#fafafa",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "2px 8px",
              fontSize: 14,
              minWidth: 120,
              fontFamily: '"Press Start 2P", monospace',
              outline: "none"
            }}
            placeholder=""
          />
        </div>

        <div style={{
          flex: 1,
          background: "#bbb",
          border: "1px solid #888",
          margin: "0",
          minHeight: 120,
          marginTop: 8,
          boxSizing: "border-box",
        }}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              resize: "none",
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "8px 10px",
              fontSize: 14,
              fontFamily: '"Press Start 2P", monospace',
              color: "#333"
            }}
            placeholder=""
          />
        </div>
      </form>
    </div>
  );
}
