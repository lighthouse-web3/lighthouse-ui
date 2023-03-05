import { notify } from "./notification";
import emailjs from "@emailjs/browser";

export const sendEmail = async (email) => {
  let message = {
    to_email: email,
  };
  emailjs
    .send(
      "service_dyqwvtg",
      "template_np0xnzi",
      message,
      "user_Aknum3vI0j25vcn8JC5ZO"
    )
    .then(
      function (response) {
        if (response.status === 200) {
          notify("Email Submitted", "success");
        }
      },
      function (error) {
        notify(`Error: ${error}`, "error");
      }
    );
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
