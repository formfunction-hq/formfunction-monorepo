import * as Flexbox from "flexbox-react";
import { Undef } from "formfn-shared/dist/types/UtilityTypes";

type StringPropOverrides = {
  height?: number | string;
  margin?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  padding?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  width?: number | string;
};

type PropOverrides = {
  gap?: number;
} & StringPropOverrides;

type Props = Omit<Flexbox.FlexboxProps, keyof StringPropOverrides> &
  PropOverrides;

function maybeConvertToDimensionString(val: Undef<number | string>) {
  if (val == null) {
    return undefined;
  }

  return typeof val === "number" ? `${val}px` : val;
}

export default function FlexBox(props: Props) {
  const {
    style,
    flexDirection,
    gap,
    height,
    width,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  } = props;

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <Flexbox.default
      {...props}
      height={maybeConvertToDimensionString(height)}
      width={maybeConvertToDimensionString(width)}
      margin={maybeConvertToDimensionString(margin)}
      marginBottom={maybeConvertToDimensionString(marginBottom)}
      marginLeft={maybeConvertToDimensionString(marginLeft)}
      marginRight={maybeConvertToDimensionString(marginRight)}
      marginTop={maybeConvertToDimensionString(marginTop)}
      maxHeight={maybeConvertToDimensionString(maxHeight)}
      maxWidth={maybeConvertToDimensionString(maxWidth)}
      minHeight={maybeConvertToDimensionString(minHeight)}
      minWidth={maybeConvertToDimensionString(minWidth)}
      padding={maybeConvertToDimensionString(padding)}
      paddingBottom={maybeConvertToDimensionString(paddingBottom)}
      paddingLeft={maybeConvertToDimensionString(paddingLeft)}
      paddingRight={maybeConvertToDimensionString(paddingRight)}
      paddingTop={maybeConvertToDimensionString(paddingTop)}
      style={{
        ...(style ?? {}),
        ...(flexDirection === "column"
          ? { rowGap: gap ?? undefined }
          : { columnGap: gap ?? undefined }),
      }}
    />
  );
}
