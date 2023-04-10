import graphql from "babel-plugin-relay/macro";
import PlainButton from "components/buttons/PlainButton";
import RadioButtonWithInput from "components/buttons/RadioButtonWithInput";
import PlusIcon from "components/icons/PlusIcon";
import WalletAddressInput from "components/input/WalletAddressInput";
import {
  AudienceSelectInputQuery,
  AudienceSelectInputQuery$data,
} from "components/input/__generated__/AudienceSelectInputQuery.graphql";
import FlexBox from "components/layout/FlexBox";
import LoadingSpinner from "components/loading/LoadingSpinner";
import Body2 from "components/text/Body2";
import UserSearchBar from "components/user/UserSearchBar";
import useBreakpoint from "hooks/useBreakpoint";
import useUserSearchBarUserExpress from "hooks/useUserSearchBarUserExpress";
import useUserSearchContext from "hooks/useUserSearchContext";
import useViewerId from "hooks/useViewerId";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import AudienceInputOption from "types/enums/AudienceInputOption";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

const query = graphql`
  query AudienceSelectInputQuery(
    $holdersForUserInput: HoldersForUserInput!
    $seriesHoldersForUserInput: SeriesHoldersForUserInput!
  ) {
    HolderQueries {
      holdersForUser(input: $holdersForUserInput) {
        holders {
          user {
            ...useUserSearchBarUserExpress_UserExpress
          }
        }
      }

      seriesHoldersForUser(input: $seriesHoldersForUserInput) {
        seriesHolders {
          series {
            id
            name
          }
          holders {
            user {
              ...useUserSearchBarUserExpress_UserExpress
            }
          }
        }
      }
    }
  }
`;

function AddUsersButton({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <PlainButton onClick={onClick}>
      <FlexBox alignItems="center" flexDirection="row" gap={8}>
        <PlusIcon colorValue={ColorValue.BrightPurple} />
        <Body2 colorClass={ColorClass.Primary}>{text}</Body2>
      </FlexBox>
    </PlainButton>
  );
}

function AddAllHoldersButton({
  queryData,
}: {
  queryData: AudienceSelectInputQuery$data["HolderQueries"]["holdersForUser"];
}) {
  const { addUsersUnique } = useUserSearchContext();
  const userData = useUserSearchBarUserExpress(
    queryData.holders?.map((item) => item.user) ?? null
  );
  if (userData == null || userData.length === 0) {
    return null;
  }

  return (
    <AddUsersButton
      onClick={() => {
        addUsersUnique(userData.map((user) => user));
      }}
      text="Add all of my holders"
    />
  );
}

function AddSeriesHoldersButton({
  queryData,
}: {
  queryData: NonNullable<
    AudienceSelectInputQuery$data["HolderQueries"]["seriesHoldersForUser"]["seriesHolders"]
  >[number];
}) {
  const { addUsersUnique } = useUserSearchContext();
  const userData = useUserSearchBarUserExpress(
    queryData.holders.map((item) => item.user) ?? null
  );
  if (userData == null || userData.length === 0) {
    return null;
  }

  return (
    <AddUsersButton
      onClick={() => {
        addUsersUnique(userData.map((user) => user));
      }}
      text={`Add holders of ${queryData.series.name} series`}
    />
  );
}

type Props = {
  activeAudienceInputOption: AudienceInputOption;
  freeformAddresses: Array<string>;
  hasError?: boolean;
  setActiveAudienceInputOption: (val: AudienceInputOption) => void;
  setFreeformAddresses: (val: Array<string>) => void;
};

function QueryLoader({
  activeAudienceInputOption,
  hasError = false,
  setActiveAudienceInputOption,
  freeformAddresses,
  setFreeformAddresses,
}: Props) {
  const viewerId = useViewerId();
  const queryData = useLazyLoadQuery<AudienceSelectInputQuery>(query, {
    holdersForUserInput: { userId: viewerId! },
    seriesHoldersForUserInput: { userId: viewerId! },
  });
  const { isMobileBreakpoint } = useBreakpoint();

  return (
    <FlexBox flexDirection="column" gap={isMobileBreakpoint ? 16 : 24}>
      <RadioButtonWithInput
        buttonLabel="Simple audience input"
        buttonDescription="Recommended"
        isActive={
          activeAudienceInputOption === AudienceInputOption.SimpleAudienceInput
        }
        onClick={() =>
          setActiveAudienceInputOption(AudienceInputOption.SimpleAudienceInput)
        }
        input={
          <FlexBox flexDirection="column" gap={isMobileBreakpoint ? 12 : 16}>
            <UserSearchBar
              allowNonUserAddresses
              hasError={hasError}
              placeholder={
                isMobileBreakpoint
                  ? "Search by username or address"
                  : "Search by username or wallet address"
              }
              wrap
            />
            <FlexBox flexDirection="column" gap={8}>
              <AddAllHoldersButton
                queryData={queryData.HolderQueries.holdersForUser}
              />
              {queryData.HolderQueries.seriesHoldersForUser.seriesHolders?.map(
                (seriesHolders) => (
                  <AddSeriesHoldersButton
                    key={seriesHolders.series.id}
                    queryData={seriesHolders}
                  />
                )
              )}
            </FlexBox>
          </FlexBox>
        }
      />
      <RadioButtonWithInput
        buttonLabel="Freeform wallet input"
        buttonDescription="Not recommended; double-check your wallet list as we cannot verify if the wallet addresses entered are correct."
        isActive={
          activeAudienceInputOption === AudienceInputOption.FreeformWalletInput
        }
        onClick={() =>
          setActiveAudienceInputOption(AudienceInputOption.FreeformWalletInput)
        }
        input={
          <WalletAddressInput
            addresses={freeformAddresses}
            hasError={hasError}
            setAddresses={setFreeformAddresses}
            placeholder={
              isMobileBreakpoint
                ? "Comma-separated addresses"
                : "Enter wallet addresses here, separated by commas"
            }
          />
        }
      />
    </FlexBox>
  );
}

// NOTE: must be wrapped with UserSearchContextProvider
export default function AudienceSelectInput(props: Props) {
  return (
    <Suspense
      fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
    >
      <QueryLoader {...props} />
    </Suspense>
  );
}
