import styles from "css/pages/campaign/campaign-v1/sections/GenericCampaignSectionPreview.module.css";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";
import PlainButton from "components/buttons/PlainButton";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import Body1Medium from "components/text/Body1Medium";
import scrollElementIntoView from "utils/scroll/scrollElementIntoView";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import graphql from "babel-plugin-relay/macro";
import { GenericCampaignSectionPreview_MetadataAccount$key } from "components/pages/campaign/campaign-v1/sections/__generated__/GenericCampaignSectionPreview_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import NftAssetSize from "types/enums/NftAssetSize";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";

const fragment = graphql`
  fragment GenericCampaignSectionPreview_MetadataAccount on MetadataAccount
  @relay(plural: true) {
    id
    ...NftAssetForMetadataAccount_MetadataAccount
  }
`;

type Props = {
  campaignSectionId: string;
  description: string;
  metadataAccounts: GenericCampaignSectionPreview_MetadataAccount$key;
  setCampaignTab: (val: CampaignTab) => void;
  title: string;
};

export default function GenericCampaignSectionPreview({
  campaignSectionId,
  title,
  metadataAccounts,
  description,
  setCampaignTab,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccounts);
  const assets =
    metadataAccountData.map((item) => (
      <NftAssetForMetadataAccount
        key={item.id}
        metadataAccount={item}
        size={NftAssetSize.Size96}
      />
    )) ?? [];

  return (
    <PlainButton
      className={joinClasses(GlobalClass.CardAnimation, styles.container)}
      onClick={() => {
        setCampaignTab(CampaignTab.Support);
        // Use setTimeout so that if the tab switches, the scroll still works
        setTimeout(() => scrollElementIntoView(campaignSectionId), 0);
      }}
      transparentBg={false}
    >
      {assets.length > 0 && <div className={styles.assets}>{assets}</div>}
      <div className={styles.text}>
        <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
        <Body1 colorClass={ColorClass.Primary} textAlign="left">
          {description}
        </Body1>
        <Body1Medium
          className={joinClasses(GlobalClass.GradientText, styles.seePieces)}
          colorClass={null}
        >
          See pieces
          <ArrowRightIcon colorValue={ColorValue.BrightPurple} size={24} />
        </Body1Medium>
      </div>
    </PlainButton>
  );
}
