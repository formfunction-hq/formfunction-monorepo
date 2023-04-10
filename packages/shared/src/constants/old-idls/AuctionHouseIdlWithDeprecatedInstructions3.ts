import { Idl } from "@project-serum/anchor";

/**
 * createEditionDistributor takes in the treasuryMint account
 */

const AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_3: Idl = {
  accounts: [
    {
      name: "AuctionHouse",
      type: {
        fields: [
          {
            name: "auctionHouseFeeAccount",
            type: "publicKey",
          },
          {
            name: "auctionHouseTreasury",
            type: "publicKey",
          },
          {
            name: "treasuryWithdrawalDestination",
            type: "publicKey",
          },
          {
            name: "feeWithdrawalDestination",
            type: "publicKey",
          },
          {
            name: "treasuryMint",
            type: "publicKey",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "treasuryBump",
            type: "u8",
          },
          {
            name: "feePayerBump",
            type: "u8",
          },
          {
            name: "sellerFeeBasisPoints",
            type: "u16",
          },
          {
            name: "requiresSignOff",
            type: "bool",
          },
          {
            name: "canChangeSalePrice",
            type: "bool",
          },
          {
            name: "sellerFeeBasisPointsSecondary",
            type: "u16",
          },
          {
            name: "payAllFees",
            type: "bool",
          },
        ],
        kind: "struct",
      },
    },
    {
      name: "LastBidPrice",
      type: {
        fields: [
          {
            name: "price",
            type: "u64",
          },
          {
            name: "bidder",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "hasBeenSold",
            type: "u8",
          },
          {
            name: "tickSizeConstantInLamports",
            type: "u64",
          },
          {
            name: "hasCampaignEscrowTreasury",
            type: "bool",
          },
        ],
        kind: "struct",
      },
    },
    {
      name: "EditionDistributor",
      type: {
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "masterEditionMint",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "priceFunction",
            type: {
              defined: "PriceFunction",
            },
          },
          {
            name: "startTime",
            type: "i64",
          },
          {
            name: "endTime",
            type: {
              option: "i64",
            },
          },
          {
            name: "antiBotProtectionEnabled",
            type: "bool",
          },
          {
            name: "limitPerAddress",
            type: "u16",
          },
          {
            name: "treasuryMint",
            type: "publicKey",
          },
        ],
        kind: "struct",
      },
    },
    {
      name: "EditionBuyerInfoAccount",
      type: {
        fields: [
          {
            name: "numberBought",
            type: "u16",
          },
        ],
        kind: "struct",
      },
    },
  ],
  errors: [
    {
      code: 6000,
      msg: "PublicKeyMismatch",
      name: "PublicKeyMismatch",
    },
    {
      code: 6001,
      msg: "InvalidMintAuthority",
      name: "InvalidMintAuthority",
    },
    {
      code: 6002,
      msg: "UninitializedAccount",
      name: "UninitializedAccount",
    },
    {
      code: 6003,
      msg: "IncorrectOwner",
      name: "IncorrectOwner",
    },
    {
      code: 6004,
      msg: "PublicKeysShouldBeUnique",
      name: "PublicKeysShouldBeUnique",
    },
    {
      code: 6005,
      msg: "StatementFalse",
      name: "StatementFalse",
    },
    {
      code: 6006,
      msg: "NotRentExempt",
      name: "NotRentExempt",
    },
    {
      code: 6007,
      msg: "NumericalOverflow",
      name: "NumericalOverflow",
    },
    {
      code: 6008,
      msg: "Expected a sol account but got an spl token account instead",
      name: "ExpectedSolAccount",
    },
    {
      code: 6009,
      msg: "Cannot exchange sol for sol",
      name: "CannotExchangeSOLForSol",
    },
    {
      code: 6010,
      msg: "If paying with sol, sol wallet must be signer",
      name: "SOLWalletMustSign",
    },
    {
      code: 6011,
      msg: "Cannot take this action without auction house signing too",
      name: "CannotTakeThisActionWithoutAuctionHouseSignOff",
    },
    {
      code: 6012,
      msg: "No payer present on this txn",
      name: "NoPayerPresent",
    },
    {
      code: 6013,
      msg: "Derived key invalid",
      name: "DerivedKeyInvalid",
    },
    {
      code: 6014,
      msg: "Metadata doesn't exist",
      name: "MetadataDoesntExist",
    },
    {
      code: 6015,
      msg: "Invalid token amount",
      name: "InvalidTokenAmount",
    },
    {
      code: 6016,
      msg: "Both parties need to agree to this sale",
      name: "BothPartiesNeedToAgreeToSale",
    },
    {
      code: 6017,
      msg: "Cannot match free sales unless the auction house or seller signs off",
      name: "CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff",
    },
    {
      code: 6018,
      msg: "This sale requires a signer",
      name: "SaleRequiresSigner",
    },
    {
      code: 6019,
      msg: "Old seller not initialized",
      name: "OldSellerNotInitialized",
    },
    {
      code: 6020,
      msg: "Seller ata cannot have a delegate set",
      name: "SellerATACannotHaveDelegate",
    },
    {
      code: 6021,
      msg: "Buyer ata cannot have a delegate set",
      name: "BuyerATACannotHaveDelegate",
    },
    {
      code: 6022,
      msg: "No valid signer present",
      name: "NoValidSignerPresent",
    },
    {
      code: 6023,
      msg: "BP must be less than or equal to 10000",
      name: "InvalidBasisPoints",
    },
    {
      code: 6024,
      msg: "Buyer price must be greater than or equal to seller price",
      name: "MismatchedPrices",
    },
    {
      code: 6025,
      msg: "Either the seller or auction house must sign",
      name: "SellerOrAuctionHouseMustSign",
    },
    {
      code: 6026,
      msg: "The auction has ended and bids are no longer allowed",
      name: "BidTooLate",
    },
    {
      code: 6027,
      msg: "The bid price is too low",
      name: "BidTooLow",
    },
    {
      code: 6028,
      msg: "Expected a native refund",
      name: "RefundNotNative",
    },
    {
      code: 6029,
      msg: "Previous bidder is incorrect",
      name: "PreviousBidderIncorrect",
    },
    {
      code: 6030,
      msg: "The provided trade state account is already initialized",
      name: "TradeStateAlreadyInitialized",
    },
    {
      code: 6031,
      msg: "Either the buyer or auction house must sign",
      name: "BuyerOrAuctionHouseMustSign",
    },
    {
      code: 6032,
      msg: "Seller and buyer sale type must match",
      name: "SellerBuyerSaleTypeMustMatch",
    },
    {
      code: 6033,
      msg: "Cannot execute sale more than once",
      name: "CanOnlyExecuteSaleOnce",
    },
    {
      code: 6034,
      msg: "Cannot accept offer for piece on auction",
      name: "CannotAcceptOfferWhileOnAuction",
    },
    {
      code: 6035,
      msg: "Cannot place offer for piece on auction",
      name: "CannotPlaceOfferWhileOnAuction",
    },
    {
      code: 6036,
      msg: "Buyer token account cannot have a delegate set",
      name: "BuyerTokenAccountCannotHaveDelegate",
    },
    {
      code: 6037,
      msg: "Invalid master edition account",
      name: "InvalidMasterEditionAccount",
    },
    {
      code: 6038,
      msg: "Invalid master edition supply",
      name: "InvalidMasterEditionSupply",
    },
    {
      code: 6039,
      msg: "Too many price params, max is 6",
      name: "TooManyPriceParams",
    },
    {
      code: 6040,
      msg: "Invalid price params",
      name: "InvalidPriceParams",
    },
    {
      code: 6041,
      msg: "Invalid edition number provided. This edition may have already been bought",
      name: "InvalidEdition",
    },
    {
      code: 6042,
      msg: "Invalid amount on token account. This NFT may no longer be available.",
      name: "InvalidTokenAccountAmount",
    },
    {
      code: 6043,
      msg: "Cannot override bidder when auction in progress",
      name: "CannotOverrideBidderAuctionInProgress",
    },
    {
      code: 6044,
      msg: "The end time must come after the start time",
      name: "EndTimeMustComeAfterStartTime",
    },
    {
      code: 6045,
      msg: "The start time must be in the future",
      name: "StartTimeMustBeInFuture",
    },
    {
      code: 6046,
      msg: "The end time must be in the future",
      name: "EndTimeMustBeInFuture",
    },
    {
      code: 6047,
      msg: "The sale for this edition has not started yet",
      name: "BuyEditionTooEarly",
    },
    {
      code: 6048,
      msg: "The sale for this edition has already ended",
      name: "BuyEditionTooLate",
    },
    {
      code: 6049,
      msg: "The edition at this price has already been bought. Please try again",
      name: "InvalidEditionPrice",
    },
    {
      code: 6050,
      msg: "The tick size is too low, must be at least 0.1 SOL",
      name: "TickSizeTooLow",
    },
    {
      code: 6051,
      msg: "Invalid auction house",
      name: "InvalidAuctionHouse",
    },
    {
      code: 6052,
      msg: "Invalid anti-bot authority",
      name: "InvalidAntiBotAuthority",
    },
    {
      code: 6053,
      msg: "Bot tax collected",
      name: "BotTaxCollected",
    },
    {
      code: 6054,
      msg: "The wallet has already purchased the maximum number of editions",
      name: "EditionLimitPerAddressExceeded",
    },
    {
      code: 6055,
      msg: "The provided treasury mint does not match the treasury mint of the edition distributor",
      name: "InvalidTreasuryMintForBuyEdition",
    },
  ],
  instructions: [
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "masterEditionMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: true,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributorTokenAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tokenReceiver",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
      ],
      args: [],
      name: "withdrawBonk",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: true,
          name: "authority",
        },
        {
          isMut: true,
          isSigner: false,
          name: "feeWithdrawalDestination",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      name: "withdrawFromFee",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: false,
          isSigner: true,
          name: "authority",
        },
        {
          isMut: true,
          isSigner: false,
          name: "treasuryWithdrawalDestination",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseTreasury",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      name: "withdrawFromTreasury",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: false,
          isSigner: true,
          name: "payer",
        },
        {
          isMut: false,
          isSigner: true,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "newAuthority",
        },
        {
          isMut: true,
          isSigner: false,
          name: "feeWithdrawalDestination",
        },
        {
          isMut: true,
          isSigner: false,
          name: "treasuryWithdrawalDestination",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryWithdrawalDestinationOwner",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "ataProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
      ],
      args: [
        {
          name: "sellerFeeBasisPoints",
          type: {
            option: "u16",
          },
        },
        {
          name: "requiresSignOff",
          type: {
            option: "bool",
          },
        },
        {
          name: "canChangeSalePrice",
          type: {
            option: "bool",
          },
        },
        {
          name: "sellerFeeBasisPointsSecondary",
          type: {
            option: "u16",
          },
        },
        {
          name: "payAllFees",
          type: {
            option: "bool",
          },
        },
      ],
      name: "updateAuctionHouse",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: true,
          isSigner: true,
          name: "payer",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: true,
          isSigner: false,
          name: "feeWithdrawalDestination",
        },
        {
          isMut: true,
          isSigner: false,
          name: "treasuryWithdrawalDestination",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryWithdrawalDestinationOwner",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseTreasury",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "ataProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
        {
          name: "feePayerBump",
          type: "u8",
        },
        {
          name: "treasuryBump",
          type: "u8",
        },
        {
          name: "sellerFeeBasisPoints",
          type: "u16",
        },
        {
          name: "requiresSignOff",
          type: "bool",
        },
        {
          name: "canChangeSalePrice",
          type: "bool",
        },
        {
          name: "sellerFeeBasisPointsSecondary",
          type: "u16",
        },
        {
          name: "payAllFees",
          type: "bool",
        },
      ],
      name: "createAuctionHouse",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "wallet",
        },
        {
          isMut: true,
          isSigner: false,
          name: "receiptAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "escrowPaymentAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "ataProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
      ],
      args: [
        {
          name: "escrowPaymentBump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
      name: "withdraw",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: true,
          name: "wallet",
        },
        {
          isMut: true,
          isSigner: false,
          name: "paymentAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "transferAuthority",
        },
        {
          isMut: true,
          isSigner: false,
          name: "escrowPaymentAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
      ],
      args: [
        {
          name: "escrowPaymentBump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
      name: "deposit",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: false,
          name: "wallet",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tradeState",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: true,
          isSigner: false,
          name: "programAsSigner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEdition",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metaplexTokenMetadataProgram",
        },
      ],
      args: [
        {
          name: "buyerPrice",
          type: "u64",
        },
        {
          name: "tokenSize",
          type: "u64",
        },
        {
          name: "programAsSignerBump",
          type: "u8",
        },
      ],
      name: "cancelV2",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: false,
          name: "buyer",
        },
        {
          isMut: true,
          isSigner: false,
          name: "seller",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metadata",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: true,
          isSigner: false,
          name: "escrowPaymentAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "sellerPaymentReceiptAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "buyerReceiptTokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseTreasury",
        },
        {
          isMut: true,
          isSigner: false,
          name: "buyerTradeState",
        },
        {
          isMut: true,
          isSigner: false,
          name: "sellerTradeState",
        },
        {
          isMut: true,
          isSigner: false,
          name: "freeTradeState",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "ataProgram",
        },
        {
          isMut: true,
          isSigner: false,
          name: "programAsSigner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEdition",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metaplexTokenMetadataProgram",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
      ],
      args: [
        {
          name: "escrowPaymentBump",
          type: "u8",
        },
        {
          name: "freeTradeStateBump",
          type: "u8",
        },
        {
          name: "programAsSignerBump",
          type: "u8",
        },
        {
          name: "buyerPrice",
          type: "u64",
        },
        {
          name: "sellerPrice",
          type: "u64",
        },
        {
          name: "tokenSize",
          type: "u64",
        },
      ],
      name: "executeSaleV2",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "wallet",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metadata",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "sellerTradeState",
        },
        {
          isMut: true,
          isSigner: false,
          name: "freeSellerTradeState",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: true,
          isSigner: false,
          name: "programAsSigner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEdition",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metaplexTokenMetadataProgram",
        },
      ],
      args: [
        {
          name: "tradeStateBump",
          type: "u8",
        },
        {
          name: "freeTradeStateBump",
          type: "u8",
        },
        {
          name: "programAsSignerBump",
          type: "u8",
        },
        {
          name: "buyerPrice",
          type: "u64",
        },
        {
          name: "tokenSize",
          type: "u64",
        },
      ],
      name: "sell",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: true,
          name: "wallet",
        },
        {
          isMut: true,
          isSigner: false,
          name: "paymentAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "transferAuthority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metadata",
        },
        {
          isMut: true,
          isSigner: false,
          name: "escrowPaymentAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "buyerTradeState",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
        {
          isMut: false,
          isSigner: false,
          name: "clock",
        },
        {
          isMut: false,
          isSigner: false,
          name: "previousBidderWallet",
        },
        {
          isMut: true,
          isSigner: false,
          name: "previousBidderEscrowPaymentAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "previousBidderRefundAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "ataProgram",
        },
      ],
      args: [
        {
          name: "tradeStateBump",
          type: "u8",
        },
        {
          name: "escrowPaymentBump",
          type: "u8",
        },
        {
          name: "buyerPrice",
          type: "u64",
        },
        {
          name: "tokenSize",
          type: "u64",
        },
        {
          name: "auctionEndTime",
          type: {
            option: "i64",
          },
        },
        {
          name: "previousBidderEscrowPaymentBump",
          type: "u8",
        },
      ],
      name: "buyV2",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "seller",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "programAsSigner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEdition",
        },
        {
          isMut: false,
          isSigner: false,
          name: "metaplexTokenMetadataProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
      ],
      args: [
        {
          name: "programAsSignerBump",
          type: "u8",
        },
      ],
      name: "thawDelegatedAccount",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
      ],
      args: [
        {
          name: "price",
          type: "u64",
        },
      ],
      name: "setLastBidPrice",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: true,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
      ],
      args: [
        {
          name: "bidder",
          type: {
            option: "publicKey",
          },
        },
      ],
      name: "setPreviousBidder",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: true,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
      ],
      args: [
        {
          name: "hasBeenSold",
          type: "bool",
        },
      ],
      name: "setHasBeenSold",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "mint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
      ],
      args: [
        {
          name: "tickSizeConstantInFullDecimals",
          type: "u64",
        },
        {
          name: "tickSizePercent",
          type: "u8",
        },
        {
          name: "tickSizeMinInLamports",
          type: "u64",
        },
        {
          name: "tickSizeMaxInLamports",
          type: "u64",
        },
      ],
      name: "setTickSize",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: true,
          name: "wallet",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "lastBidPrice",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
      ],
      args: [],
      name: "createLastBidPrice",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "wallet",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tradeState",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
      ],
      args: [
        {
          name: "tradeStateBump",
          type: "u8",
        },
        {
          name: "price",
          type: "u64",
        },
        {
          name: "tokenSize",
          type: "u64",
        },
        {
          name: "saleType",
          type: "u8",
        },
        {
          name: "tradeStateSize",
          type: {
            option: "u16",
          },
        },
      ],
      name: "createTradeState",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: true,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "mint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEdition",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "clock",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
      ],
      args: [
        {
          name: "editionBump",
          type: "u8",
        },
        {
          name: "startingPriceLamports",
          type: "u64",
        },
        {
          name: "priceFunctionType",
          type: {
            defined: "PriceFunctionType",
          },
        },
        {
          name: "priceParams",
          type: {
            vec: "f64",
          },
        },
        {
          name: "startTime",
          type: {
            option: "i64",
          },
        },
        {
          name: "endTime",
          type: {
            option: "i64",
          },
        },
      ],
      name: "createEditionDistributor",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: true,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "mint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEdition",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "clock",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
      ],
      args: [
        {
          name: "editionBump",
          type: "u8",
        },
        {
          name: "startingPriceLamports",
          type: {
            option: "u64",
          },
        },
        {
          name: "priceFunctionType",
          type: {
            option: {
              defined: "PriceFunctionType",
            },
          },
        },
        {
          name: "priceParams",
          type: {
            option: {
              vec: "f64",
            },
          },
        },
        {
          name: "newOwner",
          type: {
            option: "publicKey",
          },
        },
        {
          name: "startTime",
          type: {
            option: "i64",
          },
        },
        {
          name: "endTime",
          type: {
            option: "i64",
          },
        },
      ],
      name: "updateEditionDistributor",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "mint",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
      ],
      args: [
        {
          name: "antiBotProtectionEnabled",
          type: "bool",
        },
      ],
      name: "setEditionDistributorBotProtectionEnabled",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
      ],
      args: [
        {
          name: "limitPerAddress",
          type: "u16",
        },
      ],
      name: "setEditionDistributorLimitPerAddress",
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "mint",
        },
        {
          isMut: true,
          isSigner: true,
          name: "buyer",
        },
        {
          isMut: false,
          isSigner: false,
          name: "treasuryMint",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseTreasury",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEditionMetadata",
        },
        {
          isMut: true,
          isSigner: false,
          name: "masterEditionPda",
        },
        {
          isMut: true,
          isSigner: true,
          name: "limitedEditionMint",
        },
        {
          isMut: true,
          isSigner: false,
          name: "limitedEditionMetadata",
        },
        {
          isMut: true,
          isSigner: false,
          name: "limitedEditionPda",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionMarkerPda",
        },
        {
          isMut: false,
          isSigner: false,
          name: "masterEditionTokenAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenMetadataProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "systemProgram",
        },
        {
          isMut: false,
          isSigner: false,
          name: "rent",
        },
        {
          isMut: false,
          isSigner: false,
          name: "clock",
        },
        {
          isMut: false,
          isSigner: false,
          name: "antiBotAuthority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: true,
          isSigner: false,
          name: "auctionHouseFeeAccount",
        },
        {
          isMut: false,
          isSigner: false,
          name: "ataProgram",
        },
        {
          isMut: true,
          isSigner: false,
          name: "buyerTokenAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "buyerPaymentTokenAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "sellerPaymentReceiptTokenAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionBuyerInfoAccount",
        },
      ],
      args: [
        {
          name: "editionBump",
          type: "u8",
        },
        {
          name: "requestedEditionNumber",
          type: "u64",
        },
        {
          name: "priceInLamports",
          type: "u64",
        },
        {
          name: "buyerEditionInfoAccountBump",
          type: "u8",
        },
      ],
      name: "buyEditionV2",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "masterEditionMint",
        },
        {
          isMut: false,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributorTokenAccount",
        },
        {
          isMut: true,
          isSigner: false,
          name: "tokenReceiver",
        },
        {
          isMut: true,
          isSigner: false,
          name: "rentReceiver",
        },
        {
          isMut: false,
          isSigner: false,
          name: "tokenProgram",
        },
      ],
      args: [],
      name: "closeEditionDistributorTokenAccount",
    },
    {
      accounts: [
        {
          isMut: false,
          isSigner: false,
          name: "masterEditionMint",
        },
        {
          isMut: true,
          isSigner: false,
          name: "editionDistributor",
        },
        {
          isMut: false,
          isSigner: false,
          name: "owner",
        },
        {
          isMut: false,
          isSigner: false,
          name: "authority",
        },
        {
          isMut: false,
          isSigner: false,
          name: "auctionHouse",
        },
        {
          isMut: true,
          isSigner: false,
          name: "rentReceiver",
        },
      ],
      args: [],
      name: "closeEditionDistributor",
    },
  ],
  name: "auction_house",
  types: [
    {
      name: "PriceFunction",
      type: {
        fields: [
          {
            name: "startingPriceLamports",
            type: "u64",
          },
          {
            name: "priceFunctionType",
            type: {
              defined: "PriceFunctionType",
            },
          },
          {
            name: "params",
            type: {
              vec: "f64",
            },
          },
        ],
        kind: "struct",
      },
    },
    {
      name: "TradeStateSaleType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Auction",
          },
          {
            name: "InstantSale",
          },
          {
            name: "Offer",
          },
        ],
      },
    },
    {
      name: "PriceFunctionType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Constant",
          },
          {
            name: "Linear",
          },
          {
            name: "Minimum",
          },
        ],
      },
    },
  ],
  version: "0.1.0",
};

export default AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_3;
