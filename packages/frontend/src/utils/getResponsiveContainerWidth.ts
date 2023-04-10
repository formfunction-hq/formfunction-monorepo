/**
 * Returns the current width of the ResponsiveContainer component
 *
 * Keep in sync with ResponsiveContainer.module.css
 *
 * NOTE: We need both documentWidth and windowWidth since CSS @media
 * queries use the window width (which includes scrollbar width)
 * whereas the responsive container is sized relative to the
 * document width. This prevents us from having "awkward" transition
 * zones where the responsive container width is not accurate within
 * ~12px (depends on scrollbar width) of the designated breakpoints
 */
export default function getResponsiveContainerWidth(
  documentWidth: number,
  windowWidth: number
) {
  if (windowWidth < 768) {
    return documentWidth - 16 * 2;
  }

  if (windowWidth < 1024) {
    return documentWidth - 48 * 2;
  }

  return Math.min(documentWidth - 64 * 2, 1800 - 64 * 2);
}
