export const CONTACT_EMAIL = "sankalpshukla212@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  message,
}: ContactEmailPayload) {
  const formData = new FormData();

  formData.set("name", name);
  formData.set("email", email);
  formData.set("message", message);
  formData.set("_subject", "New portfolio hire request for Sankalp Shukla");
  formData.set("_template", "table");
  formData.set("_captcha", "false");

  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Unable to send contact email.");
  }
}

export function buildContactComposeUrl({ name, email, message }: ContactEmailPayload) {
  const subject = "New portfolio hire request for Sankalp Shukla";
  const body = [
    "Hi Sankalp,",
    "",
    "I want to discuss a project.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
