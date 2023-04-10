import GenericModal from "components/modal/GenericModal";
import styles from "css/pages/campaign/edit/funding-tiers/ManageFundingTiersModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { useState } from "react";
import { ManageFundingTiersModal_CampaignV2$key } from "components/pages/campaign/edit/funding-tiers/__generated__/ManageFundingTiersModal_CampaignV2.graphql";
import { ManageFundingTiersModalUpdateMutation } from "components/pages/campaign/edit/funding-tiers/__generated__/ManageFundingTiersModalUpdateMutation.graphql";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import GenericDnd from "components/drag-and-drop/GenericDnd";
import { Draggable } from "react-beautiful-dnd";
import ManageFundingTierRow from "components/pages/campaign/edit/funding-tiers/ManageFundingTierRow";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import isDeleteFundingTierAllowed from "utils/campaigns/permissions/isDeleteFundingTierAllowed";

const updateMutation = graphql`
  mutation ManageFundingTiersModalUpdateMutation(
    $input: UpdateCampaignFundingTierOrderInput!
  ) {
    CampaignsNamespace {
      updateCampaignFundingTierOrder(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment ManageFundingTiersModal_CampaignV2 on CampaignV2 {
    id
    fundingTiers {
      __typename
      ... on CampaignFundingTierStandard {
        ...ManageFundingTierRow_CampaignFundingTierStandard
        id
      }
    }
    status
  }
`;

type Props = {
  campaign: ManageFundingTiersModal_CampaignV2$key;
  isShown: boolean;
  onHide: () => void;
};

export default function ManageFundingTiersModal({
  isShown,
  campaign,
  onHide,
}: Props) {
  const [commitUpdate, updateInFlight] =
    useMutation<ManageFundingTiersModalUpdateMutation>(updateMutation);

  const {
    fundingTiers,
    id: campaignId,
    status,
  } = useFragment(fragment, campaign);
  const allowDelete = isDeleteFundingTierAllowed(status);
  const standardFundingTiers = filterNulls(
    fundingTiers?.map((tier) => {
      const { __typename } = tier;
      switch (__typename) {
        case "CampaignFundingTierStandard":
          return tier;
        case RELAY_FUTURE_UNION_VALUE:
          return null;
        default:
          return assertUnreachable(__typename);
      }
    }) ?? []
  );
  const [fundingTiersDnd, setFundingTiersDnd] = useState(standardFundingTiers);

  const onSave = () => {
    commitUpdate({
      onCompleted: () => {
        onHide();
      },
      onError: () => {
        notifyUnexpectedError();
      },
      variables: {
        input: {
          campaignId,
          fundingTierOrder: fundingTiersDnd.map((tier) => tier.id),
        },
      },
    });
  };

  const onDelete = (fundingTierId: string) => {
    setFundingTiersDnd(
      fundingTiersDnd.filter((tier) => tier.id !== fundingTierId)
    );
  };
  const renderRow = (item: any, index: number) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ManageFundingTierRow
            allowDelete={allowDelete}
            fundingTier={item}
            onDelete={onDelete}
          />
        </div>
      )}
    </Draggable>
  );

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Manage funding tiers"
    >
      <div className={styles.container}>
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          Reorder{allowDelete ? " or delete" : ""} your funding tiers
        </Body1>
        <GenericDnd
          className={styles.dndContainer}
          items={fundingTiersDnd}
          setItems={setFundingTiersDnd}
          droppableId="seriesSelectDnd"
          renderRow={renderRow}
        />
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          isLoading={updateInFlight}
          onClick={onSave}
          className={styles.saveButton}
          type="button"
        >
          Save
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
