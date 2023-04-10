import bs58 from "bs58";

export default function base58ToHex(base58String: string) {
  return Buffer.from(bs58.decode(base58String)).toString("hex");
}
