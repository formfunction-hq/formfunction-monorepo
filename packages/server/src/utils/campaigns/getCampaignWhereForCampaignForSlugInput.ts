import { Prisma } from "@prisma/client";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import invariant from "tiny-invariant";

export default function getCampaignWhereForCampaignForSlugInput(input: {
  campaignSlug: string;
  creatorId?: MaybeUndef<string>;
  creatorUsername?: MaybeUndef<string>;
}): Prisma.CampaignWhereInput {
  const { creatorId, creatorUsername, campaignSlug } = input;
  invariant(
    creatorId != null || creatorUsername != null,
    "One of creatorId and creatorUsername must be non-null"
  );

  return {
    Creator: {
      id: creatorId ?? undefined,
      username: creatorUsername ?? undefined,
    },
    slug: campaignSlug,
  };
}
