import TextButton from "components/buttons/TextButton";
import FullViewportWidth from "components/containers/FullViewportWidth";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import styles from "css/pages/generative-series/GenerativeSeriesBackToProject.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import joinClasses from "utils/joinClasses";

type Props = {
  projectHref: string;
  projectName: string;
};

export default function GenerativeSeriesBackToProject({
  projectHref,
  projectName,
}: Props) {
  return (
    <FullViewportWidth className={BackgroundColorClass.Shader}>
      <ResponsiveContainer>
        <div
          className={joinClasses(
            BackgroundColorClass.Shader,
            styles.containerInner
          )}
        >
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.Body2Medium}
            href={projectHref}
            icon={<ChevronLeftIcon colorValue={ColorValue.BrightPurple} />}
            type="link_internal"
          >
            Back to {projectName} project
          </TextButton>
        </div>
      </ResponsiveContainer>
    </FullViewportWidth>
  );
}
