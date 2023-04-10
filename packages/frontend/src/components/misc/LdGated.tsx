import Page404Content from "components/pages/errors/Page404Content";
import useFlagsTyped, { Flags } from "hooks/useFlagsTyped";
import useUserContext from "hooks/useUserContext";

type Props = {
  children: any;
  // If set, will wait for user-specfic LD flags to load instead of using
  // bootstrapped values
  fallback?: JSX.Element;
  // Use if custom evaluation logic is desired. True will render
  // children and false will show Page404Content. Default will check if
  // value is true.
  //
  // NOTE: for any non-boolean flags, this is required
  flagEvaluation?: (flags: Flags) => boolean;
  flagName: keyof Flags;
};

export default function LdGated({
  children,
  flagEvaluation,
  fallback,
  flagName,
}: Props): JSX.Element {
  const flags = useFlagsTyped();
  const { user } = useUserContext();
  const userLdFlagsLoaded = !flags.isBootstrap && user != null;
  const flagEvaluationInner =
    flagEvaluation ?? ((f: Flags) => f[flagName] === true);

  if (fallback != null && !userLdFlagsLoaded) {
    return fallback!;
  }

  if (!flagEvaluationInner(flags)) {
    return <Page404Content />;
  }

  return children;
}
