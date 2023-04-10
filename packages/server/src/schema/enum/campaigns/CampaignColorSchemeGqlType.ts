import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CampaignColorScheme DB enum
const CampaignColorSchemeGqlType = new GraphQLEnumType({
  name: Typename.CampaignColorScheme,
  values: {
    AliceBlueSinopia: {},
    AntiFlashWhiteDarkGunmetal: {},
    BrightGrayMediumBlue: {},
    CulturedCadmiumGreen: {},
    GreenishGrayMidnightBlue: {},
    SeashellMaximumRed: {},
  },
});

export default CampaignColorSchemeGqlType;
