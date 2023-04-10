// https://explorer.solana.com/tx/5DUbpAHWsMywMaec2UKbE9NehowtT55oAg9trCCnHdaMCWhFQzzLNMzxPXvZHwnNnFkGfUMHKuNarXf3sGrSQbSH?cluster=devnet
// https://dev.formfunction.xyz/@soursop/Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ?width=512&height=512
const UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL = {
  blockTime: 1662576910,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [],
    loadedAddresses: { readonly: [], writable: [] },
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: UpdateEditionDistributor",
      "Program log: Updated the starting price",
      "Program log: Updated the price function type",
      "Program log: Updated the price params",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 13214 of 200000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      27150979920, 3695760, 2853600, 1141440, 1461600, 734771963562, 1169280,
    ],
    postTokenBalances: [],
    preBalances: [
      27150984920, 3695760, 2853600, 1141440, 1461600, 734771963562, 1169280,
    ],
    preTokenBalances: [],
    rewards: [],
    status: { Ok: null },
  },
  slot: 160499285,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
          signer: true,
          writable: true,
        },
        {
          pubkey: "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
          signer: false,
          writable: true,
        },
        {
          pubkey: "35DBXygpwcU2JCxSJsbiZWAbWFQbUqkCGbFbjb6DAd6A",
          signer: false,
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
          signer: false,
          writable: false,
        },
        {
          pubkey: "So11111111111111111111111111111111111111112",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarC1ock11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
      ],
      addressTableLookups: null,
      instructions: [
        {
          accounts: [
            "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
            "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
            "35DBXygpwcU2JCxSJsbiZWAbWFQbUqkCGbFbjb6DAd6A",
            "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
            "SysvarC1ock11111111111111111111111111111111",
            "So11111111111111111111111111111111111111112",
          ],
          data: "tFzGsZE8w5BBKQWWwoNcH4XfHKB6ZhAUt6HqFd",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "4AdTeroVsy9Qnxf6PojmFSEeYdEn8w7DSQtVMNYRYacL",
    },
    signatures: [
      "5DUbpAHWsMywMaec2UKbE9NehowtT55oAg9trCCnHdaMCWhFQzzLNMzxPXvZHwnNnFkGfUMHKuNarXf3sGrSQbSH",
    ],
  },
};

export default UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL;
