import BottomDrawer from "components/drawers/BottomDrawer";
import ProfileButtonOptions from "components/buttons/ProfileButtonOptions";

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function ProfileBottomDrawer({
  isShown,
  onHide,
}: Props): JSX.Element {
  return (
    <BottomDrawer isShown={isShown} onHide={onHide} title="Options">
      <ProfileButtonOptions alignItems="center" />
    </BottomDrawer>
  );
}
