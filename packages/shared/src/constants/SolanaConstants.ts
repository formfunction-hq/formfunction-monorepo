import { PublicKey } from "@solana/web3.js";

export const TRANSACTION_FEE_IN_LAMPORTS = 5000;

export const CANDY_MACHINE = "candy_machine";
export const AUCTION_HOUSE = "auction_house";
export const FEE_PAYER = "fee_payer";
export const TREASURY = "treasury";
export const MAX_NAME_LENGTH = 32;
export const MAX_URI_LENGTH = 200;
export const MAX_SYMBOL_LENGTH = 10;
export const MAX_CREATOR_LEN = 32 + 1 + 1;

export const ARWEAVE_PAYMENT_WALLET = new PublicKey(
  "6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS"
);
export const CANDY_MACHINE_PROGRAM_ID = new PublicKey(
  "cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ"
);
export const FAIR_LAUNCH_PROGRAM_ID = new PublicKey(
  "faircnAB9k59Y4TXmLabBULeuTLgV7TkGMGNkjnA15j"
);
export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
export const DEVNET_USDC_MINT = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);
export const EXCHANGE_ART_PROGRAM_ID = new PublicKey(
  "AmK5g2XcyptVLCFESBCJqoSfwV3znGoVYQnqEnaAZKWn"
);
export const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);
export const METAPLEX_PROGRAM_ID = new PublicKey(
  "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98"
);
export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// Must have at least this many lamports to mint an NFT
export const MIN_MINT_BALANCE_LAMPORTS = 2e7;

export const CONFIG_ARRAY_START =
  32 + // authority
  4 +
  6 + // uuid + u32 len
  4 +
  10 + // u32 len + symbol
  2 + // seller fee basis points
  1 +
  4 +
  5 * 34 + // optional + u32 len + actual vec
  8 + // max supply
  1 + // is mutable
  1 + // retain authority
  4; // max number of lines;
export const CONFIG_LINE_SIZE = 4 + 32 + 4 + 200;

export const CACHE_PATH = "./.cache";

export const DEFAULT_TIMEOUT = 15000;

export const EXTENSION_PNG = ".png";
export const EXTENSION_JSON = ".json";

// NFTs minted on Holaplex have Holaplex listed as a creator, e.g.
// - https://solscan.io/token/HbdwFg21mmhxro8UHTYwKGa9iPhvuQpgAyhtUU7x8GJE
// - https://solscan.io/token/72PfMLyRGSWeCxQ3kcGzkFaNqJ3Z67dGugDfPacj1RXV
export const HOLAPLEX_CREATOR_ADDRESS = new PublicKey(
  "tsU33UT3K2JTfLgHUo7hdzRhRe4wth885cqVbM8WLiq"
);

export const ZERO_PUBKEY = new PublicKey(Buffer.from(Array(32).fill(0)));
