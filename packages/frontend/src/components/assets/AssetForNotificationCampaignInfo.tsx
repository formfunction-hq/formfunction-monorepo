import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo$key } from "components/assets/__generated__/AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo.graphql";
import ActivityNotificationAssetForAssetExpress from "components/pages/activity/ActivityNotificationAssetForAssetExpress";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";

const fragment = graphql`
  fragment AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo on ActivityNotificationCampaignInfo {
    slug

    creator {
      username
    }

    previewAsset {
      ...ActivityNotificationAssetForAssetExpress_AssetExpress
    }
  }
`;

type Props = {
  activityNotificationCampaignInfo: AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo$key;
};

export default function AssetForNotificationCampaignInfo({
  activityNotificationCampaignInfo,
}: Props): JSX.Element {
  const campaignInfoData = useFragment(
    fragment,
    activityNotificationCampaignInfo
  );
  const { previewAsset, slug, creator } = campaignInfoData;
  return (
    <ActivityNotificationAssetForAssetExpress
      href={getCampaignLinkRelative(creator.username, slug)}
      asset={previewAsset}
    />
  );
}
