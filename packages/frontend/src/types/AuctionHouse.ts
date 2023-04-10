export type AuctionHouse = {
  accounts: [
    {
      name: "auctionHouse";
      type: {
        fields: [
          {
            name: "auctionHouseFeeAccount";
            type: "publicKey";
          },
          {
            name: "auctionHouseTreasury";
            type: "publicKey";
          },
          {
            name: "treasuryWithdrawalDestination";
            type: "publicKey";
          },
          {
            name: "feeWithdrawalDestination";
            type: "publicKey";
          },
          {
            name: "treasuryMint";
            type: "publicKey";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "treasuryBump";
            type: "u8";
          },
          {
            name: "feePayerBump";
            type: "u8";
          },
          {
            name: "sellerFeeBasisPoints";
            type: "u16";
          },
          {
            name: "requiresSignOff";
            type: "bool";
          },
          {
            name: "canChangeSalePrice";
            type: "bool";
          },
          {
            name: "sellerFeeBasisPointsSecondary";
            type: "u16";
          }
        ];
        kind: "struct";
      };
    }
  ];
  errors: [
    {
      code: 6000;
      msg: "PublicKeyMismatch";
      name: "PublicKeyMismatch";
    },
    {
      code: 6001;
      msg: "InvalidMintAuthority";
      name: "InvalidMintAuthority";
    },
    {
      code: 6002;
      msg: "UninitializedAccount";
      name: "UninitializedAccount";
    },
    {
      code: 6003;
      msg: "IncorrectOwner";
      name: "IncorrectOwner";
    },
    {
      code: 6004;
      msg: "PublicKeysShouldBeUnique";
      name: "PublicKeysShouldBeUnique";
    },
    {
      code: 6005;
      msg: "StatementFalse";
      name: "StatementFalse";
    },
    {
      code: 6006;
      msg: "NotRentExempt";
      name: "NotRentExempt";
    },
    {
      code: 6007;
      msg: "NumericalOverflow";
      name: "NumericalOverflow";
    },
    {
      code: 6008;
      msg: "Expected a sol account but got an spl token account instead";
      name: "ExpectedSolAccount";
    },
    {
      code: 6009;
      msg: "Cannot exchange sol for sol";
      name: "CannotExchangeSOLForSol";
    },
    {
      code: 6010;
      msg: "If paying with sol, sol wallet must be signer";
      name: "SOLWalletMustSign";
    },
    {
      code: 6011;
      msg: "Cannot take this action without auction house signing too";
      name: "CannotTakeThisActionWithoutAuctionHouseSignOff";
    },
    {
      code: 6012;
      msg: "No payer present on this txn";
      name: "NoPayerPresent";
    },
    {
      code: 6013;
      msg: "Derived key invalid";
      name: "DerivedKeyInvalid";
    },
    {
      code: 6014;
      msg: "Metadata doesn't exist";
      name: "MetadataDoesntExist";
    },
    {
      code: 6015;
      msg: "Invalid token amount";
      name: "InvalidTokenAmount";
    },
    {
      code: 6016;
      msg: "Both parties need to agree to this sale";
      name: "BothPartiesNeedToAgreeToSale";
    },
    {
      code: 6017;
      msg: "Cannot match free sales unless the auction house or seller signs off";
      name: "CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff";
    },
    {
      code: 6018;
      msg: "This sale requires a signer";
      name: "SaleRequiresSigner";
    },
    {
      code: 6019;
      msg: "Old seller not initialized";
      name: "OldSellerNotInitialized";
    },
    {
      code: 6020;
      msg: "Seller ata cannot have a delegate set";
      name: "SellerATACannotHaveDelegate";
    },
    {
      code: 6021;
      msg: "Buyer ata cannot have a delegate set";
      name: "BuyerATACannotHaveDelegate";
    },
    {
      code: 6022;
      msg: "No valid signer present";
      name: "NoValidSignerPresent";
    },
    {
      code: 6023;
      msg: "BP must be less than or equal to 10000";
      name: "InvalidBasisPoints";
    },
    {
      code: 6024;
      msg: "Buyer price must be greater than or equal to seller price";
      name: "MismatchedPrices";
    },
    {
      code: 6025;
      msg: "Either the seller or auction house must sign";
      name: "SellerOrAuctionHouseMustSign";
    }
  ];
  instructions: [
    {
      accounts: [
        {
          isMut: false;
          isSigner: true;
          name: "authority";
        },
        {
          isMut: true;
          isSigner: false;
          name: "feeWithdrawalDestination";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
      name: "withdrawFromFee";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: false;
          isSigner: true;
          name: "authority";
        },
        {
          isMut: true;
          isSigner: false;
          name: "treasuryWithdrawalDestination";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseTreasury";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
      name: "withdrawFromTreasury";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: false;
          isSigner: true;
          name: "payer";
        },
        {
          isMut: false;
          isSigner: true;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "newAuthority";
        },
        {
          isMut: true;
          isSigner: false;
          name: "feeWithdrawalDestination";
        },
        {
          isMut: true;
          isSigner: false;
          name: "treasuryWithdrawalDestination";
        },
        {
          isMut: false;
          isSigner: false;
          name: "treasuryWithdrawalDestinationOwner";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "ataProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "sellerFeeBasisPoints";
          type: {
            option: "u16";
          };
        },
        {
          name: "requiresSignOff";
          type: {
            option: "bool";
          };
        },
        {
          name: "canChangeSalePrice";
          type: {
            option: "bool";
          };
        },
        {
          name: "sellerFeeBasisPointsSecondary";
          type: {
            option: "u16";
          };
        }
      ];
      name: "updateAuctionHouse";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: false;
          isSigner: true;
          name: "payer";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: true;
          isSigner: false;
          name: "feeWithdrawalDestination";
        },
        {
          isMut: true;
          isSigner: false;
          name: "treasuryWithdrawalDestination";
        },
        {
          isMut: false;
          isSigner: false;
          name: "treasuryWithdrawalDestinationOwner";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseTreasury";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "ataProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "bump";
          type: "u8";
        },
        {
          name: "feePayerBump";
          type: "u8";
        },
        {
          name: "treasuryBump";
          type: "u8";
        },
        {
          name: "sellerFeeBasisPoints";
          type: "u16";
        },
        {
          name: "requiresSignOff";
          type: "bool";
        },
        {
          name: "canChangeSalePrice";
          type: "bool";
        },
        {
          name: "sellerFeeBasisPointsSecondary";
          type: "u16";
        }
      ];
      name: "createAuctionHouse";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: false;
          name: "wallet";
        },
        {
          isMut: true;
          isSigner: false;
          name: "receiptAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "escrowPaymentAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "ataProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "escrowPaymentBump";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
      name: "withdraw";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: true;
          name: "wallet";
        },
        {
          isMut: true;
          isSigner: false;
          name: "paymentAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "transferAuthority";
        },
        {
          isMut: true;
          isSigner: false;
          name: "escrowPaymentAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "escrowPaymentBump";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
      name: "deposit";
    },
    {
      accounts: [
        {
          isMut: true;
          isSigner: false;
          name: "wallet";
        },
        {
          isMut: true;
          isSigner: false;
          name: "tokenAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "tradeState";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        }
      ];
      args: [
        {
          name: "buyerPrice";
          type: "u64";
        },
        {
          name: "tokenSize";
          type: "u64";
        }
      ];
      name: "cancel";
    },
    {
      accounts: [
        {
          isMut: true;
          isSigner: false;
          name: "buyer";
        },
        {
          isMut: true;
          isSigner: false;
          name: "seller";
        },
        {
          isMut: true;
          isSigner: false;
          name: "tokenAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "metadata";
        },
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: true;
          isSigner: false;
          name: "escrowPaymentAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "sellerPaymentReceiptAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "buyerReceiptTokenAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseTreasury";
        },
        {
          isMut: true;
          isSigner: false;
          name: "buyerTradeState";
        },
        {
          isMut: true;
          isSigner: false;
          name: "sellerTradeState";
        },
        {
          isMut: true;
          isSigner: false;
          name: "freeTradeState";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "ataProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "programAsSigner";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "escrowPaymentBump";
          type: "u8";
        },
        {
          name: "freeTradeStateBump";
          type: "u8";
        },
        {
          name: "programAsSignerBump";
          type: "u8";
        },
        {
          name: "buyerPrice";
          type: "u64";
        },
        {
          name: "sellerPrice";
          type: "u64";
        },
        {
          name: "tokenSize";
          type: "u64";
        }
      ];
      name: "executeSale";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: false;
          name: "wallet";
        },
        {
          isMut: true;
          isSigner: false;
          name: "tokenAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "metadata";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "sellerTradeState";
        },
        {
          isMut: true;
          isSigner: false;
          name: "freeSellerTradeState";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "programAsSigner";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "tradeStateBump";
          type: "u8";
        },
        {
          name: "freeTradeStateBump";
          type: "u8";
        },
        {
          name: "programAsSignerBump";
          type: "u8";
        },
        {
          name: "buyerPrice";
          type: "u64";
        },
        {
          name: "tokenSize";
          type: "u64";
        }
      ];
      name: "sell";
    },
    {
      accounts: [
        {
          isMut: false;
          isSigner: true;
          name: "wallet";
        },
        {
          isMut: true;
          isSigner: false;
          name: "paymentAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "transferAuthority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "treasuryMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "metadata";
        },
        {
          isMut: true;
          isSigner: false;
          name: "escrowPaymentAccount";
        },
        {
          isMut: false;
          isSigner: false;
          name: "authority";
        },
        {
          isMut: false;
          isSigner: false;
          name: "auctionHouse";
        },
        {
          isMut: true;
          isSigner: false;
          name: "auctionHouseFeeAccount";
        },
        {
          isMut: true;
          isSigner: false;
          name: "buyerTradeState";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenMint";
        },
        {
          isMut: false;
          isSigner: false;
          name: "tokenProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "systemProgram";
        },
        {
          isMut: false;
          isSigner: false;
          name: "rent";
        }
      ];
      args: [
        {
          name: "tradeStateBump";
          type: "u8";
        },
        {
          name: "escrowPaymentBump";
          type: "u8";
        },
        {
          name: "buyerPrice";
          type: "u64";
        },
        {
          name: "tokenSize";
          type: "u64";
        }
      ];
      name: "buy";
    }
  ];
  name: "auction_house";
  version: "0.1.0";
};

export const IDL: AuctionHouse = {
  accounts: [
    {
      name: "auctionHouse",
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
  ],
  instructions: [
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
          isMut: false,
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
      ],
      name: "cancel",
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
          isMut: false,
          isSigner: false,
          name: "programAsSigner",
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
      name: "executeSale",
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
          isMut: false,
          isSigner: false,
          name: "programAsSigner",
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
      ],
      name: "buy",
    },
  ],
  name: "auction_house",
  version: "0.1.0",
};
