import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import candyMachineInfoForCampaignSectionResolver from "src/resolvers/query/nested/campaign-section/candyMachineInfoForCampaignSectionResolver";
import metadataAccountsForCampaignSectionConnectionResolver from "src/resolvers/query/nested/campaign-section/metadataAccountsForCampaignSectionConnectionResolver";
import CampaignSectionWithGenerativeMintCandyMachineInfoInputGqlType from "src/schema/input/campaigns/CampaignSectionWithGenerativeMintCandyMachineInfoInputGqlType";
import ICampaignSectionV2GqlType, {
  ICAMPAIGN_SECTION_V2_FIELDS,
} from "src/schema/interface/ICampaignSectionV2GqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";
import CandyMachineGqlType from "src/schema/object/candy-machine/CandyMachineGqlType";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import CandyMachineAllowlistInfoForViewerGqlType from "src/schema/union/CandyMachineAllowlistInfoForViewerGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignSectionWithGenerativeMintsCandyMachineInfo,
  CampaignSectionWithGenerativeMintsCandyMachineInfoInput,
  MetadataAccountsConnection,
} from "src/__generated__/generated";

const CampaignSectionWithGenerativeMintCandyMachineInfoGqlType =
  new GraphQLObjectType({
    fields: {
      candyMachine: { type: gqlNonNull(CandyMachineGqlType) },
      id: { type: gqlNonNull(GraphQLID) },
      isViewerOmniMinter: {
        description:
          "If true, viewer can mint at any time, irrespective of sale times. null if viewer is null.",
        type: GraphQLBoolean,
      },
      mintPreviewAsset: {
        description:
          "Asset used to show a preview when minting from this generative series",
        type: AssetGqlType,
      },
      premintPreviewAssets: {
        description:
          "Assets shown during premint phase, prior to any sale beginning",
        type: gqlListOfNonNull(AssetGqlType),
      },
      viewerAllowlistInfo: { type: CandyMachineAllowlistInfoForViewerGqlType },
      viewerAmountMinted: { type: GraphQLInt },
    },
    name: Typename.CampaignSectionWithGenerativeMintCandyMachineInfo,
  });

const CampaignSectionWithGenerativeMintGqlType = new GraphQLObjectType({
  description: "Campaign section with Generative Mint as funding type",
  fields: {
    ...ICAMPAIGN_SECTION_V2_FIELDS,
    candyMachineInfo: {
      args: {
        input: {
          type: gqlNonNull(
            CampaignSectionWithGenerativeMintCandyMachineInfoInputGqlType
          ),
        },
      },
      async resolve(
        source,
        {
          input,
        }: { input: CampaignSectionWithGenerativeMintsCandyMachineInfoInput },
        context: MyContext
      ): Promise<CampaignSectionWithGenerativeMintsCandyMachineInfo> {
        return logErrorsForResolver<CampaignSectionWithGenerativeMintsCandyMachineInfo>(
          context.req,
          () =>
            candyMachineInfoForCampaignSectionResolver(
              input,
              context,
              source.candyMachineId
            )
        );
      },
      type: CampaignSectionWithGenerativeMintCandyMachineInfoGqlType,
    },
    previewMetadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(PaginationAmountGqlType) },
      },
      async resolve(
        source,
        {
          after,
          first,
        }: {
          after?: Maybe<string>;
          first: number;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver<MetadataAccountsConnection>(
          context.req,
          () =>
            metadataAccountsForCampaignSectionConnectionResolver(
              context,
              after ?? null,
              first,
              source.nftMints
            )
        );
      },
      type: MetadataAccountsConnectionGqlType,
    },
  },
  interfaces: [ICampaignSectionV2GqlType],
  name: Typename.CampaignSectionWithGenerativeMint,
});

export default CampaignSectionWithGenerativeMintGqlType;
