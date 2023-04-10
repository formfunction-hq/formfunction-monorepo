import { Request } from "express";

export default function validateInternHeaders(req: Request) {
  return req.headers.check === "fofu";
}
