import graphql from "babel-plugin-relay/macro";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import { NftLeftInfoEditionInfo_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftLeftInfoEditionInfo_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useEditionSupply from "hooks/useEditionSupply";
import useNftKind from "hooks/useNftKind";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/common/nft/NftLeftInfoEditionInfo.module.css";
import NftLeftInfoEditionPriceLine from "components/pages/common/nft/NftLeftInfoEditionPriceLine";
import InfoIcon from "components/icons/InfoIcon";
import ColorValue from "types/enums/ColorValue";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import GlobalClass from "types/enums/GlobalClass";
import pluralize from "formfn-shared/dist/utils/pluralize";
import dayjs from "utils/dates/dayjsex";

const fragment = graphql`
  fragment NftLeftInfoEditionInfo_MetadataAccount on MetadataAccount {
    nft {
      antiBotProtectionEnabled
      editionAllowlistEnabled
      editionPublicSaleStartTime
      editionBuyLimitPerAddress
      status
    }

    ...NftLeftInfoEditionPriceLine_MetadataAccount
    ...useEditionSupply_MetadataAccount
    ...useNftKind_MetadataAccount
  }
`;

function EditionInfoTextRow({
  content,
  title,
}: {
  content: JSX.Element | string;
  title: string;
}) {
  return (
    <Body1 colorClass={ColorClass.Primary}>
      <span className={FontClass.Body1Medium}>{title}:</span> {content}
    </Body1>
  );
}

type Props = {
  metadataAccount: NftLeftInfoEditionInfo_MetadataAccount$key;
};

export default function NftLeftInfoEditionInfo({ metadataAccount }: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const { nft } = metadataAccountData;
  const supply = useEditionSupply(metadataAccountData);

  if (nft.status !== "ListedEditions") {
    return null;
  }

  const { editionAllowlistEnabled, editionPublicSaleStartTime } = nft;

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply: {
      return (
        <NftLabelAndContent label="Edition Info">
          <div className={styles.rows}>
            <EditionInfoTextRow
              title="Supply"
              content={
                <>
                  {nftKind === NftKind.MasterEditionWithNonzeroSupply
                    ? supply
                    : "Unlimited"}{" "}
                  editions
                </>
              }
            />
            <NftLeftInfoEditionPriceLine
              metadataAccount={metadataAccountData}
            />
            {nft.editionBuyLimitPerAddress != null && (
              <EditionInfoTextRow
                title={
                  editionAllowlistEnabled &&
                  editionPublicSaleStartTime != null &&
                  dayjs().isBefore(dayjs(editionPublicSaleStartTime))
                    ? "Public sale buy limit"
                    : "Buy limit"
                }
                content={
                  <>
                    {nft.editionBuyLimitPerAddress}{" "}
                    {pluralize("edition", nft.editionBuyLimitPerAddress)} per
                    wallet
                  </>
                }
              />
            )}
            {nft.antiBotProtectionEnabled && (
              <div className={styles.botProtectionInfo}>
                <Body1 colorClass={ColorClass.Primary}>
                  Bot protection is turned on{" "}
                </Body1>
                <TextButton
                  className={GlobalClass.HideText}
                  buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                  href="https://help.formfunction.xyz/en/articles/6462459-how-bot-protection-works"
                  type="link_external"
                >
                  <InfoIcon colorValue={ColorValue.Secondary} size={24} />
                </TextButton>
              </div>
            )}
          </div>
        </NftLabelAndContent>
      );
    }
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
    case NftKind.Generative:
    case NftKind.OneOfOne:
    case NftKind.PnftMasterEdition:
    case NftKind.PnftStandardEdition:
      return null;
    default:
      return assertUnreachable(nftKind);
  }
}
