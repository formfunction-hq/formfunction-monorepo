import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import GenericModal from "components/modal/GenericModal";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/edit/CampaignGalleryModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { useForm } from "react-hook-form";
import InputLabel from "components/input/InputLabel";
import { YOUTUBE_VIDEO_URL_SUBLABEL } from "constants/InputSubLabels";
import InputWithLabel from "components/input/InputWithLabel";
import FormTextInput from "components/input/FormTextInput";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { CampaignGalleryModalMutation } from "components/pages/campaign/edit/__generated__/CampaignGalleryModalMutation.graphql";
import {
  CampaignGalleryModal_CampaignV2$data,
  CampaignGalleryModal_CampaignV2$key,
} from "components/pages/campaign/edit/__generated__/CampaignGalleryModal_CampaignV2.graphql";
import ImageGalleryInput, {
  AssetInputItem,
  ImageGalleryFile,
  ImageGalleryItem,
} from "components/input/ImageGalleryInput";
import graphql from "babel-plugin-relay/macro";
import ErrorMessage from "components/text/ErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import uploadFile from "utils/firebase/uploadFile";
import getCampaignGalleryImageStoragePath from "utils/firebase/storage-paths/getCampaignGalleryImageStoragePath";
import useUserContext from "hooks/useUserContext";
import isYouTubeUrl from "utils/you-tube/isYouTubeUrl";
import { notify } from "components/toast/notifications";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import usePreventRefresh from "hooks/usePreventRefresh";

const mutation = graphql`
  mutation CampaignGalleryModalMutation($input: UpsertCampaignGalleryInput!) {
    CampaignsNamespace {
      upsertCampaignGallery(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
          galleryAssets {
            contentType
            downloadUrl
            path
            dimensions {
              height
              width
            }
            id
          }
          youtubeVideoHref
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment CampaignGalleryModal_CampaignV2 on CampaignV2 {
    id
    galleryAssets {
      contentType
      downloadUrl
      path
      dimensions {
        height
        width
      }
      id
    }
    youtubeVideoHref
  }
`;

export type CampaignGalleryModalFormData = {
  campaignGalleryFiles: Array<ImageGalleryItem>;
  youtubeVideoHref: string;
};

type Props = {
  campaign: CampaignGalleryModal_CampaignV2$key;
  isShown: boolean;
  onHide: () => void;
};

function mapGalleryAssetsToFormData(
  galleryAssets: CampaignGalleryModal_CampaignV2$data["galleryAssets"]
): Array<ImageGalleryItem> {
  return (galleryAssets ?? []).map(
    ({ contentType, downloadUrl, dimensions, path, id }) => ({
      asset: {
        contentType,
        dimensions:
          dimensions == null
            ? null
            : {
                height: dimensions?.height,
                width: dimensions?.width,
              },
        downloadUrl,
        path,
      },
      id,
    })
  );
}

export default function CampaignGalleryModal({
  isShown,
  campaign,
  onHide: onHideOriginal,
}: Props): Maybe<JSX.Element> {
  const { userId } = useUserContext();
  const {
    galleryAssets,
    youtubeVideoHref: youTubeVideo,
    id: campaignId,
  } = useFragment(fragment, campaign);
  const [isLoading, setIsLoading] = useState(false);

  usePreventRefresh(isShown && isLoading);

  const imageGalleryInputItems = mapGalleryAssetsToFormData(galleryAssets);

  const [commit] = useMutation<CampaignGalleryModalMutation>(mutation);

  const [youTubeErrorMessage, setYouTubeErrorMessage] =
    useState<Maybe<string>>(null);
  const { register, watch, setValue, handleSubmit } =
    useForm<CampaignGalleryModalFormData>({
      defaultValues: {
        campaignGalleryFiles: imageGalleryInputItems,
        youtubeVideoHref: youTubeVideo ?? "",
      },
      mode: "onTouched",
    });
  const [errorMessage, setErrorMessage] =
    useState<Maybe<ErrorMessageMsg>>(null);

  const onHide = () => {
    if (isLoading) {
      notify({
        duration: 2,
        message: "Please wait for the assets to finish uploading",
        type: "info",
      });
      return;
    }

    onHideOriginal();
  };

  const onSubmit = async (formData: CampaignGalleryModalFormData) => {
    setIsLoading(true);
    const { campaignGalleryFiles, youtubeVideoHref } = formData;

    if (!isEmptyString(youtubeVideoHref) && !isYouTubeUrl(youtubeVideoHref)) {
      setIsLoading(false);
      setYouTubeErrorMessage("Please enter a valid YouTube link.");
      return;
    }

    if (
      campaignGalleryFiles.some(
        (item) => (item as ImageGalleryFile).file != null
      )
    ) {
      notify({ message: "Uploading images...", type: "info" });
    }
    const uploadedAssets = (
      await Promise.all(
        campaignGalleryFiles.map((item: ImageGalleryItem) => {
          const { file } = item as ImageGalleryFile;
          if (file != null) {
            return uploadFile(
              file,
              getCampaignGalleryImageStoragePath(userId!, file)
            );
          }
          return (item as AssetInputItem).asset;
        })
      )
    ).map((item: any) => {
      if (item.path != null) {
        // This means item is AssetInput type already;
        return item;
      }
      const { downloadUrl, fileName, type, dimensions } = item!;

      return {
        contentType: type,
        dimensions,
        downloadUrl,
        path: fileName,
      };
    });
    commit({
      onCompleted: ({ CampaignsNamespace }) => {
        const {
          upsertCampaignGallery: { campaign: campaignResponse },
        } = CampaignsNamespace;
        const galleryFormData = mapGalleryAssetsToFormData(
          campaignResponse.galleryAssets
        );
        setValue("campaignGalleryFiles", galleryFormData);
        if (campaignResponse.youtubeVideoHref != null) {
          setValue("youtubeVideoHref", campaignResponse.youtubeVideoHref);
        }
        setIsLoading(false);
        notify({ message: "Gallery updated!", type: "info" });
        onHide();
      },
      onError: () => {
        setErrorMessage(ErrorMessageMsg.UnexpectedError);
        setIsLoading(false);
      },
      variables: {
        input: {
          campaignId,
          galleryAssets: uploadedAssets,
          youtubeVideoHref,
        },
      },
    });
  };

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Set up campaign gallery"
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, emptyFunction)}
      >
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          These images help explain your campaign and get people excited to
          support your creative vision. We recommend at least 3 or more images.
        </Body1>
        <ImageGalleryInput
          items={watch("campaignGalleryFiles")}
          setItems={(files: Array<ImageGalleryItem>) => {
            setValue("campaignGalleryFiles", files);
          }}
        />
        <div className={styles.youtubeVideoHrefInput}>
          <InputWithLabel
            input={
              <FormTextInput
                onChange={() => setYouTubeErrorMessage(null)}
                hasError={youTubeErrorMessage != null}
                placeholder="Link to YouTube video"
                registerResult={register("youtubeVideoHref")}
                value={watch("youtubeVideoHref")}
              />
            }
            label={
              <InputLabel
                label="YouTube video (optional)"
                subLabel={YOUTUBE_VIDEO_URL_SUBLABEL}
              />
            }
          />
          {!isEmptyString(youTubeErrorMessage) && (
            <ErrorMessage fontClass={FontClass.Body1}>
              {youTubeErrorMessage}
            </ErrorMessage>
          )}
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          type="submit"
          className={styles.submitButton}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Save
        </ButtonWithText>
      </form>
      {errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </GenericModal>
  );
}
