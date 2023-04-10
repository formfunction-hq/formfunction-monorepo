import { Popover } from "antd";
import graphql from "babel-plugin-relay/macro";
import LoadingSpinner from "components/loading/LoadingSpinner";
import styles from "css/user/UserSearchBar.module.css";
import { Suspense, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import GlobalClass from "types/enums/GlobalClass";
import { useDebounce } from "use-debounce";
import { TooltipPlacement } from "antd/lib/tooltip";
import { UserSearchBarQuery } from "components/user/__generated__/UserSearchBarQuery.graphql";
import UserSearchPopoverResult from "components/user/UserSearchPopoverResult";
import UserSearchBarSelectedItem from "components/user/UserSearchBarSelectedItem";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import useUserSearchContext from "hooks/useUserSearchContext";
import useUserSearchBarUserExpress from "hooks/useUserSearchBarUserExpress";
import InputWithSelectedItems from "components/input/InputWithSelectedItems";
import SearchIcon from "components/icons/SearchIcon";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import PillWithTextAndIcon from "components/misc/PillWithTextAndIcon";
import IconButton from "components/buttons/IconButton";
import CrossIcon from "components/icons/CrossIcon";
import shortenAddress from "utils/shortenAddress";
import Body2 from "components/text/Body2";
import arrayLast from "formfn-shared/dist/utils/array/arrayLast";
import PlusIcon from "components/icons/PlusIcon";
import useBreakpoint from "hooks/useBreakpoint";

const query = graphql`
  query UserSearchBarQuery($searchText: String!) {
    UserQueries {
      userSearch(input: { usernameOrUserId: $searchText, first: 5 }) {
        users {
          id
          ...useUserSearchBarUserExpress_UserExpress
        }
      }
    }
  }
`;

function PopoverResults({
  results,
}: {
  results: Array<JSX.Element>;
}): JSX.Element {
  return <div className={styles.popoverSection}>{results}</div>;
}

function PopoverContentInner({
  allowNonUserAddresses,
  clearSearchText,
  hidePopover,
  idsToExclude,
  searchText,
}: {
  allowNonUserAddresses: boolean;
  clearSearchText: () => void;
  hidePopover: () => void;
  idsToExclude: Array<string>;
  searchText: string;
}): JSX.Element {
  const data = useLazyLoadQuery<UserSearchBarQuery>(query, {
    searchText,
  });
  const { users } = data.UserQueries.userSearch;
  const userData = useUserSearchBarUserExpress(users);
  const filteredUsers = (userData ?? []).filter(
    (user) => !idsToExclude.includes(user.id)
  );
  const { selectAddress, selectUser } = useUserSearchContext();
  const { isMobileBreakpoint } = useBreakpoint();

  if (filteredUsers.length === 0) {
    if (isPublicKey(searchText) && allowNonUserAddresses) {
      if (idsToExclude.includes(searchText)) {
        return (
          <div className={styles.popoverContentInner}>
            <Body1 colorClass={ColorClass.Primary}>User already added</Body1>
          </div>
        );
      }

      return (
        <div className={styles.popoverContentInner}>
          <PopoverResults
            results={[
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.Primary}
                fontClass={FontClass.Body1}
                icon={<PlusIcon colorValue={ColorValue.BrightPurple} />}
                iconPosition="left"
                onClick={() => {
                  selectAddress(searchText);
                  clearSearchText();
                  hidePopover();
                }}
              >
                {isMobileBreakpoint ? shortenAddress(searchText) : searchText}
              </TextButton>,
            ]}
          />
        </div>
      );
    }

    return (
      <div className={styles.popoverContentInner}>
        <Body1 colorClass={ColorClass.Primary}>No users found</Body1>
      </div>
    );
  }

  return (
    <div className={styles.popoverContentInner}>
      <PopoverResults
        results={filteredUsers.map((user) => (
          <UserSearchPopoverResult
            user={user}
            key={user.id}
            onClick={() => {
              selectUser(user);
              clearSearchText();
              hidePopover();
            }}
          />
        ))}
      />
    </div>
  );
}

function PopoverContent({
  allowNonUserAddresses,
  clearSearchText,
  debouncedSearchText,
  hidePopover,
  idsToExclude,
}: {
  allowNonUserAddresses: boolean;
  clearSearchText: () => void;
  debouncedSearchText: string;
  hidePopover: () => void;
  idsToExclude: Array<string>;
}): JSX.Element {
  return (
    <div className={styles.popoverContent}>
      <Suspense
        fallback={
          <LoadingSpinner
            className={GlobalClass.DelayedSpinner}
            colorValue={ColorValue.BrightPurple}
          />
        }
      >
        <PopoverContentInner
          allowNonUserAddresses={allowNonUserAddresses}
          clearSearchText={clearSearchText}
          hidePopover={hidePopover}
          searchText={debouncedSearchText}
          idsToExclude={idsToExclude}
        />
      </Suspense>
    </div>
  );
}

type Props = {
  allowNonUserAddresses: boolean;
  hasError?: boolean;
  placeholder: string;
  popoverPlacement?: TooltipPlacement;
  wrap?: boolean;
};

// Must be used with UserSearchContext
export default function UserSearchBar({
  allowNonUserAddresses,
  hasError = false,
  placeholder,
  popoverPlacement = "bottomLeft",
  wrap = false,
}: Props): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 750);
  const { selectedAddresses, selectedUsers, unselectAddress, unselectUser } =
    useUserSearchContext();

  return (
    <Popover
      placement={popoverPlacement}
      content={
        <PopoverContent
          allowNonUserAddresses={allowNonUserAddresses}
          clearSearchText={() => setSearchText("")}
          debouncedSearchText={debouncedSearchText}
          hidePopover={() => setOpen(false)}
          idsToExclude={[
            ...selectedUsers.map((item) => item.id),
            ...selectedAddresses,
          ]}
        />
      }
      open={open && debouncedSearchText.length > 0}
      onOpenChange={setOpen}
    >
      <InputWithSelectedItems
        removeLastItem={() => {
          if (selectedAddresses.length > 0) {
            unselectAddress(arrayLast(selectedAddresses)!);
            return;
          }

          if (selectedUsers.length > 0) {
            unselectUser(arrayLast(selectedUsers)!);
          }
        }}
        hasError={hasError}
        icon={<SearchIcon size={24} colorValue={ColorValue.Secondary} />}
        wrap={wrap}
        placeholder={placeholder}
        inputText={searchText}
        setInputText={(val: string) => {
          setOpen(true);
          setSearchText(val);
        }}
        selectedItems={[
          ...selectedUsers.map((item) => (
            <UserSearchBarSelectedItem
              user={item}
              onClickCrossIcon={() => unselectUser(item)}
            />
          )),
          ...selectedAddresses.map((address) => (
            <PillWithTextAndIcon
              alignSelf="stretch"
              key={address}
              icon={
                <IconButton
                  icon={<CrossIcon colorValue={ColorValue.Primary} />}
                  onClick={() => unselectAddress(address)}
                />
              }
            >
              <Body2 colorClass={ColorClass.Primary}>
                {shortenAddress(address)}
              </Body2>
            </PillWithTextAndIcon>
          )),
        ]}
      />
    </Popover>
  );
}
