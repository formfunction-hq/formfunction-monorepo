import {
  Asset,
  Campaign,
  CampaignToTeamMember,
  Currency,
  Request,
} from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCampaignFundingTierType from "src/types/convert/ConvertCampaignFundingTierType";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertCampaignType = Campaign & {
  CampaignFundingTier: Array<ConvertCampaignFundingTierType>;
  CampaignToTeamMember: Array<
    CampaignToTeamMember & {
      Member: ConvertUserType;
      Request: Request;
    }
  >;
  Creator: ConvertUserType;
  GalleryAssets: Array<Asset>;
  GoalCurrency: Maybe<Currency>;
  PreviewAsset: Asset;
};

export default ConvertCampaignType;
