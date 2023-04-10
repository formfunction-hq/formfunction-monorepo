/* eslint-disable react/jsx-no-constructed-context-values */
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useUserSearchBarUserExpress, {
  UserSearchBarItem,
} from "hooks/useUserSearchBarUserExpress";
import { useUserSearchBarUserExpress_UserExpress$key } from "hooks/__generated__/useUserSearchBarUserExpress_UserExpress.graphql";
import { Context, createContext, useState } from "react";

export type UserSearchContextData = {
  addUsersUnique: (items: Array<UserSearchBarItem>) => void;
  selectAddress: (address: string) => void;
  selectUser: (item: UserSearchBarItem) => void;
  selectedAddresses: ReadonlyArray<string>;
  selectedUsers: ReadonlyArray<UserSearchBarItem>;
  unselectAddress: (address: string) => void;
  unselectUser: (item: UserSearchBarItem) => void;
};

export const UserSearchContext: Context<UserSearchContextData> =
  createContext<UserSearchContextData>({
    addUsersUnique: emptyFunction,
    selectAddress: emptyFunction,
    selectUser: emptyFunction,
    selectedAddresses: [],
    selectedUsers: [],
    unselectAddress: emptyFunction,
    unselectUser: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  users?: Maybe<useUserSearchBarUserExpress_UserExpress$key>;
};

export function UserSearchContextProvider({
  children,
  users,
}: ProviderProps): JSX.Element {
  const userData = useUserSearchBarUserExpress(users ?? null);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedUsers, setSelectedUsers] = useState<
    ReadonlyArray<UserSearchBarItem>
  >(userData == null ? [] : userData);
  const [selectedAddresses, setSelectedAddresses] = useState<
    ReadonlyArray<string>
  >([]);
  const selectUsers = (items: Array<UserSearchBarItem>, remove: boolean) => {
    const userIdsFromItems = items.map((item) => item.id);
    const newSelectedUsers =
      remove === true
        ? selectedUsers.filter((user) => !userIdsFromItems.includes(user.id))
        : [...selectedUsers, ...items];

    setSelectedUsers(newSelectedUsers);
    setSelectedUserIds(new Set(newSelectedUsers.map((u) => u.id)));
  };

  return (
    <UserSearchContext.Provider
      value={{
        addUsersUnique: (items: Array<UserSearchBarItem>) => {
          const itemsToAdd = items.filter(
            (item) => !selectedUserIds.has(item.id)
          );
          selectUsers(itemsToAdd, false);
        },
        selectAddress: (address: string) =>
          setSelectedAddresses([...selectedAddresses, address]),
        selectUser: (item: UserSearchBarItem) => selectUsers([item], false),
        selectedAddresses,
        selectedUsers,
        unselectAddress: (address: string) =>
          setSelectedAddresses(
            selectedAddresses.filter((addr) => addr !== address)
          ),
        unselectUser: (item: UserSearchBarItem) => selectUsers([item], true),
      }}
    >
      {children}
    </UserSearchContext.Provider>
  );
}
