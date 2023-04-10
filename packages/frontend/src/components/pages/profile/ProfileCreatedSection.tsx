import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import TextButton from "components/buttons/TextButton";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import { useNavigate } from "react-router-dom";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import VideoQuality from "types/enums/VideoQuality";
import styles from "css/pages/profile/ProfileCreatedSection.module.css";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";
import Body1Medium from "components/text/Body1Medium";
import { NftsForAddress_MetadataAccount$data } from "components/pages/profile/__generated__/NftsForAddress_MetadataAccount.graphql";

function SectionHeader({
  href,
  label,
  name,
}: {
  href?: MaybeUndef<string>;
  label?: MaybeUndef<string>;
  name: string;
}): JSX.Element {
  const navigate = useNavigate();
  const onClick = href != null ? () => navigate(href) : undefined;

  const nameElem =
    href == null ? (
      <Header3 colorClass={ColorClass.Primary}>{name}</Header3>
    ) : (
      <TextButton
        className={styles.sectionHeaderName}
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.Header3}
        onClick={onClick}
      >
        {name}
      </TextButton>
    );

  const labelElem =
    label == null ? null : href == null ? (
      <Body1Medium colorClass={ColorClass.Primary}>{label}</Body1Medium>
    ) : (
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.Body1Medium}
        icon={<ChevronRightIcon colorValue={ColorValue.Secondary} />}
        iconPosition="right"
        onClick={onClick}
      >
        {label}
      </TextButton>
    );

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        {nameElem}
        {labelElem}
      </div>
    </div>
  );
}

export default function ProfileCreatedSection({
  accounts,
  href,
  label,
  name,
  showDivider,
}: {
  accounts: NftsForAddress_MetadataAccount$data;
  href?: MaybeUndef<string>;
  label?: MaybeUndef<string>;
  name: string;
  showDivider: boolean;
}) {
  return (
    <>
      {showDivider && <div className={styles.divider} />}
      <SectionHeader href={href} label={label} name={name} />
      <NftGridFullWidth>
        {accounts.map((node) => (
          <ListingCardForMetadata
            key={node.id}
            metadataAccount={node}
            desiredVideoQuality={VideoQuality.X2}
          />
        ))}
      </NftGridFullWidth>
    </>
  );
}
