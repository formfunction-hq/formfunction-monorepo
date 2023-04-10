import { Prisma } from "@prisma/client";

export default function getViewerIsHolderInclude(
  viewerId: string
): Prisma.CampaignInclude["CampaignToHolder"] {
  return { where: { User: { id: viewerId ?? "" } } };
}
