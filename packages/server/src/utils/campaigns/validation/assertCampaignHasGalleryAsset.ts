import { CampaignV2 } from "src/__generated__/generated";

export default function assertCampaignHasGalleryAsset(campaign: CampaignV2) {
  if (campaign.galleryAssets == null || campaign.galleryAssets.length === 0) {
    throw new Error("Campaign must have at least one gallery asset.");
  }
}
