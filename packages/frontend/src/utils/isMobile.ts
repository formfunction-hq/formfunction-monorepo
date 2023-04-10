// From https://stackoverflow.com/questions/57776001/how-to-detect-ipad-pro-as-ipad-using-javascript
function isIpadOS() {
  return (
    navigator.maxTouchPoints != null &&
    navigator.maxTouchPoints > 2 &&
    navigator.userAgent.includes("Macintosh")
  );
}

export default function isMobile() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    window.innerWidth < 800 ||
    isIpadOS()
  );
}
