import styles from "css/pages/common/nft/NftInfoDisclosures.module.css";
import graphql from "babel-plugin-relay/macro";
import FlexBox from "components/layout/FlexBox";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import { NftInfoDisclosures_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftInfoDisclosures_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import getHumanReadableDisclosureType from "utils/nft/disclosures/getHumanReadableDisclosureType";
import NftDisclosureTypeExpress_enum from "types/relay/NftDisclosureTypeExpress_enum";
import AiIcon from "components/icons/AiIcon";
import ColorValue from "types/enums/ColorValue";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import ShuffleCrossIcon from "components/icons/ShuffleCrossIcon";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import EyeOffIcon from "components/icons/EyeOffIcon";

const fragment = graphql`
  fragment NftInfoDisclosures_MetadataAccount on MetadataAccount {
    nft {
      disclosures {
        details
        type
      }
    }
  }
`;

const ICON_FOR_NFT_DISCLOSURE_TYPE: Record<
  NftDisclosureTypeExpress_enum,
  JSX.Element
> = {
  AiArt: <AiIcon colorValue={ColorValue.Primary} />,
  Derivative: <ShuffleCrossIcon colorValue={ColorValue.Primary} />,
  Nsfw: <EyeOffIcon colorValue={ColorValue.Primary} />,
  [RELAY_FUTURE_ADDED_VALUE]: <AiIcon colorValue={ColorValue.Primary} />,
};

function Disclosure({
  details,
  icon,
  label,
}: {
  details: Maybe<string>;
  icon: JSX.Element;
  label: string;
}) {
  return (
    <FlexBox alignItems="flex-start" flexDirection="column" gap={12}>
      <FlexBox alignItems="center" className={styles.iconAndLabel} gap={12}>
        {icon}
        <Body1Medium colorClass={ColorClass.Primary}>{label}</Body1Medium>
      </FlexBox>
      {details != null && (
        <Body1 colorClass={ColorClass.Primary}>{details}</Body1>
      )}
    </FlexBox>
  );
}

type Props = {
  metadataAccount: NftInfoDisclosures_MetadataAccount$key;
};

export default function NftInfoDisclosures({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { disclosures } = metadataAccountData.nft;
  if (disclosures == null || disclosures.length === 0) {
    return null;
  }

  return (
    <NftLabelAndContent label="Disclosures">
      <FlexBox flexDirection="column" gap={24}>
        {[...disclosures]
          .sort(getCompareByProperty("type"))
          .map((disclosure) => (
            <Disclosure
              key={disclosure.type}
              details={disclosure.details}
              icon={ICON_FOR_NFT_DISCLOSURE_TYPE[disclosure.type]}
              label={getHumanReadableDisclosureType(disclosure.type, "short")}
            />
          ))}
      </FlexBox>
    </NftLabelAndContent>
  );
}
