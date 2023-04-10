/* eslint-disable react/jsx-no-constructed-context-values */
import { Context, createContext, useState } from "react";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import RelayConnection from "types/enums/RelayConnection";
import RelayKeyedConnection from "types/enums/RelayKeyedConnection";

export type RelayConnectionIdsContextData = {
  [key in RelayConnection]: {
    connectionId: Maybe<string>;
    setConnectionId: (val: string) => void;
  };
} & {
  [key in RelayKeyedConnection]: {
    getConnectionId: (key: string) => MaybeUndef<string>;
    setConnectionId: (key: string, val: string) => void;
  };
};

export const RelayConnectionIdsContext: Context<RelayConnectionIdsContextData> =
  createContext<RelayConnectionIdsContextData>({
    [RelayConnection.EditionsForMasterEditionMint]: {
      connectionId: null,
      setConnectionId: emptyFunction,
    },
    [RelayConnection.NftTransactions]: {
      connectionId: null,
      setConnectionId: emptyFunction,
    },
    [RelayConnection.CampaignPosts]: {
      connectionId: null,
      setConnectionId: emptyFunction,
    },
    [RelayKeyedConnection.PostComments]: {
      getConnectionId: (_key: string) => null,
      setConnectionId: emptyFunction,
    },
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function RelayConnectionIdsProvider(props: ProviderProps): JSX.Element {
  const [nftTransactionsConnectionId, setNftTransactionsConnectionId] =
    useState<Maybe<string>>(null);
  const [
    editionsForMasterEditionMintConnectionId,
    setEditionsForMasterEditionMintConnectionId,
  ] = useState<Maybe<string>>(null);
  const [campaignPostsConnectionId, setCampaignPostsConnectionId] =
    useState<Maybe<string>>(null);
  const [postCommentsConnectionIds, setPostCommentsConnectionIds] = useState<{
    [key: string]: Maybe<string>;
  }>({});

  return (
    <RelayConnectionIdsContext.Provider
      value={{
        [RelayConnection.EditionsForMasterEditionMint]: {
          connectionId: editionsForMasterEditionMintConnectionId,
          setConnectionId: setEditionsForMasterEditionMintConnectionId,
        },
        [RelayConnection.NftTransactions]: {
          connectionId: nftTransactionsConnectionId,
          setConnectionId: setNftTransactionsConnectionId,
        },
        [RelayConnection.CampaignPosts]: {
          connectionId: campaignPostsConnectionId,
          setConnectionId: setCampaignPostsConnectionId,
        },
        [RelayKeyedConnection.PostComments]: {
          getConnectionId: (key: string) => postCommentsConnectionIds[key],
          setConnectionId: (key: string, val: string) =>
            setPostCommentsConnectionIds({
              ...postCommentsConnectionIds,
              [key]: val,
            }),
        },
      }}
    >
      {props.children}
    </RelayConnectionIdsContext.Provider>
  );
}
