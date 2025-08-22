import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  // simple honeypot field (should be empty)
  company: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    if ((parsed.data.company ?? "").trim() !== "") {
      // bot likely
      return NextResponse.json({ ok: true });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(resendKey);

    const toEmail = process.env.CONTACT_TO_EMAIL || "arijitiansjx@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const { data: sendData, error } = await resend.emails.send({
      to: toEmail,
      from: fromEmail,
      subject: `New portfolio message from ${parsed.data.name}`,
      reply_to: parsed.data.email,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message
      ].join("\n")
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: sendData?.id ?? null });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}