import { useEffect, useState } from "react";
import ElementId from "types/enums/ElementId";

export default function useGetElementWidth(elementId: ElementId) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const elem = document.getElementById(elementId);
    setWidth(elem?.clientWidth ?? 0);
  }, [elementId]);

  return width;
}
