import Popover from "antd/lib/popover";
import { TooltipPlacement } from "antd/lib/tooltip";

type Props = {
  children: any;
  className?: string;
  placement?: TooltipPlacement;
  popoverContent: JSX.Element;
  popoverOnOpenChange?: (open: boolean) => void;
  popoverOpen?: boolean;
};

export default function ButtonWithPopover({
  children,
  className,
  placement = "left",
  popoverContent,
  popoverOnOpenChange,
  popoverOpen,
}: Props): JSX.Element {
  return (
    <Popover
      className={className}
      content={popoverContent}
      placement={placement}
      trigger="click"
      open={popoverOpen}
      onOpenChange={popoverOnOpenChange}
    >
      {children}
    </Popover>
  );
}
