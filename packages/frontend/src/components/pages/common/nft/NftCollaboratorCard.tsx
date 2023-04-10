import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import CollaboratorApprovalModal from "components/modal/CollaboratorApprovalModal";
import { NftCollaboratorCard_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftCollaboratorCard_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import styles from "css/pages/common/nft/NftCollaboratorCard.module.css";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import useUserContext from "hooks/useUserContext";
import { useState } from "react";
import { useFragment } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import formatUsername from "utils/formatUsername";

const fragment = graphql`
  fragment NftCollaboratorCard_MetadataAccount on MetadataAccount {
    id

    data {
      creators {
        address
        share
        status

        user {
          id
          username
        }
      }
      name
    }

    nft {
      creatorId
      CandyMachine {
        __typename
      }
      Creator {
        username
        ProfilePhoto {
          photoUrl
        }
      }
    }

    ...CollaboratorApprovalModal_MetadataAccount
  }
`;

type Props = {
  metadataAccount: NftCollaboratorCard_MetadataAccount$key;
};

export default function NftCollaboratorCard({ metadataAccount }: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { user } = useUserContext();
  const [isModalShown, setIsModalShown] = useState(false);

  const {
    nft,
    data: { creators },
  } = metadataAccountData;
  const shouldDisplay =
    creators?.find(
      (creator) => creator.address === user?.id && creator.status === "Pending"
    ) != null && nft.CandyMachine == null;

  if (!shouldDisplay || user == null || creators == null) {
    return null;
  }

  const creatorShares = creators.map((creator) => (
    <Body2 colorClass={ColorClass.Primary} key={creator.address}>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        display="inline"
        href={getUserProfileLinkRelative(creator.address)}
        type="link_internal"
      >
        @{formatUsername(creator.user?.username ?? creator.address)!}
      </TextButton>{" "}
      {creator.share}%
    </Body2>
  ));

  return (
    <>
      <CollaboratorApprovalModal
        isShown={isModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsModalShown(false)}
      />
      <div className={styles.container}>
        <div className={styles.left}>
          <ProfilePhotoCircle
            borderWidth={3}
            hasBorder
            hasShadow
            src={nft.Creator?.ProfilePhoto?.photoUrl}
            width={48}
          />
          <div className={styles.details}>
            <Body1 colorClass={ColorClass.Primary}>
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                display="inline"
                href={getUserProfileLinkRelative(
                  nft.Creator?.username ?? nft.creatorId
                )}
                type="link_internal"
              >
                @{formatUsername(nft.Creator?.username ?? nft.creatorId)!}
              </TextButton>{" "}
              added you as a collaborator on{" "}
              <span className={FontClass.Body1SemiBold}>
                {metadataAccountData.data.name}
              </span>
            </Body1>
            <div className={styles.creatorShares}>{creatorShares}</div>
          </div>
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          fontClass={FontClass.Body1Medium}
          onClick={() => setIsModalShown(true)}
        >
          View
        </ButtonWithText>
      </div>
    </>
  );
}
