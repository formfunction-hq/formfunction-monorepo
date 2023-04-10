import { Prisma } from "@prisma/client";
import CONVERT_SERIES_INCLUDE from "src/constants/include/ConvertSeriesInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_CANDY_MACHINE_INCLUDE = {
  CreatorAuthority: { include: CONVERT_USER_INCLUDE },
  Currency: true,
  FormfnAuthority: { include: CONVERT_USER_INCLUDE },
  MintPreviewAsset: true,
  Series: { include: CONVERT_SERIES_INCLUDE },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.CandyMachineInclude;

export default CONVERT_CANDY_MACHINE_INCLUDE;
