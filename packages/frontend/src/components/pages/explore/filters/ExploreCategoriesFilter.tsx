import CategoryFilter from "components/pages/common/campaign-filters/CategoryFilter";
import useExploreContext from "hooks/useExploreContext";

export default function ExploreCategoriesFilter() {
  const {
    campaigns: { categories, addCategory, removeCategory },
  } = useExploreContext();

  return (
    <CategoryFilter
      selectedCategories={categories}
      addCategory={addCategory}
      removeCategory={removeCategory}
    />
  );
}
