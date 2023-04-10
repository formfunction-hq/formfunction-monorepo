export default function getPaginationStartAndEnd(
  currentPage: number,
  pageSize: number
): { end: number; start: number } {
  const end = currentPage * pageSize;
  const start = end - pageSize;

  return { end, start };
}
