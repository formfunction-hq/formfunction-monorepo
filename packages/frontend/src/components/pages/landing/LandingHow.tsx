import LandingHow1 from "components/pages/landing/LandingHow1";
import LandingHow2 from "components/pages/landing/LandingHow2";
import LandingHow3 from "components/pages/landing/LandingHow3";
import styles from "css/pages/landing/LandingHow.module.css";
import { useState } from "react";

export default function LandingHow(): JSX.Element {
  const [page, setPage] = useState(0);

  // TODO: make all them fixed heights so transitions are smoother
  return (
    <div className={styles.containerOuter}>
      <LandingHow1 isHidden={page !== 0} onNext={() => setPage(1)} />
      <LandingHow2
        isHidden={page !== 1}
        onNext={() => setPage(2)}
        onPrev={() => setPage(0)}
      />
      <LandingHow3 isHidden={page !== 2} onPrev={() => setPage(1)} />
    </div>
  );
}
