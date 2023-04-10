import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import CampaignsConfig from "formfn-shared/dist/types/CampaignsConfig";

const DEFAULT: CampaignsConfig = {
  campaignsBySlug: {
    commuter: {
      about: "Test about",
      creatorId: "3MuEbMP11MPV8ju7kYCyA1ssYx39Gdue8QHujqLnqq6g",
      description:
        "A hand-drawn animated film with film festival ambitions, following a disillusioned " +
        "businessman and how his repetitious life takes its toll.",
      descriptionAlt:
        "Help @shilstone_arts bring this project to life through NFTs that will grant the owners special creative utility.",
      emojiMarker: "🐶",
      goalInLamports: 200 * 1e9,
      heroAssets: [
        {
          contentType: "image/png",
          downloadUrl:
            "https://cdn.formfunction.xyz/nft-images/--2t5r0gZOAeDZWclgSnj.png",
          path: "nft-images/--2t5r0gZOAeDZWclgSnj.png",
        },
        {
          contentType: "image/jpeg",
          downloadUrl:
            "https://formfunction.imgix.net/nft-images/hmQcH6nU_nQEiEMEw8QEH.jpg",
          path: "nft-images/hmQcH6nU_nQEiEMEw8QEH.jpg",
        },
        {
          contentType: "video/mp4",
          downloadUrl:
            "https://cdn.formfunction.xyz/nft-images/-2roGG_RiONTbuCiSwciP.mp4",
          path: "nft-images/-2roGG_RiONTbuCiSwciP.mp4",
        },
      ],
      sections: [
        {
          benefits: [
            "Credited as an associate producer at the end of the film",
            "Invited to monthly calls to discuss project status, share progress and give feedback",
            "Gain limited creative input on designs and story",
            "Gain early access to view the completed film",
            "Peer behind the scenes of the production process",
            "Free entry to live screening in Los Angeles and meet face-to-face",
            "A few more fun surprises",
          ],
          description:
            "The producer collection features the protagonist during " +
            " different parts of his commute. These pieces give owners " +
            "the opportunity to be part of making an animated film.",
          nftMints: [],
          title: "The Producer Collection",
        },
        {
          benefits: [
            "Hi-res still image of their character",
            "Free entry to live screening in Los Angeles and meet face-to-face",
            "Access to Commuter Discord channel",
            "Gain early access to view the completed film",
          ],
          description:
            "Each of the characters in the character " +
            "collection will show up animated in the final film.",
          nftMints: [],
          title: "The Character Collection",
        },
        {
          benefits: [
            "Hi-res still image of the collected season",
            "Access to Commuter Discord channel",
            "Gain early access to view the completed film",
          ],
          description:
            "The film follows the protagonist throughout " +
            "the year. Each of these 4 editions showcases " +
            "the same cityscape throughout all four seasons.",
          nftMints: [],
          title: "The Producer Collection",
        },
      ],
      title: "Seasons Editions",
    },
  },
};

export default async function getCampaignsConfig(): Promise<CampaignsConfig> {
  return getLdFlag<CampaignsConfig>(LaunchDarklyFlag.CampaignsConfig, DEFAULT);
}
