import ReactTagInput from "@pathofdev/react-tag-input";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TAGS_LABEL from "constants/TagsLabel";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import isValidTag from "utils/validation/isValidTag";

export default function ListingTagsInput({
  setTags,
  tags,
}: {
  setTags: (val: Array<string>) => void;
  tags: Array<string>;
}) {
  return (
    <InputWithLabel
      label={<InputLabel label="Tags" subLabel={TAGS_LABEL} />}
      input={
        <ReactTagInput
          maxTags={10}
          onChange={(newTags) =>
            setTags(
              removeDuplicatesWithSet(newTags.map((tag) => tag.toLowerCase()))
            )
          }
          removeOnBackspace
          tags={tags}
          validator={isValidTag}
        />
      }
    />
  );
}
