import { CampaignV2 } from "src/__generated__/generated";

export default function assertCampaignHasAbout(campaign: CampaignV2) {
  const { about } = campaign;
  if (
    ![
      about.campaign,
      about.contactInfo,
      about.creator,
      about.risksAndChallenges,
      about.timeline,
    ].some((val) => val != null && val !== "")
  ) {
    throw new Error("Campaign 'about' info must be filled out.");
  }
}
