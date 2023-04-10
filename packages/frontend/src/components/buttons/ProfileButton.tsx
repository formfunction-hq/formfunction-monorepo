import graphql from "babel-plugin-relay/macro";
import { ProfileButtonQuery } from "components/buttons/__generated__/ProfileButtonQuery.graphql";
import ProfileIcon from "components/icons/ProfileIcon";
import styles from "css/buttons/ProfileButton.module.css";
import useSolanaContext from "hooks/useSolanaContext";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import { Popover } from "antd";
import Imgix from "react-imgix";
import MaybeImgix from "components/images/MaybeImgix";
import ProfileButtonOptions from "components/buttons/ProfileButtonOptions";

const ALIGN_ITEMS = "flex-start";

const query = graphql`
  query ProfileButtonQuery($id: String!) {
    User_by_pk(id: $id) {
      # eslint-disable-next-line relay/unused-fields
      id

      ProfilePhoto {
        # eslint-disable-next-line relay/unused-fields
        id
        photoUrl
      }
    }
  }
`;

function NoPicture(): JSX.Element {
  return (
    <Popover
      placement="bottomRight"
      content={<ProfileButtonOptions alignItems={ALIGN_ITEMS} />}
      trigger="click"
    >
      <div className={styles.container}>
        <ProfileIcon colorValue={ColorValue.White} size={24} />
      </div>
    </Popover>
  );
}

function WithPicture(): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const data = useLazyLoadQuery<ProfileButtonQuery>(query, {
    id: anchorWallet?.publicKey.toString() ?? "",
  });

  const photoUrl = data.User_by_pk?.ProfilePhoto?.photoUrl;
  if (photoUrl != null) {
    return (
      <Popover
        placement="bottomRight"
        content={<ProfileButtonOptions alignItems={ALIGN_ITEMS} />}
        trigger="click"
      >
        {/* TODO: IDK why we need this div */}
        <div>
          <MaybeImgix src={photoUrl}>
            <Imgix className={styles.container} src={photoUrl} width={48} />
            <img className={styles.container} src={photoUrl} />
          </MaybeImgix>
        </div>
      </Popover>
    );
  }

  return <NoPicture />;
}

export default function ProfileButton(): JSX.Element {
  return (
    <Suspense fallback={<NoPicture />}>
      <WithPicture />
    </Suspense>
  );
}
