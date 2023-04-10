import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import AssetGqlType from "src/schema/object/AssetGqlType";
import CampaignSocialLinksGqlType from "src/schema/object/campaigns/CampaignSocialLinksGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import CampaignGoalGqlType from "src/schema/union/CampaignGoalGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const CampaignGqlType = new GraphQLObjectType({
  description:
    "Contains high-level campaign information. " +
    "Other information, like which NFTs belong to the campaign, is in CampaignSection",
  fields: {
    about: {
      description: "A comprehensive description of the campaign",
      type: gqlNonNull(GraphQLString),
    },
    amountRaisedInLamports: { type: gqlNonNull(BigintScalarGqlType) },
    creator: { type: gqlNonNull(UserGqlType) },
    description: {
      description: "A short description of the campaign",
      type: gqlNonNull(GraphQLString),
    },
    descriptionAlt: {
      description:
        "An alternative description. May be displayed in certain places instead of the description",
      type: GraphQLString,
    },
    emojiMarker: {
      description: "A fun way to mark progress on the campaign progress bar",
      type: GraphQLString,
    },
    goal: { type: gqlNonNull(CampaignGoalGqlType) },
    goalInLamports: { type: gqlNonNull(BigintScalarGqlType) },
    heroAssets: {
      type: gqlNonNullListOfNonNull(AssetGqlType),
    },
    id: { type: gqlNonNull(GraphQLID) },
    logoAsset: {
      type: AssetGqlType,
    },
    socialLinks: {
      type: CampaignSocialLinksGqlType,
    },
    title: {
      type: gqlNonNull(GraphQLString),
    },
  },
  name: Typename.Campaign,
});

export default CampaignGqlType;
