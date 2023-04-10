import CloseButton from "components/buttons/CloseButton";
import SearchIcon from "components/icons/SearchIcon";
import styles from "css/pages/search/MobileSearchBar.module.css";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";

type Props = {
  searchText: string;
  setSearchText: (val: string) => void;
};

export default function MobileSearchBar({ searchText, setSearchText }: Props) {
  return (
    <div className={styles.inputContainer}>
      <SearchIcon colorValue={ColorValue.Primary} size={20} />
      <input
        className={joinClasses(styles.input, FontClass.Body1)}
        value={searchText}
        placeholder="Search Formfunction..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText.length > 0 && (
        <CloseButton
          className={styles.closeButton}
          colorValue={ColorValue.Secondary}
          onClick={() => setSearchText("")}
          withBorder
        />
      )}
    </div>
  );
}
