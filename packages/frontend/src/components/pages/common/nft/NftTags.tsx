import graphql from "babel-plugin-relay/macro";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/common/nft/NftTags.module.css";
import { NftTags_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftTags_MetadataAccount.graphql";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";

const fragment = graphql`
  fragment NftTags_MetadataAccount on MetadataAccount {
    tags
  }
`;

type Props = {
  metadataAccount: NftTags_MetadataAccount$key;
};

export default function NftTags({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { tags } = metadataAccountData;

  if (tags.length === 0) {
    return null;
  }

  return (
    <NftLabelAndContent label="Tags">
      <div className={styles.tags}>
        {tags.map((tag) => (
          <TextButton
            key={tag}
            buttonThemeOrColorClass={TextButtonTheme.Primary}
            fontClass={FontClass.Body1}
            href={`/tags/${tag}`}
            type="link_internal"
          >
            #{tag}
          </TextButton>
        ))}
      </div>
    </NftLabelAndContent>
  );
}
