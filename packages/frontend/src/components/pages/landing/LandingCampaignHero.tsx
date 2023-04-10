import graphql from "babel-plugin-relay/macro";
import ConnectWalletButton from "components/buttons/ConnectWalletButton";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import HeaderLanding from "components/header/landing/HeaderLanding";
import ExploreCampaignCardForCampaignV2 from "components/pages/explore/ExploreCampaignCardForCampaignV2";
import { LandingCampaignHeroQuery } from "components/pages/landing/__generated__/LandingCampaignHeroQuery.graphql";
import styles from "css/pages/landing/LandingCampaignHero.module.css";
import useUserContext from "hooks/useUserContext";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import HeaderTheme from "types/enums/HeaderTheme";
import joinClasses from "utils/joinClasses";
import ButtonWithText from "../../buttons/ButtonWithText";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import dayjs from "utils/dates/dayjsex";

import "swiper/css";
import "swiper/css/pagination";
import CircleArrowButton from "components/buttons/CircleArrowButton";
import useFlagsTyped from "hooks/useFlagsTyped";
import { range } from "formfn-shared/dist/utils/range";
import ExploreCampaignCardSkeleton from "components/pages/explore/skeletons/ExploreCampaignCardSkeleton";
import useDocumentBodyDimensions from "hooks/useDocumentBodyDimensions";
import ExploreCampaignCard from "components/pages/explore/ExploreCampaignCard";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import Body2Medium from "components/text/Body2Medium";
import ColorClass from "types/enums/ColorClass";
import AssetGeneric from "components/assets/AssetGeneric";
import CampaignProgress from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgress";

SwiperCore.use([Pagination]);

const CREATE_CAMPAIGN = "Create a Campaign";

export const query = graphql`
  query LandingCampaignHeroQuery {
    CampaignsNamespace {
      campaignsForHero {
        campaigns {
          id
          status
          ...ExploreCampaignCardForCampaignV2_CampaignV2
        }
      }
    }
  }
`;

function getLaunchDate(launchDate: string) {
  return dayjs(launchDate).isValid() ? dayjs(launchDate) : launchDate;
}

function NavButtons() {
  const swiper = useSwiper();

  return (
    <>
      <CircleArrowButton
        className={styles.buttonLeft}
        direction="left"
        onClick={() => swiper.slidePrev()}
      />
      <CircleArrowButton
        className={styles.buttonRight}
        direction="right"
        onClick={() => swiper.slideNext()}
      />
    </>
  );
}

function CampaignSwiper({ children }: { children: any }) {
  const { width } = useDocumentBodyDimensions();

  return (
    <Swiper
      breakpoints={{
        1280: {
          slidesPerView: 3,
          spaceBetween: 56,
        },
        700: {
          slidesPerView: 2,
          spaceBetween: 36,
        },
      }}
      centerInsufficientSlides
      className={styles.swiper}
      effect="slide"
      loop
      loopAdditionalSlides={3}
      pagination={
        // Keep in sync with LandingCampaignHero.module.css
        width > 768
          ? false
          : {
              dynamicBullets: true,
              horizontalClass: styles.pagination,
            }
      }
      slidesPerView={1}
      spaceBetween={32}
    >
      {children}
    </Swiper>
  );
}

function CampaignCards() {
  const data = useLazyLoadQuery<LandingCampaignHeroQuery>(query, {});
  const { campaigns } = data.CampaignsNamespace.campaignsForHero;
  const { campaignHeroConfig } = useFlagsTyped();
  const inactiveStyle = { opacity: 0.7 };

  return (
    <CampaignSwiper>
      {campaigns.map((campaign) => {
        const ldCampaign = campaignHeroConfig.campaigns.find(
          (campaignInner) => campaignInner.id === campaign.id
        );
        const launchDate =
          ldCampaign?.launchDate == null
            ? undefined
            : getLaunchDate(ldCampaign.launchDate);
        const isInactive =
          launchDate != null &&
          typeof launchDate !== "string" &&
          dayjs().isBefore(launchDate) &&
          !["Published", "Concluded"].includes(campaign.status);

        return (
          <SwiperSlide
            className={styles.swiperSlide}
            key={campaign.id}
            style={isInactive ? inactiveStyle : undefined}
          >
            <ExploreCampaignCardForCampaignV2
              campaign={campaign}
              launchDate={launchDate}
            />
          </SwiperSlide>
        );
      })}
      {campaignHeroConfig.campaignPreviews?.map((campaignPreview) => {
        const launchDate = getLaunchDate(campaignPreview.launchDate);
        const progressDescription = (
          <Body2Medium colorClass={ColorClass.Secondary}>
            Launching{" "}
            {typeof launchDate === "string"
              ? launchDate
              : launchDate.format("MMMM D")}
          </Body2Medium>
        );

        return (
          <SwiperSlide
            className={styles.swiperSlide}
            key={campaignPreview.title}
            style={inactiveStyle}
          >
            <ExploreCampaignCard
              artistPillButton={
                <ArtistPillButton
                  name={campaignPreview.creator.username}
                  src={campaignPreview.creator.profilePhotoSrc}
                />
              }
              asset={
                <AssetGeneric
                  asset={{
                    // Technically could be a different image type like png, but that doesn't affect functionality.
                    contentType: "image/jpeg",
                    downloadUrl: campaignPreview.previewSrc,
                    videoPlaybackId: null,
                  }}
                  borderRadius={16}
                  imgixWidth={1000}
                  objectFit="cover"
                  height="100%"
                  showDropShadow
                  width="100%"
                />
              }
              campaignHref={null}
              description={campaignPreview.description}
              nftAssets={null}
              progressTowardsGoal={
                <CampaignProgress
                  descriptionOverride={progressDescription}
                  displayType="compact"
                  goalDescription=""
                  progress=""
                  currentAmount={0}
                  goalAmount={0}
                  emojiMarker={campaignPreview.emoji}
                />
              }
              title={campaignPreview.title}
            />
          </SwiperSlide>
        );
      })}
      <NavButtons />
    </CampaignSwiper>
  );
}

function CampaignCardsSkeleton() {
  return (
    <CampaignSwiper>
      {range(5).map((i) => (
        <SwiperSlide key={i} className={styles.swiperSlide}>
          <ExploreCampaignCardSkeleton showNftAssets={false} />
        </SwiperSlide>
      ))}
      <NavButtons />
    </CampaignSwiper>
  );
}

export default function LandingCampaignHero() {
  const { user } = useUserContext();

  const createCampaignButton =
    user == null ? (
      <ConnectWalletButton
        alternateSignInText={CREATE_CAMPAIGN}
        buttonTheme={ButtonTheme.WhiteWithPurpleGradient}
      />
    ) : (
      <ButtonWithText
        buttonTheme={ButtonTheme.WhiteWithPurpleGradient}
        fontClass={FontClass.NavLink}
        href={`/@${user.username}/campaigns`}
        type="link_internal"
      >
        {CREATE_CAMPAIGN}
      </ButtonWithText>
    );

  return (
    <div className={styles.container}>
      <HeaderLanding headerTheme={HeaderTheme.Light} />
      <ResponsiveContainer className={styles.content}>
        <div className={styles.headerSmall}>Introducing Campaigns</div>
        <div className={styles.headerBig}>Bring your dream project to life</div>
        <div className={styles.descriptionContainer}>
          <div className={joinClasses(styles.description, styles.description1)}>
            A new way for creators to bring their creative projects into the
            world
          </div>
          <div className={styles.description}>
            Raise funds with NFTs • Provide perks to supporters • Build
            community around your creative work
          </div>
        </div>
        <div className={styles.buttons}>
          {createCampaignButton}
          <ButtonWithText
            buttonTheme={ButtonTheme.WhiteOutline}
            fontClass={FontClass.NavLink}
            href="https://www.blog.formfunction.xyz/blog/introducing-campaigns"
            type="link_external"
          >
            Learn More
          </ButtonWithText>
        </div>
        <div className={styles.cardsContainer}>
          <Suspense fallback={<CampaignCardsSkeleton />}>
            <CampaignCards />
          </Suspense>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
