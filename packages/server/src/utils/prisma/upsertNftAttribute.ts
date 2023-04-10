import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftAttributeInput } from "src/__generated__/generated";

export default async function upsertNftAttribute(attribute: NftAttributeInput) {
  const { traitType, value } = attribute;
  if (
    traitType == null ||
    value == null ||
    (traitType === "" && value === "")
  ) {
    return null;
  }

  if (typeof value !== "string" && typeof value !== "number") {
    logError(
      AnalyticsEvent.ImportNftsError,
      "Found attribute value that is neither string nor number",
      null,
      { attribute }
    );
    return null;
  }

  const valueToInsert = String(value);
  const prisma = getPrisma();
  const result = await prisma.attribute.upsert({
    create: {
      traitType,
      value: valueToInsert,
    },
    update: {
      traitType,
      value: valueToInsert,
    },
    where: {
      traitType_value: {
        traitType,
        value: valueToInsert,
      },
    },
  });

  return { attributeId: result.id };
}
