import axios from "axios";
import getApiHeaders from "utils/api/getApiHeaders";
import getRestUrl from "utils/env/getRestUrl";

export default async function getHashlist() {
  try {
    const url = getRestUrl("getHashlist");
    const config = {
      headers: {
        ...getApiHeaders(),
      },
    };
    const response = await axios.get(url, config);
    return response.data;
  } catch (err: any) {
    throw new Error("An unexpected error occurred.");
  }
}
