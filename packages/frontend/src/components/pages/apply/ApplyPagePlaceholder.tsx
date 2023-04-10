import FORM_LINK from "constants/FormLink";
import { useEffect } from "react";

export default function ApplyPagePlaceholder() {
  useEffect(() => {
    window.location.href = FORM_LINK;
  }, []);

  return null;
}
