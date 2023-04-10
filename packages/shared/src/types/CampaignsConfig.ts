export type Asset = {
  contentType: string;
  darkModeInfo?: {
    downloadUrl: string;
    path: string;
  };
  downloadUrl: string;
  path: string;
};

type CampaignSection = {
  benefits: Array<string>;
  candyMachineId?: string;
  description: string;
  nftMints: Array<string>;
  title: string;
};

export type CampaignConfig = {
  about: string;
  candyMachineSeriesSlug?: string;
  creatorId: string;
  description: string;
  descriptionAlt: string;
  emojiMarker: string;
  goal?:
    | {
        __typename: "monetary";
        currencyName: string;
        goalAmount: number;
      }
    | {
        __typename: "saleCount";
        goalAmount: number;
      };
  goalInLamports: number;
  heroAssets: Array<Asset>;
  logoAsset?: Asset;
  sections: Array<CampaignSection>;
  socialLinks?: {
    discord?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  team?: string;
  title: string;
};

type CampaignsConfig = {
  campaignsBySlug: { [slug: string]: CampaignConfig };
  featuredCampaignSlug?: string;
};

export default CampaignsConfig;
