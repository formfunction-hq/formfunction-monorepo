import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export default async function getOffPlatformOwnedMints(userAddress: string) {
  const tokenAccountsByOwner =
    await ConnectionWrapper.getParsedTokenAccountsByOwner(
      new PublicKey(userAddress),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

  const nftPotential = tokenAccountsByOwner.value.filter(
    (obj) =>
      obj.account.data.parsed.info.tokenAmount.uiAmount > 0 &&
      obj.account.data.parsed.info.tokenAmount.decimals === 0
  );

  return nftPotential?.map(
    (tokenAccount) => tokenAccount.account.data.parsed.info.mint
  );
}
