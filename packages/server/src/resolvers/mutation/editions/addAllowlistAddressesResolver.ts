import MyContext from "src/types/MyContext";
import {
  AddAllowlistAddressesInput,
  AddAllowlistAddressesResponse,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import { Nft, NftListing } from "@prisma/client";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import Typename from "src/types/enums/Typename";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import createEditionsMerkleAllowlistInfoEntries from "src/utils/editions/createEditionsMerkleAllowlistInfoEntries";
import appendEditionsMerkleAllowlist from "src/utils/editions/appendEditionsMerkleAllowlist";
import { constructMerkleEditionAllowlist } from "@formfunction-hq/formfunction-auction-house";
import { PublicKey } from "@solana/web3.js";
import arrayLast from "formfn-shared/dist/utils/array/arrayLast";

// TODO[@bonham000]: replace with exported const from auction house
const MAX_ROOT_INDEX = 99; // 100 roots is the max

function assertUserCanAddAllowlistAddresses(
  masterEdition: Maybe<Nft & { NftListing: Maybe<NftListing> }>,
  viewerId: string,
  curHighestRootIndex: number
) {
  invariant(masterEdition != null);
  invariant(curHighestRootIndex >= 0);

  if (
    masterEdition.creatorId !== viewerId ||
    masterEdition.ownerId !== viewerId
  ) {
    throw new Error("You are not authorized to add to this allowlist");
  }

  if (masterEdition.status !== NftStatusExpress_Enum.ListedEditions) {
    throw new Error("You cannot add to the allowlist at this time");
  }

  if (masterEdition.NftListing?.editionAllowlistEnabled !== true) {
    throw new Error("You can only add to an allowlisted edition listing");
  }

  if (curHighestRootIndex >= MAX_ROOT_INDEX) {
    throw new Error("The allowlist cannot be expanded any further");
  }
}

export default async function addAllowlistAddressesResolver(
  context: MyContext,
  input: AddAllowlistAddressesInput
): Promise<AddAllowlistAddressesResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const viewerId = verifiedPublicKey.toString();
  const { masterEditionMint, addresses } = input;
  const prisma = getPrisma();
  const dedupedAddresses = removeDuplicatesWithSet(addresses);
  const [masterEdition, existingAllowlistInfos, alreadyAddedAllowlistInfos] =
    await Promise.all([
      prisma.nft.findUnique({
        include: { NftListing: true },
        where: { id: masterEditionMint },
      }),
      prisma.editionsMerkleAllowlistInfo.findMany({
        distinct: ["rootIndex"],
        orderBy: { rootIndex: "asc" },
        select: { amountAllowed: true, rootIndex: true },
        where: { Nft: { id: masterEditionMint } },
      }),
      prisma.editionsMerkleAllowlistInfo.findMany({
        select: { userId: true },
        where: {
          Nft: { id: masterEditionMint },
          User: { id: { in: dedupedAddresses } },
        },
      }),
    ]);
  const curHighestRootIndex = arrayLast(existingAllowlistInfos)!.rootIndex;
  assertUserCanAddAllowlistAddresses(
    masterEdition,
    viewerId,
    curHighestRootIndex
  );

  const allowlistAmountAllowed = existingAllowlistInfos[0].amountAllowed;
  const alreadyAddedAllowlistAddresses = alreadyAddedAllowlistInfos.map(
    ({ userId }) => userId
  );
  const addressesToAdd = dedupedAddresses.filter(
    (address) => !alreadyAddedAllowlistAddresses.includes(address)
  );

  const merkleAllowlist = constructMerkleEditionAllowlist(
    new PublicKey(masterEditionMint),
    addressesToAdd.map((address) => ({
      address: new PublicKey(address),
      amount: allowlistAmountAllowed ?? 1,
    }))
  );

  await appendEditionsMerkleAllowlist(
    context.req,
    merkleAllowlist,
    masterEditionMint
  );

  await prisma.$transaction(
    async (prismaTransactionClient: PrismaTransactionClient) => {
      await createEditionsMerkleAllowlistInfoEntries(prismaTransactionClient, {
        addresses: addressesToAdd,
        merkleAllowlist,
        merkleRootIndexOffset: curHighestRootIndex + 1,
        mint: masterEditionMint,
      });
    }
  );

  return {
    __typename: Typename.AddAllowlistAddressesResponse,
    addedAddresses: addressesToAdd,
  };
}
