import { validate } from "email-validator";

export default function isValidEmail(email: string) {
  return validate(email);
}
