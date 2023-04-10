import useCreateContext from "hooks/useCreateContext";
import ColorClass from "types/enums/ColorClass";
import CreateStep from "types/enums/CreateStep";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/create/CreateType.module.css";
import CreateBodyContainer from "components/pages/create/CreateBodyContainer";
import Body2 from "components/text/Body2";
import ArtName from "components/text/ArtName";
import ColorValue from "types/enums/ColorValue";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import PlainButton from "components/buttons/PlainButton";
import CreateMintType from "types/enums/CreateMintType";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import CreateEditionType from "types/enums/CreateEditionType";
import LayersIcon from "components/icons/LayersIcon";
import StarIcon from "components/icons/StarIcon";

function MintOptionCard({
  description,
  icon,
  mintType,
  title,
}: {
  description: string;
  icon: JSX.Element;
  mintType: CreateMintType;
  title: string;
}) {
  const { setCreateMintType, setNextStep } = useCreateContext();
  const { setEditionType } = useCreateNftDetailsContext();

  return (
    <PlainButton
      onClick={() => {
        setCreateMintType(mintType);
        if (mintType === CreateMintType.Editions) {
          // This is the default
          setEditionType(CreateEditionType.LimitedEditions);
        } else {
          // Handles the case where the user goes through the flow once, and then goes all the way
          // back to the beginning
          setEditionType(null);
        }
        setNextStep();
      }}
    >
      <div className={joinClasses(styles.card, GlobalClass.CardAnimation)}>
        <div className={styles.cardIcon}>{icon}</div>
        <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
        <Body2 textAlign="center" colorClass={ColorClass.Secondary}>
          {description}
        </Body2>
      </div>
    </PlainButton>
  );
}

export default function CreateType(): Maybe<JSX.Element> {
  const { step } = useCreateContext();

  if (step !== CreateStep.Type) {
    return null;
  }

  return (
    <CreateBodyContainer nextDisabled>
      <div className={styles.options}>
        <MintOptionCard
          description={
            "For unique, one-off pieces that you'll be able to list for" +
            " auction or instant sale."
          }
          title="Mint a 1/1 piece"
          mintType={CreateMintType.OneOfOne}
          icon={<StarIcon colorValue={ColorValue.BrightPurple} size={120} />}
        />
        <MintOptionCard
          description="For multiple editions of a single piece of artwork."
          title="Mint editions"
          mintType={CreateMintType.Editions}
          icon={<LayersIcon colorValue={ColorValue.BrightPurple} size={120} />}
        />
      </div>
      <Body2 colorClass={ColorClass.Secondary} textAlign="center">
        or,{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Secondary}
          display="inline"
          href="/import"
          textDecoration="underline"
          type="link_internal"
        >
          import your NFTs from other platforms
        </TextButton>
      </Body2>
    </CreateBodyContainer>
  );
}
