const CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_AUTHORITY = {
  blockTime: 1661182054,
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
                amount: "1",
                authority: "GnyLbViWCmmmC3bKH785VZg4z3JBU4AESb5TWwuvgq5r",
                destination: "6JiEA5wUyZ9XWus4xHFSZpWXro2mGoNXsBXqU1ztRqzv",
                source: "89xQzSK67Wg5PYBfbU6C9sz4BzbMeLTU4bhdxS1N9TEb",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "89xQzSK67Wg5PYBfbU6C9sz4BzbMeLTU4bhdxS1N9TEb",
                destination: "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
                owner: "GnyLbViWCmmmC3bKH785VZg4z3JBU4AESb5TWwuvgq5r",
              },
              type: "closeAccount",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CloseEditionDistributorTokenAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 160720 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: CloseAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3015 of 152491 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 51824 of 200000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      16533625080, 2039280, 0, 1461600, 964227080, 1141440, 3695760, 934087680,
      4099440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "BqdE7j94jZfTZ21ZkGi8wEyAZYZFTBeqvjmNj5Q4wcHH",
        owner: "CeuwJ66q3m9MNePFnQU2Av2YCSkTJYwSnw1rZJYapnKT",
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
      16531590800, 2039280, 2039280, 1461600, 964227080, 1141440, 3695760,
      934087680, 4099440,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "BqdE7j94jZfTZ21ZkGi8wEyAZYZFTBeqvjmNj5Q4wcHH",
        owner: "CeuwJ66q3m9MNePFnQU2Av2YCSkTJYwSnw1rZJYapnKT",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
      {
        accountIndex: 2,
        mint: "BqdE7j94jZfTZ21ZkGi8wEyAZYZFTBeqvjmNj5Q4wcHH",
        owner: "GnyLbViWCmmmC3bKH785VZg4z3JBU4AESb5TWwuvgq5r",
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
  slot: 147165560,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
          signer: true,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "6JiEA5wUyZ9XWus4xHFSZpWXro2mGoNXsBXqU1ztRqzv",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "89xQzSK67Wg5PYBfbU6C9sz4BzbMeLTU4bhdxS1N9TEb",
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: "BqdE7j94jZfTZ21ZkGi8wEyAZYZFTBeqvjmNj5Q4wcHH",
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: "CeuwJ66q3m9MNePFnQU2Av2YCSkTJYwSnw1rZJYapnKT",
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
          pubkey: "GnyLbViWCmmmC3bKH785VZg4z3JBU4AESb5TWwuvgq5r",
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
            "BqdE7j94jZfTZ21ZkGi8wEyAZYZFTBeqvjmNj5Q4wcHH",
            "GnyLbViWCmmmC3bKH785VZg4z3JBU4AESb5TWwuvgq5r",
            "CeuwJ66q3m9MNePFnQU2Av2YCSkTJYwSnw1rZJYapnKT",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "u5pLTMPar2nvwyPPVKbJ3thqfv7hPADdn3eR8zo1Q2M",
            "89xQzSK67Wg5PYBfbU6C9sz4BzbMeLTU4bhdxS1N9TEb",
            "6JiEA5wUyZ9XWus4xHFSZpWXro2mGoNXsBXqU1ztRqzv",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          ],
          data: "2rEnfNQDot1",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "HHFcWh1EDDHPNXem8frUJTJr1uUTxDhEQuD4GTPdBEcU",
    },
    signatures: [
      "5GiGCsP3mRunWYukSQ3ERAgxY1epi3q4MrUfdNZAiHFkMdBw7w5tnih2akVhJVaQNV8K7a7Lf2GtgpWYi54YQFd1",
    ],
  },
};

export default CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_AUTHORITY;
