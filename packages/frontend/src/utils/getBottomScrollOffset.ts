export default function getBottomScrollOffset(minThreshold = 1200) {
  const offset = Math.min(minThreshold, window.innerHeight * 1.5);
  return offset;
}
