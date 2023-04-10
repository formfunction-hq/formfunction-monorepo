import { useMemo, useState } from "react";

import ArtistPillButton from "components/buttons/ArtistPillButton";
import ButtonWithText from "components/buttons/ButtonWithText";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import SquareContainer from "components/containers/SquareContainer";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ImageWithArtistPillButton from "components/images/ImageWithArtistPillButton";
import Header1 from "components/text/Header1";
import Subheader from "components/text/Subheader";
import Video from "components/videos/Video";
import styles from "css/pages/landing/LandingHero.module.css";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";

import getImgixUrl from "utils/getImgixUrl";
import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import shuffleArray from "utils/shuffleArray";
import useFlagsTyped from "hooks/useFlagsTyped";
import LandingHeroSlideshowErrorBoundary from "components/pages/landing/LandingHeroSlideshowErrorBoundary";

function Left(): JSX.Element {
  return (
    <div className={styles.left}>
      <Header1 colorClass={ColorClass.Primary}>
        The digital art marketplace for Solana
      </Header1>
      <Subheader colorClass={ColorClass.Secondary}>
        Create and collect amazing digital art, without the negative
        environmental impact.
      </Subheader>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        href="/explore"
        icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
        type="link_internal"
      >
        Explore amazing art
      </ButtonWithText>
    </div>
  );
}

interface SlideshowData {
  artistName: string;
  artistSrc: string;
  contentSrc: string;
  nftSrc: string;
  playbackId?: string;
}

const SLIDESHOW_DEFAULT_VIDEOS = shuffleArray([
  {
    artistName: "NyanFT",
    artistSrc: getImgixUrl(
      "/users/5Kk1FKCTcjtyzcEehzFtrwjUcuFkpMRY1TELBqRHp5XK/images/profilePhoto-34_poLUct6jLjBj-FvBQ-.jpg?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/VbwZs3W-mdugqARPhDOxP.mp4"),
    nftSrc: "/@NyanFT/8VnE8bfpyeAvnovaaCp8fe55yyhmvtVdXwqQGeEs43qm",
    playbackId: "3CMXLawBwahGlSCtW1UPnhxp1YsSyg8OYnTi87nsRNg",
  },
  {
    artistName: "touche2516",
    artistSrc: getImgixUrl(
      "/users/DiXCtc9NUBxpoDMzvN2c7XwjRqjYyrrueeWwvh9ZegJV/images/profilePhoto-OgXOAP-afzN_LhpZmlTjE.jpg?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/fE3EVfde-y9KGOf5jsVAJ.mp4"),
    nftSrc: "/@touche2516/6GNkoRLmJaBkAK8ymznyLoR4dAvEjYb3vntQVeb4voEH",
    playbackId: "tJeb00TiZ9LrOF3qr1eyPxZwybLX02l6q4suj3o00h8BgM",
  },
  {
    artistName: "LoFronts",
    artistSrc: getImgixUrl(
      "/users/3CHuPbYsHQaNb9ZiBD2sUw1wN8Zy3MwRnmqTSVKLwWCa/images/profilePhoto-3zegT3-CAk6HCifLpn4YS.png?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/9sCei-V8PV5gpam25zana.mp4"),
    nftSrc: "/@LoFronts/GCebvMuts7DiYDjbAq89BevT2pv4B5j8JwRCg2N4KtbC",
    playbackId: "smLBNb004zrdLVgNUzQqwvNHRA7XTvPIolW1JzmXlbY8",
  },
]);

const SLIDESHOW_DEFAULT_IMAGES = shuffleArray([
  {
    artistName: "eko33",
    artistSrc: getImgixUrl(
      "/users/4mb4dTZ275XUTpbZB4SQSzbDUvEnqYY8ssQAx1r89NP9/images/profilePhoto-RCHK-bQV0-26PNmSr7uKV.jpeg?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/s6cwPt5tkUE-b5ffjXagV.png"),
    nftSrc: "/@eko33/FqSCPH51rKBrRhk5n3KDicB8sbESRViEjPLpitpqEr7A",
  },
  {
    artistName: "hakanihtiyaroglu",
    artistSrc: getImgixUrl(
      "/users/HAgWcsS46pYMsN5wAWDeHaumVDeSt1rn7MhBRUpVvvdJ/images/profilePhoto-xtmXRxx_X_GWm1nnHrU9X.png?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/d9WWKcVlhpn23gP7TW3Ct.jpg"),
    nftSrc: "/@hakanihtiyaroglu/Eoz8kbA7Yg4EWvBD1UGkBGBq78VSPhPLZBjtky4q9A2i",
  },
  {
    artistName: "Insaphiens",
    artistSrc: getImgixUrl(
      "/users/E1Hr2odspr2jLdFPMH1rrM38JVQANzzJANvBwvDUbX6r/images/profilePhoto-6UXYnMa94dgpl8Z6u_elQ.jpg?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/Q0nudx4YCw5bpnNZxwcxG.jpg"),
    nftSrc: "/@Insaphiens/8jXka8Kfzq8YAkPetwGzndToF98SrYgCKtDA2DGzK2Zz",
  },
  {
    artistName: "wawe",
    artistSrc: getImgixUrl(
      "/users/26ezCcpyCMN1wRyyAGKirFyqj73ik2tC81gPrVzm2iZb/images/profilePhoto-bBbrrFkWpifXT7ngM8-6J.png?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/6XX7KQ5AsvxUcfsA_Ime-.png"),
    nftSrc: "/@wawe/Dn9CFqcFtNU64gtckydGwufMmq6LoorZZHka2EcQq8nb",
  },
  {
    artistName: "maggieway",
    artistSrc: getImgixUrl(
      "/users/GAs5LKP3m2TDBzqS4WVRQeuvkFzggfB2qmFUX8xnHgHb/images/profilePhoto-ip3SuYfU7iXwQ8PHPZQlO.jpg?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/LPLbsw6fx--BVnjSR8Jfm.PNG"),
    nftSrc: "/@maggieway/GqBU79SZidGV4BXVRR553BDse4pSrbNFR4xg89ufpoRw",
  },
  {
    artistName: "fujmakes",
    artistSrc: getImgixUrl(
      "/users/2DEHQUHmuNzHKfz7MEjeKjH9U2gaq2jm8yLUDjGYkzyp/images/profilePhoto-g6BUIxr-14lTuxlCsrUSz.jpeg?q=70&auto=format",
      { width: 32 }
    ),
    contentSrc: getAssetCdnUrl("nft-images/UnzjSMQBdNGAq_VqbkVWx.png"),
    nftSrc: "/@fujmakes/CgqDFjSLu1qqDrX4uZqQS1TmwGGkyLEmTiw9pR96AWYy",
  },
]);

export const SLIDESHOW_DEFAULT_CONTENT = [
  ...SLIDESHOW_DEFAULT_IMAGES.slice(0, 2),
  SLIDESHOW_DEFAULT_VIDEOS[0],
  ...SLIDESHOW_DEFAULT_IMAGES.slice(2, 4),
  SLIDESHOW_DEFAULT_VIDEOS[1],
  ...SLIDESHOW_DEFAULT_IMAGES.slice(4),
  SLIDESHOW_DEFAULT_VIDEOS[2],
];

const SlideshowItem = ({
  data,
  isActive,
}: {
  data: SlideshowData;
  isActive: boolean;
}) => {
  const image = (
    <a
      className={styles.imageContainer}
      href={data.nftSrc}
      target="_blank"
      rel="noreferrer"
      style={{ display: "block" }}
    >
      <SquareContainer>
        {data.contentSrc.toLowerCase().endsWith("mp4") ||
        data.contentSrc.toLowerCase().endsWith("m4v") ? (
          <Video
            className={styles.image}
            playbackId={data.playbackId}
            src={data.contentSrc}
          />
        ) : (
          <img className={styles.image} src={data.contentSrc} />
        )}
      </SquareContainer>
    </a>
  );

  return (
    <ImageWithArtistPillButton
      artistPillButton={
        isActive ? (
          <ArtistPillButton
            isLinkExternal
            name={data.artistName}
            src={data.artistSrc}
          />
        ) : null
      }
      image={image}
    />
  );
};

export const Slideshow = ({ content }: { content: Array<SlideshowData> }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.slideshowContainer}>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        fadeEffect={{
          crossFade: true,
        }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        speed={1000}
        onTransitionStart={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {content.map((assetData, index) => (
          <SwiperSlide key={assetData.contentSrc}>
            <SlideshowItem data={assetData} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SlideshowComputeContent = () => {
  const flags = useFlagsTyped();
  const content = useMemo(() => {
    let toReturn = SLIDESHOW_DEFAULT_CONTENT;
    if (flags.heroPhotoAssets != null && flags.heroVideoAssets != null) {
      const shuffledPhotoAssets = shuffleArray(flags.heroPhotoAssets);
      const shuffledVideoAssets = shuffleArray(flags.heroVideoAssets);
      toReturn = [
        ...shuffledPhotoAssets.slice(0, 2),
        ...shuffledVideoAssets.slice(0, 1),
        ...shuffledPhotoAssets.slice(2, 4),
        ...shuffledVideoAssets.slice(1, 2),
        ...shuffledPhotoAssets.slice(4),
        ...shuffledVideoAssets.slice(2),
      ];
    }

    return toReturn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Slideshow content={content} />;
};

export default function LandingHero(): JSX.Element {
  return (
    <ResponsiveContainer className={styles.container}>
      <Left />
      <LandingHeroSlideshowErrorBoundary>
        <SlideshowComputeContent />
      </LandingHeroSlideshowErrorBoundary>
    </ResponsiveContainer>
  );
}
