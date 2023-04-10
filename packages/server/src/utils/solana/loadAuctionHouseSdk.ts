import {
  AuctionHouseSdk,
  loadAuctionHouseProgram,
} from "@formfunction-hq/formfunction-auction-house";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import Network from "src/types/enums/Network";
import getAuctionHouseInfo from "src/utils/solana/getAuctionHouseInfo";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import getRpcHostFromNetwork from "src/utils/solana/getRpcHostFromNetwork";
import getAntiBotAuthorityKeypair from "src/utils/keypairs/getAntiBotAuthorityKeypair";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import getEnvironment from "src/utils/getEnvironment";

export default function loadAuctionHouseSdk(
  currency: CurrencyNameExpress_Enum
): AuctionHouseSdk {
  const authorityKeypair = getAuthorityKeypair();
  const environment = getEnvironment();
  const { treasuryMint } = getAuctionHouseInfo(currency, environment);
  const program = loadAuctionHouseProgram(
    getAuctionHouseConstants().programId,
    getAuthorityKeypair(),
    process.env.SOLANA_NETWORK as Network,
    getRpcHostFromNetwork(process.env.SOLANA_NETWORK as Network)
  );
  return AuctionHouseSdk.init(program, {
    antiBotAuthority: getAntiBotAuthorityKeypair().publicKey,
    treasuryMint,
    walletAuthority: authorityKeypair.publicKey,
    walletCreator: authorityKeypair.publicKey,
  });
}
