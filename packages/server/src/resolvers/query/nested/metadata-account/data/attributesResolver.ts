import { MetadataAccountData, NftAttribute } from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import Typename from "src/types/enums/Typename";

export default async function attributesResolver(
  source: MetadataAccountData & { _mint: string }
): Promise<Array<NftAttribute>> {
  const prisma = getPrisma();
  const attributes = await prisma.nftToAttribute.findMany({
    include: {
      Attribute: true,
    },
    where: {
      nftId: source._mint ?? "",
    },
  });

  return attributes
    .map((val) => val.Attribute)
    .sort(getCompareByProperty("traitType", SortOrder.Asc))
    .map((val) => ({
      __typename: Typename.NftAttribute,
      traitType: val.traitType,
      value: val.value,
    }));
}
