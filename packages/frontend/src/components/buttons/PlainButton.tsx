import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import ButtonName from "types/enums/ButtonName";

import GlobalClass from "types/enums/GlobalClass";
import logEvent from "utils/analytics/logEvent";
import deleteProperties from "utils/deleteProperties";
import joinClasses from "utils/joinClasses";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { buttonName?: ButtonName; hideText?: boolean; transparentBg?: boolean };

const PlainButton = forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => (
    // eslint-disable-next-line react/button-has-type
    <button
      // Delete some properties so we don't get noisy errors in the browser console
      {...deleteProperties(props, ["buttonName", "hideText", "transparentBg"])}
      className={joinClasses(
        GlobalClass.ButtonPlain,
        props.className,
        props.hideText === true ? GlobalClass.HideText : null
      )}
      onClick={(e) => {
        if (props.onClick != null) {
          props.onClick(e);
        }

        if (props.buttonName != null) {
          logEvent(AnalyticsEvent.ButtonClick, {
            buttonName: props.buttonName,
          });
        }
      }}
      ref={ref}
      style={{
        ...(props.transparentBg == null || props.transparentBg
          ? { backgroundColor: "transparent" }
          : {}),
        ...props.style,
      }}
      // eslint-disable-next-line react/button-has-type
      type={props.type ?? "button"}
    >
      {props.children}
    </button>
  )
);

export default PlainButton;
