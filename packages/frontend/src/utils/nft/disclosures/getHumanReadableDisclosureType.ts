import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftDisclosureTypeExpress_enum from "types/relay/NftDisclosureTypeExpress_enum";

function long(type: NftDisclosureTypeExpress_enum) {
  switch (type) {
    case "AiArt":
      return "This piece was made with AI";
    case "Derivative":
      return "This piece is a derivative";
    case "Nsfw":
      return "This piece is NSFW";
    case RELAY_FUTURE_ADDED_VALUE:
      return "";
    default:
      return assertUnreachable(type);
  }
}

function short(type: NftDisclosureTypeExpress_enum) {
  switch (type) {
    case "AiArt":
      return "Made with AI";
    case "Derivative":
      return "Derivative";
    case "Nsfw":
      return "NSFW";
    case RELAY_FUTURE_ADDED_VALUE:
      return "";
    default:
      return assertUnreachable(type);
  }
}

export default function getHumanReadableDisclosureType(
  type: NftDisclosureTypeExpress_enum,
  version: "short" | "long"
) {
  return version === "short" ? short(type) : long(type);
}
