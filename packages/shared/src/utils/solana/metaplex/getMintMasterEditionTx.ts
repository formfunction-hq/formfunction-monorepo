import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  createCreateMasterEditionInstruction,
  createCreateMetadataAccountInstruction,
} from "@metaplex-foundation/mpl-token-metadata";
import BN from "bn.js";
import { Maybe } from "types/UtilityTypes";
import findAta from "utils/solana/pdas/findAta";
import NftMetadataV1Input from "types/NftMetadataV1Input";
import combineTransactions from "utils/solana/txs/combineTransactions";
import ixToTx from "utils/solana/ix/ixToTx";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import filterNulls from "utils/filterNulls";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";
import findEditionPda from "utils/solana/pdas/findEditionPda";

/**
 * This function returns builds the accounts and instructions necessary to
 * mint a new master edition NFT, specifically:
 *
 * - Create a new mint account for the NFT.
 * - Create an associated token account for the user wallet for this mint.
 * - Create a metadata account for this mint.
 * - Create the master edition.
 *
 * It returns the mint account, metadata PDA, and the transaction object
 * which can then be signed and submitted to the network.
 */
export default async function getMintMasterEditionTx(
  auctionHouseSdk: AuctionHouseSdk,
  connection: Connection,
  walletPublicKey: PublicKey,
  metadata: NftMetadataV1Input,
  maxSupply: Maybe<number>,
  metadataArweaveLink: string,
  includeCreateLastBidPriceIx: boolean
) {
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span
  );
  const mintAccount = Keypair.generate();
  const createMintAccountTx = ixToTx(
    SystemProgram.createAccount({
      fromPubkey: walletPublicKey,
      lamports: mintRent,
      newAccountPubkey: mintAccount.publicKey,
      programId: TOKEN_PROGRAM_ID,
      space: MintLayout.span,
    })
  );
  const createMintTx = ixToTx(
    createInitializeMintInstruction(
      mintAccount.publicKey,
      0,
      walletPublicKey,
      walletPublicKey
    )
  );

  const [recipientKey] = await findAta(walletPublicKey, mintAccount.publicKey);

  const createAssociatedTokenAccountTx = ixToTx(
    createAssociatedTokenAccountInstruction(
      walletPublicKey,
      recipientKey,
      walletPublicKey,
      mintAccount.publicKey
    )
  );

  const [metadataPda] = await findTokenMetadata(mintAccount.publicKey);

  const createMetadataTx = ixToTx(
    createCreateMetadataAccountInstruction(
      {
        metadata: metadataPda,
        mint: mintAccount.publicKey,
        mintAuthority: walletPublicKey,
        payer: walletPublicKey,
        updateAuthority: walletPublicKey,
      },
      {
        createMetadataAccountArgs: {
          data: {
            creators: metadata.properties.creators.map((val) => ({
              address: new PublicKey(val.address),
              share: val.share,
              verified: val.verified,
            })),
            name: metadata.name,
            sellerFeeBasisPoints: metadata.seller_fee_basis_points,
            symbol: metadata.symbol,
            uri: metadataArweaveLink,
          },
          isMutable: true,
        },
      }
    )
  );

  createMetadataTx.add(
    createMintToInstruction(
      mintAccount.publicKey,
      recipientKey,
      walletPublicKey,
      1,
      []
    )
  );

  const [editionPda] = await findEditionPda(mintAccount.publicKey);

  const masterEditionTx = ixToTx(
    createCreateMasterEditionInstruction(
      {
        edition: editionPda,
        metadata: metadataPda,
        mint: mintAccount.publicKey,
        mintAuthority: walletPublicKey,
        payer: walletPublicKey,
        updateAuthority: walletPublicKey,
      },
      {
        createMasterEditionArgs: {
          maxSupply: maxSupply == null ? null : new BN(maxSupply),
        },
      }
    )
  );

  const createLastBidPriceTx = !includeCreateLastBidPriceIx
    ? null
    : await auctionHouseSdk.createLastBidPriceTx({
        tokenMint: mintAccount.publicKey,
        wallet: walletPublicKey,
      });

  const transaction = combineTransactions(
    filterNulls([
      createMintAccountTx,
      createMintTx,
      createAssociatedTokenAccountTx,
      createMetadataTx,
      masterEditionTx,
      createLastBidPriceTx,
    ])
  );

  return {
    metadataPda,
    mintAccount,
    transaction,
  };
}
