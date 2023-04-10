import { Request } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function getPublicKeySignature(req: Request): Maybe<string> {
  return (req.headers["x-solana-sig"] as string) ?? null;
}
