import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  useUserSearchBarUserExpress_UserExpress$data,
  useUserSearchBarUserExpress_UserExpress$key,
} from "hooks/__generated__/useUserSearchBarUserExpress_UserExpress.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useUserSearchBarUserExpress_UserExpress on UserExpress
  @relay(plural: true) {
    # eslint-disable-next-line relay/unused-fields
    id
    ...UserSearchBarSelectedItem_UserExpress
    ...UserSearchPopoverResult_UserExpress
  }
`;

export type UserSearchBarItem =
  useUserSearchBarUserExpress_UserExpress$data[number];

/**
 * This hook is used to consolidate the fragments that are needed
 * for the UserSearchBar + UserSearchContext to work.
 *
 * The advantage of doing this is so that every use-case that needs
 * to use UserSearchBar + UserSearchContext need not be aware of
 * all of the fragments that need to be spread in order for this
 * component stack to work, it simply needs to spread a single fragment,
 * `useUserSearchBarUserExpress_UserExpress` and use this hook on the
 * query data prior to passing in the data to UserSearchContext
 */
export default function useUserSearchBarUserExpress(
  users: Maybe<useUserSearchBarUserExpress_UserExpress$key>
) {
  return useFragment(fragment, users);
}
