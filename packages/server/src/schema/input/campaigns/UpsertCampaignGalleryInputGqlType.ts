import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UpsertCampaignGalleryInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignId: { type: gqlNonNull(GraphQLID) },
    galleryAssets: { type: gqlNonNullListOfNonNull(AssetInputGqlType) },
    youtubeVideoHref: { type: GraphQLString },
  },
  name: Typename.UpsertCampaignGalleryInput,
});

export default UpsertCampaignGalleryInputGqlType;
