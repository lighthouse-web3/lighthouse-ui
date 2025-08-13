import axios from "axios";
import { notify } from "./notification";

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API;

export const sendEmail = async (email) => {
  try {
    if (validateEmail(email)) {
      const options = {
        method: "POST",
        url: "https://api.brevo.com/v3/smtp/email",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY,
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
          addEmailToList(email, 20, null);
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

// joinwaitlist which takes email and address and template ID 5 and send email
export const joinWaitlist = async (email, address) => {
  try {
    const options = {
      method: "POST",
      url: "https://api.brevo.com/v3/smtp/email",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      data: {
        sender: {
          name: "Lighthouse",
          email: "hello@lighthouseweb3.xyz",
        },
        to: [{ email }],
        templateId: 29,
        tags: ["mainsite-turby-join-waitlist"],
      },
    };

    axios
      .request(options)
      .then(function (response) {
        notify("Email Submitted", "success");
        addEmailToList(email, 22, {
          address: address,
          DESCRIPTION: address,
          TAGS: ["turby-join-waitlist"],
        });
      })
      .catch(function (error) {
        console.error(error);
      });
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

export const addEmailToList = async (email, listId, attributes) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      attributes: attributes || {},
      updateEnabled: true,
      email: email,
      listIds: [listId],
    }),
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
