import { Popover } from "antd";
import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import { HeaderDesktopSearchQuery } from "components/header/__generated__/HeaderDesktopSearchQuery.graphql";
import SearchIcon from "components/icons/SearchIcon";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import LoadingSpinner from "components/loading/LoadingSpinner";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/header/HeaderDesktopSearch.module.css";
import { Suspense, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import HeaderTheme from "types/enums/HeaderTheme";
import TextButtonTheme from "types/enums/TextButtonTheme";
import { useDebounce } from "use-debounce";
import formatUsername from "utils/formatUsername";
import joinClasses from "utils/joinClasses";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import useBreakpoint from "hooks/useBreakpoint";

const THEME_TO_CLASS = {
  [HeaderTheme.Dark]: styles.secondary,
  [HeaderTheme.Light]: styles.white,
};

const THEME_TO_COLOR_VALUE = {
  [HeaderTheme.Dark]: ColorValue.Secondary,
  [HeaderTheme.Light]: ColorValue.White,
};

const query = graphql`
  query HeaderDesktopSearchQuery($searchText: String!) {
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

type PopoverResultsProps = {
  categoryHeader: string;
  clearSearchText: () => void;
  hidePopover: () => void;
  results: Array<{
    content: string;
    href: string;
    icon?: string;
    key: string;
    squared?: boolean;
  }>;
  textDecoration?: "none" | "underline";
};

function PopoverResults({
  categoryHeader,
  clearSearchText,
  results,
  hidePopover,
  textDecoration,
}: PopoverResultsProps): JSX.Element {
  return (
    <div className={styles.popoverSection}>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        {categoryHeader}
      </TinyLabel>
      {results.map(({ content, href, icon, key, squared }) => (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.Body1}
          href={href}
          icon={
            icon ? (
              <ProfilePhotoCircle src={icon} squared={squared} />
            ) : undefined
          }
          key={key}
          onClick={() => {
            hidePopover();
            clearSearchText();
          }}
          textDecoration={textDecoration}
          type="link_internal"
        >
          {content}
        </TextButton>
      ))}
    </div>
  );
}

type PopoverContentInnerProps = {
  clearSearchText: () => void;
  hidePopover: () => void;
  searchText: string;
};

function PopoverContentInner({
  searchText,
  clearSearchText,
  hidePopover,
}: PopoverContentInnerProps): JSX.Element {
  const data = useLazyLoadQuery<HeaderDesktopSearchQuery>(query, {
    searchText: `%${searchText}%`,
  });

  const creators = data.User.length > 0 && (
    <PopoverResults
      categoryHeader="Creators"
      clearSearchText={clearSearchText}
      hidePopover={hidePopover}
      results={data.User.map((user) => ({
        content: `@${formatUsername(user.username)}`,
        href: getUserProfileLinkRelative(user.username),
        icon: user.ProfilePhoto?.photoUrl,
        key: user.username,
      }))}
      textDecoration="none"
    />
  );

  // TODO: link tags
  const tags = data.Tag.length > 0 && (
    <PopoverResults
      categoryHeader="Artwork Tags"
      clearSearchText={clearSearchText}
      hidePopover={hidePopover}
      results={data.Tag.map((tag) => ({
        content: `#${tag.value}`,
        href: `/tags/${tag.value}`,
        key: tag.value,
      }))}
    />
  );

  const series = data.Series.length > 0 && (
    <PopoverResults
      categoryHeader="Series"
      clearSearchText={clearSearchText}
      hidePopover={hidePopover}
      results={data.Series.map((_series) => ({
        content: `${_series.name}`,
        href: getSeriesLinkRelative(
          _series.Creator.username ?? "",
          _series?.slug
        ),
        icon: _series.AvatarPhoto?.photoUrl,
        key: _series.name,
        squared: true,
      }))}
      textDecoration="none"
    />
  );

  return (
    <div className={styles.popoverContentInner}>
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

function PopoverContent({
  clearSearchText,
  debouncedSearchText,
  hidePopover,
}: {
  clearSearchText: () => void;
  debouncedSearchText: string;
  hidePopover: () => void;
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
          clearSearchText={clearSearchText}
          hidePopover={hidePopover}
          searchText={debouncedSearchText}
        />
      </Suspense>
    </div>
  );
}

type Props = {
  headerTheme: HeaderTheme;
};

export default function HeaderDesktopSearch({
  headerTheme,
}: Props): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const { isDesktopBreakpoint } = useBreakpoint();

  return (
    <Popover
      placement="bottomLeft"
      content={
        <PopoverContent
          clearSearchText={() => setSearchText("")}
          debouncedSearchText={debouncedSearchText}
          hidePopover={() => setVisible(false)}
        />
      }
      trigger="click"
      open={visible && searchText.length > 0}
      onOpenChange={setVisible}
    >
      <div className={styles.container}>
        <SearchIcon colorValue={THEME_TO_COLOR_VALUE[headerTheme]} size={24} />
        <input
          className={joinClasses(
            styles.input,
            isDesktopBreakpoint ? styles.inputNarrow : undefined,
            FontClass.NavLink,
            THEME_TO_CLASS[headerTheme]
          )}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={isDesktopBreakpoint ? "Search" : "Search Formfunction"}
          value={searchText}
        />
      </div>
    </Popover>
  );
}
