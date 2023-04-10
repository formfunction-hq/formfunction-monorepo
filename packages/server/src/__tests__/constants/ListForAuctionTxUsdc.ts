// https://explorer.solana.com/tx/4bveSDNpruD1Vgb32FRW1Uxxo8UoBNss7KQKthHNYSxioWqDXczzqrsUmC8H7jo41cFSydu7PPUgZu5rqCieJHLW?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@burner/EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD?width=3387&height=3387
const LIST_FOR_AUCTION_TX_USDC = {
  blockTime: 1661963838,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [
      {
        index: 0,
        instructions: [
          {
            parsed: {
              info: {
                destination: "AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
                lamports: 1795680,
                source: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
                space: 130,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
                owner: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
        ],
      },
      {
        index: 1,
        instructions: [
          {
            parsed: {
              info: {
                amount: "1",
                delegate: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
                owner: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
                source: "6Jwuqujy9z5K1sncmFUibBRBTsqkHuzJPV1yzASnchht",
              },
              type: "approve",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
              "6Jwuqujy9z5K1sncmFUibBRBTsqkHuzJPV1yzASnchht",
              "6FCdoTiPLtUZpqoe6KRDPUxL6uuBp3N2p8BqDGxDwsDj",
              "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ],
            data: "T",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                account: "6Jwuqujy9z5K1sncmFUibBRBTsqkHuzJPV1yzASnchht",
                freezeAuthority: "6FCdoTiPLtUZpqoe6KRDPUxL6uuBp3N2p8BqDGxDwsDj",
                mint: "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
              },
              type: "freezeAccount",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    loadedAddresses: { readonly: [], writable: [] },
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CreateTradeState",
      "Program log: Transfer 1795680 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45124 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: Sell",
      "Program log: seller_sale_type = Auction",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Approve",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2904 of 317051 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Freeze Delegated Account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: FreezeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4310 of 296657 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 18301 of 310351 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 63730 of 354876 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      37117754508, 2039280, 0, 0, 867418960, 1795680, 1, 2853600, 5616720,
      4099440, 1141440, 1461600, 396525023240, 1141440, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
        owner: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      37117759508, 2039280, 0, 0, 869214640, 0, 1, 2853600, 5616720, 4099440,
      1141440, 1461600, 396525023240, 1141440, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
        owner: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    rewards: [],
    status: { Ok: null },
  },
  slot: 158879938,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
          signer: true,
          writable: true,
        },
        {
          pubkey: "6Jwuqujy9z5K1sncmFUibBRBTsqkHuzJPV1yzASnchht",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
          signer: false,
          writable: true,
        },
        {
          pubkey: "8UexGKr6kXZzAwzb832PVNoQoVBGa8RaDTtZW6gPTRSD",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "6FCdoTiPLtUZpqoe6KRDPUxL6uuBp3N2p8BqDGxDwsDj",
          signer: false,
          writable: false,
        },
        {
          pubkey: "BHJ9gUhCaaBoi3qbnL7D8ufVEm6UFG9r4BW89g8g7FY2",
          signer: false,
          writable: false,
        },
        {
          pubkey: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
          signer: false,
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
          signer: false,
          writable: false,
        },
        {
          pubkey: "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarRent111111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          signer: false,
          writable: false,
        },
      ],
      addressTableLookups: null,
      instructions: [
        {
          accounts: [
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
            "6Jwuqujy9z5K1sncmFUibBRBTsqkHuzJPV1yzASnchht",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9YQhx5QNd9DMFsmqn74VwtpKE1D",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "6Jwuqujy9z5K1sncmFUibBRBTsqkHuzJPV1yzASnchht",
            "BHJ9gUhCaaBoi3qbnL7D8ufVEm6UFG9r4BW89g8g7FY2",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "AMCfCms3Eo1gRThi9tHTs2fZwWNA9Q6oTPfiM2zKEx7U",
            "8UexGKr6kXZzAwzb832PVNoQoVBGa8RaDTtZW6gPTRSD",
            "EH41cWnzLhhXP5ZThvNWgpy1MMnBfXFSGjFY4A9yHqaD",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "SysvarRent111111111111111111111111111111111",
            "6FCdoTiPLtUZpqoe6KRDPUxL6uuBp3N2p8BqDGxDwsDj",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "81r6u24fHZhKyeUaab1LexTP85DMeGhd2qYPR",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "7JWCHcstfwyUeMWEQDu9sLBoG2jXuH3mL7dqbxo8QUjj",
    },
    signatures: [
      "4bveSDNpruD1Vgb32FRW1Uxxo8UoBNss7KQKthHNYSxioWqDXczzqrsUmC8H7jo41cFSydu7PPUgZu5rqCieJHLW",
    ],
  },
};

export default LIST_FOR_AUCTION_TX_USDC;
