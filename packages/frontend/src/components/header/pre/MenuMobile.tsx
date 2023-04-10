import CloseButton from "components/buttons/CloseButton";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import styles from "css/header/pre/MenuMobile.module.css";
import { Drawer } from "antd";
import { MAILTO_HELLO_EMAIL } from "constants/Emails";

function Button({
  children,
  href,
}: {
  children: string;
  href: string;
}): JSX.Element {
  return (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.Primary}
      fontClass={FontClass.NavLink}
      href={href}
      type="link_external"
    >
      {children}
    </TextButton>
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function MenuMobile({ isShown, onHide }: Props): JSX.Element {
  return (
    <Drawer
      closable={false}
      height={140}
      maskStyle={{ backgroundColor: ColorValue.BackgroundOverlay }}
      placement="top"
      visible={isShown}
      onClose={onHide}
      zIndex={2}
    >
      <ResponsiveContainer
        className={styles.container}
        style={{ display: !isShown ? "none" : "block" }}
      >
        <div className={styles.textButtons}>
          <div className={styles.firstRow}>
            <CloseButton
              className={styles.closeButton}
              colorValue={ColorValue.Primary}
              isShown={false}
            />
            <Button href={MAILTO_HELLO_EMAIL}>Contact</Button>
            <CloseButton
              className={styles.closeButton}
              colorValue={ColorValue.Secondary}
              onClick={onHide}
            />
          </div>
          <Button href="/apply">Submit artist profile</Button>
        </div>
      </ResponsiveContainer>
    </Drawer>
  );
}
