/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  FundingTierNftsContext_CampaignFundingTierStandard$data,
  FundingTierNftsContext_CampaignFundingTierStandard$key,
} from "components/pages/campaign/edit/funding-tiers/__generated__/FundingTierNftsContext_CampaignFundingTierStandard.graphql";
import { CampaignFundingTierManageNftsModalUpdateMutation$data } from "components/pages/campaign/edit/funding-tiers/__generated__/CampaignFundingTierManageNftsModalUpdateMutation.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

// TODO[@bryancho]: refactor to share more code with SeriesNftContext
type ItemMetadataAccount = {
  metadataAccount: Exclude<
    FundingTierNftsContext_CampaignFundingTierStandard$data["metadataAccounts"],
    null
  >["edges"][0]["node"];

  metadataAccountId: string;
  mint: string;
};

const fundingTierMetadataFragment = graphql`
  fragment FundingTierNftsContext_CampaignFundingTierStandard on CampaignFundingTierStandard {
    id
    nftOrder
    # We want to be able to manage all the NFTs in the funding tier
    # If this becomes a performance issue, may need to consider a different approach
    metadataAccounts(first: 300) {
      edges {
        node {
          id
          nft {
            id
          }
          mint
          ...GenericNftSearchRow_MetadataAccount
          ...GenericNftSearchDndRow_MetadataAccount
        }
      }
    }
  }
`;

export type Item = {
  id: string;
} & ItemMetadataAccount;

export type FundingTierNftsContextData = {
  allowDelete: boolean;
  appendItem: (item: Item) => void;
  items: Array<Item>;
  locallyAddedItems: Array<Item>;
  locallyRemovedItems: Array<Item>;
  removeItem: (metadataAccountId: string) => void;
  resetItems: () => void;
  resetItemsUsingResponse: (
    fundingTierData: CampaignFundingTierManageNftsModalUpdateMutation$data["CampaignsNamespace"]["updateCampaignFundingTierNfts"]["campaignFundingTier"]
  ) => void;
  setItems: Dispatch<SetStateAction<Array<Item>>>;
};

const defaultData = {
  allowDelete: true,
  appendItem: emptyFunction,
  items: [],
  locallyAddedItems: [],
  locallyRemovedItems: [],
  removeItem: emptyFunction,
  resetItems: emptyFunction,
  resetItemsUsingResponse: emptyFunction,
  setItems: emptyFunction,
};

function getItemsInFundingTier({
  metadataAccounts,
  nftOrder,
}: {
  metadataAccounts:
    | FundingTierNftsContext_CampaignFundingTierStandard$data["metadataAccounts"]
    | CampaignFundingTierManageNftsModalUpdateMutation$data["CampaignsNamespace"]["updateCampaignFundingTierNfts"]["campaignFundingTier"]["metadataAccountsMutationResponse"];
  nftOrder: Maybe<ReadonlyArray<string>>;
}) {
  const itemsInFundingTier = (
    metadataAccounts?.edges.map(({ node }) => node) ?? []
  ).map((node) => ({
    id: node.nft.id,
    metadataAccount: node,
    metadataAccountId: node.id,
    mint: node.mint,
  }));
  if (nftOrder != null) {
    itemsInFundingTier.sort(
      (a, b) => nftOrder.indexOf(a.id) - nftOrder.indexOf(b.id)
    );
  }
  return itemsInFundingTier;
}

export const FundingTierNftsContext: Context<FundingTierNftsContextData> =
  createContext<FundingTierNftsContextData>(defaultData);

export function FundingTierNftsContextProvider({
  allowDelete = true,
  fundingTier,
  children,
}: {
  allowDelete?: boolean;
  children: any;
  fundingTier: FundingTierNftsContext_CampaignFundingTierStandard$key;
}) {
  const [locallyRemovedItems, setLocallyRemovedItems] = useState<Array<Item>>(
    []
  );
  const [locallyAddedItems, setLocallyAddedItems] = useState<Array<Item>>([]);

  const fundingTierData = useFragment(fundingTierMetadataFragment, fundingTier);
  const defaultItemsInFundingTier = getItemsInFundingTier(fundingTierData);
  const [items, setItems] = useState<Array<Item>>(defaultItemsInFundingTier);

  const resetItems = () => {
    const itemsInFundingTier = getItemsInFundingTier(fundingTierData);
    setLocallyRemovedItems([]);
    setLocallyAddedItems([]);
    setItems(itemsInFundingTier);
  };
  const resetItemsUsingResponse = (
    fundingTierResponseData: CampaignFundingTierManageNftsModalUpdateMutation$data["CampaignsNamespace"]["updateCampaignFundingTierNfts"]["campaignFundingTier"]
  ) => {
    const itemsInFundingTier = getItemsInFundingTier({
      metadataAccounts:
        fundingTierResponseData.metadataAccountsMutationResponse,
      nftOrder: fundingTierResponseData.nftOrder ?? null,
    });
    setLocallyRemovedItems([]);
    setLocallyAddedItems([]);
    setItems(itemsInFundingTier);
  };
  return (
    <FundingTierNftsContext.Provider
      value={{
        allowDelete,
        appendItem: (item: Item) => {
          setLocallyRemovedItems(
            locallyRemovedItems.filter(
              (locallyRemovedItem) =>
                locallyRemovedItem.metadataAccountId !== item.metadataAccountId
            )
          );
          setLocallyAddedItems([...locallyAddedItems, item]);
          setItems([...items, item]);
        },
        items,
        locallyAddedItems,
        locallyRemovedItems,
        removeItem: (metadataAccountId: string) => {
          setItems(
            items.filter((item) => item.metadataAccountId !== metadataAccountId)
          );
          setLocallyAddedItems(
            locallyAddedItems.filter(
              (locallyAddedItem) =>
                locallyAddedItem.metadataAccountId !== metadataAccountId
            )
          );
          const removedItem = items.find(
            (item) => item.metadataAccountId === metadataAccountId
          );
          if (removedItem != null) {
            setLocallyRemovedItems([...locallyRemovedItems, removedItem]);
          }
        },
        resetItems,
        resetItemsUsingResponse,
        setItems,
      }}
    >
      {children}
    </FundingTierNftsContext.Provider>
  );
}
