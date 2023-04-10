export const HEADER_BREAKPOINT = 980;
export const FONT_BREAKPOINT = 768;
export const BOTTOM_DRAWER_BREAKPOINT = 1090;

// TODO: rename to Breakpoint
/* eslint-disable sort-keys-fix/sort-keys-fix */
const Breakpoints = {
  SmallMobileHeight: 740,
  Mobile: 640,
  Tablet: FONT_BREAKPOINT,
  TabletWide: HEADER_BREAKPOINT,
  TabletExtraWide: 1024,
  Desktop: BOTTOM_DRAWER_BREAKPOINT,
  DesktopWide: 1280,
  MonitorWide: 1536,
  MaxDefault: Number.MAX_SAFE_INTEGER,

  // Makes it so the filters sidebar for generative series only shows
  // while the accompanying grid has at least 3 columns
  FiltersSidebar: 1450,

  // Keep in sync with SeriesPageContents.module.css
  SeriesPageContentsOneColumn: 900,

  // Keep in sync with CampaignFundingTierPreviewGridFullWidth.module.module.css
  CampaignFundingTierPreviewGridFullWidthOneColumn: 650,
  CampaignFundingTierPreviewGridFullWidthTwoColumns: 1130,
  CampaignFundingTierPreviewGridFullWidthThreeColumns: 1520,

  // Keep in sync with CampaignGridFullWidth.module.css
  CampaignGridFullWidthOneColumn: 768,
  CampaignGridFullWidthTwoColumns: 1400,

  // Keep in sync with NftGridFullWidth.module.css
  NftGridFullWidthOneColumn: 650,
  NftGridFullWidthTwoColumns: 1130,
  NftGridFullWidthThreeColumns: 1520,

  // Keep in sync with SeriesGridFullWidth.module.css
  SeriesGridFullWidthOneColumn: 768,
  SeriesGridFullWidthTwoColumns: 1400,

  // Keep in sync with SpotlightsGridFullWidth.module.css
  SpotlightsGridFullWidthOneColumn: 768,
  SpotlightsGridFullWidthTwoColumns: 1130,
  SpotlightsGridFullWidthThreeColumns: 1600,
};

export default Breakpoints;
