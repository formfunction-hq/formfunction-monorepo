import { Asset, Post, Reaction } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCommentType from "src/types/convert/ConvertCommentType";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import ConvertPollType from "src/types/convert/ConvertPollType";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertPostType = Post & {
  AirdropMasterEdition: Maybe<ConvertNftToMetadataAccountType>;
  Asset: Array<Asset>;
  Comment: Array<ConvertCommentType>;
  Creator: ConvertUserType;
  Poll?: Maybe<ConvertPollType>;
  Reaction: Array<Reaction>;
  _count: {
    Comment: number;
  };
};

export default ConvertPostType;
