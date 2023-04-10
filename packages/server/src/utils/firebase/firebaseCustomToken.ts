import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import firebaseAdmin from "src/utils/firebase/firebaseAdmin";

export default async function firebaseCustomToken(
  userId: string
): Promise<Maybe<string>> {
  try {
    return await firebaseAdmin.auth().createCustomToken(userId);
  } catch (e) {
    return null;
  }
}
