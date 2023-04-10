import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";

export default function PostTitleInput({
  placeholder,
  title,
  setTitle,
}: {
  placeholder: string;
  setTitle: (val: string) => void;
  title: string;
}) {
  return (
    <InputWithLabel
      input={
        <TextInput
          value={title}
          maxLength={120}
          onChange={setTitle}
          placeholder={placeholder}
        />
      }
      label={<InputLabel label="Title" required />}
    />
  );
}
