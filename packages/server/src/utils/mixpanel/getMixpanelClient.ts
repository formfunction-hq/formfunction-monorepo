import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import mixpanel from "mixpanel";
import getEnvironment from "src/utils/getEnvironment";
import getMixpanelProjectToken from "formfn-shared/dist/utils/mixpanel/getMixpanelProjectToken";

let mixpanelClient: Maybe<mixpanel.Mixpanel> = null;

export default function getMixpanelClient() {
  if (mixpanelClient != null) {
    return mixpanelClient;
  }

  const projectSecret = process.env.MIXPANEL_PROJECT_SECRET;
  const environment = getEnvironment();
  mixpanelClient = mixpanel.init(getMixpanelProjectToken(environment), {
    secret: projectSecret,
  });

  return mixpanelClient;
}
