import PublicKeyOrString from "types/PublicKeyOrString";

export default function arePublicKeysEqual(
  pubkey1: PublicKeyOrString,
  pubkey2: PublicKeyOrString
): boolean {
  return pubkey1.toString() === pubkey2.toString();
}
