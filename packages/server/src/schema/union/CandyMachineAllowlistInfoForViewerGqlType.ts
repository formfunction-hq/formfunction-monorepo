import { GraphQLUnionType } from "graphql";
import CandyMachineMerkleAllowlistInfoForViewerGqlType from "src/schema/object/candy-machine/CandyMachineMerkleAllowlistInfoForViewerGqlType";
import CandyMachineTokenAllowlistInfoForViewerGqlType from "src/schema/object/candy-machine/CandyMachineTokenAllowlistInfoForViewerGqlType";
import Typename from "src/types/enums/Typename";

const CandyMachineAllowlistInfoForViewerGqlType = new GraphQLUnionType({
  name: Typename.CandyMachineAllowlistInfoForViewer,
  types: [
    CandyMachineMerkleAllowlistInfoForViewerGqlType,
    CandyMachineTokenAllowlistInfoForViewerGqlType,
  ],
});

export default CandyMachineAllowlistInfoForViewerGqlType;
