enum UrlParam {
  // Disables hls, used for testing
  DisableHls = "disableHls",
  // Enables experimental features
  IsExperimental = "isExperimental",
  // Lazy loading behavior
  LazyLoadDisableOnce = "lazyLoadDisableOnce",
  LazyLoadUnmountIfInvisible = "lazyLoadUnmountIfInvisible",
  // Changes GraphQL URL to dev URL
  PointToDev = "pointToDev",
  // Changes GraphQL URL to prod URL
  PointToProd = "pointToProd",
}

export default UrlParam;
