/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

// We don't want to expose all flags to the client, some are meant to be
// server-side only.
const LD_BLACKLIST = [
  "devnetRpcRetryUrls",
  "devnetRpcUrl",
  "mainnetRpcUrl",
  "mainnetRpcRetryUrls",
  "testnetRpcUrl",
];

// See isValidUsername.ts for actual username validation regex.
// We special case `:` since we allowed a user to register
// using `:` while the Regex was incorrect (used . instead of \.)
const USER_CAMPAIGN_PATH_REGEX =
  /^\/@([a-zA-Z0-9_]+([.:][a-zA-Z0-9_]+)*)\/campaigns\/([a-zA-Z0-9-]+)$/;
const USER_PROFILE_PATH_REGEX = /^\/@([a-zA-Z0-9_]+([.:][a-zA-Z0-9_]+)*)$/;
const USER_SERIES_PATH_REGEX =
  /^\/@([a-zA-Z0-9_]+([.:][a-zA-Z0-9_]+)*)\/series\/([a-zA-Z0-9-]+)$/;
const NFT_LISTING_PATH_REGEX =
  // We intentionally match on /@/... since these are valid
  // URLs for matching NFT listings
  /^\/@([a-zA-Z0-9_]+([.:][a-zA-Z0-9_]+)*)*\/([1-9A-HJ-NP-Za-km-z]+)$/;
const FORMFUNCTION_WEBSITE_TITLE = "Formfunction - NFT Marketplace";
const FORMFUNCTION_DESCRIPTION =
  "Formfunction is the digital art marketplace for Solana. Create and collect amazing digital art, without harming the environment.";
const ONE_DAY_IN_SECONDS = 3600 * 24;

const DEFAULT_TAG_VALUES = {
  ASSET_HEIGHT: "500",
  ASSET_WIDTH: "500",
  OG_DESCRIPTION: FORMFUNCTION_DESCRIPTION,
  OG_IMAGE:
    "https://firebasestorage.googleapis.com/v0/b/formfn-ed6b4.appspot.com/o/formfunction-facebook-preview2.png?alt=media&token=fc494364-5372-4a3d-a947-5f7810abd66d",
  OG_TITLE: FORMFUNCTION_WEBSITE_TITLE,
  OG_TYPE: "website",
  OG_URL: "https://www.formfunction.xyz/",
  TWITTER_CARD: "summary_large_image",
  TWITTER_DESCRIPTION: FORMFUNCTION_DESCRIPTION,
  TWITTER_IMAGE:
    "https://firebasestorage.googleapis.com/v0/b/formfn-ed6b4.appspot.com/o/formfunction-twitter-preview2.png?alt=media&token=191f304a-5ca4-490a-98b8-cbab9a896088",
  TWITTER_SITE: "@formfunction",
  TWITTER_TITLE: FORMFUNCTION_WEBSITE_TITLE,
};

function getApiUrl(url: string, apiUrlFromEnv: string) {
  // Dev and prod actually point to the same build so we need
  // to intercept and return the dev API if the request is made
  // against dev
  if (url.includes("dev.formfunction.xyz")) {
    return "https://apidev.formfunction.xyz";
  }

  return apiUrlFromEnv;
}

function getTags(
  tagValues: {
    ASSET_HEIGHT: string;
    ASSET_WIDTH: string;
    OG_DESCRIPTION: string;
    OG_IMAGE: string;
    OG_TITLE: string;
    OG_TYPE: string;
    OG_URL: string;
    TWITTER_CARD: string;
    TWITTER_DESCRIPTION: string;
    TWITTER_IMAGE: string;
    TWITTER_SITE: string;
    TWITTER_TITLE: string;
  } = DEFAULT_TAG_VALUES
) {
  return [
    `<meta property="og:url" content="${tagValues.OG_URL}"/>`,
    `<meta property="og:type" content="${tagValues.OG_TYPE}" />`,
    `<meta property="og:title" content="${tagValues.OG_TITLE}" />`,
    `<meta property="og:description"
    content="${tagValues.OG_DESCRIPTION}" />`,
    `<meta property="og:image"
    content="${tagValues.OG_IMAGE}"/>`,
    `<meta name="twitter:card" content="${tagValues.TWITTER_CARD}" />`,
    `<meta name="twitter:site" content="${tagValues.TWITTER_SITE}" />`,
    `<meta name="twitter:title" content="${tagValues.TWITTER_TITLE}" />`,
    `<meta name="twitter:description"
    content="${tagValues.TWITTER_DESCRIPTION}" />`,
    `<meta name="twitter:image"
    content="${tagValues.TWITTER_IMAGE}" />`,
    `<meta property="asset:width" content="${tagValues.ASSET_WIDTH}"/>`,
    `<meta property="asset:height" content="${tagValues.ASSET_HEIGHT}"/>`,
  ];
}

type HeadHandlerInput = {
  assetHeight?: string;
  assetWidth?: string;
  campaignSlug?: string;
  description?: string;
  image: string;
  mint?: string;
  name: string;
  seriesSlug?: string;
  username?: string;
};

enum PageType {
  CampaignPage,
  NftListingPage,
  UserProfilePage,
  UserSeriesPage,
  Other,
}

class HeadHandler {
  private input: HeadHandlerInput | null;

  private pageType: PageType;

  constructor(
    input: HeadHandlerInput | null,
    pageType: PageType = PageType.Other
  ) {
    this.input = input;
    this.pageType = pageType;
  }

  getTitle() {
    const { name, username } = this.input;

    if (this.pageType === PageType.CampaignPage && name) {
      return `${name} | ${FORMFUNCTION_WEBSITE_TITLE}`;
    }

    if (this.pageType === PageType.NftListingPage && name) {
      return `${name} | ${FORMFUNCTION_WEBSITE_TITLE}`;
    }

    if (this.pageType === PageType.UserSeriesPage && name) {
      return `${name} | ${FORMFUNCTION_WEBSITE_TITLE}`;
    }

    if (this.pageType === PageType.UserProfilePage) {
      if (name && username) {
        return `${name} (@${username}) | ${FORMFUNCTION_WEBSITE_TITLE}`;
      }
      if (name && !username) {
        return `${name} | ${FORMFUNCTION_WEBSITE_TITLE}`;
      }
      if (username && !name) {
        return `@${username} | ${FORMFUNCTION_WEBSITE_TITLE}`;
      }
    }

    return FORMFUNCTION_WEBSITE_TITLE;
  }

  getOgUrl() {
    const { campaignSlug, username, mint, seriesSlug } = this.input;
    if (this.pageType === PageType.NftListingPage && mint) {
      // We intentionally allow null usernames since /@/... is a
      // valid URL for NFT listings
      return `https://formfunction.xyz/@${username ?? ""}/${mint}`;
    }

    if (this.pageType === PageType.CampaignPage && username && campaignSlug) {
      return `https://formfunction.xyz/@${username}/campaigns/${campaignSlug}`;
    }

    if (this.pageType === PageType.UserSeriesPage && username && seriesSlug) {
      return `https://formfunction.xyz/@${username}/series/${seriesSlug}`;
    }

    if (this.pageType === PageType.UserProfilePage && username) {
      return `https://formfunction.xyz/@${username}`;
    }

    return DEFAULT_TAG_VALUES.OG_URL;
  }

  // See https://stackoverflow.com/a/5251552 and
  // https://stackoverflow.com/a/2083770 for escape characters
  escapeStringForHtmlAttribute(s: string) {
    const lookup = {
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
    };
    return s.replace(/[&"'<>]/g, (c) => lookup[c]);
  }

  element(element: Element) {
    if (this.input == null) {
      getTags(DEFAULT_TAG_VALUES).forEach((tag) =>
        element.append(tag, {
          html: true,
        })
      );
      return;
    }

    const title = this.escapeStringForHtmlAttribute(this.getTitle());
    const ogUrl = this.getOgUrl();
    const image = this.input.image
      ? this.escapeStringForHtmlAttribute(this.input.image)
      : DEFAULT_TAG_VALUES.OG_IMAGE;
    const description =
      this.input.description ?? DEFAULT_TAG_VALUES.OG_DESCRIPTION;
    const { assetHeight } = this.input;
    const { assetWidth } = this.input;

    const tagValues = {
      ...DEFAULT_TAG_VALUES,
      ASSET_HEIGHT: assetHeight,
      ASSET_WIDTH: assetWidth,
      OG_DESCRIPTION: description,
      OG_IMAGE: image,
      OG_TITLE: title,
      OG_URL: ogUrl,
      TWITTER_DESCRIPTION: description,
      TWITTER_IMAGE: image,
      TWITTER_TITLE: title,
    };

    getTags(tagValues).forEach((tag) =>
      element.append(tag, {
        html: true,
      })
    );
  }
}

/**
 * Adds a script tag to <head> that contains LD flags that the frontend can be bootstrapped with.
 */
class LaunchDarklyHandler {
  flags: { [key: string]: any } = {};

  url: string;

  constructor(url: string) {
    this.url = url;
  }

  element(element: Element) {
    element.append(
      `<script id="ldbootstrap" type="text/json">${JSON.stringify(
        this.flags
      )}</script>`,
      {
        html: true,
      }
    );
  }

  async populateFlags(env: any) {
    const ldEnv = this.getEnvironment();

    try {
      // First, try to get from KV store
      const kvFlags = await env.launchDarkly.get(ldEnv);
      if (kvFlags != null) {
        this.flags = JSON.parse(kvFlags);
        return;
      }

      const response = await fetch(
        `https://app.launchdarkly.com/api/v2/users/default/${ldEnv}/example_user/flags`,
        {
          headers: {
            Authorization: env.LD_API_KEY,
          },
        }
      );
      const json: { [key: string]: any } = await response.json();
      const flagsArr = Object.keys(json.items)
        .filter((itemKey) => !LD_BLACKLIST.includes(itemKey))
        .map((itemKey) => ({
          [itemKey]: json.items[itemKey]._value,
        }));
      this.flags = Object.assign({}, ...flagsArr);

      // Add to KV store
      env.launchDarkly.put(ldEnv, JSON.stringify(this.flags), {
        // Expire after 60 seconds
        expirationTtl: 60,
      });
    } catch (e) {
      // Do nothing
    }
  }

  getEnvironment() {
    if (this.url.includes("localhost")) {
      return "local";
    }

    if (this.url.includes("dev.")) {
      return "test";
    }

    if (this.url.includes("test.")) {
      return "testnet";
    }

    return "production";
  }

  shouldPopulateFlags() {
    return !(
      this.url.includes("/static") ||
      this.url.includes("/images") ||
      this.url.includes("favicon")
    );
  }
}

async function getHeadHandlerForNftListingMetaTags(
  url: string,
  username: string,
  mint: string,
  env: any
) {
  const [name, image, dimensions] = await Promise.all([
    env.nftNameByMint.get(mint),
    env.nftImageByMint.get(mint),
    env.nftAssetDimensionsByMint.get(mint),
  ]);

  if (name != null && image != null && dimensions != null) {
    const { width, height } = JSON.parse(dimensions);
    return new HeadHandler(
      { assetHeight: height, assetWidth: width, image, mint, name, username },
      PageType.NftListingPage
    );
  }

  let nftMetadata;
  try {
    nftMetadata = await fetch(
      `${getApiUrl(url, env.API_URL)}/intern/nfts/${mint}/metadata`,
      {
        headers: {
          check: "fofu",
        },
      }
    ).then((res) => res.json());
  } catch (e: any) {
    return new HeadHandler(null, PageType.NftListingPage);
  }

  if (nftMetadata == null) {
    return new HeadHandler(null, PageType.NftListingPage);
  }

  const dimensionsKV = JSON.stringify({
    height: nftMetadata.assetHeight,
    width: nftMetadata.assetWidth,
  });

  await Promise.all([
    env.nftNameByMint.put(mint, nftMetadata.name),
    env.nftImageByMint.put(mint, nftMetadata.image),
    env.nftAssetDimensionsByMint.put(mint, dimensionsKV),
  ]);

  return new HeadHandler(
    { ...nftMetadata, mint, username },
    PageType.NftListingPage
  );
}

async function getHeadHandlerForUserProfileMetaTags(
  url: string,
  username: string,
  env: any
) {
  const [displayName, image] = await Promise.all([
    env.userDisplayNameByUsername.get(username),
    env.userImageByUsername.get(username),
  ]);
  if ((displayName != null && displayName !== "") || image != null) {
    return new HeadHandler(
      { image, name: displayName, username },
      PageType.UserProfilePage
    );
  }

  let userData;
  try {
    userData = await fetch(
      `${getApiUrl(url, env.API_URL)}/intern/users/${username}`,
      {
        headers: {
          check: "fofu",
        },
      }
    ).then((res) => res.json());
  } catch (e: any) {
    return new HeadHandler(null, PageType.UserProfilePage);
  }

  if (userData == null) {
    return new HeadHandler(null, PageType.UserProfilePage);
  }

  const kvPromises = [];
  if (userData.displayName != null) {
    kvPromises.push(
      env.userDisplayNameByUsername.put(username, userData.displayName, {
        expirationTtl: ONE_DAY_IN_SECONDS,
      })
    );
  }
  if (userData.image != null) {
    kvPromises.push(
      env.userImageByUsername.put(username, userData.image, {
        expirationTtl: ONE_DAY_IN_SECONDS,
      })
    );
  }
  await Promise.all(kvPromises);

  return new HeadHandler(
    {
      image: userData.image,
      name: userData.displayName,
      username,
    },
    PageType.UserProfilePage
  );
}

function getCampaignKVKey(username: string, slug: string) {
  return `campaign-${username}-${slug}`;
}

async function getCampaignInfo(env: any, kvKey: string) {
  const defaultInfo = { description: null, image: null, name: null };
  try {
    const campaignInfo = await env.campaignInfo.get(kvKey);
    const { description, image, name } =
      campaignInfo == null ? defaultInfo : JSON.parse(campaignInfo);
  } catch {
    // Swallow
  }
  return defaultInfo;
}

async function getHeadHandlerForCampaignPageMetaTags(
  url: string,
  username: string,
  slug: string,
  env: any
) {
  const campaignKVKey = getCampaignKVKey(username, slug);
  const { description, name, image } = await getCampaignInfo(
    env,
    campaignKVKey
  );

  if (name != null && image != null && description != null) {
    return new HeadHandler(
      { campaignSlug: slug, description, image, name, username },
      PageType.CampaignPage
    );
  }

  let campaignMetadata;
  try {
    campaignMetadata = await fetch(
      `${getApiUrl(
        url,
        env.API_URL
      )}/intern/users/${username}/campaigns/${slug}`,
      {
        headers: {
          check: "fofu",
        },
      }
    ).then((res) => res.json());
  } catch (e: any) {
    return new HeadHandler(null, PageType.CampaignPage);
  }

  if (campaignMetadata == null) {
    return new HeadHandler(null, PageType.CampaignPage);
  }

  await env.campaignInfo.put(campaignKVKey, JSON.stringify(campaignMetadata), {
    expirationTtl: ONE_DAY_IN_SECONDS,
  });

  return new HeadHandler(
    { ...campaignMetadata, campaignSlug: slug, username },
    PageType.CampaignPage
  );
}

function getSeriesKVKey(username: string, slug: string) {
  return `${username}/${slug}`;
}

async function getHeadHandlerForSeriesPageMetaTags(
  url: string,
  username: string,
  slug: string,
  env: any
) {
  const seriesKVKey = getSeriesKVKey(username, slug);
  const [name, image] = await Promise.all([
    env.seriesNameByUsernameSlashSlug.get(seriesKVKey),
    env.seriesImageByUsernameSlashSlug.get(seriesKVKey),
  ]);

  if (name != null && image != null) {
    return new HeadHandler(
      { image, name, seriesSlug: slug, username },
      PageType.UserSeriesPage
    );
  }

  let seriesMetadata;
  try {
    seriesMetadata = await fetch(
      `${getApiUrl(url, env.API_URL)}/intern/users/${username}/series/${slug}`,
      {
        headers: {
          check: "fofu",
        },
      }
    ).then((res) => res.json());
  } catch (e: any) {
    return new HeadHandler(null, PageType.UserSeriesPage);
  }

  if (seriesMetadata == null) {
    return new HeadHandler(null, PageType.UserSeriesPage);
  }

  await Promise.all([
    env.seriesNameByUsernameSlashSlug.put(seriesKVKey, seriesMetadata.name, {
      expirationTtl: ONE_DAY_IN_SECONDS,
    }),
    env.seriesImageByUsernameSlashSlug.put(seriesKVKey, seriesMetadata.image, {
      expirationTtl: ONE_DAY_IN_SECONDS,
    }),
  ]);

  return new HeadHandler(
    { ...seriesMetadata, seriesSlug: slug, username },
    PageType.UserSeriesPage
  );
}

export const onRequestGet: PagesFunction<{}> = async ({
  request,
  env,
  next,
}) => {
  // @ts-ignore
  const killswitch = env.KILLSWITCH;
  if (killswitch != null && killswitch === "1") {
    return new HTMLRewriter()
      .on("head", new HeadHandler(null))
      .transform(await next());
  }

  const ldHandler = new LaunchDarklyHandler(request.url);
  if (ldHandler.shouldPopulateFlags()) {
    await ldHandler.populateFlags(env);
  }
  let metaTagsHeadHandler = new HeadHandler(null);

  try {
    // Remove trailing slashes https://stackoverflow.com/a/6680877
    const path = new URL(request.url).pathname.replace(/\/+$/, "");
    const pathSplit = path.split("/");
    if (pathSplit.length === 2) {
      const maybeUsernameWithoutAt = pathSplit[1].substring(1);
      if (USER_PROFILE_PATH_REGEX.test(path)) {
        metaTagsHeadHandler = await getHeadHandlerForUserProfileMetaTags(
          request.url,
          maybeUsernameWithoutAt,
          env
        );
      }
    } else if (pathSplit.length === 3) {
      const match = path.match(NFT_LISTING_PATH_REGEX);
      const maybeUsernameWithoutAt = pathSplit[1].substring(1);
      if (match != null) {
        const mint = match[3];
        metaTagsHeadHandler = await getHeadHandlerForNftListingMetaTags(
          request.url,
          maybeUsernameWithoutAt,
          mint,
          env
        );
      }
    } else if (pathSplit.length === 4) {
      const seriesMatch = path.match(USER_SERIES_PATH_REGEX);
      if (seriesMatch != null) {
        const maybeUsernameWithoutAt = pathSplit[1].substring(1);
        const maybeSeriesSlug = pathSplit[3];
        metaTagsHeadHandler = await getHeadHandlerForSeriesPageMetaTags(
          request.url,
          maybeUsernameWithoutAt,
          maybeSeriesSlug,
          env
        );
      }

      const campaignMatch = path.match(USER_CAMPAIGN_PATH_REGEX);
      if (campaignMatch != null) {
        const maybeUsernameWithoutAt = pathSplit[1].substring(1);
        const maybeCampaignSlug = pathSplit[3];
        metaTagsHeadHandler = await getHeadHandlerForCampaignPageMetaTags(
          request.url,
          maybeUsernameWithoutAt,
          maybeCampaignSlug,
          env
        );
      }
    }
  } catch {
    metaTagsHeadHandler = new HeadHandler(null);
  }

  return new HTMLRewriter()
    .on("head", metaTagsHeadHandler)
    .on("head", ldHandler)
    .transform(await next());
};
