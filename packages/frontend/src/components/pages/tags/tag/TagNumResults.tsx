import graphql from "babel-plugin-relay/macro";
import { TagNumResultsQuery } from "components/pages/tags/tag/__generated__/TagNumResultsQuery.graphql";
import Subheader from "components/text/Subheader";
import { useLazyLoadQuery } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import pluralize from "formfn-shared/dist/utils/pluralize";

const query = graphql`
  query TagNumResultsQuery($tag: String!) {
    NftToTag_aggregate(where: { Tag: { value: { _eq: $tag } } }) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  tag: string;
};

export default function TagNumResults({ tag }: Props): JSX.Element {
  const data = useLazyLoadQuery<TagNumResultsQuery>(query, { tag });
  const count = data.NftToTag_aggregate.aggregate?.count ?? 0;

  return (
    <Subheader colorClass={ColorClass.Secondary}>
      {count} {pluralize("result", count)}
    </Subheader>
  );
}
