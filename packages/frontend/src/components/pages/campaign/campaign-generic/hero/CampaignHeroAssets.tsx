import graphql from "babel-plugin-relay/macro";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import AssetGeneric, { ExtraAssetProps } from "components/assets/AssetGeneric";
import YouTubeVideo from "components/assets/YouTubeVideo";
import { AssetForAssetExpress_AssetExpress$key } from "components/assets/__generated__/AssetForAssetExpress_AssetExpress.graphql";
import ButtonWithText from "components/buttons/ButtonWithText";
import PlainButton from "components/buttons/PlainButton";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import { CampaignHeroAssets_AssetExpress$key } from "components/pages/campaign/campaign-generic/hero/__generated__/CampaignHeroAssets_AssetExpress.graphql";
import styles from "css/pages/campaign/campaign-generic/hero/CampaignHeroAssets.module.css";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { Maybe } from "graphql/jsutils/Maybe";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import { useState } from "react";
import { useFragment } from "react-relay";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import getYouTubeThumbnailUrl from "utils/you-tube/getYouTubeThumbnailUrl";

const assetsFragment = graphql`
  fragment CampaignHeroAssets_AssetExpress on AssetExpress
  @relay(plural: true) {
    ...AssetForAssetExpress_AssetExpress
  }
`;

type Props = {
  assets: CampaignHeroAssets_AssetExpress$key;
  onClickEditGallery?: () => void;
  youTubeVideoHref?: Maybe<string>;
};

export default function CampaignHeroAssets({
  assets,
  onClickEditGallery,
  youTubeVideoHref,
}: Props) {
  const assetsData = useFragment(assetsFragment, assets);
  const [assetIndexToDisplay, setAssetIndexToDisplay] = useState(0);
  const colorScheme = useCampaignColorScheme();

  if (assetsData.length === 0 && isEmptyString(youTubeVideoHref)) {
    return null;
  }

  const thumbnailUrl =
    youTubeVideoHref != null ? getYouTubeThumbnailUrl(youTubeVideoHref) : null;

  const assetCombination: Array<
    AssetForAssetExpress_AssetExpress$key | string
  > = [...assetsData];
  if (thumbnailUrl != null) {
    assetCombination.unshift(youTubeVideoHref!);
  }
  const selectedAsset = assetCombination[assetIndexToDisplay];

  return (
    <div className={styles.container}>
      <AspectRatioContainer width={16} height={9}>
        {typeof selectedAsset === "string" ? (
          <YouTubeVideo
            youTubeUrl={selectedAsset}
            borderRadius={12}
            height="100%"
            objectFit="cover"
            showDropShadow
            width="100%"
          />
        ) : (
          <AssetForAssetExpress
            asset={selectedAsset}
            borderRadius={12}
            height="100%"
            imgixWidth={2000}
            objectFit="cover"
            showOverlay
            showDropShadow
            width="100%"
          />
        )}
      </AspectRatioContainer>
      <div
        className={joinClasses(styles.assetPicker, GlobalClass.ThinScrollbar)}
      >
        {assetCombination.map((asset, index) => {
          const miniAssetProps: ExtraAssetProps = {
            border:
              index === assetIndexToDisplay
                ? `3px solid ${colorScheme.foreground.colorValue}`
                : undefined,
            borderRadius: 8,
            boxSizing: index === assetIndexToDisplay ? "border-box" : undefined,
            height: 72,
            imgixWidth: 500,
            objectFit: "cover",
            width: 128,
          };
          if (typeof asset === "string") {
            return (
              <PlainButton
                key={asset}
                onClick={() => setAssetIndexToDisplay(index)}
              >
                <AssetGeneric
                  asset={{
                    contentType: "image/jpg",
                    downloadUrl: thumbnailUrl!,
                    videoPlaybackId: null,
                  }}
                  {...miniAssetProps}
                />
              </PlainButton>
            );
          }

          return (
            <PlainButton
              key={JSON.stringify(asset)}
              onClick={() => setAssetIndexToDisplay(index)}
            >
              <AssetForAssetExpress
                asset={asset}
                border={
                  index === assetIndexToDisplay
                    ? `3px solid ${colorScheme.foreground.colorValue}`
                    : undefined
                }
                borderRadius={8}
                boxSizing={
                  index === assetIndexToDisplay ? "border-box" : undefined
                }
                height={72}
                objectFit="cover"
                width={128}
              />
            </PlainButton>
          );
        })}
      </div>
      {onClickEditGallery != null && (
        <ButtonWithText
          buttonTheme={colorScheme.buttonTheme}
          className={styles.editCampaignGalleryButton}
          fontClass={FontClass.NavLink}
          type="button"
          onClick={onClickEditGallery}
        >
          Edit campaign gallery
        </ButtonWithText>
      )}
    </div>
  );
}
