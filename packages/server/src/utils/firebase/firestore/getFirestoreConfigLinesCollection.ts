import {
  CollectionReference,
  DocumentData,
  getFirestore,
} from "firebase-admin/firestore";

export default function getFirestoreConfigLinesCollection(
  candyMachineId: string
): CollectionReference<DocumentData> {
  const db = getFirestore();
  return db
    .collection("candyMachines")
    .doc(candyMachineId)
    .collection("configLines");
}
