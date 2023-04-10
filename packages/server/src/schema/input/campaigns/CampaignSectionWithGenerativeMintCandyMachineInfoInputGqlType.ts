import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";

const CampaignSectionWithGenerativeMintCandyMachineInfoInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      viewerId: {
        type: GraphQLID,
      },
    },
    name: Typename.CampaignSectionWithGenerativeMintCandyMachineInfoInput,
  });

export default CampaignSectionWithGenerativeMintCandyMachineInfoInputGqlType;
