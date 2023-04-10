import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import auctionWinnerIdResolver from "src/resolvers/query/nested/nft/auctionWinnerIdResolver";
import auctionWinnerResolver from "src/resolvers/query/nested/nft/auctionWinnerResolver";
import maxSupplyOfMasterEditionResolver from "src/resolvers/query/nested/nft/maxSupplyOfMasterEditionResolver";
import maxSupplyResolver from "src/resolvers/query/nested/nft/maxSupplyResolver";
import nftAuctionHoldingPeriodEndTimeResolver from "src/resolvers/query/nested/nft/nftAuctionHoldingPeriodEndTimeResolver";
import numberOfStandardEditionsMintedResolver from "src/resolvers/query/nested/nft/numberOfStandardEditionsMintedResolver";
import priceLastListedResolver from "src/resolvers/query/nested/nft/priceLastListedResolver";
import NftStatusGqlType from "src/schema/enum/NftStatusGqlType";
import PriceFunctionTypeGqlType from "src/schema/enum/PriceFunctionTypeGqlType";
import SeriesGqlType from "src/schema/object/SeriesGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import PriceGqlType from "src/schema/object/PriceGqlType";
import priceLastListedV2Resolver from "src/resolvers/query/nested/nft/priceLastListedV2Resolver";
import CandyMachineGqlType from "src/schema/object/candy-machine/CandyMachineGqlType";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import NftDisclosureGqlType from "src/schema/object/NftDisclosureGqlType";
import campaignFundingTierForNftResolver from "src/resolvers/query/nested/nft/campaignFundingTierForNftResolver";
import ICampaignFundingTierGqlType from "src/schema/interface/ICampaignFundingTierGqlType";
import isAirdropResolver from "src/resolvers/query/nested/nft/isAirdropResolver";

const EditionPriceInfoGqlType = new GraphQLObjectType({
  fields: {
    allowlistPriceInFullDecimals: { type: BigintScalarGqlType },
    priceFunctionType: { type: gqlNonNull(PriceFunctionTypeGqlType) },
    priceParams: { type: gqlNonNullListOfNonNull(GraphQLFloat) },
    startingPriceInLamports: { type: gqlNonNull(BigintScalarGqlType) },
  },
  name: Typename.EditionPriceInfo,
});

const TickSizeInfoGqlType = new GraphQLObjectType({
  fields: {
    tickSizeConstantInLamports: { type: BigintScalarGqlType },
  },
  name: Typename.TickSizeInfo,
});

const NftGqlType = new GraphQLObjectType({
  fields: {
    AuctionWinner: { resolve: auctionWinnerResolver, type: UserGqlType },
    CampaignFundingTier: {
      resolve: campaignFundingTierForNftResolver,
      type: ICampaignFundingTierGqlType,
    },
    CandyMachine: { type: CandyMachineGqlType },
    Creator: { type: UserGqlType },
    Owner: { type: UserGqlType },
    Series: { type: SeriesGqlType },
    antiBotProtectionEnabled: { type: GraphQLBoolean },
    auctionCount: { type: gqlNonNull(GraphQLInt) },
    auctionDurationInSeconds: { type: gqlNonNull(GraphQLInt) },
    auctionEndTime: { type: TimestamptzScalarGqlType },
    auctionHoldingPeriodEndTime: {
      resolve: nftAuctionHoldingPeriodEndTimeResolver,
      type: TimestamptzScalarGqlType,
    },
    auctionWinnerId: { resolve: auctionWinnerIdResolver, type: GraphQLString },
    creatorId: { type: gqlNonNull(GraphQLString) },
    disclosures: { type: gqlListOfNonNull(NftDisclosureGqlType) },
    edition: { type: GraphQLInt },
    editionAllowlistEnabled: { type: gqlNonNull(GraphQLBoolean) },
    editionAllowlistSaleStartTime: { type: TimestamptzScalarGqlType },
    editionBuyLimitPerAddress: { type: GraphQLInt },
    editionPriceInfo: { type: EditionPriceInfoGqlType },
    editionPublicSaleStartTime: { type: TimestamptzScalarGqlType },
    id: { type: gqlNonNull(GraphQLID) },
    isAirdrop: {
      resolve: isAirdropResolver,
      type: gqlNonNull(GraphQLBoolean),
    },
    isImported: { type: gqlNonNull(GraphQLBoolean) },
    isMasterEdition: { type: gqlNonNull(GraphQLBoolean) },
    isOffPlatform: { type: gqlNonNull(GraphQLBoolean) },
    isPnft: { type: gqlNonNull(GraphQLBoolean) },
    isPnftDropActive: { type: GraphQLBoolean },
    masterEditionMint: { type: PublicKeyScalarGqlType },
    maxSupply: {
      description:
        "This is the value for max supply that we want to display in the UI. " +
        "Put another way, it is the user-facing max supply. It may differ from maxSupplyOnchain " +
        "if the user stops minting before all editions are sold.",
      resolve: maxSupplyResolver,
      type: GraphQLInt,
    },
    maxSupplyOfMasterEdition: {
      resolve: maxSupplyOfMasterEditionResolver,
      type: GraphQLInt,
    },
    maxSupplyOnchain: {
      description:
        "The on-chain max supply value. This may differ from maxSupply if the user stops minting before all editions are sold.",
      type: GraphQLInt,
    },
    mint: { type: gqlNonNull(GraphQLString) },
    numberOfStandardEditionsMinted: {
      description:
        "If the NFT is a master edition, returns the number of editions printed from the master edition. " +
        "If the NFT is a standard edition, returns the number of editions printed from its master edition.",
      resolve: numberOfStandardEditionsMintedResolver,
      type: GraphQLInt,
    },
    ownerId: { type: gqlNonNull(GraphQLString) },
    pnftIdForAuction: { type: GraphQLString },
    price: { type: BigintScalarGqlType },
    priceLastListed: {
      resolve: priceLastListedResolver,
      type: BigintScalarGqlType,
    },
    priceLastListedV2: {
      resolve: priceLastListedV2Resolver,
      type: PriceGqlType,
    },
    priceLastSoldForInLamports: { type: BigintScalarGqlType },
    priceLastSoldV2: { type: PriceGqlType },
    priceV2: { type: PriceGqlType },
    scheduledAuctionTime: { type: TimestamptzScalarGqlType },
    seriesRarityRanking: { type: GraphQLInt },
    status: { type: gqlNonNull(NftStatusGqlType) },
    tickSizeInfo: { type: gqlNonNull(TickSizeInfoGqlType) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    timeExtensionDurationInSeconds: { type: gqlNonNull(GraphQLInt) },
  },
  name: Typename.Nft,
});

export default NftGqlType;
