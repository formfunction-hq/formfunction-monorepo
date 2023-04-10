// On explore, we only want to start lazy loading after the first 9 elements because otherwise
// we run into issues when the user flips between different filters/sorting modes
// with the loading skeletons present.
//
// In general, we shouldn't need to lazy load the first few items because they should be visible
// on the first load (or shortly after scrolling down).
const ARTWORK_GRID_LAZY_LOAD_DELIMITER = 9;

export default ARTWORK_GRID_LAZY_LOAD_DELIMITER;
