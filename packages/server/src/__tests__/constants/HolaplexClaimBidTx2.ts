// https://explorer.solana.com/tx/64eUQ8agsLY7amWJ6ZxMmF3myTCLGnKunxSsgBN8fCPQCA83zD84UWk11wK5Q3LMaUwc7eQV4jFhvoRTRfVBNCaU
//
// For https://monsterfriends.holaplex.com/listings/CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi
const HOLAPLEX_CLAIM_BID_TX2 = {
  blockTime: 1640196627,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [
      {
        index: 0,
        instructions: [
          {
            accounts: [
              "D6crd9GJfNBJhdbUuqbaYZScSh4XYMB3JJTzjJZYHRM4",
              "Damw8qStqRh9LsQQqkH7JhBkcJ6dxw77d4pEtDCp6BV9",
              "3PY71LNH6gMbhDhv2w1nYMwt4U7f1v3YEVzVi3NMSBjR",
              "4AJ6rM88PbWvqv53Bc9qmCBQvNUmVD8GKq7mYmwHpxrA",
              "CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi",
              "6v9m78f5qijqHMpF4apJMfyYV7EkwZsv7qNc6TmnGKPy",
              "So11111111111111111111111111111111111111112",
              "SysvarC1ock11111111111111111111111111111111",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "4Jf3hpAUfMsWjqRev1BwJtASvczfFTDaYjofS5DsFXQ4",
            ],
            data: "cEfu2Sccf19H8VLTQn3G5M71cSxqwLfUi2VQcwNRrwyD",
            programId: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
          },
          {
            parsed: {
              info: {
                amount: "9500000000",
                authority: "CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi",
                destination: "D6crd9GJfNBJhdbUuqbaYZScSh4XYMB3JJTzjJZYHRM4",
                source: "Damw8qStqRh9LsQQqkH7JhBkcJ6dxw77d4pEtDCp6BV9",
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3229 of 156749 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 consumed 21893 of 174160 compute units",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 success",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 consumed 50032 of 200000 compute units",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 success",
    ],
    postBalances: [
      9479139880, 9502039280, 2039280, 1566000, 3473040, 4217760, 151330216991,
      2317680, 2491680, 1141440, 1169280, 1089991680, 2415120, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "So11111111111111111111111111111111111111112",
        owner: "4AJ6rM88PbWvqv53Bc9qmCBQvNUmVD8GKq7mYmwHpxrA",
        uiTokenAmount: {
          amount: "9500000000",
          decimals: 9,
          uiAmount: 9.5,
          uiAmountString: "9.5",
        },
      },
      {
        accountIndex: 2,
        mint: "So11111111111111111111111111111111111111112",
        owner: "CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi",
        uiTokenAmount: {
          amount: "0",
          decimals: 9,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      9479144880, 2039280, 9502039280, 1566000, 3473040, 4217760, 151330216991,
      2317680, 2491680, 1141440, 1169280, 1089991680, 2415120, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "So11111111111111111111111111111111111111112",
        owner: "4AJ6rM88PbWvqv53Bc9qmCBQvNUmVD8GKq7mYmwHpxrA",
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
        owner: "CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi",
        uiTokenAmount: {
          amount: "9500000000",
          decimals: 9,
          uiAmount: 9.5,
          uiAmountString: "9.5",
        },
      },
    ],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 112777181,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "6v9m78f5qijqHMpF4apJMfyYV7EkwZsv7qNc6TmnGKPy",
          signer: true,
          writable: true,
        },
        {
          pubkey: "D6crd9GJfNBJhdbUuqbaYZScSh4XYMB3JJTzjJZYHRM4",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Damw8qStqRh9LsQQqkH7JhBkcJ6dxw77d4pEtDCp6BV9",
          signer: false,
          writable: true,
        },
        {
          pubkey: "3PY71LNH6gMbhDhv2w1nYMwt4U7f1v3YEVzVi3NMSBjR",
          signer: false,
          writable: true,
        },
        {
          pubkey: "4AJ6rM88PbWvqv53Bc9qmCBQvNUmVD8GKq7mYmwHpxrA",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi",
          signer: false,
          writable: false,
        },
        {
          pubkey: "So11111111111111111111111111111111111111112",
          signer: false,
          writable: false,
        },
        {
          pubkey: "n3A2s7R4ufjzKmcxRgfguVy7TgCSvXHjvaku6Wtq3Uf",
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
          pubkey: "4Jf3hpAUfMsWjqRev1BwJtASvczfFTDaYjofS5DsFXQ4",
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
            "D6crd9GJfNBJhdbUuqbaYZScSh4XYMB3JJTzjJZYHRM4",
            "Damw8qStqRh9LsQQqkH7JhBkcJ6dxw77d4pEtDCp6BV9",
            "3PY71LNH6gMbhDhv2w1nYMwt4U7f1v3YEVzVi3NMSBjR",
            "4AJ6rM88PbWvqv53Bc9qmCBQvNUmVD8GKq7mYmwHpxrA",
            "CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi",
            "6v9m78f5qijqHMpF4apJMfyYV7EkwZsv7qNc6TmnGKPy",
            "So11111111111111111111111111111111111111112",
            "n3A2s7R4ufjzKmcxRgfguVy7TgCSvXHjvaku6Wtq3Uf",
            "9MDuruXfZYLC2gdwAw5twbHDieFirsesgZ479kGXH5ct",
            "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
            "SysvarC1ock11111111111111111111111111111111",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "4Jf3hpAUfMsWjqRev1BwJtASvczfFTDaYjofS5DsFXQ4",
          ],
          data: "7",
          programId: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
        },
      ],
      recentBlockhash: "CbuePeRAdTvNbMsg82jvimDZPDMJoQZyDuWQdTtTfnaR",
    },
    signatures: [
      "64eUQ8agsLY7amWJ6ZxMmF3myTCLGnKunxSsgBN8fCPQCA83zD84UWk11wK5Q3LMaUwc7eQV4jFhvoRTRfVBNCaU",
    ],
  },
};

export default HOLAPLEX_CLAIM_BID_TX2;
