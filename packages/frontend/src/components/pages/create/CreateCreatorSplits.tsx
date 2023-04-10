import styles from "css/pages/create/CreateCreatorSplits.module.css";
import PlainButton from "components/buttons/PlainButton";
import TextButton from "components/buttons/TextButton";
import PlusIcon from "components/icons/PlusIcon";
import CrossIcon from "components/icons/CrossIcon";
import InputLabel from "components/input/InputLabel";
import TextInput from "components/input/TextInput";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import GlobalClass from "types/enums/GlobalClass";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import useUserContext from "hooks/useUserContext";
import ErrorMessage from "components/text/ErrorMessage";
import { notify } from "components/toast/notifications";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import shortenAddress from "utils/shortenAddress";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useColorModeContext from "hooks/useColorModeContext";
import isNonNegativeInteger from "utils/isNonNegativeInteger";
import useCreateContext from "hooks/useCreateContext";
import CreateMintType from "types/enums/CreateMintType";
import logEvent from "utils/analytics/logEvent";
import AnalyticsEvent from "types/enums/AnalyticsEvent";

export const MAX_CREATORS_PER_MINT_TYPE: Record<CreateMintType, number> = {
  // If more than 3 creators are used, and anti-bot protection is enabled,
  // the "buy_edition_v2" transaction will exceed the max allowed size
  [CreateMintType.Editions]: 3,
  // This is the max that Metaplex allows
  [CreateMintType.OneOfOne]: 5,
};

function isPercentageValid(percentage: string) {
  return (
    isNonNegativeInteger(percentage) &&
    Number(percentage) <= 100 &&
    percentage !== ""
  );
}

function Row({
  address,
  index,
  percentage,
}: {
  address: string;
  index: number;
  percentage: string;
}) {
  const { showErrors, dispatchCreatorSplits } = useCreateNftDetailsContext();
  const { user } = useUserContext();

  const walletInput = (
    <TextInput
      hasError={showErrors && !isPublicKey(address)}
      value={address}
      onChange={(val) => {
        dispatchCreatorSplits({
          address: val,
          index,
          type: "update_address",
        });
      }}
      placeholder="Enter collaborator's wallet address"
    />
  );

  const viewerWalletAddress = (
    <TextInput
      className={styles.viewerWalletAddress}
      value={`(Your address) ${shortenAddress(user!.id)}`}
      onChange={emptyFunction}
    />
  );

  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputAddressContainer}>
        {index === 0 ? viewerWalletAddress : walletInput}
      </div>
      <div className={styles.inputPercentContainer}>
        <TextInput
          hasError={showErrors && !isPercentageValid(percentage)}
          maxLength={3}
          maxLengthIndicator={false}
          value={percentage}
          onChange={(val) => {
            if (val === "" || isNonNegativeInteger(val))
              dispatchCreatorSplits({
                index,
                percentage: val,
                type: "update_percentage",
              });
          }}
          placeholder="%"
        />
      </div>
      <PlainButton
        className={GlobalClass.HideText}
        onClick={() => dispatchCreatorSplits({ index, type: "remove" })}
        style={{ visibility: index > 0 ? "visible" : "hidden" }}
      >
        <CrossIcon colorValue={ColorValue.Secondary} />
      </PlainButton>
    </div>
  );
}

export default function CreateCreatorSplits() {
  const {
    creatorSplits,
    creatorSplitsError,
    dispatchCreatorSplits,
    showErrors,
  } = useCreateNftDetailsContext();
  const { createMintType } = useCreateContext();
  const { isDarkMode } = useColorModeContext();
  const maxCreators = MAX_CREATORS_PER_MINT_TYPE[createMintType];
  const { userId } = useUserContext();

  return (
    <div className={styles.container}>
      <InputLabel
        label="Collab splits"
        subLabel={
          <>
            Add collaborators to this NFT. The percentage splits will apply to
            both the primary and secondary sales for this NFT.{" "}
            <TextButton
              buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
              display="inline"
              href="https://help.formfunction.xyz/en/articles/6111089-how-do-collab-splits-work"
              type="link_external"
            >
              Learn more
            </TextButton>
          </>
        }
      />
      {creatorSplits.map((creatorPercentage, index) => (
        <Row
          address={creatorPercentage.address}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          percentage={creatorPercentage.percentage}
        />
      ))}
      {showErrors && creatorSplitsError != null && (
        <ErrorMessage
          fontClass={FontClass.Body2}
          marginTop={0}
          textAlign="left"
        >
          {creatorSplitsError}
        </ErrorMessage>
      )}
      <TextButton
        onClick={() => {
          if (creatorSplits.length === maxCreators) {
            logEvent(AnalyticsEvent.TooManyCreators, {
              createMintType,
              creatorSplits,
              maxCreators,
              userId,
            });
            // NOTE: I initially tried to put this in the dispatcher function, but
            // was running into a UI issue where the first notification would show up twice.
            notify({
              message: `You can only add up to ${
                maxCreators - 1
              } other collaborators`,
              type: "warning",
            });
            return;
          }
          dispatchCreatorSplits({ type: "add" });
        }}
        fontClass={FontClass.Body1}
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        icon={
          <PlusIcon
            colorValue={
              isDarkMode ? ColorValue.BrightPurple : ColorValue.Purple
            }
          />
        }
      >
        Add a collaborator
      </TextButton>
    </div>
  );
}
