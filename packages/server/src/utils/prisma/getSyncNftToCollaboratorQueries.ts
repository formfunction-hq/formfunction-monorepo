import {
  NftMetadata,
  NftToCollaborator,
  Prisma,
  PrismaPromise,
} from "@prisma/client";
import CreatorOnchain from "src/types/CreatorOnchain";
import getPrisma from "src/utils/prisma/getPrisma";
import { RequestStatusExpress_Enum } from "src/__generated__/generated";

export default async function getSyncNftToCollaboratorQueries(
  mint: string,
  onchainCreators: Array<CreatorOnchain>,
  creatorId: string
) {
  const prisma = getPrisma();
  const onchainCreatorAddresses = onchainCreators.map(({ address }) => address);

  const currentCollaborators = await prisma.nftToCollaborator.findMany({
    where: {
      nftId: mint,
    },
  });
  const currentCollaboratorAddresses = currentCollaborators.map(
    ({ collaboratorId }) => collaboratorId
  );

  const collaboratorsToAdd = onchainCreators.filter(
    ({ address }) => !currentCollaboratorAddresses.includes(address)
  );
  const collaboratorsToRemove: Array<NftToCollaborator> =
    currentCollaborators.filter(
      (collaborator) =>
        !onchainCreatorAddresses.includes(collaborator.collaboratorId)
    );
  const collaboratorsToUpdate = onchainCreators.filter(({ address }) =>
    currentCollaboratorAddresses.includes(address)
  );

  const prismaAddCollaborators = collaboratorsToAdd.map((collaborator) =>
    prisma.nftToCollaborator.create({
      data: {
        Nft: { connect: { id: mint } },
        Request:
          collaborator.address === creatorId
            ? undefined
            : {
                create: {
                  fromUserId: creatorId,
                  status: RequestStatusExpress_Enum.Pending,
                  toUserId: collaborator.address,
                },
              },
        User: {
          connectOrCreate: {
            create: {
              id: collaborator.address,
              username: collaborator.address,
            },
            where: {
              id: collaborator.address,
            },
          },
        },
        share: collaborator.share,
      },
    })
  );

  const prismaRemoveCollaborators = prisma.nftToCollaborator.deleteMany({
    where: {
      collaboratorId: {
        in: collaboratorsToRemove.map(({ collaboratorId }) => collaboratorId),
      },
    },
  });

  const prismaUpdateCollaborators = collaboratorsToUpdate.map(
    (collaborator) => {
      const prismaCollaborator = currentCollaborators.find(
        ({ collaboratorId }) => collaborator.address === collaboratorId
      );
      return prisma.nftToCollaborator.update({
        data: {
          Request:
            // requestId is nullable—don't want to update the request info
            // if it doesn't exist.
            prismaCollaborator?.requestId == null
              ? undefined
              : {
                  update: {
                    status: collaborator.verified
                      ? RequestStatusExpress_Enum.Approved
                      : undefined,
                  },
                },
          share: collaborator.share,
        },
        where: {
          collaboratorId_nftId: {
            collaboratorId: collaborator.address,
            nftId: mint,
          },
        },
      });
    }
  );

  const updateNftMetadata = prisma.nftMetadata.update({
    data: {
      creators: JSON.stringify(onchainCreators),
    },
    where: {
      mint,
    },
  });

  const queries: Array<
    PrismaPromise<NftToCollaborator | Prisma.BatchPayload | NftMetadata>
  > = [
    ...prismaAddCollaborators,
    prismaRemoveCollaborators,
    ...prismaUpdateCollaborators,
    updateNftMetadata,
  ];

  return queries;
}
