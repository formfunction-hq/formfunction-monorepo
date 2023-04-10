import { useEffect, useState } from "react";

export default function useDelayRender(ms: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setTimeout(() => setShouldRender(true), ms);
  }, [ms]);

  return shouldRender;
}
