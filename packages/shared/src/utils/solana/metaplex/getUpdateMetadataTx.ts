/* eslint-disable no-await-in-loop */
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { MaybeUndef, Undef } from "types/UtilityTypes";
import { createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import ixToTx from "utils/solana/ix/ixToTx";
import MetadataV2UpdateFields from "types/MetadataV2UpdateFields";
import getOnchainNftMetadata from "utils/solana/metaplex/getOnchainNftMetadata";

function getUpdateField<T>(field: Undef<T>, defaultField: MaybeUndef<T>) {
  if (field === undefined) {
    return defaultField ?? null;
  }
  return field ?? null;
}

export default async function getUpdateMetadataTx(
  connection: Connection,
  wallet: PublicKey,
  mint: PublicKey,
  updateFields: MetadataV2UpdateFields
): Promise<{ tx: Transaction; updateFields: MetadataV2UpdateFields }> {
  const { metadata, metadataPda } = await getOnchainNftMetadata(
    connection,
    mint
  );

  const newData = {
    collection: getUpdateField(updateFields.collection, metadata.collection),
    creators: getUpdateField(updateFields.creators, metadata.data.creators),
    name: getUpdateField(updateFields.name, metadata.data.name)!,
    sellerFeeBasisPoints: getUpdateField(
      updateFields.sellerFeeBasisPoints,
      metadata.data.sellerFeeBasisPoints
    )!,
    symbol: getUpdateField(updateFields.symbol, metadata.data.symbol)!,
    uri: getUpdateField(updateFields.uri, metadata.data.uri)!,
    uses: getUpdateField(updateFields.uses, metadata.uses),
  };
  const updateIx = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPda,
      updateAuthority: wallet,
    },
    {
      updateMetadataAccountArgsV2: {
        data: newData,
        isMutable: metadata.isMutable,
        primarySaleHappened: metadata.primarySaleHappened,
        updateAuthority: wallet,
      },
    }
  );

  return { tx: ixToTx(updateIx), updateFields: newData };
}
