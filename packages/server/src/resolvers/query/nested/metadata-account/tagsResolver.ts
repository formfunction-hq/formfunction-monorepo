import { MetadataAccount } from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function tagsResolver(
  metadataAccount: MetadataAccount
): Promise<Array<string>> {
  const prisma = getPrisma();
  const tags = await prisma.nftToTag.findMany({
    include: {
      Tag: true,
    },
    where: {
      nftId: metadataAccount.mint,
    },
  });

  return tags.map((val) => val.Tag.value);
}
