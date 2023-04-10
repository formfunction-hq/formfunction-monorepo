import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { MetadataOffchainImageInput } from "src/__generated__/generated";

function paramsFromInput(input?: Maybe<MetadataOffchainImageInput>) {
  if (input == null) {
    return "";
  }

  let params = "";

  if (input.height != null) {
    params += `&h=${input.height}`;
  }

  return params;
}

export default function getImgixUrl(
  fileName: string,
  input?: Maybe<MetadataOffchainImageInput>
): string {
  return `https://formfunction.imgix.net/${fileName}?q=70&auto=format&auto=compress${paramsFromInput(
    input
  )}`;
}
