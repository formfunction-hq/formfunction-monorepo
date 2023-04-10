import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import { SettleSaleModalContent_MetadataAccount$key } from "components/modal/__generated__/SettleSaleModalContent_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import styles from "css/modal/SettleSaleModalContent.module.css";
import { useFragment } from "react-relay";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import MaybeImgix from "components/images/MaybeImgix";
import Video from "components/videos/Video";
import Imgix from "react-imgix";
import LongArrowDownGradientIcon from "components/icons/LongArrowDownGradientIcon";
import LongArrowLeftGradientIcon from "components/icons/LongArrowLeftGradientIcon";
import LongArrowRightGradientIcon from "components/icons/LongArrowRightGradientIcon";
import LongArrowUpGradientIcon from "components/icons/LongArrowUpGradientIcon";
import Body1Medium from "components/text/Body1Medium";
import { FONT_BREAKPOINT } from "constants/Breakpoints";
import useWindowDimensions from "hooks/useWindowDimensions";
import Header2 from "components/text/Header2";
import { SettleSaleModalContent_UserExpress$key } from "components/modal/__generated__/SettleSaleModalContent_UserExpress.graphql";
import useColorModeContext from "hooks/useColorModeContext";
import LongArrowDownIcon from "components/icons/LongArrowDownIcon";
import ColorValue from "types/enums/ColorValue";
import LongArrowRightIcon from "components/icons/LongArrowRightIcon";
import LongArrowUpIcon from "components/icons/LongArrowUpIcon";
import LongArrowLeftIcon from "components/icons/LongArrowLeftIcon";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const userFragment = graphql`
  fragment SettleSaleModalContent_UserExpress on UserExpress {
    ...ArtistPillButtonForUserExpress_UserExpress
  }
`;

const fragment = graphql`
  fragment SettleSaleModalContent_MetadataAccount on MetadataAccount {
    contentType

    offchainData {
      image
    }

    nft {
      Owner {
        ...ArtistPillButtonForUserExpress_UserExpress
      }
    }
  }
`;

function NftCard({
  metadataAccount,
}: {
  metadataAccount: SettleSaleModalContent_MetadataAccount$key;
}): JSX.Element {
  const data = useFragment(fragment, metadataAccount);
  const src = data.offchainData.image;
  return (
    <div className={styles.card}>
      {data.contentType.includes("video") ? (
        <Video className={styles.image} src={src} />
      ) : (
        <MaybeImgix src={src}>
          <Imgix className={styles.image} src={src} sizes="50vw" />
          <img className={styles.image} src={src} />
        </MaybeImgix>
      )}
      <ArtistPillButtonForUserExpress user={data.nft.Owner!} />
    </div>
  );
}

function InBetween({ symbol }: { symbol: string }): JSX.Element {
  const { width } = useWindowDimensions();
  const isMobile = width <= FONT_BREAKPOINT;
  const { isDarkMode } = useColorModeContext();

  return (
    <div className={styles.inBetween}>
      <div className={styles.inBetweenSection}>
        <Body1Medium colorClass={ColorClass.Primary}>NFT</Body1Medium>
        {isMobile ? (
          isDarkMode ? (
            <LongArrowDownIcon colorValue={ColorValue.BrightPurple} />
          ) : (
            <LongArrowDownGradientIcon />
          )
        ) : isDarkMode ? (
          <LongArrowRightIcon colorValue={ColorValue.BrightPurple} />
        ) : (
          <LongArrowRightGradientIcon />
        )}
      </div>
      <div className={styles.inBetweenSection}>
        {!isMobile && (
          <Body1Medium colorClass={ColorClass.Primary}>{symbol}</Body1Medium>
        )}
        {isMobile ? (
          isDarkMode ? (
            <LongArrowUpIcon colorValue={ColorValue.BrightPurple} />
          ) : (
            <LongArrowUpGradientIcon />
          )
        ) : isDarkMode ? (
          <LongArrowLeftIcon colorValue={ColorValue.BrightPurple} />
        ) : (
          <LongArrowLeftGradientIcon />
        )}
        {isMobile && (
          <Body1Medium colorClass={ColorClass.Primary}>{symbol}</Body1Medium>
        )}
      </div>
    </div>
  );
}

function BuyerCard({
  price,
  user,
}: {
  price: {
    amount: string;
    shortSymbol: Maybe<string>;
    symbol: string;
  };
  user: SettleSaleModalContent_UserExpress$key;
}): JSX.Element {
  const data = useFragment(userFragment, user);
  const { amount: formattedPrice, shortSymbol, symbol } = price;

  return (
    <div className={styles.card}>
      <div className={styles.priceContainer}>
        <Header2 textAlign="center" colorClass={ColorClass.Primary}>
          {formattedPrice} {shortSymbol ?? symbol}
        </Header2>
      </div>
      <ArtistPillButtonForUserExpress user={data} />
    </div>
  );
}

type Props = {
  buttonText: string;
  buyer: SettleSaleModalContent_UserExpress$key;
  description: string;
  isLoading: boolean;
  metadataAccount: SettleSaleModalContent_MetadataAccount$key;
  onClick: () => void;
  price: {
    amount: string;
    shortSymbol: Maybe<string>;
    symbol: string;
  };
};

export default function SettleSaleModalContent({
  buttonText,
  buyer,
  description,
  price,
  isLoading,
  metadataAccount,
  onClick,
}: Props) {
  const { symbol } = price;
  return (
    <div className={styles.body}>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        {description}
      </Body1>
      <div className={styles.cards}>
        <NftCard metadataAccount={metadataAccount} />
        <InBetween symbol={symbol} />
        <BuyerCard price={price} user={buyer} />
      </div>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.button}
        fontClass={FontClass.NavLink}
        onClick={onClick}
        isLoading={isLoading}
      >
        {buttonText}
      </ButtonWithText>
    </div>
  );
}
