import graphql from "babel-plugin-relay/macro";
import GlobeIcon from "components/icons/GlobeIcon";
import LockIcon from "components/icons/LockIcon";
import FlexBox from "components/layout/FlexBox";
import { PostVisibilitySection_IPost$key } from "components/posts/__generated__/PostVisibilitySection_IPost.graphql";
import Body1 from "components/text/Body1";
import Body1Bold from "components/text/Body1Bold";
import WrapWithTooltip from "components/tooltips/WrapWithTooltip";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

const fragment = graphql`
  fragment PostVisibilitySection_IPost on IPost {
    visibility
    visibilityFundingTiers {
      ... on ICampaignFundingTier {
        title
      }
    }
  }
`;

type Props = {
  post: PostVisibilitySection_IPost$key;
};

function PostVisibility({
  icon,
  visibilityText,
}: {
  icon: JSX.Element;
  visibilityText: string;
}) {
  return (
    <WrapWithTooltip
      tooltipContent={
        <FlexBox flexDirection="row" gap={4}>
          <Body1 colorClass={ColorClass.Primary}>Visible to</Body1>
          <Body1Bold colorClass={ColorClass.Primary}>
            {visibilityText}
          </Body1Bold>
        </FlexBox>
      }
    >
      {icon}
    </WrapWithTooltip>
  );
}

export default function PostVisibilitySection({ post }: Props) {
  const postData = useFragment(fragment, post);
  const { visibility, visibilityFundingTiers } = postData;
  const fundingTierTitles = visibilityFundingTiers?.map(({ title }) => title!);

  switch (visibility) {
    case "CampaignSupportersOnly": {
      if (fundingTierTitles != null && fundingTierTitles.length > 0) {
        return (
          <PostVisibility
            icon={<LockIcon colorValue={ColorValue.Secondary} size={24} />}
            visibilityText={`supporters of ${fundingTierTitles.join(
              ", "
            )} only`}
          />
        );
      }

      return (
        <PostVisibility
          icon={<LockIcon colorValue={ColorValue.Secondary} size={24} />}
          visibilityText="supporters only"
        />
      );
    }
    case "Public":
      return (
        <PostVisibility
          icon={<GlobeIcon colorValue={ColorValue.Secondary} size={24} />}
          visibilityText="public"
        />
      );
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(visibility);
  }
}
