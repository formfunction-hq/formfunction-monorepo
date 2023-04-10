export default function getCampaignGoalReachedXPercentBodyText(
  percentAsNumber: 50 | 100,
  campaignTitle: string
): string {
  switch (percentAsNumber) {
    case 50:
      return `Great progress! Your campaign, ${campaignTitle} has raised ${percentAsNumber}% of its funding goal`;
    case 100:
      return `Congratulations! Your campaign, ${campaignTitle} has raised ${percentAsNumber}% of its funding goal`;
    default:
      throw new Error("Unsupported");
  }
}
