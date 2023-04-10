import { useEffect } from "react";

export default function useSetPageTitle(title: string) {
  useEffect(() => {
    document.title = `Formfunction | ${title}`;

    return () => {
      document.title = "Formfunction";
    };
  }, [title]);
}
