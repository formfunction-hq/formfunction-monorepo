import FontClass from "types/enums/FontClass";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import styles from "css/pages/landing/LandingFooter.module.css";
import useBottomTabsContext from "hooks/useBottomTabsContext";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import TwitterFilledIcon from "components/icons/TwitterFilledIcon";
import ColorValue from "types/enums/ColorValue";
import TinyLabel from "components/text/TinyLabel";
import DiscordFilledIcon from "components/icons/DiscordFilledIcon";
import HELP_LINK from "constants/HelpLink";
import { Link } from "react-router-dom";
import dayjs from "utils/dates/dayjsex";
import DISCORD_INVITE_LINK from "constants/DiscordInviteLink";
import useColorModeContext from "hooks/useColorModeContext";
import ToggleButtonForColorMode from "components/buttons/ToggleButtonForColorMode";
import InstagramIcon from "components/icons/InstagramIcon";

type LinkObject = {
  href: string;
  label: string;
  type?: "link_external" | "link_internal";
};
function LinksSection({
  links,
  title,
}: {
  links: Array<LinkObject>;
  title: string;
}): JSX.Element {
  return (
    <div className={styles.linksSection}>
      <TinyLabel
        className={styles.partiallyTransparent}
        colorClass={ColorClass.White}
        textTransform="uppercase"
      >
        {title}
      </TinyLabel>
      {links.map((link) => (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.White}
          fontClass={FontClass.NavLink}
          href={link.href}
          key={link.href}
          type={link.type ?? "link_external"}
        >
          {link.label}
        </TextButton>
      ))}
    </div>
  );
}

function LogoSection(): JSX.Element {
  return (
    <div className={styles.logoSection}>
      <Link className={styles.logo} to="/">
        <img className={styles.logoImage} src="/images/logo-white.svg" />
        <h3 className={styles.logoText}>formfunction</h3>
      </Link>
      <Body2 colorClass={ColorClass.White}>
        Formfunction is the Solana NFT marketplace made for independent
        creators.
      </Body2>
      <div className={styles.icons}>
        <a
          href="https://twitter.com/formfunction"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterFilledIcon colorValue={ColorValue.White} />
        </a>
        <a href={DISCORD_INVITE_LINK} target="_blank" rel="noreferrer">
          <DiscordFilledIcon colorValue={ColorValue.White} />
        </a>
        <a
          href="https://www.instagram.com/formfunction.xyz/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon colorValue={ColorValue.White} size={24} />
        </a>
      </div>
    </div>
  );
}

function TermsSection(): JSX.Element {
  return (
    <div className={styles.termsSection}>
      <Body2
        className={styles.partiallyTransparent}
        colorClass={ColorClass.White}
      >
        Copyright ⓒ {dayjs().year()}
      </Body2>
      <Body2
        className={styles.partiallyTransparent}
        colorClass={ColorClass.White}
      >
        •
      </Body2>
      <TextButton
        className={styles.partiallyTransparent}
        buttonThemeOrColorClass={TextButtonTheme.White}
        fontClass={FontClass.Body2}
        href="/privacy.pdf"
        type="link_external"
      >
        Privacy
      </TextButton>
      <Body2
        className={styles.partiallyTransparent}
        colorClass={ColorClass.White}
      >
        •
      </Body2>
      <TextButton
        className={styles.partiallyTransparent}
        buttonThemeOrColorClass={TextButtonTheme.White}
        fontClass={FontClass.Body2}
        href="/terms.pdf"
        type="link_external"
      >
        Terms
      </TextButton>
    </div>
  );
}

export default function LandingFooter(): JSX.Element {
  const { isLightMode } = useColorModeContext();
  const { hasBottomTabs, hasBottomTabsProvider, hideBottomTabs } =
    useBottomTabsContext();

  if (hasBottomTabs === undefined && hasBottomTabsProvider) {
    return <div />;
  }

  if (hasBottomTabs) {
    if (hideBottomTabs) {
      return <div />;
    }

    return <div className={styles.hasBottomTabs} />;
  }
  const careerLinks: Array<LinkObject> = [
    { href: "/about", label: "About", type: "link_internal" },
    {
      href: "https://formfunction.notion.site/Join-Formfunction-4d162e0369174c6c8a69b0653a7e594b",
      label: "Careers",
    },
    {
      href: HELP_LINK,
      label: "Help",
    },
    {
      href: "https://blog.formfunction.xyz/",
      label: "Blog",
    },
    {
      href: "https://www.blog.formfunction.xyz/artist-playbook",
      label: "Artist playbook",
    },
  ];

  return (
    <div
      className={styles.containerOuter}
      style={{
        borderTop: isLightMode ? undefined : `1px solid ${ColorValue.Tertiary}`,
      }}
    >
      <ResponsiveContainer className={styles.container}>
        <div className={styles.body}>
          <LogoSection />
          <div className={styles.links}>
            <LinksSection links={careerLinks} title="Company" />
            <LinksSection
              links={[
                {
                  href: "/apply",
                  label: "Join as an artist",
                  type: "link_internal",
                },
                {
                  href: "/stats?tab=Creators",
                  label: "Creator stats",
                  type: "link_internal",
                },
                {
                  href: "https://formfunction.canny.io/feature-requests",
                  label: "Feature requests",
                  type: "link_external",
                },
              ]}
              title="For Creators"
            />
            <LinksSection
              links={[
                {
                  href: "/stats?tab=Collectors",
                  label: "Collector stats",
                  type: "link_internal",
                },
              ]}
              title="For Collectors"
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <TermsSection />
          <ToggleButtonForColorMode />
        </div>
      </ResponsiveContainer>
    </div>
  );
}
