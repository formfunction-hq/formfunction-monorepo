/* eslint-disable react/jsx-no-constructed-context-values */
import graphql from "babel-plugin-relay/macro";
import { NftPageContext_MetadataAccount$key } from "context/__generated__/NftPageContext_MetadataAccount.graphql";
import dayjs from "dayjs";
import {
  Context,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PreloadedQuery, useFragment } from "react-relay";
import AuctionStatus from "types/enums/AuctionStatus";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useQueryLoaderHookType } from "react-relay/relay-hooks/useQueryLoader";
import { useNftPageNftQuery } from "hooks/nft-page/__generated__/useNftPageNftQuery.graphql";
import { useNftPageClaimsQuery } from "hooks/nft-page/__generated__/useNftPageClaimsQuery.graphql";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";

export type NftPageContextData = {
  auctionStatus: AuctionStatus;
  editionBuyerInfoQueryRef: MaybeUndef<
    PreloadedQuery<useNftPageEditionBuyerInfoQuery>
  >;
  isAuctionEnded: boolean;
  loadClaimsQuery: useQueryLoaderHookType<useNftPageClaimsQuery>[1];
  loadEditionBuyerInfoQuery: useQueryLoaderHookType<useNftPageEditionBuyerInfoQuery>[1];
  loadNftQuery: useQueryLoaderHookType<useNftPageNftQuery>[1];
  nftCampaignQueryRef: MaybeUndef<PreloadedQuery<useNftPageCampaignQuery>>;
  triggerAuctionStatusUpdate: () => void;
};

const fragment = graphql`
  fragment NftPageContext_MetadataAccount on MetadataAccount {
    nft {
      auctionEndTime
      auctionHoldingPeriodEndTime
    }
  }
`;

export const NftPageContext: Context<NftPageContextData> =
  createContext<NftPageContextData>({
    auctionStatus: AuctionStatus.NotStarted,
    editionBuyerInfoQueryRef: null,
    isAuctionEnded: false,
    loadClaimsQuery: emptyFunction,
    loadEditionBuyerInfoQuery: emptyFunction,
    loadNftQuery: emptyFunction,
    nftCampaignQueryRef: null,
    triggerAuctionStatusUpdate: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  editionBuyerInfoQueryRef: MaybeUndef<
    PreloadedQuery<useNftPageEditionBuyerInfoQuery>
  >;
  loadClaimsQuery: useQueryLoaderHookType<useNftPageClaimsQuery>[1];
  loadEditionBuyerInfoQuery: useQueryLoaderHookType<useNftPageEditionBuyerInfoQuery>[1];
  loadNftQuery: useQueryLoaderHookType<useNftPageNftQuery>[1];
  metadataAccount: NftPageContext_MetadataAccount$key;
  nftCampaignQueryRef: MaybeUndef<PreloadedQuery<useNftPageCampaignQuery>>;
};

// TODO: rename to more specific context
export function NftPageContextProvider(props: ProviderProps): JSX.Element {
  const metadataAccountData = useFragment(fragment, props.metadataAccount);
  const { auctionEndTime, auctionHoldingPeriodEndTime } =
    metadataAccountData.nft;
  const auctionEndTimeDayjs =
    auctionEndTime == null ? null : dayjs(auctionEndTime);
  const auctionHoldingPeriodEndTimeDayjs =
    auctionHoldingPeriodEndTime == null
      ? null
      : dayjs(auctionHoldingPeriodEndTime);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [auctionStatus, setAuctionStatus] = useState(AuctionStatus.NotStarted);
  const [isCompleted, setIsCompleted] = useState(
    auctionEndTimeDayjs != null && dayjs().isAfter(auctionEndTimeDayjs)
  );
  const [isHoldingPeriod, setIsHoldingPeriod] = useState(
    auctionHoldingPeriodEndTimeDayjs != null &&
      isCompleted &&
      dayjs().isBefore(auctionHoldingPeriodEndTimeDayjs)
  );

  const getAuctionStatus = useCallback(() => {
    if (isHoldingPeriod) {
      return AuctionStatus.HoldingPeriod;
    }
    if (isCompleted) {
      return AuctionStatus.Completed;
    }

    return auctionEndTime == null
      ? AuctionStatus.NotStarted
      : AuctionStatus.Ongoing;
  }, [isCompleted, isHoldingPeriod, auctionEndTime]);

  useEffect(() => {
    if (updateTrigger >= 0) {
      const curTime = dayjs();
      const isCompletedLocal =
        curTime.isSame(auctionEndTimeDayjs, "second") ||
        curTime.isAfter(auctionEndTimeDayjs);
      setIsCompleted(isCompletedLocal);
      setIsHoldingPeriod(
        isCompletedLocal &&
          auctionHoldingPeriodEndTimeDayjs != null &&
          // Sanity check that holding period is indeed after end time
          auctionHoldingPeriodEndTimeDayjs.isAfter(auctionEndTimeDayjs) &&
          curTime.isBefore(auctionHoldingPeriodEndTimeDayjs)
      );
      setAuctionStatus(getAuctionStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionEndTimeDayjs, auctionHoldingPeriodEndTimeDayjs, updateTrigger]);

  useEffect(() => {
    let interval: Maybe<ReturnType<typeof setTimeout>> = null;
    if (isCompleted) {
      interval = setInterval(() => {
        const isCurrentlyHoldingPeriod = dayjs().isBefore(
          auctionHoldingPeriodEndTimeDayjs
        );
        setIsHoldingPeriod(isCurrentlyHoldingPeriod);
        setAuctionStatus(getAuctionStatus());

        if (!isCurrentlyHoldingPeriod && interval != null) {
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCompleted, auctionHoldingPeriodEndTimeDayjs, getAuctionStatus]);

  return (
    <NftPageContext.Provider
      value={{
        auctionStatus,
        editionBuyerInfoQueryRef: props.editionBuyerInfoQueryRef,
        isAuctionEnded:
          auctionEndTime == null || auctionStatus === AuctionStatus.Completed,
        loadClaimsQuery: props.loadClaimsQuery,
        loadEditionBuyerInfoQuery: props.loadEditionBuyerInfoQuery,
        loadNftQuery: props.loadNftQuery,
        nftCampaignQueryRef: props.nftCampaignQueryRef,
        triggerAuctionStatusUpdate: () => setUpdateTrigger(updateTrigger + 1),
      }}
    >
      {props.children}
    </NftPageContext.Provider>
  );
}
