import parseMintNewEditionFromMasterEditionViaTokenTx from "src/utils/solana/txs/parse/metaplex/parseMintNewEditionFromMasterEditionViaTokenTx";
import MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_TOKEN_TX from "src/__tests__/constants/MintNewEditionFromMasterEditionViaTokenTx";

describe("parseMintNewEditionFromMasterEditionViaTokenTx tests", () => {
  it("parse #1", () => {
    const results = parseMintNewEditionFromMasterEditionViaTokenTx(
      MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_TOKEN_TX as any
    );

    expect(results).not.toBeNull();
    expect(results!.limitedEditionMint.toString()).toEqual(
      "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs"
    );
  });
});
