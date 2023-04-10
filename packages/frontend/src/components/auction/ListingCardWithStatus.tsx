import styles from "css/auction/ListingCardWithStatus.module.css";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";

function Status({ children }: { children: any }): JSX.Element {
  return (
    <div className={joinClasses(styles.status, FontClass.Body1)}>
      {children}
    </div>
  );
}

type Props = {
  listingCard: JSX.Element;
  status: JSX.Element | string;
};

export default function ListingCardWithStatus({
  listingCard,
  status,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <Status>{status}</Status>
      {listingCard}
    </div>
  );
}
