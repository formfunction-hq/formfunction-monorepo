import ButtonWithText from "components/buttons/ButtonWithText";
import PostVisibilityInput from "components/input/post/PostVisibilityInput";
import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/CreatePostBaseForCampaignModal.module.css";
import { useState } from "react";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import PostVisibilityExpress_enum from "types/relay/PostVisibilityExpress_enum";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { notify } from "components/toast/notifications";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import { CreatePollForCampaignModalMutation } from "components/modal/campaign/__generated__/CreatePollForCampaignModalMutation.graphql";
import PostTitleInput from "components/posts/PostTitleInput";
import PollOptionsInput from "components/input/post/PollOptionsInput";
import PostMediaInput from "components/input/post/PostMediaInput";
import uploadFile from "utils/firebase/uploadFile";
import getPostAssetStoragePath from "utils/firebase/storage-paths/getPostAssetStoragePath";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { CreatePollForCampaignModal_CampaignV2$key } from "components/modal/campaign/__generated__/CreatePollForCampaignModal_CampaignV2.graphql";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";

type Props = {
  campaign: CreatePollForCampaignModal_CampaignV2$key;
  campaignSlug: string;
  creatorUsername: string;
  isShown: boolean;
  onHide: () => void;
};

const fragment = graphql`
  fragment CreatePollForCampaignModal_CampaignV2 on CampaignV2 {
    ...PostVisibilityInput_CampaignV2
  }
`;

const mutation = graphql`
  mutation CreatePollForCampaignModalMutation(
    $input: CreatePostWithPollForCampaignInput!
    $connections: [ID!]!
  ) {
    PostNamespace {
      createPostWithPollForCampaign(input: $input) {
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

const DEFAULT_POLL_OPTIONS = ["", ""];

export default function CreatePollForCampaignModal({
  campaignSlug,
  creatorUsername,
  isShown,
  campaign,
  onHide,
}: Props): JSX.Element {
  const campaignData = useFragment(fragment, campaign);
  const [commit] = useMutation<CreatePollForCampaignModalMutation>(mutation);
  const [title, setTitle] = useState<string>("");
  const [assetFile, setAssetFile] = useState<Maybe<File>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [fundingTierIds, setFundingTierIds] = useState<Set<string>>(new Set());
  const [pollOptions, setPollOptions] =
    useState<Array<string>>(DEFAULT_POLL_OPTIONS);
  const [visibility, setVisibility] = useState<PostVisibilityExpress_enum>(
    "CampaignSupportersOnly"
  );
  const {
    CampaignPosts: { connectionId: campaignPostsConnectionId },
  } = useRelayConnectionIdsContext();

  const clearInputs = () => {
    setTitle("");
    setPollOptions(DEFAULT_POLL_OPTIONS);
    setVisibility("CampaignSupportersOnly");
  };

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Run a poll">
      <div className={styles.modal}>
        <PostVisibilityInput
          campaign={campaignData}
          fundingTierIds={fundingTierIds}
          setFundingTierIds={setFundingTierIds}
          setVisibility={setVisibility}
          visibility={visibility}
          label="Who can see this poll?"
        />
        <PostTitleInput
          title={title}
          setTitle={setTitle}
          placeholder="Add a title to your poll"
        />
        <PollOptionsInput
          hasError={hasError}
          options={pollOptions}
          setOptions={setPollOptions}
        />
        <PostMediaInput assetFile={assetFile} setAssetFile={setAssetFile} />
        <ButtonWithText
          className={styles.button}
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            setHasError(false);
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
                clearInputs();
                onHide();
              },
              onError: (e) => {
                setIsLoading(false);
                setHasError(true);
                notifyErrorMessageFromError(e);
              },
              variables: {
                [FetchGraphqlVariablesDenylist.Connections]: [
                  campaignPostsConnectionId ?? "",
                ],
                input: {
                  campaignSlug,
                  creatorUsername,
                  pollInput: {
                    // Disallow multi select polls for now
                    isMultiSelect: false,
                    pollOptions: pollOptions.map((option) => ({
                      text: option,
                    })),
                  },
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
                    title,
                    visibility,
                    visibilityFundingTierIds:
                      fundingTierIds.size !== 0
                        ? Array.from(fundingTierIds)
                        : null,
                  },
                },
              },
            });
          }}
        >
          Post poll
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
