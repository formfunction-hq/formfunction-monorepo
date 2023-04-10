import { Request } from "express";

export default function isLastRetry(req: Request) {
  const { current_retry, max_retries } = req.body.delivery_info;

  return current_retry === max_retries - 1;
}
