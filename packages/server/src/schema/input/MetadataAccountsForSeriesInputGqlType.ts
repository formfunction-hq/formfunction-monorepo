import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from "graphql";
import SERIES_INPUT_FIELDS from "src/constants/graphql/SeriesInputFields";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";

const MetadataAccountsForSeriesSlugInputGqlType = new GraphQLInputObjectType({
  fields: SERIES_INPUT_FIELDS,
  name: Typename.MetadataAccountsForSeriesSlugInput,
});

const MetadataAccountsForSeriesInputGqlType = new GraphQLInputObjectType({
  fields: {
    mint: {
      description:
        "Intended for using separate connections between NFT pages for NFTs that belong to the same series.",
      type: GraphQLString,
    },
    seriesId: {
      description: "Either one of seriesId or slugInput should be specified",
      type: PublicKeyScalarGqlType,
    },
    shouldLoop: {
      description:
        "Used to loop the NFTs in the series for 'Next in this series' section",
      type: GraphQLBoolean,
    },
    slugInput: {
      description: "Either one of seriesId or slugInput should be specified",
      type: MetadataAccountsForSeriesSlugInputGqlType,
    },
  },
  name: Typename.MetadataAccountsForSeriesInput,
});

export default MetadataAccountsForSeriesInputGqlType;
