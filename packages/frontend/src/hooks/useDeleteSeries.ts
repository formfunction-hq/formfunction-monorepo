import graphql from "babel-plugin-relay/macro";
import useUserContext from "hooks/useUserContext";
import { useDeleteSeriesMutation } from "hooks/__generated__/useDeleteSeriesMutation.graphql";
import { useMutation } from "react-relay";
import getSeriesQueryArgs from "utils/series/getSeriesQueryArgs";

const mutation = graphql`
  mutation useDeleteSeriesMutation($id: String!) {
    delete_Series_by_pk(id: $id) {
      id
    }
  }
`;

export default function useDeleteSeries() {
  const { user } = useUserContext();
  const [commit] = useMutation<useDeleteSeriesMutation>(mutation);

  return {
    deleteSeries: (variables: {
      onCompleted: () => void;
      onError: (error: Error) => void;
      seriesId: string;
    }) => {
      const { onCompleted, onError, seriesId } = variables;
      commit({
        onCompleted,
        onError,
        updater: (store) => {
          const root = store.getRoot();
          const seriesArgs = getSeriesQueryArgs(user?.username ?? "");
          const args = {
            // IMPORTANT: keep in sync with ProfilePageForUserSeries_Query in
            // ProfilePageForUser.tsx
            order_by: seriesArgs.seriesOrderBy,
            where: seriesArgs.seriesWhere,
          };
          const seriesList = root.getLinkedRecords("Series", args);
          const newList = seriesList!.filter(
            (record) => record.getDataID() !== seriesId
          );
          store.getRoot().setLinkedRecords(newList, "Series", args);
        },
        variables: {
          id: seriesId,
        },
      });
    },
  };
}
