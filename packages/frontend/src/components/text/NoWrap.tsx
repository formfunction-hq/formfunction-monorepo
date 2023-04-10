type Props = {
  children: any;
};

export default function NoWrap({ children }: Props) {
  return <span style={{ whiteSpace: "nowrap" }}>{children}</span>;
}
