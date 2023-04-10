import { Prisma } from "@prisma/client";
import CONVERT_COMMENT_INCLUDE from "src/constants/include/ConvertCommentInclude";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_POLL_INCLUDE from "src/constants/include/ConvertPollInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_POST_INCLUDE = {
  AirdropMasterEdition: { include: CONVERT_NFT_TO_METADATA_INCLUDE },
  Asset: true,
  Comment: {
    include: CONVERT_COMMENT_INCLUDE,
    orderBy: { timeCreated: "asc" as Prisma.SortOrder },
    take: 2,
  },
  Creator: {
    include: CONVERT_USER_INCLUDE,
  },
  Poll: {
    include: CONVERT_POLL_INCLUDE,
  },
  Reaction: true,
  _count: {
    select: { Comment: true },
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.PostInclude;

export default CONVERT_POST_INCLUDE;
