import { GraphQLUnionType } from "graphql";
import CampaignSectionWithGenerativeMintGqlType from "src/schema/object/campaigns/section/CampaignSectionWithGenerativeMintGqlType";
import CampaignSectionWithNftsGqlType from "src/schema/object/campaigns/section/CampaignSectionWithNftsGqlType";
import Typename from "src/types/enums/Typename";

const CampaignSectionV2GqlType = new GraphQLUnionType({
  name: Typename.CampaignSectionV2,
  types: [
    CampaignSectionWithNftsGqlType,
    CampaignSectionWithGenerativeMintGqlType,
  ],
});

export default CampaignSectionV2GqlType;
