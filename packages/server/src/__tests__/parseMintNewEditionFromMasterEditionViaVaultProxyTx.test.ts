import parseMintNewEditionFromMasterEditionViaVaultProxyTx from "src/utils/solana/txs/parse/metaplex/parseMintNewEditionFromMasterEditionViaVaultProxyTx";
import MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_TX from "src/__tests__/constants/MintNewEditionFromMasterEditionViaVaultProxyTx";

describe("parseMintNewEditionFromMasterEditionViaVaultProxyTx tests", () => {
  it("parse #1", () => {
    const results = parseMintNewEditionFromMasterEditionViaVaultProxyTx(
      MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_TX as any
    );

    expect(results).not.toBeNull();
    expect(results!.limitedEditionMint.toString()).toEqual(
      "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF"
    );
  });
});
