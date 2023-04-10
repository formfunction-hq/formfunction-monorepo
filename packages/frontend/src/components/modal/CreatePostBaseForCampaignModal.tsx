import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import PostMediaInput from "components/input/post/PostMediaInput";
import PostVisibilityInput from "components/input/post/PostVisibilityInput";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextArea from "components/input/TextArea";
import TextInput from "components/input/TextInput";
import GenericModal from "components/modal/GenericModal";
import { CreatePostBaseForCampaignModalMutation } from "components/modal/__generated__/CreatePostBaseForCampaignModalMutation.graphql";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import styles from "css/modal/CreatePostBaseForCampaignModal.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import FontClass from "types/enums/FontClass";
import PostVisibilityExpress_enum from "types/relay/PostVisibilityExpress_enum";
import getPostAssetStoragePath from "utils/firebase/storage-paths/getPostAssetStoragePath";
import uploadFile from "utils/firebase/uploadFile";
import PostTitleInput from "components/posts/PostTitleInput";
import { CreatePostBaseForCampaignModal_CampaignV2$key } from "components/modal/__generated__/CreatePostBaseForCampaignModal_CampaignV2.graphql";

const MAX_BODY_LENGTH = 1000;

const fragment = graphql`
  fragment CreatePostBaseForCampaignModal_CampaignV2 on CampaignV2 {
    ...PostVisibilityInput_CampaignV2
  }
`;

const mutation = graphql`
  mutation CreatePostBaseForCampaignModalMutation(
    $input: CreatePostBaseForCampaignInput!
    $connections: [ID!]!
  ) {
    PostNamespace {
      createPostBaseForCampaign(input: $input) {
        post
          @prependNode(connections: $connections, edgeTypeName: "PostsEdge") {
          __typename
          ... on PostTextOnly {
            __typename
            ...PostForPostTextOnly_PostTextOnly
          }
          ... on PostWithSingleAsset {
            __typename
            ...PostForPostWithSingleAsset_PostWithSingleAsset
          }
          ... on PostWithPoll {
            __typename
            ...PostForPostWithPoll_PostWithPoll
          }
        }
      }
    }
  }
`;

type Props = {
  campaign: CreatePostBaseForCampaignModal_CampaignV2$key;
  campaignSlug: string;
  creatorUsername: string;
  isShown: boolean;
  onHide: () => void;
};

export default function CreatePostBaseForCampaignModal({
  campaign,
  campaignSlug,
  creatorUsername,
  isShown,
  onHide,
}: Props): JSX.Element {
  const campaignData = useFragment(fragment, campaign);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [assetFile, setAssetFile] = useState<Maybe<File>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState<PostVisibilityExpress_enum>(
    "CampaignSupportersOnly"
  );
  const [fundingTierIds, setFundingTierIds] = useState<Set<string>>(new Set());

  const clearInputs = () => {
    setTitle("");
    setBody("");
    setLink("");
    setAssetFile(null);
  };

  const [commit] =
    useMutation<CreatePostBaseForCampaignModalMutation>(mutation);
  const {
    CampaignPosts: { connectionId: campaignPostsConnectionId },
  } = useRelayConnectionIdsContext();

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Post a project update"
    >
      <div className={styles.modal}>
        <PostVisibilityInput
          campaign={campaignData}
          visibility={visibility}
          fundingTierIds={fundingTierIds}
          setFundingTierIds={setFundingTierIds}
          setVisibility={setVisibility}
          label="Who can see this update?"
        />
        <PostTitleInput
          title={title}
          setTitle={setTitle}
          placeholder="Add a title to your update"
        />
        <InputWithLabel
          input={
            <TextArea
              value={body}
              maxLength={MAX_BODY_LENGTH}
              onChange={setBody}
              placeholder="What's the latest?"
              rows={3}
            />
          }
          label={<InputLabel label="Text (optional)" />}
        />
        <InputWithLabel
          input={
            <TextInput
              value={link}
              onChange={setLink}
              placeholder="Attach a link to your update"
            />
          }
          label={<InputLabel label="Link (optional)" />}
        />
        <PostMediaInput assetFile={assetFile} setAssetFile={setAssetFile} />
        <ButtonWithText
          className={styles.button}
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const { downloadUrl } =
              assetFile != null
                ? await uploadFile(
                    assetFile,
                    getPostAssetStoragePath(assetFile)
                  )
                : { downloadUrl: null };

            commit({
              onCompleted: () => {
                setIsLoading(false);
                notify({ message: "Update shared successfully!" });
                onHide();
                clearInputs();
              },
              onError: () => {
                setIsLoading(false);
                notifyUnexpectedError();
              },
              variables: {
                [FetchGraphqlVariablesDenylist.Connections]: [
                  campaignPostsConnectionId ?? "",
                ],
                input: {
                  campaignSlug,
                  creatorUsername,
                  postInput: {
                    assets:
                      downloadUrl != null
                        ? [
                            {
                              contentType: getContentTypeFromFilename(
                                assetFile!.name
                              ),
                              downloadUrl,
                              // We derive this from the backend
                              path: "",
                            },
                          ]
                        : [],
                    body,
                    link,
                    title,
                    visibility,
                    visibilityFundingTierIds:
                      fundingTierIds.size === 0
                        ? null
                        : Array.from(fundingTierIds),
                  },
                },
              },
            });
          }}
        >
          Post update
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
