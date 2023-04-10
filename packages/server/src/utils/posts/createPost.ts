import getPrisma from "src/utils/prisma/getPrisma";
import { PostExpress, CreatePostBaseInput } from "src/__generated__/generated";
import { Asset, Prisma } from "@prisma/client";
import convertPost from "src/utils/convert/convertPost";
import CONVERT_POST_INCLUDE from "src/constants/include/ConvertPostInclude";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import maybeUpsertAsset from "src/utils/asset/maybeUpsertAsset";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";

export default async function createPost(
  input: CreatePostBaseInput,
  connectOrCreate: {
    airdropMasterEdition?: Prisma.NftWhereUniqueInput;
    campaign?: Prisma.CampaignWhereUniqueInput;
    poll?: Prisma.PollCreateWithoutPostInput;
    user: Prisma.UserWhereUniqueInput;
  },
  viewerId: Maybe<string>
): Promise<PostExpress> {
  const {
    assets: assetInputs,
    body,
    link,
    title,
    visibility,
    visibilityFundingTierIds,
  } = input;
  const { airdropMasterEdition, campaign, user, poll } = connectOrCreate;

  const { post, assets } = await getPrisma().$transaction(
    async (prisma: PrismaTransactionClient) => {
      const postInner = await prisma.post.create({
        data: {
          AirdropMasterEdition:
            airdropMasterEdition != null
              ? { connect: airdropMasterEdition }
              : undefined,
          Campaign: campaign != null ? { connect: campaign } : undefined,
          Creator: { connect: user },
          Poll: { create: poll },
          PostVisibility: { connect: { value: visibility } },
          body,
          link,
          title,
          visibilityFundingTierIds: visibilityFundingTierIds ?? undefined,
        },
        include: CONVERT_POST_INCLUDE,
      });

      const assetsInner: Array<Maybe<Asset>> = await Promise.all(
        (assetInputs ?? []).map((asset) => {
          const { contentType, downloadUrl, dimensions } = asset;
          const { width, height } = dimensions ?? {};

          return maybeUpsertAsset(prisma, downloadUrl, null, {
            Post: { connect: { id: postInner.id } },
            contentType,
            height,
            width,
          });
        })
      );

      return { assets: assetsInner, post: postInner };
    }
  );

  return convertPost({ ...post, Asset: filterNulls(assets) }, viewerId);
}
