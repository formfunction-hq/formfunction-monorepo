import styles from "css/pages/common/nft/NftTransactionComment.module.css";
import Body1 from "components/text/Body1";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import ColorClass from "types/enums/ColorClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export type Props = {
  comment: Maybe<string>;
};

export default function NftTransactionComment({ comment }: Props) {
  if (isEmptyString(comment)) {
    return null;
  }

  return (
    <Body1 className={styles.comment} colorClass={ColorClass.Primary}>
      {comment}
    </Body1>
  );
}
