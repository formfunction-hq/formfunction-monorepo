import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import maybeUpsertAsset from "src/utils/asset/maybeUpsertAsset";
import {
  Asset,
  CandyMachine,
  CandyMachineMerkleAllowlistInfo,
  Prisma,
  Series,
} from "@prisma/client";
import invariant from "tiny-invariant";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import axios from "axios";
import uploadFileFromUrl from "src/utils/firebase/uploadFileFromUrl";
import getSeriesPreviewImageStoragePath from "formfn-shared/dist/utils/series/getSeriesPreviewImageStoragePath";
import getDashCasedString from "formfn-shared/dist/utils/string/getDashCasedString";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getUserConnectOrCreate from "src/utils/prisma/getUserConnectOrCreate";
import { SeriesTypeExpress_Enum } from "src/__generated__/generated";
import { nanoid } from "nanoid";

async function upsertSeries(
  mint: string,
  creatorId: string,
  randomizeSeriesSlug: boolean,
  logoAssetSrc?: string
) {
  const metadata = await AccountLoader.loadNft(mint);
  invariant(
    metadata != null,
    `Provided mint ${mint} does not point to a valid series`
  );

  // Download metadata from provided mint
  const { description, name, image } = (await axios.get(metadata.uri)).data;
  const fileExt = image.split("?ext=")[1];
  const { downloadUrl: photoUrl, fileName: storagePath } =
    await uploadFileFromUrl(image, getSeriesPreviewImageStoragePath(fileExt));

  const prisma = getPrisma();
  const photo = await prisma.photo.create({
    data: {
      User_Photo_userIdToUser: getUserConnectOrCreate(creatorId),
      photoUrl,
      storagePath,
    },
  });

  const logoAsset = await maybeUpsertAsset(prisma, logoAssetSrc, null);

  const createOrUpdateData = {
    LogoAsset:
      logoAsset == null
        ? undefined
        : {
            connect: {
              id: logoAsset.id,
            },
          },
    Photo_PhotoToSeries_avatarPhotoId: { connect: { id: photo!.id } },
    SeriesType: {
      connect: { value: SeriesTypeExpress_Enum.GenerativeMint },
    },
    User: getUserConnectOrCreate(creatorId),
    description,
    id: mint,
    mint,
    name,
    slug: randomizeSeriesSlug
      ? `${getDashCasedString(name)}-${nanoid(4)}`
      : getDashCasedString(name),
  };
  return {
    series: await prisma.series.upsert({
      create: createOrUpdateData,
      update: createOrUpdateData,
      where: { mint },
    }),
  };
}

export type CandyMachineAllowlistEntry = {
  address: string;
  amount: number;
  proof: string;
  rootIndex: number;
};

interface UpsertCandyMachineData {
  allowlistInfo?: Array<CandyMachineAllowlistEntry>;
  allowlistPrice?: number;
  allowlistSaleStartTime?: string;
  allowlistTokenMint?: string;
  antiBotProtectionEnabled?: boolean;
  candyMachineAuthorityId?: string;
  creatorAuthorityId?: string;
  creatorWallets: Array<string>;
  currencyName?: string;
  id?: string;
  limitPerAddress?: number;
  logoAssetSrc?: string;
  maxSupply?: number;
  mintPreviewAssetSrc?: string;
  omniMintWallets: Array<string>;
  platformFeeBasisPoints?: number;
  premintPreviewAssetSrcs?: Array<string>;
  premintPrice?: number;
  price?: number;
  publicKey?: string;
  publicSaleEndTime?: string;
  publicSaleStartTime?: string;
  seriesMint?: string;
}

export default async function upsertCandyMachine(
  data: UpsertCandyMachineData,
  randomizeSeriesSlug: boolean
): Promise<{
  allowlistEntries: Maybe<Array<CandyMachineMerkleAllowlistInfo>>;
  candyMachine: CandyMachine;
  premintPreviewAssets: Array<Maybe<Asset>>;
  series: Maybe<Series>;
}> {
  const {
    allowlistInfo,
    allowlistPrice,
    allowlistSaleStartTime,
    allowlistTokenMint,
    antiBotProtectionEnabled,
    candyMachineAuthorityId,
    creatorAuthorityId,
    creatorWallets,
    currencyName,
    id,
    limitPerAddress,
    maxSupply,
    mintPreviewAssetSrc,
    omniMintWallets,
    platformFeeBasisPoints,
    premintPreviewAssetSrcs,
    price,
    premintPrice,
    publicKey,
    publicSaleEndTime,
    publicSaleStartTime,
    seriesMint,
  } = data;
  const prisma = getPrisma();
  const existingCandyMachine =
    id != null || publicKey != null
      ? await prisma.candyMachine.findFirst({
          where: { OR: [{ id }, { publicKey }] },
        })
      : null;
  const mintPreviewAsset = await maybeUpsertAsset(
    prisma,
    mintPreviewAssetSrc,
    existingCandyMachine?.mintPreviewAssetId
  );

  const requiredFieldsForCreation = [
    [candyMachineAuthorityId, "authorityId"],
    [creatorAuthorityId, "creatorAuthorityId"],
    [currencyName, "currencyName"],
    [price, "price"],
    [maxSupply, "maxSupply"],
    [platformFeeBasisPoints, "platformFeeBasisPoints"],
    [publicSaleStartTime, "publicSaleStartTime"],
    [antiBotProtectionEnabled, "antiBotProtectionEnabled"],
    [limitPerAddress, "limitPerAddress"],
    [creatorWallets, "creatorWallets"],
    [seriesMint, "seriesMint"],
    [publicKey, "publicKey"],
  ];
  const nullRequiredFields = requiredFieldsForCreation.filter(
    ([field]) => field == null
  );
  if (existingCandyMachine == null && nullRequiredFields.length > 0) {
    throw new Error(
      `Existing candy machine was not found and required fields for creation ` +
        `are missing: ${nullRequiredFields
          .map(([_field, name]) => name)
          .join(", ")}`
    );
  }

  // Sync onchain series first
  const { series } =
    seriesMint != null
      ? await upsertSeries(
          seriesMint,
          creatorAuthorityId!,
          randomizeSeriesSlug,
          data.logoAssetSrc
        )
      : { series: null };

  // All nullable data can be here
  const commonData: Partial<Prisma.CandyMachineCreateInput> = {
    MintPreviewAsset:
      mintPreviewAsset != null
        ? { connect: { id: mintPreviewAsset.id } }
        : undefined,
    allowlistPrice,
    allowlistSaleStartTime:
      allowlistSaleStartTime != null
        ? dayjs(allowlistSaleStartTime).toDate()
        : undefined,
    allowlistTokenMint,
    limitPerAddress,
    premintPrice,
  };
  // All of this should be non-null based on validation above
  const createData: Prisma.CandyMachineCreateInput = {
    ...commonData,
    CreatorAuthority: getUserConnectOrCreate(creatorAuthorityId!),
    Currency: { connect: { name: currencyName } },
    FormfnAuthority: getUserConnectOrCreate(candyMachineAuthorityId!),
    Series: { connect: { mint: series!.mint } },
    antiBotProtectionEnabled: antiBotProtectionEnabled!,
    creatorWallets,
    limitPerAddress: limitPerAddress!,
    maxSupply: maxSupply!,
    omniMintWallets,
    platformFeeBasisPoints: platformFeeBasisPoints!,
    price: price!,
    publicKey: publicKey!,
    publicSaleEndTime: dayjs(publicSaleEndTime).toDate(),
    publicSaleStartTime: dayjs(publicSaleStartTime).toDate(),
  };
  const updateData: Prisma.CandyMachineUpdateInput = {
    ...commonData,
    CreatorAuthority:
      creatorAuthorityId != null
        ? { connect: { id: creatorAuthorityId } }
        : undefined,
    Currency:
      currencyName != null ? { connect: { name: currencyName } } : undefined,
    FormfnAuthority:
      candyMachineAuthorityId != null
        ? { connect: { id: candyMachineAuthorityId } }
        : undefined,
    antiBotProtectionEnabled,
    creatorWallets,
    limitPerAddress,
    maxSupply,
    platformFeeBasisPoints,
    price,
    publicKey,
    publicSaleStartTime:
      publicSaleStartTime != null
        ? dayjs(publicSaleStartTime).toDate()
        : undefined,
  };
  const candyMachine = await (existingCandyMachine == null
    ? prisma.candyMachine.create({
        data: createData,
      })
    : prisma.candyMachine.update({
        data: updateData,
        where: id != null ? { id } : { publicKey },
      }));

  // If allowlist info is provided, remove all entries first before creating
  const _removeAllowlistEntries =
    allowlistInfo != null
      ? await prisma.candyMachineMerkleAllowlistInfo.deleteMany({
          where: { CandyMachine: { id: candyMachine.id } },
        })
      : null;
  const allowlistEntries =
    allowlistInfo != null
      ? await Promise.all(
          allowlistInfo.map((entry) => {
            const {
              address: userId,
              amount: amountAllowed,
              proof,
              rootIndex,
            } = entry;
            const createOrUpdateData = {
              CandyMachine: { connect: { id: candyMachine.id } },
              User: getUserConnectOrCreate(userId),
              amountAllowed,
              proof,
              rootIndex,
            };
            return prisma.candyMachineMerkleAllowlistInfo.upsert({
              create: createOrUpdateData,
              update: createOrUpdateData,
              where: {
                userId_candyMachineId: {
                  candyMachineId: candyMachine.id,
                  userId: entry.address,
                },
              },
            });
          })
        )
      : null;

  // Create premint preview assets now that candy machine is created
  const premintPreviewAssets = await Promise.all(
    (premintPreviewAssetSrcs ?? []).map((src) =>
      maybeUpsertAsset(prisma, src, null, {
        PremintPreviewAssetCandyMachine: { connect: { id: candyMachine!.id } },
      })
    )
  );

  // Make creator authority a creator
  await prisma.whitelist.upsert({
    create: { address: creatorAuthorityId! },
    update: { address: creatorAuthorityId! },
    where: { address: creatorAuthorityId! },
  });

  return {
    allowlistEntries,
    candyMachine,
    premintPreviewAssets,
    series,
  };
}
