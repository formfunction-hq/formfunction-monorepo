import { Asset, CandyMachine, Currency } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertSeriesType from "src/types/convert/ConvertSeriesType";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertCandyMachineType = CandyMachine & {
  CreatorAuthority: ConvertUserType;
  Currency: Currency;
  FormfnAuthority: ConvertUserType;
  MintPreviewAsset: Maybe<Asset>;
  Series: ConvertSeriesType;
};

export default ConvertCandyMachineType;
