import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/EditTagsModal.module.css";
import InputWithLabel from "components/input/InputWithLabel";
import InputLabel from "components/input/InputLabel";
import { useState } from "react";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import ReactTagInput from "@pathofdev/react-tag-input";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { EditTagsModal_MetadataAccount$key } from "components/modal/__generated__/EditTagsModal_MetadataAccount.graphql";
import { EditTagsModalMutation } from "components/modal/__generated__/EditTagsModalMutation.graphql";
import logIfNotProd from "utils/logIfNotProd";
import isValidTag from "utils/validation/isValidTag";
import TAGS_LABEL from "constants/TagsLabel";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const mutation = graphql`
  mutation EditTagsModalMutation(
    $deleteFilter: NftToTag_bool_exp!
    $insertObjects: [NftToTag_insert_input!]!
  ) {
    delete_NftToTag(where: $deleteFilter) {
      returning {
        nftId
        tagId
      }
    }

    insert_NftToTag(objects: $insertObjects) {
      returning {
        nftId
        tagId
      }
    }
  }
`;

const fragment = graphql`
  fragment EditTagsModal_MetadataAccount on MetadataAccount {
    mint

    tags
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: EditTagsModal_MetadataAccount$key;
  onHide: () => void;
};

export default function EditTagsModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const [commit] = useMutation<EditTagsModalMutation>(mutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const originalTags = [...metadataAccountData.tags];
  const [tags, setTags] = useState<Array<string>>(originalTags);
  const [isLoading, setIsLoading] = useState(false);

  const tagsInput = (
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

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Edit tags">
      <div className={styles.body}>
        {tagsInput}
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.saveButton}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            const newTags = tags.filter((tag) => !originalTags.includes(tag));
            const deletedTags = originalTags.filter(
              (tag) => !tags.includes(tag)
            );

            commit({
              onCompleted: () => {
                setIsLoading(false);
                onHide();
              },
              onError: (e) => {
                logIfNotProd("Error saving tags", e);
                notifyUnexpectedError();
              },
              updater: (store) => {
                const record = store
                  .getRoot()
                  .getLinkedRecord("metadataAccountForMint", {
                    input: { mint: metadataAccountData.mint },
                  });
                if (record != null) {
                  record.setValue(
                    tags.map((tag) => tag.trim().toLowerCase()),
                    "tags"
                  );
                }
              },
              variables: {
                deleteFilter: {
                  _or: deletedTags.map((tag) => ({
                    Tag: { value: { _eq: tag } },
                  })),
                },
                insertObjects: newTags.map((tag) => ({
                  Tag: {
                    data: { value: tag.trim().toLowerCase() },
                    on_conflict: {
                      constraint: "Tag_value_key",
                      update_columns: ["value"],
                    },
                  },
                  nftId: metadataAccountData.mint,
                })),
              },
            });
          }}
        >
          Save
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
