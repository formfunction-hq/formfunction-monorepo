import invariant from "tiny-invariant";
import sgMail from "@sendgrid/mail";

let initialized = false;
export default function sendgridMail() {
  if (initialized) {
    return sgMail;
  }

  invariant(
    process.env.SENDGRID_API_KEY != null,
    "Sendgrid API key can't be null"
  );
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  initialized = true;
  return sgMail;
}
