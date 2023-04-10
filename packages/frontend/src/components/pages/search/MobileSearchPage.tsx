import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { MobileSearchPageQuery } from "components/pages/search/__generated__/MobileSearchPageQuery.graphql";
import { Suspense, useState } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import useSetPageTitle from "hooks/useSetPageTitle";
import styles from "css/pages/search/MobileSearchPage.module.css";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useDebounce } from "use-debounce";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import formatUsername from "utils/formatUsername";
import GlobalClass from "types/enums/GlobalClass";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import MobileSearchBar from "components/pages/search/MobileSearchBar";

// TODO: use fragment between here and HeaderDesktopSearch.tsx rather than duplicating
const query = graphql`
  query MobileSearchPageQuery($searchText: String!) {
    User(
      where: { username: { _ilike: $searchText } }
      limit: 4
      order_by: { usernameLength: asc }
    ) {
      # eslint-disable-next-line relay/unused-fields
      id
      username

      ProfilePhoto {
        # eslint-disable-next-line relay/unused-fields
        id
        photoUrl
      }
    }

    Tag(
      where: { value: { _ilike: $searchText } }
      limit: 4
      order_by: { valueLength: asc }
    ) {
      # eslint-disable-next-line relay/unused-fields
      id
      value
    }

    Series(
      where: { name: { _ilike: $searchText } }
      limit: 4
      order_by: { nameLength: asc }
    ) {
      # eslint-disable-next-line relay/unused-fields
      id
      slug
      name

      AvatarPhoto {
        # eslint-disable-next-line relay/unused-fields
        id
        photoUrl
      }

      Creator {
        username
      }
    }
  }
`;

function CategorySearchResults({
  searchText,
}: {
  searchText: string;
}): JSX.Element {
  const data = useLazyLoadQuery<MobileSearchPageQuery>(query, {
    searchText: `%${searchText}%`,
  });

  const creators = data.User.length > 0 && (
    <div className={styles.searchItemSection}>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Creators
      </TinyLabel>
      {data.User.map((user) => (
        <TextButton
          className={styles.seachItem}
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.Body1}
          href={getUserProfileLinkRelative(user.username)}
          icon={<ProfilePhotoCircle src={user.ProfilePhoto?.photoUrl} />}
          key={user.username}
          textDecoration="none"
          type="link_internal"
        >
          @{formatUsername(user.username)!}
        </TextButton>
      ))}
    </div>
  );

  const tags = data.Tag.length > 0 && (
    <div className={styles.searchItemSection}>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Artwork Tags
      </TinyLabel>
      {data.Tag.map((tag) => (
        <TextButton
          className={styles.seachItem}
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.Body1}
          href={`/tags/${tag.value}`}
          key={tag.value}
          type="link_internal"
        >
          #{tag.value}
        </TextButton>
      ))}
    </div>
  );

  const series = data.Series.length > 0 && (
    <div className={styles.searchItemSection}>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Series
      </TinyLabel>
      {data.Series.map((_series) => (
        <TextButton
          className={styles.seachItem}
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.Body1}
          href={getSeriesLinkRelative(
            _series.Creator.username ?? "",
            _series?.slug
          )}
          icon={
            <ProfilePhotoCircle src={_series.AvatarPhoto?.photoUrl} squared />
          }
          key={_series.name}
          type="link_internal"
        >
          {_series.name}
        </TextButton>
      ))}
    </div>
  );

  return (
    <div>
      {creators}
      {tags}
      {series}
      {data.Tag.length === 0 &&
        data.User.length === 0 &&
        data.Series.length === 0 && (
          <TinyLabel
            colorClass={ColorClass.Secondary}
            textTransform="uppercase"
          >
            No Results
          </TinyLabel>
        )}
    </div>
  );
}

export default function MobileSearchPage(): Maybe<JSX.Element> {
  useSetPageTitle("Search");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  return (
    <ResponsiveContainer>
      <div className={styles.header}>
        <MobileSearchBar
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <TextButton
          className={styles.closeButton}
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.Body1}
          key={searchText}
          href="/explore"
          textDecoration="none"
          type="link_internal"
        >
          Cancel
        </TextButton>
      </div>
      <div className={styles.results}>
        <Suspense
          fallback={
            <LoadingSpinner
              className={GlobalClass.DelayedSpinner}
              colorValue={ColorValue.BrightPurple}
            />
          }
        >
          <CategorySearchResults searchText={debouncedSearchText} />
        </Suspense>
      </div>
    </ResponsiveContainer>
  );
}
