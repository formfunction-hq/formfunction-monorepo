import graphql from "babel-plugin-relay/macro";
import {
  User_set_input,
  useUpdateUserByPkMutation,
  useUpdateUserByPkMutation$data,
} from "hooks/__generated__/useUpdateUserByPkMutation.graphql";
import { useMutation } from "react-relay";

const mutation = graphql`
  mutation useUpdateUserByPkMutation($set: User_set_input!, $userId: String!) {
    update_User_by_pk(_set: $set, pk_columns: { id: $userId }) {
      id
      # Used in onComplete of one of the callsites
      username

      ...ManageSeriesModal_User
      ...ProfileJoinDiscordCard_User
      ...EditProfileForm_User
    }
  }
`;

export default function useUpdateUserByPk() {
  const [commit, requestInFlight] =
    useMutation<useUpdateUserByPkMutation>(mutation);

  return {
    requestInFlight,
    updateUserByPk: (args: {
      onCompleted: (response: useUpdateUserByPkMutation$data) => void;
      onError: (e: Error) => void;
      set: User_set_input;
      userId: string;
    }) => {
      const { set, userId } = args;
      commit({ ...args, variables: { set, userId } });
    },
  };
}
