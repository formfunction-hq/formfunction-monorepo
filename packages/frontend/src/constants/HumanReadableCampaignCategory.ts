import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";

const HUMAN_READABLE_CAMPAIGN_CATEGORY: Record<
  CampaignCategoryExpress_enum,
  string
> = {
  Art: "Art",
  Brand: "Brand",
  Comics: "Comics",
  Culture: "Culture",
  DanceAndTheater: "Dance & theater",
  Design: "Design",
  Education: "Education",
  Fashion: "Fashion",
  FilmAndVideo: "Film & video",
  Food: "Food",
  Games: "Games",
  Music: "Music",
  Photography: "Photography",
  Podcasts: "Podcasts",
  Product: "Product",
  [RELAY_FUTURE_ADDED_VALUE]: "",
  Writing: "Writing",
};

export default HUMAN_READABLE_CAMPAIGN_CATEGORY;
