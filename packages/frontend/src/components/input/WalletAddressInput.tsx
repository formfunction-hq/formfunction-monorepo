import { useEffect, useState } from "react";
import ColorValue from "types/enums/ColorValue";
import { useDebounce } from "use-debounce";
import ColorClass from "types/enums/ColorClass";
import PillWithTextAndIcon from "components/misc/PillWithTextAndIcon";
import IconButton from "components/buttons/IconButton";
import CrossIcon from "components/icons/CrossIcon";
import Body2 from "components/text/Body2";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import InputWithSelectedItems from "components/input/InputWithSelectedItems";
import shortenAddress from "utils/shortenAddress";

type Props = {
  addresses: Array<string>;
  delimiter?: string;
  hasError?: boolean;
  placeholder: string;
  setAddresses: (val: Array<string>) => void;
  validator?: (val: string) => boolean;
};

export default function WalletAddressInput({
  placeholder,
  addresses,
  hasError = false,
  setAddresses,
  validator = isPublicKey,
  delimiter = " ",
}: Props): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [debouncedInputText] = useDebounce(inputText, 500);

  const validateInputText = () => {
    const splitInputText = inputText.split(delimiter).map((val) => val.trim());
    const validInputText = splitInputText.filter((t) => validator(t));
    setAddresses(removeDuplicatesWithSet([...addresses, ...validInputText]));
    setInputText(
      splitInputText
        .filter((item) => !validInputText.includes(item))
        .join(delimiter)
    );
  };

  useEffect(() => {
    validateInputText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputText]);

  return (
    <InputWithSelectedItems
      hasError={hasError}
      wrap
      removeLastItem={() => setAddresses(addresses.slice(0, -1))}
      placeholder={placeholder}
      inputText={inputText}
      setInputText={setInputText}
      selectedItems={addresses.map((address) => (
        <PillWithTextAndIcon
          key={address}
          icon={
            <IconButton
              icon={<CrossIcon colorValue={ColorValue.Primary} />}
              onClick={() =>
                setAddresses(addresses.filter((item) => item !== address))
              }
            />
          }
        >
          <Body2 colorClass={ColorClass.Primary}>
            {shortenAddress(address)}
          </Body2>
        </PillWithTextAndIcon>
      ))}
    />
  );
}
