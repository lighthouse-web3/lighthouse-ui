import { notify } from "./notification";

export const sendEmail = async (email) => {
  try {
    if (!validateEmail(email)) {
      notify("Error: Enter a valid email address", "error");
      return;
    }

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email.trim() }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(data?.error || "Subscription failed");
      notify(data?.error || "Subscription failed", "error");
      return;
    }

    notify("Email Submitted", "success");
  } catch (error) {
    console.error(error);
    notify("Subscription failed", "error");
  }
};

// joinwaitlist which takes email and address and template ID 5 and send email
export const joinWaitlist = async (email, address) => {
  try {
    const response = await fetch("/api/airtable/waitlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, address }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.error || "Failed to join waitlist");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
