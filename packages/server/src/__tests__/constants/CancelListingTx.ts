// explorer.solana.com/tx/5PKppY8Hnhn8guUds9ZER4VWJMifmLoHGXEwgCki9C56B3GKytgyWxtfwq6iJiSHkmfdKADA2rvECf3kpMm1t7F6
// Note I manually changed the programId in the tx to the dev program: devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX
const CANCEL_LISTING_TX = {
  blockTime: 1672790524,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [],
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CancelV2",
      "Program log: sale_type = Auction",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 41607 of 200000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      40067395560, 27909799350, 0, 0, 50820469834, 2039280, 1461600, 1141440,
      2853600, 1141440, 934087680, 4099440,
    ],
    postTokenBalances: [
      {
        accountIndex: 5,
        mint: "8m8Br2Vzrqw164kP67VFZbMYbowiATY965kfaqjEvrLB",
        owner: "49PJiHdwAinieVjZTVbhrTkgGaB1o1qdWUmff2fuBgXm",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      40067400560, 27908003670, 0, 1795680, 50820469834, 2039280, 1461600,
      1141440, 2853600, 1141440, 934087680, 4099440,
    ],
    preTokenBalances: [
      {
        accountIndex: 5,
        mint: "8m8Br2Vzrqw164kP67VFZbMYbowiATY965kfaqjEvrLB",
        owner: "49PJiHdwAinieVjZTVbhrTkgGaB1o1qdWUmff2fuBgXm",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    rewards: [],
    status: { Ok: null },
  },
  slot: 170686376,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "2nmN38wUByqTB4hMQ2PVVjbgaqrawNCVEWMCsr3wzhm5",
          signer: true,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "3HsusccYUqLfvVfawadnjxQjjAW6GWXYFqpgaKZHvBxw",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "GjEm1qJLvw1WSPg6AfzWHQgUx8ZPQJ3hJZg9PZcBAySt",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "GuobBftRJb6SNwuLtXgkC2kq5CejuR4wyKdRTWFDqpU5",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "qM7joxSFSGPG4exosa42UQxvdEesq9KV18wiY4bi9HQ",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "rCia9QJEqhN3bkWh1qUZQ6ni3Ba7AvQUAg9UNX3yWEf",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "8m8Br2Vzrqw164kP67VFZbMYbowiATY965kfaqjEvrLB",
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: "GuZgxNKa99rS7CzkfD1SxR9CphsxdGSNRC37NkZrRhyN",
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: "u5pLTMPar2nvwyPPVKbJ3thqfv7hPADdn3eR8zo1Q2M",
          signer: false,
          source: "transaction",
          writable: false,
        },
      ],
      addressTableLookups: null,
      instructions: [
        {
          accounts: [
            "qM7joxSFSGPG4exosa42UQxvdEesq9KV18wiY4bi9HQ",
            "rCia9QJEqhN3bkWh1qUZQ6ni3Ba7AvQUAg9UNX3yWEf",
            "8m8Br2Vzrqw164kP67VFZbMYbowiATY965kfaqjEvrLB",
            "2nmN38wUByqTB4hMQ2PVVjbgaqrawNCVEWMCsr3wzhm5",
            "u5pLTMPar2nvwyPPVKbJ3thqfv7hPADdn3eR8zo1Q2M",
            "3HsusccYUqLfvVfawadnjxQjjAW6GWXYFqpgaKZHvBxw",
            "GuobBftRJb6SNwuLtXgkC2kq5CejuR4wyKdRTWFDqpU5",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "GjEm1qJLvw1WSPg6AfzWHQgUx8ZPQJ3hJZg9PZcBAySt",
            "GuZgxNKa99rS7CzkfD1SxR9CphsxdGSNRC37NkZrRhyN",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "27UQWiKyr4SLhbZN8eK7BkbTypsxJts5j49",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "37gnQ3wtK5EESH29sswf8fiZmexDV1HoEqNqQvbDhmHU",
    },
    signatures: [
      "5PKppY8Hnhn8guUds9ZER4VWJMifmLoHGXEwgCki9C56B3GKytgyWxtfwq6iJiSHkmfdKADA2rvECf3kpMm1t7F6",
    ],
  },
};

export default CANCEL_LISTING_TX;
