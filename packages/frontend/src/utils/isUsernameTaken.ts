import graphql from "babel-plugin-relay/macro";
import { fetchQuery } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { isUsernameTakenQuery } from "utils/__generated__/isUsernameTakenQuery.graphql";

const query = graphql`
  query isUsernameTakenQuery($where: User_bool_exp!) {
    User(where: $where) {
      # eslint-disable-next-line relay/unused-fields
      id
      username
    }
  }
`;

export default async function isUsernameTaken(desiredUsername: string) {
  const data = await fetchQuery<isUsernameTakenQuery>(RelayEnvironment, query, {
    where: {
      username: {
        _ilike: `%${desiredUsername}%`,
      },
    },
  }).toPromise();

  const existingUsernamesLowercase =
    data?.User.map((user) => user.username.toLowerCase()) ?? [];
  return existingUsernamesLowercase.includes(desiredUsername.toLowerCase());
}
