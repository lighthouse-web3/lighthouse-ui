import axios from "axios";
import { notify } from "./notification";

export const sendEmail = async (email) => {
  try {
    if (!validateEmail(email)) {
      notify(`Error: Enter a valid email address`, "error");
      return;
    }

    const response = await axios.post("/api/send-email", { email });
    if (response.status === 200) {
      notify("Email Submitted", "success");
    } else {
      notify("Failed to send email", "error");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      notify(error.response.data.error, "error");
    } else {
      notify("Failed to send email", "error");
    }
    console.error(error);
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
