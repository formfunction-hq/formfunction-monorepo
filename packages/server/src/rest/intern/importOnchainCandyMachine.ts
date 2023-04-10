import { NextFunction, Request, Response } from "express";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";
import { PublicKey } from "@solana/web3.js";
import upsertCandyMachine, {
  CandyMachineAllowlistEntry,
} from "src/rest/intern/upsertCandyMachine";
import { BN } from "@project-serum/anchor";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import getCurrencyInfoForTreasuryMint from "src/utils/solana/txs/parse/getCurrencyInfoForTreasuryMint";
import toObject from "formfn-shared/dist/utils/toObject";
import writeCandyMachineInfoToFirestore from "src/utils/generative-mints/rarity/writeCandyMachineInfoToFirestore";

interface ImportOnchainCandyMachineRequestBody {
  allowlistInfo?: Array<CandyMachineAllowlistEntry>;
  candyMachineAddress: string;
  creatorAuthorityOverride: string;
  logoAssetSrc?: string;
  mintPreviewAssetSrc?: string;
  offchainMetadataUris?: Array<{ index: number; uri: string }>;
  premintPreviewAssetSrcs?: Array<string>;
  randomizeSeriesSlug?: boolean;
}

function convertCandyMachineTimeField(cmTime: Maybe<BN>) {
  if (cmTime == null) {
    return null;
  }

  return dayjs.unix(cmTime.toNumber());
}

export default async function importOnchainCandyMachine(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const {
    allowlistInfo,
    candyMachineAddress,
    creatorAuthorityOverride,
    logoAssetSrc,
    mintPreviewAssetSrc,
    offchainMetadataUris,
    premintPreviewAssetSrcs,
    randomizeSeriesSlug,
  }: ImportOnchainCandyMachineRequestBody = req.body;
  const candyMachineSdk = loadCandyMachineSdk();
  const candyMachineKey = new PublicKey(candyMachineAddress);
  const creatorAuthority = new PublicKey(creatorAuthorityOverride);
  const candyMachineInfo = await candyMachineSdk.fetchCandyMachine(
    candyMachineKey
  );
  if (candyMachineInfo == null) {
    res.status(400).send({
      candyMachineInfo,
      message: "Candy machine info could not be loaded from blockchain",
    });
    return;
  }

  if (offchainMetadataUris != null) {
    await writeCandyMachineInfoToFirestore(
      candyMachineAddress,
      offchainMetadataUris
    );
  }

  const {
    formfnAuthority,
    treasuryMint,
    data: {
      allowlistSaleStartTime,
      publicSaleStartTime,
      publicSaleEndTime,
      price,
      sellerFeeBasisPoints,
      itemsAvailable,
      creators,
      premintPrice,
      allowlistPrice,
      omniMintWallets,
      botProtectionEnabled: antiBotProtectionEnabled,
      limitPerAddress,
      splTokenAllowlistSettings,
    },
  } = candyMachineInfo;
  const collectionPda = await candyMachineSdk.fetchCandyMachineCollectionPda(
    candyMachineKey
  );

  const upsertData = {
    allowlistInfo,
    allowlistPrice: allowlistPrice?.toNumber(),
    allowlistSaleStartTime:
      convertCandyMachineTimeField(allowlistSaleStartTime)?.toString() ??
      undefined,
    allowlistTokenMint: splTokenAllowlistSettings?.mint.toString(),
    antiBotProtectionEnabled,
    candyMachineAuthorityId: formfnAuthority.toString(),
    creatorAuthorityId: creatorAuthority.toString(),
    creatorWallets: creators.map((creator) => creator.address.toString()),
    currencyName:
      treasuryMint == null
        ? CurrencyNameExpress_Enum.Solana
        : (await getCurrencyInfoForTreasuryMint(new PublicKey(treasuryMint)))
            ?.name,
    limitPerAddress,
    logoAssetSrc,
    maxSupply: itemsAvailable.toNumber(),
    mintPreviewAssetSrc,
    omniMintWallets: omniMintWallets.map((wallet) => wallet.toString()),
    platformFeeBasisPoints: sellerFeeBasisPoints,
    premintPreviewAssetSrcs,
    premintPrice: premintPrice?.toNumber(),
    price: price.toNumber(),
    publicKey: candyMachineAddress,
    publicSaleEndTime:
      convertCandyMachineTimeField(publicSaleEndTime)?.toString() ?? undefined,
    publicSaleStartTime:
      convertCandyMachineTimeField(publicSaleStartTime)?.toString() ??
      undefined,
    seriesMint: collectionPda.mint.toString(),
  };
  try {
    const result = await upsertCandyMachine(
      upsertData,
      randomizeSeriesSlug === true
    );
    res.send({ result: toObject(result) });
  } catch (e: any) {
    res.status(400).send({
      error: e.message,
      onchainCandyMachineInfo: toObject(candyMachineInfo),
      upsertData: toObject(upsertData),
    });
  }
}
