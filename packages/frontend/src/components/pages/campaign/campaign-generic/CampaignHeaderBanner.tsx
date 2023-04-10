import ResponsiveContainer from "components/containers/ResponsiveContainer";
import styles from "css/pages/campaign/campaign-generic/CampaignHeaderBanner.module.css";
import { CSSProperties } from "react";

type Props = {
  children: any;
  justifyContent: CSSProperties["justifyContent"];
};

export default function CampaignHeaderBanner({
  children,
  justifyContent,
}: Props) {
  return (
    <div className={styles.headerBanner}>
      <ResponsiveContainer
        className={styles.childrenContainer}
        style={{ justifyContent }}
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}
