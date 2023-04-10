import { NextFunction, Request, Response } from "express";
import verifySignature from "src/utils/auth/verifySignature";
import getPublicKey from "src/utils/headers/getPublicKey";
import getPublicKeySignature from "src/utils/headers/getPublicKeySignature";

export default async function verifySignatureEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const publicKey = getPublicKey(req);
  const signature = getPublicKeySignature(req);
  const verified = verifySignature(req, publicKey, signature);
  res.json({
    publicKey: publicKey?.toString() ?? "null or undefined",
    signature: signature ?? "null or undefined",
    verified,
  });
}
