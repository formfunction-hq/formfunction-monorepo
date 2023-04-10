/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable relay/unused-fields */
import styles from "css/pages/common/nft/NftAllowlistInfo.module.css";
import graphql from "babel-plugin-relay/macro";
import {
  NftAllowlistInfo_MetadataAccount$data,
  NftAllowlistInfo_MetadataAccount$key,
} from "components/pages/common/nft/__generated__/NftAllowlistInfo_MetadataAccount.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import FlexBox from "components/layout/FlexBox";
import InfoIcon from "components/icons/InfoIcon";
import ColorValue from "types/enums/ColorValue";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import useNftPageContext from "hooks/useNftPageContext";
import dayjs from "utils/dates/dayjsex";
import formatScheduledAuctionTime from "formfn-shared/dist/utils/dates/formatScheduledAuctionTime";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import { editionBuyerInfoQuery } from "hooks/nft-page/useNftPageEditionBuyerInfo";
import { NftAllowlistInfo_EditionBuyerInfoResponse$key } from "components/pages/common/nft/__generated__/NftAllowlistInfo_EditionBuyerInfoResponse.graphql";
import useViewerId from "hooks/useViewerId";
import pluralize from "formfn-shared/dist/utils/pluralize";

const ALLOWLIST_ONLY = "This edition is allowlist-only.";
const ALREADY_MINTED = "You have already minted.";
const NOT_ON_ALLOWLIST = "You are not on the allowlist, so you can't mint now.";

const fragment = graphql`
  fragment NftAllowlistInfo_MetadataAccount on MetadataAccount {
    nft {
      editionAllowlistEnabled
      editionAllowlistSaleStartTime
      editionPublicSaleStartTime
      ownerId
      status
    }
  }
`;

const editionBuyerInfoFragment = graphql`
  fragment NftAllowlistInfo_EditionBuyerInfoResponse on EditionBuyerInfoResponse {
    merkleAllowlistInfo {
      amountAllowed
      amountMinted
    }
  }
`;

function InfoIconAndDescription({ description }: { description: string }) {
  return (
    <FlexBox alignItems="flex-start" gap={8}>
      <div className={styles.iconContainer}>
        <InfoIcon colorValue={ColorValue.Primary} size={24} />
      </div>
      <Body2 className={styles.description} colorClass={ColorClass.Primary}>
        {description}
      </Body2>
    </FlexBox>
  );
}

function FragmentLoader({
  metadataAccountData,
  editionBuyerInfo,
}: {
  editionBuyerInfo: NftAllowlistInfo_EditionBuyerInfoResponse$key;
  metadataAccountData: NftAllowlistInfo_MetadataAccount$data;
}) {
  const viewerId = useViewerId();
  const isOwner = viewerId === metadataAccountData.nft.ownerId;
  const { merkleAllowlistInfo } = useFragment(
    editionBuyerInfoFragment,
    editionBuyerInfo
  );

  const amountRemaining =
    (merkleAllowlistInfo?.amountAllowed ?? 0) -
    (merkleAllowlistInfo?.amountMinted ?? 0);
  const { editionAllowlistSaleStartTime, editionPublicSaleStartTime } =
    metadataAccountData.nft;
  const onAllowlistDuringAllowlist = `You have been allowlisted, and can mint up to ${amountRemaining} ${pluralize(
    "NFT",
    amountRemaining
  )}.`;
  const allowlistStartDescription =
    editionAllowlistSaleStartTime == null
      ? null
      : `The allowlist phase will start on ${formatScheduledAuctionTime(
          editionAllowlistSaleStartTime,
          "long"
        )}`;
  const onAllowlist =
    merkleAllowlistInfo != null
      ? "You are on the allowlist."
      : "You are not on the allowlist.";

  if (editionPublicSaleStartTime == null) {
    // Allowlist-only mint

    if (isOwner) {
      if (allowlistStartDescription != null) {
        return (
          <InfoIconAndDescription
            description={`${allowlistStartDescription}. ${ALLOWLIST_ONLY}`}
          />
        );
      }
      return <InfoIconAndDescription description={`${ALLOWLIST_ONLY}`} />;
    }

    if (
      editionAllowlistSaleStartTime != null &&
      dayjs().isBefore(dayjs(editionAllowlistSaleStartTime))
    ) {
      return (
        <InfoIconAndDescription
          description={`${onAllowlist} ${allowlistStartDescription} ${ALLOWLIST_ONLY}`}
        />
      );
    }

    if (merkleAllowlistInfo == null) {
      return (
        <InfoIconAndDescription
          description={`${NOT_ON_ALLOWLIST} ${ALLOWLIST_ONLY}`}
        />
      );
    }

    if (merkleAllowlistInfo.amountMinted >= merkleAllowlistInfo.amountAllowed) {
      return (
        <InfoIconAndDescription
          description={`${ALREADY_MINTED} ${ALLOWLIST_ONLY}`}
        />
      );
    }

    return (
      <InfoIconAndDescription
        description={`${onAllowlistDuringAllowlist} ${ALLOWLIST_ONLY}`}
      />
    );
  }

  if (dayjs().isSameOrAfter(dayjs(editionPublicSaleStartTime))) {
    // Allowlist phase is over
    return null;
  }

  if (
    editionAllowlistSaleStartTime != null &&
    dayjs().isBefore(dayjs(editionAllowlistSaleStartTime))
  ) {
    const common = `${allowlistStartDescription}, and end on ${formatScheduledAuctionTime(
      editionPublicSaleStartTime,
      "long"
    )}.`;

    if (isOwner) {
      return <InfoIconAndDescription description={common} />;
    }

    return <InfoIconAndDescription description={`${onAllowlist} ${common}`} />;
  }

  const allowlistEndDescriptionCommon = `The allowlist phase will end on ${formatScheduledAuctionTime(
    editionPublicSaleStartTime,
    "long"
  )}.`;
  const allowlistEndDescription = `${allowlistEndDescriptionCommon} Anyone will be able to mint after that time.`;
  const allowlistEndDescriptionMaxMinted = `${allowlistEndDescriptionCommon} You can mint more after the allowlist phase is over.`;

  if (isOwner) {
    return (
      <InfoIconAndDescription description={`${allowlistEndDescription}`} />
    );
  }

  if (merkleAllowlistInfo == null) {
    return (
      <InfoIconAndDescription
        description={`${NOT_ON_ALLOWLIST} ${allowlistEndDescription}`}
      />
    );
  }

  if (merkleAllowlistInfo.amountMinted >= merkleAllowlistInfo.amountAllowed) {
    return (
      <InfoIconAndDescription
        description={`${ALREADY_MINTED} ${allowlistEndDescriptionMaxMinted}`}
      />
    );
  }

  return (
    <InfoIconAndDescription
      description={`${onAllowlistDuringAllowlist} ${allowlistEndDescription}`}
    />
  );
}

function QueryLoader({
  editionBuyerInfoQueryRef,
  metadataAccountData,
}: {
  editionBuyerInfoQueryRef: PreloadedQuery<useNftPageEditionBuyerInfoQuery>;
  metadataAccountData: NftAllowlistInfo_MetadataAccount$data;
}) {
  const { editionBuyerInfo } =
    usePreloadedQuery<useNftPageEditionBuyerInfoQuery>(
      editionBuyerInfoQuery,
      editionBuyerInfoQueryRef
    );
  return (
    <FragmentLoader
      metadataAccountData={metadataAccountData}
      editionBuyerInfo={editionBuyerInfo}
    />
  );
}

type Props = {
  metadataAccount: NftAllowlistInfo_MetadataAccount$key;
};

export default function NftAllowlistInfo({ metadataAccount }: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { editionBuyerInfoQueryRef } = useNftPageContext();

  if (
    !metadataAccountData.nft.editionAllowlistEnabled ||
    editionBuyerInfoQueryRef == null ||
    metadataAccountData.nft.status !== "ListedEditions"
  ) {
    return null;
  }

  return (
    <QueryLoader
      editionBuyerInfoQueryRef={editionBuyerInfoQueryRef}
      metadataAccountData={metadataAccountData}
    />
  );
}
