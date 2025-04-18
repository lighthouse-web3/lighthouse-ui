import axios from "axios";
import { notify } from "./notification";
const brevo_key = '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';

export const sendEmail = async (email) => {
  try {
    if (validateEmail(email)) {
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

      axios
        .request(options)
        .then(function (response) {
          //
          notify("Email Submitted", "success");
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      notify(`Error: Enter a valid email address`, "error");
    }
  } catch (error) {
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
