/* eslint-disable react/jsx-no-constructed-context-values */
import graphql from "babel-plugin-relay/macro";
import {
  UserContextQuery,
  UserContextQuery$data,
} from "context/__generated__/UserContextQuery.graphql";
import usePollingFetchKey from "hooks/usePollingFetchKey";
import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import { Context, createContext, Suspense, useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import dayjs from "utils/dates/dayjsex";

import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useLDClient } from "launchdarkly-react-client-sdk";
import getCustomLdUserAttributes from "utils/launch-darkly/getCustomLdUserAttributes";
import getLocalStorage from "utils/local-storage/getLocalStorage";
import LocalStorageKey from "types/enums/LocalStorageKey";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import mixpanel from "mixpanel-browser";
import trackMixpanelEvent from "utils/mixpanel/trackMixpanelEvent";
import MixpanelEvent from "types/enums/MixpanelEvent";

const query = graphql`
  # TODO[@][Relay]: Consider refactoring to use a fragment.
  # eslint-disable-next-line relay/unused-fields
  query UserContextQuery($input: UserForIdInput!) {
    UserQueries {
      userForId(input: $input) {
        user {
          id
          email
          isCollector
          isWhitelisted
          username
          hasCompletedSignup
          hasTakenCollectorSurvey2023
          hasTakenCreatorSurvey2023
          shouldBlurNsfwContent

          ProfilePhoto {
            photoUrl
          }
        }
      }
    }
  }
`;

export type User = UserContextQuery$data["UserQueries"]["userForId"]["user"];

export type UserContextData = {
  profileHref: string;
  setUser: (user: MaybeUndef<User>) => void;
  user: MaybeUndef<User>;
  // Available before user, because it just reads from local storage. If you need
  // to use userId as input for a GraphQL query, prefer userId to user?.id.
  userId: Maybe<string>;
};

export const UserContext: Context<UserContextData> =
  createContext<UserContextData>({
    profileHref: "/profile",
    setUser: emptyFunction,
    user: undefined,
    userId: null,
  });

function Inner() {
  const { anchorWallet } = useSolanaContext();
  const fetchKey = usePollingFetchKey(dayjs.duration({ seconds: 30 }));
  const data = useLazyLoadQuery<UserContextQuery>(
    query,
    {
      // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
      [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
      input: {
        id: anchorWallet?.publicKey.toString() ?? "",
      },
    },
    {
      fetchKey,
    }
  );
  const { setUser } = useUserContext();
  const ldClient = useLDClient();

  useEffect(() => {
    async function run() {
      if (anchorWallet !== undefined) {
        const { user } = data.UserQueries.userForId;
        const { id: userId } = user ?? {};

        const custom = getCustomLdUserAttributes(user);
        if (userId != null) {
          try {
            await ldClient?.identify({
              custom: custom ?? {},
              email: user!.email ?? undefined,
              key: userId,
              name: user!.username,
            });
            mixpanel.identify(userId);
            trackMixpanelEvent(MixpanelEvent.UserInfoLoaded);
          } catch (e: any) {
            // Log error and swallow exception
            logError(AnalyticsEvent.LaunchDarklyError, e);
          }
        }
        setUser(user);
      }
    }
    run();
  }, [anchorWallet, data.UserQueries.userForId, ldClient, setUser]);

  return null;
}

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function UserContextProvider(props: ProviderProps): JSX.Element {
  const [user, setUser] = useState<MaybeUndef<User>>(undefined);
  const { anchorWallet } = useSolanaContext();

  return (
    <UserContext.Provider
      value={{
        profileHref:
          user != null ? getUserProfileLinkRelative(user.username) : "/profile",
        setUser,
        user,
        userId: getLocalStorage(LocalStorageKey.PublicKey),
      }}
    >
      <Suspense fallback={null}>
        {/* If anchorWallet is undefined, kicking off the query in Inner is unnecessary and wasteful */}
        {anchorWallet !== undefined && <Inner />}
      </Suspense>
      {props.children}
    </UserContext.Provider>
  );
}
