// https://explorer.solana.com/tx/5AWq1gzTetG62PUdzAwTcjXrPeExwny995E5gshSd5viMMnaf1LatDKmYUm9vydUxeMFNdGuV5g8EfBuSsoaXGwn
//
// For https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ
const HOLAPLEX_CLAIM_BID_TX = {
  blockTime: 1640195688,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [
      {
        index: 0,
        instructions: [
          {
            accounts: [
              "BmRfoTypk2d6nQVsfiNojFD6zrUadggvmcX637xfwy3E",
              "FZCkmgyMAbXcxyLKfC8LyhZdHkgo2ZurTUj5hvSEkJUc",
              "Cby41pJ95vbYwq1gS8izJDjXQDMwmhB689RLTLpZir8Z",
              "CYyiJNtPnmNPcRteBuPyBsaNdXzpX3tfAoP86YSpzPBD",
              "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
              "2iZoRCuS29x4SiK9gKpoB4UicLc6aN3UusUxaQKhrbpT",
              "So11111111111111111111111111111111111111112",
              "SysvarC1ock11111111111111111111111111111111",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "6VfwemZ3QUjY3LFutkLSTspRxVQJrXRXqiBnENhkYHxo",
            ],
            data: "nm3pD2AxK1XvVcEDuGz42HFKsXZtTh96qzoTUdfNqnCU",
            programId: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
          },
          {
            parsed: {
              info: {
                amount: "5500000000",
                authority: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
                destination: "BmRfoTypk2d6nQVsfiNojFD6zrUadggvmcX637xfwy3E",
                source: "FZCkmgyMAbXcxyLKfC8LyhZdHkgo2ZurTUj5hvSEkJUc",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    logMessages: [
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 invoke [1]",
      "Program log: Instruction: Claim Bid",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 invoke [2]",
      "Program log: + Processing ClaimBid",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3229 of 154119 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 consumed 23958 of 173595 compute units",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 success",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 consumed 52662 of 200000 compute units",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 success",
    ],
    postBalances: [
      14568337482, 5502039280, 2039280, 1566000, 3473040, 4217760, 151330216991,
      2317680, 2491680, 1141440, 1169280, 1089991680, 2415120, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "So11111111111111111111111111111111111111112",
        owner: "CYyiJNtPnmNPcRteBuPyBsaNdXzpX3tfAoP86YSpzPBD",
        uiTokenAmount: {
          amount: "5500000000",
          decimals: 9,
          uiAmount: 5.5,
          uiAmountString: "5.5",
        },
      },
      {
        accountIndex: 2,
        mint: "So11111111111111111111111111111111111111112",
        owner: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
        uiTokenAmount: {
          amount: "0",
          decimals: 9,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      14568342482, 2039280, 5502039280, 1566000, 3473040, 4217760, 151330216991,
      2317680, 2491680, 1141440, 1169280, 1089991680, 2415120, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "So11111111111111111111111111111111111111112",
        owner: "CYyiJNtPnmNPcRteBuPyBsaNdXzpX3tfAoP86YSpzPBD",
        uiTokenAmount: {
          amount: "0",
          decimals: 9,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
      {
        accountIndex: 2,
        mint: "So11111111111111111111111111111111111111112",
        owner: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
        uiTokenAmount: {
          amount: "5500000000",
          decimals: 9,
          uiAmount: 5.5,
          uiAmountString: "5.5",
        },
      },
    ],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 112775690,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "2iZoRCuS29x4SiK9gKpoB4UicLc6aN3UusUxaQKhrbpT",
          signer: true,
          writable: true,
        },
        {
          pubkey: "BmRfoTypk2d6nQVsfiNojFD6zrUadggvmcX637xfwy3E",
          signer: false,
          writable: true,
        },
        {
          pubkey: "FZCkmgyMAbXcxyLKfC8LyhZdHkgo2ZurTUj5hvSEkJUc",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Cby41pJ95vbYwq1gS8izJDjXQDMwmhB689RLTLpZir8Z",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CYyiJNtPnmNPcRteBuPyBsaNdXzpX3tfAoP86YSpzPBD",
          signer: false,
          writable: true,
        },
        {
          pubkey: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
          signer: false,
          writable: false,
        },
        {
          pubkey: "So11111111111111111111111111111111111111112",
          signer: false,
          writable: false,
        },
        {
          pubkey: "CJR5DSfkiv4PMSfPSvdTdqeHNYHEyGzusttoknoqoshv",
          signer: false,
          writable: false,
        },
        {
          pubkey: "9MDuruXfZYLC2gdwAw5twbHDieFirsesgZ479kGXH5ct",
          signer: false,
          writable: false,
        },
        {
          pubkey: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarC1ock11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          signer: false,
          writable: false,
        },
        {
          pubkey: "6VfwemZ3QUjY3LFutkLSTspRxVQJrXRXqiBnENhkYHxo",
          signer: false,
          writable: false,
        },
        {
          pubkey: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          accounts: [
            "BmRfoTypk2d6nQVsfiNojFD6zrUadggvmcX637xfwy3E",
            "FZCkmgyMAbXcxyLKfC8LyhZdHkgo2ZurTUj5hvSEkJUc",
            "Cby41pJ95vbYwq1gS8izJDjXQDMwmhB689RLTLpZir8Z",
            "CYyiJNtPnmNPcRteBuPyBsaNdXzpX3tfAoP86YSpzPBD",
            "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
            "2iZoRCuS29x4SiK9gKpoB4UicLc6aN3UusUxaQKhrbpT",
            "So11111111111111111111111111111111111111112",
            "CJR5DSfkiv4PMSfPSvdTdqeHNYHEyGzusttoknoqoshv",
            "9MDuruXfZYLC2gdwAw5twbHDieFirsesgZ479kGXH5ct",
            "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
            "SysvarC1ock11111111111111111111111111111111",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "6VfwemZ3QUjY3LFutkLSTspRxVQJrXRXqiBnENhkYHxo",
          ],
          data: "7",
          programId: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
        },
      ],
      recentBlockhash: "D5W1gZUGv5MsdGukKLdVfJ2anXWBCJco1QH1fq4zcjXE",
    },
    signatures: [
      "5AWq1gzTetG62PUdzAwTcjXrPeExwny995E5gshSd5viMMnaf1LatDKmYUm9vydUxeMFNdGuV5g8EfBuSsoaXGwn",
    ],
  },
};

export default HOLAPLEX_CLAIM_BID_TX;
