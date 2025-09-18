import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  const brevo_key = process.env.NEXT_PUBLIC_BREVO_API;

  if (!brevo_key) {
    return res.status(500).json({ error: "Brevo API key is not configured" });
  }

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const options = {
    method: "POST",
    url: "https://api.brevo.com/v3/smtp/email",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": brevo_key,
    },
    data: {
      sender: {
        name: "Lighthouse",
        email: "hello@lighthouseweb3.xyz",
      },
      to: [{ email }],
      templateId: 4,
      tags: ["mainsite-subscription"],
    },
  };

  try {
    await axios.request(options);
    return res.status(200).json({ message: "Email Submitted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
