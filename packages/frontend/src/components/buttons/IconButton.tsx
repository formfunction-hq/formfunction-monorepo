import PlainButton from "components/buttons/PlainButton";

export default function IconButton({
  icon,
  onClick,
}: {
  icon: JSX.Element;
  onClick: () => void;
}) {
  return (
    <PlainButton
      style={{ alignItems: "center", display: "flex" }}
      onClick={onClick}
    >
      {icon}
    </PlainButton>
  );
}
