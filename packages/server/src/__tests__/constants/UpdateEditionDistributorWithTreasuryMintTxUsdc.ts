// https://explorer.solana.com/tx/4VDvXQiWP2Smoc3SAQ1SAAcxpdofotcPCMEWe69gkHsVDtgjJyp6CkFTA4Ecrs52YwBw5kr2W4twnuhTBhKdubMU?cluster=devnet
// https://dev.formfunction.xyz/@soursop/AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC?width=100&height=101
const UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC = {
  blockTime: 1662576899,
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
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 13240 of 200000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      27150984920, 3695760, 1461600, 1141440, 2853600, 27003456600, 1169280,
    ],
    postTokenBalances: [],
    preBalances: [
      27150989920, 3695760, 1461600, 1141440, 2853600, 27003456600, 1169280,
    ],
    preTokenBalances: [],
    rewards: [],
    status: { Ok: null },
  },
  slot: 160499255,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
          signer: true,
          writable: true,
        },
        {
          pubkey: "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
          signer: false,
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "EgAoRVN7rW6PigSPrxGDzmhbENQ9aC3GVdYh1gSwmwRL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
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
            "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
            "EgAoRVN7rW6PigSPrxGDzmhbENQ9aC3GVdYh1gSwmwRL",
            "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
            "SysvarC1ock11111111111111111111111111111111",
            "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
          ],
          data: "tFzGsZE8w5BC8N3fMkmf4jKGH66BaZBKbDmnB9",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "FDbX5JX8pDbhTtUdq3aLtgwuCR63UAdDdjaN7ThVnEXi",
    },
    signatures: [
      "4VDvXQiWP2Smoc3SAQ1SAAcxpdofotcPCMEWe69gkHsVDtgjJyp6CkFTA4Ecrs52YwBw5kr2W4twnuhTBhKdubMU",
    ],
  },
};

export default UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC;
