import { notify } from "components/toast/notifications";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";

export default function notifyUnexpectedError(
  description?: NotifyErrorDescription | string
) {
  notify({
    // TODO[@arcticmatt]: may want to make NotifyErrorDescription.UnexpectedErrorContactHelpCenter the default
    description: description ?? NotifyErrorDescription.UnexpectedError,
    message: "Unexpected error",
    type: "error",
  });
}
