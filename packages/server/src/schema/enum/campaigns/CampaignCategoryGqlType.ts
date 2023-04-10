import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CampaignCategory DB enum
const CampaignCategoryGqlType = new GraphQLEnumType({
  name: Typename.CampaignCategory,
  values: {
    Art: {},
    Brand: {},
    Comics: {},
    Culture: {},
    DanceAndTheater: {},
    Design: {},
    Education: {},
    Fashion: {},
    FilmAndVideo: {},
    Food: {},
    Games: {},
    Music: {},
    Photography: {},
    Podcasts: {},
    Product: {},
    Writing: {},
  },
});

export default CampaignCategoryGqlType;
