import { useEffect } from "react";

const MARQUEE_CONTAINER_CLASSNAME = "marquee-container";

export default function useRemoveMarqueeContainerClass() {
  useEffect(() => {
    setTimeout(() => {
      const marqueeContainers = document.getElementsByClassName(
        MARQUEE_CONTAINER_CLASSNAME
      );
      [...marqueeContainers].forEach((marqueeContainer) => {
        // This is really jank, but unfortunately react-fast-marquee uses inline CSS + !important,
        // which makes it very hard to override their styling.
        //
        // For example, we may want to remove their default "overflow-x: hidden" styling and
        // replace it with "overflow-x: visible", and so we remove their classname with
        // JavaScript and then define our own classname.
        marqueeContainer.classList.remove(MARQUEE_CONTAINER_CLASSNAME);
      });

      // setTimeout needed to make sure the element is found
    }, 0);
  }, []);
}
