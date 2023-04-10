import graphql from "babel-plugin-relay/macro";
import styles from "css/modal/DiscordAuthModal.module.css";
import GenericModal from "components/modal/GenericModal";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import Body1 from "components/text/Body1";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import DISCORD_INVITE_LINK from "constants/DiscordInviteLink";
import DiscordOnboardingStatus from "types/enums/DiscordOnboardingStatus";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import DiscordRoleId from "formfn-shared/dist/types/enums/DiscordRoleId";
import { useFragment, useMutation } from "react-relay";
import {
  DiscordAuthConnectModalConnectMutation,
  RedirectLocation_enum,
} from "components/modal/__generated__/DiscordAuthConnectModalConnectMutation.graphql";
import {
  DiscordAuthConnectModal_User$data,
  DiscordAuthConnectModal_User$key,
} from "components/modal/__generated__/DiscordAuthConnectModal_User.graphql";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ErrorMessage from "components/text/ErrorMessage";
import {
  DiscordAuthConnectModalCheckJoinedDiscordMutation,
  DiscordAuthConnectModalCheckJoinedDiscordMutation$data,
} from "components/modal/__generated__/DiscordAuthConnectModalCheckJoinedDiscordMutation.graphql";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Header3 from "components/text/Header3";
import dayjs from "utils/dates/dayjsex";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { ParsedDiscordAuthParams } from "types/ParsedDiscordAuthParams";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import toObject from "formfn-shared/dist/utils/toObject";
import useDiscordAuthContext from "hooks/useDiscordAuthContext";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

// Note: Arbitrary, poll every 5 seconds with a limit of 30 seconds.
const POLL_MUTATION_DELAY = dayjs.duration({ seconds: 5 });
const POLL_MUTATION_RETRY_LIMIT = 6;

const fragment = graphql`
  fragment DiscordAuthConnectModal_User on User {
    id

    isWhitelisted

    DiscordAuth {
      id

      hasConnectedDiscordAccount
      hasJoinedDiscordServer
    }
  }
`;

const connectSocialNetworkMutation = graphql`
  mutation DiscordAuthConnectModalConnectMutation(
    $input: ConnectSocialNetworkInput!
  ) {
    connectSocialNetwork(input: $input) {
      authLink
    }
  }
`;

const updateRolesForUserMutation = graphql`
  mutation DiscordAuthConnectModalCheckJoinedDiscordMutation {
    updateDiscordRolesForUser {
      __typename

      ... on UpdateDiscordRolesForUserResponseSuccess {
        roleIds
      }
      ... on UpdateDiscordRolesForUserResponseFailure {
        reason
      }
    }
  }
`;

function getDiscordOnboardingStatus({
  discordAuth,
  isPollingServerForUser,
}: {
  discordAuth: DiscordAuthConnectModal_User$data["DiscordAuth"];
  isPollingServerForUser: boolean;
}) {
  if (isPollingServerForUser) {
    return DiscordOnboardingStatus.CheckingServer;
  }

  if (discordAuth == null) {
    return DiscordOnboardingStatus.Connect;
  }

  const { hasConnectedDiscordAccount, hasJoinedDiscordServer } = discordAuth;
  if (!hasConnectedDiscordAccount) {
    return DiscordOnboardingStatus.Connect;
  }

  if (!hasJoinedDiscordServer) {
    return DiscordOnboardingStatus.Join;
  }

  return DiscordOnboardingStatus.Complete;
}

function getModalTitleFromOnboardingStatus(
  status: DiscordOnboardingStatus,
  isJoinDiscordOnly: boolean
) {
  switch (status) {
    case DiscordOnboardingStatus.Connect:
      return "1. Connect to Discord";
    case DiscordOnboardingStatus.Join:
      return `${
        isJoinDiscordOnly ? "" : "2. "
      }Join our Discord server & claim roles`;
    case DiscordOnboardingStatus.CheckingServer:
      return "Checking your status in the Discord server...";
    case DiscordOnboardingStatus.Complete:
      return "Connection successful!";
    default:
      return assertUnreachable(status);
  }
}

function isResponseSuccessfulWithExpectedRoles(
  data: DiscordAuthConnectModalCheckJoinedDiscordMutation$data,
  isWhitelisted: boolean
) {
  const typename = data.updateDiscordRolesForUser.__typename;
  switch (typename) {
    case "UpdateDiscordRolesForUserResponseSuccess": {
      // If the user is a collector, no roles are expected.
      // If they are an artist, we expect them to have the VerifiedArtist role.
      const { roleIds } = data.updateDiscordRolesForUser;
      return (
        !isWhitelisted || new Set(roleIds).has(DiscordRoleId.VerifiedArtist)
      );
    }
    case "UpdateDiscordRolesForUserResponseFailure":
    case RELAY_FUTURE_UNION_VALUE:
      return false;
    default:
      return assertUnreachable(typename);
  }
}

type SetIntervalType = ReturnType<typeof setInterval>;

type ModalBodyProps = {
  callbackQueryParams: Maybe<ParsedDiscordAuthParams>;
  onHide: () => void;
  onboardingStatus: DiscordOnboardingStatus;
  redirectLocation: RedirectLocation_enum;
  setIsPollingServerForUser: Dispatch<SetStateAction<boolean>>;
  user: DiscordAuthConnectModal_User$key;
};

function ModalBody({
  callbackQueryParams,
  onboardingStatus,
  onHide,
  redirectLocation,
  setIsPollingServerForUser,
  user,
}: ModalBodyProps) {
  const retryIntervalIdRef = useRef<Maybe<SetIntervalType>>(null);
  const retryLimitRef = useRef(POLL_MUTATION_RETRY_LIMIT);
  const [isLoading, setIsLoading] = useState(false);
  const [showMutationError, setShowMutationError] =
    useState<Maybe<boolean>>(false);

  const userData = useFragment(fragment, user);
  const [connectSocialNetwork] =
    useMutation<DiscordAuthConnectModalConnectMutation>(
      connectSocialNetworkMutation
    );
  const [updateRolesForUser] =
    useMutation<DiscordAuthConnectModalCheckJoinedDiscordMutation>(
      updateRolesForUserMutation
    );

  const handleClearInterval = () => {
    if (retryIntervalIdRef.current !== null) {
      clearInterval(retryIntervalIdRef.current);
    }
  };

  // Clear the interval timer if the component unmounts.
  useEffect(() => handleClearInterval, []);

  const getMutationUpdater =
    (shouldShowErrorStatus = false) =>
    (
      store: RecordSourceSelectorProxy<DiscordAuthConnectModalCheckJoinedDiscordMutation$data>,
      data: DiscordAuthConnectModalCheckJoinedDiscordMutation$data
    ) => {
      const success = isResponseSuccessfulWithExpectedRoles(
        data,
        userData.isWhitelisted
      );

      if (!success) {
        // If we are not polling, we want to display error status.
        if (shouldShowErrorStatus) {
          setShowMutationError(true);
          setIsPollingServerForUser(false);
        }

        return;
      }

      handleClearInterval();
      setIsPollingServerForUser(false);

      if (userData.DiscordAuth == null) {
        return;
      }

      const discordAuthRecord = store.get(userData.DiscordAuth.id);
      if (discordAuthRecord == null) {
        return;
      }

      discordAuthRecord.setValue(true, "hasJoinedDiscordServer");
      discordAuthRecord.setValue(true, "hasConnectedDiscordAccount");
    };

  const pollMutation = () => {
    handleClearInterval();
    setShowMutationError(false);
    setIsPollingServerForUser(true);
    retryLimitRef.current = POLL_MUTATION_RETRY_LIMIT;

    const newIntervalId = setInterval(() => {
      if (retryLimitRef.current === 0) {
        handleClearInterval();
        setShowMutationError(true);
        setIsPollingServerForUser(false);
        logError(
          AnalyticsEvent.DiscordAuthRetryLimitReached,
          "Retry limit reached for DiscordAuth updateRolesForUser mutation.",
          {
            retryDelayInSeconds: POLL_MUTATION_DELAY.asSeconds(),
            retryLimit: POLL_MUTATION_RETRY_LIMIT,
            userData: toObject(userData),
          }
        );
        return;
      }

      updateRolesForUser({ updater: getMutationUpdater(), variables: {} });
      retryLimitRef.current -= 1;
    }, POLL_MUTATION_DELAY.asMilliseconds());

    retryIntervalIdRef.current = newIntervalId;
  };

  const shouldShowEditWarningMessage =
    redirectLocation === "Apply" || redirectLocation === "EditProfile";
  switch (onboardingStatus) {
    case DiscordOnboardingStatus.Connect:
      return (
        <>
          <Body1 className={styles.subtext} colorClass={ColorClass.Secondary}>
            {shouldShowEditWarningMessage &&
              "Make sure all your changes on this page have been saved before connecting your Discord. "}
            This will verify your account so that the Discord icon will be shown
            on your profile.
          </Body1>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.button}
            fontClass={FontClass.NavLink}
            onClick={() => {
              setIsLoading(true);
              connectSocialNetwork({
                onCompleted: (response) => {
                  window.location.replace(
                    response.connectSocialNetwork.authLink
                  );
                },
                onError: () => {
                  notifyUnexpectedError();
                  setIsLoading(false);
                },
                variables: {
                  input: {
                    redirectLocation,
                    socialNetworkType: "Discord",
                    userId: userData.id,
                  },
                },
              });
            }}
            isLoading={isLoading}
          >
            Connect to Discord
          </ButtonWithText>
          {callbackQueryParams != null && !callbackQueryParams.success && (
            <ErrorMessage fontClass={FontClass.Body1}>
              {callbackQueryParams.failureReason ??
                "An unexpected error occurred."}
            </ErrorMessage>
          )}
        </>
      );
    case DiscordOnboardingStatus.Join:
      return (
        <>
          <Body1 className={styles.subtext} colorClass={ColorClass.Secondary}>
            If you are a verified artist, this step will also give you the
            Discord roles to access the private verified artist channels.
          </Body1>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.button}
            fontClass={FontClass.NavLink}
            href={DISCORD_INVITE_LINK}
            onClick={pollMutation}
            type="link_external"
          >
            Join Discord
          </ButtonWithText>
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            className={styles.textButton}
            fontClass={FontClass.Body1}
            onClick={() => {
              setShowMutationError(false);
              setIsPollingServerForUser(true);
              updateRolesForUser({
                onError: (_) => {
                  setShowMutationError(true);
                  setIsPollingServerForUser(false);
                },
                updater: getMutationUpdater(true),
                variables: {},
              });
            }}
          >
            I&apos;ve already joined!
          </TextButton>
          {showMutationError && (
            <ErrorMessage fontClass={FontClass.Body1}>
              We couldn&apos;t verify that you are in the server, please try
              again.
            </ErrorMessage>
          )}
        </>
      );
    case DiscordOnboardingStatus.CheckingServer: {
      return (
        <>
          <Body1 className={styles.subtext} colorClass={ColorClass.Secondary}>
            Please accept the Discord invite on the new tab. Didn&apos;t get
            one?{" "}
            <TextButton
              buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
              display="inline"
              href={DISCORD_INVITE_LINK}
              onClick={pollMutation}
              type="link_external"
            >
              Open a new invite
            </TextButton>
          </Body1>
          <div className={styles.loading}>
            <Body1 colorClass={ColorClass.BrightPurple}>
              Checking your status in the Discord server...
            </Body1>
            <LoadingSpinner
              colorValue={ColorValue.BrightPurple}
              style={{ marginTop: 24 }}
            />
          </div>
        </>
      );
    }
    case DiscordOnboardingStatus.Complete: {
      return (
        <>
          {userData.isWhitelisted && (
            <Body1 className={styles.subtext} colorClass={ColorClass.Secondary}>
              You should now have access to the private verified artist channels
              in the Discord server.
            </Body1>
          )}
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.button}
            fontClass={FontClass.NavLink}
            onClick={onHide}
          >
            Ok
          </ButtonWithText>
        </>
      );
    }
    default:
      return assertUnreachable(onboardingStatus);
  }
}

type Props = {
  user: DiscordAuthConnectModal_User$key;
};

export default function DiscordAuthConnectModal({ user }: Props): JSX.Element {
  const {
    redirectLocation,
    onlyDisplayJoinDiscordSteps,
    callbackQueryParams,
    isDiscordAuthConnectModalShown,
    hideDiscordAuthConnectModal,
  } = useDiscordAuthContext();

  const [isPollingServerForUser, setIsPollingServerForUser] = useState(false);
  const userData = useFragment(fragment, user);
  const onboardingStatus = getDiscordOnboardingStatus({
    discordAuth: userData.DiscordAuth,
    isPollingServerForUser,
  });

  const onHide = () => {
    setIsPollingServerForUser(false);
    hideDiscordAuthConnectModal(false);
  };

  const title = getModalTitleFromOnboardingStatus(
    onboardingStatus,
    onlyDisplayJoinDiscordSteps
  );

  return (
    <GenericModal
      className={styles.modal}
      isShown={isDiscordAuthConnectModalShown}
      onHide={onHide}
      title={
        isPollingServerForUser ? (
          <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
        ) : (
          title
        )
      }
    >
      <div className={styles.body}>
        <ModalBody
          callbackQueryParams={callbackQueryParams}
          onboardingStatus={onboardingStatus}
          onHide={onHide}
          redirectLocation={redirectLocation}
          setIsPollingServerForUser={setIsPollingServerForUser}
          user={user}
        />
      </div>
    </GenericModal>
  );
}
