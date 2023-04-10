import { NftStatusExpress_Enum } from "src/__generated__/generated";

const WHERE_NOT_BURNED = {
  status: {
    not: NftStatusExpress_Enum.Burned,
  },
};

export default WHERE_NOT_BURNED;
