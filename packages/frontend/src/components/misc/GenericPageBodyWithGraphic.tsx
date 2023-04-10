import ResponsiveContainer from "components/containers/ResponsiveContainer";
import MaybeImgix from "components/images/MaybeImgix";
import Header3 from "components/text/Header3";
import Imgix from "react-imgix";
import styles from "css/misc/GenericPageBodyWithGraphic.module.css";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";

type Props = {
  button?: JSX.Element;
  imgSrc: string;
  primaryText: string;
  secondaryText?: string;
};

export default function GenericPageBodyWithGraphic({
  button,
  imgSrc,
  primaryText,
  secondaryText,
}: Props) {
  return (
    <ResponsiveContainer>
      <div className={styles.body}>
        <MaybeImgix src={imgSrc}>
          <img className={styles.image} src={imgSrc} />
          <Imgix className={styles.image} src={imgSrc} />
        </MaybeImgix>
        <Header3 colorClass={ColorClass.Primary} textAlign="center">
          {primaryText}
        </Header3>
        {secondaryText != null && (
          <Body1 colorClass={ColorClass.Secondary} textAlign="center">
            {secondaryText}
          </Body1>
        )}
        {button}
      </div>
    </ResponsiveContainer>
  );
}
