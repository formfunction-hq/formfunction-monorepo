import { PublicKey } from "@solana/web3.js";
import AuctionHouseConstants from "types/AuctionHouseConstants";

// TODO[@]: Might be nice to replace this with similar utils which are in auction-house.
export const AUCTION_HOUSE_INFO_TESTNET: AuctionHouseConstants = {
  antiBotAuthority: new PublicKey(
    "antiDV8bRvF4XTeRqmyHV1jpHD4Lvz7gKBKBBRQb8ir"
  ),
  authority: new PublicKey("3YihDrzZz4XPbuZpjwmLeB8U46vBjci4agDYq3WHtn9Y"),
  feeAccount: new PublicKey("Bcw7Cewx22NMPGCGqtHd46rUUzawPN3W9BM9tLoGKN2q"),
  programId: new PublicKey("jzmdMPJhm7Txb2RzYPte6Aj1QWqFarmjsJuWjk9m2wv"),
};

export const AUCTION_HOUSE_INFO_DEVNET: AuctionHouseConstants = {
  antiBotAuthority: new PublicKey(
    "antiDV8bRvF4XTeRqmyHV1jpHD4Lvz7gKBKBBRQb8ir"
  ),
  authority: new PublicKey("HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx"),
  feeAccount: new PublicKey("5QWYhZciiHrSt6vLB1Pof5Xp72MQGS4sLLsXkQGuFVHa"),
  programId: new PublicKey("devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX"),
};

export const AUCTION_HOUSE_INFO_MAINNET: AuctionHouseConstants = {
  antiBotAuthority: new PublicKey(
    "antiScHGm8NAqfpdFNYbv3c9ntY6xksvvTN3B9cDf5Y"
  ),
  authority: new PublicKey("2nmN38wUByqTB4hMQ2PVVjbgaqrawNCVEWMCsr3wzhm5"),
  feeAccount: new PublicKey("3HsusccYUqLfvVfawadnjxQjjAW6GWXYFqpgaKZHvBxw"),
  programId: new PublicKey("formn3hJtt8gvVKxpCfzCJGuoz6CNUFcULFZW18iTpC"),
};
