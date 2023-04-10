import FirestoreConfigLineWithoutRarityInfoDoc from "src/types/generative-mints/rarity/FirestoreConfigLineWithoutRarityInfoDoc";
import RarityInfo from "src/types/generative-mints/rarity/RarityInfo";

type FirestoreConfigLineDoc = FirestoreConfigLineWithoutRarityInfoDoc &
  RarityInfo;

export default FirestoreConfigLineDoc;
