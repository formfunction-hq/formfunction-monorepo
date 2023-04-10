import styles from "css/nav/PaginationControls.module.css";
import PlainButton from "components/buttons/PlainButton";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import joinClasses from "utils/joinClasses";
import ChevronDoubleRightIcon from "components/icons/ChevronDoubleRightIcon";
import ChevronDoubleLeftIcon from "components/icons/ChevronDoubleLeftIcon";

// Use one (not zero) indexed initial page to more intuitively match the UI.
export const PAGINATION_INITIAL_PAGE = 1;

function getIconColor(enabled: boolean) {
  return enabled ? ColorValue.Secondary : ColorValue.Tertiary;
}

type Props = {
  className?: string;
  currentPage: number;
  pageSize: number;
  setCurrentPage: (currentPage: number) => void;
  totalCount: number;
};

export default function PaginationControls({
  className,
  currentPage,
  pageSize,
  setCurrentPage,
  totalCount,
}: Props) {
  const hasNextPage = currentPage * pageSize < totalCount;
  const hasPreviousPage = currentPage > PAGINATION_INITIAL_PAGE;
  const onFirstPage = currentPage === PAGINATION_INITIAL_PAGE;
  const onLastPage = !hasNextPage;
  const showThirdPreviousPage = onLastPage && currentPage > 2;
  const showThirdNextPage = onFirstPage && totalCount > 2 * pageSize;

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToFinalPage = () => {
    const numPages = Math.floor(totalCount / pageSize);
    const finalPage = totalCount % pageSize === 0 ? numPages : numPages + 1;
    setCurrentPage(finalPage);
  };

  if (totalCount <= pageSize) {
    return null;
  }

  const leftChevronButtons = (
    <>
      <PlainButton
        className={styles.pageButton}
        disabled={!hasPreviousPage}
        onClick={() => setCurrentPage(1)}
      >
        <ChevronDoubleLeftIcon colorValue={getIconColor(hasPreviousPage)} />
      </PlainButton>
      <PlainButton
        className={styles.pageButton}
        disabled={!hasPreviousPage}
        onClick={goToPreviousPage}
      >
        <ChevronLeftIcon colorValue={getIconColor(hasPreviousPage)} />
      </PlainButton>
    </>
  );

  const optionalThirdPreviousPageButton = showThirdPreviousPage && (
    <PlainButton
      className={styles.pageButton}
      onClick={() => setCurrentPage(currentPage - 2)}
    >
      <Body1 colorClass={ColorClass.Secondary}>{currentPage - 2}</Body1>
    </PlainButton>
  );

  const middleThreePageButtons = (
    <>
      {hasPreviousPage && (
        <PlainButton onClick={goToPreviousPage}>
          <Body1 colorClass={ColorClass.Secondary}>{currentPage - 1}</Body1>
        </PlainButton>
      )}
      <Body1 colorClass={ColorClass.BrightPurple}>{currentPage}</Body1>
      {hasNextPage && (
        <PlainButton onClick={goToNextPage}>
          <Body1 colorClass={ColorClass.Secondary}>{currentPage + 1}</Body1>
        </PlainButton>
      )}
    </>
  );

  const optionalThirdNextPageButton = showThirdNextPage && (
    <PlainButton
      className={styles.pageButton}
      onClick={() => {
        setCurrentPage(currentPage + 2);
      }}
    >
      <Body1 colorClass={ColorClass.Secondary}>{currentPage + 2}</Body1>
    </PlainButton>
  );

  const rightChevronButtons = (
    <>
      <PlainButton
        className={styles.pageButton}
        disabled={!hasNextPage}
        onClick={goToNextPage}
      >
        <ChevronRightIcon colorValue={getIconColor(hasNextPage)} />
      </PlainButton>
      <PlainButton
        className={styles.pageButton}
        disabled={!hasNextPage}
        onClick={goToFinalPage}
      >
        <ChevronDoubleRightIcon colorValue={getIconColor(hasNextPage)} />
      </PlainButton>
    </>
  );

  return (
    <div className={joinClasses(styles.container, className)}>
      {leftChevronButtons}
      {optionalThirdPreviousPageButton}
      {middleThreePageButtons}
      {optionalThirdNextPageButton}
      {rightChevronButtons}
    </div>
  );
}
