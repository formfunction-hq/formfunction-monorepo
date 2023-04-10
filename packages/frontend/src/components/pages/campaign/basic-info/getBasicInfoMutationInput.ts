import { CampaignBasicInfoFormData } from "components/pages/campaign/basic-info/CampaignBasicInfoForm";
import {
  CampaignGoalTypeExpress_enum,
  CampaignTeamMemberRoleExpress_enum,
  CreateCampaignInput,
} from "components/pages/campaign/basic-info/__generated__/CreateCampaignPageMutation.graphql";
import { notify } from "components/toast/notifications";
import { Maybe } from "graphql/jsutils/Maybe";
import { AssetInput } from "hooks/__generated__/useMintNftMutation.graphql";
import getCampaignPreviewImageStoragePath from "utils/firebase/storage-paths/getCampaignPreviewImageStoragePath";
import uploadFile from "utils/firebase/uploadFile";
import getImageDimensions from "utils/getImageDimensions";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import CurrencyConfig from "types/CurrencyConfig";
import { UserSearchBarItem } from "hooks/useUserSearchBarUserExpress";

export default async function getBasicInfoMutationInput(
  currencyConfig: Maybe<CurrencyConfig>,
  formData: CampaignBasicInfoFormData,
  selectedUsers: ReadonlyArray<UserSearchBarItem>,
  userId: Maybe<string>
): Promise<CreateCampaignInput> {
  const {
    previewImageFile,
    category,
    colorScheme,
    price,
    emoji,
    tagline,
    campaignName,
  } = formData;
  let previewAsset: Maybe<AssetInput> = null;
  if (previewImageFile !== null && userId != null) {
    notify({ message: "Uploading preview image...", type: "info" });
    const { downloadUrl, fileName } = await uploadFile(
      previewImageFile,
      getCampaignPreviewImageStoragePath(userId, previewImageFile)
    );

    const dimensions = await getImageDimensions(downloadUrl);
    previewAsset = {
      contentType: previewImageFile.type,
      dimensions,
      downloadUrl,
      path: fileName,
    };
  }

  return {
    category: category!,
    colorScheme: colorScheme!,
    goal: {
      goalAmount: convertToFullDecimals(price, currencyConfig!.decimals),
      goalCurrencyName: currencyConfig!.name,
      goalProgressSymbol: emoji,
      goalType: "Monetary" as CampaignGoalTypeExpress_enum,
    },
    previewAsset: previewAsset!,
    tagline,
    teamMembers: selectedUsers.map((u) => ({
      role: "Member" as CampaignTeamMemberRoleExpress_enum,
      userId: u.id,
    })),
    title: campaignName,
  };
}
