import { DocumentData, DocumentReference } from "firebase-admin/firestore";
import getFirestoreConfigLinesCollection from "src/utils/firebase/firestore/getFirestoreConfigLinesCollection";

export default function getFirestoreConfigLineDocRef(
  candyMachineId: string,
  index: number
): DocumentReference<DocumentData> {
  return getFirestoreConfigLinesCollection(candyMachineId).doc(
    index.toString()
  );
}
