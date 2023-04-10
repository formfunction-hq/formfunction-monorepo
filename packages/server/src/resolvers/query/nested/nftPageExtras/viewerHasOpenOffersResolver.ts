import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import getOpenOffersMadeByUserWhereClause from "src/utils/nft/getOpenOffersMadeByUserWhereClause";
import getPublicKey from "src/utils/headers/getPublicKey";
import isEmptyObject from "formfn-shared/dist/utils/isEmptyObject";

async function viewerHasOpenOffersPlacedResolver(
  context: MyContext,
  mint: string
): Promise<boolean> {
  const prisma = getPrisma();
  const openOffersMadeByViewerWhereClause = getOpenOffersMadeByUserWhereClause(
    getPublicKey(context.req)
  );
  if (isEmptyObject(openOffersMadeByViewerWhereClause)) {
    return false;
  }

  const viewerOpenOffersCount = await prisma.offer.count({
    where: {
      AND: [{ mint }, openOffersMadeByViewerWhereClause],
    },
  });

  return viewerOpenOffersCount > 0;
}

export default viewerHasOpenOffersPlacedResolver;
