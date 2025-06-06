import nodemailer from "nodemailer";

export async function POST(request) {
  const { to, subject, from, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fkasmenko@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: from || "form@francokasmenko.dev",
      to: "fkasmenko@gmail.com",
      subject: `[FORM] ${subject}`,
      text: `De: ${from}\nPara: ${to}\n\n${message}`,
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "No se pudo enviar el mail", detail: String(e) }),
      { status: 500 }
    );
  }
}
