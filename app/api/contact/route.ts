const recipient = "2431871.prince@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PORTFOLIO_EMAIL_FROM;
  if (!apiKey || !from) {
    return Response.json({ error: `Email delivery is not configured yet. You can email me at ${recipient}.` }, { status: 503 });
  }

  let payload: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (payload.website) return Response.json({ sent: true });
  if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 4000) {
    return Response.json({ error: "Please enter a valid name, email, and message." }, { status: 400 });
  }

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });
    if (!result.ok) return Response.json({ error: "The email service could not deliver your message. Please email me directly." }, { status: 502 });
    return Response.json({ sent: true });
  } catch {
    return Response.json({ error: "The email service is unavailable. Please email me directly." }, { status: 502 });
  }
}
