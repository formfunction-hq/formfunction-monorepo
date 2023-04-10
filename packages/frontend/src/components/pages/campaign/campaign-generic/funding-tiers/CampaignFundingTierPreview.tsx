import styles from "css/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreview.module.css";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import PlainButton from "components/buttons/PlainButton";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import Body1Medium from "components/text/Body1Medium";
import scrollElementIntoView from "utils/scroll/scrollElementIntoView";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import CampaignFundingTierPreviewAssetsContainer from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviewAssetsContainer";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import BackgroundColorClass from "types/enums/BackgroundColorClass";

type Props = {
  assets: Array<JSX.Element>;
  campaignSectionId: string;
  description: string | JSX.Element;
  onClickAddNfts?: () => void;
  setCampaignTab: (val: CampaignTab) => void;
  title: string | JSX.Element;
};

export default function CampaignFundingTierPreview({
  assets,
  campaignSectionId,
  description,
  onClickAddNfts,
  setCampaignTab,
  title,
}: Props) {
  const colorScheme = useCampaignColorScheme();

  return (
    <div
      className={joinClasses(
        GlobalClass.CardAnimation,
        styles.container,
        BackgroundColorClass.CardBackground
      )}
    >
      <PlainButton
        className={styles.button}
        onClick={() => {
          setCampaignTab(CampaignTab.Support);
          // Use setTimeout so that if the tab switches, the scroll still works
          setTimeout(() => scrollElementIntoView(campaignSectionId), 0);
        }}
        transparentBg={false}
      >
        {assets.length > 0 && (
          <CampaignFundingTierPreviewAssetsContainer>
            {assets}
          </CampaignFundingTierPreviewAssetsContainer>
        )}
        <div className={styles.text}>
          <ArtName
            className={styles.title}
            colorClass={ColorClass.Primary}
            textAlign="left"
          >
            {title}
          </ArtName>
          <Body1
            className={styles.description}
            colorClass={ColorClass.Primary}
            textAlign="left"
            truncateLines={4}
          >
            {description}
          </Body1>
          <Body1Medium
            className={styles.seePieces}
            colorClass={colorScheme.foreground.colorClass}
          >
            See pieces
            <ArrowRightIcon
              colorValue={colorScheme.foreground.colorValue}
              size={24}
            />
          </Body1Medium>
        </div>
      </PlainButton>
      {onClickAddNfts != null ? (
        <ButtonWithText
          onClick={onClickAddNfts}
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
        >
          Add NFTs
        </ButtonWithText>
      ) : null}
    </div>
  );
}
