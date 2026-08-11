import axios from "axios";
import { createHash, createHmac } from "crypto";

// Server-side proxy for the newsletter subscription.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signRequest(token, method, endpoint, timestamp, rawBody) {
  const bodyHash = createHash("sha256").update(rawBody).digest("hex");
  const toSign = `${method}\n${endpoint}\n${timestamp}\n${bodyHash}`;
  return createHmac("sha256", token).update(toSign).digest("hex");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email =
    typeof req.body?.email === "string" ? req.body.email.trim() : "";
  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });
  }

  const baseUrl = process.env.NOTIFICATION_SERVICE_URL;
  const token = process.env.NOTIFICATION_SERVICE_TOKEN;
  if (!baseUrl || !token) {
    console.error(
      "Missing NOTIFICATION_SERVICE_URL or NOTIFICATION_SERVICE_TOKEN",
    );
    return res
      .status(500)
      .json({ error: "Notification service not configured" });
  }

  // 1) Queue the newsletter email via the notification service (Brevo template 4).
  const endpoint = "/send-email";
  const payload = { to: email, templateId: 4, tags: ["mainsite-subscription"] };
  const rawBody = JSON.stringify(payload); // sign EXACTLY these bytes
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = signRequest(token, "POST", endpoint, timestamp, rawBody);

  try {
    await axios.post(`${baseUrl}${endpoint}`, rawBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // "X-Service-Id": "vercel-frontend",
        // "X-Timestamp": timestamp,
        // "X-Signature": signature,
      },
    });
  } catch (error) {
    const status = error?.response?.status;
    console.error(
      "Notification service error:",
      status,
      JSON.stringify(error?.response?.data ?? error?.message),
    );
    return res
      .status(502)
      .json({ error: `Notification service error (${status ?? "network"})` });
  }

  // 2) Add the email to the Brevo newsletter list - server-side only, so the
  //    Brevo key never ships to the browser.
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey) {
    try {
      await axios.post(
        "https://api.brevo.com/v3/contacts",
        JSON.stringify({ email, updateEnabled: true, listIds: [20] }),
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": brevoKey,
          },
        },
      );
    } catch (error) {
      // Non-fatal: the email was already queued successfully.
      console.error(
        "Brevo contact list error:",
        error?.response?.status,
        JSON.stringify(error?.response?.data ?? error?.message),
      );
    }
  }

  return res.status(200).json({ status: "queued" });
}
