import graphql from "babel-plugin-relay/macro";
import { NftTimeExtensionInfo_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftTimeExtensionInfo_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import styles from "css/pages/common/nft/NftTimeExtensionInfo.module.css";
import InfoIcon from "components/icons/InfoIcon";
import ColorValue from "types/enums/ColorValue";
import ColorClass from "types/enums/ColorClass";
import Body2 from "components/text/Body2";
import dayjs from "utils/dates/dayjsex";
import isNftInTimeExtensionPeriod from "utils/dates/isNftInTimeExtensionPeriod";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useEffect, useState } from "react";
import pluralize from "formfn-shared/dist/utils/pluralize";

const fragment = graphql`
  fragment NftTimeExtensionInfo_MetadataAccount on MetadataAccount {
    nft {
      auctionEndTime
      timeExtensionDurationInSeconds
    }
  }
`;

type Props = {
  metadataAccount: NftTimeExtensionInfo_MetadataAccount$key;
};

export default function NftTimeExtensionInfo({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const [_triggerRerender, setTriggerRerender] = useState(0);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { auctionEndTime, timeExtensionDurationInSeconds } =
    metadataAccountData.nft;
  useEffect(() => {
    // We want to re-render this component every few seconds so that it will
    // be rendered when the NFT is in the time extension period
    const interval = setInterval(
      () => setTriggerRerender((curr) => curr + 1),
      5000
    );

    return () => clearInterval(interval);
  });

  const shouldShow = isNftInTimeExtensionPeriod(
    timeExtensionDurationInSeconds,
    dayjs(auctionEndTime)
  );

  if (!shouldShow) {
    return null;
  }

  const numMinutes = dayjs
    .duration({
      seconds: timeExtensionDurationInSeconds,
    })
    .asMinutes();

  return (
    <div className={styles.notMuchTime}>
      <InfoIcon colorValue={ColorValue.Primary} size={24} />
      <Body2 colorClass={ColorClass.Primary}>
        This auction is close to ending. If you bid now, the auction countdown
        will be reset to {numMinutes} {pluralize("minute", numMinutes)} to give
        each buyer the opportunity to place a final bid.
      </Body2>
    </div>
  );
}
