type Props = {
  children: any;
  href: string;
};

export default function PlainExternalLink({ children, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: "inherit", textDecoration: "underline" }}
    >
      {children}
    </a>
  );
}
