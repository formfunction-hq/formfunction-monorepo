import styles from "css/modal/ChangeNotificationUserPreferencesModal.module.css";
import graphql from "babel-plugin-relay/macro";
import GenericModal from "components/modal/GenericModal";
import useNotificationUserPreferences, {
  notificationUserPreferencesQuery,
} from "hooks/useNotificationUserPreferences";
import useUserContext from "hooks/useUserContext";
import {
  PreloadedQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from "react-relay";
import {
  NotificationChannel_enum,
  useNotificationUserPreferencesQuery,
} from "hooks/__generated__/useNotificationUserPreferencesQuery.graphql";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import {
  ChangeNotificationUserPreferencesModal_NotificationUserPreference$data,
  ChangeNotificationUserPreferencesModal_NotificationUserPreference$key,
} from "components/modal/__generated__/ChangeNotificationUserPreferencesModal_NotificationUserPreference.graphql";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import NOTIFICATION_TYPES from "constants/NotificationTypes";
import getEmailConfigForNotificationType, {
  EmailConfig,
} from "utils/email/getEmailConfigForNotificationType";
import EmailToggle from "types/enums/EmailToggle";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import EmailSection from "types/enums/EmailSection";
import objectEntries from "formfn-shared/dist/utils/object/objectEntries";
import FontClass from "types/enums/FontClass";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import NotificationType_enum from "types/relay/NotificationType_enum";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import {
  ChangeNotificationUserPreferencesModalMutation,
  NotificationUserPreference_insert_input,
} from "components/modal/__generated__/ChangeNotificationUserPreferencesModalMutation.graphql";
import { notify } from "components/toast/notifications";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import ToggleButtons, { ToggleOption } from "components/buttons/ToggleButtons";
import TinyLabel from "components/text/TinyLabel";
import flattenArrayOfObjectsToObject from "formfn-shared/dist/utils/object/flattenArrayOfObjectsToObject";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment ChangeNotificationUserPreferencesModal_NotificationUserPreference on NotificationUserPreference
  @relay(plural: true) {
    enabled
    notificationType
    notificationChannel
  }
`;

const mutation = graphql`
  mutation ChangeNotificationUserPreferencesModalMutation(
    $objects: [NotificationUserPreference_insert_input!]!
    $on_conflict: NotificationUserPreference_on_conflict
  ) {
    insert_NotificationUserPreference(
      objects: $objects
      on_conflict: $on_conflict
    ) {
      returning {
        __typename
      }
    }
  }
`;

type NotificationChannelToEnable = Partial<
  Record<NotificationChannel_enum, boolean>
>;

type NotificationSettings = Partial<
  Record<NotificationType_enum, NotificationChannelToEnable>
>;

const getNotificationSettings = (
  notificationUserPreferencesData: ChangeNotificationUserPreferencesModal_NotificationUserPreference$data
): NotificationSettings =>
  flattenArrayOfObjectsToObject(
    NOTIFICATION_TYPES.map((notificationType) => {
      const notificationActivity = notificationUserPreferencesData.find(
        (n) =>
          n.notificationType === notificationType &&
          n.notificationChannel === "ActivityFeed"
      );
      const notificationEmail = notificationUserPreferencesData.find(
        (n) =>
          n.notificationType === notificationType &&
          n.notificationChannel === "Email"
      );
      const isActivityEnabled =
        notificationActivity == null || notificationActivity.enabled === true;

      const isEmailEnabled =
        notificationEmail == null || notificationEmail.enabled === true;

      return {
        [notificationType]: {
          ActivityFeed: isActivityEnabled,
          Email: isEmailEnabled,
        },
      };
    })
  );

function NotificationPreferenceToggle({
  notificationSettings,
  notificationTypes,
  setNotificationSettings,
  toggle,
  toggleDisabled,
}: {
  notificationSettings: NotificationSettings;
  notificationTypes: Array<NotificationType_enum>;
  setNotificationSettings: Dispatch<SetStateAction<NotificationSettings>>;
  toggle: EmailToggle;
  toggleDisabled: boolean;
}) {
  const emailEnabled = notificationTypes.some(
    (notificationType) => notificationSettings[notificationType]?.Email === true
  );
  const activityEnabled = notificationTypes.some(
    (notificationType) =>
      notificationSettings[notificationType]?.ActivityFeed === true
  );

  return (
    <ToggleButtons
      fontClass={FontClass.Body1}
      label={toggle}
      toggles={[
        { name: "Email", value: emailEnabled },
        { name: "ActivityFeed", value: activityEnabled },
      ]}
      toggleDisabled={toggleDisabled}
      onChange={(notificationChannelOptions: Array<ToggleOption>) => {
        const newNotificationChannels = flattenArrayOfObjectsToObject(
          notificationChannelOptions.map((option) => ({
            [option.name]: option.value,
          }))
        );
        setNotificationSettings((prevNotificationSettings) => {
          // For all notification types, create an object with notificationType as the key and a Record<NotificationChannel_enum, boolean> as the value

          const newNotificationSettings = flattenArrayOfObjectsToObject(
            notificationTypes.map((notificationType) => ({
              [notificationType]: newNotificationChannels,
            }))
          );
          return {
            ...prevNotificationSettings,
            ...newNotificationSettings,
          };
        });
      }}
    />
  );
}

function Content({
  notificationUserPreferences,
  onHide,
  setFetchKey,
}: {
  notificationUserPreferences: ChangeNotificationUserPreferencesModal_NotificationUserPreference$key;
  onHide: () => void;
  setFetchKey: Dispatch<SetStateAction<number>>;
}) {
  const { userId } = useUserContext();
  const notificationUserPreferencesData = useFragment(
    fragment,
    notificationUserPreferences
  );
  const [commit, inFlight] =
    useMutation<ChangeNotificationUserPreferencesModalMutation>(mutation);
  const [notificationSettings, setNotificationSettings] = useState(
    // Note that if there is no row in NotificationUserPreference for a
    // userId/notificationType/notificationChannel combo, it means the notification is enabled
    // for that user and channel
    getNotificationSettings(notificationUserPreferencesData)
  );

  const emailConfigsByToggle = filterNulls(
    NOTIFICATION_TYPES.map((notificationType) =>
      getEmailConfigForNotificationType(notificationType)
    )
  ).reduce(
    (result, curVal) => ({ ...result, [curVal.toggle]: curVal }),
    {} as { [key in EmailToggle]: EmailConfig }
  );

  const toggles = Object.values(emailConfigsByToggle).map(
    ({ toggle }) => toggle
  );
  const togglesBySection = groupBy(
    toggles,
    (toggle: EmailToggle) => emailConfigsByToggle[toggle].section
  );
  const notificationTypesByToggle = groupBy(
    NOTIFICATION_TYPES,
    (email) => getEmailConfigForNotificationType(email)?.toggle ?? null
  );

  const emailSectionOrder = Object.values(EmailSection);
  const sortedSections = objectEntries(togglesBySection).sort(
    (a, b) =>
      emailSectionOrder.indexOf(a[0] as EmailSection) -
      emailSectionOrder.indexOf(b[0] as EmailSection)
  );

  return (
    <div className={styles.modal}>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        Choose which email and activity notifications you want to receive.
      </Body1>

      {sortedSections.map(([section, togglesInner]) => (
        <div key={section} className={styles.section}>
          <div className={styles.sectionHeader}>
            <ArtName colorClass={ColorClass.Primary}>{section}</ArtName>
            <div className={styles.toggleOptionsHeader}>
              <TinyLabel colorClass={ColorClass.Secondary}>Email</TinyLabel>
              <TinyLabel colorClass={ColorClass.Secondary}>Activity</TinyLabel>
            </div>
          </div>
          {togglesInner
            .sort(
              (a: EmailToggle, b: EmailToggle) =>
                emailConfigsByToggle[a].sectionIndex -
                emailConfigsByToggle[b].sectionIndex
            )
            .map((toggle: EmailToggle) => (
              <NotificationPreferenceToggle
                notificationSettings={notificationSettings}
                key={toggle}
                notificationTypes={notificationTypesByToggle[toggle]}
                setNotificationSettings={setNotificationSettings}
                toggle={toggle}
                toggleDisabled={false}
              />
            ))}
        </div>
      ))}
      <div className={styles.saveButtonContainer}>
        <ButtonWithText
          isLoading={inFlight}
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.saveButton}
          fontClass={FontClass.NavLink}
          onClick={() => {
            commit({
              onCompleted: () => {
                notify({ message: "Notification preferences saved!" });
                onHide();
                setFetchKey((curr) => curr + 1);
              },
              onError: () => {
                notifyUnexpectedError();
              },
              variables: {
                objects: NOTIFICATION_TYPES.filter(
                  (notifType) => notifType !== RELAY_FUTURE_ADDED_VALUE
                ).reduce((acc, notificationType) => {
                  const notification = notificationSettings[notificationType];
                  return [
                    ...acc,
                    {
                      enabled: notification?.ActivityFeed === true,
                      notificationChannel: "ActivityFeed",
                      notificationType,
                      userId,
                    },
                    {
                      enabled: notification?.Email === true,
                      notificationChannel: "Email",
                      notificationType,
                      userId,
                    },
                  ];
                }, [] as Array<NotificationUserPreference_insert_input>),
                on_conflict: {
                  constraint: "NotificationUserPreference_pkey",
                  update_columns: ["enabled"],
                },
              },
            });
          }}
        >
          Save
        </ButtonWithText>
      </div>
    </div>
  );
}

function DataLoader({
  notificationUserPreferencesQueryRef,
  onHide,
  setFetchKey,
}: {
  notificationUserPreferencesQueryRef: PreloadedQuery<useNotificationUserPreferencesQuery>;
  onHide: () => void;
  setFetchKey: Dispatch<SetStateAction<number>>;
}) {
  const data = usePreloadedQuery<useNotificationUserPreferencesQuery>(
    notificationUserPreferencesQuery,
    notificationUserPreferencesQueryRef
  );
  return (
    <Content
      notificationUserPreferences={data.NotificationUserPreference}
      onHide={onHide}
      setFetchKey={setFetchKey}
    />
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function ChangeNotificationUserPreferencesModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  const { userId } = useUserContext();
  const [fetchKey, setFetchKey] = useState(0);
  const notificationUserPreferencesQueryRef = useNotificationUserPreferences(
    userId!,
    fetchKey
  );

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Notification preferences"
    >
      {notificationUserPreferencesQueryRef != null && (
        <Suspense
          fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
        >
          <DataLoader
            notificationUserPreferencesQueryRef={
              notificationUserPreferencesQueryRef
            }
            onHide={onHide}
            setFetchKey={setFetchKey}
          />
        </Suspense>
      )}
    </GenericModal>
  );
}
