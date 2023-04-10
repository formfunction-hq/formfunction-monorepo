import { notify } from "components/toast/notifications";

export default function notifyErrorMessageFromError(e: any) {
  notify({ message: e.message, type: "error" });
}
