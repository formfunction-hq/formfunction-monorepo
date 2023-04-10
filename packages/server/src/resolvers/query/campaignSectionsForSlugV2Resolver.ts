import {
  CampaignSectionsForSlugV2Input,
  CampaignSectionsForSlugV2Response,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getCampaignsConfig from "src/utils/launch-darkly/getCampaignsConfig";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import invariant from "tiny-invariant";

export default async function campaignSectionsForSlugV2Resolver(
  input: CampaignSectionsForSlugV2Input
): Promise<CampaignSectionsForSlugV2Response> {
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
      __typename: Typename.CampaignSectionsForSlugV2Response,
    };
  }

  return {
    __typename: Typename.CampaignSectionsForSlugV2Response,
    campaignSections: await Promise.all(
      campaignConfig.sections.map(async (section, i) => ({
        ...section,
        __typename:
          section.candyMachineId != null
            ? Typename.CampaignSectionWithGenerativeMint
            : Typename.CampaignSectionWithNfts,
        // TODO: replace with real DB ID when ready
        id: `campaign-${creator.id}-${input.campaignSlug}-campaignSection-${i}`,
        nftMints:
          section.candyMachineId != null
            ? (
                await prisma.nft.findMany({
                  select: { id: true },
                  // TODO: make configurable?
                  take: 12,
                  where: {
                    Series: {
                      CandyMachine: { id: section.candyMachineId },
                    },
                  },
                })
              ).map(({ id }) => id)
            : section.nftMints,
      }))
    ),
  };
}
