import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/campaign/edit/funding-tiers/ManageFundingTierRow.module.css";
import VerticalEllipsisIcon from "components/icons/VerticalEllipsisIcon";
import ColorValue from "types/enums/ColorValue";
import { useFragment, useMutation } from "react-relay";
import joinClasses from "utils/joinClasses";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import { ManageFundingTierRowDeleteMutation } from "components/pages/campaign/edit/funding-tiers/__generated__/ManageFundingTierRowDeleteMutation.graphql";
import { ManageFundingTierRow_CampaignFundingTierStandard$key } from "components/pages/campaign/edit/funding-tiers/__generated__/ManageFundingTierRow_CampaignFundingTierStandard.graphql";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";

const deleteMutation = graphql`
  mutation ManageFundingTierRowDeleteMutation(
    $input: DeleteCampaignFundingTierInput!
  ) {
    CampaignsNamespace {
      deleteCampaignFundingTier(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment ManageFundingTierRow_CampaignFundingTierStandard on CampaignFundingTierStandard {
    id
    title
  }
`;

type Props = {
  allowDelete: boolean;
  fundingTier: ManageFundingTierRow_CampaignFundingTierStandard$key;
  onDelete: (fundingTierId: string) => void;
};

export default function ManageFundingTierRow({
  allowDelete,
  fundingTier,
  onDelete,
}: Props) {
  const { id, title } = useFragment(fragment, fundingTier);
  const [commitDelete, deleteInFlight] =
    useMutation<ManageFundingTierRowDeleteMutation>(deleteMutation);

  const onClick = () => {
    commitDelete({
      onCompleted: () => {
        onDelete(id);
      },
      onError: () => {
        notifyUnexpectedError();
      },
      variables: { input: { campaignFundingTierId: id } },
    });
  };

  return (
    <div
      className={joinClasses(styles.rowContainer, styles.rowContainerMarginTop)}
    >
      <div className={styles.rowInnerContainer}>
        <VerticalEllipsisIcon colorValue={ColorValue.Ghost} />
        <Body1 colorClass={ColorClass.Primary} textAlign="left">
          {title}
        </Body1>
      </div>
      {allowDelete && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Error}
          disabled={deleteInFlight}
          fontClass={FontClass.Body1}
          onClick={onClick}
          type="button"
        >
          {deleteInFlight ? "Deleting..." : "Delete"}
        </TextButton>
      )}
    </div>
  );
}
