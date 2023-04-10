import {
  CampaignSectionsForSlugInput,
  CampaignSectionsForSlugResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import { nanoid } from "nanoid";
import getCampaignsConfig from "src/utils/launch-darkly/getCampaignsConfig";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import invariant from "tiny-invariant";

export default async function campaignSectionsForSlugResolver(
  input: CampaignSectionsForSlugInput
): Promise<CampaignSectionsForSlugResponse> {
  invariant(
    input.creatorId != null || input.creatorUsername != null,
    "One of creatorId and creatorUsername must be non-null"
  );
  const prisma = getPrisma();
  const [campaignsConfig, creator] = await Promise.all([
    getCampaignsConfig(),
    prisma.user.findUnique({
      include: CONVERT_USER_INCLUDE,
      where: {
        id: input.creatorId ?? undefined,
        username: input.creatorUsername ?? undefined,
      },
    }),
  ]);
  const campaignConfig = campaignsConfig.campaignsBySlug[input.campaignSlug];

  if (
    creator == null ||
    campaignConfig == null ||
    creator.id !== campaignConfig.creatorId
  ) {
    return {
      __typename: Typename.CampaignSectionsForSlugResponse,
    };
  }

  return {
    __typename: Typename.CampaignSectionsForSlugResponse,
    campaignSections: campaignConfig.sections.map((section) => ({
      ...section,
      __typename: Typename.CampaignSection,
      id: nanoid(),
    })),
  };
}
