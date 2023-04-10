import TextButton from "components/buttons/TextButton";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/landing/LandingEco.module.css";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import Marquee from "react-fast-marquee";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";
import Video from "components/videos/Video";
import getImgixUrl from "utils/getImgixUrl";
import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import shuffleArray from "utils/shuffleArray";
import isMobile from "utils/isMobile";

const SRCS = shuffleArray([
  {
    asset: getAssetCdnUrl("landing-page/genesis/100cmcube-480p.mp4"),
    link: "/@100cmcube/BV5vijbhgPfSnwqhRsDkSfMPFjSoVPA32Nnsmv5pR2rC",
  },
  {
    asset: getImgixUrl("landing-page/genesis/atoll.png"),
    link: "/@atoll/ED8TMJykxcBEZSSoYpzLhau7fgBvkbHr1dUrfNBMBGHB",
  },
  // "images/landing/marquee2/3.jpg",
  {
    asset: getImgixUrl("landing-page/genesis/bookstore.jpg"),
    link: "/@ilanderech/Go2kAW4yB9jGtwTyUsN4YSxPuPUVsE4Cf8Bb3SgNz7PE",
  },
  {
    asset: getAssetCdnUrl("landing-page/genesis/dark-side-of-moon-trimmed.mp4"),
    link: "/@versus_labs/7PXBeMyZuKhfvVCYTJao7p1WQo3FHbGTHTXK1uHyV91n",
  },
  {
    asset: getImgixUrl("landing-page/genesis/darksol.jpg"),
    link: "/@darksol/45baxea7xCDtkZxps4KgSMp24YsHAdpLr3n7qwcabU9e",
  },
  {
    asset: getAssetCdnUrl("landing-page/genesis/fields.mp4"),
    link: "/@mintrain/7feVEHbQrsQcwdXx5ixxN6rupe88JmckG98RaQ5JN8AV",
  },
  // "images/landing/marquee2/6.jpg",
  {
    asset: getImgixUrl("landing-page/genesis/houdakyi.jpg"),
    link: "/@houdakyi/AKgmQXRcqQ4eL5GoLJE4QgV2A5zkeJmssoVPk2MS9ra9",
  },
  {
    asset: getImgixUrl("landing-page/genesis/into-the-woods.jpg"),
    link: "/@dalegphoto/DK1Af6dziHrWzqujQ5xepVC8MMLCcoS2FWU6RDwFK4Be",
  },
  {
    asset: getImgixUrl("landing-page/genesis/mitzu.jpg"),
    link: "/@Mitzu_Sol/EgxmRTyK3ZDPCKhDco4RPPV6bA37KvLKqTtVHS3iiGK5",
  },
  {
    asset: getAssetCdnUrl("landing-page/genesis/notienatsu.mp4"),
    link: "/@notienatsu/8CEzBWQpDYAeKieSGCYPUKf44nBQryknYybFgqW9kcQA",
  },
  {
    asset: getImgixUrl("landing-page/genesis/partly-cloudy.png"),
    link: "/@pharrisdesigns/Ft3x6y7224QK8HpVnsdu4v29q14EWWndEs85r9Dj7n5s",
  },
  {
    asset: getAssetCdnUrl("landing-page/genesis/pegasus-trimmed2.mp4"),
    link: "/@hafftka/29hz5XCZVYuh98SCxmepkiMxvpDkdkf8U5Su37DYpujo",
  },
  {
    asset: getImgixUrl("landing-page/genesis/sun.png"),
    link: "/@celestialbody/EDLpVGLw58iCifUiCyUFUUAW1A7VWfE8pi8JeqtBsN24",
  },
]).slice(0, isMobile() ? 4 : 10);

function _MarqueeSection(): JSX.Element {
  return (
    <Marquee gradient={false} speed={55}>
      {/* Repeat for large screens (to avoid empty space) */}
      {SRCS.map(({ asset, link }, index) => (
        <a href={link} target="_blank" rel="noreferrer">
          {asset.includes("mp4") ? (
            <Video
              className={joinClasses(styles.image, GlobalClass.HideText)}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              src={asset}
            />
          ) : (
            <MaybeImgix src={asset}>
              <Imgix
                className={joinClasses(styles.image, GlobalClass.HideText)}
                disableSrcSet
                key={asset}
                src={asset}
                width={400}
              />
              <img
                className={joinClasses(styles.image, GlobalClass.HideText)}
                // eslint-disable-next-line react/no-array-index-key
                key={asset}
                src={asset}
              />
            </MaybeImgix>
          )}
        </a>
      ))}
    </Marquee>
  );
}

export default function LandingEco(): JSX.Element {
  return (
    <div>
      <ResponsiveContainer>
        <div className={styles.info}>
          <Header2 colorClass={ColorClass.Primary} textAlign="center">
            Collect and create amazing digital art, without the environmental
            footprint
          </Header2>
          <Body1
            className={styles.description}
            colorClass={ColorClass.Primary}
            textAlign="center"
          >
            Formfunction was created specifically for the Solana ecosystem. One
            transaction on Solana uses less energy than{" "}
            <TextButton
              buttonThemeOrColorClass={TextButtonTheme.Primary}
              display="inline"
              fontClass={FontClass.Body1}
              href="https://solana.com/news/solana-energy-usage-report-november-2021"
              textDecoration="underline"
              type="link_external"
            >
              two Google searches
            </TextButton>
            —so you can focus on the art, instead of your carbon footprint.
          </Body1>
        </div>
      </ResponsiveContainer>
      {/* <MarqueeSection /> */}
    </div>
  );
}
